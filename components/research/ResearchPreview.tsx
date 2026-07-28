import Link from "next/link";
import {
  featuredStudy,
  researchStudies,
  studyHref,
  type ResearchStudy,
} from "@/content/research";
import styles from "./ResearchPreview.module.css";

function Arrow() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M3 9h11M10 4l5 5-5 5" />
    </svg>
  );
}

function Status({ study }: { study: ResearchStudy }) {
  return (
    <span className={`${styles.status} ${styles[study.tone]}`}>
      <i />
      {study.status}
    </span>
  );
}

export default function ResearchPreview() {
  const supportingStudies = researchStudies.slice(1);

  return (
    <section className={styles.section} id="research">
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>Our research</p>
          <h2>
            One question at a time.
            <em>One page for every study.</em>
          </h2>
        </div>
        <div className={styles.intro}>
          <p>
            We study how artificial intelligence changes financial judgment,
            advice, learning, and market behavior.
          </p>
          <Link href="/research">
            View all research <Arrow />
          </Link>
        </div>
      </div>

      <Link
        className={styles.featured}
        href={studyHref(featuredStudy) ?? "/research"}
        aria-label={`Open study: ${featuredStudy.title}`}
      >
        <div className={styles.featuredCopy}>
          <div className={styles.cardTop}>
            <span>{featuredStudy.number}</span>
            <Status study={featuredStudy} />
          </div>
          <h3>{featuredStudy.title}</h3>
          <p>{featuredStudy.summary}</p>
          <div className={styles.tags}>
            {featuredStudy.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <span className={styles.openStudy}>
            Open the study <Arrow />
          </span>
        </div>

        <div className={styles.signalMap} aria-hidden="true">
          <span className={styles.signalLabel}>AI exposure</span>
          <div className={styles.ringOne} />
          <div className={styles.ringTwo} />
          <div className={styles.signalPath} />
          <i className={styles.nodeOne} />
          <i className={styles.nodeTwo} />
          <i className={styles.nodeThree} />
          <i className={styles.nodeFour} />
          <small>Human judgment</small>
        </div>
      </Link>

      <div className={styles.supportingGrid}>
        {supportingStudies.map((study) => (
          <article key={study.number} className={styles.supportingCard}>
            <div className={styles.cardTop}>
              <span>{study.number}</span>
              <Status study={study} />
            </div>
            <h3>{study.title}</h3>
            <p>{study.summary}</p>
            <div className={styles.tags}>
              {study.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <span className={styles.forthcoming}>
              Dedicated study page forthcoming
            </span>
          </article>
        ))}
        <Link className={styles.programCard} href="/research">
          <span>Research program</span>
          <strong>
            Explore the complete portfolio and future studies.
          </strong>
          <i>
            View research <Arrow />
          </i>
        </Link>
      </div>
    </section>
  );
}
