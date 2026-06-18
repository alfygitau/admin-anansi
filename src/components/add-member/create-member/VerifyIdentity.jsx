import React from "react";
import { X, FileUp, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const VerifyIdentity = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  onContinue,
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
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 z-10 flex items-center justify-center w-8 h-8 bg-slate-100 hover:bg-slate-200 text-gray-500 rounded-full transition-all active:scale-95 shadow-sm cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="px-8 pt-5 pb-2">
              <h2 className="text-2xl font-bold text-[#074073]">Identity</h2>
              <p className="text-sm text-slate-500 font-medium">
                Upload Identification Documents
              </p>
            </div>
            <div className="border-b mx-8 border-slate-100"></div>

            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-3">
              {/* Helper Box */}
              <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl flex items-center gap-3">
                <ShieldCheck
                  className="text-[#074073] shrink-0 mt-0.5"
                  size={18}
                />
                <p className="text-[11px] text-[#074073] font-medium leading-relaxed">
                  Please ensure document images are clear, well-lit, and all
                  four corners are visible.
                </p>
              </div>

              {/* Document Upload Fields */}
              <FileUploadField
                label="ID Front View"
                id="front_view"
                fileKey="id_front"
                formData={formData}
                setFormData={setFormData}
              />
              <FileUploadField
                label="ID Back View"
                id="back_view"
                fileKey="id_back"
                formData={formData}
                setFormData={setFormData}
              />
            </div>

            <div className="p-8 py-5 border-t border-slate-100 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 h-14 font-bold text-xs bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-all cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={onContinue}
                className="flex-[2] h-14 font-bold text-xs bg-[#074073] text-white rounded-2xl hover:bg-[#052d52] transition-all shadow-lg cursor-pointer"
              >
                Scan Documents
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FileUploadField = ({ label, id, fileKey, formData, setFormData }) => {
  const previewUrl = formData[fileKey]
    ? URL.createObjectURL(formData[fileKey])
    : null;

  return (
    <div className="space-y-2 w-full">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
        {label}
      </label>

      <div className="relative group">
        {/* Preview State - Set to h-40 */}
        {previewUrl ? (
          <div className="relative w-full h-40 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner animate-in fade-in duration-200">
            <img
              src={previewUrl}
              alt="Uploaded Document Preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => setFormData({ ...formData, [fileKey]: null })}
              className="absolute top-3 right-3 p-1.5 bg-black/60 text-white rounded-full hover:bg-black/80 transition-colors shadow-sm cursor-pointer z-10"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          /* Empty/Input State - Set to h-40 */
          <div className="relative w-full h-40">
            <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none z-10">
              <FileUp
                size={18}
                className="text-slate-300 group-focus-within:text-[#074073] transition-colors"
              />
              {/* Balanced vertical divider matching the taller layout */}
              <div className="w-[1.5px] h-10 bg-slate-200 ml-4 group-focus-within:bg-[#074073]/20 transition-colors" />
            </div>
            <input
              type="file"
              id={id}
              accept="image/*"
              className="w-full pl-[74px] pr-6 h-full bg-slate-50 border border-slate-200 rounded-2xl file:hidden cursor-pointer text-xs font-semibold text-transparent flex items-center outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all"
              onChange={(e) =>
                setFormData({ ...formData, [fileKey]: e.target.files[0] })
              }
            />
            <div className="absolute inset-0 flex items-center pl-[74px] pointer-events-none">
              <span className="text-xs text-slate-400 font-medium truncate">
                Upload a viable image...
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyIdentity;
