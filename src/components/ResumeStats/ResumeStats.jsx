import './ResumeStats.css'

function ResumeStats({ stats }) {
  const statItems = [
    { label: 'Word Count', value: stats.wordCount },
    { label: 'Character Count', value: stats.charCount },
    { label: 'Skills Found', value: stats.skillsFound },
    { label: 'Skills Missing', value: stats.skillsMissing },
    { label: 'Skill Match', value: `${stats.skillMatchPercent}%` }
  ]

  return (
    <div className="resume-stats-card">
      <h2 className="resume-stats-title">Resume Statistics</h2>
      <div className="resume-stats-grid">
        {statItems.map((item) => (
          <div key={item.label} className="resume-stats-item">
            <span className="resume-stats-value">{item.value}</span>
            <span className="resume-stats-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResumeStats
