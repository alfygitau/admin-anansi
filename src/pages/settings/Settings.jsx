import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  BadgeCheck,
  Bell,
  ChevronDown,
  CreditCard,
  FileText,
  Lock,
  PackagePlus,
  WalletCards,
  X,
} from "lucide-react";
import {
  approveDepositSubmission,
  createDepositSubmission,
  createProduct,
  getDepositApproval,
  getDepositApprovals,
  getDepositProduct,
  getDepositProducts,
  getProducts,
  rejectDepositSubmission,
  returnDepositSubmission,
} from "../../sdk/products/products";

const emptyPayload = {
  name: "",
  public_code: "",
  deposit_type: "savings",
  product_purpose: "general",
  account_structure: "single_account",
  allow_member_sub_accounts: false,
  allow_beneficiary_sub_accounts: false,
  beneficiary_label: "",
  beneficiary_required_fields: "",
  target_type: "none",
  default_target_amount: "",
  target_period_months: "",
  target_due_date: "",
  allow_member_defined_target: false,
  target_required: false,
  minimum_contribution: "",
  maximum_contribution: "",
  contribution_frequency: "monthly",
  interest_crediting_method: "post_audit_declaration",
  fixed_annual_interest_rate: "",
  interest_posting_day: "",
  interest_posting_frequency: "monthly",
  interest_compounding_method: "simple",
  is_withdrawable: false,
  withdrawal_fee: "",
  mandatory_for_all_members: true,
  create_on_member_registration: true,
  member_registration_eligibility: "all",
  member_registration_eligibilities: ["all"],
  required_documents: [{ label: "", required: true }],
  share_price: "",
  minimum_required_shares: "",
  registration_fee_amount: "",
  hosts_membership_fee: false,
  auto_deduct_monthly_contribution: false,
  dividend_eligible: false,
  exit_notice_days: "",
  share_transfer_fee: "",
  image_url: "",
  deposit_deadline_day: "",
  has_late_penalty: false,
  late_penalty_type: "none",
  late_penalty_amount: "",
  penalty_accrual_cadence: "none",
  penalty_grace_days: "",
  penalty_max_per_period: "",
  penalty_posting_mode: "track_only",
  enforce_monthly_deposit_rule: false,
  description: "",
};

const fieldLabels = {
  name: "Product name",
  public_code: "Product code",
  deposit_type: "Deposit type",
  product_purpose: "Product purpose",
  account_structure: "Account structure",
  allow_member_sub_accounts: "Allow member sub-accounts",
  allow_beneficiary_sub_accounts: "Allow beneficiary sub-accounts",
  beneficiary_label: "Beneficiary label",
  beneficiary_required_fields: "Required beneficiary fields",
  target_type: "Target type",
  default_target_amount: "Default target amount",
  target_period_months: "Target period months",
  target_due_date: "Target due date",
  allow_member_defined_target: "Allow member-defined target",
  target_required: "Target required",
  minimum_contribution: "Minimum saving",
  monthly_minimum_contribution: "Minimum saving",
  maximum_contribution: "Maximum saving",
  contribution_frequency: "Savings frequency",
  deposit_frequency: "Savings frequency",
  interest_crediting_method: "Interest crediting method",
  fixed_annual_interest_rate: "Fixed annual rate",
  interest_posting_day: "Interest posting day",
  interest_posting_frequency: "Interest posting frequency",
  interest_compounding_method: "Interest compounding method",
  is_withdrawable: "Withdrawal status",
  withdrawal_fee: "Withdrawal fee",
  create_on_member_registration: "Opened on registration",
  member_registration_eligibility: "Eligibility",
  member_registration_eligibilities: "Registration eligibility",
  required_documents: "Required documents",
  share_price: "Share price",
  minimum_required_shares: "Minimum required shares",
  registration_fee_amount: "Registration fee",
  hosts_membership_fee: "Hosts membership fee",
  auto_deduct_monthly_contribution: "Auto-deduct savings",
  dividend_eligible: "Dividend eligible",
  exit_notice_days: "Exit notice days",
  share_transfer_fee: "Share transfer fee",
  image_url: "Image URL",
  deposit_deadline_day: "Deposit deadline day",
  has_late_penalty: "Late penalty",
  late_penalty_type: "Late penalty type",
  late_penalty_amount: "Late penalty amount",
  penalty_accrual_cadence: "Penalty accrual cadence",
  penalty_grace_days: "Penalty grace days",
  penalty_max_per_period: "Penalty max per period",
  penalty_posting_mode: "Penalty posting mode",
  enforce_monthly_deposit_rule: "Enforce monthly deposit rule",
  description: "Description",
};

const formatMoney = (value) => {
  if (value === null || value === undefined || value === "") return "N/A";
  return `KES ${Number(value).toLocaleString()}`;
};

const titleCase = (value) =>
  String(value || "N/A")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const toOptionalNumber = (value) =>
  value === "" || value === null || value === undefined
    ? undefined
    : Number(value);

const generateProductCode = (name) => {
  const normalizedName = String(name || "")
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, " ");
  const knownPrefixes = [
    [/SAVING|SAVINGS/, "SAV"],
    [/SHARE|SHARES/, "SHR"],
    [/FAMILY\s+CARE|FCF/, "FCF"],
    [/ELIMU/, "ELM"],
    [/HOLIDAY/, "HOL"],
    [/WELFARE/, "WEL"],
    [/EMERGENCY/, "EMG"],
  ];
  const knownPrefix = knownPrefixes.find(([pattern]) =>
    pattern.test(normalizedName),
  );

  if (knownPrefix) return `${knownPrefix[1]}-001`;

  const words = normalizedName.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) return "";

  const prefix = words[0].slice(0, 3);

  return `${prefix.padEnd(3, "X")}-001`;
};

const savingsFrequencyNotes = {
  monthly:
    "Minimum saving amount is expected every month. Same minimum/maximum fields apply for the monthly cadence.",
  weekly:
    "Minimum saving amount is expected every week instead of monthly. Same minimum/maximum fields apply - only the cadence changes.",
  daily:
    "Minimum saving amount is expected daily. Same minimum/maximum fields apply - only the cadence changes.",
  one_off:
    "No fixed cadence enforced - members may save any amount at any time, subject to the configured minimum per deposit. Not currently used by Savings, Shares, or Family Care Fund.",
};

const interestPolicyNotes = {
  no_interest:
    "No interest or dividend is ever credited on this balance. Used for Family Care Fund, where contributions are pooled welfare funds, not a return-bearing account.",
  fixed_rate:
    "Reveals a single annual rate (%) field. Interest accrues on the balance at this fixed rate, credited on the schedule configured for the product - no audit dependency.",
  post_audit_declaration:
    "Interest or dividends are declared after audit or board review, then credited using the approved annual declaration for the product.",
  tiered_by_balance:
    "Reveals a balance-band table (e.g. 0-50k / 50k-200k / 200k+), each with its own rate. Intended for goal-based products like the planned CTS Elimu Fund - not currently used by Savings, Shares, or Family Care Fund.",
};

const splitCsv = (value) =>
  String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const joinCsv = (value) => (Array.isArray(value) ? value.join(", ") : "");

const normalizeDocumentRows = (rows) =>
  (Array.isArray(rows) ? rows : [])
    .map((row) => ({
      label: String(row?.label || "").trim(),
      required: row?.required ?? true,
    }))
    .filter((row) => row.label);

const formatApprovalValue = (value) => {
  if (
    value === null ||
    value === undefined ||
    value === "" ||
    (Array.isArray(value) && value.length === 0)
  ) {
    return "N/A";
  }

  if (typeof value === "boolean") return value ? "Yes" : "No";

  if (Array.isArray(value)) {
    if (value.every((item) => typeof item === "object" && item?.label)) {
      return value
        .map(
          (item) =>
            `${item.label}${item.required === false ? " (optional)" : ""}`,
        )
        .join(", ");
    }

    return value
      .map((item) =>
        typeof item === "object" ? JSON.stringify(item) : titleCase(item),
      )
      .join(", ");
  }

  if (typeof value === "object") return JSON.stringify(value);

  return String(value);
};

const eligibilityOptions = [
  ["individual", "Individual"],
  ["corporate", "Corporate"],
  ["group", "Group"],
  ["all", "All Members"],
];

const getProductCode = (product) =>
  product?.public_code || (product?.code ? String(product.code) : "N/A");

const getProductSummary = (product) => {
  if (product?.contribution_value) return product.contribution_value;
  if (product?.deposit_type === "shares" || product?.is_shares) {
    return `${formatMoney(product?.share_price)}/share - ${
      product?.minimum_required_shares || 0
    } min`;
  }
  const amount =
    product?.monthly_minimum_contribution || product?.required_deposit_amount;
  const frequency = product?.deposit_frequency || "monthly";
  return amount ? `${formatMoney(amount)}/${titleCase(frequency)}` : "N/A";
};

const isDepositProduct = (product) => {
  const name = String(product?.name || "").toLowerCase();
  const productType = String(product?.product_type?.name || "").toLowerCase();

  return Boolean(
    product?.category === "deposit" ||
    product?.deposit_type ||
    product?.is_savings ||
    product?.is_shares ||
    product?.is_family_care_fund ||
    name.includes("saving") ||
    name.includes("share") ||
    name.includes("family care") ||
    name.includes("fcf") ||
    name.includes("welfare") ||
    name.includes("elimu") ||
    name.includes("school") ||
    name.includes("holiday") ||
    name.includes("deposit") ||
    productType.includes("saving") ||
    productType.includes("share") ||
    productType.includes("welfare") ||
    productType.includes("deposit") ||
    productType.includes("non-loan"),
  );
};

