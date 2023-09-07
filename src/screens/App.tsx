import {
  ButtonLogin,
  ButtonCreate,
  ButtonRegister
} from "../components/Button/Button";
import { FeatureTitle, FeatureDescription } from "../components/Text/Text";
export function App() {
  return (
    <main className="h-screen w-full">
      <div className="min-h-1/2 bg-blue-600 pb-16">
        <div className=" mx-auto max-w-screen-2xl">
          <div className="left-4 top-4 flex items-center font-bold text-white sm:left-8 md:left-12 lg:left-16 xl:left-20">
            <img
              src="/Logos/logo.png"
              alt=""
              className="mr-2 h-16 w-16 rounded-md border border-gray-500"
            />
            <p className="ml-2 text-2xl">CapyFile</p>
            <div className="flex flex-grow justify-end gap-4">
              <ButtonLogin text="Login" type="anchor" />
              <ButtonRegister text="Register" type="anchor" />
            </div>
          </div>

          <div className="top-38 left-4 m-4 mt-16 max-w-md font-bold text-white sm:left-8 md:left-12 lg:left-16 xl:left-20">
            <h1 className=" text-5xl">Access your files everywhere</h1>
            <div className="mt-14 max-w-md">
              <h1 className=" text-2xl">
                Effortlessly store, organize and access your files with built-in
                redundancy.
              </h1>
            </div>
            <div className="mt-16">
              <ButtonCreate
                text="Create an Account"
                type="anchor"
                className="mt-2 "
              />
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-1/2 relative bg-white">
        <div className="mx-auto max-w-screen-2xl">
          <div className=" top-1/5 left-0 mt-10 w-full text-center">
            <h2 className="text-2xl font-bold text-blue-600">MAIN FEATURES</h2>
          </div>

          <div className=" left-0 top-1/3 mt-14 flex w-full flex-col items-center  justify-center sm:flex-row">
            <div className="m-2 rounded-lg bg-gray-100 p-10">
              <div className="mx-1 flex flex-col items-center p-2 text-center sm:mx-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-folder-key"
                >
                  <path d="M10 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v2" />
                  <circle cx="16" cy="20" r="2" />
                  <path d="m22 14-4.5 4.5" />
                  <path d="m21 15 1 1" />
                </svg>
                <FeatureTitle text="File key" />
                <FeatureDescription text="Keep your documents safe and secure in our distributed storage system" />
              </div>
            </div>

            <div className="m-2 rounded-lg bg-gray-100 p-10">
              <div className="mx-1 mt-2 flex flex-col items-center p-2 text-center sm:mx-2 sm:mt-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-file-down"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="M12 18v-6" />
                  <path d="m9 15 3 3 3-3" />
                </svg>
                <FeatureTitle text="Save your files" />
                <FeatureDescription text="Store your files using our cloud service and download them from any other device." />
              </div>
            </div>

            <div className="m-2 rounded-lg bg-gray-100 p-10">
              <div className="mx-1 mt-2 flex flex-col items-center p-2 text-center sm:mx-2 sm:mt-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-files"
                >
                  <path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z" />
                  <path d="M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8" />
                  <path d="M15 2v5h5" />
                </svg>
                <FeatureTitle text="Manage your documents" />
                <FeatureDescription text="Use our system to organize and manage your files. Access them at any time." />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
