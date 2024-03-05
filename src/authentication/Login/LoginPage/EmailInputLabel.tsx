import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

interface LoginFormProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  handleInputFocus: (inputName: string | null) => void;
  inputFocused: string | null;
  emailRef: any;
  loading: boolean;
}

export default function EmailInputLabel({
  email,
  setEmail,
  handleInputFocus,
  inputFocused,
  emailRef,
  loading,
}: LoginFormProps): JSX.Element {
  const path = window.location.search;

  //* Autopopulate email after resetting the password
  useEffect(() => {
    const urlParams = new URLSearchParams(path);
    const emailFromUrl = urlParams.get("email");
    if (emailFromUrl) {
      setEmail(emailFromUrl);
      emailRef.current.focus();
    }
  }, [path]);
  return (
    <>
      <Label
        className={`text-xs ${
          inputFocused === "email" ? "text-authBlue" : "text-black"
        }`}
      >
        EMAIL
      </Label>
      <Input
        className="border-t-0 border-r-0 border-l-0 rounded-none border-b border-authGrey hover:border-black focus:border-authBlue mt-4 mb-4 text-lg placeholder:text-lg shadow-none caret-authBlue"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect="off"
        required
        value={email}
        onFocus={() => handleInputFocus("email")}
        onBlur={() => handleInputFocus(null)}
        ref={emailRef}
        disabled={loading}
      />
    </>
  );
}
