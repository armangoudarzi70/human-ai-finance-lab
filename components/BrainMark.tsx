// Logo mark: a simplified side-view brain split into exact halves — the human
// hemisphere (H) and the artificial one (AI). Styled by the global
// .wordmark-brain rules so header, footer, and subpage chrome stay in sync.
export default function BrainMark() {
  return (
    <svg className="wordmark-brain" viewBox="0 0 48 42" aria-hidden="true">
      <path
        className="wordmark-brain-shell"
        d="M4 23C2.8 19.5 3.2 16 5.2 13C4.6 11.6 5 10 6.4 9C8.4 6.4 11.2 4.4 14.4 3.4C15 2 16.2 1.2 17.8 1.4C21 0.6 24.4 0.8 27.4 2C28.6 1 30.2 1.2 31.2 2.4C34.4 3.8 37.2 6 39.2 8.8C40.6 9 41.6 10 41.8 11.4C43.2 14 43.8 17 43.4 20C44.2 21.4 44.2 23 43.2 24.2C41.4 26.8 38.8 28.6 35.8 29.4C35 31.6 34.2 33.4 32.6 35C31.8 35.8 31.2 36.8 31 37.8C29.8 38.6 28.6 38.4 27.8 37.4C27.9 36.4 28.2 35.4 28.8 34.4C29.6 33 30.4 31.6 30.8 30C29.2 30.4 27.6 30.4 26 30.2C24 32 21.6 33 19 32.8C16.4 32.6 14 31.4 12.2 29.4C11.4 28.4 10.9 27.2 10.8 26C9 25.6 7.2 24.8 5.8 23.6C5.2 23.2 4.6 23 4 23Z"
      />
      <path className="wordmark-brain-split" d="M24 2L24 31" />
      <text x="13.5" y="18">H</text>
      <text x="33.5" y="18">AI</text>
    </svg>
  );
}
