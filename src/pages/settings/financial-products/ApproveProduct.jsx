import React, { useState } from "react";
import {
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Calendar,
  User,
  AlertTriangle,
  FileText,
  Clock,
  ShieldCheck,
  Layers,
  X,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Shield,
  History,
  Check,
  Building2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { useToast } from "../../../contexts/ToastProvider";
import * as Sentry from "@sentry/react";
import {
  approveDepositSubmission,
  getDepositApproval,
  rejectDepositSubmission,
} from "../../../sdk/products/products";

export const ReviewProductSubmission = () => {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [approvalData, setApprovalData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { isFetching } = useQuery({
    queryKey: ["approval", id],
    queryFn: async () => {
      const response = await getDepositApproval(id);
      return response?.data;
    },
    onSuccess: (data) => {
      setApprovalData(data);
    },
    onError: (error) => {
      Sentry.captureException(
        new Error(error?.response?.data?.message || error.message),
        {
          tags: { component: "Accounts", action: "getDepositApproval" },
        },
      );
      showToast({
        title: "Failed to load approval request",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const handleConfirmApproval = async () => {
    await approve();
  };

  const handleConfirmRejection = async () => {
    await reject();
  };

  const { mutate: approve, isLoading: approving } = useMutation({
    mutationKey: ["approve product changes"],
    mutationFn: async () => {
      const response = await approveDepositSubmission(id, {});
      return response;
    },
    onSuccess: (data) => {
      navigate("/admin/financial-products/approvals");
    },
    onError: (error) => {
      Sentry.captureException(
        new Error(error?.response?.data?.message || error.message),
        {
          tags: {
            component: "Product Approvals",
            action: "DepositApproval",
          },
        },
      );
      showToast({
        title: "Failed to load approval request",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const { mutate: reject, isLoading: rejecting } = useMutation({
    mutationKey: ["reject product changes"],
    mutationFn: async () => {
      const response = await rejectDepositSubmission(id, {
        feedBack: rejectionReason,
      });
      return response;
    },
    onSuccess: (data) => {
      navigate("/admin/financial-products/approvals");
    },
    onError: (error) => {
      Sentry.captureException(
        new Error(error?.response?.data?.message || error.message),
        {
          tags: {
            component: "Product Approvals",
            action: "DepositApproval",
          },
        },
      );
      showToast({
        title: "Failed to load approval request",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const product = approvalData?.product || approvalData?.current_payload || {};
  const submitter = approvalData?.submitted_by || {};
  const submitterName =
    [submitter.firstname, submitter.lastname].filter(Boolean).join(" ") ||
    submitter.username ||
    "System Administrator";
  const changedFields = approvalData?.changed_fields || [];
  const publicCode =
    product?.public_code ||
    approvalData?.proposed_payload?.public_code ||
    "N/A";
  const productName =
    product?.name ||
    approvalData?.proposed_payload?.name ||
    "Financial Product";

  return (
    <>
      <div className="w-full space-y-6 select-none font-sans antialiased text-slate-800">
        {/* 1. PAGE HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 transition-all cursor-pointer shrink-0 shadow-3xs"
              title="Go Back"
            >
              <ArrowLeft size={16} />
            </button>
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>Settings</span>
              </div>
              <div className="flex items-center gap-3 mt-0.5">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Review {productName}
                </h2>
                <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border bg-amber-50 text-amber-700 border-amber-200/60 shadow-3xs">
                  <span className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
                  Pending Review
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. EXECUTIVE METADATA & CONTEXT CARDS */}
        {isFetching ? (
          /* SKELETON LOADER STATE */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-3xs flex items-center gap-3"
              >
                <div className="size-10 rounded-xl bg-slate-200 shrink-0" />
                <div className="min-w-0 space-y-1.5 w-full">
                  <div className="h-2.5 w-16 bg-slate-200 rounded" />
                  <div className="h-3.5 w-28 bg-slate-200 rounded" />
                  <div className="h-2.5 w-20 bg-slate-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Submitter Info */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-3xs flex items-center gap-3 hover:border-slate-300 transition-all">
              <div className="size-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">
                <User size={18} />
              </div>
              <div className="min-w-0 space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                  Requested By
                </span>
                <p className="text-xs font-extrabold text-slate-900 truncate">
                  {submitterName}
                </p>
                <p className="text-[10px] text-slate-400 font-medium truncate">
                  {submitter.job_title ||
                    submitter.department ||
                    "Administrator"}
                </p>
              </div>
            </div>

            {/* Card 2: Submission Date */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-3xs flex items-center gap-3 hover:border-slate-300 transition-all">
              <div className="size-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold shrink-0">
                <Calendar size={18} />
              </div>
              <div className="min-w-0 space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                  Submitted Date
                </span>
                <p className="text-xs font-extrabold text-slate-900 font-mono">
                  {approvalData?.submitted_at
                    ? new Date(approvalData.submitted_at).toLocaleDateString(
                        "en-KE",
                        {
                          dateStyle: "medium",
                        },
                      )
                    : "—"}
                </p>
                <p className="text-[10px] text-slate-400 font-medium font-mono">
                  {approvalData?.submitted_at
                    ? new Date(approvalData.submitted_at).toLocaleTimeString(
                        "en-KE",
                        {
                          timeStyle: "short",
                        },
                      )
                    : ""}
                </p>
              </div>
            </div>

            {/* Card 3: Scope */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-3xs flex items-center gap-3 hover:border-slate-300 transition-all">
              <div className="size-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 font-bold shrink-0">
                <Layers size={18} />
              </div>
              <div className="min-w-0 space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                  Application Scope
                </span>
                <p className="text-xs font-extrabold text-slate-900 capitalize">
                  {approvalData?.scope === "all_members"
                    ? "All Members (Immediate)"
                    : "New Members Only"}
                </p>
                <p className="text-[10px] text-slate-400 font-medium">
                  Action:{" "}
                  <span className="uppercase font-bold text-slate-600">
                    {approvalData?.action || "Update"}
                  </span>
                </p>
              </div>
            </div>

            {/* Card 4: Audit & Timestamp */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-3xs flex items-center gap-3 hover:border-slate-300 transition-all">
              <div className="size-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 font-bold shrink-0">
                <History size={18} />
              </div>
              <div className="min-w-0 space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                  Last System Sync
                </span>
                <p className="text-xs font-extrabold text-slate-900 font-mono">
                  {approvalData?.updatedAt
                    ? new Date(approvalData.updatedAt).toLocaleDateString(
                        "en-KE",
                        {
                          dateStyle: "medium",
                        },
                      )
                    : "—"}
                </p>
                <p className="text-[10px] text-slate-400 font-medium">
                  Version {product?.version_number || 1}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3. SCOPE IMPACT DISCLAIMER BANNER */}
        {approvalData?.scope === "all_members" ? (
          <div className="p-4 bg-amber-50/80 border border-amber-200/80 rounded-2xl text-xs font-medium text-amber-900 flex items-start sm:items-center gap-3 shadow-3xs">
            <div className="p-2 bg-amber-100 rounded-xl text-amber-700 shrink-0">
              <AlertTriangle size={18} />
            </div>
            <div className="space-y-0.5">
              <p className="font-bold text-amber-950">
                Immediate System-Wide Impact Warning
              </p>
              <p className="text-amber-800 text-[11px] leading-relaxed">
                Approving this request updates the live configuration in place
                and applies changes to{" "}
                <strong>all active and existing member accounts</strong> tied to
                this product. Account snapshots will preserve historical
                records.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-blue-50/80 border border-blue-200/80 rounded-2xl text-xs font-medium text-blue-900 flex items-start sm:items-center gap-3 shadow-3xs">
            <div className="p-2 bg-blue-100 rounded-xl text-blue-700 shrink-0">
              <Sparkles size={18} />
            </div>
            <div className="space-y-0.5">
              <p className="font-bold text-blue-950">Versioned Release Scope</p>
              <p className="text-blue-800 text-[11px] leading-relaxed">
                This update will create a new product version. Existing member
                accounts will remain on their current terms, while new member
                signups will receive the updated rules.
              </p>
            </div>
          </div>
        )}

        {/* 4. COMPARISON DIFF TABLE CARD */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden space-y-0">
          <div className="p-5 bg-slate-50/60 border-b border-slate-200/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-white border border-slate-200 rounded-xl text-[#074073] shadow-3xs">
                <FileText size={16} />
              </div>
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
                  Proposed Parameter Changes ({changedFields.length})
                </h3>
                <p className="text-[10px] text-slate-400 font-medium">
                  Detailed comparison between active production values and
                  proposed changes.
                </p>
              </div>
            </div>
            <span className="font-mono text-[10px] font-bold text-slate-500 bg-slate-200/60 px-2.5 py-1 rounded-md border border-slate-300/40">
              {changedFields.length} Modified Field
              {changedFields.length === 1 ? "" : "s"}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse table-auto">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/60 text-[10px] font-bold text-slate-400 uppercase tracking-widest select-none">
                  <th className="py-4 px-6 w-1/3">Configuration Parameter</th>
                  <th className="py-4 px-6 w-1/3">Active Current Value</th>
                  <th className="py-4 px-6 w-1/3">Proposed New Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {isFetching ? (
                  /* SKELETON LOADER ROWS */
                  Array.from({ length: 4 }).map((_, index) => (
                    <tr key={index} className="animate-pulse">
                      {/* Col 1: Parameter Title & Slug Skeleton */}
                      <td className="py-3.5 px-6">
                        <div className="flex flex-col space-y-1.5">
                          <div className="h-3.5 w-32 bg-slate-200 rounded" />
                          <div className="h-2.5 w-24 bg-slate-200 rounded" />
                        </div>
                      </td>

                      {/* Col 2: Current Value Box Skeleton */}
                      <td className="py-3.5 px-6">
                        <div className="h-10 w-full max-w-xs bg-slate-200 rounded-xl" />
                      </td>

                      {/* Col 3: Proposed Value Box Skeleton */}
                      <td className="py-3.5 px-6">
                        <div className="h-10 w-full max-w-xs bg-slate-200 rounded-xl" />
                      </td>
                    </tr>
                  ))
                ) : changedFields.length > 0 ? (
                  changedFields.map((item, index) => (
                    <tr
                      key={index}
                      className="group hover:bg-slate-50/50 transition-colors"
                    >
                      {/* Field Name & System Slug */}
                      <td className="py-2 px-6">
                        <div className="flex flex-col space-y-0.5">
                          <span className="font-bold text-slate-900 capitalize text-xs group-hover:text-[#074073] transition-colors">
                            {item.field.replace(/_/g, " ")}
                          </span>
                          <span className="font-mono text-[10px] font-medium text-slate-400">
                            {item.field}
                          </span>
                        </div>
                      </td>

                      {/* Current Value */}
                      <td className="py-2 px-6">
                        <div className="p-3 bg-slate-50/80 border border-slate-200/60 rounded-xl text-slate-600 font-medium">
                          {renderFormattedValue(item.current)}
                        </div>
                      </td>

                      {/* Proposed Value */}
                      <td className="py-2 px-6">
                        <div className="p-3 bg-emerald-50/50 border border-emerald-200/70 rounded-xl text-emerald-950 font-medium">
                          {renderFormattedValue(item.proposed, true)}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="py-16 text-center text-slate-400 font-medium text-xs"
                    >
                      No configuration parameter differences detected in this
                      request.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. DECISION & APPROVAL ACTION CARD (BELOW THE CHANGES LIST) */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-2xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-[#074073]/5 border border-[#074073]/15 text-[#074073]">
                <Shield size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  Review Decision & Authorization
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Verify that all modified parameters align with institutional
                  compliance and risk guidelines.
                </p>
              </div>
            </div>
          </div>

          {/* DECISION CALL-TO-ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-2">
            <div className="text-xs text-slate-400 font-medium">
              <span>
                Action cannot be undone once confirmed. Logged in audit trail.
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setIsRejectModalOpen(true)}
                disabled={rejecting}
                className="w-full sm:w-auto h-11 px-5 rounded-2xl bg-rose-50 border border-rose-200/80 hover:bg-rose-100 text-rose-700 transition-all text-xs font-bold cursor-pointer shadow-3xs flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
              >
                <XCircle size={16} />
                <span>Reject Request</span>
              </button>

              <button
                type="button"
                disabled={approving}
                onClick={handleConfirmApproval}
                className="w-full sm:w-auto h-11 px-6 bg-slate-900 hover:bg-[#074073] text-white rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs active:scale-98 disabled:opacity-50"
              >
                <CheckCircle2 size={16} />
                <span>
                  {approving
                    ? "Processing Approval..."
                    : "Approve & Publish Changes"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 6. REJECTION MODAL */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl max-w-[500px] w-full p-6 space-y-5 select-none">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-rose-600">
                <XCircle size={18} />
                <h3 className="text-base font-bold text-slate-900">
                  Reject Product Request
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsRejectModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Are you sure you want to reject this modification request for{" "}
              <strong>{productName}</strong>? The product will retain its
              current active production state.
            </p>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <MessageSquare size={12} />
                <span>Reason for Rejection (Optional)</span>
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Specify why these changes are being rejected..."
                rows={3}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 rounded-2xl transition-all outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsRejectModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={rejecting}
                onClick={handleConfirmRejection}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-2xs cursor-pointer disabled:opacity-50"
              >
                {rejecting ? "Rejecting..." : "Confirm Rejection"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// --- HELPER TO RENDER VALUES WITH RICH VISUAL INDICATORS ---
const renderFormattedValue = (value, isProposed = false) => {
  if (value === null || value === undefined || value === "") {
    return <span className="text-slate-400 italic font-mono text-xs">—</span>;
  }

  if (typeof value === "boolean") {
    return (
      <span
        className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
          value
            ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
            : "bg-slate-100 text-slate-600 border-slate-200/60"
        }`}
      >
        {value ? "Enabled" : "Disabled"}
      </span>
    );
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return (
        <span className="text-slate-400 italic text-xs">None Configured</span>
      );
    }
    return (
      <div className="flex flex-wrap gap-1.5 py-0.5">
        {value.map((item, index) => (
          <span
            key={index}
            className={`inline-flex items-center gap-1 font-mono text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${
              isProposed
                ? "bg-emerald-100/60 text-emerald-900 border-emerald-300/60"
                : "bg-slate-100 text-slate-700 border-slate-200/60"
            }`}
          >
            {typeof item === "object"
              ? item.label || JSON.stringify(item)
              : String(item)}
          </span>
        ))}
      </div>
    );
  }

  if (typeof value === "object") {
    return (
      <pre className="p-2.5 bg-slate-900 text-slate-100 rounded-xl text-[10px] font-mono overflow-x-auto">
        {JSON.stringify(value, null, 2)}
      </pre>
    );
  }

  return (
    <span
      className={`font-mono text-xs font-bold ${
        isProposed ? "text-emerald-800" : "text-slate-800"
      }`}
    >
      {String(value)}
    </span>
  );
};
