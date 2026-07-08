import React, { useState } from "react";
import {
  ArrowLeft,
  User,
  Calendar,
  DollarSign,
  Wallet,
  Receipt,
  Building,
  Hash,
  Paperclip,
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertTriangle,
  X,
  ArrowUpRight,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { useToast } from "../../../contexts/ToastProvider";

export default function RecordManualPayment() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { loanId } = useParams();

  // Active session details for the logged-in officer (representing John Kamau in 2026 logs)
  const currentOfficer = {
    uuid: "user-uuid-of-recording-officer",
    name: "John Kamau",
    currentDate: "2026-06-19",
  };

  // Form State Layer matching your schema requirements
  const [formData, setFormData] = useState({
    payment_mode: "MPESA", // 'MPESA' | 'BANK'
    amount: "",
    payment_date: "2026-06-19",
    transaction_ref: "",
    bank_name: "Equity Bank",
    bank_account: "",
    notes: "",
    confirm_details: false,
  });

  const [receiptFile, setReceiptFile] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReceiptFile(file);
    }
  };

  const handleRemoveFile = () => {
    setReceiptFile(null);
  };

  const handleBlur = (e) => {
    const { name, value, required } = e.target;
    let errorMsg = "";

    if (required && (!value || value.toString().trim() === "")) {
      errorMsg = "This field is required to complete the payment record.";
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  // React Query Mutation pipeline to save transaction details safely
  const { mutate, isLoading } = useMutation({
    mutationKey: ["record-manual-payment"],
    mutationFn: async () => {
      // Build transmission payload
      const finalPayload = {
        loan_id: loanId || "LN-TEMP-99",
        recorded_by: currentOfficer.uuid,
        recorded_by_name: currentOfficer.name,
        payment_mode: formData.payment_mode,
        amount: parseFloat(formData.amount),
        payment_date: formData.payment_date,
        transaction_ref: formData.transaction_ref,
        bank_name: formData.payment_mode === "BANK" ? formData.bank_name : null,
        bank_account:
          formData.payment_mode === "BANK" ? formData.bank_account : null,
        notes: formData.notes,
        has_attachment: !!receiptFile,
      };

      console.log("Saving manual payment log entry:", finalPayload);
      // Simulating network response delay
      return new Promise((resolve) => setTimeout(resolve, 1000));
    },
    onSuccess: () => {
      showToast({
        title: "Payment Recorded Successfully!",
        type: "success",
        position: "top-right",
        description:
          "The payment has been logged and applied to the borrower's statement.",
      });
      navigate(-1);
    },
    onError: (error) => {
      showToast({
        title: "Recording Failed",
        type: "error",
        position: "top-right",
        description: error?.message || "Could not log payment entry.",
      });
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.amount || parseFloat(formData.amount) <= 0)
      newErrors.amount = "Please enter a valid payment amount.";
    if (!formData.payment_date)
      newErrors.payment_date =
        "Please select the date the payment was received.";
    if (!formData.transaction_ref.trim())
      newErrors.transaction_ref = "Please enter the reference code.";
    if (!formData.confirm_details)
      newErrors.confirm_details =
        "You must verify that all details are accurate.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    mutate();
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
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
              Offline Collections Workspace
            </span>
            <h1 className="text-xl font-black tracking-tight text-primary mt-0.5">
              Record Manual Payment
            </h1>
          </div>
        </div>
      </div>

      {/* 2. THE THREE-PANEL SIDE-BY-SIDE GRIDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch w-full">
        {/* PANEL 1: RECORDER DETAILS */}
        <SectionCard title="Recording Officer" icon={<User size={14} />}>
          <div className="space-y-4 select-none">
            <FormInput
              icon={<User />}
              label="Staff Member Name"
              name="recorder_name"
              value={currentOfficer.name}
              disabled
              readOnly
            />
            <FormInput
              icon={<Calendar />}
              label="System Entry Date"
              name="system_entry_date"
              value={currentOfficer.currentDate}
              disabled
              readOnly
            />
          </div>
        </SectionCard>

        {/* PANEL 2: CORE AMOUNT AND TIMELINE DETAILS */}
        <SectionCard title="Payment Metrics" icon={<DollarSign size={14} />}>
          <div className="space-y-4">
            <FormInput
              icon={<DollarSign />}
              label="Amount Received (KES)"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={errors.amount}
              placeholder="0.00"
              required
            />
            <FormInput
              icon={<Calendar />}
              label="Payment Date (When client paid)"
              name="payment_date"
              type="date"
              value={formData.payment_date}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={errors.payment_date}
              required
            />
          </div>
        </SectionCard>

        {/* PANEL 3: MODE & ROUTING MECHANISM DETAILS */}
        <SectionCard
          title="Payment Mode & Reference"
          icon={<Wallet size={14} />}
        >
          <div className="space-y-4">
            <FormSelect
              icon={<Wallet />}
              label="Payment Mode"
              name="payment_mode"
              value={formData.payment_mode}
              onChange={handleInputChange}
              required
            >
              <option value="MPESA">Mobile Money (M-Pesa)</option>
              <option value="BANK">Direct Bank Deposit / Transfer</option>
            </FormSelect>

            <FormInput
              icon={<Receipt />}
              label="Transaction Reference Code"
              name="transaction_ref"
              value={formData.transaction_ref}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={errors.transaction_ref}
              placeholder="e.g., QHH4LDXYZ1"
              required
            />

            {formData.payment_mode === "BANK" && (
              <div className="space-y-4 pt-2 border-t border-slate-100 animate-in fade-in duration-200">
                <FormInput
                  icon={<Building />}
                  label="Our Bank Account Destination"
                  name="bank_name"
                  value={formData.bank_name}
                  onChange={handleInputChange}
                  placeholder="e.g., Equity Bank"
                  required
                />
              </div>
            )}
          </div>
        </SectionCard>
      </div>

      {/* 3. LOWER CONTENT BLOCK (Full-Width Forms, Disclaimers & Checkboxes) */}
      <div className="w-full bg-white border border-slate-200/60 rounded-[24px] p-6 space-y-6 shadow-3xs">
        {/* ROW: NOTES TEXTAREA + RECEIPT ATTACHMENT BOX */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* NOTES TEXTAREA (Spans 2 columns out of 3) */}
          <div className="lg:col-span-2 flex flex-col space-y-2 w-full">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block select-none">
              Internal Processing Notes
            </label>
            <textarea
              rows={4}
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full p-3.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#074073] focus:bg-white transition-all resize-none shadow-3xs h-full min-h-[110px]"
              placeholder="Describe any additional payment background context here (e.g. depositor name if different from member name)..."
            />
          </div>

          {/* ATTACHMENT DRAG BOX MODULE (Spans 1 column out of 3) */}
          <div className="lg:col-span-2 flex flex-col space-y-2 w-full">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block select-none">
              Upload Payment Receipt
            </label>

            {!receiptFile ? (
              <label className="border border-dashed border-slate-200 bg-slate-50/40 hover:bg-slate-50 hover:border-[#074073]/40 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer min-h-[110px] transition-all group shadow-3xs select-none">
                <UploadCloud
                  size={22}
                  className="text-slate-400 group-hover:text-[#074073] transition-colors mb-1.5"
                />
                <span className="text-[11px] font-bold text-slate-700">
                  Click to upload file
                </span>
                <span className="text-[9px] text-slate-400 font-medium mt-0.5">
                  PDF, PNG, or JPG up to 5MB
                </span>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            ) : (
              <div className="border border-slate-200 bg-slate-50 p-3 rounded-xl flex items-center justify-between min-h-[110px] shadow-3xs animate-in zoom-in-95 duration-150">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="size-8 bg-white border border-slate-200 flex items-center justify-center text-slate-400 rounded-lg shrink-0 shadow-3xs">
                    <FileText size={15} className="text-[#074073]/80" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-700 truncate max-w-[140px]">
                      {receiptFile.name}
                    </p>
                    <p className="text-[9px] text-slate-400 font-medium font-mono">
                      {(receiptFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="size-6 bg-white border border-slate-200 rounded-md flex items-center justify-center text-slate-400 hover:text-rose-600 shadow-3xs cursor-pointer transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 4. SIDE-BY-SIDE COMPLIANCE DISCLAIMERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 select-none">
          <div className="p-4 bg-slate-50/80 border border-slate-200/80 rounded-xl flex items-center gap-3 text-xs text-slate-600 font-medium leading-relaxed shadow-3xs">
            <CheckCircle2
              size={16}
              className="text-[#074073] shrink-0 mt-0.5"
            />
            <div className="space-y-1">
              <p className="font-bold text-primary">
                Immediate Balance Adjustments
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                Saving this payment form automatically reduces the borrower's
                total outstanding loan balance. Make sure the amount matches the
                client's actual bank deposit receipt or mobile cash notification
                exactly.
              </p>
            </div>
          </div>

          <div className="p-4 bg-amber-50/60 border border-amber-200/60 rounded-xl flex items-center gap-3 text-xs text-amber-800 font-medium leading-relaxed shadow-3xs">
            <AlertTriangle
              size={16}
              className="text-amber-600 shrink-0 mt-0.5"
            />
            <div className="space-y-1">
              <p className="font-bold text-primary">Audit Reference Matching</p>
              <p className="text-[11px] text-amber-700 font-medium">
                The transaction reference code is critical for internal
                bookkeeping. Please take a moment to carefully check every
                character to prevent duplicate processing strings or manual
                audit confusion down the road.
              </p>
            </div>
          </div>
        </div>

        {/* 5. INTEGRITY CHECKBOX TRIGGER */}
        <div className="p-4 bg-[#074073]/5 border border-[#074073]/10 rounded-xl flex items-center gap-3 group cursor-pointer">
          <input
            type="checkbox"
            id="confirm_details"
            name="confirm_details"
            checked={formData.confirm_details}
            onChange={handleInputChange}
            className="w-4 h-4 text-[#074073] focus:ring-[#074073] border-slate-300 rounded cursor-pointer"
          />
          <label
            htmlFor="confirm_details"
            className="text-xs font-bold text-slate-700 cursor-pointer select-none"
          >
            I confirm that I have verified the payment amount, date, and
            transaction reference details are true and match the attached
            receipt.
          </label>
        </div>
        {errors.confirm_details && (
          <p className="text-[11px] font-semibold text-rose-600 -mt-2 ml-1 animate-in fade-in">
            {errors.confirm_details}
          </p>
        )}

        <div className="bg-white rounded-[24px] border border-slate-200/60 p-4 flex items-center justify-end gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          <button
            type="button"
            className="h-11 px-5 border border-slate-200/80 bg-white text-slate-600 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => navigate("/admin/apply-loan/eligibility")}
            type="button"
            className="h-11 px-6 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-primary/10 hover:bg-primary/90 transition-all active:scale-97 cursor-pointer flex items-center gap-2"
          >
            <span>Log Payment</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SUPPORTIVE CHILD INPUT PRIMITIVES WITH CORRESPONDING SEPARATOR LINES
   ========================================================================== */

const SectionCard = ({ title, icon, children }) => (
  <div className="bg-white border border-slate-200/60 shadow-sm rounded-[24px] p-5 space-y-4 flex flex-col w-full h-full justify-start">
    <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5 border-b border-slate-100 pb-2">
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
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4 flex items-center justify-center pointer-events-none z-10 group-focus-within:text-[#074073] transition-colors">
        {React.cloneElement(icon, { size: 14 })}
      </div>
      <div className="absolute left-10 top-1/2 -translate-y-1/2 w-px h-4 bg-slate-200/80 group-focus-within:bg-[#074073]/30 transition-colors pointer-events-none z-10" />
      <input
        {...props}
        className={`w-full h-14 pl-12 pr-4 bg-slate-50/60 border rounded-xl text-xs font-semibold outline-none transition-all focus:bg-white focus:ring-4 focus:ring-[#074073]/5 placeholder:text-slate-400 placeholder:font-normal font-sans disabled:opacity-60 disabled:cursor-not-allowed ${
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
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4 flex items-center justify-center pointer-events-none z-10 group-focus-within:text-[#074073] transition-colors">
        {React.cloneElement(icon, { size: 14 })}
      </div>
      <div className="absolute left-10 top-1/2 -translate-y-1/2 w-px h-4 bg-slate-200/80 group-focus-within:bg-[#074073]/30 transition-colors pointer-events-none z-10" />
      <select
        {...props}
        className={`w-full h-14 pl-12 pr-10 bg-slate-50/60 border rounded-xl text-xs font-semibold outline-none transition-all focus:bg-white focus:ring-4 focus:ring-[#074073]/5 appearance-none font-sans cursor-pointer ${
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
  </div>
);
