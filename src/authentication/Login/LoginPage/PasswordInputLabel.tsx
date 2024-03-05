import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PasswordFormProps {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleInputFocus: (inputName: string | null) => void;
  inputFocused: string | null;
  loading: boolean;
}

export default function PasswordInputLabel({
  password,
  setPassword,
  handleInputFocus,
  inputFocused,
  loading,
}: PasswordFormProps): JSX.Element {
  return (
    <>
      <Label
        className={`text-xs ${
          inputFocused === "password" ? "text-authBlue" : "text-black"
        }`}
      >
        PASSWORD
      </Label>
      <Input
        className="border-t-0 border-r-0 border-l-0 rounded-none border-b border-authGrey hover:border-black focus:border-authBlue mt-4 mb-3 text-lg placeholder:text-lg shadow-none caret-authBlue"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        autoCapitalize="none"
        autoComplete="current-password"
        autoCorrect="off"
        required
        value={password}
        onFocus={() => handleInputFocus("password")}
        onBlur={() => handleInputFocus(null)}
        disabled={loading}
      />
    </>
  );
}
