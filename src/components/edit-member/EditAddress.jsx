import React, { useState } from "react";
import {
  X,
  Globe,
  MapPin,
  Building,
  Navigation,
  Save,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  Loader2,
  Edit2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const EditAddressDetails = ({
  isOpen,
  onClose,
  onSave,
  formData,
  setFormData,
  loading,
  step,
  setStep,
}) => {
  const [errors, setErrors] = useState({});

  const validateField = (fieldName, value) => {
    let errorMessage = "";
    const sanitizedValue = value?.toString().trim();

    if (!sanitizedValue) {
      const fieldLabels = {
        country: "country of residence",
        physicalAddress: "physical street or residential address",
        county: "county / state location",
        subcounty: "sub-county / district location",
      };
      errorMessage = `Please provide a valid ${fieldLabels[fieldName] || fieldName}.`;
    }

    setErrors((prev) => ({ ...prev, [fieldName]: errorMessage }));
    return errorMessage;
  };

  const handleProceedToPreview = () => {
    const fieldsToValidate = [
      "country",
      "physicalAddress",
      "county",
      "subcounty",
    ];
    let hasErrors = false;

    fieldsToValidate.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) hasErrors = true;
    });

    if (hasErrors) return;
    setStep("preview");
  };

  const handleConfirmAndSave = async () => {
    if (loading) return;
    await onSave();
  };

  const handleClearAllStates = () => {
    setStep("form");
    setErrors({});
    setFormData({
      country: "",
      physicalAddress: "",
      county: "",
      subcounty: "",
    });
  };

  const handleResetAndClose = () => {
    if (loading) return;
    handleClearAllStates();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex justify-end bg-zinc-950/20 font-sans"
        >
          <div className="absolute inset-0" onClick={handleResetAndClose} />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="bg-white relative w-full max-w-[480px] h-full shadow-2xl flex flex-col z-10 text-slate-800"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleResetAndClose}
              disabled={loading}
              className="absolute top-5 right-5 z-10 w-8 h-8 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-gray-500 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-3xs active:scale-95"
            >
              <X size={16} />
            </button>

            {/* STEP 1: INPUT FORM SPACE */}
            {step === "form" && (
              <>
                <div className="px-8 pt-5 pb-6 select-none">
                  <h2 className="text-xl font-black text-[#074073] tracking-tight">
                    Edit Address Details
                  </h2>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    Modify geographical records and residency mapping
                    coordinates.
                  </p>
                </div>
                <div className="border-b mx-8 border-slate-100"></div>

                <div className="flex-1 overflow-y-auto px-8 py-6 space-y-5 custom-scrollbar">
                  <FilterField
                    label="Country"
                    icon={Globe}
                    error={errors.country}
                  >
                    <input
                      type="text"
                      placeholder="e.g., Kenya"
                      value={formData.country || ""}
                      onChange={(e) => {
                        setFormData({ ...formData, country: e.target.value });
                        if (errors.country)
                          setErrors({ ...errors, country: "" });
                      }}
                      onBlur={(e) => validateField("country", e.target.value)}
                      className={`w-full pl-[74px] pr-6 h-14 bg-slate-50 border rounded-2xl text-xs font-semibold outline-none transition-all ${
                        errors.country
                          ? "border-rose-300 bg-rose-50/10"
                          : "border-slate-200 focus:border-[#074073] focus:bg-white"
                      }`}
                    />
                  </FilterField>

                  <div className="grid grid-cols-2 gap-4">
                    <FilterField
                      label="County / State"
                      icon={Building}
                      error={errors.county}
                    >
                      <input
                        type="text"
                        placeholder="e.g., Nairobi"
                        value={formData.county || ""}
                        onChange={(e) => {
                          setFormData({ ...formData, county: e.target.value });
                          if (errors.county)
                            setErrors({ ...errors, county: "" });
                        }}
                        onBlur={(e) => validateField("county", e.target.value)}
                        className={`w-full pl-[74px] pr-4 h-14 bg-slate-50 border rounded-2xl text-xs font-semibold outline-none transition-all ${
                          errors.county
                            ? "border-rose-300 bg-rose-50/10"
                            : "border-slate-200 focus:border-[#074073] focus:bg-white"
                        }`}
                      />
                    </FilterField>

                    <FilterField
                      label="Sub-County"
                      icon={Navigation}
                      error={errors.subcounty}
                    >
                      <input
                        type="text"
                        placeholder="e.g., Westlands"
                        value={formData.subcounty || ""}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            subcounty: e.target.value,
                          });
                          if (errors.subcounty)
                            setErrors({ ...errors, subcounty: "" });
                        }}
                        onBlur={(e) =>
                          validateField("subcounty", e.target.value)
                        }
                        className={`w-full pl-[74px] pr-4 h-14 bg-slate-50 border rounded-2xl text-xs font-semibold outline-none transition-all ${
                          errors.subcounty
                            ? "border-rose-300 bg-rose-50/10"
                            : "border-slate-200 focus:border-[#074073] focus:bg-white"
                        }`}
                      />
                    </FilterField>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 select-none block">
                      Physical Address Description
                    </label>
                    <div className="relative group">
                      <div className="absolute top-4 left-6 pointer-events-none z-10">
                        <MapPin
                          size={16}
                          className={
                            errors.physicalAddress
                              ? "text-rose-400"
                              : "text-slate-300 group-focus-within:text-[#074073]"
                          }
                        />
                      </div>
                      <div className="absolute top-3.5 left-[54px] w-[1.5px] h-5 bg-slate-200 group-focus-within:bg-[#074073]/20 pointer-events-none z-10" />
                      <input
                        rows={3}
                        placeholder="e.g., Riverside Drive, Delta Corner Phase 2, Suite 4B"
                        value={formData.physicalAddress || ""}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            physicalAddress: e.target.value,
                          });
                          if (errors.physicalAddress)
                            setErrors({ ...errors, physicalAddress: "" });
                        }}
                        onBlur={(e) =>
                          validateField("physicalAddress", e.target.value)
                        }
                        className={`w-full h-14 pl-[74px] pr-6 bg-slate-50 border rounded-2xl text-xs font-semibold outline-none transition-all resize-none ${
                          errors.physicalAddress
                            ? "border-rose-300 bg-rose-50/10 text-rose-900 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/5"
                            : "border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-[#074073] focus:bg-white"
                        }`}
                      />
                    </div>
                    {errors.physicalAddress && (
                      <div className="flex items-center gap-1 text-rose-500 pl-1 mt-1 select-none">
                        <AlertCircle size={11} />
                        <span className="text-[11px] font-semibold tracking-tight">
                          {errors.physicalAddress}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-8 py-5 border-t border-slate-100 flex gap-3 select-none bg-white">
                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="flex-1 h-12 font-bold text-xs bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleProceedToPreview}
                    className="flex-[2] h-12 font-bold text-xs bg-[#074073] text-white rounded-xl shadow-md flex items-center justify-center gap-2 hover:bg-[#052d52] transition-colors cursor-pointer active:scale-[0.98]"
                  >
                    <span>Review Location Specs</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </>
            )}

            {/* STEP 2: SUMMARY PREVIEW VERIFICATION */}
            {step === "preview" && (
              <>
                <div className="px-8 pt-5 pb-6 select-none">
                  <h2 className="text-xl font-black text-[#074073] tracking-tight">
                    Verify Address Changes
                  </h2>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    Confirm these structural relocation specs before saving to
                    the central index ledger.
                  </p>
                </div>
                <div className="border-b mx-8 border-slate-100"></div>

                <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4 custom-scrollbar">
                  <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 shadow-3xs space-y-4">
                    <div>
                      <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">
                        Sovereign State
                      </span>
                      <p className="text-sm font-black text-primary mt-0.5">
                        {formData.country}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-slate-200/60 pt-3">
                      <div>
                        <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">
                          County / Territory
                        </span>
                        <p className="text-xs font-bold text-slate-700 mt-0.5">
                          {formData.county}
                        </p>
                      </div>
                      <div>
                        <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">
                          Sub-County Vector
                        </span>
                        <p className="text-xs font-bold text-slate-700 mt-0.5">
                          {formData.subcounty}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-slate-200/60 pt-3">
                      <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">
                        Physical Building / Street Unit
                      </span>
                      <p className="text-xs font-bold text-slate-600 leading-relaxed mt-1 bg-white border border-slate-100 p-3 rounded-xl shadow-3xs">
                        {formData.physicalAddress}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8 py-5 border-t border-slate-100 flex gap-3 select-none bg-white">
                  <button
                    type="button"
                    onClick={() => setStep("form")}
                    disabled={loading}
                    className="flex-1 h-12 font-bold text-xs bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Edit2 size={12} />
                    <span>Back to Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmAndSave}
                    disabled={loading}
                    className={`flex-[2] h-12 font-bold text-xs text-white rounded-xl shadow-md flex items-center justify-center gap-2 transition-all ${
                      loading
                        ? "bg-[#074073]/70 cursor-not-allowed"
                        : "bg-[#074073] hover:bg-[#052d52] cursor-pointer"
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={13} className="animate-spin" />
                        <span>Updating Directory...</span>
                      </>
                    ) : (
                      <>
                        <Save size={14} />
                        <span>Save Address</span>
                      </>
                    )}
                  </button>
                </div>
              </>
            )}

            {/* STEP 3: TRANSACTION SUCCESS PANEL */}
            {step === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col justify-between p-8 text-center h-full select-none"
              >
                <div className="flex-1 flex flex-col items-center justify-center space-y-4 max-w-sm mx-auto">
                  <div className="size-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border-4 border-white shadow-md shadow-emerald-600/10">
                    <CheckCircle2 size={32} strokeWidth={2.5} />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-primary tracking-tight">
                      Address Saved Successfully
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      Geographical mapping nodes are now verified and logged
                      within member reference profiles.
                    </p>
                  </div>

                  <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left space-y-2 mt-4 shadow-3xs text-xs">
                    <div>
                      <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
                        Primary Location Ledger
                      </p>
                      <p className="font-bold text-[#074073] mt-0.5">
                        {formData.county}, {formData.country}
                      </p>
                    </div>
                    <div className="border-t border-slate-200/50 pt-2">
                      <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
                        Subledger Physical Destination
                      </p>
                      <p className="font-medium text-slate-600 mt-0.5 leading-relaxed">
                        {formData.physicalAddress}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="w-full h-12 font-bold text-xs bg-[#074073] text-white rounded-xl hover:bg-[#052d52] transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Return to Profile Management</span>
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

/* ==========================================================================
   SUPPORTIVE BASE FIELD CHASSIS
   ========================================================================== */
const FilterField = ({ label, icon: Icon, error, children }) => (
  <div className="space-y-1.5 w-full text-left">
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 select-none block">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none z-10">
        <Icon
          size={16}
          className={`transition-colors ${
            error
              ? "text-rose-400 group-focus-within:text-rose-500"
              : "text-slate-300 group-focus-within:text-[#074073]"
          }`}
        />
        <div
          className={`w-[1.5px] h-5 ml-4 transition-colors ${
            error
              ? "bg-rose-200 group-focus-within:bg-rose-300"
              : "bg-slate-200 group-focus-within:bg-[#074073]/20"
          }`}
        />
      </div>
      {children}
    </div>

    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="flex items-center gap-1 text-rose-500 pl-1 mt-1 select-none"
        >
          <AlertCircle size={11} className="shrink-0" />
          <p className="text-[11px] font-semibold tracking-tight leading-none">
            {error}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default EditAddressDetails;
