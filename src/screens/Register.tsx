import React, { useState } from "react";
import { Link } from "react-router-dom";

export function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Validations
      if (!formData.username) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: "Username is required"
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: ""
        }));
      }

      if (!formData.password) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Password is required"
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: ""
        }));
      }

      if (formData.password !== formData.confirmPassword) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "Passwords do not match"
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: ""
        }));
      }

      if (formData.username && formData.password === formData.confirmPassword) {
        //Axios
      }
    } catch (error) {
      console.error("Error register:", error);
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  return (
    <main className="flex items-center justify-center px-4">
      <div className="mt-8 w-full max-w-md border border-gray-200 p-5 text-center shadow-sm">
        <h2 className="mb-4 text-6xl font-bold text-blue-600">Register</h2>
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
              className={`text-xm h-12 w-full rounded-2xl border-2 border-blue-700 p-1 ${
                errors.username ? "border-red-500" : ""
              }`}
            />
            {errors.username && (
              <span className="text-red-500">{errors.username}</span>
            )}
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
              className={`text-xm h-12 w-full rounded-2xl border-2 border-blue-700 p-1 ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password}</span>
            )}
          </div>

          <div className="flex flex-col items-start gap-2">
            <label htmlFor="confirmPassword" className="font-bold">
              Confirm password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInput}
              className={`text-xm h-12 w-full rounded-2xl border-2 border-blue-700 p-1 ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
            />
            {errors.confirmPassword && (
              <span className="text-red-500">{errors.confirmPassword}</span>
            )}
          </div>

          <button
            type="submit"
            className="h-auto w-full rounded-2xl bg-blue-700 px-4 py-2 font-bold text-white hover:bg-blue-900"
          >
            Submit
          </button>

          <p className="font-bold">
            ¿Ya tienes una cuenta?{" "}
            <Link className="text-blue-700" to="/login">
              Iniciar sesión
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
