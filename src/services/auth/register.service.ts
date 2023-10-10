import axios, { AxiosError } from "axios";

type RegisterRequest = {
  username: string;
  password: string;
  confirmPassword: string;
};

type RegisterResponse = {
  success: boolean;
  msg: string;
  token?: string;
};

export const registerService = async (
  req: RegisterRequest
): Promise<RegisterResponse> => {
  try {
    if (req.password !== req.confirmPassword) {
      return {
        success: false,
        msg: "La contraseña y la confirmación no coinciden"
      };
    }
    const registerResponse = await axios.post(
      "http://127.0.0.1:5000/account/register",
      req
    );
    const { data } = registerResponse;

    return {
      success: true,
      msg: data.msg,
      token: data.token
    };
  } catch (error) {
    let errorMsg = "Hubo un error al intentar registrarse";

    if (error instanceof AxiosError) {
      errorMsg = error.response?.data.msg || errorMsg;
    }

    return {
      success: false,
      msg: errorMsg
    };
  }
};
