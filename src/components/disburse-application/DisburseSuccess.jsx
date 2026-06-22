import React from "react";
import { Check, ArrowRight, ArrowLeft, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DisburseSuccess({
  isOpen,
  onClose,
  borrowerName,
  transactionRef,
  disbursedAmount,
  payoutMethod = "MPESA",
  onReturnToQueue,
  viewLedger,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none font-sans antialiased">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40"
          />
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 8 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200/60 shadow-xl p-6 flex flex-col items-center text-center overflow-hidden"
          >
            {/* Top Right Quick Dismiss Anchor */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>

            {/* 1. ANIMATED SUCCESS INDICATOR */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.05,
              }}
              className="size-14 rounded-full border bg-emerald-50 border-emerald-100 text-emerald-600 shadow-md shadow-emerald-600/5 flex items-center justify-center mb-4.5 shrink-0"
            >
              <motion.div
                initial={{ rotate: -45, scale: 0.5 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: 0.18, duration: 0.2 }}
              >
                <Check size={24} strokeWidth={3.5} />
              </motion.div>
            </motion.div>

            {/* 2. CORE ACTION HEADER */}
            <div className="space-y-1 mb-6">
              <h2 className="text-base font-black text-slate-900 tracking-tight">
                Funds Disbursed Successfully
              </h2>
              <p className="text-[11px] text-slate-400 font-medium max-w-xs mx-auto leading-relaxed">
                The settlement has been successfully processed and logged
                permanently onto the core sacco settlement ledger.
              </p>
            </div>

            {/* 3. FINAL SUMMARY MEMO SLIP */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.12, duration: 0.25 }}
              className="w-full bg-slate-50/50 rounded-xl border border-slate-200/50 p-4 space-y-2.5 divide-y divide-slate-100 text-[11px] font-medium text-slate-600 mb-6"
            >
              <div className="flex justify-between items-center pb-0.5">
                <span className="text-slate-400">Borrower Name</span>
                <span className="text-slate-900 font-bold">{borrowerName}</span>
              </div>
              <div className="flex justify-between items-center pt-2.5">
                <span className="text-slate-400">Transaction Reference</span>
                <span className="font-mono font-bold text-slate-700 uppercase">
                  {transactionRef || "—"}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2.5">
                <span className="text-slate-400">Settlement Method</span>
                <span className="text-[8px] font-black uppercase px-2 py-0.5 border rounded-md bg-blue-50 border-blue-100 text-blue-700">
                  {payoutMethod}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2.5">
                <span className="text-slate-400">Disbursed Value</span>
                <span className="text-xs font-mono font-black text-slate-900">
                  <span className="text-[9px] font-bold text-slate-400 mr-0.5">
                    KES
                  </span>
                  {Number(disbursedAmount || 0).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </motion.div>

            {/* 4. POST-SUBMIT ACTIONS ROW */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full justify-center">
              <button
                type="button"
                onClick={onReturnToQueue}
                className="w-full sm:w-1/2 h-10 px-4 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-slate-50 transition-all cursor-pointer shadow-2xs"
              >
                <ArrowLeft size={13} />
                <span>Return to Queue</span>
              </button>

              <button
                type="button"
                onClick={viewLedger}
                className="w-full sm:w-1/2 h-10 px-4 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-slate-800 transition-all cursor-pointer shadow-sm group"
              >
                <span>View Asset Ledger</span>
                <ArrowRight
                  size={13}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
