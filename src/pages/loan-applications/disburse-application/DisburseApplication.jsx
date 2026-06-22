import React, { useState } from "react";
import {
  ArrowLeft,
  Wallet,
  Smartphone,
  Building,
  Hash,
  GitBranch,
  Receipt,
  FileText,
  User,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { useToast } from "../../../contexts/ToastProvider";
import {
  disburseApplication,
  getApplication,
} from "../../../sdk/loan-applications/loan-applications";
import useAuth from "../../../hooks/useAuth";
import DisburseSuccess from "../../../components/disburse-application/DisburseSuccess";

export default function DisburseLoan() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { id } = useParams();
  const { auth } = useAuth();
  const [showDisburseSuccess, setShowDisburseSuccess] = useState(false);
  const [application, setApplication] = useState({});

  const [formData, setFormData] = useState({
    method: "MPESA",
    recipient_phone: "",
    bank_name: "",
    bank_account_number: "",
    bank_branch: "",
    transaction_ref: "",
    notes: "",
    name: "",
    disburseDate: new Date().toISOString().split("T")[0],
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
      errorMsg = "This information is needed to clear the payout.";
    } else if (
      value &&
      name === "recipient_phone" &&
      !/^(07|01|\+254)[0-9]\d{7,12}$/.test(value)
    ) {
      errorMsg = "Please enter a valid phone number.";
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const generateUniqueKey = () => {
    return crypto.randomUUID();
  };

  const { isFetching } = useQuery({
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

  const { mutate, isLoading } = useMutation({
    mutationKey: ["disburse-loan"],
    mutationFn: async () => {
      const response = await disburseApplication(
        id,
        auth?.user?.id,
        formData?.method,
        formData?.name,
        formData?.disburseDate,
        formData?.notes,
        formData?.recipient_phone,
        formData?.bank_name,
        formData?.bank_account_number,
        formData?.bank_branch,
        formData?.transaction_ref,
        generateUniqueKey(),
      );
      return response?.data?.data;
    },
    onSuccess: () => {
      setShowDisburseSuccess(true);
    },
    onError: (error) => {
      showToast({
        title: "Disbursement failed",
        type: "error",
        position: "top-right",
        description: error?.message || "Something went wrong on our end.",
      });
    },
  });

  const handleFormSubmit = () => {};

  return (
    <>
      <DisburseSuccess
        isOpen={showDisburseSuccess}
        onClose={() => setShowDisburseSuccess(false)}
        borrowerName={application.applicant_name}
        transactionRef={formData?.transaction_ref}
        disbursedAmount={application.applied_amount}
        payoutMethod={formData?.method}
        onReturnToQueue={() => navigate(`/admin/loan-applications/${id}`)}
        viewLedger={() => navigate(`/admin/loan-transactions`)}
      />

      <div className="w-full space-y-6 antialiased text-slate-800">
        {/* HEADER CONTROLS */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-200/60 pb-5 select-none">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="size-10 rounded-xl border border-slate-200/80 bg-white flex items-center justify-center text-slate-500 hover:text-slate-900 shadow-3xs cursor-pointer transition-all"
            >
              <ArrowLeft size={16} />
            </button>
            <div className="space-y-1">
              <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 block select-none">
                Sacco Settlement Workspace
              </span>
              <h1 className="text-xl font-black tracking-tight text-slate-900">
                Disburse Loan Application
              </h1>
              {/* FIXED: Formatted the application identifier with clean monospace typography and an optional inline label */}
              <p className="text-xs font-mono font-bold text-slate-500 flex items-center gap-1 mt-0.5">
                <span className="text-[10px] font-sans text-slate-400 font-normal uppercase tracking-wide mr-0.5 select-none">
                  Ref:
                </span>
                {application?.application_number || "—"}
              </p>
            </div>
          </div>
        </div>

        {/* THREE SIDE-BY-SIDE CONTAINERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch w-full">
          {/* CONTAINER 1: USER DISBURSING */}
          <SectionCard title="Disbursing Officer" icon={<User size={14} />}>
            <div className="space-y-4">
              <FormInput
                icon={<User />}
                label="Authorized Officer"
                name="name"
                value={formData?.name}
                onBlur={handleBlur}
                error={errors.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
              />

              <FormInput
                icon={<Calendar />}
                label="Disbursement Date"
                name="disbursement_date"
                value={formData?.disburseDate}
                disabled
                readOnly
              />
            </div>
          </SectionCard>

          {/* CONTAINER 2: BORROWER DETAILS */}
          <SectionCard title="Borrower Details" icon={<Smartphone size={14} />}>
            <div className="space-y-4">
              <FormSelect
                icon={<Wallet />}
                label="Payout Method"
                name="method"
                value={formData.method}
                onChange={handleInputChange}
                required
              >
                <option value="MPESA">Mobile Wallet</option>
                <option value="BANK">Bank Transfer</option>
              </FormSelect>

              {formData.method === "MPESA" && (
                <div className="animate-in fade-in duration-200">
                  <FormInput
                    icon={<Smartphone />}
                    label="Recipient Phone Number"
                    name="recipient_phone"
                    value={formData.recipient_phone}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    error={errors.recipient_phone}
                    placeholder="e.g., 0712345678"
                    required
                  />
                </div>
              )}

              {formData.method === "BANK" && (
                <div className="animate-in fade-in duration-200">
                  <FormInput
                    icon={<Building />}
                    label="Receiving Bank Name"
                    name="bank_name"
                    value={formData.bank_name}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    error={errors.bank_name}
                    placeholder="e.g., Equity Bank"
                    required
                  />
                </div>
              )}
            </div>
          </SectionCard>

          {/* CONTAINER 3: ACCOUNT & TRANSACTION DETAILS */}
          <SectionCard
            title="Account & Payout Details"
            icon={<Receipt size={14} />}
          >
            <div className="space-y-4">
              {formData.method === "BANK" ? (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <FormInput
                    icon={<GitBranch />}
                    label="Bank Branch Location"
                    name="bank_branch"
                    value={formData.bank_branch}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    error={errors.bank_branch}
                    placeholder="e.g., Westlands Branch"
                    required
                  />
                  <FormInput
                    icon={<Hash />}
                    label="Bank Account Number"
                    name="bank_account_number"
                    value={formData.bank_account_number}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    error={errors.bank_account_number}
                    placeholder="e.g., 0123456789"
                    required
                  />
                </div>
              ) : (
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-center select-none h-[72px] flex items-center justify-center text-[11px] text-slate-400 font-medium">
                  No bank routing details required for Mobile Wallet payouts.
                </div>
              )}

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
            </div>
          </SectionCard>
        </div>

        {/* SIDE-BY-SIDE OFFICER COMPLIANCE DISCLAIMERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 select-none">
          {/* DISCLAIMER 1: LEDGER FINALITY (Firm Blue/Slate Theme) */}
          <div className="p-4 bg-slate-50/80 border border-slate-200/80 rounded-xl flex items-center gap-3 text-xs text-slate-600 font-medium leading-relaxed shadow-3xs">
            <ShieldCheck size={16} className="text-[#074073] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-slate-900">
                Irreversible Ledger Writing
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                Once confirmed, this transaction is instantly committed to the
                core financial ledger. This action cannot be undone, reversed,
                or edited. Please ensure the transaction hash is accurate before
                authorizing the payout.
              </p>
            </div>
          </div>

          {/* DISCLAIMER 2: DESTINATION VERIFICATION (Operational Amber Theme) */}
          <div className="p-4 bg-amber-50/60 border border-amber-200/60 rounded-xl flex items-center gap-3 text-xs text-amber-800 font-medium leading-relaxed shadow-3xs">
            <AlertTriangle
              size={16}
              className="text-amber-600 shrink-0 mt-0.5"
            />
            <div className="space-y-1">
              <p className="font-bold text-slate-900">
                Account Destination Check
              </p>
              <p className="text-[11px] text-amber-700 font-medium">
                Always double-check that the destination wallet or bank account
                belongs directly to the approved applicant. Cross-verifying
                names on your transfer screen right now prevents wrong-account
                transfers and irreversible losses.
              </p>
            </div>
          </div>
        </div>

        {/* FULL WIDTH BOTTOM BLOCK: NOTES TEXTAREA */}
        <div className="w-full bg-white border border-slate-200/60 rounded-[24px] p-6 space-y-4 shadow-3xs">
          <div className="flex flex-col space-y-2 w-full">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block select-none">
              Processing Notes
            </label>
            <textarea
              rows={5}
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full p-3 bg-slate-50/60 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#074073] focus:bg-white transition-all resize-none shadow-3xs"
              placeholder="Add any internal explanations, clearance conditions, or notes regarding this transaction..."
            />
          </div>

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
              <span>CConfirm Payout</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ==========================================================================
   INTERNAL UTILITY DESIGN STRUCTS
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
