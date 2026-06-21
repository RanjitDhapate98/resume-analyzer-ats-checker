import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import ResumeUpload from './components/ResumeUpload/ResumeUpload'
import ATSScore from './components/ATSScore/ATSScore'
import ScoreBreakdown from './components/ScoreBreakdown/ScoreBreakdown'
import SectionChecklist from './components/SectionChecklist/SectionChecklist'
import ResumeStats from './components/ResumeStats/ResumeStats'
import Suggestions from './components/Suggestions/Suggestions'
import AnalysisHistory from './components/AnalysisHistory/AnalysisHistory'
import Footer from './components/Footer/Footer'
import { extractTextFromPdf } from './utils/pdfParser'
import { checkKeywords, getCategorizedKeywords } from './utils/keywordChecker'
import { calculateATSScore, getResumeStatistics, analyzeResumeQuality } from './utils/atsCalculator'
import { generateReportText, downloadTextFile } from './utils/reportGenerator'
import { getHistory, saveHistoryEntry, clearHistory } from './utils/historyStorage'
import { getInitialTheme, saveTheme } from './utils/theme'

function App() {
  const [theme, setTheme] = useState(getInitialTheme)
  const [fileName, setFileName] = useState('')
  const [keywords, setKeywords] = useState(null)
  const [scoreData, setScoreData] = useState(null)
  const [stats, setStats] = useState(null)
  const [quality, setQuality] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [history, setHistory] = useState([])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    saveTheme(theme)
  }, [theme])

  useEffect(() => {
    setHistory(getHistory())
  }, [])

  function toggleTheme() {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  async function handleFileSelect(file, validationError) {
    if (validationError) {
      setError(validationError)
      setFileName('')
      return
    }

    setError(null)
    setFileName(file.name)
    setIsLoading(true)
    setScoreData(null)
    setStats(null)
    setKeywords(null)
    setQuality(null)

    try {
      const text = await extractTextFromPdf(file)
      const keywordResult = checkKeywords(text)
      const scoreResult = calculateATSScore(text, keywordResult.found.length)
      const statsResult = getResumeStatistics(text, keywordResult.found, keywordResult.missing)
      const qualityResult = analyzeResumeQuality(text)

      setKeywords(keywordResult)
      setScoreData(scoreResult)
      setStats(statsResult)
      setQuality(qualityResult)

      const updatedHistory = saveHistoryEntry({
        id: `${Date.now()}`,
        fileName: file.name,
        score: scoreResult.score,
        category: scoreResult.category,
        categoryColor: scoreResult.categoryColor,
        date: new Date().toLocaleDateString()
      })
      setHistory(updatedHistory)
    } catch (err) {
      setError(err.message || 'Something went wrong while analyzing your resume.')
      setFileName('')
    } finally {
      setIsLoading(false)
    }
  }

  function handleDownloadReport() {
    if (!scoreData || !stats || !keywords) return

    const reportText = generateReportText({
      fileName: fileName || 'resume.pdf',
      analysis: scoreData,
      stats,
      keywords
    })

    downloadTextFile(reportText, `${fileName.replace('.pdf', '')}-ats-report.txt`)
  }

  function handleClearHistory() {
    clearHistory()
    setHistory([])
  }

  const hasResults = scoreData && stats && keywords && quality

  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main className="app-main">
        <div className="app-container">
          <ResumeUpload
            onFileSelect={handleFileSelect}
            fileName={fileName}
            isLoading={isLoading}
            error={error}
          />

          {hasResults && (
            <div className="app-results">
              <ATSScore
                score={scoreData.score}
                category={scoreData.category}
                categoryColor={scoreData.categoryColor}
                foundSkills={keywords.found}
                missingSkills={keywords.missing}
                skillMatchPercent={stats.skillMatchPercent}
                categorizedSkills={getCategorizedKeywords(keywords.found)}
                onDownloadReport={handleDownloadReport}
              />

              <div className="app-grid-two">
                <ScoreBreakdown breakdown={scoreData.breakdown} />
                <SectionChecklist sections={scoreData.sections} />
              </div>

              <ResumeStats stats={stats} />

              <Suggestions
                quality={quality}
                sections={scoreData.sections}
                missingSkills={keywords.missing}
              />
            </div>
          )}

          {!hasResults && !isLoading && (
            <div className="app-placeholder">
              <p>Upload a PDF resume above to see your ATS score, keyword analysis and suggestions.</p>
            </div>
          )}

          <AnalysisHistory history={history} onClear={handleClearHistory} />
        </div>
      </main>

      <Footer />
    </>
  )
}

export default App
