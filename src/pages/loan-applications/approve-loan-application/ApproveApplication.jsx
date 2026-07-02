import React, { useState } from "react";
import { FileText, ArrowUpRight, Coins } from "lucide-react";
import { useToast } from "../../../contexts/ToastProvider";
import { useQuery, useMutation } from "react-query";
import {
  approveApplication,
  getApplication,
} from "../../../sdk/loan-applications/loan-applications";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import ApprovalSuccess from "../../../components/approve-application/ApproveSuccess";

const ApproveApplication = () => {
  const { showToast } = useToast();
  const [application, setApplication] = useState({});
  const [checklist, setChecklist] = useState([]);
  const { id } = useParams();
  const { auth } = useAuth();
  const [decision, setDecision] = useState(null);
  const navigate = useNavigate();
  const [recommendedAmount, setRecommendedAmount] = useState(0);
  const [approvalConditions, setApprovalConditions] = useState("");
  const [decisionReason, setDecisionReason] = useState("");
  const [showApprovalSuccess, setShowApprovalSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({
    recommendedAmount: "",
    decisionReason: "",
  });

  const validateField = (name, value) => {
    let errorMsg = "";

    if (name === "recommendedAmount") {
      if (!value || Number(value) <= 0) {
        errorMsg =
          "Approved amount is required and must be greater than KES 0.00";
      }
    }

    if (name === "decisionReason") {
      if (!value || !value.trim()) {
        errorMsg =
          "A structural justification reason is mandatory to log this decision.";
      }
    }

    setFormErrors((prev) => ({ ...prev, [name]: errorMsg }));
    return errorMsg === "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isAmountValid = validateField("recommendedAmount", recommendedAmount);
    const isReasonValid = validateField("decisionReason", decisionReason);

    if (!isAmountValid || !isReasonValid) return;
    await mutate();
  };

  const { isFetching } = useQuery({
    queryKey: ["get loan application", id],
    queryFn: async () => {
      const response = await getApplication(id);
      return response.data?.data;
    },
    onSuccess: (data) => {
      setApplication(data);
      setChecklist(data?.eligibility_result?.checks);
      setRecommendedAmount(data?.applied_amount);
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
    mutationKey: ["approve application"],
    mutationFn: async () => {
      const response = await approveApplication(
        id,
        auth?.user?.id,
        `${auth?.user?.firstname} ${auth?.user?.firstname}`,
        decision,
        decisionReason,
        approvalConditions,
        recommendedAmount,
      );
      return response?.data?.data;
    },
    onSuccess: (data) => {
      setShowApprovalSuccess(true);
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
    <>
      <ApprovalSuccess
        isOpen={showApprovalSuccess}
        onClose={() => setShowApprovalSuccess(false)}
        applicantName={application.applicant_name}
        loanId={application?.application_number}
        finalAmount={recommendedAmount}
        decision={decision}
        onNextReview={() => navigate(`/admin/loan-applications/${id}`)}
        viewApprovals={() => navigate(`/admin/loan-applications-approvals`)}
      />
      <div className="w-full space-y-5 antialiased text-slate-800">
        {/* 1. APPLICATION OVERVIEW HEADER (Frameless) */}
        <div className="flex flex-col lg:flex-row justify-between gap-4 border-b border-slate-200/60 pb-3 select-none">
          <div className="space-y-1">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Approve Loan Application
            </h2>
            <p className="text-sm font-bold text-slate-700">
              {application.applicant_name}
            </p>
            <p className="text-xs text-slate-500">
              {application.loan_type} • Submitted on{" "}
              {new Date(application.application_date).toLocaleDateString(
                "en-KE",
                {
                  dateStyle: "medium",
                },
              )}
            </p>
          </div>
        </div>

        {/* SECTION LABEL */}
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            Checklist
          </h3>
          <p className="text-xs text-slate-500">
            Verify each point below to ensure the application meets basic
            requirements.
          </p>
        </div>

        {isFetching ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-stretch animate-pulse">
            {Array.from({ length: 14 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/40 select-none pointer-events-none shadow-3xs"
              >
                {/* Content wrapper mimicking text details panel layout */}
                <div className="space-y-2 w-4/5 flex flex-col items-start">
                  {/* Label block shimmer */}
                  <div className="h-3 bg-slate-200 rounded w-1/2" />

                  {/* Description string shimmer */}
                  <div className="h-2.5 bg-slate-100 rounded w-5/6" />

                  {/* System audited metric data token badge shimmer */}
                  <div className="h-4 bg-slate-50 border border-slate-100 rounded-md w-1/3 mt-1.5" />
                </div>

                {/* Right-aligned circular checking placeholder block */}
                <div className="size-5 rounded-full bg-slate-50 border border-slate-200 shrink-0 mt-0.5" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-stretch">
            {checklist.map((item) => (
              <CheckItem
                key={item.rule}
                label={item.label}
                description={item.description}
                actual={item.actual}
                checked={item.passed}
              />
            ))}
          </div>
        )}

        {/* 3. BOTTOM PANEL: DECISION FORM OPTIONS */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-slate-200/60 p-6 space-y-6 shadow-3xs w-full"
        >
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Application Decision
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Select an action first to configure options and finalize this
              application.
            </p>
          </div>

          {/* STEP 1: RADIO SELECTION */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Final Decision
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="decision"
                  value="approved"
                  checked={decision === "approved"}
                  onChange={() => setDecision("approved")}
                  className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-slate-300"
                />
                <span
                  className={`text-sm font-bold ${decision === "approved" ? "text-emerald-700" : "text-slate-600 group-hover:text-slate-800"}`}
                >
                  Approve Application
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="decision"
                  value="rejected"
                  checked={decision === "rejected"}
                  onChange={() => setDecision("rejected")}
                  className="w-4 h-4 text-rose-600 focus:ring-rose-500 border-slate-300"
                />
                <span
                  className={`text-sm font-bold ${decision === "rejected" ? "text-rose-700" : "text-slate-600 group-hover:text-slate-800"}`}
                >
                  Decline Application
                </span>
              </label>
            </div>
          </div>

          {/* STEP 2: DETAILS SECTIONS HIDDEN UNTIL AN ACTION IS CHOSEN */}
          {decision && (
            <div className="space-y-5 pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* RECOMMENDED DISBURSEMENT AMOUNT */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600">
                    {decision === "approve"
                      ? "Approved Amount"
                      : "Recommended Amount Alternative"}
                  </label>
                  <div className="relative flex flex-col group">
                    <div className="relative flex items-center w-full">
                      <Coins
                        size={14}
                        className={`absolute left-4 pointer-events-none transition-colors ${
                          formErrors.recommendedAmount
                            ? "text-rose-400"
                            : "text-slate-400 group-focus-within:text-[#074073]"
                        }`}
                      />
                      <div
                        className={`absolute left-10 w-[1px] h-5 transition-colors ${
                          formErrors.recommendedAmount
                            ? "bg-rose-200"
                            : "bg-slate-200 group-focus-within:bg-[#074073]/30"
                        }`}
                      />

                      <input
                        type="number"
                        value={recommendedAmount || ""}
                        onChange={(e) => {
                          setRecommendedAmount(Number(e.target.value));
                          if (formErrors.recommendedAmount)
                            setFormErrors((p) => ({
                              ...p,
                              recommendedAmount: "",
                            }));
                        }}
                        /* FIXED: Added dynamic onBlur validation execution */
                        onBlur={() =>
                          validateField("recommendedAmount", recommendedAmount)
                        }
                        className={`w-full h-[46px] pl-14 pr-12 bg-slate-50/60 border rounded-xl text-xs font-mono font-bold text-slate-800 focus:outline-none focus:bg-white transition-all ${
                          formErrors.recommendedAmount
                            ? "border-rose-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/5"
                            : "border-slate-200 focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5"
                        }`}
                        placeholder="0.00"
                      />
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none select-none">
                        <span
                          className={`text-[9px] font-black uppercase tracking-wide ${formErrors.recommendedAmount ? "text-rose-400" : "text-slate-400"}`}
                        >
                          KES
                        </span>
                      </div>
                    </div>

                    {/* FIXED: Dynamic onBlur error message display */}
                    {formErrors.recommendedAmount && (
                      <p className="text-[10px] text-rose-600 font-semibold mt-1.5 pl-1 flex items-center gap-1 animate-in fade-in duration-150">
                        <span>{formErrors.recommendedAmount}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* DISBURSEMENT CONDITIONS */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600">
                    Conditions after approval (if any)
                  </label>
                  <div className="relative flex items-center group">
                    <FileText
                      size={14}
                      className="absolute left-4 text-slate-400 pointer-events-none group-focus-within:text-[#074073] transition-colors"
                    />
                    <div className="absolute left-10 w-[1px] h-5 bg-slate-200 group-focus-within:bg-[#074073]/30 transition-colors" />

                    <input
                      type="text"
                      value={approvalConditions}
                      onChange={(e) => setApprovalConditions(e.target.value)}
                      className="w-full h-[46px] pl-14 pr-4 bg-slate-50/60 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#074073] focus:bg-white focus:ring-4 focus:ring-[#074073]/5 transition-all"
                      placeholder="e.g. Provide original physical logbook before cash release"
                    />
                  </div>
                </div>
              </div>

              {/* JUSTIFICATION REASON BLOCK */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600">
                  Reason for decision
                </label>
                <textarea
                  rows={3}
                  value={decisionReason}
                  onChange={(e) => {
                    setDecisionReason(e.target.value);
                    if (formErrors.decisionReason)
                      setFormErrors((p) => ({ ...p, decisionReason: "" }));
                  }}
                  /* FIXED: Added dynamic onBlur validation execution */
                  onBlur={() => validateField("decisionReason", decisionReason)}
                  className={`w-full p-3 bg-slate-50/60 border rounded-xl text-xs font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:bg-white transition-all定位 resize-none ${
                    formErrors.decisionReason
                      ? "border-rose-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/5"
                      : "border-slate-200 focus:border-[#074073] focus:bg-white focus:ring-4 focus:ring-[#074073]/5"
                  }`}
                  placeholder="Briefly explain the structural reasoning or rules backing up your decision here..."
                />

                {/* FIXED: Dynamic onBlur error message display */}
                {formErrors.decisionReason && (
                  <p className="text-[10px] text-rose-600 font-semibold mt-1 pl-1 flex items-center gap-1 animate-in fade-in duration-150">
                    <span>{formErrors.decisionReason}</span>
                  </p>
                )}
              </div>
            </div>
          )}
          <div className="bg-white rounded-[24px] border border-slate-200/60 p-4 flex items-center justify-end gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            <button
              type="button"
              className="h-11 px-5 border border-slate-200/80 bg-white text-slate-600 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              /* FIXED: Button disables if there is no decision OR if an active network submission is in flight */
              disabled={!decision || isLoading}
              className={`h-12 px-6 rounded-xl text-xs font-bold transition-all text-white shadow-md flex items-center justify-center gap-1.5 shrink-0 ${
                isLoading
                  ? "bg-slate-700 cursor-not-allowed shadow-none" // Neutral style fallback while submitting
                  : decision === "approve"
                    ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/10 cursor-pointer"
                    : decision === "reject"
                      ? "bg-rose-600 hover:bg-rose-700 shadow-rose-600/10 cursor-pointer"
                      : "bg-slate-800 cursor-pointer"
              } disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed`}
            >
              {/* FIXED: Text updates dynamically during load states */}
              <span>
                {isLoading ? "Processing Decision..." : "Submit Final Decision"}
              </span>

              {/* FIXED: Injects an inline SVG loader with Tailwind's native 'animate-spin' rule when active */}
              {isLoading ? (
                <svg
                  className="animate-spin size-3.5 text-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                <ArrowUpRight size={14} />
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

/* INTERNAL REUSABLE SUB-COMPONENT */
const CheckItem = ({ label, description, actual, checked, onChange }) => {
  return (
    <div
      onClick={onChange}
      className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/50 hover:border-slate-300 transition-all cursor-pointer group select-none shadow-3xs"
    >
      {/* Content wrapper with details layout block */}
      <div className="space-y-0.5 max-w-[85%] flex flex-col items-start">
        <p className="text-xs font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
          {label}
        </p>
        <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
          {description}
        </p>

        {/* Dynamic Metric Badge Container */}
        {actual && (
          <span className="text-[9px] font-mono font-bold bg-slate-50 border border-slate-100 text-slate-500 px-1.5 py-0.5 mt-1 rounded">
            {actual}
          </span>
        )}
      </div>

      {/* Radio-styled circle success selection checking node */}
      <div
        className={`size-5 rounded-full border flex items-center justify-center transition-all mt-0.5 shrink-0 ${
          checked
            ? "bg-[#074073] border-transparent text-white"
            : "bg-slate-50 border-slate-300 group-hover:border-slate-400"
        }`}
      >
        {checked && (
          <svg
            className="size-3 stroke-[3.5]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default ApproveApplication;
