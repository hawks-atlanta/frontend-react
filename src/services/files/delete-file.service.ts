import { ENVIRONMENT } from "../../config/environment";
import axios, { AxiosError } from "axios";

type DeleteFileRequest = {
  token: string;
  fileUUID: string;
};

type DeleteFileResponse = {
  success: boolean;
  msg: string;
};

export const deleteFileService = async (
  req: DeleteFileRequest
): Promise<DeleteFileResponse> => {
  try {
    const deleteFileResponse = await axios.delete(
      `${ENVIRONMENT.PROXY_BASE_URL}/file/${req.fileUUID}`,
      {
        headers: {
          Authorization: `Bearer ${req.token}`
        },
        data: req
      }
    );

    const { data } = deleteFileResponse;

    return {
      success: true,
      msg: data.msg
    };
  } catch (error) {
    let errorMsg = "There was an error while trying to rename the file";

    if (error instanceof AxiosError) {
      errorMsg = error.response?.data.msg || errorMsg;
    }

    return {
      success: false,
      msg: errorMsg
    };
  }
};
