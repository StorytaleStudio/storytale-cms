'use client'

import { useState } from 'react'

interface ContactItem {
  label: string
  user?: string
  domain?: string
  socialLinks?: {
    platform: string
    url: string
  }[]
}

const ContactAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const contacts: ContactItem[] = [
    { label: 'Talk', user: 'hello', domain: 'storytale.studio' },
    {
      label: 'Stalk',
      socialLinks: [
        { platform: 'LinkedIn', url: 'https://www.linkedin.com/company/storytale-studio' },
        { platform: 'Instagram', url: 'https://www.instagram.com/storytale.studio' },
      ],
    },
    { label: 'New Business', user: 'legend', domain: 'storytale.studio' },
    { label: 'Media', user: 'media', domain: 'storytale.studio' },
  ]

  const constructEmail = (user: string, domain: string): string => {
    return `${user}@${domain}`
  }

  const handleEmailClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    user: string,
    domain: string,
  ) => {
    e.preventDefault()
    const email = constructEmail(user, domain)
    window.location.href = `mailto:${email}`
  }

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <>
      <style>{`
        .accordion-container {
          width: 100%;
          max-width: 24rem;
        }

        .accordion-item {
            border: 1px solid rgba(255,255,255,0.25);
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(0.625rem);
            border-radius: 0.5rem;
            overflow: hidden;
            transition: all 0.2s;
            margin-bottom: 0.5rem;
        }

        .accordion-button {
          width: 100%;
          background: transparent;
          padding: 1rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .accordion-item:hover {
          background-color: rgba(255,255,255,0.15);
        }

        .accordion-label {
          font-size: var(--type-small);
          font-weight: 500;
          color: white;
          margin: 0;
        }

        .accordion-icon {
          width: 1.25rem;
          height: 1.25rem;
          color: rgba(255,255,255,0.25);
          transition: transform 0.2s;
        }

        .accordion-icon.open {
          transform: rotate(180deg);
        }

        .accordion-content {
          transition: all 0.2s ease-in-out;
          overflow: hidden;
        }

        .accordion-content.closed {
          max-height: 0;
          opacity: 0;
        }

        .accordion-content.open {
          max-height: 8rem;
          opacity: 1;
        }

        .accordion-content-inner {
          padding: 1rem 1rem;
          background-color: rgba(255,255,255,0.1);
          border-top: 1px solid rgba(255,255,255,0.1)
        }

        .accordion-link {
          color: white;
          text-decoration: none;
          display: inline-block;
          transition: color 0.2s;
          font-size: var(--type-small);
        }

        .accordion-link:hover {
          color: white;
          text-decoration: underline;
        }

        .social-links {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
      `}</style>

      <div className="accordion-container">
        {contacts.map((contact, index) => (
          <div key={index} className="accordion-item">
            <button
              onClick={() => toggleAccordion(index)}
              className="accordion-button"
              aria-expanded={openIndex === index}
            >
              <span className="accordion-label">{contact.label}</span>
              <svg
                className={`accordion-icon ${openIndex === index ? 'open' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div className={`accordion-content ${openIndex === index ? 'open' : 'closed'}`}>
              <div className="accordion-content-inner">
                {contact.socialLinks ? (
                  <div className="social-links">
                    {contact.socialLinks.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="accordion-link"
                      >
                        {link.platform}
                      </a>
                    ))}
                  </div>
                ) : (
                  <a
                    href="#"
                    onClick={(e) => handleEmailClick(e, contact.user!, contact.domain!)}
                    className="accordion-link"
                    data-user={btoa(contact.user!)}
                    data-domain={btoa(contact.domain!)}
                  >
                    {constructEmail(contact.user!, contact.domain!)}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default ContactAccordion
