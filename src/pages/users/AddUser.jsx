import React, { useState } from "react";
import {
  ArrowLeft,
  User,
  Mail,
  Smartphone,
  Lock,
  Building2,
  Briefcase,
  MapPin,
  Globe,
  Key,
  Fingerprint,
  ArrowUpRight,
  Eye,
  Check,
  CheckCircle2,
  Copy,
  Printer,
  UserPlus,
  Info,
  ArrowRight,
  X,
} from "lucide-react";
import { getRoles } from "../../sdk/roles/roles";
import { useQuery, useMutation } from "react-query";
import { useToast } from "../../contexts/ToastProvider";
import { addUser } from "../../sdk/users/users";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function AddAdminUser() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Workflow Phase Tracking States
  const [roles, setRoles] = useState([]);
  const [isReviewing, setIsReviewing] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    phone: "",
    office_phone: "",
    job_title: "",
    department: "",
    country: "Kenya",
    county: "",
    subcounty: "",
    address: "",
    role_id: "",
  });
  useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const response = await getRoles();
      return response.data?.data;
    },
    onSuccess: (data) => {
      setRoles(data || []);
    },
    onError: (error) => {
      showToast({
        title: "Roles processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateField = (name, value, isRequired) => {
    let errorMsg = "";

    if (isRequired && (!value || value.toString().trim() === "")) {
      errorMsg = "This field is required";
    } else if (value) {
      if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errorMsg = "Invalid email format (e.g., name@sacco.co.ke)";
      }
      // Relaxed phone check to cleanly support numbers starting with 0 (e.g., 0721...)
      if (name === "phone" && !/^\+?[0-9]\d{7,14}$/.test(value)) {
        errorMsg = "Invalid phone number formatting";
      }
      if (name === "password" && value.length < 8) {
        errorMsg = "Password must be at least 8 characters long";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    return errorMsg;
  };

  const handleBlur = (e) => {
    const { name, value, required } = e.target;
    validateField(name, value, required);
  };

  const handleProceedToPreview = () => {
    const newErrors = {};
    const requiredFields = [
      "firstname",
      "lastname",
      "username",
      "email",
      "department",
      "job_title",
      "phone",
      "role_id",
      "country",
      "address",
    ];

    requiredFields.forEach((field) => {
      const isRequired = true;
      const errorMsg = validateField(field, formData[field], isRequired);
      if (errorMsg) newErrors[field] = errorMsg;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      // Map names to a human-readable list (e.g., role_id turns into "role id")
      const pendingFieldsList = Object.keys(newErrors)
        .map((f) => f.replace("_", " "))
        .join(", ");

      showToast({
        title: "Validation Incomplete",
        type: "error",
        position: "top-right",
        description: `Please check or complete these fields: ${pendingFieldsList}`,
      });
      return;
    }
    setIsReviewing(true);
  };

  const { mutate, isLoading } = useMutation({
    mutationKey: ["add user"],
    mutationFn: async () => {
      return await addUser(
        formData?.email,
        formData?.username,
        formData?.firstname,
        formData?.lastname,
        formData?.phone,
        formData?.job_title,
        formData?.office_phone,
        formData?.department,
        formData?.country,
        formData?.county,
        formData?.subcounty,
        formData?.address,
        formData?.role_id
      );
    },
    onSuccess: () => {
      const activeRoleName =
        roles.find((r) => String(r.id) === String(formData.role_id))?.name ||
        "Authorized Admin";
      setSuccessData({
        ...formData,
        role_name: activeRoleName,
      });
    },
    onError: (error) => {
      console.log(error);
      showToast({
        title: "Provisioning execution aborted",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(successData?.password || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetWorkflow = () => {
    setSuccessData(null);
    setIsReviewing(false);
    setFormData({
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      phone: "",
      office_phone: "",
      job_title: "",
      department: "",
      country: "Kenya",
      county: "",
      subcounty: "",
      address: "",
      role_id: "",
    });
    setErrors({});
  };

  // Reusable Component inside the Preview Spec Matrix
  const PreviewItem = ({ label, value }) => (
    <div className="space-y-1 py-2.5 border-b border-slate-100/80 last:border-0">
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block select-none">
        {label}
      </span>
      <p className="text-xs font-bold text-slate-800 font-mono tracking-wide">
        {value && value.toString().trim() !== "" ? (
          value
        ) : (
          <span className="text-slate-300 font-normal italic">
            Not Disclosed
          </span>
        )}
      </p>
    </div>
  );

  return (
    <>
      <div className="w-full space-y-8 font-sans antialiased text-slate-800">
        {/* 1. TOP PROCESS NAVIGATION BAR */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200/60 pb-6 select-none">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() =>
                isReviewing ? setIsReviewing(false) : navigate(-1)
              }
              className="size-10 rounded-xl border border-slate-200/80 bg-white flex items-center justify-center text-slate-500 hover:text-slate-900 shadow-xs cursor-pointer transition-all active:scale-95"
            >
              <ArrowLeft size={16} />
            </button>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
                  {isReviewing
                    ? "Data Verification Pre-vetting"
                    : "Directory Provisioning Controls"}
                </span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1.5">
                {isReviewing
                  ? "Review Profile Specifications"
                  : "Add Administrative User"}
              </h1>
            </div>
          </div>
        </div>

        {!isReviewing ? (
          /* --- WORKSPACE PHASE A: FULLY INTERACTIVE EDITABLE ENTRY FORM --- */
          <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* PANEL A: BIOGRAPHICAL & AUTHENTICATION CONTEXT */}
              <FormCard
                title="Biographical Information"
                icon={<User size={16} />}
              >
                <FormInput
                  icon={<User />}
                  label="First Name"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  error={errors.firstname}
                  placeholder="e.g., Rodney"
                  required
                />
                <FormInput
                  icon={<User />}
                  label="Last Name"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  error={errors.lastname}
                  placeholder="e.g., Chelal"
                  required
                />
                <FormInput
                  icon={<Fingerprint />}
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  error={errors.username}
                  placeholder="e.g., rodney"
                  required
                />
                <FormInput
                  icon={<Mail />}
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  error={errors.email}
                  placeholder="e.g., username@sacco.co.ke"
                  required
                />
              </FormCard>

              {/* PANEL B: CORPORATE ALLOCATION & PRIVILEGE LIFESPAN */}
              <FormCard
                title="Contact Information"
                icon={<Building2 size={16} />}
              >
                <FormInput
                  icon={<Building2 />}
                  label="Department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  error={errors.department}
                  placeholder="e.g., IT Infrastructure"
                  required
                />
                <FormInput
                  icon={<Briefcase />}
                  label="Job Designation"
                  name="job_title"
                  value={formData.job_title}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  error={errors.job_title}
                  placeholder="e.g., CyberSec Analyst"
                  required
                />
                <FormInput
                  icon={<Smartphone />}
                  label="Primary Mobile Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  error={errors.phone}
                  placeholder="e.g., +254721545347"
                  required
                />
                <FormInput
                  icon={<Smartphone />}
                  label="Alternate Mobile Number"
                  name="office_phone"
                  value={formData.office_phone}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  error={errors.office_phone}
                  placeholder="e.g., 0724122252"
                />

                <FormSelect
                  icon={<Key />}
                  label="Assigned Role"
                  name="role_id"
                  value={formData.role_id}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  error={errors.role_id}
                  required
                >
                  <option value="" disabled hidden>
                    Select authorization role...
                  </option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </FormSelect>
              </FormCard>

              {/* PANEL C: JURISDICTIONAL DEPLOYMENT BOUNDS */}
              <div className="lg:col-span-2">
                <FormCard
                  title="Geographical Location"
                  icon={<Globe size={16} />}
                >
                  <FormInput
                    icon={<Globe />}
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    error={errors.country}
                    placeholder="e.g., Kenya"
                    required
                  />
                  <FormInput
                    icon={<MapPin />}
                    label="County"
                    name="county"
                    value={formData.county}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    error={errors.county}
                    placeholder="e.g., Nairobi County"
                  />
                  <FormInput
                    icon={<MapPin />}
                    label="Sub-County"
                    name="subcounty"
                    value={formData.subcounty}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    error={errors.subcounty}
                    placeholder="e.g., Westlands Sub-County"
                  />
                  <FormInput
                    icon={<MapPin />}
                    label="Physical Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    error={errors.address}
                    placeholder="e.g., Westlands Branch, Suite 4B"
                    required
                  />
                </FormCard>
              </div>
            </div>

            {/* EDIT CANVASS BAR NAVIGATION CONTROLS */}
            <div className="bg-white rounded-[24px] border border-slate-200/60 p-4 flex items-center justify-end gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="h-11 px-5 border border-slate-200/80 bg-white text-slate-600 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleProceedToPreview}
                className="h-11 px-6 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-primary/10 hover:bg-primary/90 transition-all active:scale-97 cursor-pointer flex items-center gap-2"
              >
                <span>Review Profile</span>
                <Eye size={14} />
              </button>
            </div>
          </form>
        ) : (
          /* --- WORKSPACE PHASE B: HIGH DENSITY READ-ONLY PREVIEW SYSTEM --- */
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="bg-white border border-slate-200/60 shadow-sm rounded-[24px] p-6 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2 border-b border-slate-100 pb-2.5">
                  <User size={14} /> Biographical Summary
                </h3>
                <div className="space-y-1">
                  <PreviewItem
                    label="Full Profile Identity Name"
                    value={`${formData.firstname} ${formData.lastname}`}
                  />
                  <PreviewItem
                    label="Account Handle Identifier"
                    value={`@${formData.username}`}
                  />
                  <PreviewItem
                    label="Electronic Delivery Endpoint"
                    value={formData.email}
                  />
                </div>
              </div>

              <div className="bg-white border border-slate-200/60 shadow-sm rounded-[24px] p-6 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2 border-b border-slate-100 pb-2.5">
                  <Building2 size={14} /> Functional Placement Parameters
                </h3>
                <div className="space-y-1">
                  <div className="grid grid-cols-2 gap-x-6">
                    <PreviewItem
                      label="Department"
                      value={formData.department}
                    />
                    <PreviewItem
                      label="Job Designation"
                      value={formData.job_title}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-x-6">
                    <PreviewItem
                      label="Primary Mobile Line"
                      value={formData.phone}
                    />
                    <PreviewItem
                      label="Office/Alternate Line"
                      value={formData.office_phone}
                    />
                  </div>
                  <PreviewItem
                    label="Security Access Clearance Assignment"
                    value={
                      roles.find(
                        (r) => String(r.id) === String(formData.role_id),
                      )?.name
                    }
                  />
                </div>
              </div>

              <div className="lg:col-span-2 bg-white border border-slate-200/60 shadow-sm rounded-[24px] p-6 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2 border-b border-slate-100 pb-2.5">
                  <Globe size={14} /> Geographical Operational Bounds
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  <PreviewItem
                    label="Sovereign Jurisdiction Territory"
                    value={formData.country}
                  />
                  <PreviewItem
                    label="Regional Area County"
                    value={formData.county}
                  />
                  <PreviewItem
                    label="Sub-County Constituency Perimeter"
                    value={formData.subcounty}
                  />
                  <PreviewItem
                    label="Physical Base Office Address"
                    value={formData.address}
                  />
                </div>
              </div>
            </div>

            {/* PREVIEW CANVASS NAVIGATION CONTROL ACTIONS */}
            <div className="bg-white rounded-[24px] border border-slate-200/60 p-4 flex items-center justify-end gap-3 shadow-3xs">
              <button
                type="button"
                onClick={() => setIsReviewing(false)}
                className="h-11 px-5 border border-slate-200 bg-white text-slate-600 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
              >
                Modify Fields
              </button>
              <button
                onClick={handleFormSubmit}
                disabled={isLoading}
                type="button"
                className="h-11 px-6 bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-600/10 hover:bg-emerald-700 transition-all active:scale-97 cursor-pointer flex items-center gap-2 disabled:bg-slate-200 disabled:text-slate-400"
              >
                <span>
                  {isLoading ? "Provisioning..." : "Confirm & Add User"}
                </span>
                <Check size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {successData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/30 select-none backdrop-blur-3xs"
          >
            <div
              className="absolute inset-0"
              onClick={() => navigate(`/admin/all-users`)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
              className="bg-white relative w-full max-w-md rounded-[24px] p-6 shadow-xl flex flex-col items-center text-center z-10 border border-slate-100"
            >
              <button
                onClick={() => navigate(`/admin/all-users`)}
                className="absolute top-4 right-4 w-7 h-7 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full flex items-center justify-center transition-all cursor-pointer"
              >
                <X size={14} />
              </button>

              <div className="size-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border-4 border-white shadow-sm shadow-emerald-600/10 mb-4">
                <CheckCircle2 size={24} strokeWidth={2.5} />
              </div>

              <div className="space-y-1 mb-6 px-2">
                <h3 className="text-lg font-black text-slate-900 tracking-tight">
                  User Added Successfully
                </h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  Awesome!{" "}
                  <span className="font-bold text-slate-700">
                    {successData.firstname} {successData.lastname}
                  </span>{" "}
                  is officially registered. Their temporary access key has been
                  sent to your email. Follow the instructions to update your
                  password
                </p>
              </div>

              <div className="w-full grid grid-cols-1 gap-5">
                <button
                  type="button"
                  onClick={() => navigate(`/admin/all-users`)}
                  className="w-full h-11 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-1.5 order-1"
                >
                  <span>Go to User Directory</span>
                  <ArrowRight size={13} />
                </button>
                <button
                  type="button"
                  onClick={handleResetWorkflow}
                  className="w-full h-11 bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-100 transition-all cursor-pointer flex items-center justify-center gap-1.5 order-2"
                >
                  <UserPlus size={13} />
                  <span>Add Another User</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* =========================================================================
   SUPPORTING STRUCTURAL SUB-COMPONENTS
   ========================================================================= */
const FormCard = ({ title, icon, children }) => (
  <div className="bg-white border border-slate-200/60 shadow-sm rounded-[24px] overflow-hidden w-full h-full">
    <div className="px-5 py-4 bg-slate-50/60 border-b border-slate-100 flex items-center gap-2.5 select-none">
      <div className="size-7 rounded-lg bg-white border border-slate-200/60 flex items-center justify-center text-slate-400 shadow-2xs">
        {icon}
      </div>
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
        {title}
      </h3>
    </div>
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      {children}
    </div>
  </div>
);

export const FormInput = ({ icon, label, error, ...props }) => (
  <div className="flex flex-col space-y-2 w-full min-w-0">
    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block select-none">
      {label}{" "}
      {props.required && (
        <span className="text-rose-500 font-sans ml-0.5">*</span>
      )}
    </label>
    <div className="relative w-full group">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4 flex items-center justify-center pointer-events-none z-10 group-focus-within:text-primary transition-colors">
        {React.cloneElement(icon, { size: 14 })}
      </div>
      <div className="absolute left-10 top-1/2 -translate-y-1/2 w-px h-4 bg-slate-200/80 group-focus-within:bg-primary/30 transition-colors pointer-events-none z-10" />
      <input
        {...props}
        className={`w-full h-12 pl-12 pr-4 bg-slate-50/60 border rounded-xl text-xs font-semibold outline-none transition-all focus:bg-white focus:ring-4 focus:ring-primary/5 placeholder:text-slate-400 placeholder:font-normal font-sans ${
          error
            ? "border-rose-400 text-rose-900 focus:border-rose-500 focus:ring-rose-500/5"
            : "border-slate-200/80 text-slate-800 focus:border-primary"
        }`}
      />
    </div>
    {error && (
      <span className="text-[11px] font-semibold text-rose-600 mt-1 ml-1 animate-in fade-in duration-150">
        {error}
      </span>
    )}
  </div>
);

export const FormSelect = ({ icon, label, error, children, ...props }) => (
  <div className="flex flex-col space-y-2 w-full min-w-0">
    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block select-none">
      {label}{" "}
      {props.required && (
        <span className="text-rose-500 font-sans ml-0.5">*</span>
      )}
    </label>
    <div className="relative w-full group">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4 flex items-center justify-center pointer-events-none z-10 group-focus-within:text-primary transition-colors">
        {React.cloneElement(icon, { size: 14 })}
      </div>
      <div className="absolute left-10 top-1/2 -translate-y-1/2 w-px h-4 bg-slate-200/80 group-focus-within:bg-primary/30 transition-colors pointer-events-none z-10" />
      <select
        {...props}
        className={`w-full h-12 pl-12 pr-10 bg-slate-50/60 border rounded-xl text-xs font-semibold outline-none transition-all focus:bg-white focus:ring-4 focus:ring-primary/5 appearance-none font-sans cursor-pointer ${
          error
            ? "border-rose-400 text-rose-900 focus:border-rose-500 focus:ring-rose-500/5"
            : "border-slate-200/80 text-slate-800 focus:border-primary"
        }`}
      >
        {children}
      </select>
      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m 6,9 6,6 6,-6" />
        </svg>
      </div>
    </div>
    {error && (
      <span className="text-[11px] font-semibold text-rose-600 mt-1 ml-1 animate-in fade-in duration-150">
        {error}
      </span>
    )}
  </div>
);
