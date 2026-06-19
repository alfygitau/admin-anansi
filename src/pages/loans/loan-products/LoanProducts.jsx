import React, { useState } from "react";
import {
  Plus,
  Layers,
  Power,
  Edit2,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoanProducts() {
  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const loanProducts = [
    {
      id: "PROD-DEV-01",
      name: "Normal Development Loan",
      code: "DEV_L01",
      status: "active",
      interestRate: "12% p.a.",
      interestType: "Reducing Balance",
      maxTenor: "72 Months",
      multiplier: "3x Shares",
      minDeposits: "KES 50,000",
      maxAmount: "KES 5,000,000",
      guarantorsRequired: "Minimum 3",
      insuranceFee: "0.5% upfront",
      description:
        "Long-term investment funding engineered for capital development and property asset acquisitions.",
    },
    {
      id: "PROD-EMG-02",
      name: "Instant Emergency Loan",
      code: "EMG_L02",
      status: "active",
      interestRate: "1.5% per month",
      interestType: "Flat Rate",
      maxTenor: "12 Months",
      multiplier: "1x Shares",
      minDeposits: "KES 10,000",
      maxAmount: "KES 150,000",
      guarantorsRequired: "Not Required",
      insuranceFee: "1.0% upfront",
      description:
        "Immediate relief funding channeled directly via mobile money networks for prompt financial bridging.",
    },
    {
      id: "PROD-AST-03",
      name: "Asset Financing Facility",
      code: "AST_F03",
      status: "active",
      interestRate: "13.5% p.a.",
      interestType: "Reducing Balance",
      maxTenor: "48 Months",
      multiplier: "4x Collateralized Value",
      minDeposits: "KES 100,000",
      maxAmount: "KES 10,000,000",
      guarantorsRequired: "Minimum 2 + Asset Chattels",
      insuranceFee: "0.75% annualized",
      description:
        "Structured vehicle and logbook processing systems optimized for physical machinery acquisitions.",
    },
    {
      id: "PROD-SAL-04",
      name: "Salary Advance Buffer",
      code: "SAL_A04",
      status: "inactive",
      interestRate: "5.0% flat fee",
      interestType: "One-off deduction",
      maxTenor: "3 Months",
      multiplier: "Up to 50% net pay",
      minDeposits: "KES 5,000",
      maxAmount: "KES 80,000",
      guarantorsRequired: "Not Required",
      insuranceFee: "None",
      description:
        "Short term payroll check-off bridge structured to cover immediate month-end cash flow mismatches.",
    },
    {
      id: "PROD-EDU-05",
      name: "Elimu Education Loan",
      code: "EDU_L05",
      status: "active",
      interestRate: "10% p.a.",
      interestType: "Reducing Balance",
      maxTenor: "12 Months",
      multiplier: "3x Shares",
      minDeposits: "KES 20,000",
      maxAmount: "KES 500,000",
      guarantorsRequired: "Minimum 2",
      insuranceFee: "0.4% upfront",
      description:
        "Dedicated education funding mapped to term calendars for seamless tuition and school fee disbursements.",
    },
    {
      id: "PROD-AGR-06",
      name: "Kilimo Bora Agri-Business",
      code: "AGR_F06",
      status: "active",
      interestRate: "11.5% p.a.",
      interestType: "Reducing Balance",
      maxTenor: "36 Months",
      multiplier: "3x Shares",
      minDeposits: "KES 30,000",
      maxAmount: "KES 2,000,000",
      guarantorsRequired: "Minimum 2 + Crop Registry",
      insuranceFee: "0.6% upfront",
      description:
        "Tailored financial injection designed for agricultural input sourcing, cold chain logistics, and mechanized equipment upgrades.",
    },
    {
      id: "PROD-BIA-07",
      name: "Biashara Jiinue Premium",
      code: "BIA_P07",
      status: "inactive",
      interestRate: "14% p.a.",
      interestType: "Reducing Balance",
      maxTenor: "60 Months",
      multiplier: "4x Shares",
      minDeposits: "KES 150,000",
      maxAmount: "KES 7,500,000",
      guarantorsRequired: "Minimum 4",
      insuranceFee: "0.8% upfront",
      description:
        "Legacy high-tier enterprise scale investment framework structured for commercial scaling, currently suspended for portfolio review.",
    },
  ];

  // Pipeline Filter logic matching state arrays
  const filteredProducts = loanProducts.filter(
    (product) =>
      product.status === activeTab &&
      product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const stats = {
    total: loanProducts.length,
    active: loanProducts.filter((p) => p.status === "active").length,
    inactive: loanProducts.filter((p) => p.status === "inactive").length,
  };

  return (
    <div className="space-y-6 antialiased">
      {/* 1. UPPER EXECUTIVE COMMAND BAR */}
      <div className="flex flex-col sm:gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200/60 pb-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-primary">
            Loan Products
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Configure lending tiers, algorithmic multipliers, interest
            calculations, and product visibility gates.
          </p>
        </div>

        {/* Core Primary Action Trigger */}
        <button
          onClick={() => navigate("/admin/add-loan-product")}
          className="h-11 px-4 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/10 hover:bg-primary/90 transition-all active:scale-95 shrink-0"
        >
          <Plus size={16} />
          <span>Create New Product</span>
        </button>
      </div>

      {/* 2. ANALYTICAL HIGH-LEVEL SUMMARY METRIC ROWS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryMetricCard
          title="Total Registered Catalog"
          value={`${stats.total} Loan Products`}
          desc="Across all active and legacy product lines"
          icon={<Layers size={18} />}
          color="text-primary bg-primary/5"
        />
        <SummaryMetricCard
          title="Active Products In Circulation"
          value={`${stats.active} Operational`}
          desc="Visible to member portals for loan drafting"
          icon={<CheckCircle2 size={18} />}
          color="text-success bg-success/5"
        />
        <SummaryMetricCard
          title="Deactivated Product Lines"
          value={`${stats.inactive} Offline`}
          desc="Archived products restricted from entry"
          icon={<AlertTriangle size={18} />}
          color="text-warning bg-warning/5"
        />
      </div>

      {/* 3. INTERACTIVE SEARCH FILTER & ACCORDION CONTROL PANE */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Local Scope Product Filter Search Input */}
        <div className="relative w-full md:w-72">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter products by code or name..."
            className="w-full h-10 pl-9 pr-4 bg-slate-50 border border-slate-200/60 rounded-xl text-xs font-medium outline-none transition-all focus:bg-white focus:border-primary placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* 4. PRODUCT MATRIX DENSE TABULAR CANVAS */}
      {filteredProducts.length > 0 ? (
        <div className="w-full bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              {/* Table Header Structure */}
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200/60 text-[10px] font-bold text-slate-400 uppercase tracking-widest select-none">
                  <th className="py-4.5 px-6">Product Code & Name</th>
                  <th className="py-4.5 px-6">Interest Configuration</th>
                  <th className="py-4.5 px-6">Tenor & Multiplier</th>
                  <th className="py-4.5 px-6">Amounts Requirements</th>
                  <th className="py-4.5 px-6">Underwriting Rules</th>
                  <th className="py-4.5 px-6">Status</th>
                  <th className="py-4.5 px-6 text-right pr-8">Actions</th>
                </tr>
              </thead>

              {/* Table Body Content Matrix */}
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className={`group transition-colors hover:bg-slate-50/60 ${
                      product.status !== "active" ? "bg-slate-50/20" : ""
                    }`}
                  >
                    {/* Column 1: Core Identification Assets */}
                    <td className="py-4 px-6 max-w-xs">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[10px] tracking-wide uppercase px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                            {product.code}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 font-medium">
                            {product.id}
                          </span>
                        </div>
                        <span className="font-bold text-slate-800 text-sm tracking-tight truncate group-hover:text-primary transition-colors">
                          {product.name}
                        </span>
                      </div>
                    </td>

                    {/* Column 2: Interest Parameter Models */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-700 text-sm">
                          {product.interestRate}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium mt-0.5">
                          {product.interestType}
                        </span>
                      </div>
                    </td>

                    {/* Column 3: Amortization Framing Tiers */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-700">
                          {product.maxTenor}
                        </span>
                        <span className="text-[11px] text-primary font-bold tracking-wide uppercase mt-0.5">
                          {product.multiplier}
                        </span>
                      </div>
                    </td>

                    {/* Column 4: Dynamic Capital Range Limits */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <div className="text-slate-700 font-medium">
                          Max:{" "}
                          <span className="font-bold">{product.maxAmount}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                          Min Floor: {product.minDeposits}
                        </div>
                      </div>
                    </td>

                    {/* Column 5: Legal Risk Contingencies */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-700">
                          {product.guarantorsRequired}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                          Levy: {product.insuranceFee}
                        </span>
                      </div>
                    </td>

                    {/* Column 6: Status Allocation Indicator Flags */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full ${
                          product.status === "active"
                            ? "bg-success/10 text-success"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${product.status === "active" ? "bg-success" : "bg-slate-400"}`}
                        />
                        {product.status}
                      </span>
                    </td>

                    {/* Column 7: Operational Admin Utilities */}
                    <td className="py-4 px-6 text-right pr-8">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          className="size-8 rounded-xl border border-slate-200/60 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm bg-white"
                          title="View Extended Rules"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => navigate("/admin/edit-loan-product")}
                          className="size-8 rounded-xl border border-slate-200/60 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm bg-white"
                          title="Edit Parameters"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          className={`size-8 rounded-xl border flex items-center justify-center transition-all shadow-sm bg-white ${
                            product.status === "active"
                              ? "border-rose-100 text-error hover:bg-rose-50 hover:border-rose-200"
                              : "border-emerald-100 text-success hover:bg-emerald-50 hover:border-emerald-200"
                          }`}
                          title={
                            product.status === "active"
                              ? "Deactivate Product"
                              : "Activate Product"
                          }
                        >
                          <Power size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Empty Ledger Redirection Screen State */
        <div className="bg-white border border-dashed border-slate-300 rounded-[28px] p-16 text-center max-w-xl mx-auto mt-6">
          <div className="size-12 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 mx-auto mb-4">
            <Layers size={22} />
          </div>
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">
            No configured products found
          </h3>
          <p className="text-xs text-slate-400 font-medium max-w-xs mx-auto mt-2 leading-relaxed">
            There are no product profiles matching "{searchQuery}" under the
            current {activeTab} framework toggle index.
          </p>
        </div>
      )}
    </div>
  );
}

/* ==========================================================================
   SUPPORTIVE CHILD COMPONENTS FOR HIGH DESIGN SCANNABILITY
   ========================================================================== */

// Dashboard Summary Counters Components Template
const SummaryMetricCard = ({ title, value, desc, icon, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex items-start justify-between">
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
