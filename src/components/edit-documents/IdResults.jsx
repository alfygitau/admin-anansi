import React, { useState } from "react";
import {
  X,
  User,
  Shield,
  Hash,
  Calendar,
  CheckCircle2,
  Scan,
  Copy,
  Check,
  Loader2,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "react-query";
import { useToast } from "../../contexts/ToastProvider";
import { uploadIdImages } from "../../sdk/upload/upload";
import { updateMemberIdentity } from "../../sdk/members/members";

export default function IdResults({
  isOpen,
  onClose,
  scannedData,
  onApplyData,
  customerId,
  identityFiles,
  refetch,
}) {
  const [copied, setCopied] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { showToast } = useToast();

  const handleCopySummary = () => {
    const summary = `Name: ${scannedData?.firstname || ""} ${
      scannedData?.middlename || ""
    } ${scannedData?.lastname || ""}\nType: ${
      scannedData?.identification_type || ""
    }\nID Number: ${scannedData?.identification || ""}\nGender: ${
      scannedData?.gender || ""
    }\nDOB: ${scannedData?.dob || ""}`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  const { mutate: uploadingImages, isLoading: uploadingFiles } = useMutation({
    mutationKey: ["upload id images"],
    mutationFn: async () => {
      const response = await uploadIdImages(
        customerId,
        identityFiles?.frontFile,
        identityFiles?.backFile,
      );
      return response.data.data;
    },
    onSuccess: () => {
      refetch();
      setIsSuccess(true);
    },
    onError: (error) => {
      showToast({
        title: "Identity processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const { mutate: uploadingMemberIdentity, isLoading: updatingIdentity } =
    useMutation({
      mutationKey: ["update member identity"],
      mutationFn: async () => {
        const response = await updateMemberIdentity(
          customerId,
          scannedData?.firstname,
          scannedData?.middlename,
          scannedData?.lastname,
          scannedData?.identification,
          scannedData?.gender,
          scannedData?.dob,
        );
        return response.data.data;
      },
      onSuccess: () => {
        uploadingImages();
      },
      onError: (error) => {
        showToast({
          title: "Identity processing failed",
          type: "error",
          position: "top-right",
          description: error?.response?.data?.message || error.message,
        });
      },
    });

  const isSubmitting = updatingIdentity || uploadingFiles;

  const handleUpdateMember = () => {
    uploadingMemberIdentity();
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
                    {isSuccess ? "Verification Complete" : "OCR Telemetry"}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-[#074073] mt-0.5">
                  {isSuccess ? "ID Details Updated" : "Scan Results"}
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {isSuccess
                    ? "KYC document assets and identity records saved."
                    : "Review text extraction metrics pulled from document assets."}
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

            {/* Scrollable Form / Success Body */}
            <div className="flex-1 overflow-y-auto p-8 py-2 space-y-6">
              {isSuccess ? (
                /* SUCCESS VIEW */
                <div className="h-full flex flex-col space-y-4 py-1 animate-in fade-in duration-300 text-left">
                  {/* Centered Icon Only */}

                  {/* Left-Aligned Header Text */}
                  <div className="space-y-1">
                    <h3 className="text-base font-extrabold text-slate-800">
                      Identity Records Applied
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      Member profile data and physical ID image assets have been
                      successfully linked and verified in the database.
                    </p>
                  </div>

                  {/* Comprehensive Summary Details Container */}
                  <div className="w-full bg-slate-50 p-3 space-y-2.5 text-left">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-400 uppercase text-[9px] tracking-wider">
                        Applicant Name
                      </span>
                      <span className="font-extrabold text-[#074073] capitalize">
                        {[
                          scannedData?.firstname,
                          scannedData?.middlename,
                          scannedData?.lastname,
                        ]
                          .filter(Boolean)
                          .join(" ") || "—"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60">
                      <span className="font-bold text-slate-400 uppercase text-[9px] tracking-wider">
                        ID Type
                      </span>
                      <span className="font-bold text-slate-800 uppercase">
                        {scannedData?.identification_type || "National ID"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60">
                      <span className="font-bold text-slate-400 uppercase text-[9px] tracking-wider">
                        ID Number
                      </span>
                      <span className="font-mono font-bold text-slate-800">
                        {scannedData?.identification || "—"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60">
                      <span className="font-bold text-slate-400 uppercase text-[9px] tracking-wider">
                        Gender
                      </span>
                      <span className="font-bold text-slate-800 capitalize">
                        {scannedData?.gender || "—"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60">
                      <span className="font-bold text-slate-400 uppercase text-[9px] tracking-wider">
                        Date of Birth
                      </span>
                      <span className="font-bold text-slate-800">
                        {scannedData?.dob || "—"}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                /* SCAN RESULTS DATA VIEW */
                <>
                  {/* Scan Success Banner */}
                  <div className="p-4 bg-emerald-50/60 border border-emerald-100 rounded-2xl flex items-center gap-3">
                    <Scan
                      size={18}
                      className="text-emerald-600 shrink-0 mt-0.5"
                    />
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-emerald-800">
                        Automated OCR Extraction Complete
                      </p>
                      <p className="text-[11px] text-emerald-700/80 font-medium leading-relaxed">
                        Verify that the extracted textual metrics below match
                        the uploaded physical document.
                      </p>
                    </div>
                  </div>

                  {/* SECTION 1: EXTRACTED LEGAL NAME */}
                  <div className="space-y-3.5">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      Extracted Legal Name
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3.5">
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
                      <div className="md:col-span-2">
                        <ScannedDataField
                          label="Last Name"
                          icon={User}
                          value={scannedData?.lastname}
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: DOCUMENT METRICS */}
                  <div className="space-y-3.5 pt-5 border-t border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      Document Metrics
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3.5">
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
                </>
              )}
            </div>

            {/* Footer Control Dock */}
            <div className="px-8 py-4 border-t border-slate-100 flex items-center justify-between gap-3 bg-slate-50/50">
              {isSuccess ? (
                /* SUCCESS ACTION BUTTON */
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full h-12 font-bold text-xs bg-[#074073] text-white rounded-2xl hover:bg-[#052d52] transition-all shadow-md shadow-[#074073]/20 cursor-pointer active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Sparkles size={16} />
                  <span>Dismiss</span>
                </button>
              ) : (
                /* FORM ACTION BUTTONS */
                <>
                  <button
                    type="button"
                    onClick={handleCopySummary}
                    disabled={isSubmitting}
                    className="h-12 px-5 font-bold text-xs text-slate-600 hover:text-slate-800 bg-white border border-slate-200/80 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer flex items-center gap-2 shadow-3xs disabled:opacity-50"
                  >
                    {copied ? (
                      <Check size={14} className="text-emerald-600" />
                    ) : (
                      <Copy size={14} />
                    )}
                    <span>{copied ? "Copied" : "Copy Data"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleUpdateMember}
                    disabled={isSubmitting}
                    className="flex-1 h-12 font-bold text-xs bg-[#074073] text-white rounded-2xl hover:bg-[#052d52] transition-all shadow-md shadow-[#074073]/20 cursor-pointer active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Applying Records...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={16} />
                        <span>Apply to Member Profile</span>
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

const ScannedDataField = ({
  label,
  icon: Icon,
  value,
  isUppercase = false,
}) => (
  <div className="space-y-1.5 w-full">
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10">
        <Icon size={16} className="text-[#074073]" />
        <div className="w-[1px] h-4 bg-slate-200 ml-3" />
      </div>
      <div
        className={`w-full pl-[58px] pr-4 h-12 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs font-bold text-[#074073] flex items-center ${
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
