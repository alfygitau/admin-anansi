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
