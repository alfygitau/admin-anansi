import React, { useState } from "react";
import {
  ShieldCheck,
  UserCheck,
  Users,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  Clock,
} from "lucide-react";

const ApproveApplication = ({
  applicationData,
  onDecisionSubmit,
  onItemDetailView,
}) => {
  // Sample fallback data if props aren't provided
  const app = applicationData || {
    id: "APP-2026-8942",
    applicant: "Jane S. Moraa",
    memberId: "MBR-90412",
    requestedAmount: 750000,
    product: "Premium Development Loan",
    submissionDate: "2026-06-15",
  };

  // Checklist State Management
  const [checklist, setChecklist] = useState({
    membershipActive: true,
    minSharesMet: false,
    savingsThreshold: false,
    guarantorsVerified: false,
    collateralAppraised: false,
    docsAuthenticated: false,
    repaymentHistoryClear: true,
  });

  // Decision States
  const [decision, setDecision] = useState(null); // 'approve' | 'reject' | null
  const [recommendedAmount, setRecommendedAmount] = useState(
    app.requestedAmount,
  );
  const [approvalConditions, setApprovalConditions] = useState("");
  const [decisionReason, setDecisionReason] = useState("");

  const toggleCheckItem = (key) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isAllVerified = Object.values(checklist).every(Boolean);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!decision) return alert("Please select whether to approve or decline.");

    onDecisionSubmit?.({
      applicationId: app.id,
      checklist,
      decision,
      recommendedAmount,
      approvalConditions,
      decisionReason,
    });
  };

  const handleViewDetails = (itemKey) => {
    if (onItemDetailView) {
      onItemDetailView(itemKey);
    } else {
      alert(`Opening verification log profile for: ${itemKey}`);
    }
  };

  return (
    <div className="w-full space-y-8 antialiased text-slate-800">
      {/* 1. APPLICATION OVERVIEW HEADER (Frameless) */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 border-b border-slate-200/60 pb-6 select-none">
        <div className="space-y-1">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Approve Loan Application
          </h2>
          <p>{app.applicant}</p>
          <p className="text-xs text-slate-500">
            {app.product} • Submitted on{" "}
            {new Date(app.submissionDate).toLocaleDateString("en-KE", {
              dateStyle: "medium",
            })}
          </p>
        </div>

        <div className="flex items-center gap-6 bg-white border border-slate-200/60 rounded-2xl px-5 py-3 shadow-3xs">
          <div>
            <p className="text-[9px] uppercase font-bold tracking-widest text-slate-400">
              Requested Amount
            </p>
            <p className="text-xl font-mono font-black text-slate-900 mt-0.5">
              <span className="text-xs font-bold text-slate-400 mr-0.5">
                KES
              </span>
              {app.requestedAmount.toLocaleString()}
            </p>
          </div>
          <div className="h-8 w-px bg-slate-100" />
          <div>
            <p className="text-[9px] uppercase font-bold tracking-widest text-slate-400">
              Member Reference
            </p>
            <p className="text-sm font-bold text-slate-700 mt-1 font-mono">
              {app.memberId}
            </p>
          </div>
        </div>
      </div>

      {/* SECTION LABEL */}
      <div className="space-y-1">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="text-[#074073]" size={18} /> Requirements
          Checklist
        </h3>
        <p className="text-xs text-slate-500">
          Verify each point below to ensure the application meets basic
          requirements.
        </p>
      </div>

      {/* 2. CHECKLIST TRACKS (Two-column grid layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-stretch">
        {/* BLOCK A: CORE ELIGIBILITY TIERS */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-5 space-y-3 shadow-3xs">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 pb-2">
            <UserCheck size={12} /> Membership & Savings
          </h4>
          <div className="space-y-2">
            <CheckItem
              label="Active Membership Status"
              description="Confirm the member account is active and not frozen or suspended."
              checked={checklist.membershipActive}
              onChange={() => toggleCheckItem("membershipActive")}
              onViewDetails={() => handleViewDetails("membershipActive")}
            />
            <CheckItem
              label="Minimum Shares Status"
              description="Verify the user holds the minimum required capital shares."
              checked={checklist.minSharesMet}
              onChange={() => toggleCheckItem("minSharesMet")}
              onViewDetails={() => handleViewDetails("minSharesMet")}
            />
            <CheckItem
              label="Savings Multiplier Rule"
              description="Confirm total savings balance satisfies the request multiplier rule."
              checked={checklist.savingsThreshold}
              onChange={() => toggleCheckItem("savingsThreshold")}
              onViewDetails={() => handleViewDetails("savingsThreshold")}
            />
          </div>
        </div>

        {/* BLOCK B: SECURITY MATRIX */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-5 space-y-3 shadow-3xs">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 pb-2">
            <Users size={12} /> Guarantors & Security
          </h4>
          <div className="space-y-2">
            <CheckItem
              label="Guarantors Verification"
              description="Check that all attached guarantors are enough, active, approved, and have signed off."
              checked={checklist.guarantorsVerified}
              onChange={() => toggleCheckItem("guarantorsVerified")}
              onViewDetails={() => handleViewDetails("selectedGuarantor")}
            />
            <CheckItem
              label="Collateral Valuation Check"
              description="Ensure matching vehicles, titles, or fixed assets are validly evaluated."
              checked={checklist.collateralAppraised}
              onChange={() => toggleCheckItem("collateralAppraised")}
              onViewDetails={() => handleViewDetails("collateralAppraised")}
            />
          </div>
        </div>

        {/* BLOCK C: CREDENTIALS & PERFORMANCE RECORDS (Spans full width, internally paired) */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200/60 p-5 space-y-3 shadow-3xs">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 pb-2">
            <FileCheck size={12} /> Verification & History
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <CheckItem
              label="KYC & Legal Documents Framework"
              description="Verify provided copies of ID card, tax pins, payslips, and bank statements."
              checked={checklist.docsAuthenticated}
              onChange={() => toggleCheckItem("docsAuthenticated")}
              onViewDetails={() => handleViewDetails("docsAuthenticated")}
            />
            <CheckItem
              label="Repayment History Check"
              description="Confirm clean internal credit standing and a valid CRB clearance report."
              checked={checklist.repaymentHistoryClear}
              onChange={() => toggleCheckItem("repaymentHistoryClear")}
              onViewDetails={() => handleViewDetails("repaymentHistoryClear")}
            />
          </div>
        </div>
      </div>

      {/* 3. BOTTOM PANEL: DECISION FORM OPTIONS */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-slate-200/60 p-6 space-y-6 shadow-3xs w-full"
      >
        <div>
          <h3 className="text-sm font-bold text-slate-900">
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
                value="approve"
                checked={decision === "approve"}
                onChange={() => setDecision("approve")}
                className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-slate-300"
              />
              <span
                className={`text-sm font-bold ${decision === "approve" ? "text-emerald-700" : "text-slate-600 group-hover:text-slate-800"}`}
              >
                Approve Application
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="decision"
                value="reject"
                checked={decision === "reject"}
                onChange={() => setDecision("reject")}
                className="w-4 h-4 text-rose-600 focus:ring-rose-500 border-slate-300"
              />
              <span
                className={`text-sm font-bold ${decision === "reject" ? "text-rose-700" : "text-slate-600 group-hover:text-slate-800"}`}
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
                <div className="relative rounded-xl shadow-2xs">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold text-xs font-mono">
                    KES
                  </div>
                  <input
                    type="number"
                    value={recommendedAmount}
                    onChange={(e) =>
                      setRecommendedAmount(Number(e.target.value))
                    }
                    className="w-full h-[46px] pl-12 pr-4 bg-slate-50/60 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-800 focus:outline-none focus:border-[#074073] focus:bg-white transition-all"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* DISBURSEMENT CONDITIONS */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600">
                  Conditions after approval (if any)
                </label>
                <div className="relative">
                  <FileText
                    className="absolute top-3.5 left-3.5 text-slate-300"
                    size={14}
                  />
                  <input
                    type="text"
                    value={approvalConditions}
                    onChange={(e) => setApprovalConditions(e.target.value)}
                    className="w-full h-[46px] pl-9 pr-4 bg-slate-50/60 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#074073] focus:bg-white transition-all"
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
                onChange={(e) => setDecisionReason(e.target.value)}
                className="w-full p-3 bg-slate-50/60 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#074073] focus:bg-white transition-all resize-none"
                placeholder="Briefly explain the structural reasoning or rules backing up your decision here..."
                required
              />
            </div>
          </div>
        )}

        {/* BOTTOM RUNTIME BANNER & DISPATCH ACTION SUBMIT BUTTON */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
          <div className="w-full sm:max-w-xl">
            {!isAllVerified && decision === "approve" && (
              <div className="p-3 bg-amber-50 border border-amber-200/60 rounded-xl flex items-start gap-2 text-[10px] text-amber-700 font-semibold leading-relaxed">
                <AlertTriangle
                  size={14}
                  className="shrink-0 text-amber-600 mt-0.5"
                />
                <span>
                  Attention: You are approving this application even though some
                  required checklist points are still unmarked.
                </span>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={!decision}
            className={`w-full sm:w-auto h-12 px-6 rounded-xl text-xs font-bold transition-all text-white shadow-md flex items-center justify-center gap-1.5 cursor-pointer disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed shrink-0 ${
              decision === "approve"
                ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/10"
                : decision === "reject"
                  ? "bg-rose-600 hover:bg-rose-700 shadow-rose-600/10"
                  : "bg-slate-800"
            }`}
          >
            Submit Final Decision
          </button>
        </div>
      </form>
    </div>
  );
};

/* INTERNAL REUSABLE SUB-COMPONENT FOR MODERN LIST INTERACTION */
const CheckItem = ({
  label,
  description,
  checked,
  onChange,
  onViewDetails,
}) => {
  return (
    <div
      onClick={onChange}
      className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/50 hover:border-slate-300 transition-all cursor-pointer group select-none shadow-3xs"
    >
      <div className="space-y-0.5 max-w-[85%] flex flex-col items-start">
        <p className="text-xs font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
          {label}
        </p>
        <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
          {description}
        </p>

        {/* SUB-DESCRIPTION INTERACTION LINK */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // Stops parent container click from checking the item state
            onViewDetails?.();
          }}
          className="text-[10px] font-bold text-blue-600 hover:text-blue-700 hover:underline mt-1.5 transition-colors cursor-pointer"
        >
          View details
        </button>
      </div>

      <div className="pt-0.5">
        <div
          className={`size-5 rounded-md flex items-center justify-center border transition-all ${
            checked
              ? "bg-[#074073] border-[#074073] text-white"
              : "border-slate-300 bg-slate-50 group-hover:border-slate-400"
          }`}
        >
          {checked && <CheckCircle2 size={12} strokeWidth={3} />}
        </div>
      </div>
    </div>
  );
};

export default ApproveApplication;
