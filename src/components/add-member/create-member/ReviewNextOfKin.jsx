import React, { useState, useEffect } from "react";
import {
  X,
  User,
  Phone,
  Users,
  Calendar,
  MapPin,
  Check,
  Copy,
  ArrowRight,
  UserPlus,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ReviewNextOfKin = ({
  isOpen,
  onClose,
  formData,
  onEdit,
  onAddAnother,
}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  // Reset internal success toggle whenever the modal visibility resets
  useEffect(() => {
    if (!isOpen) {
      setIsSuccess(false);
    }
  }, [isOpen]);

  // Simulated ledger system reference properties matching year 2026 criteria
  const generatedMemberId =
    "MBR-2026-" + Math.floor(100000 + Math.random() * 900000);
  const registrationTimestamp = new Date().toLocaleDateString("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleCopyId = () => {
    navigator.clipboard.writeText(generatedMemberId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const ReviewField = ({ label, icon: Icon, value }) => (
    <div className="space-y-2 w-full">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none z-10">
          <Icon size={18} className="text-slate-400" />
          <div className="w-[1.5px] h-5 bg-slate-200 ml-4" />
        </div>
        <div className="w-full pl-[74px] pr-6 py-4 h-14 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold text-slate-800 flex items-center">
          {value || <span className="text-slate-300 italic">Not Provided</span>}
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
            {/* Top Close Control Toggle */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 z-10 flex items-center justify-center w-8 h-8 bg-slate-100 hover:bg-slate-200 text-gray-500 rounded-full transition-all active:scale-95 shadow-sm cursor-pointer"
            >
              <X size={16} />
            </button>

            {!isSuccess ? (
              /* VIEW STATE A: READ-ONLY REVIEW SUMMARY CARD */
              <>
                <div className="px-8 pt-5 pb-1">
                  <h2 className="text-2xl font-bold text-[#074073]">
                    Kin Review
                  </h2>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Verify information before finalizing.
                  </p>
                </div>
                <div className="border-b mx-8 border-slate-100 mt-4"></div>

                <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
                  <ReviewField
                    label="Full Name"
                    icon={User}
                    value={formData?.fullname}
                  />
                  <ReviewField
                    label="Phone Number"
                    icon={Phone}
                    value={formData?.phone}
                  />
                  <ReviewField
                    label="Relationship"
                    icon={Users}
                    value={formData?.relationship}
                  />
                  <ReviewField
                    label="Date of Birth"
                    icon={Calendar}
                    value={formData?.date_of_birth}
                  />
                  <ReviewField
                    label="Location"
                    icon={MapPin}
                    value={formData?.location}
                  />
                </div>

                <div className="p-8 py-5 border-t border-slate-100 flex gap-3 bg-white">
                  <button
                    type="button"
                    onClick={onEdit}
                    className="flex-1 h-14 font-bold text-xs bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSuccess(true)}
                    className="flex-[2] h-14 font-bold text-xs bg-[#074073] hover:bg-[#052d52] text-white rounded-2xl transition-all shadow-lg cursor-pointer"
                  >
                    Confirm
                  </button>
                </div>
              </>
            ) : (
              /* VIEW STATE B: COMMITTED REGISTRATION SUCCESS CARD */
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col justify-between p-8 bg-white"
              >
                {/* Upper Content Area: Stacked from the top down and aligned to the left */}
                <div className="flex-1 flex flex-col items-start pt-2 space-y-6 w-full overflow-y-auto">
                  {/* Animated Concentric Success Ring (Left-Aligned) */}
                  <div className="relative flex items-center justify-start pl-1">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="size-16 bg-emerald-50 rounded-full border border-emerald-100 flex items-center justify-center text-emerald-600 z-10 shadow-3xs"
                    >
                      <Check size={28} strokeWidth={3} />
                    </motion.div>
                    <div className="absolute left-1 size-16 bg-emerald-400/10 rounded-full animate-ping duration-1000" />
                  </div>

                  {/* Status Headers (Left-Aligned) */}
                  <div className="space-y-1.5 text-left w-full pl-1">
                    <h3 className="text-2xl font-black text-[#074073] tracking-tight">
                      Registration Successful
                    </h3>
                    <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                      The member's structural data pipeline has been securely
                      parsed. Core credentials, geographic mapping metrics, and
                      financial underwriting parameters have successfully
                      cleared all system validation constraints and are
                      officially committed to the secure database registry.
                    </p>
                  </div>

                  {/* Structural Divider separating header text from data payload */}
                  <div className="w-full border-b border-slate-100"></div>

                  {/* System Receipt Box */}
                  <div className="w-full border border-slate-100 bg-slate-50/50 rounded-2xl p-5 space-y-3.5 text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Assigned System ID
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-black text-slate-800 tracking-wider">
                          {generatedMemberId}
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyId}
                          className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                            copied
                              ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                              : "bg-white border-slate-200 text-slate-400 hover:text-slate-600 active:scale-95"
                          }`}
                        >
                          {copied ? (
                            <Check size={12} strokeWidth={3} />
                          ) : (
                            <Copy size={12} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="border-b border-dashed border-slate-200" />

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Calendar size={12} className="text-slate-300" />{" "}
                        Registry Date
                      </span>
                      <span className="font-semibold text-slate-700 text-[11px]">
                        {registrationTimestamp}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <ShieldCheck size={12} className="text-slate-300" />{" "}
                        Compliance
                      </span>
                      <span className="font-bold text-emerald-700 text-[10px] uppercase tracking-widest bg-emerald-50 px-2 py-0.5 border border-emerald-100/50 rounded-md">
                        Passed Registration
                      </span>
                    </div>
                  </div>
                </div>

                {/* Final Pipeline Success Footers */}
                <div className="space-y-3 pt-6 border-t border-slate-100 bg-white">
                  <button
                    type="button"
                    onClick={onAddAnother}
                    className="w-full h-14 font-bold text-xs bg-slate-50 hover:bg-slate-100 text-[#074073] rounded-2xl transition-all border border-slate-200/60 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                  >
                    <UserPlus size={14} />
                    <span>Register Another Member</span>
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full h-14 font-bold text-xs bg-[#074073] hover:bg-[#052d52] text-white rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                  >
                    <span>Return to Dashboard</span>
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

export default ReviewNextOfKin;
