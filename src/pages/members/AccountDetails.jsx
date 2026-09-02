import React, { useState } from "react";
import {
  ArrowLeft,
  Wallet,
  Calendar,
  ArrowUpRight,
  Copy,
  Check,
  Eye,
  Download,
  ArrowDownLeft,
  History,
  ChevronDown,
  PlusCircle,
  FileText,
  Search,
  Plus,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getAccount } from "../../sdk/account/account";
import { useToast } from "../../contexts/ToastProvider";
import { getAccountTransactions } from "../../sdk/transactions/transactions";
import AccountDetailsLoader from "../../skeletons/AccountDetailsLoader";
import AddSavings from "../../components/add-savings/DepositSavings";
import SavingsSummary from "../../components/add-savings/SavingsSummary";
import SavingsStkPush from "../../components/add-savings/AwaitSavingsStk";
import AddShares from "../../components/buy-shares/AddShares";
import SharesSummary from "../../components/buy-shares/SharesSummary";
import SharesStkPush from "../../components/buy-shares/AwaitSharesStk";

export default function AccountDetails() {
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const { id, accountNumber } = useParams();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [account, setAccount] = useState({});

  const [transactions, setTransactions] = useState([]);

  const onBack = () => {
    navigate(-1);
  };

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const { isFetching: fetchingAccount } = useQuery({
    queryKey: ["get account", id],
    queryFn: async () => {
      const response = await getAccount(id);
      return response?.data?.data;
    },
    onSuccess: (data) => {
      setAccount(data);
    },
    onError: (error) => {
      showToast({
        title: "Account processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const { isFetching } = useQuery({
    queryKey: ["get account transactions", accountNumber],
    queryFn: async () => {
      const response = await getAccountTransactions(accountNumber);
      return response?.data?.data;
    },
    onSuccess: (data) => {
      setTransactions(data);
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

  const [openAddShares, setOpenAddShares] = useState(false);
  const [openSharesSummary, setOpenSharesSummary] = useState(false);
  const [openSharesStk, setOpenSharesStk] = useState(false);

  const [openAddSavings, setOpenAddSavings] = useState(false);
  const [openSavingsSummary, setOpenSavingsSummary] = useState(false);
  const [openSavingsStk, setOpenSavingsStk] = useState(false);
  const [payStatus, setPayStatus] = useState("pending");
  const generateUUID = () => crypto.randomUUID();

  const [paymentDetails, setPaymentDetails] = useState({
    phoneNumber: "",
    sharesAmount: 0,
    savingsAmount: 0,
  });

  return (
    <div className="w-full space-y-5 font-sans antialiased text-slate-800">
      <AddShares
        isOpen={openAddShares}
        onClose={() => setOpenAddShares(false)}
        paymentDetails={paymentDetails}
        setPaymentDetails={setPaymentDetails}
        onSubmitStk={() => {
          setOpenAddShares(false);
          setOpenSharesSummary(true);
        }}
      />

      <SharesSummary
        isOpen={openSharesSummary}
        onClose={() => setOpenSharesSummary(false)}
        onBack={() => {
          setOpenSharesSummary(false);
          setOpenAddShares(true);
        }}
        paymentDetails={paymentDetails}
        isSubmitting={false}
        onConfirmStk={() => {}}
      />

      <SharesStkPush
        isOpen={openSharesStk}
        onClose={() => setOpenSharesStk(false)}
        onRetry={() => {}}
        phoneNumber={paymentDetails?.phoneNumber}
        amount={paymentDetails?.sharesAmount}
        timeoutSeconds={60}
        status={payStatus}
      />

      <AddSavings
        isOpen={openAddSavings}
        onClose={() => setOpenAddSavings(false)}
        paymentDetails={paymentDetails}
        setPaymentDetails={setPaymentDetails}
        onSubmitStk={() => {
          setOpenAddSavings(false);
          setOpenSavingsSummary(true);
        }}
      />

      <SavingsSummary
        isOpen={openSavingsSummary}
        onClose={() => setOpenSavingsSummary(false)}
        onBack={() => {
          setOpenSavingsSummary(false);
          setOpenAddSavings(true);
        }}
        paymentDetails={paymentDetails}
        onConfirmStk={() => {}}
        isSubmitting={false}
      />

      <SavingsStkPush
        isOpen={openSavingsStk}
        onClose={() => setOpenSavingsStk(false)}
        onRetry={() => {}}
        phoneNumber={paymentDetails?.phoneNumber}
        amount={paymentDetails?.savingsAmount}
        timeoutSeconds={60}
        status={payStatus}
      />

      {/* HEADER CONTROL BAR */}
      {fetchingAccount ? (
        <AccountDetailsLoader />
      ) : (
        <div>
          <div className="w-full flex justify-between gap-4 sm:flex-row sm:items-center sm:justify-between pb-6 select-none">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 transition-all cursor-pointer"
              >
                <ArrowLeft size={16} />
              </button>
              <div>
                <h2 className="text-xl font-bold text-primary">
                  {account?.product?.name}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Review transaction state routing, internal configurations, and
                  linked asset tiers.
                </p>
              </div>
            </div>
            <div className="relative sm:w-full">
              {/* Dropdown Menu Trigger Button */}
              <button
                onClick={() => setIsActionMenuOpen(!isActionMenuOpen)}
                className="sm:w-full flex items-center gap-1.5 h-10 px-4 border border-slate-200 bg-white text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 active:bg-slate-100/80 transition-all cursor-pointer shadow-2xs outline-none focus:border-slate-300"
              >
                <span>Account Actions</span>
                <ChevronDown
                  size={14}
                  className={`text-slate-400 transition-transform duration-200 ${isActionMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Menu Overlay & Overlay Container Panel */}
              {isActionMenuOpen && (
                <>
                  {/* Invisible overlay background to close menu when clicking outside */}
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setIsActionMenuOpen(false)}
                  />

                  {/* Menu Options Panel Grid */}
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200/80 rounded-xl shadow-lg py-1.5 z-40 origin-top-right animate-in fade-in slide-in-from-top-1 duration-150">
                    <button
                      onClick={() => {
                        setIsActionMenuOpen(false);
                        alert("Generating statements...");
                      }}
                      className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 text-left transition-colors cursor-pointer"
                    >
                      <FileText size={14} className="text-slate-400" />
                      <span>Account Statements</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsActionMenuOpen(false);
                        alert("Opening manual payment drawer...");
                      }}
                      className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:bg-emerald-50/40 text-left transition-colors cursor-pointer"
                    >
                      <PlusCircle size={14} className="text-slate-700" />
                      <span>Add Manual Payment</span>
                    </button>
                    {account?.product?.name === "Shares" && (
                      <button
                        onClick={() => {
                          setIsActionMenuOpen(false);
                          setOpenAddShares(true);
                        }}
                        className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:bg-emerald-50/40 text-left transition-colors cursor-pointer"
                      >
                        <Plus size={14} className="text-slate-700" />
                        <span>Buy Shares</span>
                      </button>
                    )}
                    {account?.product?.name === "Savings" && (
                      <button
                        onClick={() => {
                          setIsActionMenuOpen(false);
                          setOpenAddSavings(true);
                        }}
                        className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:bg-emerald-50/40 text-left transition-colors cursor-pointer"
                      >
                        <Plus size={14} className="text-slate-700" />
                        <span>Deposit Savings</span>
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* TWO COLUMN INTERACTION LAYER */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full items-stretch select-none">
            {/* CARD 1: ACCOUNT DETAILS */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs p-6 flex flex-col justify-between group transition-all hover:border-slate-300">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 group-hover:bg-[#074073]/5 group-hover:text-[#074073] group-hover:border-[#074073]/10 transition-colors">
                    <Wallet size={16} />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                      Account Type
                    </h4>
                    <p className="text-sm font-bold text-primary tracking-tight mt-0.5">
                      {account?.product?.name}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3.5">
                  <p className="text-[9px] uppercase font-bold tracking-widest text-slate-400">
                    Account Number
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-mono text-sm font-bold tracking-tight text-slate-800">
                      {account?.account_number?.replace(
                        /(\d{4})(\d{5})(\d{4})/,
                        "$1-$2-$3",
                      )}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyText(account?.account_number)}
                      className="size-7 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-white hover:border-slate-300 transition-all cursor-pointer"
                      title="Copy Account Number"
                    >
                      {copied ? (
                        <Check size={12} className="text-emerald-500" />
                      ) : (
                        <Copy size={12} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2: AVAILABLE BALANCE */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs p-6 flex flex-col justify-between transition-all hover:border-slate-300">
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 bg-emerald-50 border border-emerald-100/60 rounded-xl text-emerald-600">
                    <span className="text-xs font-black tracking-tight">
                      KES
                    </span>
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                      Available Balance
                    </h4>
                    <p className="text-[10px] text-slate-400 font-medium">
                      Ready for withdrawal or use
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3.5">
                  <p className="text-2xl font-black tracking-tight text-primary font-mono">
                    <span className="text-sm font-bold text-slate-400 mr-0.5">
                      KES
                    </span>
                    {Number(account.balance).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* CARD 3: ACCOUNT STATUS */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs p-6 flex flex-col justify-between transition-all hover:border-slate-300">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-400">
                    {account.status === "active" ? (
                      <span className="size-2 rounded-full bg-emerald-500 animate-pulse block" />
                    ) : (
                      <span className="size-2 rounded-full bg-rose-500 block" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                      Current Status
                    </h4>
                    <p className="text-[10px] text-slate-400 font-medium">
                      The account is currently {account.status}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3.5">
                  <p className="text-[9px] uppercase font-bold tracking-widest text-slate-400 mb-1.5">
                    Access Level
                  </p>
                  <span
                    className={`inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border w-fit ${
                      account.status === "active"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200/50"
                        : account.status === "dormant"
                          ? "bg-amber-50 text-amber-700 border-amber-200/50"
                          : "bg-rose-50 text-rose-700 border-rose-200/50"
                    }`}
                  >
                    <span
                      className={`size-1.5 rounded-full ${
                        account.status === "active"
                          ? "bg-emerald-500"
                          : account.status === "dormant"
                            ? "bg-amber-500"
                            : "bg-rose-500"
                      }`}
                    />
                    {account.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold tracking-tight text-primary">
        Account Transactions
      </h2>
      <div className="w-full bg-white rounded-3xl border border-slate-200/60 shadow-2xs overflow-hidden">
        <table className="w-full text-left border-collapse font-sans table-auto">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-200/60 text-[10px] font-bold text-slate-400 uppercase tracking-widest select-none">
              <th className="py-4.5 px-6">Transaction Account & Debtor</th>
              <th className="py-4.5 px-6">Product Framework</th>
              <th className="py-4.5 px-6">Amount & Balances</th>
              <th className="py-4.5 px-6">Charges & Net Value</th>
              <th className="py-4.5 px-6">Lifecycle Status</th>
              <th className="py-4.5 px-6 text-right pr-8">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-xs tracking-tight">
            {isFetching ? (
              [...Array(10)].map((_, i) => (
                <tr
                  key={`skeleton-${i}`}
                  className="animate-pulse border-b border-slate-100"
                >
                  {/* Col 1: Account Reference */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col space-y-2">
                      <div className="h-3 w-20 bg-slate-200 rounded" />
                      <div className="h-4 w-32 bg-slate-200 rounded" />
                    </div>
                  </td>

                  {/* Col 2: Product Framework */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col space-y-2">
                      <div className="h-4 w-24 bg-slate-200 rounded" />
                      <div className="h-3 w-28 bg-slate-200 rounded" />
                    </div>
                  </td>

                  {/* Col 3: Principal & Balances */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col space-y-2">
                      <div className="h-3 w-20 bg-slate-200 rounded" />
                      <div className="h-3 w-24 bg-slate-200 rounded" />
                    </div>
                  </td>

                  {/* Col 4: Charges & Net */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col space-y-2">
                      <div className="h-3 w-16 bg-slate-200 rounded" />
                      <div className="h-3 w-20 bg-slate-200 rounded" />
                    </div>
                  </td>

                  {/* Col 5: Lifecycle Status */}
                  <td className="py-4 px-6">
                    <div className="h-5 w-20 bg-slate-200 rounded-md" />
                  </td>

                  {/* Col 6: Actions Toolbar */}
                  <td className="py-4 px-6 text-right pr-8">
                    <div className="flex items-center justify-end gap-1.5">
                      <div className="size-8 rounded-xl bg-slate-200" />
                    </div>
                  </td>
                </tr>
              ))
            ) : transactions?.length > 0 ? (
              transactions?.map((tx) => (
                <tr
                  key={tx.id}
                  className="group transition-colors hover:bg-slate-50/60"
                >
                  {/* Col 1: Account Reference & Client Details */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-sans font-bold text-[9px] tracking-wider uppercase px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                          {tx.public_id}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
                          Channel: {tx.platform.replace("_", " ")}
                        </span>
                      </div>
                      <span className="font-semibold text-primary text-sm tracking-tight group-hover:text-primary transition-colors flex items-center gap-1.5">
                        {tx.category === "credit" ? (
                          <ArrowDownLeft
                            size={14}
                            className="text-success shrink-0"
                          />
                        ) : (
                          <ArrowUpRight
                            size={14}
                            className="text-slate-400 shrink-0"
                          />
                        )}
                        {tx.sender_name}
                      </span>
                    </div>
                  </td>

                  {/* Col 2: Product Parameter Mapping */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col space-y-1.5">
                      <span className="font-semibold text-slate-800 text-sm tracking-tight">
                        {tx.type}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-sans font-bold text-[9px] tracking-wider uppercase px-1.5 py-0.5 bg-slate-50 text-slate-500 rounded border border-slate-200/40 flex items-center gap-0.5">
                          {tx.deposit_method}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">
                          Ref: {tx.ref_number.substring(0, 8)}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Col 3: Financial Exposure Matrix */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col space-y-1">
                      <div className="text-[11px] text-slate-500 font-medium">
                        <span
                          className={`font-bold text-sm ${tx.category === "credit" ? "text-success" : "text-primary"}`}
                        >
                          KES {tx.category === "credit" ? "+" : "-"}
                          {Number(tx.amount).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        Running Bal:{" "}
                        <span className="font-mono font-bold text-slate-700">
                          KES {Number(tx.running_balance).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex flex-col space-y-1">
                      <div className="text-[11px] text-slate-500 font-medium">
                        Fee:{" "}
                        <span className="font-semibold text-slate-700">
                          KES{" "}
                          {Number(tx.transaction_charge || 0).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
                        Net: KES{" "}
                        {Number(
                          Number(tx.amount) -
                            Number(tx.transaction_charge || 0),
                        ).toLocaleString()}
                      </div>
                    </div>
                  </td>

                  {/* Col 5: Amortization Lifespan Stage */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col space-y-1">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md border w-fit ${
                          tx.status === "completed"
                            ? "bg-success/5 border-success/10 text-success"
                            : "bg-warning/5 border-warning/10 text-warning"
                        }`}
                      >
                        <span
                          className={`size-1 rounded-full ${tx.status === "completed" ? "bg-success" : "bg-warning"}`}
                        />
                        {tx.status}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium pt-0.5 flex items-center gap-1">
                        <Calendar size={11} />
                        {new Date(tx.createdAt).toLocaleDateString("en-KE", {
                          dateStyle: "medium",
                        })}
                      </span>
                    </div>
                  </td>

                  {/* Col 6: Actions Toolbar */}
                  <td className="py-4 px-6 text-right pr-8">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        className="size-8 rounded-xl border border-slate-200/60 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-slate-50 hover:border-slate-300 transition-all shadow-3xs bg-white cursor-pointer"
                        title="Inspect Transaction Details"
                      >
                        <Eye size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-36 px-6 text-center select-none">
                  <div className="flex flex-col items-center justify-center max-w-sm mx-auto space-y-4">
                    <div className="w-14 h-14 bg-slate-50 border border-slate-200/60 rounded-2xl flex items-center justify-center text-slate-400 shadow-3xs">
                      <Search
                        size={22}
                        strokeWidth={1.75}
                        className="text-slate-300"
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-primary tracking-tight">
                        No transactions found
                      </h3>
                      <p className="text-xs text-slate-400 font-medium leading-relaxed">
                        We couldn't find any transaction history or financial
                        records matching your current search terms or advanced
                        drawer filter parameters.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="h-9 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition-all active:scale-95 cursor-pointer"
                    >
                      Clear Active Filters
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
