import React from "react";
import {
  ArrowLeft,
  Edit3,
  Power,
  Settings,
  FileText,
  ShieldCheck,
  Sliders,
  DollarSign,
  Calendar,
  Layers,
  Layers3,
  Percent,
  TrendingUp,
  Users,
  AlertTriangle,
  Briefcase,
  Clock,
  ShieldAlert,
  Wallet,
} from "lucide-react";

export default function LoanProduct() {
  const product = {
    id: "c2e4e26e-5071-4eb0-ab89-26732c208ece",
    product_code: "Development_loan",
    product_name: "Development Loan",
    description:
      "Long-term development loan requiring full credit committee review and asset evaluation protocols.",
    is_active: true,
    org_code: "BA208",
    loan_mode: 1,
    min_amount: "50,000.00",
    max_amount: "5,000,000.00",
    min_period: 6,
    max_period: 60,
    limit_algorithm: "fixed",
    limit_start_amount: "0.00",
    limit_increment_amount: "0.00",
    limit_start_multiplier: "1.5000",
    limit_increment_multiplier: "0.5000",
    limit_max_multiplier: "3.0000",
    limit_multiplier_basis: "savings",
    limit_resets_on_default: true,
    interest_rate: "1.5000",
    interest_key: "pm",
    interest_method: "reducing_balance",
    repayment_interval: "Monthly",
    duration_key: "pm",
    processing_fee_type: "percentage",
    processing_fee_value: "1.0000",
    deduct_fee_from_principal: true,
    has_insurance: true,
    insurance_rate: "0.5000",
    has_penalty: true,
    penalty_type: "percentage_of_outstanding",
    penalty_value: "5.0000",
    penalty_frequency: "monthly",
    grace_period_days: 30,
    penalty_grace_period_days: 0,
    penalty_cap_days: 0,
    max_penalty_rate: "20.0000",
    workflow_type: "committee_and_manager",
    auto_disburse: false,
    committee_approvals_required: 3,
    requires_manager_approval: true,
    committee_group_id: "credit-committee-group-uuid",
    allowed_disbursement_methods: ["MPESA", "BANK"],
    requires_guarantor: true,
    min_guarantors: 2,
    max_guarantors: 4,
    guarantor_required_above_amount: "0.00",
    guarantor_coverage_percent: "100.0000",
    min_membership_months: 6,
    min_shares_amount: "100,000.00",
    min_savings_amount: "20,000.00",
    max_loan_to_shares_ratio: "5.0000",
    max_loan_to_savings_ratio: "0.0000",
    max_active_loans_of_type: 1,
    max_total_active_loans: 2,
    blocked_concurrent_loan_types: ["Development_loan"],
    allowed_concurrent_loan_types: [],
    block_if_defaulted: true,
    min_repayment_percent_before_reapply: "100.0000",
    block_if_guarantor_on_defaulted: true,
    required_kyc_level: 1,
    allows_rollover: false,
    allows_topup: true,
    min_repayment_percent_for_topup: "50.0000",
    moratorium_months: 0,
    moratorium_interest_handling: "interest_only",
    requires_collateral: false,
    collateral_description:
      "Logbook, title deed, or other acceptable collateral documents recognized by legal board registries.",
    allowed_currencies: ["KES"],
    created_at: "2026-05-25T08:21:10.809Z",
    updated_at: "2026-06-15T14:40:02.114Z",
  };

  return (
    <div className="w-full space-y-5 antialiased text-slate-800">
      {/* EXECUTIVE COMMAND LAYER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200/60 pb-6 select-none">
        <div className="flex items-center gap-4">
          <button className="size-10 rounded-xl border border-slate-200/80 bg-white flex items-center justify-center text-slate-500 hover:text-primary hover:bg-slate-50 transition-all shadow-sm cursor-pointer">
            <ArrowLeft size={16} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-primary">
                {product.product_name}
              </h1>
              <span
                className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 ${
                  product.is_active
                    ? "bg-success/10 text-success"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                <span
                  className={`size-1 rounded-full ${product.is_active ? "bg-success" : "bg-slate-400"}`}
                />
                {product.is_active ? "Active" : "Deactivated"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            className={`h-11 px-4 border rounded-xl flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer bg-white ${
              product.is_active
                ? "border-rose-100 text-error hover:bg-rose-50"
                : "border-emerald-100 text-success hover:bg-emerald-50"
            }`}
          >
            <Power size={14} />
            <span>
              {product.is_active ? "Suspend Product" : "Activate Product"}
            </span>
          </button>
          <button className="h-11 px-5 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-primary/10 hover:bg-primary/90 transition-all flex items-center gap-2 cursor-pointer">
            <Edit3 size={14} />
            <span>Modify Product</span>
          </button>
        </div>
      </div>

      {/* SYMMETRIC GRID CANVAS: Side by Side on Desktop, 1 Column on Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* CONTAINER 1: SYSTEM TRACE PARAMETERS */}
        <ProfileGridCard
          title="System Trace Parameters"
          icon={<Settings className="text-slate-400" size={16} />}
        >
          <MetricItem
            icon={<Settings />}
            label="Organization Code"
            value={product.org_code}
          />
          <MetricItem
            icon={<Sliders />}
            label="Core Engine Operational Mode"
            value={`Mode Layer ${product.loan_mode}`}
          />
          <MetricItem
            icon={<Wallet />}
            label="Authorized Currencies"
            value={product.allowed_currencies.join(", ")}
          />
          <MetricItem
            icon={<ShieldAlert />}
            label="KYC Gate Authorization"
            value={`Clearance Tier ${product.required_kyc_level}`}
          />
          <MetricItem
            icon={<Clock />}
            label="System Initialization Date"
            value={new Date(product.created_at).toLocaleDateString("en-KE", {
              dateStyle: "long",
            })}
          />
          <MetricItem
            icon={<Clock />}
            label="Last Structural Audit"
            value={new Date(product.updated_at).toLocaleDateString("en-KE", {
              dateStyle: "long",
            })}
          />
          <div className="md:col-span-2 space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2">
              <FileText size={14} className="text-slate-400" />
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                Registry Meta Summary
              </p>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              {product.description}
            </p>
          </div>
        </ProfileGridCard>

        {/* CONTAINER 2: LENDING SIZING BOUNDS */}
        <ProfileGridCard
          title="Lending Size & Thresholds"
          icon={<Sliders className="text-slate-400" size={16} />}
        >
          <MetricItem
            icon={<DollarSign />}
            label="Minimum Capital Borrowing Floor"
            value={`KES ${product.min_amount}`}
          />
          <MetricItem
            icon={<DollarSign />}
            label="Maximum Capital Borrowing Ceiling"
            value={`KES ${product.max_amount}`}
          />
          <MetricItem
            icon={<Calendar />}
            label="Minimum Repayment Period"
            value={`${product.min_period} Months (${product.duration_key})`}
          />
          <MetricItem
            icon={<Calendar />}
            label="Maximum Repayment Period"
            value={`${product.max_period} Months (${product.duration_key})`}
          />
          <MetricItem
            icon={<Layers />}
            label="Max Active Accounts of This Type"
            value={`${product.max_active_loans_of_type} Active Account`}
          />
          <MetricItem
            icon={<Layers3 />}
            label="Max Cumulative Concurrent Loans"
            value={`${product.max_total_active_loans} Total Loans`}
          />
        </ProfileGridCard>

        {/* CONTAINER 3: ALGORITHMIC CRITERIA */}
        <ProfileGridCard
          title="Algorithmic Limit Multipliers & Criteria"
          icon={<TrendingUp className="text-slate-400" size={16} />}
        >
          <MetricItem
            icon={<Settings />}
            label="Calculation Engine Model"
            value={`${product.limit_algorithm} step framework`}
            isCapitalized
          />
          <MetricItem
            icon={<Wallet />}
            label="Multiplier Matrix Evaluation Basis"
            value={product.limit_multiplier_basis}
            isCapitalized
          />
          <MetricItem
            icon={<TrendingUp />}
            label="Base Matrix Start Multiplier"
            value={`${product.limit_start_multiplier}x`}
          />
          <MetricItem
            icon={<TrendingUp />}
            label="Incremental Target Factor Scale"
            value={`+ ${product.limit_increment_multiplier}x`}
          />
          <MetricItem
            icon={<TrendingUp />}
            label="Absolute Cap Multiplier Floor"
            value={`${product.limit_max_multiplier}x`}
          />
          <MetricItem
            icon={<Users />}
            label="Min Membership History Profile"
            value={`${product.min_membership_months} Months Account Age`}
          />
          <MetricItem
            icon={<DollarSign />}
            label="Minimum Allocated Shares Balance"
            value={`KES ${product.min_shares_amount}`}
          />
          <MetricItem
            icon={<DollarSign />}
            label="Minimum Base Savings Floor"
            value={`KES ${product.min_savings_amount}`}
          />
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <BooleanIndicatorLabel
              label="Resets Multipliers On Default"
              active={product.limit_resets_on_default}
            />
            <BooleanIndicatorLabel
              label="Max Loan-to-Shares Ratio"
              value={`${product.max_loan_to_shares_ratio}x`}
              active
            />
            <BooleanIndicatorLabel
              label="Max Loan-to-Savings Ratio"
              value={
                Number(product.max_loan_to_savings_ratio) > 0
                  ? `${product.max_loan_to_savings_ratio}x`
                  : "Unrestricted"
              }
              active={Number(product.max_loan_to_savings_ratio) > 0}
            />
          </div>
        </ProfileGridCard>

        {/* CONTAINER 4: AMORTIZATION PARADIGMS */}
        <ProfileGridCard
          title="Interest, Amortization & Structural Fees"
          icon={<Percent className="text-slate-400" size={16} />}
        >
          <MetricItem
            icon={<Percent />}
            label="Nominal Rate Charge Scale"
            value={`${product.interest_rate}% / Month`}
          />
          <MetricItem
            icon={<Clock />}
            label="Nominal Rate Charge Key"
            value={`Calculated ${product.interest_key.toUpperCase()}`}
          />
          <MetricItem
            icon={<Settings />}
            label="Calculation Amortization Paradigm"
            value={product.interest_method.replace("_", " ")}
            isCapitalized
          />
          <MetricItem
            icon={<Clock />}
            label="Repayment Settlement Intervals"
            value={product.repayment_interval}
          />
          <MetricItem
            icon={<Percent />}
            label="Processing Operational Levy"
            value={`${product.processing_fee_value}% (${product.processing_fee_type})`}
          />
          <MetricItem
            icon={<ShieldCheck />}
            label="Insurance Levy Assessment Fee"
            value={`${product.insurance_rate}% Annualized`}
          />
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <BooleanIndicatorLabel
              label="Deduct Fees Upfront From Principal Ledger"
              active={product.deduct_fee_from_principal}
            />
            <BooleanIndicatorLabel
              label="Enforce Portfolio Insurance Policy Cover"
              active={product.has_insurance}
            />
          </div>
        </ProfileGridCard>

        {/* CONTAINER 5: RISK SAFEGUARDS */}
        <ProfileGridCard
          title="Risk Mitigations, Default Controls & Penalties"
          icon={<ShieldAlert className="text-slate-400" size={16} />}
        >
          <MetricItem
            icon={<Calendar />}
            label="Arrears Accounting Grace Window"
            value={`${product.grace_period_days} Days Grace`}
          />
          <MetricItem
            icon={<AlertTriangle />}
            label="Penalty Assessment Matrix Engine"
            value={product.penalty_type.replace(/_/g, " ")}
            isCapitalized
          />
          <MetricItem
            icon={<Percent />}
            label="Default Delinquency Penalty Rate"
            value={`${product.penalty_value}% / ${product.penalty_frequency}`}
            isCapitalized
          />
          <MetricItem
            icon={<AlertTriangle />}
            label="Absolute Max Penalty Ceiling Cap"
            value={`${product.max_penalty_rate}% Outstanding`}
          />
          <MetricItem
            icon={<Calendar />}
            label="Penalty Computation Intermission"
            value={`${product.penalty_grace_period_days} Days`}
          />
          <MetricItem
            icon={<Calendar />}
            label="Moratorium Window Allocation"
            value={
              product.moratorium_months > 0
                ? `${product.moratorium_months} Months`
                : "No Moratorium Plan"
            }
          />
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <BooleanIndicatorLabel
              label="Enforce Active Penalties"
              active={product.has_penalty}
            />
            <BooleanIndicatorLabel
              label="Restrict Account If Profile Defaults"
              active={product.block_if_defaulted}
            />
            <BooleanIndicatorLabel
              label="Block If Guarantor Is Delinquent"
              active={product.block_if_guarantor_on_defaulted}
            />
          </div>
          <div className="md:col-span-2 space-y-2 mt-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
              Restricted Concurrent Lending Matrix Profiles
            </p>
            <div className="flex flex-wrap gap-2">
              {product.blocked_concurrent_loan_types.map((type) => (
                <span
                  key={type}
                  className="px-3 py-1.5 border border-rose-200/60 bg-rose-50/40 rounded-xl text-xs font-semibold text-error flex items-center gap-1.5 select-none"
                >
                  <AlertTriangle size={12} />
                  System blocks concurrent issuance alongside: {type}
                </span>
              ))}
            </div>
          </div>
        </ProfileGridCard>

        {/* CONTAINER 6: GOVERNANCE WORKFLOWS */}
        <ProfileGridCard
          title="Governance Workflow Logic & Underwriting"
          icon={<Briefcase className="text-slate-400" size={16} />}
        >
          <MetricItem
            icon={<Briefcase />}
            label="Governance Evaluation Pipeline Engine"
            value={product.workflow_type.replace(/_/g, " ")}
            isCapitalized
          />
          <MetricItem
            icon={<Users />}
            label="Committee Authorization Quorum Floor"
            value={`${product.committee_approvals_required} Affirmed Board Votes`}
          />
          <MetricItem
            icon={<ShieldCheck />}
            label="Target Committee Assignment Identifier"
            value={product.committee_group_id}
          />
          <MetricItem
            icon={<Percent />}
            label="Account Clear Factor Before Re-Apply"
            value={`${product.min_repayment_percent_before_reapply}% Restored`}
          />
          <MetricItem
            icon={<Users />}
            label="Minimum Guarantor Sub-Structure"
            value={`${product.min_guarantors} Co-Signers`}
          />
          <MetricItem
            icon={<Users />}
            label="Maximum Guarantor Ceiling Bounds"
            value={`${product.max_guarantors} Co-Signers`}
          />
          <MetricItem
            icon={<Percent />}
            label="Guarantor Liabilities Coverage Factor"
            value={`${product.guarantor_coverage_percent}% Liabilities Net`}
          />
          <MetricItem
            icon={<Percent />}
            label="Min Repayment Ceiling for Top-Up"
            value={`${product.min_repayment_percent_for_topup}% Cleared`}
          />
          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <BooleanIndicatorLabel
              label="Manager Sign-off"
              active={product.requires_manager_approval}
            />
            <BooleanIndicatorLabel
              label="Guarantor Bounds"
              active={product.requires_guarantor}
            />
            <BooleanIndicatorLabel
              label="Auto Disburse"
              active={product.auto_disburse}
            />
            <BooleanIndicatorLabel
              label="Allow Top-Ups"
              active={product.allows_topup}
            />
          </div>
          <div className="md:col-span-2 space-y-2 mt-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
              Allowed Automated Payment Settlement Routing Channels
            </p>
            <div className="flex gap-3">
              {product.allowed_disbursement_methods.map((method) => (
                <span
                  key={method}
                  className="h-11 px-4 border border-primary/20 bg-primary/5 rounded-xl flex items-center justify-center text-xs font-bold text-primary tracking-wide"
                >
                  {method} PLATFORM DISBURSEMENT
                </span>
              ))}
            </div>
          </div>
          <div className="md:col-span-2 space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2">
              <span
                className={`size-1.5 rounded-full ${product.requires_collateral ? "bg-primary" : "bg-slate-400"}`}
              />
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                Physical Collateral Requirements Description
              </p>
            </div>
            <p className="text-xs text-slate-600 font-medium pl-3.5 pt-0.5 leading-relaxed">
              {product.collateral_description}
            </p>
          </div>
        </ProfileGridCard>
      </div>
    </div>
  );
}

