import React, { useState } from "react";
import {
  FileText,
  Layers,
  Eye,
  AlertTriangle,
  CheckCircle2,
  Search,
  Smartphone,
  Check,
  X,
  Filter,
  Download,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../contexts/ToastProvider";
import { useQuery } from "react-query";
import { getLoanApplications } from "../../sdk/loan-applications/loan-applications";
import Pagination from "../../components/pagination/Pagination";
import FilterApplications from "../../components/filters/ApplicationFilter";
import { useFormatAmount } from "../../hooks/useFormatAmount";

export default function LoanApplications() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showFilters, setShowFilters] = useState(false);
  const formatAmount = useFormatAmount();
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    application_number: "",
    status: "",
    fromDate: "",
    toDate: "",
    loan_type: "",
    loan_product_code: "",
  });
  const { showToast } = useToast();
  const [totalItems, setTotalItems] = useState(0);
  const [loanApplications, setLoanApplications] = useState([]);

  const metrics = {
    total: loanApplications.length,
    pending: loanApplications.filter(
      (a) => a.status === "pending_credit_committee",
    ).length,
    volume: "1,305,000.00",
  };

  const { isFetching } = useQuery({
    queryKey: [
      "loan-applications",
      filters?.page,
      filters?.limit,
      filters?.status,
      filters?.application_number,
      filters?.loan_type,
      filters?.loan_product_code,
      filters?.fromDate,
      filters?.toDate,
    ],
    queryFn: async () => {
      const response = await getLoanApplications(
        filters?.page,
        filters?.limit,
        filters?.status,
        filters?.application_number,
        filters?.loan_type,
        filters?.loan_product_code,
        filters?.fromDate,
        filters?.toDate,
      );
      return response.data?.data;
    },
    onSuccess: (data) => {
      setLoanApplications(data?.applications);
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
      <FilterApplications
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        setFilters={setFilters}
      />

      <div className="w-full space-y-6 antialiased text-slate-800">
        {/* 1. UPPER EXECUTIVE COMMAND BAR */}
        <div className="flex flex-col sm:gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200/60 pb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-primary">
              Loan Applications
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Audit pipeline risk validation, monitor algorithmic credit limits,
              and process board committee vetting updates.
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/apply-loan/products")}
            className="flex items-center justify-center gap-2 h-11 px-5 w-fit bg-slate-900 text-white rounded-xl text-xs font-bold shadow-sm hover:bg-slate-800 transition-all cursor-pointer"
          >
            <Plus size={15} />
            <span>Add Loan Application</span>
          </button>
        </div>

        {/* 2. CORE FINANCIAL METRIC deck */}
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
              title="Applications in Progress"
              value={`${metrics.total} Active Requests`}
              desc="Total loans currently moving through the verification system"
              icon={<Layers size={18} />}
              color="text-primary bg-primary/5"
            />
            <SummaryMetricCard
              title="Awaiting Committee Vote"
              value={`${metrics.pending} Pending Review`}
              desc="High-value loans waiting for a formal board decision"
              icon={<AlertTriangle size={18} />}
              color="text-warning bg-warning/5"
            />
            <SummaryMetricCard
              title="Total Value in Pipeline"
              value={`KES ${metrics.volume}`}
              desc="The combined cash amount of all ongoing loan requests"
              icon={<CheckCircle2 size={18} />}
              color="text-success bg-success/5"
            />
          </div>
        )}

        {/* 3. INTERACTIVE CONTROL STRIP */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xs p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Dynamic Context Search Bar */}
          <div className="relative w-full md:w-72">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by app number or applicant name..."
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

        {/* 4. HIGH-DENSITY Tabular UNDERWRITING LEDGER */}

        <div className="w-full bg-white rounded-3xl border border-slate-200/60 shadow-xs overflow-hidden">
          <table className="w-full text-left border-collapse font-sans table-auto">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200/60 text-[10px] font-bold text-slate-400 uppercase tracking-widest select-none">
                <th className="py-4.5 px-6">Application & Member</th>
                <th className="py-4.5 px-6">Lending Product</th>
                <th className="py-4.5 px-6">Amount & Period</th>
                <th className="py-4.5 px-6">Interest Rate Parameters</th>
                <th className="py-4.5 px-6">Current Application Stage</th>
                <th className="py-4.5 px-6 text-right pr-8">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-xs tracking-tight">
              {isFetching ? (
                Array(10)
                  .fill(0)
                  .map((_, index) => (
                    <tr
                      key={`app-skeleton-${index}`}
                      className="animate-pulse border-b border-slate-100 last:border-none"
                    >
                      {/* Col 1: Identity Profile Skeleton */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center gap-2">
                            {/* Application Number Badge */}
                            <div className="h-4 w-16 bg-slate-200 rounded-md" />
                            {/* Loan Code Subtext */}
                            <div className="h-3.5 w-14 bg-slate-100 rounded" />
                          </div>
                          {/* Applicant Name */}
                          <div className="h-4 w-36 bg-slate-200 rounded" />
                          {/* Mobile Number Row */}
                          <div className="h-3 w-24 bg-slate-100 rounded" />
                        </div>
                      </td>

                      {/* Col 2: Target Framework Product Skeleton */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col space-y-2">
                          {/* Product Name */}
                          <div className="h-4 w-32 bg-slate-200 rounded" />
                          {/* Product Code Badge */}
                          <div className="h-4 w-12 bg-slate-100 rounded" />
                        </div>
                      </td>

                      {/* Col 3: Capital Request Metrics Skeleton */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col space-y-2">
                          {/* Applied Amount */}
                          <div className="h-4 w-24 bg-slate-200 rounded" />
                          {/* Tenor and Channel Row */}
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-16 bg-slate-100 rounded" />
                            <div className="size-1 bg-slate-200 rounded-full" />
                            <div className="h-4 w-10 bg-slate-100 rounded-md" />
                          </div>
                        </div>
                      </td>

                      {/* Col 4: Interest Rate Parameters Skeleton */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col space-y-2">
                          {/* Interest Rate Percentage */}
                          <div className="h-4 w-12 bg-slate-200 rounded" />
                          {/* Interest Amortization Method */}
                          <div className="h-3 w-20 bg-slate-100 rounded" />
                        </div>
                      </td>

                      {/* Col 5: Current Stage & Status Label Skeleton */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col space-y-2">
                          {/* Current Stage Text */}
                          <div className="h-4 w-28 bg-slate-200 rounded" />
                          {/* Status Label Pill */}
                          <div className="h-5 w-16 bg-slate-100 rounded-md" />
                        </div>
                      </td>

                      {/* Col 6: Operational Admin Controls Skeleton */}
                      <td className="py-4 px-6 text-right pr-8 align-middle">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View Details Action Button */}
                          <div className="size-8 rounded-xl bg-slate-100 border border-slate-200/30 shrink-0" />
                          {/* Disapprove Veto Action Button */}
                          <div className="size-8 rounded-xl bg-slate-100 border border-slate-200/30 shrink-0" />
                        </div>
                      </td>
                    </tr>
                  ))
              ) : loanApplications?.length > 0 ? (
                loanApplications?.map((app) => (
                  <tr
                    key={app.id}
                    className="group transition-colors hover:bg-slate-50/60"
                  >
                    {/* Col 1: Identity Profile */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-sans font-bold text-[9px] tracking-wider uppercase px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                            {app.application_number}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                            Code: {app.loan_code}
                          </span>
                        </div>
                        <span className="font-semibold text-slate-900 text-sm tracking-tight group-hover:text-primary transition-colors">
                          {app.applicant_name}
                        </span>
                        <span className="text-[11px] text-slate-400 font-normal flex items-center gap-1">
                          <Smartphone size={11} /> {app.applicant_mobile}
                        </span>
                      </div>
                    </td>

                    {/* Col 2: Target Framework Product */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col space-y-1.5">
                        <span className="font-semibold text-slate-800 text-sm tracking-tight">
                          {app.product.product_name}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-sans font-bold text-[9px] tracking-wider uppercase px-1.5 py-0.5 bg-slate-50 text-slate-400 rounded border border-slate-200/40">
                            {app.product.product_code}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Col 3: Capital Request Metrics */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col space-y-1.5">
                        <span className="font-semibold text-slate-900 text-sm tracking-tight">
                          {formatAmount(app.applied_amount)}
                        </span>
                        <div className="text-[11px] text-slate-400 font-medium flex items-center gap-2">
                          <span>
                            Tenor:{" "}
                            <span className="text-slate-700 font-semibold">
                              {app.loan_period} Months
                            </span>
                          </span>
                          <span className="size-1 bg-slate-200 rounded-full" />
                          <span className="text-primary font-bold text-[9px] bg-primary/5 px-1.5 py-0.5 rounded uppercase">
                            {app.loan_channel}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* NEW Col 4: Interest Rate Parameters */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col space-y-1">
                        <span className="font-semibold text-slate-900 text-sm tracking-tight">
                          {parseFloat(
                            app?.product?.interest_rate ?? 2.0,
                          )?.toFixed(1)}
                          %{" "}
                          <span className="text-[10px] text-slate-400 font-normal">
                            p.m.
                          </span>
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium capitalize">
                          {app?.product?.interest_method?.replace("_", " ") ??
                            "Reducing Balance"}
                        </span>
                      </div>
                    </td>

                    {/* NEW Col 5: Current Stage & Status Label */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col space-y-1.5">
                        <span className="font-semibold text-slate-800 text-sm tracking-tight">
                          {app.current_stage_label}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md border w-fit ${
                            app.status_label?.toLowerCase() === "approved"
                              ? "bg-success/5 border-success/10 text-success"
                              : "bg-warning/5 border-warning/10 text-warning"
                          }`}
                        >
                          {app.status_label}
                        </span>
                      </div>
                    </td>

                    {/* Col 6: Operational Admin Controls */}
                    <td className="py-4 px-6 text-right pr-8">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() =>
                            navigate(`/admin/loan-applications/${app?.id}`)
                          }
                          className="size-8 rounded-xl border border-slate-200/60 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-slate-50 hover:border-slate-300 transition-all shadow-2xs bg-white cursor-pointer"
                          title="View Application Audit File"
                        >
                          <Eye size={14} />
                        </button>
                        {app.status !== "approved" && (
                          <>
                            <button
                              className="size-8 rounded-xl border border-rose-100 flex items-center justify-center text-error hover:bg-rose-50 hover:border-rose-200 transition-all shadow-2xs bg-white cursor-pointer"
                              title="Log Disapproval Veto"
                            >
                              <X size={14} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <td colSpan={6} className="py-8 px-6">
                  <div className="bg-white border border-dashed border-slate-300 rounded-[28px] p-16 text-center max-w-xl mx-auto mt-6">
                    <div className="size-12 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 mx-auto mb-4">
                      <FileText size={22} />
                    </div>
                    <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                      No applications cataloged
                    </h3>
                    <p className="text-xs text-slate-400 font-medium max-w-xs mx-auto mt-2 leading-relaxed">
                      There are no active or legacy records matching "
                      {searchQuery}" under the current filter views.
                    </p>
                  </div>
                </td>
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
    </>
  );
}

/* ==========================================================================
   SUPPORTIVE CHILD UTILITIES
   ========================================================================== */

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

const TabToggle = ({ active, onClick, label }) => (
  <button
    onClick={onClick}
    className={`px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
      active
        ? "bg-white text-primary shadow-2xs"
        : "text-slate-400 hover:text-slate-600"
    }`}
  >
    <span>{label}</span>
  </button>
);
