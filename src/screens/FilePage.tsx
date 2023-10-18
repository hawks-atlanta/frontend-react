import { Sidebar } from "../components/Sidebar/Sidebar";
import { listFilesService } from "../services/files/list-file.service";
import { useContext, useEffect, useState } from "react";
import { File } from "../types/entities";
import { FileElement } from "../components/FileElement/FileCard";
import { AuthContext } from "../context/AuthContext";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function FilePage() {
  // Url state
  const [searchParams, _setSearchParams] = useSearchParams();
  const directory = searchParams.get("directory");
  const navigate = useNavigate();

  const { session } = useContext(AuthContext);

  // Files state
  const [isLoading, setIsLoading] = useState(true);
  const [files, setFiles] = useState<File[]>([]);

  const fetchFiles = async () => {
    setIsLoading(true);
    const response = await listFilesService({
      token: session?.token || "",
      directory: directory
    });

    if (response.success) {
      setFiles(response.files);
    } else {
      toast.error(response.msg);
      navigate("/");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchFiles();
  }, [directory]);

  const addNewDirectory = (dir: File) => {
    setFiles([...files, dir]);
  };

  return (
    <div className="flex h-[calc(100vh-5rem)]">
      <div className="w-1/5 bg-gray-200">
        <Sidebar addFolderCallback={addNewDirectory} />
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
