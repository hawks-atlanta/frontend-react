interface ButtonProps {
  text: string;
  type: "anchor" | "button";
}

export function Button({ text, type }: ButtonProps) {
  if (type === "anchor") {
    return <a href="#">{text}</a>;
  }

  return <button type="button">{text}</button>;
}
