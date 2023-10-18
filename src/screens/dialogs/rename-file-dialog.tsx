import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import { renameFileService } from "../../services/files/rename-file.service";

interface EditNameDialogProps {
  isOpen: boolean;
  itemName: string;
  onSave: (newName: string) => void;
  onCancel: () => void;
  fileUUID: string;
}

export const EditNameDialog = ({
  isOpen,
  itemName,
  onSave,
  onCancel,
  fileUUID
}: EditNameDialogProps) => {
  const { session } = useContext(AuthContext);

  const [newName, setNewName] = useState(itemName);

  const handleSave = async () => {
    if (newName.trim() === "") {
      return;
    }

    const token = session?.token || "";

    const renameRequest = {
      token,
      fileUUID,
      newName: newName
    };

    try {
      const response = await renameFileService(renameRequest);

      if (response.success) {
        toast.success("Name updated successfully");
        onSave(newName);
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      toast.error("An error occurred while updating the name");
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur-sm"
    >
      <div className="relative rounded-md border border-gray-300 bg-white p-4 shadow-md">
        <button className="absolute right-0 top-0 p-3" onClick={onCancel}>
          <X className="h-6 w-6 text-gray-600" />
        </button>
        <h1 className="mb-4 max-w-[85%] text-xl">Edit the name of the item</h1>
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
      </div>
    </div>
  );
};
