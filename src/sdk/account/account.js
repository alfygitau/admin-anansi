import { client } from "../client/client";

export const getAccount = async (id) => {
  try {
    const response = await client.get(`/account/${id}/admin`);
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};
