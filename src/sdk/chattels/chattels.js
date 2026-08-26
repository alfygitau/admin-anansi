import { loanClient } from "../client/loan-client";

export const listChattels = async (appId) => {
  try {
    const response = await loanClient.get(
      `/loan-applications/${appId}/chattels`,
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const deleteChattel = async (appId, chattelId) => {
  try {
    const response = await loanClient.delete(
      `/loan-applications/${appId}/chattels/${chattelId}`,
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const addChattel = async (
  applicationId,
  assetName,
  assetValue,
  assetCategory,
  imageFiles,
  docFiles,
) => {
  try {
    const formData = new FormData();

    formData.append("asset_name", assetName);
    formData.append("asset_category", assetCategory);
    formData.append("estimated_value", assetValue);

    // Append multiple image files
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    // Append multiple document files
    docFiles.forEach((file) => {
      formData.append("documents", file);
    });

    const response = await loanClient.post(
      `/loan-applications/${applicationId}/chattels`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};
