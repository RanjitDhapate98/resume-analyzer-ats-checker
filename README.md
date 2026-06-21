# Resume Analyzer & ATS Score Checker

A fully client-side resume analyzer that scores PDF resumes against common ATS rules, detects missing keywords, tracks section completeness, and generates improvement suggestions. No backend, no database, no paid APIs — everything runs in the browser.

**Live demo:** https://resume-analyzer-ats-checker.vercel.app/

## Features

- Drag-and-drop PDF upload with in-browser text extraction (pdfjs-dist)
- ATS score out of 100 with a category badge (Excellent / Good / Average / Needs Improvement)
- Score breakdown across 8 weighted factors (skills, experience, projects, contact, education, etc.)
- Keyword matching against a curated skill list, grouped by category
- Section completeness tracker for Contact, Skills, Education, Projects, Experience, and Certifications
- Resume statistics: word count, character count, skill match rate
- Improvement suggestions based on resume quality signals (action verbs, measurable results, weak phrasing)
- Copy suggestions to clipboard
- Downloadable plain-text analysis report
- Analysis history saved locally (localStorage), no server involved
- Dark mode with system preference detection
- Fully responsive, keyboard accessible, and respects reduced-motion preferences

## Tech Stack

| Layer       | Choice                  |
|-------------|--------------------------|
| Framework   | React 18 + Vite          |
| Language    | JavaScript               |
| Styling     | Plain CSS, one file per component |
| PDF parsing | pdfjs-dist (client-side) |
| Storage     | Browser localStorage     |
| Hosting     | Vercel (free tier)       |

## Project Structure

```
src/
  components/
    Navbar/
    ResumeUpload/
    ATSScore/
    ScoreBreakdown/
    SectionChecklist/
    ResumeStats/
    Suggestions/
    AnalysisHistory/
    Footer/
  utils/
    pdfParser.js
    atsCalculator.js
    keywordChecker.js
    reportGenerator.js
    historyStorage.js
    theme.js
    constants.js
  App.jsx
  main.jsx
  index.css
```

## Getting Started

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build
npm run preview
```

## Deploy on Vercel

1. Push this repository to GitHub.
2. Import it into Vercel.
3. Build command: `npm run build`
4. Output directory: `dist`

## How Scoring Works

The ATS score is calculated out of 100 using weighted factors: skills match (25), experience section (20), projects section (15), contact info (10), education (10), resume length (10), skills section (5), and certifications (5). Suggestions are generated from quality checks such as the presence of action verbs, measurable achievements, and weak filler phrases.

## Author

Ranjit Dhapate
dhapateranjit98@gmail.com
