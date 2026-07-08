import React, { useState, useMemo } from "react";
import {
  Search,
  Landmark,
  Wallet,
  PieChart,
  Coins,
  Calendar,
  ChevronDown,
  Eye,
  Filter,
  Download,
  SlidersHorizontal,
  X,
  Building2,
  Map,
  Hash,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// 1. REUSABLE SEPARATOR INPUT COMPONENT
const FilterField = ({ label, icon: Icon, children }) => (
  <div className="space-y-2 flex-1 min-w-0">
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none z-10">
        <Icon
          size={18}
          className="text-slate-300 group-focus-within:text-[#074073] transition-colors"
        />
        <div className="w-[1.5px] h-5 bg-slate-200 ml-4 group-focus-within:bg-[#074073]/20 transition-colors" />
      </div>
      {children}
    </div>
  </div>
);

export default function MemberAccounts() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  // Centralized Filters State Structure
  const [filters, setFilters] = useState({
    q: "",
    status: "",
    county: "",
    subcounty: "",
    fromDate: "",
    toDate: "",
  });

  // 2. COMPREHENSIVE HIGH-DENSITY MOCK ACCOUNTS Poole
  const [accounts] = useState([
    {
      account_identity: {
        id: "e8f191f3-0b35-34fb-c442-c6b62c6a0fd1",
        account_number: "0100100002752",
        account_code: "2752",
        customer_name: "Almasi Achieng Aluoch",
        public_id: "SJS224",
        product_type: "fixed_term_deposit",
        product_name: "Fixed Term Deposits",
        currency_code: "KES",
        county: "Nairobi",
        subcounty: "Westlands",
      },
      core_financial_ledger: {
        current_balance: 250201.0,
        free_unencumbered_balance: 250201.0,
        encumbered_amount: 0.0,
        interest_accumulated: 201.0,
      },
      fixed_term_deposit_attributes: {
        contract_interest_rate: "11.50",
        maturity_date: "2026-09-19",
      },
      status: "active",
    },
    {
      account_identity: {
        id: "b11a8421-44bb-9cc7-11fd-123456789abc",
        account_number: "0100200008491",
        account_code: "8491",
        customer_name: "Marcel Auja Ogweno",
        public_id: "SJS394",
        product_type: "member_deposits",
        product_name: "Member Deposits (Savings)",
        currency_code: "KES",
        county: "Kisumu",
        subcounty: "Kisumu Central",
      },
      core_financial_ledger: {
        current_balance: 185000.0,
        free_unencumbered_balance: 110000.0,
        encumbered_amount: 50000.0,
        interest_accumulated: 0.0,
      },
      member_deposit_attributes: {
        min_periodic_contribution: "1,000.00",
        loan_multiplier_factor: "3.0x",
      },
      status: "active",
    },
    {
      account_identity: {
        id: "fa328b12-11da-4bc6-88ef-9876543210fe",
        account_number: "0100900005432",
        account_code: "5432",
        customer_name: "Beatrice Wangari Kamau",
        public_id: "SJS402",
        product_type: "share_capital",
        product_name: "Share Capital (Equity)",
        currency_code: "KES",
        county: "Kiambu",
        subcounty: "Thika",
      },
      core_financial_ledger: {
        current_balance: 40000.0,
        free_unencumbered_balance: 40000.0,
        encumbered_amount: 0.0,
        interest_accumulated: 3200.0,
      },
      share_capital_attributes: {
        total_units_held: 2000,
        share_unit_price: "20.00",
      },
      status: "active",
    },
    {
      account_identity: {
        id: "c2874bc1-3521-4def-99a0-de8a2095cc1a",
        account_number: "0100100009941",
        account_code: "9941",
        customer_name: "Sarah Atieno Odhiambo",
        public_id: "SJS501",
        product_type: "holiday_savings",
        product_name: "Holiday Savings",
        currency_code: "KES",
        county: "Mombasa",
        subcounty: "Nyali",
      },
      core_financial_ledger: {
        current_balance: 95000.0,
        free_unencumbered_balance: 95000.0,
        encumbered_amount: 0.0,
        interest_accumulated: 1800.0,
      },
      holiday_savings_attributes: {
        withdrawal_window: "November Annual",
      },
      status: "dormant",
    },
    {
      account_identity: {
        id: "da4182f2-9bc0-4f1d-aa88-5cbf86d5e032",
        account_number: "0100200003114",
        account_code: "3114",
        customer_name: "David Mwangi Njoroge",
        public_id: "SJS502",
        product_type: "education_savings",
        product_name: "Education Savings",
        currency_code: "KES",
        county: "Nakuru",
        subcounty: "Nakuru East",
      },
      core_financial_ledger: {
        current_balance: 312000.0,
        free_unencumbered_balance: 212000.0,
        encumbered_amount: 100000.0,
        interest_accumulated: 8400.0,
      },
      education_savings_attributes: {
        target_disbursement: "Term Start",
      },
      status: "active",
    },
    {
      account_identity: {
        id: "9f32bc11-a88f-41cc-b22e-ddcf2911bca0",
        account_number: "0100900008819",
        account_code: "8819",
        customer_name: "Jane W Mwende",
        public_id: "SJS503",
        product_type: "junior_savings",
        product_name: "Junior Savings Account",
        currency_code: "KES",
        county: "Machakos",
        subcounty: "Mavoko",
      },
      core_financial_ledger: {
        current_balance: 60000.0,
        free_unencumbered_balance: 60000.0,
        encumbered_amount: 0.0,
        interest_accumulated: 1200.0,
      },
      junior_savings_attributes: {
        parental_oversight: "Mandatory",
      },
      status: "suspended",
    },
  ]);

  // 3. MULTI-CRITERIA DATA FILTER PIPELINE
  const filteredAccounts = useMemo(() => {
    return accounts.filter((acc) => {
      // Tab Category Filter
      if (
        activeTab !== "all" &&
        acc.account_identity.product_type !== activeTab
      )
        return false;

      // Inline search query parameter
      if (filters.q) {
        const needle = filters.q.toLowerCase();
        const matchName = acc.account_identity.customer_name
          .toLowerCase()
          .includes(needle);
        const matchNo = acc.account_identity.account_number.includes(needle);
        const matchId = acc.account_identity.public_id
          .toLowerCase()
          .includes(needle);
        if (!matchName && !matchNo && !matchId) return false;
      }

      // Drawer categorical attributes filters
      if (filters.status && acc.status !== filters.status) return false;
      if (
        filters.county &&
        !acc.account_identity.county
          .toLowerCase()
          .includes(filters.county.toLowerCase())
      )
        return false;
      if (
        filters.subcounty &&
        !acc.account_identity.subcounty
          .toLowerCase()
          .includes(filters.subcounty.toLowerCase())
      )
        return false;

      return true;
    });
  }, [accounts, filters, activeTab]);

  // Global aggregate summaries calculated from active array sets
  const systemMetrics = useMemo(() => {
    return filteredAccounts.reduce(
      (acc, curr) => {
        acc.totalVolume += curr.core_financial_ledger.current_balance;
        acc.unencumberedPool +=
          curr.core_financial_ledger.free_unencumbered_balance;
        acc.lienLocks += curr.core_financial_ledger.encumbered_amount;
        return acc;
      },
      { totalVolume: 0, unencumberedPool: 0, lienLocks: 0 },
    );
  }, [filteredAccounts]);

  const handleResetFilters = () => {
    setFilters({
      q: "",
      status: "",
      county: "",
      subcounty: "",
      fromDate: "",
      toDate: "",
    });
    setStatusDropdownOpen(false);
  };

  const statusOptions = [
    { value: "", label: "All Status Profiles" },
    { value: "active", label: "Active" },
    { value: "dormant", label: "Dormant" },
    { value: "suspended", label: "Suspended" },
  ];

  const getProductPillColor = (type) => {
    switch (type) {
      case "fixed_term_deposit":
        return "bg-purple-50 text-purple-700 border-purple-200/50";
      case "member_deposits":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/50";
      case "share_capital":
        return "bg-blue-50 text-blue-700 border-blue-200/50";
      case "holiday_savings":
        return "bg-orange-50 text-orange-700 border-orange-200/50";
      case "education_savings":
        return "bg-indigo-50 text-indigo-700 border-indigo-200/50";
      default:
        return "bg-pink-50 text-pink-700 border-pink-200/50";
    }
  };

  return (
    <div className="w-full min-h-screen antialiased text-slate-800 space-y-6">
      {/* HEADER ACTION DECK */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200/60 pb-6">
        <div>
          <h2 className="text-2xl font-black text-primary tracking-tight flex items-center gap-2.5">
            <Landmark className="text-[#074073]" size={24} /> Members Savings
            Account
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Real-time management system for user share portfolios, investment
            terms, and savings allocations.
          </p>
        </div>
      </div>

      {/* METRIC VISUAL TILES GALLERY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 select-none">
        <StatTile
          icon={<Wallet className="text-blue-600" />}
          label="Aggregated Balance Under Management"
          value={`KES ${systemMetrics.totalVolume.toLocaleString()}`}
          desc="Total portfolio tracking liquidity pool"
        />
        <StatTile
          icon={<PieChart className="text-emerald-600" />}
          label="Free Unencumbered Capital"
          value={`KES ${systemMetrics.unencumberedPool.toLocaleString()}`}
          desc="Available cross-credit loan backing values"
        />
        <StatTile
          icon={<Coins className="text-orange-600" />}
          label="Active Collateral Liens"
          value={`KES ${systemMetrics.lienLocks.toLocaleString()}`}
          desc="Locked guarantees on active member loans"
        />
      </div>

      {/* UTILITIES & SEGMENT CONTROL BLOCK */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs p-4 space-y-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Main inline live search bar context lookup anchor */}
          <div className="relative w-full lg:w-96">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={filters.q}
              onChange={(e) => setFilters({ ...filters, q: e.target.value })}
              placeholder="Search member name, account line, code..."
              className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none transition-all focus:bg-white focus:border-[#074073] placeholder:text-slate-400"
            />
          </div>

          {/* Controls cluster right block deck */}
          <div className="flex items-center gap-3 overflow-x-auto shrink-0 pb-1 lg:pb-0">
            <button className="flex items-center gap-2 h-11 px-4 border border-slate-200 bg-white text-slate-600 rounded-xl text-xs font-bold shadow-3xs hover:bg-slate-50 transition-colors cursor-pointer">
              <Download size={14} /> Export
            </button>
            <button
              onClick={() => setIsFilterOpen(true)}
              className={`flex items-center gap-2 h-11 px-4 border rounded-xl text-xs font-bold transition-all cursor-pointer shadow-3xs ${
                Object.values(filters).some((v) => v !== "")
                  ? "border-[#074073] bg-[#074073] text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <SlidersHorizontal size={14} />
              <span>Advanced Filters</span>
            </button>
          </div>
        </div>

        {/* MODERN SEGMENT CONTROL TABS (Product Context Isolation Channel) */}
        <div className="border-t border-slate-100 pt-3 flex gap-1.5 overflow-x-auto select-none scrollbar-none">
          {[
            { id: "all", label: "All Portfolios" },
            { id: "fixed_term_deposit", label: "Term Investments" },
            { id: "member_deposits", label: "Member Savings" },
            { id: "share_capital", label: "Share Capital" },
            { id: "holiday_savings", label: "Holiday Funds" },
            { id: "education_savings", label: "Education Accounts" },
            { id: "junior_savings", label: "Junior Accounts" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`h-9 px-4 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-700 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* DETAILED PREMIUM ACCOUNT LEDGER GRID MATRIX */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs overflow-hidden">
        <div className="overflow-x-auto">
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse table-auto">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-200/60 text-[10px] font-bold text-slate-400 uppercase tracking-widest select-none">
                    <th className="py-4.5 px-6">Member Details</th>
                    <th className="py-4.5 px-6">Account Info</th>
                    <th className="py-4.5 px-6 text-right">Total Balance</th>
                    <th className="py-4.5 px-6 text-right">
                      Available Balance
                    </th>
                    <th className="py-4.5 px-6">Product Breakdown</th>
                    <th className="py-4.5 px-6">Status</th>
                    <th className="py-4.5 px-6 text-right pr-8">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs tracking-tight">
                  {filteredAccounts.length > 0 ? (
                    filteredAccounts.map((acc) => {
                      // Dynamically calculate two-letter initials from the member name
                      const initials = acc.account_identity.customer_name
                        ? acc.account_identity.customer_name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2)
                        : "M";

                      return (
                        <tr
                          key={acc.account_identity.id}
                          className="group transition-colors hover:bg-slate-50/40"
                        >
                          {/* Col 1: Member Personal Details & Public Badges */}
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="size-9 rounded-xl bg-slate-100 border border-slate-200/60 flex items-center justify-center font-bold text-slate-700 text-xs shadow-3xs shrink-0 select-none">
                                {initials}
                              </div>
                              <div className="flex flex-col space-y-0.5">
                                <span className="font-mono w-fit text-[9px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded">
                                  {acc.account_identity.public_id}
                                </span>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-bold text-primary text-sm tracking-tight">
                                    {acc.account_identity.customer_name}
                                  </span>
                                </div>
                                <span className="text-[11px] text-slate-400 font-medium">
                                  System Reference:{" "}
                                  <span className="font-mono text-slate-600 font-semibold">
                                    {acc.account_identity.account_code}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Col 2: Structured Account Info & Type Badges */}
                          <td className="py-4 px-6">
                            <div className="flex flex-col space-y-1">
                              <span className="font-mono font-bold text-primary tracking-tight text-xs">
                                {acc.account_identity.account_number.replace(
                                  /(\d{4})(\d{5})(\d{4})/,
                                  "$1-$2-$3",
                                )}
                              </span>
                              <span
                                className={`text-[8px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded border self-start ${getProductPillColor(
                                  acc.account_identity.product_type,
                                )}`}
                              >
                                {acc.account_identity.product_name}
                              </span>
                            </div>
                          </td>

                          {/* Col 3: Book Balances */}
                          <td className="py-4 px-6 text-right font-black text-primary text-sm">
                            {acc.account_identity.currency_code}{" "}
                            {acc.core_financial_ledger.current_balance.toLocaleString(
                              undefined,
                              { minimumFractionDigits: 2 },
                            )}
                          </td>

                          {/* Col 4: Withdrawable Liquid Assets */}
                          <td className="py-4 px-6 text-right font-bold text-emerald-600 text-sm">
                            {acc.account_identity.currency_code}{" "}
                            {acc.core_financial_ledger.free_unencumbered_balance.toLocaleString(
                              undefined,
                              { minimumFractionDigits: 2 },
                            )}
                          </td>

                          {/* Col 5: Polymorphic Custom Rules & Growth Progress metrics */}
                          <td className="py-4 px-6 text-slate-500 font-medium text-[11px]">
                            {acc.account_identity.product_type ===
                              "fixed_term_deposit" &&
                              acc.fixed_term_deposit_attributes && (
                                <div className="flex flex-col gap-0.5">
                                  <span>
                                    Interest Rate:{" "}
                                    <span className="text-slate-800 font-bold">
                                      {
                                        acc.fixed_term_deposit_attributes
                                          .contract_interest_rate
                                      }
                                      % p.a.
                                    </span>
                                  </span>
                                  <span className="text-[10px] text-slate-400">
                                    Maturity Date:{" "}
                                    {
                                      acc.fixed_term_deposit_attributes
                                        .maturity_date
                                    }
                                  </span>
                                </div>
                              )}
                            {acc.account_identity.product_type ===
                              "member_deposits" &&
                              acc.member_deposit_attributes && (
                                <div className="flex flex-col gap-0.5">
                                  <span>
                                    Borrowing Power:{" "}
                                    <span className="text-slate-800 font-bold">
                                      {
                                        acc.member_deposit_attributes
                                          .loan_multiplier_factor
                                      }
                                    </span>
                                  </span>
                                  <span className="text-[10px] text-orange-600 font-bold">
                                    Locked for Loans: KES{" "}
                                    {acc.core_financial_ledger.encumbered_amount.toLocaleString()}
                                  </span>
                                </div>
                              )}
                            {acc.account_identity.product_type ===
                              "share_capital" &&
                              acc.share_capital_attributes && (
                                <div className="flex flex-col gap-0.5">
                                  <span>
                                    Shares Owned:{" "}
                                    <span className="text-slate-800 font-bold">
                                      {acc.share_capital_attributes.total_units_held.toLocaleString()}{" "}
                                      Units
                                    </span>
                                  </span>
                                  <span className="text-[10px] text-blue-600 font-bold">
                                    Dividends Earned: KES{" "}
                                    {acc.core_financial_ledger.interest_accumulated.toLocaleString()}
                                  </span>
                                </div>
                              )}
                            {acc.account_identity.product_type ===
                              "holiday_savings" &&
                              acc.holiday_savings_attributes && (
                                <div className="flex flex-col gap-0.5">
                                  <span>
                                    Withdrawal Period:{" "}
                                    <span className="text-slate-800 font-bold">
                                      {
                                        acc.holiday_savings_attributes
                                          .withdrawal_window
                                      }
                                    </span>
                                  </span>
                                  <span className="text-[10px] text-slate-400">
                                    Interest Earned: KES{" "}
                                    {acc.core_financial_ledger.interest_accumulated.toLocaleString()}
                                  </span>
                                </div>
                              )}
                            {acc.account_identity.product_type ===
                              "education_savings" &&
                              acc.education_savings_attributes && (
                                <div className="flex flex-col gap-0.5">
                                  <span>
                                    Payout Target:{" "}
                                    <span className="text-slate-800 font-bold">
                                      {
                                        acc.education_savings_attributes
                                          .target_disbursement
                                      }
                                    </span>
                                  </span>
                                  <span className="text-[10px] text-indigo-600 font-bold">
                                    Interest Earned: KES{" "}
                                    {acc.core_financial_ledger.interest_accumulated.toLocaleString()}
                                  </span>
                                </div>
                              )}
                            {acc.account_identity.product_type ===
                              "junior_savings" &&
                              acc.junior_savings_attributes && (
                                <div className="flex flex-col gap-0.5">
                                  <span>
                                    Parental Control:{" "}
                                    <span className="text-slate-800 font-bold">
                                      {
                                        acc.junior_savings_attributes
                                          .parental_oversight
                                      }
                                    </span>
                                  </span>
                                  <span className="text-[10px] text-slate-400">
                                    Interest Earned: KES{" "}
                                    {acc.core_financial_ledger.interest_accumulated.toLocaleString()}
                                  </span>
                                </div>
                              )}
                          </td>

                          {/* Col 6: Multi-Row Status Badge Parameters */}
                          <td className="py-4 px-6">
                            <div className="flex flex-col space-y-1.5">
                              <span
                                className={`inline-flex items-center gap-1.5 text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md border w-fit ${
                                  acc.status !== "active"
                                    ? "bg-red-50 border-red-100 text-red-600"
                                    : "bg-emerald-50 border-emerald-100 text-emerald-600"
                                }`}
                              >
                                <span
                                  className={`size-1 rounded-full ${
                                    acc.status !== "active"
                                      ? "bg-red-500"
                                      : "bg-emerald-500"
                                  }`}
                                />
                                {acc.status}
                              </span>
                              {/* REPLACEMENT: Last Activity Tracking */}
                              <span className="text-[10px] text-slate-400 font-medium">
                                Last Active:{" "}
                                <span className="text-slate-600 font-semibold">
                                  {acc.account_identity.last_transaction ||
                                    "No recent activity"}
                                </span>
                              </span>
                            </div>
                          </td>

                          {/* Col 7: Profile Inspection Node Trigger */}
                          <td className="py-4 px-6 text-right pr-8">
                            <button
                              onClick={() => setSelectedAccount(acc)}
                              className="size-8 rounded-xl border border-slate-200/60 inline-flex items-center justify-center text-slate-400 hover:text-[#074073] hover:bg-slate-50 hover:border-slate-300 transition-all shadow-3xs bg-white cursor-pointer"
                              title="Inspect Account Ledger"
                            >
                              <Eye size={14} />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="py-12 text-center text-slate-400 font-medium text-xs"
                      >
                        No active member accounts match your current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 4. SIGNATURE INTERACTIVE SLIDEOUT ADVANCED FILTER PANEL */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex justify-end bg-zinc-950/20"
          >
            <div
              className="absolute inset-0"
              onClick={() => setIsFilterOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white relative w-full max-w-[480px] h-full shadow-2xl border-l border-slate-200 flex flex-col z-10"
            >
              {/* Drawer Top Header Layout */}
              <div className="px-8 pt-8 pb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#074073]">
                    Registry Filters
                  </h2>
                  <p className="text-sm text-slate-500 font-medium">
                    Define parameters to query member records.
                  </p>
                </div>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-2.5 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors text-slate-500 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="border-b mx-8 border-slate-100"></div>

              {/* Form Entry Area Container fields */}
              <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8">
                {/* Search field wrapper row matching layout rules */}
                <FilterField label="Search Query" icon={Search}>
                  <input
                    className="w-full pl-[74px] pr-6 py-5 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all text-xs font-semibold"
                    placeholder="Name or Member ID..."
                    value={filters.q}
                    onChange={(e) =>
                      setFilters({ ...filters, q: e.target.value })
                    }
                  />
                </FilterField>

                {/* Dropdown status selection panel row */}
                <FilterField label="Member Account Status" icon={Hash}>
                  <div className="relative w-full">
                    <button
                      type="button"
                      onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                      className="w-full pl-[74px] pr-5 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all text-xs font-semibold text-left flex items-center justify-between cursor-pointer"
                    >
                      <span
                        className={
                          filters.status
                            ? "text-slate-800 font-bold"
                            : "text-slate-400 font-medium"
                        }
                      >
                        {statusOptions.find(
                          (opt) => opt.value === filters.status,
                        )?.label || "Select status profile..."}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`text-slate-400 transition-transform duration-200 ${statusDropdownOpen ? "rotate-180 text-[#074073]" : ""}`}
                      />
                    </button>

                    <AnimatePresence>
                      {statusDropdownOpen && (
                        <>
                          <div
                            className="fixed inset-0 z-30"
                            onClick={() => setStatusDropdownOpen(false)}
                          />
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            className="absolute left-0 right-0 mt-2 bg-white border border-slate-200/80 rounded-2xl shadow-xl py-2 z-40 overflow-hidden"
                          >
                            {statusOptions.map((opt) => (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                  setFilters({ ...filters, status: opt.value });
                                  setStatusDropdownOpen(false);
                                }}
                                className={`w-full px-6 py-3.5 text-xs text-left font-semibold transition-colors cursor-pointer ${
                                  filters.status === opt.value
                                    ? "bg-blue-50/70 text-[#074073] font-bold"
                                    : "text-slate-600 hover:bg-slate-50"
                                }`}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </FilterField>

                {/* Regional Jurisdiction Constraints layout segment */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Geographical Constraints
                  </p>

                  <FilterField label="County Jurisdiction" icon={Building2}>
                    <input
                      className="w-full pl-[74px] pr-6 py-5 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-[#074073] transition-all text-xs font-semibold"
                      placeholder="e.g. Nairobi, Kisumu"
                      value={filters.county}
                      onChange={(e) =>
                        setFilters({ ...filters, county: e.target.value })
                      }
                    />
                  </FilterField>

                  <FilterField label="Sub-County Node" icon={Map}>
                    <input
                      className="w-full pl-[74px] pr-6 py-5 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-[#074073] transition-all text-xs font-semibold"
                      placeholder="e.g. Westlands, Nyali"
                      value={filters.subcounty}
                      onChange={(e) =>
                        setFilters({ ...filters, subcounty: e.target.value })
                      }
                    />
                  </FilterField>
                </div>

                {/* Timeline framework layout matrix split parameter row */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Registration Lifecycles
                  </p>
                  <div className="flex flex-row items-center gap-4 w-full">
                    <FilterField label="From Date" icon={Calendar}>
                      <input
                        type="date"
                        className="w-full pl-[74px] pr-4 py-5 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white text-xs font-bold uppercase text-slate-700"
                        value={filters.fromDate}
                        onChange={(e) =>
                          setFilters({ ...filters, fromDate: e.target.value })
                        }
                      />
                    </FilterField>
                    <FilterField label="To Date" icon={Calendar}>
                      <input
                        type="date"
                        className="w-full pl-[74px] pr-4 py-5 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white text-xs font-bold uppercase text-slate-700"
                        value={filters.toDate}
                        onChange={(e) =>
                          setFilters({ ...filters, toDate: e.target.value })
                        }
                      />
                    </FilterField>
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer panel pinned baseline layout */}
              <div className="p-8 py-5 border-t border-slate-100 flex gap-3 bg-white">
                <button
                  onClick={handleResetFilters}
                  className="flex-1 h-14 font-bold text-xs bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-all cursor-pointer"
                >
                  Reset All
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="flex-[2] h-14 font-bold text-xs bg-[#074073] text-white rounded-2xl hover:bg-[#052d52] transition-all shadow-lg shadow-blue-900/10 cursor-pointer"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. INDIVIDUAL ACCOUNT VIEW BREAKOUT INTERFACE */}
      <AnimatePresence>
        {selectedAccount && (
          <div className="fixed inset-0 z-[110] flex justify-end">
            <div
              className="absolute inset-0 bg-primary/10 backdrop-blur-xs"
              onClick={() => setSelectedAccount(null)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26 }}
              className="bg-white w-full max-w-md h-full relative z-10 p-8 shadow-2xl flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-black tracking-widest text-[#074073] uppercase bg-blue-50 border border-blue-100 px-2 py-0.5 rounded">
                      Audit Profile Ledger
                    </span>
                    <h3 className="text-xl font-black text-primary tracking-tight pt-2">
                      {selectedAccount.account_identity.customer_name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedAccount(null)}
                    className="size-9 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full flex items-center justify-center cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="border-b border-slate-100" />

                {/* Financial balances lists blocks */}
                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Cleared Balance Matrix
                  </p>
                  <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-2xl space-y-3 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-sans font-semibold">
                        Total Book Balance
                      </span>
                      <span className="font-bold text-primary">
                        KES{" "}
                        {selectedAccount.core_financial_ledger.current_balance.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-sans font-semibold">
                        Available Liquidity Pool
                      </span>
                      <span className="font-bold text-emerald-600">
                        KES{" "}
                        {selectedAccount.core_financial_ledger.free_unencumbered_balance.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-sans font-semibold">
                        Collateral Guarantee Lien
                      </span>
                      <span className="font-bold text-rose-600">
                        KES{" "}
                        {selectedAccount.core_financial_ledger.encumbered_amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Regional traceability details metadata block wrapper layout */}
                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Jurisdiction Tracking
                  </p>
                  <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-2xl space-y-2 font-sans text-xs font-semibold text-slate-600">
                    <div className="flex justify-between">
                      <span>County Location</span>
                      <span className="text-primary">
                        {selectedAccount.account_identity.county}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sub-County Node</span>
                      <span className="text-primary">
                        {selectedAccount.account_identity.subcounty}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedAccount(null)}
                className="w-full h-14 bg-primary text-white font-bold rounded-xl text-xs uppercase tracking-wider cursor-pointer"
              >
                Close Audit Profile
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// INTERNAL REUSABLE STATS INFRASTRUCTURE COMPONENT
const StatTile = ({ icon, label, value, desc }) => (
  <div className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs p-5 flex items-start gap-4">
    <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl shrink-0">
      {icon}
    </div>
    <div className="space-y-0.5 min-w-0">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">
        {label}
      </p>
      <p className="text-xl font-black text-primary tracking-tight">{value}</p>
      <p className="text-[11px] text-slate-400 font-medium truncate">{desc}</p>
    </div>
  </div>
);
