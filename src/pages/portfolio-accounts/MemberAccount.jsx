import React, { useState } from "react";
import { useQuery } from "react-query";
import { useToast } from "../../contexts/ToastProvider";
import * as Sentry from "@sentry/react";
import {
  getMemberProductSummary,
  getMemberProductTransactions,
} from "../../sdk/products/products";
import { useNavigate, useParams } from "react-router-dom";
import {
  AlertCircle,
  ArrowDownLeft,
  ArrowLeft,
  ArrowUpRight,
  Building2,
  Calendar,
  Check,
  Copy,
  Eye,
  FileText,
  Search,
  ShieldCheck,
  User,
  Wallet,
  X,
  PlusCircle,
  ChevronDown,
  Download,
  Filter,
} from "lucide-react";
import { useFormatAmount } from "../../hooks/useFormatAmount";
import Pagination from "../../components/pagination/Pagination";
import { useFormattedDateTime } from "../../hooks/useFormatDateTime";

const MemberAccount = () => {
  const { showToast } = useToast();
  const { memberId, productId } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({});
  const [totalItems, setTotalItems] = useState(0);
  const [selectedTxContext, setSelectedTxContext] = useState(null);
  const formatAmount = useFormatAmount();
  const navigate = useNavigate();
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const formatDate = useFormattedDateTime();
  const [filters, setFilters] = useState({
    q: "",
    status: "",
    page: "",
    limit: "",
    startDate: "",
    endDate: "",
  });

  const { isFetching } = useQuery({
    queryKey: [
      "member account transactions",
      productId,
      memberId,
      filters?.status,
      filters?.limit,
      filters?.page,
      filters?.startDate,
      filters?.endDate,
    ],
    queryFn: async () => {
      const response = await getMemberProductTransactions(
        productId,
        memberId,
        filters?.status,
        filters?.limit,
        filters?.page,
        filters?.startDate,
        filters?.endDate,
      );
      return response?.data;
    },
    onSuccess: (data) => {
      setTransactions(data?.items);
      setFilters((prev) => ({
        ...prev,
        page: data?.meta?.currentPage,
        limit: data?.meta?.itemsPerPage,
      }));
      setTotalItems(data.meta?.totalItems);
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

  const { isFetching: loading } = useQuery({
    queryKey: ["member product summary", productId, memberId],
    queryFn: async () => {
      const response = await getMemberProductSummary(productId, memberId);
      return response?.data;
    },
    onSuccess: (data) => {
      setSummary(data?.data);
    },
    onError: (error) => {
      Sentry.captureException(
        new Error(error?.response?.data?.message || error.message),
        {
          tags: { component: "Accounts", action: "getDepositProducts" },
        },
      );
      showToast({
        title: "Product processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const handlePageChange = (page) => {
    setFilters((prev) => ({
      ...prev,
      page: page,
    }));
  };

  const handleOnItemsPageChange = (limit) => {
    setFilters((prev) => ({
      ...prev,
      limit: limit,
    }));
  };

  const [copied, setCopied] = useState(false);

  const handleCopyText = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="w-full space-y-6 font-sans antialiased text-slate-800">
        <div className="w-full flex sm:flex-col justify-between gap-4 sm:items-center select-none">
          {/* Left Column: Navigation & Page Title */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 transition-all cursor-pointer shrink-0"
              title="Go Back"
            >
              <ArrowLeft size={16} />
            </button>
            <div>
              <h2 className="text-xl font-bold text-primary tracking-tight">
                {summary?.productName} Overview
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Review detailed product performance metrics and transaction
                history.
              </p>
            </div>
          </div>
          {/* Right Column: Actions Dropdown */}
          <div className="relative sm:w-auto">
            <button
              type="button"
              onClick={() => setIsActionMenuOpen(!isActionMenuOpen)}
              className="w-full sm:w-auto flex items-center justify-between gap-2 h-10 px-4 border border-slate-200 bg-white text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 active:bg-slate-100/80 transition-all cursor-pointer shadow-2xs outline-none focus:border-slate-300"
            >
              <span>Account Actions</span>
              <ChevronDown
                size={14}
                className={`text-slate-400 transition-transform duration-200 ${
                  isActionMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isActionMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setIsActionMenuOpen(false)}
                />

                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200/80 rounded-xl shadow-lg py-1.5 z-40 origin-top-right animate-in fade-in slide-in-from-top-1 duration-150">
                  <button
                    type="button"
                    onClick={() => {
                      setIsActionMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 text-left transition-colors cursor-pointer"
                  >
                    <FileText size={14} className="text-slate-400" />
                    <span>Account Statements</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsActionMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:bg-emerald-50/40 text-left transition-colors cursor-pointer"
                  >
                    <PlusCircle size={14} className="text-slate-700" />
                    <span>Add Manual Payment</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-[#074073]/5 border border-[#074073]/10 flex items-center justify-center font-bold text-[#074073] shrink-0">
              <User size={18} />
            </div>
            <div className="flex flex-col space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md border border-slate-200/60">
                  {summary?.memberId || "N/A"}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Member Profile
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-800 tracking-tight">
                {summary?.memberName || "Unknown Member"}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-50/80 px-3.5 py-2 rounded-xl border border-slate-200/60 self-start sm:self-auto">
            <Calendar size={14} className="text-slate-400" />
            <span>Created:</span>
            <span className="font-bold text-slate-700 font-mono">
              {formatDate
                ? formatDate(summary?.memberCreatedAt)
                : summary?.memberCreatedAt}
            </span>
          </div>
        </div>

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
                    {summary?.accountType || "Standard Account"}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3.5">
                <p className="text-[9px] uppercase font-bold tracking-widest text-slate-400">
                  Account Number
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-mono text-sm font-bold tracking-tight text-slate-800">
                    {summary?.accountNumber
                      ? summary?.accountNumber.replace(
                          /(\d{4})(\d{5})(\d{4})/,
                          "$1-$2-$3",
                        )
                      : "—"}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyText(summary?.accountNumber)}
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
                  <span className="text-xs font-black tracking-tight">KES</span>
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
                  {Number(summary?.availableBalance || 0).toLocaleString(
                    undefined,
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    },
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* CARD 3: ACCOUNT STATUS */}
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs p-6 flex flex-col justify-between transition-all hover:border-slate-300">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-400">
                  {summary?.status === "active" ? (
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
                    The account is currently {summary?.status || "unknown"}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3.5">
                <p className="text-[9px] uppercase font-bold tracking-widest text-slate-400 mb-1.5">
                  Access Level
                </p>
                <span
                  className={`inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border w-fit ${
                    summary?.status === "active"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200/50"
                      : summary?.status === "dormant"
                        ? "bg-amber-50 text-amber-700 border-amber-200/50"
                        : "bg-rose-50 text-rose-700 border-rose-200/50"
                  }`}
                >
                  <span
                    className={`size-1.5 rounded-full ${
                      summary?.status === "active"
                        ? "bg-emerald-500"
                        : summary?.status === "dormant"
                          ? "bg-amber-500"
                          : "bg-rose-500"
                    }`}
                  />
                  {summary?.status || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-800 tracking-tight flex items-center gap-2">
                <span>Transaction History</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Audit ledger entries, principal movements, and processing fees.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-2 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10">
                <Search size={16} className="text-[#074073]" />
                <div className="w-[1px] h-4 bg-slate-200 ml-3" />
              </div>
              <input
                type="text"
                placeholder="Search by reference..."
                className="w-full pl-[58px] pr-4 h-12 bg-white border border-slate-200/80 rounded-2xl text-xs font-semibold text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all shadow-3xs"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                className="flex items-center gap-1.5 h-12 px-5 border border-slate-200 bg-white text-slate-700 rounded-2xl text-xs font-bold hover:bg-slate-50 transition-all shadow-3xs cursor-pointer active:scale-98"
              >
                <Filter size={14} className="text-[#074073]" />
                <span>Filter</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-1.5 h-12 px-5 border border-slate-200 bg-white text-slate-700 rounded-2xl text-xs font-bold hover:bg-slate-50 transition-all shadow-3xs cursor-pointer active:scale-98"
              >
                <Download size={14} className="text-[#074073]" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
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
                            {tx.transactionId}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
                            Channel:{" "}
                            {tx?.platform?.replace("_", " ") ?? "Mobile"}
                          </span>
                        </div>
                        <span className="font-semibold text-primary text-sm tracking-tight group-hover:text-primary transition-colors flex items-center gap-1.5">
                          {tx.status === "completed" ? (
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
                          {summary.memberName}
                        </span>
                      </div>
                    </td>

                    {/* Col 2: Product Parameter Mapping */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col space-y-1.5">
                        <span className="font-semibold capitalize text-slate-800 text-sm tracking-tight">
                          {tx.type}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-sans font-bold text-[9px] tracking-wider uppercase px-1.5 py-0.5 bg-slate-50 text-slate-500 rounded border border-slate-200/40 flex items-center gap-0.5">
                            {tx.deposit_method ?? "MPESA"}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Col 3: Financial Exposure Matrix */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col space-y-1">
                        <div className="text-[11px] text-slate-500 font-medium">
                          <span
                            className={`font-bold text-sm ${tx.status === "completed" ? "text-success" : "text-primary"}`}
                          >
                            {formatAmount(tx.amount).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium">
                          Running Bal:{" "}
                          <span className="font-mono font-bold text-slate-700">
                            {formatAmount(tx.balance).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex flex-col space-y-1">
                        <div className="text-[11px] text-slate-500 font-medium">
                          Fee:{" "}
                          <span className="font-semibold text-slate-700">
                            {formatAmount(
                              tx.transaction_charge || 0,
                            ).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
                          Net:&nbsp;
                          {formatAmount(
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
                          {new Date(tx.date).toLocaleDateString("en-KE", {
                            dateStyle: "medium",
                          })}
                        </span>
                      </div>
                    </td>

                    {/* Col 6: Actions Toolbar */}
                    <td className="py-4 px-6 text-right pr-8">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedTxContext(tx)}
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
                  <td
                    colSpan={6}
                    className="py-36 px-6 text-center select-none"
                  >
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
          <Pagination
            currentPage={filters?.page}
            totalItems={totalItems}
            itemsPerPage={filters?.limit}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleOnItemsPageChange}
          />
        </div>
      </div>

      {/* DETAILED TRANSACTION INSPECTOR SLIDE DRAWER MODAL */}
      {selectedTxContext && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-zinc-950/20 transition-opacity">
          {/* Backdrop Blur Mask */}

          <div
            className="absolute inset-0"
            onClick={() => setSelectedTxContext(null)}
          />

          {/* Drawer Container Panel Body */}
          <div className="fixed top-0 right-0 h-full w-full max-w-[480px] bg-white shadow-md p-8 py-5 overflow-y-auto flex flex-col justify-between animate-in slide-in-from-right duration-200 z-50">
            <div className="space-y-6">
              {/* HEADER SECTION */}
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 flex-wrap pt-1">
                    <h3 className="text-lg font-bold text-primary tracking-tight">
                      {selectedTxContext.ref_number}
                    </h3>

                    {selectedTxContext?.status && (
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
                          selectedTxContext.status.toLowerCase() === "completed"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                            : selectedTxContext.status.toLowerCase() ===
                                "pending"
                              ? "bg-amber-50 text-amber-700 border-amber-200/60"
                              : selectedTxContext.status.toLowerCase() ===
                                  "reversed"
                                ? "bg-slate-100 text-slate-700 border-slate-200"
                                : "bg-rose-50 text-rose-700 border-rose-200/60" // Failed
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${
                            selectedTxContext.status.toLowerCase() ===
                            "completed"
                              ? "bg-emerald-500"
                              : selectedTxContext.status.toLowerCase() ===
                                  "pending"
                                ? "bg-amber-500 animate-pulse"
                                : selectedTxContext.status.toLowerCase() ===
                                    "reversed"
                                  ? "bg-slate-500"
                                  : "bg-rose-500"
                          }`}
                        />
                        {selectedTxContext.status}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedTxContext(null)}
                  className="w-8 h-8 flex-shrink-0 rounded-full bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors flex items-center justify-center text-slate-500 cursor-pointer shadow-3xs"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="border-b border-slate-100" />

              {/* SECTION 1: TRANSACTION INFO */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Transaction Details
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-slate-50/60 border border-slate-200/40 p-3.5 rounded-xl space-y-1">
                    <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1">
                      Reference ID
                    </p>
                    <p
                      className="font-mono text-xs font-semibold text-slate-700 truncate"
                      title={selectedTxContext.id}
                    >
                      {selectedTxContext?.transactionId?.substring(0, 14)}
                    </p>
                  </div>

                  <div className="bg-slate-50/60 border border-slate-200/40 p-3.5 rounded-xl space-y-1">
                    <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1">
                      Transaction Amount
                    </p>
                    <p className="text-xl font-bold text-primary">
                      {formatAmount(selectedTxContext.amount)}
                    </p>
                  </div>

                  <div className="bg-slate-50/60 border border-slate-200/40 p-3.5 rounded-xl space-y-1">
                    <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1">
                      Linked Account ID
                    </p>
                    <p
                      className="font-mono text-xs font-semibold text-slate-700 truncate"
                      title={selectedTxContext.account_id}
                    >
                      {selectedTxContext?.transactionId?.substring(0, 14)}
                    </p>
                  </div>

                  <div className="bg-slate-50/60 border border-slate-200/40 p-3.5 rounded-xl space-y-1">
                    <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1">
                      Date Created
                    </p>
                    <p className="text-xs font-bold text-primary">
                      {new Date(selectedTxContext?.date)?.toLocaleTimeString(
                        "en-KE",
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 2: SENDER INFO */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-400">
                  <ArrowUpRight size={14} className="text-amber-600" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Sender Information
                  </span>
                </div>

                <div className="p-4 bg-amber-50/20 border border-amber-100/50 rounded-2xl space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-xs font-medium">
                    <div>
                      <p className="text-[9px] text-slate-400 uppercase tracking-wide">
                        Sender Name
                      </p>
                      <p className="text-primary font-bold mt-0.5 flex items-center gap-1">
                        <User size={12} className="text-slate-400" />
                        {summary.memberName}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-400 uppercase tracking-wide">
                        Source Account
                      </p>
                      <p className="text-slate-700 font-mono font-semibold mt-0.5">
                        {summary.accountNumber || "Direct Deposit Network"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3: RECEIVER INFO */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-400">
                  <ArrowDownLeft size={14} className="text-emerald-600" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Recipient Details
                  </span>
                </div>

                <div className="p-4 bg-emerald-50/20 border border-emerald-100/50 rounded-2xl space-y-3">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs font-medium">
                    <div>
                      <p className="text-[9px] text-slate-400 uppercase tracking-wide">
                        Recipient Name
                      </p>
                      <p className="text-primary font-bold mt-0.5 flex items-center gap-1">
                        <User size={12} className="text-slate-400" />
                        {summary.memberName}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-400 uppercase tracking-wide">
                        Recipient Account
                      </p>
                      <p className="text-slate-700 font-mono font-semibold mt-0.5">
                        {summary.accountNumber}
                      </p>
                    </div>
                    <div className="col-span-2 border-t border-slate-100/70 pt-2">
                      <p className="text-[9px] text-slate-400 uppercase tracking-wide">
                        Transaction Reference Code
                      </p>
                      <p
                        className="text-slate-600 font-mono text-[11px] font-semibold truncate bg-white border border-slate-200/60 p-2 rounded-lg mt-1 select-all"
                        title={selectedTxContext.receiver_reference}
                      >
                        {selectedTxContext.transactionId}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50/60 border border-slate-200/40 p-3.5 rounded-xl space-y-1">
                  <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1">
                    Notes
                  </p>
                  <p
                    className="font-mono text-xs font-semibold text-slate-700 truncate"
                    title={selectedTxContext.transactionId}
                  >
                    {selectedTxContext?.type}
                  </p>
                </div>
              </div>
            </div>
            <a
              href={selectedTxContext.document_url}
              target="_blank"
              rel="noreferrer"
              className="mt-6 flex items-center gap-2.5 w-full justify-center py-4 bg-[#074073] text-white rounded-2xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-900/10 hover:bg-[#052d52] transition-all cursor-pointer active:scale-98"
            >
              <FileText size={15} />
              <span>Download Receipt (PDF)</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default MemberAccount;
