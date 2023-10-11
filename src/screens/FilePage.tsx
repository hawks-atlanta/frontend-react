import { Sidebar } from "../components/Sidebar/Sidebar";
import { File } from "../components/FileElement/File";

export function FilePage() {
  const files = Array.from({ length: 32 }, (_, index) => {
    const isFile = index % 2 === 0;
    return (
      <File
        key={index}
        fileName={`${isFile ? "file" : "folder"} ${index + 1}`}
        fileExtension={isFile ? "zip" : ""}
        uuid={index + 1}
        fileType={isFile ? "archive" : "folder"}
      />
    );
  });

  const currentFiles = files;

  return (
    <div className="flex h-[calc(100vh-5rem)]">
      <div className="w-1/5 bg-gray-200">
        <Sidebar />
      </div>
      <div className="mx-6 flex w-4/5 flex-col overflow-y-auto bg-white">
        <div className="p-2">
          <input
            type="text"
            placeholder="Search files"
            className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2"
          />
        </div>
        <div className="flex flex-wrap justify-start gap-4 p-2">
          {currentFiles}
        </div>
      </div>
    </div>
  );
}
