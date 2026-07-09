import React, { useState } from "react";
import {
  FileSpreadsheet,
  ChevronDown,
  ChevronRight,
  Search,
  Calendar,
  Printer,
  Folder,
  FileText,
} from "lucide-react";
import {
  balanceSheet,
  chartOfAccounts,
  incomeStatement,
  trialBalance,
} from "../../sdk/reports/reports";
import { useToast } from "../../contexts/ToastProvider";
import { useQuery } from "react-query";

export default function FinancialReports() {
  const [activeTab, setActiveTab] = useState("coa");
  const [coaSearch, setCoaSearch] = useState("");
  const { showToast } = useToast();
  const todayStr = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState("2026-01-01");
  const [endDate, setEndDate] = useState(todayStr);
  const [myChartOfAccounts, setMyChartOfAccounts] = useState([]);
  const [myIncomeStatement, setMyIncomeStatement] = useState({});
  const [myBalanceSheet, setMyBalanceSheet] = useState({});
  const [myTrialBalance, setMyTrialBalance] = useState({});

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

  const { isFetching } = useQuery({
    queryKey: ["chart of accounts"],
    queryFn: async () => {
      const response = await chartOfAccounts();
      return response.data?.data;
    },
    onSuccess: (data) => {
      setMyChartOfAccounts(data);
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

  useQuery({
    queryKey: ["trial balance", startDate, endDate],
    queryFn: async () => {
      const response = await trialBalance(startDate, endDate);
      return response.data?.data;
    },
    onSuccess: (data) => {
      setMyTrialBalance(data);
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

  useQuery({
    queryKey: ["balance sheet", startDate, endDate],
    queryFn: async () => {
      const response = await balanceSheet(startDate, endDate);
      return response.data?.data;
    },
    onSuccess: (data) => {
      setMyBalanceSheet(data);
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

  useQuery({
    queryKey: ["income statement", startDate, endDate],
    queryFn: async () => {
      const response = await incomeStatement(startDate, endDate);
      return response.data?.data;
    },
    onSuccess: (data) => {
      setMyIncomeStatement(data);
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

  return (
    <div className="bg-slate-50 text-slate-800 font-sans space-y-6">
      <div className="flex flex-col sm:gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200/60 pb-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-primary">
            Financial Reports
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
            <span className="text-slate-400 mr-1">Start Date</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-transparent border-0 outline-none p-0 focus:ring-0 font-bold text-slate-800 cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[13px] font-semibold text-slate-600">
            <Calendar size={16} className="text-slate-400" />
            <span className="text-slate-400 mr-1">End Date</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
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

      {activeTab === "trial-balance" && (
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
          {/* Header Block */}
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/40">
            <h4 className="text-[15px] font-bold text-primary tracking-tight">
              Net Trial Balance Report
            </h4>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">
              Double-entry ledger checking matrix balances calculated directly
              via transaction caches.
            </p>
          </div>

          {/* Table Workspace */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200 select-none">
                  <th className="py-3 px-6 w-32">Account Code</th>
                  <th className="py-3 px-6">Account Ledger Description</th>
                  <th className="py-3 px-6 w-28">Element Type</th>
                  <th className="py-3 px-6 text-right w-48">Debit (KES)</th>
                  <th className="py-3 px-6 text-right w-48">Credit (KES)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[13px] font-medium">
                {myTrialBalance?.rows?.map((row) => (
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
                    {/* Maps precisely to the new 'debit' API key */}
                    <td className="py-3.5 px-6 text-right font-mono font-bold text-slate-800">
                      {row.debit > 0 ? formatCurrency(row.debit) : "—"}
                    </td>
                    {/* Maps precisely to the new 'credit' API key */}
                    <td className="py-3.5 px-6 text-right font-mono font-bold text-slate-800">
                      {row.credit > 0 ? formatCurrency(row.credit) : "—"}
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
                  {/* Maps precisely to root-level summary keys */}
                  <td className="py-4 px-6 text-right font-mono border-primary text-slate-900">
                    {formatCurrency(myTrialBalance?.total_debit || 0)}
                  </td>
                  <td className="py-4 px-6 text-right font-mono border-primary text-slate-900">
                    {formatCurrency(myTrialBalance?.total_credit || 0)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {activeTab === "coa" && (
        isFetching ? <Loader/> :
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden space-y-4">
          {/* 1. MANAGEMENT DIRECTORY SEARCH HEADER */}
          <div className="px-6 pt-5 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/40">
            <div>
              <h4 className="text-[15px] font-bold text-primary tracking-tight">
                Structured Chart of Accounts
              </h4>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                Hierarchical structural tracking matrix containing active legal
                asset allocation indices.
              </p>
            </div>
          </div>

          {/* 2. HIERARCHICAL TREE ENGINE WORKSPACE */}
          <div className="px-6 pb-6 space-y-4 font-medium text-[13px]">
            {(() => {
              // Assume 'chartOfAccountsData' holds your raw API array response
              const rawCoaList = myChartOfAccounts || [];

              // Apply real-time evaluation across descriptive names or account codes
              const filteredList = rawCoaList.filter((acc) => {
                const matchString = coaSearch.toLowerCase();
                return (
                  acc.account_name?.toLowerCase().includes(matchString) ||
                  acc.account_code?.includes(matchString)
                );
              });

              // Separate core root nodes (no parent links) from sub-ledger elements
              const rootNodes = filteredList.filter((acc) => !acc.parent_id);
              const childNodes = rawCoaList.filter((acc) => acc.parent_id);

              // Map colors dynamically based on accounting classifications
              const getTypeStyles = (type) => {
                switch (type?.toLowerCase()) {
                  case "asset":
                    return {
                      icon: "text-blue-600",
                      badge: "bg-blue-50 text-blue-700 border-blue-100",
                    };
                  case "liability":
                    return {
                      icon: "text-emerald-600",
                      badge:
                        "bg-emerald-50 text-emerald-700 border-emerald-100",
                    };
                  case "equity":
                    return {
                      icon: "text-purple-600",
                      badge: "bg-purple-50 text-purple-700 border-purple-100",
                    };
                  case "income":
                    return {
                      icon: "text-amber-600",
                      badge: "bg-amber-50 text-amber-700 border-amber-100",
                    };
                  case "expense":
                    return {
                      icon: "text-rose-600",
                      badge: "bg-rose-50 text-rose-700 border-rose-100",
                    };
                  default:
                    return {
                      icon: "text-slate-600",
                      badge: "bg-slate-50 text-slate-700 border-slate-100",
                    };
                }
              };

              if (rootNodes.length === 0) {
                return (
                  <div className="text-center py-8 text-xs text-slate-400 font-semibold italic">
                    No ledger accounts found matching "{coaSearch}"
                  </div>
                );
              }

              return rootNodes.map((root) => {
                const styles = getTypeStyles(root.account_type);
                // Query sub-ledger children belonging specifically to this master node block
                const children = childNodes.filter(
                  (child) => child.parent_id === root.id,
                );
                const isExpanded = !!expandedNodes[root.account_code];

                return (
                  <div
                    key={root.id}
                    className="border border-slate-200/70 rounded-xl overflow-hidden shadow-2xs bg-white"
                  >
                    {/* ROOT MASTER HEADER CONTROL CARD */}
                    <div
                      onClick={() => toggleNode(root.account_code)}
                      className="flex items-center justify-between p-3.5 bg-slate-50/80 cursor-pointer hover:bg-slate-100/60 select-none transition-colors"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="shrink-0">
                          {children.length > 0 ? (
                            isExpanded ? (
                              <ChevronDown
                                size={16}
                                className="text-slate-400"
                              />
                            ) : (
                              <ChevronRight
                                size={16}
                                className="text-slate-400"
                              />
                            )
                          ) : (
                            <div className="w-4" />
                          )}
                        </div>
                        <Folder
                          size={16}
                          className={`${styles.icon} shrink-0`}
                        />
                        <span className="font-mono font-bold text-slate-400 shrink-0">
                          {root.account_code}
                        </span>
                        <span className="font-bold text-slate-900 truncate pl-1">
                          {root.account_name}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-4">
                        <span
                          className={`text-[9px] border px-2 py-0.5 rounded font-black uppercase tracking-wider select-none ${styles.badge}`}
                        >
                          {root.account_type}
                        </span>
                        <span className="text-[10px] hidden sm:inline-block bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-semibold text-xs">
                          Control Group
                        </span>
                      </div>
                    </div>

                    {/* NESTED CHILDREN EXPANSION SHEET CONTAINER */}
                    {isExpanded && children.length > 0 && (
                      <div className="bg-white divide-y divide-slate-100 pl-6 border-t border-slate-100/80">
                        {children.map((child) => (
                          <div
                            key={child.id}
                            className="p-3.5 flex items-center justify-between hover:bg-slate-50/50 transition-colors"
                          >
                            <div className="flex items-center gap-2 pl-2 min-w-0">
                              <FileText
                                size={14}
                                className="text-slate-400 shrink-0"
                              />
                              <span className="font-bold font-mono text-slate-400 tracking-tight shrink-0">
                                {child.account_code}
                              </span>
                              <span className="text-slate-800 font-semibold truncate pl-1">
                                {child.account_name}
                              </span>
                            </div>

                            <div className="flex items-center gap-3 shrink-0 ml-4 select-none">
                              {child.description && (
                                <span className="text-[11px] max-w-xs text-slate-400 truncate hidden md:block font-normal italic">
                                  {child.description}
                                </span>
                              )}
                              <span className="text-[10px] bg-slate-50 border border-slate-200 text-slate-400 font-black px-2 py-0.5 rounded uppercase tracking-widest font-mono">
                                {child.normal_balance}
                              </span>
                              <span className="text-[10px] bg-blue-50/60 text-blue-600 border border-blue-100/80 font-bold px-2 py-0.5 rounded">
                                Posting Entry
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              });
            })()}
          </div>
        </div>
      )}

      {activeTab === "income" && (
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
          {/* Header Block */}
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
            {/* SECTION 1: REVENUE MATRIX */}
            <div className="space-y-2">
              <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1.5">
                Financial Revenue Portfolio
              </h5>

              {myIncomeStatement?.income &&
              myIncomeStatement.income.length > 0 ? (
                myIncomeStatement.income.map((row) => (
                  <div
                    key={row.account_code}
                    className="flex justify-between py-1.5 px-2 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <span className="text-slate-800">{row.account_name}</span>
                    <span className="font-mono font-bold text-primary">
                      {formatCurrency(row.amount)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-400 italic py-1 px-2">
                  No revenue streams recorded for this period.
                </div>
              )}

              {/* Dynamic Total Income Summary Row */}
              <div className="flex justify-between py-2 px-2 border-b border-slate-200 bg-slate-50/50 rounded-lg text-primary font-bold">
                <span className="uppercase tracking-wide text-[10px] text-slate-400 font-bold">
                  Total Gross Revenue
                </span>
                <span className="font-mono">
                  {formatCurrency(myIncomeStatement?.total_income || 0)}
                </span>
              </div>
            </div>

            {/* SECTION 2: EXPENSES MATRIX */}
            <div className="space-y-2">
              <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1.5">
                Less: Operational Expenses
              </h5>

              {myIncomeStatement?.expenses &&
              myIncomeStatement.expenses.length > 0 ? (
                myIncomeStatement.expenses.map((row) => (
                  <div
                    key={row.account_code}
                    className="flex justify-between py-1.5 px-2 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <span className="text-slate-800">{row.account_name}</span>
                    <span className="font-mono font-bold text-primary">
                      {formatCurrency(row.amount)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-400 italic py-2 px-2">
                  No operating expenses recorded for this period.
                </div>
              )}

              {/* Dynamic Total Expenses Summary Row */}
              <div className="flex justify-between py-2 px-2 border-b border-slate-200 bg-slate-50/50 rounded-lg text-primary font-bold">
                <span className="uppercase tracking-wide text-[10px] text-slate-400 font-bold">
                  Total Operating Expenses
                </span>
                <span className="font-mono">
                  ({formatCurrency(myIncomeStatement?.total_expenses || 0)})
                </span>
              </div>
            </div>

            {/* SECTION 3: NET SURPLUS FINAL TACTILE CARD */}
            <div className="pt-2 flex items-center justify-between text-[15px] font-black text-slate-950 bg-slate-100/60 p-3 rounded-xl select-none">
              <span className="uppercase tracking-wider text-[11px] text-slate-500 font-bold">
                Net Operating Surplus for the Period
              </span>
              <div className="flex items-baseline gap-1 font-mono border-primary pb-0.5">
                <span className="text-[11px] text-slate-400 font-bold">
                  KES
                </span>
                <span className="text-slate-900 font-black">
                  {formatCurrency(myIncomeStatement?.net_surplus || 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "balance-sheet" && (
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
          {/* Header Block */}
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
            {/* 1. ASSETS SECTOR */}
            <div className="space-y-2">
              <h5 className="text-[11px] font-bold uppercase tracking-wider text-blue-600 border-b border-blue-100 pb-1.5 pl-1">
                1000 — Institutional Assets
              </h5>

              {myBalanceSheet?.assets && myBalanceSheet.assets.length > 0 ? (
                myBalanceSheet.assets.map((row) => (
                  <div
                    key={row.account_code}
                    className="flex justify-between py-1.5 px-2 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-slate-400">
                        {row.account_code}
                      </span>
                      <span className="text-slate-800">{row.account_name}</span>
                    </div>
                    <span className="font-mono font-bold text-primary">
                      {formatCurrency(row.amount)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-400 italic py-1 px-2">
                  No asset balances recorded.
                </div>
              )}

              <div className="flex justify-between py-2 px-2 border-b border-slate-200 bg-slate-50/50 rounded-lg text-primary font-bold">
                <span className="uppercase tracking-wide text-[10px] text-slate-400 font-bold">
                  Total Assets
                </span>
                <span className="font-mono">
                  {formatCurrency(myBalanceSheet?.total_assets || 0)}
                </span>
              </div>
            </div>

            {/* 2. LIABILITIES SECTOR */}
            <div className="space-y-2">
              <h5 className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 border-b border-emerald-100 pb-1.5 pl-1">
                2000 — Liabilities &amp; External Obligations
              </h5>

              {myBalanceSheet?.liabilities &&
              myBalanceSheet.liabilities.length > 0 ? (
                myBalanceSheet.liabilities.map((row) => (
                  <div
                    key={row.account_code}
                    className="flex justify-between py-1.5 px-2 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-slate-400">
                        {row.account_code}
                      </span>
                      <span className="text-slate-800">{row.account_name}</span>
                    </div>
                    <span className="font-mono font-bold text-primary">
                      {formatCurrency(row.amount)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-400 italic py-1 px-2">
                  No active liabilities recorded.
                </div>
              )}

              <div className="flex justify-between py-2 px-2 border-b border-slate-200 bg-slate-50/50 rounded-lg text-primary font-bold">
                <span className="uppercase tracking-wide text-[10px] text-slate-400 font-bold">
                  Total Liabilities
                </span>
                <span className="font-mono">
                  {formatCurrency(myBalanceSheet?.total_liabilities || 0)}
                </span>
              </div>
            </div>

            {/* 3. EQUITY & RESERVES SECTOR */}
            <div className="space-y-2">
              <h5 className="text-[11px] font-bold uppercase tracking-wider text-purple-600 border-b border-purple-100 pb-1.5 pl-1">
                3000 — Equity &amp; Retained Reserves
              </h5>

              {myBalanceSheet?.equity && myBalanceSheet.equity.length > 0 ? (
                myBalanceSheet.equity.map((row) => (
                  <div
                    key={row.account_code}
                    className="flex justify-between py-1.5 px-2 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-slate-400">
                        {row.account_code === "CURRENT_PERIOD_EARNINGS"
                          ? "—"
                          : row.account_code}
                      </span>
                      <span className="text-slate-800">{row.account_name}</span>
                    </div>
                    <span className="font-mono font-bold text-primary">
                      {formatCurrency(row.amount)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-400 italic py-1 px-2">
                  No equity allocations recorded.
                </div>
              )}

              <div className="flex justify-between py-2 px-2 border-b border-slate-200 bg-slate-50/50 rounded-lg text-primary font-bold">
                <span className="uppercase tracking-wide text-[10px] text-slate-400 font-bold">
                  Total Equity &amp; Period Reserves
                </span>
                <span className="font-mono">
                  {formatCurrency(myBalanceSheet?.total_equity || 0)}
                </span>
              </div>
            </div>

            {/* 4. BALANCE SHEET DOUBLE UNDERLINE EQUATION MATCH */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between text-[14px] font-black text-slate-950 bg-slate-100/60 p-3 rounded-xl select-none">
                <span className="uppercase tracking-wider text-[10px] text-slate-500 font-bold">
                  Total Assets Base
                </span>
                <div className="flex items-baseline gap-1 font-mono border-primary pb-0.5">
                  <span className="text-[10px] text-slate-400 font-bold font-sans">
                    KES
                  </span>
                  <span className="text-slate-900 font-black">
                    {formatCurrency(myBalanceSheet?.total_assets || 0)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[14px] font-black text-slate-950 bg-slate-100/60 p-3 rounded-xl select-none">
                <span className="uppercase tracking-wider text-[10px] text-slate-500 font-bold">
                  Total Liabilities &amp; Capital
                </span>
                <div className="flex items-baseline gap-1 font-mono border-primary pb-0.5">
                  <span className="text-[10px] text-slate-400 font-bold font-sans">
                    KES
                  </span>
                  <span className="text-slate-900 font-black">
                    {formatCurrency(
                      myBalanceSheet?.liabilities_and_equity || 0,
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const Loader = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden space-y-4 animate-pulse select-none">
      {/* 1. MANAGEMENT DIRECTORY SEARCH HEADER PLACEHOLDER */}
      <div className="px-6 pt-5 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/40">
        <div className="space-y-2">
          <div className="h-[15px] bg-slate-200 rounded-md w-48"></div>
          <div className="h-[11px] bg-slate-100 rounded-md w-80 max-w-full"></div>
        </div>
        {/* Simulates the Search Input Field Box on the Right */}
        <div className="h-10 bg-slate-50 border border-slate-200 rounded-xl w-full sm:w-64 shrink-0"></div>
      </div>

      {/* 2. HIERARCHICAL TREE ENGINE WORKSPACE PLACEHOLDER */}
      <div className="px-6 pb-6 space-y-4">
        {/* NODE BLOCK 1: SIMULATED ASSET CONTROL GROUP (EXPANDED BRANCH VIEW) */}
        <div className="border border-slate-200/70 rounded-xl overflow-hidden bg-white">
          {/* ROOT MASTER HEADER CARD */}
          <div className="flex items-center justify-between p-3.5 bg-slate-50/80">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              {/* Chevron icon placeholder */}
              <div className="size-4 bg-slate-200 rounded shrink-0"></div>
              {/* Folder icon placeholder */}
              <div className="size-4 bg-slate-200 rounded-md shrink-0"></div>
              {/* Account Code placeholder */}
              <div className="h-3.5 bg-slate-200 rounded font-mono w-10 shrink-0"></div>
              {/* Account Name description placeholder */}
              <div className="h-3.5 bg-slate-300 rounded w-1/3 min-w-[140px] truncate"></div>
            </div>

            <div className="flex items-center gap-2 shrink-0 ml-4">
              {/* Classification badge line */}
              <div className="h-4 bg-slate-200 rounded w-12"></div>
              {/* Control Group classification box */}
              <div className="h-4 bg-slate-100 rounded w-20 hidden sm:block"></div>
            </div>
          </div>

          {/* NESTED CHILDREN EXPANSION MATRIX CONTAINER (VISIBLE BRANCH SUB-ITEMS) */}
          <div className="bg-white divide-y divide-slate-100 pl-6 border-t border-slate-100/80">
            {[1, 2, 3, 4, 5].map((childIndex) => (
              <div
                key={childIndex}
                className="p-3.5 flex items-center justify-between"
              >
                <div className="flex items-center gap-2 min-w-0 flex-1 pl-2">
                  {/* FileText entry icon placeholder */}
                  <div className="size-3.5 bg-slate-100 rounded shrink-0"></div>
                  {/* Subledger Account Code line */}
                  <div className="h-3 bg-slate-200 rounded font-mono w-10 shrink-0"></div>
                  {/* Subledger Name string identifier line */}
                  <div className="h-3 bg-slate-200 rounded w-1/2 min-w-[160px] truncate"></div>
                </div>

                <div className="flex items-center gap-3 shrink-0 ml-4">
                  {/* Account description tooltip text mimic (Optional hidden on small devices) */}
                  <div className="h-3 bg-slate-50 rounded w-28 hidden md:block"></div>
                  {/* Normal balance tag block */}
                  <div className="h-4 bg-slate-100 rounded font-mono w-12"></div>
                  {/* Posting entry ledger badge container */}
                  <div className="h-4 bg-slate-200 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NODE BLOCK 2: SIMULATED LIABILITY CONTROL GROUP (COLLAPSED BRANCH VIEW) */}
        <div className="border border-slate-200/70 rounded-xl overflow-hidden bg-white">
          <div className="flex items-center justify-between p-3.5 bg-slate-50/80">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div className="size-4 bg-slate-200 rounded shrink-0"></div>
              <div className="size-4 bg-slate-200 rounded-md shrink-0"></div>
              <div className="h-3.5 bg-slate-200 rounded font-mono w-10 shrink-0"></div>
              <div className="h-3.5 bg-slate-300 rounded w-1/4 min-w-[120px] truncate"></div>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-4">
              <div className="h-4 bg-slate-200 rounded w-14"></div>
              <div className="h-4 bg-slate-100 rounded w-20 hidden sm:block"></div>
            </div>
          </div>
        </div>

        {/* NODE BLOCK 3: SIMULATED EQUITY CONTROL GROUP (COLLAPSED BRANCH VIEW) */}
        <div className="border border-slate-200/70 rounded-xl overflow-hidden bg-white">
          <div className="flex items-center justify-between p-3.5 bg-slate-50/80">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div className="size-4 bg-slate-200 rounded shrink-0"></div>
              <div className="size-4 bg-slate-200 rounded-md shrink-0"></div>
              <div className="h-3.5 bg-slate-200 rounded font-mono w-10 shrink-0"></div>
              <div className="h-3.5 bg-slate-300 rounded w-1/5 min-w-[100px] truncate"></div>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-4">
              <div className="h-4 bg-slate-200 rounded w-12"></div>
              <div className="h-4 bg-slate-100 rounded w-20 hidden sm:block"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
