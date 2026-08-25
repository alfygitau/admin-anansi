import React, { useState } from "react";
import {
  ShieldCheck,
  Award,
  Wallet,
  Scale,
  Users,
  Building,
  FileCheck,
  History,
  CheckCircle2,
  XCircle,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  ArrowUpRight,
  AlertTriangle,
  ArrowLeft,
  TrendingUp,
  PieChart,
  PiggyBank,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getMember } from "../../../sdk/members/members";
import { getMemberLoanEligibility } from "../../../sdk/loan-applications/loan-applications";
import { useQuery, useMutation } from "react-query";
import { useToast } from "../../../contexts/ToastProvider";
import { useFormatAmount } from "../../../hooks/useFormatAmount";

const LoanEligibility = ({ memberData, onProceedToApplication }) => {
  const navigate = useNavigate();
  const [eligibility, setEligibility] = useState({});
  const [checklist, setChecklist] = useState([]);

  const updateStatus = (key, status) => {
    setChecklist((prev) => ({ ...prev, [key]: status }));
  };

  const [member, setMember] = useState({});
  const { memberId, productId } = useParams();
  const { showToast } = useToast();
  const formatAmount = useFormatAmount();
  const formatTitle = (rawRule) =>
    rawRule
      .split("_")
      .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : ""))
      .join(" ");

  useQuery({
    queryKey: ["get member", memberId],
    queryFn: async () => {
      const response = await getMember(memberId);
      return response?.data?.data;
    },
    onSuccess: (data) => {
      setMember(data);
    },
    onError: (error) => {
      showToast({
        title: "Member processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const { isFetching } = useQuery({
    queryKey: ["get member eligibility", memberId, productId],
    queryFn: async () => {
      const response = await getMemberLoanEligibility(memberId, productId);
      return response?.data?.data;
    },
    onSuccess: (data) => {
      setEligibility(data);
      setChecklist(data?.checks);
    },
    onError: (error) => {
      showToast({
        title: "Member processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  return (
    <div className="w-full space-y-5 font-sans antialiased text-slate-800">
      {/* 1. DYNAMIC HEADER TRACKING BANNER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-slate-200/60 pb-5 select-none">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="size-11 rounded-2xl border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-primary hover:bg-slate-50 hover:border-slate-300 transition-all shadow-3xs cursor-pointer active:scale-95"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h2 className="text-xl font-black text-primary tracking-tight">
              Loan Eligibility
            </h2>
            {/* Styled Member Name Line */}
            <p className="text-sm font-bold text-slate-700 mt-0.5 capitalize">
              {member?.firstname} {member?.middlename} {member?.lastname}
            </p>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              <span>Member ID:</span>
              <span className="font-mono font-bold text-slate-600 bg-slate-100/80 px-1.5 py-0.5 rounded border border-slate-200/50">
                {member?.public_id}
              </span>
            </p>
          </div>
        </div>
      </div>

      {isFetching ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full items-stretch select-none">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs p-6 flex flex-col justify-between animate-pulse"
            >
              <div className="space-y-3">
                {/* ICON & TITLE HEADER */}
                <div className="flex items-center gap-2.5">
                  {/* Icon Skeleton */}
                  <div className="size-10 rounded-xl bg-slate-100 shrink-0" />

                  {/* Label & Subtitle Skeletons */}
                  <div className="space-y-1.5 w-full">
                    <div className="h-2.5 w-24 bg-slate-200 rounded-md" />
                    <div className="h-2 w-32 bg-slate-100 rounded-md" />
                  </div>
                </div>

                {/* DIVIDER & VALUE AREA */}
                <div className="border-t border-slate-100 pt-3.5">
                  <div className="h-7 w-36 bg-slate-200 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full items-stretch select-none">
          {/* CARD 1: SAVINGS AMOUNT */}
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs p-6 flex flex-col justify-between transition-all hover:border-slate-300">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 bg-blue-50 border border-blue-100/60 rounded-xl text-[#074073]">
                  <PiggyBank size={16} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                    Savings Amount
                  </h4>
                  <p className="text-[10px] text-slate-400 font-medium">
                    Accumulated member deposits
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3.5">
                <p className="text-2xl font-black tracking-tight text-primary font-mono">
                  {formatAmount(eligibility?.total_savings ?? 0)}
                </p>
              </div>
            </div>
          </div>

          {/* CARD 2: SHARES AMOUNT */}
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs p-6 flex flex-col justify-between transition-all hover:border-slate-300">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 bg-indigo-50 border border-indigo-100/60 rounded-xl text-indigo-600">
                  <PieChart size={16} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                    Shares Amount
                  </h4>
                  <p className="text-[10px] text-slate-400 font-medium">
                    Permanent core equity capital
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3.5">
                <p className="text-2xl font-black tracking-tight text-[#074073] font-mono">
                  {formatAmount(eligibility?.total_shares ?? 0)}
                </p>
              </div>
            </div>
          </div>

          {/* CARD 3: BORROWING CAPACITY */}
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs p-6 flex flex-col justify-between transition-all hover:border-slate-300">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 bg-emerald-50 border border-emerald-100/60 rounded-xl text-emerald-600">
                  <TrendingUp size={16} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                    Borrowing Capacity
                  </h4>
                  <p className="text-[10px] text-slate-400 font-medium">
                    Maximum loan limit
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3.5">
                <p className="text-2xl font-black tracking-tight text-emerald-600 font-mono">
                  {formatAmount(eligibility?.limit ?? 0)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. ELIGIBILITY CONTAINER GRID (2 Items Per Full Width Row) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-stretch select-none">
        {isFetching
          ? [1, 2, 3, 4, 5, 6].map((index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200/60 p-3 flex flex-col justify-between shadow-3xs animate-pulse"
              >
                <div className="space-y-2">
                  {/* HEADER ICON, TITLE & STATUS CHECKMARK */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      {/* Icon Skeleton */}
                      <div className="size-9 rounded-xl bg-slate-100 shrink-0" />
                      {/* Title Skeleton */}
                      <div className="h-4 w-36 bg-slate-200 rounded-md" />
                    </div>
                  </div>

                  {/* DESCRIPTION PARAGRAPH SKELETONS */}
                  <div className="space-y-1.5 pt-1">
                    <div className="h-2.5 w-full bg-slate-100 rounded" />
                    <div className="h-2.5 w-4/5 bg-slate-100 rounded" />
                  </div>
                </div>

                {/* FOOTER META & BADGE SKELETON */}
                <div className="border-t border-slate-100 pt-2 mt-2 flex items-center justify-between gap-3">
                  {/* Meta Pill Skeleton */}
                  <div className="h-6 w-28 bg-slate-100 rounded-md" />

                  {/* Status Label Badge Skeleton */}
                  <div className="h-4 w-14 bg-slate-200 rounded" />
                </div>
              </div>
            ))
          : checklist?.map((item) => (
              <EligibilityContainer
                key={item?.rule}
                icon={<ShieldCheck />}
                title={formatTitle(item?.rule)}
                description={item?.description}
                status={item?.passed}
                onStatusChange={(status) => updateStatus(item?.key, status)}
                metaInfo={item?.actual ?? item?.reason ?? "Unknown"}
              />
            ))}
      </div>

      <div className="bg-white rounded-[24px] border border-slate-200/60 p-4 flex items-center justify-end gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <button
          type="button"
          className="h-11 px-5 border border-slate-200/80 bg-white text-slate-600 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={() => navigate("/admin/apply-loan/loan-application-details")}
          type="button"
          disabled={!eligibility?.is_eligible}
          className="h-11 px-6 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-primary/10 hover:bg-primary/90 transition-all active:scale-97 cursor-pointer flex items-center gap-2 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed disabled:shadow-none disabled:active:scale-100 disabled:hover:bg-slate-200"
        >
          <span>Continue With Application</span>
          <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  );
};

/* INTERNAL REUSABLE ELIGIBILITY TRACK CONTAINER */
const EligibilityContainer = ({
  icon,
  title,
  description,
  status, // "pass" | "fail" | "review"
  metaInfo,
}) => {
  const isPassed = status === true;
  const isFailed = status === false;
  const isReview = status === "review";

  return (
    <div
      className={`bg-white rounded-2xl border p-3.5 flex flex-col justify-between transition-all shadow-3xs group ${
        isPassed
          ? "border-emerald-100 bg-emerald-50/10"
          : isFailed
            ? "border-rose-100 bg-rose-50/10"
            : "border-slate-200/60"
      }`}
    >
      <div className="space-y-2">
        {/* Core Indicator Title Node */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div
              className={`p-1 rounded-lg border shrink-0 transition-colors ${
                isPassed
                  ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                  : isFailed
                    ? "bg-rose-50 border-rose-100 text-rose-600"
                    : isReview
                      ? "bg-amber-50 border-amber-100 text-amber-600"
                      : "bg-slate-50 border-slate-200/40 text-slate-500"
              }`}
            >
              {icon ?? <ShieldCheck size={16} />}
            </div>
            <h4 className="text-xs font-bold text-primary tracking-tight">
              {title}
            </h4>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
          {description}
        </p>
      </div>

      {/* Vetting Context Metadata Output Footer */}
      <div className="border-t border-slate-100 pt-2 mt-2 flex items-center justify-between gap-3 text-[11px]">
        {/* Left Side: Context Meta Information */}
        <span className="font-mono text-slate-500 font-semibold bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100 text-[10px]">
          {metaInfo}
        </span>

        {/* Right Side: Simple Read-Only Status Label */}
        <span
          className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${
            isPassed
              ? "bg-emerald-50 text-emerald-700 border-emerald-200/40"
              : isFailed
                ? "bg-rose-50 text-rose-700 border-rose-200/40"
                : isReview
                  ? "bg-amber-50 text-amber-700 border-amber-200/40"
                  : "bg-slate-50 text-slate-500 border-slate-100"
          }`}
        >
          {status === true
            ? "Passed"
            : status === false
              ? "Failed"
              : "In Review"}
        </span>
      </div>
    </div>
  );
};

export default LoanEligibility;
