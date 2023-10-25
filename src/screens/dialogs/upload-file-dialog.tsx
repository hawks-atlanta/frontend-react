import { useContext } from "react";
import toast from "react-hot-toast";
import { uploadfileService } from "../../services/files/upload-file.service";
import { Dialog } from "../../components/Dialog";
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
  const isOpen = dialogsVisibilityState[AVAILABLE_DIALOGS.UPLOAD_FILE];
  const { addFile, currentDirectory } = useContext(FilesContext);
  const { session } = useContext(AuthContext);

  {
    /*
  function fileToBase64(
    file: File
  ): Promise<{ base64String: string; filename: string }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result?.toString().split(",")[1];
        if (base64String) {
          resolve({ base64String, filename: file.name });
        } else {
          reject(new Error("Failed to convert file to base64"));
        }
      };
      reader.onerror = reject;
    });
  }

*/
  }

  interface FileBytes {
    bytes: Uint8Array;
    filename: string;
  }

  function fileToBytes(file: File): Promise<FileBytes> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        const buffer = reader.result as ArrayBuffer;
        const bytes = new Uint8Array(buffer);
        resolve({ bytes, filename: file.name });
      };
      reader.onerror = reject;
    });
  }

  const uploadFile = async () => {
    const fileInput = document.querySelector<HTMLInputElement>("#myfile");
    if (fileInput?.files?.length) {
      const fileList = fileInput.files;
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const { bytes, filename } = await fileToBytes(file);
        console.log(bytes); // Log the base64-encoded string to the console
        console.log(filename);
        const token = session!.token;
        const uploadRequest = {
          fileContent: bytes,
          fileName: filename,
          location: currentDirectory || "",
          token
        };
        const response = await uploadfileService(uploadRequest);
        console.log(response);
        console.log(uploadRequest);

        if (response.success) {
          const newFile: INewFile = {
            isFile: true,
            isReady: true,
            name: filename,
            size: 0,
            uuid: response.fileUUID!
          };
          toast.success(`The file ${filename} has been uploaded successfully`);
          addFile(newFile);
          closeDialog(AVAILABLE_DIALOGS.UPLOAD_FILE);
        } else {
          toast.error(response.msg);
        }
      }
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => closeDialog(AVAILABLE_DIALOGS.UPLOAD_FILE)}
      title="Select the files to upload"
    >
      <input
        type="file"
        id="myfile"
        aria-label="Select the files"
        className="w-full rounded-lg border p-2"
      />
      <button
        className="hover-bg-blue-700 mt-4 rounded-full bg-blue-600 px-4 py-2 text-white"
        onClick={uploadFile}
      >
        Upload files
      </button>
    </Dialog>
  );
};
