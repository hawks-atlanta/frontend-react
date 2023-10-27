interface ButtonSubmitProps {
  onClick: () => void;
  text: string;
}

export function ButtonSubmit({ onClick, text }: ButtonSubmitProps) {
  return (
    <button
      className="hover-bg-blue-700 ml-4 mt-2 rounded-full bg-blue-600 px-4 py-2 text-white"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
