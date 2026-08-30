import { loanClient } from "../client/loan-client";

export const getLoanTransactions = async (
  page,
  limit,
  search,
  status,
  type,
  leastAmount,
  mostAmount,
  startDate,
  endDate,
  org_code = "BA208",
) => {
  try {
    const params = new URLSearchParams();

    // Numbers & Pagination checks
    if (page != null) params.append("page", page);
    if (limit != null) params.append("limit", limit);
    if (org_code != null) params.append("org_code", org_code);

    // Text & Search filters
    if (search) params.append("q", search);
    if (status) params.append("status", status);

    // Regional filters
    if (type) params.append("transaction_type", type);
    if (leastAmount) params.append("leastAmount", leastAmount);
    if (mostAmount) params.append("mostAmount", mostAmount);

    // Timeline range filters
    if (startDate) params.append("fromDate", startDate);
    if (endDate) params.append("toDate", endDate);

    const response = await loanClient.get(`/transactions?${params.toString()}`);
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const getLoanRepayments = async (id) => {
  try {
    const response = await loanClient.get(`/loans/${id}/repayments`);
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};
