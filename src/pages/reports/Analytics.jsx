import React from "react";
import {
  ShieldCheck,
  Users,
  UserX,
  TrendingUp,
  PieChart,
  ShieldAlert,
  Calendar,
  Activity,
  ArrowUpRight,
  UserCheck,
  Wallet,
  PiggyBank,
  Coins,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  LineChart,
  Line,
} from "recharts";

export default function Analytics() {
  const memberLifecycleData = [
    { group: "18-25 Yrs", avgSavings: 15000, avgLoans: 45000 },
    { group: "26-35 Yrs", avgSavings: 45000, avgLoans: 120000 },
    { group: "36-50 Yrs", avgSavings: 110000, avgLoans: 280000 },
    { group: "Over 50", avgSavings: 250000, avgLoans: 90000 },
  ];

  const depositMobilizationData = [
    { month: "Jan", inflows: 24200000, outflows: 18100000 },
    { month: "Feb", inflows: 28500000, outflows: 19400000 },
    { month: "Mar", inflows: 31100000, outflows: 22500000 },
    { month: "Apr", inflows: 29800000, outflows: 21000000 },
    { month: "May", inflows: 35400000, outflows: 20200000 },
    { month: "Jun", inflows: 38900000, outflows: 23400000 },
  ];

  const dividendProjectionData = [
    { period: "Q1 2026", shareCapital: 72000000, netSurplus: 4100000 },
    { period: "Q2 2026", shareCapital: 78000000, netSurplus: 9500000 },
    { period: "Q3 2026", shareCapital: 82000000, netSurplus: 14200000 },
    { period: "Q4 2026", shareCapital: 85200000, netSurplus: 21800000 },
  ];

  const loanVelocityData = [
    { month: "Jan", disbursed: 20100000, collected: 18500000 },
    { month: "Feb", disbursed: 22400000, collected: 19100000 },
    { month: "Mar", disbursed: 38500000, collected: 20400000 }, // Squeeze warning
    { month: "Apr", disbursed: 31000000, collected: 22100000 },
    { month: "May", disbursed: 28200000, collected: 24800000 },
    { month: "Jun", disbursed: 33400000, collected: 27100000 },
  ];

  const parAgingData = [
    { name: "On Time (0d)", amount: 940000000 },
    { name: "Late (1-30d)", amount: 45000000 },
    { name: "Late (31-90d)", amount: 22000000 },
    { name: "Late (91-360d)", amount: 15000000 },
    { name: "Default (>360d)", amount: 8000000 },
  ];

  // Simple currency helper for numbers
  const formatMillions = (val) => `KES ${(val / 1000000).toFixed(1)}M`;

  return (
    <div className="bg-slate-50 text-slate-800 space-y-8 w-full">
      {/* GLOBAL HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200/60 pb-4 w-full">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-primary flex items-center gap-2 select-none">
            <ShieldCheck className="text-primary shrink-0" size={24} />
            Sacco Analytics
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-1">
            A simple overview of our members, savings, shares, and loans to help
            manage the Sacco smoothly.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 shadow-3xs select-none">
          <Calendar size={14} className="text-slate-400" />
          <span>Current Year: 2026</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="border-l-4 border-primary pl-3 select-none">
          <h3 className="text-base font-black text-primary uppercase tracking-wide">
            1. Member Overview
          </h3>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Track how fast the Sacco is growing, who is active, and how
            different age groups save and borrow.
          </p>
        </div>

        {/* THE FIX: Changed items-start to lg:items-stretch to lock the columns to the same height */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:items-stretch w-full">
          {/* CHART ON LEFT: Added flex flex-col to expand space internally */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col w-full">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block select-none mb-3">
              Average Savings vs. Loans by Age Group
            </span>

            {/* THE FIX: Changed h-56 to relative flex-1 so the chart stretches cleanly with the column */}
            <div className="relative flex-1 min-h-[300px] text-xs w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={memberLifecycleData}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#f1f5f9"
                    vertical={false}
                  />
                  <XAxis dataKey="group" stroke="#94a3b8" tickLine={false} />
                  <YAxis stroke="#94a3b8" tickLine={false} />
                  <Tooltip
                    formatter={(value) => [`KES ${value.toLocaleString()}`]}
                  />
                  <Legend iconType="circle" />
                  <Bar
                    dataKey="avgSavings"
                    name="Average Savings"
                    fill="#94a3b8"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={32}
                  />
                  <Bar
                    dataKey="avgLoans"
                    name="Average Loan Amount"
                    fill="#2563eb"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={32}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CARDS ON RIGHT: Added content-between to space the 4 cards beautifully across the height */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:col-span-4 gap-4 w-full select-none content-between">
            {/* CARD 1: TOTAL SACCO MEMBERS */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-3xs">
              <div className="size-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                <Users size={18} />
              </div>
              <div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                  Total Sacco Members
                </span>
                <span className="text-lg font-black text-primary block">
                  12,450{" "}
                  <span className="text-xs text-slate-400 font-normal font-sans pl-0.5">
                    registered
                  </span>
                </span>
              </div>
            </div>

            {/* CARD 2: ACTIVE BORROWERS */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-3xs">
              <div className="size-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                <Activity size={18} />
              </div>
              <div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                  Members with Active Loans
                </span>
                <span className="text-lg font-black text-primary block">
                  5,230{" "}
                  <span className="text-xs text-indigo-600 font-bold font-sans">
                    (42% of total)
                  </span>
                </span>
              </div>
            </div>

            {/* CARD 3: NEW MEMBERS */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-3xs">
              <div className="size-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <Users size={18} />
              </div>
              <div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                  New Members
                </span>
                <span className="text-lg font-black text-primary block">
                  +245{" "}
                  <span className="text-xs text-emerald-600 font-bold font-sans">
                    this month
                  </span>
                </span>
              </div>
            </div>

            {/* CARD 4: INACTIVE MEMBERS */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-3xs">
              <div className="size-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                <UserX size={18} />
              </div>
              <div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                  Inactive Members
                </span>
                <span className="text-lg font-black text-rose-700 block">
                  3.4%{" "}
                  <span className="text-xs text-slate-400 font-medium font-sans ml-1">
                    last 90 days
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="border-l-4 border-emerald-600 pl-3 select-none">
          <h3 className="text-base font-black text-primary uppercase tracking-wide">
            2. Savings &amp; Deposits
          </h3>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Savings are the fuel for loans. Track the money coming in versus
            money going out, and see if members are saving consistently.
          </p>
        </div>

        {/* THE FIX: Changed to lg:items-stretch to make the chart and cards columns the exact same height */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:items-stretch w-full">
          {/* CHART ON LEFT: Added flex flex-col to allow inner containers to expand dynamically */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col w-full">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block select-none mb-3">
              Money Coming In (Deposits) vs. Going Out (Withdrawals)
            </span>

            {/* THE FIX: Swapped out h-56 for relative flex-1 min-h-[300px] to match the cards column height */}
            <div className="relative flex-1 min-h-[300px] text-xs w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={depositMobilizationData}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} />
                  <YAxis
                    stroke="#94a3b8"
                    tickLine={false}
                    tickFormatter={formatMillions}
                  />
                  <Tooltip
                    formatter={(value) => [`KES ${value.toLocaleString()}`]}
                  />
                  <Legend iconType="circle" />
                  <Area
                    type="monotone"
                    dataKey="inflows"
                    name="Deposits Saved"
                    stroke="#10b981"
                    fillOpacity={0.06}
                    fill="#10b981"
                    strokeWidth={2.5}
                  />
                  <Area
                    type="monotone"
                    dataKey="outflows"
                    name="Money Withdrawn"
                    stroke="#f43f5e"
                    fillOpacity={0.02}
                    fill="#f43f5e"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* DATA CARDS ON RIGHT: Added content-between to balance all 4 cards across the height evenly */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:col-span-4 gap-4 w-full select-none content-between">
            {/* NEW RELEVANT CARD 1: TOTAL DEPOSIT POOL */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-3xs">
              <div className="size-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                <Wallet size={18} />
              </div>
              <div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                  Total Savings Pool
                </span>
                <span className="text-lg font-black text-primary block">
                  KES 428.5M{" "}
                  <span className="text-xs text-slate-400 font-normal font-sans block mt-0.5">
                    held in member accounts
                  </span>
                </span>
              </div>
            </div>

            {/* NEW RELEVANT CARD 2: MONTHLY FRESH GROWTH */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-3xs">
              <div className="size-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                <TrendingUp size={18} />
              </div>
              <div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                  Net Inflows This Month
                </span>
                <span className="text-lg font-black text-primary block">
                  +KES 15.5M{" "}
                  <span className="text-xs text-emerald-600 font-bold font-sans block mt-0.5">
                    more saved than withdrawn
                  </span>
                </span>
              </div>
            </div>

            {/* CARD 3: REPAYMENT/CONTRIBUTION CONSISTENCY */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-3xs">
              <div className="size-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                <UserCheck size={18} />
              </div>
              <div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                  Members Saving Regularly
                </span>
                <span className="text-lg font-black text-primary block">
                  86.4%{" "}
                  <span className="text-xs text-emerald-600 font-bold font-sans">
                    active
                  </span>
                </span>
              </div>
            </div>

            {/* CARD 4: AVERAGE MEMBER VALUATION */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-3xs">
              <div className="size-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shrink-0">
                <PiggyBank size={18} />
              </div>
              <div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                  Average Savings per Member
                </span>
                <span className="text-lg font-black text-[#074073] block">
                  KES 34,410
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="border-l-4 border-purple-600 pl-3 select-none">
          <h3 className="text-base font-black text-primary uppercase tracking-wide">
            3. Share Capital (Sacco Strength)
          </h3>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Shares represent permanent ownership in the Sacco. Track our overall
            financial strength and see estimated dividend payouts for members.
          </p>
        </div>

        {/* THE FIX: Changed to lg:items-stretch to make the chart and cards columns the exact same height */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:items-stretch w-full">
          {/* CHART ON LEFT: Added flex flex-col to allow inner containers to expand dynamically */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col w-full">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block select-none mb-3">
              Sacco Shares Growth vs. Sacco Profits
            </span>

            {/* THE FIX: Swapped out h-56 for relative flex-1 min-h-[300px] to match the cards column height */}
            <div className="relative flex-1 min-h-[300px] text-xs w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dividendProjectionData}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#f1f5f9"
                    vertical={false}
                  />
                  <XAxis dataKey="period" stroke="#94a3b8" tickLine={false} />
                  <YAxis
                    stroke="#94a3b8"
                    tickLine={false}
                    tickFormatter={formatMillions}
                  />
                  <Tooltip
                    formatter={(value) => [`KES ${value.toLocaleString()}`]}
                  />
                  <Legend iconType="circle" />
                  <Bar
                    dataKey="shareCapital"
                    name="Total Member Shares Pool"
                    fill="#db2777"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={32}
                  />
                  <Bar
                    dataKey="netSurplus"
                    name="Sacco Net Profit"
                    fill="#7c3aed"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={32}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* DATA CARDS ON RIGHT: Added content-between to balance all 4 cards across the height evenly */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:col-span-4 gap-4 w-full select-none content-between">
            {/* NEW RELEVANT CARD 1: TOTAL MEMBER SHARES POOL */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-3xs">
              <div className="size-10 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-600 shrink-0">
                <PieChart size={18} />
              </div>
              <div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                  Total Sacco Shares Pool
                </span>
                <span className="text-lg font-black text-primary block">
                  KES 85.2M{" "}
                  <span className="text-xs text-slate-400 font-normal font-sans block mt-0.5">
                    Permanent non-withdrawable equity
                  </span>
                </span>
              </div>
            </div>

            {/* NEW RELEVANT CARD 2: YEAR TO DATE SURPLUS PROFITS */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-3xs">
              <div className="size-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                <TrendingUp size={18} />
              </div>
              <div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                  Sacco Net Profit (YTD)
                </span>
                <span className="text-lg font-black text-primary block">
                  KES 21.8M{" "}
                  <span className="text-xs text-purple-600 font-bold font-sans block mt-0.5">
                    Accumulated current year earnings
                  </span>
                </span>
              </div>
            </div>

            {/* CARD 3: REGULATORY STRENGTH RATIO */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-3xs">
              <div className="size-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                <Wallet size={18} />
              </div>
              <div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                  Sacco Financial Strength Ratio
                </span>
                <span className="text-lg font-black text-primary block">
                  12.4%{" "}
                  <span className="text-xs text-slate-400 font-medium font-sans ml-1">
                    (Target is 8%+ / SASRA Safe)
                  </span>
                </span>
              </div>
            </div>

            {/* CARD 4: ESTIMATED INTEREST/DIVIDEND RETURN RATE */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-3xs">
              <div className="size-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                <Coins size={18} />
              </div>
              <div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                  Estimated Dividend Payout
                </span>
                <span className="text-lg font-black text-amber-700 block">
                  8.5% — 9.2%{" "}
                  <span className="text-xs text-slate-400 font-medium font-sans block mt-0.5">
                    Expected member return rate
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="border-l-4 border-rose-600 pl-3 select-none">
          <h3 className="text-base font-black text-primary uppercase tracking-wide">
            4. Loans &amp; Risk Management
          </h3>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Loans are our main source of income but carry the most risk. Track
            how fast we lend versus how fast we collect, and keep an eye on
            unpaid loans.
          </p>
        </div>

        {/* THE FIX: Changed to lg:items-stretch to lock the stacked charts column and cards column to the exact same height */}
        {/* ROW 1: LOAN DEPLOYMENT SPEED & RECOVERIES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:items-stretch w-full">
          {/* CHART ON LEFT */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col w-full">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block select-none mb-3">
              Loans Given Out vs. Loans Collected
            </span>
            <div className="relative flex-1 min-h-[300px] text-xs w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={loanVelocityData}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} />
                  <YAxis
                    stroke="#94a3b8"
                    tickLine={false}
                    tickFormatter={formatMillions}
                  />
                  <Tooltip
                    formatter={(value) => [`KES ${value.toLocaleString()}`]}
                  />
                  <Legend iconType="circle" />
                  <Line
                    type="monotone"
                    dataKey="disbursed"
                    name="Total Loans Issued"
                    stroke="#4f46e5"
                    strokeWidth={2.5}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="collected"
                    name="Repayments Collected"
                    stroke="#059669"
                    strokeWidth={2.5}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 3 RELATED DATA CARDS ON RIGHT */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4 w-full select-none h-full">
            {/* CARD 1: TOTAL LOAN BOOK */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-3xs flex-1">
              <div className="size-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                <Activity size={18} />
              </div>
              <div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                  Total Active Loan Book
                </span>
                <span className="text-lg font-black text-primary block">
                  KES 1.03B
                  <span className="text-xs text-slate-400 font-normal font-sans block mt-0.5">
                    Active circulating capital
                  </span>
                </span>
              </div>
            </div>

            {/* CARD 2: COLLECTION EFFICENCY */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-3xs flex-1">
              <div className="size-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                <TrendingUp size={18} />
              </div>
              <div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                  Repayment Collection Rate
                </span>
                <span className="text-lg font-black text-primary block">
                  95.7%
                  <span className="text-xs text-emerald-600 font-bold font-sans block mt-0.5">
                    On-time repayments efficiency
                  </span>
                </span>
              </div>
            </div>

            {/* CARD 3: NEW DISBURSEMENTS */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-3xs flex-1">
              <div className="size-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <ArrowUpRight size={18} />
              </div>
              <div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                  Issued This Month
                </span>
                <span className="text-lg font-black text-primary block">
                  KES 33.4M
                  <span className="text-xs text-slate-400 font-normal font-sans block mt-0.5">
                    Fresh credit released to members
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: UNPAID ARREARS & RISK CONCENTRATION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:items-stretch w-full pt-4">
          {/* CHART ON LEFT */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col w-full">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block select-none mb-3">
              Unpaid Loans by Delay Category (Arrears)
            </span>
            <div className="relative flex-1 min-h-[300px] text-xs w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={parAgingData}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#f1f5f9"
                    vertical={false}
                  />
                  <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} />
                  <YAxis
                    stroke="#94a3b8"
                    tickLine={false}
                    tickFormatter={formatMillions}
                  />
                  <Tooltip
                    formatter={(value) => [`KES ${value.toLocaleString()}`]}
                  />
                  <Bar
                    dataKey="amount"
                    name="Arrears Balance"
                    fill="#e11d48"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={36}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 3 RELATED DATA CARDS ON RIGHT */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4 w-full select-none h-full">
            {/* CARD 1: OVERALL ARREARS BALANCE */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-3xs flex-1">
              <div className="size-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                <ShieldAlert size={18} />
              </div>
              <div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                  Total Unpaid Overdue Loans
                </span>
                <span className="text-lg font-black text-rose-700 block">
                  KES 90.0M
                  <span className="text-xs text-slate-400 font-bold font-sans block mt-0.5">
                    (4.3% of entire loan book)
                  </span>
                </span>
              </div>
            </div>

            {/* CARD 2: HIGHEST SECTOR RISK PROFILE */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-3xs flex-1">
              <div className="size-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                <PieChart size={18} />
              </div>
              <div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                  Highest Sector Risk
                </span>
                <span className="text-lg font-black text-primary block">
                  45%
                  <span className="text-xs text-slate-400 font-normal font-sans block mt-0.5">
                    tied up in Housing/Land
                  </span>
                </span>
              </div>
            </div>

            {/* CARD 3: RISK PROTECTION PROVISION BUFFER */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-3xs flex-1">
              <div className="size-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                  Bad Debt Cover Buffer
                </span>
                <span className="text-lg font-black text-slate-700 block">
                  KES 12.5M
                  <span className="text-xs text-emerald-600 font-bold font-sans block mt-0.5">
                    100% Provisioned / Safe
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
