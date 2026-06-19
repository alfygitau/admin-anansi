import React, { useState } from "react";
import {
  Search,
  User,
  Users,
  ShieldCheck,
  AlertTriangle,
  Activity,
} from "lucide-react";
import { useToast } from "../../../contexts/ToastProvider";
import { useQuery } from "react-query";
import { getGuarantors } from "../../../sdk/guarantors/guarantors";
import Pagination from "../../../components/pagination/Pagination";

export default function Guarantors() {
  const [guarantors, setGuarantors] = useState([]);
  const { toast } = useToast();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    application_status: "",
    status: "",
    fromDate: "",
    toDate: "",
    loan_type: "",
    loan_product_code: "",
  });
  const { showToast } = useToast();
  const [totalItems, setTotalItems] = useState(0);

  const metrics = {
    totalGuarantors: 12,
    totalCommitted: 2262330.22,
    totalExposure: 1610330.22,
    totalActiveLoans: 49,
    totalPendingLoans: 54,
  };

  const { isFetching } = useQuery({
    queryKey: [
      "guarantors",
      filters?.page,
      filters?.limit,
      filters?.status,
      filters?.application_status,
      filters?.loan_type,
      filters?.loan_product_code,
      filters?.fromDate,
      filters?.toDate,
    ],
    queryFn: async () => {
      const response = await getGuarantors(
        filters?.page,
        filters?.limit,
        filters?.status,
        filters?.application_status,
        filters?.loan_type,
        filters?.loan_product_code,
        filters?.fromDate,
        filters?.toDate,
      );
      return response?.data?.data;
    },
    onSuccess: (data) => {
      setGuarantors(data?.guarantors);
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
    <div className="w-full space-y-6 font-sans">
      {/* 1. REGISTRY HEADER */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Loan Guarantors</h2>
          <p className="text-xs text-slate-500">
            Monitor exposure and commitment levels across all guarantors.
          </p>
        </div>
      </div>

      {isFetching ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 select-none animate-pulse">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div
                key={`underwriting-metric-skeleton-${index}`}
                className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs p-5 flex items-start gap-4"
              >
                {/* Icon Container Shell Mock */}
                <div className="size-11 bg-slate-100 border border-slate-200/40 rounded-xl shrink-0" />

                {/* Text Metric Parameters Stack */}
                <div className="space-y-2 min-w-0 flex-1 pt-0.5">
                  {/* Card Meta Title Info */}
                  <div className="h-3 w-24 bg-slate-200 rounded" />

                  {/* Main Primary Value Header Line */}
                  <div className="h-7 w-28 bg-slate-200 rounded-lg" />

                  {/* Bottom Operational Subtext Note */}
                  <div className="h-3 w-36 bg-slate-100 rounded" />
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 select-none">
          {/* Metric 1: Total Guarantors */}
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs p-5 flex items-start gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100/40 shrink-0">
              <Users size={18} />
            </div>
            <div className="space-y-0.5 min-w-0">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">
                Active Guarantors
              </p>
              <p className="text-2xl font-black text-slate-900 tracking-tight">
                {metrics.totalGuarantors}
              </p>
              <p className="text-[11px] text-slate-400 font-medium truncate">
                Unique underwriting identities
              </p>
            </div>
          </div>

          {/* Metric 2: Total Amount Committed */}
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs p-5 flex items-start gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl border border-purple-100/40 shrink-0">
              <ShieldCheck size={18} />
            </div>
            <div className="space-y-0.5 min-w-0">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">
                Total Capital Backed
              </p>
              <p className="text-2xl font-black text-slate-900 tracking-tight">
                KES{" "}
                {metrics?.totalCommitted?.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </p>
              <p className="text-[11px] text-slate-400 font-medium truncate">
                Aggregated lifetime value signed
              </p>
            </div>
          </div>

          {/* Metric 3: Active Exposure Risk */}
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs p-5 flex items-start gap-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl border border-orange-100/40 shrink-0">
              <AlertTriangle size={18} />
            </div>
            <div className="space-y-0.5 min-w-0">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">
                Live Risk Exposure
              </p>
              <p className="text-2xl font-black text-orange-600 tracking-tight">
                KES{" "}
                {metrics?.totalExposure?.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </p>
              <p className="text-[11px] text-slate-400 font-medium truncate">
                Unreleased liabilities active on loop
              </p>
            </div>
          </div>

          {/* Metric 4: Total Structured Operations Loop */}
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs p-5 flex items-start gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100/40 shrink-0">
              <Activity size={18} />
            </div>
            <div className="space-y-0.5 min-w-0">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">
                Underwriting Loops
              </p>
              <p className="text-2xl font-black text-slate-900 tracking-tight">
                {metrics.totalActiveLoans + metrics.totalPendingLoans}
              </p>
              <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5 truncate">
                <span className="text-emerald-600 font-bold">
                  {metrics.totalActiveLoans} Live
                </span>{" "}
                • <span>{metrics.totalPendingLoans} Pipeline</span>
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="relative w-full">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          className="h-14 w-full pl-9 pr-4 bg-white border border-slate-200/60 rounded-xl text-xs outline-none focus:border-primary shadow-sm"
          placeholder="Search guarantor..."
        />
      </div>

      {/* 2. TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse table-auto">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-200/60 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <th className="py-4.5 px-6">Guarantor Details</th>
              <th className="py-4.5 px-6">Contact Info</th>
              <th className="py-4.5 px-6 text-right">Total Committed</th>
              <th className="py-4.5 px-6 text-right">Available to Commit</th>
              <th className="py-4.5 px-6 text-center">Loan Activity</th>
              <th className="py-4.5 px-6 text-center">Release Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {isFetching ? (
              Array(10)
                .fill(0)
                .map((_, index) => (
                  <tr
                    key={`guarantor-skeleton-${index}`}
                    className="animate-pulse border-b border-slate-100 last:border-none"
                  >
                    {/* Col 1: Name and ID Profile Skeleton */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {/* Avatar Profile Mock */}
                        <div className="h-8 w-8 rounded-full bg-slate-200 shrink-0" />
                        <div className="space-y-1.5 flex-1">
                          <div className="h-4 w-32 bg-slate-200 rounded" />
                          <div className="h-3 w-16 bg-slate-100 rounded" />
                        </div>
                      </div>
                    </td>

                    {/* Col 2: New Contact Column Skeleton */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col space-y-1.5">
                        <div className="h-4 w-24 bg-slate-200 rounded" />
                        <div className="h-3 w-32 bg-slate-100 rounded" />
                      </div>
                    </td>

                    {/* Col 3: Financial Amount Guaranteed Skeleton */}
                    <td className="py-4 px-6 text-right">
                      <div className="h-4 w-20 bg-slate-200 rounded ml-auto" />
                    </td>

                    {/* Col 4: Financial Available Backing Skeleton */}
                    <td className="py-4 px-6 text-right">
                      <div className="h-4 w-20 bg-slate-200 rounded ml-auto" />
                    </td>

                    {/* Col 5: Activity & Status Flags Skeleton */}
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-3">
                        <div className="h-3.5 w-12 bg-slate-100 rounded" />
                        <div className="h-3.5 w-12 bg-slate-100 rounded" />
                      </div>
                    </td>

                    {/* Col 6: Progress Matrix Bar Skeleton */}
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        {/* Progress bar line asset */}
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full" />
                        {/* Progress numeric metric percentage label */}
                        <div className="h-4 w-8 bg-slate-200 rounded" />
                      </div>
                    </td>
                  </tr>
                ))
            ) : guarantors?.length > 0 ? (
              guarantors?.map((g) => (
                <tr
                  key={g.guarantorId}
                  className="group hover:bg-slate-50/60 transition-colors"
                >
                  {/* Name and ID Column */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <User size={14} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">
                          {g?.guarantor?.name}
                        </p>
                        <p className="text-[10px] text-slate-400 font-medium">
                          ID: {g?.guarantor?.customer_id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* New Contact Column */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-0.5">
                      <p className="font-semibold text-slate-700">
                        {g?.guarantor?.mobile || "N/A"}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {g.guarantor?.email || "No email"}
                      </p>
                    </div>
                  </td>

                  {/* Financial Columns */}
                  <td className="py-4 px-6 text-right font-semibold text-slate-900">
                    KES{" "}
                    {g?.amount_guaranteed?.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td className="py-4 px-6 text-right font-semibold text-orange-600">
                    KES{" "}
                    {g.guarantor?.available_backing.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </td>

                  {/* Activity & Status */}
                  <td className="py-4 px-6 text-center">
                    <div className="flex justify-center gap-4 text-[10px]">
                      <span className="text-emerald-600 font-bold">
                        {g.activeLoans ?? 1} Active
                      </span>
                      <span className="text-slate-400">
                        {g.pendingLoans ?? 1} Pending
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${g.releasedPct ?? 0}%` }}
                        />
                      </div>
                      <span className="font-bold text-slate-700">
                        {g.releasedPct ?? 0}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 px-6">
                  <div className="w-full bg-white border border-dashed border-slate-200 rounded-[24px] p-12 text-center select-none">
                    <div className="size-11 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 mx-auto mb-3.5 shadow-3xs">
                      <User size={20} className="opacity-75" />
                    </div>
                    <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">
                      No Guarantors Attached
                    </h3>
                    <p className="text-xs text-slate-400 font-medium max-w-xs mx-auto mt-1.5 leading-relaxed">
                      This application does not have any peer co-signers
                      assigned to back the requested loan amount yet.
                    </p>
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
  );
}
