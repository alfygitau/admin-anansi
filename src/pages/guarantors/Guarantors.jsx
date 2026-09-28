import React, { useState } from "react";
import {
  Search,
  User,
  ShieldCheck,
  Activity,
  Eye,
  MoreVertical,
  ShieldAlert,
  Phone,
  Mail,
  Wallet,
  Percent,
} from "lucide-react";
import { useToast } from "../../contexts/ToastProvider";
import { useQuery } from "react-query";
import { getGuarantors } from "../../sdk/guarantors/guarantors";
import Pagination from "../../components/pagination/Pagination";
import * as Sentry from "@sentry/react";
import { useFormatAmount } from "../../hooks/useFormatAmount";
import { useNavigate } from "react-router-dom";

export default function Guarantors() {
  const [guarantors, setGuarantors] = useState([]);
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
  const formatAmount = useFormatAmount();
  const [metrics, setMetrics] = useState({});
  const navigate = useNavigate()

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
      setMetrics(data?.summary);
      setFilters((prev) => ({
        ...prev,
        page: data?.page,
        limit: data?.limit,
      }));
      setTotalItems(data.total);
    },
    onError: (error) => {
      Sentry.captureException(
        new Error(error?.response?.data?.message || error.message),
        {
          tags: { component: "Guarantors", action: "All guarantors" },
        },
      );
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

  const handleMoreActions = () => {};
  const handleViewGuarantor = (id) => {
    navigate(`/admin/guarantors/${id}`);
  };

  return (
    <div className="w-full space-y-6 font-sans">
      {/* 1. REGISTRY HEADER */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-lg font-bold text-primary">Loan Guarantors</h2>
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
          {/* Metric 1: Total Application Amount */}
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs p-5 flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100/40 shrink-0">
              <Wallet size={18} />
            </div>
            <div className="space-y-0.5 min-w-0">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">
                Total Requested Amount
              </p>
              <p className="text-2xl font-black text-primary tracking-tight">
                {formatAmount(metrics?.total_application_amount)}
              </p>
              <p className="text-[11px] text-slate-400 font-medium truncate">
                Target capital across applications
              </p>
            </div>
          </div>

          {/* Metric 2: Approved Guaranteed Amount */}
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs p-5 flex items-center gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl border border-purple-100/40 shrink-0">
              <ShieldCheck size={18} />
            </div>
            <div className="space-y-0.5 min-w-0">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">
                Approved Guaranteed
              </p>
              <p className="text-2xl font-black text-primary tracking-tight">
                {formatAmount(metrics?.approved_guaranteed_amount)}
              </p>
              <p className="text-[11px] text-slate-400 font-medium truncate">
                Capital backed by approved guarantors
              </p>
            </div>
          </div>

          {/* Metric 3: Coverage Percentage */}
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs p-5 flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100/40 shrink-0">
              <Percent size={18} />
            </div>
            <div className="space-y-0.5 min-w-0">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">
                Guarantee Coverage
              </p>
              <p className="text-2xl font-black text-emerald-600 tracking-tight">
                {metrics?.coverage_percent ?? 0}%
              </p>
              <p className="text-[11px] text-slate-400 font-medium truncate">
                Coverage ratio against target
              </p>
            </div>
          </div>

          {/* Metric 4: Application Status Pipeline */}
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs p-5 flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100/40 shrink-0">
              <Activity size={18} />
            </div>
            <div className="space-y-0.5 min-w-0">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">
                Application Pipeline
              </p>
              <p className="text-2xl font-black text-primary tracking-tight">
                {(metrics?.approved ?? 0) +
                  (metrics?.pending ?? 0) +
                  (metrics?.returned ?? 0) +
                  (metrics?.draft ?? 0) +
                  (metrics?.rejected ?? 0)}{" "}
                <span className="text-xs font-semibold text-slate-400">
                  Total
                </span>
              </p>
              <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5 truncate">
                <span className="text-emerald-600 font-bold">
                  {metrics?.approved ?? 0} Approved
                </span>{" "}
                •{" "}
                <span className="text-amber-600 font-bold">
                  {metrics?.pending ?? 0} Pending
                </span>{" "}
                • <span>{metrics?.returned ?? 0} Returned</span>
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
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200/60 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <th className="py-4.5 px-6">Guarantor Profile</th>
                <th className="py-4.5 px-6">Backing & Capacity</th>
                <th className="py-4.5 px-6">Committed & Encumbered</th>
                <th className="py-4.5 px-6">Release Breakdown</th>
                <th className="py-4.5 px-6">Guarantees & Activity</th>
                <th className="py-4.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {isFetching ? (
                Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <tr
                      key={`guarantor-skeleton-${index}`}
                      className="animate-pulse border-b border-slate-100 last:border-none"
                    >
                      {/* Profile Skeleton */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-slate-200 shrink-0" />
                          <div className="space-y-1.5 flex-1">
                            <div className="h-4 w-36 bg-slate-200 rounded" />
                            <div className="h-3 w-48 bg-slate-100 rounded" />
                          </div>
                        </div>
                      </td>
                      {/* Backing Skeleton */}
                      <td className="py-4 px-6 space-y-1">
                        <div className="h-4 w-24 bg-slate-200 rounded" />
                        <div className="h-3 w-20 bg-slate-100 rounded" />
                      </td>
                      {/* Committed Skeleton */}
                      <td className="py-4 px-6 space-y-1">
                        <div className="h-4 w-24 bg-slate-200 rounded" />
                        <div className="h-3 w-20 bg-slate-100 rounded" />
                      </td>
                      {/* Release Skeleton */}
                      <td className="py-4 px-6 space-y-1">
                        <div className="h-4 w-24 bg-slate-200 rounded" />
                        <div className="h-3 w-20 bg-slate-100 rounded" />
                      </td>
                      {/* Activity Skeleton */}
                      <td className="py-4 px-6 space-y-1">
                        <div className="h-4 w-24 bg-slate-200 rounded" />
                        <div className="h-3 w-28 bg-slate-100 rounded" />
                      </td>
                      {/* Actions Skeleton */}
                      <td className="py-4 px-6 text-right">
                        <div className="h-8 w-14 bg-slate-200 rounded-lg ml-auto" />
                      </td>
                    </tr>
                  ))
              ) : guarantors?.length > 0 ? (
                guarantors?.map((g) => (
                  <tr
                    key={g.customer_id}
                    className="group hover:bg-slate-50/60 transition-colors"
                  >
                    {/* Guarantor Profile & Contact Details */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <User size={16} />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-slate-800 text-sm">
                              {g?.name}
                            </p>
                            {g?.portfolio_health === "at_risk" && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200/60">
                                <ShieldAlert size={10} />
                                {g?.portfolio_health_label || "At Risk"}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 font-medium">
                            Member No:{" "}
                            <span className="text-slate-600 font-semibold">
                              {g?.member_no}
                            </span>
                          </p>
                          <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-0.5">
                            <span className="flex items-center gap-1">
                              <Phone size={11} className="text-slate-400" />
                              {g?.mobile || "N/A"}
                            </span>
                          </div>
                          <span className="flex items-center gap-1">
                            <Mail size={11} className="text-slate-400" />
                            {g?.email || "N/A"}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Backing & Capacity */}
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-medium">
                            Total Backing
                          </span>
                          <p className="font-bold text-slate-800">
                            {formatAmount(g?.total_backing)}
                          </p>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-medium">
                            Free Capacity
                          </span>
                          <p className="font-semibold text-emerald-600">
                            {formatAmount(
                              g?.free_capacity ?? g?.available_to_commit,
                            )}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Committed & Encumbered */}
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-medium">
                            Total Committed
                          </span>
                          <p className="font-bold text-primary">
                            {formatAmount(g?.total_committed)}
                          </p>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-medium">
                            Total Encumbered
                          </span>
                          <p className="font-semibold text-slate-600">
                            {formatAmount(g?.total_encumbered)}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Release Breakdown (Values) */}
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-medium">
                            Released Amount
                          </span>
                          <p className="font-bold text-slate-800">
                            {formatAmount(g?.release_status?.released_amount)}
                          </p>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-medium">
                            Remaining Encumbered
                          </span>
                          <p className="font-semibold text-amber-600">
                            {formatAmount(
                              g?.release_status?.remaining_encumbered_amount,
                            )}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Guarantees & Loan Activity */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col items-start space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                            {g?.active_guarantees ??
                              g?.loan_activity?.active ??
                              0}{" "}
                            Active
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200/60">
                            {g?.pending_guarantees ??
                              g?.loan_activity?.pending ??
                              0}{" "}
                            Pending
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium">
                          Requests:{" "}
                          <span className="text-emerald-600 font-bold">
                            {g?.loan_activity?.approved_requests ?? 0} Approved
                          </span>
                          {" • "}
                          <span className="text-rose-600 font-bold">
                            {g?.loan_activity?.rejected_requests ?? 0} Rejected
                          </span>
                        </p>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => handleViewGuarantor?.(g)}
                          className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-slate-100 transition-colors"
                          title="View Full Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoreActions?.(g)}
                          className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                          title="More Options"
                        >
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 px-6">
                    <div className="w-full bg-white rounded-[24px] p-12 text-center select-none">
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
  );
}
