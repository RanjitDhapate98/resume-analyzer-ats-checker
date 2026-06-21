import { useState } from 'react'
import './Suggestions.css'

function buildSuggestions(quality, sections, missingSkills) {
  const suggestions = []

  if (!quality.hasMeasurableAchievements) {
    suggestions.push('Add measurable achievements, such as numbers, percentages or outcomes, to strengthen your impact.')
  }

  if (!quality.hasGithub) {
    suggestions.push('Add your GitHub profile link so recruiters can review your code.')
  }

  if (!quality.hasLinkedin) {
    suggestions.push('Add your LinkedIn profile link to make it easier for recruiters to reach you.')
  }

  if (!sections.projects) {
    suggestions.push('Add a dedicated projects section describing what you built and the tools used.')
  }

  if (sections.projects && !quality.isIdealLength) {
    suggestions.push('Expand your project section with more detail on your role, tools and measurable results.')
  }

  if (missingSkills.length > 0) {
    const preview = missingSkills.slice(0, 5).join(', ')
    suggestions.push(`Add missing in-demand technologies relevant to your field, such as ${preview}.`)
  }

  if (!quality.hasActionVerbs) {
    suggestions.push('Start bullet points with strong action verbs like built, developed or led.')
  }

  if (quality.hasWeakPhrases) {
    suggestions.push("Replace generic phrases like 'responsible for' with specific actions and outcomes.")
  }

  if (!sections.certifications) {
    suggestions.push('Consider adding a certifications section if you have completed relevant courses.')
  }

  if (!sections.contact) {
    suggestions.push('Add clear contact information including your email and phone number at the top.')
  }

  if (suggestions.length === 0) {
    suggestions.push('Your resume covers the key areas well. Keep it updated with your latest work.')
  }

  return suggestions
}

function Suggestions({ quality, sections, missingSkills }) {
  const [isCopied, setIsCopied] = useState(false)
  const suggestions = buildSuggestions(quality, sections, missingSkills)

  async function handleCopy() {
    const text = suggestions.map((item, index) => `${index + 1}. ${item}`).join('\n')

    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch {
      setIsCopied(false)
    }
  }

  return (
    <div className="suggestions-card">
      <div className="suggestions-header">
        <h2 className="suggestions-title">Improvement Suggestions</h2>
        <button type="button" className="suggestions-copy" onClick={handleCopy}>
          {isCopied ? 'Copied' : 'Copy All'}
        </button>
      </div>
      <ul className="suggestions-list">
        {suggestions.map((suggestion, index) => (
          <li key={index} className="suggestions-item">
            <span className="suggestions-bullet">{index + 1}</span>
            <span>{suggestion}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Suggestions
