import { useContext, useState } from "react";
import { updatepasswordService } from "../../services/auth/updatepassword.service";
import { FieldValues, useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

export function UpdatePassword() {
  const { session } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  interface UpdatepasswordRequest {
    oldPassword: string;
    newPassword: string;
    token: string;
  }

  const onSubmit = async (formData: FieldValues, token: string) => {
    const req: UpdatepasswordRequest = {
      oldPassword: formData.password,
      newPassword: formData.confirmPassword,
      token: token
    };
    if (!errors.password && !errors.confirmPassword) {
      try {
        const response = await updatepasswordService(req);
        if (response.success === true) {
          toast.success("Password updated successfully");
        } else {
          toast.error("Failed to update password");
        }
      } catch (error) {
        toast.error("Failed to update password");
      }
    }
  };

  return (
    <>
      <button
        className="w-full rounded-lg border border-blue-600 bg-white p-2 text-center text-lg font-bold text-blue-600"
        onClick={() => setShowModal(true)}
      >
        Update Password
      </button>
      {showModal ? (
        <div className="absolute top-full mt-4 flex w-4/5 flex-col items-center justify-center gap-4 border bg-white p-4">
          <form
            onSubmit={handleSubmit((formData) =>
              onSubmit(formData, session!.token)
            )}
            className="g-2 w-full"
          >
            <p className="m-2 ml-2 text-center text-2xl font-bold text-blue-600">
              Update Password
            </p>
            <input
              type="password"
              placeholder="Password"
              className={`text-xm h-auto w-full rounded-2xl border-2 border-blue-700 p-2 text-black ${
                errors.password ? "border-red-500" : "mb-6"
              }`}
              {...register("password", {
                required: {
                  value: true,
                  message: "Password required"
                },
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters"
                }
              })}
            />
            {errors.password && (
              <span className="mt-1 text-sm text-red-500">
                {String(errors.password.message)}
              </span>
            )}
            <input
              type="password"
              placeholder="Confirm password"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "Password required"
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                  message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                }
              })}
              className={`text-xm h-auto w-full rounded-2xl border-2 border-blue-700 p-2 text-black ${
                errors.confirmPassword ? "border-red-500" : "mb-6"
              }`}
            />
            {errors.confirmPassword && (
              <span className="mt-1 text-sm text-red-500">
                {String(errors.confirmPassword.message)}
              </span>
            )}
            {/*footer*/}
            <footer>
              <button
                className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                type="button"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Close
              </button>
              <button
                type="submit"
                className="mb-1 mr-1 rounded bg-blue-600 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
              >
                Save Changes
              </button>
            </footer>
          </form>
        </div>
      ) : null}
    </>
  );
}