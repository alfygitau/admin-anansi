import React, { useState } from "react";
import {
  X,
  Calendar,
  Hash,
  Check,
  ShieldCheck,
  ChevronDown,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const UsersFilter = ({ isOpen, onClose, filters, setFilters, roles = [] }) => {
  // Dropdown expansion toggle states
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  // Search queries for filtering option lists inside dropdowns
  const [statusSearchQuery, setStatusSearchQuery] = useState("");
  const [roleSearchQuery, setRoleSearchQuery] = useState("");

  const currentStatuses = Array.isArray(filters.status)
    ? filters.status
    : filters.status
      ? [filters.status]
      : [];

  const currentRoles = Array.isArray(filters.role)
    ? filters.role
    : filters.role
      ? [filters.role]
      : [];

  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Cancelled", label: "Cancelled" },
    { value: "Suspended", label: "Suspended" },
    { value: "Pending", label: "Pending" },
  ];

  // Filtered option lists based on internal search strings
  const filteredStatuses = statusOptions.filter((opt) =>
    opt.label.toLowerCase().includes(statusSearchQuery.toLowerCase()),
  );

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(roleSearchQuery.toLowerCase()),
  );

  const handleStatusToggle = (value) => {
    const updated = currentStatuses.includes(value)
      ? currentStatuses.filter((s) => s !== value)
      : [...currentStatuses, value];
    setFilters({ ...filters, status: updated });
  };

  const handleRoleToggle = (roleName) => {
    const updated = currentRoles.includes(roleName)
      ? currentRoles.filter((r) => r !== roleName)
      : [...currentRoles, roleName];
    setFilters({ ...filters, role: updated });
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

  const handleSelectAllRoles = () => {
    if (currentRoles.length === roles.length) {
      setFilters({ ...filters, role: [] });
    } else {
      setFilters({
        ...filters,
        role: roles.map((r) => r.name),
      });
    }
  };

  const handleReset = () => {
    setFilters({
      status: [],
      role: [],
      fromDate: "",
      toDate: "",
    });
    setStatusSearchQuery("");
    setRoleSearchQuery("");
    setIsStatusDropdownOpen(false);
    setIsRoleDropdownOpen(false);
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
            onClick={() => {
              setIsStatusDropdownOpen(!isStatusDropdownOpen);
              setIsRoleDropdownOpen(false);
            }}
            className="bg-white relative w-full max-w-[480px] h-full shadow-2xl flex flex-col z-10 overflow-hidden"
          >
            {/* Modal Header */}
            <div className="px-8 pt-6 pb-4 flex items-center justify-between border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-[#074073]">
                  Filter Users
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Refine user queries using collapsible multi-select dropdowns.
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

            {/* Scrollable Container Body */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {/* SECTION 1: STATUS DROPDOWN MULTI-SELECT */}
              <div className="space-y-1.5 relative">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  User Statuses
                </label>

                <div className="relative">
                  {/* Dropdown Trigger Box */}
                  <div
                    onClick={() => {
                      setIsStatusDropdownOpen(!isStatusDropdownOpen);
                      setIsRoleDropdownOpen(false);
                    }}
                    className="w-full pl-[74px] pr-5 min-h-[56px] py-3 bg-slate-50 border border-slate-200 rounded-2xl cursor-pointer flex items-center justify-between hover:border-slate-300 transition-all select-none"
                  >
                    <div className="absolute left-0 top-0 bottom-0 flex items-center pl-6 pointer-events-none z-10">
                      <Hash size={18} className="text-slate-400" />
                      <div className="w-[1.5px] h-5 bg-slate-200 ml-4" />
                    </div>

                    <div className="flex flex-wrap gap-1.5 items-center pr-4">
                      {currentStatuses.length === 0 ? (
                        <span className="text-xs font-medium text-slate-400">
                          Select statuses...
                        </span>
                      ) : (
                        currentStatuses.map((st) => (
                          <span
                            key={st}
                            className="px-2 py-0.5 bg-blue-50 text-[#074073] text-[11px] font-bold rounded-lg border border-blue-100"
                          >
                            {st}
                          </span>
                        ))
                      )}
                    </div>

                    <ChevronDown
                      size={16}
                      className={`text-slate-400 transition-transform duration-200 shrink-0 ${isStatusDropdownOpen ? "rotate-180 text-[#074073]" : ""}`}
                    />
                  </div>

                  {/* Dropdown Expanded Drawer Box */}
                  <AnimatePresence>
                    {isStatusDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-50 space-y-2.5"
                      >
                        {/* Optional Search / Select All Utility inside Dropdown */}
                        <div className="flex items-center justify-between px-2 pt-1 pb-2 border-b border-slate-100">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">
                            {currentStatuses.length} Selected
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

                        {/* Dropdown Options Scroll Window */}
                        <div className="max-h-44 overflow-y-auto space-y-1 pr-1">
                          {filteredStatuses.map((option) => {
                            const isChecked = currentStatuses.includes(
                              option.value,
                            );
                            return (
                              <div
                                key={option.value}
                                onClick={() => handleStatusToggle(option.value)}
                                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl border transition-all cursor-pointer select-none ${
                                  isChecked
                                    ? "border-[#074073] bg-blue-50/50 text-[#074073] font-bold"
                                    : "border-transparent bg-slate-50/60 text-slate-600 hover:bg-slate-100 font-medium"
                                }`}
                              >
                                <div
                                  className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${isChecked ? "bg-[#074073] border-[#074073] text-white" : "border-slate-300 bg-white"}`}
                                >
                                  {isChecked && (
                                    <Check size={10} strokeWidth={3} />
                                  )}
                                </div>
                                <span className="text-xs">{option.label}</span>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* SECTION 2: ROLE DROPDOWN MULTI-SELECT */}
              <div className="space-y-1.5 relative pt-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  User Roles
                </label>

                <div className="relative">
                  {/* Dropdown Trigger Box */}
                  <div
                    onClick={() => {
                      setIsRoleDropdownOpen(!isRoleDropdownOpen);
                      setIsStatusDropdownOpen(false);
                    }}
                    className="w-full pl-[74px] pr-5 min-h-[56px] py-3 bg-slate-50 border border-slate-200 rounded-2xl cursor-pointer flex items-center justify-between hover:border-slate-300 transition-all select-none"
                  >
                    <div className="absolute left-0 top-0 bottom-0 flex items-center pl-6 pointer-events-none z-10">
                      <ShieldCheck size={18} className="text-slate-400" />
                      <div className="w-[1.5px] h-5 bg-slate-200 ml-4" />
                    </div>

                    <div className="flex flex-wrap gap-1.5 items-center pr-4">
                      {currentRoles.length === 0 ? (
                        <span className="text-xs font-medium text-slate-400">
                          Select roles...
                        </span>
                      ) : (
                        currentRoles.map((rn) => (
                          <span
                            key={rn}
                            className="px-2 py-0.5 bg-blue-50 text-[#074073] text-[11px] font-bold rounded-lg border border-blue-100 truncate max-w-[120px]"
                          >
                            {rn}
                          </span>
                        ))
                      )}
                    </div>

                    <ChevronDown
                      size={16}
                      className={`text-slate-400 transition-transform duration-200 shrink-0 ${isRoleDropdownOpen ? "rotate-180 text-[#074073]" : ""}`}
                    />
                  </div>

                  {/* Dropdown Expanded Drawer Box with Search Bar */}
                  <AnimatePresence>
                    {isRoleDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-50 space-y-2.5"
                      >
                        {/* Internal Filter Search Input for long role lists */}
                        <div className="relative">
                          <Search
                            size={14}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                          />
                          <input
                            type="text"
                            placeholder="Search roles..."
                            value={roleSearchQuery}
                            onChange={(e) => setRoleSearchQuery(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full pl-9 pr-3 h-9 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-[#074073] focus:bg-white transition-all"
                          />
                        </div>

                        <div className="flex items-center justify-between px-2 pt-1 pb-1 border-b border-slate-100">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">
                            {currentRoles.length} Selected
                          </span>
                          <button
                            type="button"
                            onClick={handleSelectAllRoles}
                            className="text-xs font-bold text-[#074073] hover:underline cursor-pointer"
                          >
                            {currentRoles.length === roles.length
                              ? "Deselect All"
                              : "Select All"}
                          </button>
                        </div>

                        {/* Dropdown Options Scroll Window */}
                        <div className="max-h-48 overflow-y-auto space-y-1 pr-1">
                          {filteredRoles.length === 0 ? (
                            <p className="text-center text-xs text-slate-400 py-3">
                              No roles matched
                            </p>
                          ) : (
                            filteredRoles.map((role) => {
                              const isChecked = currentRoles.includes(
                                role.name,
                              );
                              return (
                                <div
                                  key={role.id || role.name}
                                  onClick={() => handleRoleToggle(role.name)}
                                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl border transition-all cursor-pointer select-none ${
                                    isChecked
                                      ? "border-[#074073] bg-blue-50/50 text-[#074073] font-bold"
                                      : "border-transparent bg-slate-50/60 text-slate-600 hover:bg-slate-100 font-medium"
                                  }`}
                                >
                                  <div
                                    className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-all ${isChecked ? "bg-[#074073] border-[#074073] text-white" : "border-slate-300 bg-white"}`}
                                  >
                                    {isChecked && (
                                      <Check size={10} strokeWidth={3} />
                                    )}
                                  </div>
                                  <span className="text-xs truncate">
                                    {role.name}
                                  </span>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* SECTION 3: REGISTRATION TIMELINE */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block ml-1">
                  Registration Timeline
                </span>

                <div className="space-y-4">
                  <FilterField label="Start Date" icon={Calendar}>
                    <input
                      type="date"
                      className="w-full pl-[74px] pr-4 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-[#074073] transition-all text-xs font-semibold uppercase text-slate-800"
                      value={filters.fromDate}
                      onChange={(e) =>
                        setFilters({ ...filters, fromDate: e.target.value })
                      }
                    />
                  </FilterField>

                  <FilterField label="End Date" icon={Calendar}>
                    <input
                      type="date"
                      className="w-full pl-[74px] pr-4 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-[#074073] transition-all text-xs font-semibold uppercase text-slate-800"
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
            <div className="px-8 py-4 border-t border-slate-100 flex items-center justify-between gap-3 bg-slate-50/50">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center justify-center gap-2 h-12 px-5 font-bold text-xs text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all cursor-pointer"
              >
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

export default UsersFilter;
