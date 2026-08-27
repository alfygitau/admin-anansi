import { client } from "../client/client";

export const scanFrontIdentification = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await client.post(`/kyc-validation/kenya-id`, formData);
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const scanBackIdentification = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await client.post(
      `/kyc-validation/kenya-id/back`,
      formData,
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const uploadIdImages = async (id, frontImage, backImage) => {
  try {
    const formData = new FormData();

    if (frontImage) {
      formData.append("id_front_image", frontImage);
    }
    if (backImage) {
      formData.append("id_back_image", backImage);
    }

    const response = await client.patch(`/customer/${id}/id-images`, formData);
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const uploadSelfieImage = async (id, selfieImage) => {
  try {
    const formData = new FormData();

    if (selfieImage) {
      formData.append("file", selfieImage);
    }

    const response = await client.patch(
      `/customer/${id}/selfie-image`,
      formData,
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};
