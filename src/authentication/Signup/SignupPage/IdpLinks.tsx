import { Icons } from "@/components/icons";

const idpStyles = "h-[26px] w-[26px] ";

// yahoo example:  https://mail.yahoo.com/d/search/keyword=from:@home.comms.yahoo.net%20after:%272024-02-25%27%20before:%272024-02-27%27?reason=onboarded
// gmail example: https://mail.google.com/mail/u/0/#search/from%3A%40getbeamer.com+in%3Aanywhere+has%3Akeywords+before%3A2024%2F02%2F27+after%3A2024%2F02%2F25
// outlook

const idpButtons = [
  {
    key: "gmail",
    description: "Open in Gmail",
    iconName: <Icons.gmail className={idpStyles} />,
  },
  {
    key: "outlook",
    description: "Open in Outlook",
    iconName: <Icons.outlookVerify className={idpStyles} />,
  },
  {
    key: "yahoo",
    description: "Open in Yahoo",
    iconName: <Icons.yahooVerify className={idpStyles} />,
  },
];

export default function IpdLinks() {
  function encodeURL(key: string): string {
    const createLink = (params: any, baseURL: string) => {
      const keys = Object.keys(params);
      return (
        baseURL +
        keys
          .map(
            (key) =>
              encodeURIComponent(key) + ":" + encodeURIComponent(params[key])
          )
          .join(" ")
      );
    };
    switch (key) {
      case "gmail": {
        const params = {
          from: "@getbeamer.com",
          in: "anywhere",
          // before: new Date(Date.now() + 86400000)
          //   .toISOString()
          //   .replace(/-/g, "/")
          //   .split("T")[0],
          // after: new Date(Date.now() - 86400000)
          //   .toISOString()
          //   .replace(/-/g, "/")
          //   .split("T")[0],
          newer_than: "1h",
        };
        const baseURL = "https://mail.google.com/mail/u/0/#search/";
        return createLink(params, baseURL);
      }
      case "yahoo": {
        const params = {
          from: "@getbeamer.com",
          after: ` "${
            new Date(Date.now() - 86400000)
              .toISOString()
              .replace(/-/g, "/")
              .split("T")[0]
          }" `,
          before: ` "${
            new Date(Date.now() + 86400000)
              .toISOString()
              .replace(/-/g, "/")
              .split("T")[0]
          }" `,
        };

        const baseURL = "https://mail.yahoo.com/d/search/keyword=";
        return createLink(params, baseURL);
      }
      case "outlook": {
        const baseURL = "https://outlook.live.com/";
        return baseURL;
      }
      default:
        return "";
    }
  }

  return (
    <div className="flex flex-col gap-3 md:mb-8 mb-4">
      {idpButtons.map((item) => (
        <a
          className=" w-[280px] h-[50px] md:text-base text-sm flex justify-start items-center md:gap-4 gap-2 pl-4 rounded-md  bg-white border border-[#E5E5E5] hover:bg-[#F8FAFE] hover:border-[#D2E3FC]"
          target="_blank"
          href={encodeURL(item.key)}
        >
          {item.iconName}

          {item.description}
        </a>
      ))}
    </div>
  );
}
