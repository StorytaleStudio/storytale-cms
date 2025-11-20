import styles from "../page.module.css";

export default function Contact() {
    return (
    <div className={styles.page}>
              <aside className={styles.aside}>
        <h1>
          Let&apos;s Chat
        </h1>
        <div>
          <h2>
            {/* <span>Creating Legends for</span> */}
            Contact
          </h2>
        </div>
      </aside>
        <main className={styles.main}>
            <div>Contact</div>
        </main>
    </div>
    )
}