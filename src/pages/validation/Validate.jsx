import React, { useState } from "react";
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Building2,
  User,
  AlertTriangle,
  MessageSquare,
  Zap,
  FileCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

const Validate = () => {
  const navigate = useNavigate();
  const { requestId } = useParams();
  const [checkerNote, setCheckerNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Mock data mapping for review requests
  const requestsDatabase = {
    "REQ-CORP-901": {
      id: "REQ-CORP-901",
      module: "Corporate Accounts",
      itemTitle: "Add New Director & Update Mandate",
      targetEntity: "Apex Ventures Limited (CORP-2026-9021)",
      description:
        "Adding Dr. Elizabeth Koech as a Non-Executive Director with 15% shareholding, and modifying the account signatory rule to allow 1 Director + Secretary authorization.",
      impact:
        "This will grant the newly added director signing capabilities and alter the legal governance structure for future withdrawals and loan applications.",
      maker: {
        name: "Jane Doe",
        role: "Corporate Operations Officer",
        timestamp: "18 Sep 2026, 14:20 EAT",
      },
      makerExplanation:
        "The client provided certified board resolutions during the AGM held on September 12th. KYC documents have been verified against eCitizen records.",
    },
    "REQ-GRP-402": {
      id: "REQ-GRP-402",
      module: "Groups & Chamas",
      itemTitle: "Update Monthly Contribution Target",
      targetEntity: "Umoja Investment Chama (GRP-2026-4819)",
      description:
        "Increasing the mandatory group monthly savings contribution from KES 10,000 to KES 15,000 effective next month.",
      impact:
        "Members' monthly standing orders will automatically adjust upwards, increasing group liquidity and borrowing capacity within the SACCO.",
      maker: {
        name: "Kevin Otieno",
        role: "Branch Relationship Manager",
        timestamp: "18 Sep 2026, 11:15 EAT",
      },
      makerExplanation:
        "Chama officials visited the branch and submitted signed minutes confirming unanimous member agreement.",
    },
  };

  const request =
    requestsDatabase[requestId] || requestsDatabase["REQ-CORP-901"];

  const handleValidationAction = async (decision) => {
    if (decision === "APPROVE" && !checkerNote.trim()) {
      alert(
        "Please provide review conditions or audit notes before approving.",
      );
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setFeedback({
        type: decision === "APPROVE" ? "success" : "error",
        message: `Review successfully completed. Item has been ${decision === "APPROVE" ? "approved and executed" : "rejected"}.`,
      });
      setTimeout(() => navigate(-1), 1500);
    } catch (error) {
      setFeedback({ type: "error", message: "Failed to process decision." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full bg-slate-50/60 flex flex-col overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="w-full space-y-6"
      >
        {/* Top Navigation & Status */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/60 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold px-2 py-0.5 bg-blue-50 text-[#074073] rounded-md border border-blue-100">
                {request.id}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-amber-50 text-amber-700 rounded-md border border-amber-100 flex items-center gap-1">
                <Clock size={10} /> Pending Review
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-[#074073]">
              Review & Authorize Action
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Verify the proposed changes, assess operational impact, and
              execute validation decision.
            </p>
          </div>
        </div>

        {feedback && (
          <div
            className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 ${
              feedback.type === "success"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                : "bg-rose-50 text-rose-700 border border-rose-100"
            }`}
          >
            <CheckCircle2 size={16} />
            <span>{feedback.message}</span>
          </div>
        )}

        {/* SECTION 1: ITEM UNDER REVIEW */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
          <span className="text-[10px] font-bold text-[#074073] bg-blue-50 px-2.5 py-1 rounded-md uppercase tracking-wider inline-block">
            {request.module}
          </span>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900">
            {request.itemTitle}
          </h1>
          <p className="text-xs font-semibold text-slate-500">
            Target Account/Entity:{" "}
            <span className="text-slate-800">{request.targetEntity}</span>
          </p>
          <div className="pt-2 text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <strong className="block text-slate-900 mb-1">
              Proposed Change Summary:
            </strong>
            {request.description}
          </div>
        </div>

        {/* SECTION 2: IMPACT ASSESSMENT */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
          <h2 className="text-xs font-bold text-[#074073] uppercase tracking-wider flex items-center gap-2">
            <Zap size={16} className="text-amber-500" />
            Impact of this Review
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed bg-amber-50/40 p-4 rounded-2xl border border-amber-100/60 font-medium">
            {request.impact}
          </p>
        </div>

        {/* SECTION 3: MAKER DETAILS & EXPLANATION */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-xs font-bold text-[#074073] uppercase tracking-wider flex items-center gap-2">
            <User size={16} />
            Submitted By & Conditions Given
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                Maker Profile
              </span>
              <p className="font-extrabold text-slate-900">
                {request.maker.name}
              </p>
              <p className="text-slate-500">{request.maker.role}</p>
              <p className="text-[10px] text-slate-400 pt-1">
                {request.maker.timestamp}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                Maker Notes / Conditions
              </span>
              <p className="font-medium text-slate-700 italic">
                "{request.makerExplanation}"
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 4: CHECKER DECISION PANEL */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-xs font-bold text-[#074073] uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck size={16} />
            Your Decision & Conditions
          </h2>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare size={14} className="text-[#074073]" />
              Review Notes, Conditions, or Rejection Reason{" "}
              <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows="3"
              placeholder="Provide context, conditions attached to approval, or reason for rejection..."
              value={checkerNote}
              onChange={(e) => setCheckerNote(e.target.value)}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-800 outline-none focus:bg-white focus:border-[#074073]"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleValidationAction("REJECT")}
              className="w-full sm:w-1/2 h-12 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <XCircle size={16} />
              <span>Reject Request</span>
            </button>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleValidationAction("APPROVE")}
              className="w-full sm:w-1/2 h-12 bg-[#074073] hover:bg-[#052d52] text-white font-bold text-xs rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-900/10 disabled:opacity-50"
            >
              <CheckCircle2 size={16} />
              <span>
                {isSubmitting ? "Processing..." : "Approve & Execute"}
              </span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Validate;
