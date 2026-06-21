import './ATSScore.css'

function ATSScore({ score, category, categoryColor, foundSkills, missingSkills, skillMatchPercent, categorizedSkills, onDownloadReport }) {
  return (
    <div className="ats-score-card">
      <div className="ats-score-header">
        <h2 className="ats-score-title">ATS Score</h2>
        <button type="button" className="ats-score-download" onClick={onDownloadReport}>
          Download Report
        </button>
      </div>

      <div className="ats-score-display">
        <div className="ats-score-number" style={{ color: categoryColor }}>
          {score}
          <span className="ats-score-max">/100</span>
        </div>
        <div className="ats-score-meta">
          <span className="ats-score-badge" style={{ backgroundColor: categoryColor }}>
            {category}
          </span>
          <span className="ats-score-match">{skillMatchPercent}% skill match</span>
        </div>
      </div>

      <div className="ats-score-bar-track">
        <div
          className="ats-score-bar-fill"
          style={{ width: `${score}%`, backgroundColor: categoryColor }}
        />
      </div>

      <div className="ats-category-row">
        {categorizedSkills.map((item) => (
          <span key={item.category} className="ats-category-chip">
            {item.category} <strong>{item.matched}/{item.total}</strong>
          </span>
        ))}
      </div>

      <div className="ats-keywords-section">
        <div className="ats-keywords-block">
          <h3 className="ats-keywords-heading found">Found Skills ({foundSkills.length})</h3>
          <div className="ats-keywords-list">
            {foundSkills.length === 0 ? (
              <p className="ats-keywords-empty">No matching skills found</p>
            ) : (
              foundSkills.map((skill) => (
                <span key={skill} className="ats-keyword-tag found">
                  {skill}
                </span>
              ))
            )}
          </div>
        </div>

        <div className="ats-keywords-block">
          <h3 className="ats-keywords-heading missing">Missing Skills ({missingSkills.length})</h3>
          <div className="ats-keywords-list">
            {missingSkills.length === 0 ? (
              <p className="ats-keywords-empty">Great, no missing skills</p>
            ) : (
              missingSkills.map((skill) => (
                <span key={skill} className="ats-keyword-tag missing">
                  {skill}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ATSScore
