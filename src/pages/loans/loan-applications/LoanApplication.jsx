import React, { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Check,
  X,
  Bell,
  FileText,
  User,
  Smartphone,
  ShieldCheck,
  DollarSign,
  Calendar,
  Layers,
  Percent,
  Clock,
  Briefcase,
  History,
  Settings,
  Users,
  ShieldAlert,
  Paperclip,
  DownloadCloud,
  Sliders,
  ChevronDown,
  Upload,
  AlertCircle,
  Building,
  ArrowDownCircle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getApplication } from "../../../sdk/loan-applications/loan-applications";
import { useToast } from "../../../contexts/ToastProvider";

export default function LoanApplication() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { showToast } = useToast();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [application, setApplication] = useState({});

  const handleApprove = () => {
    navigate(`/admin/loan-applications/${application?.id}/approve`);
  };

  const handleDisburse = () => {
    navigate(`/admin/loan-applications/${application?.id}/disburse`);
  };

  const handleCancel = () => {
    navigate(`/admin/loan-applications/${application?.id}/cancel-application`);
  };

  const handleSendNotification = () => {
    navigate(`/admin/loan-applications/${application?.id}/send-notification`);
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

  return (
    <div className="w-full space-y-8 font-sans antialiased text-slate-800">
      {/* EXECUTIVE COMMAND TRACKER HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200/60 pb-6 select-none">
        <div className="flex items-center gap-4">
          <button className="size-10 rounded-xl border border-slate-200/80 bg-white flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all shadow-xs cursor-pointer">
            <ArrowLeft size={16} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-sans font-bold text-[9px] tracking-wider uppercase px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                {application.application_number}
              </span>
              <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 bg-warning/10 text-warning">
                <span className="size-1.5 rounded-full bg-warning" />
                {application.status_label}
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1.5">
              Review Loan Application
            </h1>
          </div>
        </div>

        <div className="relative inline-block text-left" ref={menuRef}>
          {/* MASTER INTERACTIVE TRIGGER BUTTON */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`h-11 px-4 border rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2.5 cursor-pointer shadow-xs ${
              isMenuOpen
                ? "border-primary bg-primary/5 text-primary ring-4 ring-primary/5"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <Sliders size={14} className={isMenuOpen ? "animate-pulse" : ""} />
            <span>Manage Loan Application</span>
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${isMenuOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* CONCEALED OVERLAY DECK */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200/80 rounded-2xl shadow-xl p-2 z-50 origin-top-right animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-2 border-b border-slate-100 mb-1 select-none">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Quick Actions
                </p>
              </div>

              <div className="space-y-1">
                {/* ACTION 1: NOTIFY APPLICANT */}
                <button
                  onClick={() => {
                    handleSendNotification();
                    setIsMenuOpen(false);
                  }}
                  className="w-full h-10 px-3 rounded-xl flex items-center gap-3 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors text-left cursor-pointer group"
                >
                  <div className="size-6 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-primary/5 group-hover:border-primary/10 transition-colors">
                    <Bell size={13} />
                  </div>
                  <span>Notify Applicant</span>
                </button>

                {/* ACTION 2: CANCEL APPLICATION */}
                <button
                  onClick={() => {
                    handleCancel();
                    setIsMenuOpen(false);
                  }}
                  className="w-full h-10 px-3 rounded-xl flex items-center gap-3 text-xs font-semibold text-slate-600 hover:text-rose-700 hover:bg-rose-50/50 transition-colors text-left cursor-pointer group"
                >
                  <div className="size-6 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-400 group-hover:text-error group-hover:bg-rose-50 group-hover:border-rose-100 transition-colors">
                    <X size={13} />
                  </div>
                  <span>Cancel Application</span>
                </button>

                {/* ACTION 3: APPROVE */}
                <button
                  onClick={() => {
                    handleApprove();
                    setIsMenuOpen(false);
                  }}
                  className="w-full h-10 px-3 rounded-xl flex items-center gap-3 text-xs font-bold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/50 transition-colors text-left cursor-pointer group"
                >
                  <div className="size-6 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-400 group-hover:text-success group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-colors">
                    <Check size={13} />
                  </div>
                  <span>Approve Application</span>
                </button>
                <button
                  onClick={() => {
                    handleDisburse();
                    setIsMenuOpen(false);
                  }}
                  className="w-full h-10 px-3 rounded-xl flex items-center gap-3 text-xs font-bold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/50 transition-colors text-left cursor-pointer group"
                >
                  <div className="size-6 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-400 group-hover:text-success group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-colors">
                    <Upload size={13} />
                  </div>
                  <span>Disburse Application</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SYMMETRIC WORKSPACE GRID GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* CONTAINER 1: APPLICANT IDENTITY LEDGER */}
        <ApplicationCard title="Borrower Profile" icon={<User size={16} />}>
          <MetricItem
            icon={<User />}
            label="Full Name"
            value={application.applicant_name}
          />
          <MetricItem
            icon={<Smartphone />}
            label="Phone Number"
            value={application.applicant_mobile}
          />
          <MetricItem
            icon={<ShieldCheck />}
            label="Customer ID"
            value={application.customer_id}
          />
          <MetricItem
            icon={<Briefcase />}
            label="Branch Code"
            value={application.loan_org_code}
          />
          <div className="md:col-span-2 space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100 mt-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
              Reason for Loan
            </span>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              "{application.loan_purpose}"
            </p>
          </div>
        </ApplicationCard>

        {/* CONTAINER 2: REQUESTED FINANCIAL STRUCTURING */}
        <ApplicationCard title="Loan Details" icon={<DollarSign size={16} />}>
          <MetricItem
            icon={<DollarSign />}
            label="Amount Requested"
            value={`KES ${application.applied_amount}`}
          />
          <MetricItem
            icon={<Calendar />}
            label="Loan Duration"
            value={`${application.loan_period} Months (${application.duration_key})`}
          />
          <MetricItem
            icon={<Clock />}
            label="Payment Frequency"
            value={application.loan_interval}
          />
          <MetricItem
            icon={<Layers />}
            label="Application Channel"
            value={application.loan_channel}
          />
          <MetricItem
            icon={<FileText />}
            label="Loan Code"
            value={application.loan_code}
          />
          <MetricItem
            icon={<ShieldCheck />}
            label="Currency"
            value={application.currency || "KES"}
          />
        </ApplicationCard>

        {/* CONTAINER 3: ATTACHED PRODUCT BLUEPRINT */}
        <ApplicationCard title="Product Profile" icon={<Briefcase size={16} />}>
          <MetricItem
            icon={<Briefcase />}
            label="Product Name"
            value={application?.loan_product?.product_name}
          />
          <MetricItem
            icon={<Settings />}
            label="Product Code"
            value={application?.loan_product?.product_code}
          />
          <MetricItem
            icon={<Percent />}
            label="Interest Rate"
            value={`${parseFloat(application?.loan_product?.interest_rate)?.toFixed(2)}% p.m.`}
          />
          <MetricItem
            icon={<Settings />}
            label="Interest Calculation Method"
            value={application?.loan_product?.interest_method?.replace(
              "_",
              " ",
            )}
            isCapitalized
          />
          <MetricItem
            icon={<Users />}
            label="Required Committee Approvals"
            value={`${application?.loan_product?.committee_approvals_required} Votes Needed`}
          />
          <MetricItem
            icon={<Users />}
            label="Approvals Received"
            value={`${application?.committee_approvals_received} Votes Cast`}
          />
        </ApplicationCard>

        <ApplicationCard
          title="Guarantors & Co-signers"
          icon={<Users size={16} />}
        >
          <MetricItem
            icon={<ShieldCheck />}
            label="Guarantor Policy"
            value={
              application?.loan_product?.requires_guarantor
                ? "Required"
                : "Optional"
            }
          />
          <MetricItem
            icon={<Users />}
            label="Guarantor Count Limits"
            value={`Min: ${application.loan_product?.min_guarantors} / Max: ${application?.loan_product?.max_guarantors}`}
          />
          <MetricItem
            icon={<DollarSign />}
            label="Required for Amounts Above"
            value={`KES ${application?.loan_product?.guarantor_required_above_amount}`}
          />
          <MetricItem
            icon={<Percent />}
            label="Required Coverage"
            value={`${Number(application?.loan_product?.guarantor_coverage_percent ?? 0).toFixed(0)}%`}
          />

          {/* Active Co-Signers List Ledger */}
          <div className="md:col-span-2 space-y-3.5 border-t border-slate-100 pt-5 mt-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block pl-1">
              Assigned Guarantors
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {application?.guarantors?.map((g, i) => (
                <div
                  key={i}
                  className="border border-slate-200/60 p-4 rounded-xl flex items-center justify-between bg-slate-50/50"
                >
                  <div className="space-y-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 tracking-tight truncate">
                      {g.guarantor_name}
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                      {g.guarantor_mobile}
                    </p>
                    <p className="text-[11px] text-slate-500 font-medium pt-1">
                      Guaranteed:{" "}
                      <span className="font-bold text-slate-800">
                        KES {g.amount_guaranteed}
                      </span>
                    </p>
                  </div>
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md bg-success/5 border border-success/10 text-success shrink-0 ml-2">
                    {g.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ApplicationCard>

        {/* SECTION 2: REGISTERED COLLATERAL & CHATTELS */}
        <ApplicationCard
          title="Collateral & Security"
          icon={<ShieldAlert size={16} />}
        >
          <MetricItem
            icon={<ShieldCheck />}
            label="Collateral Requirement"
            value={
              application.requires_collateral
                ? "Asset Pledge Required"
                : "Not Required"
            }
          />
          <MetricItem
            icon={<DollarSign />}
            label="Total Asset Value"
            value={`KES ${application.collateral_value}`}
          />
          {application.requires_collateral && (
            <>
              <div className="md:col-span-2 space-y-1 bg-slate-50 p-4 rounded-xl border border-slate-100 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                  Accepted Security Types
                </span>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {application.collateral_description}
                </p>
              </div>
              <div className="md:col-span-2 space-y-3.5 border-t border-slate-100 pt-5 mt-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block pl-1">
                  Asset Valuation Details
                </span>
                <div className="space-y-3">
                  {application?.chattels?.map((c, i) => (
                    <div
                      key={i}
                      className="border border-slate-200/60 p-4 rounded-xl bg-slate-50/50 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center"
                    >
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                          Asset Type
                        </span>
                        <p className="text-xs font-bold text-slate-800 tracking-tight mt-0.5">
                          {c.type}
                        </p>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                          Description / Details
                        </span>
                        <p className="text-xs text-slate-500 font-medium mt-0.5 truncate">
                          {c.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <div className="sm:text-right">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
                            Valuation
                          </span>
                          <p className="text-xs font-bold text-primary tracking-tight mt-0.5">
                            KES {c.calculated_value}
                          </p>
                        </div>
                        <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md bg-primary/5 border border-primary/10 text-primary">
                          {c.validation}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </ApplicationCard>

        {/* SECTION 3: UNDERWRITING DOSSIER & DOCUMENTS */}
        <ApplicationCard
          title="Attached Documents"
          icon={<Paperclip size={16} />}
        >
          <div className="md:col-span-2 space-y-1 bg-slate-50 p-4 rounded-xl border border-slate-100 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
              Document Requirements
            </span>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Please make sure all files are clearly uploaded and verified
              before the application is passed on for final approval.
            </p>
          </div>

          {/* Document Attachment Rows */}
          <div className="md:col-span-2 space-y-3 Tri border-t border-slate-100 pt-5 mt-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block pl-1">
              Files Registry
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {application?.documents?.map((doc, i) => (
                <div
                  key={i}
                  className="border border-slate-200/60 p-3.5 rounded-xl flex items-center justify-between bg-white hover:border-primary/30 transition-all group shadow-2xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="size-8 bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-400 rounded-lg shrink-0 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                      <FileText size={14} />
                    </div>
                    <div className="min-w-0 space-y-0.5">
                      <p className="text-xs font-bold text-slate-800 truncate leading-tight">
                        {doc.name}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium truncate uppercase tracking-wide">
                        {doc.type}
                      </p>
                    </div>
                  </div>
                  <button
                    className="size-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-900 border border-slate-100 hover:bg-slate-50 cursor-pointer shrink-0 ml-2"
                    title={`Download ${doc.name}`}
                  >
                    <DownloadCloud size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </ApplicationCard>

        {/* CONTAINER 5: GOVERNANCE STAGE WORKFLOW */}
        <ApplicationCard title="Review Progress" icon={<Layers size={16} />}>
          <MetricItem
            icon={<Layers />}
            label="Current Review Stage"
            value={application.current_stage_label}
          />
          <MetricItem
            icon={<Settings />}
            label="Workflow Rule"
            value="Joint Committee & Manager Sign-off"
          />
          <div className="md:col-span-2 space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100 mt-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
              Committee Voting Status
            </span>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
              <span>Voting Progress</span>
              <span className="font-bold text-slate-900">
                {application?.committee_approvals_received} /{" "}
                {application?.loan_product?.committee_approvals_required} Votes
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-300"
                style={{
                  width: `${(application?.committee_approvals_received / application?.loan_product?.committee_approvals_required) * 100}%`,
                }}
              />
            </div>
          </div>
        </ApplicationCard>

        {/* CONTAINER 6: CHRONOLOGICAL STAGE AUDIT LOGS */}
        <ApplicationCard
          title="Disbursement Payout Details"
          icon={<ArrowDownCircle size={16} className="text-slate-500" />}
          className="col-span-full" /* Tells the main page layout to make the card wide */
        >
          {/* FIX: col-span-full tells the card's inner grid to let this container take up the whole row */}
          <div className="col-span-full flex flex-col gap-5 w-full">
            {/* 1. STATUS ALERT BANNER (Handles Failed State Warmly) */}

            {/* 2. CORE FINANCIAL BREAKDOWN LOGIC */}
            <div className="bg-slate-50/50 border border-slate-200/50 rounded-2xl p-4 space-y-3 w-full">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                Financial Breakdown
              </span>

              <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
                <span>Approved Gross Amount</span>
                <span className="font-semibold text-slate-800">
                  KES{" "}
                  {Number(
                    application?.disbursement?.gross_amount,
                  ).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  Processing Fee{" "}
                  <span className="text-[10px] text-slate-400 font-normal">
                    (Deducted)
                  </span>
                </span>
                <span className="font-semibold text-rose-600">
                  - KES{" "}
                  {Number(
                    application?.disbursement?.processing_fee_deducted,
                  ).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs text-slate-500 font-medium pb-2 border-b border-slate-200/40">
                <span className="flex items-center gap-1">
                  Insurance Cover{" "}
                  <span className="text-[10px] text-slate-400 font-normal">
                    (Deducted)
                  </span>
                </span>
                <span className="font-semibold text-rose-600">
                  - KES{" "}
                  {Number(
                    application?.disbursement?.insurance_deducted,
                  ).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between items-center pt-1">
                <span className="text-xs font-bold text-slate-900">
                  Final Net Payout
                </span>
                <span className="text-sm font-black text-emerald-600 font-mono">
                  KES{" "}
                  {Number(application?.disbursement?.net_amount).toLocaleString(
                    undefined,
                    {
                      minimumFractionDigits: 2,
                    },
                  )}
                </span>
              </div>
            </div>

            {/* 3. DESTINATION & SYSTEM ATTRIBUTION TARGETS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs w-full">
              {/* Target Destination Profile Container */}
              <div className="space-y-2.5">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                  Recipient Destination
                </span>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                    {application?.disbursement?.method === "MPESA" ? (
                      <Smartphone size={13} className="text-slate-400" />
                    ) : (
                      <Building size={13} className="text-slate-400" />
                    )}
                    <span className="uppercase font-bold text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                      {application?.disbursement?.method}
                    </span>
                    <span className="font-mono text-xs">
                      {application?.disbursement?.recipient_phone}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium pl-1">
                    {application?.disbursement?.bank_name} •{" "}
                    {application?.disbursement?.bank_branch} <br />
                    Acc: {application?.disbursement?.bank_account_number}
                  </p>
                </div>
              </div>

              {/* System Audit attribution information logs */}
              <div className="space-y-2.5 md:border-l md:border-slate-100 md:pl-4">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                  Audit Attribution
                </span>
                <div className="space-y-1 text-slate-500 font-medium">
                  <p className="flex items-center gap-1">
                    Ref:{" "}
                    <span className="font-mono font-bold text-slate-800 uppercase">
                      {application?.disbursement?.transaction_ref || "—"}
                    </span>
                  </p>
                  <p>
                    Initiated By:{" "}
                    <span className="font-semibold text-slate-700">
                      {application?.disbursement?.disbursed_by_name}
                    </span>
                  </p>
                  <p className="text-[10px] text-slate-400">
                    On:{" "}
                    {new Date(
                      application?.disbursement?.initiated_at,
                    ).toLocaleString("en-KE", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ApplicationCard>
      </div>
    </div>
  );
}

const ApplicationCard = ({ title, icon, children }) => (
  <div className="bg-white border border-slate-200/60 shadow-sm rounded-[24px] overflow-hidden w-full h-full">
    <div className="px-5 py-4 bg-slate-50/60 border-b border-slate-100 flex items-center gap-2.5 select-none">
      <div className="size-7 rounded-lg bg-white border border-slate-200/60 flex items-center justify-center text-slate-400 shadow-2xs">
        {icon}
      </div>
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
        {title}
      </h3>
    </div>
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
      {children}
    </div>
  </div>
);

const MetricItem = ({ icon, label, value, isCapitalized = false }) => (
  <div className="flex items-start gap-3 min-w-0">
    <div className="size-8 rounded-xl bg-slate-50 border border-slate-200/40 flex items-center justify-center text-slate-400 shrink-0 shadow-2xs mt-0.5">
      {React.cloneElement(icon, { size: 15 })}
    </div>
    <div className="min-w-0 flex flex-col space-y-1.5">
      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 leading-normal">
        {label}
      </span>
      <span
        className={`text-sm font-medium text-slate-800 tracking-tight leading-normal truncate ${isCapitalized ? "capitalize" : ""}`}
      >
        {value}
      </span>
    </div>
  </div>
);
