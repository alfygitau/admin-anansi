import { useState } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Loader2,
  ShieldCheck,
  KeyRound,
  Fingerprint,
  ShieldAlert,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "react-query";
import { useToast } from "../../contexts/ToastProvider";
import useAuth from "../../hooks/useAuth";

const updateMemberPassword = async (userId, password) => {
  return new Promise((resolve) => setTimeout(resolve, 1200));
};

const MemberCreateAccess = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { auth } = useAuth();

  const validateField = (name, value) => {
    let error = "";
    if (name === "password") {
      if (value.length < 8)
        error = "Password matrix must be at least 8 characters in length";
    }
    if (name === "confirmPassword") {
      if (value !== formData.password)
        error = "Password validation token mismatch";
    }
    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const fieldError = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const isFormValid =
    formData.password &&
    formData.confirmPassword &&
    formData.password.length >= 8 &&
    formData.password === formData.confirmPassword &&
    !errors.password &&
    !errors.confirmPassword;

  const { mutate: passwordMutate, isLoading } = useMutation({
    mutationKey: ["member-update-password"],
    mutationFn: () => updateMemberPassword(auth?.user?.id, formData.password),
    onSuccess: () => {
      showToast({
        title: "Credentials Saved",
        type: "success",
        position: "top-right",
        description:
          "Your secure passphrase metrics have been integrated into your account profile.",
      });
      navigate("/auth/accept-terms");
    },
    onError: (error) => {
      showToast({
        title: "Configuration Error",
        type: "error",
        position: "top-right",
        description: error?.message || "Failed to commit credential updates.",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    passwordMutate();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 sm:p-2 antialiased">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 py-3 px-6 bg-white overflow-hidden">
        {/* LEFT COLUMN: SECURITY FRAMEWORKS & ENCRYPTION INSULATION */}
        <div className="relative bg-white sm:hidden p-6 lg:p-6 flex flex-col justify-between overflow-hidden border-r border-slate-200">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-full border border-slate-100 mb-12">
              <ShieldCheck className="text-primary" size={18} />
              <span className="text-primary text-xs font-medium tracking-widest uppercase">
                Anansi Sacco
              </span>
            </div>
            <h2 className="text-slate-900 text-2xl xl:text-2xl font-medium leading-[1.2] mb-8">
              Protecting your portfolio profile parameters with{" "}
              <span className="text-primary">advanced credential hashing.</span>
            </h2>

            <div className="space-y-8">
              <div className="flex gap-5 group">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50/60 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-colors">
                  <KeyRound
                    className="text-primary group-hover:text-white transition-colors"
                    size={22}
                  />
                </div>
                <div>
                  <h4 className="text-slate-900 font-medium text-md">
                    Cryptographic Isolation
                  </h4>
                  <p className="text-slate-500 text-[12px] font-medium leading-relaxed mt-1">
                    Your password layout parameters pass through high-grade
                    salt-hashing algorithms before database synchronization,
                    ensuring zero plaintext exposure risk.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 group">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50/60 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Fingerprint
                    className="text-primary group-hover:text-white transition-colors"
                    size={22}
                  />
                </div>
                <div>
                  <h4 className="text-slate-900 font-medium text-md">
                    Unified Session Security
                  </h4>
                  <p className="text-slate-500 text-[12px] font-medium leading-relaxed mt-1">
                    Updating your access key forces immediate revocation of open
                    session tokens across legacy background browser terminals
                    and untrusted devices.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 group">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50/60 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-colors">
                  <ShieldAlert
                    className="text-primary group-hover:text-white transition-colors"
                    size={22}
                  />
                </div>
                <div>
                  <h4 className="text-slate-900 font-medium text-md">
                    Anti-Takeover Standards
                  </h4>
                  <p className="text-slate-500 text-[12px] font-medium leading-relaxed mt-1">
                    Our compliance engines actively monitor credential strength
                    indicators in accordance with SASRA digital identity
                    protection policies.
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

        {/* RIGHT COLUMN: PASSPHRASE SELECTION AND VERIFICATION CARD */}
        <div className="p-6 lg:p-6 sm:p-2 flex items-center justify-center bg-white">
          <div className="w-full">
            <div className="mb-10">
              <h1 className="text-3xl font-medium text-slate-900 tracking-tight">
                Establish Password
              </h1>
              <p className="text-slate-400 font-medium mt-2">
                Configure your unique system security key to activate your
                contributor vault connection.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Primary Password Field */}
              <div className="space-y-2">
                <label className="text-[11px] font-medium text-slate-400 uppercase tracking-widest ml-1">
                  New Security Key
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none">
                    <Lock
                      size={18}
                      className="text-slate-300 group-focus-within:text-blue-600 transition-colors"
                    />
                    <div className="w-[1.5px] h-5 bg-slate-200 ml-4 group-focus-within:bg-blue-200 transition-colors" />
                  </div>
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full pl-[74px] pr-14 py-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all font-semibold text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-6 text-slate-300 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <AnimatePresence>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-rose-500 text-[11px] font-bold flex items-center gap-1 ml-1"
                    >
                      <AlertCircle size={12} /> {errors.password}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="text-[11px] font-medium text-slate-400 uppercase tracking-widest ml-1">
                  Re-type Security Key
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none">
                    <Lock
                      size={18}
                      className="text-slate-300 group-focus-within:text-blue-600 transition-colors"
                    />
                    <div className="w-[1.5px] h-5 bg-slate-200 ml-4 group-focus-within:bg-blue-200 transition-colors" />
                  </div>
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full pl-[74px] pr-14 py-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all font-semibold text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-6 text-slate-300 hover:text-slate-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                <AnimatePresence>
                  {errors.confirmPassword && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-rose-500 text-[11px] font-bold flex items-center gap-1 ml-1"
                    >
                      <AlertCircle size={12} /> {errors.confirmPassword}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="h-2"></div>

              {/* Commit Action Invocation Target Button */}
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
                    Authorize Password Profile <ArrowRight size={18} />
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

export default MemberCreateAccess;
