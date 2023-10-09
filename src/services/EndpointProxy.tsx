import axios, { AxiosResponse } from "axios";

interface FormData {
  username: string;
  password: string;
}

export async function loginUser(formData: FormData): Promise<AxiosResponse> {
  const loginResponse = await axios.post(
    "http://127.0.0.1:5000/auth/login",
    formData
  );
  return loginResponse;
}
