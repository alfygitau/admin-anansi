import { client } from "../client/client";
import { myClient } from "../client/my-client";

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

export const getMembershipTypes = async (status) => {
  try {
    const response = await myClient.get("/api/v1/membership-types", {
      params: status ? { status } : undefined,
    });
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const getMembershipType = async (id) => {
  try {
    const response = await myClient.get(`/api/v1/membership-types/${id}`);
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const createMembershipType = async (payload) => {
  try {
    const response = await myClient.post("/api/v1/membership-types", payload);
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const getMembershipFeeApprovals = async (status = "pending") => {
  try {
    const response = await myClient.get(
      `/api/v1/settings/membership-fee/approvals?status=${status}`,
    );
    return response?.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const approveMembershipFeeChange = async (id, feedback = "") => {
  try {
    const response = await myClient.post(
      `/api/v1/settings/membership-fee/approvals/${id}/approve`,
      { feedback },
    );
    return response?.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const rejectMembershipFeeChange = async (id, feedback) => {
  try {
    const response = await myClient.post(
      `/api/v1/settings/membership-fee/approvals/${id}/reject`,
      { feedback },
    );
    return response?.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
};
