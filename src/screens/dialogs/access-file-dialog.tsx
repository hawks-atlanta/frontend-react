import { useContext, useState, useEffect } from "react";
import { SharedWithWhoService } from "../../services/files/get-users-file.service";
import { Dialog } from "../../components/Dialog";
import { shareFileService } from "../../services/files/share-file.service";
import {
  FilesDialogsContext,
  AVAILABLE_DIALOGS,
  AuthContext
} from "../../context/index";
import toast from "react-hot-toast";
import { unshareFileService } from "../../services/files/unshare-file.service";

export const AccessManagementDialog = () => {
  const [usersWithAccess, setUsersWithAccess] = useState<string[]>([]);
  const [newAccess, setNewAccess] = useState("");

  const { dialogsVisibilityState, closeDialog, selectedFile } =
    useContext(FilesDialogsContext);
  const Open = dialogsVisibilityState[AVAILABLE_DIALOGS.ACCESS_MANAGEMENT];

  const { session } = useContext(AuthContext);
  const handleShare = async () => {
    const shareRequest = {
      token: session?.token as string,
      fileUUID: selectedFile?.uuid as string,
      otherUsername: newAccess
    };

    const { success, msg } = await shareFileService(shareRequest);
    if (!success) {
      toast.error(msg);
      return;
    }

    toast.success(msg);
  };

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
  }, [selectedFile, handleShare]);

  const handleUnshare = async (userName: string) => {
    const unShareRequest = {
      token: session?.token as string,
      fileUUID: selectedFile?.uuid as string,
      otherUsername: userName
    };

    const { success, msg } = await unshareFileService(unShareRequest);
    if (!success) {
      toast.error(msg);
      return;
    }

    setUsersWithAccess(
      usersWithAccess.filter((username) => username !== userName)
    );
    toast.success(msg);
  };

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
        onClick={handleShare}
      >
        Share
      </button>
      {usersWithAccess.length > 0 && (
        <div className="mt-3">
          <h2 className="text-lg font-semibold">Shared with:</h2>
          <ul className="max-h-48 space-y-2 overflow-y-auto">
            {usersWithAccess.map((user, index) => (
              <li key={index} className="flex items-center justify-between">
                <span>{user}</span>
                <button
                  className="hover-bg-red-600 mt-0.5 rounded-md bg-red-500 px-2 py-1 text-white"
                  onClick={() => handleUnshare(user)}
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
