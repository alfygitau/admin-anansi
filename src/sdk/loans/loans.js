import { loanClient } from "../client/loan-client";

export const getLoans = async (
  page,
  limit,
  status,
  loan_code,
  loan_type,
  loan_product_code,
  startDate,
  endDate,
  org_code = "BA208",
) => {
  try {
    const params = new URLSearchParams();

    // Numbers & Pagination checks
    if (page != null) params.append("page", page);
    if (limit != null) params.append("limit", limit);

    // Text & Search filters
    if (loan_type) params.append("loan_type", loan_type);
    if (loan_code) params.append("loan_code", loan_code);
    if (status) params.append("loan_status", status);

    if (loan_product_code)
      params.append("loan_product_code", loan_product_code);

    // Timeline range filters
    if (startDate) params.append("from_date", startDate);
    if (endDate) params.append("to_date", endDate);

    if (org_code) params.append("loan_org_code", org_code);

    // Send the final request with the combined search parameters
    const response = await loanClient.get(`/loans?${params.toString()}`);
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const getLoanStatements = async (
  page,
  limit,
  status,
  loan_code,
  loan_type,
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
    if (loan_code) params.append("loan_code", loan_code);
    if (status) params.append("loan_status", status);

    // Timeline range filters
    if (startDate) params.append("from", startDate);
    if (endDate) params.append("to", endDate);

    // Send the final request with the combined search parameters
    const response = await loanClient.get(
      `/loans/statements?${params.toString()}`,
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const getLoan = async (id) => {
  try {
    const response = await loanClient.get(`/loans/${id}`);
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const getFullLoanStatement = async (id, startDate, endDate) => {
  try {
    const params = new URLSearchParams();
    // Timeline range filters
    if (startDate) params.append("from", startDate);
    if (endDate) params.append("to", endDate);

    const response = await loanClient.get(
      `/loans/${id}/statement?${params.toString()}`,
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const getMemberLoans = async (customerId) => {
  try {
    const response = await loanClient.get(
      `/loans?loan_org_code=BA208&customer_id=${customerId}&format=full`,
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const recordManualRepayment = async (
  id,
  amount,
  payment_date,
  payment_mode,
  transaction_ref,
  received_by,
  idempotency_key,
) => {
  try {
    const response = await loanClient.post(`/loans/${id}/repay`, {
      amount,
      payment_date,
      payment_mode,
      transaction_ref,
      received_by,
      idempotency_key,
    });
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const pollLoanRepaymentStatus = async (paymentId) => {
  try {
    const response = await loanClient.get(
      `/mpesa/loan-repayments/${paymentId}/status`,
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const repayLoan = async (
  loanId,
  amount,
  phone_number,
  account_reference,
  idempotency_key,
) => {
  try {
    const response = await loanClient.post(`/mpesa/loan-repayments/stk-push`, {
      loan_id: loanId,
      amount: amount,
      phone_number: phone_number,
      org_code: "BA208",
      account_reference: account_reference,
      description: `Loan repayment ${account_reference}`,
      idempotency_key: idempotency_key,
    });
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};
