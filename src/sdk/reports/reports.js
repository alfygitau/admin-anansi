import { loanClient } from "../client/loan-client";

export const generateReports = async (
  reportKey,
  startDate,
  endDate,
  as_at,
  exportFormat,
) => {
  try {
    const response = await loanClient.post(`/reports/sasra/generate`, {
      reportKey: reportKey,
      org_code: "BA208",
      startDate: startDate,
      endDate: endDate,
      as_at: as_at,
      exportFormat: exportFormat,
    });
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const getReportKeys = async () => {
  try {
    const response = await loanClient.get(`/reports/sasra/templates`);
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const balanceSheet = async (startDate, endDate, org_code = "BA208") => {
  try {
    const params = new URLSearchParams();
    if (startDate) params.append("from", startDate);
    if (endDate) params.append("to", endDate);
    if (org_code != null) params.append("org_code", org_code);
    const response = await loanClient.get(
      `/accounting/balance-sheet?${params.toString()}`,
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const trialBalance = async (startDate, endDate, org_code = "BA208") => {
  try {
    const params = new URLSearchParams();
    if (startDate) params.append("from", startDate);
    if (endDate) params.append("to", endDate);
    if (org_code != null) params.append("org_code", org_code);
    const response = await loanClient.get(
      `/accounting/trial-balance?${params.toString()}`,
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const incomeStatement = async (
  startDate,
  endDate,
  org_code = "BA208",
) => {
  try {
    const params = new URLSearchParams();
    if (startDate) params.append("from", startDate);
    if (endDate) params.append("to", endDate);
    if (org_code != null) params.append("org_code", org_code);
    const response = await loanClient.get(
      `/accounting/income-statement?${params.toString()}`,
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const chartOfAccounts = async (org_code = "BA208") => {
  try {
    const params = new URLSearchParams();
    if (org_code != null) params.append("org_code", org_code);
    const response = await loanClient.get(
      `/accounting/chart-of-accounts?${params.toString()}`,
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};
