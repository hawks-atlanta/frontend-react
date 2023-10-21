import { ENVIRONMENT } from "../../config/environment";
import axios, { AxiosError } from "axios";

interface SharedWithWhoRequest {
  token: string;
  fileUUID: string;
}

interface SharedWithWhoResponse {
  users: string[];
  msg: string;
}

export const SharedWithService = async (
    req: SharedWithWhoRequest
): Promise<SharedWithWhoResponse> => {
  try {
    const URL = `${ENVIRONMENT.PROXY_BASE_URL}/file/${req.fileUUID}/shared-with-who`;

    try {
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${req.token}`,
        },
      });

      return {
        users: response.data.users,
        msg: response.data.msg,
      };
    } catch (error) {
      let errorMsg = "There was an error while trying to get the list of users with access to this file";

      if (error instanceof AxiosError) {
        errorMsg = error.response?.data.msg || errorMsg;
      }

      return {
        users: [],
        msg: errorMsg,
      };
    }
  } catch (error) {
    console.error("[Exception] shared_with_who_handler ->", error);
    return {
      users: [],
      msg: "There was an error listing the users that have access to this file",
    };
  }
};
