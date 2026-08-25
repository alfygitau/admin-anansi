import React, { useState } from "react";
import {
  Coins,
  Calendar,
  RefreshCw,
  FileText,
  Wallet,
  Banknote,
  Info,
  XCircle,
  ArrowUpRight,
  BadgePercent,
  Calculator,
  ShieldCheck,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { getLoanProduct } from "../../../sdk/loan-products/loan-products";
import { useToast } from "../../../contexts/ToastProvider";
import { useParams } from "react-router-dom";
import { useFormatAmount } from "../../../hooks/useFormatAmount";
import { getMember } from "../../../sdk/members/members";
import { createLoanApplication } from "../../../sdk/loan-applications/loan-applications";
import useAuth from "../../../hooks/useAuth";

const LoanApplicationDetails = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const [period, setPeriod] = useState(0);
  const [frequency, setFrequency] = useState("Monthly");
  const [purposeDetails, setPurposeDetails] = useState("");
  const [loanProduct, setLoanProduct] = useState({});
  const { showToast } = useToast();
  const { memberId, productId } = useParams();
  const formatAmount = useFormatAmount();
  const [member, setMember] = useState({});
  const { auth } = useAuth();
  const [appId, setAppId] = useState("");

  const [amountError, setAmountError] = useState("");
  const [periodError, setPeriodError] = useState("");

  const handleAmountBlur = () => {
    const min = loanProduct?.min_amount ?? 0;
    const max = loanProduct?.max_amount ?? 0;
    const numAmount = Number(amount);

    if (!amount || numAmount < min) {
      setAmountError(`Amount must be at least ${formatAmount(min)}`);
    } else if (numAmount > max) {
      setAmountError(`Amount cannot exceed ${formatAmount(max)}`);
    } else {
      setAmountError("");
    }
  };

  const handlePeriodBlur = () => {
    const max = loanProduct?.max_period ?? 0;
    const numPeriod = Number(period);

    if (!period || numPeriod < 1) {
      setPeriodError("Period must be at least 1 month");
    } else if (numPeriod > max) {
      setPeriodError(`Period cannot exceed ${max} months`);
    } else {
      setPeriodError("");
    }
  };

  useQuery({
    queryKey: ["get member", memberId],
    queryFn: async () => {
      const response = await getMember(memberId);
      return response?.data?.data;
    },
    onSuccess: (data) => {
      setMember(data);
    },
    onError: (error) => {
      showToast({
        title: "Member processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const { isFetching } = useQuery({
    queryKey: ["loan-product", productId],
    queryFn: async () => {
      const response = await getLoanProduct(productId);
      return response.data.data;
    },
    onSuccess: (data) => {
      setLoanProduct(data);
      setPeriod(data?.min_period);
    },
    onError: (error) => {
      showToast({
        title: "Loan Products processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const requiresGuarantor = loanProduct?.requires_guarantor ?? false;
  const requiresChattels = loanProduct?.requires_collateral ?? false;
  const requiresDocuments = loanProduct?.requires_documents ?? false;

  const getNextRoute = (id) => {
    const nextRoute = requiresGuarantor
      ? `/admin/apply-loan/${productId}/add-guarantor/${id}`
      : requiresChattels
        ? `/admin/apply-loan/${productId}/add-collateral/${id}`
        : requiresDocuments
          ? `/admin/apply-loan/${productId}/add-documents/${id}`
          : `/admin/apply-loan/${productId}/review/${id}`;
    return nextRoute;
  };

  const { isLoading, mutate } = useMutation({
    mutationKey: ["create loan application"],
    mutationFn: async () => {
      const response = await createLoanApplication(
        productId,
        memberId,
        amount,
        period,
        `${member?.firstname} ${member?.lastname}`,
        member?.mobileno,
        purposeDetails,
      );
      return response.data.data;
    },
    onSuccess: (data) => {
      setAppId(data?.id);
      navigate(getNextRoute(data?.id));
    },
    onError: (error) => {
      showToast({
        title: "Loan Products processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="w-full space-y-8 font-sans antialiased text-slate-800 p-1">
      {/* 1. APPLICANT CONTEXT HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200/60 pb-6 select-none">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="size-11 rounded-2xl border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-primary hover:bg-slate-50 hover:border-slate-300 transition-all shadow-3xs cursor-pointer active:scale-95"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h2 className="text-xl font-black text-primary tracking-tight">
              Configure Loan Parameters
            </h2>

            {/* INLINE TAILWIND CSS UTILITY CLASSES */}
            <p className="text-sm font-bold text-slate-700 mt-0.5 capitalize">
              {member?.firstname} {member?.middlename} {member?.lastname}
            </p>

            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              <span>Member ID:</span>
              <span className="font-mono font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200/50">
                {member?.public_id}
              </span>
            </p>
          </div>
        </div>
      </div>

      {isFetching ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-stretch select-none">
          {[1, 2].map((cardIndex) => (
            <div
              key={cardIndex}
              className="bg-white rounded-2xl border border-slate-200/60 p-4 shadow-3xs flex flex-col justify-between space-y-4 animate-pulse"
            >
              {/* CARD HEADER SKELETON */}
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3.5">
                <div className="size-8 rounded-xl bg-slate-100 shrink-0" />
                <div className="h-4 w-40 bg-slate-200 rounded-md" />
              </div>

              {/* METRIC ITEMS GRID SKELETON */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2].map((itemIndex) => (
                  <div key={itemIndex} className="flex items-start gap-2.5 p-2">
                    {/* Icon Skeleton */}
                    <div className="size-7 rounded-lg bg-slate-100 shrink-0 mt-0.5" />

                    {/* Label & Value Skeletons */}
                    <div className="space-y-2 w-full">
                      <div className="h-2.5 w-20 bg-slate-100 rounded" />
                      <div className="h-3.5 w-28 bg-slate-200 rounded-md" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-stretch select-none">
          {/* CARD 1: LOAN FACILITY PARAMETERS */}
          <ApplicationCard
            title={loanProduct?.product_name ?? ""}
            icon={<Coins size={15} />}
          >
            <MetricItem
              icon={<Banknote size={14} />}
              label="Minimum to Apply"
              value={formatAmount(loanProduct?.min_amount ?? 0)}
            />
            <MetricItem
              icon={<ShieldCheck size={14} />}
              label="Max Product Limit"
              value={formatAmount(loanProduct?.max_amount ?? 0)}
            />
            <MetricItem
              icon={<BadgePercent size={14} />}
              label="Interest Rate"
              value={`${Number(loanProduct?.interest_rate ?? 0).toFixed(1)}% p.m`}
            />
            <MetricItem
              icon={<Calendar size={14} />}
              label="Repayment Duration"
              value={`${loanProduct?.max_period} Months`}
            />
          </ApplicationCard>

          {/* CARD 2: REPAYMENT & COST BREAKDOWN */}
          <ApplicationCard
            title="Interest and Fees"
            icon={<Calculator size={15} />}
          >
            <MetricItem
              icon={<Calculator size={14} />}
              label="Interest Method"
              value={loanProduct?.interest_method}
            />
            <MetricItem
              icon={<BadgePercent size={14} />}
              label="Repayment Frequency"
              value={loanProduct?.repayment_interval}
            />
            <MetricItem
              icon={<FileText size={14} />}
              label="Processing Fee"
              value={`(${loanProduct?.processing_fee_type}) ${formatAmount(loanProduct?.processing_fee_value)}`}
            />
            <MetricItem
              icon={<Wallet size={14} />}
              label="Insurance Rate (%)"
              value={formatAmount(loanProduct?.insurance_rate)}
            />
          </ApplicationCard>
        </div>
      )}

      {/* 2. CORE SPECIFICATION CONTAINER FORM */}
      <div className="w-full space-y-6">
        {/* SECTION A: FINANCIAL CONFIGURATION */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 border-b border-slate-100 pb-2">
            <Coins size={14} /> Principal & Financing Limits
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* OVERHAULED INPUT: LOAN AMOUNT */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700">
                  Requested Loan Capital
                </label>
              </div>

              <div className="flex items-center w-full h-14 bg-white border border-slate-200 rounded-xl shadow-3xs focus-within:border-[#074073] focus-within:ring-1 focus-within:ring-[#074073]/10 transition-all overflow-hidden">
                <div className="flex items-center justify-center h-full px-3.5 bg-slate-50 border-r border-slate-200 shrink-0 text-slate-400">
                  <Banknote size={15} />
                </div>
                <div className="pl-3.5 pr-1.5 text-slate-400 font-bold text-[10px] font-mono select-none">
                  KES
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    const val = e.target.value;
                    setAmount(val === "" ? "" : Number(val));
                    if (amountError) setAmountError("");
                  }}
                  onBlur={handleAmountBlur}
                  className="flex-1 h-full px-2 bg-transparent font-normal text-slate-800 focus:outline-none"
                  placeholder="0"
                />
              </div>
              {amountError ? (
                <p className="text-rose-500 text-xs font-semibold">
                  {amountError}
                </p>
              ) : (
                <p className="text-slate-400 text-xs tracking-widest">
                  Minimum of {formatAmount(loanProduct?.min_amount ?? 0)} and
                  maximum of {formatAmount(loanProduct?.max_amount ?? 0)}
                </p>
              )}
            </div>

            {/* OVERHAULED INPUT: REPAYMENT PERIOD DURATION */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700">
                  Repayment Period Duration (months)
                </label>
              </div>

              <div className="flex items-center w-full h-14 bg-white border border-slate-200 rounded-xl shadow-3xs focus-within:border-[#074073] focus-within:ring-1 focus-within:ring-[#074073]/10 transition-all overflow-hidden">
                <div className="flex items-center justify-center h-full px-3.5 bg-slate-50 border-r border-slate-200 shrink-0 text-slate-400">
                  <Calendar size={15} />
                </div>
                <input
                  type="number"
                  value={period}
                  onChange={(e) => {
                    const val = e.target.value;
                    setPeriod(val === "" ? "" : Number(val));
                    if (periodError) setPeriodError("");
                  }}
                  onBlur={handlePeriodBlur}
                  className="flex-1 h-full px-3.5 bg-transparent font-normal text-slate-800 focus:outline-none"
                  placeholder="e.g. 24"
                />
              </div>
              {periodError ? (
                <p className="text-rose-500 text-xs font-semibold">
                  {periodError}
                </p>
              ) : (
                <p className="text-slate-400 text-xs tracking-widest">
                  Maximum period of {loanProduct?.max_period ?? 0}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* SECTION B: SCHEDULING FREQUENCY */}
        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 border-b border-slate-100 pb-2">
            <RefreshCw size={14} /> Collection & Repayment Frequency
          </h3>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">
              Select Collection Cadence
            </label>
            <div className="flex flex-wrap gap-6 pt-1">
              {/* DAILY FREQUENCY */}
              <label className="flex items-center gap-2.5 cursor-pointer group select-none">
                <input
                  type="radio"
                  name="repaymentFrequency"
                  value="Daily"
                  checked={frequency === "Daily"}
                  onChange={() => {
                    setFrequency("Daily");
                    setPeriod(90);
                  }}
                  className="w-4 h-4 text-[#074073] focus:ring-[#074073] border-slate-300 cursor-pointer"
                />
                <span
                  className={`text-xs font-bold ${frequency === "Daily" ? "text-[#074073]" : "text-slate-600 group-hover:text-slate-800"}`}
                >
                  Daily Collection
                </span>
              </label>

              {/* WEEKLY FREQUENCY */}
              <label className="flex items-center gap-2.5 cursor-pointer group select-none">
                <input
                  type="radio"
                  name="repaymentFrequency"
                  value="Weekly"
                  checked={frequency === "Weekly"}
                  onChange={() => {
                    setFrequency("Weekly");
                    setPeriod(52);
                  }}
                  className="w-4 h-4 text-[#074073] focus:ring-[#074073] border-slate-300 cursor-pointer"
                />
                <span
                  className={`text-xs font-bold ${frequency === "Weekly" ? "text-[#074073]" : "text-slate-600 group-hover:text-slate-800"}`}
                >
                  Weekly Installments
                </span>
              </label>

              {/* MONTHLY FREQUENCY */}
              <label className="flex items-center gap-2.5 cursor-pointer group select-none">
                <input
                  type="radio"
                  name="repaymentFrequency"
                  value="Monthly"
                  checked={frequency === "Monthly"}
                  onChange={() => {
                    setFrequency("Monthly");
                    setPeriod(24);
                  }}
                  className="w-4 h-4 text-[#074073] focus:ring-[#074073] border-slate-300 cursor-pointer"
                />
                <span
                  className={`text-xs font-bold ${frequency === "Monthly" ? "text-[#074073]" : "text-slate-600 group-hover:text-slate-800"}`}
                >
                  Monthly Installments
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* SECTION C: PURPOSE & STRATEGY */}
        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 border-b border-slate-100 pb-2">
            <FileText size={14} /> Loan Purpose & Funding Directives
          </h3>

          {/* OVERHAULED INPUT: TEXTAREA DETAILED INSIGHTS */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600">
              Detailed Purpose Breakdown Statement
            </label>
            <textarea
              rows={5}
              value={purposeDetails}
              onChange={(e) => setPurposeDetails(e.target.value)}
              className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#074073] focus:ring-1 focus:ring-[#074073]/10 transition-all resize-none shadow-3xs"
              placeholder="Provide comprehensive details supporting the necessity and repayment strategy for this specific funding request..."
              required
            />
          </div>
        </div>
      </div>

      {/* ERROR WARNING MATRICES */}
      {amount > member.maxEligibility && (
        <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-2 text-xs text-rose-700 font-semibold leading-normal animate-in fade-in duration-200">
          <XCircle size={15} className="shrink-0 text-rose-600 mt-0.5" />
          <span>
            The requested capital amount surpasses the automated security
            collateral metrics evaluated for this account file.
          </span>
        </div>
      )}

      {/* FOOTER ACTION MODULE */}
      <div className="bg-white rounded-[24px] border border-slate-200/60 p-4 flex items-center justify-end gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="h-11 px-5 border border-slate-200/80 bg-white text-slate-600 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleFormSubmit}
          disabled={isLoading || !amount || !period}
          type="button"
          className="h-11 px-6 bg-[#074073] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-[#074073]/10 hover:bg-[#052d52] transition-all active:scale-97 cursor-pointer flex items-center gap-2 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed disabled:active:scale-100"
        >
          {isLoading ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>Continue With Application</span>
              <ArrowUpRight size={14} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const ApplicationCard = ({ title, icon, children, className = "" }) => (
  <div
    className={`bg-white border border-slate-200/70 shadow-2xs rounded-[24px] overflow-hidden w-full h-full hover:shadow-xs transition-shadow duration-300 ${className}`}
  >
    <div className="px-5 py-4 bg-slate-50/40 border-b border-slate-100 flex items-center gap-2.5 select-none">
      <div className="size-7.5 rounded-xl bg-white border border-slate-200/70 flex items-center justify-center text-slate-400 shadow-3xs">
        {icon}
      </div>
      <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
        {title}
      </h3>
    </div>
    <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
      {children}
    </div>
  </div>
);

/* REFINED METRIC ATOM CELL WITH ENHANCED FONT SIZING TRACKING */
const MetricItem = ({
  icon,
  label,
  value,
  isCapitalized = false,
  isCrypto = false,
  className = "",
}) => (
  <div className="flex items-start gap-3 min-w-0">
    <div className="size-8.5 rounded-xl bg-slate-50 border border-slate-200/40 flex items-center justify-center text-slate-400 shrink-0 shadow-3xs mt-0.5">
      {React.cloneElement(icon, { size: 14, strokeWidth: 2.5 })}
    </div>
    <div className="min-w-0 flex flex-col space-y-1">
      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 leading-normal">
        {label}
      </span>
      <span
        className={`text-xs font-bold tracking-tight leading-normal truncate ${
          isCrypto ? "font-mono text-primary text-[13px]" : "text-slate-800"
        } ${isCapitalized ? "capitalize" : ""} ${className}`}
      >
        {value || "—"}
      </span>
    </div>
  </div>
);

export default LoanApplicationDetails;
