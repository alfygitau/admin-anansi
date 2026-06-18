import React, { useState } from "react";
import {
  UserCheck,
  Award,
  Wallet,
  Scale,
  Users,
  Building,
  FileCheck,
  History,
  CheckCircle2,
  XCircle,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  ArrowUpRight,
  AlertTriangle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoanEligibility = ({ memberData, onProceedToApplication }) => {
  const navigate = useNavigate();
  // Sample fallback member data context
  const member = memberData || {
    id: "MBR-90412",
    name: "Jane S. Moraa",
    joinedDate: "2022-03-11",
    sharesBalance: 55000,
    depositsBalance: 250000,
    basicSalary: 90000,
    currentDeductions: 35000,
  };

  // State monitoring for the eligibility evaluation tracks
  const [checklist, setChecklist] = useState({
    membershipAge: "pass", // 'pass' | 'fail' | 'review'
    minimumShares: "pass",
    depositsMultiplier: "pass",
    twoThirdsRule: "review", // Flagged for admin review
    guarantorCapacity: "review", // Not checked yet
    collateralValue: "review",
    kycCompleteness: "pass",
    creditHistory: "pass",
  });

  const updateStatus = (key, status) => {
    setChecklist((prev) => ({ ...prev, [key]: status }));
  };

  // Determine global processing eligibility state
  const passCount = Object.values(checklist).filter((v) => v === "pass").length;
  const totalItems = Object.keys(checklist).length;
  const hasFailures = Object.values(checklist).some((v) => v === "fail");

  return (
    <div className="w-full space-y-5 font-sans antialiased text-slate-800">
      {/* 1. DYNAMIC HEADER TRACKING BANNER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-slate-200/60 pb-5 select-none">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Eligibility
          </h2>
          {/* Styled Member Name Line */}
          <p className="text-sm font-bold text-slate-700 mt-0.5 capitalize">
            {member.name}
          </p>
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
            <span>Member ID:</span>
            <span className="font-mono font-bold text-slate-600 bg-slate-100/80 px-1.5 py-0.5 rounded border border-slate-200/50">
              {member.id}
            </span>
          </p>
        </div>
      </div>

      {/* 2. ELIGIBILITY CONTAINER GRID (2 Items Per Full Width Row) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-stretch">
        {/* CARD 1: MEMBERSHIP STANDING */}
        <EligibilityContainer
          icon={UserCheck}
          title="Membership Standing & Age"
          description="Requires an active membership account history of at least 6 consecutive months."
          status={checklist.membershipAge}
          onStatusChange={(status) => updateStatus("membershipAge", status)}
          metaInfo={`Joined: ${new Date(member.joinedDate).toLocaleDateString("en-KE", { dateStyle: "medium" })}`}
        />

        {/* CARD 2: SHARE CAPITAL REQUIREMENT */}
        <EligibilityContainer
          icon={Award}
          title="Minimum Share Capital Tier"
          description="Validates that core untransferable shares meet the statutory base requirement of KES 20,000."
          status={checklist.minimumShares}
          onStatusChange={(status) => updateStatus("minimumShares", status)}
          metaInfo={`Current Shares: KES ${member.sharesBalance.toLocaleString()}`}
        />

        {/* CARD 3: SAVINGS DEPOSITS MULTIPLIER */}
        <EligibilityContainer
          icon={Wallet}
          title="Deposits Multiplier Capacity"
          description="Verifies if the requested loan file stays safely within the standard 3x or 4x total savings deposit ceiling."
          status={checklist.depositsMultiplier}
          onStatusChange={(status) =>
            updateStatus("depositsMultiplier", status)
          }
          metaInfo={`Total Deposits: KES ${member.depositsBalance.toLocaleString()}`}
        />

        {/* CARD 4: THE TWO-THIRDS SALARY RULE */}
        <EligibilityContainer
          icon={Scale}
          title="Two-Thirds Statutory Salary Rule"
          description="Ensures remaining net take-home salary does not fall under 1/3 of basic pay following recovery cycles."
          status={checklist.twoThirdsRule}
          onStatusChange={(status) => updateStatus("twoThirdsRule", status)}
          metaInfo={`Basic: KES ${member.basicSalary.toLocaleString()} | Deductions: KES ${member.currentDeductions.toLocaleString()}`}
        />

        {/* CARD 5: GUARANTOR RECOVERY POOL */}
        <EligibilityContainer
          icon={Users}
          title="Guarantor Allocations & Security"
          description="Checks that attached guarantors have active balances and haven't over-pledged their limits elsewhere."
          status={checklist.guarantorCapacity}
          onStatusChange={(status) => updateStatus("guarantorCapacity", status)}
          metaInfo="Awaiting Guarantor Sign-offs"
        />

        {/* CARD 6: COLLATERAL CHARGE APPRAISALS */}
        <EligibilityContainer
          icon={Building}
          title="Collateral Registries Appraisal"
          description="Confirms logbooks, titles, or alternative assets have been officially valued and registered without active lines."
          status={checklist.collateralValue}
          onStatusChange={(status) => updateStatus("collateralValue", status)}
          metaInfo="Valuation Files Pending Upload"
        />

        {/* CARD 7: KYC DOCUMENT COMPLIANCE */}
        <EligibilityContainer
          icon={FileCheck}
          title="KYC & Legal Documentation Framework"
          description="Confirms file validation parameters containing IDs, tax PIN structures, and recent verified payslips."
          status={checklist.kycCompleteness}
          onStatusChange={(status) => updateStatus("kycCompleteness", status)}
          metaInfo="All Required Attachments Present"
        />

        {/* CARD 8: CREDIT HISTORY & METRICS */}
        <EligibilityContainer
          icon={History}
          title="Credit Bureau & Loan Performance History"
          description="Queries internal repayment patterns alongside real-time CRB clearance states to verify clean performance history."
          status={checklist.creditHistory}
          onStatusChange={(status) => updateStatus("creditHistory", status)}
          metaInfo="CRB Status: Clear / Green List"
        />
      </div>

      <div className="bg-white rounded-[24px] border border-slate-200/60 p-4 flex items-center justify-end gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <button
          type="button"
          className="h-11 px-5 border border-slate-200/80 bg-white text-slate-600 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={() => navigate("/admin/apply-loan/loan-application-details")}
          type="button"
          className="h-11 px-6 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-primary/10 hover:bg-primary/90 transition-all active:scale-97 cursor-pointer flex items-center gap-2"
        >
          <span>Contine With Application</span>
          <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  );
};

/* INTERNAL REUSABLE ELIGIBILITY TRACK CONTAINER */
const EligibilityContainer = ({
  icon: Icon,
  title,
  description,
  status, // "pass" | "fail" | "review"
  metaInfo,
}) => {
  const isPassed = status === "pass";
  const isFailed = status === "fail";
  const isReview = status === "review";

  return (
    <div
      className={`bg-white rounded-2xl border p-5 flex flex-col justify-between transition-all shadow-3xs group ${
        isPassed
          ? "border-emerald-100 bg-emerald-50/10"
          : isFailed
            ? "border-rose-100 bg-rose-50/10"
            : "border-slate-200/60"
      }`}
    >
      <div className="space-y-2">
        {/* Core Indicator Title Node */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div
              className={`p-2 border rounded-xl transition-colors ${
                isPassed
                  ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                  : isFailed
                    ? "bg-rose-50 border-rose-100 text-rose-600"
                    : isReview
                      ? "bg-amber-50 border-amber-100 text-amber-600"
                      : "bg-slate-50 border-slate-200/40 text-slate-500"
              }`}
            >
              <Icon size={16} />
            </div>
            <h4 className="text-sm font-bold text-slate-900 tracking-tight">
              {title}
            </h4>
          </div>

          {/* DYNAMIC VISUAL STATE CHECKMARK */}
          <div className="shrink-0 pt-0.5">
            {isPassed && (
              <CheckCircle2
                size={20}
                className="text-emerald-600"
                fill="#f0fdf4"
                strokeWidth={2.5}
              />
            )}
            {isFailed && (
              <XCircle
                size={20}
                className="text-rose-600"
                fill="#fef2f2"
                strokeWidth={2.5}
              />
            )}
            {isReview && (
              <AlertTriangle
                size={20}
                className="text-amber-500"
                fill="#fffbeb"
                strokeWidth={2.5}
              />
            )}
            {!isPassed && !isFailed && !isReview && (
              <HelpCircle size={20} className="text-slate-300" />
            )}
          </div>
        </div>

        <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
          {description}
        </p>
      </div>

      {/* Vetting Context Metadata Output Footer */}
      <div className="border-t border-slate-100 pt-3.5 mt-2 flex items-center justify-between gap-3 text-[11px]">
        {/* Left Side: Context Meta Information */}
        <span className="font-mono text-slate-500 font-semibold bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
          {metaInfo}
        </span>

        {/* Right Side: Simple Read-Only Status Label */}
        <span
          className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${
            isPassed
              ? "bg-emerald-50 text-emerald-700 border-emerald-200/40"
              : isFailed
                ? "bg-rose-50 text-rose-700 border-rose-200/40"
                : isReview
                  ? "bg-amber-50 text-amber-700 border-amber-200/40"
                  : "bg-slate-50 text-slate-500 border-slate-100"
          }`}
        >
          {status === "pass" ? "Passed" : status === "fail" ? "Failed" : status}
        </span>
      </div>
    </div>
  );
};

export default LoanEligibility;
