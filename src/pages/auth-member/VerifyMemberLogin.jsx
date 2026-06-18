import { useState, useEffect, useRef } from "react";
import {
  ShieldCheck,
  RefreshCw,
  ArrowRight,
  Loader2,
  Smartphone,
  Zap,
  TrendingUp,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { sendMobileOtp, verifyUser } from "../../sdk/auth/auth";
import { useMutation } from "react-query";
import { useToast } from "../../contexts/ToastProvider";
import useAuth from "../../hooks/useAuth";

const VerifyMemberLogin = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const { showToast } = useToast();

  // Countdown timer logic for security token resend
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const maskPhoneNumber = (phone) => {
    if (!phone) return "********000";
    // Formats and masks standard KE mobile lines seamlessly
    return phone.replace(/(\d{4})(\d{5})(\d{3})/, "$1*****$3");
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    const updatedOtp = [
      ...otp.map((d, idx) => (idx === index ? element.value : d)),
    ];
    setOtp(updatedOtp);

    // Auto-advance focal point to the next box layout
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Reverse field focus if backspace is detected on empty blocks
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const { mutate: verifyUserMutate, isLoading } = useMutation({
    mutationKey: ["verify-member-otp"],
    mutationFn: () =>
      verifyUser(
        auth?.user?.id,
        otp.join(""),
        auth?.user?.email,
        auth?.user?.mobileno,
      ),
    onSuccess: (data) => {
      setAuth(data?.data?.data);
      showToast({
        title: "Token Verified",
        type: "success",
        position: "top-right",
        description: "One-time secure challenge passed. Directing to password setup portal.",
      });
      // Pushes the member to the next step of the authentication flow
      navigate("/auth/create-password");
    },
    onError: (error) => {
      showToast({
        title: "Verification Failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const handleVerify = async (e) => {
    e.preventDefault();
    if (otp.join("").length < 6) return;
    verifyUserMutate();
  };

  const { mutate: resendOtpMutate, isLoading: isResending } = useMutation({
    mutationKey: ["send-member-otp"],
    mutationFn: () => sendMobileOtp(auth?.user?.id),
    onSuccess: () => {
      showToast({
        title: "Fresh Token Dispatched",
        type: "success",
        position: "top-right",
        description: "A secure activation string has been sent to your registered phone line.",
      });
    },
    onError: (error) => {
      showToast({
        title: "Resend Protocol Failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const handleResend = () => {
    if (timer > 0) return;
    setTimer(60);
    setOtp(new Array(6).fill(""));
    resendOtpMutate();
  };

  const isFormValid = otp.join("").length === 6;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 sm:p-2 antialiased">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 py-3 px-6 bg-white overflow-hidden">
        
        {/* LEFT COLUMN: VISUAL BENCHMARKS & VALUE PROPS */}
        <div className="relative bg-white sm:hidden p-6 lg:p-6 flex flex-col justify-between overflow-hidden border-r border-slate-200">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-full border border-slate-100 mb-12">
              <ShieldCheck className="text-primary" size={18} />
              <span className="text-primary text-xs font-medium tracking-widest uppercase">
                Anansi Sacco
              </span>
            </div>
            <h2 className="text-slate-900 text-2xl xl:text-2xl font-medium leading-[1.2] mb-8">
              Insulating your capital allocations and member equity with{" "}
              <span className="text-primary">two-factor authorization.</span>
            </h2>

            <div className="space-y-8">
              <div className="flex gap-5 group">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50/60 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Zap
                    className="text-primary group-hover:text-white transition-colors"
                    size={22}
                  />
                </div>
                <div>
                  <h4 className="text-slate-900 font-medium text-md">
                    Instant SMS Authorization
                  </h4>
                  <p className="text-slate-500 text-[12px] font-medium leading-relaxed mt-1">
                    A secure, time-sensitive 6-digit confirmation token is broadcast to your 
                    registered mobile line to verify physical wallet ownership.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 group">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50/60 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-colors">
                  <TrendingUp
                    className="text-primary group-hover:text-white transition-colors"
                    size={22}
                  />
                </div>
                <div>
                  <h4 className="text-slate-900 font-medium text-md">
                    Protected Member Session
                  </h4>
                  <p className="text-slate-500 text-[12px] font-medium leading-relaxed mt-1">
                    Verification locks down your dividend metrics, share balances, and saving 
                    parameters against external browser interception threats.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 group">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50/60 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Shield
                    className="text-primary group-hover:text-white transition-colors"
                    size={22}
                  />
                </div>
                <div>
                  <h4 className="text-slate-900 font-medium text-md">
                    Regulatory Asset Insulation
                  </h4>
                  <p className="text-slate-500 text-[12px] font-medium leading-relaxed mt-1">
                    Our validation mechanisms strictly interface with SASRA digital asset governance 
                    rules to guard contributor transparency.
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

        {/* RIGHT COLUMN: CODE CHALLENGE ENTRY PANEL */}
        <div className="p-6 lg:p-6 sm:p-2 flex items-center justify-center bg-white">
          <div className="w-full">
            <div className="mb-10">
              <h1 className="text-3xl font-medium text-slate-900 tracking-tight">
                Verify Member
              </h1>
              <p className="text-slate-400 font-medium mt-2 leading-relaxed text-sm">
                Provide the unique 6-digit credential verification string dispatched to your registered device link:
                <span className="font-bold text-primary block mt-1.5 items-center gap-1.5 text-xs tracking-wide">
                  <Smartphone size={12} className="inline mr-1" />{" "}
                  {maskPhoneNumber(auth?.user?.mobileno)}
                </span>
              </p>
            </div>

            <form onSubmit={handleVerify} className="space-y-8">
              
              {/* Box Input Array Target Grid */}
              <div className="space-y-2">
                <label className="text-[11px] font-medium text-slate-400 uppercase tracking-widest ml-1">
                  Verification Code
                </label>
                <div className="flex gap-4 sm:gap-2">
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      ref={(el) => (inputRefs.current[index] = el)}
                      value={data}
                      onChange={(e) => handleChange(e.target, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-14 h-14 sm:w-10 sm:h-12 text-center text-xl font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all font-mono"
                    />
                  ))}
                </div>
              </div>

              {/* Token Expiry & Resend Control Drawer */}
              <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 flex flex-col justify-center">
                <p className="text-[12px] font-medium text-slate-400">
                  Encountering network latency or failed SMS transmission?
                </p>
                <button
                  type="button"
                  disabled={timer > 0 || isResending}
                  onClick={handleResend}
                  className={`mt-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                    timer > 0
                      ? "text-slate-300 cursor-not-allowed"
                      : "text-primary hover:text-blue-800"
                  }`}
                >
                  <RefreshCw
                    size={12}
                    className={isResending ? "animate-spin" : ""}
                  />
                  {timer > 0 ? `Resend Token in ${timer}s` : "Resend Security Code"}
                </button>
              </div>

              <div className="h-1"></div>

              {/* Verification Dispatch Execution Target Button */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={!isFormValid || isLoading}
                className={`w-full py-6 rounded-2xl font-medium uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-all cursor-pointer
                  ${
                    isFormValid && !isLoading
                      ? "bg-primary text-white shadow-xl shadow-slate-900/10 hover:bg-secondary active:shadow-none"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed"
                  }`}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <>
                    Verify Token & Continue <ArrowRight size={18} />
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VerifyMemberLogin;