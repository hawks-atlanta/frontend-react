import { createContext } from "react";
import { useUserFiles } from "../hooks/useUserFiles";
import { File } from "../types/entities";
import { FilesDialogsContextProvider } from "./FilesDialogsContext";
import { useSearchParams } from "react-router-dom";

interface FilesContext {
  currentDirectory: string | null;
  areFilesLoading: boolean;
  files: File[];
  sharedFiles: File[];
  addFile: (file: File) => void;
  renameFile: (uuid: string, name: string) => void;
  removeFile: (uuid: string) => void;
}

const initialValues: FilesContext = {
  currentDirectory: null,
  areFilesLoading: false,
  files: [],
  sharedFiles: [],
  addFile: () => {},
  renameFile: () => {},
  removeFile: () => {}
};

export const FilesContext = createContext(initialValues);

export const FilesContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [params, _] = useSearchParams();
  const currentDirectory = params.get("directory");

  const { areLoading, files, sharedFiles, addFile, renameFile, removeFile } =
    useUserFiles();

  return (
    <FilesContext.Provider
      value={{
        currentDirectory: currentDirectory,
        areFilesLoading: areLoading,
        files: files,
        sharedFiles: sharedFiles,
        addFile: addFile,
        renameFile: renameFile,
        removeFile: removeFile
      }}
    >
      <FilesDialogsContextProvider>{children}</FilesDialogsContextProvider>
    </FilesContext.Provider>
  );
};
