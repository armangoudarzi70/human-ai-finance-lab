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

function NeuralBrainGraphic() {
  return (
    <div className="neural-graphic" aria-hidden="true">
      <div className="neural-grid" />
      <div className="brain-aura brain-aura-one" />
      <div className="brain-aura brain-aura-two" />
      <svg className="brain-map" viewBox="0 0 720 610">
        <defs>
          <linearGradient id="neuralSignal" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f0b35a" />
            <stop offset="48%" stopColor="#64d7cc" />
            <stop offset="100%" stopColor="#7595ff" />
          </linearGradient>
          <radialGradient id="nodeGlow">
            <stop offset="0%" stopColor="#fffdf8" />
            <stop offset="38%" stopColor="#64d7cc" />
            <stop offset="100%" stopColor="#64d7cc" stopOpacity="0" />
          </radialGradient>
          <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id="brainClip">
            <path d="M248 165C251 111 304 77 354 99C390 55 466 60 496 111C553 108 593 153 583 207C626 237 623 303 577 330C583 382 536 421 489 408C454 449 385 443 359 400C309 422 254 389 254 342C209 317 203 255 238 224C225 202 229 180 248 165Z" />
          </clipPath>
        </defs>

        <g className="head-profile">
          <path d="M326 474C332 520 311 552 296 586" />
          <path d="M484 423C484 472 498 516 531 568" />
          <path d="M250 165C277 109 329 74 395 71C493 66 568 124 590 210C599 244 590 274 605 298L635 340C643 354 634 368 617 371L594 375L600 407C602 421 593 431 577 433L562 435C563 458 550 475 525 479L484 482" />
          <path d="M588 211C564 222 551 241 552 269" />
        </g>

        <g className="brain-outline">
          <path d="M248 165C251 111 304 77 354 99C390 55 466 60 496 111C553 108 593 153 583 207C626 237 623 303 577 330C583 382 536 421 489 408C454 449 385 443 359 400C309 422 254 389 254 342C209 317 203 255 238 224C225 202 229 180 248 165Z" />
          <path d="M354 99C338 130 342 159 365 181" />
          <path d="M496 111C478 133 474 157 486 179" />
          <path d="M583 207C550 202 525 215 512 240" />
          <path d="M577 330C545 308 515 309 489 329" />
          <path d="M489 408C470 381 441 368 411 376" />
          <path d="M359 400C372 366 363 337 338 315" />
          <path d="M254 342C281 330 294 307 293 278" />
          <path d="M238 224C270 230 294 218 308 193" />
        </g>

        <g className="neural-fade" clipPath="url(#brainClip)">
          <path d="M222 286C272 208 326 247 356 176C386 105 449 138 477 208C506 280 548 223 601 262" />
          <path d="M225 319C286 365 316 295 364 316C421 341 454 260 512 285C556 304 578 271 609 235" />
          <path d="M257 190C306 171 337 210 382 220C431 231 463 193 518 172C551 159 574 176 597 202" />
          <path d="M276 386C300 348 321 361 354 374C397 392 417 337 449 322C489 303 526 346 561 374" />
          <path d="M315 108C301 151 326 179 365 192C409 207 401 254 378 281C353 311 384 349 425 346C472 342 472 392 501 420" />
          <path d="M430 75C413 124 436 150 470 174C502 196 487 237 460 258C426 285 445 316 478 326" />
          <path d="M244 248C291 263 315 246 340 217" />
          <path d="M286 405C327 385 334 348 318 320" />
          <path d="M523 123C525 164 550 186 588 191" />
          <path d="M526 404C519 367 534 342 566 324" />
        </g>

        <g className="neural-secondary" clipPath="url(#brainClip)">
          <path d="M238 288C288 229 324 259 356 211C384 168 421 174 452 204C484 235 513 226 557 196" />
          <path d="M250 324C292 353 325 317 363 329C398 341 418 304 451 289C493 270 523 313 571 294" />
          <path d="M300 139C326 164 356 164 382 148C415 129 446 144 462 172" />
          <path d="M306 379C342 359 368 370 389 393C414 418 448 407 470 381" />
        </g>

        <g className="neural-signal">
          <path className="signal-entry" d="M86 304C133 304 167 301 206 292C250 282 283 264 318 246C365 221 404 244 443 261C488 280 527 250 566 213" />
          <path className="signal-branch branch-one" d="M318 246C336 206 357 180 389 154C418 130 447 139 468 166" />
          <path className="signal-branch branch-two" d="M443 261C430 300 444 326 479 342C507 354 530 373 535 401" />
          <path className="signal-branch branch-three" d="M366 229C376 270 365 302 340 326C319 346 319 371 343 394" />
        </g>

        <g className="neural-nodes">
          {[
            [206, 292],
            [258, 272],
            [318, 246],
            [366, 229],
            [389, 154],
            [443, 261],
            [468, 166],
            [479, 342],
            [535, 401],
            [340, 326],
            [343, 394],
            [566, 213],
          ].map(([cx, cy], index) => (
            <g key={`${cx}-${cy}`} className={`neural-node node-${(index % 4) + 1}`}>
              <circle className="node-halo" cx={cx} cy={cy} r="16" />
              <circle className="node-core" cx={cx} cy={cy} r="4.5" />
            </g>
          ))}
        </g>

      </svg>

      <div className="ai-source">
        <div className="ai-source-rings">
          <span />
          <span />
          <i>
            <SparkIcon />
          </i>
        </div>
        <div>
          <small>Artificial intelligence</small>
          <strong>Signal</strong>
        </div>
      </div>

      <div className="brain-label label-context">
        <span>01</span>
        <p>Context enters a human system.</p>
      </div>
      <div className="brain-label label-pathways">
        <span>02</span>
        <p>The signal moves through existing pathways.</p>
      </div>
      <div className="brain-label label-judgment">
        <span>03</span>
        <p>Human judgment remains in the loop.</p>
      </div>
      <div className="concept-note">
        Conceptual signal map
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
          <a href="#team">Team</a>
          <a href="#paper">Research</a>
          <a href="#experiment">Experiment</a>
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
          </div>
          <div className="hero-visual">
            <NeuralBrainGraphic />
          </div>
          <div className="hero-footer">
            <span>Human–AI Finance Lab</span>
            <span className="hero-footer-line" />
            <span>Salt Lake City · Boston</span>
          </div>
        </section>

        <section className="signal-strip" aria-label="Human–AI Finance Lab research lenses">
          <div>
            <strong>01</strong>
            <span>Human objectives</span>
            <small>What people are trying to achieve</small>
          </div>
          <div>
            <strong>02</strong>
            <span>AI signals</span>
            <small>What systems clarify or amplify</small>
          </div>
          <div>
            <strong>03</strong>
            <span>Financial choice</span>
            <small>How behavior changes under uncertainty</small>
          </div>
          <div>
            <strong>04</strong>
            <span>Lasting effects</span>
            <small>What remains after support ends</small>
          </div>
        </section>

        <section className="section about-section" id="team">
          <div className="section-index">01</div>
          <div className="section-heading">
            <p className="eyebrow">Research team</p>
            <h2>
              Economics, finance,
              <span>and experimental design.</span>
            </h2>
          </div>
          <div className="team-intro-note">
            <p>
              Human–AI Finance Lab is a collaboration across two business
              schools. We combine financial theory, controlled experiments, and
              AI systems design to understand decisions made with intelligent
              tools.
            </p>
          </div>
          <div className="about-people" aria-label="Human–AI Finance Lab researchers">
            <article>
              <div className="about-portrait">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/team/elena-asparouhova.webp"
                  alt="Elena Asparouhova"
                  width="452"
                  height="676"
                  loading="lazy"
                />
                <span>Finance · Experimental economics</span>
              </div>
              <div className="about-person-copy">
                <small>University of Utah</small>
                <h3>Elena Asparouhova</h3>
                <p>
                  Stena Faculty Chair and Professor of Finance at the David
                  Eccles School of Business.
                </p>
              </div>
            </article>
            <article>
              <div className="about-portrait">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/team/nathan-seegert.jpg"
                  alt="Nathan Seegert"
                  width="1024"
                  height="1536"
                  loading="lazy"
                />
                <span>Finance · Public economics</span>
              </div>
              <div className="about-person-copy">
                <small>Northeastern University</small>
                <h3>Nathan Seegert</h3>
                <p>
                  Philip R. McDonald Chair Professor of Finance in the
                  D&apos;Amore-McKim School of Business.
                </p>
              </div>
            </article>
            <article>
              <div className="about-portrait">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/team/arman-goudarzi.jpg"
                  alt="Arman Goudarzi"
                  width="600"
                  height="900"
                  loading="lazy"
                />
                <span>Finance · Human–AI interaction</span>
              </div>
              <div className="about-person-copy">
                <small>University of Utah</small>
                <h3>Arman Goudarzi</h3>
                <p>
                  PhD Candidate in Finance at the David Eccles School of
                  Business.
                </p>
              </div>
            </article>
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
