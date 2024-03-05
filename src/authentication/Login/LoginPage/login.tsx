import { Icons } from "@/components/icons";
import { useState, useRef } from "react";
import SocialLoginButton from "./SocialLoginButton";
import LoginSplitPage from "@/components/LoginSplitPage";
import LoginHeader from "@/components/LoginHeader";
import useLoadingState from "@/hooks/useLoadingState";
import SpinnerButton from "@/components/SpinnerButton";
import ErrorMessage from "@/components/ErrorMessage";
import axiosInstance from "@/config/axiosConfig";
import PasswordInputLabel from "./PasswordInputLabel";
import EmailInputLabel from "./EmailInputLabel";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPasswordInput, setShowPasswordInput] = useState<boolean>(false);
  const [inputFocused, setInputFocused] = useState<string | null>(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
  const [loading, setLoading] = useLoadingState();
  const emailInputRef = useRef(null);

  function handleInputFocus(inputName: string | null) {
    setInputFocused(inputName);
    console.log(inputFocused);
  }

  async function handleEmailSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post("/api/auth/verifyEmail", {
        email: email,
      });
      if (response.status === 200) {
        setShowPasswordInput(true);
        console.log("Email validation successfull", response);
      }
    } catch (error: any) {
      if (
        (error.response && error.response.status === 404) ||
        (error.response && error.response.status === 400) ||
        (error.response && error.response.status === 500)
      ) {
        if (error.response.data && error.response.data.errResponse) {
          setEmailErrorMessage(error.response.data.errResponse);
        } else {
          setEmailErrorMessage(
            "An error occurred while processing your request. Please try again"
          );
        }
      } else {
        setEmailErrorMessage(
          "An error occured while processing your request. Please try again"
        );
      }
    } finally {
      setLoading(false);
    }
  }

  async function handlePasswordSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post("/loginUserApi", {
        user: email,
        password: password,
      });
      console.log(response);
      if (response.status === 200) {
        var responseUrl = response.request.responseURL;
        window.location.href = responseUrl;
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setPasswordErrorMessage(error.response.data.errResponse);
      } else {
        setPasswordErrorMessage(
          "An error occured while processing your request. Please try again"
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex">
      <LoginSplitPage />
      <div className="mt-12 lg:w-1/2 w-full bg-white lg:h-screen md:h-[80vh] h-[75vh] px-4 justify-center">
        <LoginHeader
          name="Login"
          path="/auth/signup"
          linkName="NO ACCOUNT YET? SIGN UP"
        />
        <div className="w-full flex justify-center items-center relative">
          <div className="w-[480px] mt-20">
            {!showPasswordInput ? (
              <form onSubmit={handleEmailSubmit}>
                <SocialLoginButton />
                <div className="flex flex-grow items-center justify-center gap-2.5 my-8">
                  <hr className="w-[143px] border-black" />
                  <p>or</p>
                  <hr className="w-[143px] border-black" />
                </div>
                <EmailInputLabel
                  email={email}
                  setEmail={setEmail}
                  handleInputFocus={handleInputFocus}
                  inputFocused={inputFocused}
                  emailRef={emailInputRef}
                  loading={loading}
                />
                <ErrorMessage errorMessage={emailErrorMessage} />
                <SpinnerButton
                  buttonName="LOGIN"
                  loading={loading}
                  buttonStyles="flex flex-grow mt-10 w-full h-11 rounded-sm hover:bg-authBlue"
                  SpinnerColor="fill-authBlue"
                />
              </form>
            ) : (
              <form onSubmit={handlePasswordSubmit}>
                <div className="top-8 left-12 mb-10 w-12 h-12 flex items-center justify-center rounded-lg bg-white  border hover:bg-[#F8FAFE] hover:border-[#D2E3FC] cursor-pointer">
                  <Icons.google
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => setShowPasswordInput(false)}
                  />
                </div>
                <div className="mb-8 space-y-0.5">
                  <p className="text-sm font-light text-left flex gap-1 items-center ">
                    Email address <Icons.check className="w-4 h-4" />
                  </p>
                  <h3 className="text-lg font-bold ">{email}</h3>
                </div>
                <PasswordInputLabel
                  password={password}
                  setPassword={setPassword}
                  handleInputFocus={handleInputFocus}
                  inputFocused={inputFocused}
                  loading={loading}
                />
                <div className="flex items-center justify-between mb-4">
                  <a
                    className="text-authBlue text-sm cursor-pointer"
                    href="/auth/confirmEmail"
                  >
                    Forgot your password?
                  </a>
                  <ErrorMessage errorMessage={passwordErrorMessage} />
                </div>
                <SpinnerButton
                  buttonName="CONFIRM LOGIN"
                  loading={loading}
                  buttonStyles="flex flex-grow mt-10 w-full h-11 rounded-sm hover:bg-authBlue"
                  SpinnerColor="fill-authBlue"
                />
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
