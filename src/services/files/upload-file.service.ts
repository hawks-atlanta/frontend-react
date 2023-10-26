import axios from "axios";
import { AxiosError } from "axios";
import { ENVIRONMENT } from "../../config/environment";

type UploadfileRequest = {
  fileContent: File;
  fileName: string;
  location: string;
  token: string;
};

type UploadfileResponse = {
  msg: string;
  success: boolean;
  fileUUID?: string;
};

export const uploadfileService = async (
  req: UploadfileRequest
): Promise<UploadfileResponse> => {
  try {
    const formData = new FormData();
    formData.append("file", req.fileContent);
    formData.append("fileName", req.fileName);
    formData.append("location", req.location);

    const response = await axios.post(
      `${ENVIRONMENT.PROXY_BASE_URL}/file/upload`,
      req,
      {
        headers: {
          "Authorization": `Bearer ${req.token}`,
          "Content-Type": "multipart/form-data"
        }
      }
    );

    if (response.status !== 200) {
      return {
        success: false,
        msg: "There was an error in the upload."
      };
    } else {
      return {
        success: true,
        msg: "Upload successful",
        fileUUID: response.data.fileUUID
      };
    }
  } catch (error) {
    let errorMsg = "There was an error in the upload.";

    if (error instanceof AxiosError) {
      errorMsg = error.response?.data.msg || errorMsg;
    }

    return {
      msg: errorMsg,
      success: false
    };
  }
};
