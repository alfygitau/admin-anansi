import React, { useState, useMemo } from "react";
import {
  Wallet,
  Calendar,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  Activity,
  Eye,
  Search,
  PlusCircle,
  Copy,
  Check,
  Baby,
  BookOpen,
  Sun,
} from "lucide-react";

// 1. Comprehensive Global Product Attributes Mapping Definition
const PRODUCTS_CATALOG = [
  {
    id: "eab1ba28-4867-4762-a3aa-ab5d6e557482",
    name: "Fixed Term Deposits",
    type: "fixed_term_deposit",
    icon: <Calendar size={22} />,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "group-hover:border-purple-200",
    summary:
      "High-yield investment instruments with locked contract periods and guaranteed returns.",
    attributes: [
      { label: "Target Yield Profile", value: "Up to 12.00% p.a." },
      { label: "Lock Maturities", value: "90 — 365 Days" },
      { label: "Early Payout Penalty", value: "2.50% Principal Deduct" },
      { label: "Default Maturity Action", value: "Auto-Rollover Principal" },
    ],
  },
  {
    id: "d9c28ea1-1122-3344-5566-778899aabbcc",
    name: "Member Deposits (Savings)",
    type: "member_deposits",
    icon: <Wallet size={22} />,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "group-hover:border-emerald-200",
    summary:
      "Core withdrawable savings acting as internal credit underwriting collateral parameters.",
    attributes: [
      { label: "Min Monthly Contribution", value: "KES 1,000.00" },
      { label: "Loan Multiplier Power", value: "3.0x — 4.0x Deposits" },
      { label: "Statutory Exit Notice", value: "60 Days Required" },
      { label: "Annual Return Mechanics", value: "Rebates / Cash Interest" },
    ],
  },
  {
    id: "1f30885f-15d3-47b3-91e4-dda7013a9fcc",
    name: "Share Capital (Equity)",
    type: "share_capital",
    icon: <ShieldCheck size={22} />,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "group-hover:border-blue-200",
    summary:
      "Permanent institutional owner equity, non-withdrawable statutory voting blocks.",
    attributes: [
      { label: "Nominal Share Price", value: "KES 20.00 / Unit" },
      { label: "Membership Floor Quorum", value: "100 Units Mandatory" },
      { label: "Liquidation Mechanics", value: "Fully Transferable Only" },
      { label: "Annual Return Mechanics", value: "Profit-Based Dividends" },
    ],
  },
  {
    id: "a2b3c4d5-e6f7-4890-a1b2-c3d4e5f6a7b8",
    name: "Holiday Savings",
    type: "holiday_savings",
    icon: <Sun size={22} />,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "group-hover:border-orange-200",
    summary:
      "Short-term targeted savings account for holiday planning with seasonal access.",
    attributes: [
      { label: "Target Season", value: "Nov — Dec Annual" },
      { label: "Contribution Limit", value: "None" },
      { label: "Withdrawal Window", value: "November Only" },
      { label: "Interest Rate", value: "4.00% p.a." },
    ],
  },
  {
    id: "b3c4d5e6-f7a8-4901-b2c3-d4e5f6a7b8c9",
    name: "Education Savings",
    type: "education_savings",
    icon: <BookOpen size={22} />,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "group-hover:border-indigo-200",
    summary: "Dedicated fund for school fees and academic expenditures.",
    attributes: [
      { label: "Min Balance", value: "KES 5,000.00" },
      { label: "Fee Payment Facility", value: "Direct to Institution" },
      { label: "Disbursement Window", value: "Term Start" },
      { label: "Yield", value: "6.50% p.a." },
    ],
  },
  {
    id: "c4d5e6f7-a8b9-4012-c3d4-e5f6a7b8c9d0",
    name: "Junior Savings Account",
    type: "junior_savings",
    icon: <Baby size={22} />,
    color: "text-pink-600",
    bg: "bg-pink-50",
    border: "group-hover:border-pink-200",
    summary:
      "Custodial accounts for minors to encourage long-term financial literacy.",
    attributes: [
      { label: "Age Eligibility", value: "0 — 17 Years" },
      { label: "Parental Oversight", value: "Mandatory" },
      { label: "Maturity Event", value: "18th Birthday" },
      { label: "Interest Rate", value: "5.00% p.a." },
    ],
  },
];

