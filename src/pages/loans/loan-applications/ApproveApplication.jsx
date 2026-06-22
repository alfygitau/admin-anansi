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
  ArrowUpRight,
} from "lucide-react";
import { useToast } from "../../../contexts/ToastProvider";
import { useQuery } from "react-query";
import { getApplication } from "../../../sdk/loan-applications/loan-applications";
import { useParams } from "react-router-dom";

// FIXED: All rules now default to passed: false so committee members must perform validation manually
const INITIAL_RULES = [
  {
    rule: "member_active",
    label: "Active Membership Status",
    description: "Member account is active and not frozen or suspended.",
    passed: false,
  },
  {
    rule: "kyc_level",
    label: "KYC Verification Levels",
    description: "KYC level ≥ Basic.",
    actual: "Required: Level 1, Actual: Level 2",
    passed: false,
  },
  {
    rule: "membership_duration",
    label: "Membership Longevity Rule",
    description: "Member for at least 6 month(s).",
    actual: "Required: 6 months | Actual: 15 months",
    passed: false,
  },
  {
    rule: "minimum_shares",
    label: "Minimum Shares Status",
    description: "Shares ≥ KES 10,000.00.",
    actual: "Required: KES 10000.00 | Actual: KES 22001",
    passed: false,
  },
  {
    rule: "minimum_savings",
    label: "Savings Threshold Rule",
    description: "Savings ≥ KES 20,000.00.",
    actual: "Required: KES 20000.00 | Actual: KES 250201",
    passed: false,
  },
  {
    rule: "no_defaulted_loans",
    label: "Clean Repayment History",
    description: "No active defaulted loans logged against profile.",
    passed: false,
  },
  {
    rule: "not_guarantor_on_defaulted",
    label: "Guarantor Exposure Check",
    description: "Not a guarantor on any defaulted loan profile.",
    passed: false,
  },
  {
    rule: "max_active_loans_of_type",
    label: "Product Concurrent Caps",
    description: "Open Development Loan applications/loans < 1.",
    reason:
      "Member already has 1 active Development Loan loan(s) and 0 in-flight application(s). Maximum is 1.",
    actual: "Active loans: 1 | In-flight applications: 0 | Max: 1",
    passed: false,
  },
  {
    rule: "max_total_active_loans",
    label: "Aggregate Active Loan Limits",
    description: "Total active loans < 2.",
    reason: "Member has 2 total active loan(s). Maximum is 2.",
    actual: "Active loans: 2 | Max: 2",
    passed: false,
  },
  {
    rule: "blocked_concurrent_types",
    label: "Incompatible Loan Conflicts",
    description: "No blocked concurrent loan types (Development_loan).",
    reason:
      "Member has active Development_loan loan(s) which cannot coexist with Development Loan.",
    passed: false,
  },
];

