import { Button } from "@/components/ui/button";

const FreeTier = () => {
  return (
    <div className="w-full  border mt-8  rounded-[10px] p-8 ml-2 enableOutline flex  flex-col justify-center  items-center md:items-start md:justify-start  text-center md:text-start">
      <h3 className="text-xl font-semibold text-gray-400">FREE</h3>
      <h3 className="text-[44px] font-semibold text-gray-400 mt-2">
        <p className="text-[25px] font-normal inline-block">$</p>0
        <p className=" text-[25px] font-normal  inline-block">/mo</p>
      </h3>

      <p className="text-sm mt-2 font-semibold">
        This plan includes: up to 1000 visitors, 1 language, 1 teammate, basic
        analytics, Beamer watermark.
      </p>

      <Button
        variant="outline"
        className="mt-10 font-semibold text-[14px] px-[85px] py-[12px] w-[230px] md:w-[260px] md:h-[43px] rounded-sm hover:border hover:border-authBlue hover:bg-white hover:text-authBlue "
        data-testid="downgrade-btn"
      >
        DOWNGRADE
      </Button>
    </div>
  );
};

export default FreeTier;
