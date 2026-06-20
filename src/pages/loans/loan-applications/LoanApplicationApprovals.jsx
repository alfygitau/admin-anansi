import React, { useState, useMemo } from "react";
import {
  UserCheck,
  Search,
  Sliders,
  Download,
  Filter,
  FileText,
  DollarSign,
  Calendar,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Coins,
  ShieldCheck,
  Clock,
  Eye,
} from "lucide-react";
import { useQuery } from "react-query";
import { useToast } from "../../../contexts/ToastProvider";
import { useFormatAmount } from "../../../hooks/useFormatAmount";
import { getAllApprovals } from "../../../sdk/loan-applications/loan-applications";
import Pagination from "../../../components/pagination/Pagination";

export default function LoanApplicationApprovals() {
  // 1. FILTER STATED MANAGEMENT
  const [searchTerm, setSearchTerm] = useState("");
  const [decisionFilter, setDecisionFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
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
    approval_type: "",
    approver_id: "",
    loan_type: "",
  });
  const { showToast } = useToast();
  const [totalItems, setTotalItems] = useState(0);

  const [approvals, setApprovals] = useState([]);

  const stats = {
    approvedVolume: 550000,
    totalCount: 3,
    activeVetos: 1,
  };

  const { isFetching } = useQuery({
    queryKey: [
      "loan application approvals",
      filters?.page,
      filters?.limit,
      filters?.status,
      filters?.approval_type,
      filters?.loan_type,
      filters?.fromDate,
      filters?.toDate,
    ],
    queryFn: async () => {
      const response = await getAllApprovals(
        filters?.page,
        filters?.limit,
        filters?.status,
        filters?.approval_type,
        filters?.loan_type,
        filters?.fromDate,
        filters?.toDate,
      );
      return response?.data?.data;
    },
    onSuccess: (data) => {
      setApprovals(data?.approvals);
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
    <div className="w-full space-y-6 antialiased text-slate-800 bg-slate-50/40 rounded-[32px] min-h-screen">
      {/* HEADER MATRIX PANEL */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200/60 pb-6 select-none">
        <div>
          {/* FIXED: Standardized text gradient utilities */}
          <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Approvals Ledger
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Real-time verification logs, executive sign-off trails, and risk
            parameter validation tracking.
          </p>
        </div>

        {/* TOP LEVEL EXPORT CONTROLS */}
        <button
          type="button"
          className="h-10 px-4 border border-slate-200 rounded-xl bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 flex items-center gap-2 shadow-3xs cursor-pointer transition-all active:scale-98 shrink-0 self-start md:self-auto"
        >
          <Download size={13} strokeWidth={2.5} />
          <span>Export Approvals</span>
        </button>
      </div>

      {/* PREMIUM EXECUTIVE OVERVIEW INSIGHT RIBBON */}
      {isFetching ? (
        <div className="grid grid-cols-3 gap-5 select-none">
          {/* CARD 1 SKELETON */}
          <div className="bg-white border border-slate-200/60 shadow-3xs rounded-2xl p-4 flex items-center gap-4">
            <div className="size-10 rounded-xl bg-slate-200/70 animate-pulse shrink-0" />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-2.5 w-16 bg-slate-200/70 animate-pulse rounded-sm" />
              <div className="h-5 w-28 bg-slate-200/70 animate-pulse rounded-md" />
            </div>
          </div>

          {/* CARD 2 SKELETON */}
          <div className="bg-white border border-slate-200/60 shadow-3xs rounded-2xl p-4 flex items-center gap-4">
            <div className="size-10 rounded-xl bg-slate-200/70 animate-pulse shrink-0" />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-2.5 w-20 bg-slate-200/70 animate-pulse rounded-sm" />
              <div className="h-5 w-20 bg-slate-200/70 animate-pulse rounded-md" />
            </div>
          </div>

          {/* CARD 3 SKELETON */}
          <div className="bg-white border border-slate-200/60 shadow-3xs rounded-2xl p-4 flex items-center gap-4">
            <div className="size-10 rounded-xl bg-slate-200/70 animate-pulse shrink-0" />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-2.5 w-16 bg-slate-200/70 animate-pulse rounded-sm" />
              <div className="h-5 w-20 bg-slate-200/70 animate-pulse rounded-md" />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-5 select-none">
          {/* CARD 1: TOTAL APPROVED AMOUNT */}
          <div className="bg-white border border-slate-200/60 shadow-3xs rounded-2xl p-4 flex items-center gap-4">
            <div className="size-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-3xs shrink-0">
              <TrendingUp size={16} strokeWidth={2.5} />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block truncate">
                Total Approved
              </span>
              <span className="text-base font-mono font-black text-[#074073] block truncate">
                KES {stats.approvedVolume.toLocaleString()}
              </span>
            </div>
          </div>

          {/* CARD 2: TOTAL REVIEWS COMPLETED */}
          <div className="bg-white border border-slate-200/60 shadow-3xs rounded-2xl p-4 flex items-center gap-4">
            <div className="size-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-3xs shrink-0">
              <ShieldCheck size={16} strokeWidth={2.5} />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block truncate">
                Total Reviewed
              </span>
              <span className="text-base font-black text-slate-900 block truncate">
                {stats.totalCount} Loans
              </span>
            </div>
          </div>

          {/* CARD 3: TOTAL DECLINED APPLICATIONS */}
          <div className="bg-white border border-slate-200/60 shadow-3xs rounded-2xl p-4 flex items-center gap-4">
            <div className="size-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shadow-3xs shrink-0">
              <AlertCircle size={16} strokeWidth={2.5} />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block truncate">
                Total Declined
              </span>
              <span className="text-base font-black text-rose-700 block truncate">
                {stats.activeVetos} Loans
              </span>
            </div>
          </div>
        </div>
      )}

      {/* FILTER CONTROL AND INPUT REGISTRY STRIP */}
      <div className="bg-white border border-slate-200/70 p-4 rounded-2xl shadow-3xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* SEARCH MECHANISM WRAP */}
        <div className="relative flex-1 max-w-md w-full">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search Application #, client name, or reviewer node..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 text-xs font-medium bg-slate-50/50 focus:bg-white focus:border-[#074073] focus:outline-hidden transition-all placeholder-slate-400"
          />
        </div>
      </div>

      {/* CORE INTERACTIVE SYSTEM LEDGER TABLE CONTAINER */}
      <div className="w-full overflow-x-auto border border-slate-200/70 rounded-2xl bg-white shadow-3xs">
        <table className="w-full border-collapse text-left text-xs text-slate-600 min-w-[1050px]">
          {/* TABLE HEADERS */}
          <thead className="bg-slate-50/70 border-b border-slate-100 select-none text-[10px] font-black uppercase tracking-widest text-slate-400">
            <tr>
              <th scope="col" className="px-5 py-4 font-black">
                Loan & Applicant
              </th>
              <th scope="col" className="px-4 py-4 font-black">
                Reviewed By
              </th>
              <th scope="col" className="px-4 py-4 font-black">
                Decision
              </th>
              <th scope="col" className="px-4 py-4 font-black">
                Amounts
              </th>
              <th scope="col" className="px-4 py-4 font-black max-w-sm">
                Reason & Conditions
              </th>
              <th scope="col" className="px-4 py-4 font-black text-right">
                Date & Time
              </th>
              {/* ADDED: NEW ACTION HEADER COLUMN */}
              <th scope="col" className="px-5 py-4 font-black text-right">
                Actions
              </th>
            </tr>
          </thead>

          {/* TABLE ROWS */}
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {/* SKELETON LOADING LOOP PLACEHOLDER (5 Rows) */}
            {isFetching ? (
              [...Array(10)].map((_, idx) => (
                <tr
                  key={`skeleton-${idx}`}
                  className="border-b border-slate-100 last:border-0"
                >
                  {/* COLUMN 1: LOAN & APPLICANT INFO SKELETON */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-xl bg-slate-200/70 animate-pulse shrink-0" />
                      <div className="flex flex-col gap-2">
                        <div className="h-4 w-20 bg-slate-200/70 animate-pulse rounded-md" />
                        <div className="h-3.5 w-32 bg-slate-200/70 animate-pulse rounded-md" />
                        <div className="h-3 w-24 bg-slate-200/70 animate-pulse rounded-md" />
                      </div>
                    </div>
                  </td>

                  {/* COLUMN 2: REVIEWER INFO SKELETON */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <div className="size-8 rounded-xl bg-slate-200/70 animate-pulse shrink-0" />
                      <div className="flex flex-col gap-1.5 min-w-0">
                        <div className="h-3.5 w-28 bg-slate-200/70 animate-pulse rounded-md" />
                        <div className="h-3 w-16 bg-slate-200/70 animate-pulse rounded-md" />
                      </div>
                    </div>
                  </td>

                  {/* COLUMN 3: DECISION STATUS BADGE SKELETON */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="h-5 w-20 bg-slate-200/70 animate-pulse rounded-md" />
                  </td>

                  {/* COLUMN 4: REQUESTED VS APPROVED AMOUNTS SKELETON */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-2">
                      <div className="h-4 w-24 bg-slate-200/70 animate-pulse rounded-md" />
                      <div className="h-3.5 w-20 bg-slate-200/70 animate-pulse rounded-md" />
                    </div>
                  </td>

                  {/* COLUMN 5: REASONS & SPECIAL CONDITIONS SKELETON */}
                  <td className="px-4 py-4 max-w-sm">
                    <div className="flex flex-col gap-1.5">
                      <div className="h-3.5 w-full bg-slate-200/70 animate-pulse rounded-md" />
                      <div className="h-3.5 w-5/6 bg-slate-200/70 animate-pulse rounded-md" />
                    </div>
                  </td>

                  {/* COLUMN 6: TIMESTAMP SKELETON */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex flex-col items-end gap-1.5">
                      <div className="h-3.5 w-20 bg-slate-200/70 animate-pulse rounded-md" />
                      <div className="h-3 w-14 bg-slate-200/70 animate-pulse rounded-md" />
                    </div>
                  </td>

                  {/* COLUMN 7: ACTIONS BUTTON PLACEMENT SKELETON */}
                  <td className="px-5 py-4 whitespace-nowrap text-right">
                    <div className="h-8 w-16 bg-slate-200/70 animate-pulse rounded-xl ml-auto" />
                  </td>
                </tr>
              ))
            ) : approvals.length > 0 ? (
              approvals.map((approval, idx) => {
                const verdict = String(approval.decision || "").toLowerCase();
                const isApproved =
                  verdict.includes("approve") || verdict.includes("pass");
                const isRejected =
                  verdict.includes("reject") ||
                  verdict.includes("cancel") ||
                  verdict.includes("veto");

                return (
                  <tr
                    key={approval.id || idx}
                    className="hover:bg-slate-50/30 transition-colors group"
                  >
                    {/* COLUMN 1: LOAN & APPLICANT INFO */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="size-9 rounded-xl bg-slate-100 border border-slate-200/60 flex items-center justify-center text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors shrink-0 shadow-3xs">
                          <FileText size={14} strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-mono font-black text-slate-900 tracking-tight text-[11px] bg-slate-100 px-1.5 py-0.5 rounded-md w-fit">
                            {approval.application.application_number}
                          </span>
                          <span className="text-xs font-black text-slate-800 tracking-tight mt-1">
                            {approval.application.applicant_name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium mt-0.5">
                            {approval.application.loan_type}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* COLUMN 2: REVIEWER INFO */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div className="size-8 rounded-xl bg-slate-50 border border-slate-200/40 flex items-center justify-center text-slate-400 font-sans shadow-3xs shrink-0 group-hover:bg-white transition-colors">
                          <UserCheck size={13} strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-black text-slate-900 tracking-tight truncate">
                            {approval.approver?.name || "Automated System"}
                          </span>
                          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
                            {approval.approver_role || "Reviewer"}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* COLUMN 3: DECISION STATUS BADGE */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 text-[9px] font-black tracking-wider uppercase px-2.5 py-0.5 border rounded-md shadow-3xs ${
                          isApproved
                            ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                            : isRejected
                              ? "bg-rose-50 border-rose-100 text-rose-700"
                              : "bg-amber-50 border-amber-100 text-amber-700"
                        }`}
                      >
                        <span
                          className={`size-1 rounded-full bg-current ${isApproved ? "" : "animate-pulse"}`}
                        />
                        {approval.decision_label || "Reviewed"}
                      </span>
                    </td>

                    {/* COLUMN 4: REQUESTED VS APPROVED AMOUNTS */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex flex-col space-y-0.5">
                        <div className="flex items-center gap-1">
                          <span className="text-[9px] text-slate-400 uppercase font-black tracking-wider w-14">
                            Approved:
                          </span>
                          <span className="font-mono font-black text-emerald-600 text-[12px]">
                            KES{" "}
                            {Number(
                              approval.recommended_amount || 0,
                            ).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 border-t border-slate-100/70 pt-0.5">
                          <span className="text-[9px] text-slate-400 uppercase font-black tracking-wider w-14">
                            Requested:
                          </span>
                          <span className="font-mono font-semibold text-slate-500 text-[11px]">
                            KES{" "}
                            {Number(
                              approval.application.applied_amount || 0,
                            ).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* COLUMN 5: REASONS & SPECIAL CONDITIONS */}
                    <td className="px-4 py-4 text-xs leading-relaxed max-w-sm">
                      <div className="space-y-1.5">
                        <p className="text-slate-600 font-medium italic">
                          "
                          {approval.decision_reason ||
                            "No specific notes were left for this decision."}
                          "
                        </p>
                      </div>
                    </td>

                    {/* COLUMN 6: TIMESTAMP */}
                    <td className="px-4 py-4 whitespace-nowrap text-right">
                      <div className="flex flex-col items-end">
                        <span className="font-bold text-slate-800 text-[11px]">
                          {approval.decided_at
                            ? new Date(approval.decided_at).toLocaleDateString(
                                "en-KE",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                },
                              )
                            : "—"}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono font-medium mt-0.5">
                          {approval.decided_at
                            ? new Date(approval.decided_at).toLocaleTimeString(
                                "en-KE",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                },
                              )
                            : "—"}
                        </span>
                      </div>
                    </td>

                    {/* ADDED: COLUMN 7: ACTIONS BUTTON PLACEMENT */}
                    <td className="px-5 py-4 whitespace-nowrap text-right">
                      <button
                        type="button"
                        onClick={() =>
                          console.log(
                            "View application:",
                            approval.application_id,
                          )
                        }
                        className="inline-flex items-center gap-1.5 h-8 px-3 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 shadow-3xs cursor-pointer transition-all active:scale-95 ml-auto"
                      >
                        <Eye
                          size={13}
                          strokeWidth={2.5}
                          className="text-slate-400 group-hover:text-slate-600"
                        />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-12 text-center text-slate-400 font-medium select-none bg-slate-50/20"
                >
                  <div className="size-10 rounded-xl border border-dashed border-slate-200 flex items-center justify-center mx-auto mb-3 text-slate-300 bg-white">
                    <Search size={16} />
                  </div>
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                    No Results Found
                  </p>
                  <p className="text-[11px] text-slate-400 max-w-xs mx-auto mt-0.5">
                    Try changing your search terms or filters to find what you
                    are looking for.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* FOOTER SYSTEM PAGINATION ROW LAYOUT */}
      <div className="bg-white border border-slate-200/70 px-5 py-3.5 rounded-2xl shadow-3xs flex items-center justify-between gap-4 text-xs select-none">
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
