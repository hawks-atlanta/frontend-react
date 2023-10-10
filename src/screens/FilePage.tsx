import { Sidebar } from "../components/Sidebar/Sidebar";
import { File } from "../components/FileElement/File";

export function FilePage() {
  const files = Array.from({ length: 25 }, (_, index) => (
    <File key={index} fileName={`File ${index + 1}`} fileExtension="txt" />
  ));

  const currentFiles = files;

  return (
    <div className="flex min-h-screen">
      <div className="w-1/5 bg-gray-200">
        <Sidebar />
      </div>
      <div className="mx-6 flex w-4/5 flex-col bg-white">
        <div className="p-2">
          <input
            type="text"
            placeholder="Search files"
            className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2"
          />
        </div>
        <div className="flex justify-start overflow-y-auto">
          <div className="flex flex-wrap justify-start">
            {currentFiles.map((file, index) => (
              <div key={index} className="mb-2 mr-2 p-1">
                {file}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
