import React, { useState } from "react";
import {
  FileText,
  Layers,
  Eye,
  AlertTriangle,
  CheckCircle2,
  Search,
  Smartphone,
  Check,
  X,
  Filter,
  Download,
  Plus,
} from "lucide-react";

export default function LoanApplications() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const loanApplications = [
    {
      id: "b0d1b573-e491-403b-b2e8-4daa7633ecc3",
      application_number: "APP-00002",
      loan_code: "L00002",
      applicant_name: "ALMASI ALUOCH",
      applicant_mobile: "+254765350350",
      loan_org_code: "BA208",
      loan_type: "Development_loan",
      applied_amount: "60,000.00",
      loan_period: 8,
      duration_key: "pm",
      loan_channel: "WEB",
      loan_purpose: "I would like to buy a car",
      application_date: "2026-06-13",
      eligibility_passed: true,
      status: "pending_credit_committee",
      status_label: "Pending Credit Committee",
      current_stage_label: "Credit Committee",
      committee_approvals_received: 2,
      product: {
        product_name: "Development Loan",
        product_code: "Development_loan",
        committee_approvals_required: 3,
        interest_rate: "1.5000",
        interest_method: "reducing_balance",
      },
      eligibility_result: {
        limit: "110,005.00",
        total_shares: "22,001.00",
        total_savings: "250,201.00",
      },
    },
    {
      id: "a2d1b573-f491-403b-b2e8-4daa7633edd4",
      application_number: "APP-00003",
      loan_code: "L00003",
      applicant_name: "EMMANUEL KIPCHOGE",
      applicant_mobile: "+254712345678",
      loan_org_code: "BA208",
      loan_type: "Emergency_loan",
      applied_amount: "45,000.00",
      loan_period: 3,
      duration_key: "pm",
      loan_channel: "MOBILE",
      loan_purpose: "Medical emergency settlement",
      application_date: "2026-06-14",
      eligibility_passed: true,
      status: "pending_credit_committee",
      status_label: "Pending Credit Committee",
      current_stage_label: "Credit Committee",
      committee_approvals_received: 1,
      product: {
        product_name: "Instant Emergency Loan",
        product_code: "EMG_L02",
        committee_approvals_required: 2,
        interest_rate: "1.5000",
        interest_method: "flat_rate",
      },
      eligibility_result: {
        limit: "50,000.00",
        total_shares: "12,500.00",
        total_savings: "18,400.00",
      },
    },
    {
      id: "c9d1b573-g491-403b-b2e8-4daa7633eee5",
      application_number: "APP-00004",
      loan_code: "L00004",
      applicant_name: "BEATRICE WANGARI",
      applicant_mobile: "+254722987654",
      loan_org_code: "BA208",
      loan_type: "Asset_Financing",
      applied_amount: "1,200,000.00",
      loan_period: 36,
      duration_key: "pm",
      loan_channel: "WEB",
      loan_purpose: "Commercial green house installment",
      application_date: "2026-06-11",
      eligibility_passed: true,
      status: "approved",
      status_label: "Approved & Disbursed",
      current_stage_label: "Disbursed",
      committee_approvals_received: 3,
      product: {
        product_name: "Asset Financing Facility",
        product_code: "AST_F03",
        committee_approvals_required: 3,
        interest_rate: "13.5000",
        interest_method: "reducing_balance",
      },
      eligibility_result: {
        limit: "2,500,000.00",
        total_shares: "600,000.00",
        total_savings: "920,000.00",
      },
    },
    {
      id: "f8d1b573-h491-403b-b2e8-4daa7633fff6",
      application_number: "APP-00005",
      loan_code: "L00005",
      applicant_name: "DAVID OCHIENG",
      applicant_mobile: "+254701234321",
      loan_org_code: "BA208",
      loan_type: "Education_loan",
      applied_amount: "85,000.00",
      loan_period: 12,
      duration_key: "pm",
      loan_channel: "USSD",
      loan_purpose: "Tuition fee payment for university tier execution",
      application_date: "2026-06-15",
      eligibility_passed: true,
      status: "pending_credit_committee",
      status_label: "Pending Credit Committee",
      current_stage_label: "Credit Committee",
      committee_approvals_received: 0,
      product: {
        product_name: "Elimu Education Loan",
        product_code: "Education_loan",
        committee_approvals_required: 2,
        interest_rate: "10.0000",
        interest_method: "reducing_balance",
      },
      eligibility_result: {
        limit: "120,000.00",
        total_shares: "35,000.00",
        total_savings: "40,000.00",
      },
    },
    {
      id: "d7d1b573-i491-403b-b2e8-4daa7633ggg7",
      application_number: "APP-00006",
      loan_code: "L00006",
      applicant_name: "FRANCIS MWANGI",
      applicant_mobile: "+254721555666",
      loan_org_code: "BA208",
      loan_type: "Agri_Business",
      applied_amount: "350,000.00",
      loan_period: 24,
      duration_key: "pm",
      loan_channel: "MOBILE",
      loan_purpose:
        "Agricultural input sourcing and cold chain logistics setup",
      application_date: "2026-06-12",
      eligibility_passed: true,
      status: "pending_credit_committee",
      status_label: "Pending Credit Committee",
      current_stage_label: "Credit Committee",
      committee_approvals_received: 1,
      product: {
        product_name: "Kilimo Bora Agri-Business",
        product_code: "Agri_Business",
        committee_approvals_required: 3,
        interest_rate: "11.5000",
        interest_method: "reducing_balance",
      },
      eligibility_result: {
        limit: "450,000.00",
        total_shares: "150,000.00",
        total_savings: "165,000.00",
      },
    },
    {
      id: "e8d1b573-j491-403b-b2e8-4daa7633hhh8",
      application_number: "APP-00007",
      loan_code: "L00007",
      applicant_name: "AMINA MOHAMED",
      applicant_mobile: "+254733444555",
      loan_org_code: "BA208",
      loan_type: "Commercial_Premium",
      applied_amount: "2,500,000.00",
      loan_period: 48,
      duration_key: "pm",
      loan_channel: "WEB",
      loan_purpose:
        "Retail business inventory scaling and storefront expansion",
      application_date: "2026-06-14",
      eligibility_passed: true,
      status: "pending_credit_committee",
      status_label: "Pending Credit Committee",
      current_stage_label: "Credit Committee",
      committee_approvals_received: 2,
      product: {
        product_name: "Biashara Jiinue Premium",
        product_code: "Commercial_Premium",
        committee_approvals_required: 4,
        interest_rate: "14.0000",
        interest_method: "reducing_balance",
      },
      eligibility_result: {
        limit: "3,200,000.00",
        total_shares: "800,000.00",
        total_savings: "1,200,000.00",
      },
    },
  ];

  // Pipeline execution filters matching client routing states
  const filteredApplications = loanApplications.filter((app) => {
    const matchesSearch =
      app.applicant_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.application_number.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "pending")
      return matchesSearch && app.status === "pending_credit_committee";
    if (activeTab === "approved")
      return matchesSearch && app.status === "approved";
    return matchesSearch;
  });

  const metrics = {
    total: loanApplications.length,
    pending: loanApplications.filter(
      (a) => a.status === "pending_credit_committee",
    ).length,
    volume: "1,305,000.00",
  };

  return (
    <div className="w-full space-y-6 font-sans antialiased text-slate-800">
      {/* 1. UPPER EXECUTIVE COMMAND BAR */}
      <div className="flex flex-col sm:gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200/60 pb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-primary">
            Loan Applications
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Audit pipeline risk validation, monitor algorithmic credit limits,
            and process board committee vetting updates.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 h-11 px-5 w-fit bg-slate-900 text-white rounded-xl text-xs font-bold shadow-sm hover:bg-slate-800 transition-all cursor-pointer">
          <Plus size={15} />
          <span>Add Loan Application</span>
        </button>
      </div>

      {/* 2. CORE FINANCIAL METRIC deck */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryMetricCard
          title="Active Pipeline Volume"
          value={`${metrics.total} Files In-Flight`}
          desc="Across all product calculation frames"
          icon={<Layers size={18} />}
          color="text-primary bg-primary/5"
        />
        <SummaryMetricCard
          title="Committee Quorum Queue"
          value={`${metrics.pending} Awaiting Vote`}
          desc="Requires multi-tier executive approval"
          icon={<AlertTriangle size={18} />}
          color="text-warning bg-warning/5"
        />
        <SummaryMetricCard
          title="Total Capital Value Pool"
          value={`KES ${metrics.volume}`}
          desc="Aggregated pipeline exposure ceiling"
          icon={<CheckCircle2 size={18} />}
          color="text-success bg-success/5"
        />
      </div>

      {/* 3. INTERACTIVE CONTROL STRIP */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xs p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Dynamic Context Search Bar */}
        <div className="relative w-full md:w-72">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by app number or applicant name..."
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

      {/* 4. HIGH-DENSITY Tabular UNDERWRITING LEDGER */}
      {filteredApplications.length > 0 ? (
        <div className="w-full bg-white rounded-3xl border border-slate-200/60 shadow-xs overflow-hidden">
          <table className="w-full text-left border-collapse font-sans table-auto">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200/60 text-[10px] font-bold text-slate-400 uppercase tracking-widest select-none">
                <th className="py-4.5 px-6">Application & Member</th>
                <th className="py-4.5 px-6">Lending Product</th>
                <th className="py-4.5 px-6">Amount & Period</th>
                <th className="py-4.5 px-6">Interest Rate Parameters</th>
                <th className="py-4.5 px-6">Current Application Stage</th>
                <th className="py-4.5 px-6 text-right pr-8">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-xs tracking-tight">
              {filteredApplications.map((app) => (
                <tr
                  key={app.id}
                  className="group transition-colors hover:bg-slate-50/60"
                >
                  {/* Col 1: Identity Profile */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-sans font-bold text-[9px] tracking-wider uppercase px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                          {app.application_number}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                          Code: {app.loan_code}
                        </span>
                      </div>
                      <span className="font-semibold text-slate-900 text-sm tracking-tight group-hover:text-primary transition-colors">
                        {app.applicant_name}
                      </span>
                      <span className="text-[11px] text-slate-400 font-normal flex items-center gap-1">
                        <Smartphone size={11} /> {app.applicant_mobile}
                      </span>
                    </div>
                  </td>

                  {/* Col 2: Target Framework Product */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col space-y-1.5">
                      <span className="font-semibold text-slate-800 text-sm tracking-tight">
                        {app.product.product_name}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-sans font-bold text-[9px] tracking-wider uppercase px-1.5 py-0.5 bg-slate-50 text-slate-400 rounded border border-slate-200/40">
                          {app.product.product_code}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Col 3: Capital Request Metrics */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col space-y-1.5">
                      <span className="font-semibold text-slate-900 text-sm tracking-tight">
                        KES {app.applied_amount}
                      </span>
                      <div className="text-[11px] text-slate-400 font-medium flex items-center gap-2">
                        <span>
                          Tenor:{" "}
                          <span className="text-slate-700 font-semibold">
                            {app.loan_period} Mos
                          </span>
                        </span>
                        <span className="size-1 bg-slate-200 rounded-full" />
                        <span className="text-primary font-bold text-[9px] bg-primary/5 px-1.5 py-0.5 rounded uppercase">
                          {app.loan_channel}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* NEW Col 4: Interest Rate Parameters */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col space-y-1">
                      <span className="font-semibold text-slate-900 text-sm tracking-tight">
                        {parseFloat(app.product.interest_rate).toFixed(2)}%{" "}
                        <span className="text-[10px] text-slate-400 font-normal">
                          p.m.
                        </span>
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium capitalize">
                        {app.product.interest_method.replace("_", " ")}
                      </span>
                    </div>
                  </td>

                  {/* NEW Col 5: Current Stage & Status Label */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col space-y-1.5">
                      <span className="font-semibold text-slate-800 text-sm tracking-tight">
                        {app.current_stage_label}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md border w-fit ${
                          app.status === "approved"
                            ? "bg-success/5 border-success/10 text-success"
                            : "bg-warning/5 border-warning/10 text-warning"
                        }`}
                      >
                        {app.status_label}
                      </span>
                    </div>
                  </td>

                  {/* Col 6: Operational Admin Controls */}
                  <td className="py-4 px-6 text-right pr-8">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        className="size-8 rounded-xl border border-slate-200/60 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-slate-50 hover:border-slate-300 transition-all shadow-2xs bg-white cursor-pointer"
                        title="View Application Audit File"
                      >
                        <Eye size={14} />
                      </button>
                      {app.status !== "approved" && (
                        <>
                          <button
                            className="size-8 rounded-xl border border-emerald-100 flex items-center justify-center text-success hover:bg-emerald-50 hover:border-emerald-200 transition-all shadow-2xs bg-white cursor-pointer"
                            title="Affirm Committee Approval Vote"
                          >
                            <Check size={14} />
                          </button>
                          <button
                            className="size-8 rounded-xl border border-rose-100 flex items-center justify-center text-error hover:bg-rose-50 hover:border-rose-200 transition-all shadow-2xs bg-white cursor-pointer"
                            title="Log Disapproval Veto"
                          >
                            <X size={14} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white border border-dashed border-slate-300 rounded-[28px] p-16 text-center max-w-xl mx-auto mt-6">
          <div className="size-12 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 mx-auto mb-4">
            <FileText size={22} />
          </div>
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">
            No applications cataloged
          </h3>
          <p className="text-xs text-slate-400 font-medium max-w-xs mx-auto mt-2 leading-relaxed">
            There are no active or legacy records matching "{searchQuery}" under
            the current filter views.
          </p>
        </div>
      )}
    </div>
  );
}

/* ==========================================================================
   SUPPORTIVE CHILD UTILITIES
   ========================================================================== */

const SummaryMetricCard = ({ title, value, desc, icon, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-xs flex items-start justify-between">
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        {title}
      </p>
      <h3 className="text-xl font-bold text-slate-800 tracking-tight pt-1">
        {value}
      </h3>
      <p className="text-[11px] text-slate-400 font-medium leading-normal pt-1">
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
    className={`px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
      active
        ? "bg-white text-primary shadow-2xs"
        : "text-slate-400 hover:text-slate-600"
    }`}
  >
    <span>{label}</span>
  </button>
);
