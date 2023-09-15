import { Link } from "react-router-dom";

interface NavbarButtonGroupProps {
  text: string;
  to: string;
}

export function NavbarButtonGroup({ text, to }: NavbarButtonGroupProps) {
  return (
    <div className="flex items-center">
      <Link
        to={to}
        className="mx-0 rounded-lg border border-blue-600 bg-white p-2 text-lg font-bold text-blue-600"
      >
        {text}
      </Link>
    </div>
  );
}
