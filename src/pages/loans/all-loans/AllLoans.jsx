import React, { useState } from "react";
import {
  ArrowUpRight,
  Eye,
  Layers,
  Search,
  CheckCircle2,
  AlertTriangle,
  Smartphone,
  Filter,
  Download,
  FileText,
} from "lucide-react";
import Pagination from "../../../components/pagination/Pagination";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getLoans } from "../../../sdk/loans/loans";
import { useToast } from "../../../contexts/ToastProvider";
import FilterLoans from "../../../components/filters/FilterLoans";
import { useFormatAmount } from "../../../hooks/useFormatAmount";

export default function AllLoans() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showFilters, setShowFilters] = useState(false);
  const formatAmount = useFormatAmount();

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    loan_code: "",
    status: "",
    fromDate: "",
    toDate: "",
    loan_type: "",
    loan_product_code: "",
  });
  const { showToast } = useToast();
  const [totalItems, setTotalItems] = useState(0);
  const [loanRecords, setLoanRecords] = useState([]);

  const { isFetching } = useQuery({
    queryKey: [
      "loans",
      filters?.page,
      filters?.limit,
      filters?.status,
      filters?.loan_code,
      filters?.loan_type,
      filters?.loan_product_code,
      filters?.fromDate,
      filters.toDate,
    ],
    queryFn: async () => {
      const response = await getLoans(
        filters?.page,
        filters?.limit,
        filters?.status,
        filters?.loan_code,
        filters?.loan_type,
        filters?.loan_product_code,
        filters?.fromDate,
        filters.toDate,
      );
      return response.data?.data;
    },
    onSuccess: (data) => {
      setLoanRecords(data?.loan_data);
      setFilters((prev) => ({
        ...prev,
        page: data?.page,
        limit: data?.limit,
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

  return (
    <>
      <FilterLoans
        isOpen={showFilters}
        setFilters={setFilters}
        filters={filters}
        onClose={() => setShowFilters(false)}
      />

      <div className="w-full space-y-5 font-sans antialiased text-slate-800">
        {/* 1. UPPER EXECUTIVE COMMAND BAR */}
        <div className="flex flex-col sm:gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200/60 pb-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Loans Registry
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Track active portfolio amortization lines, analyze repayment
              collection velocities, and process manual settlement recovery
              logs.
            </p>
          </div>
        </div>

        {/* 2. ANALYTICAL LEDGER EXPOSURE DECK */}
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
            {/* CARD 1: TOTAL DISBURSED CAPACITY */}
            <SummaryMetricCard
              title="Total Disbursed"
              value="KES 267,000.00"
              desc="Combined value of all issued loans"
              icon={<Layers size={18} />}
              color="text-primary bg-primary/5"
            />

            {/* CARD 2: OUTSTANDING LIABILITIES */}
            <SummaryMetricCard
              title="Outstanding Principal"
              value="KES 180,900.00"
              desc="Unpaid balance remaining across active accounts"
              icon={<AlertTriangle size={18} />}
              color="text-warning bg-warning/5"
            />

            {/* CARD 3: COLLECTED CAPITAL */}
            <SummaryMetricCard
              title="Recovered Capital"
              value="KES 86,600.00"
              desc="Total principal successfully collected to date"
              icon={<CheckCircle2 size={18} />}
              color="text-success bg-success/5"
            />
          </div>
        )}

        {/* 3. INTERACTIVE SEARCH & STATE FILTERS */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xs p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:w-72">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search accounts by code or debtor..."
              className="w-full h-10 pl-9 pr-4 bg-slate-50 border border-slate-200/60 rounded-xl text-xs font-medium outline-none transition-all focus:bg-white focus:border-secondary placeholder:text-slate-400 font-sans"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-1.5 h-10 px-4 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all"
            >
              <Filter size={13} /> Filter
            </button>
            <button className="flex items-center gap-1.5 h-10 px-4 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all">
              <Download size={13} /> Export
            </button>
          </div>
        </div>

        {/* 4. HIGH-DENSITY STANDALONE PORTFOLIO LEDGER (Guaranteed non-scroll on desktop) */}
        <div className="w-full bg-white rounded-3xl border border-slate-200/60 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans table-auto">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200/60 text-[10px] font-bold text-slate-400 uppercase tracking-widest select-none">
                  <th className="py-4.5 px-6">Loan Account & Debtor</th>
                  <th className="py-4.5 px-6">Product Framework</th>
                  <th className="py-4.5 px-6">Principal & Balances</th>
                  <th className="py-4.5 px-6">Recovery Progress</th>
                  <th className="py-4.5 px-6">Status</th>
                  <th className="py-4.5 px-6 text-right pr-8">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-xs tracking-tight">
                {isFetching ? (
                  Array(10)
                    .fill(0)
                    .map((_, index) => (
                      <tr
                        key={`loan-skeleton-${index}`}
                        className="animate-pulse border-b border-slate-100 last:border-none"
                      >
                        {/* Col 1: Account Reference & Debtor Profile Skeleton */}
                        <td className="py-4 px-6">
                          <div className="flex flex-col space-y-2">
                            <div className="flex items-center gap-2">
                              {/* Loan Code Badge */}
                              <div className="h-4 w-14 bg-slate-200 rounded-md" />
                              {/* Channel Route Info */}
                              <div className="h-3.5 w-20 bg-slate-100 rounded" />
                            </div>
                            {/* Member/Loan Account Name */}
                            <div className="h-4 w-40 bg-slate-200 rounded" />
                            {/* Mobile Identity Subline */}
                            <div className="h-3 w-24 bg-slate-100 rounded" />
                          </div>
                        </td>

                        {/* Col 2: Product & Interest Parameter Mapping Skeleton */}
                        <td className="py-4 px-6">
                          <div className="flex flex-col space-y-2">
                            {/* Linked Core Loan Product Name */}
                            <div className="h-4 w-32 bg-slate-200 rounded" />
                            <div className="flex items-center gap-1.5">
                              {/* Interest Rate Metric Tag */}
                              <div className="h-4 w-10 bg-slate-100 rounded border border-slate-200/40" />
                              {/* Amortization Calculation Protocol Name */}
                              <div className="h-3 w-24 bg-slate-100 rounded" />
                            </div>
                          </div>
                        </td>

                        {/* Col 3: Financial Exposure Matrix Skeleton */}
                        <td className="py-4 px-6">
                          <div className="flex flex-col space-y-2">
                            {/* Total Capital Issued Amount */}
                            <div className="h-3.5 w-28 bg-slate-200 rounded" />
                            {/* Outstanding Balance Arrears Exposure */}
                            <div className="h-3.5 w-32 bg-slate-200 rounded" />
                          </div>
                        </td>

                        {/* Col 4: Recovery Metrics & Mini Progress Tracker Skeleton */}
                        <td className="py-4 px-6">
                          <div className="flex flex-col space-y-2 max-w-[140px] w-full">
                            <div className="flex items-center justify-between">
                              {/* Aggregate Collections Received Label */}
                              <div className="h-3.5 w-20 bg-slate-100 rounded" />
                              {/* Progression Percentage Value */}
                              <div className="h-3.5 w-8 bg-slate-200 rounded" />
                            </div>
                            {/* Linear Payback Horizon Track Gauge */}
                            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                              <div className="h-full bg-slate-200 w-1/3 rounded-full" />
                            </div>
                          </div>
                        </td>

                        {/* Col 5: Amortization Lifespan Stage Skeleton */}
                        <td className="py-4 px-6">
                          <div className="flex flex-col space-y-2">
                            {/* Structural Status Pill Container */}
                            <div className="h-4.5 w-16 bg-slate-100 rounded-md border border-slate-200/40" />
                            {/* Maturity Due Date Frame Line */}
                            <div className="h-3.5 w-24 bg-slate-100 rounded" />
                          </div>
                        </td>

                        {/* Col 6: Actions Toolbar Skeleton */}
                        <td className="py-4 px-6 text-right pr-8 align-middle">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* View Transaction History File Utilities */}
                            <div className="size-8 rounded-xl bg-slate-100 border border-slate-200/30 shrink-0" />
                            {/* Record Quick Cash Receipts Vector Box */}
                            <div className="size-8 rounded-xl bg-slate-100 border border-slate-200/30 shrink-0" />
                          </div>
                        </td>
                      </tr>
                    ))
                ) : loanRecords?.length > 0 ? (
                  loanRecords?.map((loan) => (
                    <tr
                      key={loan.id}
                      className="group transition-colors hover:bg-slate-50/60"
                    >
                      {/* Col 1: Account Reference & Debtor Profile */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="font-sans font-bold text-[9px] tracking-wider uppercase px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                              {loan.loan_code}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
                              Channel: {loan.loan_channel}
                            </span>
                          </div>
                          <span className="font-semibold text-slate-900 text-sm tracking-tight group-hover:text-primary transition-colors">
                            {loan.loan_name}
                          </span>
                          <span className="text-[11px] text-slate-400 font-normal flex items-center gap-1">
                            <Smartphone size={11} /> {loan.loan_mobile}
                          </span>
                        </div>
                      </td>

                      {/* Col 2: Product & Interest Parameter Mapping */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col space-y-1.5">
                          <span className="font-semibold text-slate-800 text-sm tracking-tight">
                            {loan?.loan_product?.product_name ??
                              "Development Loan"}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="font-sans font-bold text-[9px] tracking-wider uppercase px-1.5 py-0.5 bg-slate-50 text-slate-400 rounded border border-slate-200/40 flex items-center gap-0.5">
                              {parseFloat(loan?.loan_interest_per)?.toFixed(1)}%
                            </span>
                            <span className="text-[11px] text-slate-400 font-medium capitalize">
                              {loan?.loan_product?.interest_method?.replace(
                                "_",
                                " ",
                              ) ?? "Reducing Balance"}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Col 3: Financial Exposure Matrix (Principal vs Outstanding) */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col space-y-1">
                          <div className="text-[11px] text-slate-500 font-medium">
                            Issued:{" "}
                            <span className="font-semibold text-slate-900">
                              {formatAmount(loan.loan_amount)}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 font-medium">
                            Oustanding:{" "}
                            <span className="font-bold text-error">
                              {formatAmount(loan.loan_Balance)}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Col 4: Recovery Metrics & Mini Progress Tracker */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col space-y-1.5 max-w-[140px]">
                          <div className="flex items-center justify-between text-[11px] font-medium text-slate-500">
                            <span>
                              Paid:{" "}
                              <span className="font-semibold text-slate-800">
                                {formatAmount(loan.loan_total_payments)}
                              </span>
                            </span>
                            <span className="font-bold text-slate-900 pl-2">
                              {Number(loan.repayment_progress_percent).toFixed(
                                0,
                              )}
                              %
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-full transition-all duration-300 ${
                                loan.repayment_progress_percent === 100
                                  ? "bg-success"
                                  : "bg-primary"
                              }`}
                              style={{
                                width: `${loan.repayment_progress_percent}%`,
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Col 5: Amortization Lifespan Stage */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col space-y-1">
                          <span
                            className={`inline-flex items-center gap-1.5 text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md border w-fit ${
                              loan.loan_status === "Active"
                                ? "bg-primary/5 border-primary/10 text-primary"
                                : "bg-success/5 border-success/10 text-success"
                            }`}
                          >
                            <span
                              className={`size-1 rounded-full ${loan.loan_status === "Active" ? "bg-primary" : "bg-success"}`}
                            />
                            {loan.loan_status}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium pt-0.5">
                            Due:{" "}
                            {new Date(loan.loan_due_date).toLocaleDateString(
                              "en-KE",
                              { dateStyle: "medium" },
                            )}
                          </span>
                        </div>
                      </td>

                      {/* Col 6: Actions Toolbar */}
                      <td className="py-4 px-6 text-right pr-8">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() =>
                              navigate(`/admin/all-loans/${loan?.id}`)
                            }
                            className="size-8 rounded-xl border border-slate-200/60 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-slate-50 hover:border-slate-300 transition-all shadow-3xs bg-white cursor-pointer"
                            title="Open Amortization File"
                          >
                            <Eye size={14} />
                          </button>
                          {loan.loan_status === "Active" && (
                            <button
                              className="size-8 rounded-xl border border-slate-200/60 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-3xs bg-white cursor-pointer"
                              title="Log Repayment Transaction"
                            >
                              <ArrowUpRight size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 px-6">
                      <div className="w-full bg-white rounded-[28px] p-20 text-center">
                        <div className="size-12 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 mx-auto mb-4">
                          <FileText size={22} />
                        </div>
                        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                          No loans cataloged
                        </h3>
                        <p className="text-xs text-slate-400 font-medium max-w-xs mx-auto mt-2 leading-relaxed">
                          There are no active or legacy records matching under
                          the current filter views.
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

/* ==========================================================================
   SUPPORTIVE CHILD UTILITIES (FIXED PACK)
   ========================================================================== */

const SummaryMetricCard = ({ title, value, desc, icon, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-xs flex items-start justify-between">
    <div className="space-y-1.5">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        {title}
      </p>
      <h3 className="text-xl font-bold text-slate-800 tracking-tight">
        {value}
      </h3>
      <p className="text-[11px] text-slate-400 font-medium leading-normal">
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

const TabToggle = ({ active, onClick, label }) => (
  <button
    onClick={onClick}
    className={`px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center h-full cursor-pointer ${
      active
        ? "bg-white text-primary shadow-3xs"
        : "text-slate-400 hover:text-slate-600"
    }`}
  >
    <span>{label}</span>
  </button>
);
