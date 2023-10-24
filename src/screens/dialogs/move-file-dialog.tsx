import { useContext, useEffect, useState } from "react";
import { moveFileService } from "../../services/files/move-file.service";
import { listFilesService } from "../../services/files/list-file.service";
import { Dialog } from "../../components/Dialog";
import { File } from "../../types/entities";
import { FolderPlus } from "lucide-react";
import {
  FilesDialogsContext,
  AVAILABLE_DIALOGS,
  AuthContext,
  FilesContext
} from "../../context/index";
import toast from "react-hot-toast";
export const MoveFileDialog = () => {
  const { removeFile } = useContext(FilesContext);
  const { dialogsVisibilityState, closeDialog, selectedFile } =
    useContext(FilesDialogsContext);
  const open = dialogsVisibilityState[AVAILABLE_DIALOGS.MOVE_FILE];
  const { session } = useContext(AuthContext);
  const [folders, setFolders] = useState<File[]>([]);
  const [moving, setMoving] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<File | null>(null);

  useEffect(() => {
    if (open && selectedFile) {
      const fetchFolders = async () => {
        const { success, ...res } = await listFilesService({
          token: session?.token as string,
          directory: selectedFolder ? selectedFolder.uuid : null
        });

        if (!success) {
          toast.error(res.msg);
        } else {
          const folderList = res.files.filter(
            (file) => !file.isFile && file.uuid !== selectedFile?.uuid
          );
          setFolders(folderList);
        }
      };

      fetchFolders();
    }
  }, [selectedFolder]);

  const handleMove = async () => {
    if (moving || !selectedFolder || !selectedFile) return;

    if (!selectedFolder.isFile) {
      setMoving(true);
      const { success, ...res } = await moveFileService({
        directoryUUID: selectedFolder.uuid,
        fileUUID: selectedFile.uuid as string,
        token: session?.token as string
      });

      if (!success) {
        toast.error(res.msg);
        setMoving(false);
        return;
      }

      const successMessage = selectedFile.isFile
        ? "File has been moved successfully"
        : "Folder has been moved successfully";

      toast.success(successMessage);
      setMoving(false);
      closeDialog(AVAILABLE_DIALOGS.MOVE_FILE);
      setSelectedFolder(null);
      removeFile(selectedFile.uuid);
    } else {
      toast.error("This action cannot be performed");
    }
  };

  const changeDirectory = (directoryUUID: string) => {
    if (!selectedFile) return;

    const selectedFolder = folders.find(
      (folder) => folder.uuid === directoryUUID
    );
    if (!selectedFolder) {
      return;
    }

    setSelectedFolder(selectedFolder);
    setFolders([]);
  };

  return (
    <Dialog
      isOpen={open}
      onClose={() => {
        closeDialog(AVAILABLE_DIALOGS.MOVE_FILE);
        setSelectedFolder(null);
        setFolders([]);
      }}
      title="Move File"
    >
      <div className="line-clamp-1 max-h-[300px] w-64 overflow-y-auto p-4">
        {folders.map((folder) => (
          <button
            key={folder.uuid}
            className="mb-2 line-clamp-1 w-full rounded-lg bg-blue-600 px-4 py-2 text-left"
            onClick={() => changeDirectory(folder.uuid)}
            aria-label={`Move to ${folder.name}`}
          >
            <span className="font-bold text-white">
              <FolderPlus className="mr-2 inline" /> {folder.name}
            </span>
          </button>
        ))}
      </div>
      <p className="text-center text-gray-500">
        Current Folder: {selectedFolder ? selectedFolder.name : "Root"}
      </p>
      {selectedFolder ? (
        <button
          className="hover-bg-red-700 w-full rounded-lg bg-red-600 px-4 py-2 text-white"
          onClick={handleMove}
        >
          Move here
        </button>
      ) : null}
    </Dialog>
  );
};
