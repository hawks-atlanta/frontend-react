import { createContext } from "react";
import { useUserFiles } from "../hooks/useUserFiles";
import { File } from "../types/entities";
import { FilesDialogsContextProvider } from "./FilesDialogsContext";
import { useSearchParams } from "react-router-dom";

interface FilesContext {
  currentDirectory: string | null;
  areFilesLoading: boolean;
  files: File[];
  addFile: (file: File) => void;
  addFiles: (file: File[]) => void;
  renameFile: (uuid: string, name: string) => void;
  removeFile: (uuid: string) => void;
}

const initialValues: FilesContext = {
  currentDirectory: null,
  areFilesLoading: false,
  files: [],
  addFile: () => { },
  addFiles: () => { },
  removeFile: () => { },
  renameFile: () => { }
};

export const FilesContext = createContext(initialValues);

export const FilesContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [params, _] = useSearchParams();
  const currentDirectory = params.get("directory");

  const { areLoading, files, addFile, addFiles, removeFile, renameFile } = useUserFiles();

  return (
    <FilesContext.Provider
      value={{
        currentDirectory: currentDirectory,
        areFilesLoading: areLoading,
        files: files,
        addFile: addFile,
        addFiles: addFiles,
        removeFile: removeFile,
        renameFile: renameFile
      }}
    >
      <FilesDialogsContextProvider>{children}</FilesDialogsContextProvider>
    </FilesContext.Provider>
  );
};
