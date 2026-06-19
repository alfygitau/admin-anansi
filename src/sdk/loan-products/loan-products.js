import { loanClient } from "../client/loan-client";

export const getLoanProducts = async () => {
  try {
    const response = await loanClient.get(`/loan-products?org_code=BA208`);
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};
