import ContactAccordion from './contactBlock'

export default function Footer() {
  const date = new Date().getFullYear()
  return (
    <div className="footer">
      <div className="aside">
        <div className="footer-top">
          <p className="footer-text">
            We take stories and turn them into legends.
            <br />
            <span>Let&rsquo;s meet yours.</span>
          </p>
          <a>Book in a 15min call.</a>
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
    </div>
  )
}
