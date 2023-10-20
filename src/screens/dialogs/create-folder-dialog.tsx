import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { createNewDirectoryService } from "../../services/folder/new-folder.service";
import { File } from "../../types/entities";
import { FilesContext, AuthContext } from "../../context/index";
import { Dialog } from "../../components/Dialog";

interface CreateFolderDialogProps {
  isOpen: boolean;
  currentParentDirectory: string | null;
  closeModalCallback: () => void;
}

export const CreateFolderDialog = ({
  isOpen,
  closeModalCallback,
  currentParentDirectory
}: CreateFolderDialogProps) => {
  const { addFile } = useContext(FilesContext);
  const { session } = useContext(AuthContext);

  const [folderName, setFolderName] = useState("");

  const createFolder = async () => {
    if (folderName.trim() === "") {
      return;
    }

    const token = session?.token || "";

    const createFolderRequest = {
      directoryName: folderName,
      location: currentParentDirectory,
      token
    };

    const response = await createNewDirectoryService(createFolderRequest);
    if (!response.success || !response.directoryUUID) {
      toast.error(response.msg);
      return;
    }

    toast.success("The folder have been created successfully");
    setFolderName("");
    closeModalCallback();

    // Add the new folder to the ui
    const newFolder: File = {
      isFile: false,
      isReady: true,
      name: folderName,
      size: 0,
      uuid: response.directoryUUID
    };

    addFile(newFolder);
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={closeModalCallback}
      title="Enter a name for the new folder"
    >
      <input
        type="text"
        value={folderName}
        aria-label="New folder name"
        onChange={(e) => setFolderName(e.target.value)}
        className="w-full rounded-lg border p-2"
      />
      <button
        className="hover-bg-blue-700 mt-4 rounded-full bg-blue-600 px-4 py-2 text-white"
        onClick={createFolder}
      >
        Create folder
      </button>
    </Dialog>
  );
};
