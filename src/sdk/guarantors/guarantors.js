import { loanClient } from "../client/loan-client";

export const getGuarantors = async (
  page,
  limit,
  status,
  application_status,
  loan_type,
  loan_product_code,
  startDate,
  endDate,
) => {
  try {
    const params = new URLSearchParams();

    // Numbers & Pagination checks
    if (page != null) params.append("page", page);
    if (limit != null) params.append("limit", limit);

    // Text & Search filters
    if (loan_type) params.append("loan_type", loan_type);
    if (application_status)
      params.append("application_status", application_status);
    if (status) params.append("status", status);

    if (loan_product_code)
      params.append("loan_product_code", loan_product_code);

    // Timeline range filters
    if (startDate) params.append("from_date", startDate);
    if (endDate) params.append("to_date", endDate);

    // Send the final request with the combined search parameters
    const response = await loanClient.get(
      `/loan-applications/guarantors?${params.toString()}`,
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};
