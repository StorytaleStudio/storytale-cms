import ScrollFade from 'components/TextScrollFade'
import styles from '../page.module.css'

export default function About() {
  return (
    <div data-section="dark" data-background="light" className={styles.page}>
      <aside className={styles.aside}>
        <div className={styles.aboutTop}>
          <ScrollFade>
            <h1>The Studio</h1>
            <p>
              Storytale is built on the core belief that great stories spur people to action and
              sets hearts ablaze.
            </p>
            <p>
              Founded by two friends, united in the crucible of start-ups and tabletop roleplaying.
            </p>
          </ScrollFade>
        </div>
        <div>
          <ScrollFade>
            <h2>About</h2>
          </ScrollFade>
        </div>
      </aside>
      <main className={styles.main}>
        <div>About</div>
      </main>
    </div>
  )
}
