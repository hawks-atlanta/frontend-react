import { useContext, useState, useEffect } from "react";
import { SharedWithWhoService } from "../../services/files/get-users-file.service";
import { Dialog } from "../../components/Dialog";
import {
  FilesDialogsContext,
  AVAILABLE_DIALOGS,
  AuthContext
} from "../../context/index";

export const AccessManagementDialog = () => {
  const [usersWithAccess, setUsersWithAccess] = useState<string[]>([]);

  const { dialogsVisibilityState, closeDialog, selectedFile } =
    useContext(FilesDialogsContext);
  const Open = dialogsVisibilityState[AVAILABLE_DIALOGS.ACCESS_MANAGEMENT];

  const [_newAccess, setNewAccess] = useState(selectedFile?.uuid || "");

  const { session } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsersWithAccess = async () => {
      const response = await SharedWithWhoService({
        token: session?.token as string,
        fileUUID: selectedFile?.uuid as string
      });
      if (response.success) {
        setUsersWithAccess(response.users);
      }
    };

    if (Open && selectedFile) {
      fetchUsersWithAccess();
    }
  }, [Open, selectedFile, session]);

  const handleSave = async () => {};

  const handleUnshare = async () => {};

  return (
    <Dialog
      isOpen={Open}
      onClose={() => closeDialog(AVAILABLE_DIALOGS.ACCESS_MANAGEMENT)}
      title="Manage Access"
    >
      <input
        type="text"
        placeholder="Enter a username to share with"
        aria-label="Edit access permissions"
        onChange={(e) => setNewAccess(e.target.value)}
        className="w-full rounded-lg border p-2"
      />
      <button
        className="hover-bg-blue-700 mt-4 rounded-full bg-blue-600 px-4 py-2 text-white"
        onClick={handleSave}
      >
        Share
      </button>
      {usersWithAccess.length > 0 && (
        <div>
          <h2 className="mb-2 text-lg font-semibold">Users with Access</h2>
          <ul className="space-y-2">
            {usersWithAccess.map((user, index) => (
              <li key={index} className="flex items-center justify-between">
                <span>{user}</span>
                <button
                  className="rounded-md bg-red-500 px-2 py-1 text-white hover:bg-red-600"
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
