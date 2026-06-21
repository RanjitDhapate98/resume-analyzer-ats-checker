import './Footer.css'
import { DEVELOPER_NAME, DEVELOPER_EMAIL, DIGITAL_HEROES_URL } from '../../utils/constants'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-info">
          <p className="footer-name">{DEVELOPER_NAME}</p>
          <p className="footer-email">{DEVELOPER_EMAIL}</p>
        </div>
        <a
          className="footer-button"
          href={DIGITAL_HEROES_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Built for Digital Heroes
        </a>
      </div>
    </footer>
  )
}

export default Footer
