"use client";

import { useMemo, useState } from "react";

type Phase = "part1" | "part2" | "part3";
type Condition = "treatment" | "control";
type ClientKey = "alex" | "riley" | "jamie";

const environments = [
  { mean: 1.05, sigma: 0.35, label: "Lower return · lower variability" },
  { mean: 1.1, sigma: 0.35, label: "Higher return · lower variability" },
  { mean: 1.15, sigma: 0.5, label: "Higher return · higher variability" },
  { mean: 1.2, sigma: 0.5, label: "Highest return · higher variability" },
];

const clients: Record<
  ClientKey,
  { name: string; posture: string; gamma: number; color: string }
> = {
  alex: {
    name: "Alex",
    posture: "Comfortable with risk",
    gamma: 0.73,
    color: "orange",
  },
  riley: {
    name: "Riley",
    posture: "Moderate with risk",
    gamma: 1,
    color: "teal",
  },
  jamie: {
    name: "Jamie",
    posture: "Cautious with risk",
    gamma: 2,
    color: "blue",
  },
};

const phaseCopy = {
  part1: {
    number: "01",
    label: "Choose for yourself",
    rounds: "8 rounds",
    title: "Build a $1,000 portfolio.",
    body: "Allocate between a risk-free asset and a risky asset as the return environment changes. Everyone begins unaided; the treatment group receives AI in rounds 5–8.",
  },
  part2: {
    number: "02",
    label: "Advise a client",
    rounds: "12 rounds",
    title: "Translate someone else’s objective.",
    body: "Recommend a portfolio for three clients with experimentally specified risk preferences. Their fixed objectives let us measure advice quality directly.",
  },
  part3: {
    number: "03",
    label: "Return without AI",
    rounds: "4 rounds",
    title: "See what remains.",
    body: "The assistant is removed and participants return to their own portfolio choices. This tests whether any improvement persists after access ends.",
  },
};

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function ArrowIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M3 9h11M10 4l5 5-5 5" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 1.8c.45 4.63 3.07 7.25 7.7 7.7-4.63.45-7.25 3.07-7.7 7.7-.45-4.63-3.07-7.25-7.7-7.7 4.63-.45 7.25-3.07 7.7-7.7Z" />
    </svg>
  );
}

function OrbitGraphic() {
  return (
    <div className="orbit-graphic" aria-hidden="true">
      <div className="orbit-grid" />
      <svg className="orbit-lines" viewBox="0 0 620 540">
        <defs>
          <linearGradient id="lineGlow" x1="0" x2="1">
            <stop offset="0%" stopColor="#f0b35a" />
            <stop offset="52%" stopColor="#64d7cc" />
            <stop offset="100%" stopColor="#6d91ff" />
          </linearGradient>
        </defs>
        <path
          className="signal-path signal-path-a"
          d="M88 387 C176 355 192 190 306 232 C407 270 426 114 550 147"
        />
        <path
          className="signal-path signal-path-b"
          d="M81 416 C190 467 244 346 322 367 C411 391 449 267 559 286"
        />
        <path
          className="signal-path-main"
          d="M76 401 C168 382 206 233 307 265 C411 299 447 159 558 175"
        />
        <circle cx="76" cy="401" r="7" />
        <circle cx="307" cy="265" r="7" />
        <circle cx="558" cy="175" r="7" />
      </svg>
      <div className="orbit-node orbit-human">
        <span>Human</span>
        <strong>Judgment</strong>
      </div>
      <div className="orbit-node orbit-ai">
        <span>AI</span>
        <strong>Signal</strong>
      </div>
      <div className="orbit-node orbit-choice">
        <span>Observed</span>
        <strong>Choice</strong>
      </div>
      <div className="orbit-note note-capacity">
        <span>Decision capacity</span>
        <b>Can AI help people act on an objective?</b>
      </div>
      <div className="orbit-note note-preference">
        <span>Preferences</span>
        <b>Or does it change the objective itself?</b>
      </div>
      <div className="orbit-axis">
        <span>Information</span>
        <span>Interpretation</span>
        <span>Action</span>
      </div>
    </div>
  );
}

