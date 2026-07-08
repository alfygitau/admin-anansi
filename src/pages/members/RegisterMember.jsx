import React, { useState } from "react";
import {
  User,
  Scan,
  FileText,
  Camera,
  MapPin,
  Briefcase,
  Users,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Loader2,
  X,
  Smartphone,
  Mail,
  ShieldCheck,
  FileUp,
  Shield,
  Hash,
  Calendar,
  Info,
  ChevronDown,
  Globe,
  Building2,
  Map,
  UserCheck,
  Coins,
  Phone,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const REGISTRATION_STEPS = [
  {
    id: "profile",
    label: "Create Profile",
    desc: "Personal information",
    icon: User,
  },
  {
    id: "scan_id",
    label: "Scan Identification",
    desc: "Identity verification",
    icon: Scan,
  },
  {
    id: "review_id",
    label: "Review ID Details",
    desc: "OCR information check",
    icon: FileText,
  },
  {
    id: "selfie",
    label: "Upload Selfie",
    desc: "Biometric confirmation",
    icon: Camera,
  },
  {
    id: "address",
    label: "Add Address Details",
    desc: "Residential location",
    icon: MapPin,
  },
  {
    id: "income",
    label: "Add Income Details",
    desc: "Financial parameters",
    icon: Briefcase,
  },
  {
    id: "next_of_kin",
    label: "Next of Kin",
    desc: "Emergency contacts",
    icon: Users,
  },
  {
    id: "review_submit",
    label: "Review & Confirm Details",
    desc: "Final file compilation",
    icon: CheckCircle2,
  },
];

const scannedData = {
  firstname: "John",
  middlename: "Kipkorir",
  lastname: "Doe",
  identification_type: "National ID",
  identification: "32145678",
  gender: "Male",
  dob: "1994-04-24",
};

export default function AddMember() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let errorMsg = "";

    // Dynamic Verification Logic
    if (!value || value.trim() === "") {
      errorMsg = "This field is required";
    } else {
      if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
        errorMsg = "Please enter a valid email address";
      }
      if (name === "mobileno" && value.length < 10) {
        errorMsg = "Enter a complete valid phone number";
      }
      if (name === "kra_pin" && !/^[A-Z0-9]{11}$/i.test(value)) {
        errorMsg = "KRA PIN must be exactly 11 characters";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };
  const activeStep = REGISTRATION_STEPS[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === REGISTRATION_STEPS.length - 1;

  const [formData, setFormData] = useState({
    username: "Alfred",
    email: "alfy@gmail.com",
    mobileno: "0754360450",

    firstname: "Alfred",
    middlename: "Kariuki",
    lastname: "Gitau",
    identification_type: "National ID",
    identification: "3006780",
    gender: "Male",
    dob: "29/12/1992",

    country: "Kenya",
    county: "Nakuru",
    subcounty: "Bahati",
    physical_address: "Subukia",

    employment_type: "IT",
    occupation: "Software Engineer",
    income: "200000",
    kra_pin: "A123456789G",

    fullname: "Margret Maina",
    relationship: "Wife",
    location: "Bahati",
    phone: "0780400400",
    date_of_birth: "29/12/1990",
  });
  const [previewUrl, setPreviewUrl] = useState(formData.selfieUrl || null);
  const [countyDropdownOpen, setCountyDropdownOpen] = useState(false);
  const [subcountyDropdownOpen, setSubcountyDropdownOpen] = useState(false);
  const countyOptions = [
    { value: "", label: "Select county..." },
    { value: "Nairobi", label: "Nairobi" },
    { value: "Mombasa", label: "Mombasa" },
    { value: "Kiambu", label: "Kiambu" },
    { value: "Kisumu", label: "Kisumu" },
    { value: "Nakuru", label: "Nakuru" },
  ];

  const subcountyOptions = [
    { value: "", label: "Select sub-county..." },
    { value: "Westlands", label: "Westlands" },
    { value: "Dagoretti", label: "Dagoretti" },
    { value: "Changamwe", label: "Changamwe" },
    { value: "Thika", label: "Thika" },
    { value: "Kisumu Central", label: "Kisumu Central" },
  ];
  const [employmentDropdownOpen, setEmploymentDropdownOpen] = useState(false);
  const employmentOptions = [
    { value: "", label: "Select employment type..." },
    { value: "Salaried", label: "Salaried / Employed" },
    { value: "Self-Employed", label: "Self-Employed / Business Owner" },
    { value: "Contractor", label: "Freelancer / Contractor" },
    { value: "Unemployed", label: "Unemployed" },
    { value: "Student", label: "Student" },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, selfieFile: file });
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      handleSubmitRegistration();
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleStepJump = (index) => {
    if (index < currentStepIndex) {
      setCurrentStepIndex(index);
    }
  };

  const handleSubmitRegistration = () => {
    setIsSubmitting(true);
    console.log("Submitting consolidated state data to the core engine...");
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="bg-slate-50 h-full flex flex-col text-slate-800">
      <div className="w-full h-full flex-1 flex flex-col lg:flex-row items-stretch gap-8">
        <div className="w-full lg:w-80 shrink-0 select-none">
          <div className="bg-white border border-slate-200/60 shadow-3xs rounded-2xl p-4 lg:h-full flex flex-col">
            <div className="mb-6">
              <h2 className="text-base font-black text-primary tracking-tight">
                Member KYC Lifecycle
              </h2>
              <p className="text-[11px] text-slate-400 font-medium">
                Complete all milestones to unlock ledger accounts.
              </p>
            </div>

            {/* INTERACTIVE TRACK TIMELINE */}
            <div className="relative space-y-2.5 flex-1">
              {REGISTRATION_STEPS.map((step, idx) => {
                const IconComponent = step.icon;
                const isCompleted = idx < currentStepIndex;
                const isActive = idx === currentStepIndex;

                return (
                  <div
                    key={step.id}
                    onClick={() => handleStepJump(idx)}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all duration-200 relative group ${
                      isActive
                        ? "bg-slate-50 border-slate-200 text-primary shadow-3xs"
                        : isCompleted
                          ? "bg-white border-slate-100 text-slate-800 cursor-pointer hover:bg-slate-50/50"
                          : "border-transparent opacity-40 select-none"
                    }`}
                  >
                    {/* STEP ICON / BADGE */}
                    <div
                      className={`size-7.5 rounded-lg flex items-center justify-center shrink-0 transition-colors shadow-3xs ${
                        isActive
                          ? ""
                          : isCompleted
                            ? "bg-emerald-500 border-emerald-600 text-white"
                            : "bg-slate-50 text-slate-400 group-hover:text-slate-600"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 size={13} strokeWidth={3} />
                      ) : (
                        <IconComponent size={13} strokeWidth={2.5} />
                      )}
                    </div>

                    {/* METADATA STRINGS */}
                    <div className="min-w-0 flex-1 flex flex-col pl-1">
                      <span
                        className={`text-[11px] font-black tracking-tight leading-none ${
                          isActive ? "text-primary" : "text-slate-700"
                        }`}
                      >
                        {step.label}
                      </span>
                      <span
                        className={`text-[9px] font-medium leading-none mt-1 truncate ${
                          isActive ? "text-slate-500" : "text-slate-400"
                        }`}
                      >
                        {step.desc}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="h-full flex-1 flex flex-col">
          <div className="bg-white border border-slate-200/60 shadow-3xs rounded-2xl flex-1 flex flex-col overflow-hidden h-full">
            {/* STAGE HEADER METRICS PANEL */}
            <div className="px-6 py-4.5 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between select-none">
              <div>
                <h1 className="text-lg font-black text-primary tracking-tight">
                  {activeStep.label}
                </h1>
              </div>
            </div>

            {/* MAIN WORKING AREA: INNER CONTENT PANELS */}
            <div className="p-5 md:p-5 flex-1 overflow-y-auto">
              {activeStep.id === "profile" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <motion.div className="bg-white relative w-full h-full flex flex-col">
                    {/* Header */}
                    <div className="pb-6">
                      <h2 className="text-l font-bold text-[#074073]">
                        Add Member
                      </h2>
                      <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                        Provide the primary contact and login credentials
                        required to establish this member's digital profile.
                      </p>
                    </div>

                    {/* Form Fields Grid */}
                    <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 pr-1">
                      {/* USERNAME */}
                      <div>
                        <FilterField label="Username" icon={User}>
                          <input
                            name="username"
                            className={`w-full pl-[74px] pr-6 py-5 h-14 bg-slate-50 border rounded-2xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all text-xs font-semibold text-slate-800 ${
                              errors.username
                                ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/5"
                                : "border-slate-200"
                            }`}
                            placeholder="e.g., jdoe_admin"
                            value={formData.username}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </FilterField>
                        {errors.username && (
                          <p className="text-rose-500 text-[11px] font-bold flex items-center gap-1 mt-1.5 ml-1 animate-in fade-in slide-in-from-top-1 duration-150">
                            <AlertCircle size={12} /> {errors.username}
                          </p>
                        )}
                      </div>

                      {/* EMAIL ADDRESS */}
                      <div>
                        <FilterField label="Email Address" icon={Mail}>
                          <input
                            type="email"
                            name="email"
                            className={`w-full pl-[74px] pr-6 py-5 h-14 bg-slate-50 border rounded-2xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all text-xs font-semibold text-slate-800 ${
                              errors.email
                                ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/5"
                                : "border-slate-200"
                            }`}
                            placeholder="name@organization.com"
                            value={formData.email}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </FilterField>
                        {errors.email && (
                          <p className="text-rose-500 text-[11px] font-bold flex items-center gap-1 mt-1.5 ml-1 animate-in fade-in slide-in-from-top-1 duration-150">
                            <AlertCircle size={12} /> {errors.email}
                          </p>
                        )}
                      </div>

                      {/* MOBILE NUMBER */}
                      <div className="md:col-span-2">
                        <FilterField label="Mobile Number" icon={Smartphone}>
                          <input
                            type="tel"
                            name="mobileno"
                            className={`w-full pl-[74px] pr-6 py-5 h-14 bg-slate-50 border rounded-2xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all text-xs font-semibold text-slate-800 ${
                              errors.mobileno
                                ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/5"
                                : "border-slate-200"
                            }`}
                            placeholder="+254 XXX XXX XXX"
                            value={formData.mobileno}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </FilterField>
                        {errors.mobileno && (
                          <p className="text-rose-500 text-[11px] font-bold flex items-center gap-1 mt-1.5 ml-1 animate-in fade-in slide-in-from-top-1 duration-150">
                            <AlertCircle size={12} /> {errors.mobileno}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}

              {activeStep.id === "scan_id" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <motion.div className="bg-white relative w-full h-full flex flex-col">
                    <div className="pb-5">
                      <h2 className="text-l font-bold text-[#074073]">
                        Verify Identity
                      </h2>
                      <p className="text-sm text-slate-500 font-medium">
                        Upload Identification Documents
                      </p>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-5 pr-1">
                      {/* Helper Box */}
                      <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl flex items-start gap-3.5 select-none animate-in fade-in duration-200">
                        <div className="space-y-2 flex-1">
                          <p className="text-xs font-bold text-[#074073]">
                            Document Upload Requirements
                          </p>
                          <p className="text-[11px] text-[#074073]/90 font-medium leading-relaxed">
                            To avoid manual verification delays and ensure our
                            automated system reads the details instantly, please
                            keep the following tips in mind:
                          </p>
                          <ul className="text-[11px] text-[#074073]/80 font-medium space-y-2 leading-relaxed">
                            <li>
                              <strong className="text-[#074073]">
                                Full Framework View:
                              </strong>{" "}
                              Make sure the entire card is captured and all four
                              outer corners are clearly visible.
                            </li>
                            <li>
                              <strong className="text-[#074073]">
                                Lighting & Legibility:
                              </strong>{" "}
                              Take photos in a well-lit space. Avoid glares or
                              dark shadows.
                            </li>
                            <li>
                              <strong className="text-[#074073]">
                                File Restrictions:
                              </strong>{" "}
                              Only upload high-resolution files in{" "}
                              <span className="font-mono bg-blue-100/50 px-1 rounded">
                                JPEG
                              </span>
                              ,{" "}
                              <span className="font-mono bg-blue-100/50 px-1 rounded">
                                PNG
                              </span>
                              , or{" "}
                              <span className="font-mono bg-blue-100/50 px-1 rounded">
                                PDF
                              </span>{" "}
                              format (max 5 MB).
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* Document Upload Fields Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div>
                          <FileUploadField
                            label="ID Front View"
                            id="front_view"
                            fileKey="id_front"
                            formData={formData}
                            setFormData={setFormData}
                          />
                          {errors.id_front && (
                            <p className="text-rose-500 text-[11px] font-bold flex items-center gap-1 mt-1.5 ml-1 animate-in fade-in duration-150">
                              <AlertCircle size={12} /> {errors.id_front}
                            </p>
                          )}
                        </div>
                        <div>
                          <FileUploadField
                            label="ID Back View"
                            id="back_view"
                            fileKey="id_back"
                            formData={formData}
                            setFormData={setFormData}
                          />
                          {errors.id_back && (
                            <p className="text-rose-500 text-[11px] font-bold flex items-center gap-1 mt-1.5 ml-1 animate-in fade-in duration-150">
                              <AlertCircle size={12} /> {errors.id_back}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}

              {activeStep.id === "review_id" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <motion.div className="bg-white relative w-full h-full flex flex-col">
                    <div className="pb-3">
                      <h2 className="text-l font-bold text-[#074073]">
                        Scan Results
                      </h2>
                      <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                        Review the automated text extraction metrics pulled from
                        the uploaded identification document asset.
                      </p>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-6 pr-1">
                      <div className="space-y-3.5">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                          Extracted Legal Name
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                          <ScannedDataField
                            label="First Name"
                            icon={User}
                            value={scannedData?.firstname}
                          />
                          <ScannedDataField
                            label="Middle Name"
                            icon={User}
                            value={scannedData?.middlename}
                          />
                          <div className="md:col-span-2">
                            <ScannedDataField
                              label="Last Name"
                              icon={User}
                              value={scannedData?.lastname}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3.5 pt-5 border-t border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                          Document Metrics
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                          <ScannedDataField
                            label="Identification Type"
                            icon={Shield}
                            value={scannedData?.identification_type}
                            isUppercase={true}
                          />
                          <ScannedDataField
                            label="Document ID Number"
                            icon={Hash}
                            value={scannedData?.identification}
                            isUppercase={true}
                          />
                          <ScannedDataField
                            label="Gender Classification"
                            icon={User}
                            value={scannedData?.gender}
                          />
                          <ScannedDataField
                            label="Date of Birth (DOB)"
                            icon={Calendar}
                            value={scannedData?.dob}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}

              {activeStep.id === "selfie" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <motion.div className="bg-white relative w-full h-full flex flex-col">
                    <div className="pb-3">
                      <h2 className="text-l font-bold text-[#074073]">
                        Member Selfie
                      </h2>
                      <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                        Upload a clear portrait for identification matching.
                      </p>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-6">
                      <div>
                        <div className="relative group border-2 border-dashed border-slate-200 rounded-3xl p-6 flex flex-col items-center justify-center bg-slate-50 hover:border-[#074073]/30 transition-all">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                          />
                          {previewUrl ? (
                            <div className="flex flex-col items-center gap-3">
                              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                                <img
                                  src={previewUrl}
                                  alt="Preview"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <p className="text-xs font-bold text-[#074073]">
                                Click to change photo
                              </p>
                            </div>
                          ) : (
                            <div className="text-center">
                              <Camera
                                className="mx-auto text-slate-400 mb-2"
                                size={32}
                              />
                              <p className="text-xs font-semibold text-slate-600">
                                Click or drag & drop
                              </p>
                              <p className="text-[10px] text-slate-400 mt-1">
                                PNG, JPG up to 5MB
                              </p>
                            </div>
                          )}
                        </div>
                        {errors.selfie && (
                          <p className="text-rose-500 text-[11px] font-bold flex items-center gap-1 mt-1.5 ml-1 animate-in fade-in duration-150">
                            <AlertCircle size={12} /> {errors.selfie}
                          </p>
                        )}
                      </div>

                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <h4 className="text-[11px] font-bold uppercase text-[#074073] tracking-wider mb-2">
                          Requirements
                        </h4>
                        <ul className="text-[11px] text-slate-500 space-y-2 list-disc list-inside">
                          <li>
                            Ensure your face is clearly visible, centered, and
                            fully exposed.
                          </li>
                          <li>
                            No accessories like sunglasses, hats, or heavy photo
                            filters.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}

              {activeStep.id === "address" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <motion.div className="bg-white relative w-full h-full flex flex-col">
                    <div className="pb-4">
                      <h2 className="text-l font-bold text-[#074073]">
                        Physical Address
                      </h2>
                      <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                        Map the member's legal domicile coordinates for regional
                        compliance.
                      </p>
                    </div>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                      {/* COUNTRY */}
                      <div>
                        <FilterField label="Country" icon={Globe}>
                          <input
                            type="text"
                            name="country"
                            className={`w-full pl-[74px] pr-6 py-5 h-14 bg-slate-50 border rounded-2xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all text-xs font-semibold text-slate-800 ${
                              errors.country
                                ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/5"
                                : "border-slate-200"
                            }`}
                            placeholder="e.g., Kenya"
                            value={formData.country}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </FilterField>
                        {errors.country && (
                          <p className="text-rose-500 text-[11px] font-bold flex items-center gap-1 mt-1.5 ml-1 animate-in fade-in duration-150">
                            <AlertCircle size={12} /> {errors.country}
                          </p>
                        )}
                      </div>

                      {/* COUNTY DROPDOWN */}
                      <div>
                        <FilterField label="County / Region" icon={Building2}>
                          <button
                            type="button"
                            onClick={() => {
                              setCountyDropdownOpen(!countyDropdownOpen);
                              setSubcountyDropdownOpen(false);
                            }}
                            className={`w-full pl-[74px] pr-5 h-14 bg-slate-50 border rounded-2xl outline-none transition-all text-xs font-semibold text-left flex items-center justify-between cursor-pointer ${
                              errors.county
                                ? "border-rose-400"
                                : "border-slate-200"
                            } ${countyDropdownOpen ? "bg-white border-[#074073] ring-4 ring-[#074073]/5" : ""}`}
                          >
                            <span
                              className={
                                formData.county
                                  ? "text-slate-800 font-bold"
                                  : "text-slate-400 font-medium"
                              }
                            >
                              {countyOptions.find(
                                (opt) => opt.value === formData.county,
                              )?.label || "Select county..."}
                            </span>
                            <ChevronDown
                              size={16}
                              className={`text-slate-400 transition-transform ml-2 shrink-0 ${countyDropdownOpen ? "rotate-180 text-[#074073]" : ""}`}
                            />
                          </button>
                        </FilterField>
                        {errors.county && (
                          <p className="text-rose-500 text-[11px] font-bold flex items-center gap-1 mt-1.5 ml-1 animate-in fade-in duration-150">
                            <AlertCircle size={12} /> {errors.county}
                          </p>
                        )}
                      </div>

                      {/* SUB-COUNTY DROPDOWN */}
                      <div>
                        <FilterField label="Sub-County / District" icon={Map}>
                          <button
                            type="button"
                            onClick={() => {
                              setSubcountyDropdownOpen(!subcountyDropdownOpen);
                              setCountyDropdownOpen(false);
                            }}
                            className={`w-full pl-[74px] pr-5 h-14 bg-slate-50 border rounded-2xl outline-none transition-all text-xs font-semibold text-left flex items-center justify-between cursor-pointer ${
                              errors.subcounty
                                ? "border-rose-400"
                                : "border-slate-200"
                            } ${subcountyDropdownOpen ? "bg-white border-[#074073] ring-4 ring-[#074073]/5" : ""}`}
                          >
                            <span
                              className={
                                formData.subcounty
                                  ? "text-slate-800 font-bold"
                                  : "text-slate-400 font-medium"
                              }
                            >
                              {subcountyOptions.find(
                                (opt) => opt.value === formData.subcounty,
                              )?.label || "Select sub-county..."}
                            </span>
                            <ChevronDown
                              size={16}
                              className={`text-slate-400 transition-transform ml-2 shrink-0 ${subcountyDropdownOpen ? "rotate-180 text-[#074073]" : ""}`}
                            />
                          </button>
                        </FilterField>
                        {errors.subcounty && (
                          <p className="text-rose-500 text-[11px] font-bold flex items-center gap-1 mt-1.5 ml-1 animate-in fade-in duration-150">
                            <AlertCircle size={12} /> {errors.subcounty}
                          </p>
                        )}
                      </div>

                      {/* STREET / PHYSICAL ADDRESS */}
                      <div>
                        <FilterField
                          label="Street / Physical Address"
                          icon={MapPin}
                        >
                          <input
                            name="physical_address"
                            className={`w-full pl-[74px] pr-6 py-4 bg-slate-50 border rounded-2xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all text-xs font-semibold text-slate-800 h-14 ${
                              errors.physical_address
                                ? "border-rose-400 focus:border-rose-500"
                                : "border-slate-200"
                            }`}
                            placeholder="e.g., Plaza Block C, Suite 4B, Lenana Road"
                            value={formData.physical_address}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </FilterField>
                        {errors.physical_address && (
                          <p className="text-rose-500 text-[11px] font-bold flex items-center gap-1 mt-1.5 ml-1 animate-in fade-in duration-150">
                            <AlertCircle size={12} /> {errors.physical_address}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}

              {activeStep.id === "income" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <motion.div className="bg-white relative w-full flex flex-col">
                    <div>
                      <h2 className="text-l font-bold text-[#074073]">
                        Income & Economic Level
                      </h2>
                      <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                        Log economic profile parameters and tax pin credentials.
                      </p>
                    </div>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mt-4">
                      {/* EMPLOYMENT DROPDOWN */}
                      <div>
                        <FilterField
                          label="Employment Status / Field"
                          icon={Briefcase}
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setEmploymentDropdownOpen(!employmentDropdownOpen)
                            }
                            className={`w-full pl-[74px] pr-5 h-14 bg-slate-50 border rounded-2xl outline-none transition-all text-xs font-semibold text-left flex items-center justify-between cursor-pointer ${
                              errors.employment_type
                                ? "border-rose-400"
                                : "border-slate-200"
                            } ${employmentDropdownOpen ? "bg-white border-[#074073] ring-4 ring-[#074073]/5" : ""}`}
                          >
                            <span
                              className={
                                formData.employment_type
                                  ? "text-slate-800 font-bold"
                                  : "text-slate-400 font-medium"
                              }
                            >
                              {employmentOptions.find(
                                (opt) => opt.value === formData.employment_type,
                              )?.label || "Select employment type..."}
                            </span>
                            <ChevronDown
                              size={16}
                              className={`text-slate-400 transition-transform ml-2 shrink-0 ${employmentDropdownOpen ? "rotate-180 text-[#074073]" : ""}`}
                            />
                          </button>
                        </FilterField>
                        {errors.employment_type && (
                          <p className="text-rose-500 text-[11px] font-bold flex items-center gap-1 mt-1.5 ml-1 animate-in fade-in duration-150">
                            <AlertCircle size={12} /> {errors.employment_type}
                          </p>
                        )}
                      </div>

                      {/* EXACT OCCUPATION */}
                      <div>
                        <FilterField
                          label="Exact Occupation / Role"
                          icon={UserCheck}
                        >
                          <input
                            type="text"
                            name="occupation"
                            className={`w-full pl-[74px] pr-6 py-5 h-14 bg-slate-50 border rounded-2xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all text-xs font-semibold text-slate-800 ${
                              errors.occupation
                                ? "border-rose-400 focus:border-rose-500"
                                : "border-slate-200"
                            }`}
                            placeholder="e.g., Credit Analyst, Shopkeeper"
                            value={formData.occupation}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </FilterField>
                        {errors.occupation && (
                          <p className="text-rose-500 text-[11px] font-bold flex items-center gap-1 mt-1.5 ml-1 animate-in fade-in duration-150">
                            <AlertCircle size={12} /> {errors.occupation}
                          </p>
                        )}
                      </div>

                      {/* MONTHLY INCOME */}
                      <div>
                        <FilterField
                          label="Estimated Monthly Income (KES)"
                          icon={Coins}
                        >
                          <div className="relative w-full">
                            <input
                              type="number"
                              name="income_range"
                              className={`w-full pl-[74px] pr-14 py-5 h-14 bg-slate-50 border rounded-2xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all text-xs font-semibold text-slate-800 ${
                                errors.income_range
                                  ? "border-rose-400 focus:border-rose-500"
                                  : "border-slate-200"
                              }`}
                              placeholder="0.00"
                              value={formData.income_range}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                              <span className="text-[10px] font-bold text-slate-400 tracking-wider">
                                KES
                              </span>
                            </div>
                          </div>
                        </FilterField>
                        {errors.income_range && (
                          <p className="text-rose-500 text-[11px] font-bold flex items-center gap-1 mt-1.5 ml-1 animate-in fade-in duration-150">
                            <AlertCircle size={12} /> {errors.income_range}
                          </p>
                        )}
                      </div>

                      {/* KRA TAX PIN */}
                      <div>
                        <FilterField label="KRA Tax PIN" icon={FileText}>
                          <input
                            type="text"
                            name="kra_pin"
                            maxLength={11}
                            className={`w-full pl-[74px] pr-6 py-5 h-14 bg-slate-50 border rounded-2xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all text-xs font-mono font-bold tracking-wider uppercase text-slate-800 ${
                              errors.kra_pin
                                ? "border-rose-400 focus:border-rose-500"
                                : "border-slate-200"
                            }`}
                            placeholder="e.g., A012345678W"
                            value={formData.kra_pin || ""}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </FilterField>
                        {errors.kra_pin && (
                          <p className="text-rose-500 text-[11px] font-bold flex items-center gap-1 mt-1.5 ml-1 animate-in fade-in duration-150">
                            <AlertCircle size={12} /> {errors.kra_pin}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}

              {activeStep.id === "next_of_kin" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <motion.div className="bg-white relative w-full flex flex-col">
                    <div>
                      <h2 className="text-l font-bold text-[#074073]">
                        Next of Kin Details
                      </h2>
                      <p className="text-[11px] text-slate-400 font-medium">
                        Add or update member's emergency beneficiary contact
                        details.
                      </p>
                    </div>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mt-4">
                      {/* FULL NAME */}
                      <div>
                        <FilterField label="Full Name" icon={User}>
                          <input
                            name="fullname"
                            className={`w-full pl-[74px] pr-6 py-5 h-14 bg-slate-50 border text-xs font-semibold rounded-2xl transition-all outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 ${
                              errors.fullname
                                ? "border-rose-400 focus:border-rose-500"
                                : "border-slate-200"
                            }`}
                            placeholder="e.g., Jane Doe"
                            value={formData.fullname}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </FilterField>
                        {errors.fullname && (
                          <p className="text-rose-500 text-[11px] font-bold flex items-center gap-1 mt-1.5 ml-1 animate-in fade-in duration-150">
                            <AlertCircle size={12} /> {errors.fullname}
                          </p>
                        )}
                      </div>

                      {/* PHONE NUMBER */}
                      <div>
                        <FilterField label="Phone Number" icon={Phone}>
                          <input
                            name="phone"
                            className={`w-full pl-[74px] pr-6 py-5 h-14 bg-slate-50 border text-xs font-semibold rounded-2xl transition-all outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 ${
                              errors.phone
                                ? "border-rose-400 focus:border-rose-500"
                                : "border-slate-200"
                            }`}
                            placeholder="+254 XXX XXX XXX"
                            value={formData.phone}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </FilterField>
                        {errors.phone && (
                          <p className="text-rose-500 text-[11px] font-bold flex items-center gap-1 mt-1.5 ml-1 animate-in fade-in duration-150">
                            <AlertCircle size={12} /> {errors.phone}
                          </p>
                        )}
                      </div>

                      {/* RELATIONSHIP */}
                      <div>
                        <FilterField label="Relationship" icon={Users}>
                          <input
                            name="relationship"
                            className={`w-full pl-[74px] pr-6 py-5 h-14 bg-slate-50 border text-xs font-semibold rounded-2xl transition-all outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 ${
                              errors.relationship
                                ? "border-rose-400 focus:border-rose-500"
                                : "border-slate-200"
                            }`}
                            placeholder="e.g., Spouse, Parent"
                            value={formData.relationship}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </FilterField>
                        {errors.relationship && (
                          <p className="text-rose-500 text-[11px] font-bold flex items-center gap-1 mt-1.5 ml-1 animate-in fade-in duration-150">
                            <AlertCircle size={12} /> {errors.relationship}
                          </p>
                        )}
                      </div>

                      {/* DATE OF BIRTH */}
                      <div>
                        <FilterField label="Date of Birth" icon={Calendar}>
                          <input
                            type="date"
                            name="dob"
                            className={`w-full pl-[74px] pr-6 py-5 h-14 bg-slate-50 border text-xs font-semibold rounded-2xl transition-all outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 ${
                              errors.dob
                                ? "border-rose-400 focus:border-rose-500"
                                : "border-slate-200"
                            }`}
                            value={formData.dob}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </FilterField>
                        {errors.dob && (
                          <p className="text-rose-500 text-[11px] font-bold flex items-center gap-1 mt-1.5 ml-1 animate-in fade-in duration-150">
                            <AlertCircle size={12} /> {errors.dob}
                          </p>
                        )}
                      </div>

                      {/* LOCATION */}
                      <div className="md:col-span-2">
                        <FilterField label="Location" icon={MapPin}>
                          <input
                            name="location"
                            className={`w-full pl-[74px] pr-6 py-5 h-14 bg-slate-50 border text-xs font-semibold rounded-2xl transition-all outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 ${
                              errors.location
                                ? "border-rose-400 focus:border-rose-500"
                                : "border-slate-200"
                            }`}
                            placeholder="e.g., Nairobi, Kenya"
                            value={formData.location}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </FilterField>
                        {errors.location && (
                          <p className="text-rose-500 text-[11px] font-bold flex items-center gap-1 mt-1.5 ml-1 animate-in fade-in duration-150">
                            <AlertCircle size={12} /> {errors.location}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}

              {activeStep.id === "review_submit" && (
                <div className="space-y-6 animate-in fade-in duration-200 text-slate-800 pr-1">
                  {/* TOP NOTICE BANNER */}
                  <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-2xl flex items-start gap-3 select-none">
                    <CheckCircle2
                      className="text-emerald-600 shrink-0 mt-0.5"
                      size={18}
                    />
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-primary">
                        Final Verification Review
                      </p>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Please review all input summaries, captured metrics, and
                        attached credentials before finalizing submission.
                      </p>
                    </div>
                  </div>

                  {/* SECTION 1: CORE ACCOUNT PROFILE */}
                  <div className="space-y-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      1. Account Details
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 border border-slate-100 p-4 rounded-2xl bg-slate-50/20">
                      <div className="space-y-1">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                          Username
                        </span>
                        <span className="text-xs font-bold text-primary">
                          {formData.username || "—"}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                          Email Address
                        </span>
                        <span className="text-xs font-bold text-primary truncate block">
                          {formData.email || "—"}
                        </span>
                      </div>
                      <div className="md:col-span-2 space-y-1">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                          Mobile Number
                        </span>
                        <span className="text-xs font-bold text-primary">
                          {formData.mobileno || "—"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: IDENTITY DOCUMENTS & OCR TELEMETRY */}
                  <div className="space-y-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      2. Identity & Biometrics Verification
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 border border-slate-100 p-4 rounded-2xl bg-slate-50/20">
                      <div className="space-y-1">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                          Legal Name
                        </span>
                        <span className="text-xs font-bold text-primary">
                          {[
                            scannedData?.firstname,
                            scannedData?.middlename,
                            scannedData?.lastname,
                          ]
                            .filter(Boolean)
                            .join(" ") || "—"}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                          Identification Type
                        </span>
                        <span className="text-xs font-bold text-primary uppercase">
                          {scannedData?.identification_type || "—"}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                          Document ID Number
                        </span>
                        <span className="text-xs font-bold text-primary font-mono tracking-wide">
                          {scannedData?.identification || "—"}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                          Date of Birth / Gender
                        </span>
                        <span className="text-xs font-bold text-primary">
                          {scannedData?.dob || "—"} (
                          {scannedData?.gender || "—"})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 3: RESIDENTIAL LOCATION */}
                  <div className="space-y-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      3. Contact Location
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 border border-slate-100 p-4 rounded-2xl bg-slate-50/20">
                      {/* COUNTRY */}
                      <div className="space-y-1">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                          Country
                        </span>
                        <span className="text-xs font-bold text-primary">
                          {formData.country || "—"}
                        </span>
                      </div>

                      {/* COUNTY */}
                      <div className="space-y-1">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                          County
                        </span>
                        <span className="text-xs font-bold text-primary">
                          {formData.county || "—"}
                        </span>
                      </div>

                      {/* SUB COUNTY */}
                      <div className="space-y-1">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                          Sub County
                        </span>
                        <span className="text-xs font-bold text-primary">
                          {formData.sub_county || "—"}
                        </span>
                      </div>

                      {/* PHYSICAL ADDRESS (Spans full width on desktop for long text strings) */}
                      <div className="md:col-span-2 space-y-1 pt-1 border-t border-slate-100/50 md:border-t-0 md:pt-0">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                          Physical Address
                        </span>
                        <span className="text-xs font-bold text-primary leading-relaxed block break-words">
                          {formData.physical_address || "—"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 4: FINANCIAL & ECONOMIC PARAMETERS */}
                  <div className="space-y-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      4. Employment & Financial Income Profile
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 border border-slate-100 p-4 rounded-2xl bg-slate-50/20">
                      <div className="space-y-1">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                          Employment Status
                        </span>
                        <span className="text-xs font-bold text-primary capitalize">
                          {employmentOptions.find(
                            (opt) => opt.value === formData.employment_type,
                          )?.label || "—"}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                          Exact Occupation / Role
                        </span>
                        <span className="text-xs font-bold text-primary">
                          {formData.occupation || "—"}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                          Estimated Monthly Income
                        </span>
                        <span className="text-xs font-bold text-primary">
                          {formData.income_range
                            ? `KES ${parseFloat(formData.income_range).toLocaleString("en-KE", { minimumFractionDigits: 2 })}`
                            : "—"}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                          KRA Tax PIN
                        </span>
                        <span className="text-xs font-bold text-primary font-mono uppercase tracking-wider">
                          {formData.kra_pin || "—"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 5: BENEFICIARY / NEXT OF KIN REGISTRY */}
                  <div className="space-y-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      5. Next of Kin Beneficiary Registry
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 border border-slate-100 p-4 rounded-2xl bg-slate-50/20">
                      <div className="space-y-1">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                          Kin Full Name
                        </span>
                        <span className="text-xs font-bold text-primary">
                          {formData.fullname || "—"}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                          Relationship
                        </span>
                        <span className="text-xs font-bold text-primary">
                          {formData.relationship || "—"}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                          Phone Number
                        </span>
                        <span className="text-xs font-bold text-primary">
                          {formData.phone || "—"}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                          Date of Birth
                        </span>
                        <span className="text-xs font-bold text-primary">
                          {formData.dob
                            ? new Date(formData.dob).toLocaleDateString(
                                "en-KE",
                                { dateStyle: "long" },
                              )
                            : "—"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* DYNAMIC PIPELINE NAVIGATION CONTROLLER ACTION DECK */}
            <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between select-none">
              {/* BACK CONTROL */}
              <button
                type="button"
                onClick={handleBack}
                disabled={isFirstStep || isSubmitting}
                className={`inline-flex items-center gap-2 h-10 px-4 rounded-xl text-xs font-bold transition-all border ${
                  isFirstStep
                    ? "opacity-0 pointer-events-none"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-primary shadow-3xs cursor-pointer active:scale-98 disabled:opacity-50 disabled:pointer-events-none"
                }`}
              >
                <ArrowLeft size={14} strokeWidth={2.5} />
                <span>Previous Step</span>
              </button>

              {/* CONTINUE / SUBMIT COMMIT CONTROL */}
              <button
                type="button"
                onClick={handleNext}
                disabled={
                  isSubmitting ||
                  Object.values(errors).some((msg) => msg !== "")
                }
                className={`inline-flex items-center gap-2 h-10 px-5 rounded-xl text-xs font-bold text-white shadow-sm transition-all cursor-pointer active:scale-98 disabled:opacity-40 disabled:pointer-events-none disabled:cursor-not-allowed ${
                  isLastStep
                    ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-900/10"
                    : "bg-[#074073] hover:bg-[#053057] shadow-blue-900/10"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>Processing Submission...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {isLastStep ? "Complete Registration" : "Save & Continue"}
                    </span>
                    {!isLastStep && <ArrowRight size={14} strokeWidth={2.5} />}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const FilterField = ({ label, icon: Icon, children }) => (
  <div className="space-y-2 w-full">
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none z-10">
        <Icon
          size={18}
          className="text-slate-300 group-focus-within:text-[#074073] transition-colors"
        />
        <div className="w-[1.5px] h-5 bg-slate-200 ml-4 group-focus-within:bg-[#074073]/20 transition-colors" />
      </div>
      {children}
    </div>
  </div>
);

const FileUploadField = ({ label, id, fileKey, formData, setFormData }) => {
  const previewUrl = formData[fileKey]
    ? URL.createObjectURL(formData[fileKey])
    : null;

  return (
    <div className="space-y-2 w-full">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
        {label}
      </label>

      <div className="relative group">
        {/* Preview State - Fixed to ensure the entire ID document fits cleanly without data loss */}
        {previewUrl ? (
          <div className="relative w-full h-40 rounded-2xl overflow-hidden border border-slate-200 flex items-center justify-center shadow-inner group/preview animate-in fade-in duration-200 select-none">
            <img
              src={previewUrl}
              alt="Uploaded Document Preview"
              className="max-w-full max-h-full object-contain pointer-events-none p-1"
            />

            {/* Subtle interactive hover overlay canvas */}
            <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover/preview:opacity-100 transition-opacity duration-150 pointer-events-none" />

            {/* Clean interactive clear button matching layout defaults */}
            <button
              type="button"
              onClick={() => setFormData({ ...formData, [fileKey]: null })}
              className="absolute top-2.5 right-2.5 size-7 bg-primary/80 hover:bg-rose-600 border border-slate-700 text-white rounded-xl transition-all duration-150 hover:scale-105 flex items-center justify-center shadow-md cursor-pointer z-10"
              title="Remove item asset"
            >
              <X size={13} strokeWidth={3} />
            </button>
          </div>
        ) : (
          /* Empty/Input State - Set to h-40 */
          <div className="relative w-full h-40">
            <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none z-10">
              <FileUp
                size={18}
                className="text-slate-300 group-focus-within:text-[#074073] transition-colors"
              />
              <div className="w-[1.5px] h-10 bg-slate-200 ml-4 group-focus-within:bg-[#074073]/20 transition-colors" />
            </div>
            <input
              type="file"
              id={id}
              accept="image/*"
              className="w-full pl-[74px] pr-6 h-full bg-slate-50 border border-slate-200 rounded-2xl file:hidden cursor-pointer text-xs font-semibold text-transparent flex items-center outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all"
              onChange={(e) =>
                setFormData({ ...formData, [fileKey]: e.target.files[0] })
              }
            />
            <div className="absolute inset-0 flex items-center pl-[74px] pointer-events-none">
              <span className="text-xs text-slate-400 font-medium truncate">
                Upload a viable image...
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ScannedDataField = ({
  label,
  icon: Icon,
  value,
  isUppercase = false,
}) => (
  <div className="space-y-2 w-full">
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none z-10">
        <Icon size={18} className="text-[#074073]" />
        <div className="w-[1.5px] h-5 bg-slate-200 ml-4" />
      </div>
      <div
        className={`w-full pl-[74px] pr-6 py-4 min-h-14 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold text-primary flex items-center ${
          isUppercase ? "uppercase tracking-wide" : ""
        }`}
      >
        {value || (
          <span className="text-slate-300 italic font-medium">
            Extraction Failed
          </span>
        )}
      </div>
    </div>
  </div>
);