const ApproveApplication = ({
  applicationData,
  onDecisionSubmit,
  onItemDetailView,
}) => {
  const { showToast } = useToast();
  const app = applicationData || {
    id: "APP-2026-8942",
    applicant: "Jane S. Moraa",
    memberId: "MBR-90412",
    requestedAmount: 750000,
    product: "Premium Development Loan",
    submissionDate: "2026-06-15",
  };
  const [application, setApplication] = useState({});
  // Checklist state initialized from backend payload format
  const [checklist, setChecklist] = useState(INITIAL_RULES);
  const { id } = useParams();
  // Decision States
  const [decision, setDecision] = useState(null); // 'approve' | 'reject' | null
  const [recommendedAmount, setRecommendedAmount] = useState(
    app.requestedAmount,
  );
  const [approvalConditions, setApprovalConditions] = useState("");
  const [decisionReason, setDecisionReason] = useState("");

  const toggleCheckItem = (ruleKey) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.rule === ruleKey ? { ...item, passed: !item.passed } : item,
      ),
    );
  };

  const isAllVerified = checklist.every((item) => item.passed);

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

  const membershipRules = checklist.filter((r) =>
    ["member_active", "kyc_level", "membership_duration"].includes(r.rule),
  );
  const savingsRules = checklist.filter((r) =>
    ["minimum_shares", "minimum_savings"].includes(r.rule),
  );
  const safetySecurityRules = checklist.filter((r) =>
    ["no_defaulted_loans", "not_guarantor_on_defaulted"].includes(r.rule),
  );
  const operationalLimitRules = checklist.filter((r) =>
    [
      "max_active_loans_of_type",
      "max_total_active_loans",
      "blocked_concurrent_types",
    ].includes(r.rule),
  );

  const { isFetching } = useQuery({
    queryKey: ["get loan application", id],
    queryFn: async () => {
      const response = await getApplication(id);
      return response.data?.data;
    },
    onSuccess: (data) => {
      setApplication(data);
    },
    onError: (error) => {
      showToast({
        title: "Transactions processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  return (
    <div className="w-full space-y-5 antialiased text-slate-800">
      {/* 1. APPLICATION OVERVIEW HEADER (Frameless) */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 border-b border-slate-200/60 pb-3 select-none">
        <div className="space-y-1">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Approve Loan Application
          </h2>
          <p className="text-sm font-bold text-slate-700">{application.applicant_name}</p>
          <p className="text-xs text-slate-500">
            {application.loan_type} • Submitted on{" "}
            {new Date(application.application_date).toLocaleDateString("en-KE", {
              dateStyle: "medium",
            })}
          </p>
        </div>
      </div>

      {/* SECTION LABEL */}
      <div className="space-y-1">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          Checklist
        </h3>
        <p className="text-xs text-slate-500">
          Verify each point below to ensure the application meets basic
          requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-stretch">
        {/* BLOCK A1: CORE MEMBERSHIP ELIGIBILITY */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-5 space-y-3 shadow-3xs">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 pb-2">
            <UserCheck size={12} /> Membership Parameters
          </h4>
          <div className="space-y-2">
            {membershipRules.map((item) => (
              <CheckItem
                key={item.rule}
                label={item.label}
                description={item.description}
                actual={item.actual}
                checked={item.passed}
                onChange={() => toggleCheckItem(item.rule)}
                onViewDetails={() => handleViewDetails(item.rule)}
              />
            ))}
          </div>
        </div>

        {/* BLOCK A2: SAVINGS & CAPITAL BALANCES */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-5 space-y-3 shadow-3xs">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 pb-2">
            <UserCheck size={12} /> Savings & Capital Shares
          </h4>
          <div className="space-y-2">
            {savingsRules.map((item) => (
              <CheckItem
                key={item.rule}
                label={item.label}
                description={item.description}
                actual={item.actual}
                checked={item.passed}
                onChange={() => toggleCheckItem(item.rule)}
                onViewDetails={() => handleViewDetails(item.rule)}
              />
            ))}
          </div>
        </div>

        {/* BLOCK B: OPERATIONAL VERIFICATION MARGINS */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-5 space-y-3 shadow-3xs">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 pb-2">
            <FileCheck size={12} /> Verification & History Limits
          </h4>
          <div className="space-y-2">
            {operationalLimitRules.map((item) => (
              <CheckItem
                key={item.rule}
                label={item.label}
                description={item.reason || item.description}
                actual={item.actual}
                checked={item.passed}
                onChange={() => toggleCheckItem(item.rule)}
                onViewDetails={() => handleViewDetails(item.rule)}
              />
            ))}
          </div>
        </div>

        {/* BLOCK C: GUARANTORS MATRIX */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-5 space-y-3 shadow-3xs">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 pb-2">
            <Users size={12} /> Guarantors & Security
          </h4>
          <div className="space-y-2">
            {safetySecurityRules.map((item) => (
              <CheckItem
                key={item.rule}
                label={item.label}
                description={item.description}
                actual={item.actual}
                checked={item.passed}
                onChange={() => toggleCheckItem(item.rule)}
                onViewDetails={() => handleViewDetails(item.rule)}
              />
            ))}
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
        </div>
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
            className={`h-12 px-6 rounded-xl text-xs font-bold transition-all text-white shadow-md flex items-center justify-center gap-1.5 cursor-pointer disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed shrink-0 ${
              decision === "approve"
                ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/10"
                : decision === "reject"
                  ? "bg-rose-600 hover:bg-rose-700 shadow-rose-600/10"
                  : "bg-slate-800"
            }`}
          >
            <span>Submit Final Decision</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </form>
    </div>
  );
};

/* INTERNAL REUSABLE SUB-COMPONENT */
const CheckItem = ({
  label,
  description,
  actual,
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

        {actual && (
          <span className="text-[9px] font-mono font-bold bg-slate-50 border border-slate-100 text-slate-500 px-1.5 py-0.5 mt-1 rounded">
            {actual}
          </span>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails?.();
          }}
          className="text-[10px] font-bold text-blue-600 hover:text-blue-700 hover:underline mt-1.5 transition-colors cursor-pointer"
        >
          View details
        </button>
      </div>

      <div
        className={`size-5 rounded-full border flex items-center justify-center transition-all mt-0.5 ${
          checked
            ? "bg-[#074073] border-transparent"
            : "bg-slate-50 border-slate-300 group-hover:border-slate-400"
        }`}
      >
        {checked && <div className="size-2 rounded-full bg-white" />}
      </div>
    </div>
  );
};

export default ApproveApplication;
