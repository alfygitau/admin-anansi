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
  Eye,
  X,
  Tag,
  CheckCircle2,
  Globe,
  Shield,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../contexts/ToastProvider";
import { useQuery } from "react-query";
import { getAuditTrails } from "../../sdk/users/users";
import Pagination from "../../components/pagination/Pagination";
import AuditTrailFilter from "../../components/filters/AuditTrailFilter";
import * as Sentry from "@sentry/react";

export default function AuditTrail() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { showToast } = useToast();
  const [showFilters, setShowFilters] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedLog, setSelectedLog] = useState(null);
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
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      setAuditLogs(data?.rows);
      setFilters((prev) => ({
        ...prev,
        page: data.page,
        limit: data.limit,
      }));
      setTotalItems(data.total);
    },
    onError: (error) => {
      console.log(error);
      Sentry.captureException(
        new Error(error?.response?.data?.message || error.message),
        {
          tags: { component: "Audit Trail", action: "All audit trails" },
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
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200/60 pb-2 select-none w-full">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="size-10 rounded-xl border border-slate-200/80 bg-white flex items-center justify-center text-slate-500 hover:text-primary shadow-3xs cursor-pointer transition-all active:scale-95"
            >
              <ArrowLeft size={16} />
            </button>
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
                Security Compliance
              </span>
              <h1 className="text-xl font-black tracking-tight text-primary mt-0.5">
                Audit Logs
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
            className="h-10 px-4 bg-white border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 hover:text-primary transition-all shadow-3xs flex items-center justify-center gap-2 cursor-pointer select-none active:scale-98"
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
            className="h-10 px-4 bg-white border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 hover:text-primary transition-all shadow-3xs flex items-center justify-center gap-2 cursor-pointer select-none active:scale-98"
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
                  <th className="py-4.5 px-6">Actor Type</th>
                  <th className="py-4.5 px-6">Category</th>
                  <th className="py-4.5 px-6 max-w-xs">
                    Detailed Action Description
                  </th>
                  <th className="py-4.5 px-6">IP Address</th>
                  <th className="py-4.5 px-6">Timestamp</th>
                  <th className="py-4.5 px-6 text-right pr-8">Actions</th>
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
                        {/* Col 1: Actor Identity */}
                        <td className="py-4 px-6">
                          <div className="flex flex-col space-y-1.5">
                            <div className="h-3.5 w-24 bg-slate-200 rounded" />
                            <div className="h-3 w-16 bg-slate-100 rounded" />
                          </div>
                        </td>

                        {/* Col 2: Actor Type */}
                        <td className="py-4 px-6 align-middle">
                          <div className="h-5 w-16 bg-slate-200/60 rounded-md" />
                        </td>

                        {/* Col 3: Category */}
                        <td className="py-4 px-6 align-middle">
                          <div className="h-6 w-24 bg-slate-100 rounded-lg" />
                        </td>

                        {/* Col 4: Description */}
                        <td className="py-4 px-6 align-middle max-w-xs">
                          <div className="flex flex-col space-y-1.5">
                            <div className="h-3.5 w-48 bg-slate-200 rounded" />
                            <div className="h-3 w-28 bg-slate-100 rounded" />
                          </div>
                        </td>

                        {/* Col 5: IP Address */}
                        <td className="py-4 px-6 align-middle">
                          <div className="h-5 w-24 bg-slate-200/60 rounded-md" />
                        </td>

                        {/* Col 6: Timestamp */}
                        <td className="py-4 px-6 align-middle">
                          <div className="flex flex-col space-y-1.5">
                            <div className="h-3.5 w-20 bg-slate-200 rounded" />
                            <div className="h-3 w-14 bg-slate-100 rounded" />
                          </div>
                        </td>

                        {/* Col 7: Actions Button */}
                        <td className="py-4 px-6 text-right pr-8 align-middle">
                          <div className="h-8 w-16 bg-slate-200 rounded-xl ml-auto" />
                        </td>
                      </tr>
                    ))
                ) : auditLogs.length > 0 ? (
                  auditLogs.map((log) => (
                    <tr
                      key={log.id}
                      className="group transition-colors hover:bg-slate-50/60"
                    >
                      {/* Column 1: User / Executing Actor Details */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-slate-900 text-xs">
                              {log.userName || log.user}
                            </span>
                            {log.role && (
                              <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200/60">
                                {log.role}
                              </span>
                            )}
                          </div>
                          <span className="font-mono text-[10px] text-slate-400">
                            {log.displayUserId || log.userId}
                          </span>
                        </div>
                      </td>

                      {/* Column 2: Actor Type */}
                      <td className="py-4 px-6 align-middle select-none">
                        <span
                          className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase ${
                            log.actorType === "ADMIN"
                              ? "bg-purple-50 text-purple-700 border-purple-200/60"
                              : "bg-slate-100 text-slate-700 border-slate-200"
                          }`}
                        >
                          {log.actorType || "SYSTEM"}
                        </span>
                      </td>

                      {/* Column 3: Category Badge */}
                      <td className="py-4 px-6 align-middle select-none">
                        <span className="font-semibold text-slate-700 tracking-tight text-[11px] bg-slate-50 border border-slate-200/60 px-2 py-1 rounded-lg">
                          {log.category}
                        </span>
                      </td>

                      {/* Column 4: Action Description Narrative */}
                      <td className="py-4 px-6 align-middle max-w-xs md:max-w-md">
                        <div className="flex flex-col space-y-0.5">
                          <span className="font-medium text-slate-700 text-xs leading-relaxed">
                            {log.description || log.actionLabel}
                          </span>
                          <span className="text-[9px] font-mono text-slate-400 select-none">
                            ID: {log.id}
                          </span>
                        </div>
                      </td>

                      {/* Column 5: IP Address Tag */}
                      <td className="py-4 px-6 align-middle font-mono select-none">
                        <span className="text-xs font-bold text-slate-700 bg-slate-100/80 border border-slate-200 px-2 py-0.5 rounded-md">
                          {log.ipAddress || "N/A"}
                        </span>
                      </td>

                      {/* Column 6: Timestamp */}
                      <td className="py-4 px-6 align-middle select-none">
                        <div className="flex flex-col space-y-0.5 font-mono font-medium text-slate-500">
                          <span className="text-xs font-bold text-slate-700">
                            {log.date
                              ? new Date(log.date).toLocaleDateString("en-KE", {
                                  dateStyle: "medium",
                                })
                              : "—"}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {log.time}
                          </span>
                        </div>
                      </td>

                      {/* Column 7: Actions Button */}
                      <td className="py-4 px-6 text-right pr-8 align-middle select-none">
                        <button
                          type="button"
                          onClick={() => setSelectedLog(log)}
                          className="h-8 px-3 rounded-xl bg-slate-50 border border-slate-200 hover:bg-[#074073] hover:text-white hover:border-[#074073] text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 ml-auto cursor-pointer shadow-3xs active:scale-98"
                        >
                          <Eye size={13} />
                          <span>Inspect</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-20 text-center text-slate-400 font-medium select-none"
                    >
                      <div className="flex flex-col items-center justify-center space-y-1">
                        <p className="text-xs font-bold text-slate-700">
                          No audit logs found
                        </p>
                        <p className="text-xs text-slate-400">
                          There are currently no log entries matching your
                          active filter combinations.
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

      {selectedLog && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
          {/* Backdrop Click */}
          <div
            className="absolute inset-0"
            onClick={() => setSelectedLog(null)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-[500px] bg-white border-l border-slate-200/80 shadow-2xl flex flex-col justify-between select-none animate-in slide-in-from-right duration-250">
              {/* DRAWER HEADER */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-blue-50 text-[#074073] border border-blue-100 rounded-xl">
                    <Activity size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">
                      Audit Log Trace Details
                    </h3>
                    <p className="font-mono text-[10px] text-slate-400 truncate max-w-[200px]">
                      {selectedLog.id}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedLog(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* DRAWER BODY */}
              <div className="p-6 overflow-y-auto space-y-5 flex-1 font-sans text-xs">
                {/* Section 1: User & Actor Info */}
                <div className="bg-slate-50/80 rounded-2xl border border-slate-200/60 p-4 space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                    <User size={13} className="text-[#074073]" />
                    <span>Actor Metadata</span>
                  </span>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[10px] text-slate-400 font-medium block">
                        Full Name
                      </span>
                      <span className="font-bold text-slate-900 text-xs">
                        {selectedLog.userName || selectedLog.user}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 font-medium block">
                        Assigned Role
                      </span>
                      <span className="font-bold text-slate-800 text-xs">
                        {selectedLog.role || "N/A"}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 font-medium block">
                        Public User ID
                      </span>
                      <span className="font-mono font-semibold text-slate-700 text-xs">
                        {selectedLog.displayUserId || "N/A"}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 font-medium block">
                        Actor Scope Type
                      </span>
                      <span className="font-mono text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200/60 w-fit block mt-0.5">
                        {selectedLog.actorType || "SYSTEM"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Section 2: Action Breakdown */}
                <div className="bg-slate-50/80 rounded-2xl border border-slate-200/60 p-4 space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                    <Tag size={13} className="text-[#074073]" />
                    <span>Action Parameters</span>
                  </span>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[10px] text-slate-400 font-medium block">
                        Action Category
                      </span>
                      <span className="font-semibold text-slate-800">
                        {selectedLog.category}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 font-medium block">
                        Action Code
                      </span>
                      <span className="font-mono font-bold text-[#074073] bg-blue-50 px-2 py-0.5 rounded border border-blue-100/60 w-fit block mt-0.5">
                        {selectedLog.actionCode}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 font-medium block">
                        Action Label
                      </span>
                      <span className="font-bold text-slate-800">
                        {selectedLog.actionLabel || selectedLog.action}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 font-medium block">
                        Outcome
                      </span>
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60 text-[10px] uppercase mt-0.5">
                        <CheckCircle2 size={11} />
                        {selectedLog.outcome || "Success"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Section 3: Action Description Narrative */}
                <div className="bg-slate-50/80 rounded-2xl border border-slate-200/60 p-4 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                    <FileText size={13} className="text-[#074073]" />
                    <span>Narrative Summary</span>
                  </span>
                  <p className="text-xs font-medium text-slate-800 leading-relaxed pt-1">
                    {selectedLog.description}
                  </p>
                </div>

                {/* Section 4: Network & Security Info */}
                <div className="bg-slate-50/80 rounded-2xl border border-slate-200/60 p-4 space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                    <Globe size={13} className="text-[#074073]" />
                    <span>Network & Security Origin</span>
                  </span>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[10px] text-slate-400 font-medium block">
                        IP Address
                      </span>
                      <span className="font-mono font-bold text-slate-800 text-xs bg-white px-2.5 py-1 rounded-lg border border-slate-200 inline-block mt-0.5">
                        {selectedLog.ipAddress || "N/A"}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 font-medium block">
                        ISO Timestamp
                      </span>
                      <span className="font-mono text-[10px] text-slate-600 block mt-1 truncate">
                        {selectedLog.fullTimestamp || selectedLog.dateTime}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Section 5: Change Set Payload */}
                <div className="bg-slate-50/80 rounded-2xl border border-slate-200/60 p-4 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                    <Shield size={13} className="text-[#074073]" />
                    <span>Payload & Delta Changes</span>
                  </span>

                  {selectedLog.hasChanges && selectedLog.changes?.length > 0 ? (
                    <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl text-[10px] font-mono overflow-x-auto">
                      {JSON.stringify(selectedLog.changes, null, 2)}
                    </pre>
                  ) : (
                    <div className="p-3 bg-white rounded-xl border border-slate-200/60 text-[11px] text-slate-400 italic">
                      No structural data changes recorded for this action.
                    </div>
                  )}
                </div>
              </div>

              {/* DRAWER FOOTER */}
              <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedLog(null)}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-[#074073] text-white rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer active:scale-98"
                >
                  Close Inspection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
