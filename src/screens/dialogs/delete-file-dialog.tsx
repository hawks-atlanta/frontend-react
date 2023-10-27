import { useContext } from "react";
import toast from "react-hot-toast";
import { deleteFileService } from "../../services/files/delete-file.service";
import {
  FilesDialogsContext,
  AuthContext,
  AVAILABLE_DIALOGS,
  FilesContext
} from "../../context/index";
import { Dialog } from "../../components/Dialog";

export const DeleteFileDialog = () => {
  // Dialog state
  const { dialogsVisibilityState, closeDialog, selectedFile } =
    useContext(FilesDialogsContext);
  const isOpen = dialogsVisibilityState[AVAILABLE_DIALOGS.DELETE_FILE];

  const { removeFile } = useContext(FilesContext);

  const { session } = useContext(AuthContext);

  if (!isOpen || !selectedFile) return null;

  const handleConfirm = async () => {
    const token = session?.token || "";
    const deleteRequest = {
      token,
      fileUUID: selectedFile!.uuid
    };

    const response = await deleteFileService(deleteRequest);
    if (response.success) {
      toast.success("Element deleted");
      removeFile(selectedFile.uuid);
      closeDialog(AVAILABLE_DIALOGS.DELETE_FILE);
    } else {
      toast.error(response.msg);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => closeDialog(AVAILABLE_DIALOGS.DELETE_FILE)}
      title="Delete item"
    >
      <p className="w-full rounded-lg border p-2">{`Delete: ${selectedFile.name}`}</p>
      <button
        className="hover-bg-blue-700 mt-4 rounded-full bg-blue-600 px-4 py-2 text-white"
        onClick={handleConfirm}
      >
        Confirm
      </button>
    </Dialog>
  );
};
