import React, { useState } from "react";
import {
  ArrowLeft,
  Wallet,
  Smartphone,
  Building,
  Hash,
  GitBranch,
  Receipt,
  User,
  Calendar,
  AlertTriangle,
  ShieldCheck,
  ArrowUpRight,
  Loader2,
  PiggyBank,
  TrendingUp,
  CreditCard,
  Briefcase,
  Globe,
  Clock,
  BadgeAlert,
  X,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  Phone,
  Zap,
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

  // MODAL STATES
  const [showSummaryModal, setShowSummaryModal] = useState(false);
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
      setShowSummaryModal(false);
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

  // PRE-SUBMISSION FORM VALIDATION
  const handleFormSubmit = () => {
    const newErrors = {};

    if (!formData.name?.trim()) {
      newErrors.name = "This information is needed to clear the payout.";
    }

    if (!formData.transaction_ref?.trim()) {
      newErrors.transaction_ref =
        "This information is needed to clear the payout.";
    }

    if (formData.method === "MPESA") {
      if (!formData.recipient_phone?.trim()) {
        newErrors.recipient_phone =
          "This information is needed to clear the payout.";
      } else if (
        !/^(07|01|\+254)[0-9]\d{7,12}$/.test(formData.recipient_phone)
      ) {
        newErrors.recipient_phone = "Please enter a valid phone number.";
      }
    }

    if (formData.method === "BANK") {
      if (!formData.bank_name?.trim()) {
        newErrors.bank_name = "This information is needed to clear the payout.";
      }
      if (!formData.bank_branch?.trim()) {
        newErrors.bank_branch =
          "This information is needed to clear the payout.";
      }
      if (!formData.bank_account_number?.trim()) {
        newErrors.bank_account_number =
          "This information is needed to clear the payout.";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setShowSummaryModal(true);
    } else {
      showToast({
        title: "Missing Required Information",
        type: "error",
        position: "top-right",
        description:
          "Please fill in all mandatory disbursement fields before proceeding.",
      });
    }
  };

  const formatCurrency = (val) =>
    `KES ${Number(val || 0).toLocaleString("en-KE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const product = application?.loan_product || {};
  const eligibility = application?.eligibility_result || {};

  return (
    <>
      {/* SUCCESS MODAL */}
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

      {/* DISBURSEMENT SUMMARY MODAL */}
      {showSummaryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="fixed inset-0"
            onClick={() => !isLoading && setShowSummaryModal(false)}
          />

          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 flex flex-col">
            {/* Modal Header */}
            <div className="px-6 pt-6 pb-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
                  <Zap size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">
                    Confirm Disbursement Summary
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    Verify settlement parameters before executing transfer
                  </p>
                </div>
              </div>
              <button
                type="button"
                disabled={isLoading}
                onClick={() => setShowSummaryModal(false)}
                className="size-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-all cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {/* Applicant Summary Banner */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Approved Borrower
                  </span>
                  <span className="text-sm font-bold text-slate-800 block mt-0.5">
                    {application.applicant_name}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    {application.application_number}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Disbursement Capital
                  </span>
                  <span className="text-sm font-black font-mono text-primary block mt-0.5">
                    {formatCurrency(application.applied_amount)}
                  </span>
                </div>
              </div>

              {/* Data Review Grid */}
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 flex justify-between items-center">
                  <span className="font-semibold text-slate-500">
                    Authorized Officer
                  </span>
                  <span className="font-bold text-slate-800">
                    {formData.name}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 flex justify-between items-center">
                  <span className="font-semibold text-slate-500">
                    Payout Method
                  </span>
                  <span className="font-bold uppercase bg-primary text-white px-2 py-0.5 rounded text-[10px] font-mono">
                    {formData.method === "MPESA"
                      ? "Mobile Wallet"
                      : "Bank Transfer"}
                  </span>
                </div>

                {formData.method === "MPESA" ? (
                  <div className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 flex justify-between items-center">
                    <span className="font-semibold text-slate-500">
                      Recipient Phone
                    </span>
                    <span className="font-mono font-bold text-slate-800">
                      {formData.recipient_phone}
                    </span>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-1.5">
                    <span className="font-semibold text-slate-500 block">
                      Bank Destination Details
                    </span>
                    <div className="flex justify-between items-center text-slate-700 font-medium">
                      <span>Bank & Branch:</span>
                      <span className="font-bold text-slate-800">
                        {formData.bank_name} ({formData.bank_branch})
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-slate-700 font-medium">
                      <span>Account Number:</span>
                      <span className="font-mono font-bold text-slate-800">
                        {formData.bank_account_number}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 flex justify-between items-center">
                  <span className="font-semibold text-slate-500">
                    Transaction Ref Code
                  </span>
                  <span className="font-mono font-bold text-primary">
                    {formData.transaction_ref}
                  </span>
                </div>

                {formData.notes && (
                  <div className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-1">
                    <span className="font-semibold text-slate-500 block">
                      Processing Notes
                    </span>
                    <p className="text-slate-700 font-medium leading-relaxed italic">
                      "{formData.notes}"
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3">
              <button
                type="button"
                disabled={isLoading}
                onClick={() => setShowSummaryModal(false)}
                className="h-11 px-5 border border-slate-200/80 bg-white text-slate-600 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-100 transition-all cursor-pointer disabled:opacity-50"
              >
                Back & Edit
              </button>
              <button
                type="button"
                disabled={isLoading}
                onClick={() => mutate()}
                className="h-11 px-6 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-emerald-600/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span>
                  {isLoading ? "Executing..." : "Confirm & Execute Payout"}
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
      )}

      {/* PAGE CONTAINER */}
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
                Sacco Settlement Workspace
              </span>
              <h1 className="text-xl font-black tracking-tight text-primary">
                Disburse Loan Application
              </h1>
              <p className="text-xs font-mono font-bold text-slate-500 flex items-center gap-1 mt-0.5">
                <span className="text-[10px] font-sans text-slate-400 font-normal uppercase tracking-wide mr-0.5 select-none">
                  Ref:
                </span>
                {application?.application_number || "—"}
              </p>
            </div>
          </div>
        </div>

        {isFetching ? (
          <LoanAndBorrowerSkeleton />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full text-slate-800">
            {/* CARD 1: LOAN APPLICATION DETAILS */}
            <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xs p-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-2xl bg-primary/5 text-primary border border-primary/10 flex items-center justify-center shrink-0">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                      Loan Application Details
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      {application.application_number}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 my-5 bg-slate-50/80 p-4 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Applied Amount
                  </span>
                  <span className="text-xl font-bold text-primary tracking-tight mt-0.5 block">
                    {formatCurrency(application.applied_amount)}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Repayment Duration
                  </span>
                  <span className="text-xl font-bold text-slate-800 tracking-tight mt-0.5 block">
                    {application.loan_period} Months
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-6 gap-x-6 text-xs">
                <DetailItem
                  icon={<Briefcase size={15} />}
                  label="Loan Product"
                  value={product.product_name || "—"}
                />
                <DetailItem
                  icon={<CreditCard size={15} />}
                  label="Repayment Frequency"
                  value={application.loan_interval || "Monthly"}
                />
                <DetailItem
                  icon={<BadgeAlert size={15} />}
                  label="Loan Purpose"
                  value={application.loan_purpose || "—"}
                />
                <DetailItem
                  icon={<Globe size={15} />}
                  label="Application Channel"
                  value={application.loan_channel || "WEB"}
                />
                <DetailItem
                  icon={<Calendar size={15} />}
                  label="Application Date"
                  value={
                    application.application_date
                      ? new Date(
                          application.application_date,
                        ).toLocaleDateString("en-KE", { dateStyle: "medium" })
                      : "—"
                  }
                />
                <DetailItem
                  icon={<TrendingUp size={15} />}
                  label="Interest Rate"
                  value={`${Number(product.interest_rate || 0).toFixed(2)}% pm (${product.interest_method?.replace("_", " ")})`}
                />
              </div>
            </div>

            {/* CARD 2: BORROWER DETAILS & FINANCIAL SNAPSHOT */}
            <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xs p-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-2xl bg-[#074073]/5 text-[#074073] border border-[#074073]/10 flex items-center justify-center shrink-0">
                    <User size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                      Borrower Profile
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      Personal & Financial Profile
                    </p>
                  </div>
                </div>
              </div>

              <div className="my-5 p-4 bg-[#074073]/5 rounded-2xl border border-[#074073]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Applicant Name
                  </span>
                  <span className="text-base font-bold text-slate-900 tracking-tight block">
                    {application.applicant_name}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-5">
                <BalanceBox
                  icon={<PiggyBank size={15} className="text-emerald-600" />}
                  label="Total Shares"
                  value={formatCurrency(eligibility.total_shares)}
                />
                <BalanceBox
                  icon={<Wallet size={15} className="text-blue-600" />}
                  label="Total Savings"
                  value={formatCurrency(eligibility.total_savings)}
                />
                <BalanceBox
                  icon={<TrendingUp size={15} className="text-indigo-600" />}
                  label="Borrowing Limit"
                  value={formatCurrency(eligibility.limit)}
                />
              </div>

              <div className="grid grid-cols-2 gap-y-6 gap-x-6 text-xs">
                <DetailItem
                  icon={<ShieldCheck size={15} />}
                  label="Eligibility Check"
                  value={
                    application.eligibility_passed
                      ? "Passed All Checks"
                      : "Failed Check"
                  }
                />
                <DetailItem
                  icon={<Calendar size={15} />}
                  label="Membership Tenure"
                  value="19 Months"
                />
                <DetailItem
                  icon={<User size={15} />}
                  label="Guarantors Status"
                  value={`${application.guarantors?.length || 0} / ${product.min_guarantors} Approved`}
                />
              </div>
            </div>
          </div>
        )}

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
          {/* DISCLAIMER 1: PERMANENT ACTION */}
          <div className="p-4 bg-slate-50/80 border border-slate-200/80 rounded-xl flex items-center gap-3 text-xs text-slate-600 font-medium leading-relaxed shadow-3xs">
            <ShieldCheck size={16} className="text-[#074073] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-primary">Permanent Payment Record</p>
              <p className="text-[11px] text-slate-500 font-medium">
                Once confirmed, this payment is saved permanently and cannot be
                canceled or edited. Please verify all details before finalizing
                the payout.
              </p>
            </div>
          </div>

          {/* DISCLAIMER 2: RECIPIENT VERIFICATION */}
          <div className="p-4 bg-amber-50/60 border border-amber-200/60 rounded-xl flex items-center gap-3 text-xs text-amber-800 font-medium leading-relaxed shadow-3xs">
            <AlertTriangle
              size={16}
              className="text-amber-600 shrink-0 mt-0.5"
            />
            <div className="space-y-1">
              <p className="font-bold text-primary">Verify Recipient Name</p>
              <p className="text-[11px] text-amber-700 font-medium">
                Make sure the phone number or bank account belongs directly to
                the approved applicant. Double-checking names helps prevent
                sending funds to the wrong person.
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
              onClick={() => navigate(-1)}
              type="button"
              className="h-11 px-5 border border-slate-200/80 bg-white text-slate-600 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleFormSubmit}
              type="button"
              className="h-11 px-6 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-primary/10 hover:bg-primary/90 transition-all active:scale-97 flex items-center gap-2 cursor-pointer"
            >
              <span>Review Payout Summary</span>
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

const LoanAndBorrowerSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full animate-pulse select-none">
    {/* CARD 1 SKELETON */}
    <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xs p-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-2xl bg-slate-100 shrink-0" />
          <div className="space-y-1.5">
            <div className="h-3.5 w-36 bg-slate-200 rounded" />
            <div className="h-2.5 w-20 bg-slate-100 rounded" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 my-5 bg-slate-50/80 p-4 rounded-2xl border border-slate-100">
        <div className="space-y-2">
          <div className="h-2.5 w-20 bg-slate-200 rounded" />
          <div className="h-6 w-32 bg-slate-200 rounded-lg" />
        </div>
        <div className="space-y-2">
          <div className="h-2.5 w-20 bg-slate-200 rounded" />
          <div className="h-6 w-20 bg-slate-200 rounded-lg" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-6 gap-x-6">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={`sk1-item-${i}`} className="flex items-start gap-2.5">
              <div className="size-7 rounded-lg bg-slate-100 shrink-0 mt-0.5" />
              <div className="space-y-1.5 flex-1">
                <div className="h-2.5 w-16 bg-slate-200 rounded" />
                <div className="h-3.5 w-24 bg-slate-100 rounded" />
              </div>
            </div>
          ))}
      </div>
    </div>

    {/* CARD 2 SKELETON */}
    <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xs p-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-2xl bg-slate-100 shrink-0" />
          <div className="space-y-1.5">
            <div className="h-3.5 w-32 bg-slate-200 rounded" />
            <div className="h-2.5 w-36 bg-slate-100 rounded" />
          </div>
        </div>
      </div>

      <div className="my-5 p-4 bg-slate-50/80 rounded-2xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-2">
          <div className="h-2.5 w-20 bg-slate-200 rounded" />
          <div className="h-5 w-36 bg-slate-200 rounded" />
        </div>
        <div className="h-7 w-28 bg-slate-200 rounded-xl" />
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div
              key={`sk2-bal-${i}`}
              className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100 space-y-2"
            >
              <div className="h-2 w-14 bg-slate-200 rounded" />
              <div className="h-4 w-20 bg-slate-200 rounded" />
            </div>
          ))}
      </div>

      <div className="grid grid-cols-2 gap-y-6 gap-x-6">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={`sk2-item-${i}`} className="flex items-start gap-2.5">
              <div className="size-7 rounded-lg bg-slate-100 shrink-0 mt-0.5" />
              <div className="space-y-1.5 flex-1">
                <div className="h-2.5 w-16 bg-slate-200 rounded" />
                <div className="h-3.5 w-24 bg-slate-100 rounded" />
              </div>
            </div>
          ))}
      </div>
    </div>
  </div>
);

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-2.5 min-w-0">
    <div className="size-7 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-400 shrink-0 mt-0.5">
      {icon}
    </div>
    <div className="min-w-0 flex flex-col">
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate">
        {label}
      </span>
      <span className="text-xs font-semibold text-slate-700 truncate mt-0.5">
        {value}
      </span>
    </div>
  </div>
);

const BalanceBox = ({ icon, label, value }) => (
  <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100 flex flex-col justify-between">
    <div className="flex items-center justify-between mb-1">
      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </span>
    </div>
    <span className="text-xs font-bold text-slate-800 tracking-tight truncate">
      {value}
    </span>
  </div>
);
