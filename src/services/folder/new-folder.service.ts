import axios from "axios";
import { ENVIRONMENT } from "../../config/environment";

type CreateNewDirectoryRequest = {
  directoryName: string;
  location: string | null;
  token: string;
};

type CreateNewDirectoryResponse = {
  success: boolean;
  msg: string;
  directoryUUID?: string;
};

export const createNewDirectoryService = async (
    req: CreateNewDirectoryRequest
  ): Promise<CreateNewDirectoryResponse> => {
    try {
      const response = await axios.post(
        `${ENVIRONMENT.PROXY_BASE_URL}/folders`,
        req,
        {
          headers: {
            Authorization: `Bearer ${req.token}`
          }
        }
      );
  
      if (response.status !== 201) {
        console.log("Error in createNewDirectoryService - Request failed with status " + response.status);
        return { success: false, msg: "Request failed with status " + response.status };
      }
  
      const data = response.data;
  
      if (data.error) {
        return { success: false, msg: data.msg };
      }
  
      return {
        success: true,
        msg: "New directory created successfully",
        directoryUUID: data.fileUUID,
      };
    } catch (error) {
      console.log("Error in createNewDirectoryService:", error);
  
      return { success: false, msg: "There was an error creating the new directory" };
    }
  };