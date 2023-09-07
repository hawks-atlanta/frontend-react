import { Link } from "react-router-dom";

interface ButtonProps {
  text: string;
  to: string;
}

export function Button({ text, to }: ButtonProps) {
  return (
    <Link
      to={to}
      className="rounded-lg bg-white p-2 text-lg font-bold text-blue-600"
    >
      {text}
    </Link>
  );
}
