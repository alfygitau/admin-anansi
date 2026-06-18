import React, { useState } from "react";
import {
  X,
  Briefcase,
  UserCheck,
  Coins,
  FileText,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const IncomeDetails = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
}) => {
  // Toggle state for the employment field dropdown
  const [employmentDropdownOpen, setEmploymentDropdownOpen] = useState(false);

  // Structured occupational framework options
  const employmentOptions = [
    { value: "", label: "Select employment type..." },
    { value: "Salaried", label: "Salaried / Employed" },
    { value: "Self-Employed", label: "Self-Employed / Business Owner" },
    { value: "Contractor", label: "Freelancer / Contractor" },
    { value: "Unemployed", label: "Unemployed" },
    { value: "Student", label: "Student" },
  ];

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
              className="absolute top-5 right-5 z-10 flex items-center justify-center w-8 h-8 bg-slate-100 hover:bg-slate-200 text-gray-500 rounded-full transition-all active:scale-95 shadow-sm cursor-pointer"
            >
              <X size={16} />
            </button>

            {/* High-Density Compliance Header */}
            <div className="px-8 pt-5 pb-6">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold text-[#074073] uppercase tracking-widest bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md">
                  Financial Details
                </span>
              </div>
              <h2 className="text-2xl font-bold text-[#074073] pt-1">
                Income & Economic Level
              </h2>
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed max-w-[360px]">
                Log economic data parameters and tax clearance indicators. This
                underpins accurate risk evaluation profiles and credit-tier
                assignments.
              </p>
            </div>
            <div className="border-b mx-8 border-slate-100"></div>

            {/* Income Parameters Scroll Container */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
              {/* Employment Type Dropdown */}
              <FilterField label="Employment Status / Field" icon={Briefcase}>
                <div className="relative w-full">
                  <button
                    type="button"
                    onClick={() =>
                      setEmploymentDropdownOpen(!employmentDropdownOpen)
                    }
                    className={`w-full pl-[74px] pr-5 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all text-xs font-semibold text-left flex items-center justify-between cursor-pointer ${
                      employmentDropdownOpen
                        ? "bg-white border-[#074073] ring-4 ring-[#074073]/5"
                        : ""
                    }`}
                  >
                    <span
                      className={
                        formData.employment_type
                          ? "text-slate-800 font-bold"
                          : "text-slate-400 font-medium"
                      }
                    >
                      {employmentOptions.find(
                        (opt) => opt.value === formData.employment_type,
                      )?.label || "Select employment type..."}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-slate-400 transition-transform duration-200 ml-2 shrink-0 ${
                        employmentDropdownOpen
                          ? "rotate-180 text-[#074073]"
                          : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {employmentDropdownOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-30"
                          onClick={() => setEmploymentDropdownOpen(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 right-0 mt-2 bg-white border border-slate-200/80 rounded-2xl shadow-xl py-2 z-40 max-h-48 overflow-y-auto"
                        >
                          {employmentOptions.map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setFormData({
                                  ...formData,
                                  employment_type: opt.value,
                                });
                                setEmploymentDropdownOpen(false);
                              }}
                              className={`w-full px-6 py-3 text-xs text-left font-semibold transition-colors cursor-pointer ${
                                formData.employment_type === opt.value
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

              {/* Occupation Text Input */}
              <FilterField label="Exact Occupation / Role" icon={UserCheck}>
                <input
                  type="text"
                  className="w-full pl-[74px] pr-6 py-5 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all text-xs font-semibold text-slate-800"
                  placeholder="e.g., Credit Analyst, Shopkeeper"
                  value={formData.occupation}
                  onChange={(e) =>
                    setFormData({ ...formData, occupation: e.target.value })
                  }
                />
              </FilterField>

              {/* Monthly Income Numerical Input */}
              <FilterField label="Estimated Monthly Income (KES)" icon={Coins}>
                <div className="relative w-full">
                  <input
                    type="number"
                    className="w-full pl-[74px] pr-14 py-5 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all text-xs font-semibold text-slate-800"
                    placeholder="0.00"
                    value={formData.income_range}
                    onChange={(e) =>
                      setFormData({ ...formData, income_range: e.target.value })
                    }
                  />
                  <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider">
                      KES
                    </span>
                  </div>
                </div>
              </FilterField>

              {/* KRA Tax PIN Identifier Input */}
              <FilterField label="KRA Tax PIN" icon={FileText}>
                <input
                  type="text"
                  maxLength={11}
                  className="w-full pl-[74px] pr-6 py-5 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all text-xs font-mono font-bold tracking-wider uppercase text-slate-800"
                  placeholder="e.g., A012345678W"
                  value={formData.kra_pin || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, kra_pin: e.target.value })
                  }
                />
              </FilterField>
            </div>

            {/* Control Actions Row */}
            <div className="p-8 py-5 border-t border-slate-100 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 h-14 font-bold text-xs bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-all cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={onSubmit}
                className="flex-[2] h-14 font-bold text-xs bg-[#074073] text-white rounded-2xl hover:bg-[#052d52] transition-all shadow-lg cursor-pointer"
              >
                Save & Continue
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IncomeDetails;
