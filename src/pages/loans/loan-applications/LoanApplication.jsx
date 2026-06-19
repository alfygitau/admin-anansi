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
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoanApplication() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Close the drop panel if an underwriter clicks outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Populated directly from your core application JSON schema configuration
  const [application] = useState({
    id: "b0d1b573-e491-403b-b2e8-4daa7633ecc3",
    application_number: "APP-00002",
    loan_id: null,
    loan_code: "L00002",
    customer_id: "a8426991-3061-d0e7-7fd6-019456264e89",
    member_snapshot_id: "22039766-0978-4981-bf32-e5ed39531d2c",
    loan_org_code: "BA208",

    applicant_name: "ALMASI ALUOCH",
    applicant_mobile: "+254765350350",

    loan_type: "Development_loan",
    applied_amount: "60,000.00",
    loan_period: 8,
    duration_key: "pm",
    loan_interval: "Monthly",
    loan_channel: "WEB",
    currency: "KES",
    loan_mode: 1,
    loan_purpose: "I would like to buy a car",

    approved_amount: null,
    approved_period: null,

    eligibility_passed: true,
    eligibility_result: {
      limit: "110,005.00",
      passed: true,
      total_shares: "22,001.00",
      total_savings: "250,201.00",
      limit_algorithm: "fixed",
      limit_was_reset: false,
      blocking_reasons: [],
      cleared_loan_count: 0,
      current_multiplier: null,
    },

    status: "pending_credit_committee",
    status_label: "Pending Credit Committee",
    current_stage_label: "Credit Committee",
    committee_approvals_required: 3,
    committee_approvals_received: 2,
    committee_rejections_received: 0,

    applicant_notes: null,
    admin_notes: null,

    requires_collateral: false,
    collateral_type: null,
    collateral_description:
      "Logbook, title deed, or other acceptable collateral",
    collateral_value: "0.00",
    chattels: [
      {
        type: "Motor Vehicle Logbook",
        description: "Toyota Vanguard KDG 123X",
        calculated_value: "1,500,000.00",
        validation: "Verified",
      },
    ],

    requires_guarantor: true,
    min_guarantors: 2,
    max_guarantors: 4,
    guarantor_required_above_amount: "0.00",
    guarantor_coverage_percent: "100.0000",
    guarantors: [
      {
        name: "ALFRED KARIUKI GITAU",
        mobile: "+254711223344",
        coverage_amount: "30,000.00",
        status: "Approved",
      },
      {
        name: "IAN NJAGAH NDUNGU",
        mobile: "+254722556677",
        coverage_amount: "30,000.00",
        status: "Approved",
      },
    ],

    documents: [
      {
        name: "National_ID_Pass.pdf",
        type: "Identification",
        size: "2.4 MB",
        uploaded_at: "2026-06-13",
      },
      {
        name: "Bank_Statement_3MA.xlsx",
        type: "Financial Record",
        size: "4.1 MB",
        uploaded_at: "2026-06-13",
      },
      {
        name: "Sacco_Shares_Ledger.pdf",
        type: "Equity Verification",
        size: "1.8 MB",
        uploaded_at: "2026-06-13",
      },
    ],

    application_date: "2026-06-13",
    submitted_at: "2026-06-13T11:05:54.148Z",
    terms_accepted_at: "2026-06-13T11:29:31.520Z",
    requested_disbursement_date: null,
    approved_at: null,
    rejected_at: null,
    disbursed_at: null,
    created_at: "2026-06-13T11:05:54.150Z",
    updated_at: "2026-06-15T08:05:26.191Z",

    disbursement: null,

    is_imported: false,
    legacy_data: null,

    product: {
      id: "c2e4e26e-5071-4eb0-ab89-26732c208ece",
      product_code: "Development_loan",
      product_name: "Development Loan",
      description:
        "Long-term development loan requiring full credit committee review",
      features: null,
      terms_and_conditions: null,
      is_active: true,
      org_code: "BA208",
      loan_mode: 1,
      min_amount: "50000.00",
      max_amount: "5000000.00",
      min_period: 6,
      max_period: 60,
      limit_algorithm: "fixed",
      limit_start_amount: "0.00",
      limit_increment_amount: "0.00",
      limit_start_multiplier: "1.5000",
      limit_increment_multiplier: "0.5000",
      limit_max_multiplier: "3.0000",
      limit_multiplier_basis: "savings",
      limit_resets_on_default: true,
      interest_rate: "1.5000",
      interest_key: "pm",
      interest_method: "reducing_balance",
      repayment_interval: "Monthly",
      duration_key: "pm",
      processing_fee_type: "percentage",
      processing_fee_value: "1.0000",
      deduct_fee_from_principal: true,
      has_insurance: true,
      insurance_rate: "0.5000",
      has_penalty: true,
      penalty_type: "percentage_of_outstanding",
      penalty_value: "5.0000",
      penalty_frequency: "monthly",
      grace_period_days: 30,
      penalty_cap_days: 0,
      max_penalty_rate: "20.0000",
      workflow_type: "committee_and_manager",
      auto_disburse: false,
      committee_group_id: "credit-committee-group-uuid",
      allowed_disbursement_methods: ["MPESA", "BANK"],
      min_membership_months: 6,
      min_shares_amount: "10000.00",
      min_savings_amount: "20000.00",
      max_loan_to_shares_ratio: "5.0000",
      max_loan_to_savings_ratio: "0.0000",
      max_active_loans_of_type: 1,
      max_total_active_loans: 2,
      blocked_concurrent_loan_types: ["Development_loan"],
      allowed_concurrent_loan_types: [],
      block_if_defaulted: true,
      min_repayment_percent_before_reapply: "100.0000",
      block_if_guarantor_on_defaulted: true,
      required_kyc_level: 1,
      allows_rollover: false,
      allows_topup: true,
      min_repayment_percent_for_topup: "50.0000",
      moratorium_months: 0,
      moratorium_interest_handling: "interest_only",
      penalty_grace_period_days: 0,
      allowed_currencies: ["KES"],
    },

    stage_history: [
      {
        stage: "eligibility",
        status: "passed",
        note: "Automated checks and basic member parameters verified successfully.",
        actor: "system",
        actor_name: "System",
        timestamp: "2026-06-13T11:05:54.148Z",
      },
      {
        stage: "guarantor",
        status: "pending_guarantor",
        note: "Guarantor requests sent out and awaiting confirmation.",
        actor: "system",
        actor_name: "System",
        timestamp: "2026-06-13T11:29:15.412Z",
      },
      {
        stage: "guarantor",
        status: "guarantor_approved",
        note: "All selected guarantors have signed off. Total amount covered: KES 60,000.",
        actor: "a8e19467-5a87-a9b2-605a-68c46ae5b8fe",
        actor_name: "IAN NJAGAH NDUNGU",
        timestamp: "2026-06-14T19:24:08.269Z",
      },
      {
        stage: "credit_committee",
        status: "pending_credit_committee",
        note: "Forwarded to the credit committee for review and voting tabs.",
        actor: "system",
        actor_name: "System",
        timestamp: "2026-06-14T19:24:08.269Z",
      },
    ],
  });

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
            value={application.product.product_name}
          />
          <MetricItem
            icon={<Settings />}
            label="Product Code"
            value={application.product.product_code}
          />
          <MetricItem
            icon={<Percent />}
            label="Interest Rate"
            value={`${parseFloat(application.product.interest_rate).toFixed(2)}% p.m.`}
          />
          <MetricItem
            icon={<Settings />}
            label="Interest Calculation Method"
            value={application.product.interest_method.replace("_", " ")}
            isCapitalized
          />
          <MetricItem
            icon={<Users />}
            label="Required Committee Approvals"
            value={`${application.committee_approvals_required} Votes Needed`}
          />
          <MetricItem
            icon={<Users />}
            label="Approvals Received"
            value={`${application.committee_approvals_received} Votes Cast`}
          />
        </ApplicationCard>

        <ApplicationCard
          title="Guarantors & Co-signers"
          icon={<Users size={16} />}
        >
          <MetricItem
            icon={<ShieldCheck />}
            label="Guarantor Policy"
            value={application.requires_guarantor ? "Required" : "Optional"}
          />
          <MetricItem
            icon={<Users />}
            label="Guarantor Count Limits"
            value={`Min: ${application.min_guarantors} / Max: ${application.max_guarantors}`}
          />
          <MetricItem
            icon={<DollarSign />}
            label="Required for Amounts Above"
            value={`KES ${application.guarantor_required_above_amount}`}
          />
          <MetricItem
            icon={<Percent />}
            label="Required Coverage"
            value={`${application.guarantor_coverage_percent}%`}
          />

          {/* Active Co-Signers List Ledger */}
          <div className="md:col-span-2 space-y-3.5 border-t border-slate-100 pt-5 mt-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block pl-1">
              Assigned Guarantors
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {application.guarantors.map((g, i) => (
                <div
                  key={i}
                  className="border border-slate-200/60 p-4 rounded-xl flex items-center justify-between bg-slate-50/50"
                >
                  <div className="space-y-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 tracking-tight truncate">
                      {g.name}
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                      {g.mobile}
                    </p>
                    <p className="text-[11px] text-slate-500 font-medium pt-1">
                      Guaranteed:{" "}
                      <span className="font-bold text-slate-800">
                        KES {g.coverage_amount}
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
          <div className="md:col-span-2 space-y-1 bg-slate-50 p-4 rounded-xl border border-slate-100 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
              Accepted Security Types
            </span>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              {application.collateral_description}
            </p>
          </div>

          {/* Physical Asset Valuation Registry Ledger */}
          <div className="md:col-span-2 space-y-3.5 border-t border-slate-100 pt-5 mt-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block pl-1">
              Asset Valuation Details
            </span>
            <div className="space-y-3">
              {application.chattels.map((c, i) => (
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
              {application.documents.map((doc, i) => (
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
                {application.committee_approvals_received} /{" "}
                {application.product.committee_approvals_required} Votes
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-300"
                style={{
                  width: `${(application.committee_approvals_received / application.product.committee_approvals_required) * 100}%`,
                }}
              />
            </div>
          </div>
        </ApplicationCard>

        {/* CONTAINER 6: CHRONOLOGICAL STAGE AUDIT LOGS */}
        <ApplicationCard
          title="Application Timeline"
          icon={<History size={16} />}
        >
          <div className="md:col-span-2 space-y-4 max-h-[295px] overflow-y-auto pr-1">
            {application.stage_history.map((log, index) => (
              <div
                key={index}
                className="flex gap-3 items-start border-l-2 border-slate-100 pl-4 relative ml-2 first:border-primary/30"
              >
                <div
                  className={`absolute -left-1.5 top-1.5 size-2.5 rounded-full border border-white ${
                    log.status === "pending" ? "bg-warning" : "bg-primary"
                  }`}
                />
                <div className="flex-grow space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                      Stage: {log.stage.replace("_", " ")}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {log.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    {log.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ApplicationCard>
      </div>
    </div>
  );
}

/* ==========================================================================
   SUPPORTIVE CHILD UTILITY TEMPLATE HOOKS
   ========================================================================== */

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
