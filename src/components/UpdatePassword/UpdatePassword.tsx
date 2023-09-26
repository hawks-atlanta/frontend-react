import { useState } from "react";
import { useForm } from "react-hook-form";

export function UpdatePassword() {
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const onSubmit = handleSubmit((data) =>{
    console.log(data)
    });

  return (
    <>
      <div
        className="bg-white-600 block px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-gray-900"
        style={{ cursor: "pointer" }}
        onClick={() => setShowModal(true)}
      >
        Update Password
      </div>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative mx-auto my-6 w-auto max-w-3xl">
              {/*content*/}
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
                  <h3 className="text-3xl font-semibold text-blue-600">
                    Update Password
                  </h3>
                  <button
                    className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form onSubmit={onSubmit}>
                  <div className="relative flex-auto p-6">
                    {/*New password*/}
                  <div className="mb-3 pt-0">
                  <input type="password"
                  className="relative w-full rounded border bg-white px-3 py-3 text-sm text-slate-600 placeholder-slate-300 outline-none focus:outline-none focus:ring"
                  {...register("password", 
                  {
                    required:{
                      value:true,
                      message:"Password required"
                    },
                    minLength:{
                      value:8,
                      message:"Password must be at least 8 characters"
                    },
                    pattern:{
                      value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                      message:"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                    }
                  })} 
                  />
                  {errors.password && <span className="text-red-500 text-sm mt-1">{String(errors.password.message)}</span>}
                  
                    {/*Confirm new password*/}
                    <div className="mt-2 pt-0">
                      <input type="password" 
                  {...register("confirmPassword", 
                  {
                    required:{
                      value:true,
                      message:"Password required"
                    },
                    validate: value => value === watch('password') || "Passwords do not match"
                  }
                  
                  )} 
                  className="relative w-full rounded border bg-white px-3 py-2 text-sm text-slate-600 placeholder-slate-300 outline-none focus:outline-none focus:ring"/>
                  {errors.confirmPassword && <span className="text-red-500 text-sm mt-1">{String(errors.confirmPassword.message)}</span>}
                    </div>
                  </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
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
                      className="mb-1 mr-1 rounded bg-blue-600 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
}