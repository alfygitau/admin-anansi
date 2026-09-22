import { myClient } from "../client/my-client";

const unwrapRows = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  return [];
};

export const getProducts = async () => {
  try {
    const response = await myClient.get("/api/v1/product");
    return unwrapRows(response?.data);
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (payload) => {
  const response = await myClient.post("/api/v1/product", payload);
  return response?.data;
};

export const getDepositProducts = async (status = "live") => {
  try {
    const response = await myClient.get("/api/v1/product/deposits", {
      params: { status },
    });
    return unwrapRows(response?.data);
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const getMembersAccounts = async (productId, status, limit, page, q) => {
  try {
    const rawParams = { productId, status, limit, page, q };

    const params = Object.fromEntries(
      Object.entries(rawParams).filter(
        ([_, val]) => val !== undefined && val !== null && val !== "",
      ),
    );

    const response = await myClient.get("/api/v1/product-reporting", {
      params,
    });
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const getDepositProduct = async (id) => {
  try {
    const response = await myClient.get(`/api/v1/product/deposits/${id}`);
    return response?.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const getMemberProductSummary = async (productId, memberId) => {
  try {
    const response = await myClient.get(
      `/api/v1/product-reporting/member/${memberId}/summary`,
      {
        params: { productId, memberId },
      },
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const getMemberProductTransactions = async (
  productId,
  memberId,
  status,
  limit,
  page,
  startDate,
  endDate,
) => {
  try {
    const rawParams = {
      productId,
      memberId,
      status,
      limit,
      page,
      startDate,
      endDate,
    };

    const params = Object.fromEntries(
      Object.entries(rawParams).filter(
        ([_, val]) => val !== undefined && val !== null && val !== "",
      ),
    );
    const response = await myClient.get(
      `/api/v1/product-reporting/transactions`,
      {
        params,
      },
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const getDepositApprovals = async (status = "pending") => {
  const response = await myClient.get("/api/v1/product/deposits/approvals", {
    params: { status },
  });
  return unwrapRows(response?.data);
};

export const getDepositApproval = async (id) => {
  const response = await myClient.get(
    `/api/v1/product/deposits/approvals/${id}`,
  );
  return response?.data;
};

export const createDepositSubmission = async (payload) => {
  const response = await myClient.post(
    "/api/v1/product/deposits/submissions",
    payload,
  );
  return response?.data;
};

export const updateDepositSubmission = async (id, payload) => {
  const response = await myClient.patch(
    `/api/v1/product/deposits/submissions/${id}`,
    payload,
  );
  return response?.data;
};

export const approveDepositSubmission = async (id, payload = {}) => {
  const response = await myClient.post(
    `/api/v1/product/deposits/approvals/${id}/approve`,
    payload,
  );
  return response?.data;
};

export const returnDepositSubmission = async (id, payload) => {
  const response = await myClient.post(
    `/api/v1/product/deposits/approvals/${id}/return`,
    payload,
  );
  return response?.data;
};

export const rejectDepositSubmission = async (id, payload) => {
  const response = await myClient.post(
    `/api/v1/product/deposits/approvals/${id}/reject`,
    payload,
  );
  return response?.data;
};

export const archiveDepositProduct = async (id) => {
  const response = await myClient.post(
    `/api/v1/product/deposits/${id}/archive`,
  );
  return response?.data;
};
