import './Navbar.css'

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M12 2V4M12 20V22M4 12H2M22 12H20M19.07 4.93L17.66 6.34M6.34 17.66L4.93 19.07M19.07 19.07L17.66 17.66M6.34 6.34L4.93 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}

function Navbar({ theme, onToggleTheme }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M6 2h9l5 5v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.6" />
            <path d="M9 10h6M9 14h6M9 18h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <span className="navbar-brand-text">Resume Analyzer</span>
        </div>

        <div className="navbar-right">
          <span className="navbar-tagline">ATS Score Checker</span>
          <button
            type="button"
            className="navbar-theme-toggle"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
