import { Button } from "../components/Button/Button";
import { FeatureCard } from "../components/FeatureCard/FeatureCard";

import { FileDown, Files, FolderKey } from "lucide-react";

export function App() {
  return (
    <main>
      <div className="min-h-1/2 bg-blue-600 py-8">
        <div className=" mx-auto max-w-screen-2xl">
          <div className="max-w-md font-bold text-white">
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

      <section className=" bg-white">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mt-10 w-full text-center">
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
