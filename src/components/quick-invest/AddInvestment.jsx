import React, { useState } from "react";
import {
  X,
  Smartphone,
  Wallet,
  Loader2,
  ShieldCheck,
  Building2,
  Coins,
  AlertCircle,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFormatAmount } from "../../hooks/useFormatAmount";

export default function AddInvestment({
  isOpen,
  onClose,
  member,
  paymentDetails,
  setPaymentDetails,
  onSubmitStk,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const formatAmount = useFormatAmount();

  // Calculate live total payment amount (Shares + Savings)
  const totalAmount =
    (paymentDetails?.includeShares
      ? Number(paymentDetails?.sharesAmount || 0)
      : 0) +
    (paymentDetails?.includeSavings
      ? Number(paymentDetails?.savingsAmount || 0)
      : 0);

  const handleClose = () => {
    setError("");
    setIsSubmitting(false);
    onClose();
  };

  const handlePay = async () => {
    if (
      !paymentDetails?.phoneNumber ||
      paymentDetails.phoneNumber.trim().length < 9
    ) {
      setError("Please provide a valid M-Pesa phone number.");
      return;
    }

    if (!totalAmount || totalAmount <= 0) {
      setError(
        "Please select at least one allocation option and enter a valid amount.",
      );
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const payload = {
        phone_number: paymentDetails.phoneNumber,
        shares_amount: paymentDetails.includeShares
          ? Number(paymentDetails.sharesAmount)
          : 0,
        savings_amount: paymentDetails.includeSavings
          ? Number(paymentDetails.savingsAmount)
          : 0,
        total_amount: totalAmount,
      };

      if (onSubmitStk) {
        await onSubmitStk(payload);
      }
      handleClose();
    } catch (err) {
      setError(err?.message || "Failed to trigger M-Pesa STK push prompt.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-zinc-950/20 font-sans antialiased text-slate-800">
          {/* Backdrop Dismiss */}
          <div className="absolute inset-0" onClick={handleClose} />

          {/* Drawer Panel Shell */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.2 }}
            className="bg-white relative w-full max-w-[480px] h-full shadow-2xl flex flex-col z-10 overflow-hidden"
          >
            {/* Header */}
            <div className="px-8 pt-6 pb-4 flex items-center justify-between border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#074073] flex items-center gap-1">
                    <Zap size={12} className="fill-[#074073]" /> Quick Invest
                  </span>
                </div>
                <h2 className="text-xl font-bold text-[#074073] mt-0.5">
                  Portfolio Top-Up
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Deposit to savings & acquire share capital in a single
                  transaction.
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="flex items-center justify-center w-8 h-8 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 rounded-full transition-all cursor-pointer active:scale-95"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto p-8 py-4 space-y-5">
              {error && (
                <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-2.5 text-xs text-rose-700 font-bold">
                  <AlertCircle size={16} className="shrink-0 text-rose-600" />
                  <span>{error}</span>
                </div>
              )}

              {/* M-PESA PHONE NUMBER SELECTION */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                  M-Pesa Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10">
                    <Smartphone size={16} className="text-[#074073]" />
                    <div className="w-[1px] h-4 bg-slate-200 ml-3" />
                  </div>
                  <input
                    type="tel"
                    placeholder="e.g. 0712345678 or 254712345678"
                    value={paymentDetails?.phoneNumber || ""}
                    onChange={(e) =>
                      setPaymentDetails((prev) => ({
                        ...prev,
                        phoneNumber: e.target.value,
                      }))
                    }
                    className="w-full pl-[58px] pr-4 h-12 bg-slate-50/60 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#074073] transition-all shadow-3xs"
                  />
                </div>
                <p className="text-[10px] text-slate-400 font-medium pl-1">
                  STK prompt will be dispatched directly to this handset.
                </p>
              </div>

              {/* INVESTMENT ALLOCATION OPTIONS */}
              <div className="space-y-3 pt-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Investment Allocations
                </p>

                {/* 1. BUY SHARES OPTION */}
                <div
                  className={`p-4 border rounded-2xl transition-all space-y-3 ${
                    paymentDetails?.includeShares
                      ? "bg-slate-50/80 border-[#074073]/40 shadow-3xs"
                      : "bg-white border-slate-200/80"
                  }`}
                >
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={paymentDetails?.includeShares || false}
                      onChange={(e) =>
                        setPaymentDetails((prev) => ({
                          ...prev,
                          includeShares: e.target.checked,
                        }))
                      }
                      className="size-4 accent-[#074073] rounded cursor-pointer"
                    />
                    <div className="flex items-center gap-2.5">
                      <div>
                        <p className="text-xs font-bold text-slate-800">
                          Purchase Share Capital
                        </p>
                        <p className="text-[10px] text-slate-400 font-medium">
                          Acquire SACCO equity shares
                        </p>
                      </div>
                    </div>
                  </label>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Shares Amount (KES)
                    </label>
                    <input
                      type="number"
                      min="100"
                      step="100"
                      disabled={!paymentDetails?.includeShares}
                      value={paymentDetails?.sharesAmount || ""}
                      onChange={(e) =>
                        setPaymentDetails((prev) => ({
                          ...prev,
                          sharesAmount: e.target.value,
                        }))
                      }
                      placeholder="Enter shares amount"
                      className="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-[#074073] outline-none focus:border-[#074073] transition-all disabled:bg-slate-100/80 disabled:border-slate-200/60 disabled:text-slate-400 disabled:cursor-not-allowed shadow-3xs"
                    />
                  </div>
                </div>

                {/* 2. DEPOSIT SAVINGS OPTION */}
                <div
                  className={`p-4 border rounded-2xl transition-all space-y-3 ${
                    paymentDetails?.includeSavings
                      ? "bg-slate-50/80 border-[#074073]/40 shadow-3xs"
                      : "bg-white border-slate-200/80"
                  }`}
                >
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={paymentDetails?.includeSavings || false}
                      onChange={(e) =>
                        setPaymentDetails((prev) => ({
                          ...prev,
                          includeSavings: e.target.checked,
                        }))
                      }
                      className="size-4 accent-[#074073] rounded cursor-pointer"
                    />
                    <div className="flex items-center gap-2.5">
                      <div>
                        <p className="text-xs font-bold text-slate-800">
                          Deposit Savings
                        </p>
                        <p className="text-[10px] text-slate-400 font-medium">
                          Deposit to FOSA / Normal Savings
                        </p>
                      </div>
                    </div>
                  </label>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Savings Amount (KES)
                    </label>
                    <input
                      type="number"
                      min="100"
                      step="100"
                      disabled={!paymentDetails?.includeSavings}
                      value={paymentDetails?.savingsAmount || ""}
                      onChange={(e) =>
                        setPaymentDetails((prev) => ({
                          ...prev,
                          savingsAmount: e.target.value,
                        }))
                      }
                      placeholder="Enter savings amount"
                      className="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-[#074073] outline-none focus:border-[#074073] transition-all disabled:bg-slate-100/80 disabled:border-slate-200/60 disabled:text-slate-400 disabled:cursor-not-allowed shadow-3xs"
                    />
                  </div>
                </div>
              </div>

              {/* SUMMARY HIGHLIGHT CARD */}
              <div className="p-4 bg-[#074073] text-white rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-blue-200 block">
                    Total Payable
                  </span>
                  <span className="text-base font-black text-emerald-400">
                    {formatAmount(totalAmount)}
                  </span>
                </div>
                <span className="text-[9px] font-black uppercase tracking-wider bg-white/10 border border-white/20 px-2.5 py-1 rounded-lg text-white">
                  M-Pesa STK
                </span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                <span>Secured via Safaricom M-Pesa Daraja Gateway API</span>
              </div>
            </div>

            {/* Footer Control Dock */}
            <div className="px-8 py-4 border-t border-slate-100 flex items-center justify-between gap-3 bg-slate-50/50">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="h-12 px-5 font-bold text-xs text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handlePay}
                disabled={isSubmitting || totalAmount <= 0}
                className="flex-1 h-12 font-bold text-xs bg-[#074073] hover:bg-[#052d52] text-white rounded-2xl transition-all shadow-md shadow-[#074073]/20 cursor-pointer active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Initiating STK Push...</span>
                  </>
                ) : (
                  <>
                    <Wallet size={16} />
                    <span>Pay {formatAmount(totalAmount)}</span>
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
