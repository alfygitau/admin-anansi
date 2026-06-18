import React, { useState } from "react";
import { X, User, Phone, Users, Calendar, MapPin, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NextOfKin = ({ isOpen, onClose, onSave, formData, setFormData }) => {
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
              onClick={onClose}
              className="absolute top-5 right-5 z-10 w-8 h-8 bg-slate-100 hover:bg-slate-200 text-gray-500 rounded-full flex items-center justify-center transition-all"
            >
              <X size={16} />
            </button>

            <div className="px-8 pt-5 pb-6">
              <h2 className="text-2xl font-bold text-[#074073]">Next of Kin</h2>
              <p className="text-[11px] text-slate-400 font-medium">
                Add or update member's emergency contact details.
              </p>
            </div>
            <div className="border-b mx-8 border-slate-100"></div>

            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
              <FilterField label="Full Name" icon={User}>
                <input
                  className="w-full pl-[74px] pr-6 py-5 h-14 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold"
                  placeholder="e.g., Jane Doe"
                  value={formData.fullname}
                  onChange={(e) =>
                    setFormData({ ...formData, fullname: e.target.value })
                  }
                />
              </FilterField>
              <FilterField label="Phone Number" icon={Phone}>
                <input
                  className="w-full pl-[74px] pr-6 py-5 h-14 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold"
                  placeholder="+254 XXX XXX XXX"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </FilterField>
              <FilterField label="Relationship" icon={Users}>
                <input
                  className="w-full pl-[74px] pr-6 py-5 h-14 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold"
                  placeholder="e.g., Spouse, Parent"
                  value={formData.relationship}
                  onChange={(e) =>
                    setFormData({ ...formData, relationship: e.target.value })
                  }
                />
              </FilterField>
              <FilterField label="Date of Birth" icon={Calendar}>
                <input
                  type="date"
                  className="w-full pl-[74px] pr-6 py-5 h-14 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold"
                  value={formData.dob}
                  onChange={(e) =>
                    setFormData({ ...formData, dob: e.target.value })
                  }
                />
              </FilterField>
              <FilterField label="Location" icon={MapPin}>
                <input
                  className="w-full pl-[74px] pr-6 py-5 h-14 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold"
                  placeholder="e.g., Nairobi, Kenya"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              </FilterField>
            </div>

            <div className="p-8 py-5 border-t border-slate-100 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 h-14 font-bold text-xs bg-slate-100 text-slate-600 rounded-2xl"
              >
                Cancel
              </button>
              <button
                onClick={() => onSave(formData)}
                className="flex-[2] h-14 font-bold text-xs bg-[#074073] text-white rounded-2xl shadow-lg flex items-center justify-center gap-2"
              >
                <Save size={14} /> Save Details
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NextOfKin;
