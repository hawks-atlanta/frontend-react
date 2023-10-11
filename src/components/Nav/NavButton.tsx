import { Link } from "react-router-dom";

interface NavButtonProps {
  text: string;
  to: string;
}

export function NavButton({ text, to }: NavButtonProps) {
  return (
    <Link
      to={to}
      className="w-full rounded-lg border border-blue-600 bg-white p-2 text-center text-lg font-bold text-blue-600"
    >
      {text}
    </Link>
  );
}
