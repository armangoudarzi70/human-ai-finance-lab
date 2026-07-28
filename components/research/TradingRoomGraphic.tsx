import styles from "./ResearchPreview.module.css";

const bids = [
  ["52.72", "84"],
  ["52.68", "116"],
  ["52.61", "73"],
];

const asks = [
  ["52.91", "62"],
  ["52.96", "108"],
  ["53.04", "91"],
];

export default function TradingRoomGraphic() {
  return (
    <div
      className={styles.tradingRoom}
      role="img"
      aria-label="Illustrative experimental trading room showing human orders and an AI signal"
    >
      <div aria-hidden="true">
        <div className={styles.marketHeader}>
          <span>Experimental market · Room 02</span>
          <b>
            <i />
            Live session
          </b>
        </div>

        <div className={styles.marketBody}>
          <section className={styles.priceScreen}>
            <div className={styles.priceMeta}>
              <span>Market price</span>
              <strong>
                $52.84 <small>+1.8%</small>
              </strong>
            </div>
            <svg viewBox="0 0 520 250">
              <defs>
                <linearGradient id="tradingArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4bcabb" stopOpacity=".24" />
                  <stop offset="100%" stopColor="#4bcabb" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="tradingSignal" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#efaa58" />
                  <stop offset="55%" stopColor="#4bcabb" />
                  <stop offset="100%" stopColor="#6b8ff2" />
                </linearGradient>
              </defs>
              <g className={styles.marketGrid}>
                <path d="M24 36H500M24 86H500M24 136H500M24 186H500M24 236H500" />
                <path d="M24 20V236M119 20V236M214 20V236M309 20V236M404 20V236M500 20V236" />
              </g>
              <path
                className={styles.marketArea}
                d="M24 206L72 193L119 201L167 169L214 176L262 142L309 151L357 111L404 124L452 80L500 61V236H24Z"
              />
              <path
                className={styles.marketLine}
                d="M24 206L72 193L119 201L167 169L214 176L262 142L309 151L357 111L404 124L452 80L500 61"
              />
              <path
                className={styles.aiSignalLine}
                d="M55 218C127 183 172 213 233 163C298 110 345 154 412 90C448 56 474 49 500 43"
              />
              <g className={styles.humanOrders}>
                <circle cx="119" cy="201" r="6" />
                <circle cx="214" cy="176" r="6" />
                <circle cx="309" cy="151" r="6" />
                <circle cx="404" cy="124" r="6" />
              </g>
              <g className={styles.aiNode}>
                <circle cx="412" cy="90" r="13" />
                <text x="412" y="93">AI</text>
              </g>
            </svg>
            <div className={styles.marketLegend}>
              <span>
                <i />
                Human order
              </span>
              <span>
                <i />
                AI signal
              </span>
            </div>
          </section>

          <aside className={styles.orderBook}>
            <div className={styles.bookHeading}>
              <span>Order book</span>
              <small>Price · Qty</small>
            </div>
            <div className={styles.asks}>
              {asks.map(([price, quantity]) => (
                <div key={price}>
                  <span>{price}</span>
                  <b>{quantity}</b>
                </div>
              ))}
            </div>
            <div className={styles.spread}>
              <span>Spread</span>
              <b>$0.19</b>
            </div>
            <div className={styles.bids}>
              {bids.map(([price, quantity]) => (
                <div key={price}>
                  <span>{price}</span>
                  <b>{quantity}</b>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div className={styles.advisorDock}>
          <span className={styles.humanBadge}>H</span>
          <div>
            <small>Human trader</small>
            <p>Interprets the signal and keeps the final order decision.</p>
          </div>
          <i className={styles.dockPath} />
          <span className={styles.aiBadge}>AI</span>
        </div>

        <div className={styles.conceptLabel}>
          Conceptual interface · Illustrative, not study data
        </div>
      </div>
    </div>
  );
}
