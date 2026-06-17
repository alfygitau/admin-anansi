import { client } from "../client/client";

export const getAccountTransactions = async (accountNumber) => {
  try {
    const response = await client.get(`/transaction/account/${accountNumber}`);
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const getAllTransactions = async (
  page,
  limit,
  search,
  status,
  type,
  leastAmount,
  mostAmount,
  startDate,
  endDate,
) => {
  try {
    const params = new URLSearchParams();

    // Numbers & Pagination checks
    if (page != null) params.append("page", page);
    if (limit != null) params.append("limit", limit);

    // Text & Search filters
    if (search) params.append("q", search);
    if (status) params.append("status", status);

    // Regional filters
    if (type) params.append("type", type);
    if (leastAmount) params.append("leastAmount", leastAmount);
    if (mostAmount) params.append("mostAmount", mostAmount);

    // Timeline range filters
    if (startDate) params.append("fromDate", startDate);
    if (endDate) params.append("toDate", endDate);

    const response = await client.get(
      `/transaction/get-transactions?${params.toString()}`,
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};
