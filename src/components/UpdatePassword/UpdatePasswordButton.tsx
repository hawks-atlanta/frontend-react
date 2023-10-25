import { useContext, useRef, useState } from "react";
import { updatepasswordService } from "../../services/auth/updatepassword.service";
import { FieldValues, useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

export function UpdatePassword() {
  const { session } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
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
      newPassword: formData.newPassword,
      token: token
    };
    if (!errors.password && !errors.newPassword) {
      try {
        const response = await updatepasswordService(req);
        if (response.success === true) {
          toast.success("Password updated successfully");
          setShowModal(false);
        } else {
          toast.error("Failed to update password");
        }
      } catch (error) {
        toast.error("Failed to update password");
      }
      formRef.current?.reset();
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
        <div className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur-sm">
          <form
            ref={formRef}
            onSubmit={handleSubmit((formData) =>
              onSubmit(formData, session!.token)
            )}
            className="relative w-80 rounded-md border border-gray-300 bg-white p-4 shadow-md"
          >
            <h1 className="mb-4 max-w-[85%] text-xl text-blue-600">
              Update Password
            </h1>
            <input
              type="password"
              aria-label="Current password"
              placeholder="Current password"
              className={`text-xm h-auto min-w-[100%] rounded-2xl border-2 border-blue-700 p-2 text-black ${
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
            <br />
            {errors.password && (
              <span className="mt-1 text-sm text-red-500">
                {String(errors.password.message)}
              </span>
            )}
            <input
              type="password"
              placeholder="New password"
              aria-label="New password"
              {...register("newPassword", {
                required: {
                  value: true,
                  message: "Password required"
                },
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters"
                }
              })}
              className={`text-xm h-auto min-w-[100%] rounded-2xl border-2 border-blue-700 p-2 text-black ${
                errors.newPassword ? "border-red-500" : "mb-6"
              }`}
            />
            <br />
            {errors.newPassword && (
              <span className="mt-1 text-sm text-red-500">
                {String(errors.newPassword.message)}
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
