import React, { useState } from "react";
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
import { useQuery } from "react-query";
import { getLoanProduct } from "../../sdk/loan-products/loan-products";
import { useToast } from "../../contexts/ToastProvider";
import { useParams } from "react-router-dom";
import * as Sentry from "@sentry/react";

export default function LoanProduct() {
  const [loanProduct, setLoanProduct] = useState({});
  const { showToast } = useToast();
  const { id } = useParams();

  const { isFetching } = useQuery({
    queryKey: ["loan-product", id],
    queryFn: async () => {
      const response = await getLoanProduct(id);
      return response.data.data;
    },
    onSuccess: (data) => {
      setLoanProduct(data);
    },
    onError: (error) => {
      Sentry.captureException(error, {
        tags: { component: "Loan Product", action: "get loan product" },
      });
      showToast({
        title: "Loan Products processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  return (
    <div className="w-full space-y-5 antialiased text-slate-800">
      {/* HEADER ACTIONS */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200/60 pb-6 select-none">
        <div className="flex items-center gap-4">
          <button className="size-10 rounded-xl border border-slate-200/80 bg-white flex items-center justify-center text-slate-500 hover:text-primary hover:bg-slate-50 transition-all shadow-sm cursor-pointer">
            <ArrowLeft size={16} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-primary">
                {loanProduct?.product_name}
              </h1>
              <span
                className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 ${
                  loanProduct?.is_active
                    ? "bg-success/10 text-success"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                <span
                  className={`size-1 rounded-full ${loanProduct?.is_active ? "bg-success" : "bg-slate-400"}`}
                />
                {loanProduct?.is_active ? "Active" : "Deactivated"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            className={`h-11 px-4 border rounded-xl flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer bg-white ${
              loanProduct?.is_active
                ? "border-rose-100 text-error hover:bg-rose-50"
                : "border-emerald-100 text-success hover:bg-emerald-50"
            }`}
          >
            <Power size={14} />
            <span>
              {loanProduct?.is_active ? "Suspend Product" : "Activate Product"}
            </span>
          </button>
          <button className="h-11 px-5 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-primary/10 hover:bg-primary/90 transition-all flex items-center gap-2 cursor-pointer">
            <Edit3 size={14} />
            <span>Edit Product</span>
          </button>
        </div>
      </div>

      {/* SYMMETRIC GRID CANVAS */}
      {isFetching ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start animate-pulse">
          {/* CONTAINER 1: SYSTEM DETAILS */}
          <SkeletonCard metricsCount={6} hasDescription />

          {/* CONTAINER 2: LOAN AMOUNTS & LIMITS */}
          <SkeletonCard metricsCount={6} />

          {/* CONTAINER 3: BORROWING LIMITS & ELIGIBILITY */}
          <SkeletonCard metricsCount={8} bannerCols={3} />

          {/* CONTAINER 4: INTEREST & FEES */}
          <SkeletonCard metricsCount={6} bannerCols={2} />

          {/* CONTAINER 5: PENALTIES & SAFEGUARDS */}
          <SkeletonCard metricsCount={6} bannerCols={3} hasTags />

          {/* CONTAINER 6: APPROVALS & GUARANTORS */}
          <SkeletonCard
            metricsCount={8}
            bannerCols={4}
            hasTags
            hasDescription
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* CONTAINER 1: SYSTEM DETAILS */}
          <ProfileGridCard
            title="System Details"
            icon={<Settings className="text-slate-400" size={16} />}
          >
            <MetricItem
              icon={<Settings />}
              label="Organization Code"
              value={loanProduct?.org_code}
            />
            <MetricItem
              icon={<Sliders />}
              label="Operational Mode"
              value={`Mode ${loanProduct?.loan_mode}`}
            />
            <MetricItem
              icon={<Wallet />}
              label="Allowed Currencies"
              value={loanProduct?.allowed_currencies?.join(", ")}
            />
            <MetricItem
              icon={<ShieldAlert />}
              label="KYC Tier Required"
              value={`Tier ${loanProduct?.required_kyc_level}`}
            />
            <MetricItem
              icon={<Clock />}
              label="Created Date"
              value={new Date(loanProduct?.created_at)?.toLocaleDateString(
                "en-KE",
                {
                  dateStyle: "long",
                },
              )}
            />
            <MetricItem
              icon={<Clock />}
              label="Last Modified Date"
              value={new Date(loanProduct?.updated_at)?.toLocaleDateString(
                "en-KE",
                {
                  dateStyle: "long",
                },
              )}
            />
            <div className="md:col-span-2 space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2">
                <FileText size={14} className="text-slate-400" />
                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  Product Description
                </p>
              </div>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {loanProduct?.description}
              </p>
            </div>
          </ProfileGridCard>

          {/* CONTAINER 2: LOAN AMOUNTS & LIMITS */}
          <ProfileGridCard
            title="Loan Amounts & Limits"
            icon={<Sliders className="text-slate-400" size={16} />}
          >
            <MetricItem
              icon={<DollarSign />}
              label="Minimum Loan Amount"
              value={`KES ${loanProduct?.min_amount}`}
            />
            <MetricItem
              icon={<DollarSign />}
              label="Maximum Loan Amount"
              value={`KES ${loanProduct?.max_amount}`}
            />
            <MetricItem
              icon={<Calendar />}
              label="Minimum Duration"
              value={`${loanProduct?.min_period} Months (${loanProduct?.duration_key})`}
            />
            <MetricItem
              icon={<Calendar />}
              label="Maximum Duration"
              value={`${loanProduct?.max_period} Months (${loanProduct?.duration_key})`}
            />
            <MetricItem
              icon={<Layers />}
              label="Max Active Loans (This Type)"
              value={`${loanProduct?.max_active_loans_of_type} Active Loan`}
            />
            <MetricItem
              icon={<Layers3 />}
              label="Max Total Active Loans"
              value={`${loanProduct?.max_total_active_loans} Total Loans`}
            />
          </ProfileGridCard>

          {/* CONTAINER 3: BORROWING LIMITS & ELIGIBILITY */}
          <ProfileGridCard
            title="Borrowing Limits & Eligibility"
            icon={<TrendingUp className="text-slate-400" size={16} />}
          >
            <MetricItem
              icon={<Settings />}
              label="Limit Calculation Method"
              value={`${loanProduct?.limit_algorithm}`}
              isCapitalized
            />
            <MetricItem
              icon={<Wallet />}
              label="Limit Based On"
              value={loanProduct?.limit_multiplier_basis}
              isCapitalized
            />
            <MetricItem
              icon={<TrendingUp />}
              label="Starting Multiplier"
              value={`${loanProduct?.limit_start_multiplier}x`}
            />
            <MetricItem
              icon={<TrendingUp />}
              label="Multiplier Increase Step"
              value={`+ ${loanProduct?.limit_increment_multiplier}x`}
            />
            <MetricItem
              icon={<TrendingUp />}
              label="Maximum Multiplier"
              value={`${loanProduct?.limit_max_multiplier}x`}
            />
            <MetricItem
              icon={<Users />}
              label="Minimum Membership Duration"
              value={`${loanProduct?.min_membership_months} Months`}
            />
            <MetricItem
              icon={<DollarSign />}
              label="Minimum Shares Required"
              value={`KES ${loanProduct?.min_shares_amount}`}
            />
            <MetricItem
              icon={<DollarSign />}
              label="Minimum Savings Required"
              value={`KES ${loanProduct?.min_savings_amount}`}
            />
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <BooleanIndicatorLabel
                label="Reset Multipliers On Default"
                active={loanProduct?.limit_resets_on_default}
              />
              <BooleanIndicatorLabel
                label="Max Loan-to-Shares Ratio"
                value={`${loanProduct?.max_loan_to_shares_ratio}x`}
                active
              />
              <BooleanIndicatorLabel
                label="Max Loan-to-Savings Ratio"
                value={
                  Number(loanProduct?.max_loan_to_savings_ratio) > 0
                    ? `${loanProduct?.max_loan_to_savings_ratio}x`
                    : "No Limit"
                }
                active={Number(loanProduct?.max_loan_to_savings_ratio) > 0}
              />
            </div>
          </ProfileGridCard>

          {/* CONTAINER 4: INTEREST & FEES */}
          <ProfileGridCard
            title="Interest Rates & Fees"
            icon={<Percent className="text-slate-400" size={16} />}
          >
            <MetricItem
              icon={<Percent />}
              label="Interest Rate"
              value={`${loanProduct?.interest_rate}% / Month`}
            />
            <MetricItem
              icon={<Clock />}
              label="Interest Calculation Frequency"
              value={`Per ${loanProduct?.interest_key?.toUpperCase()}`}
            />
            <MetricItem
              icon={<Settings />}
              label="Interest Calculation Method"
              value={loanProduct?.interest_method?.replace("_", " ")}
              isCapitalized
            />
            <MetricItem
              icon={<Clock />}
              label="Repayment Frequency"
              value={loanProduct?.repayment_interval}
            />
            <MetricItem
              icon={<Percent />}
              label="Processing Fee"
              value={`${loanProduct?.processing_fee_value}% (${loanProduct?.processing_fee_type})`}
            />
            <MetricItem
              icon={<ShieldCheck />}
              label="Insurance Fee"
              value={`${loanProduct?.insurance_rate}% Annualized`}
            />
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <BooleanIndicatorLabel
                label="Deduct Fees Upfront From Loan"
                active={loanProduct?.deduct_fee_from_principal}
              />
              <BooleanIndicatorLabel
                label="Requires Insurance"
                active={loanProduct?.has_insurance}
              />
            </div>
          </ProfileGridCard>

          {/* CONTAINER 5: PENALTIES & SAFEGUARDS */}
          <ProfileGridCard
            title="Penalties & Risk Safeguards"
            icon={<ShieldAlert className="text-slate-400" size={16} />}
          >
            <MetricItem
              icon={<Calendar />}
              label="Repayment Grace Period"
              value={`${loanProduct?.grace_period_days} Days`}
            />
            <MetricItem
              icon={<AlertTriangle />}
              label="Penalty Calculation Method"
              value={loanProduct?.penalty_type?.replace(/_/g, " ")}
              isCapitalized
            />
            <MetricItem
              icon={<Percent />}
              label="Penalty Rate"
              value={`${loanProduct?.penalty_value}% / ${loanProduct?.penalty_frequency}`}
              isCapitalized
            />
            <MetricItem
              icon={<AlertTriangle />}
              label="Maximum Penalty Cap"
              value={`${loanProduct?.max_penalty_rate}% Outstanding`}
            />
            <MetricItem
              icon={<Calendar />}
              label="Penalty Grace Period"
              value={`${loanProduct?.penalty_grace_period_days} Days`}
            />
            <MetricItem
              icon={<Calendar />}
              label="Moratorium Period"
              value={
                loanProduct?.moratorium_months > 0
                  ? `${loanProduct?.moratorium_months} Months`
                  : "None"
              }
            />
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <BooleanIndicatorLabel
                label="Charge Penalties"
                active={loanProduct?.has_penalty}
              />
              <BooleanIndicatorLabel
                label="Block If Loan Defaulted"
                active={loanProduct?.block_if_defaulted}
              />
              <BooleanIndicatorLabel
                label="Block If Guarantor Has Defaulted"
                active={loanProduct?.block_if_guarantor_on_defaulted}
              />
            </div>
            <div className="md:col-span-2 space-y-2 mt-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                Blocked Concurrent Loan Types
              </p>
              <div className="flex flex-wrap gap-2">
                {loanProduct?.blocked_concurrent_loan_types?.map((type) => (
                  <span
                    key={type}
                    className="px-3 py-1.5 border border-rose-200/60 bg-rose-50/40 rounded-xl text-xs font-semibold text-error flex items-center gap-1.5 select-none"
                  >
                    <AlertTriangle size={12} />
                    Cannot be taken alongside: {type}
                  </span>
                ))}
              </div>
            </div>
          </ProfileGridCard>

          {/* CONTAINER 6: APPROVALS & GUARANTORS */}
          <ProfileGridCard
            title="Approvals & Guarantor Rules"
            icon={<Briefcase className="text-slate-400" size={16} />}
          >
            <MetricItem
              icon={<Briefcase />}
              label="Approval Workflow"
              value={loanProduct?.workflow_type?.replace(/_/g, " ")}
              isCapitalized
            />
            <MetricItem
              icon={<Users />}
              label="Committee Approvals Required"
              value={`${loanProduct?.committee_approvals_required} Votes`}
            />
            <MetricItem
              icon={<ShieldCheck />}
              label="Committee Group ID"
              value={loanProduct?.committee_group_id}
            />
            <MetricItem
              icon={<Percent />}
              label="Min Repayment to Re-apply"
              value={`${loanProduct?.min_repayment_percent_before_reapply}% Paid Off`}
            />
            <MetricItem
              icon={<Users />}
              label="Minimum Guarantors Required"
              value={`${loanProduct?.min_guarantors} Guarantors`}
            />
            <MetricItem
              icon={<Users />}
              label="Maximum Guarantors Allowed"
              value={`${loanProduct?.max_guarantors} Guarantors`}
            />
            <MetricItem
              icon={<Percent />}
              label="Guarantor Coverage"
              value={`${loanProduct?.guarantor_coverage_percent}% Covered`}
            />
            <MetricItem
              icon={<Percent />}
              label="Min Repayment for Top-Up"
              value={`${loanProduct?.min_repayment_percent_for_topup}% Paid Off`}
            />
            <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <BooleanIndicatorLabel
                label="Manager Approval"
                active={loanProduct?.requires_manager_approval}
              />
              <BooleanIndicatorLabel
                label="Requires Guarantors"
                active={loanProduct?.requires_guarantor}
              />
              <BooleanIndicatorLabel
                label="Auto Disburse"
                active={loanProduct?.auto_disburse}
              />
              <BooleanIndicatorLabel
                label="Allows Top-Ups"
                active={loanProduct?.allows_topup}
              />
            </div>
            <div className="md:col-span-2 space-y-2 mt-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                Allowed Disbursement Channels
              </p>
              <div className="flex gap-3">
                {loanProduct?.allowed_disbursement_methods?.map((method) => (
                  <span
                    key={method}
                    className="h-11 px-4 border border-primary/20 bg-primary/5 rounded-xl flex items-center justify-center text-xs font-bold text-primary tracking-wide"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:col-span-2 space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2">
                <span
                  className={`size-1.5 rounded-full ${loanProduct?.requires_collateral ? "bg-primary" : "bg-slate-400"}`}
                />
                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  Collateral Requirements
                </p>
              </div>
              <p className="text-xs text-slate-600 font-medium pl-3.5 pt-0.5 leading-relaxed">
                {loanProduct?.collateral_description}
              </p>
            </div>
          </ProfileGridCard>
        </div>
      )}
    </div>
  );
}

const SkeletonCard = ({
  metricsCount = 6,
  bannerCols = 0,
  hasTags = false,
  hasDescription = false,
}) => (
  <div className="bg-white border border-slate-200/60 shadow-sm rounded-[24px] overflow-hidden w-full h-full">
    {/* Header Placeholder */}
    <div className="px-5 py-4 bg-slate-50/60 border-b border-slate-100 flex items-center gap-2.5">
      <div className="size-7 rounded-lg bg-slate-200 shrink-0" />
      <div className="h-3.5 w-40 bg-slate-200 rounded-md" />
    </div>

    {/* Body Grid Placeholder */}
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
      {Array.from({ length: metricsCount }).map((_, i) => (
        <SkeletonMetricItem key={i} />
      ))}

      {/* Status Indicators Banner Placeholder */}
      {bannerCols > 0 && (
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
          {Array.from({ length: bannerCols }).map((_, i) => (
            <div key={i} className="flex items-center justify-between gap-3">
              <div className="h-3 w-24 bg-slate-200 rounded-md" />
              <div className="h-5 w-14 bg-slate-200 rounded-md shrink-0" />
            </div>
          ))}
        </div>
      )}

      {/* Tag List Placeholder */}
      {hasTags && (
        <div className="md:col-span-2 space-y-2 mt-1">
          <div className="h-2.5 w-44 bg-slate-200 rounded-md ml-1" />
          <div className="flex flex-wrap gap-2">
            <div className="h-8 w-56 bg-slate-100 border border-slate-200/60 rounded-xl" />
            <div className="h-8 w-40 bg-slate-100 border border-slate-200/60 rounded-xl" />
          </div>
        </div>
      )}

      {/* Description Callout Placeholder */}
      {hasDescription && (
        <div className="md:col-span-2 space-y-2.5 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="flex items-center gap-2">
            <div className="size-3.5 rounded-full bg-slate-200 shrink-0" />
            <div className="h-2.5 w-36 bg-slate-200 rounded-md" />
          </div>
          <div className="space-y-1.5 pl-5">
            <div className="h-3 w-full bg-slate-200 rounded-md" />
            <div className="h-3 w-4/5 bg-slate-200 rounded-md" />
          </div>
        </div>
      )}
    </div>
  </div>
);

const SkeletonMetricItem = () => (
  <div className="flex items-start gap-3 min-w-0">
    <div className="size-8 rounded-xl bg-slate-100 border border-slate-200/40 shrink-0 mt-0.5" />
    <div className="min-w-0 flex flex-col gap-2 w-full pt-0.5">
      <div className="h-2.5 w-24 bg-slate-200 rounded-md" />
      <div className="h-3.5 w-32 bg-slate-200 rounded-md" />
    </div>
  </div>
);

const ProfileGridCard = ({ title, icon, children }) => (
  <div className="bg-white border border-slate-200/60 shadow-sm rounded-[24px] overflow-hidden w-full h-full">
    <div className="px-5 py-2 bg-slate-50/60 border-b border-slate-100 flex items-center gap-2.5 select-none">
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
  <div className="flex flex-col justify-between min-w-0 gap-3">
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
