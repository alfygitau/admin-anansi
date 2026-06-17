import { client } from "../client/client";

export const getUsers = async (
  page,
  limit,
  status,
  search,
  role,
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

    if (role) params.append("role", role);

    // Timeline range filters
    if (startDate) params.append("fromDate", startDate);
    if (endDate) params.append("toDate", endDate);

    // Send the final request with the combined search parameters
    const response = await client.get(`/users?${params.toString()}`);
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};
