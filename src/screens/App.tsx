import { useState } from "react";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-2 bg-black">
      <h1 className="text-xl text-white">
        Vite + React + Typescript + TailwindCSS | Hi
      </h1>
      <button
        type="button"
        className="bg-white p-2 text-black"
        onClick={() => {
          setCount((count) => count + 1);
        }}
      >
        Increase
      </button>
      <p className="text-white">Count: {count}</p>
    </main>
  );
}
