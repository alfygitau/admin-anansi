import { loanClient } from "../client/loan-client";

export const getLoanApplications = async (
  page,
  limit,
  status,
  application_number,
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
    if (application_number)
      params.append("application_number", application_number);
    if (status) params.append("status", status);

    if (loan_product_code)
      params.append("loan_product_code", loan_product_code);

    // Timeline range filters
    if (startDate) params.append("from_date", startDate);
    if (endDate) params.append("to_date", endDate);

    // Send the final request with the combined search parameters
    const response = await loanClient.get(
      `/loan-applications?${params.toString()}`,
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const getAllApprovals = async (
  page,
  limit,
  status,
  approval_type,
  loan_type,
  approver_id,
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
    if (approval_type) params.append("approval_type", approval_type);
    if (status) params.append("status", status);

    if (approver_id) params.append("approver_id", approver_id);

    // Timeline range filters
    if (startDate) params.append("from_date", startDate);
    if (endDate) params.append("to_date", endDate);

    // Send the final request with the combined search parameters
    const response = await loanClient.get(
      `/loan-applications/approvals?${params.toString()}`,
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const getApplication = async (id) => {
  try {
    const response = await loanClient.get(`/loan-applications/${id}`);
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const approveApplication = async (
  id,
  userId,
  name,
  decision,
  reason,
  condition,
  amount,
) => {
  try {
    const response = await loanClient.post(
      `/loan-applications/${id}/approvals/committee`,
      {
        approver_id: userId,
        approver_name: name,
        decision: decision,
        reason: reason,
        conditions: condition,
        recommended_amount: amount,
      },
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const managerApproval = async (
  id,
  userId,
  name,
  decision,
  reason,
  condition,
  amount,
) => {
  try {
    const response = await loanClient.post(
      `/loan-applications/${id}/approvals/manager`,
      {
        approver_id: userId,
        approver_name: name,
        decision: decision,
        reason: reason,
        conditions: condition,
        recommended_amount: amount,
      },
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const disburseApplication = async (
  id,
  userId,
  method,
  name,
  disburseDate,
  notes,
  applicantMobile,
  bank,
  bankAccountNumber,
  bankBranch,
  reference,
  disburseKey,
) => {
  try {
    const response = await loanClient.post(
      `/loan-applications/${id}/disburse`,
      {
        method: method,
        disbursed_by: userId,
        disbursed_by_name: name,
        disbursement_date: disburseDate,
        recipient_phone: applicantMobile,
        bank_name: bank,
        bank_account_number: bankAccountNumber,
        bank_branch: bankBranch,
        transaction_ref: reference,
        notes: notes,
        idempotency_key: disburseKey,
      },
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};
