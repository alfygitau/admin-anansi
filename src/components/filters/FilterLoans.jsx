import React, { useState, useEffect } from "react";
import {
  X,
  SlidersHorizontal,
  Hash,
  Bookmark,
  Layers,
  Calendar,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FilterLoans({
  isOpen,
  onClose,
  filters,
  setFilters,
  onApply,
}) {
  const handleInputChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleClearAll = () => {
    setFilters((prev) => ({
      ...prev,
      status: "",
      loan_code: "",
      application_number: "",
      loan_type: "",
      loan_product_code: "",
      fromDate: "",
      toDate: "",
    }));
  };

  const handleApplySubmission = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex justify-end bg-zinc-950/20 font-sans antialiased text-slate-800"
        >
          {/* Dismiss Panel Backdrop Guard */}
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="bg-white relative w-full max-w-[480px] h-full shadow-2xl flex flex-col z-10"
          >
            {/* Header Block Section Layout */}
            <div className="px-8 pt-5 pb-5 select-none relative">
              <button
                type="button"
                onClick={onClose}
                className="absolute top-5 right-5 w-8 h-8 bg-slate-100 hover:bg-slate-200 text-gray-500 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-3xs active:scale-95"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-2.5">
                <div className="size-6 rounded-lg bg-blue-50 border border-blue-100 text-[#074073] flex items-center justify-center">
                  <SlidersHorizontal size={12} strokeWidth={2.5} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#074073]">
                  Search Optimization
                </span>
              </div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1.5">
                Filter Loans
              </h2>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Narrow down your dashboard view using specific search
                parameters.
              </p>
            </div>

            <div className="border-b mx-8 border-slate-100"></div>

            {/* Scrollable Filter Fields Chassis Core */}
            <div className="flex-1 overflow-y-auto px-8 py-5 space-y-5">
              {/* SECTION A: DIRECT SEARCH IDENTIFIERS */}
              <div className="space-y-4">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block select-none px-0.5">
                  File Tracking Info
                </span>

                <FilterField label="Loan Code" icon={Hash}>
                  <input
                    type="text"
                    placeholder="e.g., L00001"
                    value={filters.loan_code}
                    onChange={(e) =>
                      handleInputChange("loan_code", e.target.value)
                    }
                    className="w-full pl-[68px] pr-5 h-12 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#074073] focus:bg-white transition-all shadow-3xs"
                  />
                </FilterField>

                <FilterField label="Loan Product Code" icon={Bookmark}>
                  <input
                    type="text"
                    placeholder="e.g., DEV-01, EMG-04"
                    value={filters.loan_product_code}
                    onChange={(e) =>
                      handleInputChange("loan_product_code", e.target.value)
                    }
                    className="w-full pl-[68px] pr-5 h-12 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#074073] focus:bg-white transition-all shadow-3xs"
                  />
                </FilterField>
              </div>

              {/* SECTION B: CLASSIFICATIONS & DROPDOWNS */}
              <div className="space-y-4 pt-2">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block select-none px-0.5">
                  Status & Category Groups
                </span>

                <FilterField label="Application Status" icon={CheckCircle2}>
                  <select
                    value={filters.status}
                    onChange={(e) =>
                      handleInputChange("status", e.target.value)
                    }
                    className="w-full pl-[68px] pr-5 h-12 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#074073] focus:bg-white transition-all shadow-3xs appearance-none cursor-pointer"
                  >
                    <option value="">All Verification Stages</option>
                    <option value="pending">Pending Approval</option>
                    <option value="approved">Approved / Ready</option>
                    <option value="disbursed">Disbursed</option>
                    <option value="rejected">Rejected / Closed</option>
                  </select>
                </FilterField>

                <FilterField label="Loan Type Classification" icon={Layers}>
                  <select
                    value={filters.loan_type}
                    onChange={(e) =>
                      handleInputChange("loan_type", e.target.value)
                    }
                    className="w-full pl-[68px] pr-5 h-12 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#074073] focus:bg-white transition-all shadow-3xs appearance-none cursor-pointer"
                  >
                    <option value="">All Structural Categories</option>
                    <option value="development">Development Loans</option>
                    <option value="emergency">Emergency Loans</option>
                    <option value="asset_finance">Asset Finance</option>
                    <option value="education">School Fees/Education</option>
                  </select>
                </FilterField>
              </div>

              {/* SECTION C: CALENDAR DATE WINDOW FRAMES */}
              <div className="space-y-3 pt-2">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block select-none px-0.5">
                  Submission Date Window
                </span>

                <div className="grid grid-cols-2 gap-3 w-full">
                  <FilterField label="From Date" icon={Calendar}>
                    <input
                      type="date"
                      value={filters.fromDate}
                      onChange={(e) =>
                        handleInputChange("fromDate", e.target.value)
                      }
                      className="w-full pl-[68px] pr-4 h-12 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#074073] focus:bg-white transition-all shadow-3xs cursor-pointer"
                    />
                  </FilterField>

                  <FilterField label="To Date" icon={Calendar}>
                    <input
                      type="date"
                      value={filters.toDate}
                      onChange={(e) =>
                        handleInputChange("toDate", e.target.value)
                      }
                      className="w-full pl-[68px] pr-4 h-12 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#074073] focus:bg-white transition-all shadow-3xs cursor-pointer"
                    />
                  </FilterField>
                </div>
              </div>
            </div>

            {/* Bottom Action Controls Footer Panel Dock */}
            <div className="p-6 px-8 border-t border-slate-100 flex gap-3 select-none bg-white">
              <button
                type="button"
                onClick={handleClearAll}
                className="flex-1 h-11 font-bold text-xs bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-3xs"
              >
                <RefreshCw size={12} />
                <span>Reset Filter</span>
              </button>

              <button
                type="button"
                onClick={handleApplySubmission}
                className="flex-[1.5] h-11 font-bold text-xs bg-[#074073] text-white rounded-xl shadow-md flex items-center justify-center gap-2 hover:bg-[#052d52] transition-colors cursor-pointer active:scale-[0.98]"
              >
                Apply Active Filters
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const FilterField = ({ label, icon: Icon, children }) => (
  <div className="space-y-1 w-full text-left">
    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1 select-none block">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none z-10">
        <Icon
          size={15}
          className="text-slate-300 group-focus-within:text-[#074073] transition-colors"
        />
        <div className="w-[1.5px] h-4 bg-slate-200/80 ml-3.5 group-focus-within:bg-[#074073]/20 transition-colors" />
      </div>
      {children}
    </div>
  </div>
);
