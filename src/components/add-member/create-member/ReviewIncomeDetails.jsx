import React from "react";
import {
  X,
  Briefcase,
  UserCheck,
  Coins,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ReviewIncomeDetails = ({
  isOpen,
  onClose,
  formData,
  isSubmitting,
  onSubmit,
}) => {
  // High-density static field layout keeping identical 74px geometric constraints
  const ReviewField = ({ label, icon: Icon, value, isMono = false }) => (
    <div className="space-y-2 w-full">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none z-10">
          <Icon size={18} className="text-slate-400" />
          <div className="w-[1.5px] h-5 bg-slate-200 ml-4" />
        </div>
        <div
          className={`w-full pl-[74px] pr-6 py-4 h-14 bg-slate-50 border border-slate-100 rounded-2xl text-xs flex items-center text-slate-800 ${
            isMono
              ? "font-mono font-bold tracking-wider uppercase"
              : "font-bold"
          }`}
        >
          {value ? (
            <span>{value}</span>
          ) : (
            <span className="text-slate-300 italic font-medium">
              Not Declared
            </span>
          )}
        </div>
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
            {/* Close Toggle Layer */}
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="absolute top-5 right-5 z-10 flex items-center justify-center w-8 h-8 bg-slate-100 hover:bg-slate-200 text-gray-500 rounded-full transition-all active:scale-95 shadow-sm cursor-pointer disabled:opacity-50"
            >
              <X size={16} />
            </button>

            {/* Verification Subheader Module */}
            <div className="px-8 pt-5 pb-6">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md">
                  Financial Review
                </span>
              </div>
              <h2 className="text-2xl font-bold text-[#074073] pt-1">
                Confirm Financial Profile
              </h2>
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed max-w-[360px]">
                Verify the declared occupational parameters and taxation records
                before passing telemetry data onto the final credit engine.
              </p>
            </div>
            <div className="border-b mx-8 border-slate-100"></div>

            {/* Read-Only Parameters Stream */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
              <ReviewField
                label="Employment Status / Field"
                icon={Briefcase}
                value={formData.employment_type}
              />

              <ReviewField
                label="Exact Occupation / Role"
                icon={UserCheck}
                value={formData.occupation}
              />

              {/* Specialized Currency Presentation Block */}
              <div className="space-y-2 w-full">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Estimated Monthly Income (KES)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none z-10">
                    <Coins size={18} className="text-slate-400" />
                    <div className="w-[1.5px] h-5 bg-slate-200 ml-4" />
                  </div>
                  <div className="w-full pl-[74px] pr-16 py-4 h-14 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold text-slate-800 flex items-center justify-between">
                    <span>
                      {formData.income_range
                        ? Number(formData.income_range).toLocaleString(
                            "en-KE",
                            { minimumFractionDigits: 2 },
                          )
                        : "0.00"}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider">
                      KES
                    </span>
                  </div>
                </div>
              </div>

              <ReviewField
                label="KRA Tax PIN"
                icon={FileText}
                value={formData.kra_pin}
                isMono={true}
              />
            </div>

            {/* Action Panel Matrix Footer */}
            <div className="p-8 py-5 border-t border-slate-100 flex gap-3 bg-white">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 h-14 font-bold text-xs bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-all cursor-pointer disabled:opacity-50"
              >
                Go Back
              </button>
              <button
                type="button"
                onClick={onSubmit}
                disabled={isSubmitting}
                className="flex-[2] h-14 font-bold text-xs bg-[#074073] hover:bg-[#052d52] text-white rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:bg-[#074073]/60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 size={14} />
                    <span>Save & Continue</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReviewIncomeDetails;