export default function AccountsPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const [accounts] = useState([
    {
      account_identity: {
        id: "e8f191f3-0b35-34fb-c442-c6b62c6a0fd1",
        account_number: "0100100002752",
        account_code: "2752",
        customer_id: "a8426991-3061-d0e7-7fd6-019456264e89",
        customer_name: "Almasi Achieng Aluoch",
        public_id: "SJS224",
        product_id: "eab1ba28-4867-4762-a3aa-ab5d6e557482",
        product_type: "fixed_term_deposit",
        currency_code: "KES",
      },
      core_financial_ledger: {
        current_balance: "250201.00",
        overdraft_limit: "0.00",
        interest_rate_accumulated: "201.00",
        free_unencumbered_balance: "250201.00",
        encumbered_amount: "0.00",
        guarantor_bonded_amount: "0.00",
      },
      share_capital_attributes: null,
      member_deposit_attributes: null,
      fixed_term_deposit_attributes: {
        principal_booked_amount: "250000.00",
        contract_interest_rate: "11.5000",
        min_lock_duration_days: 90,
        max_lock_duration_days: 365,
        booking_date: "2026-03-19T08:48:49.395Z",
        maturity_date: "2026-09-19T08:48:49.395Z",
        accrued_interest_ledger: "201.00",
        early_withdrawal_penalty_rate: "2.5000",
        payout_frequency_type: "on_maturity",
        on_maturity_action: "auto_rollover_principal",
      },
      operational_governance: {
        status: "active",
        is_swerv: false,
        mobile_web_access: true,
        can_transact: true,
        version: 7,
        created_at: "2026-03-19T08:48:49.395Z",
        updated_at: "2026-05-27T08:18:43.746Z",
        last_access: "2026-06-16T08:35:35.512Z",
      },
    },
    {
      account_identity: {
        id: "b11a8421-44bb-9cc7-11fd-123456789abc",
        account_number: "0100200008491",
        account_code: "8491",
        customer_id: "bc117a8c-99de-44f2-11c6-da4281fbc44d",
        customer_name: "Marcel Auja Ogweno",
        public_id: "SJS394",
        product_id: "d9c28ea1-1122-3344-5566-778899aabbcc",
        product_type: "member_deposits",
        currency_code: "KES",
      },
      core_financial_ledger: {
        current_balance: "185000.00",
        overdraft_limit: "0.00",
        interest_rate_accumulated: "0.00",
        free_unencumbered_balance: "110000.00",
        encumbered_amount: "50000.00",
        guarantor_bonded_amount: "250000.00",
      },
      share_capital_attributes: null,
      member_deposit_attributes: {
        min_periodic_contribution: "1000.00",
        contribution_frequency: "monthly",
        loan_multiplier_factor: "3.0000",
        withdrawal_notice_days: 60,
        earns_rebates: true,
      },
      fixed_term_deposit_attributes: null,
      operational_governance: {
        status: "active",
        is_swerv: false,
        mobile_web_access: true,
        can_transact: true,
        version: 12,
        created_at: "2026-01-10T12:00:00.000Z",
        updated_at: "2026-06-14T10:15:22.110Z",
        last_access: "2026-06-16T14:10:01.000Z",
      },
    },
    {
      account_identity: {
        id: "fa328b12-11da-4bc6-88ef-9876543210fe",
        account_number: "0100900005432",
        account_code: "5432",
        customer_id: "fa328b12-45aa-9cc1-7dd7-eb4b14ade99a",
        customer_name: "Beatrice Wangari Kamau",
        public_id: "SJS402",
        product_id: "1f30885f-15d3-47b3-91e4-dda7013a9fcc",
        product_type: "share_capital",
        currency_code: "KES",
      },
      core_financial_ledger: {
        current_balance: "40000.00",
        overdraft_limit: "0.00",
        interest_rate_accumulated: "0.00",
        free_unencumbered_balance: "40000.00",
        encumbered_amount: "0.00",
        guarantor_bonded_amount: "0.00",
      },
      share_capital_attributes: {
        total_units_held: 2000,
        share_unit_price: "20.00",
        min_share_units_required: 100,
        is_transferable: true,
        max_share_holding_limit_percent: "10.0000",
        dividend_earned_accumulated: "3200.00",
        is_locked_for_membership: true,
      },
      member_deposit_attributes: null,
      fixed_term_deposit_attributes: null,
      operational_governance: {
        status: "active",
        is_swerv: false,
        mobile_web_access: true,
        can_transact: false,
        version: 3,
        created_at: "2026-04-11T08:12:00.000Z",
        updated_at: "2026-06-01T16:45:00.000Z",
        last_access: "2026-06-15T11:22:00.000Z",
      },
    },
    {
      account_identity: {
        id: "c2874bc1-3521-4def-99a0-de8a2095cc1a",
        account_number: "0100100009941",
        account_code: "9941",
        customer_id: "92837bc1-445a-8812-7cc6-ca4281fbc44d",
        customer_name: "Sarah Atieno Odhiambo",
        public_id: "SJS501",
        product_id: "eab1ba28-4867-4762-a3aa-ab5d6e557482",
        product_type: "fixed_term_deposit",
        currency_code: "KES",
      },
      core_financial_ledger: {
        current_balance: "504500.00",
        overdraft_limit: "0.00",
        interest_rate_accumulated: "4500.00",
        free_unencumbered_balance: "504500.00",
        encumbered_amount: "0.00",
        guarantor_bonded_amount: "0.00",
      },
      share_capital_attributes: null,
      member_deposit_attributes: null,
      fixed_term_deposit_attributes: {
        principal_booked_amount: "500000.00",
        contract_interest_rate: "12.0000",
        min_lock_duration_days: 180,
        max_lock_duration_days: 365,
        booking_date: "2026-01-15T10:00:00.000Z",
        maturity_date: "2026-07-15T10:00:00.000Z",
        accrued_interest_ledger: "4500.00",
        early_withdrawal_penalty_rate: "3.0000",
        payout_frequency_type: "on_maturity",
        on_maturity_action: "auto_rollover_total",
      },
      operational_governance: {
        status: "active",
        is_swerv: false,
        mobile_web_access: true,
        can_transact: true,
        version: 5,
        created_at: "2026-01-15T10:00:00.000Z",
        updated_at: "2026-06-10T09:30:15.000Z",
        last_access: "2026-06-16T15:44:12.211Z",
      },
    },
    {
      account_identity: {
        id: "da4182f2-9bc0-4f1d-aa88-5cbf86d5e032",
        account_number: "0100200003114",
        account_code: "3114",
        customer_id: "3388a12e-bc99-4a11-88d7-fb4b14ade99a",
        customer_name: "David Mwangi Njoroge",
        public_id: "SJS502",
        product_id: "d9c28ea1-1122-3344-5566-778899aabbcc",
        product_type: "member_deposits",
        currency_code: "KES",
      },
      core_financial_ledger: {
        current_balance: "312000.00",
        overdraft_limit: "0.00",
        interest_rate_accumulated: "0.00",
        free_unencumbered_balance: "212000.00",
        encumbered_amount: "100000.00",
        guarantor_bonded_amount: "50000.00",
      },
      share_capital_attributes: null,
      member_deposit_attributes: {
        min_periodic_contribution: "2000.00",
        contribution_frequency: "monthly",
        loan_multiplier_factor: "4.0000",
        withdrawal_notice_days: 60,
        earns_rebates: true,
      },
      fixed_term_deposit_attributes: null,
      operational_governance: {
        status: "active",
        is_swerv: false,
        mobile_web_access: true,
        can_transact: true,
        version: 9,
        created_at: "2025-05-20T14:20:00.000Z",
        updated_at: "2026-06-12T11:22:04.000Z",
        last_access: "2026-06-16T08:12:33.000Z",
      },
    },
    {
      account_identity: {
        id: "9f32bc11-a88f-41cc-b22e-ddcf2911bca0",
        account_number: "0100900008819",
        account_code: "8819",
        customer_id: "7766b22f-cd88-4b22-99e8-ec5c25bde00b",
        customer_name: "Jane W Mwende",
        public_id: "SJS503",
        product_id: "1f30885f-15d3-47b3-91e4-dda7013a9fcc",
        product_type: "share_capital",
        currency_code: "KES",
      },
      core_financial_ledger: {
        current_balance: "60000.00",
        overdraft_limit: "0.00",
        interest_rate_accumulated: "0.00",
        free_unencumbered_balance: "60000.00",
        encumbered_amount: "0.00",
        guarantor_bonded_amount: "0.00",
      },
      share_capital_attributes: {
        total_units_held: 3000,
        share_unit_price: "20.00",
        min_share_units_required: 100,
        is_transferable: true,
        max_share_holding_limit_percent: "10.0000",
        dividend_earned_accumulated: "5400.00",
        is_locked_for_membership: true,
      },
      member_deposit_attributes: null,
      fixed_term_deposit_attributes: null,
      operational_governance: {
        status: "active",
        is_swerv: true,
        mobile_web_access: true,
        can_transact: true,
        version: 4,
        created_at: "2026-06-10T11:30:00.000Z",
        updated_at: "2026-06-16T12:00:00.000Z",
        last_access: "2026-06-16T15:30:22.000Z",
      },
    },
  ]);

  const productAccounts = useMemo(() => {
    if (!selectedProduct) return [];
    return accounts
      .filter((acc) => acc.account_identity.product_id === selectedProduct.id)
      .filter(
        (acc) =>
          acc.account_identity.account_number.includes(searchQuery) ||
          acc.account_identity.customer_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          acc.account_identity.public_id
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
  }, [selectedProduct, accounts, searchQuery]);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full bg-slate-50/50 antialiased text-slate-800">
      {/* 1. MANAGEMENT NAV BREADCRUMB HEADER */}
      <div className="mb-8 border-b border-slate-200/60 pb-6 select-none">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
          <button
            onClick={() => {
              setSelectedProduct(null);
              setSelectedAccount(null);
            }}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Product Catalog
          </button>
          {selectedProduct && (
            <>
              <ChevronLeft size={12} className="text-slate-300" />
              <span className="text-primary font-semibold">
                {selectedProduct.name} Active Registry
              </span>
            </>
          )}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-primary tracking-tight">
              {selectedProduct
                ? `${selectedProduct.name} Account Registry`
                : "SACCO Financial Products"}
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-1">
              {selectedProduct
                ? `Auditing active member ledger bindings and liquid asset limits for ${selectedProduct.name}.`
                : "Manage statutory share distributions, collateral deposit accounts, and locked term contracts."}
            </p>
          </div>
          {selectedProduct && (
            <button className="flex items-center gap-2 h-10 px-4 bg-primary hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-3xs cursor-pointer">
              <PlusCircle size={14} /> Provision New Account
            </button>
          )}
        </div>
      </div>

      {/* 2. CONDITIONAL VIEW LOGIC DISPOSITION */}
      {!selectedProduct ? (
        /* VIEW A: DETAILED SYSTEM PRODUCT CONFIG CATALOG CARDS */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch animate-in fade-in slide-in-from-bottom-2 duration-200">
          {PRODUCTS_CATALOG.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-slate-200/70 p-6 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-slate-300/80 group transition-all"
            >
              <div className="space-y-4">
                {/* Header Icon strip */}
                <div className="flex items-center gap-2">
                  <div
                    className={`p-3 rounded-xl inline-block ${prod.bg} ${prod.color} border border-slate-100`}
                  >
                    {prod.icon}
                  </div>
                  <h3 className="font-extrabold text-primary text-lg group-hover:text-primary transition-colors">
                    {prod.name}
                  </h3>
                </div>
                {/* Product Copy text summaries */}
                <div className="space-y-1">
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">
                    {prod.summary}
                  </p>
                </div>

                {/* HIGH-DETAIL COMPILATION CRITERIA GRID */}
                <div className="border-t border-slate-100 pt-4 mt-2 grid grid-cols-1 gap-2.5">
                  {prod.attributes.map((attr, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center bg-slate-50/50 px-3 py-2 rounded-xl border border-slate-100/60 text-xs font-medium"
                    >
                      <span className="text-slate-400 font-semibold">
                        {attr.label}
                      </span>
                      <span className="text-slate-800 font-bold text-[11px]">
                        {attr.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action trigger deck base link */}
              <button
                onClick={() => setSelectedProduct(prod)}
                className="w-full mt-6 h-11 border border-slate-200 text-slate-700 bg-white group-hover:bg-primary group-hover:text-white group-hover:border-primary rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-3xs"
              >
                <span>Access Member Accounts</span>
                <ArrowRight
                  size={13}
                  className="transition-transform group-hover:translate-x-1 duration-200"
                />
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* VIEW B: ACTIVE LEDGERS SUB-REGISTRY LISTINGS TABLE */
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xs overflow-hidden animate-in fade-in duration-150">
          {/* Table Utilities Control Panel */}
          <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by account number, name, or UID..."
                className="w-full h-9 pl-9 pr-4 bg-white border border-slate-200 rounded-xl text-xs font-medium outline-none transition-all focus:border-slate-400 placeholder:text-slate-400"
              />
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setSelectedAccount(null);
                }}
                className="h-9 px-4 border border-slate-200 bg-white text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer"
              >
                Back to Catalog
              </button>
              <button className="h-9 px-4 border border-slate-200 bg-white text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer">
                Export Registry CSV
              </button>
            </div>
          </div>

          {/* Pure HTML Polymorphic Rendering Grid Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse table-auto">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest select-none">
                  <th className="py-4 px-6">Account Routing String</th>
                  <th className="py-4 px-6">Account Holder Name</th>
                  <th className="py-4 px-6 text-right">Ledger Total balance</th>
                  <th className="py-4 px-6">Type Dynamic Metrics</th>
                  <th className="py-4 px-6 text-center">Status</th>
                  <th className="py-4 px-6 text-right pr-8">Audit Ledger</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium">
                {productAccounts.length > 0 ? (
                  productAccounts.map((acc) => (
                    <tr
                      key={acc.account_identity.id}
                      className="hover:bg-slate-50/40 transition-colors group"
                    >
                      {/* Col A: Identity */}
                      <td className="py-4 px-6">
                        <span className="font-mono text-primary font-bold tracking-tight text-sm">
                          {acc.account_identity.account_number.replace(
                            /(\d{4})(\d{5})(\d{4})/,
                            "$1-$2-$3",
                          )}
                        </span>
                      </td>

                      {/* Col B: User Name link binding */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col space-y-0.5">
                          <span className="font-bold text-slate-800 text-sm tracking-tight">
                            {acc.account_identity.customer_name}
                          </span>
                          <span className="font-mono text-[9px] font-bold text-slate-400 tracking-wide">
                            ID REF: {acc.account_identity.public_id}
                          </span>
                        </div>
                      </td>

                      {/* Col C: Total Balances */}
                      <td className="py-4 px-6 text-right">
                        <span className="font-mono text-primary font-black text-sm">
                          {acc.account_identity.currency_code}{" "}
                          {Number(
                            acc.core_financial_ledger.current_balance,
                          ).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </td>

                      {/* Col D: Dynamic Cell Injections (Renders attributes conditioned on active state type) */}
                      <td className="py-4 px-6">
                        {acc.account_identity.product_type ===
                          "fixed_term_deposit" &&
                          acc.fixed_term_deposit_attributes && (
                            <div className="flex flex-col text-slate-500 font-semibold gap-0.5">
                              <span>
                                Yield:{" "}
                                <span className="text-slate-800">
                                  {
                                    acc.fixed_term_deposit_attributes
                                      .contract_interest_rate
                                  }
                                  % p.a.
                                </span>
                              </span>
                              <span className="text-[10px] text-slate-400 font-medium">
                                Matures:{" "}
                                {new Date(
                                  acc.fixed_term_deposit_attributes
                                    .maturity_date,
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        {acc.account_identity.product_type ===
                          "member_deposits" &&
                          acc.member_deposit_attributes && (
                            <div className="flex flex-col text-slate-500 font-semibold gap-0.5">
                              <span>
                                Lien Encumbered:{" "}
                                <span className="text-rose-600">
                                  KES{" "}
                                  {Number(
                                    acc.core_financial_ledger.encumbered_amount,
                                  ).toLocaleString()}
                                </span>
                              </span>
                              <span className="text-[10px] text-slate-400 font-medium">
                                Bonded Backup: KES{" "}
                                {Number(
                                  acc.core_financial_ledger
                                    .guarantor_bonded_amount,
                                ).toLocaleString()}
                              </span>
                            </div>
                          )}
                        {acc.account_identity.product_type ===
                          "share_capital" &&
                          acc.share_capital_attributes && (
                            <div className="flex flex-col text-slate-500 font-semibold gap-0.5">
                              <span>
                                Units Held:{" "}
                                <span className="text-slate-800">
                                  {acc.share_capital_attributes.total_units_held.toLocaleString()}{" "}
                                  Shares
                                </span>
                              </span>
                              <span className="text-[10px] text-emerald-600 font-bold">
                                Dividends Accrued: KES{" "}
                                {Number(
                                  acc.share_capital_attributes
                                    .dividend_earned_accumulated,
                                ).toLocaleString()}
                              </span>
                            </div>
                          )}
                      </td>

                      {/* Col E: Status */}
                      <td className="py-4 px-6 text-center">
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded">
                          <Activity size={10} />{" "}
                          {acc.operational_governance.status}
                        </span>
                      </td>

                      {/* Col F: Audit actions */}
                      <td className="py-4 px-6 text-right pr-8">
                        <button
                          onClick={() => setSelectedAccount(acc)}
                          className="size-8 rounded-xl border border-slate-200 inline-flex items-center justify-center text-slate-400 hover:text-primary hover:bg-slate-50 hover:border-slate-300 transition-all shadow-3xs bg-white cursor-pointer"
                        >
                          <Eye size={13} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-12 text-center text-slate-400 font-medium text-xs"
                    >
                      No active member accounts match the requested filter
                      strings.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. AUDIT RECONCILIATION SLIDE DRAWER WINDOW */}
      {selectedAccount && (
        <div className="fixed inset-0 z-50 flex justify-end select-none">
          <div
            className="absolute inset-0 bg-primary/10  transition-opacity duration-200"
            onClick={() => setSelectedAccount(null)}
          />
          <div className="fixed top-0 right-0 h-screen w-full max-w-lg bg-white shadow-2xl border-l border-slate-200 p-8 overflow-y-auto flex flex-col justify-between animate-in slide-in-from-right duration-200 z-50">
            <div className="space-y-6">
              {/* Drawer Header Block */}
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-extrabold text-purple-700 uppercase tracking-widest bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-md">
                    Account Integrity Audit
                  </span>
                  <h3 className="text-lg font-black text-primary tracking-tight pt-1">
                    {selectedAccount.account_identity.customer_name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs font-mono text-slate-400 bg-slate-50 p-2 rounded-xl border border-slate-100 mt-1">
                    <span>
                      Acc No: {selectedAccount.account_identity.account_number}
                    </span>
                    <button
                      onClick={() =>
                        handleCopy(
                          selectedAccount.account_identity.account_number,
                          "drawer-acc",
                        )
                      }
                      className="text-slate-400 hover:text-slate-600 ml-1 cursor-pointer"
                    >
                      {copiedId === "drawer-acc" ? (
                        <Check size={11} className="text-emerald-500" />
                      ) : (
                        <Copy size={11} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-b border-slate-100" />

              {/* SECTION A: FINANCIAL LEDGER SUB-BALANCES */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                  Cleared Balance Distribution Matrix
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100/80 font-medium">
                  <DrawerMetaBlock
                    label="Current Book Balance"
                    value={`KES ${Number(selectedAccount.core_financial_ledger.current_balance).toLocaleString()}`}
                    isBold
                  />
                  <DrawerMetaBlock
                    label="Unencumbered Balance"
                    value={`KES ${Number(selectedAccount.core_financial_ledger.free_unencumbered_balance).toLocaleString()}`}
                    isEmerald
                  />
                  <DrawerMetaBlock
                    label="Active Repayment Lien"
                    value={`KES ${Number(selectedAccount.core_financial_ledger.encumbered_amount).toLocaleString()}`}
                    isRose
                  />
                  <DrawerMetaBlock
                    label="Guarantor Bonded Lock"
                    value={`KES ${Number(selectedAccount.core_financial_ledger.guarantor_bonded_amount).toLocaleString()}`}
                    isBold
                  />
                </div>
              </div>

              {/* SECTION B: CONDITIONAL ATTRIBUTES EXPANSION */}
              {selectedAccount.account_identity.product_type ===
                "fixed_term_deposit" &&
                selectedAccount.fixed_term_deposit_attributes && (
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                      Fixed Term Contract Milestones
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-xs bg-purple-50/30 p-4 rounded-2xl border border-purple-100/50 font-medium">
                      <DrawerMetaBlock
                        label="Principal Amount Booked"
                        value={`KES ${Number(selectedAccount.fixed_term_deposit_attributes.principal_booked_amount).toLocaleString()}`}
                      />
                      <DrawerMetaBlock
                        label="Contract Locked Yield"
                        value={`${selectedAccount.fixed_term_deposit_attributes.contract_interest_rate}% p.a.`}
                      />
                      <DrawerMetaBlock
                        label="Contract Booking Date"
                        value={new Date(
                          selectedAccount.fixed_term_deposit_attributes
                            .booking_date,
                        ).toLocaleDateString()}
                      />
                      <DrawerMetaBlock
                        label="Contract Maturity Date"
                        value={new Date(
                          selectedAccount.fixed_term_deposit_attributes
                            .maturity_date,
                        ).toLocaleDateString()}
                      />
                      <DrawerMetaBlock
                        label="Accrued Daily Interest"
                        value={`KES ${selectedAccount.fixed_term_deposit_attributes.accrued_interest_ledger}`}
                      />
                      <DrawerMetaBlock
                        label="Post-Maturity Instructions"
                        value={selectedAccount.fixed_term_deposit_attributes.on_maturity_action.replace(
                          /_/g,
                          " ",
                        )}
                      />
                    </div>
                  </div>
                )}

              {selectedAccount.account_identity.product_type ===
                "member_deposits" &&
                selectedAccount.member_deposit_attributes && (
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                      Savings Contribution Constraints
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-xs bg-emerald-50/30 p-4 rounded-2xl border border-emerald-100/50 font-medium">
                      <DrawerMetaBlock
                        label="Mandatory Contribution"
                        value={`KES ${Number(selectedAccount.member_deposit_attributes.min_periodic_contribution).toLocaleString()} / ${selectedAccount.member_deposit_attributes.contribution_frequency}`}
                      />
                      <DrawerMetaBlock
                        label="Loan Multiplier Factor"
                        value={`${selectedAccount.member_deposit_attributes.loan_multiplier_factor}x Deposits`}
                      />
                      <DrawerMetaBlock
                        label="Exit Notice Window"
                        value={`${selectedAccount.member_deposit_attributes.withdrawal_notice_days} Days`}
                      />
                      <DrawerMetaBlock
                        label="Rebate Earning Tier"
                        value={
                          selectedAccount.member_deposit_attributes
                            .earns_rebates
                            ? "Eligible"
                            : "Exempt"
                        }
                      />
                    </div>
                  </div>
                )}

              {selectedAccount.account_identity.product_type ===
                "share_capital" &&
                selectedAccount.share_capital_attributes && (
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                      Share Ownership Structural Constraints
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-xs bg-blue-50/30 p-4 rounded-2xl border border-blue-100/50 font-medium">
                      <DrawerMetaBlock
                        label="Total Shares Accounted"
                        value={`${selectedAccount.share_capital_attributes.total_units_held.toLocaleString()} Units`}
                      />
                      <DrawerMetaBlock
                        label="Price Per Unit Block"
                        value={`KES ${selectedAccount.share_capital_attributes.share_unit_price}`}
                      />
                      <DrawerMetaBlock
                        label="Statutory Quorum Membership Limit"
                        value={`${selectedAccount.share_capital_attributes.min_share_units_required} Units`}
                      />
                      <DrawerMetaBlock
                        label="Equity Assignment Rights"
                        value={
                          selectedAccount.share_capital_attributes
                            .is_transferable
                            ? "Fully Transferable"
                            : "Locked Equity"
                        }
                      />
                    </div>
                  </div>
                )}

              {/* SECTION C: SYSTEM ACCESS STATS */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                  System Traceability Metadata
                </h4>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-[11px] font-medium text-slate-500">
                  <div className="flex justify-between">
                    <span>Database Mutation Tracking</span>
                    <span className="font-mono text-slate-700">
                      Schema version{" "}
                      {selectedAccount.operational_governance.version}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Record Creation Timestamp</span>
                    <span className="text-slate-700">
                      {new Date(
                        selectedAccount.operational_governance.created_at,
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Core Balance Mutation</span>
                    <span className="text-slate-700">
                      {new Date(
                        selectedAccount.operational_governance.updated_at,
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>API Last Access Ping</span>
                    <span className="text-slate-700">
                      {new Date(
                        selectedAccount.operational_governance.last_access,
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Downstream Actions Toolbar */}
            <div className="pt-6 border-t border-slate-100 flex gap-3">
              <button className="flex-1 h-11 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer">
                Modify Restrictions
              </button>
              <button className="flex-1 h-11 bg-primary text-white hover:bg-slate-800 text-xs font-bold rounded-xl transition-all cursor-pointer">
                Adjust Balance Node
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const DrawerMetaBlock = ({
  label,
  value,
  isBold = false,
  isEmerald = false,
  isRose = false,
}) => (
  <div>
    <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wide">
      {label}
    </span>
    <span
      className={`block font-mono text-xs mt-0.5 ${
        isBold
          ? "font-bold text-primary"
          : isEmerald
            ? "font-bold text-emerald-600"
            : isRose
              ? "font-bold text-rose-600"
              : "text-slate-700"
      }`}
    >
      {value || "N/A"}
    </span>
  </div>
);
