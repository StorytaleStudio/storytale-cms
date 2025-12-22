import ContactAccordion from './contactBlock'

export default function Footer() {
  const date = new Date().getFullYear()
  return (
    <div className="footer">
      <div className="aside">
        <div>
          <p className="footer-text">
            Prefer to chat more? <br />
            Reach out so we can tell tales together.
          </p>
        </div>
        <div className="contact">
          <ContactAccordion />
          <div className="below">
            <a>T&amp;C</a>
            <a>Privacy Policy</a>
            <p>Brisbane (Meanjin), Australia</p>
            <p>© STORYTALE STUDIO {date}</p>
          </div>
        </div>
      </div>
      <main></main>
    </div>
  )
}
