import React, { useState } from "react";
import {
  Smartphone,
  Building2,
  Calendar,
  Hash,
  Upload,
  CheckCircle2,
  X,
  FileText,
  ShieldCheck,
  AlertCircle,
  Eye,
  ArrowRight,
} from "lucide-react";

export default function AddManualPayment() {
  const [formData, setFormData] = useState({
    mode: "MPESA", // 'MPESA' | 'BANK'
    accountOrPhone: "",
    amount: "",
    referenceCode: "",
    date: new Date().toISOString().split("T")[0],
    receipt: null,
    receiptPreview: null,
    isConfirmed: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleModeChange = (mode) => {
    setFormData((prev) => ({
      ...prev,
      mode,
      accountOrPhone: "", // Reset field on toggle
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        receipt: file,
        receiptPreview: URL.createObjectURL(file),
      }));
    }
  };

  const removeReceipt = () => {
    setFormData((prev) => ({
      ...prev,
      receipt: null,
      receiptPreview: null,
    }));
  };

  // Form validity check
  const isFormValid =
    formData.accountOrPhone.trim() !== "" &&
    formData.amount > 0 &&
    formData.referenceCode.trim() !== "" &&
    formData.date !== "" &&
    formData.isConfirmed;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      setIsModalOpen(true);
    }
  };

  const handleFinalConfirm = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsModalOpen(false);
      setSubmitSuccess(true);
    }, 1200);
  };

  const resetForm = () => {
    setFormData({
      mode: "MPESA",
      accountOrPhone: "",
      amount: "",
      referenceCode: "",
      date: new Date().toISOString().split("T")[0],
      receipt: null,
      receiptPreview: null,
      isConfirmed: false,
    });
    setSubmitSuccess(false);
  };

  return (
    <div className="bg-slate-50/50 select-none">
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">
              Record Manual Payment
            </h1>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Manually add a transaction for Savings. Select the payment type,
              choose the transaction mode, add amount, select date, upload
              transaction receipt and update records seamlessly.
            </p>
          </div>
        </div>

        {/* Success Alert Banner */}
        {submitSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between gap-3 text-emerald-800">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
              <div>
                <p className="text-xs font-bold">
                  Payment Logged Successfully!
                </p>
                <p className="text-[11px] text-emerald-600 font-medium">
                  Transaction ref:{" "}
                  <span className="font-bold uppercase">
                    {formData.referenceCode}
                  </span>
                </p>
              </div>
            </div>
            <button
              onClick={resetForm}
              className="text-xs font-bold bg-emerald-600 text-white px-3 py-1.5 rounded-xl hover:bg-emerald-700 transition-colors"
            >
              Add Another
            </button>
          </div>
        )}

        {/* Main Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border border-slate-200/80 shadow-3xs p-5 md:p-5 space-y-6"
        >
          {/* Section 1: Transaction Mode */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              Payment Channel <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleModeChange("MPESA")}
                className={`flex items-center justify-center gap-2.5 p-3.5 rounded-2xl border text-xs font-bold transition-all ${
                  formData.mode === "MPESA"
                    ? "bg-emerald-50/70 border-emerald-500 text-emerald-700 shadow-2xs"
                    : "bg-slate-50/50 border-slate-200/80 text-slate-500 hover:bg-slate-100/60"
                }`}
              >
                <Smartphone size={16} />
                M-PESA Mobile
              </button>

              <button
                type="button"
                onClick={() => handleModeChange("BANK")}
                className={`flex items-center justify-center gap-2.5 p-3.5 rounded-2xl border text-xs font-bold transition-all ${
                  formData.mode === "BANK"
                    ? "bg-blue-50/70 border-blue-500 text-blue-700 shadow-2xs"
                    : "bg-slate-50/50 border-slate-200/80 text-slate-500 hover:bg-slate-100/60"
                }`}
              >
                <Building2 size={16} />
                Bank Transfer
              </button>
            </div>
          </div>

          {/* Section 2: Form Inputs Grid */}
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              Transaction Details
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Dynamic Input: Phone vs Account Number */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  {formData.mode === "MPESA"
                    ? "Mobile Phone Number"
                    : "Bank Account Number"}{" "}
                  <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    {formData.mode === "MPESA" ? (
                      <Smartphone size={15} />
                    ) : (
                      <Building2 size={15} />
                    )}
                  </div>
                  <input
                    type="text"
                    name="accountOrPhone"
                    value={formData.accountOrPhone}
                    onChange={handleInputChange}
                    placeholder={
                      formData.mode === "MPESA"
                        ? "e.g. +254712345678"
                        : "e.g. 011092837400"
                    }
                    required
                    className="w-full pl-10 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:bg-white focus:outline-none focus:border-slate-400 transition-colors placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Amount (KES) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-xs font-bold text-slate-400">
                    KES
                  </span>
                  <input
                    type="number"
                    name="amount"
                    min="1"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-xl text-xs text-slate-800 font-bold focus:bg-white focus:outline-none focus:border-slate-400 transition-colors placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Reference Code */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Transaction / Reference Code{" "}
                  <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Hash size={15} />
                  </div>
                  <input
                    type="text"
                    name="referenceCode"
                    value={formData.referenceCode}
                    onChange={handleInputChange}
                    placeholder={
                      formData.mode === "MPESA"
                        ? "e.g. RKJ8923KL"
                        : "e.g. FT24098231"
                    }
                    required
                    className="w-full pl-10 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-xl text-xs text-slate-800 font-mono font-semibold uppercase focus:bg-white focus:outline-none focus:border-slate-400 transition-colors placeholder:text-slate-400 placeholder:font-sans"
                  />
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Transaction Date <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Calendar size={15} />
                  </div>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:bg-white focus:outline-none focus:border-slate-400 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Receipt Upload */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              Proof of Payment (Optional)
            </label>

            {!formData.receipt ? (
              <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:border-slate-300 hover:bg-slate-50/50 transition-all text-center">
                <Upload size={22} className="text-slate-400 mb-2" />
                <p className="text-xs font-bold text-slate-700">
                  Upload Receipt or Statement
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Supports PNG, JPG, or PDF up to 5MB
                </p>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="flex items-center justify-between p-6 bg-slate-50 border border-slate-200 rounded-2xl">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 bg-slate-200/60 rounded-lg text-slate-600 shrink-0">
                    <FileText size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate">
                      {formData.receipt.name}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {(formData.receipt.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {formData.receiptPreview && (
                    <a
                      href={formData.receiptPreview}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
                      title="Preview"
                    >
                      <Eye size={16} />
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={removeReceipt}
                    className="p-1.5 text-rose-400 hover:text-rose-600 rounded-lg transition-colors"
                    title="Remove File"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 p-3 shadow-xs transition-all duration-200 group select-none">
            <div className="space-y-3">
              {/* Header & Status Pill */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-600 shrink-0 shadow-3xs group-hover:scale-105 transition-transform">
                    <FileText size={16} strokeWidth={2.2} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 tracking-tight">
                      Source Verification
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                      Funds must be fully settled in the SACCO's official bank
                      or M-PESA paybill account prior to manual ledger entry.
                      Unsettled checks or pending transfers must not be entered.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Mandatory Verification Checkbox */}
          <div className="pt-2 border-t border-slate-100">
            <label className="flex items-start gap-3 p-3.5 bg-amber-50/50 border border-amber-200/60 rounded-2xl cursor-pointer">
              <input
                type="checkbox"
                name="isConfirmed"
                checked={formData.isConfirmed}
                onChange={handleInputChange}
                className="mt-0.5 rounded border-slate-300 text-slate-800 focus:ring-slate-400 shrink-0"
              />
              <span className="text-xs text-amber-900/80 font-medium leading-relaxed">
                I confirm that the payment details entered are accurate and have
                been verified. This transaction will be recorded manually in the
                system.
              </span>
            </label>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={resetForm}
              className="px-5 py-3 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 transition-colors"
            >
              Reset Form
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-3xs ${
                isFormValid
                  ? "bg-slate-900 text-white hover:bg-slate-800 cursor-pointer"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200/60"
              }`}
            >
              Review Payment
              <ArrowRight size={14} />
            </button>
          </div>
        </form>
      </div>

      {/* SUMMARY MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-[540px] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-100 rounded-xl text-slate-700">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                    Confirm Transaction
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Double-check details before committing to ledger
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content Summary */}
            <div className="p-6 space-y-4">
              <div className="bg-slate-50/80 border border-slate-200/60 rounded-2xl p-4 space-y-3 text-xs">
                {/* Amount Highlight */}
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                  <span className="text-slate-400 font-medium uppercase text-[10px] tracking-wider">
                    Total Amount
                  </span>
                  <span className="text-lg font-black text-slate-900">
                    KES{" "}
                    {Number(formData.amount).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>

                {/* Details Breakdown */}
                <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 pt-1">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">
                      Channel Mode
                    </span>
                    <span className="font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                      {formData.mode === "MPESA" ? (
                        <>
                          <Smartphone size={13} className="text-emerald-600" />{" "}
                          M-PESA
                        </>
                      ) : (
                        <>
                          <Building2 size={13} className="text-blue-600" /> Bank
                          Transfer
                        </>
                      )}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">
                      Reference Code
                    </span>
                    <span className="font-mono font-bold text-slate-800 uppercase mt-0.5 block">
                      {formData.referenceCode}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">
                      {formData.mode === "MPESA"
                        ? "Phone Number"
                        : "Account Number"}
                    </span>
                    <span className="font-semibold text-slate-700 mt-0.5 block truncate">
                      {formData.accountOrPhone}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">
                      Transaction Date
                    </span>
                    <span className="font-semibold text-slate-700 mt-0.5 block">
                      {formData.date}
                    </span>
                  </div>
                </div>

                {/* File Attachment Check */}
                <div className="border-t border-slate-200/60 pt-2.5 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Attached Receipt:</span>
                  <span className="font-semibold text-slate-700">
                    {formData.receipt ? formData.receipt.name : "None uploaded"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl text-amber-800 text-[11px]">
                <AlertCircle size={15} className="shrink-0 text-amber-600" />
                <span>
                  This manual record will be audited under your user account ID.
                </span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmitting}
                className="px-4 py-4 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-200/60 transition-colors"
              >
                Edit Details
              </button>
              <button
                type="button"
                onClick={handleFinalConfirm}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-5 py-4 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-3xs disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>Logging Record...</>
                ) : (
                  <>
                    <CheckCircle2 size={15} /> Confirm & Save
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
