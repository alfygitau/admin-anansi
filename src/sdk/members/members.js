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

export const searchMembers = async (search) => {
  try {
    const params = new URLSearchParams();

    // Text & Search filters
    if (search) params.append("q", search);

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

const convertToISODate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return !isNaN(date.getTime()) ? date.toISOString().split("T")[0] : dateStr;
};

export const updateMemberIdentity = async (
  id,
  firstName,
  middleName = "",
  lastName,
  idNumber,
  gender,
  birthDate = "",
) => {
  try {
    const payload = {
      firstname: firstName,
      lastname: lastName,
      identification: idNumber,
      gender: gender,
    };

    if (middleName && middleName.trim().length > 1) {
      payload.middlename = middleName.trim();
    }

    if (birthDate && birthDate.trim() !== "") {
      payload.dob = convertToISODate(birthDate);
    }

    const response = await client.patch(`/customer/${id}`, payload);
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};
