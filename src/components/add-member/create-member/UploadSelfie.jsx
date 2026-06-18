import React, { useState } from "react";
import { X, Camera, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const UploadSelfie = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  onContinue,
}) => {
  const [previewUrl, setPreviewUrl] = useState(formData.selfieUrl || null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, selfieFile: file });
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

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
            {/* Header */}
            <div className="px-8 pt-8 pb-6">
              <h2 className="text-2xl font-bold text-[#074073]">
                Member Selfie
              </h2>
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                Upload a clear portrait. This will be used for identification.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-2 space-y-8">
              {/* Upload Zone */}
              <div className="relative group border-2 border-dashed border-slate-200 rounded-3xl p-6 flex flex-col items-center justify-center bg-slate-50 hover:border-[#074073]/30 transition-all">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />

                {previewUrl ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs font-bold text-[#074073]">
                      Click to change photo
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Camera className="mx-auto text-slate-400 mb-2" size={32} />
                    <p className="text-xs font-semibold text-slate-600">
                      Click or drag & drop
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                )}
              </div>

              {/* Photo Guidelines */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 mb-3">
                  <Info size={16} className="text-[#074073]" />
                  <h4 className="text-[11px] font-bold uppercase text-[#074073] tracking-wider">
                    Requirements
                  </h4>
                </div>
                <ul className="text-[11px] text-slate-500 space-y-2 list-disc list-inside">
                  <li>Ensure your face is clearly visible and centered.</li>
                  <li>Use neutral lighting (avoid harsh shadows or glare).</li>
                  <li>Maintain a plain background if possible.</li>
                  <li>No sunglasses, hats, or filters.</li>
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-slate-100 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 h-14 font-bold text-xs bg-slate-100 text-slate-600 rounded-2xl"
              >
                Cancel
              </button>
              <button
                onClick={onContinue}
                className="flex-[2] h-14 font-bold text-xs bg-[#074073] text-white rounded-2xl"
              >
                Save & Finish
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UploadSelfie;
