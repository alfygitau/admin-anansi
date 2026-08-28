import React, { useState, useEffect } from "react";
import {
  X,
  Smartphone,
  RotateCw,
  Loader2,
  ShieldCheck,
  AlertCircle,
  Clock,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFormatAmount } from "../../hooks/useFormatAmount";

export default function SavingsStkPush({
  isOpen,
  onClose,
  onRetry,
  phoneNumber = "",
  amount = 0,
  timeoutSeconds = 60,
  status = "pending",
}) {
  const [timeLeft, setTimeLeft] = useState(timeoutSeconds);
  const [isRetrying, setIsRetrying] = useState(false);
  const formatAmount = useFormatAmount();

  const isSuccess = status === "success";

  useEffect(() => {
    if (!isOpen || isSuccess) return;

    setTimeLeft(timeoutSeconds);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, timeoutSeconds, isSuccess]);

  const handleRetry = async () => {
    if (onRetry) {
      setIsRetrying(true);
      try {
        await onRetry();
        setTimeLeft(timeoutSeconds);
      } finally {
        setIsRetrying(false);
      }
    }
  };

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
                    {isSuccess ? "Savings Deposit" : "M-Pesa Verification"}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-[#074073] mt-0.5">
                  {isSuccess ? "Deposit Confirmed" : "Awaiting STK Push"}
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {isSuccess
                    ? "Savings deposit verified successfully via M-Pesa Express."
                    : "Check your phone screen to enter your M-Pesa PIN."}
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

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-8 py-3 space-y-6 flex flex-col">
              {isSuccess ? (
                /* SUCCESS VIEW */
                <div className="flex-1 flex flex-col space-y-5 animate-in fade-in duration-300">
                  {/* Centered Success Icon Badge */}
                  <div className="size-16 rounded-3xl bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center shadow-2xs mx-auto my-4">
                    <CheckCircle2 size={32} strokeWidth={2.2} />
                  </div>

                  {/* Left-Aligned Header Text */}
                  <div className="space-y-1">
                    <h3 className="text-base font-extrabold text-slate-800">
                      Savings Deposit Received
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      The M-Pesa savings deposit has been successfully processed
                      and credited to the member's account balance.
                    </p>
                  </div>

                  {/* Transaction Details Summary */}
                  <div className="w-full bg-slate-50 border border-slate-200/80 p-4 rounded-2xl space-y-3 text-left">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-400 uppercase text-[9px] tracking-wider">
                        Payment Method
                      </span>
                      <span className="font-bold text-slate-800">
                        M-Pesa Express
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60">
                      <span className="font-bold text-slate-400 uppercase text-[9px] tracking-wider">
                        Source Number
                      </span>
                      <span className="font-mono font-bold text-slate-800">
                        {phoneNumber || "—"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60">
                      <span className="font-bold text-slate-400 uppercase text-[9px] tracking-wider">
                        Amount Deposited
                      </span>
                      <span className="font-black text-emerald-600">
                        {formatAmount(amount)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60">
                      <span className="font-bold text-slate-400 uppercase text-[9px] tracking-wider">
                        Status
                      </span>
                      <span className="font-bold text-emerald-600 uppercase bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded text-[10px]">
                        Cleared & Credited
                      </span>
                    </div>
                  </div>

                  {/* Security Note */}
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                    <ShieldCheck
                      size={14}
                      className="text-emerald-600 shrink-0"
                    />
                    <span>Verified via Safaricom Daraja M-Pesa Gateway</span>
                  </div>
                </div>
              ) : (
                /* PENDING STK VIEW */
                <>
                  {/* ANIMATED SMARTPHONE GRAPHIC */}
                  <div className="flex flex-col items-center justify-center text-center space-y-4">
                    <div className="relative flex items-center my-8 justify-center">
                      {/* Outer Pulsing Rings */}
                      <div className="absolute size-28 bg-emerald-500/10 rounded-full animate-ping pointer-events-none" />
                      <div className="absolute size-20 bg-emerald-500/20 rounded-full animate-pulse pointer-events-none" />

                      {/* Phone Badge */}
                      <div className="relative size-16 bg-[#074073] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-[#074073]/20">
                        <Smartphone size={30} className="animate-bounce" />
                      </div>
                    </div>

                    <div className="space-y-1 max-w-xs">
                      <h3 className="text-base font-extrabold text-slate-800">
                        Prompt Dispatched!
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">
                        An M-Pesa savings deposit prompt of{" "}
                        <span className="font-bold text-slate-800">
                          {formatAmount(amount)}
                        </span>{" "}
                        has been sent to your handset.
                      </p>
                    </div>
                  </div>

                  {/* TARGET DETAILS BADGE */}
                  <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Target Phone Number
                      </span>
                      <span className="font-mono font-extrabold text-slate-800">
                        {phoneNumber || "—"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Deposit Amount
                      </span>
                      <span className="font-black text-emerald-600">
                        {formatAmount(amount)}
                      </span>
                    </div>
                  </div>

                  {/* COUNTDOWN / TIMEOUT INDICATOR */}
                  <div className="p-4 bg-emerald-50/60 border border-emerald-100 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Clock size={18} className="text-emerald-600 shrink-0" />
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-emerald-900">
                          Request Timeout
                        </p>
                        <p className="text-[10px] text-emerald-700/80 font-medium">
                          Waiting for user confirmation
                        </p>
                      </div>
                    </div>
                    <span className="text-base font-mono font-black text-emerald-700 bg-white border border-emerald-200 px-3 py-1 rounded-xl shadow-3xs">
                      {timeLeft > 0 ? `${timeLeft}s` : "Expired"}
                    </span>
                  </div>

                  {/* TIMEOUT WARNING BANNER */}
                  {timeLeft === 0 && (
                    <div className="p-3.5 bg-amber-50 border border-amber-200/80 rounded-2xl flex items-center gap-2.5 text-xs text-amber-800 font-medium">
                      <AlertCircle
                        size={16}
                        className="shrink-0 text-amber-600"
                      />
                      <span>
                        Did not receive the prompt? <br />
                        Tap{" "}
                        <strong className="font-bold">
                          Resend STK Push
                        </strong>{" "}
                        below to retry.
                      </span>
                    </div>
                  )}

                  {/* SECURITY NOTE */}
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                    <ShieldCheck
                      size={14}
                      className="text-emerald-600 shrink-0"
                    />
                    <span>Protected by Safaricom M-Pesa Express API</span>
                  </div>
                </>
              )}
            </div>

            {/* Footer Controls */}
            <div className="px-8 py-4 border-t border-slate-100 flex items-center justify-between gap-3 bg-slate-50/50">
              {isSuccess ? (
                /* SUCCESS ACTION BUTTON */
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full h-12 font-bold text-xs bg-[#074073] hover:bg-[#052d52] text-white rounded-2xl transition-all shadow-md shadow-[#074073]/20 cursor-pointer active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Sparkles size={16} />
                  <span>Dismiss</span>
                </button>
              ) : (
                /* PENDING ACTION BUTTONS */
                <>
                  <button
                    type="button"
                    onClick={onClose}
                    className="h-12 px-5 font-bold text-xs text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleRetry}
                    disabled={isRetrying}
                    className="flex-1 h-12 font-bold text-xs bg-[#074073] hover:bg-[#052d52] text-white rounded-2xl transition-all shadow-md shadow-[#074073]/20 cursor-pointer active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isRetrying ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Resending Prompt...</span>
                      </>
                    ) : (
                      <>
                        <RotateCw size={15} />
                        <span>Resend STK Push</span>
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
