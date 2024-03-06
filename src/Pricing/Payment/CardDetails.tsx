import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import card from "@/assets/card.svg";
import cardactive from "@/assets/cardactive.svg";
import calendar_month from "@/assets/calendar_month.svg";
import calenderactive from "@/assets/calenderactive.svg";
import ccv from "@/assets/ccv.svg";
import cvcactive from "@/assets/cvcactive.svg";
import loyalty from "@/assets/loyalty.svg";
import loyaltyactive from "@/assets/loyaltyactive.svg";

const CardDetails = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cvc, setCvc] = useState("");
  const [expiry, setExpiry] = useState("");
  const [focusedInput, setFocusedInput] = useState("");

  function handleExpiryChange(e: any) {
    let input = e.target.value;

    // Remove non-numeric characters
    input = input.replace(/\D/g, "");

    // Apply the mask (MM/YY)
    if (input.length <= 4) {
      input = input.replace(/^(\d{2})(\d{0,2})/, "$1/$2");
    }

    // Update the state
    setExpiry(input);
  }

  return (
    <form className="mt-20 p-0">
      <Separator className="bg-[#3D50E0] w-[151px] h-[2px]" />
      <div className="my-3 w-full">
        <h1 className="text-2xl font-semibold">Payment Method</h1>
        <div className="w-[540px] pt-7">
          <div className="flex flex-row justify-start items-center focus:border-gray-600 border-2 rounded-xl focus-within:border-gray-600 w-[540px]  ">
            <img
              src={focusedInput === "cardNumber" ? cardactive : card}
              className="ml-[20px] mr-[13px]"
            />
            <Input
              type="text"
              placeholder="Card information"
              className="placeholder:text-[#DADEE2] placeholder:hover:text-[black] 
             focus:placeholder:text-[black] h-[43px] border-none shadow-none"
              required
              onChange={(e) => setCardNumber(e.target.value)}
              onFocus={() => setFocusedInput("cardNumber")}
              onBlur={() => setFocusedInput("")}
              maxLength={16}
              value={cardNumber}
            />
          </div>
          {/* //testdiv */}
          <div className="flex justify-start items-center gap-5 ">
            <div className="grid grid-rows-1 grid-flow-col gap-5  mt-[20px] w-[540px] h-[43px]">
              <div className="flex flex-row justify-start items-center focus:border-gray-600 border-2 rounded-xl focus-within:border-gray-600 w-[260px]">
                <img
                  src={
                    focusedInput === "MM/YY" ? calenderactive : calendar_month
                  }
                  className="ml-[20px] mr-[13px] "
                />
                <Input
                  type="text"
                  placeholder="MM/YY"
                  className="placeholder:text-[#DADEE2] placeholder:hover:text-[black]   focus:placeholder:text-[black] shadow-none
                 w-[260px] h-[43px] border-none"
                  required
                  onFocus={() => setFocusedInput("MM/YY")}
                  onBlur={() => setFocusedInput("")}
                  value={expiry}
                  onChange={handleExpiryChange}
                  maxLength={5}
                />
              </div>
              <div className="flex flex-row justify-start items-center focus:border-gray-600 border-2 rounded-xl focus-within:border-gray-600 w-[260px]">
                <img
                  src={focusedInput === "ccv" ? cvcactive : ccv}
                  className="ml-[20px] mr-[13px]"
                />
                <Input
                  type="text"
                  placeholder="CVC"
                  className="placeholder:text-[#DADEE2] placeholder:hover:text-[black] border-none focus:placeholder:text-[black] rounded-xl w-[260px] h-[43px] shadow-none"
                  required
                  onFocus={() => setFocusedInput("ccv")}
                  onBlur={() => setFocusedInput("")}
                  onChange={(e) => setCvc(e.target.value)}
                  maxLength={3}
                  value={cvc}
                />
              </div>
            </div>
          </div>
          <p className="mt-[30px]  text-[13px] text-[#545F6A]  mb-[20px]">
            COUPON CODE
          </p>
          <div className="flex flex-row justify-start items-center focus:border-gray-600 border-2 rounded-xl focus-within:border-gray-600 w-[540px] h-[43px]">
            <img
              src={focusedInput === "loyaltyactive" ? loyaltyactive : loyalty}
              className="ml-[20px] mr-[13px]"
            />
            <Input
              type="text"
              placeholder="Coupon Code"
              onFocus={() => setFocusedInput("loyaltyactive")}
              onBlur={() => setFocusedInput("")}
              className="placeholder:text-[#DADEE2] placeholder:hover:text-[black]  focus:placeholder:text-[black] rounded-xl h-[43px] pl-2 border-none shadow-none"
            />
          </div>
          <Button className="mt-[20px] w-full hover:bg-authBlue h-[43px]">
            Subscribe
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CardDetails;
