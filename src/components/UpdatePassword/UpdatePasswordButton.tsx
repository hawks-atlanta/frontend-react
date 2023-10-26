import { useContext, useRef, useState } from "react";
import { updatepasswordService } from "../../services/auth/updatepassword.service";
import { FieldValues, useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { Dialog } from "../../components/Dialog";
import { ButtonSubmit } from "../Button/ButtonSubmit";

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

  const closeModal = () => setShowModal(false);

  const onSubmit = async (formData: FieldValues, token: string) => {
    const req: UpdatepasswordRequest = {
      oldPassword: formData.password,
      newPassword: formData.newPassword,
      token: token
    };
    if (!errors.password && !errors.newPassword) {
      const response = await updatepasswordService(req);
      if (response.success === true) {
        toast.success("Password updated successfully");
        setShowModal(false);
      } else {
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
        <Dialog isOpen={showModal} onClose={closeModal} title="Update Password">
          <form ref={formRef}>
            <input
              type="password"
              aria-label="Current password"
              placeholder="Current password"
              className={`w-full rounded-lg border p-2 text-black ${
                errors.password ? "" : "mb-4"
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
              className={`w-full rounded-lg border p-2 text-black ${
                errors.password ? "" : "mb-4"
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
                className="hover-bg-blue-700 mt-2 rounded-full bg-blue-600 px-4 py-2 text-white"
                type="button"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Close
              </button>
              <ButtonSubmit
                onClick={handleSubmit((formData) =>
                  onSubmit(formData, session!.token)
                )}
                text={"Save changes"}
              />
            </footer>
          </form>
        </Dialog>
      ) : null}
    </>
  );
}
