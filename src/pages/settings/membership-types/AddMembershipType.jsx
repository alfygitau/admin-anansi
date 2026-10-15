import { useState } from "react";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Eye,
  FileText,
  Plus,
  ShieldCheck,
  Tag,
  Trash2,
  Users,
  Wallet,
  X,
  User,
  Hash,
  AlignLeft,
  Link,
  Clock,
  PenTool,
  Shield,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useToast } from "../../../contexts/ToastProvider";
import { createMembershipType } from "../../../sdk/membership/membership";

const STRUCTURES = [
  ["individual", "Individual"],
  ["corporate", "Corporate"],
  ["group", "Group / Chama"],
];

const CHANNELS = [
  ["admin", "Admin portal"],
  ["branch", "Branch"],
  ["web", "Member web"],
  ["mobile", "Mobile app"],
  ["partner_api", "Partner API"],
];

const slug = (text) =>
  text
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/(^_|_$)/g, "") || "";

const buildMembershipPayload = (form) => ({
  ...form,
  code: slug(form.code).toUpperCase(),
  name: form.name.trim(),
  description: form.description.trim(),
  eligibility_rules: {
    ...form.eligibility_rules,
    minimum_age: form.eligibility_rules.minimum_age
      ? Number(form.eligibility_rules.minimum_age)
      : undefined,
    maximum_age: form.eligibility_rules.maximum_age
      ? Number(form.eligibility_rules.maximum_age)
      : undefined,
  },
  entry_requirements: {
    ...form.entry_requirements,
    minimum_share_capital: form.entry_requirements.minimum_share_capital
      ? Number(form.entry_requirements.minimum_share_capital)
      : undefined,
    minimum_opening_savings: form.entry_requirements.minimum_opening_savings
      ? Number(form.entry_requirements.minimum_opening_savings)
      : undefined,
  },
  fee_rules: {
    ...form.fee_rules,
    entrance_fee: form.fee_rules.entrance_fee
      ? Number(form.fee_rules.entrance_fee)
      : undefined,
  },
  contribution_obligations: {
    ...form.contribution_obligations,
    minimum_periodic_contribution: form.contribution_obligations
      .minimum_periodic_contribution
      ? Number(form.contribution_obligations.minimum_periodic_contribution)
      : undefined,
  },
  representation_policy: {
    ...form.representation_policy,
    minimum_signatories: Number(
      form.representation_policy.minimum_signatories || 0,
    ),
  },
  required_documents: form.required_documents
    .filter((document) => document.label?.trim())
    .map((document, index) => ({
      ...document,
      document_code: slug(document.document_code || document.label),
      label: document.label.trim(),
      display_order: index + 1,
      applies_to:
        form.allowed_member_structures.length === 1
          ? form.allowed_member_structures[0]
          : undefined,
    })),
});

