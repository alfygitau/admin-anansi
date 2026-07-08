import React, { useState } from "react";
import {
  ArrowLeft,
  User,
  Calendar,
  Layers,
  DollarSign,
  AlertTriangle,
  XCircle,
  ShieldAlert,
  FileX,
  ArrowUpRight,
  Loader2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { useToast } from "../../../contexts/ToastProvider";
import {
  cancelApplication,
  getApplication,
} from "../../../sdk/loan-applications/loan-applications";
import useAuth from "../../../hooks/useAuth";

export default function CancelApplication() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { id } = useParams();
  const [application, setApplication] = useState({});
  const { auth } = useAuth();
  const today = new Date().toISOString().split("T")[0];

  useQuery({
    queryKey: ["get loan application", id],
    queryFn: async () => {
      const response = await getApplication(id);
      return response.data?.data;
    },
    onSuccess: (data) => {
      setApplication(data);
    },
    onError: (error) => {
      showToast({
        title: "Transactions processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const [formData, setFormData] = useState({
    reason_code: "",
    notes: "",
    confirm_permanence: false,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const { mutate, isLoading } = useMutation({
    mutationKey: ["cancel-application"],
    mutationFn: async () => {
      const response = await cancelApplication(
        id,
        auth?.user?.id,
        `${auth?.user?.firstname} ${auth?.user?.lastname}`,
        formData?.notes,
      );
      return response;
    },
    onSuccess: () => {
      showToast({
        title: "Application Cancelled",
        type: "success",
        position: "top-right",
        description:
          "The application has been successfully closed and recorded as cancelled.",
      });
      navigate("/admin/loan-applications");
    },
    onError: (error) => {
      showToast({
        title: "Cancellation Failed",
        type: "error",
        position: "top-right",
        description:
          error?.message || "Could not process application cancellation.",
      });
    },
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.reason_code)
      newErrors.reason_code = "Please select a cancellation reason code.";
    if (!formData.notes.trim())
      newErrors.notes =
        "Please provide an explanation note for audit tracking.";
    if (!formData.confirm_permanence)
      newErrors.confirm_permanence =
        "You must confirm you understand this action is permanent.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    await mutate();
  };

  return (
    <div className="w-full space-y-6 font-sans antialiased text-slate-800 p-1">
      {/* 1. HEADER SECTOR */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200/60 pb-5 select-none">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="size-10 rounded-xl border border-slate-200/80 bg-white flex items-center justify-center text-slate-500 hover:text-primary shadow-3xs cursor-pointer transition-all"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
              Critical Action Layer
            </span>
            <h1 className="text-xl font-black tracking-tight text-primary mt-1">
              Cancel Loan Application
            </h1>
          </div>
        </div>
      </div>

      {/* 2. SIDE-BY-SIDE SUMMARY CONTAINERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch w-full select-none">
        {/* CONTAINER 1: AUTHORIZED OFFICER */}
        <SectionCard title="Cancelling Officer" icon={<User size={14} />}>
          <div className="space-y-4">
            <FormInput
              icon={<User />}
              label="Executing Officer"
              name="officer_name"
              value={`${auth?.user.firstname} ${auth?.user.lastname}`}
              disabled
              readOnly
            />
            <FormInput
              icon={<Calendar />}
              label="Cancellation Date"
              name="cancellation_date"
              value={today}
              disabled
              readOnly
            />
          </div>
        </SectionCard>

        {/* CONTAINER 2: APPLICANT QUICK LOOK */}
        <SectionCard title="Applicant Details" icon={<FileX size={14} />}>
          <div className="space-y-4">
            <FormInput
              icon={<User />}
              label="Borrower Name"
              name="applicant_name"
              value={application?.applicant_name}
              disabled
              readOnly
            />
            <FormInput
              icon={<Layers />}
              label="Application Number"
              name="app_number"
              value={application?.application_number}
              disabled
              readOnly
            />
          </div>
        </SectionCard>

        {/* CONTAINER 3: IMPACT TRACKING */}
        <SectionCard
          title="Current Impact Metrics"
          icon={<ShieldAlert size={14} />}
        >
          <div className="space-y-4">
            <FormInput
              icon={<DollarSign />}
              label="Loan Amount Requested"
              value={`KES ${application?.applied_amount}`}
              disabled
              readOnly
            />
            <FormInput
              icon={<Layers />}
              label="Stopped at Evaluation Stage"
              value={application?.status_label}
              disabled
              readOnly
            />
          </div>
        </SectionCard>
      </div>

      {/* 3. FULL-WIDTH BOTTOM ACTIONS & REASONINGS CANVAS */}
      <div className="w-full bg-white border border-slate-200/60 rounded-[24px] p-6 space-y-6 shadow-3xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* UNWRAPPED DESIGN: NOTES TEXTAREA */}
          <div className="md:col-span-5 flex flex-col space-y-2 w-full">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block select-none">
              Detailed Explanation Notes{" "}
              <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={4}
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className={`w-full p-3 bg-slate-50/60 border rounded-xl text-xs font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:bg-white transition-all resize-none shadow-3xs ${
                errors.notes
                  ? "border-rose-400 focus:border-rose-500"
                  : "border-slate-200 focus:border-rose-500"
              }`}
              placeholder="State the explicit reasons for canceling this application file for future compliance reference..."
              required
            />
            {errors.notes && (
              <span className="text-[11px] font-semibold text-rose-600 ml-1">
                {errors.notes}
              </span>
            )}
          </div>
        </div>

        {/* 4. SIDE-BY-SIDE COMPLIANCE & NOTIFICATION DISCLAIMERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 select-none">
          {/* DISCLAIMER 1: PERMANENT REVOCATION */}
          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center gap-3 text-xs text-slate-600 font-medium leading-relaxed shadow-3xs">
            <XCircle size={16} className="text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-primary">
                Permanent File Revocation
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                Canceling this application file drops it from the review queue
                entirely. This process is absolute and cannot be undone. To
                reactivate this request later, a brand new application workspace
                must be initialized.
              </p>
            </div>
          </div>

          {/* DISCLAIMER 2: NOTIFICATION TRACE DISPATCH */}
          <div className="p-4 bg-amber-50/50 border border-amber-200/60 rounded-xl flex items-center gap-3 text-xs text-amber-800 font-medium leading-relaxed shadow-3xs">
            <AlertTriangle
              size={16}
              className="text-amber-600 shrink-0 mt-0.5"
            />
            <div className="space-y-1">
              <p className="font-bold text-primary">
                Applicant Notification Dispatch
              </p>
              <p className="text-[11px] text-amber-700 font-medium">
                Confirming this action will automatically send an automated
                alert summary to the borrower via SMS or Email explaining that
                their application file has been officially withdrawn from
                current processing.
              </p>
            </div>
          </div>
        </div>

        {/* RISK CONFIRMATION INTEGRITY CHECKBOX TRIGGER */}
        <div className="p-4 bg-rose-50/20 border border-rose-100/70 rounded-xl flex items-center gap-3 group cursor-pointer">
          <input
            type="checkbox"
            id="confirm_permanence"
            name="confirm_permanence"
            checked={formData.confirm_permanence}
            onChange={handleInputChange}
            className="w-4 w-4 text-rose-600 focus:ring-rose-500 border-slate-300 rounded cursor-pointer"
          />
          <label
            htmlFor="confirm_permanence"
            className="text-xs font-bold text-slate-700 cursor-pointer select-none"
          >
            I confirm that I have reviewed the application metrics above and
            authorize the system to permanently close this file.
          </label>
        </div>
        {errors.confirm_permanence && (
          <p className="text-[11px] font-semibold text-rose-600 -mt-2 ml-1 animate-in fade-in">
            {errors.confirm_permanence}
          </p>
        )}

        <div className="bg-white rounded-[24px] border border-slate-200/60 p-4 flex items-center justify-end gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="h-11 px-5 border border-slate-200/80 bg-white text-slate-600 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
          >
            Keep Application Active
          </button>
          <button
            onClick={handleFormSubmit}
            type="button"
            disabled={isLoading} // Disables the button during loading
            className="h-11 px-6 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-primary/10 hover:bg-primary/90 transition-all active:scale-97 flex items-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span>
              {isLoading ? "Processing..." : "Confirm Permanent Cancellation"}
            </span>

            {isLoading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <ArrowUpRight size={14} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SUPPORTIVE CHILD UI TEMPLATES
   ========================================================================== */

const SectionCard = ({ title, icon, children }) => (
  <div className="bg-white border border-slate-200/60 shadow-sm rounded-[24px] p-5 space-y-4 flex flex-col w-full h-full justify-start">
    <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5 border-b border-slate-100 pb-2">
      {icon} {title}
    </h3>
    <div className="flex-1 w-full">{children}</div>
  </div>
);

const FormInput = ({ icon, label, error, ...props }) => (
  <div className="flex flex-col space-y-2 w-full min-w-0">
    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block select-none">
      {label}{" "}
      {props.required && (
        <span className="text-rose-500 font-sans ml-0.5">*</span>
      )}
    </label>
    <div className="relative w-full group">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4 flex items-center justify-center pointer-events-none z-10 group-focus-within:text-rose-500 transition-colors">
        {React.cloneElement(icon, { size: 14 })}
      </div>
      <div className="absolute left-10 top-1/2 -translate-y-1/2 w-px h-4 bg-slate-200/80 group-focus-within:bg-rose-500/30 transition-colors pointer-events-none z-10" />
      <input
        {...props}
        className={`w-full h-14 pl-12 pr-4 bg-slate-50/60 border rounded-xl text-xs font-semibold outline-none transition-all focus:bg-white focus:ring-4 focus:ring-rose-500/5 placeholder:text-slate-400 placeholder:font-normal font-sans disabled:opacity-60 disabled:cursor-not-allowed ${
          error
            ? "border-rose-400 text-rose-900 focus:border-rose-500"
            : "border-slate-200/80 text-slate-800 focus:border-rose-500"
        }`}
      />
    </div>
  </div>
);
