import React from "react";
import {
  Wallet,
  AlertTriangle,
  PieChart,
  Scale,
  Users,
  Clock,
  CheckCircle2,
  FileCheck,
  ArrowLeftRight,
  Building2,
  TrendingUp,
  UserPlus,
  UserX,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  Smartphone,
} from "lucide-react";

export default function Homepage() {
  return (
    <div className="w-full space-y-8 antialiased text-slate-800">
      <div className="space-y-4">
        <div>
          <h2 className="text-base font-black tracking-tight text-slate-900">
            Financial Health Overview
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Review total funds held, active money out in loans, and available
            cash reserves.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
          {/* BASELINE 1: TOTAL FUNDS HELD (SAVINGS & RESERVES SPLIT) */}
          <MetricCardCustom label="Total Mobilized Funds" icon={<PieChart />}>
            <div className="flex items-center gap-4 mt-1">
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                  Member Savings
                </span>
                <p className="text-base font-extrabold text-slate-900">
                  KES 84.2M
                </p>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                  Permanent Shares
                </span>
                <p className="text-base font-extrabold text-[#074073]">
                  KES 22.1M
                </p>
              </div>
            </div>
          </MetricCardCustom>

          {/* BASELINE 2: TOTAL ACTIVE LOAN BOOK VALUE */}
          <MetricCard
            label="Total Outstanding Loans"
            icon={<Scale />}
            trend="2.8x leverage ratio"
            isPositive={true}
          >
            <p className="text-2xl font-black text-slate-900 tracking-tight">
              KES 235.7M
            </p>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">
              Total principal amount currently out working with members
            </p>
          </MetricCard>

          {/* BASELINE 3: ACTUAL UNCOMMITTED CASH POOL */}
          <MetricCard
            label="Available Cash for Payouts"
            icon={<Wallet />}
            trend="+8.2% vs yesterday"
            isPositive={true}
          >
            <p className="text-2xl font-black text-slate-900 tracking-tight">
              KES 14.65M
            </p>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">
              Liquid cash sitting in bank accounts and wallets ready to disburse
            </p>
          </MetricCard>

          {/* BASELINE 4: TOTAL RECOVERY RISK POOL */}
          <MetricCard
            label="Total Late Payments Exposure"
            icon={<AlertTriangle />}
            trend="3.24% default rate"
            isPositive={true}
          >
            <p className="text-2xl font-black text-slate-900 tracking-tight">
              KES 7.63M
            </p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">
              Safe (Well within our 5.0% maximum risk limit)
            </p>
          </MetricCard>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-base font-black tracking-tight text-slate-900">
            Membership & Growth
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Monitor your total member community, active account metrics, and
            overall savings habits.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full">
          {/* BASELINE NUMBERS: TOTAL, ACTIVE & INACTIVE COMMUNITY SPLIT */}
          <MetricCardCustom
            label="Membership Population Breakdown"
            icon={<Users />}
          >
            <div className="flex items-center gap-5 mt-1">
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                  Total Members
                </span>
                <p className="text-xl font-black text-slate-900 tracking-tight">
                  1,240
                </p>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                  Active Accounts
                </span>
                <p className="text-sm font-extrabold text-emerald-600 mt-0.5">
                  1,064
                </p>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                  Inactive
                </span>
                <p className="text-sm font-extrabold text-slate-400 mt-0.5">
                  176
                </p>
              </div>
            </div>
          </MetricCardCustom>

          {/* GROWTH VELOCITY: NET ACCOUNT ACTIVITY */}
          <MetricCard
            label="Net New Members"
            icon={<UserPlus />}
            trend="+48 this month"
            isPositive={true}
          >
            <p className="text-2xl font-black text-slate-900 tracking-tight">
              +142 Members
            </p>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">
              New sign-ups minus accounts closed or withdrawn this month
            </p>
          </MetricCard>

          {/* BEHAVIOR BENCHMARK: SAVINGS MOBILIZATION */}
          <MetricCard
            label="Average Savings per Member"
            icon={<PiggyBank />}
            trend="+4.5% year-to-date"
            isPositive={true}
          >
            <p className="text-2xl font-black text-slate-900 tracking-tight">
              KES 48,500
            </p>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">
              The average total balance saved by an individual cooperative
              member
            </p>
          </MetricCard>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-base font-black tracking-tight text-slate-900">
            Loan Application Pipeline
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Daily loan processing steps, approvals on hold, and tasks needing
            review.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
          <MetricCard
            label="Awaiting Committee Review"
            icon={<Users />}
            alertStyle={true}
          >
            <p className="text-2xl font-black text-rose-600 tracking-tight">
              6 Loans
            </p>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">
              Large loan applications waiting for a formal board vote
            </p>
          </MetricCard>

          <MetricCard label="Waiting for Guarantor Approvals" icon={<Clock />}>
            <p className="text-2xl font-black text-slate-900 tracking-tight">
              19 Applications
            </p>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">
              On hold until co-signers approve the request via app or SMS
            </p>
          </MetricCard>

          <MetricCard
            label="Approved Loans Ready for Payout"
            icon={<CheckCircle2 />}
            successStyle={true}
          >
            <p className="text-2xl font-black text-emerald-600 tracking-tight">
              11 Approved
            </p>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">
              Cleared loans waiting for a final manager click to release funds
            </p>
          </MetricCard>

          <MetricCard
            label="Receipts Needing Verification"
            icon={<FileCheck />}
          >
            <p className="text-2xl font-black text-slate-900 tracking-tight">
              34 Receipts
            </p>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">
              Member-submitted bank slips and mobile money transactions to
              confirm
            </p>
          </MetricCard>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-base font-black tracking-tight text-slate-900">
            Money Inflows & Overdue Loans
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Track the actual cash collected, outstanding company payroll
            payments, and late loan installments.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full">
          {/* BASELINE 1: TOTAL MONTHLY CASH FLOW TRACKER */}
          <MetricCardCustom
            label="This Month's Cash Flow Split"
            icon={<ArrowLeftRight />}
          >
            <div className="flex items-center gap-6 mt-1">
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                  Repayments Collected
                </span>
                <p className="text-lg font-black text-emerald-600">
                  KES 11.20M
                </p>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                  New Loans Sent Out
                </span>
                <p className="text-lg font-black text-slate-700">KES 9.45M</p>
              </div>
            </div>
          </MetricCardCustom>

          {/* BASELINE 2: EMPLOYER CHECK-OFF SUBMISSION COUNTS */}
          {/* ALTERNATIVE: PAYMENT CHANNEL INFLOW BREAKDOWN */}
          <MetricCardCustom
            label="How Payments Were Received"
            icon={<Smartphone />}
          >
            <div className="flex items-center gap-6 mt-1">
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                  Mobile Money (M-Pesa)
                </span>
                <p className="text-lg font-black text-slate-900">KES 7.80M</p>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                  Direct Bank Transfers
                </span>
                <p className="text-lg font-black text-slate-700">KES 3.40M</p>
              </div>
            </div>
          </MetricCardCustom>

          {/* BASELINE 3: ABSOLUTE UNPAID ARREARS VALUE */}
          <MetricCard
            label="Total Late Payments Balance"
            icon={<TrendingUp />}
            alertStyle={true}
          >
            <p className="text-2xl font-black text-rose-600 tracking-tight">
              KES 2.45M
            </p>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">
              The actual cash amount currently overdue across all late member
              accounts
            </p>
          </MetricCard>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SUPPORTIVE WORKSPACE LAYOUT COMPONENTS
   ========================================================================== */

// Card Template A: Standard Metrics with Directional Trends
const MetricCard = ({
  label,
  icon,
  trend,
  isPositive,
  alertStyle,
  successStyle,
  children,
}) => (
  <div
    className={`bg-white border border-slate-200/60 shadow-3xs rounded-2xl p-5 flex items-center gap-3.5 w-full justify-start h-full relative overflow-hidden transition-all hover:shadow-2xs ${
      alertStyle
        ? "ring-2 ring-rose-500/10"
        : successStyle
          ? "ring-2 ring-emerald-500/10"
          : ""
    }`}
  >
    <div
      className={`size-9 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 shadow-3xs ${
        alertStyle
          ? "bg-rose-50 border-rose-100 text-rose-500"
          : successStyle
            ? "bg-emerald-50 border-emerald-100 text-emerald-500"
            : "bg-slate-50 border-slate-200/40 text-slate-400"
      }`}
    >
      {React.cloneElement(icon, { size: 15 })}
    </div>
    <div className="flex-1 min-w-0 space-y-0.5">
      <div className="flex items-center justify-between gap-2 w-full">
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block truncate">
          {label}
        </span>
      </div>
      {children}
    </div>
  </div>
);

// Card Template B: Custom Internal Sub-Grid Content
const MetricCardCustom = ({ label, icon, children }) => (
  <div className="bg-white border border-slate-200/60 shadow-3xs rounded-2xl p-5 flex items-center gap-3.5 w-full justify-center h-full transition-all hover:shadow-2xs">
    <div className="size-9 rounded-xl bg-slate-50 border border-slate-200/40 flex items-center justify-center text-slate-400 shrink-0 mt-0.5 shadow-3xs">
      {React.cloneElement(icon, { size: 15 })}
    </div>
    <div className="flex-1 min-w-0">
      <span className="text-[9px] mb-2 font-black uppercase tracking-widest text-slate-400 block truncate">
        {label}
      </span>
      {children}
    </div>
  </div>
);
