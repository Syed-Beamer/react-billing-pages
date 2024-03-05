import { useState } from "react";
import LoginSplitPage from "@/components/LoginSplitPage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoginHeader from "@/components/LoginHeader";
import SpinnerButton from "@/components/SpinnerButton";
import useLoadingState from "@/hooks/useLoadingState";
import ErrorMessage from "@/components/ErrorMessage";
import axiosInstance from "@/config/axiosConfig";
import validatePassword from "@/components/consecutive";

export default function ForgetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [inputFocused, setInputFocused] = useState(null);
  const [loading, setLoading] = useLoadingState();

  function handleInputFocus(inputName: any) {
    setInputFocused(inputName);
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");
    const code = urlParams.get("code");
    const validationError = validatePassword(password);
    if (password.length < 8 || confirmPassword.length < 8) {
      setErrorMessage("Password should be atleast 8 characters");
    } else if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else if (validationError) {
      setErrorMessage(validationError);
    } else {
      setLoading(true);

      try {
        const response = await axiosInstance.post("/api/auth/newpassword", {
          password: password,
          code: code,
          email: email,
        });
        if (response.status === 200) {
          setErrorMessage("");
          window.location.href = `/auth/login?email=${email}`;
        }
      } catch (error) {
        setErrorMessage(
          "An error occured while fetching your request. Please try again."
        );
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }
  return (
    <div className="flex">
      <LoginSplitPage />
      <div className="mt-12 lg:w-1/2 w-full bg-white lg:h-screen md:h-[80vh] h-[75vh]">
        <LoginHeader
          name="Reset your password"
          path="/auth/login"
          linkName="BACK TO LOGIN"
        />

        <div className="w-full flex justify-center items-center relative">
          <div className="w-[320px] md:w-[480px] mt-20">
            <form onSubmit={handleSubmit}>
              <Label
                className={`text-xs ${
                  inputFocused === "password" ? "text-authBlue" : "text-black"
                }`}
              >
                PASSWORD *
              </Label>
              <Input
                className=" border-t-0 border-r-0 border-l-0 rounded-none border-b border-authGrey hover:border-black focus:border-authBlue   mt-4 mb-10 text-lg  placeholder:text-lg  shadow-none caret-authBlue "
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
                required
                value={password}
                onFocus={() => handleInputFocus("password")}
                onBlur={() => setInputFocused(null)}
              />
              <Label
                className={`text-xs  ${
                  inputFocused === "confirmPassword"
                    ? "text-authBlue"
                    : "text-black"
                }`}
              >
                CONFIRM PASSWORD *
              </Label>
              <Input
                className=" border-t-0 border-r-0 border-l-0 rounded-none border-b border-authGrey hover:border-black focus:border-authBlue   mt-4 mb-3 text-lg  placeholder:text-lg  shadow-none caret-authBlue "
                id="password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                type="password"
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
                required
                value={confirmPassword}
                onFocus={() => handleInputFocus("confirmPassword")}
                onBlur={() => setInputFocused(null)}
              />
              <ErrorMessage errorMessage={errorMessage} />
              <SpinnerButton
                buttonName="CONFIRM PASSWORD"
                loading={loading}
                buttonStyles=" mt-10 w-full h-11 rounded-sm  hover:bg-authBlue"
                SpinnerColor="fill-authBlue"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
