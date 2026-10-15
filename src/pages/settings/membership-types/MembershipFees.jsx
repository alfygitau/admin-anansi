import React, { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock,
  Edit3,
  X,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Wallet,
  FileCheck2,
  User,
  Calendar,
  MessageSquare,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { getSettings, updateSettings } from "../../../sdk/referral/referral";
import { useToast } from "../../../contexts/ToastProvider";
import { useFormatAmount } from "../../../hooks/useFormatAmount";
import {
  approveMembershipFeeChange,
  getMembershipFeeApprovals,
  rejectMembershipFeeChange,
} from "../../../sdk/membership/membership";

export const MembershipFees = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const formatAmount = useFormatAmount();

  // Propose change modal
  const [showModal, setShowModal] = useState(false);
  const [currentFee, setCurrentFee] = useState(0);
  const [draftFee, setDraftFee] = useState("");
  const [changeReason, setChangeReason] = useState("");

  // Two-step Review Flow States
  const [confirmPrompt, setConfirmPrompt] = useState(null); // { item, decision: "approved" | "rejected" }
  const [feedbackModal, setFeedbackModal] = useState(null); // { item, decision: "approved" | "rejected" }
  const [reviewFeedback, setReviewFeedback] = useState("");

  // 1. Fetch current settings
  const { isFetching: fetchingSettings, refetch: refetchSettings } = useQuery({
    queryKey: ["get membership fee settings"],
    queryFn: async () => {
      const response = await getSettings();
      return response.data?.data;
    },
    onSuccess: (data) => {
      if (data) {
        const fee = Number(
          data?.membership_fee ?? data?.default_membership_fee ?? 0,
        );
        setCurrentFee(fee);
        setDraftFee(fee);
      }
    },
    onError: (error) => {
      showToast({
        title: "Couldn't load membership fee",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  // 2. Fetch approvals history
  const {
    data: approvals = [],
    isFetching: fetchingApprovals,
    refetch: refetchApprovals,
  } = useQuery({
    queryKey: ["get membership fee approvals"],
    queryFn: async () => {
      const response = await getMembershipFeeApprovals();
      return response?.data || [];
    },
    onError: (error) => {
      showToast({
        title: "Couldn't load approvals",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const pendingApproval = approvals.find((item) => item.status === "pending");

  // 3. Propose fee change mutation
  const { mutate: submitFeeChange, isLoading: isSubmitting } = useMutation({
    mutationKey: ["submit membership fee update"],
    mutationFn: async (payload) => {
      const response = await updateSettings(payload);
      return response.data;
    },
    onSuccess: () => {
      refetchSettings();
      refetchApprovals();
      setShowModal(false);
      setChangeReason("");
      showToast({
        title: "Approval Request Submitted",
        type: "success",
        position: "top-right",
        description:
          "Your proposed fee change has been sent for admin review and approval.",
      });
    },
    onError: (error) => {
      showToast({
        title: "Couldn't submit fee update",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  // 4. Approve mutation
  const { mutate: processApproval, isLoading: isReviewing } = useMutation({
    mutationKey: ["review membership fee adjustment"],
    mutationFn: async ({ approvalId, review_feedback }) => {
      const response = await approveMembershipFeeChange(
        approvalId,
        review_feedback,
      );
      return response.data;
    },
    onSuccess: () => {
      refetchSettings();
      refetchApprovals();
      setFeedbackModal(null);
      setReviewFeedback("");
      showToast({
        title: "Adjustment Approved",
        type: "success",
        position: "top-right",
        description: "The proposed membership fee is now live.",
      });
    },
    onError: (error) => {
      showToast({
        title: "Review Action Failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  // 5. Reject mutation
  const { mutate: rejectApproval, isLoading: isRejecting } = useMutation({
    mutationKey: ["reject membership fee adjustment"],
    mutationFn: async ({ approvalId, review_feedback }) => {
      const response = await rejectMembershipFeeChange(
        approvalId,
        review_feedback,
      );
      return response.data;
    },
    onSuccess: () => {
      refetchSettings();
      refetchApprovals();
      setFeedbackModal(null);
      setReviewFeedback("");
      showToast({
        title: "Adjustment Rejected",
        type: "info",
        position: "top-right",
        description: "The proposed membership fee change was declined.",
      });
    },
    onError: (error) => {
      showToast({
        title: "Review Action Failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  // Handlers for Propose Change Modal
  const handleOpenModal = () => {
    setDraftFee(currentFee);
    setChangeReason("");
    setShowModal(true);
  };

  const handleSave = () => {
    const parsedFee = Math.max(0, Number(draftFee) || 0);
    submitFeeChange({
      membership_fee: parsedFee,
      review_feedback: changeReason.trim() || undefined,
    });
  };

  // Step 1: Trigger Centered Prompt
  const handleInitiateReview = (item, decision) => {
    setConfirmPrompt({ item, decision });
  };

  // Step 2: Transition from Centered Prompt to Right-Sided Feedback Modal
  const handleProceedToFeedback = () => {
    const { item, decision } = confirmPrompt;
    setConfirmPrompt(null);
    setReviewFeedback("");
    setFeedbackModal({ item, decision });
  };

  // Step 3: Final Submit with Feedback
  const handleSubmitReview = () => {
    if (!feedbackModal || !reviewFeedback.trim()) return;

    const payload = {
      approvalId: feedbackModal.item.id,
      review_feedback: reviewFeedback.trim(),
    };

    if (feedbackModal.decision === "approved") {
      processApproval(payload);
    } else {
      rejectApproval(payload);
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return "—";
    return new Date(isoString).toLocaleDateString("en-KE", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <div className="w-full space-y-6 select-none max-w-7xl mx-auto">
        {/* 1. HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#074073] transition-colors mb-2 cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Back to Settings</span>
            </button>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Standard Membership Fee
              </h1>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black tracking-wider uppercase border ${
                  pendingApproval
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : "bg-emerald-50 text-[#074073] border-emerald-200"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    pendingApproval
                      ? "bg-amber-500 animate-pulse"
                      : "bg-emerald-500"
                  }`}
                />
                {pendingApproval ? "Change Pending Approval" : "Fee Active"}
              </span>
            </div>
            <p className="text-xs font-medium text-slate-500">
              Define the default entrance fee applied to all standard member
              registrations across onboarded tiers.
            </p>
          </div>
        </div>

        {/* 2. TOP SUMMARY CARDS */}
        {fetchingSettings ? (
          <FeeCardsSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
            {/* CARD 1: CURRENT FEE */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-3xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[#074073]">
                    <Wallet size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                      Default Onboarding Charge
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                      Standard Entrance Fee
                    </h4>
                  </div>
                </div>

                <div className="pt-1 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900 tracking-tight">
                    {formatAmount(currentFee ?? 0)}
                  </span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    / new registration
                  </span>
                </div>

                <div className="space-y-2.5">
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Enforced at the point of member vetting unless explicitly
                    overridden in custom membership tier rules.
                  </p>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5 text-[11px] text-slate-500 leading-normal">
                    <ShieldCheck
                      size={14}
                      className="text-[#074073] shrink-0 mt-0.5"
                    />
                    <span>
                      Dual-control policy enabled: any changes to this fee
                      mandate authorization by an independent reviewer.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="text-[11px] text-slate-400 font-medium">
                  Credit Destination:{" "}
                  <strong className="text-slate-700">
                    Entrance Fee Ledger
                  </strong>
                </div>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleOpenModal}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80 hover:text-[#074073] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Edit3 size={13} />
                  <span>Propose Change</span>
                </button>
              </div>
            </div>

            {/* CARD 2: DUAL CONTROL & APPROVAL STATUS */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-3xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2.5 rounded-xl border ${
                        pendingApproval
                          ? "bg-amber-50 text-amber-700 border-amber-200/60"
                          : "bg-emerald-50 text-[#074073] border-emerald-200/60"
                      }`}
                    >
                      <FileCheck2 size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                        Maker-Checker Policy
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                        Governance & Approval
                      </h4>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase border ${
                      pendingApproval
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : "bg-slate-50 text-slate-600 border-slate-200"
                    }`}
                  >
                    <Clock size={12} />
                    {pendingApproval ? "Under Review" : "In Sync"}
                  </span>
                </div>

                <div className="pt-1">
                  <h5 className="text-base font-bold text-slate-800">
                    {pendingApproval
                      ? `Pending update to ${formatAmount(
                          pendingApproval.proposed_membership_fee,
                        )}`
                      : "All fee settings are approved and active"}
                  </h5>
                </div>

                <div className="space-y-2.5">
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {pendingApproval
                      ? `Initiated by ${
                          pendingApproval.submitted_by?.firstname || "Admin"
                        } on ${formatDate(
                          pendingApproval.submitted_at,
                        )}. Awaiting review by an authorized committee or officer.`
                      : "No pending adjustments found. Direct modifications are restricted to safeguard audit compliance."}
                  </p>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5 text-[11px] text-slate-500 leading-normal">
                    <AlertTriangle
                      size={14}
                      className="text-amber-600 shrink-0 mt-0.5"
                    />
                    <span>
                      Approved adjustments will automatically update all
                      incoming membership applications instantly.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>Status:</span>
                <span
                  className={`font-bold ${
                    pendingApproval ? "text-amber-600" : "text-[#074073]"
                  }`}
                >
                  {pendingApproval
                    ? "1 Change Awaiting Approval"
                    : "No Pending Actions"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 3. APPROVALS TABLE SECTION */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-3xs overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Fee Adjustment Approvals
              </h3>
              <p className="text-xs font-medium text-slate-500 mt-0.5">
                Audit log of all proposed membership fee adjustments and
                approval decisions.
              </p>
            </div>

            <span className="self-start sm:self-auto text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-600 rounded-full">
              {approvals.length} {approvals.length === 1 ? "Record" : "Records"}
            </span>
          </div>

          {fetchingApprovals ? (
            <ApprovalsTableSkeleton />
          ) : approvals.length === 0 ? (
            <div className="p-16 text-center flex flex-col items-center justify-center">
              <FileCheck2 size={36} className="text-slate-300 mb-3" />
              <h4 className="text-sm font-bold text-slate-800">
                No approval history
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                No fee modification requests have been logged yet. Changes
                submitted will appear here for audit review.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-6">Date Submitted</th>
                    <th className="py-3 px-6">Submitted By</th>
                    <th className="py-3 px-6">Proposed Adjustment</th>
                    <th className="py-3 px-6">Status</th>
                    <th className="py-3 px-6">Reviewed By</th>
                    <th className="py-3 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {approvals.map((item) => {
                    const statusColors = {
                      approved:
                        "bg-emerald-50 text-[#074073] border-emerald-200",
                      rejected: "bg-rose-50 text-rose-700 border-rose-200",
                      pending: "bg-amber-50 text-amber-700 border-amber-200",
                    };

                    const current = Number(item.current_membership_fee || 0);
                    const proposed = Number(item.proposed_membership_fee || 0);
                    const isPending = item.status?.toLowerCase() === "pending";

                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                        {/* Submitted At */}
                        <td className="py-4 px-6 whitespace-nowrap">
                          <div className="flex items-center gap-2 text-slate-600">
                            <Calendar size={13} className="text-slate-400" />
                            <span>
                              {formatDate(item.submitted_at || item.createdAt)}
                            </span>
                          </div>
                        </td>

                        {/* Submitted By */}
                        <td className="py-4 px-6 whitespace-nowrap">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-[#074073]/10 text-[#074073] flex items-center justify-center font-bold text-[11px] shrink-0">
                              {item.submitted_by?.firstname?.[0]?.toUpperCase() ||
                                item.submitted_by?.username?.[0]?.toUpperCase() ||
                                "U"}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 leading-tight">
                                {item.submitted_by?.firstname
                                  ? `${item.submitted_by.firstname} ${
                                      item.submitted_by.lastname || ""
                                    }`
                                  : item.submitted_by?.username || "Unknown"}
                              </p>
                              <p className="text-[10px] text-slate-400 leading-tight">
                                {item.submitted_by?.job_title ||
                                  item.submitted_by?.email ||
                                  "Admin"}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Proposed Adjustment */}
                        <td className="py-4 px-6 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-500 line-through">
                              {formatAmount(current)}
                            </span>
                            <ArrowRight size={12} className="text-slate-400" />
                            <span className="font-bold text-slate-900">
                              {formatAmount(proposed)}
                            </span>
                          </div>
                        </td>

                        {/* Status Badge */}
                        <td className="py-4 px-6 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
                              statusColors[item.status?.toLowerCase()] ||
                              "bg-slate-50 text-slate-600 border-slate-200"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                item.status === "approved"
                                  ? "bg-emerald-500"
                                  : item.status === "rejected"
                                    ? "bg-rose-500"
                                    : "bg-amber-500 animate-pulse"
                              }`}
                            />
                            {item.status || "Pending"}
                          </span>
                        </td>

                        {/* Reviewed By */}
                        <td className="py-4 px-6 whitespace-nowrap">
                          {item.reviewed_by ? (
                            <div className="flex items-center gap-2">
                              <User size={13} className="text-slate-400" />
                              <div>
                                <p className="font-semibold text-slate-800">
                                  {item.reviewed_by.firstname}{" "}
                                  {item.reviewed_by.lastname}
                                </p>
                                <p className="text-[10px] text-slate-400">
                                  {formatDate(
                                    item.reviewed_at || item.approved_at,
                                  )}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <span className="text-slate-400 text-[11px] italic">
                              Awaiting Review
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 whitespace-nowrap text-right">
                          {isPending ? (
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                disabled={isReviewing || isRejecting}
                                onClick={() =>
                                  handleInitiateReview(item, "approved")
                                }
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 text-[#074073] hover:bg-emerald-100 border border-emerald-200/80 text-[11px] font-bold transition-colors cursor-pointer"
                                title="Approve Adjustment"
                              >
                                <Check size={13} strokeWidth={2.5} />
                                <span>Approve</span>
                              </button>
                              <button
                                type="button"
                                disabled={isReviewing || isRejecting}
                                onClick={() =>
                                  handleInitiateReview(item, "rejected")
                                }
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/80 text-[11px] font-bold transition-colors cursor-pointer"
                                title="Reject Adjustment"
                              >
                                <X size={13} strokeWidth={2.5} />
                                <span>Reject</span>
                              </button>
                            </div>
                          ) : (
                            <span className="text-slate-400 text-[11px] font-medium">
                              Resolved
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/45">
          <div className="relative flex h-full w-full max-w-[480px] flex-col border border-slate-200 bg-white shadow-xl animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#074073]/10 text-[#074073] rounded-xl">
                  <Edit3 size={18} />
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-[#20242C] tracking-tight">
                    Propose Fee Adjustment
                  </h3>
                  <p className="text-[12px] text-[#667085] mt-0.5">
                    Submit a new standard fee for administrative review.
                  </p>
                </div>
              </div>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setShowModal(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-[#344054]">
                  Proposed Entrance Fee (KES){" "}
                  <span className="text-rose-600">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
                    <span className="text-[13px] font-bold text-slate-400 group-focus-within:text-[#074073] transition-colors">
                      KES
                    </span>
                    <div className="w-[1.5px] h-5 bg-slate-200 ml-3.5 group-focus-within:bg-[#074073]/30 transition-colors" />
                  </div>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 1000"
                    value={draftFee}
                    onChange={(e) => setDraftFee(e.target.value)}
                    className="w-full pl-20 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all text-sm font-semibold text-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-[#344054]">
                  Review Feedback / Justification
                </label>
                <textarea
                  rows={3}
                  placeholder="Provide the reason for this modification (e.g., Annual Board Review resolution)..."
                  value={changeReason}
                  onChange={(e) => setChangeReason(e.target.value)}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all text-xs font-medium text-slate-800 placeholder:text-slate-400 resize-none"
                />
              </div>

              <div className="rounded-xl border border-slate-100 bg-[#F9FAFB] p-4 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Current Active Fee
                  </span>
                  <span className="text-base font-bold text-slate-800">
                    {formatAmount(currentFee)}
                  </span>
                </div>
                <ArrowRight size={18} className="text-slate-300" />
                <div className="text-right">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#074073] block">
                    Proposed Target
                  </span>
                  <span className="text-base font-black text-[#074073]">
                    {draftFee ? formatAmount(Number(draftFee)) : "KES 0.00"}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/70 flex items-center gap-2.5">
                <ShieldCheck
                  size={16}
                  className="text-[#074073] shrink-0 mt-0.5"
                />
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                  Submitting will create an approval request with status{" "}
                  <strong className="text-amber-700">pending</strong>. The fee
                  will not update in real-time until approved by an authorized
                  reviewer.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="w-full flex items-center justify-between gap-3 border-t border-slate-100 px-6 py-4 bg-slate-50/50 rounded-b-2xl">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setShowModal(false)}
                className="flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-xs font-semibold text-[#344054] hover:bg-slate-50 transition-colors disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={
                  isSubmitting ||
                  draftFee === "" ||
                  Number(draftFee) === Number(currentFee)
                }
                onClick={handleSave}
                className="flex h-10 items-center justify-center gap-1.5 rounded-xl bg-[#074073] px-6 text-xs font-semibold text-white hover:bg-[#06335c] transition-colors shadow-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <Check size={16} />
                <span>
                  {isSubmitting ? "Submitting..." : "Submit Proposal"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
          <div className="relative flex w-full max-w-md flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl shrink-0 border ${
                  confirmPrompt.decision === "approved"
                    ? "bg-emerald-50 text-[#074073] border-emerald-100"
                    : "bg-rose-50 text-rose-600 border-rose-100"
                }`}
              >
                {confirmPrompt.decision === "approved" ? (
                  <CheckCircle2 size={24} />
                ) : (
                  <AlertTriangle size={24} />
                )}
              </div>
              <div>
                <h3 className="text-base font-bold text-[#20242C]">
                  {confirmPrompt.decision === "approved"
                    ? "Approve Fee Adjustment?"
                    : "Reject Fee Adjustment?"}
                </h3>
                <p className="text-xs text-[#667085] mt-0.5">
                  {confirmPrompt.decision === "approved"
                    ? "Confirm the adjustment details before proceeding."
                    : "Confirm that you want to decline this fee change."}
                </p>
              </div>
            </div>

            {/* Summary Details */}
            <div className="py-5 space-y-4">
              <div className="rounded-xl border border-slate-100 bg-[#F9FAFB] p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Current Active
                  </span>
                  <span className="text-sm font-semibold text-slate-700 line-through">
                    {formatAmount(confirmPrompt.item.current_membership_fee)}
                  </span>
                </div>
                <ArrowRight size={16} className="text-slate-300" />
                <div className="text-right">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider block ${
                      confirmPrompt.decision === "approved"
                        ? "text-[#074073]"
                        : "text-rose-700"
                    }`}
                  >
                    Target Fee
                  </span>
                  <span
                    className={`text-lg font-black ${
                      confirmPrompt.decision === "approved"
                        ? "text-[#074073]"
                        : "text-rose-700"
                    }`}
                  >
                    {formatAmount(confirmPrompt.item.proposed_membership_fee)}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                You will be required to provide audit review feedback on the
                next step before finalizing this action.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setConfirmPrompt(null)}
                className="flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-xs font-semibold text-[#344054] hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleProceedToFeedback}
                className={`flex h-10 items-center justify-center gap-1.5 rounded-xl px-6 text-xs font-semibold text-white transition-colors shadow-xs cursor-pointer ${
                  confirmPrompt.decision === "approved"
                    ? "bg-[#074073] hover:bg-[#074073]"
                    : "bg-rose-600 hover:bg-rose-700"
                }`}
              >
                <span>Continue</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {feedbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/45">
          <div className="relative flex h-full w-full max-w-[480px] flex-col border border-slate-200 bg-white shadow-xl animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2.5 rounded-xl ${
                    feedbackModal.decision === "approved"
                      ? "bg-emerald-50 text-[#074073]"
                      : "bg-rose-50 text-rose-700"
                  }`}
                >
                  <MessageSquare size={18} />
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-[#20242C] tracking-tight">
                    {feedbackModal.decision === "approved"
                      ? "Approve Fee Adjustment"
                      : "Reject Fee Adjustment"}
                  </h3>
                  <p className="text-[12px] text-[#667085] mt-0.5">
                    Provide reason and audit review notes.
                  </p>
                </div>
              </div>
              <button
                type="button"
                disabled={isReviewing || isRejecting}
                onClick={() => setFeedbackModal(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Proposal Summary Banner */}
              <div className="rounded-xl border border-slate-100 bg-[#F9FAFB] p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Current Active
                  </span>
                  <span className="text-sm font-semibold text-slate-700 line-through">
                    {formatAmount(feedbackModal.item.current_membership_fee)}
                  </span>
                </div>
                <ArrowRight size={16} className="text-slate-300" />
                <div className="text-right">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider block ${
                      feedbackModal.decision === "approved"
                        ? "text-[#074073]"
                        : "text-rose-700"
                    }`}
                  >
                    Target Fee
                  </span>
                  <span
                    className={`text-base font-black ${
                      feedbackModal.decision === "approved"
                        ? "text-[#074073]"
                        : "text-rose-700"
                    }`}
                  >
                    {formatAmount(feedbackModal.item.proposed_membership_fee)}
                  </span>
                </div>
              </div>

              {/* Textarea for Required Reason */}
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-[#344054]">
                  {feedbackModal.decision === "approved"
                    ? "Approval Reason / Remarks"
                    : "Rejection Reason / Remarks"}{" "}
                  <span className="text-rose-600">*</span>
                </label>
                <textarea
                  rows={5}
                  placeholder={
                    feedbackModal.decision === "approved"
                      ? "State the reason for approving this adjustment (e.g., in accordance with board resolution)..."
                      : "State the reason for rejecting this proposed fee change..."
                  }
                  value={reviewFeedback}
                  onChange={(e) => setReviewFeedback(e.target.value)}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all text-xs font-medium text-slate-800 placeholder:text-slate-400 resize-y"
                />
                <span className="text-[11px] text-slate-400 block leading-tight">
                  This note is required and recorded in the audit trail.
                </span>
              </div>

              {/* Submitter Details */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-600">
                <ShieldCheck
                  size={16}
                  className="text-[#074073] shrink-0 mt-0.5"
                />
                <span>
                  Submitted by{" "}
                  <strong>
                    {feedbackModal.item.submitted_by?.firstname || "Admin"}{" "}
                    {feedbackModal.item.submitted_by?.lastname || ""}
                  </strong>{" "}
                  ({feedbackModal.item.submitted_by?.job_title || "Staff"}).
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="w-full flex items-center justify-between gap-3 border-t border-slate-100 px-6 py-4 bg-slate-50/50 rounded-b-2xl">
              <button
                type="button"
                disabled={isReviewing || isRejecting}
                onClick={() => setFeedbackModal(null)}
                className="flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-xs font-semibold text-[#344054] hover:bg-slate-50 transition-colors disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isReviewing || isRejecting || !reviewFeedback.trim()}
                onClick={handleSubmitReview}
                className={`flex h-10 items-center justify-center gap-1.5 rounded-xl px-6 text-xs font-semibold text-white transition-colors shadow-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${
                  feedbackModal.decision === "approved"
                    ? "bg-[#074073] hover:bg-[#074073]"
                    : "bg-rose-600 hover:bg-rose-700"
                }`}
              >
                {feedbackModal.decision === "approved" ? (
                  <Check size={16} />
                ) : (
                  <X size={16} />
                )}
                <span>
                  {isReviewing || isRejecting
                    ? "Processing..."
                    : feedbackModal.decision === "approved"
                      ? "Confirm & Approve"
                      : "Confirm & Reject"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const FeeCardsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full animate-pulse">
    {[1, 2].map((i) => (
      <div
        key={i}
        className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-3xs flex flex-col justify-between"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-200 shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-2.5 w-24 bg-slate-200 rounded" />
              <div className="h-3.5 w-36 bg-slate-200 rounded" />
            </div>
          </div>
          <div className="h-8 w-36 bg-slate-200 rounded-lg mt-2" />
          <div className="space-y-2">
            <div className="h-3 w-full bg-slate-100 rounded" />
            <div className="h-3 w-4/5 bg-slate-100 rounded" />
          </div>
        </div>
        <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between">
          <div className="h-3 w-28 bg-slate-200 rounded" />
          <div className="h-7 w-28 bg-slate-200 rounded-xl" />
        </div>
      </div>
    ))}
  </div>
);

const ApprovalsTableSkeleton = () => (
  <div className="p-6 space-y-4 animate-pulse">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="flex items-center justify-between gap-4 py-2">
        <div className="h-3.5 w-28 bg-slate-200 rounded" />
        <div className="h-3.5 w-36 bg-slate-200 rounded" />
        <div className="h-3.5 w-32 bg-slate-200 rounded" />
        <div className="h-5 w-20 bg-slate-200 rounded-full" />
        <div className="h-3.5 w-24 bg-slate-200 rounded" />
      </div>
    ))}
  </div>
);
