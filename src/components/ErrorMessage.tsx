import { Icons } from "@/components/icons";

type LoginErrorMessageProps = {
  errorMessage: string;
};

export default function ErrorMessage({
  errorMessage,
}: LoginErrorMessageProps): JSX.Element | null {
  return errorMessage ? (
    <div className="flex gap-2 ">
      <Icons.warning />
      <p className="text-red-600 text-xs font-semibold">{errorMessage}</p>
    </div>
  ) : null;
}
