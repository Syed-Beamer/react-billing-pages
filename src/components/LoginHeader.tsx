import BeamerLogo from "@/assets/BeamerLogo.svg";

interface LoginHeaderProps {
  name: string;
  path: string;
  linkName: string;
}

export default function LoginHeader({
  name,
  path,
  linkName,
}: LoginHeaderProps) {
  return (
    <header className="mt-12">
      <img
        src={BeamerLogo}
        alt="Beamer Logo"
        className="sm:ml-12 ml-2 mb-9 h-10 w-40"
      />
      <div className="flex justify-between items-center sm:mx-12 mx-2">
        <h3 className="text-[25px]">{name}</h3>
        <a
          href={path}
          className="text-[13px] text-authBlue hover:underline hover:underline-offset-4"
        >
          {linkName}
        </a>
      </div>
    </header>
  );
}
