interface ButtonProps {
  text: string;
  type: "anchor" | "button";
  className?: string;
}

export function ButtonLogin({ text, type }: ButtonProps) {
  if (type === "anchor") {
    return <a href="#">{text}</a>;
  }

  return (
    <button
      className="w-24 rounded-lg bg-white p-2 font-bold text-blue-600"
      type="button"
    >
      {text}
    </button>
  );
}

export function ButtonRegister({ text, type }: ButtonProps) {
  if (type === "anchor") {
    return <a href="#">{text}</a>;
  }

  return (
    <button
      className="w-24 rounded-lg bg-white p-2 font-bold text-blue-600"
      type="button"
    >
      {text}
    </button>
  );
}

export function ButtonCreate({ text, type, className }: ButtonProps) {
  if (type === "anchor") {
    return (
      <a href="#" className={className}>
        {text}
      </a>
    );
  }

  return (
    <button
      className={`w-50 rounded-lg bg-white p-2 text-xl font-bold text-blue-600 ${className}`}
      type="button"
    >
      {text}
    </button>
  );
}
