import PricingProvider from "@/context/pricing";
import PricingNav from "./PricingNav";

const Pricing = () => {
  return (
    <PricingProvider>
      <div className="w-full p-0 flex ">
        <div className="w-full">
          <nav className="w-full sticky top-0 text-lg border-b-[1px] py-4 px-4 font-semibold bg-white z-[100]">
            $ Billing
          </nav>
          <PricingNav />
        </div>
      </div>
    </PricingProvider>
  );
};

export default Pricing;
