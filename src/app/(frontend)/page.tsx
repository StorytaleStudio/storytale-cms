import styles from './page.module.css'
import ScrollFade from 'components/TextScrollFade'
import PackagesList from 'components/PackagesList'
import VideoSection from 'components/videoSection'

export default function Home() {
  return (
    <>
      <section data-section="default" data-background="dark" className={styles.page}>
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
      <VideoSection />
      <PackagesList />
    </>
  )
}
