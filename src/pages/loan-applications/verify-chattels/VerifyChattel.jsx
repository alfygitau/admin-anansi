import React, { useState } from "react";
import {
  ArrowLeft,
  Shield,
  CheckCircle,
  XCircle,
  FileText,
  Calendar,
  AlertTriangle,
  ShieldCheck,
  Check,
  Loader2,
  User,
  Scale,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { useToast } from "../../../contexts/ToastProvider";
import useAuth from "../../../hooks/useAuth";

export default function VerifyChattel() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { id } = useParams();
  const { auth } = useAuth();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [chattel, setChattel] = useState({});

  const [formData, setFormData] = useState({
    officer_name: "",
    status: "VERIFIED",
    reason: "",
    verificationDate: new Date().toISOString().split("T")[0],
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (e) => {
    const { name, value, required } = e.target;
    let errorMsg = "";

    if (required && (!value || value.trim() === "")) {
      errorMsg = "This field is mandatory to complete verification.";
    }
    if (
      name === "reason" &&
      formData.status === "REJECTED" &&
      (!value || value.trim() === "")
    ) {
      errorMsg = "A comprehensive reason is required when rejecting an asset.";
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const generateUniqueKey = () => {
    return crypto.randomUUID();
  };

  useQuery({
    queryKey: ["get chattel asset details", id],
    queryFn: async () => {},
    onSuccess: (data) => {
      setChattel(data);
    },
    onError: (error) => {
      showToast({
        title: "Failed to fetch collateral details",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationKey: ["verify-chattel"],
    mutationFn: async () => {
      if (formData.status === "REJECTED" && !formData.reason.trim()) {
        throw new Error(
          "You must provide a reason for rejecting this collateral asset.",
        );
      }
    },
    onSuccess: () => {
      setShowSuccessModal(true);
    },
    onError: (error) => {
      showToast({
        title: "Verification Submission Failed",
        type: "error",
        position: "top-right",
        description: error?.message || "Something went wrong on our end.",
      });
    },
  });

  const handleFormSubmit = async () => {
    if (formData.status === "REJECTED" && !formData.reason.trim()) {
      setErrors((prev) => ({
        ...prev,
        reason: "Please type out a clear reason for rejecting this asset.",
      }));
      return;
    }
    if (!formData.officer_name.trim()) {
      setErrors((prev) => ({
        ...prev,
        officer_name: "Authorized Officer identity is required.",
      }));
      return;
    }
    await mutate();
  };

  return (
    <>
      <div className="w-full space-y-6 antialiased text-slate-800">
        {/* HEADER CONTROLS */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-200/60 pb-5 select-none">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="size-10 rounded-xl border border-slate-200/80 bg-white flex items-center justify-center text-slate-500 hover:text-primary shadow-3xs cursor-pointer transition-all"
            >
              <ArrowLeft size={16} />
            </button>
            <div className="space-y-1">
              <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 block select-none">
                Sacco Risk & Asset Collateral Registry
              </span>
              <h1 className="text-xl font-black tracking-tight text-primary">
                Verify Chattel Security
              </h1>
              <p className="text-xs font-mono font-bold text-slate-500 flex items-center gap-1 mt-0.5">
                <span className="text-[10px] font-sans text-slate-400 font-normal uppercase tracking-wide mr-0.5 select-none">
                  Asset ID:
                </span>
                {chattel?.chattel_number || "—"}
              </p>
            </div>
          </div>
        </div>

        {/* THREE SIDE-BY-SIDE CONTAINERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch w-full">
          {/* CONTAINER 1: USER VERIFYING */}
          <SectionCard title="Verification Officer" icon={<User size={14} />}>
            <div className="space-y-4">
              <FormInput
                icon={<User />}
                label="Authorized Verifying Officer"
                name="officer_name"
                value={formData?.officer_name}
                onBlur={handleBlur}
                error={errors.officer_name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />

              <FormInput
                icon={<Calendar />}
                label="Evaluation Date"
                name="verificationDate"
                value={formData?.verificationDate}
                disabled
                readOnly
              />
            </div>
          </SectionCard>

          {/* CONTAINER 2: DECISION CRITERIA */}
          <SectionCard
            title="Verification Decision"
            icon={<Shield size={14} />}
          >
            <div className="space-y-4">
              <FormSelect
                icon={
                  formData.status === "VERIFIED" ? (
                    <CheckCircle className="text-emerald-600" />
                  ) : (
                    <XCircle className="text-rose-600" />
                  )
                }
                label="Action Verdict"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
              >
                <option value="VERIFIED">Approve & Verify Asset</option>
                <option value="REJECTED">Reject Asset Legality</option>
              </FormSelect>

              {formData.status === "VERIFIED" ? (
                <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl text-xs text-emerald-800 font-medium animate-in fade-in duration-200">
                  By verifying, you confirm the asset is free of encumbrances
                  and possesses viable valuation layout constraints.
                </div>
              ) : (
                <div className="p-4 bg-rose-50/50 border border-rose-100 rounded-xl text-xs text-rose-800 font-medium animate-in fade-in duration-200">
                  Rejecting flags this asset as blacklisted or non-compliant. A
                  detailed rejection note is completely mandatory below.
                </div>
              )}
            </div>
          </SectionCard>

          {/* CONTAINER 3: ASSET SPECIFICS REFERENCE */}
          <SectionCard title="Asset Registry Data" icon={<Scale size={14} />}>
            <div className="space-y-4">
              <FormInput
                icon={<FileText />}
                label="Declared Market Value"
                name="declared_value"
                value={
                  chattel?.estimated_value
                    ? `KES ${chattel?.estimated_value}`
                    : "—"
                }
                disabled
                readOnly
              />
              <FormInput
                icon={<ShieldCheck />}
                label="Chattel Type/Category"
                name="chattel_type"
                value={chattel?.asset_type || "Movable Property"}
                disabled
                readOnly
              />
            </div>
          </SectionCard>
        </div>

        {/* COMPLIANCE DISCLAIMERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 select-none">
          {/* DISCLAIMER 1: FRAUD & INDEMNITY */}
          <div className="p-4 bg-slate-50/80 border border-slate-200/80 rounded-xl flex items-center gap-3 text-xs text-slate-600 font-medium leading-relaxed shadow-3xs">
            <ShieldCheck size={16} className="text-[#074073] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-primary">
                Collateral Binding Finality
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                Verifying this chattel locks its title against the system
                registry. If this valuation or legal status changes, a secondary
                administrative overriding log will be recorded.
              </p>
            </div>
          </div>

          {/* DISCLAIMER 2: CONDITIONAL REJECTION POLICY */}
          <div className="p-4 bg-amber-50/60 border border-amber-200/60 rounded-xl flex items-center gap-3 text-xs text-amber-800 font-medium leading-relaxed shadow-3xs">
            <AlertTriangle
              size={16}
              className="text-amber-600 shrink-0 mt-0.5"
            />
            <div className="space-y-1">
              <p className="font-bold text-primary">Audit Trail Transparency</p>
              <p className="text-[11px] text-amber-700 font-medium">
                All verification actions generate system logs visible to loan
                processing teams and credit committees. Ensure clarity in
                documentation to facilitate rapid loan profiling workflows.
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM NOTES BLOCK (REASON) */}
        <div className="w-full bg-white border border-slate-200/60 rounded-[24px] p-6 space-y-4 shadow-3xs">
          <div className="flex flex-col space-y-2 w-full">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block select-none">
              Verification Reason / Rejection Explanation{" "}
              {formData.status === "REJECTED" && (
                <span className="text-rose-500">*</span>
              )}
            </label>
            <textarea
              rows={5}
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`w-full p-3 bg-slate-50/60 border rounded-xl text-xs font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:bg-white transition-all resize-none shadow-3xs ${
                errors.reason
                  ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/5"
                  : "border-slate-200 focus:border-[#074073]"
              }`}
              placeholder={
                formData.status === "VERIFIED"
                  ? "Add processing remarks, conditions, or physical state check notes (Optional)..."
                  : "State the explicit reason for rejecting this chattel security (Mandatory)..."
              }
            />
            {errors.reason && (
              <span className="text-[11px] font-semibold text-rose-600 mt-1 animate-in fade-in duration-150">
                {errors.reason}
              </span>
            )}
          </div>

          <div className="bg-white rounded-[24px] border border-slate-200/60 p-4 flex items-center justify-end gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            <button
              onClick={() => navigate(-1)}
              type="button"
              className="h-11 px-5 border border-slate-200/80 bg-white text-slate-600 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleFormSubmit}
              type="button"
              disabled={isLoading}
              className={`h-11 px-6 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all active:scale-97 flex items-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed ${
                formData.status === "VERIFIED"
                  ? "bg-emerald-600 shadow-emerald-600/10 hover:bg-emerald-700"
                  : "bg-rose-600 shadow-rose-600/10 hover:bg-rose-700"
              }`}
            >
              <span>
                {isLoading
                  ? "Submitting..."
                  : formData.status === "VERIFIED"
                    ? "Verify Asset"
                    : "Reject Security"}
              </span>

              {isLoading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Check size={14} />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ==========================================================================
   INTERNAL UTILITY DESIGN STRUCTS (Preserved exactly for unified layouts)
   ========================================================================== */

const SectionCard = ({ title, icon, children }) => (
  <div className="bg-white border border-slate-200/60 shadow-sm rounded-[24px] p-5 space-y-4 flex flex-col w-full h-full justify-start">
    <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5 border-b border-slate-100 pb-2 select-none">
      {icon} {title}
    </h3>
    <div className="flex-1 w-full">{children}</div>
  </div>
);

export const FormInput = ({ icon, label, error, ...props }) => (
  <div className="flex flex-col space-y-2 w-full min-w-0">
    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block select-none">
      {label}{" "}
      {props.required && (
        <span className="text-rose-500 font-sans ml-0.5">*</span>
      )}
    </label>
    <div className="relative w-full group">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4 flex items-center justify-center pointer-events-none z-10 group-focus-within:text-primary transition-colors">
        {React.cloneElement(icon, { size: 14 })}
      </div>
      <div className="absolute left-10 top-1/2 -translate-y-1/2 w-px h-4 bg-slate-200/80 group-focus-within:bg-[#074073]/30 transition-colors pointer-events-none z-10" />
      <input
        {...props}
        className={`w-full h-14 pl-12 pr-4 bg-slate-50/60 border rounded-xl text-xs font-semibold outline-none transition-all focus:bg-white focus:ring-4 focus:ring-primary/5 placeholder:text-slate-400 placeholder:font-normal font-sans disabled:opacity-60 disabled:cursor-not-allowed ${
          error
            ? "border-rose-400 text-rose-900 focus:border-rose-500 focus:ring-rose-500/5"
            : "border-slate-200/80 text-slate-800 focus:border-[#074073]"
        }`}
      />
    </div>
    {error && (
      <span className="text-[11px] font-semibold text-rose-600 mt-1 ml-1 animate-in fade-in duration-150">
        {error}
      </span>
    )}
  </div>
);

export const FormSelect = ({ icon, label, error, children, ...props }) => (
  <div className="flex flex-col space-y-2 w-full min-w-0">
    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block select-none">
      {label}{" "}
      {props.required && (
        <span className="text-rose-500 font-sans ml-0.5">*</span>
      )}
    </label>
    <div className="relative w-full group">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4 flex items-center justify-center pointer-events-none z-10 group-focus-within:text-primary transition-colors">
        {React.cloneElement(icon, { size: 14 })}
      </div>
      <div className="absolute left-10 top-1/2 -translate-y-1/2 w-px h-4 bg-slate-200/80 group-focus-within:bg-[#074073]/30 transition-colors pointer-events-none z-10" />
      <select
        {...props}
        className={`w-full h-14 pl-12 pr-10 bg-slate-50/60 border rounded-xl text-xs font-semibold outline-none transition-all focus:bg-white focus:ring-4 focus:ring-primary/5 appearance-none font-sans cursor-pointer ${
          error
            ? "border-rose-400 text-rose-900 focus:border-rose-500 focus:ring-rose-500/5"
            : "border-slate-200/80 text-slate-800 focus:border-[#074073]"
        }`}
      >
        {children}
      </select>
      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m 6,9 6,6 6,-6" />
        </svg>
      </div>
    </div>
    {error && (
      <span className="text-[11px] font-semibold text-rose-600 mt-1 ml-1 animate-in fade-in duration-150">
        {error}
      </span>
    )}
  </div>
);
