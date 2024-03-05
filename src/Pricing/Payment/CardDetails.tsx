import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const CardDetails = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cvc, setCvc] = useState("");
  const [expiry, setExpiry] = useState("");

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
    <form className="  mt-20 p-0">
      <Separator className="bg-[#3D50E0] w-[151px] h-[2px]" />
      <div className="my-3 w-full">
        <h1 className="text-2xl font-semibold">Payment Method</h1>
        <div className="w-[540px] pt-7">
          <Input
            type="text"
            placeholder="Card information"
            className="placeholder:text-[#DADEE2] placeholder:hover:text-[black] focus:border-gray-600 focus:placeholder:text-[black] rounded-xl h-[43px] pl-2 enableBorder"
            required
            onChange={(e) => setCardNumber(e.target.value)}
            maxLength={16}
            value={cardNumber}
          />
          <div className="grid grid-rows-1 grid-flow-col gap-5  mt-[20px]">
            <Input
              type="text"
              placeholder="MM/YY"
              className="placeholder:text-[#DADEE2] placeholder:hover:text-[black]  focus:border-gray-600 focus:placeholder:text-[black] rounded-xl w-[260px] h-[43px] pl-2 enableBorder"
              required
              value={expiry}
              onChange={handleExpiryChange}
              maxLength={5}
            />
            <Input
              type="text"
              placeholder="CVC"
              className="placeholder:text-[#DADEE2] placeholder:hover:text-[black] focus:border-gray-600 focus:placeholder:text-[black] rounded-xl w-[260px] h-[43px] pl-2 enableBorder"
              required
              onChange={(e) => setCvc(e.target.value)}
              maxLength={3}
              value={cvc}
            />
          </div>
          <p className="mt-[30px]  text-[13px] text-[#545F6A]  mb-[20px]">
            COUPON CODE
          </p>
          <Input
            type="text"
            placeholder="Coupon Code"
            className="placeholder:text-[#DADEE2] placeholder:hover:text-[black] focus:border-gray-600 focus:placeholder:text-[black] rounded-xl h-[43px] pl-2 enableBorder"
          />
          <Button className="mt-[20px] w-full hover:bg-authBlue h-[43px]">
            Subscribe
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CardDetails;
