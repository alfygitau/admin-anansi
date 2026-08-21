import React, { useState } from "react";
import {
  X,
  Calendar,
  CalendarDays,
  Hash,
  Building2,
  Map,
  Check,
  RotateCcw,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MembersFilter = ({ isOpen, onClose, filters, setFilters }) => {
  const [activeTab, setActiveTab] = useState("status");

  const tabs = [
    { id: "status", label: "Status", icon: Hash },
    { id: "location", label: "Location", icon: Building2 },
    { id: "fromDate", label: "Start Date", icon: Calendar },
    { id: "toDate", label: "End Date", icon: CalendarDays },
  ];

  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Incomplete", label: "Incomplete" },
    { value: "Pending Payment", label: "Pending Payment" },
    { value: "Pending Verification", label: "Pending Verification" },
    { value: "Cancelled", label: "Cancelled" },
    { value: "Suspended", label: "Suspended" },
  ];

  // Helper to ensure filters.status is an array
  const currentStatuses = Array.isArray(filters.status)
    ? filters.status
    : filters.status
      ? [filters.status]
      : [];

  const handleStatusToggle = (value) => {
    const updated = currentStatuses.includes(value)
      ? currentStatuses.filter((s) => s !== value)
      : [...currentStatuses, value];
    console.log(updated);

    setFilters({ ...filters, status: updated });
  };

  const handleSelectAllStatuses = () => {
    if (currentStatuses.length === statusOptions.length) {
      setFilters({ ...filters, status: [] });
    } else {
      setFilters({
        ...filters,
        status: statusOptions.map((opt) => opt.value),
      });
    }
  };

  // Quick Date Helpers
  const setQuickDate = (field, daysOffset = 0) => {
    const date = new Date();
    date.setDate(date.getDate() - daysOffset);
    const formatted = date.toISOString().split("T")[0];
    setFilters({ ...filters, [field]: formatted });
  };

  const handleReset = () => {
    setFilters({
      q: "",
      status: [],
      location: "",
      county: "",
      subcounty: "",
      fromDate: "",
      toDate: "",
    });
  };

  // Helper for tab active indicators
  const hasValue = (tabId) => {
    if (tabId === "status") return currentStatuses.length > 0;
    if (tabId === "location")
      return !!(filters.location || filters.county || filters.subcounty);
    if (tabId === "fromDate") return !!filters.fromDate;
    if (tabId === "toDate") return !!filters.toDate;
    return false;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex justify-end bg-zinc-950/20"
        >
          {/* Backdrop Dismiss */}
          <div className="absolute inset-0" onClick={onClose} />

          {/* Modal Shell */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white relative w-full max-w-[480px] shadow-2xl flex flex-col z-10 overflow-hidden"
          >
            {/* Modal Header */}
            <div className="px-8 pt-6 pb-4 flex items-center justify-between border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-[#074073]">
                  Filter Members
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Refine query search across specific filter tabs.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex items-center justify-center w-8 h-8 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 rounded-full transition-all cursor-pointer active:scale-95"
              >
                <X size={16} />
              </button>
            </div>

            {/* Individual Heading Tabs */}
            <div className="px-8 pt-3 pb-2 bg-slate-50/70 border-b border-slate-100 flex flex-wrap items-center gap-2 select-none">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                const activeIndicator = hasValue(tab.id);

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "bg-[#074073] text-white shadow-md shadow-[#074073]/20 border border-[#074073]"
                        : "bg-white text-slate-700 border border-slate-200 shadow-xs hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300"
                    }`}
                  >
                    <Icon
                      size={14}
                      className={
                        isActive ? "text-white" : "text-[#074073] opacity-80"
                      }
                    />
                    <span>{tab.label}</span>
                    {activeIndicator && (
                      <span
                        className={`size-2 rounded-full ${
                          isActive
                            ? "bg-emerald-400"
                            : "bg-emerald-500 ring-2 ring-white"
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tab Body */}
            <div className="flex-1 overflow-y-auto p-8">
              {/* TAB 1: STATUS MULTI-SELECT */}
              {activeTab === "status" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Select Member Statuses
                    </span>
                    <button
                      type="button"
                      onClick={handleSelectAllStatuses}
                      className="text-xs font-bold text-[#074073] hover:underline cursor-pointer"
                    >
                      {currentStatuses.length === statusOptions.length
                        ? "Deselect All"
                        : "Select All"}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {statusOptions.map((option) => {
                      const isChecked = currentStatuses.includes(option.value);
                      return (
                        <div
                          key={option.value}
                          onClick={() => handleStatusToggle(option.value)}
                          className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer select-none ${
                            isChecked
                              ? "border-[#074073] bg-blue-50/50 text-[#074073] font-bold"
                              : "border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-slate-100 font-medium"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                              isChecked
                                ? "bg-[#074073] border-[#074073] text-white"
                                : "border-slate-300 bg-white"
                            }`}
                          >
                            {isChecked && <Check size={12} strokeWidth={3} />}
                          </div>
                          <span className="text-xs">{option.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: LOCATION HIERARCHY */}
              {activeTab === "location" && (
                <div className="space-y-4">
                  <FilterField label="Location" icon={Building2}>
                    <input
                      className="w-full pl-[74px] pr-6 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#074073] focus:bg-white transition-all text-xs font-semibold"
                      placeholder="Enter location"
                      value={filters.location}
                      onChange={(e) =>
                        setFilters({ ...filters, location: e.target.value })
                      }
                    />
                  </FilterField>

                  <FilterField label="County" icon={Building2}>
                    <input
                      className="w-full pl-[74px] pr-6 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#074073] focus:bg-white transition-all text-xs font-semibold"
                      placeholder="Enter county"
                      value={filters.county}
                      onChange={(e) =>
                        setFilters({ ...filters, county: e.target.value })
                      }
                    />
                  </FilterField>

                  <FilterField label="Sub-county" icon={Map}>
                    <input
                      className="w-full pl-[74px] pr-6 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#074073] focus:bg-white transition-all text-xs font-semibold"
                      placeholder="Enter sub-county"
                      value={filters.subcounty}
                      onChange={(e) =>
                        setFilters({ ...filters, subcounty: e.target.value })
                      }
                    />
                  </FilterField>
                </div>
              )}

              {/* TAB 3: START DATE */}
              {activeTab === "fromDate" && (
                <div className="space-y-5">
                  <FilterField label="Registration Start Date" icon={Calendar}>
                    <input
                      type="date"
                      className="w-full pl-[74px] pr-4 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-[#074073] transition-all text-xs font-semibold uppercase text-slate-800"
                      value={filters.fromDate}
                      onChange={(e) =>
                        setFilters({ ...filters, fromDate: e.target.value })
                      }
                    />
                  </FilterField>

                  {/* Quick Presets for Start Date */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Clock size={12} />
                      Quick Start Date Presets
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setQuickDate("fromDate", 0)}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-semibold text-slate-600 transition-colors cursor-pointer"
                      >
                        Today
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuickDate("fromDate", 7)}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-semibold text-slate-600 transition-colors cursor-pointer"
                      >
                        7 Days Ago
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuickDate("fromDate", 30)}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-semibold text-slate-600 transition-colors cursor-pointer"
                      >
                        30 Days Ago
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: END DATE */}
              {activeTab === "toDate" && (
                <div className="space-y-5">
                  <FilterField
                    label="Registration End Date"
                    icon={CalendarDays}
                  >
                    <input
                      type="date"
                      className="w-full pl-[74px] pr-4 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-[#074073] transition-all text-xs font-semibold uppercase text-slate-800"
                      value={filters.toDate}
                      onChange={(e) =>
                        setFilters({ ...filters, toDate: e.target.value })
                      }
                    />
                  </FilterField>

                  {/* Quick Presets for End Date */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Clock size={12} />
                      Quick End Date Presets
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setQuickDate("toDate", 0)}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-semibold text-slate-600 transition-colors cursor-pointer"
                      >
                        Set to Today
                      </button>
                      <button
                        type="button"
                        onClick={() => setFilters({ ...filters, toDate: "" })}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-semibold text-slate-600 transition-colors cursor-pointer"
                      >
                        Clear End Date
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-8 py-4 border-t border-slate-100 flex items-center justify-between gap-3 bg-slate-50/50">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center justify-center gap-2 h-12 px-5 font-bold text-xs text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>Reset All</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-1 h-12 font-bold text-xs bg-[#074073] text-white rounded-2xl hover:bg-[#052d52] transition-all shadow-md shadow-[#074073]/20 cursor-pointer"
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
  <div className="space-y-1.5">
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
      {label}
    </label>
    <div className="relative group flex items-center">
      <div className="absolute left-0 top-0 bottom-0 flex items-center pl-6 pointer-events-none z-10">
        <Icon
          size={18}
          className="text-slate-400 group-focus-within:text-[#074073] transition-colors"
        />
        <div className="w-[1.5px] h-5 bg-slate-200 ml-4 group-focus-within:bg-[#074073]/30 transition-colors" />
      </div>
      {children}
    </div>
  </div>
);

export default MembersFilter;
