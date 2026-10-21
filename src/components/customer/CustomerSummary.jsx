import { usePortal } from "../../context/PortalContext";
import { totals } from "../../utils/bundleCalculator";
import { money } from "../../data/demoData";
export default function CustomerSummary() {
  const { data } = usePortal(),
    c = data.customer,
    t = totals(data);
  const profile =
    c.purchaseCount >= 3
      ? "Established"
      : c.purchaseCount > 0
        ? "Lookalike"
        : "Popularity";
  return (
    <section className="surface customer-surface">
      <div className="welcome-label">👤 &nbsp; WELCOME BACK</div>
      <div className="customer-title">
        <div>
          <h2>{c.name}</h2>
          <p>
            {c.mobile} · Member since {c.registeredDate}
          </p>
        </div>
        <span className="status-pill">{profile} customer</span>
      </div>
      <div className="metric-grid">
        <div className="metric">
          <span>Wallet Balance</span>
          <strong>{money(c.walletBalance)}</strong>
        </div>
        <div className="metric">
          <span>Tickets Purchased</span>
          <strong>{t.tickets}</strong>
        </div>
        <div className="metric">
          <span>Winning Tickets</span>
          <strong>{t.wins}</strong>
        </div>
      </div>
      <div className="basis">
        {c.purchaseCount} purchase(s) recorded · Demonstration ticket price{" "}
        {money(data.ticketPrice)}
      </div>
    </section>
  );
}
