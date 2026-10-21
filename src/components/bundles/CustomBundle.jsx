import { useState } from "react";
import { usePortal } from "../../context/PortalContext";
import { money, pct } from "../../data/demoData";
import {
  largestRemainder,
  customMix,
  probability,
} from "../../utils/bundleCalculator";
import BundleCard from "./BundleCard";
export default function CustomBundle() {
  const { data } = usePortal();
  const [count, setCount] = useState(15);
  const n = Number(count),
    valid = Number.isInteger(n) && n >= 1 && n <= 500;
  const mix = customMix(data);
  const quantities = valid ? largestRemainder(mix.weights, n) : [];
  return (
    <section className="surface">
      <h2>🎟️ Build My Bundle</h2>
      <p className="muted">
        Choose 1–500 tickets. For established customers: 70% purchase
        distribution and 30% winning-ticket distribution, or purchases only when
        no winning tickets are recorded.
      </p>
      <label className="input-label">Number of tickets</label>
      <input
        type="number"
        min="1"
        max="500"
        value={count}
        onChange={(e) => setCount(e.target.value)}
        className="count-input"
      />
      {!valid ? (
        <p className="error-text">Enter a whole number between 1 and 500.</p>
      ) : (
        <div className="custom-result">
          <p className="muted">{mix.origin}</p>
          <BundleCard
            lots={data.lotteries}
            quantities={quantities}
            size={n}
            source="Build My Bundle"
            label="YOUR CUSTOM MIX"
            details={
              <>
                <p className="historical-line">
                  Smoothed personal historical statistic:{" "}
                  <b>
                    {pct(probability(data.lotteries, quantities, data, true))}
                  </b>{" "}
                  (not a future prediction)
                </p>
                <details className="details">
                  <summary>Calculation and ticket allocation</summary>
                  <div className="allocation-table">
                    {data.lotteries.map((l, i) => (
                      <div key={l.name}>
                        <span>{l.name}</span>
                        <span>{(mix.weights[i] * 100).toFixed(1)}%</span>
                        <b>{quantities[i]}</b>
                      </div>
                    ))}
                  </div>
                  <p>
                    Allocation uses the largest-remainder method so the counts
                    sum to {n}.
                  </p>
                </details>
              </>
            }
          />
        </div>
      )}
    </section>
  );
}
