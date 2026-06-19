import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  User,
  Smartphone,
  Mail,
  Bell,
  MessageSquare,
  FileText,
  Layers,
  Send,
  AlertTriangle,
  ShieldCheck,
  Type,
  ArrowUpRight,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { useToast } from "../../../contexts/ToastProvider";

export default function NotifyApplicant() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { applicationId } = useParams();

  // Active officer session context
  const currentOfficer = {
    uuid: "user-uuid-of-disbursing-officer",
    name: "John Kamau",
    currentDate: "2026-06-19",
  };

  // Mock applicant information
  const [applicantDetails] = useState({
    number: "APP-00002",
    name: "ALMASI ALUOCH",
    mobile: "+254765350350",
    email: "almasi.aluoch@gmail.com",
    product: "Development Loan",
  });

  const [formData, setFormData] = useState({
    channel: "SMS", // 'SMS' | 'EMAIL' | 'BOTH'
    template_type: "custom", // 'custom' | 'reminder' | 'approved' | 'missing_docs'
    subject: "Update on your Loan Application",
    message: "",
  });

  const [errors, setErrors] = useState({});

  // Dynamic template presets to speed up operations for the officer
  const templates = {
    custom: "",
    reminder: `Hello ${applicantDetails.name}, this is a quick reminder regarding your application ${applicantDetails.number} for the ${applicantDetails.product}. Please check your account dashboard for upcoming steps.`,
    approved: `Great news ${applicantDetails.name}! Your application ${applicantDetails.number} for the ${applicantDetails.product} has been successfully approved by the credit committee. We are now processing your disbursement details.`,
    missing_docs: `Hello ${applicantDetails.name}, we noticed some missing documents on your application ${applicantDetails.number}. Please log in to your portal and upload your latest certified 3-month payslips so we can complete your review.`,
  };

  // Automatically update message body when a template option is chosen
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      message: templates[formData.template_type],
    }));
  }, [formData.template_type]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const { mutate, isLoading } = useMutation({
    mutationKey: ["send-loan-notification"],
    mutationFn: async () => {
      const finalPayload = {
        application_id: applicationId || applicantDetails.number,
        sender_officer_id: currentOfficer.uuid,
        channel: formData.channel,
        recipient_contact:
          formData.channel === "EMAIL"
            ? applicantDetails.email
            : applicantDetails.mobile,
        subject: formData.channel !== "SMS" ? formData.subject : null,
        message: formData.message,
        sent_at: currentOfficer.currentDate,
      };
      console.log("Dispatching communication network payload:", finalPayload);
      // return await axios.post('/api/notifications/send', finalPayload);
    },
    onSuccess: () => {
      showToast({
        title: "Message Sent Successfully!",
        type: "success",
        position: "top-right",
        description: `Your notification has been broadcast via ${formData.channel}.`,
      });
      navigate(-1);
    },
    onError: (error) => {
      showToast({
        title: "Failed to Send Message",
        type: "error",
        position: "top-right",
        description: error?.message || "Communication channel timeout.",
      });
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (formData.channel !== "SMS" && !formData.subject.trim()) {
      newErrors.subject = "Please provide an email subject line.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "The message body cannot be left blank.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    mutate();
  };

  return (
    <div className="w-full space-y-6 font-sans antialiased text-slate-800 p-1">
      {/* 1. TOP PROCESS NAVIGATION HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200/60 pb-5 select-none">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="size-10 rounded-xl border border-slate-200/80 bg-white flex items-center justify-center text-slate-500 hover:text-slate-900 shadow-3xs cursor-pointer transition-all"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
              Communication Hub
            </span>
            <h1 className="text-xl font-black tracking-tight text-slate-900 mt-0.5">
              Send Applicant Notification
            </h1>
          </div>
        </div>
      </div>

      {/* 2. SIDE-BY-SIDE QUICK LOOK CONTAINERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch w-full select-none">
        {/* CONTAINER 1: RECIPIENT INFORMATION */}
        <SectionCard title="Recipient Information" icon={<User size={14} />}>
          <div className="space-y-4">
            <FormInput
              icon={<User />}
              label="Applicant Name"
              value={applicantDetails.name}
              disabled
              readOnly
            />
            <FormInput
              icon={<Layers />}
              label="Application Number"
              value={applicantDetails.number}
              disabled
              readOnly
            />
          </div>
        </SectionCard>

        {/* CONTAINER 2: CONTACT DETAILS */}
        <SectionCard
          title="Contact Destinations"
          icon={<Smartphone size={14} />}
        >
          <div className="space-y-4">
            <FormInput
              icon={<Smartphone />}
              label="Mobile Number"
              value={applicantDetails.mobile}
              disabled
              readOnly
            />
            <FormInput
              icon={<Mail />}
              label="Email Address"
              value={applicantDetails.email}
              disabled
              readOnly
            />
          </div>
        </SectionCard>

        {/* CONTAINER 3: MESSAGE SETUP */}
        <SectionCard title="Channel Configuration" icon={<Bell size={14} />}>
          <div className="space-y-4">
            <FormSelect
              icon={<Bell />}
              label="Send Via"
              name="channel"
              value={formData.channel}
              onChange={handleInputChange}
              required
            >
              <option value="SMS">SMS Text Message Only</option>
              <option value="EMAIL">Email Letter Only</option>
              <option value="BOTH">Simultaneous (SMS & Email)</option>
            </FormSelect>

            <FormSelect
              icon={<MessageSquare />}
              label="Choose Template"
              name="template_type"
              value={formData.template_type}
              onChange={handleInputChange}
              required
            >
              <option value="custom">Blank (Write Custom Message)</option>
              <option value="reminder">Application Milestone Reminder</option>
              <option value="approved">
                Loan Approval Congratulatory Notice
              </option>
              <option value="missing_docs">
                Missing Onboarding Documents Request
              </option>
            </FormSelect>
          </div>
        </SectionCard>
      </div>

      {/* 3. FULL WIDTH LOWER WORKSPACE: TEXT ENGINES */}
      <div className="w-full bg-white border border-slate-200/60 rounded-[24px] p-6 space-y-6 shadow-3xs">
        <div className="space-y-5">
          {/* CONDITIONAL SUBJECT LINE (Only for Email or Both channels) */}
          {formData.channel !== "SMS" && (
            <div className="animate-in fade-in duration-200 max-w-xl">
              <FormInput
                icon={<Type />}
                label="Email Subject Line"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                error={errors.subject}
                placeholder="Enter email heading content..."
                required
              />
            </div>
          )}

          {/* UNWRAPPED DESIGN: MESSAGE TEXTAREA */}
          <div className="flex flex-col space-y-2 w-full">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block select-none">
              Notification Message Body <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={5}
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className={`w-full p-4 bg-slate-50/60 border rounded-xl text-xs font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:bg-white transition-all resize-none shadow-3xs ${
                errors.message
                  ? "border-rose-400 focus:border-rose-500"
                  : "border-slate-200 focus:border-[#074073]"
              }`}
              placeholder="Type out the exact message body contents you wish to broadcast to the applicant..."
              required
            />
            {errors.message && (
              <span className="text-[11px] font-semibold text-rose-600 ml-1">
                {errors.message}
              </span>
            )}
          </div>
        </div>

        {/* 4. SIDE-BY-SIDE DISCLAIMERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 select-none">
          {/* DISCLAIMER 1: COMPLIANCE LOCK */}
          <div className="p-4 bg-slate-50/80 border border-slate-200/80 rounded-xl flex items-center gap-3 text-xs text-slate-600 font-medium leading-relaxed shadow-3xs">
            <ShieldCheck size={16} className="text-[#074073] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-slate-900">
                Communication Fair Policy
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                Make sure the text stays friendly, helpful, and directly related
                to the applicant's account updates. Avoid using intense
                language, all-caps text, or unnecessary internal system jargon.
              </p>
            </div>
          </div>

          {/* DISCLAIMER 2: ACCURACY CONFIRMATION */}
          <div className="p-4 bg-amber-50/60 border border-amber-200/60 rounded-xl flex items-center gap-3 text-xs text-amber-800 font-medium leading-relaxed shadow-3xs">
            <AlertTriangle
              size={16}
              className="text-amber-600 shrink-0 mt-0.5"
            />
            <div className="space-y-1">
              <p className="font-bold text-slate-900">Contact Delivery Check</p>
              <p className="text-[11px] text-amber-700 font-medium">
                Double-check that the applicant's phone number or email listed
                above is accurate before pressing send. Messages are dispatched
                instantly and cannot be recalled once they exit our network
                systems.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[24px] border border-slate-200/60 p-4 flex items-center justify-end gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          <button
            type="button"
            className="h-11 px-5 border border-slate-200/80 bg-white text-slate-600 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => navigate("/admin/apply-loan/eligibility")}
            type="button"
            className="h-11 px-6 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-primary/10 hover:bg-primary/90 transition-all active:scale-97 cursor-pointer flex items-center gap-2"
          >
            <span>Send Message</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SUPPORTIVE CHILD UI HOOK CHASSIS WITH PREFIX EMBEDDING DESIGN
   ========================================================================== */

const SectionCard = ({ title, icon, children }) => (
  <div className="bg-white border border-slate-200/60 shadow-sm rounded-[24px] p-5 space-y-4 flex flex-col w-full h-full justify-start">
    <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5 border-b border-slate-100 pb-2">
      {icon} {title}
    </h3>
    <div className="flex-1 w-full">{children}</div>
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
      <div className="absolute left-10 top-1/2 -translate-y-1/2 w-px h-4 bg-slate-200/80 group-focus-within:bg-[#074073]/30 transition-colors pointer-events-none z-10" />
      <input
        {...props}
        className={`w-full h-14 pl-12 pr-4 bg-slate-50/60 border rounded-xl text-xs font-semibold outline-none transition-all focus:bg-white focus:ring-4 focus:ring-primary/5 placeholder:text-slate-400 placeholder:font-normal font-sans disabled:opacity-60 disabled:cursor-not-allowed ${
          error
            ? "border-rose-400 text-rose-900 focus:border-rose-500"
            : "border-slate-200/80 text-slate-800 focus:border-[#074073]"
        }`}
      />
    </div>
    {error && (
      <span className="text-[11px] font-semibold text-rose-600 mt-1 ml-1">
        {error}
      </span>
    )}
  </div>
);

const FormSelect = ({ icon, label, error, children, ...props }) => (
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
      <div className="absolute left-10 top-1/2 -translate-y-1/2 w-px h-4 bg-slate-200/80 group-focus-within:bg-[#074073]/30 transition-colors pointer-events-none z-10" />
      <select
        {...props}
        className={`w-full h-14 pl-12 pr-10 bg-slate-50/60 border rounded-xl text-xs font-semibold outline-none transition-all focus:bg-white focus:ring-4 focus:ring-primary/5 appearance-none font-sans cursor-pointer ${
          error
            ? "border-rose-400 text-rose-900 focus:border-rose-500"
            : "border-slate-200/80 text-slate-800 focus:border-[#074073]"
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
  </div>
);
