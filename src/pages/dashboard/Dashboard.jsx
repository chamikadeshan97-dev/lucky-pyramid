import { Link } from "react-router-dom";
import CustomerSummary from "../../components/customer/CustomerSummary";
import PyramidPanel from "../../components/pyramid/PyramidPanel";
import SmartBundles from "../../components/bundles/SmartBundles";
import PurchasePreview from "../../components/purchase/PurchasePreview";
export default function Dashboard() {
  return (
    <>
   
      <div className="intro">
        <div>
          <span className="eyebrow red">PERSONALISED FOR YOU</span>
          <h1>Discover your lucky picks ✦</h1>
          <p>
            Explore your previous results and discover ticket mixes based on
            your history.
          </p>
        </div>
      </div>
      <div className="feature-tabs">
        <Link className="feature-tab active" to="/home">
          🏆 My Lucky Pyramid
        </Link>
        <Link className="feature-tab" to="/build">
          🎟️ Build My Bundle
        </Link>
        <Link className="feature-tab" to="/nlb">
          🏅 NLB Top Winners
        </Link>
      </div>
      <PyramidPanel />
      <SmartBundles />
      <PurchasePreview />
    </>
  );
}
