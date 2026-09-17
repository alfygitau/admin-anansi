import React, { useState } from "react";
import {
  Users,
  Building2,
  Mail,
  Phone,
  MapPin,
  FileText,
  ShieldCheck,
  Wallet,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AddGroupAccount = ({ onBack, onSubmitGroup }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    groupName: "",
    groupType: "Investment Chama",
    registrationNumber: "",
    officialEmail: "",
    groupPhone: "",
    physicalAddress: "",
    signatoryRule: "Any 2 of 3",
    monthlyContribution: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newDocuments = files.map((file, idx) => ({
      id: `DOC-${Date.now()}-${idx}`,
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      type: file.type.includes("pdf") ? "Legal & Governance" : "Attachment",
      fileObj: file,
    }));

    setAttachments((prev) => [...prev, ...newDocuments]);
    e.target.value = null; // Reset input field
  };

  // Remove attached document
  const handleRemoveAttachment = (id) => {
    setAttachments((prev) => prev.filter((doc) => doc.id !== id));
  };

  const groupTypes = [
    "Investment Chama",
    "Welfare / Benevolent",
    "Family Pool",
    "Women Group",
    "Youth Group",
    "Corporate / Business",
  ];

  const signatoryRules = [
    "Any 2 of 3 Mandated Signatories",
    "Chairperson & Treasurer (Mandatory)",
    "All Signatories Must Approve",
    "Any 1 Signatory",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate database shell generation and ID assignment
    setTimeout(() => {
      const generatedGroup = {
        ...formData,
        group_id: `GRP-${Math.floor(1000 + Math.random() * 9000)}`,
        created_at: new Date().toISOString(),
      };

      setIsSubmitting(false);
      if (onSubmitGroup) {
        onSubmitGroup(generatedGroup);
      } else {
        alert(
          `Group Shell Created Successfully! Assigned ID: ${generatedGroup.group_id}`,
        );
      }
    }, 800);
  };

  return (
    <>
      <div className="pb-6 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 transition-all cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-[#074073] flex items-center gap-2">
              <Users size={22} className="text-[#074073]" />
              Register New Group
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Set up the group's profile details before adding individual
              members.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-slate-50/50 mt-5 flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full bg-white shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col"
        >
          {/* Header Bar */}

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-5 space-y-8">
            {/* SECTION 1: BASIC INFO */}
            <div className="space-y-4">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Building2 size={14} className="text-[#074073]" />
                Group Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-700">
                    Group Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="groupName"
                    required
                    placeholder="e.g., Umoja Investment Chama"
                    value={formData.groupName}
                    onChange={handleChange}
                    className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 outline-none focus:bg-white focus:border-[#074073] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Group Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="groupType"
                    value={formData.groupType}
                    onChange={handleChange}
                    className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 outline-none focus:bg-white focus:border-[#074073] transition-all cursor-pointer"
                  >
                    {groupTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Registration Number (Optional)
                  </label>
                  <input
                    type="text"
                    name="registrationNumber"
                    placeholder="e.g., SOC/12345/2026"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 outline-none focus:bg-white focus:border-[#074073] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 2: CONTACT & COMMUNICATION */}
            {/* SECTION 2: CONTACT & COMMUNICATION */}
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Mail size={14} className="text-[#074073]" />
                Contact & Communication Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Official Group Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <Mail
                      size={16}
                      className="absolute left-4 text-slate-400 pointer-events-none"
                    />
                    <input
                      type="email"
                      name="officialEmail"
                      required
                      placeholder="group@example.com"
                      value={formData.officialEmail}
                      onChange={handleChange}
                      className="w-full h-12 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 outline-none focus:bg-white focus:border-[#074073] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Group Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <Phone
                      size={16}
                      className="absolute left-4 text-slate-400 pointer-events-none"
                    />
                    <input
                      type="tel"
                      name="groupPhone"
                      required
                      placeholder="+254 700 000000"
                      value={formData.groupPhone}
                      onChange={handleChange}
                      className="w-full h-12 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 outline-none focus:bg-white focus:border-[#074073] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    County <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="county"
                    value={formData.county || ""}
                    onChange={handleChange}
                    required
                    className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 outline-none focus:bg-white focus:border-[#074073] transition-all cursor-pointer"
                  >
                    <option value="">Select County</option>
                    {[
                      "Mombasa",
                      "Kwale",
                      "Kilifi",
                      "Tana River",
                      "Lamu",
                      "Taita–Taveta",
                      "Garissa",
                      "Wajir",
                      "Mandera",
                      "Marsabit",
                      "Isiolo",
                      "Meru",
                      "Tharaka-Nithi",
                      "Embu",
                      "Kitui",
                      "Machakos",
                      "Makueni",
                      "Nyandarua",
                      "Nyeri",
                      "Kirinyaga",
                      "Murang'a",
                      "Kiambu",
                      "Turkana",
                      "West Pokot",
                      "Samburu",
                      "Trans-Nzoia",
                      "Uasin Gishu",
                      "Elgeyo-Marakwet",
                      "Nandi",
                      "Baringo",
                      "Laikipia",
                      "Nakuru",
                      "Narok",
                      "Kajiado",
                      "Kericho",
                      "Bomet",
                      "Kakamega",
                      "Vihiga",
                      "Bungoma",
                      "Busia",
                      "Siaya",
                      "Kisumu",
                      "Homa Bay",
                      "Migori",
                      "Kisii",
                      "Nyamira",
                      "Nairobi",
                    ].map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Sub-County <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="subCounty"
                    required
                    placeholder="e.g., Westlands, Embakasi"
                    value={formData.subCounty || ""}
                    onChange={handleChange}
                    className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 outline-none focus:bg-white focus:border-[#074073] transition-all"
                  />
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-700">
                    Physical Address / Office Location{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <MapPin
                      size={16}
                      className="absolute left-4 text-slate-400 pointer-events-none"
                    />
                    <input
                      type="text"
                      name="physicalAddress"
                      required
                      placeholder="e.g., Anniversary Towers, 4th Floor, Kimathi Street"
                      value={formData.physicalAddress}
                      onChange={handleChange}
                      className="w-full h-12 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 outline-none focus:bg-white focus:border-[#074073] transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-2 border-t border-slate-100">
              <div className="flex flex-col">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  Group Documents & Attachments
                </h2>
                <span className="text-[10px] text-slate-400 font-medium">
                  Optional (Constitutions, Certificates, KRA PIN)
                </span>
              </div>

              {/* Upload Dropzone / Action */}
              <div className="relative border-2 border-dashed border-slate-200 hover:border-[#074073] rounded-2xl p-6 transition-all text-center bg-slate-50/50 flex flex-col items-center justify-center cursor-pointer">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  title="Click or drag files here"
                />
                <div className="size-10 rounded-xl bg-blue-50 text-[#074073] flex items-center justify-center mb-2">
                  <Upload size={20} />
                </div>
                <p className="text-xs font-bold text-slate-700">
                  Click to upload documents{" "}
                  <span className="font-normal text-slate-400">
                    or drag and drop
                  </span>
                </p>
                <p className="text-[10px] text-slate-400 mt-1">
                  PDF, DOC, DOCX, PNG or JPG (Max file size: 10MB)
                </p>
              </div>

              {/* Attached Files List Preview */}
              {attachments.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {attachments.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <div className="size-8 rounded-lg bg-blue-100/60 text-[#074073] flex items-center justify-center shrink-0">
                          <FileText size={16} />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold text-slate-800 truncate">
                            {doc.name}
                          </p>
                          <p className="text-[10px] text-slate-400 font-medium">
                            {doc.size}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveAttachment(doc.id)}
                        className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-white transition-all cursor-pointer"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Submit Action */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-8 h-12 bg-[#074073] hover:bg-[#052d52] text-white font-bold text-xs rounded-2xl transition-all shadow-md shadow-[#074073]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating Group...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={16} />
                    <span>Save Group & Continue</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default AddGroupAccount;
