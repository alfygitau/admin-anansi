import { client } from "../client/client";

export const promptRegistration = async (
  ref_number,
  customer_id,
  membershipAmount,
  amount,
  sharesAmount,
  savingsAmount,
  phone_number,
) => {
  try {
    const response = await client.post(`/transaction/register-shares-save`, {
      category: "credit",
      type: "membership",
      ref_number,
      note: "Membership registration fees",
      customer_id,
      membershipAmount,
      amount,
      sharesAmount,
      savingsAmount,
      phone_number,
    });
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const checkMembership = async (customerId) => {
  try {
    const response = await client.get(
      `/transaction/has-completed-membership/${customerId}`,
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};
