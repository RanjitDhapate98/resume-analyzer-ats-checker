import * as pdfjsLib from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker

export async function extractTextFromPdf(file) {
  const arrayBuffer = await file.arrayBuffer()

  let pdf
  try {
    pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
  } catch {
    throw new Error("We couldn't open this PDF. It may be corrupted or password protected.")
  }

  let fullText = ''

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber)
    const textContent = await page.getTextContent()
    const pageText = textContent.items.map((item) => item.str).join(' ')
    fullText += pageText + '\n'
  }

  if (!fullText.trim()) {
    throw new Error('No readable text found in this PDF. It may be a scanned image.')
  }

  return fullText.trim()
}
