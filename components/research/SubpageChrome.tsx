import Link from "next/link";
import styles from "./SubpageChrome.module.css";

function Arrow() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M3 9h11M10 4l5 5-5 5" />
    </svg>
  );
}

export function SubpageHeader({ active }: { active?: "research" }) {
  return (
    <header className={styles.header}>
      <Link className={styles.wordmark} href="/" aria-label="Human–AI Finance Lab home">
        <span className={styles.symbol}>
          <i>H</i>
          <i>AI</i>
        </span>
        <span>
          Human–AI
          <small>Finance Lab</small>
        </span>
      </Link>
      <nav aria-label="Primary navigation">
        <Link href="/#team">Team</Link>
        <Link
          className={active === "research" ? styles.active : undefined}
          href="/research"
        >
          Research
        </Link>
      </nav>
      <a className={styles.contact} href="mailto:arman.goudarzi@eccles.utah.edu">
        Contact <Arrow />
      </a>
    </header>
  );
}

export function SubpageFooter() {
  return (
    <footer className={styles.footer}>
      <Link className={styles.wordmark} href="/">
        <span className={styles.symbol}>
          <i>H</i>
          <i>AI</i>
        </span>
        <span>
          Human–AI
          <small>Finance Lab</small>
        </span>
      </Link>
      <p>
        Experimental research on human judgment and artificial intelligence in
        finance.
      </p>
      <div>
        <Link href="/research">Research</Link>
        <Link href="/#team">Team</Link>
        <a href="mailto:arman.goudarzi@eccles.utah.edu">Contact</a>
      </div>
      <small>© 2026 Human–AI Finance Lab</small>
    </footer>
  );
}
