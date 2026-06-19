import React, { useState } from "react";
import {
  X,
  Calendar,
  User,
  ChevronDown,
  ShieldCheck,
  Activity,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AuditTrailFilter = ({ isOpen, onClose, filters, setFilters }) => {
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [actionDropdownOpen, setActionDropdownOpen] = useState(false);

  const handleReset = () => {
    setFilters({
      page: 1,
      limit: 10,
      q: "",
      username: "",
      fromDate: "",
      toDate: "",
      adminUsername: "",
      actionCode: "",
      category: "",
    });
    setCategoryDropdownOpen(false);
    setActionDropdownOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex justify-end bg-zinc-950/20 font-sans text-slate-800"
        >
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="bg-white relative w-full max-w-[480px] h-full shadow-2xl flex flex-col z-10"
          >
            {/* Round window close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 z-10 flex items-center justify-center w-8 h-8 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 rounded-full transition-all active:scale-95 shadow-sm cursor-pointer"
            >
              <X size={15} />
            </button>

            {/* Header Title Section */}
            <div className="px-8 pt-5 pb-6 select-none">
              <h2 className="text-xl font-black text-[#074073] tracking-tight">
                Filter Audit Logs
              </h2>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Narrow down activity records by staff members, time windows, or
                operation types.
              </p>
            </div>
            <div className="border-b mx-8 border-slate-100"></div>

            {/* Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-5">
              {/* INPUT 1: STAFF MEMBER USERNAME */}
              <FilterField label="Performed By (Staff Member)" icon={User}>
                <input
                  type="text"
                  placeholder="Enter staff name..."
                  value={filters.username || ""}
                  onChange={(e) =>
                    setFilters({ ...filters, username: e.target.value })
                  }
                  className="w-full pl-[74px] pr-5 h-12 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#074073] focus:bg-white transition-all shadow-3xs"
                />
              </FilterField>

              {/* INPUT 2: ELEVATED MANAGER SIGN-OFF AUTHOR */}
              <FilterField
                label="Authorized By (Supervisor Sign-off)"
                icon={ShieldCheck}
              >
                <input
                  type="text"
                  placeholder="Enter supervisor username..."
                  value={filters.adminUsername || ""}
                  onChange={(e) =>
                    setFilters({ ...filters, adminUsername: e.target.value })
                  }
                  className="w-full pl-[74px] pr-5 h-12 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#074073] focus:bg-white transition-all shadow-3xs"
                />
              </FilterField>

              {/* INPUT 3: STANDARD INPUT - ACTIVITY CATEGORY */}
              <FilterField label="Activity Category" icon={Layers}>
                <input
                  type="text"
                  placeholder="e.g. Member Management, Loan Finance"
                  value={filters.category || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      category: e.target.value,
                    })
                  }
                  className="w-full pl-[74px] pr-5 h-12 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#074073] focus:bg-white transition-all shadow-3xs"
                />
              </FilterField>

              {/* INPUT 4: STANDARD INPUT - SYSTEM ACTION CODE */}
              <FilterField label="System Action Code" icon={Activity}>
                <input
                  type="text"
                  placeholder="e.g. VIEW_MEMBER_RECORD, RECORD_MANUAL_PAYMENT"
                  value={filters.actionCode || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      actionCode: e.target.value,
                    })
                  }
                  className="w-full pl-[74px] pr-5 h-12 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#074073] focus:bg-white transition-all shadow-3xs font-mono uppercase"
                />
              </FilterField>

              {/* INPUT 5: TIMEFRAME HORIZONTAL DATE WINDOW GRID */}
              <div className="space-y-3 pt-4 border-t border-slate-100 select-none">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Activity Timeframe
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                  <FilterField label="Start Date" icon={Calendar}>
                    <input
                      type="date"
                      value={filters.startDate || ""}
                      onChange={(e) =>
                        setFilters({ ...filters, startDate: e.target.value })
                      }
                      className="w-full pl-[74px] pr-4 h-12 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all text-xs font-semibold text-slate-700 shadow-3xs uppercase"
                    />
                  </FilterField>

                  <FilterField label="End Date" icon={Calendar}>
                    <input
                      type="date"
                      value={filters.endDate || ""}
                      onChange={(e) =>
                        setFilters({ ...filters, endDate: e.target.value })
                      }
                      className="w-full pl-[74px] pr-4 h-12 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all text-xs font-semibold text-slate-700 shadow-3xs uppercase"
                    />
                  </FilterField>
                </div>
              </div>
            </div>

            {/* Bottom Actions Footer Dock */}
            <div className="p-8 py-5 border-t border-slate-100 flex gap-3 bg-white select-none">
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 h-12 font-bold text-xs bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-all cursor-pointer"
              >
                Reset All
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-[2] h-12 font-bold text-xs bg-[#074073] text-white rounded-xl hover:bg-[#052d52] transition-all shadow-md cursor-pointer"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FilterField = ({ label, icon: Icon, children }) => (
  <div className="space-y-2 w-full">
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 block select-none">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none z-10">
        <Icon
          size={16}
          className="text-slate-300 group-focus-within:text-[#074073] transition-colors"
        />
        <div className="w-[1.5px] h-5 bg-slate-200 ml-4 group-focus-within:bg-[#074073]/20 transition-colors" />
      </div>
      {children}
    </div>
  </div>
);

export default AuditTrailFilter;
