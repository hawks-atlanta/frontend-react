import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { registerService } from "../services/auth/register.service";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

interface FormData {
  username: "";
  password: "";
  confirmPassword: "";
}

export function Register() {
  const navigate = useNavigate();
  const { updateSession } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const registrationResponse = await registerService(data);

    if (registrationResponse.success && registrationResponse.token) {
      updateSession(data.username, registrationResponse.token);
      navigate("/files");
    } else {
      console.error("Error en el registro:", registrationResponse.msg);
      if (!registrationResponse.token) {
        console.error("Token no válido");
      }
    }
  };

  return (
    <main className="flex items-center justify-center px-4">
      <div className="mt-8 w-full max-w-md gap-3 border border-gray-200  p-5 shadow-sm">
        <h2 className="mb-4 text-center text-6xl font-bold text-blue-600">
          Register
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className=" items-start gap-2">
            <label htmlFor="username" className="font-bold">
              Username:
            </label>
            <input
              id="username"
              className={`text-xm h-auto w-full rounded-2xl border-2 border-blue-700 p-2 ${
                errors.username ? "border-red-500" : ""
              }`}
              {...register("username", {
                required: "The username is required"
              })}
            />
            {errors.username && (
              <span className="text-red-500">{errors.username.message}</span>
            )}
          </div>

          <div className=" items-start gap-2">
            <label htmlFor="password" className="font-bold">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className={`text-xm h-auto w-full rounded-2xl border-2 border-blue-700 p-2 ${
                errors.password ? "border-red-500" : ""
              }`}
              {...register("password", {
                required: "The password is required",
                validate: {
                  minLength: (value) =>
                    value.length >= 8 ||
                    "The password must be at least 8 characters"
                }
              })}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>

          <div className=" items-start gap-2">
            <label htmlFor="confirmPassword" className="font-bold">
              Confirm password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              className={`text-xm h-auto w-full rounded-2xl border-2 border-blue-700 p-2 ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
              {...register("confirmPassword", {
                required: "The password confirmation is required",
                validate: {
                  matchPassword: (value) => {
                    const { password } = getValues();
                    return password === value || "The passwords do not match";
                  }
                }
              })}
            />
            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="h-auto w-full rounded-2xl bg-blue-700 px-4 py-2 font-bold text-white hover:bg-blue-900"
          >
            Submit
          </button>

          <p className="text-center font-bold">
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
