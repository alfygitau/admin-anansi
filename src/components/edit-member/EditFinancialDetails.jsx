import React, { useState } from "react";
import {
  X,
  Briefcase,
  Wallet,
  UserCheck,
  Receipt,
  Save,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  Loader2,
  Edit2,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const EditFinancialDetails = ({
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

  // Financial Context Validation Engine
  const validateField = (fieldName, value) => {
    let errorMessage = "";
    const sanitizedValue = value?.toString().trim();

    if (!sanitizedValue) {
      const fieldLabels = {
        jobTitle: "job title / designation",
        employmentType: "employment status classification",
        income: "estimated monthly income framework",
        kraPin: "KRA Tax PIN reference",
      };
      errorMessage = `Please provide a valid ${fieldLabels[fieldName] || fieldName}.`;
    }

    // Income Numeric Threshold Check
    if (fieldName === "income" && sanitizedValue && !errorMessage) {
      if (isNaN(Number(sanitizedValue)) || Number(sanitizedValue) < 0) {
        errorMessage = "Income parameter must be a positive numerical value.";
      }
    }

    // Strict KRA PIN Format Evaluation (Pattern: A123456789B)
    if (fieldName === "kraPin" && sanitizedValue && !errorMessage) {
      const kraRegex = /^[A-Z]\d{9}[A-Z]$/i;
      if (!kraRegex.test(sanitizedValue)) {
        errorMessage =
          "Invalid structure. Must follow standard PIN format (e.g., A123456789Z).";
      }
    }

    setErrors((prev) => ({ ...prev, [fieldName]: errorMessage }));
    return errorMessage;
  };

  const handleProceedToPreview = () => {
    const fieldsToValidate = ["jobTitle", "employmentType", "income", "kraPin"];
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
      jobTitle: "",
      employmentType: "",
      income: "",
      kraPin: "",
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
            {/* Window Dismissal Trigger */}
            <button
              type="button"
              onClick={handleResetAndClose}
              disabled={loading}
              className="absolute top-5 right-5 z-10 w-8 h-8 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-gray-500 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-3xs active:scale-95"
            >
              <X size={16} />
            </button>

            {/* STEP 1: FINANCIAL DATA INPUT REGISTRY */}
            {step === "form" && (
              <>
                <div className="px-8 pt-5 pb-6 select-none">
                  <h2 className="text-xl font-black text-[#074073] tracking-tight">
                    Edit Financial Metrics
                  </h2>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    Modify active employment designations, income pools, and
                    compliance profiles.
                  </p>
                </div>
                <div className="border-b mx-8 border-slate-100"></div>

                <div className="flex-1 overflow-y-auto px-8 py-6 space-y-5 custom-scrollbar">
                  <FilterField
                    label="Current Job Title"
                    icon={Briefcase}
                    error={errors.jobTitle}
                  >
                    <input
                      type="text"
                      placeholder="e.g., Senior Systems Engineer"
                      value={formData.jobTitle || ""}
                      onChange={(e) => {
                        setFormData({ ...formData, jobTitle: e.target.value });
                        if (errors.jobTitle)
                          setErrors({ ...errors, jobTitle: "" });
                      }}
                      onBlur={(e) => validateField("jobTitle", e.target.value)}
                      className={`w-full pl-[74px] pr-6 h-14 bg-slate-50 border rounded-2xl text-xs font-semibold outline-none transition-all ${
                        errors.jobTitle
                          ? "border-rose-300 bg-rose-50/10"
                          : "border-slate-200 focus:border-[#074073] focus:bg-white"
                      }`}
                    />
                  </FilterField>

                  <FilterField
                    label="Employment Category"
                    icon={UserCheck}
                    error={errors.employmentType}
                  >
                    <div className="relative flex items-center">
                      <select
                        value={formData.employmentType || ""}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            employmentType: e.target.value,
                          });
                          if (errors.employmentType)
                            setErrors({ ...errors, employmentType: "" });
                        }}
                        onBlur={(e) =>
                          validateField("employmentType", e.target.value)
                        }
                        className={`w-full pl-[74px] pr-10 h-14 bg-slate-50 border rounded-2xl text-xs font-semibold outline-none transition-all appearance-none cursor-pointer ${
                          errors.employmentType
                            ? "border-rose-300 bg-rose-50/10"
                            : "border-slate-200 focus:border-[#074073] focus:bg-white"
                        }`}
                      >
                        <option value="">Select employment type</option>
                        <option value="Permanent">Permanent / Salaried</option>
                        <option value="Contract">Fixed Term Contract</option>
                        <option value="Self-Employed">
                          Self-Employed / Entrepreneur
                        </option>
                        <option value="Casual">
                          Casual Labor / Freelancer
                        </option>
                        <option value="Retired">Retired / Pensioner</option>
                      </select>

                      {/* DROPDOWN ARROW ICON */}
                      <ChevronDown
                        size={16}
                        className="absolute right-4 text-slate-400 pointer-events-none"
                      />
                    </div>
                  </FilterField>

                  <FilterField
                    label="Gross Monthly Income (KES)"
                    icon={Wallet}
                    error={errors.income}
                  >
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="e.g., 85000"
                      value={formData.income || ""}
                      onChange={(e) => {
                        setFormData({ ...formData, income: e.target.value });
                        if (errors.income) setErrors({ ...errors, income: "" });
                      }}
                      onBlur={(e) => validateField("income", e.target.value)}
                      className={`w-full pl-[74px] pr-6 h-14 bg-slate-50 border rounded-2xl text-xs font-semibold font-mono tracking-wide outline-none transition-all ${
                        errors.income
                          ? "border-rose-300 bg-rose-50/10"
                          : "border-slate-200 focus:border-[#074073] focus:bg-white"
                      }`}
                    />
                  </FilterField>

                  <FilterField
                    label="KRA Tax PIN Identifier"
                    icon={Receipt}
                    error={errors.kraPin}
                  >
                    <input
                      type="text"
                      placeholder="e.g., A012345678X"
                      maxLength={11}
                      value={formData.kraPin || ""}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          kraPin: e.target.value.toUpperCase(),
                        });
                        if (errors.kraPin) setErrors({ ...errors, kraPin: "" });
                      }}
                      onBlur={(e) => validateField("kraPin", e.target.value)}
                      className={`w-full pl-[74px] pr-6 h-14 bg-slate-50 border rounded-2xl text-xs font-bold font-mono tracking-widest outline-none transition-all ${
                        errors.kraPin
                          ? "border-rose-300 bg-rose-50/10"
                          : "border-slate-200 focus:border-[#074073] focus:bg-white"
                      }`}
                    />
                  </FilterField>
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
                    <span>Review Financial Specs</span>
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
                    Verify Economic Profiles
                  </h2>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    Confirm these corporate solvency changes before saving to
                    the central ledger directory.
                  </p>
                </div>
                <div className="border-b mx-8 border-slate-100"></div>

                <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4 custom-scrollbar">
                  <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 shadow-3xs space-y-4">
                    <div>
                      <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">
                        Functional Designation
                      </span>
                      <p className="text-sm font-black text-primary mt-0.5">
                        {formData.jobTitle}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-slate-200/60 pt-3">
                      <div>
                        <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">
                          Employment Matrix
                        </span>
                        <p className="text-xs font-bold text-slate-700 mt-0.5">
                          {formData.employmentType}
                        </p>
                      </div>
                      <div>
                        <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">
                          Tax Compliance Node
                        </span>
                        <p className="text-xs font-bold font-mono tracking-wider text-slate-700 mt-0.5">
                          {formData.kraPin}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-slate-200/60 pt-3">
                      <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">
                        Audited Monthly Yield Valuation
                      </span>
                      <p className="text-base font-black text-emerald-700 font-mono mt-0.5">
                        KES{" "}
                        {Number(formData.income || 0).toLocaleString(
                          undefined,
                          { minimumFractionDigits: 2 },
                        )}
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
                        <span>Updating Accounts...</span>
                      </>
                    ) : (
                      <>
                        <Save size={14} />
                        <span>Save Financial Profile</span>
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
                      Financial Records Synchronized
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      Income streams, risk bands, and statutory tax parameters
                      have been successfully updated.
                    </p>
                  </div>

                  <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left space-y-2 mt-4 shadow-3xs text-xs">
                    <div>
                      <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
                        Registered Portfolio Stream
                      </p>
                      <p className="font-bold text-[#074073] mt-0.5">
                        {formData.jobTitle}
                      </p>
                    </div>
                    <div className="border-t border-slate-200/50 pt-2 grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
                          Verified Yield Pool
                        </p>
                        <p className="font-bold text-slate-600 font-mono mt-0.5">
                          KES {Number(formData.income || 0).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
                          Tax Ref Node
                        </p>
                        <p className="font-bold text-slate-600 font-mono mt-0.5">
                          {formData.kraPin}
                        </p>
                      </div>
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
   INPUT BASE FIELD DECORATOR
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

export default EditFinancialDetails;
