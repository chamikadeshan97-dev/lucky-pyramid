import CustomerSummary from "../../components/customer/CustomerSummary";
import CustomBundle from "../../components/bundles/CustomBundle";
import PurchasePreview from "../../components/purchase/PurchasePreview";
export default function Build() {
  return (
    <>
     
     
     
      <div className="intro">
        <div>
          <span className="eyebrow red">PERSONALISED FOR YOU</span>
          <h1>Build your own bundle</h1>
          <p>Choose the number of tickets and review your allocation.</p>
        </div>
      </div>
      <CustomBundle />
      <PurchasePreview />
    </>
  );
}
