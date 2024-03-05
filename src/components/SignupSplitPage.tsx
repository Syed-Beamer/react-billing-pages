import { Icons } from "@/components/icons";
import AmazonLogo from "@/assets/amazon-logo.svg";
import FreshworksLogo from "@/assets/freshworks-logo.svg";
import LaunchDarklyLogo from "@/assets/launchDarkly-logo.svg";
import HotjarLogo from "@/assets/hotjar-logo.svg";
import BeamerLogo from "@/assets/BeamerLogo.svg";

const achievements = [
  "520% return on investment (ROI).",
  "40% reduction in customer churn.",
  "2x product adoption.",
  "50% decrease in support tickets.",
  "20+ hours saved by not having to engage the technical team.",
];

const customerLogoNamesAndPaths = [
  {
    path: FreshworksLogo,
    name: "Freshworks-logo",
  },
  {
    path: AmazonLogo,
    name: "Amazon-logo",
  },
  {
    path: HotjarLogo,
    name: "Hotjar-logo",
  },
  {
    path: LaunchDarklyLogo,
    name: "LaunchDarkly-logo",
  },
];
export default function SignupSplitPage() {
  return (
    <>
      <div className="sm:max-w-[480px] sm:p-0 p-6 ">
        <header>
          <img
            className="w-[160px] h-[40px] mt-5 mb-[25px]"
            src={BeamerLogo}
            alt="Beamer Logo"
          />
        </header>
        <div className="mb-10 ">
          <h3 className="font-bold sm:text-4xl text-[2.4em] mb-5">
            Drive <span className="bg-authbg px-2.5">10x user engagement</span>{" "}
            on your next product announcement
          </h3>
          <h6 className="sm:text-[26px] text-xl font-normal">
            With Beamer, inform and educate users right where they are.
          </h6>
        </div>
        <div>
          <p className="text-[18px] mb-5">
            On average, product and GTM teams that use Beamer. report:
          </p>

          <ul className="flex flex-col gap-[10px] mb-5">
            {achievements.map((item) => (
              <li className="flex gap-1 ml-[10px] ">
                <Icons.check className=" " />
                <p>
                  <span className="font-bold">
                    {item.substring(0, item.indexOf(" "))}
                  </span>
                  {item.substring(item.indexOf(" "))}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className=" ">
          <p className="mb-[10px]">
            Beamer is the most loved user engagement platform by product teams
            across the globe
          </p>

          <div className="flex sm:gap-[10px] gap-0">
            {customerLogoNamesAndPaths.map((item) => (
              <img
                className="sm:w-full sm:h-full w-[88px] h-[44px]"
                src={item.path}
                alt={item.name}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
