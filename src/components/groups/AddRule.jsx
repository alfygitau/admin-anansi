import React, { useState } from "react";
import {
  X,
  FileText,
  ShieldAlert,
  Save,
  CheckCircle2,
  ArrowRight,
  Plus,
  AlertCircle,
  Loader2,
  Edit2,
  ListOrdered,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AddGroupRule = ({
  isOpen,
  onClose,
  onSave,
  formData,
  setFormData,
  loading,
  step,
  setStep,
}) => {
  const [errors, setErrors] = useState({
    ruleTitle: "",
    ruleCategory: "",
    description: "",
  });

  const ruleCategories = [
    "Contributions & Savings",
    "Loans & Repayments",
    "Meetings & Attendance",
    "Fines & Penalties",
    "General Bylaws",
  ];

  const validateField = (fieldName, value) => {
    let errorMessage = "";

    if (fieldName === "ruleTitle") {
      if (!value || !value.trim()) {
        errorMessage = "Please enter a title for this rule.";
      }
    }

    if (fieldName === "ruleCategory") {
      if (!value || !value.trim()) {
        errorMessage = "Please select a rule category.";
      }
    }

    if (fieldName === "description") {
      if (!value || !value.trim()) {
        errorMessage = "Please provide the details or terms of the rule.";
      }
    }

    setErrors((prev) => ({ ...prev, [fieldName]: errorMessage }));
    return errorMessage;
  };

  const handleProceedToPreview = () => {
    const titleError = validateField("ruleTitle", formData.ruleTitle);
    const categoryError = validateField("ruleCategory", formData.ruleCategory);
    const descriptionError = validateField("description", formData.description);

    if (titleError || categoryError || descriptionError) return;
    setStep("preview");
  };

  const handleConfirmAndSave = async () => {
    if (loading) return;
    await onSave();
  };

  const handleClearAllStates = () => {
    setStep("form");
    setErrors({ ruleTitle: "", ruleCategory: "", description: "" });
    setFormData({
      ruleTitle: "",
      ruleCategory: "Contributions & Savings",
      description: "",
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
            {/* Window Dismissal Close Button */}
            <button
              type="button"
              onClick={handleResetAndClose}
              disabled={loading}
              className="absolute top-5 right-5 z-10 w-8 h-8 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-gray-500 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-3xs active:scale-95"
            >
              <X size={16} />
            </button>

            {step === "form" && (
              <>
                <div className="px-8 pt-5 pb-6 select-none">
                  <h2 className="text-xl font-black text-[#074073] tracking-tight">
                    Add Group Rule / Bylaw
                  </h2>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    Define operational governance terms or contribution
                    penalties for this group.
                  </p>
                </div>
                <div className="border-b mx-8 border-slate-100"></div>

                <div className="flex-1 overflow-y-auto px-8 py-6 space-y-5">
                  {/* STEP 1A: RULE TITLE */}
                  <FilterField
                    label="Rule Title"
                    icon={FileText}
                    error={errors.ruleTitle}
                  >
                    <input
                      type="text"
                      placeholder="e.g., Monthly Contribution Deadline"
                      value={formData.ruleTitle || ""}
                      onChange={(e) => {
                        setFormData({ ...formData, ruleTitle: e.target.value });
                        if (errors.ruleTitle)
                          setErrors({ ...errors, ruleTitle: "" });
                      }}
                      onBlur={(e) => validateField("ruleTitle", e.target.value)}
                      className={`w-full pl-[74px] pr-6 h-14 bg-slate-50 border rounded-2xl text-xs font-semibold outline-none transition-all ${
                        errors.ruleTitle
                          ? "border-rose-300 bg-rose-50/10 text-rose-900 focus:border-rose-500"
                          : "border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-[#074073] focus:bg-white"
                      }`}
                    />
                  </FilterField>

                  {/* STEP 1B: RULE CATEGORY */}
                  <FilterField
                    label="Category"
                    icon={ListOrdered}
                    error={errors.ruleCategory}
                  >
                    <select
                      value={formData.ruleCategory || "Contributions & Savings"}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          ruleCategory: e.target.value,
                        });
                        if (errors.ruleCategory)
                          setErrors({ ...errors, ruleCategory: "" });
                      }}
                      className={`w-full pl-[74px] pr-4 h-14 bg-slate-50 border rounded-2xl text-xs font-semibold outline-none transition-all cursor-pointer ${
                        errors.ruleCategory
                          ? "border-rose-300 bg-rose-50/10 text-rose-900 focus:border-rose-500"
                          : "border-slate-200 text-slate-800 focus:border-[#074073] focus:bg-white"
                      }`}
                    >
                      {ruleCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </FilterField>

                  {/* STEP 1C: DESCRIPTION / TERMS */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 select-none block">
                      Rule Details & Penalties{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder="e.g., Contributions must be paid by the 5th of every month. Late payments attract a penalty of KES 500."
                      value={formData.description || ""}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        });
                        if (errors.description)
                          setErrors({ ...errors, description: "" });
                      }}
                      onBlur={(e) =>
                        validateField("description", e.target.value)
                      }
                      className={`w-full py-3 px-3 bg-slate-50 border rounded-2xl text-xs font-semibold outline-none transition-all ${
                        errors.description
                          ? "border-rose-300 bg-rose-50/10 text-rose-900 focus:border-rose-500"
                          : "border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-[#074073] focus:bg-white"
                      }`}
                    />
                    {errors.description && (
                      <p className="text-[11px] font-semibold text-rose-500 pl-1 mt-1 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.description}
                      </p>
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
                    <span>Review Rule Configuration</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </>
            )}

            {step === "preview" && (
              <>
                <div className="px-8 pt-5 pb-6 select-none">
                  <h2 className="text-xl font-black text-[#074073] tracking-tight">
                    Review Rule Details
                  </h2>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    Confirm guideline parameters before writing them to the
                    group's directory.
                  </p>
                </div>
                <div className="border-b mx-8 border-slate-100"></div>

                <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
                  <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 space-y-4 shadow-3xs relative overflow-hidden">
                    <div className="space-y-1 relative z-10">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">
                          Rule Identifier & Title
                        </span>
                        <span className="text-[10px] font-bold text-[#074073] bg-blue-50 px-2 py-0.5 rounded-md">
                          {formData.ruleCategory}
                        </span>
                      </div>
                      <p className="text-base font-black text-[#074073] tracking-tight pt-1">
                        {formData.ruleTitle}
                      </p>
                    </div>

                    <div className="border-t border-slate-200 pt-4 space-y-1 relative z-10">
                      <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">
                        Operational Terms & Conditions
                      </span>
                      <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                        {formData.description}
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50/40 border border-blue-100/60 rounded-xl p-4 flex items-center gap-3 select-none">
                    <ShieldAlert
                      size={16}
                      className="text-[#074073] shrink-0 mt-0.5"
                    />
                    <p className="text-[11px] font-medium text-[#074073]/80 leading-normal">
                      Adding this rule updates the group's legal and compliance
                      charter visible to all active group members.
                    </p>
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
                        ? "bg-[#074073]/70 cursor-not-allowed text-white/80"
                        : "bg-[#074073] hover:bg-[#052d52] cursor-pointer active:scale-[0.98]"
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={13} className="animate-spin" />
                        <span>Saving Rule...</span>
                      </>
                    ) : (
                      <>
                        <Save size={14} />
                        <span>Confirm & Save</span>
                      </>
                    )}
                  </button>
                </div>
              </>
            )}

            {step === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col justify-between p-8 text-center h-full select-none"
              >
                <div className="flex-1 flex flex-col items-center justify-center space-y-4 max-w-sm mx-auto">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: 0.1,
                    }}
                    className="size-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border-4 border-white shadow-md shadow-emerald-600/10"
                  >
                    <CheckCircle2 size={32} strokeWidth={2.5} />
                  </motion.div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-[#074073] tracking-tight">
                      Rule Added Successfully
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      The new guideline is now officially recorded under the
                      group’s bylaws.
                    </p>
                  </div>

                  <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left space-y-2 mt-4 shadow-3xs">
                    <div>
                      <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
                        {formData.ruleCategory}
                      </p>
                      <p className="text-xs font-bold text-[#074073] mt-0.5">
                        {formData.ruleTitle}
                      </p>
                    </div>
                    <div className="border-t border-slate-200/50 pt-2">
                      <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
                        Terms
                      </p>
                      <p className="text-[11px] font-medium text-slate-600 leading-normal mt-0.5">
                        {formData.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 w-full">
                  <button
                    type="button"
                    onClick={() => setStep("form")}
                    className="w-full h-12 font-bold text-xs bg-slate-50 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                  >
                    <Plus size={14} /> Add Another Rule
                  </button>
                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="w-full h-12 font-bold text-xs bg-[#074073] text-white rounded-xl hover:bg-[#052d52] transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.99]"
                  >
                    <span>Return to Group Profile</span>
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
   SUPPORTIVE INPUT HOUSING WRAPPER WITH ERROR CHASSIS
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

export default AddGroupRule;
