import { createContext, useState } from "react";
import { File } from "../types/entities";

export enum AVAILABLE_DIALOGS {
  "CREATE_FOLDER" = "CREATE_FOLDER",
  "RENAME_FILE" = "RENAME_FILE"
}

interface FilesDialogsContext {
  dialogsVisibilityState: Record<AVAILABLE_DIALOGS, boolean>;
  selectedFile: File | null;
  openDialog: (dialog: AVAILABLE_DIALOGS, file: File | null) => void;
  closeDialog: (dialog: AVAILABLE_DIALOGS) => void;
}

const defaultValues: FilesDialogsContext = {
  dialogsVisibilityState: {
    [AVAILABLE_DIALOGS.CREATE_FOLDER]: false,
    [AVAILABLE_DIALOGS.RENAME_FILE]: false
  },
  selectedFile: null,
  openDialog: () => {},
  closeDialog: () => {}
};

export const FilesDialogsContext =
  createContext<FilesDialogsContext>(defaultValues);

export const FilesDialogsContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [dialogsVisibilityState, setDialogsVisibilityState] = useState<
    Record<AVAILABLE_DIALOGS, boolean>
  >({
    [AVAILABLE_DIALOGS.CREATE_FOLDER]: false,
    [AVAILABLE_DIALOGS.RENAME_FILE]: false
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const openDialog = (dialog: AVAILABLE_DIALOGS, file: File | null) => {
    setSelectedFile(file);
    setDialogsVisibilityState((curr) => ({
      ...curr,
      [dialog]: true
    }));
  };

  const closeDialog = (dialog: AVAILABLE_DIALOGS) => {
    setDialogsVisibilityState((curr) => ({
      ...curr,
      [dialog]: false
    }));
    setSelectedFile(null);
  };

  return (
    <FilesDialogsContext.Provider
      value={{
        dialogsVisibilityState,
        selectedFile,
        openDialog,
        closeDialog
      }}
    >
      {children}
    </FilesDialogsContext.Provider>
  );
};
