import React, { useState } from "react";
import {
  X,
  Shield,
  FileText,
  Save,
  CheckCircle2,
  ArrowRight,
  Plus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AddRole = ({ isOpen, onClose, onSave, formData, setFormData }) => {
  // Local state to manage screen shifting from "form" to "success"
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSave = async () => {
    if (!formData.roleName) return alert("Please provide a role name.");

    // Trigger your external API save callback
    await onSave?.(formData);

    // Shift to success screen immediately
    setIsSuccess(true);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setFormData({ roleName: "", description: "" });
    onClose();
  };

  const handleCreateAnother = () => {
    setIsSuccess(false);
    setFormData({ roleName: "", description: "" });
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex justify-end bg-zinc-950/20"
        >
          <div className="absolute inset-0" onClick={handleResetAndClose} />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="bg-white relative w-full max-w-[480px] h-full shadow-2xl flex flex-col z-10"
          >
            {/* Close Button */}
            <button
              onClick={handleResetAndClose}
              className="absolute top-5 right-5 z-10 w-8 h-8 bg-slate-100 hover:bg-slate-200 text-gray-500 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-3xs active:scale-95"
            >
              <X size={16} />
            </button>

            {!isSuccess ? (
              /* --- STATE A: ADD ROLE INPUT FORM --- */
              <>
                <div className="px-8 pt-5 pb-6">
                  <h2 className="text-2xl font-bold text-[#074073]">
                    Add New Role
                  </h2>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Define an administrative security role and its operational
                    responsibilities.
                  </p>
                </div>
                <div className="border-b mx-8 border-slate-100"></div>

                <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
                  <FilterField label="Role Name" icon={Shield}>
                    <input
                      className="w-full pl-[74px] pr-6 h-14 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#074073] focus:bg-white transition-all"
                      placeholder="e.g., Credit Auditor, System Admin"
                      value={formData.roleName || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, roleName: e.target.value })
                      }
                    />
                  </FilterField>

                  <FilterField label="Description" icon={FileText}>
                    <input
                      className="w-full pl-[74px] pr-6 h-14 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#074073] focus:bg-white transition-all"
                      placeholder="e.g., Manages vetting workflows and limits"
                      value={formData.description || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                  </FilterField>
                </div>

                <div className="p-8 py-5 border-t border-slate-100 flex gap-3">
                  <button
                    onClick={handleResetAndClose}
                    className="flex-1 h-14 font-bold text-xs bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-[2] h-14 font-bold text-xs bg-[#074073] text-white rounded-2xl shadow-lg flex items-center justify-center gap-2 hover:bg-[#052d52] transition-colors cursor-pointer active:scale-[0.98]"
                  >
                    <Save size={14} /> Save Role
                  </button>
                </div>
              </>
            ) : (
              /* --- STATE B: PREMIUM SUCCESS CONFIRMATION VIEW --- */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col justify-between p-8 text-center h-full select-none"
              >
                {/* Visual Accent Center */}
                <div className="flex-1 flex flex-col items-center justify-center space-y-4 max-w-sm mx-auto">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: 0.1,
                    }}
                    className="size-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border-4 border-white shadow-md shadow-emerald-600/10"
                  >
                    <CheckCircle2 size={36} strokeWidth={2.5} />
                  </motion.div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">
                      Role Added Successfully
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      The new operational tier is now fully distributed across
                      security parameters.
                    </p>
                  </div>

                  {/* Summary Profile Display Card */}
                  <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left space-y-2 mt-4 shadow-3xs">
                    <div>
                      <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
                        Configured Label
                      </p>
                      <p className="text-xs font-bold text-[#074073] mt-0.5">
                        {formData.roleName}
                      </p>
                    </div>
                    <div className="border-t border-slate-200/50 pt-2">
                      <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
                        Functional Baseline
                      </p>
                      <p className="text-[11px] font-medium text-slate-600 leading-normal mt-0.5">
                        {formData.description || "No description configured."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Success Action Suite */}
                <div className="flex flex-col gap-3 w-full">
                  <button
                    onClick={handleCreateAnother}
                    className="w-full h-14 font-bold text-xs bg-slate-50 border border-slate-200 text-slate-700 rounded-2xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                  >
                    <Plus size={14} /> Define Another Role
                  </button>
                  <button
                    onClick={handleResetAndClose}
                    className="w-full h-14 font-bold text-xs bg-[#074073] text-white rounded-2xl hover:bg-[#052d52] transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.99]"
                  >
                    <span>Return to Directory</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddRole;
