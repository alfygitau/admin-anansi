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
  HelpCircle,
  UserCheck,
  Cpu,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getApplication } from "../../../sdk/loan-applications/loan-applications";
import { useToast } from "../../../contexts/ToastProvider";
import ApplicationLoader from "../../../skeletons/ApplicationLoader";

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

  const handleManagerApproval = () => {
    navigate(`/admin/loan-applications/${application?.id}/manager-approval`);
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

  // Dynamic Status Badge Mapping
  const getStatusConfig = (status) => {
    const raw = String(status).toLowerCase();
    if (
      raw.includes("approve") ||
      raw.includes("post") ||
      raw.includes("success")
    ) {
      return "bg-emerald-50/80 border-emerald-100 text-emerald-700 font-bold";
    }
    if (
      raw.includes("fail") ||
      raw.includes("cancel") ||
      raw.includes("reject")
    ) {
      return "bg-rose-50/80 border-rose-100 text-rose-700 font-bold";
    }
    return "bg-amber-50/80 border-amber-100 text-amber-700 font-bold";
  };

  const getStatusStyles = (status) => {
    const currentStatus = (status || "Verified").toLowerCase();

    switch (currentStatus) {
      case "approved":
      case "active":
      case "excellent":
      case "good standing":
        return "bg-emerald-50 border-emerald-100 text-emerald-700";
      case "pending":
      case "conditional":
      case "review":
        return "bg-amber-50 border-amber-100 text-amber-700";
      case "rejected":
      case "failed":
      case "inactive":
        return "bg-rose-50 border-rose-100 text-rose-700";
      default:
        return "bg-slate-50 border-slate-200 text-slate-600";
    }
  };

  return (
    <div className="w-full space-y-4 antialiased text-slate-800 bg-slate-50/30 p-1 rounded-3xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200/70 pb-6 select-none">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="size-11 rounded-2xl border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-3xs cursor-pointer active:scale-95"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono font-black text-[10px] tracking-wider uppercase px-2.5 py-1 bg-slate-900 text-white rounded-lg shadow-sm">
                {application.application_number || "REQ-CODE"}
              </span>
              <span
                className={`text-[10px] tracking-wide uppercase px-3 py-1 border rounded-full inline-flex items-center gap-1.5 shadow-3xs ${getStatusConfig(application.status_label)}`}
              >
                <span className="size-1.5 rounded-full bg-current animate-pulse" />
                {application.status_label || "In Review"}
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1.5">
              {application.loan_product?.product_name}
            </h1>
          </div>
        </div>

        {/* INTERACTIVE ACTION DROPDOWN DECK CONTAINER */}
        <div className="relative shrink-0" ref={menuRef}>
          {/* MASTER INTERACTIVE TRIGGER BUTTON */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`h-11 px-5 whitespace-nowrap border rounded-2xl font-sans text-xs font-black uppercase tracking-wider transition-all flex items-center justify-between gap-3 cursor-pointer shadow-3xs active:scale-98 w-full md:w-60 ${
              isMenuOpen
                ? "border-[#074073] bg-[#074073]/5 text-[#074073]"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900"
            }`}
          >
            <div className="flex items-center gap-3">
              <Sliders
                size={14}
                className={
                  isMenuOpen
                    ? "rotate-90 transition-transform"
                    : "transition-transform"
                }
              />
              <span>Manage Application</span>
            </div>
            <ChevronDown
              size={14}
              className={`transition-transform duration-300 ${isMenuOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* OVERLAY DECK MATCHING TRIGGER WIDTH */}
          {isMenuOpen &&
            (() => {
              // 1. Normalize the status label string for safe evaluation
              const status = String(
                application?.status_label || "",
              ).toLowerCase();

              // 2. Define workflow state machine flags
              const isApproved = status.includes("approve");
              const isDisbursed =
                status.includes("disburse") ||
                status.includes("paid") ||
                status.includes("success");
              const isCancelled =
                status.includes("cancel") ||
                status.includes("reject") ||
                status.includes("fail");
              const isPending = !isApproved && !isDisbursed && !isCancelled;

              // 3. Determine action permissions
              const canCancel = isPending;
              const canApprove = isPending;
              const canDisburse = isApproved && !isDisbursed;

              return (
                <div className="absolute left-0 right-0 mt-2.5 bg-white border border-slate-200/90 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 w-full">
                  <div className="space-y-0.5">
                    {/* ALWAYS AVAILABLE: NOTIFY APPLICANT */}
                    <button
                      type="button"
                      onClick={() => {
                        handleSendNotification();
                        setIsMenuOpen(false);
                      }}
                      className="w-full h-10 px-3 rounded-xl flex items-center gap-3 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors text-left cursor-pointer group"
                    >
                      <div className="size-6.5 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors shrink-0">
                        <Bell size={13} />
                      </div>
                      <span className="truncate">Notify Applicant</span>
                    </button>

                    {/* CONDITIONAL: CANCEL APPLICATION (Only visible when loan file is pending review) */}
                    {canCancel && (
                      <button
                        type="button"
                        onClick={() => {
                          handleCancel();
                          setIsMenuOpen(false);
                        }}
                        className="w-full h-10 px-3 rounded-xl flex items-center gap-3 text-xs font-bold text-slate-600 hover:text-rose-700 hover:bg-rose-50/50 transition-colors text-left cursor-pointer group"
                      >
                        <div className="size-6.5 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-400 group-hover:text-rose-600 group-hover:bg-rose-50 group-hover:border-rose-100 transition-colors shrink-0">
                          <X size={13} />
                        </div>
                        <span className="truncate">Cancel Application</span>
                      </button>
                    )}

                    {/* CONDITIONAL DIVIDER: Only renders if a primary workflow modification is actionable below it */}
                    {(canApprove || canDisburse) && (
                      <div className="border-t border-slate-100 my-1.5 pt-1" />
                    )}

                    {/* CONDITIONAL: APPROVE & SIGN OFF (Only visible when loan file is pending review) */}
                    {canApprove && (
                      <button
                        type="button"
                        onClick={() => {
                          handleApprove();
                          setIsMenuOpen(false);
                        }}
                        className="w-full h-10 px-3 rounded-xl flex items-center gap-3 text-xs font-black text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/60 transition-colors text-left cursor-pointer group"
                      >
                        <div className="size-6.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center transition-colors shadow-3xs shrink-0">
                          <Check size={13} strokeWidth={3} />
                        </div>
                        <span className="truncate">Approve & Sign Off</span>
                      </button>
                    )}

                    {canApprove && (
                      <button
                        type="button"
                        onClick={() => {
                          handleManagerApproval();
                          setIsMenuOpen(false);
                        }}
                        className="w-full h-10 px-3 rounded-xl flex items-center gap-3 text-xs font-black text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/60 transition-colors text-left cursor-pointer group"
                      >
                        <div className="size-6.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center transition-colors shadow-3xs shrink-0">
                          <Check size={13} strokeWidth={3} />
                        </div>
                        <span className="truncate">
                          Manager Approval & Sign Off
                        </span>
                      </button>
                    )}

                    {/* CONDITIONAL: RELEASE FUNDS (Only visible after file is approved, hides completely once disbursed) */}
                    {canDisburse && (
                      <button
                        type="button"
                        onClick={() => {
                          handleDisburse();
                          setIsMenuOpen(false);
                        }}
                        className="w-full h-10 px-3 rounded-xl flex items-center gap-3 text-xs font-black text-slate-700 hover:text-blue-700 hover:bg-blue-50/60 transition-colors text-left cursor-pointer group"
                      >
                        <div className="size-6.5 rounded-lg bg-blue-600 text-white border border-blue-700 flex items-center justify-center transition-colors shadow-3xs shrink-0">
                          <Upload size={13} strokeWidth={2.5} />
                        </div>
                        <span className="truncate">Release Funds</span>
                      </button>
                    )}

                    {/* FALLBACK INFO: If no administrative actions can be taken on a finalized state */}
                    {!canCancel && !canApprove && !canDisburse && (
                      <div className="px-3 py-2 text-center select-none bg-slate-50 border border-slate-100 rounded-xl mt-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                          File Closed
                        </p>
                        <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                          No processing actions are available for this
                          application state.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
        </div>
      </div>

      {/* 2. SYMMETRIC CORE WORKSPACE LAYOUT CONTAINER */}
      {isFetching ? (
        <ApplicationLoader />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* CARD 1: BORROWER INDEPENDENT LEDGER */}
          <ApplicationCard title="Borrower Profile" icon={<User size={15} />}>
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
              icon={<Briefcase />}
              label="Sacco Branch Code"
              value={application.loan_org_code}
            />
            <div className="md:col-span-2 space-y-2 bg-slate-50/70 p-4 rounded-2xl border border-slate-200/50 mt-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                Purpose Statement
              </span>
              <p className="text-xs text-slate-600 font-medium leading-relaxed italic">
                "
                {application.loan_purpose ||
                  "No specific purpose parameters declared inside application files."}
                "
              </p>
            </div>
          </ApplicationCard>

          {/* CARD 2: FINANCIAL REQUEST STRUCTURING FRAME */}
          <ApplicationCard title="Loan Details" icon={<DollarSign size={15} />}>
            <MetricItem
              icon={<DollarSign />}
              label="Amount Requested"
              value={
                application.applied_amount
                  ? `KES ${Number(application.applied_amount).toLocaleString()}`
                  : "—"
              }
              isCrypto
            />
            <MetricItem
              icon={<Calendar />}
              label="Loan Amortization Term"
              value={`${application.loan_period || 0} Months`}
            />
            <MetricItem
              icon={<Clock />}
              label="Payment Interval Loop"
              value={application.loan_interval}
              isCapitalized
            />
            <MetricItem
              icon={<Layers />}
              label="Origination Channel"
              value={application.loan_channel}
            />
            <MetricItem
              icon={<FileText />}
              label="System Token Code"
              value={application.loan_code}
            />
            <MetricItem
              icon={<ShieldCheck />}
              label="Settlement Currency"
              value={application.currency || "KES"}
            />
          </ApplicationCard>

          {/* CARD 3: ATTACHED PRODUCT CONFIGURATION MATRIX */}
          {/* CARD 3: ATTACHED PRODUCT CONFIGURATION MATRIX */}
          <ApplicationCard
            title="Product Details"
            icon={<Briefcase size={15} />}
          >
            {/* Core Catalog Identifiers */}
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

            {/* Threshold Limitations */}
            <MetricItem
              icon={<DollarSign />}
              label="Allowed Amount Bounds"
              value={
                application?.loan_product?.min_amount
                  ? `KES ${Number(application.loan_product.min_amount).toLocaleString()} - KES ${Number(application.loan_product.max_amount).toLocaleString()}`
                  : "—"
              }
            />
            <MetricItem
              icon={<Calendar />}
              label="Allowed Term Range"
              value={
                application?.loan_product?.min_period
                  ? `${application.loan_product.min_period} to ${application.loan_product.max_period} Months`
                  : "—"
              }
            />

            {/* Interest Model Framework */}
            <MetricItem
              icon={<Percent />}
              label="Assigned Interest Rate"
              value={
                application?.loan_product?.interest_rate
                  ? `${parseFloat(application.loan_product.interest_rate).toFixed(2)}% p.m.`
                  : "—"
              }
            />
            <MetricItem
              icon={<Layers />}
              label="Interest Accrual Method"
              value={application?.loan_product?.interest_method?.replace(
                /_/g,
                " ",
              )}
              isCapitalized
            />

            <MetricItem
              icon={<ShieldCheck />}
              label="Fee Deduction Strategy"
              value={
                application?.loan_product?.deduct_fee_from_principal !==
                undefined
                  ? application.loan_product.deduct_fee_from_principal
                    ? "Withheld From Principal"
                    : "Paid Out Of Pocket"
                  : "—"
              }
            />

            {/* Security & Risk Backing Requirements */}
            <MetricItem
              icon={<Users />}
              label="Guarantor Requirement"
              value={
                application?.loan_product?.requires_guarantor !== undefined
                  ? application.loan_product.requires_guarantor
                    ? `Required (Min: ${application.loan_product.min_guarantors || 0})`
                    : "Optional / Not Required"
                  : "—"
              }
            />
            <MetricItem
              icon={<ShieldAlert />}
              label="Collateral Requirement"
              value={
                application?.loan_product?.requires_collateral !== undefined
                  ? application.loan_product.requires_collateral
                    ? "Asset Pledge Required"
                    : "Unsecured / No Pledge"
                  : "—"
              }
            />
          </ApplicationCard>

          {/* CARD 4: CO-SIGNER TRUST MATRIX PORTFOLIO */}
          <ApplicationCard
            title="Guarantors & Co-signers"
            icon={<Users size={15} />}
          >
            {!application?.loan_product?.requires_guarantor ? (
              /* 1. FULL CARD EXEMPTION EMPTY STATE (Centers perfectly with no other elements) */
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center select-none">
                <div className="size-12 bg-emerald-50/60 border border-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-4 shadow-3xs">
                  <ShieldCheck size={20} strokeWidth={2.5} />
                </div>
                <h4 className="text-xs font-black text-slate-700 uppercase tracking-wide">
                  No Guarantors Needed
                </h4>
                <p className="text-xs text-slate-400 font-medium max-w-xs mx-auto mt-2 leading-relaxed">
                  This loan choice is completely unsecured! The borrower doesn't
                  need to look for or link any peer co-signers to back this
                  file.
                </p>
              </div>
            ) : (
              <div className="md:col-span-2 space-y-3.5 pt-2 w-full">
                {application?.guarantors &&
                application.guarantors.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {application.guarantors.map((g, i) => (
                      <div
                        key={i}
                        className="border border-slate-200/70 p-4 rounded-2xl flex items-center justify-between bg-white hover:border-slate-300 transition-all shadow-3xs"
                      >
                        <div className="space-y-1 min-w-0">
                          <p className="text-xs font-black text-slate-900 tracking-tight truncate">
                            {g.guarantor_name}
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono tracking-wide">
                            {g.guarantor_mobile}
                          </p>
                          <p className="text-[11px] text-slate-500 font-medium pt-1">
                            Coverage:{" "}
                            <span className="font-bold text-slate-800 font-mono">
                              KES{" "}
                              {Number(
                                g.amount_guaranteed || 0,
                              ).toLocaleString()}
                            </span>
                          </p>
                        </div>
                        <span
                          className={`text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md border shrink-0 ml-2 transition-colors duration-150 ${getStatusStyles(g.status)}`}
                        >
                          {g.status || "Verified"}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border border-dashed border-slate-200 p-6 rounded-2xl bg-slate-50/40 text-center select-none">
                    <p className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                      Waiting for Co-Signers
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium mt-1">
                      Guarantors are required for this loan type, but none have
                      been added or linked to this file yet.
                    </p>
                  </div>
                )}
              </div>
            )}
          </ApplicationCard>

          {/* CARD 5: PHYSICAL SECURITY & CHATTEL LEDGER */}
          <ApplicationCard
            title="Collateral & Security Assets"
            icon={<ShieldAlert size={15} />}
          >
            {!application.requires_collateral ? (
              /* 1. FULL CARD EXEMPTION EMPTY STATE (Centers perfectly with no other elements) */
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center select-none">
                <div className="size-12 bg-blue-50/60 border border-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4 shadow-3xs">
                  <ShieldCheck size={20} strokeWidth={2.5} />
                </div>
                <h4 className="text-xs font-black text-slate-700 uppercase tracking-wide">
                  No Collateral Needed
                </h4>
                <p className="text-xs text-slate-400 font-medium max-w-xs mx-auto mt-2 leading-relaxed">
                  This loan setup doesn't require any physical assets, car
                  logbooks, or land title deeds as backup security. It's
                  completely unsecured!
                </p>
              </div>
            ) : (
              /* 2. STANDARD RUNTIME GRID LAYOUT (Only loads if security assets are required) */
              <>
                <MetricItem
                  icon={<ShieldCheck />}
                  label="Risk Guarantee Rule"
                  value="Asset Pledge Required"
                />
                <MetricItem
                  icon={<DollarSign />}
                  label="Combined Evaluated Worth"
                  value={`KES ${Number(application.collateral_value || 0).toLocaleString()}`}
                  isCrypto
                />

                <div className="md:col-span-2 w-full space-y-4 mt-1">
                  {/* Accepted asset types brief note */}
                  <div className="space-y-1.5 bg-slate-50/70 p-4 rounded-2xl border border-slate-200/50">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                      Accepted Protection Templates
                    </span>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {application.collateral_description ||
                        "Verifiable logbooks, land registries, or title files."}
                    </p>
                  </div>

                  {/* Asset list tracking registry section */}
                  <div className="space-y-3.5 border-t border-slate-100 pt-4">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block pl-0.5">
                      Asset Registry Evaluations
                    </span>

                    {application?.chattels &&
                    application.chattels.length > 0 ? (
                      <div className="space-y-2.5">
                        {application.chattels.map((c, i) => (
                          <div
                            key={i}
                            className="border border-slate-200/70 p-4 rounded-2xl bg-white grid grid-cols-1 sm:grid-cols-3 gap-4 items-center shadow-3xs"
                          >
                            <div>
                              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                                Security Asset Class
                              </span>
                              <p className="text-xs font-black text-slate-800 mt-0.5">
                                {c.type}
                              </p>
                            </div>
                            <div>
                              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                                Escrow Folder Memo
                              </span>
                              <p className="text-xs text-slate-500 font-medium mt-0.5 truncate">
                                {c.description}
                              </p>
                            </div>
                            <div className="flex items-center justify-between sm:justify-end gap-4">
                              <div className="sm:text-right">
                                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
                                  Certified Value
                                </span>
                                <p className="text-xs font-mono font-black text-[#074073] mt-0.5">
                                  KES{" "}
                                  {Number(
                                    c.calculated_value || 0,
                                  ).toLocaleString()}
                                </p>
                              </div>
                              <span className="text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md bg-blue-50 border border-blue-100 text-blue-600">
                                {c.validation || "Cleared"}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      /* REQUIRED BUT ASSETS NOT LOGGED YET STATE */
                      <div className="border border-dashed border-rose-200 p-6 rounded-2xl bg-rose-50/20 text-center select-none">
                        <p className="text-xs font-bold text-rose-700 uppercase tracking-wide">
                          Assets Pending Check
                        </p>
                        <p className="text-[11px] text-rose-600/80 font-medium mt-1">
                          Collateral security is mandatory for this loan, but no
                          specific assets have been logged or evaluated by our
                          team yet.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </ApplicationCard>

          {/* CARD 6: UNDERWRITING DOCUMENT COMPLIANCE VAULT */}
          <ApplicationCard
            title="Compliance Files Vault"
            icon={<Paperclip size={15} />}
          >
            {!application?.documents || application.documents.length === 0 ? (
              /* 1. FULL CARD EXEMPTION EMPTY STATE (Centers perfectly with nothing else on the card) */
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center select-none">
                <div className="size-12 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 mb-4 shadow-3xs">
                  <Paperclip size={20} strokeWidth={2.5} />
                </div>
                <h4 className="text-xs font-black text-slate-700 uppercase tracking-wide">
                  No Documents Attached
                </h4>
                <p className="text-xs text-slate-400 font-medium max-w-xs mx-auto mt-2 leading-relaxed">
                  This files folder is completely empty! No pay slips, bank
                  statements, or identity verification files have been uploaded
                  for this loan yet.
                </p>
              </div>
            ) : (
              /* 2. STANDARD RUNTIME GRID LAYOUT (Only loads if files exist) */
              <>
                <div className="md:col-span-2 space-y-1.5 bg-slate-50/70 p-4 rounded-2xl border border-slate-200/50 mb-1">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                    Dossier Quality Assurance
                  </span>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    Ensure KYC document logs, physical bank records, and company
                    statements match structural forms before triggering a pool
                    vote.
                  </p>
                </div>

                <div className="md:col-span-2 space-y-3 border-t border-slate-100 pt-4 w-full">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block pl-0.5">
                    Files Matrix Registry
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {application.documents.map((doc, i) => (
                      <div
                        key={i}
                        className="border border-slate-200/70 p-3 rounded-2xl flex items-center justify-between bg-white hover:border-slate-300 transition-all group shadow-3xs"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="size-8.5 bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-400 rounded-xl group-hover:text-[#074073] group-hover:bg-[#074073]/5 group-hover:border-[#074073]/10 transition-colors shrink-0">
                            <FileText size={14} />
                          </div>
                          <div className="min-w-0 space-y-0.5">
                            <p className="text-xs font-bold text-slate-800 truncate leading-tight">
                              {doc.name}
                            </p>
                            <p className="text-[10px] text-slate-400 font-mono tracking-wide uppercase">
                              {doc.type || "PDF"}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="size-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-900 border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer shrink-0 ml-2 transition-all shadow-3xs active:scale-90"
                          title={`Download ${doc.name}`}
                        >
                          <DownloadCloud size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </ApplicationCard>

          {/* CARD 7: SYSTEM CLEARANCE GOVERNANCE COMPONENT */}
          <ApplicationCard
            title="Review & Governance Flow"
            icon={<Layers size={15} />}
          >
            {!application?.loan_product?.committee_approvals_required ||
            application?.loan_product?.committee_approvals_required === 0 ? (
              /* 1. FULL CARD EXEMPTION EMPTY STATE (Centers perfectly with nothing else on the card) */
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center select-none">
                <div className="size-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-4 shadow-md">
                  <Cpu size={20} strokeWidth={2.5} className="animate-pulse" />
                </div>
                <h4 className="text-xs font-black text-slate-700 uppercase tracking-wide">
                  Direct Route Processing
                </h4>
                <p className="text-xs text-slate-400 font-medium max-w-xs mx-auto mt-2 leading-relaxed">
                  This loan doesn't need formal board or committee voting loops!
                  The system checks everything using automated validation rules
                  for super-fast direct routing.
                </p>
              </div>
            ) : (
              /* 2. STANDARD RUNTIME GRID LAYOUT (Only loads if committee votes are mandatory) */
              <>
                <MetricItem
                  icon={<Layers />}
                  label="Current Workflow Node"
                  value={
                    application.current_stage_label || "Initial Evaluation"
                  }
                />
                <MetricItem
                  icon={<Settings />}
                  label="Active Routing Engine"
                  value="Joint Committee System Check"
                />
                <MetricItem
                  icon={<Clock />}
                  label="Node Aging SLA"
                  value={
                    application.days_in_current_stage
                      ? `${application.days_in_current_stage} Days Active`
                      : "Entered Today"
                  }
                  className={
                    application.is_sla_breached
                      ? "text-amber-600 font-bold"
                      : "text-slate-700"
                  }
                />
                <MetricItem
                  icon={<UserCheck />}
                  label="Assigned Review Queue"
                  value={
                    application.assigned_officer_name ||
                    "Committee Holding Pool"
                  }
                />

                {/* Consensus Summary Progress Section */}
                <div className="md:col-span-2 space-y-3.5 bg-slate-50/70 p-4 rounded-xl border border-slate-200/50 mt-1 w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                      Consensus Summary
                    </span>
                    <span className="text-[9px] font-black text-[#074073] bg-[#074073]/5 border border-[#074073]/10 px-2 py-0.5 rounded">
                      {application?.loan_product?.committee_approvals_required}{" "}
                      Votes Required
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                      <span>Committee Progress Panel</span>
                      <span className="font-mono text-slate-900">
                        {application?.committee_approvals_received || 0} /{" "}
                        {
                          application?.loan_product
                            ?.committee_approvals_required
                        }{" "}
                        Signed
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden shadow-inner">
                      <div
                        className="bg-slate-900 h-full transition-all duration-500 rounded-full"
                        style={{
                          width: `${Math.min(100, ((application?.committee_approvals_received || 0) / application?.loan_product?.committee_approvals_required) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Dynamic Next Steps Operational Callout Box */}
                <div className="md:col-span-2 flex items-center gap-3 bg-blue-50/50 border border-blue-100/70 p-4 rounded-2xl text-xs w-full">
                  <HelpCircle
                    size={15}
                    className="text-blue-500 shrink-0 mt-0.5"
                  />
                  <div className="space-y-0.5 flex-1">
                    <span className="font-black text-blue-950 uppercase tracking-wide text-[9px] block">
                      Operational Instructions
                    </span>
                    <p className="text-blue-900/90 font-medium leading-relaxed">
                      {application?.committee_approvals_received >=
                      application?.loan_product?.committee_approvals_required
                        ? "All required team votes are in! This file is fully backed and ready for an administrator to clear the payout."
                        : "We're still waiting for a few more committee reviews before the system can unlock funding release options."}
                    </p>
                  </div>
                </div>
              </>
            )}
          </ApplicationCard>

          {/* CARD 8: SYSTEM OUTBOUND DISBURSEMENT DETAILED BALANCE (FULL-WIDTH STRIP) */}
          <ApplicationCard
            title="Disbursement Parameters"
            icon={<ArrowDownCircle size={15} className="text-slate-500" />}
          >
            {!application?.disbursement ? (
              /* FIXED: Stripped out the inner dashed sub-card styling and absolute container. 
       Now centers the elements directly within the body canvas shell of the main card. */
              <div className="col-span-full flex flex-col items-center justify-center text-center select-none w-full min-h-[320px] py-12 animate-in fade-in duration-200">
                <div className="size-11 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center justify-center text-slate-400 mb-3.5 shadow-3xs shrink-0">
                  <ArrowDownCircle size={18} className="opacity-75" />
                </div>
                <h4 className="text-xs font-black text-slate-700 uppercase tracking-wide">
                  Payout Profile Inactive
                </h4>
                <p className="text-xs text-slate-400 font-medium max-w-xs mx-auto mt-1 leading-relaxed">
                  Clearance checks must conclude successfully before outbound
                  money transfers can generate accounting routing codes.
                </p>
              </div>
            ) : (
              <div className="col-span-full flex flex-col gap-5 w-full">
                {/* ESCROW CALCULATIONS MATRICES TABLE */}
                <div className="bg-slate-50/70 border border-slate-200/50 rounded-2xl p-4 space-y-3 w-full shadow-3xs">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                    Institutional Liquidation Deductions
                  </span>

                  <div className="flex justify-between items-center text-xs text-slate-600 font-medium">
                    <span>Approved Gross Asset Capital</span>
                    <span className="font-bold text-slate-900 font-mono">
                      KES{" "}
                      {Number(
                        application.disbursement.gross_amount || 0,
                      ).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      Administrative Fees{" "}
                      <span className="text-[10px] text-slate-400 font-normal">
                        (Withheld)
                      </span>
                    </span>
                    <span className="font-bold text-rose-600 font-mono">
                      - KES{" "}
                      {Number(
                        application.disbursement.processing_fee_deducted || 0,
                      ).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs text-slate-500 font-medium pb-2 border-b border-slate-200/50">
                    <span className="flex items-center gap-1">
                      Risk Protection Insurance{" "}
                      <span className="text-[10px] text-slate-400 font-normal">
                        (Withheld)
                      </span>
                    </span>
                    <span className="font-bold text-rose-600 font-mono">
                      - KES{" "}
                      {Number(
                        application.disbursement.insurance_deducted || 0,
                      ).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-1.5">
                    <span className="text-xs font-black text-slate-900 uppercase tracking-wide">
                      Released Net Value Transfer
                    </span>
                    <span className="text-base font-black text-emerald-600 font-mono">
                      KES{" "}
                      {Number(
                        application.disbursement.net_amount || 0,
                      ).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>

                {/* DYNAMIC HIDE RULE: Only show the lower audit panel if it is NOT processed by the automated system engine */}
                {application?.disbursement?.disbursed_by !== "system" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs w-full pt-1 border-t border-slate-100/80">
                    {/* Target Destination Profile */}
                    <div className="space-y-2.5">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                        Target Receiver Destination
                      </span>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-slate-800 font-bold">
                          {application.disbursement.method === "MPESA" ? (
                            <Smartphone size={13} className="text-slate-400" />
                          ) : (
                            <Building size={13} className="text-slate-400" />
                          )}
                          <span className="uppercase font-black text-[9px] bg-slate-900 text-white px-2 py-0.5 rounded-md font-mono tracking-wide">
                            {application.disbursement.method || "LEDGER"}
                          </span>
                          <span className="font-mono text-xs text-slate-900">
                            {application.disbursement.recipient_phone ||
                              application.applicant_mobile}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-medium pl-0.5 leading-relaxed">
                          {application.disbursement.method !== "MPESA" &&
                            `${application.disbursement.bank_name || "Equity Bank"} • ${application.disbursement.bank_branch || "Core Branch"}`}
                          <span className="block font-mono text-slate-500 mt-0.5">
                            Reference Registry:{" "}
                            {application.disbursement.bank_account_number ||
                              application.applicant_mobile}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Verification Audit Logs */}
                    <div className="space-y-2.5 md:border-l md:border-slate-200/60 md:pl-5">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                        Verification Integrity Log
                      </span>
                      <div className="space-y-1.5 text-slate-500 font-medium">
                        <p className="flex items-center gap-1.5">
                          System Hash Index:{" "}
                          <span className="font-mono font-bold text-slate-900 uppercase tracking-tight">
                            {application.disbursement.transaction_ref || "—"}
                          </span>
                        </p>

                        <div className="flex items-center gap-1.5 py-0.5">
                          <span>Trigger Event Origin:</span>
                          <span className="font-bold text-slate-800 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md text-[11px]">
                            {application.disbursement.disbursed_by_name}
                          </span>
                        </div>

                        <p className="text-[10px] text-slate-400 font-medium">
                          Dispatched Date Timestamp:{" "}
                          {new Date(
                            application.disbursement.initiated_at ||
                              "2026-06-20",
                          ).toLocaleString("en-KE", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ApplicationCard>
        </div>
      )}
    </div>
  );
}

/* PREMIUM CONTAINER PLATFORM WRAPPER BLOCK WITH INHERENT GRID AUTO-FLOW OVERRIDES */
const ApplicationCard = ({ title, icon, children, className = "" }) => (
  <div
    className={`bg-white border border-slate-200/70 shadow-2xs rounded-[24px] overflow-hidden w-full h-full hover:shadow-xs transition-shadow duration-300 ${className}`}
  >
    <div className="px-5 py-4 bg-slate-50/40 border-b border-slate-100 flex items-center gap-2.5 select-none">
      <div className="size-7.5 rounded-xl bg-white border border-slate-200/70 flex items-center justify-center text-slate-400 shadow-3xs">
        {icon}
      </div>
      <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
        {title}
      </h3>
    </div>
    <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
      {children}
    </div>
  </div>
);

/* REFINED METRIC ATOM CELL WITH ENHANCED FONT SIZING TRACKING */
const MetricItem = ({
  icon,
  label,
  value,
  isCapitalized = false,
  isCrypto = false,
  className = "",
}) => (
  <div className="flex items-start gap-3 min-w-0">
    <div className="size-8.5 rounded-xl bg-slate-50 border border-slate-200/40 flex items-center justify-center text-slate-400 shrink-0 shadow-3xs mt-0.5">
      {React.cloneElement(icon, { size: 14, strokeWidth: 2.5 })}
    </div>
    <div className="min-w-0 flex flex-col space-y-1">
      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 leading-normal">
        {label}
      </span>
      <span
        className={`text-xs font-bold tracking-tight leading-normal truncate ${
          isCrypto ? "font-mono text-slate-900 text-[13px]" : "text-slate-800"
        } ${isCapitalized ? "capitalize" : ""} ${className}`}
      >
        {value || "—"}
      </span>
    </div>
  </div>
);
