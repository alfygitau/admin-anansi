import React, { useState } from "react";
import {
  FileText,
  ArrowUpRight,
  Coins,
  User,
  Phone,
  Hash,
  Wallet,
  PiggyBank,
  TrendingUp,
  ShieldCheck,
  Calendar,
  CreditCard,
  Briefcase,
  Globe,
  Clock,
  BadgeAlert,
  X,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { useToast } from "../../../contexts/ToastProvider";
import { useQuery, useMutation } from "react-query";
import {
  getApplication,
  managerApproval,
} from "../../../sdk/loan-applications/loan-applications";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import ApprovalSuccess from "../../../components/approve-application/ApproveSuccess";
import * as Sentry from "@sentry/react";

const ManagerApproval = () => {
  const { showToast } = useToast();
  const [application, setApplication] = useState({});
  const [checklist, setChecklist] = useState([]);
  const { id } = useParams();
  const { auth } = useAuth();
  const [decision, setDecision] = useState(null);
  const navigate = useNavigate();
  const [recommendedAmount, setRecommendedAmount] = useState(0);
  const [approvalConditions, setApprovalConditions] = useState("");
  const [decisionReason, setDecisionReason] = useState("");
  const [showApprovalSuccess, setShowApprovalSuccess] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [formErrors, setFormErrors] = useState({
    recommendedAmount: "",
    decisionReason: "",
  });

  const validateField = (name, value) => {
    let errorMsg = "";

    if (name === "recommendedAmount") {
      if (!value || Number(value) <= 0) {
        errorMsg =
          "Approved amount is required and must be greater than KES 0.00";
      }
    }

    if (name === "decisionReason") {
      if (!value || !value.trim()) {
        errorMsg =
          "A structural justification reason is mandatory to log this decision.";
      }
    }

    setFormErrors((prev) => ({ ...prev, [name]: errorMsg }));
    return errorMsg === "";
  };

  // 1. Intercept submit to open summary modal first
  const handleSubmit = (e) => {
    e.preventDefault();

    const isAmountValid = validateField("recommendedAmount", recommendedAmount);
    const isReasonValid = validateField("decisionReason", decisionReason);

    if (!isAmountValid || !isReasonValid || !decision) return;

    setShowSummaryModal(true);
  };

  const { isFetching } = useQuery({
    queryKey: ["get loan application", id],
    queryFn: async () => {
      const response = await getApplication(id);
      return response.data?.data;
    },
    onSuccess: (data) => {
      setApplication(data);
      setChecklist(data?.eligibility_result?.checks);
      setRecommendedAmount(data?.applied_amount);
    },
    onError: (error) => {
      Sentry.captureException(error, {
        tags: { component: "Loan Application", action: "get loan application" },
      });
      showToast({
        title: "Transactions processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationKey: ["manager approve application"],
    mutationFn: async () => {
      const response = await managerApproval(
        id,
        auth?.user?.id,
        `${auth?.user?.firstname} ${auth?.user?.firstname}`,
        decision,
        decisionReason,
        approvalConditions,
        recommendedAmount,
      );
      return response?.data?.data;
    },
    onSuccess: (data) => {
      setShowApprovalSuccess(true);
    },
    onError: (error) => {
      Sentry.captureException(error, {
        tags: { component: "Loan Application", action: "manager approval" },
      });
      showToast({
        title: "Transactions processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const formatCurrency = (val) =>
    `KES ${Number(val || 0).toLocaleString("en-KE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const product = application?.loan_product || {};
  const eligibility = application?.eligibility_result || {};

  return (
    <>
      <ApprovalSuccess
        isOpen={showApprovalSuccess}
        onClose={() => setShowApprovalSuccess(false)}
        applicantName={application.applicant_name}
        loanId={application?.application_number}
        finalAmount={recommendedAmount}
        decision={decision}
        onNextReview={() => navigate(`/admin/loan-applications/${id}`)}
        viewApprovals={() => navigate(`/admin/loan-applications-approvals`)}
      />

      {showSummaryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40  animate-in fade-in duration-200">
          <div
            className="fixed inset-0"
            onClick={() => !isLoading && setShowSummaryModal(false)}
          />

          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 flex flex-col">
            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`size-10 rounded-2xl flex items-center justify-center border ${
                    decision === "approved"
                      ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                      : "bg-rose-50 border-rose-200 text-rose-600"
                  }`}
                >
                  {decision === "approved" ? (
                    <CheckCircle2 size={20} />
                  ) : (
                    <XCircle size={20} />
                  )}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">
                    Confirm Decision Summary
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    Review your inputs before committing this decision
                  </p>
                </div>
              </div>
              <button
                type="button"
                disabled={isLoading}
                onClick={() => setShowSummaryModal(false)}
                className="size-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-all cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {/* Applicant Summary Banner */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Applicant & App Number
                  </span>
                  <span className="text-sm font-bold text-slate-800 block mt-0.5">
                    {application.applicant_name}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    {application.application_number}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Action Target
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold uppercase px-2.5 py-1 rounded-full mt-1 ${
                      decision === "approved"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {decision === "approved" ? "Approval" : "Decline"}
                  </span>
                </div>
              </div>

              {/* Data Review Grid */}
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 flex justify-between items-center">
                  <span className="font-semibold text-slate-500">
                    {decision === "approved"
                      ? "Approved Amount"
                      : "Recommended Amount"}
                  </span>
                  <span className="font-bold text-primary text-sm font-mono">
                    {formatCurrency(recommendedAmount)}
                  </span>
                </div>

                {approvalConditions && (
                  <div className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-1">
                    <span className="font-semibold text-slate-500 block">
                      Approval Conditions
                    </span>
                    <p className="text-slate-700 font-medium leading-relaxed">
                      {approvalConditions}
                    </p>
                  </div>
                )}

                <div className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-1">
                  <span className="font-semibold text-slate-500 block">
                    Decision Justification
                  </span>
                  <p className="text-slate-700 font-medium leading-relaxed">
                    {decisionReason}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3">
              <button
                type="button"
                disabled={isLoading}
                onClick={() => setShowSummaryModal(false)}
                className="h-11 px-5 border border-slate-200/80 bg-white text-slate-600 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-100 transition-all cursor-pointer disabled:opacity-50"
              >
                Back & Edit
              </button>
              <button
                type="button"
                disabled={isLoading}
                onClick={() => mutate()}
                className={`h-11 px-6 rounded-xl text-xs font-bold uppercase tracking-wider transition-all text-white shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                  decision === "approved"
                    ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/10"
                    : "bg-rose-600 hover:bg-rose-700 shadow-rose-600/10"
                } disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                <span>{isLoading ? "Submitting..." : "Confirm & Submit"}</span>
                {isLoading ? (
                  <svg
                    className="animate-spin size-4 text-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  <ArrowUpRight size={14} />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="w-full space-y-5 antialiased text-slate-800">
        {/* 1. APPLICATION OVERVIEW HEADER (Frameless) */}
        <div className="flex flex-col lg:flex-row justify-between gap-4 border-b border-slate-200/60 pb-3 select-none">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="size-11 rounded-2xl border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-primary hover:bg-slate-50 hover:border-slate-300 transition-all shadow-3xs cursor-pointer active:scale-95"
            >
              <ArrowLeft size={16} />
            </button>
            <div className="space-y-1">
              <h2 className="text-xl font-black text-primary tracking-tight">
                Approve Loan Application
              </h2>
              <p className="text-sm font-bold text-slate-700">
                {application.applicant_name}
              </p>
              <p className="text-xs text-slate-500">
                {application.loan_type} • Submitted on{" "}
                {new Date(application.application_date).toLocaleDateString(
                  "en-KE",
                  {
                    dateStyle: "medium",
                  },
                )}
              </p>
            </div>
          </div>
        </div>

        {isFetching ? (
          <LoanAndBorrowerSkeleton />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full text-slate-800">
            {/* CARD 1: LOAN APPLICATION DETAILS */}
            <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xs p-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-2xl bg-primary/5 text-primary border border-primary/10 flex items-center justify-center shrink-0">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                      Loan Application Details
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      {application.application_number}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 my-5 bg-slate-50/80 p-4 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Applied Amount
                  </span>
                  <span className="text-xl font-bold text-primary tracking-tight mt-0.5 block">
                    {formatCurrency(application.applied_amount)}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Repayment Duration
                  </span>
                  <span className="text-xl font-bold text-slate-800 tracking-tight mt-0.5 block">
                    {application.loan_period} Months
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-6 gap-x-6 text-xs">
                <DetailItem
                  icon={<Briefcase size={15} />}
                  label="Loan Product"
                  value={product.product_name || "—"}
                />
                <DetailItem
                  icon={<CreditCard size={15} />}
                  label="Repayment Frequency"
                  value={application.loan_interval || "Monthly"}
                />
                <DetailItem
                  icon={<BadgeAlert size={15} />}
                  label="Loan Purpose"
                  value={application.loan_purpose || "—"}
                />
                <DetailItem
                  icon={<Globe size={15} />}
                  label="Application Channel"
                  value={application.loan_channel || "WEB"}
                />
                <DetailItem
                  icon={<Calendar size={15} />}
                  label="Application Date"
                  value={
                    application.application_date
                      ? new Date(
                          application.application_date,
                        ).toLocaleDateString("en-KE", { dateStyle: "medium" })
                      : "—"
                  }
                />
                <DetailItem
                  icon={<TrendingUp size={15} />}
                  label="Interest Rate"
                  value={`${Number(product.interest_rate || 0).toFixed(2)}% pm (${product.interest_method?.replace("_", " ")})`}
                />
              </div>
            </div>

            {/* CARD 2: BORROWER DETAILS & FINANCIAL SNAPSHOT */}
            <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xs p-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-2xl bg-[#074073]/5 text-[#074073] border border-[#074073]/10 flex items-center justify-center shrink-0">
                    <User size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                      Borrower Profile
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      Personal & Financial Profile
                    </p>
                  </div>
                </div>
              </div>

              <div className="my-5 p-4 bg-[#074073]/5 rounded-2xl border border-[#074073]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Applicant Name
                  </span>
                  <span className="text-base font-bold text-slate-900 tracking-tight block">
                    {application.applicant_name}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200/60 w-fit">
                  <Phone size={13} className="text-[#074073]" />
                  <span>{application.applicant_mobile}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-5">
                <BalanceBox
                  icon={<PiggyBank size={15} className="text-emerald-600" />}
                  label="Total Shares"
                  value={formatCurrency(eligibility.total_shares)}
                />
                <BalanceBox
                  icon={<Wallet size={15} className="text-blue-600" />}
                  label="Total Savings"
                  value={formatCurrency(eligibility.total_savings)}
                />
                <BalanceBox
                  icon={<TrendingUp size={15} className="text-indigo-600" />}
                  label="Borrowing Limit"
                  value={formatCurrency(eligibility.limit)}
                />
              </div>

              <div className="grid grid-cols-2 gap-y-6 gap-x-6 text-xs">
                <DetailItem
                  icon={<ShieldCheck size={15} />}
                  label="Eligibility Check"
                  value={
                    application.eligibility_passed
                      ? "Passed All Checks"
                      : "Failed Check"
                  }
                />
                <DetailItem
                  icon={<Calendar size={15} />}
                  label="Membership Tenure"
                  value="19 Months"
                />
                <DetailItem
                  icon={<User size={15} />}
                  label="Guarantors Status"
                  value={`${application.guarantors?.length || 0} / ${product.min_guarantors} Approved`}
                />
              </div>
            </div>
          </div>
        )}

        {/* 3. BOTTOM PANEL: DECISION FORM OPTIONS */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-slate-200/60 p-6 space-y-6 shadow-3xs w-full"
        >
          <div>
            <h3 className="text-sm font-bold text-primary">
              Application Decision
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Select an action first to configure options and finalize this
              application.
            </p>
          </div>

          {/* STEP 1: RADIO SELECTION */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Final Decision
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="decision"
                  value="approved"
                  checked={decision === "approved"}
                  onChange={() => setDecision("approved")}
                  className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-slate-300"
                />
                <span
                  className={`text-sm font-bold ${decision === "approved" ? "text-emerald-700" : "text-slate-600 group-hover:text-slate-800"}`}
                >
                  Approve Application
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="decision"
                  value="rejected"
                  checked={decision === "rejected"}
                  onChange={() => setDecision("rejected")}
                  className="w-4 h-4 text-rose-600 focus:ring-rose-500 border-slate-300"
                />
                <span
                  className={`text-sm font-bold ${decision === "rejected" ? "text-rose-700" : "text-slate-600 group-hover:text-slate-800"}`}
                >
                  Decline Application
                </span>
              </label>
            </div>
          </div>

          {/* STEP 2: DETAILS SECTIONS HIDDEN UNTIL AN ACTION IS CHOSEN */}
          {decision && (
            <div className="space-y-5 pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* RECOMMENDED DISBURSEMENT AMOUNT */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600">
                    {decision === "approve"
                      ? "Approved Amount"
                      : "Recommended Amount Alternative"}
                  </label>
                  <div className="relative flex flex-col group">
                    <div className="relative flex items-center w-full">
                      <Coins
                        size={14}
                        className={`absolute left-4 pointer-events-none transition-colors ${
                          formErrors.recommendedAmount
                            ? "text-rose-400"
                            : "text-slate-400 group-focus-within:text-[#074073]"
                        }`}
                      />
                      <div
                        className={`absolute left-10 w-[1px] h-5 transition-colors ${
                          formErrors.recommendedAmount
                            ? "bg-rose-200"
                            : "bg-slate-200 group-focus-within:bg-[#074073]/30"
                        }`}
                      />

                      <input
                        type="number"
                        value={recommendedAmount || ""}
                        onChange={(e) => {
                          setRecommendedAmount(Number(e.target.value));
                          if (formErrors.recommendedAmount)
                            setFormErrors((p) => ({
                              ...p,
                              recommendedAmount: "",
                            }));
                        }}
                        /* FIXED: Added dynamic onBlur validation execution */
                        onBlur={() =>
                          validateField("recommendedAmount", recommendedAmount)
                        }
                        className={`w-full h-[46px] pl-14 pr-12 bg-slate-50/60 border rounded-xl text-xs font-mono font-bold text-slate-800 focus:outline-none focus:bg-white transition-all ${
                          formErrors.recommendedAmount
                            ? "border-rose-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/5"
                            : "border-slate-200 focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5"
                        }`}
                        placeholder="0.00"
                      />
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none select-none">
                        <span
                          className={`text-[9px] font-black uppercase tracking-wide ${formErrors.recommendedAmount ? "text-rose-400" : "text-slate-400"}`}
                        >
                          KES
                        </span>
                      </div>
                    </div>

                    {/* FIXED: Dynamic onBlur error message display */}
                    {formErrors.recommendedAmount && (
                      <p className="text-[10px] text-rose-600 font-semibold mt-1.5 pl-1 flex items-center gap-1 animate-in fade-in duration-150">
                        <span>{formErrors.recommendedAmount}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* DISBURSEMENT CONDITIONS */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600">
                    Conditions after approval (if any)
                  </label>
                  <div className="relative flex items-center group">
                    <FileText
                      size={14}
                      className="absolute left-4 text-slate-400 pointer-events-none group-focus-within:text-[#074073] transition-colors"
                    />
                    <div className="absolute left-10 w-[1px] h-5 bg-slate-200 group-focus-within:bg-[#074073]/30 transition-colors" />

                    <input
                      type="text"
                      value={approvalConditions}
                      onChange={(e) => setApprovalConditions(e.target.value)}
                      className="w-full h-[46px] pl-14 pr-4 bg-slate-50/60 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#074073] focus:bg-white focus:ring-4 focus:ring-[#074073]/5 transition-all"
                      placeholder="e.g. Provide original physical logbook before cash release"
                    />
                  </div>
                </div>
              </div>

              {/* JUSTIFICATION REASON BLOCK */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600">
                  Reason for decision
                </label>
                <textarea
                  rows={3}
                  value={decisionReason}
                  onChange={(e) => {
                    setDecisionReason(e.target.value);
                    if (formErrors.decisionReason)
                      setFormErrors((p) => ({ ...p, decisionReason: "" }));
                  }}
                  /* FIXED: Added dynamic onBlur validation execution */
                  onBlur={() => validateField("decisionReason", decisionReason)}
                  className={`w-full p-3 bg-slate-50/60 border rounded-xl text-xs font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:bg-white transition-all定位 resize-none ${
                    formErrors.decisionReason
                      ? "border-rose-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/5"
                      : "border-slate-200 focus:border-[#074073] focus:bg-white focus:ring-4 focus:ring-[#074073]/5"
                  }`}
                  placeholder="Briefly explain the structural reasoning or rules backing up your decision here..."
                />

                {/* FIXED: Dynamic onBlur error message display */}
                {formErrors.decisionReason && (
                  <p className="text-[10px] text-rose-600 font-semibold mt-1 pl-1 flex items-center gap-1 animate-in fade-in duration-150">
                    <span>{formErrors.decisionReason}</span>
                  </p>
                )}
              </div>
            </div>
          )}
          <div className="bg-white rounded-[24px] border border-slate-200/60 p-4 flex items-center justify-end gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            <button
              type="button"
              className="h-11 px-5 border border-slate-200/80 bg-white text-slate-600 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!decision}
              className={`h-12 px-6 rounded-xl text-xs font-bold transition-all text-white shadow-md flex items-center justify-center gap-1.5 shrink-0 ${
                decision === "approved"
                  ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/10 cursor-pointer"
                  : decision === "rejected"
                    ? "bg-rose-600 hover:bg-rose-700 shadow-rose-600/10 cursor-pointer"
                    : "bg-slate-800 cursor-pointer"
              } disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed`}
            >
              <span>Review Decision Summary</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

/* INTERNAL REUSABLE SUB-COMPONENT */
const CheckItem = ({ label, description, actual, checked, onChange }) => {
  return (
    <div
      onClick={onChange}
      className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/50 hover:border-slate-300 transition-all cursor-pointer group select-none shadow-3xs"
    >
      {/* Content wrapper with details layout block */}
      <div className="space-y-0.5 max-w-[85%] flex flex-col items-start">
        <p className="text-xs font-bold text-slate-800 group-hover:text-primary transition-colors">
          {label}
        </p>
        <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
          {description}
        </p>

        {/* Dynamic Metric Badge Container */}
        {actual && (
          <span className="text-[9px] font-mono font-bold bg-slate-50 border border-slate-100 text-slate-500 px-1.5 py-0.5 mt-1 rounded">
            {actual}
          </span>
        )}
      </div>

      {/* Radio-styled circle success selection checking node */}
      <div
        className={`size-5 rounded-full border flex items-center justify-center transition-all mt-0.5 shrink-0 ${
          checked
            ? "bg-[#074073] border-transparent text-white"
            : "bg-slate-50 border-slate-300 group-hover:border-slate-400"
        }`}
      >
        {checked && (
          <svg
            className="size-3 stroke-[3.5]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

const LoanAndBorrowerSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full animate-pulse select-none">
    {/* CARD 1 SKELETON */}
    <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xs p-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-2xl bg-slate-100 shrink-0" />
          <div className="space-y-1.5">
            <div className="h-3.5 w-36 bg-slate-200 rounded" />
            <div className="h-2.5 w-20 bg-slate-100 rounded" />
          </div>
        </div>
      </div>

      {/* Core Metrics Box */}
      <div className="grid grid-cols-2 gap-4 my-5 bg-slate-50/80 p-4 rounded-2xl border border-slate-100">
        <div className="space-y-2">
          <div className="h-2.5 w-20 bg-slate-200 rounded" />
          <div className="h-6 w-32 bg-slate-200 rounded-lg" />
        </div>
        <div className="space-y-2">
          <div className="h-2.5 w-20 bg-slate-200 rounded" />
          <div className="h-6 w-20 bg-slate-200 rounded-lg" />
        </div>
      </div>

      {/* Grid Items */}
      <div className="grid grid-cols-2 gap-y-6 gap-x-6">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={`sk1-item-${i}`} className="flex items-start gap-2.5">
              <div className="size-7 rounded-lg bg-slate-100 shrink-0 mt-0.5" />
              <div className="space-y-1.5 flex-1">
                <div className="h-2.5 w-16 bg-slate-200 rounded" />
                <div className="h-3.5 w-24 bg-slate-100 rounded" />
              </div>
            </div>
          ))}
      </div>
    </div>

    {/* CARD 2 SKELETON */}
    <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xs p-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-2xl bg-slate-100 shrink-0" />
          <div className="space-y-1.5">
            <div className="h-3.5 w-32 bg-slate-200 rounded" />
            <div className="h-2.5 w-36 bg-slate-100 rounded" />
          </div>
        </div>
      </div>

      {/* Applicant Strip */}
      <div className="my-5 p-4 bg-slate-50/80 rounded-2xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-2">
          <div className="h-2.5 w-20 bg-slate-200 rounded" />
          <div className="h-5 w-36 bg-slate-200 rounded" />
        </div>
        <div className="h-7 w-28 bg-slate-200 rounded-xl" />
      </div>

      {/* Balances Grid */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div
              key={`sk2-bal-${i}`}
              className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100 space-y-2"
            >
              <div className="h-2 w-14 bg-slate-200 rounded" />
              <div className="h-4 w-20 bg-slate-200 rounded" />
            </div>
          ))}
      </div>

      {/* Grid Items */}
      <div className="grid grid-cols-2 gap-y-6 gap-x-6">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={`sk2-item-${i}`} className="flex items-start gap-2.5">
              <div className="size-7 rounded-lg bg-slate-100 shrink-0 mt-0.5" />
              <div className="space-y-1.5 flex-1">
                <div className="h-2.5 w-16 bg-slate-200 rounded" />
                <div className="h-3.5 w-24 bg-slate-100 rounded" />
              </div>
            </div>
          ))}
      </div>
    </div>
  </div>
);

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-2.5 min-w-0">
    <div className="size-7 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-400 shrink-0 mt-0.5">
      {icon}
    </div>
    <div className="min-w-0 flex flex-col">
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate">
        {label}
      </span>
      <span className="text-xs font-semibold text-slate-700 truncate mt-0.5">
        {value}
      </span>
    </div>
  </div>
);

const BalanceBox = ({ icon, label, value }) => (
  <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100 flex flex-col justify-between">
    <div className="flex items-center justify-between mb-1">
      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </span>
    </div>
    <span className="text-xs font-bold text-slate-800 tracking-tight truncate">
      {value}
    </span>
  </div>
);

export default ManagerApproval;
