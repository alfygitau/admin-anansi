import React from "react";
import {
  X,
  User,
  Mail,
  Smartphone,
  Globe,
  Building2,
  Map,
  MapPin,
  Briefcase,
  UserCheck,
  Coins,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ReviewProfile = ({
  isOpen,
  onClose,
  formData,
  isSubmitting,
  onSubmit,
}) => {
  // Safe handler to extract local preview URLs for the file metrics
  const getFilePreview = (file) => {
    if (!file) return null;
    try {
      return URL.createObjectURL(file);
    } catch (e) {
      return null;
    }
  };

  // Structural field mirroring your FilterField design for static content
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
          className={`w-full pl-[74px] pr-6 py-4 min-h-14 bg-slate-50 border border-slate-100 rounded-2xl text-xs flex items-center text-slate-800 ${
            isMono
              ? "font-mono font-bold tracking-wider uppercase"
              : "font-bold"
          }`}
        >
          {value || (
            <span className="text-slate-300 italic font-medium">
              Not Provided
            </span>
          )}
        </div>
      </div>
    </div>
  );

  const frontPreview = getFilePreview(formData.id_front);
  const backPreview = getFilePreview(formData.id_back);

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
              disabled={isSubmitting}
              className="absolute top-5 right-5 z-10 flex items-center justify-center w-8 h-8 bg-slate-100 hover:bg-slate-200 text-gray-500 rounded-full transition-all active:scale-95 shadow-sm cursor-pointer disabled:opacity-50"
            >
              <X size={16} />
            </button>

            {/* Header Area */}
            <div className="px-8 pt-5 pb-6">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md">
                  Review Summary
                </span>
              </div>
              <h2 className="text-2xl font-bold text-[#074073] pt-1">
                Review Details
              </h2>
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed max-w-[340px]">
                Verify all operational metrics and compliance records before
                finalizing database integration.
              </p>
            </div>
            <div className="border-b mx-8 border-slate-100"></div>

            {/* Scrollable Metrics Content Deck */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
              {/* SECTION 1: Identity & Profile Details */}
              <div className="space-y-4">
                <p className="text-[10px] font-black text-[#074073] uppercase tracking-widest ml-1">
                  01 • Profile Credentials
                </p>
                <ReviewField
                  label="Username Reference"
                  icon={User}
                  value={formData.username}
                />
                <ReviewField
                  label="Email Address"
                  icon={Mail}
                  value={formData.email}
                />
                <ReviewField
                  label="Mobile Line Connection"
                  icon={Smartphone}
                  value={formData.mobileno}
                />
              </div>
            </div>

            {/* Action Footer Button Matrix */}
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
                className="flex-[2] h-14 font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:bg-emerald-600/50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 size={14} />
                    <span>Confirm & Commit Profile</span>
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

export default ReviewProfile;
