import { client } from "../client/client";

export const getMembers = async (
  page,
  limit,
  status,
  search,
  county,
  subcounty,
  location,
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
    if (county) params.append("county", county);
    if (subcounty) params.append("subcounty", subcounty);
    if (location) params.append("location", location);

    // Timeline range filters
    if (startDate) params.append("fromDate", startDate);
    if (endDate) params.append("toDate", endDate);

    // Send the final request with the combined search parameters
    const response = await client.get(`/customer?${params.toString()}`);
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const getMember = async (id) => {
  try {
    const response = await client.get(`/customer/${id}`);
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const addAdminMember = async (
  email,
  mobileno,
  username,
  onboarding_stage,
  status,
) => {
  try {
    const response = await client.post(
      `/customer/register-customer-email-mobile`,
      {
        email,
        mobileno,
        username,
        onboarding_stage,
        status,
      },
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};
