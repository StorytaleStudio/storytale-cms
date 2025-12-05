import styles from './style/videosection.module.css'

export default function VideoSection() {
  return (
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
  )
}
