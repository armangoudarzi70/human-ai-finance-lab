import type { Metadata } from "next";
import Link from "next/link";
import {
  SubpageFooter,
  SubpageHeader,
} from "@/components/research/SubpageChrome";
import { researchStudies, studyHref } from "@/content/research";
import styles from "./ResearchIndex.module.css";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research from the Human–AI Finance Lab on financial judgment, advice, markets, and accountable AI.",
};

function Arrow() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M3 9h11M10 4l5 5-5 5" />
    </svg>
  );
}

export default function ResearchIndexPage() {
  return (
    <>
      <SubpageHeader active="research" />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p>Human–AI Finance Lab · Research portfolio</p>
            <h1>
              Questions that begin with people—
              <em>not models.</em>
            </h1>
            <span>
              We use controlled experiments to identify when AI improves
              financial decisions, when it changes behavior, and what remains
              after support ends.
            </span>
          </div>
          <div className={styles.heroMap} aria-hidden="true">
            <span className={styles.axisLabel}>Human objective</span>
            <span className={styles.axisLabel}>AI system</span>
            <span className={styles.axisLabel}>Observed choice</span>
            <i className={styles.mapNodeOne} />
            <i className={styles.mapNodeTwo} />
            <i className={styles.mapNodeThree} />
            <i className={styles.mapNodeFour} />
          </div>
          <div className={styles.heroFooter}>
            <span>{researchStudies.length.toString().padStart(2, "0")} current directions</span>
            <i />
            <span>Finance · Economics · Human–AI interaction</span>
          </div>
        </section>

        <section className={styles.collection}>
          <div className={styles.collectionHeading}>
            <p>Research portfolio</p>
            <h2>Studies, working papers, and research directions.</h2>
            <span>
              Every active study receives a dedicated page for its question,
              design, evidence, and materials.
            </span>
          </div>

          <div className={styles.grid}>
            {researchStudies.map((study) => {
              const href = studyHref(study);
              const body = (
                <>
                  <div className={styles.cardTop}>
                    <span>{study.number}</span>
                    <span className={`${styles.status} ${styles[study.tone]}`}>
                      <i />
                      {study.status}
                    </span>
                  </div>
                  <h3>{study.title}</h3>
                  <p>{study.summary}</p>
                  <div className={styles.tags}>
                    {study.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  {href ? (
                    <span className={styles.cardAction}>
                      Open study <Arrow />
                    </span>
                  ) : (
                    <span className={styles.forthcoming}>
                      Dedicated page forthcoming
                    </span>
                  )}
                </>
              );

              return href ? (
                <Link
                  className={`${styles.card} ${styles.clickable}`}
                  href={href}
                  key={study.number}
                  aria-label={`Open study: ${study.title}`}
                >
                  {body}
                </Link>
              ) : (
                <article className={styles.card} key={study.number}>
                  {body}
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.program}>
          <p>Our approach</p>
          <h2>
            Separate what AI changes
            <em>from why it changes.</em>
          </h2>
          <div>
            <article>
              <span>01</span>
              <h3>Controlled objectives</h3>
              <p>
                Hold goals fixed when the mechanism—not only the final
                decision—is the object of study.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Behavior over time</h3>
              <p>
                Observe choices before, during, and after access to intelligent
                assistance.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Human agency</h3>
              <p>
                Design support that clarifies the decision while leaving the
                final judgment with the person.
              </p>
            </article>
          </div>
        </section>
      </main>
      <SubpageFooter />
    </>
  );
}
