import { useState } from "react";

export function UpdatePassword() {
  const [showModal, setShowModal] = useState(true);
  const [password, setPassword] = useState("");
  const [rpassword, setRPassword] = useState("");

  const isFormValid = () => {
    return rpassword === password && isSecurePassword();
  };

  const isSecurePassword = () => {
    return password.length >= 8;
  };

  return (
    <>
      <button
        className="bg-white-600 mb-1 mr-1 rounded px-6 py-3 text-sm font-bold uppercase text-black shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-pink-600"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Update Password
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative mx-auto my-6 w-auto max-w-3xl">
              {/*content*/}
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
                  <h3 className="text-3xl font-semibold text-blue-600">
                    Modal Title
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
                <div className="relative flex-auto p-6">
                  {/*Contraseña nueva*/}
                  <div className="mb-3 pt-0">
                    <input
                      type="password"
                      placeholder="Contraseña nueva"
                      className="relative w-full rounded border border-slate-300 bg-white bg-white px-3 py-3 text-sm text-slate-600 placeholder-slate-300 outline-none focus:outline-none focus:ring"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {/*Mensaje de contraseña insegura*/}
                    {!isSecurePassword() ? (
                      <span className="mr-1 inline-block rounded bg-red-200 px-1 py-0 text-xs font-semibold uppercase uppercase text-red-600 last:mr-0">
                        La contraseña debe tener al menos 8 caracteres
                      </span>
                    ) : null}
                  </div>
                  {/*Repetir contraseña nueva*/}
                  <div className="mb-3 pt-0">
                    <input
                      type="password"
                      placeholder="Repita la contraseña"
                      className="relative w-full rounded border border-slate-300 bg-white bg-white px-3 py-3 text-sm text-slate-600 placeholder-slate-300 outline-none focus:outline-none focus:ring"
                      value={rpassword}
                      onChange={(e) => setRPassword(e.target.value)}
                    />
                    {/*Mensaje de contraseña no coincide*/}
                    {!isFormValid() ? (
                      <span className="mr-1 inline-block rounded bg-red-200 px-1 py-0 text-xs font-semibold uppercase uppercase text-red-600 last:mr-0">
                        Las contraseñas no coinciden
                      </span>
                    ) : null}
                  </div>
                  {/*Contraseña nueva*/}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
                  <button
                    className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setPassword("");
                      setRPassword("");
                    }}
                  >
                    Close
                  </button>
                  <button
                    className="mb-1 mr-1 rounded bg-blue-600 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                    type="button"
                    onClick={() => setShowModal(false)}
                    disabled={!isFormValid()}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
}
