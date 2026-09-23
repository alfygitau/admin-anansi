import React, { useState, useMemo } from "react";
import {
  ArrowLeft,
  ChevronRight,
  AlertTriangle,
  Plus,
  Trash2,
  Tag,
  Hash,
  Layers,
  Target,
  DollarSign,
  Calendar,
  Clock,
  Wallet,
  CalendarDays,
  Percent,
  Coins,
  ShieldCheck,
  Building2,
  FileText,
  ImageIcon,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { useToast } from "../../../contexts/ToastProvider";
import * as Sentry from "@sentry/react";
import {
  getDepositProduct,
  updateDepositSubmission,
} from "../../../sdk/products/products";

export const emptyPayload = {
  // Identity & General Information
  name: "",
  code: "",
  public_code: "",
  description: "",
  category: "deposit",
  deposit_type: "savings",
  product_purpose: "general",
  bank_id: null,
  currency_id: null,
  ledger_id: null,
  product_type_id: null,
  image_url: "",
  status: "draft",
  validFrom: null,
  validTo: null,

  // Account Structure & Beneficiaries
  account_structure: "single_account",
  allow_member_sub_accounts: false,
  allow_beneficiary_sub_accounts: false,
  beneficiary_label: "",
  beneficiary_required_fields: "",
  sub_account_reference_pattern: "",

  // Special Purpose & Target Rules
  target_type: "none",
  default_target_amount: "",
  target_period_months: "",
  target_due_date: "",
  allow_member_defined_target: false,
  target_required: false,
  promotion_length_weeks: "",
  reward_earned_percentage: "",

  // Contribution & Savings Rules
  minimum_contribution: "",
  monthly_minimum_contribution: "",
  maximum_contribution: "",
  contribution_frequency: "monthly",
  deposit_frequency: "monthly",
  required_deposit_amount: "",
  requires_periodic_deposit: false,
  deposit_deadline_day: "",
  auto_deduct_monthly_contribution: false,
  enforce_monthly_deposit_rule: false,

  // Shares Configuration
  is_shares: false,
  share_price: "",
  minimum_required_shares: "",
  share_transfer_fee: "",
  dividend_eligible: false,

  // Late Penalties Configuration
  has_late_penalty: false,
  late_penalty_type: "none",
  late_penalty_amount: "",
  penalty_accrual_cadence: "none",
  penalty_grace_days: "",
  penalty_max_per_period: "",
  penalty_posting_mode: "track_only",

  // Interest Policy
  interest_crediting_method: "no_interest",
  fixed_annual_interest_rate: "",
  interest_tiers: null,
  interest_posting_day: "",
  interest_posting_frequency: "monthly",
  interest_compounding_method: "simple",

  // Withdrawal Rules & Fees
  is_withdrawable: true,
  withdrawal_fee: "",
  withdrawal_amount_after_saving_percentage: "",
  control_fee: "",
  notice_required_on_withdrawal: false,
  withdrawal_notice_period_days: "",
  max_withdrawals_per_period: "",
  early_withdrawal_penalty_percentage: "",
  exit_notice_days: "",

  // Eligibility & Registration Rules
  mandatory_for_all_members: false,
  create_on_member_registration: false,
  member_registration_eligibility: "individual",
  member_registration_eligibilities: ["individual"],
  registration_fee_amount: "",
  hosts_membership_fee: false,
  is_allowed_swerv: false,
  is_savings: true,
  is_family_care_fund: false,

  // Documents & Terms Acknowledgment
  required_documents: [{ label: "", required: true }],
  terms_document_name: "",
  terms_document_url: "",
  terms_document_mime_type: "",
  terms_document_size_bytes: null,
  terms_document_uploaded_at: null,
  require_member_terms_acknowledgment: true,

  // Loan Engine Attributes
  loan_description: "",
  loan_features: "",
  loan_requirements: "",
  loan_term_durations: "",
  repayment_intervals: "",
  loan_minimum_principal: "",
  loan_maximum_principal: "",
  loan_minimum_interest_rate: "",
  loan_maximum_interest_rate: "",
  loan_interest_calculation_method: "reducing_balance",
  loan_duration_custom: false,
  loan_maximum_duration_months: "",
  guarantors_required: false,
  minimum_guarantors: "",
  loan_processing_fee: "",
  loan_insurance_fee: "",
  loan_late_payment_penalty: "",
  loan_early_repayment_penalty: "",
  loan_disbursement_type: "manual",
  automatic_disbursement_limit: "",

  // Versioning & Schema Metadata
  version_number: 1,
  parent_product_id: null,
  superseded_by_product_id: null,
  product_rules_schema: null,
};

const savingsFrequencyNotes = {
  monthly:
    "Contributions are expected on a monthly cycle before the deadline day.",
  weekly: "Contributions are expected once every 7 days.",
  daily: "Contributions are processed daily.",
  one_off: "Flexible deposits with no fixed frequency rules.",
};

const interestPolicyNotes = {
  no_interest: "No yield or interest will be accrued on member balances.",
  fixed_rate:
    "Calculates interest based on a fixed annual percentage rate (APR).",
  post_audit_declaration:
    "Interest is declared and posted manually after annual financial audit.",
  tiered_by_balance:
    "Interest rates vary based on member account balance bands.",
};

const eligibilityOptions = [
  ["individual", "Individual Members"],
  ["group", "Chama / Group Accounts"],
  ["corporate", "Business / Corporate"],
  ["junior", "Junior / Child Accounts"],
];

const inputStyle =
  "w-full pl-[74px] pr-6 py-4 h-14 bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 rounded-2xl transition-all outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 disabled:opacity-60 disabled:cursor-not-allowed";

export const EditFinancialProduct = ({ onNavigateToApprovals }) => {
  const [product, setProduct] = useState(null);
  const [form, setForm] = useState(emptyPayload);
  const [scope, setScope] = useState("all_members");
  const [reviewing, setReviewing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { showToast } = useToast();

  const normalizeDocumentRows = (rows) =>
    (Array.isArray(rows) ? rows : [])
      .map((row) => ({
        label: String(row?.label || "").trim(),
        required: row?.required ?? true,
      }))
      .filter((row) => row.label);

  const splitCsv = (value) =>
    String(value || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  const toOptionalNumber = (value) =>
    value === "" || value === null || value === undefined
      ? undefined
      : Number(value);

  const joinCsv = (value) => (Array.isArray(value) ? value.join(", ") : "");

  const buildSubmissionPayload = (form) => ({
    name: form.name,
    public_code: form.public_code || undefined,
    deposit_type: form.deposit_type,
    product_purpose: form.product_purpose,
    account_structure: form.account_structure,
    allow_member_sub_accounts: form.allow_member_sub_accounts,
    allow_beneficiary_sub_accounts: form.allow_beneficiary_sub_accounts,
    beneficiary_label: form.beneficiary_label || undefined,
    beneficiary_required_fields: splitCsv(form.beneficiary_required_fields),
    target_type: form.target_type,
    default_target_amount: toOptionalNumber(form.default_target_amount),
    target_period_months: toOptionalNumber(form.target_period_months),
    target_due_date: form.target_due_date || undefined,
    allow_member_defined_target: form.allow_member_defined_target,
    target_required: form.target_required,
    description: form.description || undefined,
    minimum_contribution:
      form.minimum_contribution === ""
        ? undefined
        : Number(form.minimum_contribution),
    maximum_contribution:
      form.maximum_contribution === ""
        ? undefined
        : Number(form.maximum_contribution),
    contribution_frequency: form.contribution_frequency,
    interest_crediting_method: form.interest_crediting_method,
    fixed_annual_interest_rate: toOptionalNumber(
      form.fixed_annual_interest_rate,
    ),
    interest_posting_day: toOptionalNumber(form.interest_posting_day),
    interest_posting_frequency: form.interest_posting_frequency || undefined,
    interest_compounding_method: form.interest_compounding_method || undefined,
    is_withdrawable: form.is_withdrawable,
    withdrawal_fee: toOptionalNumber(form.withdrawal_fee),
    mandatory_for_all_members: form.mandatory_for_all_members,
    create_on_member_registration: form.create_on_member_registration,
    member_registration_eligibility:
      form.member_registration_eligibilities?.[0] ||
      form.member_registration_eligibility,
    member_registration_eligibilities: form.member_registration_eligibilities,
    required_documents: normalizeDocumentRows(form.required_documents),
    share_price: toOptionalNumber(form.share_price),
    minimum_required_shares: toOptionalNumber(form.minimum_required_shares),
    registration_fee_amount: toOptionalNumber(form.registration_fee_amount),
    hosts_membership_fee: form.hosts_membership_fee,
    auto_deduct_monthly_contribution: form.auto_deduct_monthly_contribution,
    dividend_eligible: form.dividend_eligible,
    exit_notice_days: toOptionalNumber(form.exit_notice_days),
    share_transfer_fee: toOptionalNumber(form.share_transfer_fee),
    image_url: form.image_url || undefined,
    deposit_deadline_day: toOptionalNumber(form.deposit_deadline_day),
    has_late_penalty: form.has_late_penalty,
    late_penalty_type: form.late_penalty_type,
    late_penalty_amount: toOptionalNumber(form.late_penalty_amount),
    penalty_accrual_cadence: form.penalty_accrual_cadence,
    penalty_grace_days: toOptionalNumber(form.penalty_grace_days),
    penalty_max_per_period: toOptionalNumber(form.penalty_max_per_period),
    penalty_posting_mode: form.penalty_posting_mode,
    enforce_monthly_deposit_rule: form.enforce_monthly_deposit_rule,
  });

  const { isFetching } = useQuery({
    queryKey: ["Deposit product", id],
    queryFn: async () => {
      const response = await getDepositProduct(id);
      return response?.data;
    },
    onSuccess: (data) => {
      setProduct(data);
      const beneficiaryFields = Array.isArray(data?.beneficiary_required_fields)
        ? data.beneficiary_required_fields.join(", ")
        : data?.beneficiary_required_fields || "";

      setForm({
        ...emptyPayload,
        ...data,
        beneficiary_required_fields: beneficiaryFields,
      });
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

  const locked = Boolean(product?.edit_limit_reached);

  const original = useMemo(
    () => (product ? { ...emptyPayload, ...product } : null),
    [product],
  );

  const changedFields = useMemo(() => {
    if (!original) return [];
    return Object.keys(form)
      .filter((key) => String(original[key] ?? "") !== String(form[key] ?? ""))
      .map((key) => ({
        field: key,
        current: original[key],
        proposed: form[key],
      }));
  }, [form, original]);

  const updateForm = (key, value) =>
    setForm((current) => {
      const next = { ...current, [key]: value };

      if (key === "product_purpose") {
        if (value === "welfare") {
          next.deposit_type = "family_care_fund";
          next.interest_crediting_method = "no_interest";
          next.is_withdrawable = false;
        }
        if (["education", "holiday", "goal_savings"].includes(value)) {
          next.allow_member_defined_target = true;
        }
        if (value === "education") {
          next.account_structure = "beneficiary_sub_accounts";
          next.allow_beneficiary_sub_accounts = true;
          next.beneficiary_label = next.beneficiary_label || "Child";
          next.beneficiary_required_fields =
            next.beneficiary_required_fields ||
            "name, date_of_birth, school_name";
        }
      }

      if (key === "account_structure") {
        next.allow_member_sub_accounts = value === "member_sub_accounts";
        next.allow_beneficiary_sub_accounts =
          value === "beneficiary_sub_accounts";
        if (value === "beneficiary_sub_accounts") {
          next.beneficiary_label = next.beneficiary_label || "Child";
        }
      }

      if (key === "has_late_penalty") {
        next.late_penalty_type = value ? "fixed_per_day" : "none";
        next.penalty_accrual_cadence = value ? "daily_after_deadline" : "none";
      }

      return next;
    });

  const toggleEligibility = (value) => {
    setForm((current) => {
      const existing = current.member_registration_eligibilities || [];
      const next = existing.includes(value)
        ? existing.filter((item) => item !== value)
        : [...existing, value];
      const normalized = next.length > 0 ? next : ["individual"];

      return {
        ...current,
        member_registration_eligibilities: normalized,
        member_registration_eligibility: normalized[0],
        mandatory_for_all_members: normalized.includes("all"),
      };
    });
  };

  const updateDocumentRow = (index, value) => {
    setForm((current) => {
      const rows = [...(current.required_documents || [])];
      rows[index] = { ...(rows[index] || { required: true }), label: value };
      return { ...current, required_documents: rows };
    });
  };

  const addDocumentRow = () => {
    setForm((current) => ({
      ...current,
      required_documents: [
        ...(current.required_documents || []),
        { label: "", required: true },
      ],
    }));
  };

  const removeDocumentRow = (index) => {
    setForm((current) => ({
      ...current,
      required_documents: (current.required_documents || []).filter(
        (_, rowIndex) => rowIndex !== index,
      ),
    }));
  };

  const { mutate: edit, isLoading: editing } = useMutation({
    mutationKey: ["edit financial product"],
    mutationFn: async () => {
      const response = await updateDepositSubmission(id, {
        scope: "all_members",
        product_id: id,
        payload: buildSubmissionPayload(form),
      });
      return response;
    },
    onSuccess: (data) => {
      navigate("/admin/financial-products");
    },
    onError: (error) => {
      Sentry.captureException(
        new Error(error?.response?.data?.message || error.message),
        {
          tags: {
            component: "Product Approvals",
            action: "DepositApproval",
          },
        },
      );
      showToast({
        title: "Failed to update deposit product",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const handleEditSubmit = async () => {
    console.log({
      action: "update",
      scope: "all_members",
      product_id: id,
      payload: buildSubmissionPayload(form),
    });
    await edit();
  };

  if (isFetching) {
    return (
      <div className="p-12 text-center text-xs font-medium text-slate-400">
        Loading product parameters...
      </div>
    );
  }

  if (reviewing) {
    return (
      <div className="w-full space-y-6 select-none font-sans antialiased text-slate-800">
        {/* 1. HEADER */}
        <div className="flex items-center gap-3 pb-6 border-b border-slate-200/80">
          <button
            type="button"
            onClick={() => setReviewing(false)}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 transition-all cursor-pointer shadow-3xs"
            title="Go Back to Edit"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span>Financial Products</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
              Review Your Modifications
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              <strong className="text-slate-700">{product?.name}</strong> (
              {product?.public_code}) will be sent to a checker for approval.
            </p>
          </div>
        </div>

        {/* 2. DISCLAIMER BANNER */}
        <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 flex items-center gap-3 text-xs text-amber-900 font-medium shadow-3xs">
          <AlertTriangle size={18} className="text-amber-600 shrink-0" />
          <span>
            Submitting will consume an edit credit for this product. Remaining
            edits this year:{" "}
            <strong>{product?.edits_remaining_this_year ?? 4} of 4</strong>.
          </span>
        </div>

        <div className="space-y-5">
          {/* CARD 1: BASIC IDENTITY */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-3xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Tag size={14} className="text-[#074073]" />
              <span>1. Identity & Structure</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  Product Name & Code
                </span>
                <p className="font-bold text-slate-800 font-mono">
                  {form.name || "—"} ({form.public_code || "N/A"})
                </p>
              </div>
              <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  Deposit Type & Purpose
                </span>
                <p className="font-bold text-slate-800 capitalize">
                  {form.deposit_type} • {form.product_purpose}
                </p>
              </div>
              <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  Account Structure
                </span>
                <p className="font-bold text-slate-800 capitalize">
                  {form.account_structure?.replace(/_/g, " ")}
                </p>
              </div>
              {form.description && (
                <div className="md:col-span-3 p-3 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400">
                    Product Description
                  </span>
                  <p className="font-medium text-slate-700 leading-relaxed text-xs">
                    {form.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* CARD 2: SPECIAL PURPOSE & TARGET RULES */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-3xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Target size={14} className="text-[#074073]" />
              <span>2. Target & Sub-Account Rules</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  Target Type
                </span>
                <p className="font-bold text-slate-800 capitalize">
                  {form.target_type?.replace(/_/g, " ") || "None"}
                </p>
              </div>
              <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  Target Amount / Period
                </span>
                <p className="font-bold text-slate-800 font-mono">
                  {form.default_target_amount
                    ? `KES ${Number(form.default_target_amount).toLocaleString()}`
                    : "N/A"}
                  {form.target_period_months
                    ? ` (${form.target_period_months} Months)`
                    : ""}
                </p>
              </div>
              <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  Target Requirements
                </span>
                <p className="font-bold text-slate-800">
                  {form.target_required ? "Strictly Required" : "Optional"}{" "}
                  {form.allow_member_defined_target ? "• Member Defined" : ""}
                </p>
              </div>
              {form.account_structure === "beneficiary_sub_accounts" && (
                <>
                  <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-slate-400">
                      Beneficiary Label
                    </span>
                    <p className="font-bold text-slate-800">
                      {form.beneficiary_label || "Beneficiary"}
                    </p>
                  </div>
                  <div className="md:col-span-2 p-3 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-slate-400">
                      Required Beneficiary Fields
                    </span>
                    <p className="font-bold text-slate-800 font-mono">
                      {form.beneficiary_required_fields || "None"}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* CARD 3: SAVINGS & PENALTY RULES */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-3xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Wallet size={14} className="text-[#074073]" />
              <span>3. Savings & Penalty Rules</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  Minimum saving
                </span>
                <p className="font-bold text-slate-800 font-mono">
                  KES {Number(form.minimum_contribution || 0).toLocaleString()}{" "}
                  ({form.contribution_frequency})
                </p>
              </div>
              <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  Maximum Saving
                </span>
                <p className="font-bold text-slate-800 font-mono">
                  {form.maximum_contribution
                    ? `KES ${Number(form.maximum_contribution).toLocaleString()}`
                    : "Unlimited"}
                </p>
              </div>
              <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  Deposit Deadline
                </span>
                <p className="font-bold text-slate-800">
                  {form.deposit_deadline_day
                    ? `Day ${form.deposit_deadline_day} of month`
                    : "Flexible"}
                </p>
              </div>
              <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  Automation Flags
                </span>
                <p className="font-bold text-slate-800">
                  {form.auto_deduct_monthly_contribution
                    ? "Auto-Deduct ON"
                    : "Auto-Deduct Off"}{" "}
                  •{" "}
                  {form.enforce_monthly_deposit_rule
                    ? "Strict Monthly Rule"
                    : "Standard"}
                </p>
              </div>
              <div className="md:col-span-2 p-3 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  Late Penalty Configuration
                </span>
                <p className="font-bold text-slate-800">
                  {form.has_late_penalty
                    ? `${form.late_penalty_type?.replace(/_/g, " ")} • KES ${form.late_penalty_amount || 0} (${form.penalty_accrual_cadence?.replace(/_/g, " ")})`
                    : "No Late Penalties Applied"}
                </p>
              </div>
            </div>
          </div>

          {/* CARD 4: INTEREST & WITHDRAWAL POLICY */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-3xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <TrendingUp size={14} className="text-[#074073]" />
              <span>4. Yield & Withdrawal Policy</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  Interest Method
                </span>
                <p className="font-bold text-slate-800 capitalize">
                  {form.interest_crediting_method?.replace(/_/g, " ")}
                </p>
              </div>
              <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  Fixed Rate / Postings
                </span>
                <p className="font-bold text-slate-800 font-mono">
                  {form.interest_crediting_method === "fixed_rate"
                    ? `${form.fixed_annual_interest_rate}% p.a.`
                    : "N/A"}{" "}
                  ({form.interest_posting_frequency})
                </p>
              </div>
              <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  Withdrawal Policy
                </span>
                <p className="font-bold text-slate-800">
                  {form.is_withdrawable
                    ? "Withdrawable"
                    : "Locked (Non-Withdrawable)"}{" "}
                  {form.withdrawal_fee
                    ? `• Fee: KES ${form.withdrawal_fee}`
                    : ""}
                </p>
              </div>
            </div>
          </div>

          {/* CARD 5: ELIGIBILITY & DOCUMENTS */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-3xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <ShieldCheck size={14} className="text-[#074073]" />
              <span>5. Eligibility & Documents Checklist</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  Registration Eligibility
                </span>
                <p className="font-bold text-slate-800 capitalize">
                  {(form.member_registration_eligibilities || []).join(", ") ||
                    "Individual"}
                </p>
              </div>
              <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  Governance Flags
                </span>
                <p className="font-bold text-slate-800">
                  {form.mandatory_for_all_members
                    ? "Mandatory for All"
                    : "Optional"}{" "}
                  •{" "}
                  {form.dividend_eligible
                    ? "Dividend Eligible"
                    : "No Dividends"}{" "}
                  • Notice: {form.exit_notice_days || 0}d
                </p>
              </div>
              <div className="md:col-span-2 p-3 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1.5">
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  Required Documents
                </span>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {(form.required_documents || []).filter((d) => d.label.trim())
                    .length > 0 ? (
                    form.required_documents
                      .filter((d) => d.label.trim())
                      .map((doc, idx) => (
                        <span
                          key={idx}
                          className="font-mono text-[11px] font-bold px-2.5 py-1 bg-white border border-slate-200 text-slate-700 rounded-lg shadow-3xs"
                        >
                          {doc.label}
                        </span>
                      ))
                  ) : (
                    <span className="text-slate-400 italic">
                      No specific documents required
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. FOOTER ACTIONS */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200/80">
          <button
            type="button"
            onClick={() => setReviewing(false)}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
          >
            Back to Edit
          </button>
          <button
            type="button"
            disabled={editing || changedFields.length === 0}
            onClick={handleEditSubmit}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-[#074073] text-white text-xs font-bold transition-all shadow-2xs cursor-pointer disabled:opacity-50"
          >
            {editing ? "Submitting..." : "Confirm & Submit for Approval"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 select-none font-sans antialiased text-slate-800">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 transition-all cursor-pointer shrink-0 shadow-3xs"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span>Settings</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
              Edit Financial Product
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {product?.name} ({product?.public_code}) - Version{" "}
              {product?.version_number || 1}
            </p>
          </div>
        </div>

        {/* Status Counter Badge */}
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border ${
            locked
              ? "bg-rose-50 text-rose-700 border-rose-200"
              : "bg-amber-50 text-amber-700 border-amber-200/60"
          }`}
        >
          {locked
            ? "4th edit used - 0 remaining"
            : `${product?.edits_used_this_year || 0} edits used - ${
                product?.edits_remaining_this_year ?? 4
              } remaining`}
        </span>
      </div>

      {locked && (
        <div className="bg-rose-50 border border-rose-200/60 rounded-2xl p-4 text-xs font-medium text-rose-700 flex items-center gap-2">
          <AlertTriangle size={16} />
          <span>
            This product has reached its edit limit for this year. Fields are
            locked until January 1 of next year.
          </span>
        </div>
      )}

      <div className="space-y-6">
        {/* SECTION 1: PRODUCT SELECTION */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-3xs space-y-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            1. Product Selection
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FilterField label="Product Name" icon={Tag}>
              <input
                className={inputStyle}
                disabled={locked}
                onChange={(e) => updateForm("name", e.target.value)}
                value={form.name}
                placeholder="e.g. Regular Member Savings"
              />
            </FilterField>

            <FilterField label="Product Code" icon={Hash}>
              <input
                className={inputStyle}
                disabled={locked}
                onChange={(e) => updateForm("public_code", e.target.value)}
                value={form.public_code}
                placeholder="e.g. SAV001"
              />
            </FilterField>

            <FilterSelect
              label="Deposit Type"
              icon={Layers}
              disabled={locked}
              value={form.deposit_type}
              onChange={(e) => updateForm("deposit_type", e.target.value)}
            >
              <option value="savings">Savings</option>
              <option value="shares">Shares</option>
              <option value="family_care_fund">Family Care Fund</option>
              <option value="custom">Custom</option>
            </FilterSelect>

            <FilterSelect
              label="Product Purpose"
              icon={Target}
              disabled={locked}
              value={form.product_purpose}
              onChange={(e) => updateForm("product_purpose", e.target.value)}
            >
              <option value="general">General Savings</option>
              <option value="welfare">Welfare</option>
              <option value="education">Education / Elimu</option>
              <option value="holiday">Holiday Savings</option>
              <option value="goal_savings">Goal Savings</option>
              <option value="emergency">Emergency</option>
              <option value="custom">Custom</option>
            </FilterSelect>

            <FilterSelect
              label="Account Structure"
              icon={Building2}
              disabled={locked}
              value={form.account_structure}
              onChange={(e) => updateForm("account_structure", e.target.value)}
            >
              <option value="single_account">Single Account</option>
              <option value="member_sub_accounts">Member Sub-Accounts</option>
              <option value="beneficiary_sub_accounts">
                Beneficiary Sub-Accounts
              </option>
            </FilterSelect>
          </div>
        </div>

        {/* SECTION 2: SPECIAL PURPOSE RULES */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-3xs space-y-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            2. Special Purpose Rules
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FilterSelect
              label="Target Type"
              icon={Target}
              disabled={locked}
              value={form.target_type}
              onChange={(e) => updateForm("target_type", e.target.value)}
            >
              <option value="none">No Target</option>
              <option value="fixed_amount">Fixed Amount</option>
              <option value="per_beneficiary">Per Beneficiary</option>
              <option value="recurring_period">Recurring Period</option>
            </FilterSelect>

            <FilterField label="Default Target Amount (KES)" icon={Coins}>
              <input
                type="number"
                min="0"
                className={inputStyle}
                disabled={locked || form.target_type === "none"}
                onChange={(e) =>
                  updateForm("default_target_amount", e.target.value)
                }
                value={form.default_target_amount}
                placeholder="N/A"
              />
            </FilterField>

            <FilterField label="Target Period Months" icon={Clock}>
              <input
                type="number"
                min="1"
                className={inputStyle}
                disabled={locked || form.target_type !== "recurring_period"}
                onChange={(e) =>
                  updateForm("target_period_months", e.target.value)
                }
                value={form.target_period_months}
                placeholder="N/A"
              />
            </FilterField>

            <FilterField label="Target Due Date" icon={Calendar}>
              <input
                type="date"
                className={inputStyle}
                disabled={locked || form.target_type === "none"}
                onChange={(e) => updateForm("target_due_date", e.target.value)}
                value={form.target_due_date}
              />
            </FilterField>

            {/* Checkbox Options */}
            <div className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50">
              <input
                type="checkbox"
                id="allow_member_defined_target"
                disabled={locked}
                checked={form.allow_member_defined_target}
                onChange={(e) =>
                  updateForm("allow_member_defined_target", e.target.checked)
                }
                className="rounded border-slate-300 text-[#074073]"
              />
              <label
                htmlFor="allow_member_defined_target"
                className="text-xs font-bold text-slate-700 cursor-pointer"
              >
                Allow Member-Defined Target
              </label>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50">
              <input
                type="checkbox"
                id="target_required"
                disabled={locked}
                checked={form.target_required}
                onChange={(e) =>
                  updateForm("target_required", e.target.checked)
                }
                className="rounded border-slate-300 text-[#074073]"
              />
              <label
                htmlFor="target_required"
                className="text-xs font-bold text-slate-700 cursor-pointer"
              >
                Target Required
              </label>
            </div>

            {form.account_structure !== "single_account" && (
              <>
                <FilterField label="Beneficiary Label" icon={Tag}>
                  <input
                    className={inputStyle}
                    disabled={
                      locked ||
                      form.account_structure !== "beneficiary_sub_accounts"
                    }
                    onChange={(e) =>
                      updateForm("beneficiary_label", e.target.value)
                    }
                    value={form.beneficiary_label}
                    placeholder="e.g., Child, Project, Trip"
                  />
                </FilterField>

                <FilterField
                  label="Required Beneficiary Fields"
                  icon={FileText}
                >
                  <input
                    className={inputStyle}
                    disabled={
                      locked ||
                      form.account_structure !== "beneficiary_sub_accounts"
                    }
                    onChange={(e) =>
                      updateForm("beneficiary_required_fields", e.target.value)
                    }
                    value={form.beneficiary_required_fields}
                    placeholder="name, date_of_birth, school_name"
                  />
                </FilterField>
              </>
            )}
          </div>
        </div>

        {/* SECTION 3: SAVINGS RULES */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-3xs space-y-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            3. Savings Rules
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FilterField label="Minimum Saving (KES)" icon={Wallet}>
              <input
                type="number"
                min="0"
                className={inputStyle}
                disabled={locked}
                onChange={(e) =>
                  updateForm("minimum_contribution", e.target.value)
                }
                value={form.minimum_contribution}
              />
            </FilterField>

            <FilterField label="Maximum Saving (KES)" icon={Wallet}>
              <input
                type="number"
                min="0"
                className={inputStyle}
                disabled={locked}
                onChange={(e) =>
                  updateForm("maximum_contribution", e.target.value)
                }
                value={form.maximum_contribution}
                placeholder="N/A"
              />
            </FilterField>

            <FilterSelect
              label="Savings Frequency"
              icon={CalendarDays}
              disabled={locked}
              value={form.contribution_frequency}
              onChange={(e) =>
                updateForm("contribution_frequency", e.target.value)
              }
            >
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
              <option value="daily">Daily</option>
              <option value="one_off">Flexible / One Off</option>
            </FilterSelect>

            <FilterField label="Deposit Deadline Day" icon={Clock}>
              <input
                type="number"
                min="1"
                max="31"
                className={inputStyle}
                disabled={locked || form.contribution_frequency === "one_off"}
                onChange={(e) =>
                  updateForm("deposit_deadline_day", e.target.value)
                }
                value={form.deposit_deadline_day}
                placeholder="N/A"
              />
            </FilterField>

            <div className="md:col-span-2 p-3 bg-slate-50 border border-slate-200/60 rounded-xl text-xs text-slate-500 font-medium">
              💡 {savingsFrequencyNotes[form.contribution_frequency]}
            </div>

            {form.deposit_type === "shares" && (
              <>
                <FilterField label="Share Price (KES)" icon={Coins}>
                  <input
                    type="number"
                    min="0"
                    className={inputStyle}
                    disabled={locked}
                    onChange={(e) => updateForm("share_price", e.target.value)}
                    value={form.share_price}
                  />
                </FilterField>

                <FilterField label="Minimum Required Shares" icon={Hash}>
                  <input
                    type="number"
                    min="0"
                    className={inputStyle}
                    disabled={locked}
                    onChange={(e) =>
                      updateForm("minimum_required_shares", e.target.value)
                    }
                    value={form.minimum_required_shares}
                  />
                </FilterField>

                <FilterField label="Share Transfer Fee (KES)" icon={Coins}>
                  <input
                    type="number"
                    min="0"
                    className={inputStyle}
                    disabled={locked}
                    onChange={(e) =>
                      updateForm("share_transfer_fee", e.target.value)
                    }
                    value={form.share_transfer_fee}
                    placeholder="N/A"
                  />
                </FilterField>
              </>
            )}

            {/* Checkboxes */}
            <div className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50">
              <input
                type="checkbox"
                id="auto_deduct_monthly_contribution"
                disabled={locked}
                checked={form.auto_deduct_monthly_contribution}
                onChange={(e) =>
                  updateForm(
                    "auto_deduct_monthly_contribution",
                    e.target.checked,
                  )
                }
                className="rounded border-slate-300 text-[#074073]"
              />
              <label
                htmlFor="auto_deduct_monthly_contribution"
                className="text-xs font-bold text-slate-700 cursor-pointer"
              >
                Auto-Deduct Monthly Savings
              </label>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50">
              <input
                type="checkbox"
                id="enforce_monthly_deposit_rule"
                disabled={locked}
                checked={form.enforce_monthly_deposit_rule}
                onChange={(e) =>
                  updateForm("enforce_monthly_deposit_rule", e.target.checked)
                }
                className="rounded border-slate-300 text-[#074073]"
              />
              <label
                htmlFor="enforce_monthly_deposit_rule"
                className="text-xs font-bold text-slate-700 cursor-pointer"
              >
                Enforce Monthly Deposit Rule
              </label>
            </div>

            <div className="md:col-span-2 flex items-center gap-3 p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50">
              <input
                type="checkbox"
                id="has_late_penalty"
                disabled={locked}
                checked={form.has_late_penalty}
                onChange={(e) =>
                  updateForm("has_late_penalty", e.target.checked)
                }
                className="rounded border-slate-300 text-[#074073]"
              />
              <label
                htmlFor="has_late_penalty"
                className="text-xs font-bold text-slate-700 cursor-pointer"
              >
                Has Late Penalty
              </label>
            </div>

            {form.has_late_penalty && (
              <>
                <FilterSelect
                  label="Late Penalty Type"
                  icon={AlertTriangle}
                  disabled={locked}
                  value={form.late_penalty_type}
                  onChange={(e) =>
                    updateForm("late_penalty_type", e.target.value)
                  }
                >
                  <option value="none">None</option>
                  <option value="fixed_per_day">Fixed Per Day</option>
                </FilterSelect>

                <FilterField label="Late Penalty Amount (KES)" icon={Coins}>
                  <input
                    type="number"
                    min="0"
                    className={inputStyle}
                    disabled={locked || form.late_penalty_type === "none"}
                    onChange={(e) =>
                      updateForm("late_penalty_amount", e.target.value)
                    }
                    value={form.late_penalty_amount}
                    placeholder="N/A"
                  />
                </FilterField>

                <FilterSelect
                  label="Penalty Accrual Cadence"
                  icon={Clock}
                  disabled={locked}
                  value={form.penalty_accrual_cadence}
                  onChange={(e) =>
                    updateForm("penalty_accrual_cadence", e.target.value)
                  }
                >
                  <option value="none">None</option>
                  <option value="daily_after_deadline">
                    Daily After Deadline
                  </option>
                  <option value="once_per_period">Once Per Period</option>
                </FilterSelect>

                <FilterField label="Penalty Grace Days" icon={Calendar}>
                  <input
                    type="number"
                    min="0"
                    className={inputStyle}
                    disabled={locked}
                    onChange={(e) =>
                      updateForm("penalty_grace_days", e.target.value)
                    }
                    value={form.penalty_grace_days}
                    placeholder="0"
                  />
                </FilterField>

                <FilterField label="Penalty Max Per Period (KES)" icon={Coins}>
                  <input
                    type="number"
                    min="0"
                    className={inputStyle}
                    disabled={locked}
                    onChange={(e) =>
                      updateForm("penalty_max_per_period", e.target.value)
                    }
                    value={form.penalty_max_per_period}
                    placeholder="N/A"
                  />
                </FilterField>

                <FilterSelect
                  label="Penalty Posting Mode"
                  icon={ShieldCheck}
                  disabled={locked}
                  value={form.penalty_posting_mode}
                  onChange={(e) =>
                    updateForm("penalty_posting_mode", e.target.value)
                  }
                >
                  <option value="track_only">Track Only</option>
                  <option value="charge_account">Charge Account</option>
                </FilterSelect>
              </>
            )}
          </div>
        </div>

        {/* SECTION 4: INTEREST POLICY */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-3xs space-y-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            4. Interest Policy
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FilterSelect
              label="Interest Crediting Method"
              icon={TrendingUp}
              disabled={locked}
              value={form.interest_crediting_method}
              onChange={(e) =>
                updateForm("interest_crediting_method", e.target.value)
              }
            >
              <option value="no_interest">No Interest</option>
              <option value="fixed_rate">Fixed Rate</option>
              <option value="post_audit_declaration">
                Post-Audit Declaration
              </option>
              <option value="tiered_by_balance">Tiered By Balance</option>
            </FilterSelect>

            {form.interest_crediting_method === "fixed_rate" && (
              <FilterField
                label="Fixed Annual Interest Rate (%)"
                icon={Percent}
              >
                <input
                  type="number"
                  min="0"
                  className={inputStyle}
                  disabled={locked}
                  onChange={(e) =>
                    updateForm("fixed_annual_interest_rate", e.target.value)
                  }
                  value={form.fixed_annual_interest_rate}
                />
              </FilterField>
            )}

            <div className="md:col-span-2 p-3 bg-slate-50 border border-slate-200/60 rounded-xl text-xs text-slate-500 font-medium">
              💡 {interestPolicyNotes[form.interest_crediting_method]}
            </div>

            {form.interest_crediting_method === "tiered_by_balance" && (
              <div className="md:col-span-2 rounded-2xl border border-dashed border-[#074073]/30 bg-[#074073]/5 p-4 text-xs text-slate-600">
                Tier-band configuration is reserved for the planned tiered
                product workflow.
              </div>
            )}

            {form.interest_crediting_method !== "no_interest" && (
              <>
                <FilterField label="Interest Posting Day" icon={Calendar}>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    className={inputStyle}
                    disabled={locked}
                    onChange={(e) =>
                      updateForm("interest_posting_day", e.target.value)
                    }
                    value={form.interest_posting_day}
                    placeholder="e.g., 5"
                  />
                </FilterField>

                <FilterSelect
                  label="Posting Frequency"
                  icon={Clock}
                  disabled={locked}
                  value={form.interest_posting_frequency}
                  onChange={(e) =>
                    updateForm("interest_posting_frequency", e.target.value)
                  }
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="annually">Annually</option>
                  <option value="on_audit_declaration">
                    On Audit Declaration
                  </option>
                </FilterSelect>

                <FilterSelect
                  label="Compounding Method"
                  icon={Percent}
                  disabled={locked}
                  value={form.interest_compounding_method}
                  onChange={(e) =>
                    updateForm("interest_compounding_method", e.target.value)
                  }
                >
                  <option value="simple">Simple</option>
                  <option value="compound">Compound</option>
                </FilterSelect>
              </>
            )}
          </div>
        </div>

        {/* SECTION 5: WITHDRAWAL RULES */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-3xs space-y-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            5. Withdrawal Rules
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Withdrawal Access
              </label>
              <div className="flex gap-3 h-14">
                {[
                  [false, "Non-Withdrawable"],
                  [true, "Withdrawable"],
                ].map(([val, label]) => (
                  <button
                    key={label}
                    type="button"
                    disabled={locked}
                    onClick={() => updateForm("is_withdrawable", val)}
                    className={`flex-1 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                      form.is_withdrawable === val
                        ? "border-[#074073] bg-[#074073]/5 text-[#074073]"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <FilterField label="Withdrawal Fee (KES)" icon={ArrowUpRight}>
              <input
                type="number"
                min="0"
                className={inputStyle}
                disabled={locked || !form.is_withdrawable}
                onChange={(e) => updateForm("withdrawal_fee", e.target.value)}
                value={form.withdrawal_fee}
                placeholder="N/A"
              />
            </FilterField>
          </div>
        </div>

        {/* SECTION 6: ELIGIBILITY */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-3xs space-y-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            6. Eligibility & Member Setup
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Mandatory Requirement
              </label>
              <div className="flex gap-3 h-14">
                {[
                  [true, "Mandatory for All"],
                  [false, "Optional"],
                ].map(([val, label]) => (
                  <button
                    key={label}
                    type="button"
                    disabled={locked}
                    onClick={() => updateForm("mandatory_for_all_members", val)}
                    className={`flex-1 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                      form.mandatory_for_all_members === val
                        ? "border-[#074073] bg-[#074073]/5 text-[#074073]"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 mt-auto h-14">
              <input
                type="checkbox"
                id="create_on_member_registration"
                disabled={locked}
                checked={form.create_on_member_registration}
                onChange={(e) =>
                  updateForm("create_on_member_registration", e.target.checked)
                }
                className="rounded border-slate-300 text-[#074073]"
              />
              <label
                htmlFor="create_on_member_registration"
                className="text-xs font-bold text-slate-700 cursor-pointer"
              >
                Create on Member Registration
              </label>
            </div>

            <div className="md:col-span-2 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Member Registration Eligibility
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {eligibilityOptions.map(([val, label]) => (
                  <label
                    key={val}
                    className="flex items-center gap-3 p-3 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer transition-all"
                  >
                    <input
                      type="checkbox"
                      disabled={locked}
                      checked={(
                        form.member_registration_eligibilities || []
                      ).includes(val)}
                      onChange={() => toggleEligibility(val)}
                      className="rounded border-slate-300 text-[#074073]"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <FilterField label="Registration Fee Amount (KES)" icon={Coins}>
              <input
                type="number"
                min="0"
                className={inputStyle}
                disabled={locked}
                onChange={(e) =>
                  updateForm("registration_fee_amount", e.target.value)
                }
                value={form.registration_fee_amount}
                placeholder="N/A"
              />
            </FilterField>

            <FilterField label="Exit Notice Days" icon={Clock}>
              <input
                type="number"
                min="0"
                className={inputStyle}
                disabled={locked}
                onChange={(e) => updateForm("exit_notice_days", e.target.value)}
                value={form.exit_notice_days}
                placeholder="N/A"
              />
            </FilterField>

            <div className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50">
              <input
                type="checkbox"
                id="hosts_membership_fee"
                disabled={locked}
                checked={form.hosts_membership_fee}
                onChange={(e) =>
                  updateForm("hosts_membership_fee", e.target.checked)
                }
                className="rounded border-slate-300 text-[#074073]"
              />
              <label
                htmlFor="hosts_membership_fee"
                className="text-xs font-bold text-slate-700 cursor-pointer"
              >
                Hosts Membership Fee
              </label>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50">
              <input
                type="checkbox"
                id="dividend_eligible"
                disabled={locked}
                checked={form.dividend_eligible}
                onChange={(e) =>
                  updateForm("dividend_eligible", e.target.checked)
                }
                className="rounded border-slate-300 text-[#074073]"
              />
              <label
                htmlFor="dividend_eligible"
                className="text-xs font-bold text-slate-700 cursor-pointer"
              >
                Dividend Eligible
              </label>
            </div>

            <div className="md:col-span-2">
              <FilterField label="Product Image URL" icon={ImageIcon}>
                <input
                  className={inputStyle}
                  disabled={locked}
                  onChange={(e) => updateForm("image_url", e.target.value)}
                  value={form.image_url}
                  placeholder="Optional image asset URL"
                />
              </FilterField>
            </div>
          </div>
        </div>

        {/* SECTION 7: DOCUMENTS */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-3xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            7. Required Documents & Conditions
          </h3>
          <p className="text-xs text-slate-400">
            Add short labels only. These populate the checklist when this
            account is being opened.
          </p>

          <div className="space-y-3">
            {(form.required_documents || []).map((row, index) => (
              <div key={index} className="flex items-center gap-3">
                <FilterField label={`Document ${index + 1}`} icon={FileText}>
                  <input
                    className={inputStyle}
                    disabled={locked}
                    maxLength={40}
                    onChange={(e) => updateDocumentRow(index, e.target.value)}
                    value={row.label}
                    placeholder={
                      index === 0
                        ? "e.g. Birth certificate"
                        : "e.g. Parent consent"
                    }
                  />
                </FilterField>

                <button
                  type="button"
                  disabled={locked || form.required_documents.length === 1}
                  onClick={() => removeDocumentRow(index)}
                  className="mt-6 p-3 text-rose-500 hover:bg-rose-50 rounded-2xl transition-colors cursor-pointer disabled:opacity-30"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            disabled={locked}
            onClick={addDocumentRow}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#074073] hover:underline cursor-pointer pt-2"
          >
            <Plus size={14} /> Add Another Document
          </button>
        </div>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200/80">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={locked || changedFields.length === 0}
          onClick={() => setReviewing(true)}
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-[#074073] text-white text-xs font-bold transition-all shadow-2xs cursor-pointer disabled:opacity-50"
        >
          Submit for Approval
        </button>
      </div>
    </div>
  );
};

const FilterField = ({ label, icon: Icon, children }) => (
  <div className="space-y-2 w-full">
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
      {label}
    </label>
    <div className="relative group">
      {Icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none z-10">
          <Icon
            size={18}
            className="text-slate-300 group-focus-within:text-[#074073] transition-colors"
          />
          <div className="w-[1.5px] h-5 bg-slate-200 ml-4 group-focus-within:bg-[#074073]/20 transition-colors" />
        </div>
      )}
      {children}
    </div>
  </div>
);

const FilterSelect = ({
  label,
  icon: Icon,
  value,
  onChange,
  disabled,
  children,
}) => (
  <FilterField label={label} icon={Icon}>
    <div className="relative w-full">
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full pl-[74px] pr-10 py-4 h-14 bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 rounded-2xl transition-all outline-none appearance-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {children}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 z-10">
        <ChevronRight size={16} className="rotate-90" />
      </div>
    </div>
  </FilterField>
);

// --- REUSABLE FORMATTER FOR COMPARISON VALUES ---
const renderFormattedValue = (value, isProposed = false) => {
  if (value === null || value === undefined || value === "") {
    return <span className="text-slate-400 italic font-mono text-xs">—</span>;
  }

  if (typeof value === "boolean") {
    return (
      <span
        className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
          value
            ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
            : "bg-slate-100 text-slate-600 border-slate-200/60"
        }`}
      >
        {value ? "Enabled" : "Disabled"}
      </span>
    );
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return (
        <span className="text-slate-400 italic text-xs">None Configured</span>
      );
    }
    return (
      <div className="flex flex-wrap gap-1.5 py-0.5">
        {value.map((item, index) => (
          <span
            key={index}
            className={`inline-flex items-center gap-1 font-mono text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${
              isProposed
                ? "bg-emerald-100/60 text-emerald-900 border-emerald-300/60"
                : "bg-slate-100 text-slate-700 border-slate-200/60"
            }`}
          >
            {typeof item === "object"
              ? item.label || JSON.stringify(item)
              : String(item)}
          </span>
        ))}
      </div>
    );
  }

  if (typeof value === "object") {
    return (
      <pre className="p-2.5 bg-slate-900 text-slate-100 rounded-xl text-[10px] font-mono overflow-x-auto">
        {JSON.stringify(value, null, 2)}
      </pre>
    );
  }

  return (
    <span
      className={`font-mono text-xs font-bold ${
        isProposed ? "text-emerald-800" : "text-slate-800"
      }`}
    >
      {String(value)}
    </span>
  );
};
