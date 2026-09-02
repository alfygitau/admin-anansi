import React from "react";
import {
  X,
  Smartphone,
  Wallet,
  Loader2,
  ShieldCheck,
  HandCoins,
  ArrowLeft,
  Receipt,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFormatAmount } from "../../hooks/useFormatAmount";

export default function RepaySummary({
  isOpen,
  onClose,
  onBack,
  paymentDetails,
  loan,
  isSubmitting,
  onConfirmStk,
}) {
  const formatAmount = useFormatAmount();

  const { phoneNumber = "", amount = 0 } = paymentDetails || {};
  const totalAmount = Number(amount || 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-zinc-950/20 font-sans antialiased text-slate-800">
          {/* Backdrop Dismiss */}
          <div className="absolute inset-0" onClick={onClose} />

          {/* Drawer Shell */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.2 }}
            className="bg-white relative w-full max-w-[480px] h-full shadow-2xl flex flex-col z-10 overflow-hidden"
          >
            {/* Modal Header */}
            <div className="px-8 pt-6 pb-4 flex items-center justify-between border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#074073]">
                    Checkout Verification
                  </span>
                </div>
                <h2 className="text-xl font-bold text-[#074073] mt-0.5">
                  Loan Repayment Summary
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Review loan settlement metrics before dispatching M-Pesa
                  prompt.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex items-center justify-center w-8 h-8 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 rounded-full transition-all cursor-pointer active:scale-95"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable Summary Body */}
            <div className="flex-1 overflow-y-auto p-8 py-4 space-y-5">
              {/* TARGET PHONE NUMBER HIGHLIGHT */}
              <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-blue-50 border border-blue-100 text-[#074073] flex items-center justify-center shrink-0">
                    <Smartphone size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Destination M-Pesa Number
                    </span>
                    <span className="text-sm font-mono font-extrabold text-slate-800">
                      {phoneNumber || "Not provided"}
                    </span>
                  </div>
                </div>
                <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">
                  STK Ready
                </span>
              </div>

              {/* LOAN FACILITY DETAILS (If provided) */}
              {loan && (
                <div className="p-4 bg-slate-50/80 border border-slate-200/80 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center justify-center shrink-0">
                      <Receipt size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Facility Reference
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-800">
                        {loan.loan_code || loan.reference || "Loan Facility"}
                      </span>
                    </div>
                  </div>
                  {loan.outstanding_balance !== undefined && (
                    <div className="text-right">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                        Current Owed
                      </span>
                      <span className="text-xs font-mono font-black text-rose-600">
                        {formatAmount(loan.outstanding_balance)}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* ITEMIZED BREAKDOWN */}
              <div className="space-y-2.5">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Itemized Allocation
                </p>

                <div className="bg-white border border-slate-200/80 rounded-2xl divide-y divide-slate-100 shadow-3xs overflow-hidden">
                  {/* Loan Settlement Allocation */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                        <HandCoins size={15} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">
                          Loan Repayment Deposit
                        </p>
                        <p className="text-[10px] text-slate-400 font-medium">
                          Reduces principal and accrued interest
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-black text-[#074073]">
                      {formatAmount(totalAmount)}
                    </span>
                  </div>
                </div>
              </div>

              {/* TOTAL HIGHLIGHT BANNER */}
              <div className="p-5 bg-gradient-to-br from-[#074073] to-slate-900 text-white rounded-2xl shadow-md space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-200">
                  Total Settlement Amount
                </span>
                <div className="text-2xl font-black text-emerald-400">
                  {formatAmount(totalAmount)}
                </div>
                <p className="text-[10px] text-slate-300 font-medium pt-1">
                  This exact amount will be requested in the M-Pesa prompt.
                </p>
              </div>

              {/* SECURITY INFO BADGE */}
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                <span>Protected by Safaricom Daraja M-Pesa Encryption</span>
              </div>
            </div>

            {/* Footer Control Dock */}
            <div className="px-8 py-4 border-t border-slate-100 flex items-center justify-between gap-3 bg-slate-50/50">
              <button
                type="button"
                onClick={onBack}
                disabled={isSubmitting}
                className="h-12 px-4 font-bold text-xs text-slate-600 hover:text-slate-800 bg-white border border-slate-200/80 hover:bg-slate-100 rounded-2xl transition-all cursor-pointer flex items-center gap-1.5 shadow-3xs"
              >
                <ArrowLeft size={14} />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={onConfirmStk}
                disabled={isSubmitting || totalAmount <= 0}
                className="flex-1 h-12 font-bold text-xs bg-[#074073] hover:bg-[#052d52] text-white rounded-2xl transition-all shadow-md shadow-[#074073]/20 cursor-pointer active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Sending Prompt...</span>
                  </>
                ) : (
                  <>
                    <Wallet size={16} />
                    <span>Confirm & Send STK Push</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
