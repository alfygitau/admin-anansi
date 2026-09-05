import React, { useState } from "react";
import {
  ArrowLeft,
  Download,
  Eye,
  FileText,
  Calendar,
  Clock,
  Search,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useToast } from "../../../contexts/ToastProvider";
import { getLoanStatements } from "../../../sdk/loans/loans";

export default function LoanStatements() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { showToast } = useToast();
  const [totalItems, setTotalItems] = useState(0);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    loan_code: "",
    loan_type: "",
    status: [],
    fromDate: "",
    toDate: "",
  });

  const [statements, setStatements] = useState([]);

  const { idFetching } = useQuery({
    queryKey: [
      "loan statements",
      filters?.page,
      filters?.limit,
      filters?.status?.join(","),
      filters?.loan_code,
      filters?.loan_type,
      filters?.fromDate,
      filters?.toDate,
    ],
    queryFn: async () => {
      const response = await getLoanStatements(
        filters?.page,
        filters?.limit,
        filters?.status?.join(","),
        filters?.loan_code,
        filters?.loan_type,
        filters?.fromDate,
        filters?.toDate,
      );
      return response.data?.data;
    },
    onSuccess: (data) => {
      setStatements(data?.statements);
      setFilters((prev) => ({
        ...prev,
        page: data?.page,
        limit: data?.limit,
      }));
      setTotalItems(data.total);
    },
    onError: (error) => {
      showToast({
        title: "Loan statements processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const cleanStr = String(dateStr).split("T")[0].replace(/-/g, "/");
    const parsed = new Date(cleanStr);
    return isNaN(parsed.getTime())
      ? "N/A"
      : parsed.toLocaleDateString("en-KE", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
  };

  // Safe Days Counter Helper
  const calculateWindowDays = (fromStr, toStr) => {
    if (!fromStr || !toStr) return 0;
    const from = new Date(String(fromStr).replace(/-/g, "/"));
    const to = new Date(String(toStr).replace(/-/g, "/"));
    if (isNaN(from.getTime()) || isNaN(to.getTime())) return 0;
    return Math.ceil(Math.abs(to - from) / (1000 * 60 * 60 * 24)) + 1;
  };

  return (
    <div className="w-full space-y-6 font-sans antialiased text-slate-800">
      {/* 1. WELCOMING HEADER ACTION AREA */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200/60 pb-5 select-none">
        {/* 1. TOP PROCESS NAVIGATION BAR WITH OPPOSITE ACTION ACTIONS */}
        <div className="flex sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-5 select-none w-full">
          {/* Left Side: Back Navigation & Context Titles */}
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
                Account Documents Repository
              </span>
              <h1 className="text-xl font-black tracking-tight text-primary">
                Loan Statements
              </h1>
            </div>
          </div>

          {/* Right Side: Premium Statement Generation Action Button */}
          <button
            type="button"
            onClick={() =>
              console.log("Initializing statement generation flow...")
            }
            className="h-10 px-5 bg-[#074073] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md shadow-[#074073]/10 hover:bg-[#052d52] transition-all active:scale-97 cursor-pointer flex items-center justify-center gap-2"
          >
            <Plus size={14} strokeWidth={2.5} />
            <span>Generate Statement</span>
          </button>
        </div>

        {/* COMPACT SEARCH FILTER ELEMENT */}
        <div className="relative w-full sm:w-64 group">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
          />
          <input
            type="text"
            placeholder="Search code or product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-9 pr-4 bg-slate-50/60 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none transition-all focus:bg-white focus:border-primary placeholder:text-slate-400 placeholder:font-normal shadow-3xs"
          />
        </div>
      </div>

      {/* 2. THE PREMIUM STATEMENTS DATA TABLE INTERFACE */}
      <div className="bg-white border border-slate-200/60 shadow-sm rounded-[24px] overflow-hidden w-full">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans table-auto">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200/60 text-[10px] font-bold text-slate-400 uppercase tracking-widest select-none">
                <th className="py-4.5 px-6">Loan Account & Product</th>
                <th className="py-4.5 px-6">Statement Type</th>
                <th className="py-4.5 px-6">Coverage Period</th>
                <th className="py-4.5 px-6">Date Generated</th>
                <th className="py-4.5 px-6 text-right pr-8">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-xs tracking-tight">
              {statements.length > 0 ? (
                statements.map((item, index) => {
                  const header = item?.header || {};
                  const daysCount = calculateWindowDays(
                    header.statement_from,
                    header.statement_to,
                  );

                  return (
                    <tr
                      key={header.loan_code || index}
                      className="group transition-colors hover:bg-slate-50/60"
                    >
                      {/* Column 1: Loan Identity */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center gap-2 select-none">
                            <span className="font-sans font-bold text-[9px] tracking-wider uppercase px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                              {header.loan_code || "N/A"}
                            </span>
                            <span className="text-[9px] font-mono font-bold text-slate-400">
                              ID:{" "}
                              {header.customer_id
                                ? `${header.customer_id.substring(0, 8)}...`
                                : "N/A"}
                            </span>
                          </div>
                          <span className="font-semibold text-primary text-sm tracking-tight">
                            {header.product_name || "Loan Facility"}
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium">
                            Borrower: {header.member_name || "N/A"}
                          </span>
                        </div>
                      </td>

                      {/* Column 2: Statement Meta */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col space-y-1 select-none">
                          <span className="font-semibold text-slate-700 text-sm tracking-tight">
                            On-Demand Statement
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium font-mono">
                            PDF Format • On-Demand
                          </span>
                        </div>
                      </td>

                      {/* Column 3: Coverage Period */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col space-y-1 font-medium text-slate-600">
                          <div className="flex items-center gap-1.5">
                            <Calendar
                              size={13}
                              className="text-slate-400 shrink-0"
                            />
                            <span className="font-mono">
                              {formatDate(header.statement_from)}
                            </span>
                            <span className="text-slate-300 font-normal px-0.5">
                              to
                            </span>
                            <span className="font-mono font-bold text-slate-700">
                              {formatDate(header.statement_to)}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400 pl-5 font-medium">
                            {daysCount} Days Accounting Window
                          </span>
                        </div>
                      </td>

                      {/* Column 4: Date Generated */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col space-y-1 font-medium">
                          <div className="flex items-center gap-1.5 text-slate-500 font-mono">
                            <Clock
                              size={13}
                              className="text-slate-400 shrink-0"
                            />
                            <span>{formatDate(header.statement_date)}</span>
                          </div>
                          <span className="text-[11px] text-slate-400 pl-5 font-medium">
                            By: System Automated
                          </span>
                        </div>
                      </td>

                      {/* Column 5: Action Buttons */}
                      <td className="py-4 px-6 text-right pr-8">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            className="size-8 rounded-xl border border-slate-200/60 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-slate-50 hover:border-slate-300 transition-all shadow-3xs bg-white cursor-pointer"
                            title="Open Document Preview"
                          >
                            <Eye size={13} />
                          </button>
                          <button
                            type="button"
                            className="size-8 rounded-xl border border-slate-200/60 flex items-center justify-center text-slate-500 hover:text-emerald-700 hover:bg-emerald-50/50 hover:border-emerald-200/60 transition-all shadow-3xs bg-white cursor-pointer"
                            title="Download Statement (PDF)"
                          >
                            <Download size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="py-12 text-center text-slate-400 font-medium select-none"
                  >
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <FileText size={24} className="text-slate-300" />
                      <p className="text-xs">
                        No loan statement records match your active query.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
