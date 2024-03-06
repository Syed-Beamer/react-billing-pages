import { usePricingReducer, usePricingState } from "@/context/pricing";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { NPSType, PlanType } from "@/types/pricing";

interface PlanProps {
  item: PlanType | NPSType | any;
  show: boolean;
  setShow: (show: boolean) => void;
}

export default function Plan({ item, setShow, show }: PlanProps) {
  const { selectedProduct, showMonthlyPricing, currentPlan } =
    usePricingState();
  const { setCurrentPricing } = usePricingReducer();
  const handleClick = (planValue: string) => {
    setCurrentPricing(planValue);
  };
  const highlightSoon = (text: string) => {
    const soonIndex = text.toLowerCase().indexOf("soon");
    if (soonIndex !== -1) {
      return (
        <span>
          {text.substring(0, soonIndex)}
          <span
            style={{
              backgroundColor: "#FBBC05",
              borderRadius: "2px",
              marginLeft: "4px",
              padding: "4px",
              // paddingRight: "4px",
              fontSize: "10px",
              height: "12px",
              width: "30px",
              fontWeight: "bold",
            }}
          >
            SOON
          </span>
        </span>
      );
    }
    return text;
  };
  return (
    <div
      className={
        "w-[271px]  md:w-[625px] lg:w-[260px]  min-h-[595px] max-h-auto  md:h-[529px]   lg:h-auto  mb-[44px] lg:mb-0 relative flex flex-col  px-4 py-4 ml-2  rounded-[5px]  cursor-pointer"
      }
      onClick={() => handleClick(item.setCurrPlan)}
      style={
        currentPlan[selectedProduct] === item.setCurrPlan
          ? { outline: `3px solid ${item.colour}` }
          : { outline: "1px solid rgba(0, 0, 0, 0.10)" }
      }
      data-testid="plans"
    >
      <div>
        <div className="text-inherit m-0 font-bold text-2xl uppercase text-center lg:text-start ">
          {item.plan}
        </div>
        <div>
          <div
            className="py-3 text-center lg:text-start"
            style={{ color: item.colour }}
          >
            {item.plan === "custom" || item.plan === "NPS ENTERPRISE" ? null : (
              <span className="relative text-lg font-bold">$</span>
            )}
            <span className={`inline-block text-4xl font-bold`}>
              {showMonthlyPricing ? item?.monthlyPricing : item?.annualPricing}
            </span>
            {item.plan === "custom" || item.plan === "NPS ENTERPRISE" ? null : (
              <span className="inline-block text-sm font-bold">/month</span>
            )}
          </div>
          <div className="text-xs text-center lg:text-start">
            Billed{" "}
            {showMonthlyPricing ? (
              <span className="font-bold">monthly</span>
            ) : (
              <span className="font-bold">annually</span>
            )}
          </div>
          <div className="font-normal text-xs text-gray-600 py-3 text-center lg:text-start">
            <span>
              {showMonthlyPricing ? item?.offerMonthly : item?.offerAnnually}
            </span>
          </div>
        </div>
        <div className="py-6 text-inherit text-[14px] mb-24 ">
          {/* this is for grid */}
          <div>{item?.featuresHead}</div>
          <ul className="pt-4 flex flex-col md:grid md:grid-cols-2  lg:flex lg:flex-col">
            {item.features.map((j: any, index: number) => {
              const linkRegex = /\(<a href='([^']+)'>([^<]+)<\/a>\)/;
              const match = j.match(linkRegex);
              if (match) {
                const linkText = match[2];
                const linkUrl = match[1];
                const parts = j.split(linkRegex);

                return (
                  <div>
                    <li key={index} className="flex flex-row pb-4">
                      <span className="mr-2">
                        <Icons.plainTick color={item.colour} />
                      </span>
                      <span>
                        {parts[0].substring(0, 22)}
                        <br />
                        <span>
                          {parts[0].substring(22, 33)}
                          <a
                            href={linkUrl}
                            className="text-blue-700 hover:underline"
                            key={`link-${index}`}
                          >
                            {linkText}
                          </a>
                        </span>
                      </span>
                    </li>
                  </div>
                );
              } else {
                return (
                  <li key={index} className="flex flex-row  pb-4">
                    <span className="mr-2">
                      <Icons.plainTick color={item.colour} />
                    </span>
                    <span className="block">{highlightSoon(j)} </span>
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <div className="flex justify-center">
          <Button
            className="absolute  py-[20px] px-[60px] mx-5    w-[230px]  rounded-[3px] text-[13px] bottom-10  hover:bg-authBlue "
            onClick={() => setShow(!show)}
          >
            {currentPlan[selectedProduct] === item.setCurrPlan
              ? item.plan === "custom" || item.plan === "NPS ENTERPRISE"
                ? "CONTACT US"
                : "SUBSCRIBE"
              : item.plan === "custom" || item.plan === "NPS ENTERPRISE"
              ? "CONTACT US"
              : "START FREE TRIAL"}
          </Button>
        </div>
      </div>
      {currentPlan[selectedProduct] === item.setCurrPlan && (
        <Icons.filledTick
          className="absolute top-[-16px] right-[-18px]"
          color={item.colour}
        />
      )}
    </div>
  );
}
