import axios from "axios";
import { AxiosError } from "axios";
import { ENVIRONMENT } from "../../config/environment";

type UpdatepasswordRequest = {
  oldPassword: string;
  newPassword: string;
  token: string;
};

type UpdatepasswordResponse = {
  msg: string;
  success: boolean;
};

export const updatepasswordService = async (
  req: UpdatepasswordRequest
): Promise<UpdatepasswordResponse> => {
  try {
    await axios.patch(`${ENVIRONMENT.PROXY_BASE_URL}/account/password`, req, {
      headers: {
        Authorization: `Bearer ${req.token}`
      }
    });

    return { success: true, msg: "Password updated successfully." };
  } catch (error) {
    let errorMsg = "There was an error updating your password.";

    if (error instanceof AxiosError) {
      errorMsg = error.response?.data.msg || errorMsg;
    }

    return {
      msg: errorMsg,
      success: false
    };
  }
};
