import React, { useState } from "react";
import {
  Check,
  Copy,
  ArrowRight,
  UserPlus,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";

const CreateMemberSuccess = ({ formData, onAddAnother, onClose }) => {
  const [copied, setCopied] = useState(false);

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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="h-full flex flex-col justify-between p-8 bg-white"
    >
      {/* Top Spacer & Animated Success Icon Deck */}
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 my-auto">
        {/* Animated Radial Concentric Success Ring */}
        <div className="relative flex items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="size-20 bg-emerald-50 rounded-full border border-emerald-100 flex items-center justify-center text-emerald-600 z-10 shadow-xs"
          >
            <Check size={36} strokeWidth={3} />
          </motion.div>
          <div className="absolute inset-0 size-20 bg-emerald-400/10 rounded-full animate-ping duration-1000" />
        </div>

        {/* Text Headers */}
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-[#074073] tracking-tight">
            Registration Complete
          </h3>
          <p className="text-xs text-slate-400 font-medium max-w-[280px] mx-auto leading-relaxed">
            The profile for{" "}
            <span className="text-slate-800 font-bold">
              {formData.username || "this member"}
            </span>{" "}
            has been verified and committed to the central ledger registry.
          </p>
        </div>

        {/* System Ledger Receipt Container */}
        <div className="w-full border border-slate-100 bg-slate-50/50 rounded-2xl p-5 space-y-3.5 text-left">
          {/* Member ID Field row */}
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

          {/* Timestamp Info */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar size={12} className="text-slate-300" /> Registry Date
            </span>
            <span className="font-semibold text-slate-700 text-[11px]">
              {registrationTimestamp}
            </span>
          </div>

          {/* Security Node Check */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck size={12} className="text-slate-300" /> Compliance
              Tier
            </span>
            <span className="font-bold text-emerald-700 text-[10px] uppercase tracking-widest bg-emerald-50 px-2 py-0.5 border border-emerald-100/50 rounded-md">
              Passed KYC
            </span>
          </div>
        </div>
      </div>

      {/* Action Footers Block */}
      <div className="space-y-3 pt-6 border-t border-slate-100 bg-white">
        {/* Branch Action 1: Add another record */}
        <button
          type="button"
          onClick={onAddAnother}
          className="w-full h-14 font-bold text-xs bg-slate-50 hover:bg-slate-100 text-[#074073] rounded-2xl transition-all border border-slate-200/60 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
        >
          <UserPlus size={14} />
          <span>Register Another Member</span>
        </button>

        {/* Primary Action 2: Exit pipeline */}
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
  );
};

export default CreateMemberSuccess;