function ExperimentTour() {
  const [phase, setPhase] = useState<Phase>("part1");
  const [condition, setCondition] = useState<Condition>("treatment");
  const [riskyAmount, setRiskyAmount] = useState(520);
  const [environmentIndex, setEnvironmentIndex] = useState(1);
  const [clientKey, setClientKey] = useState<ClientKey>("riley");

  const environment = environments[environmentIndex];
  const client = clients[clientKey];
  const safeAmount = 1000 - riskyAmount;
  const aiAvailable =
    condition === "treatment" && (phase === "part1" || phase === "part2");

  const payoffs = useMemo(() => {
    const safePayoff = safeAmount * 1.01;
    return {
      bad: safePayoff + riskyAmount * Math.max(0, environment.mean - environment.sigma),
      typical: safePayoff + riskyAmount * environment.mean,
      good: safePayoff + riskyAmount * (environment.mean + environment.sigma),
    };
  }, [environment, riskyAmount, safeAmount]);

  const clientTarget = Math.min(
    1000,
    Math.max(
      0,
      ((environment.mean - 1.01) / (client.gamma * environment.sigma ** 2)) *
        1000,
    ),
  );

  const adviceDistance = Math.abs(riskyAmount - clientTarget);
  const copy = phaseCopy[phase];

  return (
    <div className="tour-shell">
      <div className="tour-topbar">
        <div>
          <span className="tour-kicker">Interactive study tour</span>
          <p>Explore a simplified, non-live version of the decision task.</p>
        </div>
        <div className="condition-switch" aria-label="Experiment condition">
          <button
            className={condition === "treatment" ? "is-active" : ""}
            onClick={() => setCondition("treatment")}
            aria-pressed={condition === "treatment"}
          >
            AI treatment
          </button>
          <button
            className={condition === "control" ? "is-active" : ""}
            onClick={() => setCondition("control")}
            aria-pressed={condition === "control"}
          >
            Control
          </button>
        </div>
      </div>

      <div className="tour-progress" role="tablist" aria-label="Study phases">
        {(Object.keys(phaseCopy) as Phase[]).map((key) => (
          <button
            key={key}
            role="tab"
            aria-selected={phase === key}
            aria-controls="study-phase-panel"
            className={phase === key ? "is-active" : ""}
            onClick={() => setPhase(key)}
          >
            <span>{phaseCopy[key].number}</span>
            <b>{phaseCopy[key].label}</b>
            <small>{phaseCopy[key].rounds}</small>
          </button>
        ))}
      </div>

      <div
        className="tour-workspace"
        id="study-phase-panel"
        role="tabpanel"
      >
        <aside className="tour-brief">
          <div className="phase-index">{copy.number}</div>
          <p className="eyebrow">Part {copy.number.slice(1)}</p>
          <h3>{copy.title}</h3>
          <p>{copy.body}</p>

          <div className={`ai-status ${aiAvailable ? "is-on" : ""}`}>
            <span className="status-light" />
            <div>
              <b>
                {aiAvailable
                  ? "AI assistant available"
                  : phase === "part3"
                    ? "AI removed"
                    : "No AI access"}
              </b>
              <small>
                {aiAvailable
                  ? "Calibrated, conversational, non-directive"
                  : phase === "part1" && condition === "treatment"
                    ? "Shown here as the AI-available window"
                    : "Decisions are made unaided"}
              </small>
            </div>
          </div>

          {phase === "part2" && (
            <div className="client-selector">
              <span>Choose a client</span>
              {(Object.keys(clients) as ClientKey[]).map((key) => (
                <button
                  key={key}
                  className={clientKey === key ? "is-active" : ""}
                  onClick={() => setClientKey(key)}
                  aria-pressed={clientKey === key}
                >
                  <i className={`client-dot ${clients[key].color}`} />
                  <span>
                    <b>{clients[key].name}</b>
                    <small>{clients[key].posture}</small>
                  </span>
                </button>
              ))}
            </div>
          )}
        </aside>

        <section className="decision-card" aria-label="Sample portfolio decision">
          <div className="decision-header">
            <div>
              <span>Sample decision</span>
              <h4>
                {phase === "part2"
                  ? `Recommend for ${client.name}`
                  : "Allocate your $1,000"}
              </h4>
            </div>
            <div className="round-pill">
              {phase === "part2" ? "Client round" : "Portfolio round"}
            </div>
          </div>

          <div className="environment-picker">
            <span>Investment environment</span>
            <div>
              {environments.map((item, index) => (
                <button
                  key={`${item.mean}-${item.sigma}`}
                  onClick={() => setEnvironmentIndex(index)}
                  className={environmentIndex === index ? "is-active" : ""}
                  aria-label={`Average return ${item.mean}, variability ${item.sigma}`}
                  aria-pressed={environmentIndex === index}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="environment-stats">
            <div>
              <span>Risk-free return</span>
              <strong>$1 → $1.01</strong>
            </div>
            <div>
              <span>Risky average</span>
              <strong>$1 → ${environment.mean.toFixed(2)}</strong>
            </div>
            <div>
              <span>Typical variability</span>
              <strong>{environment.sigma.toFixed(2)}</strong>
            </div>
          </div>
          <p className="environment-label">{environment.label}</p>

          <div className="allocation-display">
            <div className="allocation-amount">
              <span>Amount in risky asset</span>
              <strong>{money.format(riskyAmount)}</strong>
            </div>
            <label className="sr-only" htmlFor="risky-allocation">
              Amount allocated to risky asset
            </label>
            <input
              id="risky-allocation"
              type="range"
              min="0"
              max="1000"
              step="10"
              value={riskyAmount}
              onChange={(event) => setRiskyAmount(Number(event.target.value))}
              style={{ "--range-progress": `${riskyAmount / 10}%` } as React.CSSProperties}
            />
            <div className="allocation-split">
              <span>
                <i className="risk-dot" />
                Risky <b>{money.format(riskyAmount)}</b>
              </span>
              <span>
                <i className="safe-dot" />
                Risk-free <b>{money.format(safeAmount)}</b>
              </span>
            </div>
          </div>

          <div className="payoff-preview">
            <div>
              <span>Bad outcome</span>
              <strong>{money.format(payoffs.bad)}</strong>
            </div>
            <div className="is-typical">
              <span>Average outcome</span>
              <strong>{money.format(payoffs.typical)}</strong>
            </div>
            <div>
              <span>Good outcome</span>
              <strong>{money.format(payoffs.good)}</strong>
            </div>
          </div>

          {phase === "part2" && (
            <div className="benchmark-note">
              <div>
                <span>Hidden research benchmark</span>
                <b>{money.format(clientTarget)} risky</b>
              </div>
              <p>
                Your sample recommendation is {money.format(adviceDistance)} from
                the model-implied target. Participants never saw this target.
              </p>
            </div>
          )}
        </section>

        <aside className={`assistant-panel ${aiAvailable ? "is-on" : ""}`}>
          <div className="assistant-heading">
            <span className="assistant-mark">
              <SparkIcon />
            </span>
            <div>
              <b>AI assistant</b>
              <small>{aiAvailable ? "Ready for a question" : "Unavailable"}</small>
            </div>
          </div>

          {aiAvailable ? (
            <>
              <div className="chat-bubble">
                <span>AI</span>
                <p>
                  With {money.format(riskyAmount)} in the risky asset, the average
                  total payoff is about {money.format(payoffs.typical)}. A
                  one-variability-unit move gives a rough range from{" "}
                  {money.format(payoffs.bad)} to {money.format(payoffs.good)}.
                </p>
              </div>
              {phase === "part2" && (
                <div className="chat-bubble is-secondary">
                  <span>AI</span>
                  <p>
                    For {client.name}, this is a{" "}
                    {riskyAmount < clientTarget * 0.75
                      ? "relatively low"
                      : riskyAmount > clientTarget * 1.25
                        ? "relatively high"
                        : "moderate"}{" "}
                    risky allocation. The final recommendation is yours.
                  </p>
                </div>
              )}
              <div className="quick-prompts">
                <span>Try a quick prompt</span>
                <button>Show possible total payoffs</button>
                <button>What is special this round?</button>
              </div>
              <p className="assistant-rule">
                Explains the environment. Never chooses the allocation.
              </p>
            </>
          ) : (
            <div className="assistant-empty">
              <div className="empty-orbit">
                <span />
              </div>
              <b>
                {phase === "part3"
                  ? "The tool is gone. Does the effect remain?"
                  : "The control group sees the same task without assistance."}
              </b>
              <p>
                This contrast identifies what changes because the assistant is
                available.
              </p>
            </div>
          )}
        </aside>
      </div>

      <p className="tour-disclaimer">
        Educational reconstruction for the project website. Values update
        deterministically; no study data are collected here.
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Human–AI Finance Lab home">
          <span className="wordmark-symbol">
            <i>H</i>
            <i>AI</i>
          </span>
          <span>
            Human–AI
            <small>Finance Lab</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#paper">Research</a>
          <a href="#experiment">Experiment</a>
          <a href="#team">Team</a>
        </nav>
        <a className="header-cta" href="#paper">
          Featured study <ArrowIcon />
        </a>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero-noise" aria-hidden="true" />
          <div className="hero-content">
            <p className="eyebrow hero-eyebrow">
              Experimental research · Human judgment + artificial intelligence
            </p>
            <h1>
              Financial decisions
              <span>at the edge of intelligence.</span>
            </h1>
            <p className="hero-intro">
              We study when AI helps people make better financial decisions,
              when it changes what they want, and what—if anything—remains after
              the tool is gone.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#paper">
                Explore the research <ArrowIcon />
              </a>
              <a className="text-link" href="#experiment">
                Walk through the experiment <span>↓</span>
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <OrbitGraphic />
          </div>
          <div className="hero-footer">
            <span>Human–AI Finance Lab</span>
            <span className="hero-footer-line" />
            <span>Salt Lake City · Boston</span>
          </div>
        </section>

        <section className="signal-strip" aria-label="Featured study highlights">
          <div>
            <strong>95</strong>
            <span>participants</span>
          </div>
          <div>
            <strong>3</strong>
            <span>experimental parts</span>
          </div>
          <div>
            <strong>41%</strong>
            <span>lower advice error with AI</span>
          </div>
          <div>
            <strong>1</strong>
            <span>central question: tool or teacher?</span>
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="section-index">01</div>
          <div className="section-heading">
            <p className="eyebrow">Our focus</p>
            <h2>
              AI does not make decisions in a vacuum.
              <span>People bring objectives, uncertainty, and judgment.</span>
            </h2>
          </div>
          <div className="about-copy">
            <p className="lead">
              Human–AI Finance Lab is a research initiative for understanding
              how artificial intelligence changes financial behavior—not only
              outcomes, but the process that produces them.
            </p>
            <p>
              We use controlled experiments to separate distinct channels:
              better interpretation of complex information, changes in
              underlying preferences, misplaced confidence, and durable
              learning. The aim is practical: build evidence for AI systems that
              improve decisions without quietly replacing human objectives.
            </p>
            <div className="question-list">
              <div>
                <span>01</span>
                <p>Does AI expand decision capacity?</p>
              </div>
              <div>
                <span>02</span>
                <p>Does it alter risk preferences?</p>
              </div>
              <div>
                <span>03</span>
                <p>Does learning persist after access ends?</p>
              </div>
            </div>
          </div>
        </section>

        <section className="paper-section" id="paper">
          <div className="paper-glow" aria-hidden="true" />
          <div className="paper-meta">
            <p className="eyebrow">Featured working paper · July 2026</p>
            <span className="status-tag">Current study</span>
          </div>
          <div className="paper-grid">
            <div className="paper-title">
              <h2>How AI Exposure Alters Risk Preferences and Advisory Behavior</h2>
              <p>
                Elena Asparouhova · Arman Goudarzi · Nathan Seegert
              </p>
              <div className="paper-links">
                <a href="#findings">
                  Read the findings <ArrowIcon />
                </a>
                <a href="#experiment">
                  Explore the design <ArrowIcon />
                </a>
              </div>
            </div>
            <div className="paper-abstract">
              <span className="abstract-label">In one minute</span>
              <p>
                If AI changes a portfolio, did it improve the investor’s
                decision—or change how much risk the investor wanted? Our
                randomized experiment separates these possibilities by asking
                people to choose for themselves, advise clients with known
                objectives, and then choose again after AI is removed.
              </p>
              <p>
                The evidence points to a powerful real-time tool: AI improves
                how people translate objectives into choices while available.
                It does not reliably shift average risk preferences or leave a
                persistent treatment-specific effect once removed.
              </p>
            </div>
          </div>

          <div className="design-timeline" aria-label="Three-part experimental design">
            <div className="timeline-ai-window">
              <SparkIcon />
              AI available to treatment
            </div>
            <article>
              <span>Part 1</span>
              <strong>Own portfolio choices</strong>
              <small>Rounds 1–4: AI off</small>
              <small className="accent">Rounds 5–8: AI on for treatment</small>
            </article>
            <i className="timeline-arrow" />
            <article>
              <span>Part 2</span>
              <strong>Advice for 3 clients</strong>
              <small>12 decisions with fixed objectives</small>
              <small className="accent">AI on for treatment</small>
            </article>
            <i className="timeline-arrow" />
            <article className="is-removed">
              <span>Part 3</span>
              <strong>Own portfolio choices</strong>
              <small>4 additional decisions</small>
              <small>AI removed for everyone</small>
            </article>
          </div>
        </section>

        <section className="section findings-section" id="findings">
          <div className="section-index">02</div>
          <div className="section-heading">
            <p className="eyebrow">What we find</p>
            <h2>
              Better decisions in the moment.
              <span>Limited evidence of a lasting change.</span>
            </h2>
          </div>
          <div className="findings-grid">
            <article className="finding-primary">
              <span className="finding-number">−41%</span>
              <h3>Advice error falls sharply.</h3>
              <p>
                With client objectives held fixed, AI reduces the absolute
                distance between recommendations and model-implied targets by
                about $80—from $197 to $117.
              </p>
              <div className="mini-chart" aria-label="Advice error: control 197 dollars, treatment 117 dollars">
                <div>
                  <span>Control</span>
                  <i style={{ height: "100%" }} />
                  <b>$197</b>
                </div>
                <div>
                  <span>AI treatment</span>
                  <i className="treatment-bar" style={{ height: "59%" }} />
                  <b>$117</b>
                </div>
              </div>
            </article>
            <article>
              <span className="finding-icon">↗</span>
              <h3>Choices become more responsive.</h3>
              <p>
                While AI is available, treated participants adjust their own
                risky allocations more strongly as the investment environment
                becomes more attractive.
              </p>
              <small>Behavior changes, but own choices alone cannot reveal why.</small>
            </article>
            <article>
              <span className="finding-icon">≈</span>
              <h3>Average risk preferences do not shift.</h3>
              <p>
                Implied risk aversion is unchanged on average, and confidence
                does not broadly or robustly increase.
              </p>
              <small>The evidence favors capacity over preference change.</small>
            </article>
            <article>
              <span className="finding-icon">○</span>
              <h3>Persistence remains uncertain.</h3>
              <p>
                Once AI is removed, there is no statistically reliable
                treatment-specific persistence in participants’ own choices.
              </p>
              <small>The estimates are imprecise, so meaningful persistence is not ruled out.</small>
            </article>
          </div>
        </section>

        <section className="experiment-section" id="experiment">
          <div className="experiment-intro">
            <div>
              <p className="eyebrow">Inside the experiment</p>
              <h2>Move through the study, one decision at a time.</h2>
            </div>
            <p>
              Change the investment environment, move the allocation, switch
              between treatment and control, and see how the design isolates
              the mechanism behind AI-assisted choices.
            </p>
          </div>
          <ExperimentTour />
        </section>

        <section className="section method-section">
          <div className="section-index">03</div>
          <div className="section-heading">
            <p className="eyebrow">The AI layer</p>
            <h2>
              Helpful by design.
              <span>Constrained on purpose.</span>
            </h2>
          </div>
          <div className="method-grid">
            <div className="method-copy">
              <p className="lead">
                The assistant was calibrated to clarify the problem, not solve
                it for the participant.
              </p>
              <div className="method-principles">
                <article>
                  <span>01</span>
                  <div>
                    <h3>Non-directive</h3>
                    <p>
                      It explains returns, variability, and possible outcomes
                      but never recommends a final allocation.
                    </p>
                  </div>
                </article>
                <article>
                  <span>02</span>
                  <div>
                    <h3>Numerically checked</h3>
                    <p>
                      A deterministic server-side layer verifies payoff
                      calculations against the round’s true parameters.
                    </p>
                  </div>
                </article>
                <article>
                  <span>03</span>
                  <div>
                    <h3>Objective-aware</h3>
                    <p>
                      For client advice, it can characterize a proposed amount
                      as low, moderate, or high—without revealing the target.
                    </p>
                  </div>
                </article>
              </div>
            </div>
            <figure className="interface-figure">
              <div className="image-window">
                <div className="image-window-bar">
                  <span />
                  <span />
                  <span />
                  <b>Original study interface</b>
                </div>
                {/* vinext serves this study asset directly; no runtime image transform. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/research/ai-assistant.png"
                  alt="AI assistant interface used in the portfolio experiment"
                  width="955"
                  height="594"
                />
              </div>
              <figcaption>
                The in-task assistant offered free-form questions and calibrated
                quick prompts.
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="research-section" id="research">
          <div className="research-heading">
            <p className="eyebrow">A wider research program</p>
            <h2>From individual portfolios to financial markets.</h2>
            <p>
              The flagship study is one part of a broader agenda on how AI
              changes judgment, delegation, and market outcomes.
            </p>
          </div>
          <div className="research-list">
            <article>
              <div className="research-status">
                <span className="status-dot is-live" />
                Working paper
              </div>
              <span className="research-number">01</span>
              <h3>Risk preferences & advisory behavior</h3>
              <p>
                Separating decision capacity from preferences in AI-assisted
                portfolio choice.
              </p>
              <a href="#paper">
                View study <ArrowIcon />
              </a>
            </article>
            <article>
              <div className="research-status">
                <span className="status-dot is-progress" />
                Study in development
              </div>
              <span className="research-number">02</span>
              <h3>AI-assisted trading in experimental markets</h3>
              <p>
                Studying how AI support affects trading behavior, price
                discovery, and welfare in controlled markets.
              </p>
              <span className="muted-link">Materials forthcoming</span>
            </article>
            <article>
              <div className="research-status">
                <span className="status-dot" />
                Research direction
              </div>
              <span className="research-number">03</span>
              <h3>Designing accountable financial AI</h3>
              <p>
                Identifying interface and calibration choices that improve
                decisions while preserving human agency.
              </p>
              <span className="muted-link">Research agenda</span>
            </article>
          </div>
        </section>

        <section className="section team-section" id="team">
          <div className="section-index">04</div>
          <div className="section-heading">
            <p className="eyebrow">Research team</p>
            <h2>
              Economics, finance,
              <span>and experimental design.</span>
            </h2>
          </div>
          <div className="team-grid">
            <article>
              <span className="team-monogram">EA</span>
              <h3>Elena Asparouhova</h3>
              <p>University of Utah · Eccles School of Business</p>
              <a href="mailto:elena.asparouhova@eccles.utah.edu">
                Email <ArrowIcon />
              </a>
            </article>
            <article>
              <span className="team-monogram">AG</span>
              <h3>Arman Goudarzi</h3>
              <p>University of Utah · Eccles School of Business</p>
              <a href="mailto:arman.goudarzi@eccles.utah.edu">
                Email <ArrowIcon />
              </a>
            </article>
            <article>
              <span className="team-monogram">NS</span>
              <h3>Nathan Seegert</h3>
              <p>Northeastern University · D’Amore-McKim School of Business</p>
              <a href="mailto:n.seegert@northeastern.edu">
                Email <ArrowIcon />
              </a>
            </article>
          </div>
        </section>

        <section className="closing-section">
          <p className="eyebrow">Human–AI Finance Lab</p>
          <h2>
            Better financial intelligence begins with understanding
            <em>the human in the loop.</em>
          </h2>
          <a className="button button-light" href="mailto:arman.goudarzi@eccles.utah.edu">
            Start a conversation <ArrowIcon />
          </a>
          <div className="closing-orbit" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </section>
      </main>

      <footer>
        <a className="wordmark footer-wordmark" href="#top">
          <span className="wordmark-symbol">
            <i>H</i>
            <i>AI</i>
          </span>
          <span>
            Human–AI
            <small>Finance Lab</small>
          </span>
        </a>
        <p>
          Experimental research on human judgment and artificial intelligence
          in finance.
        </p>
        <div>
          <a href="#paper">Research</a>
          <a href="#experiment">Experiment</a>
          <a href="#team">Team</a>
        </div>
        <small>© 2026 Human–AI Finance Lab</small>
      </footer>
    </>
  );
}
