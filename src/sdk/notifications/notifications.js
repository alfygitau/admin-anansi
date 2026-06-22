import { loanClient } from "../client/loan-client";

export const addNotification = async (
  customer_id,
  recipient_name,
  recipient_mobile,
  recipient_email,
  channel,
  type,
  title,
  message,
  dedupe_key,
  scheduleDate,
  loan_code,
) => {
  try {
    const response = await loanClient.post(`/notifications`, {
      org_code: "BA208",
      customer_id: customer_id,
      recipient_name: recipient_name,
      recipient_mobile: recipient_mobile,
      recipient_email: recipient_email,
      channel: channel,
      type: type,
      title: title,
      message: message,
      priority: 5,
      dedupe_key: dedupe_key,
      scheduled_at: scheduleDate,
      metadata: {
        loan_code: loan_code,
      },
    });
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};
