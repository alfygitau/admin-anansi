import React from "react";
import {
  X,
  User,
  Shield,
  Hash,
  Calendar,
  Sparkles,
  Edit3,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ReviewScannedDetails = ({
  isOpen,
  onClose,
  scannedData,
  onEditTrigger,
  onAccept,
}) => {
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
            {/* Close Toggle */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 z-10 flex items-center justify-center w-8 h-8 bg-slate-100 hover:bg-slate-200 text-gray-500 rounded-full transition-all active:scale-95 shadow-sm cursor-pointer"
            >
              <X size={16} />
            </button>

            {/* Header Content Area */}
            <div className="px-8 pt-5 pb-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400">
                  Data Verification
                </span>
              </div>
              <h2 className="text-2xl font-bold text-[#074073] pt-1">
                Scan Results
              </h2>
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed max-w-[340px]">
                Review the automated text extraction metrics pulled from the
                uploaded identification document asset.
              </p>
            </div>
            <div className="border-b mx-8 border-slate-100"></div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
              {/* Data Category: Core Identification Fields */}
              <div className="space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Extracted Legal Name
                </p>

                <ScannedDataField
                  label="First Name"
                  icon={User}
                  value={scannedData?.firstname}
                />
                <ScannedDataField
                  label="Middle Name"
                  icon={User}
                  value={scannedData?.middlename}
                />
                <ScannedDataField
                  label="Last Name"
                  icon={User}
                  value={scannedData?.lastname}
                />
              </div>

              {/* Data Category: Compliance & Telemetry */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Document Framework & Metrics
                </p>

                <ScannedDataField
                  label="Identification Type"
                  icon={Shield}
                  value={scannedData?.identification_type}
                  isUppercase={true}
                />
                <ScannedDataField
                  label="Document ID Number"
                  icon={Hash}
                  value={scannedData?.identification}
                  isUppercase={true}
                />
                <ScannedDataField
                  label="Gender Classification"
                  icon={User}
                  value={scannedData?.gender}
                />
                <ScannedDataField
                  label="Date of Birth (DOB)"
                  icon={Calendar}
                  value={scannedData?.dob}
                />
              </div>
            </div>

            {/* Split Action Footer Controls */}
            <div className="p-8 py-5 border-t border-slate-100 flex gap-3 bg-white">
              {/* Edit Branch Button */}
              <button
                type="button"
                onClick={onEditTrigger}
                className="flex-1 h-14 font-bold text-xs bg-slate-100 text-slate-700 rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-200/40"
              >
                <Edit3 size={14} className="text-slate-500" />
                <span>Edit Details</span>
              </button>

              {/* Accept & Advance Button */}
              <button
                type="button"
                onClick={onAccept}
                className="flex-[1.5] h-14 font-bold text-xs bg-[#074073] hover:bg-[#052d52] text-white rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check size={14} />
                <span>Accept Details</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ScannedDataField = ({
  label,
  icon: Icon,
  value,
  isUppercase = false,
}) => (
  <div className="space-y-2 w-full">
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none z-10">
        <Icon size={18} className="text-[#074073]" />
        <div className="w-[1.5px] h-5 bg-slate-200 ml-4" />
      </div>
      <div
        className={`w-full pl-[74px] pr-6 py-4 min-h-14 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold text-slate-900 flex items-center ${
          isUppercase ? "uppercase tracking-wide" : ""
        }`}
      >
        {value || (
          <span className="text-slate-300 italic font-medium">
            Extraction Failed
          </span>
        )}
      </div>
    </div>
  </div>
);

export default ReviewScannedDetails;
