import { Sidebar } from "../components/Sidebar/Sidebar";
import { listFilesService } from "../services/files/list-file.service";
import { useContext, useEffect, useState } from "react";
import { File } from "../types/entities";
import { FileElement } from "../components/FileElement/FileCard";
import { AuthContext } from "../context/AuthContext";

export function FilePage() {
  const [files, setFiles] = useState<File[]>([]);
  const { session } = useContext(AuthContext);

  const fetchFiles = async () => {
    try {
      const response = await listFilesService({
        token: session?.token || "",
        directory: null
      });

      if (response.success) {
        setFiles(response.files);
      } else {
        console.error("Error al obtener archivos: ", response.msg);
      }
    } catch (error) {
      console.error("Error al obtener archivos: ", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

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
          {files.map((file, index) => (
            <FileElement
              key={index}
              fileName={file.name}
              fileExtension={file.extension || ""}
              uuid={file.uuid}
              fileType={file.isFile ? "file" : "folder"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
