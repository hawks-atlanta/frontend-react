import { useContext, useState, useEffect } from "react";
import { SharedWithWhoService } from "../../services/files/get-users-file.service";
import { Dialog } from "../../components/Dialog";
import {
  FilesDialogsContext,
  AVAILABLE_DIALOGS,
  AuthContext
} from "../../context/index";
import toast from "react-hot-toast";

export const AccessManagementDialog = () => {
  const [usersWithAccess, setUsersWithAccess] = useState<string[]>([]);
  const [newAccess, setNewAccess] = useState("");

  const { dialogsVisibilityState, closeDialog, selectedFile } =
    useContext(FilesDialogsContext);
  const Open = dialogsVisibilityState[AVAILABLE_DIALOGS.ACCESS_MANAGEMENT];

  const { session } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsersWithAccess = async () => {
      const response = await SharedWithWhoService({
        token: session?.token as string,
        fileUUID: selectedFile?.uuid as string
      });
      if (response.success) {
        setUsersWithAccess(response.users);
      } else {
        toast.error(response.msg);
      }
    };

    if (Open && selectedFile) {
      fetchUsersWithAccess();
    }
  }, [selectedFile]);

  const handleSave = async () => {};

  const handleUnshare = async () => {};

  return (
    <Dialog
      isOpen={Open}
      onClose={() => closeDialog(AVAILABLE_DIALOGS.ACCESS_MANAGEMENT)}
      title="Share file"
    >
      <input
        type="text"
        placeholder="Enter a username to share with"
        aria-label="Edit access permissions"
        value={newAccess}
        onChange={(e) => setNewAccess(e.target.value)}
        className="mb-3 w-full rounded-lg border p-2"
      />
      <button
        className="hover-bg-blue-700 mt-3 rounded-md bg-blue-600 px-4 py-2 text-white"
        onClick={handleSave}
      >
        Share
      </button>
      {usersWithAccess.length > 0 && (
        <div className="mt-3">
          <h2 className="text-lg font-semibold">With whom it is shared</h2>
          <ul className="max-h-48 space-y-2 overflow-y-auto">
            {usersWithAccess.map((user, index) => (
              <li key={index} className="flex items-center justify-between">
                <span>{user}</span>
                <button
                  className="hover-bg-red-600 mt-0.5 rounded-md bg-red-500 px-2 py-1 text-white"
                  onClick={() => handleUnshare()}
                >
                  Un-share
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Dialog>
  );
};
