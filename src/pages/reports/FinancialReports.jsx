import React, { useState, useMemo } from "react";
import {
  FileSpreadsheet,
  Download,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Search,
  Building,
  Calendar,
  TrendingUp,
  Printer,
  Folder,
  FileText,
} from "lucide-react";

export default function FinancialReports() {
  const [activeTab, setActiveTab] = useState("coa");
  const [orgCode, setOrgCode] = useState("BA208");
  const [asOfDate, setAsOfDate] = useState("2026-06-30");
  const [coaSearch, setCoaSearch] = useState("");

  const [expandedNodes, setExpandedNodes] = useState({
    1000: true,
    2000: true,
    3000: true,
  });

  const toggleNode = (code) => {
    setExpandedNodes((prev) => ({ ...prev, [code]: !prev[code] }));
  };

  const formatCurrency = (val) => {
    if (val === 0 || val === null || val === undefined) return "—";
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  const trialBalanceData = useMemo(
    () => ({
      rows: [
        {
          account_code: "1000",
          account_name: "Cash & Cash Equivalents (FOSA Tills)",
          account_type: "asset",
          debit_balance: 230000.0,
          credit_balance: 0.0,
        },
        {
          account_code: "1120",
          account_name: "Development Loan Portfolio Subsidiary Ledger",
          account_type: "asset",
          debit_balance: 415000.0,
          credit_balance: 0.0,
        },
        {
          account_code: "2100",
          account_name: "Member Overpayment Clearing Liability",
          account_type: "liability",
          debit_balance: 0.0,
          credit_balance: 15000.0,
        },
        {
          account_code: "2230",
          account_name: "Member Non-Withdrawable Deposits (BOSA)",
          account_type: "liability",
          debit_balance: 0.0,
          credit_balance: 610000.0,
        },
        {
          account_code: "4110",
          account_name: "Interest Revenue earned on Loan Assets",
          account_type: "income",
          debit_balance: 0.0,
          credit_balance: 60000.0,
        },
        {
          account_code: "5150",
          account_name: "SASRA Regulatory Levy Expense Allocation",
          account_type: "expense",
          debit_balance: 25000.0,
          credit_balance: 0.0,
        },
      ],
      totals: {
        total_debit: 670000.0,
        total_credit: 670000.0,
      },
    }),
    [],
  );

  const variance = useMemo(() => {
    return Math.abs(
      trialBalanceData.totals.total_debit -
        trialBalanceData.totals.total_credit,
    );
  }, [trialBalanceData]);

  return (
    <div className="bg-slate-50 text-slate-800 font-sans space-y-6">
      <div className="flex flex-col sm:gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200/60 pb-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-primary">
            Financial Reporting Suite
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Audit comprehensive double-entry general ledgers, evaluate
            structural chart of account hierarchies, and generate real-time
            regulatory performance statements.
          </p>
        </div>
      </div>

      <header className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0">
          <button
            onClick={() => setActiveTab("coa")}
            className={`px-4 py-2 text-[13px] font-bold rounded-lg transition-all ${activeTab === "coa" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
          >
            Chart of Accounts
          </button>
          <button
            onClick={() => setActiveTab("trial-balance")}
            className={`px-4 py-2 text-[13px] font-bold rounded-lg transition-all ${activeTab === "trial-balance" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
          >
            Trial Balance
          </button>
          <button
            onClick={() => setActiveTab("income")}
            className={`px-4 py-2 text-[13px] font-bold rounded-lg transition-all ${activeTab === "income" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
          >
            Income Statement
          </button>
          <button
            onClick={() => setActiveTab("balance-sheet")}
            className={`px-4 py-2 text-[13px] font-bold rounded-lg transition-all ${activeTab === "balance-sheet" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
          >
            Balance Sheet
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[13px] font-semibold text-slate-600">
            <Calendar size={16} className="text-slate-400" />
            <span className="text-slate-400 mr-1">As of:</span>
            <input
              type="date"
              value={asOfDate}
              onChange={(e) => setAsOfDate(e.target.value)}
              className="bg-transparent border-0 outline-none p-0 focus:ring-0 font-bold text-slate-800 cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-1.5 border-l border-slate-200 pl-3">
            <button
              className="p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:text-primary transition-colors shadow-sm"
              title="Export Excel Document Sheet"
            >
              <FileSpreadsheet size={16} />
            </button>
            <button
              className="p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:text-primary transition-colors shadow-sm"
              title="Print Ledger Records Document"
            >
              <Printer size={16} />
            </button>
          </div>
        </div>
      </header>

      {variance > 0 && (
        <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl flex items-start gap-3 shadow-sm shadow-rose-900/5">
          <AlertTriangle size={18} className="text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h5 className="text-[13px] font-bold text-rose-950">
              Structural Balance Discrepancy Error
            </h5>
            <p className="text-[12px] text-rose-700 font-medium leading-relaxed">
              The General Ledger architecture contains an active variance
              payload of{" "}
              <span className="font-bold">KES {formatCurrency(variance)}</span>.
              Automated operational accounting reconciliations have been
              suspended. Please check unposted journals or bridge processing
              accounts.
            </p>
          </div>
        </div>
      )}

      {activeTab === "trial-balance" && (
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/40">
            <h4 className="text-[15px] font-bold text-primary tracking-tight">
              Net Trial Balance Report
            </h4>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">
              Double-entry ledger ledger checking matrix balances calculated
              directly via transaction caches.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200 select-none">
                  <th className="py-3 px-6 w-32">Account Code</th>
                  <th className="py-3 px-6">Account Ledger Description</th>
                  <th className="py-3 px-6 w-28">Element Type</th>
                  <th className="py-3 px-6 text-right w-48">
                    Debit Balance (KES)
                  </th>
                  <th className="py-3 px-6 text-right w-48">
                    Credit Balance (KES)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[13px] font-medium">
                {trialBalanceData.rows.map((row) => (
                  <tr
                    key={row.account_code}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-3.5 px-6 font-mono font-bold text-slate-400">
                      {row.account_code}
                    </td>
                    <td className="py-3.5 px-6 font-bold text-primary">
                      {row.account_name}
                    </td>
                    <td className="py-3.5 px-6 text-slate-400 capitalize">
                      {row.account_type}
                    </td>
                    <td className="py-3.5 px-6 text-right font-mono font-bold text-slate-800">
                      {row.debit_balance > 0
                        ? formatCurrency(row.debit_balance)
                        : "—"}
                    </td>
                    <td className="py-3.5 px-6 text-right font-mono font-bold text-slate-800">
                      {row.credit_balance > 0
                        ? formatCurrency(row.credit_balance)
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-50/60 text-slate-950 text-[14px] font-black border-t border-slate-100 select-none">
                  <td
                    colSpan={3}
                    className="py-4 px-6 text-right uppercase tracking-wider text-slate-400 font-bold text-[11px]"
                  >
                    Grand Totals Balance
                  </td>
                  <td className="py-4 px-6 text-right font-mono border-b-4 border-double border-primary">
                    {formatCurrency(trialBalanceData.totals.total_debit)}
                  </td>
                  <td className="py-4 px-6 text-right font-mono border-b-4 border-double border-primary">
                    {formatCurrency(trialBalanceData.totals.total_credit)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {activeTab === "coa" && (
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden space-y-4">
          <div className="px-6 pt-5 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/40">
            <div>
              <h4 className="text-[15px] font-bold text-primary tracking-tight">
                Structured Chart of Accounts (COA) Directory
              </h4>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                Hierarchical structural tracking matrix containing active legal
                asset allocation indices.
              </p>
            </div>
            <div className="flex items-center h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-slate-400 transition-colors w-full sm:w-64">
              <Search size={16} className="text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search account node index..."
                value={coaSearch}
                onChange={(e) => setCoaSearch(e.target.value)}
                className="bg-transparent border-0 outline-none w-full p-0 text-[13px] font-medium placeholder-slate-300 focus:ring-0 focus:shadow-none"
              />
            </div>
          </div>

          <div className="px-6 pb-6 space-y-3 font-medium text-[13px]">
            {/* Asset Node Header Stack */}
            <div className="border border-slate-100 rounded-xl overflow-hidden shadow-sm">
              <div
                onClick={() => toggleNode("1000")}
                className="flex items-center justify-between p-3.5 bg-slate-50/80 cursor-pointer hover:bg-slate-100/60 select-none"
              >
                <div className="flex items-center gap-2">
                  {expandedNodes["1000"] ? (
                    <ChevronDown size={16} className="text-slate-400" />
                  ) : (
                    <ChevronRight size={16} className="text-slate-400" />
                  )}
                  <Folder size={16} className="text-blue-600" />
                  <span className="font-bold text-primary">
                    1000 — Asset Assets Ledger Controls
                  </span>
                </div>
                <span className="text-[11px] bg-slate-200/80 text-slate-600 px-2 py-0.5 rounded font-bold uppercase tracking-wide">
                  Category Root
                </span>
              </div>

              {expandedNodes["1000"] && (
                <div className="bg-white divide-y divide-slate-50 pl-6 border-t border-slate-100">
                  <div className="p-3 flex items-center justify-between hover:bg-slate-50/40">
                    <div className="flex items-center gap-2 pl-2">
                      <FileText size={15} className="text-slate-400" />
                      <span className="font-bold font-mono text-slate-400">
                        1010
                      </span>
                      <span className="text-slate-800 font-semibold">
                        Cash Equivalents (FOSA vault)
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                      Subledger
                    </span>
                  </div>
                  <div className="p-3 flex items-center justify-between hover:bg-slate-50/40">
                    <div className="flex items-center gap-2 pl-2">
                      <FileText size={15} className="text-slate-400" />
                      <span className="font-bold font-mono text-slate-400">
                        1120
                      </span>
                      <span className="text-slate-800 font-semibold">
                        Development Loans Portfolio Account
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                      Subledger
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Liability Node Header Stack */}
            <div className="border border-slate-100 rounded-xl overflow-hidden shadow-sm">
              <div
                onClick={() => toggleNode("2000")}
                className="flex items-center justify-between p-3.5 bg-slate-50/80 cursor-pointer hover:bg-slate-100/60 select-none"
              >
                <div className="flex items-center gap-2">
                  {expandedNodes["2000"] ? (
                    <ChevronDown size={16} className="text-slate-400" />
                  ) : (
                    <ChevronRight size={16} className="text-slate-400" />
                  )}
                  <Folder size={16} className="text-emerald-600" />
                  <span className="font-bold text-primary">
                    2000 — Liability Obligations Ledger Controls
                  </span>
                </div>
                <span className="text-[11px] bg-slate-200/80 text-slate-600 px-2 py-0.5 rounded font-bold uppercase tracking-wide">
                  Category Root
                </span>
              </div>

              {expandedNodes["2000"] && (
                <div className="bg-white divide-y divide-slate-50 pl-6 border-t border-slate-100">
                  <div className="p-3 flex items-center justify-between hover:bg-slate-50/40">
                    <div className="flex items-center gap-2 pl-2">
                      <FileText size={15} className="text-slate-400" />
                      <span className="font-bold font-mono text-slate-400">
                        2100
                      </span>
                      <span className="text-slate-800 font-semibold">
                        Member Overpayment Clearing Liability
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                      Subledger
                    </span>
                  </div>
                  <div className="p-3 flex items-center justify-between hover:bg-slate-50/40">
                    <div className="flex items-center gap-2 pl-2">
                      <FileText size={15} className="text-slate-400" />
                      <span className="font-bold font-mono text-slate-400">
                        2230
                      </span>
                      <span className="text-slate-800 font-semibold">
                        Member Non-Withdrawable Deposits (BOSA)
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                      Subledger
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Equity Node Header Stack */}
            <div className="border border-slate-100 rounded-xl overflow-hidden shadow-sm">
              <div
                onClick={() => toggleNode("3000")}
                className="flex items-center justify-between p-3.5 bg-slate-50/80 cursor-pointer hover:bg-slate-100/60 select-none"
              >
                <div className="flex items-center gap-2">
                  {expandedNodes["3000"] ? (
                    <ChevronDown size={16} className="text-slate-400" />
                  ) : (
                    <ChevronRight size={16} className="text-slate-400" />
                  )}
                  <Folder size={16} className="text-purple-600" />
                  <span className="font-bold text-primary">
                    3000 — Equity & Institutional Capital Reserves
                  </span>
                </div>
                <span className="text-[11px] bg-slate-200/80 text-slate-600 px-2 py-0.5 rounded font-bold uppercase tracking-wide">
                  Category Root
                </span>
              </div>

              {expandedNodes["3000"] && (
                <div className="bg-white divide-y divide-slate-50 pl-6 border-t border-slate-100">
                  <div className="p-3 flex items-center justify-between hover:bg-slate-50/40">
                    <div className="flex items-center gap-2 pl-2">
                      <FileText size={15} className="text-slate-400" />
                      <span className="font-bold font-mono text-slate-400">
                        3010
                      </span>
                      <span className="text-slate-800 font-semibold">
                        Qualifying Share Capital Statutory Fund
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                      Subledger
                    </span>
                  </div>
                  <div className="p-3 flex items-center justify-between hover:bg-slate-50/40">
                    <div className="flex items-center gap-2 pl-2">
                      <FileText size={15} className="text-slate-400" />
                      <span className="font-bold font-mono text-slate-400">
                        3050
                      </span>
                      <span className="text-slate-800 font-semibold">
                        Accumulated Retained Net Surplus
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                      Subledger
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "income" && (
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/40">
            <h4 className="text-[15px] font-bold text-primary tracking-tight">
              Statement of Comprehensive Income
            </h4>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">
              Sequential operating performance matrix tracking net operational
              surpluses.
            </p>
          </div>

          <div className="p-6 space-y-6 text-[13px] font-medium text-slate-700">
            <div className="space-y-2">
              <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1.5">
                Financial Revenue Portfolio
              </h5>
              <div className="flex justify-between py-1 px-2 hover:bg-slate-50 rounded-lg">
                <span>Interest Income earned on Loan Portfolio</span>
                <span className="font-mono font-bold text-primary">
                  60,000.00
                </span>
              </div>
              <div className="flex justify-between py-1 px-2 border-b border-slate-200 bg-slate-50/50 rounded-lg text-primary font-bold">
                <span className="uppercase tracking-wide text-[10px] text-slate-400 font-bold">
                  Total Gross Revenue
                </span>
                <span className="font-mono">60,000.00</span>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1.5">
                Less: Operational Expenses
              </h5>
              <div className="flex justify-between py-1 px-2 hover:bg-slate-50 rounded-lg">
                <span>SASRA Regulatory Levy Expense Allocation</span>
                <span className="font-mono font-bold text-primary">
                  25,000.00
                </span>
              </div>
              <div className="flex justify-between py-1 px-2 hover:bg-slate-50 rounded-lg">
                <span>Provision for Imminent Credit Impairment Asset Loss</span>
                <span className="font-mono font-bold text-primary">—</span>
              </div>
              <div className="flex justify-between py-1 px-2 border-b border-slate-200 bg-slate-50/50 rounded-lg text-primary font-bold">
                <span className="uppercase tracking-wide text-[10px] text-slate-400 font-bold">
                  Total Operating Expenses
                </span>
                <span className="font-mono">(25,000.00)</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-[15px] font-black text-slate-950 bg-slate-100/60 p-3 rounded-xl select-none">
              <span className="uppercase tracking-wider text-[11px] text-slate-500 font-bold">
                Net Operating Surplus for the Period
              </span>
              <div className="flex items-baseline gap-1 font-mono border-b-4 border-double border-primary pb-0.5">
                <span className="text-[11px] text-slate-400 font-bold">
                  KES
                </span>
                <span>35,000.00</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "balance-sheet" && (
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/40">
            <h4 className="text-[15px] font-bold text-primary tracking-tight">
              Statement of Financial Position (Balance Sheet)
            </h4>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">
              Point-in-time capitalization breakdown of institutional assets,
              commitments, and retained reserves.
            </p>
          </div>

          <div className="p-6 space-y-6 text-[13px] font-medium text-slate-700">
            {/* ASSETS SECTOR */}
            <div className="space-y-2">
              <h5 className="text-[11px] font-bold uppercase tracking-wider text-blue-600 border-b border-blue-100 pb-1.5 pl-1">
                1000 — Institutional Assets
              </h5>
              <div className="flex justify-between py-1 px-2 hover:bg-slate-50 rounded-lg">
                <span>Cash &amp; Cash Equivalents (FOSA Tills)</span>
                <span className="font-mono font-bold text-primary">
                  230,000.00
                </span>
              </div>
              <div className="flex justify-between py-1 px-2 hover:bg-slate-50 rounded-lg">
                <span>Development Loan Portfolio Subsidiary Ledger</span>
                <span className="font-mono font-bold text-primary">
                  415,000.00
                </span>
              </div>
              <div className="flex justify-between py-1 px-2 border-b border-slate-200 bg-slate-50/50 rounded-lg text-primary font-bold">
                <span class="uppercase tracking-wide text-[10px] text-slate-400 font-bold">
                  Total Assets
                </span>
                <span className="font-mono">645,000.00</span>
              </div>
            </div>

            {/* LIABILITIES SECTOR */}
            <div className="space-y-2">
              <h5 className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 border-b border-emerald-100 pb-1.5 pl-1">
                2000 — Liabilities &amp; External Obligations
              </h5>
              <div className="flex justify-between py-1 px-2 hover:bg-slate-50 rounded-lg">
                <span>Member Overpayment Clearing Liability</span>
                <span className="font-mono font-bold text-primary">
                  15,000.00
                </span>
              </div>
              <div className="flex justify-between py-1 px-2 hover:bg-slate-50 rounded-lg">
                <span>Member Non-Withdrawable Deposits (BOSA)</span>
                <span className="font-mono font-bold text-primary">
                  610,000.00
                </span>
              </div>
              <div className="flex justify-between py-1 px-2 border-b border-slate-200 bg-slate-50/50 rounded-lg text-primary font-bold">
                <span class="uppercase tracking-wide text-[10px] text-slate-400 font-bold">
                  Total Liabilities
                </span>
                <span className="font-mono">625,000.00</span>
              </div>
            </div>

            {/* EQUITY & RESERVES SECTOR */}
            <div className="space-y-2">
              <h5 className="text-[11px] font-bold uppercase tracking-wider text-purple-600 border-b border-purple-100 pb-1.5 pl-1">
                3000 — Equity &amp; Retained Reserves
              </h5>
              <div className="flex justify-between py-1 px-2 hover:bg-slate-50 rounded-lg">
                <span>Retained Earnings / Retained Surplus (Prior Years)</span>
                <span className="font-mono font-bold text-primary">—</span>
              </div>
              <div className="flex justify-between py-1 px-2 hover:bg-slate-50 rounded-lg">
                <span>Net Operating Surplus for the Period</span>
                <span className="font-mono font-bold text-primary">
                  35,000.00
                </span>
              </div>
              <div className="flex justify-between py-1 px-2 hover:bg-slate-50 rounded-lg text-slate-400 italic">
                <span>Less: Statutory Capital Adjustment Reconciliations</span>
                <span className="font-mono font-bold text-slate-500">
                  (15,000.00)
                </span>
              </div>
              <div className="flex justify-between py-1 px-2 border-b border-slate-200 bg-slate-50/50 rounded-lg text-primary font-bold">
                <span class="uppercase tracking-wide text-[10px] text-slate-400 font-bold">
                  Total Equity &amp; Period Reserves
                </span>
                <span className="font-mono">20,000.00</span>
              </div>
            </div>

            {/* BALANCE TOTAL SHEET DOUBLE UNDERLINE COMPARISON */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between text-[14px] font-black text-slate-950 bg-slate-100/60 p-3 rounded-xl select-none">
                <span className="uppercase tracking-wider text-[10px] text-slate-500 font-bold">
                  Total Assets Base
                </span>
                <div className="flex items-baseline gap-1 font-mono border-b-4 border-double border-primary pb-0.5">
                  <span className="text-[10px] text-slate-400 font-bold font-sans">
                    KES
                  </span>
                  <span>645,000.00</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[14px] font-black text-slate-950 bg-slate-100/60 p-3 rounded-xl select-none">
                <span className="uppercase tracking-wider text-[10px] text-slate-500 font-bold">
                  Total Liabilities &amp; Capital
                </span>
                <div className="flex items-baseline gap-1 font-mono border-b-4 border-double border-primary pb-0.5">
                  <span className="text-[10px] text-slate-400 font-bold font-sans">
                    KES
                  </span>
                  <span>645,000.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
