import { useContext, useEffect, useState } from "react";
import { moveFileService } from "../../services/files/move-file.service";
import { listFilesService } from "../../services/files/list-file.service";
import { useSearchParams } from "react-router-dom";
import { Dialog } from "../../components/Dialog";
import { File } from "../../types/entities";
import {
  FilesDialogsContext,
  AVAILABLE_DIALOGS,
  AuthContext
} from "../../context/index";
import toast from "react-hot-toast";

export const MoveFileDialog = () => {
  const [searchParams, _setSearchParams] = useSearchParams();
  const { dialogsVisibilityState, closeDialog, selectedFile } =
    useContext(FilesDialogsContext);
  const Open = dialogsVisibilityState[AVAILABLE_DIALOGS.MOVE_FILE];
  const { session } = useContext(AuthContext);
  const [folders, setFolders] = useState<File[]>([]);
  const [moving, setMoving] = useState(false);
  const directory = searchParams.get("directory");

  useEffect(() => {
    if (Open && selectedFile) {
      const fetchFolders = async () => {
        const { success, ...res } = await listFilesService({
          token: session?.token as string,
          directory: directory
        });

        if (!success) {
          toast.error(res.msg);
        } else {
          const folderList = res.files.filter((file) => !file.isFile);
          setFolders(folderList);
        }
      };

      fetchFolders();
    }
  }, [directory]);

  const handleMove = async (folderUUID: string) => {
    if (moving) return;

    setMoving(true);
    const { success, ...res } = await moveFileService({
      directoryUUID: folderUUID,
      fileUUID: selectedFile?.uuid as string,
      token: session?.token || ""
    });

    if (!success) {
      toast.error(res.msg);
      setMoving(false);
      return;
    }

    setMoving(false);
    toast.success("The file has been moved successfully");
    closeDialog(AVAILABLE_DIALOGS.MOVE_FILE);
  };

  return (
    <Dialog
      isOpen={Open}
      onClose={() => closeDialog(AVAILABLE_DIALOGS.MOVE_FILE)}
      title="Move File"
    >
      <div className="max-h-[300px] overflow-y-auto p-4">
        {folders.length > 0 ? (
          folders.map((folder) => (
            <div key={folder.uuid}>
              <button
                className="mb-2 w-full rounded-lg bg-blue-600 px-4 py-2 text-left hover:bg-blue-700"
                onClick={() => handleMove(folder.uuid)}
              >
                <span className="font-bold text-white">{folder.name}</span>
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No folders are available.</p>
        )}
      </div>
    </Dialog>
  );
};
