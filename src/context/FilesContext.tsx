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
  deleteFile: (uuid: string) => void;
  renameFile: (uuid: string, name: string) => void;
}

const initialValues: FilesContext = {
  currentDirectory: null,
  areFilesLoading: false,
  files: [],
  addFile: () => {},
  deleteFile: () => {},
  renameFile: () => {}
};

export const FilesContext = createContext(initialValues);

export const FilesContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [params, _] = useSearchParams();
  const currentDirectory = params.get("directory");

  const { areLoading, files, addFile, deleteFile, renameFile } = useUserFiles();

  return (
    <FilesContext.Provider
      value={{
        currentDirectory: currentDirectory,
        areFilesLoading: areLoading,
        files: files,
        addFile: addFile,
        deleteFile: deleteFile,
        renameFile: renameFile
      }}
    >
      <FilesDialogsContextProvider>{children}</FilesDialogsContextProvider>
    </FilesContext.Provider>
  );
};
