import { Icons } from "@/components/icons";
export default function SignupFooter() {
  return (
    <section className="flex flex-col justify-center items-center md:gap-8 gap-4 lg:mb-20 mb-8">
      <div className="flex md:flex-row flex-col md:gap-5 gap-4 ">
        <p className="flex gap-1 items-center">
          <Icons.check className="w-4 h-4" />
          Start your 14-day free trial now.
        </p>
        <p className="flex gap-1 justify-center items-center">
          <Icons.check className="w-4 h-4" />
          No Credit Card required.
        </p>
      </div>
      <div className="md:flex-row flex-col">
        <p className="flex gap-1 justify-center items-center">
          <Icons.check className="w-4 h-4" />
          Unlock all features.
        </p>
      </div>
    </section>
  );
}
