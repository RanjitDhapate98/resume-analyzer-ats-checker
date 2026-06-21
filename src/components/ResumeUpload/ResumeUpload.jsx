import { useRef, useState } from 'react'
import './ResumeUpload.css'
import { MAX_FILE_SIZE_MB } from '../../utils/constants'

function ResumeUpload({ onFileSelect, fileName, isLoading, error }) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef(null)

  function handleFile(file) {
    if (!file) return

    if (file.type !== 'application/pdf') {
      onFileSelect(null, 'Please upload a valid PDF file.')
      return
    }

    const sizeInMb = file.size / (1024 * 1024)
    if (sizeInMb > MAX_FILE_SIZE_MB) {
      onFileSelect(null, `File is too large. Max size is ${MAX_FILE_SIZE_MB}MB.`)
      return
    }

    onFileSelect(file, null)
  }

  function handleInputChange(event) {
    const file = event.target.files[0]
    handleFile(file)
    event.target.value = ''
  }

  function handleDrop(event) {
    event.preventDefault()
    setIsDragging(false)
    const file = event.dataTransfer.files[0]
    handleFile(file)
  }

  function handleDragOver(event) {
    event.preventDefault()
    setIsDragging(true)
  }

  function handleDragLeave() {
    setIsDragging(false)
  }

  function openFileDialog() {
    inputRef.current.click()
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openFileDialog()
    }
  }

  return (
    <div className="resume-upload-card">
      <h2 className="resume-upload-title">Upload Your Resume</h2>
      <p className="resume-upload-subtitle">PDF format only, up to {MAX_FILE_SIZE_MB}MB</p>

      <div
        className={`resume-upload-dropzone ${isDragging ? 'dragging' : ''} ${isLoading ? 'loading' : ''}`}
        onClick={openFileDialog}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        role="button"
        tabIndex={0}
        aria-label="Upload PDF resume"
        onKeyDown={handleKeyDown}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          onChange={handleInputChange}
          className="resume-upload-input"
          aria-hidden="true"
          tabIndex={-1}
        />

        {isLoading ? (
          <div className="resume-upload-loading">
            <span className="resume-upload-spinner" />
            <p className="resume-upload-text">Analyzing your resume...</p>
          </div>
        ) : (
          <>
            <div className="resume-upload-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <path d="M12 16V4M12 4L7 9M12 4L17 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 16V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {fileName ? (
              <p className="resume-upload-text">{fileName}</p>
            ) : (
              <>
                <p className="resume-upload-text">Drag and drop your resume here</p>
                <p className="resume-upload-text-secondary">or click to browse files</p>
              </>
            )}
          </>
        )}
      </div>

      {error && (
        <p className="resume-upload-error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default ResumeUpload
