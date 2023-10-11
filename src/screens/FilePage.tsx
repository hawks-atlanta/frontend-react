import { Sidebar } from "../components/Sidebar/Sidebar";
import { File } from "../components/FileElement/File";

export function FilePage() {
  const files = Array.from({ length: 2 }, (_, index) => (
    <File
      key={index}
      fileName={`Folder ${index + 1}`}
      fileExtension=""
      uuid={index + 1}
      fileType={"directory"}
    />
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
        <div className="flex flex-wrap justify-start gap-4 p-2">
          {currentFiles.map((file, index) => (
            <div key={index}>{file}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
