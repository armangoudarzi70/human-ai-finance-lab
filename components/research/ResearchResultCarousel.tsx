"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./ResearchPreview.module.css";

const results = [
  {
    tab: "Part 1",
    title: "Own portfolio choices",
    image: "/research/results/part1-allocation-fitted.png",
    alt: "Fitted risky-allocation trends before AI and while AI was available, shown separately for control and treatment groups",
    finding:
      "With AI available, portfolio choices become more responsive to investment attractiveness.",
    href: "/research/ai-exposure-risk-preferences#findings",
  },
  {
    tab: "Part 2",
    title: "Overall advice error",
    image: "/research/results/part2-advice-error.png",
    alt: "Bar chart showing average absolute advice error of 197 dollars for control and 117 dollars for treatment",
    finding:
      "AI lowers average absolute advice error from $197 to $117—a 41% reduction.",
    href: "/research/ai-exposure-risk-preferences#findings",
  },
  {
    tab: "Part 2",
    title: "Advice by client",
    image: "/research/results/part2-client-advice-error.png",
    alt: "Grouped bar chart comparing control and treatment advice error for comfortable, moderate, and cautious client risk profiles",
    finding:
      "Advice error falls across all three client profiles: 40% for comfortable, 46% for moderate, and 34% for cautious.",
    href: "/research/ai-exposure-risk-preferences#findings",
  },
  {
    tab: "AI use",
    title: "Typed messages",
    image: "/research/results/typed-message-categories.png",
    alt: "Stacked bars comparing typed-message categories in Parts 1 and 2 of the experiment",
    finding:
      "Participant questions shift toward client-specific context in the advisory task.",
    href: "/research/ai-exposure-risk-preferences#experiment",
  },
];

export default function ResearchResultCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % results.length);
    }, 2000);

    return () => window.clearInterval(timer);
  }, [paused]);

  const result = results[active];

  return (
    <div
      className={styles.resultsPanel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false);
        }
      }}
    >
      <div className={styles.figureTabs} role="tablist" aria-label="Study results">
        {results.map((item, index) => (
          <button
            className={index === active ? styles.activeTab : undefined}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-controls="featured-result-figure"
            key={`${item.tab}-${item.title}`}
            onClick={() => setActive(index)}
          >
            <span>{item.tab}</span>
            {item.title}
          </button>
        ))}
      </div>

      <figure
        className={styles.figureSlide}
        id="featured-result-figure"
        key={`${result.tab}-${result.title}`}
        role="tabpanel"
      >
        <Link
          className={styles.figureLink}
          href={result.href}
          aria-label={`Open this paper: ${result.title}`}
        >
          <div className={styles.figureCanvas}>
            {/* These are the exact figures used in the paper draft. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={result.image} alt={result.alt} />
          </div>
          <div className={styles.figureCaption}>
            <span>Open in paper</span>
            <strong>{result.finding}</strong>
          </div>
        </Link>
      </figure>

      <div className={styles.figureProgress} aria-hidden="true">
        {results.map((item, index) => (
          <i
            className={index === active ? styles.activeProgress : undefined}
            key={`${item.tab}-${item.title}`}
          />
        ))}
      </div>
    </div>
  );
}
