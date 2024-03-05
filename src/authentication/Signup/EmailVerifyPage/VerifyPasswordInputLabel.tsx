import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";

interface VerifyPasswordInputLabelProps {
  inputFocused: boolean;
  showPassword: boolean;
  inputHovered: boolean;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setInputFocused: React.Dispatch<React.SetStateAction<boolean>>;
  setInputHovered: React.Dispatch<React.SetStateAction<boolean>>;
  togglePasswordVisibility: () => void;
  loading: boolean;
  password: string;
}

export default function VerifyPasswordInputLabel({
  inputFocused,
  showPassword,
  inputHovered,
  setPassword,
  setInputHovered,
  setInputFocused,
  togglePasswordVisibility,
  loading,
  password,
}: VerifyPasswordInputLabelProps) {
  return (
    <>
      <Label
        htmlFor="password"
        className={`text-xs ${inputFocused ? "text-authYellow" : ""}`}
      >
        PASSWORD
      </Label>
      <div className="relative mb-4">
        <Input
          className="border-t-0 border-r-0 border-l-0 border-b border-inactiveGrey focus:border-authYellow hover:border-activeBlack hover:placeholder:text-activeBlack rounded-none  mt-4 mb-2 text-lg placeholder:text-lg shadow-none pr-10 cursor-pointer caret-authYellow"
          id="password"
          placeholder="Pick a strong password"
          type={showPassword ? "text" : "password"}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect="off"
          required
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          onMouseOver={() => setInputHovered(true)}
          onMouseOut={() => setInputHovered(false)}
          disabled={loading}
          value={password}
        />
        <span
          className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <Icons.showPassword
              className={`${
                inputHovered || inputFocused
                  ? "fill-black"
                  : "fill-inactiveGrey"
              }`}
            />
          ) : (
            <Icons.hidePassword
              className={`${
                inputHovered || inputFocused
                  ? "fill-black"
                  : "fill-inactiveGrey"
              }`}
            />
          )}
        </span>
      </div>
    </>
  );
}
