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
  const [activeTab, setActiveTab] = useState("trial-balance");
  const [orgCode, setOrgCode] = useState("BA208");
  const [asOfDate, setAsOfDate] = useState("2026-06-30");
  const [coaSearch, setCoaSearch] = useState("");

  const [expandedNodes, setExpandedNodes] = useState({
    1000: true,
    2000: true,
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

  // Compute mathematical ledger health real-time anomalies
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
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
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
        <div class="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0">
          <button
            onClick={() => setActiveTab("trial-balance")}
            className={`px-4 py-2 text-[13px] font-bold rounded-lg transition-all ${activeTab === "trial-balance" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
          >
            Trial Balance
          </button>
          <button
            onClick={() => setActiveTab("coa")}
            className={`px-4 py-2 text-[13px] font-bold rounded-lg transition-all ${activeTab === "coa" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
          >
            Chart of Accounts
          </button>
          <button
            onClick={() => setActiveTab("income")}
            className={`px-4 py-2 text-[13px] font-bold rounded-lg transition-all ${activeTab === "income" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
          >
            Income Statement
          </button>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <div class="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[13px] font-semibold text-slate-600">
            <Calendar size={16} class="text-slate-400" />
            <span class="text-slate-400 mr-1">As of:</span>
            <input
              type="date"
              value={asOfDate}
              onChange={(e) => setAsOfDate(e.target.value)}
              class="bg-transparent border-0 outline-none p-0 focus:ring-0 font-bold text-slate-800 cursor-pointer"
            />
          </div>

          <div class="flex items-center gap-1.5 border-l border-slate-200 pl-3">
            <button
              class="p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:text-slate-900 transition-colors shadow-sm"
              title="Export Excel Document Sheet"
            >
              <FileSpreadsheet size={16} />
            </button>
            <button
              class="p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:text-slate-900 transition-colors shadow-sm"
              title="Print Ledger Records Document"
            >
              <Printer size={16} />
            </button>
          </div>
        </div>
      </header>

      {variance > 0 && (
        <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl flex items-start gap-3 shadow-sm shadow-rose-900/5">
          <AlertTriangle size={18} class="text-rose-600 shrink-0 mt-0.5" />
          <div class="space-y-0.5">
            <h5 class="text-[13px] font-bold text-rose-950">
              Structural Balance Discrepancy Error
            </h5>
            <p class="text-[12px] text-rose-700 font-medium leading-relaxed">
              The General Ledger architecture contains an active variance
              payload of{" "}
              <span class="font-bold">KES {formatCurrency(variance)}</span>.
              Automated operational accounting reconciliations have been
              suspended. Please check unposted journals or bridge processing
              accounts.
            </p>
          </div>
        </div>
      )}

      {activeTab === "trial-balance" && (
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-100 bg-slate-50/40">
            <h4 class="text-[15px] font-bold text-slate-900 tracking-tight">
              Net Trial Balance Report
            </h4>
            <p class="text-[11px] text-slate-400 font-medium mt-0.5">
              Double-entry ledger ledger checking matrix balances calculated
              directly via transaction caches.
            </p>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full border-collapse text-left">
              <thead>
                <tr class="bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200 select-none">
                  <th class="py-3 px-6 w-32">Account Code</th>
                  <th class="py-3 px-6">Account Ledger Description</th>
                  <th class="py-3 px-6 w-28">Element Type</th>
                  <th class="py-3 px-6 text-right w-48">Debit Balance (KES)</th>
                  <th class="py-3 px-6 text-right w-48">
                    Credit Balance (KES)
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-[13px] font-medium">
                {trialBalanceData.rows.map((row) => (
                  <tr
                    key={row.account_code}
                    class="hover:bg-slate-50/50 transition-colors"
                  >
                    <td class="py-3.5 px-6 font-mono font-bold text-slate-400">
                      {row.account_code}
                    </td>
                    <td class="py-3.5 px-6 font-bold text-slate-900">
                      {row.account_name}
                    </td>
                    <td class="py-3.5 px-6 text-slate-400 capitalize">
                      {row.account_type}
                    </td>
                    <td class="py-3.5 px-6 text-right font-mono font-bold text-slate-800">
                      {row.debit_balance > 0
                        ? formatCurrency(row.debit_balance)
                        : "—"}
                    </td>
                    <td class="py-3.5 px-6 text-right font-mono font-bold text-slate-800">
                      {row.credit_balance > 0
                        ? formatCurrency(row.credit_balance)
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr class="bg-slate-50/60 text-slate-950 text-[14px] font-black border-t border-slate-100 select-none">
                  <td
                    colSpan={3}
                    class="py-4 px-6 text-right uppercase tracking-wider text-slate-400 font-bold text-[11px]"
                  >
                    Grand Totals Balance
                  </td>
                  <td class="py-4 px-6 text-right font-mono border-b-4 border-double border-slate-900">
                    {formatCurrency(trialBalanceData.totals.total_debit)}
                  </td>
                  <td class="py-4 px-6 text-right font-mono border-b-4 border-double border-slate-900">
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
          <div class="px-6 pt-5 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/40">
            <div>
              <h4 class="text-[15px] font-bold text-slate-900 tracking-tight">
                Structured Chart of Accounts (COA) Directory
              </h4>
              <p class="text-[11px] text-slate-400 font-medium mt-0.5">
                Hierarchical structural tracking matrix containing active legal
                asset allocation indices.
              </p>
            </div>
            {/* Search Frame Indexer */}
            <div class="flex items-center h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-slate-400 transition-colors w-full sm:w-64">
              <Search size={16} class="text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search account node index..."
                value={coaSearch}
                onChange={(e) => setCoaSearch(e.target.value)}
                class="bg-transparent border-0 outline-none w-full p-0 text-[13px] font-medium placeholder-slate-300 focus:ring-0 focus:shadow-none"
              />
            </div>
          </div>

          <div class="px-6 pb-6 space-y-1 font-medium text-[13px]">
            {/* Asset Node Header Stack */}
            <div class="border border-slate-100 rounded-xl overflow-hidden shadow-sm">
              <div
                onClick={() => toggleNode("1000")}
                class="flex items-center justify-between p-3.5 bg-slate-50/80 cursor-pointer hover:bg-slate-100/60 select-none"
              >
                <div class="flex items-center gap-2">
                  {expandedNodes["1000"] ? (
                    <ChevronDown size={16} class="text-slate-400" />
                  ) : (
                    <ChevronRight size={16} class="text-slate-400" />
                  )}
                  <Folder size={16} class="text-bluemain" />
                  <span class="font-bold text-slate-900">
                    1000 — Asset Assets Ledger Controls
                  </span>
                </div>
                <span class="text-[11px] bg-slate-200/80 text-slate-600 px-2 py-0.5 rounded font-bold uppercase tracking-wide">
                  Category Root
                </span>
              </div>

              {expandedNodes["1000"] && (
                <div class="bg-white divide-y divide-slate-50 pl-6 border-t border-slate-100">
                  <div class="p-3 flex items-center justify-between hover:bg-slate-50/40">
                    <div class="flex items-center gap-2 pl-2">
                      <FileText size={15} class="text-slate-400" />
                      <span class="font-bold font-mono text-slate-400">
                        1010
                      </span>
                      <span class="text-slate-800 font-semibold">
                        Cash Equivalents (FOSA vault vault)
                      </span>
                    </div>
                    <span class="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                      Subledger
                    </span>
                  </div>
                  <div class="p-3 flex items-center justify-between hover:bg-slate-50/40">
                    <div class="flex items-center gap-2 pl-2">
                      <FileText size={15} class="text-slate-400" />
                      <span class="font-bold font-mono text-slate-400">
                        1120
                      </span>
                      <span class="text-slate-800 font-semibold">
                        Development Loans Portfolio Account
                      </span>
                    </div>
                    <span class="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                      Subledger
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Liability Node Header Stack */}
            <div class="border border-slate-100 rounded-xl overflow-hidden shadow-sm mt-3">
              <div
                onClick={() => toggleNode("2000")}
                class="flex items-center justify-between p-3.5 bg-slate-50/80 cursor-pointer hover:bg-slate-100/60 select-none"
              >
                <div class="flex items-center gap-2">
                  {expandedNodes["2000"] ? (
                    <ChevronDown size={16} class="text-slate-400" />
                  ) : (
                    <ChevronRight size={16} class="text-slate-400" />
                  )}
                  <Folder size={16} class="text-emerald-600" />
                  <span class="font-bold text-slate-900">
                    2000 — Liability Obligations Ledger Controls
                  </span>
                </div>
                <span class="text-[11px] bg-slate-200/80 text-slate-600 px-2 py-0.5 rounded font-bold uppercase tracking-wide">
                  Category Root
                </span>
              </div>

              {expandedNodes["2000"] && (
                <div class="bg-white divide-y divide-slate-50 pl-6 border-t border-slate-100">
                  <div class="p-3 flex items-center justify-between hover:bg-slate-50/40">
                    <div class="flex items-center gap-2 pl-2">
                      <FileText size={15} class="text-slate-400" />
                      <span class="font-bold font-mono text-slate-400">
                        2100
                      </span>
                      <span class="text-slate-800 font-semibold">
                        Member Overpayment Clearing Liability
                      </span>
                    </div>
                    <span class="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                      Subledger
                    </span>
                  </div>
                  <div class="p-3 flex items-center justify-between hover:bg-slate-50/40">
                    <div class="flex items-center gap-2 pl-2">
                      <FileText size={15} class="text-slate-400" />
                      <span class="font-bold font-mono text-slate-400">
                        2230
                      </span>
                      <span class="text-slate-800 font-semibold">
                        Member Non-Withdrawable Deposits (BOSA)
                      </span>
                    </div>
                    <span class="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
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
          <div class="px-6 py-4 border-b border-slate-100 bg-slate-50/40">
            <h4 class="text-[15px] font-bold text-slate-900 tracking-tight">
              Statement of Comprehensive Income
            </h4>
            <p class="text-[11px] text-slate-400 font-medium mt-0.5">
              Sequential operating performance matrix tracking net operational
              surpluses.
            </p>
          </div>

          <div class="p-6 space-y-6 text-[13px] font-medium text-slate-700">
            {/* Financial Revenue Group Section block */}
            <div class="space-y-2">
              <h5 class="text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1.5">
                Financial Revenue Portfolio
              </h5>
              <div class="flex justify-between py-1 px-2 hover:bg-slate-50 rounded-lg">
                <span>Interest Income earned on Loan Portfolio</span>
                <span class="font-mono font-bold text-slate-900">
                  60,000.00
                </span>
              </div>
              <div class="flex justify-between py-1 px-2 border-b border-slate-200 bg-slate-50/50 rounded-lg text-slate-900 font-bold">
                <span class="uppercase tracking-wide text-[10px] text-slate-400 font-bold">
                  Total Gross Revenue
                </span>
                <span class="font-mono">60,000.00</span>
              </div>
            </div>

            {/* Operating Expense Group Section Block */}
            <div class="space-y-2">
              <h5 class="text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1.5">
                Less: Operational Expenses
              </h5>
              <div class="flex justify-between py-1 px-2 hover:bg-slate-50 rounded-lg">
                <span>SASRA Regulatory Levy Expense Allocation</span>
                <span class="font-mono font-bold text-slate-900">
                  25,000.00
                </span>
              </div>
              <div class="flex justify-between py-1 px-2 hover:bg-slate-50 rounded-lg">
                <span>Provision for Imminent Credit Impairment Asset Loss</span>
                <span class="font-mono font-bold text-slate-900">—</span>
              </div>
              <div class="flex justify-between py-1 px-2 border-b border-slate-200 bg-slate-50/50 rounded-lg text-slate-900 font-bold">
                <span class="uppercase tracking-wide text-[10px] text-slate-400 font-bold">
                  Total Operating Expenses
                </span>
                <span class="font-mono">(25,000.00)</span>
              </div>
            </div>

            {/* Net Surplus Summary Target Row */}
            <div class="pt-2 flex items-center justify-between text-[15px] font-black text-slate-950 bg-slate-100/60 p-3 rounded-xl select-none">
              <span class="uppercase tracking-wider text-[11px] text-slate-500 font-bold">
                Net Operating Surplus for the Period
              </span>
              <div class="flex items-baseline gap-1 font-mono border-b-4 border-double border-slate-900 pb-0.5">
                <span class="text-[11px] text-slate-400 font-bold">KES</span>
                <span>35,000.00</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
