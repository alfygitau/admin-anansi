import React, { useState } from "react";
import {
  Plus,
  Layers,
  Power,
  Edit2,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getLoanProducts } from "../../../sdk/loan-products/loan-products";
import { useToast } from "../../../contexts/ToastProvider";

export default function LoanProducts() {
  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [loanProducts, setLoanProducts] = useState([]);

  const { isFetching } = useQuery({
    queryKey: ["loan-products"],
    queryFn: async () => {
      const response = await getLoanProducts();
      return response.data.data;
    },
    onSuccess: (data) => {
      setLoanProducts(data);
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

  const stats = {
    total: loanProducts?.length,
    active: loanProducts?.filter((p) => p.status === "active")?.length,
    inactive: loanProducts?.filter((p) => p.status === "inactive")?.length,
  };

  const formatSentenceCase = (str) => {
    if (!str) return "";
    const withSpaces = str.replace(/_/g, " ");
    return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
  };

  return (
    <div className="space-y-6 antialiased">
      {/* 1. UPPER EXECUTIVE COMMAND BAR */}
      <div className="flex flex-col sm:gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200/60 pb-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-primary">
            Loan Products
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Configure lending tiers, algorithmic multipliers, interest
            calculations, and product visibility gates.
          </p>
        </div>

        {/* Core Primary Action Trigger */}
        <button
          onClick={() => navigate("/admin/add-loan-product")}
          className="h-11 px-4 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/10 hover:bg-primary/90 transition-all active:scale-95 shrink-0"
        >
          <Plus size={16} />
          <span>Create New Product</span>
        </button>
      </div>

      {/* 2. ANALYTICAL HIGH-LEVEL SUMMARY METRIC ROWS */}
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
            title="Total Loan Products"
            value={`${stats.total} Products`}
            desc="Every loan product ever created in the system"
            icon={<Layers size={18} />}
            color="text-primary bg-primary/5"
          />
          <SummaryMetricCard
            title="Available to Members"
            value={`${stats.active} Active`}
            desc="Loans that members can see and apply for right now"
            icon={<CheckCircle2 size={18} />}
            color="text-success bg-success/5"
          />
          <SummaryMetricCard
            title="Hidden or Paused Loans"
            value={`${stats.inactive} Inactive`}
            desc="Turned off and closed to new applications"
            icon={<AlertTriangle size={18} />}
            color="text-warning bg-warning/5"
          />
        </div>
      )}

      {/* 3. INTERACTIVE SEARCH FILTER & ACCORDION CONTROL PANE */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Local Scope Product Filter Search Input */}
        <div className="relative w-full md:w-72">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter products by code or name..."
            className="w-full h-10 pl-9 pr-4 bg-slate-50 border border-slate-200/60 rounded-xl text-xs font-medium outline-none transition-all focus:bg-white focus:border-primary placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* 4. PRODUCT MATRIX DENSE TABULAR CANVAS */}

      <div className="w-full bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            {/* Table Header Structure */}
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200/60 text-[10px] font-bold text-slate-400 uppercase tracking-widest select-none">
                <th className="py-4.5 px-6">Product Code & Name</th>
                <th className="py-4.5 px-6">Interest Configuration</th>
                <th className="py-4.5 px-6">Tenor & Multiplier</th>
                <th className="py-4.5 px-6">Amounts Requirements</th>
                <th className="py-4.5 px-6">Underwriting Rules</th>
                <th className="py-4.5 px-6">Status</th>
                <th className="py-4.5 px-6 text-right pr-8">Actions</th>
              </tr>
            </thead>

            {/* Table Body Content Matrix */}
            <tbody className="divide-y divide-slate-100 text-xs">
              {isFetching ? (
                Array(10)
                  .fill(0)
                  .map((_, index) => (
                    <tr
                      key={`product-skeleton-${index}`}
                      className="animate-pulse border-b border-slate-100 last:border-none"
                    >
                      {/* Column 1: Core Identification Assets Skeleton */}
                      <td className="py-4 px-6 max-w-xs">
                        <div className="flex flex-col gap-1.5">
                          {/* Product Code Tag Placeholder */}
                          <div className="h-4 w-14 bg-slate-200 rounded-md" />
                          {/* Product Name Title Line */}
                          <div className="h-4 w-40 bg-slate-200 rounded" />
                        </div>
                      </td>

                      {/* Column 2: Interest Parameter Models Skeleton */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col gap-1.5">
                          {/* Interest Rate Line */}
                          <div className="h-4 w-12 bg-slate-200 rounded" />
                          {/* Interest Method Subtext */}
                          <div className="h-3 w-24 bg-slate-100 rounded" />
                        </div>
                      </td>

                      {/* Column 3: Amortization Framing Tiers Skeleton */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col gap-1.5">
                          {/* Min Period Line */}
                          <div className="h-4 w-16 bg-slate-200 rounded" />
                          {/* Max Period Line */}
                          <div className="h-3 w-16 bg-slate-100 rounded" />
                        </div>
                      </td>

                      {/* Column 4: Dynamic Capital Range Limits Skeleton */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col gap-1.5">
                          {/* Max Capital Floor Line */}
                          <div className="h-4 w-28 bg-slate-200 rounded" />
                          {/* Min Capital Ceiling Line */}
                          <div className="h-3 w-20 bg-slate-100 rounded" />
                        </div>
                      </td>

                      {/* Column 5: Legal Risk Contingencies Skeleton */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col gap-1.5">
                          {/* Guarantor Count Requirement Line */}
                          <div className="h-4 w-24 bg-slate-200 rounded" />
                          {/* Insurance Protection % Line */}
                          <div className="h-3.5 w-20 bg-slate-100 rounded" />
                        </div>
                      </td>

                      {/* Column 6: Status Allocation Indicator Flags Skeleton */}
                      <td className="py-4 px-6 align-middle">
                        {/* Rounded Status Pill Wrapper Box Mock */}
                        <div className="h-6 w-16 bg-slate-100 rounded-full" />
                      </td>

                      {/* Column 7: Operational Admin Utilities Skeleton */}
                      <td className="py-4 px-6 text-right pr-8 align-middle">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View Details Icon Box */}
                          <div className="size-8 rounded-xl bg-slate-100 border border-slate-200/30 shrink-0" />
                          {/* Edit parameters Icon Box */}
                          <div className="size-8 rounded-xl bg-slate-100 border border-slate-200/30 shrink-0" />
                          {/* Toggle Activation State Icon Box */}
                          <div className="size-8 rounded-xl bg-slate-100 border border-slate-200/30 shrink-0" />
                        </div>
                      </td>
                    </tr>
                  ))
              ) : loanProducts?.length > 0 ? (
                loanProducts?.map((product) => (
                  <tr
                    key={product.id}
                    className={`group transition-colors hover:bg-slate-50/60 ${
                      !product.is_active ? "bg-slate-50/20" : ""
                    }`}
                  >
                    {/* Column 1: Core Identification Assets */}
                    <td className="py-4 px-6 max-w-xs">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[10px] tracking-wide uppercase px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                            {product.product_code}
                          </span>
                        </div>
                        <span className="font-bold text-slate-800 text-sm tracking-tight truncate group-hover:text-primary transition-colors">
                          {product.product_name}
                        </span>
                      </div>
                    </td>

                    {/* Column 2: Interest Parameter Models */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-700 text-sm">
                          {product.interest_rate}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium mt-0.5">
                          {formatSentenceCase(product?.interest_method)}
                        </span>
                      </div>
                    </td>

                    {/* Column 3: Amortization Framing Tiers */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-700">
                          {product.min_period} Months
                        </span>
                        <span className="text-[11px] text-primary font-bold tracking-wide mt-0.5">
                          {product.max_period} Months
                        </span>
                      </div>
                    </td>

                    {/* Column 4: Dynamic Capital Range Limits */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <div className="text-slate-700 font-medium">
                          Max:{" "}
                          <span className="font-bold">
                            {product.max_amount}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                          Min Floor: {product.min_amount}
                        </div>
                      </div>
                    </td>

                    {/* Column 5: Legal Risk Contingencies */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-700">
                          {product.min_guarantors} Guarantors
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                          Insurance: {Number(product.insurance_rate).toFixed(1)}
                          %
                        </span>
                      </div>
                    </td>

                    {/* Column 6: Status Allocation Indicator Flags */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full ${
                          product.is_active
                            ? "bg-success/10 text-success"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${product.is_active ? "bg-success" : "bg-slate-400"}`}
                        />
                        {product.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* Column 7: Operational Admin Utilities */}
                    <td className="py-4 px-6 text-right pr-8">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          className="size-8 rounded-xl border border-slate-200/60 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm bg-white"
                          title="View Extended Rules"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => navigate("/admin/edit-loan-product")}
                          className="size-8 rounded-xl border border-slate-200/60 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm bg-white"
                          title="Edit Parameters"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          className={`size-8 rounded-xl border flex items-center justify-center transition-all shadow-sm bg-white ${
                            product.is_active
                              ? "border-rose-100 text-error hover:bg-rose-50 hover:border-rose-200"
                              : "border-emerald-100 text-success hover:bg-emerald-50 hover:border-emerald-200"
                          }`}
                          title={
                            product.is_active
                              ? "Deactivate Product"
                              : "Activate Product"
                          }
                        >
                          <Power size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <div className="bg-white border border-dashed border-slate-300 rounded-[28px] p-16 text-center max-w-xl mx-auto mt-6">
                  <div className="size-12 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 mx-auto mb-4">
                    <Layers size={22} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                    No configured products found
                  </h3>
                  <p className="text-xs text-slate-400 font-medium max-w-xs mx-auto mt-2 leading-relaxed">
                    There are no product profiles matching "{searchQuery}" under
                    the current {activeTab} framework toggle index.
                  </p>
                </div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SUPPORTIVE CHILD COMPONENTS FOR HIGH DESIGN SCANNABILITY
   ========================================================================== */

// Dashboard Summary Counters Components Template
const SummaryMetricCard = ({ title, value, desc, icon, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex items-start justify-between">
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
