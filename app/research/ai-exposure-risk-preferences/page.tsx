import type { Metadata } from "next";
import Link from "next/link";
import {
  SubpageFooter,
  SubpageHeader,
} from "@/components/research/SubpageChrome";
import { featuredStudy } from "@/content/research";
import styles from "./StudyPage.module.css";

export const metadata: Metadata = {
  title: "How AI Exposure Alters Risk Preferences and Advisory Behavior",
  description:
    "A randomized experiment separating AI-driven changes in financial decision capacity from changes in underlying risk preferences.",
};

function Arrow() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M3 9h11M10 4l5 5-5 5" />
    </svg>
  );
}

export default function StudyPage() {
  return (
    <>
      <SubpageHeader active="research" />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.breadcrumb}>
            <Link href="/research">Research</Link>
            <span>/</span>
            <span>Study 01</span>
          </div>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <div className={styles.status}>
                <i />
                {featuredStudy.status} · {featuredStudy.year}
              </div>
              <h1>{featuredStudy.title}</h1>
              <p>{featuredStudy.authors?.join(" · ")}</p>
            </div>

            <div className={styles.heroSummary}>
              <span>In one minute</span>
              <p>
                If AI changes a portfolio, did it improve the investor&apos;s
                decision—or change how much risk the investor wanted?
              </p>
              <p>
                Our randomized experiment separates these possibilities by
                observing people choosing for themselves, advising clients with
                known objectives, and choosing again after AI is removed.
              </p>
            </div>
          </div>

          <div className={styles.heroSignal} aria-hidden="true">
            <span>Decision capacity</span>
            <span>AI exposure</span>
            <span>Risk preferences</span>
            <i />
            <i />
            <i />
          </div>

          <div className={styles.heroFooter}>
            <span>Randomized experiment</span>
            <i />
            <span>Portfolio choice · Financial advice · Persistence</span>
          </div>
        </section>

        <nav className={styles.studyNav} aria-label="Study sections">
          <span>Study 01</span>
          <div>
            <a href="#overview">Overview</a>
            <a href="#design">Design</a>
            <a href="#findings">Findings</a>
            <a href="#experiment">Experiment</a>
            <a href="#materials">Materials</a>
          </div>
        </nav>

        <section className={styles.overview} id="overview">
          <div className={styles.sectionNumber}>01</div>
          <div className={styles.sectionTitle}>
            <p>Overview</p>
            <h2>
              Better choices—or
              <em>different preferences?</em>
            </h2>
          </div>
          <div className={styles.overviewCopy}>
            <p className={styles.lead}>
              AI can change a financial decision for at least two very
              different reasons.
            </p>
            <p>
              It may expand a person&apos;s capacity to evaluate a complex
              choice. Or it may alter the objective itself—for example, how
              much risk that person wants to bear. Observing only a final
              portfolio cannot distinguish between those mechanisms.
            </p>
            <p>
              The experiment introduces decisions for clients whose risk
              preferences are fixed by design. Advice quality can therefore be
              evaluated against a known objective, giving us a direct measure
              of decision capacity.
            </p>
          </div>
          <aside className={styles.question}>
            <span>Research question</span>
            <blockquote>
              Does exposure to AI improve the translation of objectives into
              financial choices, alter underlying preferences, or do both?
            </blockquote>
          </aside>
        </section>

        <section className={styles.design} id="design">
          <div className={styles.designHeading}>
            <div>
              <p>Experimental design</p>
              <h2>Observe behavior before, during, and after AI.</h2>
            </div>
            <p>
              The sequence lets the study compare own choices with advice for
              known objectives and then test whether any change remains after
              assistance ends.
            </p>
          </div>

          <div className={styles.timeline}>
            <article>
              <div>
                <span>Part 1</span>
                <small>8 rounds</small>
              </div>
              <h3>Choose for yourself.</h3>
              <p>
                Build a $1,000 portfolio as the risky asset&apos;s return and
                variability change.
              </p>
              <ul>
                <li>Rounds 1–4: everyone unaided</li>
                <li>Rounds 5–8: AI for treatment</li>
              </ul>
            </article>
            <article className={styles.aiPhase}>
              <div>
                <span>Part 2</span>
                <small>12 rounds</small>
              </div>
              <h3>Advise a client.</h3>
              <p>
                Recommend portfolios for three clients with experimentally
                specified risk preferences.
              </p>
              <ul>
                <li>Known objective for each client</li>
                <li>AI remains available to treatment</li>
              </ul>
            </article>
            <article>
              <div>
                <span>Part 3</span>
                <small>4 rounds</small>
              </div>
              <h3>Return without AI.</h3>
              <p>
                Make additional choices for yourself after the assistant is
                removed for everyone.
              </p>
              <ul>
                <li>Same portfolio environment</li>
                <li>Measures persistence</li>
              </ul>
            </article>
          </div>
          <div className={styles.treatmentWindow}>
            <span>AI available to treatment group</span>
            <i />
          </div>
        </section>

        <section className={styles.findings} id="findings">
          <div className={styles.findingsHeading}>
            <p>What we find</p>
            <h2>
              Stronger decisions in the moment.
              <em>Limited evidence of lasting change.</em>
            </h2>
          </div>

          <div className={styles.findingsGrid}>
            <article className={styles.primaryFinding}>
              <span>−41%</span>
              <div>
                <h3>Advice error falls sharply.</h3>
                <p>
                  With client objectives held fixed, AI reduces the absolute
                  distance between recommendations and model-implied targets by
                  about $80—from $197 to $117.
                </p>
              </div>
              <div className={styles.errorBars} aria-label="Advice error comparison">
                <div>
                  <small>Control</small>
                  <i />
                  <b>$197</b>
                </div>
                <div>
                  <small>AI treatment</small>
                  <i />
                  <b>$117</b>
                </div>
              </div>
            </article>

            <article>
              <span>↗</span>
              <h3>Choices become more responsive.</h3>
              <p>
                While AI is available, treated participants respond more
                strongly as the investment environment becomes more attractive.
              </p>
            </article>
            <article>
              <span>≈</span>
              <h3>Average risk preferences do not shift.</h3>
              <p>
                Implied risk aversion remains unchanged on average; the
                evidence favors decision capacity over preference change.
              </p>
            </article>
            <article>
              <span>○</span>
              <h3>Persistence remains uncertain.</h3>
              <p>
                Once AI is removed, there is no statistically reliable
                treatment-specific persistence in participants&apos; choices.
              </p>
            </article>
          </div>
          <p className={styles.resultsNote}>
            Working-paper results shown here are preliminary and may change as
            the analysis develops.
          </p>
        </section>

        <section className={styles.experiment} id="experiment">
          <div className={styles.experimentHeading}>
            <div>
              <p>Inside the experiment</p>
              <h2>Follow the participant journey.</h2>
            </div>
            <p>
              The website walkthrough presents the instructions and decision
              sequence without collecting responses or study data.
            </p>
          </div>

          <div className={styles.walkthrough}>
            <aside>
              <span>Instruction sequence</span>
              <ol>
                <li className={styles.activeStep}>
                  <b>01</b>
                  <div>
                    <strong>Read the portfolio environment</strong>
                    <small>Return and variability change by round.</small>
                  </div>
                </li>
                <li>
                  <b>02</b>
                  <div>
                    <strong>Allocate the $1,000</strong>
                    <small>Choose between safe and risky assets.</small>
                  </div>
                </li>
                <li>
                  <b>03</b>
                  <div>
                    <strong>Consult AI when available</strong>
                    <small>Ask questions; retain the final choice.</small>
                  </div>
                </li>
                <li>
                  <b>04</b>
                  <div>
                    <strong>Advance to the next round</strong>
                    <small>Repeat across the three study parts.</small>
                  </div>
                </li>
              </ol>
              <span className={styles.walkthroughNote}>
                Interactive reconstruction planned
              </span>
            </aside>

            <figure>
              <div className={styles.imageBar}>
                <i />
                <i />
                <i />
                <span>Original study interface</span>
              </div>
              {/* The original interface image is served directly by vinext. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/research/ai-assistant.png"
                alt="AI assistant interface from the portfolio experiment"
                width="955"
                height="594"
              />
              <figcaption>
                The assistant explains the environment and checks calculations
                without making the final allocation for the participant.
              </figcaption>
            </figure>
          </div>
        </section>

        <section className={styles.materials} id="materials">
          <div>
            <p>Paper and materials</p>
            <h2>Follow the project as it develops.</h2>
          </div>
          <div className={styles.materialLinks}>
            <span>
              <small>Working paper</small>
              <strong>Draft forthcoming</strong>
            </span>
            <span>
              <small>Experiment materials</small>
              <strong>Documentation in preparation</strong>
            </span>
            <a href="mailto:arman.goudarzi@eccles.utah.edu">
              <small>Questions or collaboration</small>
              <strong>
                Contact the research team <Arrow />
              </strong>
            </a>
          </div>
        </section>
      </main>
      <SubpageFooter />
    </>
  );
}
