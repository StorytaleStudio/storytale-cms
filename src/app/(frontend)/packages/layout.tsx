import styles from './package.module.css'

export default function PackageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.page}>
      <aside className={styles.aside}>
        List of the stories with filteration for musings and blog posts and zines
        <div>
          <h2>Stories</h2>
        </div>
      </aside>
      <main className={styles.storiesMain}>{children}</main>
    </div>
  )
}
