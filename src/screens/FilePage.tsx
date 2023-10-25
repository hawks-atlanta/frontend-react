import { Sidebar } from "../components/Sidebar/Sidebar";
import { FileElement } from "../components/FileElement/FileCard";
import {
  AVAILABLE_DIALOGS,
  FilesContext,
  FilesDialogsContext
} from "../context/index";
import { useContext } from "react";
import {
  CreateFolderDialog,
  EditNameDialog,
  AccessManagementDialog,
  DeleteFileDialog,
  MoveFileDialog
} from "./dialogs/index";

export function FilePage() {
  const { areFilesLoading: isLoading, files } = useContext(FilesContext);
  const { dialogsVisibilityState } = useContext(FilesDialogsContext);
  const showRenameDialog =
    dialogsVisibilityState[AVAILABLE_DIALOGS.RENAME_FILE];

  const showAccessDialog =
    dialogsVisibilityState[AVAILABLE_DIALOGS.ACCESS_MANAGEMENT];

  const showDeleteDialog =
    dialogsVisibilityState[AVAILABLE_DIALOGS.DELETE_FILE];
  
  const showMoveDialog = dialogsVisibilityState[AVAILABLE_DIALOGS.MOVE_FILE];

  return (
    <div className="flex h-[calc(100vh-5rem)]">
      <div className="w-1/5 bg-gray-200">
        <Sidebar />
      </div>
      <main className="mx-6 flex w-4/5 flex-col overflow-y-auto bg-white">
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
            files.map((file) => <FileElement key={file.uuid} file={file} />)
          ) : (
            <div className="w-full p-2 text-center text-gray-500">
              No files to display.
            </div>
          )}
        </div>
      </main>
      <CreateFolderDialog />
      {showRenameDialog && <EditNameDialog />}
      {showAccessDialog && <AccessManagementDialog />}
      {showDeleteDialog && <DeleteFileDialog />}
      {showMoveDialog && <MoveFileDialog />}
    </div>
  );
}
