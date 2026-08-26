import React, { useState } from "react";
import {
  CheckCircle2,
  MessageSquare,
  Users,
  Coins,
  ArrowRight,
  Clock,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getApplication } from "../../../sdk/loan-applications/loan-applications";
import { useToast } from "../../../contexts/ToastProvider";

export default function LoanApplicationSuccess() {
  const navigate = useNavigate();
  const { appId } = useParams();
  const [application, setApplication] = useState({});
  const { showToast } = useToast();

  const formatMoney = (val) =>
    `KES ${Number(val || 0).toLocaleString("en-KE", {
      minimumFractionDigits: 2,
    })}`;

  const { isFetching } = useQuery({
    queryKey: ["get loan application", appId],
    queryFn: async () => {
      const response = await getApplication(appId);
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

  const hasGuarantors = application?.guarantors?.length > 0;

  return (
    <div className="bg-slate-50/70 font-sans antialiased text-slate-800">
      <div className="w-full space-y-6">
        {/* 1. SUCCESS HERO HEADER */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 shadow-3xs">
          {/* LEFT: ICON + TITLE & STATUS */}
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="size-11 rounded-xl bg-emerald-50 border border-emerald-200/60 text-emerald-600 flex items-center justify-center shrink-0 shadow-3xs">
              <CheckCircle2 size={22} strokeWidth={2.5} />
            </div>
            <div className="min-w-0 space-y-0.5">
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-black text-[#074073] tracking-tight truncate">
                  Application Received
                </h1>
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded shrink-0">
                  Submitted
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium truncate">
                Your loan request has been queued for verification
              </p>
            </div>
          </div>

          {/* RIGHT: COMPACT REF NUMBER BADGE */}
          <div className="text-right shrink-0 bg-slate-50 border border-slate-200/60 px-3 py-1.5 rounded-xl">
            <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block">
              Ref Number
            </span>
            <span className="font-mono text-xs font-black text-slate-800">
              {application?.application_number || "—"}
            </span>
          </div>
        </div>

        {/* 2. SMS CONSENT DIRECTIVE ALERT */}
        <div className="bg-[#074073] text-white rounded-[24px] p-5 sm:p-6 shadow-md relative overflow-hidden">
          <div className="flex items-center gap-4 relative z-10">
            <div className="size-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shrink-0">
              <MessageSquare size={20} />
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-black uppercase tracking-widest bg-amber-400 text-slate-900 px-2 py-0.5 rounded">
                Action Required
              </span>
              <h3 className="text-sm font-extrabold text-white">
                SMS Consent Link Sent
              </h3>
              <p className="text-xs text-blue-100 leading-relaxed font-medium">
                An SMS verification link has been sent to{" "}
                <strong className="text-white font-mono bg-white/10 px-1.5 py-0.5 rounded">
                  {application?.applicant_mobile}
                </strong>
                . Please check your phone and open the link to consent and
                confirm your loan request.
              </p>
            </div>
          </div>
        </div>

        {/* 3. SIDE-BY-SIDE METRICS CONTAINER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* ESSENTIAL APPLICATION SUMMARY */}
          <div
            className={`bg-white border border-slate-200/70 rounded-[24px] p-6 shadow-2xs space-y-4 ${
              !hasGuarantors ? "md:col-span-2" : ""
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Coins size={16} className="text-[#074073]" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Loan Summary
                </h3>
              </div>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200/60 flex items-center gap-1">
                <Clock size={12} />
                {application?.status_label}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-100">
                <span className="text-[9px] font-black uppercase text-slate-400 block tracking-wider">
                  Requested Capital
                </span>
                <p className="font-mono font-black text-sm text-[#074073] mt-0.5">
                  {formatMoney(application?.applied_amount)}
                </p>
              </div>

              <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-100">
                <span className="text-[9px] font-black uppercase text-slate-400 block tracking-wider">
                  Product Type
                </span>
                <p className="font-bold text-slate-800 mt-0.5 truncate">
                  {application?.loan_product?.product_name}
                </p>
              </div>

              <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-100">
                <span className="text-[9px] font-black uppercase text-slate-400 block tracking-wider">
                  Applicant Name
                </span>
                <p className="font-bold text-slate-800 mt-0.5 capitalize truncate">
                  {application?.applicant_name}
                </p>
              </div>

              <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-100">
                <span className="text-[9px] font-black uppercase text-slate-400 block tracking-wider">
                  Applicant Mobile
                </span>
                <p className="font-mono font-bold text-slate-800 mt-0.5 truncate">
                  {application?.applicant_mobile || "—"}
                </p>
              </div>

              <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-100">
                <span className="text-[9px] font-black uppercase text-slate-400 block tracking-wider">
                  Repayment Tenure
                </span>
                <p className="font-bold text-slate-800 mt-0.5">
                  {application?.loan_period} Months (
                  {application?.loan_interval})
                </p>
              </div>

              <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-100">
                <span className="text-[9px] font-black uppercase text-slate-400 block tracking-wider">
                  Application Date
                </span>
                <p className="font-bold text-slate-800 mt-0.5">
                  {application?.application_date || "—"}
                </p>
              </div>

              <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-100 col-span-2">
                <span className="text-[9px] font-black uppercase text-slate-400 block tracking-wider">
                  Loan Channel
                </span>
                <p className="font-bold text-slate-800 mt-0.5 uppercase">
                  {application?.loan_channel || "—"}
                </p>
              </div>

              <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-100 col-span-2">
                <span className="text-[9px] font-black uppercase text-slate-400 block tracking-wider">
                  Loan Purpose
                </span>
                <p className="font-bold text-slate-800 mt-0.5">
                  {application?.loan_purpose || "—"}
                </p>
              </div>
            </div>
          </div>

          {/* GUARANTORS STATUS */}
          {hasGuarantors && (
            <div className="bg-white border border-slate-200/70 rounded-[24px] p-6 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-[#074073]" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
                    Allocated Guarantors ({application?.guarantors.length})
                  </h3>
                </div>
              </div>

              <div className="space-y-2">
                {application?.guarantors.map((g) => (
                  <div
                    key={g.id}
                    className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl flex items-center justify-between"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">
                        {g.guarantor_name}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {g.guarantor_mobile}
                      </p>
                    </div>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200/50 shrink-0">
                      {g.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 4. ACTION BUTTONS */}
        <div className="bg-white rounded-[24px] border border-slate-200/60 p-4 flex items-center justify-end gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.02)] select-none shrink-0">
          <button
            type="button"
            onClick={() => navigate("/admin/loan-applications")}
            className="h-11 px-6 bg-[#074073] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#052d52] transition-all cursor-pointer flex items-center gap-2 shadow-md shadow-[#074073]/10"
          >
            <span>Done & Exit</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
