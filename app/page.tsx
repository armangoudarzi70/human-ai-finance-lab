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

// Side-view human brain facing left (the AI signal enters through the frontal
// lobe): scalloped cortex silhouette with the temporal lobe folded into the
// outline, plus a striated cerebellum tucked under the occipital lobe and a
// brain stem between them.
const CEREBRUM_PATH =
  "M190 296C181 277 182 259 190 243C185 237 184 229 189 222C194 205 203 189 216 175C212 168 212 160 217 154C228 139 242 126 258 116C257 108 260 101 267 97C283 87 301 80 320 77C323 70 329 66 337 66C356 63 375 63 393 67C398 62 406 61 413 65C431 69 448 75 464 84C468 79 476 79 482 84C500 93 516 105 529 119C536 117 543 120 547 126C562 141 574 158 583 177C590 178 595 183 597 190C605 207 610 225 612 244C617 249 619 256 618 263C617 279 613 294 605 307C606 315 603 322 597 327C588 337 577 344 565 348C559 353 551 355 544 353C531 354 519 352 508 347C500 351 494 357 490 365C483 379 473 391 461 400C458 407 452 411 445 411C429 417 412 419 396 417C391 421 384 422 378 419C360 415 344 407 331 395C324 388 319 379 317 370C312 363 306 358 298 356C303 349 306 342 312 337C306 333 299 332 292 334C275 331 258 326 243 318C233 313 222 307 213 300C204 296 195 297 190 296Z";
const CEREBELLUM_PATH =
  "M483 366C486 353 496 345 509 341C530 335 554 334 576 339C594 343 609 352 617 365C624 377 624 391 617 402C611 413 601 421 589 427C585 432 578 434 572 431C559 437 545 439 532 437C526 440 519 440 514 436C502 431 493 423 487 412C482 403 480 392 481 382C481 376 482 370 483 366Z";

