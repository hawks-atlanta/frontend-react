import { Link } from "react-router-dom";

interface NavbarButtonGroup {
  text: string;
  to: string;
}

export function NavbarIcon({ text, to }: NavbarButtonGroup) {
  return (
    <div className="flex items-center">
      <Link
        to={to}
        className="rounded-lg border border-blue-600 bg-white p-2 text-lg font-bold text-blue-600 "
      >
        {text}
      </Link>
      <span className="mx-1"></span>
    </div>
  );
}
