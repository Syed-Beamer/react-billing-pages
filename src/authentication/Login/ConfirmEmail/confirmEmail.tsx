import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import LoginSplitPage from "@/components/LoginSplitPage";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import axiosInstance from "@/config/axiosConfig";
import LoginHeader from "@/components/LoginHeader";
import useLoadingState from "@/hooks/useLoadingState";
import SpinnerButton from "@/components/SpinnerButton";

export default function ConfirmMail() {
  const [email, setEmail] = useState<string>("");
  const [inputFocused, setInputFocused] = useState<string | null>(null);
  const [loading, setLoading] = useLoadingState();

  const { toast } = useToast();

  function handleInputFocus(inputName: string) {
    setInputFocused(inputName);
  }

  async function handleButtonClick(e: any) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post("/api/auth/reset", {
        email: email,
      });
      if (response.status === 200) {
        console.log("Email has been sent");
        toast({
          variant: "success",
          description: "Email sent. Kindly click to reset your password.",
        });
      }
    } catch (error) {
      console.log("Error fetching requests", error);
      toast({
        variant: "destructive",
        title: "Uh oh!",
        description: "Something went wrong, please try again",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex">
      <LoginSplitPage />

      <div className="mt-12 lg:w-1/2 w-full bg-white lg:h-screen md:h-[80vh] h-[75vh] px-4 justify-center">
        <LoginHeader
          name="Reset your password"
          path="/auth/login"
          linkName="BACK TO LOGIN"
        />
        <p className="text-xs mt-3 sm:ml-12 ml-2 sm:w-1/2 w-3/4 text-gray-600">
          If an account with this email exists, you would have received an email
          to reset your password.
        </p>
        <div className="w-full flex justify-center items-center relative">
          <div className="w-[480px] mt-20">
            <form onSubmit={handleButtonClick}>
              <Label
                className={`text-xs ${
                  inputFocused === "email" ? "text-authBlue" : "text-black"
                }`}
              >
                EMAIL
              </Label>
              <Input
                className="border-t-0 border-r-0 border-l-0 rounded-none border-b border-authGrey hover:border-black focus:border-authBlue mt-4  text-lg placeholder:text-lg shadow-none caret-authBlue"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                required
                value={email}
                onFocus={() => handleInputFocus("email")}
                onBlur={() => setInputFocused(null)}
                disabled={loading}
              />
              <SpinnerButton
                buttonName="CONFIRM"
                loading={loading}
                buttonStyles="mt-10 w-full h-11 rounded-sm hover:bg-authBlue"
                SpinnerColor="fill-authBlue"
              />
            </form>
            <Toaster />
          </div>
        </div>
      </div>
    </div>
  );
}
