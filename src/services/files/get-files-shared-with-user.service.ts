import { ENVIRONMENT } from "../../config/environment";
import axios, { AxiosError } from "axios";

interface File {
  ownerUsername: string;
  name: string;
  extension: string;
  isFile: boolean;
  uuid: string;
  size: number;
}

type ListFilesSharedWithUserRequest = {
  token: string;
};

type ListFilesSharedWithUserResponse = {
  success: boolean;
  msg: string;
  files: File[];
};

export const listFilesSharedWithUserService = async (
  req: ListFilesSharedWithUserRequest
): Promise<ListFilesSharedWithUserResponse> => {
  const URL = `${ENVIRONMENT.PROXY_BASE_URL}/file/shared`;

  try {
    const listFilesSharedWithUser = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${req.token}`
      }
    });
    const { data } = listFilesSharedWithUser;

    return {
      success: true,
      msg: data.msg,
      files: data.files.map((file: File) => ({ ...file, isReady: true }))
    };
  } catch (error) {
    let errorMsg = "There was an error while trying to list files";

    if (error instanceof AxiosError) {
      errorMsg = error.response?.data.msg || errorMsg;
    }

    return {
      success: false,
      msg: errorMsg,
      files: []
    };
  }
};
