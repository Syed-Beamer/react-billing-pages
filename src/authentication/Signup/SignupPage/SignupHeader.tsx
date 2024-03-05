import { Icons } from "@/components/icons";
export default function SignupHeader() {
  return (
    <div className="flex gap-1 justify-end items-center mt-8 mr-4 ">
      <div className="w-[300px] hover:bg-white text-center flex justify-center items-center h-[42px] rounded-sm">
        <a className="text-sm font-bold" href="/auth/login">
          ALREADY HAVE AN ACCOUNT? LOGIN
        </a>
        <Icons.loginArrow />
      </div>
    </div>
  );
}
