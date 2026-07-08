import { useState } from "react";
import {
  ShieldCheck,
  Scale,
  BookOpen,
  HelpCircle,
  CheckSquare,
  Square,
  ArrowRight,
  Loader2,
  AlertCircle,
  Check,
  Copy,
  Calendar,
  Download,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "react-query";
import { useToast } from "../../contexts/ToastProvider";
import useAuth from "../../hooks/useAuth";

// Dummy function framework matching your SDK initialization layouts
const finalizeTermsAcceptance = async (userId) => {
  return new Promise((resolve) => setTimeout(resolve, 1500));
};

const MemberAcceptTerms = () => {
  const [agreed, setAgreed] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const navigate = useNavigate();
  const { showToast } = useToast();
  const { auth, setAuth } = useAuth();

  // Simulated ledger metrics for the final print view layout
  const generatedMemberId =
    auth?.user?.memberId ||
    "MBR-2026-" + Math.floor(100000 + Math.random() * 900000);
  const registrationTimestamp = new Date().toLocaleDateString("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleCopyId = () => {
    navigator.clipboard.writeText(generatedMemberId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const { mutate: acceptMutate, isLoading } = useMutation({
    mutationKey: ["member-accept-terms"],
    mutationFn: () => finalizeTermsAcceptance(auth?.user?.id),
    onSuccess: () => {
      if (auth?.user) {
        setAuth({
          ...auth,
          user: { ...auth.user, isOnboardingComplete: true },
        });
      }
      showToast({
        title: "Bylaws Signed",
        type: "success",
        position: "top-right",
        description:
          "Legal covenants committed. Your profile is now permanently activated.",
      });
      setIsSuccess(true);
    },
    onError: (error) => {
      showToast({
        title: "Registration Interrupted",
        type: "error",
        position: "top-right",
        description: error?.message || "Failed to log agreement confirmation.",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) {
      setShowError(true);
      return;
    }
    acceptMutate();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 sm:p-2 antialiased">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 py-3 px-6 bg-white overflow-hidden">
        {/* LEFT COLUMN: REGULATORY OVERSIGHT & BINDING STATUTES */}
        <div className="relative bg-white sm:hidden p-6 lg:p-6 flex flex-col justify-between overflow-hidden border-r border-slate-200">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-full border border-slate-100 mb-12">
              <ShieldCheck className="text-primary" size={18} />
              <span className="text-primary text-xs font-medium tracking-widest uppercase">
                Anansi Sacco
              </span>
            </div>
            <h2 className="text-primary text-2xl xl:text-2xl font-medium leading-[1.2] mb-8">
              Reviewing the mutual covenants, operational rights, and{" "}
              <span className="text-primary">institutional safeguards.</span>
            </h2>

            <div className="space-y-8">
              <div className="flex gap-5 group">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50/60 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Scale
                    className="text-primary group-hover:text-white transition-colors"
                    size={22}
                  />
                </div>
                <div>
                  <h4 className="text-primary font-medium text-md">
                    Bylaw Jurisdictions
                  </h4>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed mt-1">
                    Your membership profiles are governed by standard SACCO
                    structural rules, detailing dividend payouts, capital
                    retention protocols, and share allocations.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 group">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50/60 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-colors">
                  <BookOpen
                    className="text-primary group-hover:text-white transition-colors"
                    size={22}
                  />
                </div>
                <div>
                  <h4 className="text-primary font-medium text-md">
                    Resource Transparency
                  </h4>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed mt-1">
                    Clear outline disclosures of structural fees, savings lock
                    durations, interest metrics, and automated credit scoring
                    underwriting parameters.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 group">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50/60 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-colors">
                  <HelpCircle
                    className="text-primary group-hover:text-white transition-colors"
                    size={22}
                  />
                </div>
                <div>
                  <h4 className="text-primary font-medium text-md">
                    Fiduciary Compliance
                  </h4>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed mt-1">
                    Data storage encryption parameters, KYC evaluation
                    guidelines, and privacy architectures fully matching SASRA
                    and localized Data Protection laws.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-8 flex items-center justify-center">
            <span className="text-slate-400 text-[10px] uppercase font-medium tracking-tighter">
              Anansi Sacco Platform © 2026
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE FORM OR SUCCESS STATE SWITCH PANEL */}
        <div className="p-6 lg:p-6 sm:p-2 flex items-center justify-center bg-white">
          <div className="w-full h-full flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                /* VIEW STATE A: DISCLOSURE REVIEW & AGREEMENT CHECKBOX */
                <motion.div
                  key="terms-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div>
                    <h1 className="text-3xl font-medium text-primary tracking-tight">
                      Membership Bylaws
                    </h1>
                    <p className="text-slate-400 font-medium mt-2">
                      Review each required legal framework below to activate
                      your profile.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Simplified Link Matrix Section */}
                    <div className="space-y-3">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                        Regulatory Disclosures & Legal Framework
                      </label>

                      <div className="grid grid-cols-1 sm:grid-cols-1 gap-2.5">
                        {[
                          {
                            label: "Onboarding Terms & Conditions",
                            sub: "Core Covenants & Commitments",
                            path: "/legal/terms",
                          },
                          {
                            label: "Data Privacy Policy",
                            sub: "Data Protection Act & Token Security",
                            path: "/legal/privacy",
                          },
                          {
                            label: "SACCO Institutional Bylaws",
                            sub: "SASRA Capital & Reserves Framework",
                            path: "/legal/bylaws",
                          },
                          {
                            label: "Credit & Underwriting Terms",
                            sub: "Collateral & Yield Allocation Policies",
                            path: "/legal/credit-policy",
                          },
                        ].map((doc, idx) => (
                          <a
                            key={idx}
                            href={doc.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 bg-slate-50 hover:bg-blue-50/40 border border-slate-200/70 hover:border-primary/30 rounded-2xl flex items-center justify-between transition-all group cursor-pointer"
                          >
                            <div className="flex flex-col items-start pr-4">
                              <span className="text-xs font-bold text-slate-800 group-hover:text-[#074073] transition-colors">
                                {doc.label}
                              </span>
                              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
                                {doc.sub}
                              </span>
                            </div>
                            <ExternalLink
                              size={14}
                              className="text-slate-300 group-hover:text-[#074073] shrink-0 transition-colors"
                            />
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Checkbox Interactive Panel */}
                    <div
                      onClick={() => {
                        setAgreed(!agreed);
                        setShowError(false);
                      }}
                      className={`p-4 border rounded-2xl flex items-center gap-4 cursor-pointer transition-all ${
                        agreed
                          ? "bg-blue-50/40 border-blue-200 text-slate-800"
                          : "bg-slate-50/50 border-slate-200 hover:border-slate-300 text-slate-500"
                      }`}
                    >
                      <div className="mt-0.5 shrink-0 text-primary">
                        {agreed ? (
                          <CheckSquare size={18} strokeWidth={2.5} />
                        ) : (
                          <Square size={18} />
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold tracking-tight">
                          I Accept the Governing Corporate Bylaws
                        </p>
                        <p className="text-[11px] font-medium text-slate-400 leading-normal">
                          I confirm that I have opened, evaluated, and accepted
                          the binding covenants linked above.
                        </p>
                      </div>
                    </div>

                    {/* Validation Notification Badge */}
                    <AnimatePresence>
                      {showError && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-[11px] font-bold flex items-center gap-2 ml-1"
                        >
                          <AlertCircle size={14} />
                          <span>
                            Please check the box above to confirm you have
                            reviewed and accepted the terms.
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit Execution Target */}
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isLoading}
                      className={`w-full py-6 rounded-2xl font-medium uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-all cursor-pointer ${
                        agreed && !isLoading
                          ? "bg-primary text-white shadow-xl shadow-primary/10 hover:bg-secondary"
                          : "bg-slate-100 text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      {isLoading ? (
                        <Loader2 className="animate-spin" size={18} />
                      ) : (
                        <>
                          Accept & Activate Membership <ArrowRight size={18} />
                        </>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                /* VIEW STATE B: TOP-ALIGNED, LEFT-SIDED SUCCESS STATE PANEL */
                <motion.div
                  key="terms-success"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="flex flex-col items-start pt-2 space-y-8 w-full text-left"
                >
                  <div className="relative flex items-center justify-start pl-1">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="size-16 bg-emerald-50 rounded-full border border-emerald-100 flex items-center justify-center text-emerald-600 z-10 shadow-3xs"
                    >
                      <Check size={28} strokeWidth={3} />
                    </motion.div>
                    <div className="absolute left-1 size-16 bg-emerald-400/10 rounded-full animate-ping duration-1000" />
                  </div>

                  <div className="space-y-1.5 text-left w-full pl-1">
                    <h3 className="text-2xl font-black text-[#074073] tracking-tight">
                      Onboarding Completed
                    </h3>
                    <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                      The member's structural data pipeline has been securely
                      parsed. Core credentials, geographic mapping metrics, and
                      financial underwriting parameters have successfully
                      cleared all system validation constraints and are
                      officially committed to the secure database registry.
                    </p>
                  </div>

                  <div className="w-full border-b border-slate-100"></div>

                  <div className="w-full border border-slate-100 bg-slate-50/50 rounded-2xl p-5 space-y-3.5 text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Assigned System ID
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-black text-slate-800 tracking-wider">
                          {generatedMemberId}
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyId}
                          className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                            copied
                              ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                              : "bg-white border-slate-200 text-slate-400 hover:text-slate-600 active:scale-95"
                          }`}
                        >
                          {copied ? (
                            <Check size={12} strokeWidth={3} />
                          ) : (
                            <Copy size={12} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="border-b border-dashed border-slate-200" />

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Calendar size={12} className="text-slate-300" />{" "}
                        Activation Date
                      </span>
                      <span className="font-semibold text-slate-700 text-[11px]">
                        {registrationTimestamp}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <ShieldCheck size={12} className="text-slate-300" />{" "}
                        Bylaw Attestation
                      </span>
                      <span className="font-bold text-emerald-700 text-[10px] uppercase tracking-widest bg-emerald-50 px-2 py-0.5 border border-emerald-100/50 rounded-md">
                        Signed & Logged
                      </span>
                    </div>
                  </div>

                  <div className="w-full space-y-3 pt-4">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="w-full h-14 font-bold text-xs bg-slate-50 hover:bg-slate-100 text-[#074073] rounded-2xl transition-all border border-slate-200/60 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                    >
                      <Download size={14} />
                      <span>Download Terms & Conditions</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate("/auth/login")}
                      className="w-full h-14 font-bold text-xs bg-[#074073] hover:bg-[#052d52] text-white rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                    >
                      <span>Cancel Session</span>
                      <LogOut size={14} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberAcceptTerms;
