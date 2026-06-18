import React, { useState, useEffect } from "react";
import {
  X,
  User,
  Shield,
  Hash,
  Calendar,
  ChevronDown,
  Save,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const EditScannedDetails = ({ isOpen, onClose, scannedData, onSave }) => {
  // Local state to capture modifications before committing them to the parent state
  const [localData, setLocalData] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    identification_type: "",
    identification: "",
    gender: "",
    dob: "",
  });

  // Dropdown overlay visibility states
  const [idTypeDropdownOpen, setIdTypeDropdownOpen] = useState(false);
  const [genderDropdownOpen, setGenderDropdownOpen] = useState(false);

  // Synchronize local state when modal opens with fresh data
  useEffect(() => {
    if (scannedData && isOpen) {
      setLocalData({
        firstname: scannedData.firstname || "",
        middlename: scannedData.middlename || "",
        lastname: scannedData.lastname || "",
        identification_type: scannedData.identification_type || "",
        identification: scannedData.identification || "",
        gender: scannedData.gender || "",
        dob: scannedData.dob || "",
      });
    }
  }, [scannedData, isOpen]);

  const idTypeOptions = [
    { value: "National ID", label: "National ID" },
    { value: "Passport", label: "Passport" },
    { value: "Alien Card", label: "Alien Card" },
  ];

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
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

  const handleSaveSubmit = (e) => {
    e.preventDefault();
    onSave(localData);
    onClose();
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
          <div className="absolute inset-0" onClick={onClose} />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="bg-white relative w-full max-w-[480px] h-full shadow-2xl flex flex-col z-10"
          >
            {/* Close Trigger Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 z-10 flex items-center justify-center w-8 h-8 bg-slate-100 hover:bg-slate-200 text-gray-500 rounded-full transition-all active:scale-95 shadow-sm cursor-pointer"
            >
              <X size={16} />
            </button>

            {/* High-Density Operational Header */}
            <div className="px-8 pt-5 pb-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400">
                  Modify Extracted Tokens
                </span>
              </div>
              <h2 className="text-2xl font-bold text-[#074073] pt-1">
                Edit Scanned Details
              </h2>
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed max-w-[340px]">
                Manually adjust the structural fields below to bypass text
                recognition discrepancies.
              </p>
            </div>
            <div className="border-b mx-8 border-slate-100"></div>

            {/* Form Fields Scrolling Container Body */}
            <form
              onSubmit={handleSaveSubmit}
              className="flex-1 flex flex-col overflow-hidden"
            >
              <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
                {/* Legal Names Fields */}
                <FilterField label="First Name" icon={User}>
                  <input
                    type="text"
                    required
                    className="w-full pl-[74px] pr-6 py-5 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all text-xs font-semibold text-slate-800"
                    value={localData.firstname}
                    onChange={(e) =>
                      setLocalData({ ...localData, firstname: e.target.value })
                    }
                  />
                </FilterField>

                <FilterField label="Middle Name (Optional)" icon={User}>
                  <input
                    type="text"
                    className="w-full pl-[74px] pr-6 py-5 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all text-xs font-semibold text-slate-800"
                    value={localData.middlename}
                    onChange={(e) =>
                      setLocalData({ ...localData, middlename: e.target.value })
                    }
                  />
                </FilterField>

                <FilterField label="Last Name" icon={User}>
                  <input
                    type="text"
                    required
                    className="w-full pl-[74px] pr-6 py-5 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all text-xs font-semibold text-slate-800"
                    value={localData.lastname}
                    onChange={(e) =>
                      setLocalData({ ...localData, lastname: e.target.value })
                    }
                  />
                </FilterField>

                {/* Identification Type Dropdown Option */}
                <FilterField label="Identification Type" icon={Shield}>
                  <div className="relative w-full">
                    <button
                      type="button"
                      onClick={() => {
                        setIdTypeDropdownOpen(!idTypeDropdownOpen);
                        setGenderDropdownOpen(false);
                      }}
                      className={`w-full pl-[74px] pr-5 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all text-xs font-semibold text-left flex items-center justify-between cursor-pointer ${
                        idTypeDropdownOpen
                          ? "bg-white border-[#074073] ring-4 ring-[#074073]/5"
                          : ""
                      }`}
                    >
                      <span
                        className={
                          localData.identification_type
                            ? "text-slate-800 font-bold"
                            : "text-slate-400 font-medium"
                        }
                      >
                        {idTypeOptions.find(
                          (opt) => opt.value === localData.identification_type,
                        )?.label || "Select framework type..."}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`text-slate-400 transition-transform duration-200 ml-2 shrink-0 ${
                          idTypeDropdownOpen ? "rotate-180 text-[#074073]" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {idTypeDropdownOpen && (
                        <>
                          <div
                            className="fixed inset-0 z-30"
                            onClick={() => setIdTypeDropdownOpen(false)}
                          />
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.15 }}
                            className="absolute left-0 right-0 mt-2 bg-white border border-slate-200/80 rounded-2xl shadow-xl py-2 z-40"
                          >
                            {idTypeOptions.map((opt) => (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                  setLocalData({
                                    ...localData,
                                    identification_type: opt.value,
                                  });
                                  setIdTypeDropdownOpen(false);
                                }}
                                className={`w-full px-6 py-3 text-xs text-left font-semibold transition-colors cursor-pointer ${
                                  localData.identification_type === opt.value
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

                {/* Identification String Reference input */}
                <FilterField label="Document ID Number" icon={Hash}>
                  <input
                    type="text"
                    required
                    className="w-full pl-[74px] pr-6 py-5 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all text-xs font-mono font-bold tracking-wider uppercase text-slate-800"
                    value={localData.identification}
                    onChange={(e) =>
                      setLocalData({
                        ...localData,
                        identification: e.target.value,
                      })
                    }
                  />
                </FilterField>

                {/* Gender Dropdown option */}
                <FilterField label="Gender" icon={User}>
                  <div className="relative w-full">
                    <button
                      type="button"
                      onClick={() => {
                        setGenderDropdownOpen(!genderDropdownOpen);
                        setIdTypeDropdownOpen(false);
                      }}
                      className={`w-full pl-[74px] pr-5 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all text-xs font-semibold text-left flex items-center justify-between cursor-pointer ${
                        genderDropdownOpen
                          ? "bg-white border-[#074073] ring-4 ring-[#074073]/5"
                          : ""
                      }`}
                    >
                      <span
                        className={
                          localData.gender
                            ? "text-slate-800 font-bold"
                            : "text-slate-400 font-medium"
                        }
                      >
                        {genderOptions.find(
                          (opt) => opt.value === localData.gender,
                        )?.label || "Select classification..."}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`text-slate-400 transition-transform duration-200 ml-2 shrink-0 ${
                          genderDropdownOpen ? "rotate-180 text-[#074073]" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {genderDropdownOpen && (
                        <>
                          <div
                            className="fixed inset-0 z-30"
                            onClick={() => setGenderDropdownOpen(false)}
                          />
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.15 }}
                            className="absolute left-0 right-0 mt-2 bg-white border border-slate-200/80 rounded-2xl shadow-xl py-2 z-40"
                          >
                            {genderOptions.map((opt) => (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                  setLocalData({
                                    ...localData,
                                    gender: opt.value,
                                  });
                                  setGenderDropdownOpen(false);
                                }}
                                className={`w-full px-6 py-3 text-xs text-left font-semibold transition-colors cursor-pointer ${
                                  localData.gender === opt.value
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

                {/* Date of Birth Node Input Field */}
                <FilterField label="Date of Birth (DOB)" icon={Calendar}>
                  <input
                    type="date"
                    required
                    className="w-full pl-[74px] pr-6 py-5 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all text-xs font-semibold text-slate-800 uppercase"
                    value={localData.dob}
                    onChange={(e) =>
                      setLocalData({ ...localData, dob: e.target.value })
                    }
                  />
                </FilterField>
              </div>

              {/* Action Buttons Footer Core Block */}
              <div className="p-8 py-5 border-t border-slate-100 flex gap-3 bg-white">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 h-14 font-bold text-xs bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-all cursor-pointer"
                >
                  Discard Changes
                </button>
                <button
                  type="submit"
                  className="flex-[1.5] h-14 font-bold text-xs bg-[#074073] hover:bg-[#052d52] text-white rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Save size={14} />
                  <span>Commit Corrections</span>
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditScannedDetails;
