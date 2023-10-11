import { Button } from "../components/Button/Button";
import { FeatureCard } from "../components/FeatureCard/FeatureCard";

import { FileDown, Files, FolderKey } from "lucide-react";

export function App() {
  return (
    <main>
      <header className="min-h-1/2 bg-blue-600 pb-12 pt-8">
        <div className="mx-auto max-w-screen-2xl px-4">
          <div className="flex max-w-md flex-col items-start gap-8 font-bold text-white">
            <h1 className="text-5xl">Access your files everywhere</h1>
            <p className="text-2xl">
              Effortlessly store, organize and access your files with built-in
              redundancy.
            </p>
            <Button text="Create an Account" to="/register" />
          </div>
        </div>
      </header>

      <section className="mx-auto mt-10 max-w-screen-2xl px-4">
        <h2 className="text-center text-4xl font-bold text-blue-600">
          MAIN FEATURES
        </h2>
        <div className="mt-10 flex flex-col items-stretch justify-center gap-8 md:flex-row">
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
      </section>
    </main>
  );
}
