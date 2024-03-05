import { Checkbox } from "@/components/ui/checkbox";
export default function TermsAndPrivacyCheckbox() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" required />
      <label
        htmlFor="terms"
        className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        I agree to the{" "}
        <a
          href="https://www.getbeamer.com/terms-of-service"
          className="text-authBlue"
        >
          Terms of Service
        </a>{" "}
        &{" "}
        <a
          href="https://www.getbeamer.com/privacy-policy"
          className="text-authBlue"
        >
          Privacy Policies
        </a>
      </label>
    </div>
  );
}
