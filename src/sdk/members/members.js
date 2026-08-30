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

export const getCounties = async () => {
  try {
    const response = await client.get(`/county`);
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const addAdminCustomer = async (
  customer,
  nextOfKin,
  address,
  selfie_image,
  id_front_image,
  id_back_image,
) => {
  try {
    const formData = new FormData();

    formData.append(
      "customer",
      typeof customer === "object" ? JSON.stringify(customer) : customer,
    );
    formData.append(
      "nextOfKin",
      typeof nextOfKin === "object" ? JSON.stringify(nextOfKin) : nextOfKin,
    );
    formData.append(
      "address",
      typeof address === "object" ? JSON.stringify(address) : address,
    );

    // Append image files
    if (selfie_image) formData.append("selfie_image", selfie_image);
    if (id_front_image) formData.append("id_front_image", id_front_image);
    if (id_back_image) formData.append("id_back_image", id_back_image);

    const response = await client.post(`/customer/add-member`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

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

export const editKin = async (
  kinId,
  fullName,
  birthDate,
  relationship,
  phone,
  location,
) => {
  try {
    const response = await client.patch(`/customer/next-of-kin/${kinId}`, {
      name: fullName,
      dateOfBirth: birthDate,
      relationship: relationship,
      phoneNumber: phone,
      location: location,
    });
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const updateIncomeDetails = async (
  id,
  countryOfResidence,
  employmentType,
  kra,
  jobTitle,
  income,
) => {
  try {
    const response = await client.patch(`/customer/${id}`, {
      country_of_residence: countryOfResidence,
      employment_type: employmentType,
      kraPin: kra,
      occupation: jobTitle,
      income_range: income,
    });
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const updateAddress = async (
  addressId,
  customer_id,
  county,
  subcounty,
  physical_address,
  city,
  postal_address,
  state,
  land_mark,
  street,
  zip_code,
) => {
  try {
    const response = await client.patch(`/address/${addressId}`, {
      county,
      subcounty,
      physical_address,
      city,
      postal_address,
      state,
      land_mark,
      street,
      zip_code,
      customer_id,
    });
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const addAddress = async (
  customer_id,
  county,
  subcounty,
  physical_address,
  postal_address,
  city,
  state,
  land_mark,
  street,
  zip_code,
) => {
  try {
    const response = await client.post(`/address`, {
      county,
      subcounty,
      physical_address,
      city,
      postal_address,
      state,
      land_mark,
      street,
      zip_code,
      customer_id,
    });
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};
