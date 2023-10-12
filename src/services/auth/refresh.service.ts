import axios, { AxiosError } from "axios";
import { ENVIRONMENT } from "../../config/environment";

type AuthRefreshResponse = {
  success: boolean;
  msg: string;
  token: string;
};

export const authRefreshService = async (token: string): Promise<AuthRefreshResponse> => {   
  try {
    const response = await axios.post(
      `${ENVIRONMENT.PROXY_BASE_URL}/auth/refresh`,
      { token }
    );
    
    const { data } = response;

    if (data.success) {
      return {
        success: true,
        msg: "Token is valid",
        token: data.token,
      };
    } else {
      return {
        success: false,
        msg: "Token is not valid",
        token: "",
      };
    }
  } catch (error) {
    let errorMsg = "There was an error while trying to validate the token";

    if (error instanceof AxiosError) {
      errorMsg = error.response?.data.msg || errorMsg;
    }

    return {
      success: false,
      msg: errorMsg,
      token: "",
    };
  }
};
