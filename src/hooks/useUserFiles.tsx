import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "../context";
import toast from "react-hot-toast";
import { listFilesService } from "../services/files/list-file.service";
import { listFilesSharedWithUserService } from "../services/files/get-files-shared-with-user.service";
import { File } from "../types/entities";

export const useUserFiles = () => {
  // Session state
  const { session } = useContext(AuthContext);

  // Url state
  const [searchParams, _setSearchParams] = useSearchParams();
  const directory = searchParams.get("directory");

  // Files state
  const [areLoading, setAreLoading] = useState(true);
  const [files, setFiles] = useState<File[]>([]);
  const [sharedFiles, setSharedFiles] = useState<File[]>([]);

  // Fetch user files when the directory param changes
  useEffect(() => {
    async function fetchFiles() {
      setAreLoading(true);

      const response = await listFilesService({
        token: session?.token as string,
        directory: directory
      });

      if (response.success) {
        setFiles(response.files);
        setSharedFiles(response.files);
      } else {
        toast.error(response.msg);
      }

      setAreLoading(false);
    }

    fetchFiles();
  }, [directory]);

  // State setters
  const addFile = (dir: File) => {
    setFiles([...files, dir]);
  };

  const addFiles = (newFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const removeFile = (uuid: string) => {
    setFiles((curr) => curr.filter((file) => file.uuid !== uuid));
  };

  const renameFile = (uuid: string, name: string) => {
    setFiles((curr) =>
      curr.map((file) => {
        if (file.uuid === uuid) {
          return { ...file, name };
        }

        return file;
      })
    );
  };

  return {
    areLoading,
    files,
    sharedFiles,
    addFile,
    addFiles,
    removeFile,
    renameFile
  };
};
