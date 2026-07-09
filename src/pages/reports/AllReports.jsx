import React, { useState, useMemo } from "react";
import {
  SlidersHorizontal,
  ChevronDown,
  Calendar,
  FileSpreadsheet,
  Play,
  Layers,
  Printer,
  Loader2,
  BarChart3,
  ArrowUp,
} from "lucide-react";
import { useQuery, useMutation } from "react-query";
import { generateReports, getReportKeys } from "../../sdk/reports/reports";
import { useToast } from "../../contexts/ToastProvider";

export default function AllReports() {
  const todayStr = new Date().toISOString().split("T")[0];
  const [template, setTemplate] = useState("");
  const [startDate, setStartDate] = useState("2026-01-01");
  const [endDate, setEndDate] = useState(todayStr);
  const [asAt, setAsAt] = useState(todayStr);
  const [reportKeys, setReportKeys] = useState([]);
  const [reportData, setReportData] = useState(null);
  const { showToast } = useToast();

  const [touched, setTouched] = useState({
    template: false,
    startDate: false,
    endDate: false,
    asAt: false,
  });

  const isFormInvalid = !template || !startDate || !endDate || !asAt;

  useQuery({
    queryKey: ["get templates"],
    queryFn: async () => {
      const response = await getReportKeys();
      return response.data?.data?.reports;
    },
    onSuccess: (data) => {
      setReportKeys(data);
    },
    onError: (error) => {
      showToast({
        title: "Failed to load report templates",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationKey: ["generate reports"],
    mutationFn: async () => {
      const response = await generateReports(
        template,
        startDate,
        endDate,
        asAt,
        "json",
      );
      return response.data?.data;
    },
    onSuccess: (data) => {
      setReportData(data);
      showToast({
        title: "Report Generated Successfully",
        type: "success",
        position: "top-right",
        description: "Your document payload is compiled and ready below.",
      });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setReportData(null);
    await mutate();
  };

  const formatCellValue = (value, key) => {
    if (value === null || value === undefined) return "—";

    const lowercaseKey = key.toLowerCase();

    if (lowercaseKey.includes("percent")) {
      return `${Number(value).toFixed(1)}%`;
    }
    if (
      lowercaseKey.includes("balance") ||
      lowercaseKey.includes("amount") ||
      lowercaseKey.includes("volume")
    ) {
      return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    }

    if (lowercaseKey.includes("count") || lowercaseKey.includes("total")) {
      return value.toLocaleString();
    }

    return value;
  };

  const columnTotals = useMemo(() => {
    if (!reportData?.columns || !reportData?.rows) return {};

    const totals = {};
    reportData.columns.forEach((col) => {
      const lowercaseKey = col.key.toLowerCase();
      if (
        (lowercaseKey.includes("count") ||
          lowercaseKey.includes("balance") ||
          lowercaseKey.includes("amount") ||
          lowercaseKey.includes("volume")) &&
        !lowercaseKey.includes("percent")
      ) {
        totals[col.key] = reportData.rows.reduce(
          (acc, row) => acc + (Number(row[col.key]) || 0),
          0,
        );
      } else {
        totals[col.key] = null;
      }
    });
    return totals;
  }, [reportData]);

  const formatReportTitle = (key) => {
    if (!key) return "General Ledger Statement";
    return key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="bg-slate-50 text-slate-800 space-y-6 w-full">
      {/* 1. SUITE HEADER DECK */}
      <div className="flex flex-col sm:gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200/60 pb-4 w-full">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            Compliance Loan Reports
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Compile authenticated credit registries, construct automated loan
            provision vectors, and package data payloads strictly compliant with
            statutory frameworks.
          </p>
        </div>
      </div>

      {/* 2. ENTIRE WIDTH WORKSPACE PANEL */}
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6"
      >
        {/* Header Section */}
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 select-none w-full">
          <SlidersHorizontal size={16} className="text-slate-400" />
          <h3 className="text-[14px] font-bold text-slate-900 tracking-tight">
            Report Options
          </h3>
        </div>

        {/* 3-Column Form Grid (Changed items-end to items-start so error text doesn't misalign boxes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start w-full">
          {/* CELL 1: Report Selection */}
          <div className="space-y-1.5 w-full">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
              Select Report
            </label>
            <div className="relative">
              <select
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                onBlur={() =>
                  setTouched((prev) => ({ ...prev, template: true }))
                }
                className={`w-full h-14 pl-3.5 pr-10 border rounded-xl text-xs font-bold outline-none focus:ring-4 transition-all appearance-none cursor-pointer ${
                  touched.template && !template
                    ? "bg-rose-50/40 border-rose-200 text-rose-900 focus:border-rose-400 focus:ring-rose-900/5"
                    : "bg-slate-50 border-slate-200 text-slate-800 focus:border-slate-400 focus:ring-slate-900/5"
                }`}
                required
              >
                <option value="">Choose a report type...</option>
                {reportKeys?.length > 0 &&
                  reportKeys?.map((key) => (
                    <option key={key?.key} value={key?.key}>
                      {key?.label}
                    </option>
                  ))}
              </select>
              <ChevronDown
                size={14}
                className={`absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                  touched.template && !template
                    ? "text-rose-400"
                    : "text-slate-400"
                }`}
              />
            </div>
            {touched.template && !template && (
              <p className="text-[11px] font-medium text-rose-500 pl-1 select-none animate-in fade-in duration-200">
                Please choose a report type.
              </p>
            )}
          </div>

          {/* CELL 2: Start Date */}
          <div className="space-y-1.5 w-full">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
              Start Date
            </label>
            <div className="relative flex flex-col">
              <div className="relative flex items-center">
                <Calendar
                  size={14}
                  className={`absolute left-3.5 pointer-events-none z-10 ${
                    touched.startDate && !startDate
                      ? "text-rose-400"
                      : "text-slate-400"
                  }`}
                />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  onBlur={() =>
                    setTouched((prev) => ({ ...prev, startDate: true }))
                  }
                  className={`w-full h-14 pl-10 pr-3.5 border rounded-xl text-xs font-bold outline-none focus:ring-4 cursor-pointer transition-all ${
                    touched.startDate && !startDate
                      ? "bg-rose-50/40 border-rose-200 text-rose-900 focus:border-rose-400 focus:ring-rose-900/5"
                      : "bg-slate-50 border-slate-200 text-slate-800 focus:border-slate-400 focus:ring-slate-900/5"
                  }`}
                  required
                />
              </div>
              {touched.startDate && !startDate && (
                <p className="text-[11px] font-medium text-rose-500 pl-1 mt-1.5 select-none animate-in fade-in duration-200">
                  A starting date is required.
                </p>
              )}
            </div>
          </div>

          {/* CELL 3: End Date */}
          <div className="space-y-1.5 w-full">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
              End Date
            </label>
            <div className="relative flex flex-col">
              <div className="relative flex items-center">
                <Calendar
                  size={14}
                  className={`absolute left-3.5 pointer-events-none z-10 ${
                    touched.endDate && !endDate
                      ? "text-rose-400"
                      : "text-slate-400"
                  }`}
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  onBlur={() =>
                    setTouched((prev) => ({ ...prev, endDate: true }))
                  }
                  className={`w-full h-14 pl-10 pr-3.5 border rounded-xl text-xs font-bold outline-none focus:ring-4 cursor-pointer transition-all ${
                    touched.endDate && !endDate
                      ? "bg-rose-50/40 border-rose-200 text-rose-900 focus:border-rose-400 focus:ring-rose-900/5"
                      : "bg-slate-50 border-slate-200 text-slate-800 focus:border-slate-400 focus:ring-slate-900/5"
                  }`}
                  required
                />
              </div>
              {touched.endDate && !endDate && (
                <p className="text-[11px] font-medium text-rose-500 pl-1 mt-1.5 select-none animate-in fade-in duration-200">
                  An ending date is required.
                </p>
              )}
            </div>
          </div>

          {/* CELL 4: As At Date */}
          <div className="space-y-1.5 w-full">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
              As At Date (Snapshot)
            </label>
            <div className="relative flex flex-col">
              <div className="relative flex items-center">
                <Calendar
                  size={14}
                  className={`absolute left-3.5 pointer-events-none z-10 ${
                    touched.asAt && !asAt ? "text-rose-400" : "text-slate-400"
                  }`}
                />
                <input
                  type="date"
                  value={asAt}
                  onChange={(e) => setAsAt(e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, asAt: true }))}
                  className={`w-full h-14 pl-10 pr-3.5 border rounded-xl text-xs font-bold outline-none focus:ring-4 cursor-pointer transition-all ${
                    touched.asAt && !asAt
                      ? "bg-rose-50/40 border-rose-200 text-rose-900 focus:border-rose-400 focus:ring-rose-900/5"
                      : "bg-slate-50 border-slate-200 text-slate-800 focus:border-slate-400 focus:ring-slate-900/5"
                  }`}
                  required
                />
              </div>
              {touched.asAt && !asAt && (
                <p className="text-[11px] font-medium text-rose-500 pl-1 mt-1.5 select-none animate-in fade-in duration-200">
                  Please select a snapshot date.
                </p>
              )}
            </div>
          </div>

          {/* CELL 6: Action Submit Button */}
          <div className="space-y-1.5 w-full">
            <span className="text-[10px] block opacity-0 select-none pointer-events-none hidden lg:block">
              Alignment Spacer
            </span>
            <button
              type="submit"
              disabled={isLoading || isFormInvalid}
              className="w-full h-14 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-sm active:scale-[0.99] disabled:opacity-40 disabled:hover:bg-slate-900 disabled:bg-slate-900 disabled:scale-100 disabled:pointer-events-none select-none cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating Report...</span>
                </>
              ) : (
                <>
                  <Play size={12} fill="currentColor" className="mt-0.5" />
                  <span>Generate Report</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* 3. DYNAMIC RENDERING SHEET CANVAS CANVAS AREA */}
      {isLoading && (
        <div className="w-full bg-white border border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center space-y-3 shadow-2xs">
          <Loader2 className="animate-spin text-slate-900" size={28} />
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Compiling ledger database vectors...
          </p>
        </div>
      )}

      {!reportData && !isLoading && <ReportEmptyState />}

      {reportData && !isLoading && (
        <div className="w-full space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
          {/* Dynamic Meta Info Control Strip */}
          <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex sm:flex-col sm:items-start justify-between gap-4 select-none w-full">
            <div className="flex items-center gap-3">
              <div className="size-9 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold text-xs shadow-inner">
                <Layers size={16} />
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-slate-900 tracking-tight leading-none">
                  {`${formatReportTitle(reportData.meta?.report_key)} Report`}
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {reportData.meta?.as_at && (
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 bg-slate-50 border border-slate-200/60 px-3 py-1.5 rounded-xl">
                  <Calendar size={12} className="text-slate-400" />
                  <span>As Of: {reportData.meta.as_at}</span>
                </div>
              )}
              <div className="flex items-center gap-1 border-l border-slate-200 pl-3">
                <button
                  className="p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-500 transition-colors shadow-2xs"
                  title="Export Excel Sheet"
                >
                  <FileSpreadsheet size={14} />
                </button>
                <button
                  className="p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-500 transition-colors shadow-2xs"
                  title="Print Output Ledger"
                >
                  <Printer size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* High-Fidelity Data Matrix Sheet Table */}
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden w-full">
            <div className="overflow-x-auto w-full">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-slate-50 truncate text-[11px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-200 select-none">
                    {reportData.columns.map((col) => (
                      <th key={col.key} className="py-3.5 px-6 text-left">
                        {String(col.label)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[13px] font-medium text-slate-700">
                  {reportData.rows.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="hover:bg-slate-50/40 transition-colors"
                    >
                      {reportData.columns.map((col) => {
                        const rawValue = formatCellValue(row[col.key], col.key);
                        return (
                          <td
                            key={col.key}
                            className="py-4 truncate px-6 text-left font-semibold text-slate-900"
                          >
                            {String(rawValue)}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-50/60 text-slate-950 text-[14px] font-black border-t border-slate-100 select-none">
                    {reportData.columns.map((col, colIndex) => {
                      const isFirstCell = colIndex === 0;
                      const totalValue = columnTotals[col.key];

                      const rawFooterValue = isFirstCell
                        ? "Total Summary"
                        : totalValue !== null
                          ? formatCellValue(totalValue, col.key)
                          : "—";

                      return (
                        <td
                          key={col.key}
                          className="py-4 px-6 truncate border-b border border-slate-100 text-left font-bold"
                        >
                          {String(rawFooterValue)}
                        </td>
                      );
                    })}
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const ReportEmptyState = () => {
  return (
    <div className="w-full bg-white border border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center text-center shadow-xs min-h-[350px] animate-in fade-in duration-300">
      {/* Muted Premium Icon Loop */}
      <div className="relative mb-4 flex items-center justify-center">
        {/* Subtle glowing ambient ring behind the icon */}
        <div className="absolute size-20 bg-slate-50 border border-slate-100 rounded-full animate-pulse" />

        <div className="relative size-14 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-400 shadow-2xs">
          <BarChart3 size={24} strokeWidth={1.75} />
        </div>

        {/* Playful indicator arrow nudging them upwards towards the form */}
        <div className="absolute -top-1 -right-1 size-5 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center text-white shadow-xs">
          <ArrowUp size={10} strokeWidth={3} />
        </div>
      </div>

      {/* Helper Messaging */}
      <div className="max-w-xs space-y-1">
        <h4 className="text-[14px] font-bold text-slate-900 tracking-tight">
          No Report Generated Yet
        </h4>
        <p className="text-[12px] text-slate-400 font-medium leading-normal">
          Pick your report options from the controls above and click{" "}
          <span className="font-semibold text-slate-600">Generate Report</span>{" "}
          to view your compliance ledger sheet.
        </p>
      </div>
    </div>
  );
};
