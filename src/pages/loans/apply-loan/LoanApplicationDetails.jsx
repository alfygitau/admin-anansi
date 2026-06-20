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
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoanApplicationDetails = ({
  memberData,
  selectedProduct,
  onSubmitApplication,
}) => {
  const navigate = useNavigate();
  const member = memberData || {
    id: "MBR-90412",
    name: "Jane S. Moraa",
    maxEligibility: 750000,
  };

  const product = selectedProduct || {
    id: "PROD-DEVELOPMENT",
    name: "Premium Development Loan",
    interestRate: 13.5,
    interestType: "Reducing Balance",
  };

  // 1. Form States
  const [amount, setAmount] = useState(250000);
  const [period, setPeriod] = useState(24);
  const [frequency, setFrequency] = useState("monthly"); // 'daily' | 'weekly' | 'monthly'
  const [purposeCategory, setPurposeCategory] = useState("business");
  const [purposeDetails, setPurposeDetails] = useState("");
  const [disbursementChannel, setDisbursementChannel] = useState("fosa");

  // 2. Dynamic Metric Calculations Based on Selected Frequency
  const calculateMetrics = () => {
    const principal = Number(amount) || 0;
    const totalPeriods = Number(period) || 1;
    const annualRate = product.interestRate / 100;

    let periodsPerYear = 12;
    if (frequency === "daily") periodsPerYear = 365;
    if (frequency === "weekly") periodsPerYear = 52;

    const ratePerPeriod = annualRate / periodsPerYear;

    let installment = 0;
    let totalPayable = 0;

    if (product.interestType === "Flat Rate") {
      const totalInterest =
        principal * annualRate * (totalPeriods / periodsPerYear);
      totalPayable = principal + totalInterest;
      installment = totalPayable / totalPeriods;
    } else {
      // Reducing Balance Amortization Formula
      if (ratePerPeriod > 0) {
        installment =
          (principal *
            ratePerPeriod *
            Math.pow(1 + ratePerPeriod, totalPeriods)) /
          (Math.pow(1 + ratePerPeriod, totalPeriods) - 1);
        totalPayable = installment * totalPeriods;
      } else {
        installment = principal / totalPeriods;
        totalPayable = principal;
      }
    }

    return {
      periodLabel:
        frequency === "daily"
          ? "Days"
          : frequency === "weekly"
            ? "Weeks"
            : "Months",
      installment: isNaN(installment) ? 0 : installment,
      totalInterest: isNaN(totalPayable - principal)
        ? 0
        : totalPayable - principal,
      totalPayable: isNaN(totalPayable) ? 0 : totalPayable,
    };
  };

  const metrics = calculateMetrics();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate("/admin/apply-loan/add-guarantor");
  };

  return (
    <div className="w-full space-y-8 font-sans antialiased text-slate-800 p-1">
      {/* 1. APPLICANT CONTEXT HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200/60 pb-6 select-none">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Configure Loan Parameters
          </h2>

          {/* INLINE TAILWIND CSS UTILITY CLASSES */}
          <p className="text-sm font-bold text-slate-700 mt-0.5 capitalize">
            {member.name}
          </p>

          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
            <span>Member ID:</span>
            <span className="font-mono font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200/50">
              {member.id}
            </span>
          </p>
        </div>
      </div>

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
                <span className="text-[10px] text-slate-400 font-medium">
                  Max Ceiling: KES {member.maxEligibility.toLocaleString()}
                </span>
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
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="flex-1 h-full px-2 bg-transparent text-xs font-mono font-bold text-slate-800 focus:outline-none"
                  placeholder="0"
                />
              </div>
            </div>

            {/* OVERHAULED INPUT: REPAYMENT PERIOD DURATION */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700">
                  Repayment Period Duration
                </label>
                <span className="text-[10px] text-slate-400 font-medium capitalize">
                  Measured in {metrics.periodLabel}
                </span>
              </div>

              <div className="flex items-center w-full h-14 bg-white border border-slate-200 rounded-xl shadow-3xs focus-within:border-[#074073] focus-within:ring-1 focus-within:ring-[#074073]/10 transition-all overflow-hidden">
                <div className="flex items-center justify-center h-full px-3.5 bg-slate-50 border-r border-slate-200 shrink-0 text-slate-400">
                  <Calendar size={15} />
                </div>
                <input
                  type="number"
                  value={period}
                  onChange={(e) => setPeriod(Number(e.target.value))}
                  className="flex-1 h-full px-3.5 bg-transparent text-xs font-bold text-slate-800 focus:outline-none"
                  placeholder="e.g. 24"
                />
                <div className="pr-3.5 pl-2 text-slate-400 font-bold text-[10px] uppercase tracking-wide select-none">
                  {metrics.periodLabel}
                </div>
              </div>
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
                  value="daily"
                  checked={frequency === "daily"}
                  onChange={() => {
                    setFrequency("daily");
                    setPeriod(90);
                  }}
                  className="w-4 h-4 text-[#074073] focus:ring-[#074073] border-slate-300 cursor-pointer"
                />
                <span
                  className={`text-xs font-bold ${frequency === "daily" ? "text-[#074073]" : "text-slate-600 group-hover:text-slate-800"}`}
                >
                  Daily Collection
                </span>
              </label>

              {/* WEEKLY FREQUENCY */}
              <label className="flex items-center gap-2.5 cursor-pointer group select-none">
                <input
                  type="radio"
                  name="repaymentFrequency"
                  value="weekly"
                  checked={frequency === "weekly"}
                  onChange={() => {
                    setFrequency("weekly");
                    setPeriod(52);
                  }}
                  className="w-4 h-4 text-[#074073] focus:ring-[#074073] border-slate-300 cursor-pointer"
                />
                <span
                  className={`text-xs font-bold ${frequency === "weekly" ? "text-[#074073]" : "text-slate-600 group-hover:text-slate-800"}`}
                >
                  Weekly Installments
                </span>
              </label>

              {/* MONTHLY FREQUENCY */}
              <label className="flex items-center gap-2.5 cursor-pointer group select-none">
                <input
                  type="radio"
                  name="repaymentFrequency"
                  value="monthly"
                  checked={frequency === "monthly"}
                  onChange={() => {
                    setFrequency("monthly");
                    setPeriod(24);
                  }}
                  className="w-4 h-4 text-[#074073] focus:ring-[#074073] border-slate-300 cursor-pointer"
                />
                <span
                  className={`text-xs font-bold ${frequency === "monthly" ? "text-[#074073]" : "text-slate-600 group-hover:text-slate-800"}`}
                >
                  Monthly Statements
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* SECTION C: PURPOSE & STRATEGY */}
        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 border-b border-slate-100 pb-2">
            <FileText size={14} /> 3. Loan Purpose & Funding Directives
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* OVERHAULED DROPDOWN: CATEGORY */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Sector Classification
              </label>
              <div className="flex items-center w-full h-14 bg-white border border-slate-200 rounded-xl shadow-3xs focus-within:border-[#074073] focus-within:ring-1 focus-within:ring-[#074073]/10 transition-all overflow-hidden">
                <div className="flex items-center justify-center h-full px-3.5 bg-slate-50 border-r border-slate-200 shrink-0 text-slate-400">
                  <Coins size={15} />
                </div>
                <select
                  value={purposeCategory}
                  onChange={(e) => setPurposeCategory(e.target.value)}
                  className="flex-1 h-full px-3.5 bg-transparent text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
                >
                  <option value="business">
                    Business Investment / Trading
                  </option>
                  <option value="agriculture">Agribusiness Operations</option>
                  <option value="education">School Fees & Training</option>
                  <option value="emergency">Medical / Emergency Relief</option>
                  <option value="asset">Asset Purchase / Land</option>
                </select>
              </div>
            </div>

            {/* OVERHAULED DROPDOWN: DISBURSEMENT ROUTING */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Disbursement Channel
              </label>
              <div className="flex items-center w-full h-14 bg-white border border-slate-200 rounded-xl shadow-3xs focus-within:border-[#074073] focus-within:ring-1 focus-within:ring-[#074073]/10 transition-all overflow-hidden">
                <div className="flex items-center justify-center h-full px-3.5 bg-slate-50 border-r border-slate-200 shrink-0 text-slate-400">
                  <Wallet size={15} />
                </div>
                <select
                  value={disbursementChannel}
                  onChange={(e) => setDisbursementChannel(e.target.value)}
                  className="flex-1 h-full px-3.5 bg-transparent text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
                >
                  <option value="fosa">FOSA Savings Account</option>
                  <option value="mpesa">Mobile Wallet (M-Pesa B2C)</option>
                  <option value="rtgs">Bank Transfer (EFT/RTGS)</option>
                </select>
              </div>
            </div>
          </div>

          {/* OVERHAULED INPUT: TEXTAREA DETAILED INSIGHTS */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600">
              Detailed Purpose Breakdown Statement
            </label>
            <textarea
              rows={3}
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
          disabled={amount > member.maxEligibility || !amount || !period}
          type="button"
          className="h-11 px-6 bg-[#074073] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-[#074073]/10 hover:bg-[#052d52] transition-all active:scale-97 cursor-pointer flex items-center gap-2 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed disabled:active:scale-100"
        >
          <span>Continue With Application</span>
          <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default LoanApplicationDetails;