export const CreateMembershipType = () => {
  const navigate = useNavigate();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const { showToast } = useToast();
  const [form, setForm] = useState({
    name: "",
    code: "",
    description: "",
    allowed_member_structures: [],
    allowed_onboarding_channels: [],
    eligibility_rules: { minimum_age: "", maximum_age: "", common_bond: "" },
    entry_requirements: {
      approval_mode: "admin_vetted",
      minimum_share_capital: "",
      minimum_opening_savings: "",
    },
    fee_rules: { use_default_membership_fee: true, entrance_fee: "" },
    contribution_obligations: {
      minimum_periodic_contribution: "",
      contribution_frequency: "monthly",
    },
    rights_and_privileges: {
      voting_rights: false,
      loan_eligibility: false,
      dividend_eligibility: false,
      governance_eligibility: false,
      guarantor_eligibility: false,
    },
    representation_policy: {
      representatives_required: false,
      minimum_signatories: 1,
      guarantor_scope: "",
    },
    required_documents: [],
  });

  const updateForm = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const updateRule = (category, key, value) => {
    setForm((p) => ({
      ...p,
      [category]: { ...p[category], [key]: value },
    }));
  };

  const toggleArray = (key, value) => {
    setForm((p) => {
      const array = p[key];
      if (array.includes(value)) {
        return { ...p, [key]: array.filter((item) => item !== value) };
      }
      return { ...p, [key]: [...array, value] };
    });
  };

  // Document Helpers
  const addDocument = () => {
    setForm((p) => ({
      ...p,
      required_documents: [
        ...p.required_documents,
        {
          label: "",
          document_code: "",
          required: false,
          verification_required: false,
          expiry_required: false,
          display_order: p.required_documents.length + 1,
        },
      ],
    }));
  };

  const removeDocument = (index) => {
    setForm((p) => {
      const newDocs = p.required_documents.filter((_, i) => i !== index);
      const reordered = newDocs.map((doc, i) => ({
        ...doc,
        display_order: i + 1,
      }));
      return { ...p, required_documents: reordered };
    });
  };

  const updateDocument = (index, key, value) => {
    setForm((p) => {
      const newDocs = [...p.required_documents];
      newDocs[index][key] = value;
      return { ...p, required_documents: newDocs };
    });
  };

  const handleSubmit = async () => {
    const payload = buildMembershipPayload(form);
    await mutate(payload);
  };

  const { mutate, isLoading } = useMutation({
    mutationKey: ["create membership type"],
    mutationFn: (payload) => createMembershipType(payload),
    onSuccess: () => {
      setShowReviewModal(false);
      navigate("/admin/membership-types");
    },
    onError: (error) => {
      showToast({
        title: "Couldn't create membership type",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  return (
    <>
      <div className="w-full space-y-6 antialiased text-slate-800">
        {/* 1. TOP HEADER */}
        <div className="bg-white px-2 py-4 mb-5">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-[#DEE3EB] bg-white text-slate-500 hover:bg-slate-50 transition-colors"
                title="Go Back"
              >
                <ArrowLeft size={18} />
              </button>
              <div>
                <h1 className="text-[18px] font-bold text-[#20242C]">
                  Create New Membership Tier
                </h1>
                <p className="text-[12px] font-medium text-[#667085]">
                  Configure all tier eligibility, financial terms, permissions,
                  and required onboarding documents.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: IDENTITY */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#074073]/10 text-[#074073]">
              <Tag size={20} />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#20242C]">
                1. Tier Identity & Scope
              </h3>
              <p className="text-[13px] text-[#667085]">
                Define the name, identification code, and scope of this
                membership tier.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2">
            <Field label="Tier Name" required>
              <DesignInput
                icon={Tag}
                placeholder="e.g. Corporate Membership"
                value={form.name}
                onChange={(e) => updateForm("name", e.target.value)}
              />
            </Field>
            <Field
              label="System Code"
              required
              help="The system code cannot be changed once saved."
            >
              <DesignInput
                icon={Hash}
                className="font-mono uppercase"
                placeholder="e.g. CORPORATE"
                value={form.code}
                onChange={(e) =>
                  updateForm(
                    "code",
                    e.target.value.toUpperCase().replace(/\s+/g, "_"),
                  )
                }
              />
            </Field>
            <div className="sm:col-span-2 md:col-span-2">
              <Field label="Description & Scope" required>
                <DesignTextarea
                  icon={AlignLeft}
                  placeholder="Provide a clear description of who this tier targets..."
                  value={form.description}
                  onChange={(e) => updateForm("description", e.target.value)}
                />
              </Field>
            </div>
          </div>
        </section>

        {/* SECTION 2: ELIGIBILITY & CHANNELS */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-blue-50 text-blue-600">
              <Users size={20} />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#20242C]">
                2. Eligibility & Onboarding Channels
              </h3>
              <p className="text-[13px] text-[#667085]">
                Specify qualifying member profiles, age bands, and allowed
                registration pathways.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <p className="mb-4 text-[13px] font-bold text-[#344054]">
                Allowed Member Structures
              </p>
              <div className="space-y-4">
                {STRUCTURES.map(([value, label]) => (
                  <Toggle
                    key={value}
                    label={label}
                    checked={form.allowed_member_structures.includes(value)}
                    onChange={() =>
                      toggleArray("allowed_member_structures", value)
                    }
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="mb-4 text-[13px] font-bold text-[#344054]">
                Allowed Onboarding Channels
              </p>
              <div className="space-y-4">
                {CHANNELS.map(([value, label]) => (
                  <Toggle
                    key={value}
                    label={label}
                    checked={form.allowed_onboarding_channels.includes(value)}
                    onChange={() =>
                      toggleArray("allowed_onboarding_channels", value)
                    }
                  />
                ))}
              </div>
            </div>
            <div className="sm:col-span-2 h-px bg-slate-100" />
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-2">
              <Field label="Minimum Age">
                <DesignInput
                  icon={User}
                  min="0"
                  type="number"
                  placeholder="e.g. 18"
                  value={form.eligibility_rules.minimum_age}
                  onChange={(e) =>
                    updateRule(
                      "eligibility_rules",
                      "minimum_age",
                      e.target.value,
                    )
                  }
                />
              </Field>
              <Field label="Maximum Age">
                <DesignInput
                  icon={User}
                  min="0"
                  type="number"
                  placeholder="Leave blank for no limit"
                  value={form.eligibility_rules.maximum_age}
                  onChange={(e) =>
                    updateRule(
                      "eligibility_rules",
                      "maximum_age",
                      e.target.value,
                    )
                  }
                />
              </Field>
              <Field label="Common Bond / Qualifying Criteria">
                <DesignInput
                  icon={Link}
                  placeholder="e.g. Registered Corporate Bodies"
                  value={form.eligibility_rules.common_bond}
                  onChange={(e) =>
                    updateRule(
                      "eligibility_rules",
                      "common_bond",
                      e.target.value,
                    )
                  }
                />
              </Field>
              <Field label="Vetting & Approval Mode">
                <DesignSelect
                  icon={ShieldCheck}
                  value={form.entry_requirements.approval_mode}
                  onChange={(e) =>
                    updateRule(
                      "entry_requirements",
                      "approval_mode",
                      e.target.value,
                    )
                  }
                >
                  <option value="admin_vetted">Admin Vetted</option>
                  <option value="committee_approved">Committee Approved</option>
                  <option value="self_registration">
                    Direct Self-Registration
                  </option>
                </DesignSelect>
              </Field>
            </div>
          </div>
        </section>

        {/* SECTION 3: ENTRY, FEES & CONTRIBUTIONS */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-amber-50 text-amber-600">
              <Wallet size={20} />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#20242C]">
                3. Entry, Fees & Recurring Contributions
              </h3>
              <p className="text-[13px] text-[#667085]">
                Determine required share capital, entrance fee overrides, and
                recurring savings rules.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2">
            <Field label="Minimum Share Capital">
              <DesignMoneyInput
                min="0"
                type="number"
                placeholder="0.00"
                value={form.entry_requirements.minimum_share_capital}
                onChange={(e) =>
                  updateRule(
                    "entry_requirements",
                    "minimum_share_capital",
                    e.target.value,
                  )
                }
              />
            </Field>
            <Field label="Minimum Opening Savings">
              <DesignMoneyInput
                min="0"
                type="number"
                placeholder="0.00"
                value={form.entry_requirements.minimum_opening_savings}
                onChange={(e) =>
                  updateRule(
                    "entry_requirements",
                    "minimum_opening_savings",
                    e.target.value,
                  )
                }
              />
            </Field>

            <div className="sm:col-span-2 h-px bg-slate-100" />

            <div className="sm:col-span-2 pt-2 pb-2">
              <Toggle
                label="Use standard SACCO entrance fee"
                checked={form.fee_rules.use_default_membership_fee}
                onChange={(value) =>
                  updateRule("fee_rules", "use_default_membership_fee", value)
                }
              />
            </div>

            <Field
              label="Custom Entrance Fee Override"
              help="Applies only when standard entrance fee is disabled."
            >
              <DesignMoneyInput
                disabled={form.fee_rules.use_default_membership_fee}
                min="0"
                type="number"
                placeholder="0.00"
                value={form.fee_rules.entrance_fee}
                onChange={(e) =>
                  updateRule("fee_rules", "entrance_fee", e.target.value)
                }
              />
            </Field>

            <Field label="Contribution Frequency">
              <DesignSelect
                icon={Clock}
                value={form.contribution_obligations.contribution_frequency}
                onChange={(e) =>
                  updateRule(
                    "contribution_obligations",
                    "contribution_frequency",
                    e.target.value,
                  )
                }
              >
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="quarterly">Quarterly</option>
                <option value="flexible">Flexible</option>
              </DesignSelect>
            </Field>

            <div className="sm:col-span-2">
              <Field label="Minimum Periodic Contribution">
                <DesignMoneyInput
                  min="0"
                  type="number"
                  placeholder="0.00"
                  value={
                    form.contribution_obligations.minimum_periodic_contribution
                  }
                  onChange={(e) =>
                    updateRule(
                      "contribution_obligations",
                      "minimum_periodic_contribution",
                      e.target.value,
                    )
                  }
                />
              </Field>
            </div>
          </div>
        </section>

        {/* SECTION 4: RIGHTS & REPRESENTATION */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-purple-50 text-purple-600">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#20242C]">
                4. Rights, Privileges & Representation
              </h3>
              <p className="text-[13px] text-[#667085]">
                Configure voting eligibility, credit rights, and authorized
                signatory constraints.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <p className="mb-5 text-[13px] font-bold text-[#344054]">
                Tier Privileges
              </p>
              <div className="space-y-4">
                {[
                  ["voting_rights", "Voting Rights"],
                  ["loan_eligibility", "Eligible for Loans"],
                  ["dividend_eligibility", "Eligible for Dividends"],
                  [
                    "governance_eligibility",
                    "Eligible for Governance / Board Positions",
                  ],
                  ["guarantor_eligibility", "Eligible to Guarantee Loans"],
                ].map(([key, label]) => (
                  <Toggle
                    key={key}
                    label={label}
                    checked={form.rights_and_privileges[key]}
                    onChange={(value) =>
                      updateRule("rights_and_privileges", key, value)
                    }
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="mb-5 text-[13px] font-bold text-[#344054]">
                Signatories & Representatives
              </p>
              <div className="space-y-6">
                <div className="pb-2">
                  <Toggle
                    label="Representatives required for onboarding"
                    checked={
                      form.representation_policy.representatives_required
                    }
                    onChange={(value) =>
                      updateRule(
                        "representation_policy",
                        "representatives_required",
                        value,
                      )
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-8 sm:grid-cols-2">
                  <Field label="Minimum Signatories">
                    <DesignInput
                      icon={PenTool}
                      min="1"
                      type="number"
                      value={form.representation_policy.minimum_signatories}
                      onChange={(e) =>
                        updateRule(
                          "representation_policy",
                          "minimum_signatories",
                          e.target.value,
                        )
                      }
                    />
                  </Field>
                  <Field label="Guarantor Scope Restriction">
                    <DesignSelect
                      icon={Shield}
                      value={form.representation_policy.guarantor_scope}
                      onChange={(e) =>
                        updateRule(
                          "representation_policy",
                          "guarantor_scope",
                          e.target.value,
                        )
                      }
                    >
                      <option value="">No restriction</option>
                      <option value="same_group">Within the same group</option>
                      <option value="same_membership_type">
                        Within the same membership tier
                      </option>
                    </DesignSelect>
                  </Field>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: REQUIRED DOCUMENTS */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-rose-50 text-rose-600">
                <FileText size={20} />
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-[#20242C]">
                  5. Required Onboarding Documents
                </h3>
                <p className="text-[13px] text-[#667085]">
                  Build the document checklist enforced during new member
                  verification.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={addDocument}
              className="flex items-center gap-1.5 rounded-[6px] bg-[#074073] px-3.5 py-2 text-[13px] font-semibold text-white hover:bg-[#06335c] transition-colors"
            >
              <Plus size={16} /> Add Document
            </button>
          </div>

          <div className="space-y-5">
            {form.required_documents.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 px-4 py-12 text-center flex flex-col items-center">
                <FileText size={32} className="text-slate-400 mb-3" />
                <p className="text-[14px] font-semibold text-[#344054]">
                  No documents configured yet.
                </p>
                <p className="text-[13px] text-[#667085] mt-1 max-w-sm">
                  Click &quot;Add Document&quot; above to require verification
                  uploads (e.g. CR12, KRA PIN, IDs).
                </p>
              </div>
            ) : (
              form.required_documents.map((doc, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-slate-50/40 p-6"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white border border-slate-200 text-[11px] font-bold text-slate-500">
                        {doc.display_order}
                      </span>
                      <p className="text-[14px] font-bold text-[#20242C]">
                        Document #{doc.display_order}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeDocument(index)}
                      className="text-[#D92D20] hover:bg-rose-50 p-2 rounded-lg transition-colors"
                      title="Remove Document"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Field label="Display Label" required>
                      <DesignInput
                        icon={FileText}
                        placeholder="e.g. Certificate of Incorporation"
                        value={doc.label}
                        onChange={(e) =>
                          updateDocument(index, "label", e.target.value)
                        }
                      />
                    </Field>
                    <Field
                      label="Document Code"
                      help="Auto-generated slug if left blank."
                    >
                      <DesignInput
                        icon={Hash}
                        className="font-mono"
                        placeholder={slug(doc.label) || "document_code"}
                        value={doc.document_code}
                        onChange={(e) =>
                          updateDocument(index, "document_code", e.target.value)
                        }
                      />
                    </Field>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-x-8 gap-y-5 rounded-2xl bg-white border border-slate-200 p-5">
                    <Toggle
                      label="Mandatory"
                      checked={doc.required}
                      onChange={(value) =>
                        updateDocument(index, "required", value)
                      }
                    />
                    <Toggle
                      label="Verify before approval"
                      checked={doc.verification_required}
                      onChange={(value) =>
                        updateDocument(index, "verification_required", value)
                      }
                    />
                    <Toggle
                      label="Expiry date required"
                      checked={doc.expiry_required}
                      onChange={(value) =>
                        updateDocument(index, "expiry_required", value)
                      }
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* PAGE ACTIONS */}
        <div className="w-full flex justify-between items-center pt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-11 items-center justify-center rounded-[8px] border border-slate-200 bg-white px-6 text-[13px] font-semibold text-[#344054] hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => setShowReviewModal(true)}
            className="flex h-11 items-center justify-center gap-2 rounded-[8px] bg-[#074073] px-8 text-[13px] font-semibold text-white hover:bg-[#06335c] transition-colors"
          >
            <Eye size={18} /> Review & Submit
          </button>
        </div>
      </div>

      {/* REVIEW & CONFIRM MODAL */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
          <div className="relative flex max-h-[80vh] w-full max-w-3xl flex-col rounded-[16px] border border-slate-200 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h3 className="text-[17px] font-bold text-[#20242C]">
                  Membership Tier Summary
                </h3>
                <p className="text-[12px] text-[#667085] mt-1">
                  Confirm the details below before creating this membership
                  type.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowReviewModal(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="rounded-[12px] border border-slate-100 bg-[#F9FAFB]/80 p-5">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-4">
                  Identity & Scope
                </h4>
                <div className="grid grid-cols-2 gap-5">
                  <ReviewItem label="Type Name" value={form.name} />
                  <ReviewItem
                    label="System Code"
                    value={slug(form.code).toUpperCase() || form.code}
                    mono
                  />
                  <div className="col-span-2">
                    <ReviewItem label="Description" value={form.description} />
                  </div>
                </div>
              </div>

              <div className="rounded-[12px] border border-slate-100 bg-[#F9FAFB]/80 p-5">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-4">
                  Eligibility & Channels
                </h4>
                <div className="grid grid-cols-2 gap-5">
                  <ReviewItem
                    label="Allowed Structures"
                    value={form.allowed_member_structures
                      .map((s) => s.replace("_", " "))
                      .join(", ")}
                  />
                  <ReviewItem
                    label="Onboarding Channels"
                    value={form.allowed_onboarding_channels
                      .map((s) => s.replace("_", " "))
                      .join(", ")}
                  />
                  <ReviewItem
                    label="Age Range"
                    value={`${form.eligibility_rules.minimum_age || 0} to ${
                      form.eligibility_rules.maximum_age || "No limit"
                    }`}
                  />
                  <ReviewItem
                    label="Approval Mode"
                    value={form.entry_requirements.approval_mode?.replace(
                      "_",
                      " ",
                    )}
                    capitalize
                  />
                  <div className="col-span-2">
                    <ReviewItem
                      label="Common Bond"
                      value={
                        form.eligibility_rules.common_bond ||
                        "None (Open to All)"
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-[12px] border border-slate-100 bg-[#F9FAFB]/80 p-5">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-4">
                  Fees & Contributions
                </h4>
                <div className="grid grid-cols-2 gap-5">
                  <ReviewItem
                    label="Minimum Share Capital"
                    value={form.entry_requirements.minimum_share_capital || 0}
                    prefix="KES "
                  />
                  <ReviewItem
                    label="Opening Savings"
                    value={form.entry_requirements.minimum_opening_savings || 0}
                    prefix="KES "
                  />
                  <ReviewItem
                    label="Entrance Fee"
                    value={
                      form.fee_rules.use_default_membership_fee
                        ? "Standard SACCO Fee"
                        : `KES ${form.fee_rules.entrance_fee || 0}`
                    }
                  />
                  <ReviewItem
                    label="Periodic Deposit"
                    value={`${
                      form.contribution_obligations
                        .minimum_periodic_contribution || 0
                    } (${form.contribution_obligations.contribution_frequency})`}
                    prefix="KES "
                  />
                </div>
              </div>

              <div className="rounded-[12px] border border-slate-100 bg-[#F9FAFB]/80 p-5">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-4">
                  Privileges & Governance
                </h4>
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
                  <ReviewBool
                    label="Voting Rights"
                    value={form.rights_and_privileges.voting_rights}
                  />
                  <ReviewBool
                    label="Loan Access"
                    value={form.rights_and_privileges.loan_eligibility}
                  />
                  <ReviewBool
                    label="Dividends"
                    value={form.rights_and_privileges.dividend_eligibility}
                  />
                  <ReviewBool
                    label="Board Positions"
                    value={form.rights_and_privileges.governance_eligibility}
                  />
                  <ReviewBool
                    label="Guarantor Capacity"
                    value={form.rights_and_privileges.guarantor_eligibility}
                  />
                  <ReviewItem
                    label="Signatories Required"
                    value={form.representation_policy.minimum_signatories}
                  />
                </div>
              </div>

              <div className="rounded-[12px] border border-slate-100 bg-[#F9FAFB]/80 p-5">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-4">
                  Enforced Documents ({form.required_documents.length})
                </h4>
                {form.required_documents.length > 0 ? (
                  <div className="space-y-2">
                    {form.required_documents.map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-lg bg-white p-3 text-[13px] border border-slate-200"
                      >
                        <span className="font-semibold text-slate-800">
                          {doc.display_order}. {doc.label || "Unnamed Document"}
                        </span>
                        <div className="flex gap-2">
                          {doc.required && (
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200/60">
                              Mandatory
                            </span>
                          )}
                          {doc.verification_required && (
                            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200/60">
                              Verify
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[13px] text-slate-400">
                    No documents configured for this tier.
                  </p>
                )}
              </div>
            </div>

            <div className="w-full flex items-center justify-between gap-3 border-t border-slate-100 px-6 py-5 bg-slate-50/50 rounded-b-[16px]">
              <button
                type="button"
                disabled={isLoading}
                onClick={() => setShowReviewModal(false)}
                className="flex h-11 items-center justify-center rounded-[8px] border border-slate-200 bg-white px-6 text-[13px] font-semibold text-[#344054] hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                Back to Edit
              </button>
              <button
                type="button"
                disabled={isLoading}
                onClick={handleSubmit}
                className="flex h-11 items-center justify-center gap-1.5 rounded-[8px] bg-[#074073] px-8 text-[13px] font-semibold text-white hover:bg-[#06335c] transition-colors shadow-sm disabled:opacity-50"
              >
                <Check size={18} />{" "}
                {isLoading ? "Creating..." : "Confirm & Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// --- REUSABLE DESIGN INPUT COMPONENTS ---

const DesignInput = ({ icon: Icon, className = "", ...props }) => (
  <div className="relative group">
    <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none">
      {Icon && (
        <Icon
          size={18}
          className="text-slate-400 group-focus-within:text-[#074073] transition-colors"
        />
      )}
      <div className="w-[1.5px] h-5 bg-slate-200 ml-4 group-focus-within:bg-[#074073]/30 transition-colors" />
    </div>
    <input
      className={`w-full pl-[74px] font-normal pr-6 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all placeholder:text-[13px] placeholder:font-normal font-semibold text-slate-800 disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-slate-100 ${className}`}
      {...props}
    />
  </div>
);

const DesignTextarea = ({ className = "", ...props }) => (
  <div className="relative group">
    <textarea
      className={`w-full pl-[10px] pr-6 py-3 min-h-[120px] bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all placeholder:text-[13px] placeholder:font-normal font-semibold text-slate-800 disabled:opacity-60 disabled:cursor-not-allowed resize-y ${className}`}
      {...props}
    />
  </div>
);

const DesignSelect = ({ icon: Icon, children, className = "", ...props }) => (
  <div className="relative group">
    <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none">
      {Icon && (
        <Icon
          size={18}
          className="text-slate-400 group-focus-within:text-[#074073] transition-colors"
        />
      )}
      <div className="w-[1.5px] h-5 bg-slate-200 ml-4 group-focus-within:bg-[#074073]/30 transition-colors" />
    </div>
    <select
      className={`w-full pl-[74px] pr-12 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all font-semibold text-slate-800 appearance-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </select>
    <ChevronDown
      size={18}
      className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#074073] transition-colors"
    />
  </div>
);

const DesignMoneyInput = ({ className = "", ...props }) => (
  <div className="relative group">
    <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none">
      <span className="text-[13px] font-bold text-slate-400 group-focus-within:text-[#074073] transition-colors">
        KES
      </span>
      <div className="w-[1.5px] h-5 bg-slate-200 ml-4 group-focus-within:bg-[#074073]/30 transition-colors" />
    </div>
    <input
      className={`w-full pl-[86px] pr-6 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all placeholder:text-[13px] placeholder:font-normal font-semibold text-slate-800 disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-slate-100 ${className}`}
      {...props}
    />
  </div>
);

const Field = ({ label, required, help, children }) => (
  <div>
    <div className="flex flex-col gap-1">
      <div>
        <label className="text-[13px] font-semibold text-[#344054]">
          {label} {required && <span className="text-[#D92D20]">*</span>}
        </label>
      </div>
      {children}
    </div>
    {help && <p className="mt-0.5 text-[11px] text-[#667085]">{help}</p>}
  </div>
);

const Toggle = ({ label, checked, onChange, disabled = false }) => (
  <label
    className={`relative flex items-start gap-3 select-none ${
      disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer group"
    }`}
  >
    <input
      type="checkbox"
      checked={checked}
      disabled={disabled}
      onChange={(e) => onChange(e.target.checked)}
      className="sr-only"
    />
    <div
      className={`relative mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md border transition-all ${
        checked
          ? "bg-[#074073] border-[#074073] shadow-sm"
          : "bg-slate-50 border-slate-200 group-hover:border-[#074073]/50"
      }`}
    >
      {checked && <Check size={14} className="text-white" strokeWidth={3} />}
    </div>
    <span className="text-[13px] font-medium text-slate-700 leading-relaxed group-hover:text-slate-900 transition-colors">
      {label}
    </span>
  </label>
);

const ReviewItem = ({ label, value, mono, capitalize, prefix = "" }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
      {label}
    </span>
    <span
      className={`text-[14px] font-semibold text-[#20242C] ${
        mono ? "font-mono" : ""
      } ${capitalize ? "capitalize" : ""}`}
    >
      {value ? `${prefix}${value}` : "—"}
    </span>
  </div>
);

const ReviewBool = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
      {label}
    </span>
    <span
      className={`text-[13px] font-bold ${
        value ? "text-emerald-700" : "text-slate-400"
      }`}
    >
      {value ? "Yes" : "No"}
    </span>
  </div>
);
