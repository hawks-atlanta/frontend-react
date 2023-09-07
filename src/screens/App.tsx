import { Button } from "../components/Button/Button";
import { FeatureCard } from "../components/Text/Text";

import { FileDown, Files, FolderKey } from "lucide-react";

export function App() {
  return (
    <main className="h-screen w-full">
      <div className="min-h-1/2 bg-blue-600 pb-16">
        <div className=" mx-auto max-w-screen-2xl">
          <nav className="left-4 top-4 flex items-center font-bold text-white sm:left-8 md:left-12 lg:left-16 xl:left-20">
            <img
              src="/Logos/logo.png"
              alt=""
              className="mr-2 h-16 w-16 rounded-md border border-gray-500"
            />
            <p className="ml-2 text-2xl">CapyFile</p>
            <div className="flex flex-grow justify-end gap-4">
              <Button text="Login" to="/login" />
              <Button text="Register" to="/register" />
            </div>
          </nav>

          <div className="top-38 left-4 m-4 mt-16 max-w-md font-bold text-white sm:left-8 md:left-12 lg:left-16 xl:left-20">
            <h1 className=" text-5xl">Access your files everywhere</h1>
            <div className="mt-14 max-w-md">
              <h1 className=" text-2xl">
                Effortlessly store, organize and access your files with built-in
                redundancy.
              </h1>
            </div>
            <div className="mt-16">
              <Button text="Create an Account" to="/register" />
            </div>
          </div>
        </div>
      </div>

      <section className="min-h-1/2  bg-white">
        <div className="mx-auto max-w-screen-2xl">
          <div className=" top-1/5 left-0 mt-10 w-full text-center">
            <h2 className="text-2xl font-bold text-blue-600">MAIN FEATURES</h2>
          </div>

          <div className="left-0 top-1/3 mt-14 flex w-full flex-col items-center justify-center sm:flex-row">
            <FeatureCard
              icon={<FolderKey size={52} />}
              title="File key"
              description="Keep your documents safe and secure in our distributed storage system."
            />
            <FeatureCard
              icon={<FileDown size={52} />}
              title="Save your files"
              description="Store your files using our cloud service and download them from any other device."
            />
            <FeatureCard
              icon={<Files size={52} />}
              title="Manage your documents"
              description="Use our system to organize and manage your files. Access them at any time."
            />
          </div>
        </div>
      </section>
    </main>
  );
}
