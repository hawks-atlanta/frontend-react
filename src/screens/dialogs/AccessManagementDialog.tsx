import { Dialog } from "../../components/Dialog";
import {
  AVAILABLE_DIALOGS,
  AuthContext,
  FilesDialogsContext
} from "../../context";
import { SharedWithWhoService } from "../../services/files/get-users-file.service";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { UsersWithAccessList } from "../dialogs/UsersWithAccessList";

export const AccessManagementDialogFile = () => {
  const { session } = useContext(AuthContext);
  const { dialogsVisibilityState, closeDialog, selectedFile } =
    useContext(FilesDialogsContext);

  const [areUsersLoading, setAreUsersLoading] = useState<boolean>(false);
  const [usersWithAccess, setUsersWithAccess] = useState<string[]>([]);

  const removeUserFromSharedWithUI = (user: string) => {
    setUsersWithAccess(usersWithAccess.filter((username) => username !== user));
  };

  useEffect(() => {
    async function fetchUsersWithAccess() {
      setAreUsersLoading(true);

      const { success, ...res } = await SharedWithWhoService({
        token: session?.token as string,
        fileUUID: selectedFile?.uuid as string
      });

      if (!success) {
        setAreUsersLoading(false);
        toast.error(res.msg);
        return;
      }

      setUsersWithAccess(res.users);
      setAreUsersLoading(false);
    }

    fetchUsersWithAccess();
  }, []);

  return (
    <Dialog
      isOpen={dialogsVisibilityState[AVAILABLE_DIALOGS.ACCESS_MANAGEMENT]}
      onClose={() => closeDialog(AVAILABLE_DIALOGS.ACCESS_MANAGEMENT)}
      title=""
    >
      <UsersWithAccessList
        isLoading={areUsersLoading}
        usersWithAccess={usersWithAccess}
        unshareCallback={removeUserFromSharedWithUI}
      />
    </Dialog>
  );
};
