import React, { useState } from "react";
import {
  CreditCard,
  Clock,
  Search,
  ArrowRight,
  PlusCircle,
  FileText,
  DollarSign,
  Sliders,
  Download,
  Filter,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LoanReviews = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock pending items for the Loan Module (excluding loan applications)
  const pendingLoanActions = [
    {
      id: "REQ-LON-881",
      category: "Product Creation",
      title: "New Product: Emergency Micro-Advance 30D",
      targetEntity: "SACCO Product Catalog",
      maker: "David Mwangi (Product Manager)",
      timestamp: "18 Sep 2026, 15:10 EAT",
      priority: "Medium",
      summary:
        "Created a 30-day short-term advance product with a flat 5% interest rate and automated mobile wallet disbursement.",
    },
    {
      id: "REQ-LON-885",
      category: "Manual Payment",
      title: "Manual Clearing & Settlement Override",
      targetEntity: "Loan # LON-2026-491 (Grace Achieng)",
      maker: "Hellen Wanjiru (Teller)",
      timestamp: "18 Sep 2026, 13:45 EAT",
      priority: "High",
      summary:
        "Manual offset of KES 24,000 cash payment directly against principal arrears due to a bank system downtime incident.",
    },
    {
      id: "REQ-LON-892",
      category: "Product Modification",
      title: "Interest Rate Adjustment for Business Loan Tier 2",
      targetEntity: "SACCO Product Catalog",
      maker: "David Mwangi (Product Manager)",
      timestamp: "17 Sep 2026, 10:20 EAT",
      priority: "High",
      summary:
        "Reducing annual reducing balance rate from 14% to 12.5% to stay competitive with commercial market rates.",
    },
    {
      id: "REQ-LON-904",
      category: "Loan Restructuring",
      title: "Tenure Extension & Holiday Request",
      targetEntity: "Loan # LON-2025-102 (Alpha Transporters Ltd)",
      maker: "Sarah Wanjiku (Credit Officer)",
      timestamp: "17 Sep 2026, 09:15 EAT",
      priority: "Medium",
      summary:
        "Granting a 2-month principal repayment moratorium due to unexpected supply chain disruptions affecting company cash flow.",
    },
  ];

  const filteredItems = pendingLoanActions.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.targetEntity.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedCategory === "all") return matchesSearch;
    if (selectedCategory === "product")
      return matchesSearch && item.category.includes("Product");
    if (selectedCategory === "payment")
      return matchesSearch && item.category.includes("Payment");
    if (selectedCategory === "restructure")
      return matchesSearch && item.category.includes("Restructuring");
    return matchesSearch;
  });

  return (
    <div className="h-full bg-slate-50/60 flex flex-col overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="w-full space-y-6 flex-1 flex flex-col"
      >
        {/* TITLE & HEADER SECTION */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/60 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-amber-50 text-amber-700 rounded-md border border-amber-100 flex items-center gap-1">
                {pendingLoanActions.length} Items Require Review
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-[#074073]">
              Loan Module Validations
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Review and authorize secondary loan operations including manual
              payment overrides, product configurations, and restructurings.
            </p>
          </div>
        </div>

        {/* CONTROLS BAR: FILTER TABS & SEARCH */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Search Input (Takes up 2 columns on medium screens) */}
          <div className="md:col-span-2 relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10">
              <Search size={16} className="text-[#074073]" />
              <div className="w-[1px] h-4 bg-slate-200 ml-3" />
            </div>
            <input
              type="text"
              placeholder="Search by Request ID, Description, or Maker..."
              className="w-full pl-[58px] pr-4 h-12 bg-slate-50/60 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#074073] transition-all shadow-3xs"
            />
          </div>

          {/* Action Buttons (Filter & Export) aligned to the end */}
          <div className="flex items-center justify-end gap-2">
            <button className="flex items-center gap-1.5 h-12 px-5 border border-slate-200 bg-slate-50/60 text-slate-700 rounded-2xl text-xs font-bold hover:bg-slate-100 transition-all shadow-3xs">
              <Filter size={14} className="text-[#074073]" />
              <span>Filter</span>
            </button>
            <button className="flex items-center gap-1.5 h-12 px-5 border border-slate-200 bg-slate-50/60 text-slate-700 rounded-2xl text-xs font-bold hover:bg-slate-100 transition-all shadow-3xs">
              <Download size={14} className="text-[#074073]" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* QUEUE LIST TABLE */}
        <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-medium">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200/60 text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  <th className="p-4">Request ID & Type</th>
                  <th className="p-4">Item & Target Entity</th>
                  <th className="p-4">Maker Attribution</th>
                  <th className="p-4">Priority</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="p-4 align-top">
                        <span className="font-mono text-[10px] font-bold text-blue-600 block">
                          {item.id}
                        </span>
                        <span className="inline-block mt-1 font-bold text-[#074073] bg-blue-50 px-2 py-0.5 rounded text-[10px]">
                          {item.category}
                        </span>
                      </td>
                      <td className="p-4 align-top">
                        <span className="font-extrabold text-slate-900 text-sm block">
                          {item.title}
                        </span>
                        <span className="text-[11px] text-slate-500 block mt-0.5">
                          {item.targetEntity}
                        </span>
                      </td>
                      <td className="p-4 align-top">
                        <span className="block text-slate-800 font-semibold">
                          {item.maker}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {item.timestamp}
                        </span>
                      </td>
                      <td className="p-4 align-top">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                            item.priority === "High"
                              ? "bg-rose-50 text-rose-600 border border-rose-100"
                              : "bg-blue-50 text-blue-600 border border-blue-100"
                          }`}
                        >
                          {item.priority}
                        </span>
                      </td>
                      <td className="p-4 align-top text-right">
                        <button
                          onClick={() =>
                            navigate(`/admin/validations/review/${item.id}`)
                          }
                          className="px-4 py-2 bg-slate-100 hover:bg-[#074073] hover:text-white text-slate-700 font-bold rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5"
                        >
                          <span>Review Item</span>
                          <ArrowRight size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-12 text-center text-slate-400">
                      No loan module review items found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoanReviews;
