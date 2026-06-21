import './ScoreBreakdown.css'

const BREAKDOWN_LABELS = [
  { key: 'skills', label: 'Skills Match', max: 25 },
  { key: 'experience', label: 'Experience', max: 20 },
  { key: 'projects', label: 'Projects', max: 15 },
  { key: 'contact', label: 'Contact Info', max: 10 },
  { key: 'education', label: 'Education', max: 10 },
  { key: 'length', label: 'Resume Length', max: 10 },
  { key: 'skillsSection', label: 'Skills Section', max: 5 },
  { key: 'certifications', label: 'Certifications', max: 5 }
]

function ScoreBreakdown({ breakdown }) {
  return (
    <div className="score-breakdown-card">
      <h2 className="score-breakdown-title">Score Breakdown</h2>
      <div className="score-breakdown-list">
        {BREAKDOWN_LABELS.map((item) => {
          const value = breakdown[item.key]
          const percent = Math.round((value / item.max) * 100)

          return (
            <div key={item.key} className="score-breakdown-row">
              <div className="score-breakdown-row-top">
                <span className="score-breakdown-label">{item.label}</span>
                <span className="score-breakdown-value">{value}/{item.max}</span>
              </div>
              <div className="score-breakdown-track">
                <div
                  className="score-breakdown-fill"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ScoreBreakdown
