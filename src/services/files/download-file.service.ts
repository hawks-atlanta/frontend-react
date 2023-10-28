import { ENVIRONMENT } from "../../config/environment";
import axios, { AxiosError } from "axios";

type DownloadFileRequest = {
  token: string;
  fileUUID: string;
};

type DownloadFileResponse = {
  fileContent: File;
  msg: string;
};

export const DownloadFileService = async (
  req: DownloadFileRequest
): Promise<DownloadFileResponse> => {
  try {
    const downloadFileResponse = await axios.get(
      `${ENVIRONMENT.PROXY_BASE_URL}/file/download/${req.fileUUID}`,
      {
        headers: {
          Authorization: `Bearer ${req.token}`
        }
      }
    );
    const { data } = downloadFileResponse;
    return {
      fileContent: data,
      msg: "File downloaded successfully"
    };
  } catch (error) {
    let errorMsg = "There was an error while trying to download the file";

    if (error instanceof AxiosError) {
      errorMsg = error.response?.data.msg || errorMsg;
    }

    return {
      fileContent: new File([], ""),
      msg: "There was an error while trying to download the file"
    };
  }
};
