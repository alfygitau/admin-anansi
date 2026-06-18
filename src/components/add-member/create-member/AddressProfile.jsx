import React, { useState } from "react";
import { X, Globe, Building2, Map, MapPin, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AddressProfile = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
}) => {
  // Toggle states for location dropdowns
  const [countyDropdownOpen, setCountyDropdownOpen] = useState(false);
  const [subcountyDropdownOpen, setSubcountyDropdownOpen] = useState(false);

  // Dynamic localization arrays (Tailored to KES/KE layout)
  const countyOptions = [
    { value: "", label: "Select county..." },
    { value: "Nairobi", label: "Nairobi" },
    { value: "Mombasa", label: "Mombasa" },
    { value: "Kiambu", label: "Kiambu" },
    { value: "Kisumu", label: "Kisumu" },
    { value: "Nakuru", label: "Nakuru" },
  ];

  const subcountyOptions = [
    { value: "", label: "Select sub-county..." },
    { value: "Westlands", label: "Westlands" },
    { value: "Dagoretti", label: "Dagoretti" },
    { value: "Changamwe", label: "Changamwe" },
    { value: "Thika", label: "Thika" },
    { value: "Kisumu Central", label: "Kisumu Central" },
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

            {/* Premium High-Density Header Setup */}
            <div className="px-8 pt-5 pb-6">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold text-[#074073] uppercase tracking-widest bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md">
                  Geographic Location
                </span>
              </div>
              <h2 className="text-2xl font-bold text-[#074073] pt-1">
                Physical Address
              </h2>
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed max-w-[360px]">
                Map the member's legal domicile coordinates. This data handles
                localized operational mapping and regional compliance
                structures.
              </p>
            </div>
            <div className="border-b mx-8 border-slate-100"></div>

            {/* Location Form Options Scroll Space */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
              {/* Country Field */}
              <FilterField label="Country" icon={Globe}>
                <input
                  type="text"
                  className="w-full pl-[74px] pr-6 py-5 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all text-xs font-semibold text-slate-800"
                  placeholder="e.g., Kenya"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                />
              </FilterField>

              {/* County Dropdown Field */}
              <FilterField label="County / Region" icon={Building2}>
                <div className="relative w-full">
                  <button
                    type="button"
                    onClick={() => {
                      setCountyDropdownOpen(!countyDropdownOpen);
                      setSubcountyDropdownOpen(false); // Dropdown handoff
                    }}
                    className={`w-full pl-[74px] pr-5 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all text-xs font-semibold text-left flex items-center justify-between cursor-pointer ${
                      countyDropdownOpen
                        ? "bg-white border-[#074073] ring-4 ring-[#074073]/5"
                        : ""
                    }`}
                  >
                    <span
                      className={
                        formData.county
                          ? "text-slate-800 font-bold"
                          : "text-slate-400 font-medium"
                      }
                    >
                      {countyOptions.find(
                        (opt) => opt.value === formData.county,
                      )?.label || "Select county..."}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-slate-400 transition-transform duration-200 ml-2 shrink-0 ${
                        countyDropdownOpen ? "rotate-180 text-[#074073]" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {countyDropdownOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-30"
                          onClick={() => setCountyDropdownOpen(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 right-0 mt-2 bg-white border border-slate-200/80 rounded-2xl shadow-xl py-2 z-40 max-h-48 overflow-y-auto"
                        >
                          {countyOptions.map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, county: opt.value });
                                setCountyDropdownOpen(false);
                              }}
                              className={`w-full px-6 py-3 text-xs text-left font-semibold transition-colors cursor-pointer ${
                                formData.county === opt.value
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

              {/* Sub-County Dropdown Field */}
              <FilterField label="Sub-County / District" icon={Map}>
                <div className="relative w-full">
                  <button
                    type="button"
                    onClick={() => {
                      setSubcountyDropdownOpen(!subcountyDropdownOpen);
                      setCountyDropdownOpen(false); // Dropdown handoff
                    }}
                    className={`w-full pl-[74px] pr-5 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all text-xs font-semibold text-left flex items-center justify-between cursor-pointer ${
                      subcountyDropdownOpen
                        ? "bg-white border-[#074073] ring-4 ring-[#074073]/5"
                        : ""
                    }`}
                  >
                    <span
                      className={
                        formData.subcounty
                          ? "text-slate-800 font-bold"
                          : "text-slate-400 font-medium"
                      }
                    >
                      {subcountyOptions.find(
                        (opt) => opt.value === formData.subcounty,
                      )?.label || "Select sub-county..."}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-slate-400 transition-transform duration-200 ml-2 shrink-0 ${
                        subcountyDropdownOpen ? "rotate-180 text-[#074073]" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {subcountyDropdownOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-30"
                          onClick={() => setSubcountyDropdownOpen(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 right-0 mt-2 bg-white border border-slate-200/80 rounded-2xl shadow-xl py-2 z-40 max-h-48 overflow-y-auto"
                        >
                          {subcountyOptions.map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setFormData({
                                  ...formData,
                                  subcounty: opt.value,
                                });
                                setSubcountyDropdownOpen(false);
                              }}
                              className={`w-full px-6 py-3 text-xs text-left font-semibold transition-colors cursor-pointer ${
                                formData.subcounty === opt.value
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

              {/* Physical Address Textarea/Input Field */}
              <FilterField label="Street / Physical Address" icon={MapPin}>
                <textarea
                  className="w-full pl-[74px] pr-6 py-4 h-24 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all text-xs font-semibold text-slate-800 resize-none pt-4"
                  placeholder="e.g., Plaza Block C, Suite 4B, Lenana Road"
                  value={formData.physical_address}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      physical_address: e.target.value,
                    })
                  }
                />
              </FilterField>
            </div>

            {/* Footer Action Core */}
            <div className="p-8 py-5 border-t border-slate-100 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 h-14 font-bold text-xs bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-all cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={onSubmit}
                className="flex-[2] h-14 font-bold text-xs bg-[#074073] text-white rounded-2xl hover:bg-[#052d52] transition-all shadow-lg cursor-pointer"
              >
                Submit Registry Entry
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddressProfile;
