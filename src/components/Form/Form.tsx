import React, { useState } from "react";
import { Link } from "react-router-dom";

interface LoginFormProps {
  onSubmit?: (username: string, password: string) => Promise<void>;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (onSubmit) {
      try {
        //Axios?
        await onSubmit(username, password);
      } catch (error) {
        console.error("Error de authentication:", error);
      }
    }
  };

  return (
    <div className="mt-1 border border-gray-200 p-5 text-center shadow-sm">
      <div>
        <h2 className="mb-4 text-6xl font-bold text-blue-600">Login</h2>
      </div>
      <form onSubmit={handleSubmit} className="">
        <div className="mb-6 flex flex-col items-start">
          <label htmlFor="username" className="p-2 font-bold">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="rounded-2xl border-2 border-blue-700 p-1 text-3xl"
          />
        </div>

        <div className="mb-6 flex flex-col items-start">
          <label htmlFor="password" className="p-2 font-bold">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="block rounded-2xl border-2 border-blue-700 p-1 text-3xl"
          />
        </div>

        <button
          type="submit"
          className="h-auto w-full rounded-2xl bg-blue-700 px-4 py-2 font-bold text-white hover:bg-blue-900"
        >
          Submit
        </button>

        <p className="font-bold text-blue-700">
          No tienes una cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </form>
    </div>
  );
}
