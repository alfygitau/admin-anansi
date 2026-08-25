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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function Homepage() {
  const memberGrowthTrend = [
    { month: "Mar", total: 1020, active: 890 },
    { month: "Apr", total: 1060, active: 920 },
    { month: "May", total: 1100, active: 950 },
    { month: "Jun", total: 1140, active: 980 },
    { month: "Jul", total: 1192, active: 1020 },
    { month: "Aug", total: 1240, active: 1064 },
  ];

  const savingsMobilizationTrend = [
    { month: "Mar", avgSavings: 41200 },
    { month: "Apr", avgSavings: 42800 },
    { month: "May", avgSavings: 44000 },
    { month: "Jun", avgSavings: 45500 },
    { month: "Jul", avgSavings: 46900 },
    { month: "Aug", avgSavings: 48500 },
  ];

  const monthlyPipelineTrend = [
    { month: "Jan", submitted: 140, approved: 105 },
    { month: "Feb", submitted: 180, approved: 125 },
    { month: "Mar", submitted: 220, approved: 150 },
    { month: "Apr", submitted: 190, approved: 160 },
    { month: "May", submitted: 250, approved: 180 },
    { month: "Jun", submitted: 210, approved: 175 },
  ];

  const monthlyPendingQueueTrend = [
    { month: "Jan", pending: 45 },
    { month: "Feb", pending: 48 },
    { month: "Mar", pending: 52 },
    { month: "Apr", pending: 41 },
    { month: "May", pending: 38 },
    { month: "Jun", pending: 34 },
  ];

  const financialPortfolioTrend = [
    { month: "Jan", capital: 88.5, loans: 195.0 },
    { month: "Feb", capital: 92.0, loans: 202.5 },
    { month: "Mar", capital: 95.8, loans: 210.0 },
    { month: "Apr", capital: 99.2, loans: 218.4 },
    { month: "May", capital: 102.5, loans: 226.0 },
    { month: "Jun", capital: 106.3, loans: 235.7 },
  ];

  const liquidityAndRiskTrend = [
    { month: "Jan", cash: 11.2, risk: 8.8 },
    { month: "Feb", cash: 12.0, risk: 8.5 },
    { month: "Mar", cash: 12.8, risk: 8.1 },
    { month: "Apr", cash: 13.5, risk: 7.9 },
    { month: "May", cash: 14.1, risk: 7.8 },
    { month: "Jun", cash: 14.65, risk: 7.63 },
  ];

  // Dummy Dataset (in Millions)
  const savingsAndSharesTrend = [
    { month: "Jan", savings: 68.2, shares: 18.0 },
    { month: "Feb", savings: 71.5, shares: 18.8 },
    { month: "Mar", savings: 75.0, shares: 19.5 },
    { month: "Apr", savings: 78.4, shares: 20.2 },
    { month: "May", savings: 81.2, shares: 21.1 },
    { month: "Jun", savings: 84.2, shares: 22.1 },
  ];

  const formatMillionsAmount = (val) => `${val}M`;

  const formatMillions = (val) => `${(val / 1000).toFixed(0)}k`;
  return (
    <div className="w-full space-y-8 antialiased text-slate-800">
      <div className="space-y-4">
        <div>
          <h2 className="text-base font-black tracking-tight text-primary">
            Financial Health
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
                <p className="text-base font-extrabold text-primary">
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
            <p className="text-2xl font-black text-primary tracking-tight">
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
            <p className="text-2xl font-black text-primary tracking-tight">
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
            <p className="text-2xl font-black text-primary tracking-tight">
              KES 7.63M
            </p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">
              Safe (Well within our 5.0% maximum risk limit)
            </p>
          </MetricCard>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
        {/* CHART 1: MOBILIZED FUNDS VS OUTSTANDING LOANS */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col w-full">
          <div className="mb-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block select-none">
              Mobilized Capital vs. Active Loan Book
            </span>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Monthly growth comparison of total deposit funds against active
              loan portfolio.
            </p>
          </div>

          <div className="relative h-[260px] text-xs w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={financialPortfolioTrend}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f1f5f9"
                  vertical={false}
                />
                <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} />
                <YAxis
                  stroke="#94a3b8"
                  tickLine={false}
                  tickFormatter={formatMillionsAmount}
                />
                <Tooltip formatter={(value) => [`KES ${value}M`]} />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ paddingTop: "10px" }}
                />
                <Line
                  type="natural"
                  dataKey="capital"
                  name="Mobilized Capital"
                  stroke="#074073"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="natural"
                  dataKey="loans"
                  name="Outstanding Loans"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: LIQUID CASH RESERVES VS OVERDUE RISK EXPOSURE */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col w-full">
          <div className="mb-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block select-none">
              Monthly Savings vs. Shares Growth
            </span>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Growth trajectory comparing member deposits against core share
              capital pool.
            </p>
          </div>

          <div className="relative h-[260px] text-xs w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={savingsAndSharesTrend}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f1f5f9"
                  vertical={false}
                />
                <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} />
                <YAxis
                  stroke="#94a3b8"
                  tickLine={false}
                  tickFormatter={formatMillionsAmount}
                />
                <Tooltip formatter={(value) => [`KES ${value}M`]} />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ paddingTop: "10px" }}
                />
                <Line
                  type="natural"
                  dataKey="savings"
                  name="Member Savings"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="natural"
                  dataKey="shares"
                  name="Member Shares"
                  stroke="#074073"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-base font-black tracking-tight text-primary">
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
                <p className="text-xl font-black text-primary tracking-tight">
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
            <p className="text-2xl font-black text-primary tracking-tight">
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
            <p className="text-2xl font-black text-primary tracking-tight">
              KES 48,500
            </p>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">
              The average total balance saved by an individual cooperative
              member
            </p>
          </MetricCard>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
        {/* CHART 1: MEMBER GROWTH TRAJECTORY */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col w-full">
          <div className="mb-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block select-none">
              Member Growth Trajectory
            </span>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Comparison between total registered and active accounts.
            </p>
          </div>

          <div className="relative h-[260px] text-xs w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={memberGrowthTrend}
                margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f1f5f9"
                  vertical={false}
                />
                <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} />
                <YAxis stroke="#94a3b8" tickLine={false} />
                <Tooltip
                  formatter={(value) => [`${value.toLocaleString()} Members`]}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ paddingTop: "10px" }}
                />
                <Line
                  type="natural"
                  dataKey="total"
                  name="Total Members"
                  stroke="#074073"
                  strokeWidth={3}
                  dot={false}
                />
                <Line
                  type="natural"
                  dataKey="active"
                  name="Active Members"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: AVERAGE SAVINGS TREND */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col w-full">
          <div className="mb-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block select-none">
              Average Member Savings Trend
            </span>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Steady rise in average individual savings mobilization.
            </p>
          </div>

          <div className="relative h-[260px] text-xs w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={savingsMobilizationTrend}
                margin={{ top: 10, right: 10, left: -5, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f1f5f9"
                  vertical={false}
                />
                <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} />
                <YAxis
                  stroke="#94a3b8"
                  tickLine={false}
                  tickFormatter={formatMillions}
                />
                <Tooltip
                  formatter={(value) => [
                    `KES ${value.toLocaleString()}`,
                    "Avg. Savings",
                  ]}
                />
                <Line
                  type="natural"
                  dataKey="avgSavings"
                  name="Avg. Savings (KES)"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-base font-black tracking-tight text-primary">
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
            <p className="text-2xl font-black text-primary tracking-tight">
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
            <p className="text-2xl font-black text-primary tracking-tight">
              34 Receipts
            </p>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">
              Member-submitted bank slips and mobile money transactions to
              confirm
            </p>
          </MetricCard>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
        {/* CHART 1: MONTHLY SUBMISSIONS VS APPROVALS */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col w-full">
          <div className="mb-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block select-none">
              Monthly Submissions vs. Approvals
            </span>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Monthly momentum of incoming applications against cleared files.
            </p>
          </div>

          <div className="relative h-[260px] text-xs w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyPipelineTrend}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f1f5f9"
                  vertical={false}
                />
                <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} />
                <YAxis stroke="#94a3b8" tickLine={false} />
                <Tooltip formatter={(value) => [`${value} Loans`]} />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ paddingTop: "10px" }}
                />
                <Line
                  type="natural"
                  dataKey="submitted"
                  name="Applications Submitted"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="natural"
                  dataKey="approved"
                  name="Loans Approved"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: TOTAL PENDING QUEUE VOLUME */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col w-full">
          <div className="mb-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block select-none">
              Pending Queue Volume
            </span>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Monthly backlog trend of applications awaiting processing steps.
            </p>
          </div>

          <div className="relative h-[260px] text-xs w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyPendingQueueTrend}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f1f5f9"
                  vertical={false}
                />
                <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} />
                <YAxis stroke="#94a3b8" tickLine={false} />
                <Tooltip
                  formatter={(value) => [
                    `${value} Applications`,
                    "Pending Total",
                  ]}
                />
                <Line
                  type="natural"
                  dataKey="pending"
                  name="Pending Files"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-base font-black tracking-tight text-primary">
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
                <p className="text-lg font-black text-primary">KES 7.80M</p>
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
