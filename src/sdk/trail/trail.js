import { auditClient } from "../client/audit-trail-client";
import auditRegistry from "../../static/actions.json"; // 1. Import your single source of truth registry

const interpolateDescription = (template, data = {}) => {
  if (!template) return "";
  return template.replace(/{(\w+)}/g, (match, key) =>
    data[key] !== undefined ? data[key] : match,
  );
};

export const addTrail = async (actionCode, context = {}) => {
  try {
    const actionMeta = auditRegistry[actionCode];
    const {
      username = "Unknown User",
      memberId,
      loanId,
      loanCode,
      transactionId,
      savingsAccountId,
      sharesAccountId,
      targetUserId,
      metadata,
    } = context;
    const payload = {
      actionCode,
      category: actionMeta?.category || "General",
      page: actionMeta?.page || "System",
      tab: actionMeta?.tab || "System",
      section: actionMeta?.section || "System",
      description: interpolateDescription(actionMeta?.description, {
        loanCode,
        username,
        ...context,
      }),
      username,
      memberId,
      loanId,
      loanCode,
      transactionId,
      savingsAccountId,
      sharesAccountId,
      targetUserId,
      metadata: {
        route: window.location.pathname,
        ...metadata,
      },
    };
    const response = await auditClient.post(`/audit/business`, payload);
    return response.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
};
