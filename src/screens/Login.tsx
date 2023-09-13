import React, { useState } from "react";
import { Link } from "react-router-dom";

export function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Axios
      // console.log(`Username: ${formData.username}, Password: ${formData.password}`);
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <main className="flex items-center justify-center">
      <div className="mt-8 border border-gray-200 p-5 text-center shadow-sm">
        <h2 className="mb-4 text-6xl font-bold text-blue-600">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="username" className="font-bold">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInput}
              required
              className="text-xm h-12 w-full rounded-2xl border-2 border-blue-700 p-1"
            />
          </div>

          <div className="flex flex-col items-start gap-2">
            <label htmlFor="password" className="font-bold">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInput}
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

          <p className="font-bold">
            No tienes una cuenta?{" "}
            <Link className="text-blue-700" to="/register">
              Regístrate
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
