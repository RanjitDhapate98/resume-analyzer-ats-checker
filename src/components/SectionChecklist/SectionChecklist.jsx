import './SectionChecklist.css'
import { REQUIRED_SECTIONS } from '../../utils/constants'

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CrossIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SectionChecklist({ sections }) {
  const completedCount = REQUIRED_SECTIONS.filter((section) => sections[section.key]).length

  return (
    <div className="section-checklist-card">
      <div className="section-checklist-header">
        <h2 className="section-checklist-title">Section Completeness</h2>
        <span className="section-checklist-count">
          {completedCount}/{REQUIRED_SECTIONS.length} sections found
        </span>
      </div>

      <ul className="section-checklist-list">
        {REQUIRED_SECTIONS.map((section) => {
          const isComplete = sections[section.key]
          return (
            <li key={section.key} className={`section-checklist-item ${isComplete ? 'complete' : 'incomplete'}`}>
              <span className="section-checklist-icon">
                {isComplete ? <CheckIcon /> : <CrossIcon />}
              </span>
              <span>{section.label}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SectionChecklist
