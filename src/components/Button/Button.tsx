interface ButtonProps {
  text: string;
  type: "anchor" | "button";
  className?: string;
}
import { Link } from "react-router-dom";
const register = "/register";

export function ButtonLogin({ text, type }: ButtonProps) {
  const login = "/login";

  if (type === "anchor") {
    return (
      <Link
        to={login}
        className="flex h-10 w-24 items-center justify-center rounded-lg bg-white font-bold text-blue-600"
      >
        {text}
      </Link>
    );
  }

  return (
    <Link
      to={login}
      className="h-10 w-24 rounded-lg bg-white p-2 font-bold text-blue-600"
    >
      {text}
    </Link>
  );
}

export function ButtonRegister({ text, type }: ButtonProps) {
  if (type === "anchor") {
    return (
      <Link
        to={register}
        className="flex h-10 w-24 items-center justify-center rounded-lg bg-white p-2 font-bold text-blue-600
        "
      >
        {text}
      </Link>
    );
  }

  return (
    <Link
      to={register}
      className="flex h-10 w-24 items-center justify-center rounded-lg bg-white p-2 font-bold text-blue-600
      "
    >
      {text}
    </Link>
  );
}

export function ButtonCreate({ text, type }: ButtonProps) {
  if (type === "anchor") {
    return (
      <Link
        to={register}
        className="`w-50 ${className}` rounded-lg bg-white p-2 text-xl font-bold text-blue-600
        "
      >
        {text}
      </Link>
    );
  }

  return (
    <Link
      to={register}
      className="`w-50 ${className}` rounded-lg bg-white p-2 text-xl font-bold text-blue-600
      "
    >
      {text}
    </Link>
  );
}