const matchesProductStatus = (product, status) => {
  if (status === "archived") return product?.status === "archived";
  return product?.status !== "archived";
};

const mapProductToPayload = (product) => ({
  name: product?.name || "",
  public_code: getProductCode(product) === "N/A" ? "" : getProductCode(product),
  deposit_type: product?.deposit_type || "savings",
  product_purpose: product?.product_purpose || "general",
  account_structure: product?.account_structure || "single_account",
  allow_member_sub_accounts: Boolean(product?.allow_member_sub_accounts),
  allow_beneficiary_sub_accounts: Boolean(
    product?.allow_beneficiary_sub_accounts,
  ),
  beneficiary_label: product?.beneficiary_label || "",
  beneficiary_required_fields: joinCsv(product?.beneficiary_required_fields),
  target_type: product?.target_type || "none",
  default_target_amount: product?.default_target_amount || "",
  target_period_months: product?.target_period_months || "",
  target_due_date: product?.target_due_date
    ? String(product.target_due_date).slice(0, 10)
    : "",
  allow_member_defined_target: Boolean(product?.allow_member_defined_target),
  target_required: Boolean(product?.target_required),
  minimum_contribution:
    product?.monthly_minimum_contribution ||
    product?.required_deposit_amount ||
    "",
  maximum_contribution: product?.maximum_contribution || "",
  contribution_frequency: product?.deposit_frequency || "monthly",
  interest_crediting_method:
    product?.interest_crediting_method || "post_audit_declaration",
  fixed_annual_interest_rate: product?.fixed_annual_interest_rate || "",
  interest_posting_day: product?.interest_posting_day || "",
  interest_posting_frequency: product?.interest_posting_frequency || "monthly",
  interest_compounding_method: product?.interest_compounding_method || "simple",
  is_withdrawable: Boolean(product?.is_withdrawable),
  withdrawal_fee: product?.withdrawal_fee || "",
  mandatory_for_all_members:
    product?.member_registration_eligibility === "all" ||
    Boolean(product?.create_on_member_registration),
  create_on_member_registration: Boolean(
    product?.create_on_member_registration,
  ),
  member_registration_eligibility:
    product?.member_registration_eligibility || "individual",
  member_registration_eligibilities:
    product?.member_registration_eligibilities ||
    (product?.member_registration_eligibility
      ? [product.member_registration_eligibility]
      : ["individual"]),
  required_documents:
    product?.required_documents?.length > 0
      ? product.required_documents
      : [{ label: "", required: true }],
  share_price: product?.share_price || "",
  minimum_required_shares: product?.minimum_required_shares || "",
  registration_fee_amount: product?.registration_fee_amount || "",
  hosts_membership_fee: Boolean(product?.hosts_membership_fee),
  auto_deduct_monthly_contribution: Boolean(
    product?.auto_deduct_monthly_contribution,
  ),
  dividend_eligible: Boolean(product?.dividend_eligible),
  exit_notice_days: product?.exit_notice_days || "",
  share_transfer_fee: product?.share_transfer_fee || "",
  image_url: product?.image_url || "",
  deposit_deadline_day: product?.deposit_deadline_day || "",
  has_late_penalty: Boolean(product?.has_late_penalty),
  late_penalty_type: product?.late_penalty_type || "none",
  late_penalty_amount: product?.late_penalty_amount || "",
  penalty_accrual_cadence: product?.penalty_accrual_cadence || "none",
  penalty_grace_days: product?.penalty_grace_days || "",
  penalty_max_per_period: product?.penalty_max_per_period || "",
  penalty_posting_mode: product?.penalty_posting_mode || "track_only",
  enforce_monthly_deposit_rule: Boolean(product?.enforce_monthly_deposit_rule),
  description: product?.description || "",
});

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
  fixed_annual_interest_rate: toOptionalNumber(form.fixed_annual_interest_rate),
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

const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
    <div className="w-full max-w-[520px] rounded-[8px] border border-[#dee3eb] bg-white shadow-xl">
      <div className="flex justify-end px-5 pt-5">
        <button
          className="flex h-8 w-8 items-center justify-center rounded border border-[#dee3eb] text-[#737a87]"
          onClick={onClose}
          type="button"
        >
          <X size={16} />
        </button>
      </div>
      <div className="px-7 pb-7">{children}</div>
    </div>
  </div>
);

