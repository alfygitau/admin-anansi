import React from "react";
import { X, Globe, Building2, Map, MapPin, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ReviewAddressProfile = ({
  isOpen,
  onClose,
  formData,
  isSubmitting,
  onSubmit,
}) => {
  // Custom static field layout to mirror the structure of your input fields
  const ReviewField = ({ label, icon: Icon, value, isMultiline = false }) => (
    <div className="space-y-2 w-full">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
        {label}
      </label>
      <div className="relative">
        {/* Absolute visual guideline anchor deck matching input styles */}
        <div
          className={`absolute left-0 flex pl-6 pointer-events-none z-10 ${
            isMultiline ? "top-4 items-start" : "inset-y-0 items-center"
          }`}
        >
          <Icon size={18} className="text-slate-400" />
          <div className="w-[1.5px] h-5 bg-slate-200 ml-4" />
        </div>

        {/* Read-only Data Container */}
        <div
          className={`w-full pl-[74px] pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold text-slate-800 flex ${
            isMultiline
              ? "min-h-24 items-start pt-4 leading-relaxed"
              : "h-14 items-center"
          }`}
        >
          {value ? (
            <span>{value}</span>
          ) : (
            <span className="text-slate-300 italic font-medium">
              Not Specified
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
            {/* Close Safety Control Handle */}
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="absolute top-5 right-5 z-10 flex items-center justify-center w-8 h-8 bg-slate-100 hover:bg-slate-200 text-gray-500 rounded-full transition-all active:scale-95 shadow-sm cursor-pointer disabled:opacity-50"
            >
              <X size={16} />
            </button>

            {/* Verification Header Section */}
            <div className="px-8 pt-5 pb-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400">
                  Review Parameters
                </span>
              </div>
              <h2 className="text-2xl font-bold text-[#074073] pt-1">
                Confirm Address
              </h2>
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed max-w-[360px]">
                Verify the geographic mapping configurations and physical
                address layout before committing records.
              </p>
            </div>
            <div className="border-b mx-8 border-slate-100"></div>

            {/* Read-Only Content Space */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
              <ReviewField
                label="Country"
                icon={Globe}
                value={formData.country}
              />

              <ReviewField
                label="County / Region"
                icon={Building2}
                value={formData.county}
              />

              <ReviewField
                label="Sub-County / District"
                icon={Map}
                value={formData.subcounty}
              />

              <ReviewField
                label="Street / Physical Address"
                icon={MapPin}
                value={formData.physical_address}
              />
            </div>

            {/* Bottom Actions Matrix */}
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
                    <span>Submit Registry Entry</span>
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

export default ReviewAddressProfile;
