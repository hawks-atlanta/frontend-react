import { Sidebar } from "../components/Sidebar/Sidebar";
import { FileElement } from "../components/FileElement/FileCard";
import { FilesContext } from "../context/index";
import { useContext } from "react";

export function FilePage() {
  const { areFilesLoading: isLoading, files } = useContext(FilesContext);

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
          {isLoading ? (
            <div className="w-full p-2 text-center text-gray-500">
              Loading...
            </div>
          ) : files.length > 0 ? (
            files.map((file, index) => (
              <FileElement
                key={index}
                fileName={file.name}
                fileExtension={file.extension || ""}
                uuid={file.uuid}
                fileType={file.isFile ? "file" : "folder"}
              />
            ))
          ) : (
            <div className="w-full p-2 text-center text-gray-500">
              No files to display.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
