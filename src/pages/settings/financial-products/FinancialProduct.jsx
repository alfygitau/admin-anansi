import React, { useState } from "react";
import {
  ArrowLeft,
  ChevronRight,
  Wallet,
  CheckCircle2,
  Pencil,
  Users,
  Layers,
  ShieldCheck,
  Clock,
  AlertTriangle,
  Calendar,
  Hash,
  FileText,
  Lock,
  Tag,
  TrendingUp,
  Building2,
  DollarSign,
  ArrowUpRight,
  Check,
  X,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useToast } from "../../../contexts/ToastProvider";
import * as Sentry from "@sentry/react";
import { getDepositProduct } from "../../../sdk/products/products";

export const FinancialProductDetails = ({ onBack, onEdit, onViewAccounts }) => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { isFetching } = useQuery({
    queryKey: ["Deposit product"],
    queryFn: async () => {
      const response = await getDepositProduct(id);
      return response?.data;
    },
    onSuccess: (data) => {
      setProduct(data);
    },
    onError: (error) => {
      Sentry.captureException(
        new Error(error?.response?.data?.message || error.message),
        {
          tags: { component: "Accounts", action: "getDepositProducts" },
        },
      );
      showToast({
        title: "Products processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  if (!product) return null;

  return (
    <>
      {isFetching ? (
        <FinancialProductSkeleton />
      ) : (
        <div className="w-full space-y-6 select-none font-sans antialiased text-slate-800">
          {/* 1. PAGE HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 transition-all cursor-pointer shrink-0 shadow-3xs"
                title="Go Back"
              >
                <ArrowLeft size={16} />
              </button>
              <div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>Settings</span>
                </div>
                <div className="flex items-center gap-3 mt-0.5">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    {product.name}
                  </h2>
                  <span
                    className={`inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${
                      product.status === "live"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                        : "bg-amber-50 text-amber-700 border-amber-200/60"
                    }`}
                  >
                    <CheckCircle2 size={10} />
                    {product.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Controls & Edit Counter */}
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border ${
                  product.edit_limit_reached
                    ? "bg-rose-50 text-rose-700 border-rose-200"
                    : "bg-amber-50 text-amber-700 border-amber-200/60"
                }`}
              >
                <Clock size={13} />
                {product.edit_limit_reached
                  ? "Edit Limit Reached"
                  : `${product.edits_remaining_this_year ?? 0} Edits Remaining This Year`}
              </span>

              <button
                type="button"
                disabled={product.edit_limit_reached}
                onClick={() =>
                  navigate(`/admin/financial-products/${product?.id}/edit`)
                }
                className="h-10 px-4 bg-slate-900 hover:bg-[#074073] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-2xs disabled:opacity-50"
              >
                <Pencil size={14} />
                <span>Edit Configuration</span>
              </button>
            </div>
          </div>

          {/* 2. HIGHLIGHT SUMMARY METRICS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-3xs flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                  Monthly Min Deposit
                </p>
                <p className="text-lg font-black text-slate-900 font-mono mt-1">
                  KES{" "}
                  {Number(
                    product.monthly_minimum_contribution ||
                      product.minimum_contribution ||
                      0,
                  ).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
                <DollarSign size={20} />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-3xs flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                  Account Structure
                </p>
                <p className="text-sm font-bold text-slate-800 capitalize mt-1">
                  {product.account_structure?.replace(/_/g, " ") || "Standard"}
                </p>
              </div>
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
                <Building2 size={20} />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-3xs flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                  Withdrawal Policy
                </p>
                <p className="text-sm font-bold text-slate-800 mt-1">
                  {product.is_withdrawable
                    ? "Withdrawable"
                    : "Locked (Non-Withdrawable)"}
                </p>
              </div>
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100">
                <Lock size={20} />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-3xs flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                  Interest Scheme
                </p>
                <p className="text-sm font-bold text-slate-800 capitalize mt-1">
                  {product.interest_crediting_method?.replace(/_/g, " ") ||
                    "No Interest"}
                </p>
              </div>
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
                <TrendingUp size={20} />
              </div>
            </div>
          </div>

          {/* 3. DETAILED CONFIGURATION CARDS */}
          <div className="space-y-6">
            {/* CARD 1: PRODUCT IDENTITY */}
            <SectionCard title="Basic Product Identity" icon={Tag}>
              <DetailItem
                label="Product Name"
                value={product.name}
                icon={Tag}
              />
              <DetailItem
                label="Public Code"
                value={product.public_code}
                mono
                icon={Hash}
              />
              <DetailItem
                label="Internal System Code"
                value={product.code}
                mono
                icon={Hash}
              />
              <DetailItem
                label="Category"
                value={product.category}
                icon={Layers}
              />
              <DetailItem
                label="Deposit Type"
                value={product.deposit_type}
                icon={Layers}
              />
              <DetailItem
                label="Product Purpose"
                value={product.product_purpose}
                icon={ShieldCheck}
              />
              <DetailItem
                label="Current Version"
                value={`Version ${product.version_number}`}
                mono
                icon={FileText}
              />
              <DetailItem
                label="Live Status"
                icon={CheckCircle2}
                badge={
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md uppercase">
                    {product.status}
                  </span>
                }
              />
            </SectionCard>

            {/* CARD 2: ACCOUNT STRUCTURE & BENEFICIARIES */}
            <SectionCard
              title="Account Structure & Sub-Account Rules"
              icon={Building2}
            >
              <DetailItem
                label="Account Structure"
                value={product.account_structure?.replace(/_/g, " ")}
                icon={Building2}
              />
              <DetailItem
                label="Sub-Account Reference Pattern"
                value={product.sub_account_reference_pattern}
                mono
                icon={FileText}
              />
              <DetailItem
                label="Allow Beneficiary Sub-Accounts"
                icon={Users}
                badge={
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md border ${
                      product.allow_beneficiary_sub_accounts
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                        : "bg-slate-100 text-slate-600 border-slate-200"
                    }`}
                  >
                    {product.allow_beneficiary_sub_accounts ? (
                      <>
                        <Check size={12} /> Allowed
                      </>
                    ) : (
                      <>
                        <X size={12} /> Disallowed
                      </>
                    )}
                  </span>
                }
              />
              <DetailItem
                label="Beneficiary Label"
                value={product.beneficiary_label}
                icon={Tag}
              />

              {product.beneficiary_required_fields?.length > 0 && (
                <div className="md:col-span-2 flex flex-col space-y-1.5 p-3 bg-slate-50/70 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Required Beneficiary Data Fields
                  </span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {product.beneficiary_required_fields.map((field) => (
                      <span
                        key={field}
                        className="font-mono text-xs font-bold px-2.5 py-1 bg-white border border-slate-200 text-slate-700 rounded-lg shadow-3xs"
                      >
                        {field}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </SectionCard>

            {/* CARD 3: CONTRIBUTION & DEPOSIT RULES */}
            <SectionCard title="Contribution & Deposit Rules" icon={Wallet}>
              <DetailItem
                label="Minimum Contribution"
                value={`KES ${Number(
                  product.minimum_contribution || 0,
                ).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                mono
                icon={DollarSign}
              />
              <DetailItem
                label="Monthly Minimum Contribution"
                value={`KES ${Number(
                  product.monthly_minimum_contribution || 0,
                ).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                mono
                icon={DollarSign}
              />
              <DetailItem
                label="Contribution Frequency"
                value={product.contribution_frequency}
                icon={Calendar}
              />
              <DetailItem
                label="Requires Periodic Deposit"
                icon={Clock}
                badge={
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md border ${
                      product.requires_periodic_deposit
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                        : "bg-slate-100 text-slate-600 border-slate-200"
                    }`}
                  >
                    {product.requires_periodic_deposit
                      ? "Enforced"
                      : "Optional"}
                  </span>
                }
              />
              <DetailItem
                label="Auto-Deduct Monthly Deposit"
                icon={CheckCircle2}
                badge={
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md border ${
                      product.auto_deduct_monthly_contribution
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                        : "bg-slate-100 text-slate-600 border-slate-200"
                    }`}
                  >
                    {product.auto_deduct_monthly_contribution
                      ? "Enabled"
                      : "Disabled"}
                  </span>
                }
              />
              <DetailItem
                label="Enforce Monthly Rule Strictness"
                icon={ShieldCheck}
                badge={
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md border ${
                      product.enforce_monthly_deposit_rule
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                        : "bg-slate-100 text-slate-600 border-slate-200"
                    }`}
                  >
                    {product.enforce_monthly_deposit_rule
                      ? "Strict"
                      : "Standard"}
                  </span>
                }
              />
            </SectionCard>

            {/* CARD 4: WITHDRAWAL & NOTICE TERMS */}
            <SectionCard title="Withdrawal Policy & Notice Terms" icon={Lock}>
              <DetailItem
                label="Withdrawable Access"
                icon={Lock}
                badge={
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-md border ${
                      product.is_withdrawable
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                        : "bg-rose-50 text-rose-700 border-rose-200/60"
                    }`}
                  >
                    {product.is_withdrawable
                      ? "Withdrawable"
                      : "Non-Withdrawable"}
                  </span>
                }
              />
              <DetailItem
                label="Exit Notice Days"
                value={`${product.exit_notice_days || 0} Days Required`}
                icon={Clock}
              />
              <DetailItem
                label="Notice Required on Withdrawal"
                icon={AlertTriangle}
                badge={
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md border ${
                      product.notice_required_on_withdrawal
                        ? "bg-amber-50 text-amber-700 border-amber-200/60"
                        : "bg-slate-100 text-slate-600 border-slate-200"
                    }`}
                  >
                    {product.notice_required_on_withdrawal
                      ? "Required"
                      : "Not Required"}
                  </span>
                }
              />
              <DetailItem
                label="Withdrawal Fee"
                value={
                  product.withdrawal_fee
                    ? `KES ${Number(product.withdrawal_fee).toLocaleString()}`
                    : "None"
                }
                mono
                icon={ArrowUpRight}
              />
            </SectionCard>

            {/* CARD 5: INTEREST & GOVERNANCE MATRIX */}
            <SectionCard title="Interest Policy & Governance" icon={TrendingUp}>
              <DetailItem
                label="Interest Crediting Method"
                value={product.interest_crediting_method?.replace(/_/g, " ")}
                icon={TrendingUp}
              />
              <DetailItem
                label="Posting Frequency"
                value={product.interest_posting_frequency}
                icon={Calendar}
              />
              <DetailItem
                label="Compounding Method"
                value={product.interest_compounding_method}
                icon={TrendingUp}
              />
              <DetailItem
                label="Dividend Eligible"
                icon={CheckCircle2}
                badge={
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md border ${
                      product.dividend_eligible
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                        : "bg-slate-100 text-slate-600 border-slate-200"
                    }`}
                  >
                    {product.dividend_eligible ? "Eligible" : "Ineligible"}
                  </span>
                }
              />
              <DetailItem
                label="Has Late Penalty"
                icon={AlertTriangle}
                badge={
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md border ${
                      product.has_late_penalty
                        ? "bg-rose-50 text-rose-700 border-rose-200/60"
                        : "bg-slate-100 text-slate-600 border-slate-200"
                    }`}
                  >
                    {product.has_late_penalty ? "Active Penalty" : "No Penalty"}
                  </span>
                }
              />
              <DetailItem
                label="Penalty Posting Mode"
                value={product.penalty_posting_mode?.replace(/_/g, " ")}
                icon={ShieldCheck}
              />
            </SectionCard>

            {/* CARD 6: ELIGIBILITY & SYSTEM METADATA */}
            <SectionCard
              title="Eligibility & System Audit Trail"
              icon={ShieldCheck}
            >
              <DetailItem
                label="Registration Eligibility"
                value={
                  product.member_registration_eligibilities
                    ? product.member_registration_eligibilities.join(", ")
                    : product.member_registration_eligibility
                }
                icon={Users}
              />
              <DetailItem
                label="Member Terms Acknowledgment"
                icon={ShieldCheck}
                badge={
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md border ${
                      product.require_member_terms_acknowledgment
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                        : "bg-slate-100 text-slate-600 border-slate-200"
                    }`}
                  >
                    {product.require_member_terms_acknowledgment
                      ? "Required"
                      : "Optional"}
                  </span>
                }
              />
              <DetailItem
                label="Created At"
                value={new Date(product.createdAt).toLocaleString()}
                mono
                icon={Calendar}
              />
              <DetailItem
                label="Last Updated At"
                value={new Date(product.updatedAt).toLocaleString()}
                mono
                icon={Calendar}
              />
            </SectionCard>
          </div>
        </div>
      )}
    </>
  );
};

const DetailItem = ({
  label,
  value,
  mono = false,
  badge = null,
  icon: Icon,
}) => (
  <div className="flex flex-col space-y-2 p-3 bg-slate-50/70 rounded-xl border border-slate-100">
    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
      {Icon && <Icon size={12} className="text-slate-400 shrink-0" />}
      <span>{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {badge ? (
        badge
      ) : (
        <span
          className={`text-sm font-bold text-slate-800 ${
            mono ? "font-mono" : ""
          }`}
        >
          {value !== null && value !== undefined && value !== ""
            ? String(value)
            : "—"}
        </span>
      )}
    </div>
  </div>
);

// --- REUSABLE SECTION CARD ---
const SectionCard = ({ title, icon: Icon, children, badge }) => (
  <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-3xs space-y-4">
    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
      <div className="flex items-center gap-2.5">
        {Icon && (
          <div className="p-2 bg-slate-50 border border-slate-200/60 rounded-xl text-[#074073]">
            <Icon size={16} />
          </div>
        )}
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
          {title}
        </h3>
      </div>
      {badge && badge}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{children}</div>
  </div>
);

const FinancialProductSkeleton = () => {
  return (
    <div className="w-full space-y-6 select-none font-sans antialiased text-slate-800 animate-pulse">
      {/* 1. PAGE HEADER SKELETON */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          {/* Back Button Skeleton */}
          <div className="size-9 rounded-xl bg-slate-200 shrink-0" />
          <div className="space-y-2">
            {/* Breadcrumb Skeleton */}
            <div className="h-3 w-24 bg-slate-200 rounded" />
            {/* Title & Status Badge Skeleton */}
            <div className="flex items-center gap-3">
              <div className="h-7 w-48 bg-slate-200 rounded-lg" />
              <div className="h-5 w-16 bg-slate-200 rounded-md" />
            </div>
          </div>
        </div>

        {/* Action Controls & Counter Badge Skeleton */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-44 bg-slate-200 rounded-xl" />
          <div className="h-10 w-36 bg-slate-200 rounded-xl" />
        </div>
      </div>

      {/* 2. SUMMARY METRICS GRID SKELETON */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-3xs flex items-center justify-between"
          >
            <div className="space-y-2">
              <div className="h-3 w-24 bg-slate-200 rounded" />
              <div className="h-6 w-32 bg-slate-200 rounded-md" />
            </div>
            <div className="size-11 rounded-xl bg-slate-200 shrink-0" />
          </div>
        ))}
      </div>

      {/* 3. DETAILED CONFIGURATION CARDS SKELETON */}
      <div className="space-y-6">
        {Array.from({ length: 6 }).map((_, cardIndex) => (
          <div
            key={cardIndex}
            className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-3xs space-y-4"
          >
            {/* Section Card Header Skeleton */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="size-8 bg-slate-200 rounded-xl shrink-0" />
                <div className="h-4 w-48 bg-slate-200 rounded" />
              </div>
            </div>

            {/* Detail Items Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Array.from({ length: cardIndex === 0 ? 8 : 4 }).map(
                (_, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex flex-col space-y-2 p-3 bg-slate-50/70 rounded-xl border border-slate-100"
                  >
                    {/* Item Label Skeleton */}
                    <div className="h-3 w-28 bg-slate-200 rounded" />
                    {/* Item Value Skeleton */}
                    <div className="h-5 w-36 bg-slate-200 rounded-md" />
                  </div>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
