import React, { useState, useEffect, useMemo } from "react";
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
import { useNavigate } from "react-router-dom";

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

const inputStyle =
  "w-full pl-[74px] pr-6 py-4 h-14 bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 rounded-2xl transition-all outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 disabled:opacity-60 disabled:cursor-not-allowed";

const emptyPayload = {
  name: "",
  public_code: "",
  deposit_type: "savings",
  product_purpose: "general",
  account_structure: "single_account",
  target_type: "none",
  default_target_amount: "",
  target_period_months: "",
  target_due_date: "",
  allow_member_defined_target: false,
  target_required: false,
  beneficiary_label: "",
  beneficiary_required_fields: "",
  minimum_contribution: "",
  maximum_contribution: "",
  contribution_frequency: "monthly",
  share_price: "",
  minimum_required_shares: "",
  share_transfer_fee: "",
  deposit_deadline_day: "",
  auto_deduct_monthly_contribution: false,
  enforce_monthly_deposit_rule: false,
  has_late_penalty: false,
  late_penalty_type: "none",
  late_penalty_amount: "",
  penalty_accrual_cadence: "none",
  penalty_grace_days: "",
  penalty_max_per_period: "",
  penalty_posting_mode: "track_only",
  interest_crediting_method: "no_interest",
  fixed_annual_interest_rate: "",
  interest_posting_day: "",
  interest_posting_frequency: "monthly",
  interest_compounding_method: "simple",
  is_withdrawable: true,
  withdrawal_fee: "",
  mandatory_for_all_members: false,
  create_on_member_registration: false,
  member_registration_eligibilities: ["individual"],
  registration_fee_amount: "",
  exit_notice_days: "",
  hosts_membership_fee: false,
  dividend_eligible: false,
  image_url: "",
  required_documents: [{ label: "", required: true }],
};

export const EditFinancialProduct = ({
  productId,
  onBack,
  onNavigateToApprovals,
}) => {
  const [product, setProduct] = useState(null);
  const [form, setForm] = useState(emptyPayload);
  const [scope, setScope] = useState("all_members");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const row = {
          id: productId || "p1",
          name: "Member Regular Savings",
          public_code: "SAV001",
          version_number: 1,
          deposit_type: "savings",
          product_purpose: "general",
          minimum_contribution: "1000",
          edits_used_this_year: 0,
          edits_remaining_this_year: 4,
          edit_limit_reached: false,
        };
        setProduct(row);
        setForm({ ...emptyPayload, ...row });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [productId]);

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
    setForm((current) => ({ ...current, [key]: value }));

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

  const handleEditSubmit = async () => {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      if (onNavigateToApprovals) onNavigateToApprovals();
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-xs font-medium text-slate-400">
        Loading product parameters...
      </div>
    );
  }

  if (reviewing) {
    return (
      <div className="w-full space-y-6 select-none">
        <div className="flex items-center gap-3 pb-6 border-b border-slate-200/80">
          <button
            type="button"
            onClick={() => setReviewing(false)}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 transition-all cursor-pointer shadow-3xs"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span>Financial Products</span>
              <ChevronRight size={10} />
              <span className="text-primary">Review Changes</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
              Review Your Modifications
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {product?.name} ({product?.public_code}) will be sent to a checker
              for approval.
            </p>
          </div>
        </div>

        {/* Disclaimer Banner */}
        <div className="bg-amber-50 border border-amber-200/60 rounded-2xl p-4 flex items-center gap-3 text-xs text-amber-800 font-medium">
          <AlertTriangle size={18} className="text-amber-600 shrink-0" />
          <span>
            Submitting will use the next edit for this product. Remaining edits:{" "}
            <strong>{product?.edits_remaining_this_year ?? 4} of 4</strong>.
          </span>
        </div>

        {/* Scope Selector Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-3xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Apply This Change To
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              [
                "all_members",
                "All Members - Existing and New",
                "Takes effect immediately, no new version created.",
              ],
              [
                "new_members_only",
                "New Members Only",
                "Creates a new version; existing members keep current terms.",
              ],
            ].map(([value, label, desc]) => (
              <button
                key={value}
                type="button"
                onClick={() => setScope(value)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  scope === value
                    ? "border-[#074073] bg-[#074073]/5 text-[#074073]"
                    : "border-slate-200 bg-white hover:bg-slate-50 text-slate-600"
                }`}
              >
                <p className="font-bold text-xs">{label}</p>
                <p className="text-[11px] text-slate-400 mt-1">{desc}</p>
              </button>
            ))}
          </div>

          {scope === "all_members" && (
            <div className="flex gap-2 p-3 bg-amber-50 border border-amber-200/60 rounded-xl text-xs text-amber-800 font-medium">
              <AlertTriangle size={16} className="shrink-0 text-amber-600" />
              <span>
                Approving updates the live product in place. Account snapshots
                preserve old terms for historical reference.
              </span>
            </div>
          )}
        </div>

        {/* Changed Fields Grid */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-3xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            {changedFields.length} Field{changedFields.length === 1 ? "" : "s"}{" "}
            Changed
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200/60 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-2.5 px-3">Field</th>
                  <th className="py-2.5 px-3">Current</th>
                  <th className="py-2.5 px-3">Your Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {changedFields.length > 0 ? (
                  changedFields.map((item) => (
                    <tr key={item.field}>
                      <td className="py-3 px-3 font-sans font-semibold text-slate-700 capitalize">
                        {item.field.replace(/_/g, " ")}
                      </td>
                      <td className="py-3 px-3 text-slate-400">
                        {String(item.current ?? "N/A")}
                      </td>
                      <td className="py-3 px-3 font-bold text-emerald-600">
                        {String(item.proposed ?? "N/A")}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="py-6 text-center text-slate-400 font-sans"
                    >
                      No fields changed.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => setReviewing(false)}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
          >
            Back to Edit
          </button>
          <button
            type="button"
            disabled={saving || changedFields.length === 0}
            onClick={handleEditSubmit}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-[#074073] text-white text-xs font-bold transition-all shadow-2xs cursor-pointer disabled:opacity-50"
          >
            {saving ? "Submitting..." : "Confirm & Submit for Approval"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 select-none">
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
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-3xs space-y-5">
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
              />
            </FilterField>

            <FilterField label="Product Code" icon={Hash}>
              <input
                className={inputStyle}
                disabled={locked}
                onChange={(e) => updateForm("public_code", e.target.value)}
                value={form.public_code}
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
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-3xs space-y-5">
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

            <FilterField label="Default Target Amount (KES)" icon={DollarSign}>
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
          </div>
        </div>

        {/* SECTION 3: SAVINGS RULES */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-3xs space-y-5">
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
          </div>
        </div>

        {/* SECTION 4: INTEREST POLICY */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-3xs space-y-5">
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
              <FilterField label="Fixed Annual Rate (%)" icon={Percent}>
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
          </div>
        </div>

        {/* SECTION 5: WITHDRAWAL RULES */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-3xs space-y-5">
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

        {/* SECTION 6: DOCUMENTS */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-3xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            6. Required Documents & Conditions
          </h3>
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
                    placeholder="e.g. ID Card, Consent Letter"
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
          onClick={onBack}
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
