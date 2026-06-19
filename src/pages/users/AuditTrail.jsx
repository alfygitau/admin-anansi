import React, { useState } from "react";
import {
  ArrowLeft,
  Search,
  User,
  Clock,
  Calendar,
  Activity,
  ShieldAlert,
  FileText,
  Filter,
  Download,
  Sliders,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../contexts/ToastProvider";
import { useQuery } from "react-query";
import { getAuditTrails } from "../../sdk/users/users";
import Pagination from "../../components/pagination/Pagination";
import AuditTrailFilter from "../../components/filters/AuditTrailFilter";

export default function AuditTrail() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { showToast } = useToast();
  const [showFilters, setShowFilters] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    q: "",
    username: "",
    fromDate: "",
    toDate: "",
    adminUsername: "",
    actionCode: "",
    category: "",
  });

  // Sample data array expanded to 10 typical SACCO security track items
  const [auditLogs, setAuditLogs] = useState([]);

  const { isFetching } = useQuery({
    queryKey: [
      "get trails",
      filters?.page,
      filters.limit,
      filters?.q,
      filters?.username,
      filters?.category,
      filters?.actionCode,
      filters?.adminUsername,
      filters?.fromDate,
      filters?.toDate,
    ],
    queryFn: async () => {
      const response = await getAuditTrails(
        filters?.page,
        filters.limit,
        filters?.q,
        filters?.username,
        filters?.category,
        filters?.actionCode,
        filters?.adminUsername,
        filters?.fromDate,
        filters?.toDate,
      );
      return response.data?.data;
    },
    onSuccess: (data) => {
      setAuditLogs(data?.rows);
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

  return (
    <>
      <AuditTrailFilter
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        setFilters={setFilters}
      />

      <div className="w-full space-y-6 font-sans antialiased text-slate-800">
        {/* 1. TOP PROCESS NAVIGATION HEADER CONTROL BLOCK */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200/60 pb-5 select-none w-full">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="size-10 rounded-xl border border-slate-200/80 bg-white flex items-center justify-center text-slate-500 hover:text-slate-900 shadow-3xs cursor-pointer transition-all active:scale-95"
            >
              <ArrowLeft size={16} />
            </button>
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
                Security Compliance Desk
              </span>
              <h1 className="text-xl font-black tracking-tight text-slate-900 mt-0.5">
                System Audit Logs
              </h1>
            </div>
          </div>
        </div>

        {/* CONTROLS AREA: DUAL FILTERS LAYER */}
        <div className="flex justify-between sm:flex-row items-center gap-3 w-full lg:w-auto">
          {/* QUICK INPUT SEARCH ENGINE */}
          <div className="relative w-full sm:w-64 group">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#074073] transition-colors"
            />
            <input
              type="text"
              placeholder="Search user, action, or code..."
              value={filters?.q}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  q: e.target.value,
                }))
              }
              className="w-72 h-10 pl-9 pr-4 bg-slate-50/60 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none transition-all focus:bg-white focus:border-[#074073] placeholder:text-slate-400 placeholder:font-normal shadow-3xs"
            />
          </div>

          {/* FILTER SELECTION BUTTON */}
          <button
            type="button"
            onClick={() => setShowFilters(true)}
            className="h-10 px-4 bg-white border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-all shadow-3xs flex items-center justify-center gap-2 cursor-pointer select-none active:scale-98"
          >
            <Sliders size={13} className="text-slate-400" />
            <span>Filter</span>
          </button>

          {/* EXPORT FILE BUTTON */}
          <button
            type="button"
            onClick={() =>
              console.log("Exporting search results data sheet...")
            }
            className="h-10 px-4 bg-white border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-all shadow-3xs flex items-center justify-center gap-2 cursor-pointer select-none active:scale-98"
          >
            <Download size={13} className="text-slate-400" />
            <span>Export</span>
          </button>
        </div>

        {/* 3. PREMIUM AUDIT WORKSPACE TRACE DATA TABLE */}
        <div className="bg-white border border-slate-200/60 shadow-sm rounded-[24px] overflow-hidden w-full">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans table-auto">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200/60 text-[10px] font-bold text-slate-400 uppercase tracking-widest select-none">
                  <th className="py-4.5 px-6">User / Executing Actor</th>
                  <th className="py-4.5 px-6">Operation Category</th>
                  <th className="py-4.5 px-6 max-w-sm">
                    Detailed Action Description
                  </th>
                  <th className="py-4.5 px-6">System Security Key</th>
                  <th className="py-4.5 px-6 text-right pr-8">Timestamp</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-xs tracking-tight">
                {isFetching ? (
                  Array(10)
                    .fill(0)
                    .map((_, index) => (
                      <tr
                        key={`audit-skeleton-${index}`}
                        className="animate-pulse border-b border-slate-100 last:border-none"
                      >
                        {/* Column 1: Staff Member Identity Skeleton */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            {/* Avatar Icon Box Mock */}
                            <div className="size-8 rounded-xl bg-slate-100 shrink-0" />
                            <div className="flex flex-col space-y-2">
                              {/* Username Line */}
                              <div className="h-3.5 w-24 bg-slate-200 rounded" />
                              {/* Optional Supervisor Authorization Subline */}
                              <div className="h-3 w-32 bg-slate-100 rounded" />
                            </div>
                          </div>
                        </td>

                        {/* Column 2: Category Badge Skeleton */}
                        <td className="py-4 px-6 align-middle">
                          <div className="h-6 w-28 bg-slate-100 rounded-lg" />
                        </td>

                        {/* Column 3: Activity Description Narrative Skeleton */}
                        <td className="py-4 px-6 align-middle max-w-xs md:max-w-md">
                          <div className="flex flex-col space-y-2">
                            {/* Main Description Line */}
                            <div className="h-3.5 w-5/6 bg-slate-200 rounded" />
                            {/* Internal Log Reference Hash Line */}
                            <div className="h-3 w-1/2 bg-slate-100 rounded" />
                          </div>
                        </td>

                        {/* Column 4: System Action Code Tag Skeleton */}
                        <td className="py-4 px-6 align-middle">
                          <div className="h-5 w-36 bg-slate-200/60 rounded-md" />
                        </td>

                        {/* Column 5: Date and Time Right-Aligned Skeleton */}
                        <td className="py-4 px-6 text-right pr-8 align-middle">
                          <div className="flex flex-col items-end space-y-2">
                            {/* Date Stamp Block */}
                            <div className="h-3.5 w-20 bg-slate-200 rounded" />
                            {/* Time Stamp Block */}
                            <div className="h-3 w-14 bg-slate-100 rounded" />
                          </div>
                        </td>
                      </tr>
                    ))
                ) : auditLogs.length > 0 ? (
                  auditLogs.map((log) => (
                    <tr
                      key={log.id}
                      className="group transition-colors hover:bg-slate-50/60"
                    >
                      {/* Column 1: Actor Identity Track */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-xl bg-slate-50 border border-slate-200/40 flex items-center justify-center text-slate-400 shrink-0 group-hover:bg-blue-50 group-hover:text-[#074073] transition-colors">
                            <User size={13} />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900 text-sm tracking-tight transition-colors">
                              {log.username}
                            </span>
                            {log.adminUsername && (
                              <span className="text-[10px] text-amber-700 font-semibold bg-amber-50 px-1 py-0.5 rounded border border-amber-100/50 w-fit mt-0.5">
                                Elevated Sign: {log.adminUsername}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Column 2: Operation Category Badge Grid */}
                      <td className="py-4 px-6 align-middle select-none">
                        <span className="font-semibold text-slate-700 tracking-tight text-[11px] bg-slate-50 border border-slate-200/60 px-2 py-1 rounded-lg">
                          {log.category}
                        </span>
                      </td>

                      {/* Column 3: Plain Unwrapped Action Description Narrative text */}
                      <td className="py-4 px-6 align-middle max-w-xs md:max-w-md">
                        <div className="flex flex-col space-y-0.5">
                          <span className="font-medium text-slate-700 text-xs leading-relaxed">
                            {log.description}
                          </span>
                          <span className="text-[9px] font-mono text-slate-400 select-none">
                            Trace Transaction ID: {log.id}
                          </span>
                        </div>
                      </td>

                      {/* Column 4: Immutable System Code Tag Component */}
                      <td className="py-4 px-6 align-middle select-none">
                        <span className="font-mono text-[10px] font-bold text-[#074073] bg-blue-50/70 border border-blue-100/60 px-2 py-0.5 rounded-md">
                          {log.actionCode}
                        </span>
                      </td>

                      {/* Column 5: Calendar Clock Dual Metric Logs Output row */}
                      <td className="py-4 px-6 text-right pr-8 align-middle select-none">
                        <div className="flex flex-col items-end space-y-0.5 font-mono font-medium text-slate-500">
                          <div className="flex items-center gap-1.5 justify-end">
                            <Calendar
                              size={12}
                              className="text-slate-400 shrink-0"
                            />
                            <span>
                              {new Date(log.date).toLocaleDateString("en-KE", {
                                dateStyle: "medium",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 justify-end text-slate-400 text-[11px]">
                            <Clock
                              size={12}
                              className="text-slate-300 shrink-0"
                            />
                            <span>{log.time}</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-12 text-center text-slate-400 font-medium select-none"
                    >
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <FileText size={24} className="text-slate-300" />
                        <p className="text-xs">
                          No historical audit files match your active filter
                          combinations.
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
      </div>
    </>
  );
}

/* ==========================================================================
   SUPPORTIVE CHILD SUMMARY BANNER WRAPPER
   ========================================================================== */

const SummaryBannerBlock = ({ label, icon, children }) => (
  <div className="bg-white border border-slate-200/60 shadow-sm rounded-[20px] p-4.5 flex items-start gap-3.5 w-full h-full justify-start">
    <div className="size-8 rounded-xl bg-slate-50 border border-slate-200/40 flex items-center justify-center text-slate-400 shrink-0 mt-0.5 shadow-3xs">
      {React.cloneElement(icon, { size: 14 })}
    </div>
    <div className="min-w-0 flex-1">
      <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 block pb-1">
        {label}
      </span>
      {children}
    </div>
  </div>
);
