import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

interface FormData {
  username: "";
  password: "";
  confirmPassword: "";
}

export function Register() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues
  } = useForm<FormData>();

  const onSubmit = async () => {};

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
            <Controller
              name="username"
              control={control}
              defaultValue=""
              rules={{ required: "Username is required" }}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    type="text"
                    id="username"
                    className={`text-xm h-auto w-full rounded-2xl border-2 border-blue-700 p-2 ${
                      errors.username ? "border-red-500" : ""
                    }`}
                  />
                  {errors.username && (
                    <span className="text-red-500">
                      {errors.username.message}
                    </span>
                  )}
                </div>
              )}
            />
          </div>

          <div className=" items-start gap-2">
            <label htmlFor="password" className="font-bold">
              Password:
            </label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    type="password"
                    id="password"
                    className={`text-xm h-auto w-full rounded-2xl border-2 border-blue-700 p-2 ${
                      errors.password ? "border-red-500" : ""
                    }`}
                  />
                  {errors.password && (
                    <span className="text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </div>
              )}
            />
          </div>

          <div className=" items-start gap-2">
            <label htmlFor="confirmPassword" className="font-bold">
              Confirm password:
            </label>
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{
                required: "Password confirmation is required",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match"
              }}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    type="password"
                    id="confirmPassword"
                    className={`text-xm h-auto w-full rounded-2xl border-2 border-blue-700 p-2 ${
                      errors.confirmPassword ? "border-red-500" : ""
                    }`}
                  />
                  {errors.confirmPassword && (
                    <span className="text-red-500">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>
              )}
            />
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
