import SignupSplitPage from "@/components/SignupSplitPage";
import { Icons } from "@/components/icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import SignupHeader from "./SignupHeader";
import SignupFooter from "./SignupFooter";
import IpdLinks from "./IdpLinks";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import SpinnerButton from "@/components/SpinnerButton";
import axiosInstance from "@/config/axiosConfig";
import ErrorMessage from "@/components/ErrorMessage";
import SocialSignupButton from "./SocialSignupButton";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [check, setCheck] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [inputHovered, setInputHovered] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  async function handleEmailClick(e: any) {
    e.preventDefault();
    setLoading(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);

    if (!isValid) {
      setErrorMessage("Invalid email. Please enter a valid email address.");
      return;
    }

    try {
      const response = await axiosInstance.post("/api/auth/signup", {
        email: email,
      });
      console.log("Response:", response);

      if (response.status === 200) {
        setCheck(true);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        if (error.response.data && error.response.data.errResponse) {
          setErrorMessage(error.response.data.errResponse);
        }
      } else {
        setErrorMessage(
          "An error occurred while processing your request. Please try again."
        );
        console.error("An unexpected error occurred:", error);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleVerificationLink() {
    try {
      const response = await axiosInstance.post("/api/auth/signup", {
        email: email,
      });
      if (response.status === 200) {
        toast({
          variant: "success",
          description:
            "A new verification link has been sent to your email. Please check your inbox.",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description:
          "Something went wrong. Kindly click 'Resend verification link’.",
      });
    }
  }

  return (
    <>
      <main className="flex lg:h-screen md:h-full lg:flex-row flex-col-reverse">
        <div className="lg:w-1/2 w-full flex 2xl:items-center xl:items-baseline lg:items-center  justify-center  ">
          <SignupSplitPage />
        </div>

        <div className=" flex flex-col justify-between curve-bg lg:w-1/2  bg-authbg space-y-4 pt-4 pb-8 lg:pb-16  lg:space-y-0 ">
          <SignupHeader />
          <div className="flex justify-center items-center ">
            {!check ? (
              <div className="flex flex-col  justify-center items-center sm:w-[480px] sm:h-[380px] w-[380px] h-[350px] bg-white rounded-sm ">
                <SocialSignupButton setLoading={setLoading} />
                <div className="flex items-center justify-center gap-2.5 my-8">
                  <hr className="w-[143px] border-black" />
                  <p>or</p>
                  <hr className="w-[143px] border-black " />
                </div>
                <form onSubmit={handleEmailClick}>
                  <Label
                    className={`text-xs ${
                      inputFocused ? "text-authYellow" : "text-activeBlack"
                    } `}
                  >
                    EMAIL
                  </Label>
                  <Input
                    className={` border-t-0 border-r-0 border-l-0 rounded-none border-b caret-authYellow ${
                      inputHovered
                        ? "border-activeBlack placeholder:text-activeBlack"
                        : "border-inactiveGrey placeholder:text-inactiveGrey"
                    } focus:border-b-authYellow  mt-4 ${
                      errorMessage ? "mb-2" : "mb-8"
                    } text-lg  placeholder:text-lg  shadow-none `}
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    onMouseOver={() => setInputHovered(true)}
                    onMouseOut={() => setInputHovered(false)}
                    disabled={loading}
                    value={email}
                  />
                  <ErrorMessage errorMessage={errorMessage} />
                  {errorMessage && <br />}
                  <SpinnerButton
                    buttonName="SIGNUP FOR FREE"
                    loading={loading}
                    buttonStyles="sm:w-[440px] sm:h-[45px] w-[320px]  py-3 text-[13px] hover:bg-authYellow"
                    SpinnerColor="fill-authYellow"
                  />
                </form>
              </div>
            ) : (
              <div className="sm:w-[480px] sm:h-[460px] w-[350px] h-[340px] bg-white rounded-md shadow-sm flex flex-col justify-center items-center">
                <Icons.check className="h-10 w-10 mb-4" />
                <div className="flex items-center flex-col md:mb-6 mb-3">
                  <p className="md:text-base text-sm">
                    Click the email verification link we just sent to
                  </p>
                  <p className="font-bold md:text-base text-sm">{email}</p>
                </div>
                <IpdLinks />

                <button
                  className="text-authBlue text-sm underline underline-offset-4"
                  onClick={handleVerificationLink}
                >
                  Resend verification link
                </button>
              </div>
            )}
          </div>
          <Toaster />
          <SignupFooter />
        </div>
      </main>
    </>
  );
}
