import React, { useState } from "react";
import {
  ArrowLeft,
  ChevronRight,
  Search,
  Filter,
  Clock,
  CheckCircle2,
  XCircle,
  User,
  Calendar,
  Layers,
  FileText,
  ShieldAlert,
  ArrowUpRight,
  Eye,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useToast } from "../../../contexts/ToastProvider";
import * as Sentry from "@sentry/react";
import { getDepositApprovals } from "../../../sdk/products/products";

export const ProductApprovals = ({ onBack, onReviewApproval }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [approvals, setApprovals] = useState([]);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { isFetching } = useQuery({
    queryKey: ["approvals"],
    queryFn: async () => {
      const response = await getDepositApprovals();
      return response;
    },
    onSuccess: (data) => {
      console.log(data);
      setApprovals(data ?? []);
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

  // Filtering Logic
  const filteredApprovals = approvals.filter((item) => {
    const matchesSearch =
      item.product?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.product?.public_code
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item.submitted_by?.firstname
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item.submitted_by?.lastname
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item.submitted_by?.public_id
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Summary Metrics
  const pendingCount = approvals.filter((a) => a.status === "pending").length;
  const approvedCount = approvals.filter((a) => a.status === "approved").length;
  const rejectedCount = approvals.filter((a) => a.status === "rejected").length;

  return (
    <div className="w-full space-y-6 select-none font-sans antialiased text-slate-800">
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 transition-all cursor-pointer shrink-0 shadow-3xs"
            title="Go Back"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span>Settings</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
              Financial Products Approvals
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Review and authorize proposed product creations, parameter
              updates, and policy modifications.
            </p>
          </div>
        </div>
      </div>

      {/* 2. SUMMARY METRICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-3xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
              Pending Review
            </p>
            <p className="text-2xl font-black text-slate-900 font-mono">
              {pendingCount}
            </p>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100">
            <Clock size={20} />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-3xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
              Approved
            </p>
            <p className="text-2xl font-black text-slate-900 font-mono">
              {approvedCount}
            </p>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
            <CheckCircle2 size={20} />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-3xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
              Rejected Requests
            </p>
            <p className="text-2xl font-black text-slate-900 font-mono">
              {rejectedCount}
            </p>
          </div>
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl border border-rose-100">
            <XCircle size={20} />
          </div>
        </div>
      </div>

      {/* 3. SEARCH & STATUS TAB CONTROLS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Product, Code, or Submitter..."
            className="w-full pl-9 pr-4 py-4 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all shadow-3xs"
          />
        </div>
      </div>

      {/* 4. APPROVALS TABLE */}
      <div className="w-full bg-white rounded-3xl border border-slate-200/60 shadow-2xs overflow-hidden">
        <table className="w-full text-left border-collapse font-sans table-auto">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-200/60 text-[10px] font-bold text-slate-400 uppercase tracking-widest select-none">
              <th className="py-4.5 px-6">Product Request</th>
              <th className="py-4.5 px-6">Action & Scope</th>
              <th className="py-4.5 px-6">Modified Parameters</th>
              <th className="py-4.5 px-6">Submitted By</th>
              <th className="py-4.5 px-6">Submission Date</th>
              <th className="py-4.5 px-6">Status</th>
              <th className="py-4.5 px-6 text-right pr-8">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-xs tracking-tight">
            {isFetching ? (
              Array.from({ length: 8 }).map((_, idx) => (
                <tr key={idx} className="animate-pulse">
                  <td className="py-4 px-6">
                    <div className="flex flex-col space-y-1.5">
                      <div className="h-4 w-32 bg-slate-200 rounded" />
                      <div className="h-3 w-20 bg-slate-200 rounded" />
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-5 w-24 bg-slate-200 rounded-md" />
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-4 w-28 bg-slate-200 rounded" />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col space-y-1.5">
                      <div className="h-4 w-28 bg-slate-200 rounded" />
                      <div className="h-3 w-20 bg-slate-200 rounded" />
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-3.5 w-24 bg-slate-200 rounded" />
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-5 w-16 bg-slate-200 rounded-md" />
                  </td>
                  <td className="py-4 px-6 text-right pr-8">
                    <div className="h-8 w-24 bg-slate-200 rounded-xl ml-auto" />
                  </td>
                </tr>
              ))
            ) : filteredApprovals.length > 0 ? (
              filteredApprovals.map((approval) => {
                const product = approval.product || {};
                const submitter = approval.submitted_by || {};
                const submitterName = [submitter.firstname, submitter.lastname]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <tr
                    key={approval.id}
                    className="group transition-colors hover:bg-slate-50/60"
                  >
                    {/* Col 1: Product Details */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] font-bold text-slate-400">
                            {product.public_code || "N/A"}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="text-[10px] text-slate-400 font-medium capitalize">
                            {product.category || "deposit"}
                          </span>
                        </div>
                        <h4 className="font-extrabold text-slate-900 text-sm tracking-tight group-hover:text-[#074073] transition-colors">
                          {product.name ||
                            approval.proposed_payload?.name ||
                            "Product"}
                        </h4>
                      </div>
                    </td>

                    {/* Col 2: Action & Scope */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col space-y-1">
                        <span
                          className={`inline-flex items-center text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border w-fit ${
                            approval.action === "update"
                              ? "bg-blue-50 text-blue-700 border-blue-200/60"
                              : "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                          }`}
                        >
                          {approval.action === "update"
                            ? "Parameter Update"
                            : "New Creation"}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {approval.scope === "all_members"
                            ? "All Members"
                            : "New Members Only"}
                        </span>
                      </div>
                    </td>

                    {/* Col 3: Modified Parameters Summary */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col space-y-0.5">
                        <span className="font-bold text-slate-800 text-xs">
                          {approval.changed_fields?.length || 0} Parameter
                          {approval.changed_fields?.length === 1 ? "" : "s"}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          Modified in request
                        </span>
                      </div>
                    </td>

                    {/* Col 4: Submitted By */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col space-y-0.5">
                        <span className="font-bold text-slate-800 text-xs">
                          {submitterName || "System Admin"}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {submitter.job_title || "Administrator"} •{" "}
                          <span className="font-mono text-slate-500">
                            {submitter.public_id || "N/A"}
                          </span>
                        </span>
                      </div>
                    </td>

                    {/* Col 5: Submission Date */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col space-y-0.5">
                        <span className="font-mono font-bold text-slate-700 text-xs">
                          {approval.submitted_at
                            ? new Date(
                                approval.submitted_at,
                              ).toLocaleDateString("en-KE", {
                                dateStyle: "medium",
                              })
                            : "—"}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {approval.submitted_at
                            ? new Date(
                                approval.submitted_at,
                              ).toLocaleTimeString("en-KE", {
                                timeStyle: "short",
                              })
                            : ""}
                        </span>
                      </div>
                    </td>

                    {/* Col 6: Status */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded border w-fit ${
                          approval.status === "pending"
                            ? "bg-amber-50 border-amber-200/60 text-amber-700"
                            : approval.status === "approved"
                              ? "bg-emerald-50 border-emerald-200/60 text-emerald-700"
                              : "bg-rose-50 border-rose-200/60 text-rose-700"
                        }`}
                      >
                        {approval.status}
                      </span>
                    </td>

                    {/* Col 7: Action Trigger */}
                    <td className="py-4 px-6 text-right pr-8">
                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/admin/financial-products/${approval?.id}/review`,
                          )
                        }
                        className={`h-8 px-3.5 rounded-xl font-bold text-[11px] transition-all cursor-pointer ${
                          approval.status === "pending"
                            ? "bg-slate-900 text-white hover:bg-[#074073] shadow-2xs"
                            : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {approval.status === "pending" ? "Review" : "Inspect"}
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="py-16 text-center select-none">
                  <div className="flex flex-col items-center justify-center max-w-sm mx-auto space-y-1">
                    <p className="text-xs font-bold text-slate-700">
                      No change requests found
                    </p>
                    <p className="text-xs text-slate-400">
                      There are currently no product change requests matching
                      your search or status filter.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
