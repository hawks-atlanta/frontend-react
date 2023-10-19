import axios from "axios";
import { AxiosError } from "axios";
import { ENVIRONMENT } from "../../config/environment";

type UpdatepasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

type UpdatepasswordResponse = {
  msg: string;
};

export const updatepasswordService = async (
  req: UpdatepasswordRequest
): Promise<UpdatepasswordResponse> => {
  try {
    const UpdatepasswordResponse = await axios.patch(
      `${ENVIRONMENT.PROXY_BASE_URL}/account/password`,
      req
    );
    const { data } = UpdatepasswordResponse;

    return {
      msg: data.msg
    };
  } catch (error) {
    let errorMsg = "There was an error updating your password.";

    if (error instanceof AxiosError) {
      errorMsg = error.response?.data.msg || errorMsg;
    }

    return {
      msg: errorMsg
    };
  }
};
