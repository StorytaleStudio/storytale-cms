import styles from './page.module.css'
import ScrollFade from 'components/TextScrollFade'
import PackagesList from 'components/PackagesList'
import VideoSection from 'components/videoSection'
import TimeBasedGradient from 'components/betterBackground'

export default function Home() {
  return (
    <>
      <section data-section="default" data-background="dark" className={styles.page}>
        {/* <FantasyBackground darkMode={false} /> */}
        <aside className={styles.aside}>
          <ScrollFade>
            <h1>
              <span className={styles.textHighlight}>We partner with ambitious founders</span>
              <br />
              with the insatiable desire to build something that matters.
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
        <TimeBasedGradient />
      </section>
      <VideoSection />
      <PackagesList />
    </>
  )
}
