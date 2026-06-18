import { client } from "../client/client";

export const scanFrontIdentification = async () => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await client.post(`/kyc-validation/kenya-id`, formData);
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const scanBackIdentification = async () => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await client.post(`/kyc-validation/kenya-id/back`, formData);
  } catch (error) {
    throw error?.response?.data || error;
  }
};
