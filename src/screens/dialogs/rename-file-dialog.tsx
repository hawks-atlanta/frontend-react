import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { renameFileService } from "../../services/files/rename-file.service";
import { Dialog } from "../../components/Dialog";
import {
  FilesDialogsContext,
  AuthContext,
  AVAILABLE_DIALOGS,
  FilesContext
} from "../../context/index";

export const EditNameDialog = () => {
  // Dialog state
  const { dialogsVisibilityState, closeDialog, selectedFile } =
    useContext(FilesDialogsContext);
  const isOpen = dialogsVisibilityState[AVAILABLE_DIALOGS.RENAME_FILE];

  const [newName, setNewName] = useState(selectedFile?.name || "");

  const { renameFile } = useContext(FilesContext);

  const { session } = useContext(AuthContext);

  if (!isOpen || !selectedFile) return null;

  const handleSave = async () => {
    if (newName.trim() === "") {
      return;
    }

    const token = session?.token || "";
    const renameRequest = {
      token,
      fileUUID: selectedFile?.uuid,
      newName: newName
    };

    const response = await renameFileService(renameRequest);
    if (response.success) {
      toast.success("Name updated successfully");
      renameFile(selectedFile.uuid, newName);
      closeDialog(AVAILABLE_DIALOGS.RENAME_FILE);
    } else {
      toast.error(response.msg);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => closeDialog(AVAILABLE_DIALOGS.RENAME_FILE)}
      title="Enter a new name for the item"
    >
      <input
        type="text"
        value={newName}
        aria-label="Edit item name"
        onChange={(e) => setNewName(e.target.value)}
        className="w-full rounded-lg border p-2"
      />
      <button
        className="hover-bg-blue-700 mt-4 rounded-full bg-blue-600 px-4 py-2 text-white"
        onClick={handleSave}
      >
        Save
      </button>
    </Dialog>
  );
};
