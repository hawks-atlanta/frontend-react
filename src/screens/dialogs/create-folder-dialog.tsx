import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { createNewDirectoryService } from "../../services/folder/new-folder.service";
import { X } from "lucide-react";
import { File } from "../../types/entities";

interface CreateFolderDialogProps {
  isOpen: boolean;
  currentParentDirectory: string | null;
  addFolderCallback: (dir: File) => void;
  closeModalCallback: () => void;
}

export const CreateFolderDialog = ({
  isOpen,
  addFolderCallback,
  closeModalCallback,
  currentParentDirectory
}: CreateFolderDialogProps) => {
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
    console.log(response);
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

    addFolderCallback(newFolder);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div className="modal absolute rounded-lg border border-black bg-white p-4 ">
        <button
          className="absolute right-0 top-0 p-3"
          onClick={closeModalCallback}
        >
          <X className="h-6 w-6 text-gray-600" />
        </button>
        <h1 className="mb-4 text-xl">Ingresa el nombre de la carpeta</h1>
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          className="w-full rounded-lg border p-2"
        />
        <button
          className="hover-bg-blue-700 mt-4 rounded-full bg-blue-600 px-4 py-2 text-white"
          onClick={createFolder}
        >
          Create Folder
        </button>
      </div>
    </div>
  );
};
