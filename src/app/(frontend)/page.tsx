import Image from 'next/image'
import styles from './page.module.css'
import ScrollFade from 'components/TextScrollFade'
import PackagesList from 'components/PackagesList'

export default function Home() {
  return (
    <>
      <section data-section="default" className={styles.page}>
        {/* <FantasyBackground darkMode={false} /> */}
        <aside className={styles.aside}>
          <ScrollFade>
            <h1>
              The Branding, Strategy and Digital Design creative studio for those who want to
              capture hearts not clicks.
            </h1>
          </ScrollFade>

          <div>
            <ScrollFade>
              <h2>
                <span>Creating Legends for</span>
                Legends
              </h2>
              <button className={styles.ctaButton}>Get to know your brand better!</button>
            </ScrollFade>
          </div>
        </aside>
        <main className={styles.main}></main>
      </section>
      <section data-section="dark" data-background="light" className={styles.next}>
        <aside className={styles.aside}>
          <h2>Next Section</h2>
        </aside>
        <main className={styles.main}>
          <iframe
            src="https://www.youtube.com/embed/SaOwutdzd24?si=3PT3pxomWpInRzRi&amp;controls=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </main>
      </section>
      <PackagesList />
    </>
  )
}
