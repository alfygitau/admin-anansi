import { myClient } from "../client/my-client";

export const getSettings = async () => {
  try {
    const response = await myClient.get("/api/v1/settings");
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const updateSettings = async (payload) => {
  try {
    const response = await myClient.patch("/api/v1/settings", payload);
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};
