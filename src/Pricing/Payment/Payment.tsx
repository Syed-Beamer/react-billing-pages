import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button.tsx";
import NewInvoices from "./NewInvoices.tsx";
import CardDetails from "./CardDetails.tsx";
import { useState, useEffect } from "react";
import axiosInstance from "@/config/axiosConfig.ts";
import { Icons } from "@/components/icons.tsx";

const PricingDetails = () => {
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [cardDetails, setCardDetails] = useState<any>("");
  const baseURL = "https://353eb462-a317-4fa2-9a97-d1e5cae195e3.mock.pstmn.io";
  useEffect(() => {
    async function getCardDetails() {
      try {
        const response = await axiosInstance.get(`${baseURL}/carddetails`);
        setCardDetails(response.data);
      } catch (error) {
        console.log("Error occured", error);
      }
    }

    getCardDetails();
  }, []);
  
  return (
    <div className="mt-16 p-6 w-full ">
      <div className=" mb-10 mt-10 p-0">
        <Separator className="bg-[#3D50E0] w-[179px] h-[2px]" />
        <div className="my-3 w-full">
          <h1 className="text-2xl font-semibold">Current payment method</h1>
          <div className="w-full">
            <div className=" relative w-[405px] h-[282px] rounded-[10px] bg-[#DAE1E8] my-[40px] mx-auto">
              <div className=" absolute top-[40px] w-[405px] h-[45px] bg-[#424242]"></div>
              <div className="w-full justify-center items-center inline-flex my-[109px] mx-85 gap-2">
                <h3 className="text-base font-medium">Card number : </h3>

                {cardDetails ? (
                  <span> •••• •••• •••• {cardDetails?.cardLastNumbers}</span>
                ) : (
                  <span> •••• •••• •••• 7899 </span>
                )}
              </div>
              <Button
                variant="outline"
                className="p-[20px] mb-[20px] text-[13px] bg-transparent border font-semibold absolute top-[155px] left-[105px] rounded-sm  hover:border-authBlue hover:bg-[#DAE1E8] hover:text-authBlue enableBorder"
                onClick={() => setShowCardDetails(true)}
              >
                UPDATE YOUR PAYMENT
              </Button>
              <div className="w-full flex justify-center mt-[-20px]">
                <Icons.cards cardType={cardDetails?.cardType} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showCardDetails && <CardDetails />}

      <div className=" mt-20 p-0">
        <Separator className="bg-[#3D50E0] w-[65px] h-[2px]" />
        <div className="my-3 w-full">
          <h1 className="text-2xl font-semibold">Invoices</h1>
          <div className="flex justify-center items-center">
            <NewInvoices />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingDetails;
