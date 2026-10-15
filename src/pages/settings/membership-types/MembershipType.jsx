import React, { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Pencil,
  Users,
  Layers,
  ShieldCheck,
  Clock,
  Calendar,
  Hash,
  FileText,
  Tag,
  Building2,
  Check,
  X,
  Vote,
  Award,
  Wallet,
  ShieldAlert,
  UserCheck,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useToast } from "../../../contexts/ToastProvider";
import { getMembershipType } from "../../../sdk/membership/membership";

export const MembershipTypeDetails = () => {
  const [membershipType, setMembershipType] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { isFetching } = useQuery({
    queryKey: ["membership-type", id],
    queryFn: async () => {
      const response = await getMembershipType(id);
      return response?.data?.data;
    },
    onSuccess: (data) => {
      if (data) setMembershipType(data);
    },
    onError: (error) => {
      showToast({
        title: "Failed to load membership tier",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  if (!membershipType && !isFetching) return null;

  const currentVersion =
    membershipType?.versions?.find(
      (v) => v.id === membershipType?.current_version_id,
    ) || membershipType?.versions?.[0];

  const pendingVersion = membershipType?.versions?.find(
    (v) =>
      v.status === "pending_approval" ||
      v.status === "pending" ||
      v.status === "pending_review",
  );

  return (
    <>
      {isFetching || !membershipType ? (
        <MembershipTypeSkeleton />
      ) : (
        <div className="w-full space-y-6 select-none font-sans antialiased text-slate-800">
          {/* 1. PAGE HEADER */}
          <div className="flex flex-col sm:flex-row md:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 transition-all cursor-pointer shrink-0 shadow-3xs"
                title="Go Back"
              >
                <ArrowLeft size={16} />
              </button>
              <div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>Settings</span>
                  <span>•</span>
                  <span>Membership Tiers</span>
                </div>
                <div className="flex items-center gap-3 mt-0.5">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    {membershipType.name}
                  </h2>
                  <span
                    className={`inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${
                      membershipType.status === "active"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                        : "bg-rose-50 text-rose-700 border-rose-200/60"
                    }`}
                  >
                    <CheckCircle2 size={10} />
                    {membershipType.status}
                  </span>

                  {pendingVersion && (
                    <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md border bg-amber-50 text-amber-700 border-amber-200/60">
                      <Clock size={10} />v{pendingVersion.version_number}{" "}
                      Awaiting Approval
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Controls */}
            <div className="flex items-center gap-3">
              {pendingVersion && (
                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/admin/membership-types/${membershipType.id}/versions/${pendingVersion.id}/review`,
                    )
                  }
                  className="h-10 px-4 bg-amber-50 border border-amber-200/80 hover:bg-amber-100 text-amber-700 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-3xs"
                >
                  <ShieldCheck size={14} />
                  <span>Review Version {pendingVersion.version_number}</span>
                </button>
              )}

              <button
                type="button"
                onClick={() =>
                  navigate(`/admin/membership-types/${membershipType.id}/edit`)
                }
                className="h-10 px-4 bg-slate-900 hover:bg-[#074073] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
              >
                <Pencil size={14} />
                <span>Make Changes</span>
              </button>
            </div>
          </div>

          {/* 2. DETAILED CONFIGURATION CARDS */}
          <div className="space-y-6">
            {/* CARD 1: MEMBERSHIP IDENTITY & CLASSIFICATION */}
            <SectionCard title="Tier Details & Setup" icon={Tag}>
              <DetailItem
                label="Tier Name"
                value={membershipType.name}
                icon={Tag}
              />
              <DetailItem
                label="Public Code"
                value={membershipType.code}
                mono
                icon={Hash}
              />
              <DetailItem
                label="Active Version"
                value={`Version ${currentVersion?.version_number ?? "N/A"}`}
                mono
                icon={FileText}
              />
              <DetailItem
                label="Who Can Join"
                value={
                  currentVersion?.allowed_member_structures?.length
                    ? currentVersion.allowed_member_structures.join(", ")
                    : "All Structures"
                }
                icon={Building2}
              />
              <DetailItem
                label="Sign-up Methods"
                value={
                  currentVersion?.allowed_onboarding_channels?.length
                    ? currentVersion.allowed_onboarding_channels.join(", ")
                    : "All Channels"
                }
                icon={Layers}
              />
              <DetailItem
                label="Reporting Category"
                value={
                  currentVersion?.reporting_configuration
                    ?.regulatory_classification || "General"
                }
                icon={Building2}
              />
              <DetailItem
                label="Current Status"
                icon={CheckCircle2}
                badge={
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-md uppercase">
                    {membershipType.status}
                  </span>
                }
              />
              {membershipType.description && (
                <div className="md:col-span-2 p-3 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                    About This Tier
                  </span>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    {membershipType.description}
                  </p>
                </div>
              )}
            </SectionCard>

            {/* CARD 2: RIGHTS, PRIVILEGES & GOVERNANCE */}
            <SectionCard title="Benefits & Permissions" icon={Vote}>
              <DetailItem
                label="Voting Rights"
                icon={Vote}
                badge={
                  <BooleanBadge
                    value={currentVersion?.rights_and_privileges?.voting_rights}
                    positiveText="Can Vote"
                    negativeText="Cannot Vote"
                  />
                }
              />
              <DetailItem
                label="Loan Access"
                icon={Wallet}
                badge={
                  <BooleanBadge
                    value={
                      currentVersion?.rights_and_privileges?.loan_eligibility
                    }
                    positiveText="Can Apply for Loans"
                    negativeText="No Loan Access"
                  />
                }
              />
              <DetailItem
                label="Dividend Payouts"
                icon={Award}
                badge={
                  <BooleanBadge
                    value={
                      currentVersion?.rights_and_privileges
                        ?.dividend_eligibility
                    }
                    positiveText="Earns Dividends"
                    negativeText="No Dividends"
                  />
                }
              />
              <DetailItem
                label="Acting as a Guarantor"
                icon={ShieldCheck}
                badge={
                  <BooleanBadge
                    value={
                      currentVersion?.rights_and_privileges
                        ?.guarantor_eligibility
                    }
                    positiveText="Can Guarantee Others"
                    negativeText="Cannot Guarantee"
                  />
                }
              />
              <DetailItem
                label="Leadership Roles"
                icon={Layers}
                badge={
                  <BooleanBadge
                    value={
                      currentVersion?.rights_and_privileges
                        ?.governance_eligibility
                    }
                    positiveText="Can Run for Office"
                    negativeText="Not Eligible"
                  />
                }
              />
              <DetailItem
                label="Guarantor Limit"
                value={
                  currentVersion?.representation_policy?.guarantor_scope ||
                  "Standard Limit Applies"
                }
                icon={ShieldCheck}
              />
            </SectionCard>

            {/* CARD 3: REPRESENTATION & ONBOARDING ENTRY */}
            <SectionCard title="Joining Rules & Management" icon={Users}>
              <DetailItem
                label="Approval Process"
                value={
                  currentVersion?.entry_requirements?.approval_mode
                    ? currentVersion.entry_requirements.approval_mode.replace(
                        /_/g,
                        " ",
                      )
                    : "Automatic"
                }
                icon={UserCheck}
              />
              <DetailItem
                label="Account Managers Required"
                icon={Users}
                badge={
                  <BooleanBadge
                    value={
                      currentVersion?.representation_policy
                        ?.representatives_required
                    }
                    positiveText="Required"
                    negativeText="Not Required"
                  />
                }
              />
              <DetailItem
                label="Authorized Signatories"
                value={`${
                  currentVersion?.representation_policy?.minimum_signatories ??
                  1
                } ${
                  (currentVersion?.representation_policy?.minimum_signatories ??
                    1) === 1
                    ? "Person"
                    : "People"
                }`}
                icon={FileText}
              />
              <DetailItem
                label="Group Affiliation"
                value={
                  currentVersion?.eligibility_rules?.common_bond ||
                  "Open to Everyone"
                }
                icon={Building2}
              />
            </SectionCard>

            {/* CARD 4: FEE STRUCTURE & SAVINGS SCHEDULE */}
            <SectionCard title="Fees & Savings Schedule" icon={Wallet}>
              <DetailItem
                label="Joining Fee"
                icon={Wallet}
                badge={
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md border ${
                      currentVersion?.fee_rules?.use_default_membership_fee
                        ? "bg-blue-50 text-blue-700 border-blue-200/60"
                        : "bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    {currentVersion?.fee_rules?.use_default_membership_fee
                      ? "Standard Joining Fee"
                      : "Special Tier Fee"}
                  </span>
                }
              />
              <DetailItem
                label="Savings Schedule"
                value={
                  currentVersion?.contribution_obligations
                    ?.contribution_frequency || "Flexible"
                }
                icon={Calendar}
              />
              <DetailItem
                label="Start Date"
                value={
                  currentVersion?.effective_from
                    ? new Date(
                        currentVersion.effective_from,
                      ).toLocaleDateString()
                    : "Once Approved"
                }
                icon={Calendar}
              />
              <DetailItem
                label="When Updating"
                icon={ShieldAlert}
                badge={
                  <BooleanBadge
                    value={currentVersion?.retire_on_approval}
                    positiveText="Archive Old Rules"
                    negativeText="Keep Old Rules Active"
                  />
                }
              />
            </SectionCard>

            {/* CARD 5: REQUIRED ONBOARDING DOCUMENTS */}
            <SectionCard
              title="Required Documents"
              icon={FileText}
              badge={
                <span className="text-[11px] font-bold text-slate-400">
                  {currentVersion?.required_documents?.length || 0} Required
                </span>
              }
            >
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentVersion?.required_documents?.length > 0 ? (
                  currentVersion.required_documents
                    .sort((a, b) => a.display_order - b.display_order)
                    .map((doc, index) => (
                      <div
                        key={doc.id || index}
                        className="flex flex-col justify-between p-3.5 bg-slate-50/70 border border-slate-100 rounded-xl gap-3 hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-md bg-white border border-slate-200 font-mono text-[10px] font-bold text-slate-400 flex items-center justify-center shrink-0">
                            {doc.display_order}
                          </span>
                          <div>
                            <h5 className="text-xs font-bold text-slate-800 leading-tight">
                              {doc.label}
                            </h5>
                            <span className="font-mono text-[10px] text-slate-400 uppercase mt-0.5 block">
                              {doc.document_code}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 pl-9">
                          {doc.verification_required && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                              Must be Verified
                            </span>
                          )}
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                              doc.required
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                                : "bg-slate-100 text-slate-500 border-slate-200"
                            }`}
                          >
                            {doc.required ? "Required" : "Optional"}
                          </span>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="md:col-span-2 py-6 flex items-center justify-center">
                    <p className="text-xs text-slate-400 text-center">
                      There are no documents required to join this tier.
                    </p>
                  </div>
                )}
              </div>
            </SectionCard>

            {/* CARD 6: AUDIT TRAIL & VERSION HISTORY */}
            <SectionCard title="History & Approvals" icon={ShieldCheck}>
              <DetailItem
                label="Created On"
                value={new Date(membershipType.createdAt).toLocaleString()}
                mono
                icon={Calendar}
              />
              <DetailItem
                label="Last Updated"
                value={new Date(membershipType.updatedAt).toLocaleString()}
                mono
                icon={Calendar}
              />
              <DetailItem
                label="Submitted By"
                value={
                  currentVersion?.submitted_by
                    ? `${currentVersion.submitted_by.firstname} ${currentVersion.submitted_by.lastname}`
                    : "System"
                }
                icon={Users}
              />
              <DetailItem
                label="Approved By"
                value={
                  currentVersion?.reviewed_by
                    ? `${currentVersion.reviewed_by.firstname} ${currentVersion.reviewed_by.lastname}`
                    : currentVersion?.approved_at
                      ? "System Approved"
                      : "Waiting for Review"
                }
                icon={UserCheck}
              />
              {currentVersion?.review_feedback && (
                <div className="md:col-span-2 p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-1">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest block">
                    Reviewer Notes
                  </span>
                  <p className="text-xs text-emerald-900 font-medium">
                    &ldquo;{currentVersion.review_feedback}&rdquo;
                  </p>
                </div>
              )}
            </SectionCard>
          </div>
        </div>
      )}
    </>
  );
};

// --- REUSABLE DETAIL ITEM ---
const DetailItem = ({
  label,
  value,
  mono = false,
  badge = null,
  icon: Icon,
}) => (
  <div className="flex flex-col space-y-2 p-3 bg-slate-50/70 rounded-xl border border-slate-100">
    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
      {Icon && <Icon size={12} className="text-slate-400 shrink-0" />}
      <span>{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {badge ? (
        badge
      ) : (
        <span
          className={`text-sm font-bold text-slate-800 capitalize ${
            mono ? "font-mono" : ""
          }`}
        >
          {value !== null && value !== undefined && value !== ""
            ? String(value)
            : "—"}
        </span>
      )}
    </div>
  </div>
);

// --- REUSABLE BOOLEAN BADGE ---
const BooleanBadge = ({ value, positiveText = "Yes", negativeText = "No" }) => (
  <span
    className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md border ${
      value
        ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
        : "bg-slate-100 text-slate-600 border-slate-200"
    }`}
  >
    {value ? (
      <>
        <Check size={12} /> {positiveText}
      </>
    ) : (
      <>
        <X size={12} /> {negativeText}
      </>
    )}
  </span>
);

// --- REUSABLE SECTION CARD ---
const SectionCard = ({ title, icon: Icon, children, badge }) => (
  <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-3xs space-y-4">
    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
      <div className="flex items-center gap-2.5">
        {Icon && (
          <div className="p-2 bg-slate-50 border border-slate-200/60 rounded-xl text-[#074073]">
            <Icon size={16} />
          </div>
        )}
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
          {title}
        </h3>
      </div>
      {badge && badge}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{children}</div>
  </div>
);

// --- SKELETON LOADER ---
const MembershipTypeSkeleton = () => {
  return (
    <div className="w-full space-y-6 select-none font-sans antialiased text-slate-800 animate-pulse">
      {/* 1. Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-xl bg-slate-200 shrink-0" />
          <div className="space-y-2">
            <div className="h-3 w-32 bg-slate-200 rounded" />
            <div className="flex items-center gap-3">
              <div className="h-7 w-52 bg-slate-200 rounded-lg" />
              <div className="h-5 w-16 bg-slate-200 rounded-md" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-36 bg-slate-200 rounded-xl" />
        </div>
      </div>

      {/* 2. Section Cards Skeleton */}
      <div className="space-y-6">
        {Array.from({ length: 5 }).map((_, cardIdx) => (
          <div
            key={cardIdx}
            className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-3xs space-y-4"
          >
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <div className="size-8 bg-slate-200 rounded-xl shrink-0" />
              <div className="h-4 w-44 bg-slate-200 rounded" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, itemIdx) => (
                <div
                  key={itemIdx}
                  className="flex flex-col space-y-2 p-3 bg-slate-50/70 rounded-xl border border-slate-100"
                >
                  <div className="h-3 w-24 bg-slate-200 rounded" />
                  <div className="h-5 w-32 bg-slate-200 rounded-md" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
