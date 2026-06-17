import React, { useState } from "react";
import {
  ArrowUpRight,
  Eye,
  Layers,
  Search,
  CheckCircle2,
  AlertTriangle,
  Smartphone,
  Filter,
  Download,
} from "lucide-react";
import Pagination from "../../../components/pagination/Pagination";

export default function AllLoans() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // 1. Process standard slice boundaries
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const loanRecords = [
    {
      id: "e941949d-dfc0-40ae-9fd3-4674eb2f344c",
      loan_code: "L00001",
      loan_org_code: "BA208",
      loan_type: "Flash_loan",
      loan_channel: "WEB",
      loan_name: "ALMASI ALUOCH",
      loan_mobile: "+254765350350",
      loan_amount: "5,000.00",
      loan_Balance: "900.00",
      loan_total_payments: "4,600.00",
      repayment_progress_percent: 83.64,
      loan_status: "Active",
      loan_date: "2026-06-09",
      loan_due_date: "2026-07-09",
      loan_product: {
        product_name: "Flash Loan",
        interest_rate: "10.0000",
        interest_method: "flat_rate",
      },
    },
    {
      id: "fa52140d-cfc0-40ae-9fd3-4674eb2f55df",
      loan_code: "L00002",
      loan_org_code: "BA208",
      loan_type: "Development_loan",
      loan_channel: "WEB",
      loan_name: "ALEXANDER GAKURU",
      loan_mobile: "+254722111222",
      loan_amount: "250,000.00",
      loan_Balance: "180,000.00",
      loan_total_payments: "70,000.00",
      repayment_progress_percent: 28.0,
      loan_status: "Active",
      loan_date: "2026-04-12",
      loan_due_date: "2026-12-12",
      loan_product: {
        product_name: "Development Loan",
        interest_rate: "1.5000",
        interest_method: "reducing_balance",
      },
    },
    {
      id: "bc89241f-dfc0-40ae-9fd3-4674eb2f778a",
      loan_code: "L00003",
      loan_org_code: "BA208",
      loan_type: "Flash_loan",
      loan_channel: "MOBILE",
      loan_name: "MOHAMED HASSAN",
      loan_mobile: "+254733444555",
      loan_amount: "12,000.00",
      loan_Balance: "0.00",
      loan_total_payments: "12,000.00",
      repayment_progress_percent: 100.0,
      loan_status: "Cleared",
      loan_date: "2026-05-01",
      loan_due_date: "2026-06-01",
      loan_product: {
        product_name: "Flash Loan",
        interest_rate: "10.0000",
        interest_method: "flat_rate",
      },
    },
    {
      id: "c9d1b573-g491-403b-b2e8-4daa7633eee5",
      loan_code: "L00004",
      loan_org_code: "BA208",
      loan_type: "Asset_Financing",
      loan_channel: "WEB",
      loan_name: "BEATRICE WANGARI",
      loan_mobile: "+254722987654",
      loan_amount: "1,200,000.00",
      loan_Balance: "900,000.00",
      loan_total_payments: "300,000.00",
      repayment_progress_percent: 25.0,
      loan_status: "Active",
      loan_date: "2026-01-15",
      loan_due_date: "2029-01-15",
      loan_product: {
        product_name: "Asset Financing Facility",
        interest_rate: "13.5000",
        interest_method: "reducing_balance",
      },
    },
    {
      id: "f8d1b573-h491-403b-b2e8-4daa7633fff6",
      loan_code: "L00005",
      loan_org_code: "BA208",
      loan_type: "Education_loan",
      loan_channel: "USSD",
      loan_name: "DAVID OCHIENG",
      loan_mobile: "+254701234321",
      loan_amount: "85,000.00",
      loan_Balance: "42,500.00",
      loan_total_payments: "42,500.00",
      repayment_progress_percent: 50.0,
      loan_status: "Active",
      loan_date: "2026-01-10",
      loan_due_date: "2027-01-10",
      loan_product: {
        product_name: "Elimu Education Loan",
        interest_rate: "10.0000",
        interest_method: "reducing_balance",
      },
    },
    {
      id: "d7d1b573-i491-403b-b2e8-4daa7633ggg7",
      loan_code: "L00006",
      loan_org_code: "BA208",
      loan_type: "Agri_Business",
      loan_channel: "MOBILE",
      loan_name: "FRANCIS MWANGI",
      loan_mobile: "+254721555666",
      loan_amount: "350,000.00",
      loan_Balance: "350,000.00",
      loan_total_payments: "0.00",
      repayment_progress_percent: 0.0,
      loan_status: "Active",
      loan_date: "2026-06-12",
      loan_due_date: "2028-06-12",
      loan_product: {
        product_name: "Kilimo Bora Agri-Business",
        interest_rate: "11.5000",
        interest_method: "reducing_balance",
      },
    },
    {
      id: "e8d1b573-j491-403b-b2e8-4daa7633hhh8",
      loan_code: "L00007",
      loan_org_code: "BA208",
      loan_type: "Commercial_Premium",
      loan_channel: "WEB",
      loan_name: "AMINA MOHAMED",
      loan_mobile: "+254733444555",
      loan_amount: "2,500,000.00",
      loan_Balance: "2,100,000.00",
      loan_total_payments: "400,000.00",
      repayment_progress_percent: 16.0,
      loan_status: "Active",
      loan_date: "2026-02-14",
      loan_due_date: "2031-02-14",
      loan_product: {
        product_name: "Biashara Jiinue Premium",
        interest_rate: "14.0000",
        interest_method: "reducing_balance",
      },
    },
    {
      id: "b1d56734-e491-403b-b2e8-4daa7633abc1",
      loan_code: "L00008",
      loan_org_code: "BA208",
      loan_type: "Flash_loan",
      loan_channel: "WEB",
      loan_name: "JOHN KAMAU",
      loan_mobile: "+254711999888",
      loan_amount: "15,000.00",
      loan_Balance: "0.00",
      loan_total_payments: "15,000.00",
      repayment_progress_percent: 100.0,
      loan_status: "Cleared",
      loan_date: "2026-03-10",
      loan_due_date: "2026-04-10",
      loan_product: {
        product_name: "Flash Loan",
        interest_rate: "10.0000",
        interest_method: "flat_rate",
      },
    },
    {
      id: "a3f2140d-dfc0-40ae-9fd3-4674eb2f99fe",
      loan_code: "L00009",
      loan_org_code: "BA208",
      loan_type: "Emergency_loan",
      loan_channel: "MOBILE",
      loan_name: "GRACE MUTUA",
      loan_mobile: "+254722333444",
      loan_amount: "30,000.00",
      loan_Balance: "30,000.00",
      loan_total_payments: "0.00",
      repayment_progress_percent: 0.0,
      loan_status: "Defaulted",
      loan_date: "2026-01-05",
      loan_due_date: "2026-02-05",
      loan_product: {
        product_name: "Instant Emergency Loan",
        interest_rate: "1.5000",
        interest_method: "flat_rate",
      },
    },
    {
      id: "fd89241f-cfc0-40ae-9fd3-4674eb2f112b",
      loan_code: "L00010",
      loan_org_code: "BA208",
      loan_type: "Education_loan",
      loan_channel: "USSD",
      loan_name: "ESTHER MWIKALI",
      loan_mobile: "+254700555444",
      loan_amount: "50,000.00",
      loan_Balance: "0.00",
      loan_total_payments: "50,000.00",
      repayment_progress_percent: 100.0,
      loan_status: "Cleared",
      loan_date: "2026-02-20",
      loan_due_date: "2026-05-20",
      loan_product: {
        product_name: "Elimu Education Loan",
        interest_rate: "10.0000",
        interest_method: "reducing_balance",
      },
    },
  ];

  const currentMembersPage = loanRecords.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const filteredLoans = loanRecords.filter((loan) => {
    const matchesSearch =
      loan.loan_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loan.loan_code.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "active")
      return matchesSearch && loan.loan_status === "Active";
    if (activeTab === "cleared")
      return matchesSearch && loan.loan_status === "Cleared";
    return matchesSearch;
  });

  return (
    <div className="w-full space-y-8 font-sans antialiased text-slate-800">
      {/* 1. UPPER EXECUTIVE COMMAND BAR */}
      <div className="flex flex-col sm:gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200/60 pb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Loans Registry
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Track active portfolio amortization lines, analyze repayment
            collection velocities, and process manual settlement recovery logs.
          </p>
        </div>
      </div>

      {/* 2. ANALYTICAL LEDGER EXPOSURE DECK */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryMetricCard
          title="Total Portfolio Exposure"
          value="KES 267,000.00"
          desc="Aggregated book value of issued principals"
          icon={<Layers size={18} />}
          color="text-primary bg-primary/5"
        />
        <SummaryMetricCard
          title="Outstanding Principal Book"
          value="KES 180,900.00"
          desc="Remaining active liabilities across accounts"
          icon={<AlertTriangle size={18} />}
          color="text-warning bg-warning/5"
        />
        <SummaryMetricCard
          title="Recovered Yield Capital"
          value="KES 86,600.00"
          desc="Formally liquidated amortization lines"
          icon={<CheckCircle2 size={18} />}
          color="text-success bg-success/5"
        />
      </div>

      {/* 3. INTERACTIVE SEARCH & STATE FILTERS */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xs p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative w-full md:w-72">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search accounts by code or debtor..."
            className="w-full h-10 pl-9 pr-4 bg-slate-50 border border-slate-200/60 rounded-xl text-xs font-medium outline-none transition-all focus:bg-white focus:border-secondary placeholder:text-slate-400 font-sans"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 h-10 px-4 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all">
            <Filter size={13} /> Filter
          </button>
          <button className="flex items-center gap-1.5 h-10 px-4 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all">
            <Download size={13} /> Export
          </button>
        </div>
      </div>

      {/* 4. HIGH-DENSITY STANDALONE PORTFOLIO LEDGER (Guaranteed non-scroll on desktop) */}
      <div className="w-full bg-white rounded-3xl border border-slate-200/60 shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse font-sans table-auto">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-200/60 text-[10px] font-bold text-slate-400 uppercase tracking-widest select-none">
              <th className="py-4.5 px-6">Loan Account & Debtor</th>
              <th className="py-4.5 px-6">Product Framework</th>
              <th className="py-4.5 px-6">Principal & Balances</th>
              <th className="py-4.5 px-6">Recovery Progress</th>
              <th className="py-4.5 px-6">Status</th>
              <th className="py-4.5 px-6 text-right pr-8">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-xs tracking-tight">
            {filteredLoans.map((loan) => (
              <tr
                key={loan.id}
                className="group transition-colors hover:bg-slate-50/60"
              >
                {/* Col 1: Account Reference & Debtor Profile */}
                <td className="py-4 px-6">
                  <div className="flex flex-col space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-sans font-bold text-[9px] tracking-wider uppercase px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                        {loan.loan_code}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
                        Channel: {loan.loan_channel}
                      </span>
                    </div>
                    <span className="font-semibold text-slate-900 text-sm tracking-tight group-hover:text-primary transition-colors">
                      {loan.loan_name}
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal flex items-center gap-1">
                      <Smartphone size={11} /> {loan.loan_mobile}
                    </span>
                  </div>
                </td>

                {/* Col 2: Product & Interest Parameter Mapping */}
                <td className="py-4 px-6">
                  <div className="flex flex-col space-y-1.5">
                    <span className="font-semibold text-slate-800 text-sm tracking-tight">
                      {loan.loan_product.product_name}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-sans font-bold text-[9px] tracking-wider uppercase px-1.5 py-0.5 bg-slate-50 text-slate-400 rounded border border-slate-200/40 flex items-center gap-0.5">
                        {parseFloat(loan.loan_product.interest_rate).toFixed(1)}
                        %
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium capitalize">
                        {loan.loan_product.interest_method.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Col 3: Financial Exposure Matrix (Principal vs Outstanding) */}
                <td className="py-4 px-6">
                  <div className="flex flex-col space-y-1">
                    <div className="text-[11px] text-slate-500 font-medium">
                      Issued:{" "}
                      <span className="font-semibold text-slate-900">
                        KES {loan.loan_amount}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      Oustanding:{" "}
                      <span className="font-bold text-error">
                        KES {loan.loan_Balance}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Col 4: Recovery Metrics & Mini Progress Tracker */}
                <td className="py-4 px-6">
                  <div className="flex flex-col space-y-1.5 max-w-[140px]">
                    <div className="flex items-center justify-between text-[11px] font-medium text-slate-500">
                      <span>
                        Paid:{" "}
                        <span className="font-semibold text-slate-800">
                          KES {loan.loan_total_payments}
                        </span>
                      </span>
                      <span className="font-bold text-slate-900 pl-2">
                        {loan.repayment_progress_percent}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          loan.repayment_progress_percent === 100
                            ? "bg-success"
                            : "bg-primary"
                        }`}
                        style={{ width: `${loan.repayment_progress_percent}%` }}
                      />
                    </div>
                  </div>
                </td>

                {/* Col 5: Amortization Lifespan Stage */}
                <td className="py-4 px-6">
                  <div className="flex flex-col space-y-1">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md border w-fit ${
                        loan.loan_status === "Active"
                          ? "bg-primary/5 border-primary/10 text-primary"
                          : "bg-success/5 border-success/10 text-success"
                      }`}
                    >
                      <span
                        className={`size-1 rounded-full ${loan.loan_status === "Active" ? "bg-primary" : "bg-success"}`}
                      />
                      {loan.loan_status}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium pt-0.5">
                      Due:{" "}
                      {new Date(loan.loan_due_date).toLocaleDateString(
                        "en-KE",
                        { dateStyle: "medium" },
                      )}
                    </span>
                  </div>
                </td>

                {/* Col 6: Actions Toolbar */}
                <td className="py-4 px-6 text-right pr-8">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      className="size-8 rounded-xl border border-slate-200/60 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-slate-50 hover:border-slate-300 transition-all shadow-3xs bg-white cursor-pointer"
                      title="Open Amortization File"
                    >
                      <Eye size={14} />
                    </button>
                    {loan.loan_status === "Active" && (
                      <button
                        className="size-8 rounded-xl border border-slate-200/60 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-3xs bg-white cursor-pointer"
                        title="Log Repayment Transaction"
                      >
                        <ArrowUpRight size={14} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="w-full">
          <Pagination
            currentPage={currentPage}
            totalItems={loanRecords.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SUPPORTIVE CHILD UTILITIES (FIXED PACK)
   ========================================================================== */

const SummaryMetricCard = ({ title, value, desc, icon, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-xs flex items-start justify-between">
    <div className="space-y-1.5">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        {title}
      </p>
      <h3 className="text-xl font-bold text-slate-800 tracking-tight">
        {value}
      </h3>
      <p className="text-[11px] text-slate-400 font-medium leading-normal">
        {desc}
      </p>
    </div>
    <div
      className={`size-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}
    >
      {icon}
    </div>
  </div>
);

const TabToggle = ({ active, onClick, label }) => (
  <button
    onClick={onClick}
    className={`px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center h-full cursor-pointer ${
      active
        ? "bg-white text-primary shadow-3xs"
        : "text-slate-400 hover:text-slate-600"
    }`}
  >
    <span>{label}</span>
  </button>
);
