import { useContext, useRef, useState } from "react";
import toast from "react-hot-toast";
import { uploadfileService } from "../../services/files/upload-file.service";
import { Dialog } from "../../components/Dialog";
import { Loader } from "lucide-react";
import {
  FilesDialogsContext,
  AuthContext,
  AVAILABLE_DIALOGS,
  FilesContext
} from "../../context/index";

interface INewFile {
  isFile: boolean;
  isReady: boolean;
  name: string;
  size: number;
  uuid: string;
}

export const UploadFileDialog = () => {
  // Dialog state
  const { closeDialog, dialogsVisibilityState } =
    useContext(FilesDialogsContext);
  const [isUploading, setIsUploading] = useState(false);
  const isOpen = dialogsVisibilityState[AVAILABLE_DIALOGS.UPLOAD_FILE];
  const { addFiles, currentDirectory } = useContext(FilesContext);
  const { session } = useContext(AuthContext);

  const files: INewFile[] = [];
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async () => {
    setIsUploading(true);
    const fileInput = fileInputRef.current;
    if (fileInput?.files?.length) {
      const fileList = fileInput.files;
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];

        const token = session!.token;
        const uploadRequest = {
          fileContent: file,
          fileName: file.name,
          location: currentDirectory || "",
          token
        };
        const response = await uploadfileService(uploadRequest);

        if (response.success) {
          const newFile: INewFile = {
            isFile: true,
            isReady: true,
            name: file.name,
            size: 0,
            uuid: response.fileUUID!
          };
          toast.success(`The file ${file.name} has been uploaded successfully`);

          files.push(newFile);
          closeDialog(AVAILABLE_DIALOGS.UPLOAD_FILE);
        } else {
          toast.error(response.msg);
        }
      }
    }
    addFilesUI();
    setIsUploading(false);
  };

  const addFilesUI = () => {
    addFiles(files);
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => closeDialog(AVAILABLE_DIALOGS.UPLOAD_FILE)}
      title="Select the files to upload"
    >
      <input
        type="file"
        ref={fileInputRef}
        multiple
        aria-label="Select the files"
        className="w-full rounded-lg border p-2"
      />
      <button
        className="hover-bg-blue-700 mt-4 rounded-full bg-blue-600 px-4 py-2 text-white"
        onClick={uploadFile}
      >
        {isUploading ? <Loader /> : "Upload files"}
      </button>
    </Dialog>
  );
};