function NeuralBrainGraphic() {
  return (
    <div className="neural-graphic" aria-hidden="true">
      <div className="neural-grid" />
      <div className="brain-aura brain-aura-two" />
      <svg className="brain-map" viewBox="40 45 620 525">
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
            <path d={CEREBRUM_PATH} />
            <path d={CEREBELLUM_PATH} />
          </clipPath>
        </defs>

        <path className="brain-shell-fill" d={CEREBRUM_PATH} />
        <path className="brain-shell-fill" d={CEREBELLUM_PATH} />
        <g className="brain-outline">
          <path d={CEREBRUM_PATH} />
          <path d={CEREBELLUM_PATH} />
          <path d="M452 404C446 421 435 436 419 448C408 457 401 468 398 481C408 490 424 492 437 484C439 471 445 461 455 453C470 441 481 427 488 411" />
          <path d="M310 340C330 334 350 330 370 328C382 327 394 325 406 321C426 315 446 307 462 295" />
          <path d="M413 70C407 92 411 112 404 132C397 152 395 172 397 191C398 205 395 218 389 230" />
          <path d="M498 362C526 353 560 352 590 360" />
          <path d="M492 380C524 370 564 369 600 378" />
          <path d="M496 398C528 388 568 387 598 396" />
          <path d="M506 416C534 407 566 406 590 414" />
        </g>

        <g className="brain-gyri" clipPath="url(#brainClip)">
          <path d="M214 240C232 222 258 218 276 232C290 243 290 262 276 272C262 282 242 278 232 292C224 303 228 316 240 322" />
          <path d="M254 160C274 142 300 142 316 156C328 167 326 186 312 196C300 205 282 202 274 214" />
          <path d="M200 282C216 270 236 272 248 286C256 296 254 310 244 316" />
          <path d="M296 96C282 110 280 128 292 140C302 150 318 150 326 140" />
          <path d="M226 196C240 186 258 188 268 200" />
          <path d="M208 322C224 314 242 318 252 330" />
          <path d="M348 84C330 100 328 122 344 136C358 148 380 144 392 158C404 170 402 190 388 200" />
          <path d="M420 76C436 88 440 108 428 122C418 134 400 136 392 126" />
          <path d="M452 96C470 86 492 90 504 106C514 119 510 138 496 146" />
          <path d="M428 158C448 148 470 152 482 168C492 181 488 200 474 208" />
          <path d="M372 216C390 206 410 210 422 224C430 234 428 248 418 256" />
          <path d="M500 170C514 182 516 202 504 214" />
          <path d="M540 148C558 160 562 180 550 194C540 206 522 208 512 222" />
          <path d="M578 200C562 208 554 224 560 240C566 254 582 260 582 274" />
          <path d="M596 254C580 252 566 262 562 278C559 292 568 304 582 306" />
          <path d="M540 300C556 292 574 296 584 310" />
          <path d="M512 260C528 252 546 256 556 270" />
          <path d="M322 356C342 342 368 342 386 354C398 362 400 378 390 388" />
          <path d="M336 396C354 384 376 384 392 394" />
          <path d="M410 358C428 346 450 348 464 362C472 370 472 382 464 390" />
          <path d="M306 328C322 318 342 316 358 324" />
          <path d="M342 258C362 246 386 248 402 262C412 271 412 286 402 294" />
          <path d="M436 288C456 278 478 282 492 296C500 304 500 316 492 324" />
          <path d="M322 292C338 282 358 284 370 296" />
          <path d="M476 318C492 308 512 310 524 322" />
          <path d="M356 118C374 106 396 108 410 122" />
        </g>

        <g className="neural-fade" clipPath="url(#brainClip)">
          <path d="M205 292C240 258 268 296 304 268C340 240 368 276 404 252C440 228 470 262 506 242C534 227 566 240 596 232" />
          <path d="M214 322C252 346 284 306 320 322C358 338 388 300 424 314C458 327 490 296 524 308C552 318 578 300 602 282" />
          <path d="M232 200C262 178 288 202 318 190C350 177 372 200 402 190C434 179 458 198 488 188C514 179 540 190 562 206" />
          <path d="M258 148C288 128 316 146 344 132C372 118 400 136 428 124C456 112 486 128 512 146" />
          <path d="M300 372C330 352 360 366 390 356C418 347 444 360 466 378" />
          <path d="M500 358C528 348 558 350 586 362C604 370 616 384 618 400" />
          <path d="M510 420C536 408 566 406 592 416" />
          <path d="M330 100C356 88 384 94 408 108" />
          <path d="M552 250C576 260 592 278 598 300" />
          <path d="M214 258C244 240 268 258 296 246" />
        </g>

        <g className="neural-secondary" clipPath="url(#brainClip)">
          <path d="M220 236C258 218 288 238 322 222C356 206 386 224 418 210C450 196 480 212 510 200" />
          <path d="M240 300C274 316 306 288 340 300C374 312 404 286 436 296C468 306 498 284 528 292" />
          <path d="M296 138C326 122 356 134 384 122C412 110 442 122 470 112" />
          <path d="M320 396C348 380 378 388 404 378C428 369 452 378 472 392" />
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
            <svg className="ai-core" viewBox="0 0 40 40" aria-hidden="true">
              <g className="ai-core-links">
                <path d="M8 10L20 14M8 20L20 14M8 30L20 14M8 10L20 26M8 20L20 26M8 30L20 26M20 14L32 20M20 26L32 20" />
              </g>
              <g className="ai-core-nodes">
                <circle cx="8" cy="10" r="2.4" />
                <circle cx="8" cy="20" r="2.4" />
                <circle cx="8" cy="30" r="2.4" />
                <circle cx="20" cy="14" r="2.4" />
                <circle cx="20" cy="26" r="2.4" />
                <circle className="ai-core-out" cx="32" cy="20" r="3.2" />
              </g>
            </svg>
          </i>
        </div>
        <div>
          <strong>AI signal</strong>
        </div>
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
              <a
                className="about-portrait"
                href="https://www.nathanseegert.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Visit Nathan Seegert’s website"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/team/nathan-seegert.jpg"
                  alt="Nathan Seegert"
                  width="1024"
                  height="1536"
                  loading="lazy"
                />
                <span>Finance · Public economics · Website ↗</span>
              </a>
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
