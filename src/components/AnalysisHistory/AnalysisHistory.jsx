import './AnalysisHistory.css'

function AnalysisHistory({ history, onClear }) {
  if (history.length === 0) return null

  return (
    <div className="analysis-history-card">
      <div className="analysis-history-header">
        <h2 className="analysis-history-title">Recent Analyses</h2>
        <button type="button" className="analysis-history-clear" onClick={onClear}>
          Clear
        </button>
      </div>

      <ul className="analysis-history-list">
        {history.map((entry) => (
          <li key={entry.id} className="analysis-history-item">
            <span className="analysis-history-name">{entry.fileName}</span>
            <span className="analysis-history-meta">
              <span className="analysis-history-score" style={{ color: entry.categoryColor }}>
                {entry.score}/100
              </span>
              <span className="analysis-history-date">{entry.date}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AnalysisHistory
