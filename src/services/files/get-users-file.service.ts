import { ENVIRONMENT } from "../../config/environment";
import axios, { AxiosError } from "axios";

type SharedWithWhoRequest = {
  token: string;
  fileUUID: string;
};

type SharedWithWhoResponse = {
  success: boolean;
  msg: string;
  users: string[];
};

export const SharedWithWhoService = async (
  req: SharedWithWhoRequest
): Promise<SharedWithWhoResponse> => {
  try {
    const sharedWithWhoResponse = await axios.get(
      `${ENVIRONMENT.PROXY_BASE_URL}/file/${req.fileUUID}/shared-with-who`,
      {
        headers: {
          Authorization: `Bearer ${req.token}`
        }
      }
    );
    const { data } = sharedWithWhoResponse;

    return {
      success: true,
      msg: data.msg,
      users: data.users
    };
  } catch (error) {
    let errorMsg = "There was an error while trying to get shared with who";

    if (error instanceof AxiosError) {
      errorMsg = error.response?.data.msg || errorMsg;
    }

    return {
      success: false,
      msg: errorMsg,
      users: []
    };
  }
};