/* ==========================================================================
   SUPPORTIVE ATOMIC RENDERING HOOKS FOR TYPOGRAPHIC SCANNABILITY
   ========================================================================== */

const ProfileGridCard = ({ title, icon, children }) => (
  <div className="bg-white border border-slate-200/60 shadow-sm rounded-[24px] overflow-hidden w-full h-full">
    <div className="px-5 py-4 bg-slate-50/60 border-b border-slate-100 flex items-center gap-2.5 select-none">
      <div className="size-7 rounded-lg bg-white border border-slate-200/60 flex items-center justify-center text-slate-400 shadow-2xs">
        {icon}
      </div>
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
        {title}
      </h3>
    </div>
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
      {children}
    </div>
  </div>
);

const MetricItem = ({ icon, label, value, isCapitalized = false }) => (
  <div className="flex items-start gap-3 min-w-0">
    <div className="size-8 rounded-xl bg-slate-50 border border-slate-200/40 flex items-center justify-center text-slate-400 shrink-0 shadow-2xs mt-0.5">
      {React.cloneElement(icon, { size: 15 })}
    </div>
    <div className="min-w-0 flex flex-col">
      <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 leading-none">
        {label}
      </span>
      <span
        className={`text-sm font-medium text-slate-800 tracking-tight mt-1.5 leading-none truncate ${isCapitalized ? "capitalize" : ""}`}
      >
        {value}
      </span>
    </div>
  </div>
);

const BooleanIndicatorLabel = ({ label, value, active }) => (
  <div className="flex items-center justify-between min-w-0 gap-3">
    <span className="text-[11px] font-semibold text-slate-500 truncate">
      {label}
    </span>
    <span
      className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md shrink-0 border ${
        active
          ? "bg-primary/5 border-primary/10 text-primary"
          : "bg-slate-100/80 border-slate-200/40 text-slate-400 line-through"
      }`}
    >
      {value ? value : active ? "Enforced" : "Disabled"}
    </span>
  </div>
);
