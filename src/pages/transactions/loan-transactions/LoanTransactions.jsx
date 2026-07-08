import React, { useState } from "react";
import {
  ArrowUpRight,
  Search,
  Download,
  AlertCircle,
  CheckCircle2,
  Receipt,
  SlidersHorizontal,
  Layers,
  AlertTriangle,
} from "lucide-react";
import { useFormatAmount } from "../../../hooks/useFormatAmount";
import { useQuery } from "react-query";
import { useToast } from "../../../contexts/ToastProvider";
import { getLoanTransactions } from "../../../sdk/loan-transactions/loan-transactions";
import LoanTransactionsFilter from "../../../components/filters/LoanTransactionsFilter";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../components/pagination/Pagination";

export default function LoanTransactions() {
  const [searchQuery, setSearchQuery] = useState("");
  const formatAmount = useFormatAmount();
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    q: "",
    status: "",
    fromDate: "",
    toDate: "",
    leastAmount: "",
    mostAmount: "",
    type: "",
  });
  const { showToast } = useToast();
  const [totalItems, setTotalItems] = useState(0);
  const [loanTransactions, setLoanTransactions] = useState([]);

  const getTxType = (tx) => {
    if (parseFloat(tx.penalty_paid) > 0) return "Penalty";
    if (parseFloat(tx.principal_paid) > 0 || parseFloat(tx.interest_paid) > 0)
      return "Loan Repayment";
    return "Payment";
  };

  const { isFetching } = useQuery({
    queryKey: [
      "loan transactions",
      filters?.page,
      filters?.limit,
      filters?.q,
      filters?.status,
      filters?.type,
      filters?.leastAmount,
      filters?.mostAmount,
      filters?.fromDate,
      filters?.toDate,
    ],
    queryFn: async () => {
      const response = await getLoanTransactions(
        filters?.page,
        filters?.limit,
        filters?.q,
        filters?.status,
        filters?.type,
        filters?.leastAmount,
        filters?.mostAmount,
        filters?.fromDate,
        filters?.toDate,
      );
      return response?.data?.data;
    },
    onSuccess: (data) => {
      setLoanTransactions(data?.transactions);
      setFilters((prev) => ({
        ...prev,
        page: data.page,
        limit: data.limit,
      }));
      setTotalItems(data.total);
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

  const metrics = {
    // Total value of all posted transactions combined
    postedVolume: "4,820,500",

    // Total number of payments currently clearing or processing
    pendingCount: 14,

    // Total number of entries that have been reversed or rolled back
    reversedCount: 3,

    // Extra metrics you can use for internal calculations if needed
    totalTransactionsProcessed: 342,
    todayCollections: "185,000",
  };

  return (
    <>
      <LoanTransactionsFilter
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        setFilters={setFilters}
      />

      <div className="w-full space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/60 pb-6 select-none">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-primary">
              Loan Transactions
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Real-time tracking of disbursements, principal-interest allocation
              splits, automated penalties, and multi-channel payment
              reconciliations.
            </p>
          </div>
        </div>

        {isFetching ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <div
                  key={`metric-skeleton-${index}`}
                  className="bg-white rounded-2xl border border-slate-200/60 shadow-xs p-6 animate-pulse flex items-start justify-between gap-4"
                >
                  <div className="space-y-3 flex-1">
                    {/* Card Title Line */}
                    <div className="h-3 w-28 bg-slate-200 rounded" />

                    {/* Big Metric Value Line */}
                    <div className="h-7 w-24 bg-slate-200 rounded-lg" />

                    {/* Description Subtext Line */}
                    <div className="h-3 w-44 bg-slate-100 rounded" />
                  </div>

                  {/* Icon Shell Box Placeholder */}
                  <div className="size-9 rounded-xl bg-slate-100 border border-slate-200/20 shrink-0" />
                </div>
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SummaryMetricCard
              title="Successful Payments"
              value={`KES ${metrics.postedVolume}`}
              desc="Money safely received and updated in member accounts"
              icon={<CheckCircle2 size={18} />}
              color="text-success bg-success/5"
            />
            <SummaryMetricCard
              title="On the Way"
              value={`${metrics.pendingCount} Processing`}
              desc="Payments currently making their way through M-Pesa or bank systems"
              icon={<Layers size={18} />}
              color="text-primary bg-primary/5"
            />
            <SummaryMetricCard
              title="Returned or Fixed"
              value={`${metrics.reversedCount} Reversed`}
              desc="Bounced transactions or minor corrections kept safely for our records"
              icon={<AlertTriangle size={18} />}
              color="text-warning bg-warning/5"
            />
          </div>
        )}
        {/* 2. TOOLBAR */}
        <div className="w-full flex justify-between items-center bg-white p-3 rounded-2xl border border-slate-200/60 shadow-sm">
          {/* Left Controls: Search & Advanced Filters Group */}
          <div className="w-full flex items-center gap-2">
            <div className="relative w-[50%]">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                className="w-full h-9 pl-9 pr-4 bg-slate-50 rounded-xl text-xs border border-transparent focus:border-primary outline-none"
                placeholder="Search by ref..."
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* NEW: Advanced Filter Toggle Button */}
          </div>

          {/* Right Controls: Context Actions */}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowFilters(true)} // Connect to your drawer display state variable
              className="flex items-center gap-2 h-9 px-3.5 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold transition-all shadow-3xs cursor-pointer active:scale-98"
            >
              <SlidersHorizontal size={13} />
              <span>Filters</span>
            </button>
            <button
              type="button"
              className="w-fit whitespace-nowrap flex items-center gap-2 h-9 px-4 bg-primary text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer active:scale-98"
            >
              <Download size={14} /> Export
            </button>
          </div>
        </div>

        {/* 3. DETAILED LEDGER TABLE */}
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse table-auto">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200/60 text-[10px] font-bold text-slate-400 uppercase tracking-widest select-none">
                  <th className="py-4.5 px-6">Transaction Ref & Date</th>
                  <th className="py-4.5 px-6">Mode & Type</th>
                  <th className="py-4.5 px-6">Loan Allocation</th>
                  <th className="py-4.5 px-6 text-right">Total Paid</th>
                  <th className="py-4.5 px-6 text-center">Status</th>
                  <th className="py-4.5 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {isFetching ? (
                  Array(10)
                    .fill(0)
                    .map((_, index) => (
                      <tr
                        key={`tx-skeleton-${index}`}
                        className="animate-pulse border-b border-slate-100 last:border-none"
                      >
                        {/* Column 1: Transaction Reference and Date Skeleton */}
                        <td className="py-5 px-6">
                          <div className="flex flex-col gap-1.5">
                            {/* Reference Hash Placeholder */}
                            <div className="h-4 w-24 bg-slate-200 rounded" />
                            {/* Calendar Date Line */}
                            <div className="h-3 w-16 bg-slate-100 rounded" />
                          </div>
                        </td>

                        {/* Column 2: Payment Channel and Type Skeleton */}
                        <td className="py-5 px-6">
                          <div className="flex flex-col gap-1.5">
                            {/* Channel Badge Mock */}
                            <div className="h-4 w-14 bg-slate-200 rounded-md" />
                            {/* Transaction Type Label */}
                            <div className="h-3 w-16 bg-slate-100 rounded" />
                          </div>
                        </td>

                        {/* Column 3: Target Loan Account Mapping Context Skeleton */}
                        <td className="py-5 px-6">
                          <div className="flex gap-8">
                            {/* Loan Code Column Segment */}
                            <div className="flex flex-col gap-1">
                              <div className="h-2.5 w-12 bg-slate-100 rounded" />
                              <div className="h-4 w-14 bg-slate-200 rounded" />
                            </div>
                            {/* Product Family Column Segment */}
                            <div className="flex flex-col gap-1">
                              <div className="h-2.5 w-16 bg-slate-100 rounded" />
                              <div className="h-4 w-24 bg-slate-200 rounded" />
                            </div>
                          </div>
                        </td>

                        {/* Column 4: Sum Value Paid Skeleton */}
                        <td className="py-5 px-6 text-right">
                          {/* Total Amount Value Box */}
                          <div className="h-4 w-20 bg-slate-200 rounded ml-auto" />
                        </td>

                        {/* Column 5: Structural Processing State Status Skeleton */}
                        <td className="py-5 px-6 text-center">
                          {/* Rounded Pill Status Tag Shell */}
                          <div className="h-6 w-16 bg-slate-100 rounded-full mx-auto" />
                        </td>

                        {/* Column 6: Deep-Link Action Redirect Skeleton */}
                        <td className="py-5 px-6 text-center align-middle">
                          {/* Action Button Circular Box Icon Shell */}
                          <div className="size-6 bg-slate-50 border border-slate-200/30 rounded-lg mx-auto" />
                        </td>
                      </tr>
                    ))
                ) : loanTransactions?.length > 0 ? (
                  loanTransactions?.map((tx) => (
                    <tr
                      key={tx.id}
                      className="group hover:bg-slate-50/60 transition-colors"
                    >
                      <td className="py-5 px-6">
                        <div className="flex flex-col">
                          <span className="font-bold text-primary">
                            {tx.reference || "—"}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {tx.transaction_date
                              ? new Date(
                                  tx.transaction_date,
                                ).toLocaleDateString("en-KE", {
                                  dateStyle: "medium",
                                })
                              : "—"}
                          </span>
                        </div>
                      </td>

                      {/* Column 2: Payment Channel and Type */}
                      <td className="py-5 px-6">
                        <div className="flex flex-col gap-1">
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[9px] font-bold uppercase tracking-wide w-fit">
                            {tx.channel || "Manual"}
                          </span>
                          <span className="text-[9px] font-medium text-slate-500 uppercase tracking-wide">
                            {tx.transaction_type?.replace(/_/g, " ") ||
                              "Repayment"}
                          </span>
                        </div>
                      </td>

                      {/* Column 3: Target Loan Account Mapping Context */}
                      <td className="py-5 px-6">
                        <div className="flex gap-8">
                          <div className="flex flex-col">
                            <span className="text-[9px] text-slate-400 uppercase tracking-wider">
                              Loan Code
                            </span>
                            <span className="font-mono font-bold text-slate-700 mt-0.5">
                              {tx.loan_code || "—"}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[9px] text-slate-400 uppercase tracking-wider">
                              Product Family
                            </span>
                            <span className="font-semibold text-slate-600 capitalize mt-0.5">
                              {tx.loan_type?.replace(/_/g, " ") || "—"}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Column 4: Sum Value Paid */}
                      <td className="py-5 px-6 text-right font-bold text-primary">
                        {formatAmount
                          ? formatAmount(tx.amount)
                          : `KES ${Number(tx.amount || 0).toLocaleString()}`}
                      </td>

                      {/* Column 5: Structural Processing State Status */}
                      <td className="py-5 px-6 text-center">
                        <span
                          className={`inline-flex items-center gap-1.5 text-[9px] font-bold uppercase px-2.5 py-1 rounded-full ${
                            tx.status?.toLowerCase() === "posted" ||
                            tx.status?.toLowerCase() === "success"
                              ? "bg-emerald-50 text-emerald-600"
                              : tx.status?.toLowerCase() === "reversed"
                                ? "bg-rose-50 text-rose-600"
                                : "bg-amber-50 text-amber-600"
                          }`}
                        >
                          {tx.status?.toLowerCase() === "reversed" ? (
                            <AlertCircle size={10} />
                          ) : (
                            <CheckCircle2 size={10} />
                          )}
                          {tx.status || "Pending"}
                        </span>
                      </td>

                      {/* Column 6: Deep-Link Action Redirect */}
                      <td className="py-5 px-6 text-center">
                        <button
                          type="button"
                          onClick={() =>
                            navigate?.(`/admin/transactions/${tx.id}`)
                          }
                          className="text-slate-400 hover:text-[#074073] transition-colors cursor-pointer"
                        >
                          <ArrowUpRight size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 px-6">
                      <div className="w-full bg-white rounded-[24px] p-16 text-center select-none">
                        {/* Icon Wrapper */}
                        <div className="size-12 bg-slate-50 border border-slate-200/60 rounded-2xl flex items-center justify-center text-slate-400 mx-auto mb-4 shadow-3xs">
                          <Receipt size={22} className="opacity-80" />
                        </div>

                        {/* Primary Message */}
                        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                          No Transactions Found
                        </h3>

                        {/* Conversational Description */}
                        <p className="text-xs text-slate-400 font-medium max-w-xs mx-auto mt-2 leading-relaxed">
                          There are no repayment records or deposit receipts
                          logged under the current search parameters.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={filters?.page}
            totalItems={totalItems}
            itemsPerPage={filters?.limit}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleOnItemsPageChange}
          />
        </div>
      </div>
    </>
  );
}

const SummaryMetricCard = ({ title, value, desc, icon, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-xs flex items-start justify-between">
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        {title}
      </p>
      <h3 className="text-xl font-bold text-slate-800 tracking-tight pt-1">
        {value}
      </h3>
      <p className="text-[11px] text-slate-400 font-medium leading-normal pt-1">
        {desc}
      </p>
    </div>
    <div
      className={`size-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}
    >
      {icon}
    </div>
  </div>
);
