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

export default function LoanStatements() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data tracking records updated to current 2026 logs
  const [statements] = useState([
    {
      id: "STMT-9041",
      loan_code: "L00001",
      borrower_name: "Almasi Aluoch",
      product_name: "Development Loan",
      statement_type: "Populated Monthly",
      file_size: "1.4 MB",
      days_count: "31 Days",
      start_date: "2026-05-01",
      end_date: "2026-05-31",
      date_generated: "2026-06-01",
      generated_by: "System Automated",
    },
    {
      id: "STMT-8842",
      loan_code: "L00001",
      borrower_name: "Almasi Aluoch",
      product_name: "Development Loan",
      statement_type: "Generated On-Demand",
      file_size: "2.8 MB",
      days_count: "135 Days",
      start_date: "2026-01-01",
      end_date: "2026-05-15",
      date_generated: "2026-05-15",
      generated_by: "John Kamau",
    },
    {
      id: "STMT-7140",
      loan_code: "L00002",
      borrower_name: "Silas Kipchumba",
      product_name: "Flash Loan",
      statement_type: "Populated Monthly",
      file_size: "620 KB",
      days_count: "30 Days",
      start_date: "2026-04-01",
      end_date: "2026-04-30",
      date_generated: "2026-05-01",
      generated_by: "System Automated",
    },
    {
      id: "STMT-6521",
      loan_code: "L00003",
      borrower_name: "Mercy Wanjiku",
      product_name: "Emergency Loan",
      statement_type: "Generated On-Demand",
      file_size: "940 KB",
      days_count: "14 Days",
      start_date: "2026-05-10",
      end_date: "2026-05-24",
      date_generated: "2026-05-24",
      generated_by: "John Kamau",
    },
    {
      id: "STMT-5912",
      loan_code: "L00004",
      borrower_name: "David Omondi",
      product_name: "Business Support Loan",
      statement_type: "Populated Monthly",
      file_size: "1.9 MB",
      days_count: "31 Days",
      start_date: "2026-03-01",
      end_date: "2026-03-31",
      date_generated: "2026-04-01",
      generated_by: "System Automated",
    },
    {
      id: "STMT-4401",
      loan_code: "L00005",
      borrower_name: "Jane S. Moraa",
      product_name: "Development Loan",
      statement_type: "Populated Monthly",
      file_size: "1.5 MB",
      days_count: "30 Days",
      start_date: "2026-04-01",
      end_date: "2026-04-30",
      date_generated: "2026-05-01",
      generated_by: "System Automated",
    },
    {
      id: "STMT-3982",
      loan_code: "L00006",
      borrower_name: "Rodney Chelal",
      product_name: "Flash Loan",
      statement_type: "Generated On-Demand",
      file_size: "510 KB",
      days_count: "60 Days",
      start_date: "2026-02-01",
      end_date: "2026-04-02",
      date_generated: "2026-04-02",
      generated_by: "Grace Soni",
    },
    {
      id: "STMT-2274",
      loan_code: "L00007",
      borrower_name: "Amina Hussein",
      product_name: "School Fees Loan",
      statement_type: "Populated Monthly",
      file_size: "1.1 MB",
      days_count: "31 Days",
      start_date: "2026-05-01",
      end_date: "2026-05-31",
      date_generated: "2026-06-01",
      generated_by: "System Automated",
    },
    {
      id: "STMT-1905",
      loan_code: "L00008",
      borrower_name: "Brian Mwangi",
      product_name: "Asset Finance Loan",
      statement_type: "Populated Monthly",
      file_size: "2.3 MB",
      days_count: "31 Days",
      start_date: "2026-05-01",
      end_date: "2026-05-31",
      date_generated: "2026-06-01",
      generated_by: "System Automated",
    },
    {
      id: "STMT-1104",
      loan_code: "L00009",
      borrower_name: "Emmanuel Nduati",
      product_name: "Agri-Business Loan",
      statement_type: "Generated On-Demand",
      file_size: "1.7 MB",
      days_count: "90 Days",
      start_date: "2026-03-01",
      end_date: "2026-05-30",
      date_generated: "2026-05-31",
      generated_by: "Grace Soni",
    },
  ]);

  // Basic layout query matching filter
  const filteredStatements = statements.filter(
    (stmt) =>
      stmt.loan_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stmt.product_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
              className="size-10 rounded-xl border border-slate-200/80 bg-white flex items-center justify-center text-slate-500 hover:text-slate-900 shadow-3xs cursor-pointer transition-all active:scale-95"
            >
              <ArrowLeft size={16} />
            </button>
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
                Account Documents Repository
              </span>
              <h1 className="text-xl font-black tracking-tight text-slate-900">
                Loan Account Statements
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
              {filteredStatements.length > 0 ? (
                filteredStatements.map((stmt) => (
                  <tr
                    key={stmt.id}
                    className="group transition-colors hover:bg-slate-50/60"
                  >
                    {/* Column 1: Loan Identity Track (Added Borrower Name) */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center gap-2 select-none">
                          <span className="font-sans font-bold text-[9px] tracking-wider uppercase px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                            {stmt.loan_code}
                          </span>
                          <span className="text-[9px] font-mono font-bold text-slate-400">
                            ID: {stmt.id}
                          </span>
                        </div>
                        <span className="font-semibold text-slate-900 text-sm tracking-tight transition-colors">
                          {stmt.product_name}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          Borrower: {stmt.borrower_name || "Almasi Aluoch"}
                        </span>
                      </div>
                    </td>

                    {/* Column 2: Statement Type (Dot Removed + Added File Footprint Summary) */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col space-y-1 select-none">
                        <span className="font-semibold text-slate-700 text-sm tracking-tight">
                          {stmt.statement_type}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium font-mono">
                          {stmt.file_size || "1.2 MB"} • PDF Format
                        </span>
                      </div>
                    </td>

                    {/* Column 3: Coverage Period (Added Window Day Duration Counter) */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col space-y-1 font-medium text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Calendar
                            size={13}
                            className="text-slate-400 shrink-0"
                          />
                          <span className="font-mono">
                            {new Date(stmt.start_date).toLocaleDateString(
                              "en-KE",
                              { dateStyle: "medium" },
                            )}
                          </span>
                          <span className="text-slate-300 font-normal px-0.5">
                            to
                          </span>
                          <span className="font-mono font-bold text-slate-700">
                            {new Date(stmt.end_date).toLocaleDateString(
                              "en-KE",
                              { dateStyle: "medium" },
                            )}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 pl-5 font-medium">
                          {stmt.days_count || "30 Days"} Accounting Window
                        </span>
                      </div>
                    </td>

                    {/* Column 4: Date Generated (Added Trigger Actor Signature logs) */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col space-y-1 font-medium">
                        <div className="flex items-center gap-1.5 text-slate-500 font-mono">
                          <Clock
                            size={13}
                            className="text-slate-400 shrink-0"
                          />
                          <span>
                            {new Date(stmt.date_generated).toLocaleDateString(
                              "en-KE",
                              { dateStyle: "medium" },
                            )}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 pl-5 font-medium">
                          By: {stmt.generated_by || "System Automated"}
                        </span>
                      </div>
                    </td>

                    {/* Column 5: Action Controls */}
                    <td className="py-4 px-6 text-right pr-8">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() =>
                            console.log("Viewing file inline:", stmt.id)
                          }
                          className="size-8 rounded-xl border border-slate-200/60 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-slate-50 hover:border-slate-300 transition-all shadow-3xs bg-white cursor-pointer"
                          title="Open Document Preview"
                        >
                          <Eye size={13} />
                        </button>
                        <button
                          onClick={() =>
                            console.log(
                              "Downloading local file block copy:",
                              stmt.id,
                            )
                          }
                          className="size-8 rounded-xl border border-slate-200/60 flex items-center justify-center text-slate-500 hover:text-emerald-700 hover:bg-emerald-50/50 hover:border-emerald-200/60 transition-all shadow-3xs bg-white cursor-pointer"
                          title="Download Statement (PDF)"
                        >
                          <Download size={13} />
                        </button>
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
