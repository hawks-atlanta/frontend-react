import { createContext } from "react";
import { useUserFiles } from "../hooks/useUserFiles";
import { File } from "../types/entities";

interface FilesContext {
  areFilesLoading: boolean;
  files: File[];
  addFile: (file: File) => void;
  renameFile: (uuid: string, name: string) => void;
}

const initialValues: FilesContext = {
  areFilesLoading: false,
  files: [],
  addFile: () => {},
  renameFile: () => {}
};

export const FilesContext = createContext(initialValues);

export const FilesContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const { areLoading, files, addFile, renameFile } = useUserFiles();

  return (
    <FilesContext.Provider
      value={{
        areFilesLoading: areLoading,
        files: files,
        addFile: addFile,
        renameFile: renameFile
      }}
    >
      {children}
    </FilesContext.Provider>
  );
};
