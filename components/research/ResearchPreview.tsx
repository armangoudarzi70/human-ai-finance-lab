import Link from "next/link";
import {
  featuredStudy,
  researchStudies,
  studyHref,
  type ResearchStudy,
} from "@/content/research";
import ResearchResultCarousel from "./ResearchResultCarousel";
import TradingRoomGraphic from "./TradingRoomGraphic";
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
  const tradingStudy = researchStudies[1];
  const supportingStudies = researchStudies.slice(2);

  return (
    <section className={styles.section} id="research">
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>Research program</p>
          <h2>Our research.</h2>
        </div>
        <div className={styles.intro}>
          <p>
            We study how artificial intelligence changes financial judgment,
            advice, learning, and market behavior.
          </p>
          <div className={styles.introLinks}>
            <a
              href={featuredStudy.ssrnUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Featured paper on SSRN <Arrow />
            </a>
            <Link href="/research">
              View all research <Arrow />
            </Link>
          </div>
        </div>
      </div>

      <article className={styles.featured}>
        <Link
          className={styles.featuredCopy}
          href={studyHref(featuredStudy) ?? "/research"}
          aria-label={`Open study: ${featuredStudy.title}`}
        >
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
        </Link>
        <ResearchResultCarousel />
      </article>

      <article className={`${styles.featured} ${styles.tradingFeatured}`}>
        <div className={styles.featuredCopy}>
          <div className={styles.cardTop}>
            <span>{tradingStudy.number}</span>
            <Status study={tradingStudy} />
          </div>
          <h3>{tradingStudy.title}</h3>
          <p>{tradingStudy.summary}</p>
          <div className={styles.tags}>
            {tradingStudy.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <span className={styles.tradingNote}>
            Dedicated study page in development
          </span>
        </div>
        <TradingRoomGraphic />
      </article>

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
