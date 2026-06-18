import React, { useState } from "react";
import { X, User, Mail, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CreateProfile = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  onContinue,
}) => {
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

            {/* Header */}
            <div className="px-8 pt-5 pb-6">
              <h2 className="text-2xl font-bold text-[#074073]">Add Member</h2>
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed max-w-[320px]">
                Provide the primary contact and login credentials required to
                establish this member's digital profile.
              </p>
            </div>
            <div className="border-b mx-8 border-slate-100"></div>

            {/* Form Fields */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
              <FilterField label="Username" icon={User}>
                <input
                  className="w-full pl-[74px] pr-6 py-5 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#074073] transition-all text-xs font-semibold"
                  placeholder="e.g., jdoe_admin"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </FilterField>

              <FilterField label="Email Address" icon={Mail}>
                <input
                  type="email"
                  className="w-full pl-[74px] pr-6 py-5 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#074073] transition-all text-xs font-semibold"
                  placeholder="name@organization.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </FilterField>

              <FilterField label="Mobile Number" icon={Smartphone}>
                <input
                  type="tel"
                  className="w-full pl-[74px] pr-6 py-5 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#074073] transition-all text-xs font-semibold"
                  placeholder="+254 XXX XXX XXX"
                  value={formData.mobileno}
                  onChange={(e) =>
                    setFormData({ ...formData, mobileno: e.target.value })
                  }
                />
              </FilterField>
            </div>

            {/* Footer */}
            <div className="p-8 py-5 border-t border-slate-100 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 h-14 font-bold text-xs bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={onContinue}
                className="flex-[2] h-14 font-bold text-xs bg-[#074073] text-white rounded-2xl hover:bg-[#052d52] transition-all shadow-lg cursor-pointer"
              >
                Continue
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateProfile;