const StatusBadge = ({ children, tone = "green" }) => {
  const styles = {
    green: "bg-[#def2e3] text-[#1c7340]",
    amber: "bg-[#fcf2d9] text-[#9e7305]",
    red: "bg-[#fbecea] text-[#bf3d33]",
    gray: "bg-[#eef1f5] text-[#737a87]",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${styles[tone]}`}
    >
      {children}
    </span>
  );
};

const SettingsLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8">
      <p className="mb-5 text-[12px] font-medium text-[#737a87]">
        Settings / Manage Products
      </p>
      <div className="mb-6">
        <h1 className="text-[26px] font-bold text-[#1c2129]">
          Manage Products
        </h1>
        <p className="text-[13px] text-[#737a87]">
          Select a product category to configure
        </p>
      </div>
      <div className="grid max-w-[940px] grid-cols-1 gap-5 md:grid-cols-2">
        <button
          className="rounded-[8px] border border-[#198755] bg-white p-7 text-left transition hover:shadow-md"
          onClick={() => navigate("/admin/settings/products/deposits")}
          type="button"
        >
          <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-[8px] bg-[#e0f5f5] text-[#007070]">
            <WalletCards size={24} />
          </span>
          <h2 className="mb-2 text-[17px] font-bold text-[#1c2129]">
            Deposit Products
          </h2>
          <p className="mb-5 text-[12px] text-[#737a87]">
            Savings, Shares, and Family Care Fund products.
          </p>
          <div className="flex items-center justify-between text-[12px] font-semibold">
            <span className="text-[#007070]">Configured products</span>
            <span className="text-[#737a87]">View</span>
          </div>
        </button>
        <button
          className="rounded-[8px] border border-[#dee3eb] bg-white p-7 text-left transition hover:border-[#007070]"
          onClick={() => navigate("/admin/settings/products/loans/create")}
          type="button"
        >
          <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-[8px] bg-[#e0f5f5] text-[#007070]">
            <CreditCard size={24} />
          </span>
          <h2 className="mb-2 text-[17px] font-bold text-[#1c2129]">
            Loan Products
          </h2>
          <p className="mb-5 text-[12px] text-[#737a87]">
            Growth Loan, Biashara Plus, Plot Purchase, and more.
          </p>
          <div className="flex items-center justify-between text-[12px] font-semibold">
            <span className="text-[#007070]">Existing setup</span>
            <span className="text-[#737a87]">View</span>
          </div>
        </button>
      </div>
    </div>
  );
};

const DepositProductsList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [approvals, setApprovals] = useState([]);
  const [status, setStatus] = useState("live");
  const [loading, setLoading] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);
  const [limitProduct, setLimitProduct] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [productRows, approvalRows] = await Promise.all([
          getDepositProducts(status),
          getDepositApprovals("pending"),
        ]);
        if (Array.isArray(productRows) && productRows.length > 0) {
          setProducts(productRows);
        } else {
          const legacyRows = await getProducts();
          setProducts(
            Array.isArray(legacyRows)
              ? legacyRows
                  .filter(isDepositProduct)
                  .filter((product) => matchesProductStatus(product, status))
              : [],
          );
        }
        setApprovals(Array.isArray(approvalRows) ? approvalRows : []);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [status]);

  const activeCount = products.filter(
    (item) => item?.status !== "archived",
  ).length;
  const archivedCount = products.filter(
    (item) => item?.status === "archived",
  ).length;

  return (
    <div className="p-8">
      <p className="mb-5 text-[12px] font-medium text-[#737a87]">
        Settings / Manage Products / Deposit Products
      </p>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-bold text-[#1c2129]">
            Deposit Products
          </h1>
          <p className="text-[12px] text-[#737a87]">
            {products.length} products configured
          </p>
        </div>
        <div className="relative">
          <button
            className="flex h-10 items-center gap-2 rounded-[8px] bg-[#007070] px-5 text-[13px] font-semibold text-white"
            onClick={() => setActionsOpen((value) => !value)}
            type="button"
          >
            Quick Actions <ChevronDown size={16} />
          </button>
          {actionsOpen && (
            <div className="absolute right-0 top-12 z-10 w-[260px] overflow-hidden rounded-[8px] border border-[#dee3eb] bg-white shadow-lg">
              <button
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-[13px] font-semibold text-[#1c2129] hover:bg-[#f6f7f9]"
                onClick={() =>
                  navigate("/admin/settings/products/deposits/create")
                }
                type="button"
              >
                <PackagePlus size={16} /> Create Product
              </button>
              <button
                className="flex w-full items-center gap-3 border-t border-[#dee3eb] bg-[#fcf2d9] px-4 py-3 text-left text-[13px] font-semibold text-[#1c2129]"
                onClick={() =>
                  navigate("/admin/settings/products/deposits/approvals")
                }
                type="button"
              >
                <Bell size={16} />
                <span>
                  Review Approvals
                  <span className="block text-[10.5px] text-[#9e7305]">
                    {approvals.length} pending
                  </span>
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mb-5 flex gap-6 border-b border-[#dee3eb]">
        {[
          ["live", `Active (${activeCount})`],
          ["archived", `Archived (${archivedCount})`],
        ].map(([value, label]) => (
          <button
            className={`pb-2 text-[13px] ${
              status === value
                ? "border-b-2 border-[#007070] font-bold text-[#1c2129]"
                : "font-medium text-[#737a87]"
            }`}
            key={value}
            onClick={() => setStatus(value)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto rounded-[8px] border border-[#dee3eb] bg-white">
        <div className="min-w-[760px]">
          <div className="grid grid-cols-[2fr_1fr_2fr_1fr_90px] px-5 py-3 text-[11px] font-bold text-[#737a87]">
            <span>Product Name</span>
            <span>Code</span>
            <span>Contribution / Value</span>
            <span>Status</span>
            <span></span>
          </div>
          {loading ? (
            <div className="border-t border-[#dee3eb] px-5 py-8 text-[13px] text-[#737a87]">
              Loading deposit products...
            </div>
          ) : products.length === 0 ? (
            <div className="border-t border-[#dee3eb] px-5 py-8 text-[13px] text-[#737a87]">
              No deposit products found.
            </div>
          ) : (
            products.map((product) => (
              <div
                className="grid grid-cols-[2fr_1fr_2fr_1fr_90px] items-center border-t border-[#dee3eb] px-5 py-4 text-[12px]"
                key={product.id}
              >
                <span className="font-semibold text-[#1c2129]">
                  {product.name}
                </span>
                <span className="text-[#737a87]">
                  {getProductCode(product)}
                </span>
                <span className="text-[#1c2129]">
                  {getProductSummary(product)}
                </span>
                <span>
                  <StatusBadge
                    tone={product.status === "archived" ? "gray" : "green"}
                  >
                    {product.status === "archived" ? "Archived" : "Live"}
                  </StatusBadge>
                </span>
                <button
                  className="text-left text-[12px] font-semibold text-[#007070] disabled:text-[#9ea6b0]"
                  disabled={product.status === "archived"}
                  onClick={() => {
                    if (
                      product.edit_limit_reached ||
                      product.edits_remaining_this_year === 0
                    ) {
                      setLimitProduct(product);
                      return;
                    }
                    navigate(
                      `/admin/settings/products/deposits/${product.id}/edit`,
                    );
                  }}
                  type="button"
                >
                  Edit
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      {limitProduct && (
        <Modal onClose={() => setLimitProduct(null)}>
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#fae5e3] text-[#bf3d33]">
            <Lock size={18} />
          </div>
          <h2 className="mb-3 text-[17px] font-bold text-[#171c21]">
            Edit limit reached for this year
          </h2>
          <p className="mb-4 text-[12.5px] text-[#757d87]">
            {limitProduct.name} has already used all 4 edits allowed this year.
            This product cannot be edited again until January 1 of next year.
          </p>
          <div className="flex justify-end">
            <button
              className="rounded-[8px] bg-[#757d87] px-5 py-2.5 text-[12px] font-semibold text-white"
              onClick={() => setLimitProduct(null)}
              type="button"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

const Field = ({ label, children, help }) => (
  <label className="block">
    <span className="mb-1 block text-[12px] font-semibold text-[#171c21]">
      {label}
    </span>
    {children}
    {help && (
      <span className="mt-1 block text-[11px] text-[#737a87]">{help}</span>
    )}
  </label>
);

const inputClass =
  "h-9 w-full rounded-[6px] border border-[#dee3eb] bg-white px-3 text-[12px] text-[#1c2129] disabled:bg-[#f6f7f9] disabled:text-[#737a87]";

const ExplanationPanel = ({ children }) => (
  <div className="rounded-[8px] bg-[#dff4f4] px-4 py-3 text-[11.5px] font-semibold leading-snug text-[#007070]">
    {children}
  </div>
);

const DepositProductForm = ({ mode }) => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const isEdit = mode === "edit";
  const [product, setProduct] = useState(null);
  const [form, setForm] = useState(emptyPayload);
  const [scope, setScope] = useState("all_members");
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const [codeEdited, setCodeEdited] = useState(isEdit);

  useEffect(() => {
    if (!isEdit) return;
    const loadProduct = async () => {
      setLoading(true);
      try {
        const row = await getDepositProduct(productId);
        setProduct(row);
        setForm(mapProductToPayload(row));
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [isEdit, productId]);

  const locked = Boolean(product?.edit_limit_reached);
  const original = useMemo(
    () => (product ? mapProductToPayload(product) : null),
    [product],
  );
  const changedFields = useMemo(() => {
    if (!original) {
      return Object.keys(form)
        .filter((key) => form[key] !== "" && key !== "description")
        .map((key) => ({ field: key, current: null, proposed: form[key] }));
    }
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

  const updateProductName = (value) => {
    setForm((current) => ({
      ...current,
      name: value,
      public_code: codeEdited
        ? current.public_code
        : generateProductCode(value),
    }));
  };

  const updateProductCode = (value) => {
    setCodeEdited(true);
    updateForm("public_code", value.toUpperCase());
  };

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

  const submitForApproval = async () => {
    if (!form.name.trim()) {
      return;
    }
    if (!form.minimum_contribution && form.deposit_type !== "shares") {
      return;
    }
    setSaving(true);
    try {
      await createDepositSubmission({
        action: isEdit ? "update" : "create",
        product_id: isEdit ? productId : undefined,
        scope,
        payload: buildSubmissionPayload(form),
      });
      navigate("/admin/settings/products/deposits/approvals");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Unable to submit product for approval.";
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-[13px] text-[#737a87]">Loading product...</div>
    );
  }

  if (reviewing) {
    return (
      <div className="p-8">
        <button
          className="mb-5 flex items-center gap-2 text-[12px] font-semibold text-[#007070]"
          onClick={() => setReviewing(false)}
          type="button"
        >
          <ArrowLeft size={16} /> Back to Edit
        </button>
        <h1 className="text-[26px] font-bold text-[#1c2129]">
          Review Your Changes
        </h1>
        <p className="mb-6 text-[13px] text-[#737a87]">
          {isEdit
            ? `${product?.name} (${getProductCode(product)})`
            : `${form.name} (${form.public_code || "new code"})`}{" "}
          will be sent to a checker.
        </p>
        {isEdit && (
          <div className="mb-5 rounded-[8px] bg-[#fcf2d9] px-4 py-3 text-[12px] text-[#9e7305]">
            Submitting will use the next edit for this product. Remaining edits:{" "}
            {product?.edits_remaining_this_year ?? 4} of 4.
          </div>
        )}
        {isEdit && (
          <div className="mb-6 rounded-[8px] border border-[#dee3eb] bg-white p-6">
            <h2 className="mb-3 text-[15px] font-bold text-[#171c21]">
              Apply This Change To
            </h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {[
                ["all_members", "All Members - Existing and New"],
                ["new_members_only", "New Members Only"],
              ].map(([value, label]) => (
                <button
                  className={`rounded-[8px] border p-4 text-left text-[12px] ${
                    scope === value
                      ? "border-[#1f7a4d] bg-[#e5f2eb]"
                      : "border-[#dee3eb] bg-white"
                  }`}
                  key={value}
                  onClick={() => setScope(value)}
                  type="button"
                >
                  <span className="font-bold text-[#171c21]">{label}</span>
                  <span className="mt-1 block text-[#737a87]">
                    {value === "all_members"
                      ? "Takes effect immediately, no new version created."
                      : "Creates a new version; existing members keep current terms."}
                  </span>
                </button>
              ))}
            </div>
            {scope === "all_members" && (
              <div className="mt-4 flex gap-2 rounded-[8px] bg-[#fcf2d9] px-4 py-3 text-[11.5px] text-[#9e7305]">
                <AlertTriangle size={16} />
                <span>
                  Approving updates the live product in place. Account snapshots
                  preserve the old terms for historical reference.
                </span>
              </div>
            )}
          </div>
        )}
        <div className="overflow-x-auto rounded-[8px] border border-[#dee3eb] bg-white p-6">
          <h2 className="mb-4 text-[15px] font-bold text-[#171c21]">
            {changedFields.length || 0} field
            {changedFields.length === 1 ? "" : "s"} changed
          </h2>
          <div className="min-w-[620px]">
            <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-[#dee3eb] pb-3 text-[11px] font-bold text-[#737a87]">
              <span>Field</span>
              <span>Current</span>
              <span>Your Change</span>
            </div>
            {changedFields.map((field) => (
              <div
                className="grid grid-cols-[1fr_1fr_1fr] border-b border-[#eef1f5] py-3 text-[12px]"
                key={field.field}
              >
                <span className="font-semibold text-[#1c2129]">
                  {fieldLabels[field.field] || titleCase(field.field)}
                </span>
                <span className="text-[#737a87]">
                  {String(field.current ?? "N/A")}
                </span>
                <span className="text-[#007070]">
                  {String(field.proposed ?? "N/A")}
                </span>
              </div>
            ))}
            {changedFields.length === 0 && (
              <p className="py-4 text-[12px] text-[#737a87]">
                No fields changed.
              </p>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            className="rounded-[8px] border border-[#dee3eb] px-5 py-2.5 text-[12px] font-semibold text-[#737a87]"
            onClick={() => setReviewing(false)}
            type="button"
          >
            Back to Edit
          </button>
          <button
            className="rounded-[8px] bg-[#007070] px-5 py-2.5 text-[12px] font-semibold text-white disabled:bg-[#9ea6b0]"
            disabled={saving || changedFields.length === 0}
            onClick={submitForApproval}
            type="button"
          >
            {saving ? "Submitting..." : "Confirm & Submit for Approval"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <button
        className="mb-5 flex items-center gap-2 text-[12px] font-semibold text-[#007070]"
        onClick={() => navigate("/admin/settings/products/deposits")}
        type="button"
      >
        <ArrowLeft size={16} /> Back to Deposit Products
      </button>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-bold text-[#1c2129]">
            {isEdit ? "Edit Deposit Product" : "Create Deposit Product"}
          </h1>
          <p className="text-[13px] text-[#737a87]">
            {isEdit
              ? `${product?.name} (${getProductCode(product)}) - version ${
                  product?.version_number || 1
                }`
              : "Configure a new deposit-taking product for approval."}
          </p>
        </div>
        {isEdit && (
          <StatusBadge tone={locked ? "red" : "amber"}>
            {locked
              ? "4th edit used - 0 remaining"
              : `${product?.edits_used_this_year || 0} edits used - ${
                  product?.edits_remaining_this_year ?? 4
                } remaining`}
          </StatusBadge>
        )}
      </div>
      {locked && (
        <div className="mb-6 rounded-[8px] bg-[#fbecea] px-4 py-3 text-[12px] text-[#bf3d33]">
          This product has reached its edit limit for this year. Fields are
          locked until January 1 of next year.
        </div>
      )}
      <div className="space-y-6">
        <section className="rounded-[8px] border border-[#dee3eb] bg-white p-6">
          <h2 className="mb-4 text-[16px] font-bold text-[#171c21]">
            1. Product Selection
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <Field label="Product name">
              <input
                className={inputClass}
                disabled={locked}
                onChange={(event) => updateProductName(event.target.value)}
                value={form.name}
              />
            </Field>
            <Field
              help={
                isEdit
                  ? "Locked product identity should not change lightly."
                  : ""
              }
              label="Product code"
            >
              <input
                className={inputClass}
                disabled={locked}
                onChange={(event) => updateProductCode(event.target.value)}
                value={form.public_code}
              />
            </Field>
            <Field label="Deposit type">
              <select
                className={inputClass}
                disabled={locked}
                onChange={(event) =>
                  updateForm("deposit_type", event.target.value)
                }
                value={form.deposit_type}
              >
                <option value="savings">Savings</option>
                <option value="shares">Shares</option>
                <option value="family_care_fund">Family Care Fund</option>
                <option value="custom">Custom</option>
              </select>
            </Field>
            <Field label="Product purpose">
              <select
                className={inputClass}
                disabled={locked}
                onChange={(event) =>
                  updateForm("product_purpose", event.target.value)
                }
                value={form.product_purpose}
              >
                <option value="general">General savings</option>
                <option value="welfare">Welfare</option>
                <option value="education">Education / Elimu</option>
                <option value="holiday">Holiday savings</option>
                <option value="goal_savings">Goal savings</option>
                <option value="emergency">Emergency</option>
                <option value="custom">Custom</option>
              </select>
            </Field>
            <Field label="Account structure">
              <select
                className={inputClass}
                disabled={locked}
                onChange={(event) =>
                  updateForm("account_structure", event.target.value)
                }
                value={form.account_structure}
              >
                <option value="single_account">Single account</option>
                <option value="member_sub_accounts">Member sub-accounts</option>
                <option value="beneficiary_sub_accounts">
                  Beneficiary sub-accounts
                </option>
              </select>
            </Field>
          </div>
        </section>
        <section className="rounded-[8px] border border-[#dee3eb] bg-white p-6">
          <h2 className="mb-4 text-[16px] font-bold text-[#171c21]">
            2. Special Purpose Rules
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Target type">
              <select
                className={inputClass}
                disabled={locked}
                onChange={(event) =>
                  updateForm("target_type", event.target.value)
                }
                value={form.target_type}
              >
                <option value="none">No target</option>
                <option value="fixed_amount">Fixed amount</option>
                <option value="per_beneficiary">Per beneficiary</option>
                <option value="recurring_period">Recurring period</option>
              </select>
            </Field>
            <Field label="Default target amount (KES)">
              <input
                className={inputClass}
                disabled={locked || form.target_type === "none"}
                min="0"
                onChange={(event) =>
                  updateForm("default_target_amount", event.target.value)
                }
                placeholder="N/A"
                type="number"
                value={form.default_target_amount}
              />
            </Field>
            <Field label="Target period months">
              <input
                className={inputClass}
                disabled={locked || form.target_type !== "recurring_period"}
                min="1"
                onChange={(event) =>
                  updateForm("target_period_months", event.target.value)
                }
                placeholder="N/A"
                type="number"
                value={form.target_period_months}
              />
            </Field>
            <Field label="Target due date">
              <input
                className={inputClass}
                disabled={locked || form.target_type === "none"}
                onChange={(event) =>
                  updateForm("target_due_date", event.target.value)
                }
                type="date"
                value={form.target_due_date}
              />
            </Field>
            <label className="flex items-center gap-3 rounded-[8px] border border-[#dee3eb] bg-[#f9fafb] px-4 py-3 text-[12px] font-semibold text-[#171c21]">
              <input
                checked={form.allow_member_defined_target}
                disabled={locked}
                onChange={(event) =>
                  updateForm(
                    "allow_member_defined_target",
                    event.target.checked,
                  )
                }
                type="checkbox"
              />
              Allow member-defined target
            </label>
            <label className="flex items-center gap-3 rounded-[8px] border border-[#dee3eb] bg-[#f9fafb] px-4 py-3 text-[12px] font-semibold text-[#171c21]">
              <input
                checked={form.target_required}
                disabled={locked}
                onChange={(event) =>
                  updateForm("target_required", event.target.checked)
                }
                type="checkbox"
              />
              Target required
            </label>
            {form.account_structure !== "single_account" && (
              <>
                <Field label="Beneficiary label">
                  <input
                    className={inputClass}
                    disabled={
                      locked ||
                      form.account_structure !== "beneficiary_sub_accounts"
                    }
                    onChange={(event) =>
                      updateForm("beneficiary_label", event.target.value)
                    }
                    placeholder="Child, Project, Trip"
                    value={form.beneficiary_label}
                  />
                </Field>
                <Field
                  help="Comma-separated values saved as required fields."
                  label="Required beneficiary fields"
                >
                  <input
                    className={inputClass}
                    disabled={
                      locked ||
                      form.account_structure !== "beneficiary_sub_accounts"
                    }
                    onChange={(event) =>
                      updateForm(
                        "beneficiary_required_fields",
                        event.target.value,
                      )
                    }
                    placeholder="name, date_of_birth, school_name"
                    value={form.beneficiary_required_fields}
                  />
                </Field>
              </>
            )}
          </div>
        </section>
        <section className="rounded-[8px] border border-[#dee3eb] bg-white p-6">
          <h2 className="mb-4 text-[16px] font-bold text-[#171c21]">
            3. Savings Rules
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Minimum saving (KES)">
              <input
                className={inputClass}
                disabled={locked}
                min="0"
                onChange={(event) =>
                  updateForm("minimum_contribution", event.target.value)
                }
                type="number"
                value={form.minimum_contribution}
              />
            </Field>
            <Field label="Maximum saving (KES)">
              <input
                className={inputClass}
                disabled={locked}
                min="0"
                onChange={(event) =>
                  updateForm("maximum_contribution", event.target.value)
                }
                placeholder="N/A"
                type="number"
                value={form.maximum_contribution}
              />
            </Field>
            <Field label="Savings frequency">
              <select
                className={inputClass}
                disabled={locked}
                onChange={(event) =>
                  updateForm("contribution_frequency", event.target.value)
                }
                value={form.contribution_frequency}
              >
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="daily">Daily</option>
                <option value="one_off">Flexible / One off</option>
              </select>
            </Field>
            <div className="md:col-span-2">
              <ExplanationPanel>
                {savingsFrequencyNotes[form.contribution_frequency]}
              </ExplanationPanel>
            </div>
            {form.deposit_type === "shares" && (
              <>
                <Field label="Share price (KES)">
                  <input
                    className={inputClass}
                    disabled={locked}
                    min="0"
                    onChange={(event) =>
                      updateForm("share_price", event.target.value)
                    }
                    type="number"
                    value={form.share_price}
                  />
                </Field>
                <Field label="Minimum required shares">
                  <input
                    className={inputClass}
                    disabled={locked}
                    min="0"
                    onChange={(event) =>
                      updateForm("minimum_required_shares", event.target.value)
                    }
                    type="number"
                    value={form.minimum_required_shares}
                  />
                </Field>
                <Field label="Share transfer fee (KES)">
                  <input
                    className={inputClass}
                    disabled={locked}
                    min="0"
                    onChange={(event) =>
                      updateForm("share_transfer_fee", event.target.value)
                    }
                    placeholder="N/A"
                    type="number"
                    value={form.share_transfer_fee}
                  />
                </Field>
              </>
            )}
            <Field label="Deposit deadline day">
              <input
                className={inputClass}
                disabled={locked || form.contribution_frequency === "one_off"}
                max="31"
                min="1"
                onChange={(event) =>
                  updateForm("deposit_deadline_day", event.target.value)
                }
                placeholder="N/A"
                type="number"
                value={form.deposit_deadline_day}
              />
            </Field>
            <label className="flex items-center gap-3 rounded-[8px] border border-[#dee3eb] bg-[#f9fafb] px-4 py-3 text-[12px] font-semibold text-[#171c21]">
              <input
                checked={form.auto_deduct_monthly_contribution}
                disabled={locked}
                onChange={(event) =>
                  updateForm(
                    "auto_deduct_monthly_contribution",
                    event.target.checked,
                  )
                }
                type="checkbox"
              />
              Auto-deduct monthly savings
            </label>
            <label className="flex items-center gap-3 rounded-[8px] border border-[#dee3eb] bg-[#f9fafb] px-4 py-3 text-[12px] font-semibold text-[#171c21]">
              <input
                checked={form.enforce_monthly_deposit_rule}
                disabled={locked}
                onChange={(event) =>
                  updateForm(
                    "enforce_monthly_deposit_rule",
                    event.target.checked,
                  )
                }
                type="checkbox"
              />
              Enforce monthly deposit rule
            </label>
            <label className="flex items-center gap-3 rounded-[8px] border border-[#dee3eb] bg-[#f9fafb] px-4 py-3 text-[12px] font-semibold text-[#171c21]">
              <input
                checked={form.has_late_penalty}
                disabled={locked}
                onChange={(event) =>
                  updateForm("has_late_penalty", event.target.checked)
                }
                type="checkbox"
              />
              Has late penalty
            </label>
            {form.has_late_penalty && (
              <>
                <Field label="Late penalty type">
                  <select
                    className={inputClass}
                    disabled={locked}
                    onChange={(event) =>
                      updateForm("late_penalty_type", event.target.value)
                    }
                    value={form.late_penalty_type}
                  >
                    <option value="none">None</option>
                    <option value="fixed_per_day">Fixed per day</option>
                  </select>
                </Field>
                <Field label="Late penalty amount (KES)">
                  <input
                    className={inputClass}
                    disabled={locked || form.late_penalty_type === "none"}
                    min="0"
                    onChange={(event) =>
                      updateForm("late_penalty_amount", event.target.value)
                    }
                    placeholder="N/A"
                    type="number"
                    value={form.late_penalty_amount}
                  />
                </Field>
                <Field label="Penalty accrual cadence">
                  <select
                    className={inputClass}
                    disabled={locked}
                    onChange={(event) =>
                      updateForm("penalty_accrual_cadence", event.target.value)
                    }
                    value={form.penalty_accrual_cadence}
                  >
                    <option value="none">None</option>
                    <option value="daily_after_deadline">
                      Daily after deadline
                    </option>
                    <option value="once_per_period">Once per period</option>
                  </select>
                </Field>
                <Field label="Penalty grace days">
                  <input
                    className={inputClass}
                    disabled={locked}
                    min="0"
                    onChange={(event) =>
                      updateForm("penalty_grace_days", event.target.value)
                    }
                    placeholder="0"
                    type="number"
                    value={form.penalty_grace_days}
                  />
                </Field>
                <Field label="Penalty max per period (KES)">
                  <input
                    className={inputClass}
                    disabled={locked}
                    min="0"
                    onChange={(event) =>
                      updateForm("penalty_max_per_period", event.target.value)
                    }
                    placeholder="N/A"
                    type="number"
                    value={form.penalty_max_per_period}
                  />
                </Field>
                <Field label="Penalty posting mode">
                  <select
                    className={inputClass}
                    disabled={locked}
                    onChange={(event) =>
                      updateForm("penalty_posting_mode", event.target.value)
                    }
                    value={form.penalty_posting_mode}
                  >
                    <option value="track_only">Track only</option>
                    <option value="charge_account">Charge account</option>
                  </select>
                </Field>
              </>
            )}
          </div>
        </section>
        <section className="rounded-[8px] border border-[#dee3eb] bg-white p-6">
          <h2 className="mb-4 text-[16px] font-bold text-[#171c21]">
            4. Interest Policy
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <Field label="Interest crediting method">
              <select
                className={inputClass}
                disabled={locked}
                onChange={(event) =>
                  updateForm("interest_crediting_method", event.target.value)
                }
                value={form.interest_crediting_method}
              >
                <option value="no_interest">No Interest</option>
                <option value="fixed_rate">Fixed Rate</option>
                <option value="post_audit_declaration">
                  Post-Audit Declaration
                </option>
                <option value="tiered_by_balance">Tiered by Balance</option>
              </select>
            </Field>
            <ExplanationPanel>
              {interestPolicyNotes[form.interest_crediting_method]}
            </ExplanationPanel>
            {form.interest_crediting_method === "fixed_rate" && (
              <Field label="Fixed annual interest rate (%)">
                <input
                  className={inputClass}
                  disabled={locked}
                  min="0"
                  onChange={(event) =>
                    updateForm("fixed_annual_interest_rate", event.target.value)
                  }
                  type="number"
                  value={form.fixed_annual_interest_rate}
                />
              </Field>
            )}
            {form.interest_crediting_method === "tiered_by_balance" && (
              <div className="rounded-[8px] border border-dashed border-[#9dcaca] bg-[#f6fbfb] px-4 py-3 text-[11.5px] text-[#737a87]">
                Tier-band configuration is reserved for the planned tiered
                product workflow. Submit this method only when those balance
                bands are ready to be configured by operations.
              </div>
            )}
            {form.interest_crediting_method !== "no_interest" && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Field label="Interest posting day">
                  <input
                    className={inputClass}
                    disabled={locked}
                    max="31"
                    min="1"
                    onChange={(event) =>
                      updateForm("interest_posting_day", event.target.value)
                    }
                    placeholder="e.g. 5"
                    type="number"
                    value={form.interest_posting_day}
                  />
                </Field>
                <Field label="Posting frequency">
                  <select
                    className={inputClass}
                    disabled={locked}
                    onChange={(event) =>
                      updateForm(
                        "interest_posting_frequency",
                        event.target.value,
                      )
                    }
                    value={form.interest_posting_frequency}
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="annually">Annually</option>
                    <option value="on_audit_declaration">
                      On audit declaration
                    </option>
                  </select>
                </Field>
                <Field label="Compounding method">
                  <select
                    className={inputClass}
                    disabled={locked}
                    onChange={(event) =>
                      updateForm(
                        "interest_compounding_method",
                        event.target.value,
                      )
                    }
                    value={form.interest_compounding_method}
                  >
                    <option value="simple">Simple</option>
                    <option value="compound">Compound</option>
                  </select>
                </Field>
              </div>
            )}
          </div>
        </section>
        <section className="rounded-[8px] border border-[#dee3eb] bg-white p-6">
          <h2 className="mb-4 text-[16px] font-bold text-[#171c21]">
            5. Withdrawal Rules
          </h2>
          <div className="mb-4 flex gap-3">
            {[
              [false, "Non-Withdrawable"],
              [true, "Withdrawable"],
            ].map(([value, label]) => (
              <button
                className={`rounded-[8px] border px-5 py-2 text-[12px] font-semibold ${
                  form.is_withdrawable === value
                    ? "border-[#007070] bg-[#e0f5f5] text-[#007070]"
                    : "border-[#dee3eb] bg-white text-[#737a87]"
                }`}
                disabled={locked}
                key={label}
                onClick={() => updateForm("is_withdrawable", value)}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
          <Field label="Withdrawal fee (KES)">
            <input
              className={inputClass}
              disabled={locked || !form.is_withdrawable}
              min="0"
              onChange={(event) =>
                updateForm("withdrawal_fee", event.target.value)
              }
              placeholder="N/A"
              type="number"
              value={form.withdrawal_fee}
            />
          </Field>
        </section>
        <section className="rounded-[8px] border border-[#dee3eb] bg-white p-6">
          <h2 className="mb-4 text-[16px] font-bold text-[#171c21]">
            6. Eligibility
          </h2>
          <div className="mb-4 flex flex-wrap gap-3">
            {[
              [true, "Mandatory for All Members"],
              [false, "Optional"],
            ].map(([value, label]) => (
              <button
                className={`rounded-[8px] border px-5 py-2 text-[12px] font-semibold ${
                  form.mandatory_for_all_members === value
                    ? "border-[#007070] bg-[#e0f5f5] text-[#007070]"
                    : "border-[#dee3eb] bg-white text-[#737a87]"
                }`}
                disabled={locked}
                key={label}
                onClick={() => updateForm("mandatory_for_all_members", value)}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="flex items-center gap-3 rounded-[8px] border border-[#dee3eb] bg-[#f9fafb] px-4 py-3 text-[12px] font-semibold text-[#171c21]">
              <input
                checked={form.create_on_member_registration}
                disabled={locked}
                onChange={(event) =>
                  updateForm(
                    "create_on_member_registration",
                    event.target.checked,
                  )
                }
                type="checkbox"
              />
              Create on member registration
            </label>
            <div className="md:col-span-2">
              <span className="mb-2 block text-[12px] font-semibold text-[#171c21]">
                Member registration eligibility
              </span>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                {eligibilityOptions.map(([value, label]) => (
                  <label
                    className="flex items-center gap-3 rounded-[8px] border border-[#dee3eb] bg-[#f9fafb] px-4 py-3 text-[12px] font-semibold text-[#171c21]"
                    key={value}
                  >
                    <input
                      checked={form.member_registration_eligibilities.includes(
                        value,
                      )}
                      disabled={locked}
                      onChange={() => toggleEligibility(value)}
                      type="checkbox"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>
            <Field label="Registration fee amount (KES)">
              <input
                className={inputClass}
                disabled={locked}
                min="0"
                onChange={(event) =>
                  updateForm("registration_fee_amount", event.target.value)
                }
                placeholder="N/A"
                type="number"
                value={form.registration_fee_amount}
              />
            </Field>
            <Field label="Exit notice days">
              <input
                className={inputClass}
                disabled={locked}
                min="0"
                onChange={(event) =>
                  updateForm("exit_notice_days", event.target.value)
                }
                placeholder="N/A"
                type="number"
                value={form.exit_notice_days}
              />
            </Field>
            <label className="flex items-center gap-3 rounded-[8px] border border-[#dee3eb] bg-[#f9fafb] px-4 py-3 text-[12px] font-semibold text-[#171c21]">
              <input
                checked={form.hosts_membership_fee}
                disabled={locked}
                onChange={(event) =>
                  updateForm("hosts_membership_fee", event.target.checked)
                }
                type="checkbox"
              />
              Hosts membership fee
            </label>
            <label className="flex items-center gap-3 rounded-[8px] border border-[#dee3eb] bg-[#f9fafb] px-4 py-3 text-[12px] font-semibold text-[#171c21]">
              <input
                checked={form.dividend_eligible}
                disabled={locked}
                onChange={(event) =>
                  updateForm("dividend_eligible", event.target.checked)
                }
                type="checkbox"
              />
              Dividend eligible
            </label>
            <Field label="Image URL">
              <input
                className={inputClass}
                disabled={locked}
                onChange={(event) =>
                  updateForm("image_url", event.target.value)
                }
                placeholder="Optional product image"
                value={form.image_url}
              />
            </Field>
          </div>
        </section>
        <section className="rounded-[8px] border border-[#dee3eb] bg-white p-6">
          <h2 className="mb-4 text-[16px] font-bold text-[#171c21]">
            7. Required Documents & Conditions
          </h2>
          <p className="mb-5 text-[12px] text-[#737a87]">
            Add short labels only. These populate the checklist when this
            account is being opened.
          </p>
          <div className="space-y-3">
            {(form.required_documents || []).map((row, index) => (
              <div className="flex items-center gap-3" key={index}>
                <input
                  className={inputClass}
                  disabled={locked}
                  maxLength={40}
                  onChange={(event) =>
                    updateDocumentRow(index, event.target.value)
                  }
                  placeholder={
                    index === 0
                      ? "e.g. Birth certificate"
                      : "e.g. Parent consent"
                  }
                  value={row.label}
                />
                <span className="w-12 text-right text-[10.5px] text-[#9ea6b0]">
                  {String(row.label || "").length}/40
                </span>
                <button
                  className="text-[12px] font-semibold text-[#bf3d33] disabled:text-[#c6cbd1]"
                  disabled={locked || form.required_documents.length === 1}
                  onClick={() => removeDocumentRow(index)}
                  type="button"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            className="mt-4 text-[12px] font-bold text-[#007070]"
            disabled={locked}
            onClick={addDocumentRow}
            type="button"
          >
            + Add another document
          </button>
        </section>
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <button
          className="rounded-[8px] border border-[#dee3eb] px-5 py-2.5 text-[12px] font-semibold text-[#737a87]"
          onClick={() => navigate("/admin/settings/products/deposits")}
          type="button"
        >
          Cancel
        </button>
        <button
          className="rounded-[8px] bg-[#007070] px-5 py-2.5 text-[12px] font-semibold text-white disabled:bg-[#9ea6b0]"
          disabled={locked}
          onClick={() => setReviewing(true)}
          type="button"
        >
          Submit for Approval
        </button>
      </div>
    </div>
  );
};

const ApprovalQueue = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadApprovals = async () => {
      setLoading(true);
      try {
        const rows = await getDepositApprovals("pending");
        setSubmissions(Array.isArray(rows) ? rows : []);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    loadApprovals();
  }, []);

  return (
    <div className="p-8">
      <button
        className="mb-5 flex items-center gap-2 text-[12px] font-semibold text-[#007070]"
        onClick={() => navigate("/admin/settings/products/deposits")}
        type="button"
      >
        <ArrowLeft size={16} /> Back to Deposit Products
      </button>
      <h1 className="text-[26px] font-bold text-[#1c2129]">Review Approvals</h1>
      <p className="mb-6 text-[13px] text-[#737a87]">
        Pending deposit product submissions
      </p>
      <div className="overflow-x-auto rounded-[8px] border border-[#dee3eb] bg-white">
        <div className="min-w-[640px]">
          <div className="grid grid-cols-[1fr_1fr_1fr_90px] px-5 py-3 text-[11px] font-bold text-[#737a87]">
            <span>Product</span>
            <span>Type</span>
            <span>Status</span>
            <span></span>
          </div>
          {loading ? (
            <div className="border-t border-[#dee3eb] px-5 py-8 text-[13px] text-[#737a87]">
              Loading approvals...
            </div>
          ) : submissions.length === 0 ? (
            <div className="border-t border-[#dee3eb] px-5 py-8 text-[13px] text-[#737a87]">
              No pending approvals.
            </div>
          ) : (
            submissions.map((submission) => (
              <div
                className="grid grid-cols-[1fr_1fr_1fr_90px] items-center border-t border-[#dee3eb] px-5 py-4 text-[12px]"
                key={submission.id}
              >
                <span className="font-semibold text-[#1c2129]">
                  {submission?.product?.name ||
                    submission?.proposed_payload?.name}
                </span>
                <span className="text-[#737a87]">
                  {titleCase(submission.action)}
                </span>
                <span>
                  <StatusBadge tone="amber">Pending Approval</StatusBadge>
                </span>
                <button
                  className="text-left text-[12px] font-semibold text-[#007070]"
                  onClick={() =>
                    navigate(
                      `/admin/settings/products/deposits/approvals/${submission.id}`,
                    )
                  }
                  type="button"
                >
                  Review
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const ApprovalReview = () => {
  const navigate = useNavigate();
  const { submissionId } = useParams();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectMode, setRejectMode] = useState("return");
  const [feedback, setFeedback] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadSubmission = async () => {
      setLoading(true);
      try {
        setSubmission(await getDepositApproval(submissionId));
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    loadSubmission();
  }, [submissionId]);

  const productName =
    submission?.product?.name ||
    submission?.proposed_payload?.name ||
    "Product";
  const productCode =
    submission?.product?.public_code ||
    submission?.product?.code ||
    submission?.proposed_payload?.public_code ||
    submission?.proposed_payload?.code ||
    "new";
  const fields = useMemo(() => {
    const changedFields = Array.isArray(submission?.changed_fields)
      ? submission.changed_fields
      : [];

    if (changedFields.length > 0) return changedFields;

    if (
      submission?.action === "create" &&
      submission?.proposed_payload &&
      typeof submission.proposed_payload === "object"
    ) {
      return Object.entries(submission.proposed_payload)
        .filter(([, value]) => formatApprovalValue(value) !== "N/A")
        .map(([field, proposed]) => ({
          field,
          current: null,
          proposed,
        }));
    }

    return [];
  }, [submission]);

  const finishReview = async (type) => {
    setSaving(true);
    try {
      if (type === "approve") {
        await approveDepositSubmission(submissionId, {});
      }
      if (type === "return") {
        await returnDepositSubmission(submissionId, { feedback });
      }
      if (type === "reject") {
        await rejectDepositSubmission(submissionId, { feedback });
      }
      navigate("/admin/settings/products/deposits");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Unable to complete review action.";
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-[13px] text-[#737a87]">Loading approval...</div>
    );
  }

  return (
    <div className="p-8">
      <button
        className="mb-5 flex items-center gap-2 text-[12px] font-semibold text-[#007070]"
        onClick={() =>
          navigate("/admin/settings/products/deposits/approvals")
        }
        type="button"
      >
        <ArrowLeft size={16} /> Back to Approvals Queue
      </button>
      <div className="mb-6">
        <div className="mb-2 flex flex-wrap gap-2">
          <StatusBadge tone="gray">{titleCase(submission?.action)}</StatusBadge>
          <StatusBadge tone="amber">Pending Approval</StatusBadge>
          {submission?.action === "create" ? (
            <StatusBadge tone="gray">New Product</StatusBadge>
          ) : (
            <StatusBadge tone="gray">
              Scope: {titleCase(submission?.scope)}
            </StatusBadge>
          )}
        </div>
        <h1 className="text-[26px] font-bold text-[#1c2129]">
          {productName} ({productCode})
        </h1>
        <p className="text-[12px] text-[#737a87]">
          Submitted for checker review. Live configuration is unchanged until
          approved.
        </p>
      </div>
      <div className="overflow-x-auto rounded-[8px] border border-[#dee3eb] bg-white p-6">
        <h2 className="mb-4 text-[15px] font-bold text-[#171c21]">
          Changed Fields
        </h2>
        <div className="min-w-[680px]">
          <div className="grid grid-cols-[1fr_2fr_2fr] border-b border-[#dee3eb] pb-3 text-[11px] font-bold text-[#737a87]">
            <span>Field</span>
            <span>Current (Live)</span>
            <span>Proposed</span>
          </div>
          {fields.map((field) => (
            <div
              className="grid grid-cols-[1fr_2fr_2fr] border-b border-[#eef1f5] py-3 text-[12px]"
              key={field.field}
            >
              <span className="font-semibold text-[#1c2129]">
                {fieldLabels[field.field] || titleCase(field.field)}
              </span>
              <span className="text-[#737a87]">
                {formatApprovalValue(field.current)}
              </span>
              <span className="text-[#007070]">
                {formatApprovalValue(field.proposed)}
              </span>
            </div>
          ))}
          {fields.length === 0 && (
            <p className="py-4 text-[12px] text-[#737a87]">
              No diff available.
            </p>
          )}
        </div>
      </div>
      <div className="mt-6 flex gap-2 rounded-[8px] bg-[#fcf2d9] px-4 py-3 text-[11.5px] text-[#9e7305]">
        <AlertTriangle size={16} />
        <span>
          {submission?.action === "create"
            ? "Approving creates this product and makes it available according to its configured rules."
            : submission?.scope === "all_members"
              ? "Approving applies this change to the live product now. Historical account snapshots retain prior terms."
              : "Approving creates a new product version for new members only."}
        </span>
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <button
          className="rounded-[8px] border border-[#bf3d33] px-5 py-2.5 text-[12px] font-semibold text-[#bf3d33]"
          onClick={() => setRejectOpen(true)}
          type="button"
        >
          Reject
        </button>
        <button
          className="rounded-[8px] bg-[#007070] px-5 py-2.5 text-[12px] font-semibold text-white"
          onClick={() => setApproveOpen(true)}
          type="button"
        >
          Approve
        </button>
      </div>
      {approveOpen && (
        <Modal onClose={() => setApproveOpen(false)}>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#e0f5f5] text-[#007070]">
            <BadgeCheck size={22} />
          </div>
          <h2 className="mb-3 text-[17px] font-bold text-[#171c21]">
            Confirm & Apply Change
          </h2>
          <p className="mb-4 text-[12.5px] text-[#757d87]">
            Approving this submission will publish the proposed deposit product
            configuration according to its selected scope.
          </p>
          <div className="mb-5 rounded-[8px] bg-[#fcf2d9] px-4 py-3 text-[11.5px] text-[#9e7305]">
            <div className="flex justify-between">
              <span>Product</span>
              <strong>{productName}</strong>
            </div>
            <div className="mt-2 flex justify-between">
              <span>Fields changed</span>
              <strong>{fields.length}</strong>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button
              className="rounded-[8px] border border-[#dee3eb] px-5 py-2.5 text-[12px] font-semibold text-[#737a87]"
              onClick={() => setApproveOpen(false)}
              type="button"
            >
              Go Back
            </button>
            <button
              className="rounded-[8px] bg-[#007070] px-5 py-2.5 text-[12px] font-semibold text-white disabled:bg-[#9ea6b0]"
              disabled={saving}
              onClick={() => finishReview("approve")}
              type="button"
            >
              {saving ? "Approving..." : "I Approve"}
            </button>
          </div>
        </Modal>
      )}
      {rejectOpen && (
        <Modal onClose={() => setRejectOpen(false)}>
          <div className="mb-4 flex items-center gap-3">
            <FileText className="text-[#bf3d33]" size={20} />
            <h2 className="text-[17px] font-bold text-[#171c21]">
              Reject Submission
            </h2>
          </div>
          <p className="mb-4 text-[12px] text-[#757d87]">
            Choose how this submission should be handled.
          </p>
          <div className="mb-4 space-y-3">
            {[
              [
                "return",
                "Return for Changes",
                "The submitter can edit and resubmit.",
              ],
              ["reject", "Reject Entirely", "The proposed edit is discarded."],
            ].map(([value, title, copy]) => (
              <button
                className={`w-full rounded-[8px] border p-4 text-left ${
                  rejectMode === value
                    ? "border-[#1f7a4d] bg-[#e5f2eb]"
                    : "border-[#dee3eb] bg-white"
                }`}
                key={value}
                onClick={() => setRejectMode(value)}
                type="button"
              >
                <span className="block text-[13px] font-bold text-[#171c21]">
                  {title}
                </span>
                <span className="text-[11.5px] text-[#757d87]">{copy}</span>
              </button>
            ))}
          </div>
          <Field label="Feedback for submitter">
            <textarea
              className="min-h-[92px] w-full rounded-[6px] border border-[#dee3eb] bg-white px-3 py-2 text-[12px] text-[#1c2129]"
              onChange={(event) => setFeedback(event.target.value)}
              value={feedback}
            />
          </Field>
          <div className="mt-5 flex justify-end gap-3">
            <button
              className="rounded-[8px] border border-[#dee3eb] px-5 py-2.5 text-[12px] font-semibold text-[#737a87]"
              onClick={() => setRejectOpen(false)}
              type="button"
            >
              Cancel
            </button>
            <button
              className="rounded-[8px] bg-[#1f7a4d] px-5 py-2.5 text-[12px] font-semibold text-white disabled:bg-[#9ea6b0]"
              disabled={saving || !feedback.trim()}
              onClick={() => finishReview(rejectMode)}
              type="button"
            >
              {rejectMode === "return"
                ? "Return for Changes"
                : "Reject Entirely"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

const emptyLoanPayload = {
  name: "",
  public_code: "",
  loan_minimum_principal: "",
  loan_maximum_principal: "",
  loan_minimum_interest_rate: "",
  loan_maximum_interest_rate: "",
  loan_interest_calculation_method: "reducing_balance",
  interest_posting_day: "",
  loan_duration_custom: false,
  loan_maximum_duration_months: "",
  repayment_intervals: ["Weekly", "Monthly"],
  loan_processing_fee: { type: "banded", value: "", bands: [] },
  loan_insurance_fee: { type: "percentage", value: "" },
  loan_late_payment_penalty: { type: "percentage", value: "" },
  loan_early_repayment_penalty: { type: "fixed_amount", value: "" },
  guarantors_required: true,
  minimum_guarantors: "",
  required_documents: [
    { label: "", required: true },
    { label: "", required: true },
  ],
  loan_disbursement_type: "automatic",
  automatic_disbursement_limit: "",
  description: "",
};

const LoanProductForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyLoanPayload);
  const [saving, setSaving] = useState(false);

  const updateLoanForm = (key, value) =>
    setForm((current) => ({ ...current, [key]: value }));

  const updateLoanDocument = (index, value) => {
    setForm((current) => {
      const rows = [...(current.required_documents || [])];
      rows[index] = { ...(rows[index] || { required: true }), label: value };
      return { ...current, required_documents: rows };
    });
  };

  const addLoanDocument = () =>
    setForm((current) => ({
      ...current,
      required_documents: [
        ...(current.required_documents || []),
        { label: "", required: true },
      ],
    }));

  const toggleRepaymentInterval = (value) => {
    setForm((current) => {
      const existing = current.repayment_intervals || [];
      const next = existing.includes(value)
        ? existing.filter((item) => item !== value)
        : [...existing, value];
      return { ...current, repayment_intervals: next };
    });
  };

  const submitLoanProduct = async () => {
    if (!form.name.trim()) {
      return;
    }
    setSaving(true);
    try {
      await createProduct({
        category: "loan",
        name: form.name,
        public_code: form.public_code || undefined,
        description: form.description || undefined,
        loan_minimum_principal: toOptionalNumber(form.loan_minimum_principal),
        loan_maximum_principal: toOptionalNumber(form.loan_maximum_principal),
        loan_minimum_interest_rate: toOptionalNumber(
          form.loan_minimum_interest_rate,
        ),
        loan_maximum_interest_rate: toOptionalNumber(
          form.loan_maximum_interest_rate,
        ),
        loan_interest_calculation_method: form.loan_interest_calculation_method,
        interest_posting_day: toOptionalNumber(form.interest_posting_day),
        loan_duration_custom: form.loan_duration_custom,
        loan_maximum_duration_months: toOptionalNumber(
          form.loan_maximum_duration_months,
        ),
        repayment_intervals: form.repayment_intervals.map((value) => ({
          label: value,
          value,
        })),
        loan_processing_fee: form.loan_processing_fee,
        loan_insurance_fee: {
          ...form.loan_insurance_fee,
          value: toOptionalNumber(form.loan_insurance_fee.value),
        },
        loan_late_payment_penalty: {
          ...form.loan_late_payment_penalty,
          value: toOptionalNumber(form.loan_late_payment_penalty.value),
        },
        loan_early_repayment_penalty: {
          ...form.loan_early_repayment_penalty,
          value: toOptionalNumber(form.loan_early_repayment_penalty.value),
        },
        guarantors_required: form.guarantors_required,
        minimum_guarantors: toOptionalNumber(form.minimum_guarantors),
        required_documents: normalizeDocumentRows(form.required_documents),
        loan_disbursement_type: form.loan_disbursement_type,
        automatic_disbursement_limit: toOptionalNumber(
          form.automatic_disbursement_limit,
        ),
      });
      navigate("/admin/settings/products");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Unable to save loan product.";
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8">
      <button
        className="mb-5 flex items-center gap-2 text-[12px] font-semibold text-[#007070]"
        onClick={() => navigate("/admin/settings/products")}
        type="button"
      >
        <ArrowLeft size={16} /> Back to Products
      </button>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-[26px] font-bold text-[#1c2129]">
          Create Loan Product
        </h1>
        <StatusBadge tone="green">Scaffold</StatusBadge>
      </div>
      <div className="space-y-6">
        <section className="rounded-[8px] border border-[#dee3eb] bg-white p-6">
          <h2 className="mb-4 text-[16px] font-bold text-[#171c21]">
            1. Product Selection
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <Field label="Product name">
              <input
                className={inputClass}
                onChange={(event) => {
                  const value = event.target.value;
                  setForm((current) => ({
                    ...current,
                    name: value,
                    public_code:
                      current.public_code || generateProductCode(value),
                  }));
                }}
                placeholder="e.g. Biashara Plus Loan"
                value={form.name}
              />
            </Field>
            <Field
              help="Auto-suggested. Admin may edit within the guided format."
              label="Product code"
            >
              <input
                className={inputClass}
                onChange={(event) =>
                  updateLoanForm("public_code", event.target.value)
                }
                placeholder="e.g. BPL-001"
                value={form.public_code}
              />
            </Field>
          </div>
        </section>
        <section className="rounded-[8px] border border-[#dee3eb] bg-white p-6">
          <h2 className="mb-4 text-[16px] font-bold text-[#171c21]">
            2. Principal & Interest Range
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              ["loan_minimum_principal", "Minimum principal (KES)", "5,000"],
              ["loan_maximum_principal", "Maximum principal (KES)", "500,000"],
              ["loan_minimum_interest_rate", "Minimum interest rate (%)", "12"],
              [
                "loan_maximum_interest_rate",
                "Maximum interest rate (%)",
                "14.5",
              ],
            ].map(([key, label, placeholder]) => (
              <Field key={key} label={label}>
                <input
                  className={inputClass}
                  min="0"
                  onChange={(event) => updateLoanForm(key, event.target.value)}
                  placeholder={`e.g. ${placeholder}`}
                  type="number"
                  value={form[key]}
                />
              </Field>
            ))}
          </div>
        </section>
        <section className="rounded-[8px] border border-[#dee3eb] bg-white p-6">
          <h2 className="mb-4 text-[16px] font-bold text-[#171c21]">
            3. Interest Calculation Method
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Calculation method">
              <select
                className={inputClass}
                onChange={(event) =>
                  updateLoanForm(
                    "loan_interest_calculation_method",
                    event.target.value,
                  )
                }
                value={form.loan_interest_calculation_method}
              >
                <option value="reducing_balance">Reducing Balance</option>
                <option value="flat_rate">Flat Rate</option>
              </select>
            </Field>
            <Field label="Interest posting day">
              <input
                className={inputClass}
                max="31"
                min="1"
                onChange={(event) =>
                  updateLoanForm("interest_posting_day", event.target.value)
                }
                placeholder="e.g. 5"
                type="number"
                value={form.interest_posting_day}
              />
            </Field>
          </div>
          <div className="mt-4">
            <ExplanationPanel>
              Interest calculated on outstanding balance each period for
              reducing balance products.
            </ExplanationPanel>
          </div>
        </section>
        <section className="rounded-[8px] border border-[#dee3eb] bg-white p-6">
          <h2 className="mb-4 text-[16px] font-bold text-[#171c21]">
            4. Duration, Repayment & Guarantors
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Maximum duration (months)">
              <input
                className={inputClass}
                min="1"
                onChange={(event) =>
                  updateLoanForm(
                    "loan_maximum_duration_months",
                    event.target.value,
                  )
                }
                placeholder="e.g. 72"
                type="number"
                value={form.loan_maximum_duration_months}
              />
            </Field>
            <Field label="Minimum number of guarantors">
              <input
                className={inputClass}
                min="0"
                onChange={(event) =>
                  updateLoanForm("minimum_guarantors", event.target.value)
                }
                placeholder="e.g. 2"
                type="number"
                value={form.minimum_guarantors}
              />
            </Field>
            <div className="md:col-span-2">
              <span className="mb-2 block text-[12px] font-semibold text-[#171c21]">
                Repayment frequency
              </span>
              <div className="flex flex-wrap gap-3">
                {["Daily", "Weekly", "Monthly"].map((value) => (
                  <button
                    className={`rounded-[8px] border px-4 py-2 text-[12px] font-semibold ${
                      form.repayment_intervals.includes(value)
                        ? "border-[#007070] bg-[#007070] text-white"
                        : "border-[#dee3eb] bg-white text-[#737a87]"
                    }`}
                    key={value}
                    onClick={() => toggleRepaymentInterval(value)}
                    type="button"
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="rounded-[8px] border border-[#dee3eb] bg-white p-6">
          <h2 className="mb-4 text-[16px] font-bold text-[#171c21]">
            5. Fees, Documents & Disbursement
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Insurance fee (%)">
              <input
                className={inputClass}
                min="0"
                onChange={(event) =>
                  updateLoanForm("loan_insurance_fee", {
                    type: "percentage",
                    value: event.target.value,
                  })
                }
                placeholder="e.g. 0.6"
                type="number"
                value={form.loan_insurance_fee.value}
              />
            </Field>
            <Field label="Late payment penalty (%)">
              <input
                className={inputClass}
                min="0"
                onChange={(event) =>
                  updateLoanForm("loan_late_payment_penalty", {
                    type: "percentage",
                    value: event.target.value,
                  })
                }
                placeholder="e.g. 2"
                type="number"
                value={form.loan_late_payment_penalty.value}
              />
            </Field>
            <Field label="Disbursement type">
              <select
                className={inputClass}
                onChange={(event) =>
                  updateLoanForm("loan_disbursement_type", event.target.value)
                }
                value={form.loan_disbursement_type}
              >
                <option value="automatic">Automatic</option>
                <option value="requires_approval">Requires Approval</option>
              </select>
            </Field>
            <Field label="Automatic disbursement limit (KES)">
              <input
                className={inputClass}
                disabled={form.loan_disbursement_type !== "automatic"}
                min="0"
                onChange={(event) =>
                  updateLoanForm(
                    "automatic_disbursement_limit",
                    event.target.value,
                  )
                }
                placeholder="e.g. 200,000"
                type="number"
                value={form.automatic_disbursement_limit}
              />
            </Field>
          </div>
          <div className="mt-5 space-y-3">
            <p className="text-[12px] font-semibold text-[#171c21]">
              Required documents & conditions
            </p>
            {form.required_documents.map((row, index) => (
              <div className="flex items-center gap-3" key={index}>
                <input
                  className={inputClass}
                  maxLength={40}
                  onChange={(event) =>
                    updateLoanDocument(index, event.target.value)
                  }
                  placeholder={
                    index === 0 ? "e.g. Title deed document" : "e.g. Collateral"
                  }
                  value={row.label}
                />
                <span className="w-12 text-right text-[10.5px] text-[#9ea6b0]">
                  {String(row.label || "").length}/40
                </span>
              </div>
            ))}
            <button
              className="text-[12px] font-bold text-[#007070]"
              onClick={addLoanDocument}
              type="button"
            >
              + Add another document
            </button>
          </div>
        </section>
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <button
          className="rounded-[8px] border border-[#dee3eb] px-5 py-2.5 text-[12px] font-semibold text-[#737a87]"
          onClick={() => navigate("/admin/settings/products")}
          type="button"
        >
          Cancel
        </button>
        <button
          className="rounded-[8px] bg-[#007070] px-5 py-2.5 text-[12px] font-semibold text-white disabled:bg-[#9ea6b0]"
          disabled={saving}
          onClick={submitLoanProduct}
          type="button"
        >
          Save Loan Product
        </button>
      </div>
    </div>
  );
};

const Settings = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      <div className="min-h-full bg-[#f5f7fa]">
        {(path.endsWith("/settings") ||
          path.endsWith("/settings/products")) && <SettingsLanding />}
        {path.endsWith("/settings/products/deposits") && (
          <DepositProductsList />
        )}
        {path.endsWith("/settings/products/deposits/create") && (
          <DepositProductForm mode="create" />
        )}
        {path.includes("/settings/products/deposits/") &&
          path.endsWith("/edit") && <DepositProductForm mode="edit" />}
        {path.endsWith("/settings/products/deposits/approvals") && (
          <ApprovalQueue />
        )}
        {path.includes("/settings/products/deposits/approvals/") && (
          <ApprovalReview />
        )}
        {path.endsWith("/settings/products/loans/create") && (
          <LoanProductForm />
        )}
      </div>
    </>
  );
};

export default Settings;
