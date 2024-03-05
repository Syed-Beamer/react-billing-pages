import { useEffect, useState } from "react";
import SignupSplitPage from "@/components/SignupSplitPage";
import { Icons } from "@/components/icons";
import SpinnerButton from "@/components/SpinnerButton";
import axiosInstance from "@/config/axiosConfig";
import VerifyPasswordInputLabel from "./VerifyPasswordInputLabel";
import TermsAndPrivacyCheckbox from "./TermsAndPrivacyCheckbox";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import ErrorMessage from "@/components/ErrorMessage";
import validatePassword from "@/components/consecutive";

export default function Verify() {
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const [inputHovered, setInputHovered] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { toast } = useToast();

  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get("email");
  const code = urlParams.get("code");

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  useEffect(() => {
    if (!urlParams.has("code")) {
      window.location.href = "/auth/signup";
    }
  }, [urlParams]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationError = validatePassword(password);
    if (password.length < 8) {
      setErrorMessage("Password must contain at least 8 characters.");
    } else if (validationError) {
      setErrorMessage(validationError);
    } else {
      setErrorMessage("");
      try {
        setLoading(true);
        const response = await axiosInstance.post("/api/auth/verify", {
          verificationCode: code,
          password: password,
        });
        if (response.status === 200) {
          console.log("Signup successfull");
          try {
            const response = await axiosInstance.post("/loginUserApi", {
              user: email,
              password: password,
            });
            if (response.request.responseURL) {
              window.location.href = response.request.responseURL;
            } else {
              console.log("Error Fetching ResponseURL", response);
            }
          } catch (error) {
            console.error(error);
          }
        } else {
          console.error("Failed to make POST request:", response.status);
          toast({
            variant: "destructive",
            title: "There was a problem with your request.",
            description: "Please try again!",
          });
        }
      } catch (error: any) {
        console.error("Error in Post request", error.message);
        toast({
          variant: "destructive",
          description:
            "This link has expired. Kindly click on the latest link to verify.",
        });
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <main className="flex lg:flex-row flex-col-reverse">
      <div className="lg:w-1/2 w-full flex 2xl:items-center xl:items-baseline lg:items-center  justify-center h-screen ">
        <SignupSplitPage />
      </div>
      <div className="curve-bg lg:w-1/2 w-full  bg-authbg  flex flex-col justify-center items-center lg:h-screen md:h-[80vh] h-[75vh]">
        <div className="sm:w-[480px] sm:h-[420px] w-[380px] h-[400px]  bg-white rounded-sm  flex flex-col justify-center ">
          <h1 className="text-lg font-semibold mb-8 text-center">
            Set up your password
          </h1>
          <div className="mx-auto ">
            <div className="mb-8 space-y-0.5">
              <p className="text-sm font-light text-left flex gap-1 items-center">
                Email address <Icons.check className="w-4 h-4" />
              </p>
              <h3 className="text-lg font-bold ">{email}</h3>
            </div>

            <form onSubmit={handleSubmit}>
              <VerifyPasswordInputLabel
                inputFocused={inputFocused}
                showPassword={showPassword}
                inputHovered={inputHovered}
                setPassword={setPassword}
                setInputHovered={setInputHovered}
                setInputFocused={setInputFocused}
                togglePasswordVisibility={togglePasswordVisibility}
                loading={loading}
                password={password}
              />

              {errorMessage && (
                <>
                  <ErrorMessage errorMessage={errorMessage} />
                  <br />
                </>
              )}

              <TermsAndPrivacyCheckbox />
              <SpinnerButton
                buttonName="CREATE ACCOUNT"
                loading={loading}
                buttonStyles="mt-10 sm:w-[440px] sm:h-[45px] w-[320px]  py-3 text-[13px] hover:bg-authYellow"
                SpinnerColor="fill-authYellow"
              />
            </form>
            <Toaster />
          </div>
        </div>
      </div>
    </main>
  );
}
