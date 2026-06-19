import React, { useState } from "react";
import {
  X,
  Calendar,
  Hash,
  ChevronDown,
  ArrowUpDown,
  Coins,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TransactionsFilter = ({ isOpen, onClose, filters, setFilters }) => {
  // Separate toggle states for each dropdown group
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);

  const handleReset = () => {
    setFilters({
      page: 1,
      limit: 10,
      q: "",
      status: "",
      fromDate: "",
      toDate: "",
      leastAmount: "",
      mostAmount: "",
      type: "",
    });
    setStatusDropdownOpen(false);
    setTypeDropdownOpen(false);
  };

  // Transaction specific status settings
  const statusOptions = [
    { value: "", label: "Select status..." },
    { value: "Completed", label: "Completed" },
    { value: "Pending", label: "Pending" },
    { value: "Failed", label: "Failed" },
    { value: "Reversed", label: "Reversed" },
  ];

  // Transaction specific type settings
  const typeOptions = [
    { value: "", label: "Select type..." },
    { value: "Deposit", label: "Deposit / Contribution" },
    { value: "Withdrawal", label: "Withdrawal" },
    { value: "Transfer", label: "Internal Transfer" },
    { value: "Loan Repayment", label: "Loan Repayment" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex justify-end bg-zinc-950/20"
        >
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="bg-white relative w-full max-w-[480px] h-full shadow-2xl flex flex-col z-10"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 z-10 flex items-center justify-center w-8 h-8 bg-slate-100 hover:bg-slate-200 text-gray-500 hover:text-gray-900 rounded-full transition-all active:scale-95 shadow-sm"
            >
              <X size={16} />
            </button>

            {/* Header */}
            <div className="px-8 pt-5 pb-6">
              <h2 className="text-2xl font-bold text-[#074073]">
                Filter Transactions
              </h2>
              <p className="text-sm text-slate-500 font-medium">
                Define parameters to look up financial records.
              </p>
            </div>
            <div className="border-b mx-8 border-slate-100"></div>

            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
              {/* Transaction Status Dropdown */}
              <FilterField label="Transaction Status" icon={Hash}>
                <div className="relative w-full">
                  <button
                    type="button"
                    onClick={() => {
                      setStatusDropdownOpen(!statusDropdownOpen);
                      setTypeDropdownOpen(false); // Clean overlay handoff
                    }}
                    className={`w-full pl-[74px] pr-5 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all text-xs font-semibold text-left flex items-center justify-between cursor-pointer ${
                      statusDropdownOpen
                        ? "bg-white border-[#074073] ring-4 ring-[#074073]/5"
                        : ""
                    }`}
                  >
                    <span
                      className={
                        filters.status
                          ? "text-slate-800 font-bold"
                          : "text-slate-400 font-medium"
                      }
                    >
                      {statusOptions.find((opt) => opt.value === filters.status)
                        ?.label || "Select status..."}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-slate-400 transition-transform duration-200 ml-2 shrink-0 ${
                        statusDropdownOpen ? "rotate-180 text-[#074073]" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {statusDropdownOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-30"
                          onClick={() => setStatusDropdownOpen(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 right-0 mt-2 bg-white border border-slate-200/80 rounded-2xl shadow-xl py-2 z-40 overflow-hidden"
                        >
                          {statusOptions.map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setFilters({ ...filters, status: opt.value });
                                setStatusDropdownOpen(false);
                              }}
                              className={`w-full px-6 py-3.5 text-xs text-left font-semibold transition-colors cursor-pointer ${
                                filters.status === opt.value
                                  ? "bg-blue-50/70 text-[#074073] font-bold"
                                  : "text-slate-600 hover:bg-slate-50"
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </FilterField>

              {/* Transaction Type Dropdown */}
              <FilterField label="Transaction Type" icon={ArrowUpDown}>
                <div className="relative w-full">
                  <button
                    type="button"
                    onClick={() => {
                      setTypeDropdownOpen(!typeDropdownOpen);
                      setStatusDropdownOpen(false); // Clean overlay handoff
                    }}
                    className={`w-full pl-[74px] pr-5 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all text-xs font-semibold text-left flex items-center justify-between cursor-pointer ${
                      typeDropdownOpen
                        ? "bg-white border-[#074073] ring-4 ring-[#074073]/5"
                        : ""
                    }`}
                  >
                    <span
                      className={
                        filters.type
                          ? "text-slate-800 font-bold"
                          : "text-slate-400 font-medium"
                      }
                    >
                      {typeOptions.find((opt) => opt.value === filters.type)
                        ?.label || "Select type..."}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-slate-400 transition-transform duration-200 ml-2 shrink-0 ${
                        typeDropdownOpen ? "rotate-180 text-[#074073]" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {typeDropdownOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-30"
                          onClick={() => setTypeDropdownOpen(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 right-0 mt-2 bg-white border border-slate-200/80 rounded-2xl shadow-xl py-2 z-40 overflow-hidden"
                        >
                          {typeOptions.map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setFilters({ ...filters, type: opt.value });
                                setTypeDropdownOpen(false);
                              }}
                              className={`w-full px-6 py-3.5 text-xs text-left font-semibold transition-colors cursor-pointer ${
                                filters.type === opt.value
                                  ? "bg-blue-50/70 text-[#074073] font-bold"
                                  : "text-slate-600 hover:bg-slate-50"
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </FilterField>

              {/* Amount Value range parameters */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Amount Range (KES)
                </p>
                <div className="flex flex-row items-center gap-4 w-full">
                  <FilterField label="Min Amount" icon={Coins}>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full pl-[74px] pr-4 py-5 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all text-xs font-semibold text-slate-800"
                      value={filters.leastAmount}
                      onChange={(e) =>
                        setFilters({ ...filters, leastAmount: e.target.value })
                      }
                    />
                  </FilterField>

                  <FilterField label="Max Amount" icon={Coins}>
                    <input
                      type="number"
                      placeholder="No limit"
                      className="w-full pl-[74px] pr-4 py-5 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all text-xs font-semibold text-slate-800"
                      value={filters.mostAmount}
                      onChange={(e) =>
                        setFilters({ ...filters, mostAmount: e.target.value })
                      }
                    />
                  </FilterField>
                </div>
              </div>

              {/* Transaction Timeline Grid */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Transaction Timeline
                </p>

                <div className="flex flex-row items-center gap-4 w-full">
                  <FilterField label="Start Date" icon={Calendar}>
                    <input
                      type="date"
                      className="w-full pl-[74px] pr-4 py-5 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all text-xs font-semibold uppercase text-slate-800"
                      value={filters.fromDate}
                      onChange={(e) =>
                        setFilters({ ...filters, fromDate: e.target.value })
                      }
                    />
                  </FilterField>

                  <FilterField label="End Date" icon={Calendar}>
                    <input
                      type="date"
                      className="w-full pl-[74px] pr-4 py-5 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all text-xs font-semibold uppercase text-slate-800"
                      value={filters.toDate}
                      onChange={(e) =>
                        setFilters({ ...filters, toDate: e.target.value })
                      }
                    />
                  </FilterField>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 py-5 border-t border-slate-100 flex gap-3 bg-white">
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 h-14 font-bold text-xs bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-all cursor-pointer"
              >
                Reset All
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-[2] h-14 font-bold text-xs bg-[#074073] text-white rounded-2xl hover:bg-[#052d52] transition-all shadow-lg cursor-pointer"
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
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none z-10">
        <Icon
          size={18}
          className="text-slate-300 group-focus-within:text-[#074073] transition-colors"
        />
        <div className="w-[1.5px] h-5 bg-slate-200 ml-4 group-focus-within:bg-[#074073]/20 transition-colors" />
      </div>
      {children}
    </div>
  </div>
);

export default TransactionsFilter;
