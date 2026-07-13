import { auditClient } from "../client/audit-trail-client";
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

export const getAuditTrails = async (
  page,
  limit,
  search,
  username,
  category,
  actionCode,
  adminUsername,
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
    if (adminUsername) params.append("adminUsername", adminUsername);
    if (actionCode) params.append("actionCode", actionCode);
    if (category) params.append("category", category);

    if (username) params.append("username", username);

    // Timeline range filters
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);

    // Send the final request with the combined search parameters
    const response = await auditClient.get(
      `/audit/business?${params.toString()}`,
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const addUser = async (
  email,
  username,
  firstname,
  lastname,
  phone,
  job_title,
  office_phone,
  department,
  country,
  county,
  subcounty,
  address,
  role_id,
) => {
  try {
    const response = await client.post(`/users`, {
      email,
      username,
      firstname,
      lastname,
      phone,
      job_title,
      office_phone,
      department,
      country,
      county,
      subcounty,
      address,
      role_id,
    });
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const editUser = async (
  userId,
  email,
  username,
  firstname,
  lastname,
  phone,
  job_title,
  office_phone,
  department,
  country,
  county,
  subcounty,
  address,
  role_id,
) => {
  try {
    const response = await client.patch(`/users/${userId}`, {
      email,
      username,
      firstname,
      lastname,
      phone,
      job_title,
      office_phone,
      department,
      country,
      county,
      subcounty,
      address,
      role_id,
    });
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const getModules = async () => {
  try {
    const response = await client.get(`/modules`);
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const getUser = async (userId) => {
  try {
    const response = await client.get(`/users/${userId}`);
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const addRole = async (name, description) => {
  try {
    const response = await client.post(`/roles`, {
      name,
      description,
    });
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const editRole = async (id, name, description) => {
  try {
    const response = await client.patch(`/roles/${id}`, {
      name,
      description,
    });
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};
