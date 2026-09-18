import React, { useState } from "react";
import {
  Building2,
  FileText,
  Shield,
  Phone,
  Mail,
  User,
  MapPin,
  DollarSign,
  Save,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AddCorporateAccount = ({ onBack, onSaveSuccess }) => {
  const [step, setStep] = useState("form"); // "form" | "preview" | "success"
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    tradingName: "",
    registrationNumber: "",
    kraPin: "",
    industry: "Transport & Supply Chain",
    physicalAddress: "",
    primaryContactName: "",
    primaryContactEmail: "",
    primaryContactPhone: "",
    initialDeposit: "",
    signatories: [
      { name: "", role: "Director / Signatory", phone: "", idNumber: "" },
    ],
  });

  const [errors, setErrors] = useState({});

  const industries = [
    "Transport & Supply Chain",
    "Education & Institutions",
    "Agriculture & FMCG",
    "ICT & Fintech",
    "Cooperative & Welfare",
    "Construction & Real Estate",
    "Healthcare & Pharmaceuticals",
    "Manufacturing & Industrial",
  ];

  const signatoryRoles = [
    "Director / Signatory",
    "Managing Director",
    "Chief Executive Officer",
    "Chief Finance Officer",
    "Company Secretary",
    "Trustee",
  ];

  const handleSignatoryChange = (index, field, value) => {
    const updatedSignatories = [...formData.signatories];
    updatedSignatories[index][field] = value;
    setFormData({ ...formData, signatories: updatedSignatories });
  };

  const addSignatoryRow = () => {
    setFormData({
      ...formData,
      signatories: [
        ...formData.signatories,
        { name: "", role: "Director / Signatory", phone: "", idNumber: "" },
      ],
    });
  };

  const removeSignatoryRow = (index) => {
    if (formData.signatories.length === 1) return; // Keep at least one
    const updatedSignatories = formData.signatories.filter(
      (_, i) => i !== index,
    );
    setFormData({ ...formData, signatories: updatedSignatories });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.companyName.trim())
      newErrors.companyName = "Company name is required.";
    if (!formData.registrationNumber.trim())
      newErrors.registrationNumber = "Registration number is required.";
    if (!formData.kraPin.trim()) newErrors.kraPin = "KRA PIN is required.";
    if (!formData.physicalAddress.trim())
      newErrors.physicalAddress = "Physical address is required.";
    if (!formData.primaryContactName.trim())
      newErrors.primaryContactName = "Primary contact name is required.";
    if (!formData.primaryContactPhone.trim())
      newErrors.primaryContactPhone = "Phone number is required.";
    if (!formData.initialDeposit || Number(formData.initialDeposit) <= 0) {
      newErrors.initialDeposit =
        "Please provide a valid initial deposit amount.";
    }

    // Validate signatories
    formData.signatories.forEach((sig, idx) => {
      if (!sig.name.trim() || !sig.phone.trim() || !sig.idNumber.trim()) {
        newErrors[`signatory_${idx}`] =
          "All signatory fields (Name, Phone, ID) must be filled.";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceedToPreview = () => {
    if (validateForm()) {
      setStep("preview");
    }
  };

  const handleFinalSubmit = async () => {
    setLoading(true);
    // Simulate API backend call
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setLoading(false);
    setStep("success");
  };

  return (
    <div className="h-full bg-slate-50/50 font-sans text-slate-800 w-full">
      {/* HEADER NAV */}
      <div className="flex items-center gap-4 mb-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 transition-all cursor-pointer"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-[#074073] tracking-tight">
              Onboard New Corporate Entity
            </h1>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Register an institutional client, establish their legal profile,
              and map authorized signatories.
            </p>
          </div>
        </div>
      </div>

      {step === "form" && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/60 rounded-2xl p-6 md:p-8 shadow-3xs space-y-6">
            <div className="border-t border-slate-100 pt-6 space-y-5">
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                1. Legal & Entity Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField
                  label="Registered Company Name *"
                  placeholder="e.g., Afya Logistics Ltd"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                  error={errors.companyName}
                  icon={Building2}
                />
                <InputField
                  label="Trading Name / Brand (Optional)"
                  placeholder="e.g., Afya Logistics"
                  value={formData.tradingName}
                  onChange={(e) =>
                    setFormData({ ...formData, tradingName: e.target.value })
                  }
                  icon={Building2}
                />
                <InputField
                  label="Registration / Incorporation No. *"
                  placeholder="e.g., CPR/2023/123456"
                  value={formData.registrationNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      registrationNumber: e.target.value,
                    })
                  }
                  error={errors.registrationNumber}
                  icon={FileText}
                />
                <InputField
                  label="KRA Tax PIN *"
                  placeholder="e.g., P051234567Z"
                  value={formData.kraPin}
                  onChange={(e) =>
                    setFormData({ ...formData, kraPin: e.target.value })
                  }
                  error={errors.kraPin}
                  icon={Shield}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 block">
                    Industry / Sector *
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) =>
                      setFormData({ ...formData, industry: e.target.value })
                    }
                    className="w-full h-14 px-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 outline-none cursor-pointer focus:bg-white focus:border-[#074073]"
                  >
                    {industries.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                </div>

                <InputField
                  label="Physical Business Address *"
                  placeholder="e.g., Rahimtulla Trust Tower, 4th Floor"
                  value={formData.physicalAddress}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      physicalAddress: e.target.value,
                    })
                  }
                  error={errors.physicalAddress}
                  icon={MapPin}
                />
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6 space-y-5">
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                2. Primary Representative Contact
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <InputField
                  label="Contact Person Name *"
                  placeholder="e.g., Dr. James Mwangi"
                  value={formData.primaryContactName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      primaryContactName: e.target.value,
                    })
                  }
                  error={errors.primaryContactName}
                  icon={User}
                />
                <InputField
                  label="Official Email Address"
                  placeholder="e.g., info@afyalogistics.com"
                  value={formData.primaryContactEmail}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      primaryContactEmail: e.target.value,
                    })
                  }
                  icon={Mail}
                />
                <InputField
                  label="Official Phone Number *"
                  placeholder="e.g., +254 711 223344"
                  value={formData.primaryContactPhone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      primaryContactPhone: e.target.value,
                    })
                  }
                  error={errors.primaryContactPhone}
                  icon={Phone}
                />
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6 space-y-5">
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                3. Initial Account Capitalization
              </h3>

              <div className="max-w-md">
                <InputField
                  label="Initial Opening Deposit (KES) *"
                  placeholder="e.g., 500000"
                  type="number"
                  value={formData.initialDeposit}
                  onChange={(e) =>
                    setFormData({ ...formData, initialDeposit: e.target.value })
                  }
                  error={errors.initialDeposit}
                  icon={DollarSign}
                />
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                    4. Board Mandate & Signatories
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Add individuals authorized to sign checks or approve digital
                    disbursements.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addSignatoryRow}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-50 text-[#074073] hover:bg-blue-100 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Add Signatory</span>
                </button>
              </div>

              {errors.signatories_global && (
                <p className="text-xs font-bold text-rose-500">
                  {errors.signatories_global}
                </p>
              )}

              <div className="space-y-3">
                {formData.signatories.map((sig, index) => (
                  <div
                    key={index}
                    className="p-4 bg-slate-50 border border-slate-200/60 rounded-2xl space-y-3 relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                        Signatory #{index + 1}
                      </span>
                      {formData.signatories.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSignatoryRow(index)}
                          className="text-rose-500 hover:text-rose-700 transition-colors cursor-pointer"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                      <input
                        type="text"
                        placeholder="Full Legal Name"
                        value={sig.name}
                        onChange={(e) =>
                          handleSignatoryChange(index, "name", e.target.value)
                        }
                        className="h-11 px-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-[#074073]"
                      />
                      <select
                        value={sig.role}
                        onChange={(e) =>
                          handleSignatoryChange(index, "role", e.target.value)
                        }
                        className="h-11 px-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold outline-none cursor-pointer focus:border-[#074073]"
                      >
                        {signatoryRoles.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        placeholder="National ID / Passport No."
                        value={sig.idNumber}
                        onChange={(e) =>
                          handleSignatoryChange(
                            index,
                            "idNumber",
                            e.target.value,
                          )
                        }
                        className="h-11 px-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-[#074073]"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={sig.phone}
                        onChange={(e) =>
                          handleSignatoryChange(index, "phone", e.target.value)
                        }
                        className="h-11 px-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-[#074073]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onBack}
                className="h-12 px-6 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleProceedToPreview}
                className="h-12 px-8 bg-[#074073] hover:bg-[#052d52] text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer active:scale-95"
              >
                Review Entity Registration
              </button>
            </div>
          </div>
        </div>
      )}

      {step === "preview" && (
        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 md:p-8 shadow-3xs space-y-6">
          <div>
            <h1 className="text-xl font-black text-[#074073] tracking-tight">
              Review Corporate Onboarding
            </h1>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Verify institutional details before writing the account to the
              main SACCO database.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-6 space-y-6">
            <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
                    Company Name
                  </span>
                  <h2 className="text-base font-black text-[#074073] mt-0.5">
                    {formData.companyName}
                  </h2>
                  {formData.tradingName && (
                    <p className="text-xs text-slate-500">
                      Trading as: {formData.tradingName}
                    </p>
                  )}
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200/60">
                  Initial Deposit: KES{" "}
                  {Number(formData.initialDeposit || 0).toLocaleString()}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-slate-200/60 pt-4">
                <div>
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
                    Registration No.
                  </span>
                  <p className="text-xs font-bold text-slate-700 mt-0.5">
                    {formData.registrationNumber}
                  </p>
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
                    KRA PIN
                  </span>
                  <p className="text-xs font-bold text-slate-700 mt-0.5">
                    {formData.kraPin}
                  </p>
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
                    Industry
                  </span>
                  <p className="text-xs font-bold text-slate-700 mt-0.5">
                    {formData.industry}
                  </p>
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
                    Address
                  </span>
                  <p className="text-xs font-bold text-slate-700 mt-0.5">
                    {formData.physicalAddress}
                  </p>
                </div>
              </div>
            </div>

            {/* Primary Contact */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 space-y-2">
              <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
                Primary Representative
              </span>
              <p className="text-xs font-bold text-slate-800">
                {formData.primaryContactName} ({formData.primaryContactPhone})
              </p>
              <p className="text-xs text-slate-500">
                {formData.primaryContactEmail || "No email provided"}
              </p>
            </div>

            {/* Signatories List */}
            <div className="space-y-3">
              <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
                Authorized Mandate Signatories ({formData.signatories.length})
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {formData.signatories.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl space-y-1"
                  >
                    <p className="text-xs font-bold text-[#074073]">{s.name}</p>
                    <p className="text-[11px] font-semibold text-slate-600">
                      {s.role}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      ID: {s.idNumber} • Tel: {s.phone}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 flex justify-between gap-3">
            <button
              type="button"
              onClick={() => setStep("form")}
              disabled={loading}
              className="h-12 px-6 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Back to Edit
            </button>
            <button
              type="button"
              onClick={handleFinalSubmit}
              disabled={loading}
              className="h-12 px-8 bg-[#074073] hover:bg-[#052d52] text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Onboarding Corporation...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Confirm & Save Corporate Account</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {step === "success" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border border-slate-200/60 rounded-2xl p-10 text-center max-w-lg mx-auto space-y-6 shadow-3xs"
        >
          <div className="size-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border-4 border-white shadow-md mx-auto">
            <CheckCircle2 size={36} strokeWidth={2.5} />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-black text-[#074073] tracking-tight">
              Corporate Account Onboarded Successfully
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              {formData.companyName} is now registered in the system with an
              initial capitalization of KES{" "}
              {Number(formData.initialDeposit || 0).toLocaleString()}.
            </p>
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setStep("form");
                setFormData({
                  companyName: "",
                  tradingName: "",
                  registrationNumber: "",
                  kraPin: "",
                  industry: "Transport & Supply Chain",
                  physicalAddress: "",
                  primaryContactName: "",
                  primaryContactEmail: "",
                  primaryContactPhone: "",
                  initialDeposit: "",
                  signatories: [
                    {
                      name: "",
                      role: "Director / Signatory",
                      phone: "",
                      idNumber: "",
                    },
                  ],
                });
              }}
              className="w-full h-12 bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Onboard Another Corporation
            </button>
            <button
              type="button"
              onClick={onBack}
              className="w-full h-12 bg-[#074073] hover:bg-[#052d52] text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              Return to Corporate Registry
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

/* ==========================================================================
   HELPER INPUT FIELD CHASSIS
   ========================================================================== */
const InputField = ({ label, icon: Icon, error, ...props }) => (
  <div className="space-y-1.5 w-full text-left">
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 block">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10">
        <Icon
          size={16}
          className={`transition-colors ${error ? "text-rose-400" : "text-slate-300 group-focus-within:text-[#074073]"}`}
        />
        <div
          className={`w-[1.5px] h-5 ml-3 transition-colors ${error ? "bg-rose-200" : "bg-slate-200 group-focus-within:bg-[#074073]/20"}`}
        />
      </div>
      <input
        {...props}
        className={`w-full pl-12 pr-4 h-14 bg-slate-50 border rounded-2xl text-xs font-semibold outline-none transition-all ${
          error
            ? "border-rose-300 bg-rose-50/10 text-rose-900 focus:border-rose-500"
            : "border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-[#074073] focus:bg-white"
        }`}
      />
    </div>
    {error && (
      <p className="text-[11px] font-semibold text-rose-500 pl-1 mt-1 flex items-center gap-1">
        <AlertCircle size={11} /> {error}
      </p>
    )}
  </div>
);

export default AddCorporateAccount;
