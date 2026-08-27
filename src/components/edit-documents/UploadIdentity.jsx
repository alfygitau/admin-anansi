import React, { useState } from "react";
import {
  X,
  FileUp,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Trash2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function UploadIdentity({
  isOpen,
  onClose,
  existingFrontUrl,
  existingBackUrl,
  onSubmit,
}) {
  const [frontFile, setFrontFile] = useState(null);
  const [frontPreview, setFrontPreview] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const [backPreview, setBackPreview] = useState(null);
  const [clearedFront, setClearedFront] = useState(false);
  const [clearedBack, setClearedBack] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const isReplace = Boolean(existingFrontUrl || existingBackUrl);

  const activeFrontPreview =
    frontPreview || (!clearedFront ? existingFrontUrl : null);
  const activeBackPreview =
    backPreview || (!clearedBack ? existingBackUrl : null);

  const handleFileChange = (e, side) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (side === "front") {
      setFrontFile(file);
      setFrontPreview(URL.createObjectURL(file));
      setClearedFront(false);
    } else {
      setBackFile(file);
      setBackPreview(URL.createObjectURL(file));
      setClearedBack(false);
    }
    setError("");
  };

  const clearFile = (side) => {
    if (side === "front") {
      setFrontFile(null);
      setFrontPreview(null);
      setClearedFront(true);
    } else {
      setBackFile(null);
      setBackPreview(null);
      setClearedBack(true);
    }
  };

  const handleClose = () => {
    setFrontFile(null);
    setFrontPreview(null);
    setBackFile(null);
    setBackPreview(null);
    setClearedFront(false);
    setClearedBack(false);
    setError("");
    setIsUploading(false);
    onClose();
  };

  const handleSave = async () => {
    if (!frontFile && !activeFrontPreview) {
      setError("Please select the Front View of the ID card.");
      return;
    }
    if (!backFile && !activeBackPreview) {
      setError("Please select the Reverse / Back View of the ID card.");
      return;
    }

    setIsUploading(true);
    try {
      if (onSubmit) {
        await onSubmit({ frontFile, backFile });
      }
      handleClose();
    } catch (err) {
      setError(err?.message || "Failed to upload document files.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-zinc-950/20 font-sans antialiased text-slate-800">
          {/* Backdrop Dismiss */}
          <div className="absolute inset-0" onClick={handleClose} />

          {/* Drawer Modal Shell */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.2 }}
            className="bg-white relative w-full max-w-[480px] h-full shadow-2xl flex flex-col z-10 overflow-hidden"
          >
            {/* Modal Header */}
            <div className="px-8 pt-6 pb-4 flex items-center justify-between border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#074073]">
                    KYC Document Assets
                  </span>
                </div>
                <h2 className="text-xl font-bold text-[#074073] mt-0.5">
                  {isReplace ? "Replace ID Documents" : "Upload ID Documents"}
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Update both front and reverse sides simultaneously.
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="flex items-center justify-center w-8 h-8 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 rounded-full transition-all cursor-pointer active:scale-95"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {error && (
                <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-2.5 text-xs text-rose-700 font-bold">
                  <AlertCircle size={16} className="shrink-0 text-rose-600" />
                  <span>{error}</span>
                </div>
              )}

              {/* Requirement Alert Banner */}
              <div className="p-4 bg-blue-50/60 border border-blue-100/80 rounded-2xl flex items-center gap-3">
                <ShieldCheck
                  size={18}
                  className="text-[#074073] shrink-0 mt-0.5"
                />
                <p className="text-[11px] text-[#074073] font-medium leading-relaxed">
                  Both sides must be uploaded together to ensure automated
                  extraction and system compliance stay in sync.
                </p>
              </div>

              {/* SIDE 1: FRONT VIEW DROPZONE */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    ID Card - Front View
                  </label>
                  {existingFrontUrl && !frontFile && !clearedFront && (
                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">
                      Current On File
                    </span>
                  )}
                </div>

                <DropzoneBox
                  preview={activeFrontPreview}
                  onFileSelect={(e) => handleFileChange(e, "front")}
                  onClear={() => clearFile("front")}
                  label="Select Front View Image"
                />
              </div>

              {/* SIDE 2: REVERSE / BACK VIEW DROPZONE */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    ID Card - Reverse / Back View
                  </label>
                  {existingBackUrl && !backFile && !clearedBack && (
                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">
                      Current On File
                    </span>
                  )}
                </div>

                <DropzoneBox
                  preview={activeBackPreview}
                  onFileSelect={(e) => handleFileChange(e, "back")}
                  onClear={() => clearFile("back")}
                  label="Select Back View Image"
                />
              </div>
            </div>

            {/* Footer Control Dock */}
            <div className="px-8 py-4 border-t border-slate-100 flex items-center justify-between gap-3 bg-slate-50/50">
              <button
                type="button"
                onClick={handleClose}
                disabled={isUploading}
                className="h-12 px-5 font-bold text-xs text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={
                  isUploading ||
                  (!frontFile && !backFile && !isReplace) ||
                  !activeFrontPreview ||
                  !activeBackPreview
                }
                className="flex-1 h-12 font-bold text-xs bg-[#074073] text-white rounded-2xl hover:bg-[#052d52] transition-all shadow-md shadow-[#074073]/20 cursor-pointer active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Saving Both Assets...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={16} />
                    <span>
                      {isReplace ? "Confirm Replacement" : "Save Both Sides"}
                    </span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// FIXED HELPER DROPZONE
function DropzoneBox({ preview, onFileSelect, onClear, label }) {
  return (
    <div className="relative border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 p-4 flex flex-col items-center justify-center text-center transition-all hover:border-[#074073]/40 min-h-[140px] group overflow-hidden">
      {/* File input is ALWAYS rendered on top to allow selection at any time */}
      <input
        type="file"
        accept="image/*,.pdf"
        onChange={onFileSelect}
        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
      />

      {preview ? (
        <div className="relative w-full flex flex-col items-center justify-center gap-2 pointer-events-none">
          <div className="relative max-h-28 rounded-xl overflow-hidden border border-slate-200 shadow-3xs group-hover:border-[#074073]/50 transition-colors">
            <img
              src={preview}
              alt="ID Preview"
              className="max-h-28 object-contain"
            />
            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-[10px] font-bold">
              <RefreshCw size={12} />
              <span>Click to Change</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-1 flex flex-col items-center pointer-events-none">
          <FileUp
            className="text-slate-400 group-hover:text-[#074073] transition-colors"
            size={22}
          />
          <span className="text-xs font-bold text-slate-700">{label}</span>
          <span className="text-[10px] text-slate-400">
            PNG, JPG, or PDF up to 5MB
          </span>
        </div>
      )}
    </div>
  );
}
