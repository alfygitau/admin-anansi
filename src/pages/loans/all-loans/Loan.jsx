import React, { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  ChevronDown,
  Sliders,
  Bell,
  X,
  Check,
  User,
  Smartphone,
  ShieldCheck,
  DollarSign,
  Calendar,
  Layers,
  Percent,
  Clock,
  Briefcase,
  History,
  TrendingUp,
  Settings,
  Receipt,
  ShieldAlert,
} from "lucide-react";

export default function Loan() {
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const actionMenuRef = useRef(null);

  // Populated directly from your core banking single loan ledger payload schema
  const [loan] = useState({
    id: "e941949d-dfc0-40ae-9fd3-4674eb2f344c",
    loan_code: "L00001",
    loan_org_code: "BA208",
    loan_type: "Flash_loan",
    loan_mode: 1,
    loan_channel: "WEB",
    customer_id: "a8426991-3061-d0e7-7fd6-019456264e89",
    loan_name: "ALMASI ALUOCH",
    loan_mobile: "+254765350350",
    loan_amount: "5000.00",
    loan_principal_balance: "900.00",
    loan_interest_amount: "500.00",
    loan_interest_balance: "0.00",
    loan_processing_fee: "0.00",
    loan_insurance_amount: "0.00",
    loan_penalty: "0.00",
    loan_penalty_balance: "0.00",
    loan_Balance: "900.00",
    loan_total_amount: "5500.00",
    loan_total_payments: 4600,
    loan_overpayment_credit: "0.00",
    loan_installment_amount: "5500.00",
    loan_installment_principal_amount: "5000.00",
    loan_installment_interest: "500.00",
    loan_interest_per: "10.0000",
    interest_key: "pm",
    interest_method: "flat_rate",
    loan_period: 1,
    duration_key: "pm",
    loan_interval: "Monthly",
    installment_count: 1,
    loan_date: "2026-06-09",
    loan_due_date: "2026-07-09",
    cleared_date: null,
    defaulted_date: null,
    loan_status: "Active",
    loan_guarantor_status: "NONE",
    grace_period_days: 0,
    penalty_applied: false,
    currency: "KES",
    repayment_progress_percent: 83.64,
    loan_product: {
      product_name: "Flash Loan",
      product_code: "Flash_loan",
      description:
        "Instant short-term loan disbursed automatically upon eligibility",
      interest_rate: "10.0000",
      interest_method: "flat_rate",
      allowed_disbursement_methods: ["MPESA", "SAVINGS"],
    },
    next_payment: {
      installment_number: 1,
      due_date: "2026-07-09",
      principal_due: 5000,
      interest_due: 500,
      amount_due: 5500,
      amount_paid: 4600,
      balance_due: 900,
      status: "partial",
    },
    schedules: [
      {
        installment_number: 1,
        due_date: "2026-07-09",
        principal_due: "5000.00",
        interest_due: "500.00",
        total_due: "5500.00",
        principal_paid: "4100.00",
        interest_paid: "500.00",
        total_paid: "4600.00",
        status: "partial",
      },
      {
        installment_number: 2,
        due_date: "2026-08-09",
        principal_due: "5000.00",
        interest_due: "450.00",
        total_due: "5450.00",
        principal_paid: "0.00",
        interest_paid: "0.00",
        total_paid: "0.00",
        status: "pending",
      },
      {
        installment_number: 3,
        due_date: "2026-09-09",
        principal_due: "5000.00",
        interest_due: "400.00",
        total_due: "5400.00",
        principal_paid: "0.00",
        interest_paid: "0.00",
        total_paid: "0.00",
        status: "pending",
      },
      {
        installment_number: 4,
        due_date: "2026-10-09",
        principal_due: "5000.00",
        interest_due: "350.00",
        total_due: "5350.00",
        principal_paid: "0.00",
        interest_paid: "0.00",
        total_paid: "0.00",
        status: "pending",
      },
      {
        installment_number: 5,
        due_date: "2026-11-09",
        principal_due: "5000.00",
        interest_due: "300.00",
        total_due: "5300.00",
        principal_paid: "0.00",
        interest_paid: "0.00",
        total_paid: "0.00",
        status: "pending",
      },
    ],
    repayments: [
      {
        id: "R1",
        amount_paid: "2500.00",
        payment_date: "2026-09-06",
        payment_mode: "MPESA",
        transaction_ref: "QHH4LDXYZ1",
      },
      {
        id: "R2",
        amount_paid: "500.00",
        payment_date: "2026-09-06",
        payment_mode: "MPESA",
        transaction_ref: "QHH4LDXYZ1MGFTDR",
      },
      {
        id: "R3",
        amount_paid: "1500.00",
        payment_date: "2026-09-06",
        payment_mode: "MPESA",
        transaction_ref: "QHH4LDXYZ1MGFTDR",
      },
      {
        id: "R4",
        amount_paid: "100.00",
        payment_date: "2026-06-15",
        payment_mode: "MPESA",
        transaction_ref: "UFF648EGJD",
      },
    ],
    penalties: [
      {
        id: "pen-88d1b573-e491-403b-b2e8-4daa7633ecc3",
        loan_id: "e941949d-dfc0-40ae-9fd3-4674eb2f344c",
        penalty_type: "percentage_of_principal",
        amount: "250.00",
        amount_paid: "250.00",
        balance: "0.00",
        status: "Paid",
        notes:
          "Late payment execution fee for grace period overstep on Installment #1",
        created_at: "2026-06-10T08:00:00.000Z",
      },
      {
        id: "pen-99f2140d-cfc0-40ae-9fd3-4674eb2f55df",
        loan_id: "e941949d-dfc0-40ae-9fd3-4674eb2f344c",
        penalty_type: "percentage_of_outstanding",
        amount: "500.00",
        amount_paid: "0.00",
        balance: "500.00",
        status: "Outstanding",
        notes:
          "Accrued automated system delinquency levy on unresolved principal arrears balance",
        created_at: "2026-06-15T00:01:00.000Z",
      },
    ],
  });

  // Handle document click triggers for menu auto-collapse
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        actionMenuRef.current &&
        !actionMenuRef.current.contains(event.target)
      ) {
        setIsActionMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full space-y-8 font-sans antialiased text-slate-800">
      {/* EXECUTIVE CONTROL HEADER LAYER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200/60 pb-6 select-none">
        <div className="flex items-center gap-4">
          <button className="size-10 rounded-xl border border-slate-200/80 bg-white flex items-center justify-center text-slate-500 hover:text-slate-900 transition-all shadow-3xs cursor-pointer">
            <ArrowLeft size={16} />
          </button>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-sans font-bold text-[9px] tracking-wider uppercase px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                {loan.loan_code}
              </span>
              <span
                className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 ${
                  loan.loan_status === "Active"
                    ? "bg-primary/10 text-primary"
                    : "bg-success/10 text-success"
                }`}
              >
                <span
                  className={`size-1.5 rounded-full ${loan.loan_status === "Active" ? "bg-primary" : "bg-success"}`}
                />
                {loan.loan_status}
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1.5">
              {loan.loan_product?.product_name}
            </h1>
          </div>
        </div>

        {/* CONCEALED WORKFLOW MANAGEMENT DECK */}
        <div className="relative inline-block text-left" ref={actionMenuRef}>
          <button
            type="button"
            onClick={() => setIsActionMenuOpen(!isActionMenuOpen)}
            className={`h-11 px-4 border rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2.5 cursor-pointer shadow-2xs ${
              isActionMenuOpen
                ? "border-primary bg-primary/5 text-primary ring-4 ring-primary/5"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <Sliders size={14} />
            <span>Manage Loan</span>
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${isActionMenuOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isActionMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200/80 rounded-2xl shadow-xl p-2 z-50 origin-top-right animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-2 border-b border-slate-100 mb-1 select-none">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Execution Handlers
                </p>
              </div>
              <div className="space-y-1">
                <MenuActionButton
                  icon={<Check size={13} />}
                  label="Disburse"
                  onClick={() => setIsActionMenuOpen(false)}
                />
                <MenuActionButton
                  icon={<History size={13} />}
                  label="Process Statements"
                  onClick={() => setIsActionMenuOpen(false)}
                />
                <MenuActionButton
                  icon={<Bell size={13} />}
                  label="Send Notifications"
                  onClick={() => setIsActionMenuOpen(false)}
                />
                <MenuActionButton
                  icon={<DollarSign size={13} />}
                  label="Make Manual Payment"
                  onClick={() => setIsActionMenuOpen(false)}
                  isSuccess
                  variant
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CORE INDUSTRIAL PARAMETERS VIEW GRID: Side by Side on Desktop, 1 Column on Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* CONTAINER 1: DEBTOR IDENTITY & CHANNEL METADATA */}
        <LoanCard title="Borrower Identity" icon={<User size={16} />}>
          <MetricItem
            icon={<User />}
            label="Legal Account Holder Name"
            value={loan.loan_name}
          />
          <MetricItem
            icon={<Smartphone />}
            label="Mobile Communications Terminal"
            value={loan.loan_mobile}
          />
          <MetricItem
            icon={<ShieldCheck />}
            label="Global Customer Reference ID"
            value={loan.customer_id}
          />
          <MetricItem
            icon={<Briefcase />}
            label="Organization Branch Code"
            value={loan.loan_org_code}
          />
          <MetricItem
            icon={<Layers />}
            label="Origination Ingestion Channel"
            value={loan.loan_channel}
          />
          <MetricItem
            icon={<Settings />}
            label="Core Engine Operational Mode"
            value={`Layer Tier ${loan.loan_mode}`}
          />
        </LoanCard>

        {/* CONTAINER 2: LIABILITIES & RECOVERY CAPITAL METRICS */}
        <LoanCard
          title="Loan Principal & Balances"
          icon={<DollarSign size={16} />}
        >
          <MetricItem
            icon={<DollarSign />}
            label="Issued Principal Capital"
            value={`${loan.currency} ${parseFloat(loan.loan_amount).toFixed(2)}`}
          />
          <MetricItem
            icon={<TrendingUp />}
            label="Cumulative Book Obligation"
            value={`${loan.currency} ${parseFloat(loan.loan_total_amount).toFixed(2)}`}
          />
          <MetricItem
            icon={<Receipt />}
            label="Outstanding Net Ledger Balance"
            value={`${loan.currency} ${parseFloat(loan.loan_Balance).toFixed(2)}`}
          />
          <MetricItem
            icon={<Check />}
            label="Total Cleared Payments Liquidation"
            value={`${loan.currency} ${parseFloat(loan.loan_total_payments.toString()).toFixed(2)}`}
          />
          <MetricItem
            icon={<Percent />}
            label="Principal Remaining Balance"
            value={`${loan.currency} ${parseFloat(loan.loan_principal_balance).toFixed(2)}`}
          />
          <MetricItem
            icon={<X />}
            label="Active Default Delinquency Penalty"
            value={`${loan.currency} ${parseFloat(loan.loan_penalty_balance).toFixed(2)}`}
          />
        </LoanCard>

        {/* CONTAINER 3: ATTACHED PRODUCT SPECIFICATION BLUEPRINT */}
        <LoanCard
          title="Loan Product Specifications"
          icon={<Briefcase size={16} />}
        >
          <MetricItem
            icon={<Briefcase />}
            label="Sacco Backing Blueprint Name"
            value={loan.loan_product.product_name}
          />
          <MetricItem
            icon={<Settings />}
            label="Machine Framework Product Code"
            value={loan.loan_product.product_code}
          />
          <MetricItem
            icon={<Percent />}
            label="Nominal Interest Matrix Value"
            value={`${parseFloat(loan.loan_interest_per).toFixed(2)}% / ${loan.interest_key}`}
          />
          <MetricItem
            icon={<Settings />}
            label="Amortization Calculation Paradigm"
            value={loan.interest_method.replace("_", " ")}
            isCapitalized
          />
          <MetricItem
            icon={<Calendar />}
            label="Contractual Account Loan Period"
            value={`${loan.loan_period} Month (${loan.duration_key})`}
          />
          <MetricItem
            icon={<Clock />}
            label="Contractual Settlement Interval"
            value={loan.loan_interval}
          />
        </LoanCard>

        {/* CONTAINER 4: UPCOMING AMORTIZATION MILESTONE TRACKER */}
        <LoanCard title="Next Installment Details" icon={<Clock size={16} />}>
          <MetricItem
            icon={<Calendar />}
            label="Expected Milestone Target Due Date"
            value={new Date(loan.next_payment.due_date).toLocaleDateString(
              "en-KE",
              { dateStyle: "long" },
            )}
          />
          <MetricItem
            icon={<DollarSign />}
            label="Milestone Comprehensive Amount Due"
            value={`${loan.currency} ${parseFloat(loan.next_payment.amount_due.toString()).toFixed(2)}`}
          />
          <MetricItem
            icon={<Check />}
            label="Milestone Allocated Capital Received"
            value={`${loan.currency} ${parseFloat(loan.next_payment.amount_paid.toString()).toFixed(2)}`}
          />
          <MetricItem
            icon={<Receipt />}
            label="Milestone Outstanding Balance Due"
            value={`${loan.currency} ${parseFloat(loan.next_payment.balance_due.toString()).toFixed(2)}`}
          />

          <div className="md:col-span-2 space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1.5">
                <History size={13} /> Complete Book Liquidation Velocity
              </span>
              <span className="font-bold text-slate-900">
                {loan.repayment_progress_percent}%
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${loan.repayment_progress_percent}%` }}
              />
            </div>
          </div>
        </LoanCard>

        {/* CONTAINER 5: REPAYMENT AMORTIZATION SCHEDULE LEDGER */}
        <div className="bg-white border border-slate-200/60 shadow-sm rounded-[24px] overflow-hidden lg:col-span-1 w-full h-full">
          <div className="px-5 py-4 bg-slate-50/60 border-b border-slate-100 flex items-center gap-2.5 select-none">
            <Calendar size={16} className="text-slate-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Loan Schedule
            </h3>
          </div>
          <div className="p-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 select-none">
                  <th className="pb-3 pl-2">Inst.</th>
                  <th className="pb-3">Target Due Date</th>
                  <th className="pb-3">Principal Due</th>
                  <th className="pb-3">Interest Due</th>
                  <th className="pb-3 text-right pr-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/70 font-medium text-slate-700">
                {loan.schedules.map((s, i) => (
                  <tr key={i} className="hover:bg-slate-50/50">
                    <td className="py-3 pl-2 font-bold text-slate-400">
                      #{s.installment_number}
                    </td>
                    <td className="py-3 text-slate-600">
                      {new Date(s.due_date).toLocaleDateString("en-KE", {
                        dateStyle: "medium",
                      })}
                    </td>
                    <td className="py-3">KES {s.principal_due}</td>
                    <td className="py-3">KES {s.interest_due}</td>
                    <td className="py-3 text-right pr-2">
                      <span className="px-2 py-0.5 uppercase text-[9px] font-bold bg-warning/10 text-warning rounded-md border border-warning/10">
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CONTAINER 6: CASH TRANSACTION REPAYMENTS JOURNAL */}
        <div className="bg-white border border-slate-200/60 shadow-sm rounded-[24px] overflow-hidden lg:col-span-1 w-full h-full">
          <div className="px-5 py-4 bg-slate-50/60 border-b border-slate-100 flex items-center gap-2.5 select-none">
            <History size={16} className="text-slate-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Repayments Transactions
            </h3>
          </div>
          <div className="p-4 max-h-[300px] overflow-y-auto space-y-2.5 pr-2">
            {loan.repayments.map((r, i) => (
              <div
                key={i}
                className="border border-slate-100 p-3 rounded-xl bg-slate-50/40 flex items-center justify-between hover:border-slate-200 transition-colors"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold bg-primary/5 text-primary border border-primary/10 px-1.5 rounded uppercase tracking-wide">
                      {r.payment_mode}
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-slate-500 truncate">
                      {r.transaction_ref}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium">
                    Processed{" "}
                    {new Date(r.payment_date).toLocaleDateString("en-KE", {
                      dateStyle: "medium",
                    })}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-emerald-600">
                    + KES {r.amount_paid}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CONTAINER: DEFAULT PENALTIES & DELINQUENCY CONTROLS */}
        <LoanCard
          title="Penalties"
          icon={<ShieldAlert className="text-slate-400" size={16} />}
        >
          {/* Dynamic Row Item Array Ledger */}
          <div className="md:col-span-2 space-y-2.5 border-t border-slate-100 pt-5 mt-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block pl-1">
              Itemized Penalty Assessment Logs
            </span>
            {loan.penalties && loan.penalties.length > 0 ? (
              <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
                {loan.penalties.map((p, i) => (
                  <div
                    key={i}
                    className="border border-slate-100 p-3 rounded-xl bg-slate-50/40 flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                        Grace Overstep Levy
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium">
                        Assessed on lifecycle processing trace
                      </p>
                    </div>
                    <p className="text-xs font-bold text-error">
                      KES {p.amount}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              /* Fallback state when penalty array reads empty */
              <div className="border border-dashed border-slate-200 rounded-xl p-6 text-center bg-slate-50/30 select-none">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  No Delinquency Penalties Levied Against Account
                </p>
              </div>
            )}
          </div>
        </LoanCard>
      </div>
    </div>
  );
}

/* ==========================================================================
   SUPPORTIVE CHILD UTILITY HOOK CHASSIS
   ========================================================================== */

const LoanCard = ({ title, icon, children }) => (
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
    <div className="min-w-0 flex flex-col space-y-1.5">
      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 leading-normal">
        {label}
      </span>
      <span
        className={`text-sm font-medium text-slate-800 tracking-tight leading-normal truncate ${isCapitalized ? "capitalize" : ""}`}
      >
        {value}
      </span>
    </div>
  </div>
);

const MenuActionButton = ({
  icon,
  label,
  onClick,
  isSuccess = false,
  variant = false,
}) => (
  <button
    onClick={onClick}
    className={`w-full h-10 px-3 rounded-xl flex items-center gap-3 text-xs font-semibold transition-colors text-left cursor-pointer group ${
      variant
        ? "hover:text-emerald-700 hover:bg-emerald-50/50 text-slate-700 font-bold"
        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
    }`}
  >
    <div
      className={`size-6 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-400 transition-colors ${
        isSuccess
          ? "group-hover:text-success group-hover:bg-emerald-50 group-hover:border-emerald-100"
          : "group-hover:text-primary group-hover:bg-primary/5 group-hover:border-primary/10"
      }`}
    >
      {icon}
    </div>
    <span>{label}</span>
  </button>
);
