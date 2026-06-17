import { client } from "../client/client";

export const getRoles = async () => {
  try {
    const response = await client.get(`/roles`);
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};
