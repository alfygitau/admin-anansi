import { loanClient } from "../client/loan-client";

export const getApplicationDocuments = async (appId) => {
  try {
    const response = await loanClient.get(
      `/loan-applications/${appId}/documents`,
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const addLoanDocument = async (
  applicationId,
  documentType,
  notes,
  file,
) => {
  try {
    const formData = new FormData();

    formData.append("doc_type", documentType);
    formData.append("notes", notes);
    if (file) {
      formData.append("file", file);
    }

    const response = await loanClient.post(
      `/loan-applications/${applicationId}/documents`,
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
