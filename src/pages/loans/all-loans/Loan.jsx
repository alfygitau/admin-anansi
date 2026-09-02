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
  Coins,
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
  PlusCircle,
  Wallet,
  ArrowRight,
  CalendarClock,
  AlertTriangle,
  BellRing,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import {
  getLoan,
  pollLoanRepaymentStatus,
  repayLoan,
} from "../../../sdk/loans/loans";
import { useToast } from "../../../contexts/ToastProvider";
import LoanDetailsLoader from "../../../skeletons/LoanDetailsLoader";
import RepayLoan from "../../../components/repay-loan/PromptLoan";
import RepaySummary from "../../../components/repay-loan/RepaySummary";
import AwaitLoanStk from "../../../components/repay-loan/AwaitLoanStk";

export default function Loan() {
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const actionMenuRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { showToast } = useToast();
  const [loan, setLoan] = useState({});

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

  const handleSendNotification = () => {
    navigate(`/admin/all-loans/${loan?.id}/send-notification`);
  };

  const handleRecordPayment = () => {
    navigate(`/admin/all-loans/${loan?.id}/record-payment`);
  };

  const handleViewStatements = () => {
    navigate(`/admin/all-loans/${loan?.id}/loan-statements`);
  };

  const { isFetching, refetch } = useQuery({
    queryKey: ["loan", id],
    queryFn: async () => {
      const response = await getLoan(id);
      return response.data?.data;
    },
    onSuccess: (data) => {
      setLoan(data);
    },
    onError: (error) => {
      showToast({
        title: "Transactions processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  function isLoanDue(dueDateString) {
    if (!dueDateString || typeof dueDateString !== "string") return false;
    const parts = dueDateString.split("-");
    if (parts.length !== 3) return false;

    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

    if (isNaN(year) || isNaN(month) || isNaN(day)) return false;
    const dueDate = new Date(year, month, day);
    if (
      dueDate.getFullYear() !== year ||
      dueDate.getMonth() !== month ||
      dueDate.getDate() !== day
    ) {
      return false;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dueDate <= today;
  }

  const [openRepayLoan, setOpenRepayLoan] = useState(false);
  const [openRepaySummary, setOpenRepaySummary] = useState(false);
  const [openRepayStk, setOpenRepayStk] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [showAwaitPayment, setShowAwaitPayment] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    phoneNumber: "",
    amount: "",
    loanId: "",
  });
  const [payStatus, setPayStatus] = useState("pending");
  const generateUUID = () => crypto.randomUUID();
  const [reference, setReference] = useState("");

  const { mutate, isLoading: isSubmitting } = useMutation({
    mutationKey: ["repay loan"],
    mutationFn: async (ref) => {
      const response = await repayLoan(
        loan?.id,
        paymentDetails?.amount,
        paymentDetails?.phoneNumber,
        loan?.loan_code,
        ref,
      );
      return response?.data?.data;
    },
    onSuccess: (data) => {
      setPaymentId(data?.id);
      setShowAwaitPayment(true);
      setOpenRepaySummary(false);
      setOpenRepayStk(true);
    },
    onError: (error) => {
      showToast({
        title: "Application Failure",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  useQuery({
    queryKey: ["poll loan repayment"],
    queryFn: async () => {
      const response = await pollLoanRepaymentStatus(paymentId);
      return response.data.data?.terminal;
    },
    enabled: !!showAwaitPayment,
    onSuccess: async (data) => {
      if (data) {
        setPayStatus("success");
        setShowAwaitPayment(false);
        refetch();
      }
    },
    refetchInterval: 3000,
    refetchIntervalInBackground: true,
    onErrors: (error) => {
      showToast({
        title: "Authentication glitch",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const handlePromptRepayment = async () => {
    const ref = generateUUID();
    setReference(ref);
    await mutate(ref);
  };

  const handleRetry = async () => {
    await mutate(reference);
  };

  return (
    <>
      <RepayLoan
        isOpen={openRepayLoan}
        onClose={() => {
          setOpenRepayLoan(false);
          setShowAwaitPayment(false);
        }}
        paymentDetails={paymentDetails}
        setPaymentDetails={setPaymentDetails}
        onSubmitStk={() => {
          setOpenRepayLoan(false);
          setOpenRepaySummary(true);
        }}
      />

      <RepaySummary
        isOpen={openRepaySummary}
        onClose={() => setOpenRepaySummary(false)}
        onBack={() => {
          setOpenRepaySummary(false);
          setOpenRepayLoan(true);
        }}
        paymentDetails={paymentDetails}
        isSubmitting={isSubmitting}
        onConfirmStk={handlePromptRepayment}
      />

      <AwaitLoanStk
        isOpen={openRepayStk}
        onClose={() => setOpenRepayStk(false)}
        onRetry={handleRetry}
        phoneNumber={paymentDetails?.phoneNumber}
        amount={paymentDetails?.amount}
        timeoutSeconds={60}
        status={payStatus}
      />

      {isFetching ? (
        <LoanDetailsLoader />
      ) : (
        <div className="w-full space-y-5 antialiased text-slate-800">
          {/* EXECUTIVE CONTROL HEADER LAYER */}
          <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 select-none">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="size-10 rounded-xl border border-slate-200/80 bg-white flex items-center justify-center text-slate-500 hover:text-primary transition-all shadow-3xs cursor-pointer"
              >
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
                <h1 className="text-2xl font-bold tracking-tight text-primary mt-1.5">
                  {loan.loan_product?.product_name}
                </h1>
              </div>
            </div>

            {/* CONCEALED WORKFLOW MANAGEMENT DECK */}
            <div
              className="relative inline-block text-left sm:w-full"
              ref={actionMenuRef}
            >
              <button
                type="button"
                onClick={() => setIsActionMenuOpen(!isActionMenuOpen)}
                className={`sm:w-full h-11 px-4 border rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2.5 cursor-pointer shadow-2xs ${
                  isActionMenuOpen
                    ? "border-primary bg-primary/5 text-primary ring-4 ring-primary/5"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-primary"
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
                      Quick Actions
                    </p>
                  </div>
                  <div className="space-y-1">
                    <MenuActionButton
                      icon={<History size={13} />}
                      label="View Loan Statement"
                      onClick={() => {
                        handleViewStatements();
                        setIsActionMenuOpen(false);
                      }}
                    />
                    <MenuActionButton
                      icon={<Bell size={13} />}
                      label="Send Notification"
                      onClick={() => {
                        handleSendNotification();
                        setIsActionMenuOpen(false);
                      }}
                    />
                    <MenuActionButton
                      icon={<PlusCircle size={13} />}
                      label="Generate Loan Statement"
                      onClick={() => {
                        setIsActionMenuOpen(false);
                      }}
                    />
                    <MenuActionButton
                      icon={<Coins size={13} />}
                      label="Record Manual Payment"
                      onClick={() => {
                        handleRecordPayment();
                        setIsActionMenuOpen(false);
                      }}
                      isSuccess
                      variant
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          {isLoanDue(loan?.next_payment?.due_date) && (
            <div className="relative overflow-hidden bg-primary text-white p-5 md:p-6 rounded-3xl shadow-xl border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all">
              <div className="flex items-center gap-5 z-10">
                <div className="size-12 rounded-2xl bg-amber-500/10 backdrop-blur-md border border-amber-400/30 flex items-center justify-center shrink-0 text-amber-300 shadow-inner mt-0.5">
                  <CalendarClock
                    size={22}
                    className="animate-pulse text-amber-400"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest bg-amber-500/20 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-amber-400 animate-ping" />
                      Loan Installment Due
                    </span>
                  </div>
                  <h3 className="text-base font-bold tracking-tight text-white">
                    Overdue Loan Facility Detected
                  </h3>
                  <p className="text-xs text-slate-200/90 font-medium max-w-2xl leading-relaxed">
                    This member's loan has surpassed its scheduled repayment
                    date and is currently flagged as overdue. Initiate an
                    immediate settlement now to maintain a good credit standing
                    and avoid late payment penalties.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setOpenRepayLoan(true)}
                type="button"
                className="z-10 h-12 px-6 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-2xl transition-all shadow-lg hover:shadow-amber-500/20 flex items-center justify-center gap-2 shrink-0 cursor-pointer active:scale-98"
              >
                <Wallet size={16} />
                <span>Prompt Member to Pay</span>
                <ArrowRight size={15} />
              </button>

              {/* Decorative Glow */}
              <div className="absolute -right-10 -bottom-10 size-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -left-10 -top-10 size-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
            </div>
          )}

          {/* CORE INDUSTRIAL PARAMETERS VIEW GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* CONTAINER 1: DEBTOR IDENTITY & CHANNEL METADATA */}
            <LoanCard title="Borrower Details" icon={<User size={16} />}>
              <MetricItem
                icon={<User />}
                label="Borrower Name"
                value={loan.loan_name}
              />
              <MetricItem
                icon={<Smartphone />}
                label="Phone Number"
                value={loan.loan_mobile}
              />
              <MetricItem
                icon={<Briefcase />}
                label="Branch Code"
                value={loan.loan_org_code}
              />
              <MetricItem
                icon={<Layers />}
                label="Application Channel"
                value={loan.loan_channel}
              />
              <MetricItem
                icon={<Settings />}
                label="System Processing Mode"
                value={`Tier ${loan.loan_mode}`}
              />
            </LoanCard>

            {/* CONTAINER 2: LIABILITIES & RECOVERY CAPITAL METRICS */}
            <LoanCard title="Balances & Amounts" icon={<Coins size={16} />}>
              <MetricItem
                icon={<Coins />}
                label="Amount Borrowed"
                value={`${loan.currency} ${parseFloat(loan?.loan_amount)?.toFixed(2)}`}
              />
              <MetricItem
                icon={<TrendingUp />}
                label="Total to Repay (with Interest)"
                value={`${loan.currency} ${parseFloat(loan?.loan_total_amount)?.toFixed(2)}`}
              />
              <MetricItem
                icon={<Receipt />}
                label="Total Current Balance"
                value={`${loan.currency} ${parseFloat(loan?.loan_Balance)?.toFixed(2)}`}
              />
              <MetricItem
                icon={<Check />}
                label="Total Paid So Far"
                value={`${loan?.currency} ${parseFloat(loan?.loan_total_payments?.toString())?.toFixed(2)}`}
              />
              <MetricItem
                icon={<Percent />}
                label="Remaining Principal"
                value={`${loan.currency} ${parseFloat(loan?.loan_principal_balance)?.toFixed(2)}`}
              />
              <MetricItem
                icon={<X />}
                label="Accrued Penalties"
                value={`${loan.currency} ${parseFloat(loan?.loan_penalty_balance)?.toFixed(2)}`}
              />
            </LoanCard>

            {/* CONTAINER 3: ATTACHED PRODUCT SPECIFICATION BLUEPRINT */}
            <LoanCard title="Loan Features" icon={<Briefcase size={16} />}>
              <MetricItem
                icon={<Briefcase />}
                label="Product Name"
                value={loan?.loan_product?.product_name}
              />
              <MetricItem
                icon={<Settings />}
                label="Product Code"
                value={loan?.loan_product?.product_code}
              />
              <MetricItem
                icon={<Percent />}
                label="Interest Rate"
                value={`${parseFloat(loan?.loan_interest_per)?.toFixed(2)}% / ${loan?.interest_key}`}
              />
              <MetricItem
                icon={<Settings />}
                label="Interest Calculation Method"
                value={loan?.interest_method?.replace("_", " ")}
                isCapitalized
              />
              <MetricItem
                icon={<Calendar />}
                label="Loan Duration"
                value={`${loan?.loan_period} Month (${loan?.duration_key})`}
              />
              <MetricItem
                icon={<Clock />}
                label="Payment Frequency"
                value={loan?.loan_interval}
              />
            </LoanCard>

            {/* CONTAINER 4: UPCOMING AMORTIZATION MILESTONE TRACKER */}
            <LoanCard title="Next Payment Details" icon={<Clock size={16} />}>
              {loan?.next_payment ? (
                <>
                  {/* SHOW METRICS IF DATA EXISTS */}
                  <MetricItem
                    icon={<Calendar />}
                    label="Payment Due Date"
                    value={new Date(
                      loan?.next_payment?.due_date,
                    )?.toLocaleDateString("en-KE", { dateStyle: "long" })}
                  />
                  <MetricItem
                    icon={<Coins />}
                    label="Total Due This Month"
                    value={`${loan?.currency} ${parseFloat(loan?.next_payment?.amount_due?.toString())?.toFixed(2)}`}
                  />
                  <MetricItem
                    icon={<Check />}
                    label="Amount Paid This Month"
                    value={`${loan?.currency} ${parseFloat(loan?.next_payment?.amount_paid?.toString())?.toFixed(2)}`}
                  />
                  <MetricItem
                    icon={<Receipt />}
                    label="Balance Due This Month"
                    value={`${loan?.currency} ${parseFloat(loan?.next_payment?.balance_due?.toString())?.toFixed(2)}`}
                  />
                </>
              ) : (
                /* FRIENDLY EMPTY STATE IF DATA IS NULL OR MISSING */
                <div className="md:col-span-2 flex flex-col items-center justify-center text-center p-6 bg-slate-50 border border-dashed border-slate-200 rounded-xl select-none">
                  <div className="size-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-3xs mb-2.5">
                    <Check size={16} strokeWidth={2.5} />
                  </div>
                  <p className="text-xs font-bold text-slate-800">
                    No Scheduled Payments
                  </p>
                  <p className="text-[11px] text-slate-500 max-w-xs mt-0.5 leading-relaxed">
                    Your account is fully up to date. There are no active or
                    upcoming payments due at this time.
                  </p>
                </div>
              )}

              {/* ALWAYS KEEP OVERALL LOAN PROGRESS VISIBLE */}
              <div className="md:col-span-2 space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100 mt-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <History size={13} /> Overall Loan Progress
                  </span>
                  <span className="font-bold text-primary">
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
                  Payment Schedule
                </h3>
              </div>
              <div className="p-4 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 select-none">
                      <th className="pb-3 pl-2">No.</th>
                      <th className="pb-3">Due Date</th>
                      <th className="pb-3">Principal Due</th>
                      <th className="pb-3">Interest Due</th>
                      <th className="pb-3 text-right pr-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100/70 font-medium text-slate-700">
                    {loan?.schedules?.map((s, i) => (
                      <tr key={i} className="hover:bg-slate-50/50">
                        <td className="py-3 pl-2 font-bold text-slate-400">
                          #{s?.installment_number}
                        </td>
                        <td className="py-3 text-slate-600">
                          {new Date(s?.due_date)?.toLocaleDateString("en-KE", {
                            dateStyle: "medium",
                          })}
                        </td>
                        <td className="py-3">KES {s?.principal_due}</td>
                        <td className="py-3">KES {s?.interest_due}</td>
                        <td className="py-3 text-right pr-2">
                          <span
                            className={`px-2 py-0.5 uppercase text-[9px] font-bold rounded-md border ${
                              s?.status?.toLowerCase() === "paid"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                                : s?.status?.toLowerCase() === "pending"
                                  ? "bg-amber-50 text-amber-700 border-amber-200/60"
                                  : s?.status?.toLowerCase() === "partial"
                                    ? "bg-sky-50 text-sky-700 border-sky-200/60"
                                    : "bg-slate-50 text-slate-600 border-slate-200"
                            }`}
                          >
                            {s?.status}
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
                  Recent Repayments
                </h3>
              </div>

              <div className="p-4 max-h-[300px] overflow-y-auto space-y-2.5 pr-2">
                {loan?.repayments && loan.repayments.length > 0 ? (
                  loan.repayments.map((r, i) => (
                    <div
                      key={i}
                      className="border border-slate-100 p-3 rounded-xl bg-slate-50/40 flex items-center justify-between hover:border-slate-200 transition-colors"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold bg-primary/5 text-primary border border-primary/10 px-1.5 rounded uppercase tracking-wide">
                            {r?.payment_mode}
                          </span>
                          <span className="text-[11px] font-mono font-semibold text-slate-500 truncate">
                            {r?.transaction_ref}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium">
                          Processed on{" "}
                          {new Date(r.payment_date).toLocaleDateString(
                            "en-KE",
                            {
                              dateStyle: "medium",
                            },
                          )}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-emerald-600">
                          + KES {r?.amount_paid}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  /* PERFECTLY CENTERED EMPTY STATE UI */
                  <div className="flex flex-col items-center justify-center text-center py-14 select-none">
                    <div className="size-10 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-slate-400 bg-slate-50/50 mb-3 shadow-3xs">
                      <Receipt size={16} strokeWidth={2.5} />
                    </div>
                    <p className="text-xs font-bold text-slate-700">
                      No Repayments Found
                    </p>
                    <p className="text-[11px] text-slate-400 max-w-[220px] mx-auto mt-1 leading-relaxed">
                      There is no record of any payments made toward this loan
                      yet.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <LoanCard
              title="Penalties"
              icon={<ShieldAlert className="text-slate-400" size={16} />}
            >
              {loan.penalties && loan.penalties.length > 0 ? (
                /* RENDER ACTIVE HISTORY SECTION ONLY IF PENALTIES EXIST */
                <div className="md:col-span-2 space-y-2.5 border-t border-slate-100 pt-5 mt-1 w-full">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block pl-1">
                    Penalty History
                  </span>

                  <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
                    {loan.penalties.map((p, i) => (
                      <div
                        key={i}
                        className="border border-slate-100 p-3 rounded-xl bg-slate-50/40 flex items-center justify-between"
                      >
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                            Late Payment Fee
                          </p>
                          <p className="text-[10px] text-slate-400 font-medium">
                            Charged automatically for missing the grace period
                          </p>
                        </div>
                        <p className="text-xs font-bold text-error">
                          KES {p?.amount}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* FIXED: Stripped out the secondary wrapper and sub-headers. 
       Mounts and centers cleanly as a direct child of the primary card shell. */
                <div className="col-span-full flex flex-col items-center justify-center text-center w-full min-h-[220px] py-10 select-none animate-in fade-in duration-200">
                  <div className="size-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-3xs mb-3.5 shrink-0">
                    <ShieldCheck size={18} strokeWidth={2.5} />
                  </div>
                  <h4 className="text-xs font-black text-slate-700 uppercase tracking-wide">
                    Account in Good Standing
                  </h4>
                  <p className="text-xs text-slate-400 font-medium max-w-xs mx-auto mt-1 leading-relaxed">
                    No penalties or late fees have been charged to this account.
                  </p>
                </div>
              )}
            </LoanCard>
          </div>
        </div>
      )}
    </>
  );
}

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
    {/* UPGRADED ICON ACCENT */}
    <div className="size-8 rounded-xl bg-slate-50 border border-slate-200/40 flex items-center justify-center text-slate-500 shrink-0 shadow-3xs mt-0.5">
      {React.cloneElement(icon, { size: 14, strokeWidth: 2.5 })}
    </div>

    {/* SHARPER TYPOGRAPHY HIERARCHY */}
    <div className="min-w-0 flex flex-col space-y-1">
      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 leading-normal">
        {label}
      </span>
      {/* FIXED: Swapped to text-primary and font-bold for a rich, crisp appearance */}
      <span
        className={`text-xs font-bold text-primary tracking-tight leading-normal truncate ${
          isCapitalized ? "capitalize" : ""
        }`}
      >
        {value || "—"}
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
        : "text-slate-600 hover:text-primary hover:bg-slate-50"
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
