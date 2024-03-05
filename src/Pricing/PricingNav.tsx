import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Switch } from "@/components/ui/switch";
import PlanContainer from "./PlanContainer";
import { usePricingReducer, usePricingState } from "@/context/pricing";

const PricingNav: React.FC = () => {
  const { showMonthlyPricing } = usePricingState();
  const { setProduct, setPricingType } = usePricingReducer();

  const handleChangePricing = (pricingType: boolean) => {
    setPricingType(pricingType);
  };

  const handleValueChange = (product: string) => {
    setPricingType(true);
    setProduct(product);
  };

  return (
    <div
      className="flex  flex-col mt-1  p-5 justify-center items-center  "
      data-testid="pricing-nav"
    >
      <h1 className="text-[32px] text-activeBlack">Pricing & Plans</h1>
      <p className="text-lg m-1 text-activeBlack  font-normal">
        All our plans include a 14-day free trial period.
      </p>
      <Tabs
        defaultValue="changelog"
        onValueChange={(value) => {
          handleValueChange(value);
        }}
        className="w-[435px] m-3  disableBorder"
      >
        <TabsList className=" flex justify-center items-center disableBorder">
          <TabsTrigger
            value="changelog"
            className=" disableBorder flex flex-col m-[2px]  w-[300px] "
          >
            <p className="text-sm font-semibold">Changelog</p>
            <span className="text-xs">Current plan: Scale</span>
          </TabsTrigger>
          <TabsTrigger
            value="nps"
            className="disableBorder flex flex-col m-1 w-[300px]"
          >
            <p className="text-sm font-semibold">NPS</p>
            <span className="text-xs">Current plan: Scale</span>
          </TabsTrigger>
          <TabsTrigger
            value="feedback"
            className="disableBorder flex flex-col m-1 w-[300px]"
          >
            <p className="text-sm font-semibold">Feedback</p>
            <span className="text-xs">Current plan: Pro</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="changelog"
          className="mx-auto  flex flex-col  justify-center items-center space-x-2 "
        >
          <div className=" text-center mb-[16px]">
            <span className=" font-bold m-2 mb-[32px]">
              Get 2 months for free{""}
            </span>
            <span>by paying annually</span>
          </div>
          <div className=" flex justify-center  items-center space-x-2 mb-[32px]">
            <span
              id="monthly-billing"
              className={`text-[13px] font-semibold ${
                !showMonthlyPricing && "opacity-50"
              }`}
            >
              Monthly Billing
            </span>
            <Switch
              onCheckedChange={() => handleChangePricing(!showMonthlyPricing)}
              id="billing"
            />
            <span
              id="billing"
              className={`text-[13px] font-semibold ${
                showMonthlyPricing && "opacity-50"
              }`}
            >
              Annual Billing
            </span>
          </div>

          <PlanContainer feature="changelog" />
        </TabsContent>
        <TabsContent
          className="mx-auto flex flex-col  justify-center items-center space-x-2 mt-0 "
          value="nps"
        >
          <PlanContainer feature="nps" />
        </TabsContent>
        <TabsContent
          className="mx-auto flex flex-col  justify-center items-center space-x-2 mt-0 "
          value="feedback"
        >
          <div className=" text-center mb-[16px] ">
            <span className=" font-bold m-2">Get 2 months for free</span>
            <span>by paying annually</span>
          </div>

          <div className=" flex justify-center  items-center space-x-2 mb-[32px]">
            <span
              id="monthly-billing"
              className={`text-[13px] font-semibold ${
                !showMonthlyPricing && "opacity-50"
              }`}
            >
              Monthly Billing
            </span>
            <Switch
              onCheckedChange={() => handleChangePricing(!showMonthlyPricing)}
              id="billing"
            />
            <span
              id="billing"
              className={`text-[13px] font-semibold ${
                showMonthlyPricing && "opacity-50"
              }`}
            >
              Annual Billing
            </span>
          </div>

          <PlanContainer feature="feedback" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PricingNav;
