import { useState } from "react";
import FreeTier from "./FreeTier";
import Plan from "./Plan";
import Payment from "./Payment/Payment";
import { usePricingState } from "@/context/pricing";
import { feature, PlanType, NPSType } from "@/types/pricing";

interface PlanContainerProps {
  feature: feature;
}

export default function PlanContainer({ feature }: PlanContainerProps) {
  const [show, setShow] = useState(false);
  const { selectedProduct } = usePricingState();

  const { data } = usePricingState();

  return (
    <div className="w-[271px]  md:w-[625px] lg:w-[1100px] flex flex-col justify-center items-center">
      <div
        className="w-[271px]  md:w-[625px] lg:w-full pl-0 
      flex flex-col lg:flex-row gap-2 justify-center"
      >
        {data[selectedProduct].map((i: PlanType | NPSType) => (
          <Plan key={i.plan} item={i} setShow={setShow} show={show} />
        ))}
      </div>
      {feature === "changelog" && <FreeTier />}
      {show && <Payment />}
    </div>
  );
}
