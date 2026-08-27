import React, { useState } from "react";
import {
  X,
  Camera,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Trash2,
  AlertCircle,
  Sparkles,
  RefreshCw,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "react-query";
import { useToast } from "../../contexts/ToastProvider";
import { uploadSelfieImage } from "../../sdk/upload/upload";

export default function UploadSelfie({
  isOpen,
  onClose,
  existingSelfieUrl,
  refetch,
  customerId,
}) {
  const [selfieFile, setSelfieFile] = useState(null);
  const [selfiePreview, setSelfiePreview] = useState(null);
  const [clearedSelfie, setClearedSelfie] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const { showToast } = useToast();

  const isReplace = Boolean(existingSelfieUrl);
  const activePreview =
    selfiePreview || (!clearedSelfie ? existingSelfieUrl : null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelfieFile(file);
    setSelfiePreview(URL.createObjectURL(file));
    setClearedSelfie(false);
    setError("");
  };

  const handleClear = () => {
    setSelfieFile(null);
    setSelfiePreview(null);
    setClearedSelfie(true);
  };

  const handleClose = () => {
    setSelfieFile(null);
    setSelfiePreview(null);
    setClearedSelfie(false);
    setIsSuccess(false);
    setError("");
    onClose();
  };

  const handleSave = async () => {
    if (!selfieFile && !activePreview) {
      setError("Please attach or capture a portrait selfie image.");
      return;
    }
    setError("");
    mutate();
  };

  const { mutate, isLoading: isUploading } = useMutation({
    mutationKey: ["uplaod selfie"],
    mutationFn: async () => {
      const response = await uploadSelfieImage(customerId, selfieFile);
      return response.data.data;
    },
    onSuccess: () => {
      refetch();
      setIsSuccess(true);
    },
    onError: (error) => {
      showToast({
        title: "Selfie processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-zinc-950/20 font-sans antialiased text-slate-800">
          {/* Backdrop Dismiss */}
          <div className="absolute inset-0" onClick={handleClose} />

          {/* Right Drawer Panel Shell */}
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
                    Biometric Verification
                  </span>
                </div>
                <h2 className="text-xl font-bold text-[#074073] mt-0.5">
                  {isSuccess
                    ? "Selfie Updated"
                    : isReplace
                      ? "Replace Member Selfie"
                      : "Upload Member Selfie"}
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {isSuccess
                    ? "Biometric portrait updated in database."
                    : "Capture or attach a clear facial portrait for verification."}
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

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-8 py-4 space-y-6">
              {isSuccess ? (
                /* SUCCESS VIEW */
                <div className="h-full flex flex-col space-y-4 py-2 animate-in fade-in duration-300 text-left">
                  <div className="space-y-1">
                    <h3 className="text-base font-extrabold text-slate-800">
                      Biometric Asset Linked
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      The uploaded facial portrait image has been successfully
                      verified and associated with the member's profile.
                    </p>
                  </div>

                  {/* Selfie Preview Banner */}
                  <div className="w-full bg-slate-50 border border-slate-200/80 p-4 rounded-2xl flex items-center gap-4">
                    <div className="size-16 rounded-2xl overflow-hidden border border-slate-200 shrink-0 bg-slate-100 flex items-center justify-center">
                      {activePreview ? (
                        <img
                          src={activePreview}
                          alt="Selfie Success Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="text-slate-400" size={24} />
                      )}
                    </div>
                    <div className="space-y-1 min-w-0">
                      <span className="text-[9px] font-black uppercase text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">
                        Verified Biometric
                      </span>
                      <p className="text-xs font-bold text-slate-800 truncate">
                        Selfie Portrait Asset
                      </p>
                      <p className="text-[10px] text-slate-400">
                        Status: Active on system record
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* UPLOAD FORM VIEW */
                <>
                  {error && (
                    <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-2.5 text-xs text-rose-700 font-bold">
                      <AlertCircle
                        size={16}
                        className="shrink-0 text-rose-600"
                      />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Requirements Box */}
                  <div className="p-4 bg-blue-50/60 border border-blue-100 rounded-2xl flex items-start gap-3">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-[#074073]">
                        Portrait Requirements
                      </p>
                      <ul className="text-[11px] text-[#074073]/80 space-y-1 list-disc list-inside font-medium leading-relaxed">
                        <li>Face must be centered and fully visible.</li>
                        <li>
                          Good lighting without harsh glares or heavy shadows.
                        </li>
                        <li>No sunglasses, hats, masks, or heavy filters.</li>
                      </ul>
                    </div>
                  </div>

                  {/* PORTRAIT DROPZONE */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                        Facial Biometric Portrait
                      </label>
                      {existingSelfieUrl && !selfieFile && !clearedSelfie && (
                        <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">
                          Current On File
                        </span>
                      )}
                    </div>

                    <div className="relative border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 p-6 flex flex-col items-center justify-center text-center transition-all hover:border-[#074073]/40 min-h-[220px] group overflow-hidden">
                      {/* Active File Input */}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                      />

                      {activePreview ? (
                        <div className="relative flex flex-col items-center justify-center gap-3 pointer-events-none">
                          <div className="relative size-32 rounded-full overflow-hidden border-4 border-white shadow-md group-hover:border-[#074073]/20 transition-colors">
                            <img
                              src={activePreview}
                              alt="Selfie Preview"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-bold gap-1">
                              <RefreshCw size={14} />
                              <span>Click to Change</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2 flex flex-col items-center pointer-events-none">
                          <div className="size-12 rounded-2xl bg-slate-100 border border-slate-200/80 text-slate-400 group-hover:text-[#074073] group-hover:border-[#074073]/30 transition-colors flex items-center justify-center">
                            <Camera size={24} />
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-xs font-bold text-slate-700 block">
                              Click or drag selfie photo
                            </span>
                            <span className="text-[10px] text-slate-400 block">
                              PNG, JPG, or WEBP up to 5MB
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer Control Dock */}
            <div className="px-8 py-4 border-t border-slate-100 flex items-center justify-between gap-3 bg-slate-50/50">
              {isSuccess ? (
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full h-12 font-bold text-xs bg-[#074073] text-white rounded-2xl hover:bg-[#052d52] transition-all shadow-md shadow-[#074073]/20 cursor-pointer active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Sparkles size={16} />
                  <span>Dismiss</span>
                </button>
              ) : (
                <>
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
                    disabled={isUploading || !activePreview}
                    className="flex-1 h-12 font-bold text-xs bg-[#074073] text-white rounded-2xl hover:bg-[#052d52] transition-all shadow-md shadow-[#074073]/20 cursor-pointer active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Saving Selfie...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={16} />
                        <span>
                          {isReplace ? "Confirm Replacement" : "Save Selfie"}
                        </span>
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
