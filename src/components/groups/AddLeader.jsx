import React, { useState } from "react";
import {
  X,
  Award,
  Users,
  Shield,
  FileText,
  Save,
  CheckCircle2,
  ArrowRight,
  Plus,
  AlertCircle,
  Loader2,
  Edit2,
  Search,
  Phone,
  Mail,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AddGroupLeader = ({
  isOpen,
  onClose,
  onSave,
  formData,
  setFormData,
  loading,
  step,
  setStep,
}) => {
  const [errors, setErrors] = useState({
    memberId: "",
    position: "",
    phone: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Mock list of active members already linked to the group
  const groupMembers = [
    {
      id: "MEM-4021",
      name: "Sarah Wanjiku",
      phone: "+254 712 345678",
      email: "sarah.w@example.com",
    },
    {
      id: "MEM-4022",
      name: "David Kipkorir",
      phone: "+254 722 987654",
      email: "david.k@example.com",
    },
    {
      id: "MEM-4023",
      name: "Amina Hassan",
      phone: "+254 733 112233",
      email: "amina.h@example.com",
    },
    {
      id: "MEM-4024",
      name: "John Omondi",
      phone: "+254 744 556677",
      email: "john.o@example.com",
    },
  ];

  const leadershipPositions = [
    "Chairperson",
    "Treasurer",
    "Secretary",
    "Vice Chairperson",
    "Assistant Treasurer",
    "Assistant Secretary",
    "Organizing Secretary",
    "Trustee / Signatory",
  ];

  const validateField = (fieldName, value) => {
    let errorMessage = "";

    if (fieldName === "memberId") {
      if (!value || !value.trim()) {
        errorMessage = "Please select a group member for this leadership role.";
      }
    }

    if (fieldName === "position") {
      if (!value || !value.trim()) {
        errorMessage = "Please select an official leadership position.";
      }
    }

    if (fieldName === "phone") {
      if (!value || !value.trim()) {
        errorMessage = "Please provide an active official phone number.";
      }
    }

    setErrors((prev) => ({ ...prev, [fieldName]: errorMessage }));
    return errorMessage;
  };

  const handleProceedToPreview = () => {
    const memberIdError = validateField("memberId", formData.memberId);
    const positionError = validateField("position", formData.position);
    const phoneError = validateField("phone", formData.phone);

    if (memberIdError || positionError || phoneError) return;
    setStep("preview");
  };

  const handleConfirmAndSave = async () => {
    if (loading) return;
    await onSave();
  };

  const handleClearAllStates = () => {
    setStep("form");
    setErrors({ memberId: "", position: "", phone: "" });
    setFormData({ memberId: "", name: "", position: "", phone: "", email: "" });
    setSearchQuery("");
  };

  const handleResetAndClose = () => {
    if (loading) return;
    handleClearAllStates();
    onClose();
  };

  const filteredMembers = groupMembers.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.id.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex justify-end bg-zinc-950/20 font-sans"
        >
          <div className="absolute inset-0" onClick={handleResetAndClose} />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="bg-white relative w-full max-w-[480px] h-full shadow-2xl flex flex-col z-10 text-slate-800"
          >
            {/* Window Dismissal Close Button */}
            <button
              type="button"
              onClick={handleResetAndClose}
              disabled={loading}
              className="absolute top-5 right-5 z-10 w-8 h-8 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-gray-500 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-3xs active:scale-95"
            >
              <X size={16} />
            </button>

            {step === "form" && (
              <>
                <div className="px-8 pt-5 pb-6 select-none">
                  <h2 className="text-xl font-black text-[#074073] tracking-tight">
                    Assign Group Leader
                  </h2>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    Designate an existing group member to an official executive
                    role.
                  </p>
                </div>
                <div className="border-b mx-8 border-slate-100"></div>

                <div className="flex-1 overflow-y-auto px-8 py-6 space-y-5">
                  {/* STEP 1A: SELECT MEMBER */}
                  <div className="space-y-1.5 w-full text-left">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 select-none block">
                      Select Group Member{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    {formData.memberId ? (
                      <div className="p-3.5 bg-blue-50/50 border border-blue-200 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="size-9 rounded-xl bg-[#074073] text-white flex items-center justify-center font-bold text-xs">
                            {formData.name ? formData.name.charAt(0) : "L"}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#074073]">
                              {formData.name}
                            </p>
                            <p className="text-[10px] text-slate-500">
                              ID: {formData.memberId}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              memberId: "",
                              name: "",
                              phone: "",
                              email: "",
                            });
                          }}
                          className="text-xs font-bold text-rose-500 hover:underline cursor-pointer"
                        >
                          Change
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="relative">
                          <Search
                            size={16}
                            className="absolute left-4 top-4 text-slate-400 pointer-events-none"
                          />
                          <input
                            type="text"
                            placeholder="Search member by name or ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 h-12 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 outline-none focus:bg-white focus:border-[#074073] transition-all"
                          />
                        </div>

                        <div className="max-h-48 overflow-y-auto border border-slate-100 rounded-2xl divide-y divide-slate-100 bg-slate-50/50">
                          {filteredMembers.length > 0 ? (
                            filteredMembers.map((m) => (
                              <div
                                key={m.id}
                                onClick={() => {
                                  setFormData({
                                    ...formData,
                                    memberId: m.id,
                                    name: m.name,
                                    phone: m.phone,
                                    email: m.email,
                                  });
                                  if (errors.memberId)
                                    setErrors({ ...errors, memberId: "" });
                                  if (errors.phone)
                                    setErrors({ ...errors, phone: "" });
                                }}
                                className="p-3 hover:bg-white transition-all cursor-pointer flex items-center justify-between"
                              >
                                <div>
                                  <p className="text-xs font-bold text-slate-800">
                                    {m.name}
                                  </p>
                                  <p className="text-[10px] text-slate-400">
                                    {m.id} • {m.phone}
                                  </p>
                                </div>
                                <span className="text-[10px] font-bold text-[#074073] bg-blue-50 px-2.5 py-1 rounded-lg">
                                  Select
                                </span>
                              </div>
                            ))
                          ) : (
                            <div className="p-4 text-center text-xs text-slate-400 font-medium">
                              No matching group members found.
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {errors.memberId && (
                      <p className="text-[11px] font-semibold text-rose-500 pl-1 mt-1 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.memberId}
                      </p>
                    )}
                  </div>

                  {/* STEP 1B: LEADERSHIP POSITION */}
                  <FilterField
                    label="Executive Position"
                    icon={Award}
                    error={errors.position}
                  >
                    <select
                      value={formData.position || ""}
                      onChange={(e) => {
                        setFormData({ ...formData, position: e.target.value });
                        if (errors.position)
                          setErrors({ ...errors, position: "" });
                      }}
                      className={`w-full pl-[74px] pr-4 h-14 bg-slate-50 border rounded-2xl text-xs font-semibold outline-none transition-all cursor-pointer ${
                        errors.position
                          ? "border-rose-300 bg-rose-50/10 text-rose-900 focus:border-rose-500"
                          : "border-slate-200 text-slate-800 focus:border-[#074073] focus:bg-white"
                      }`}
                    >
                      <option value="">Select Position Title</option>
                      {leadershipPositions.map((pos) => (
                        <option key={pos} value={pos}>
                          {pos}
                        </option>
                      ))}
                    </select>
                  </FilterField>

                  {/* STEP 1C: OFFICIAL PHONE NUMBER */}
                  <FilterField
                    label="Official Leader Phone Number"
                    icon={Phone}
                    error={errors.phone}
                  >
                    <input
                      type="tel"
                      placeholder="e.g., +254 712 345678"
                      value={formData.phone || ""}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: "" });
                      }}
                      className={`w-full pl-[74px] pr-4 h-14 bg-slate-50 border rounded-2xl text-xs font-semibold outline-none transition-all ${
                        errors.phone
                          ? "border-rose-300 bg-rose-50/10 text-rose-900 focus:border-rose-500"
                          : "border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-[#074073] focus:bg-white"
                      }`}
                    />
                  </FilterField>
                </div>

                <div className="p-8 py-5 border-t border-slate-100 flex gap-3 select-none bg-white">
                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="flex-1 h-12 font-bold text-xs bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleProceedToPreview}
                    className="flex-[2] h-12 font-bold text-xs bg-[#074073] text-white rounded-xl shadow-md flex items-center justify-center gap-2 hover:bg-[#052d52] transition-colors cursor-pointer active:scale-[0.98]"
                  >
                    <span>Review Leader Info</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </>
            )}

            {step === "preview" && (
              <>
                <div className="px-8 pt-5 pb-6 select-none">
                  <h2 className="text-xl font-black text-[#074073] tracking-tight">
                    Review Leader Details
                  </h2>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    Confirm leadership appointment details before saving to the
                    group profile.
                  </p>
                </div>
                <div className="border-b mx-8 border-slate-100"></div>

                <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
                  <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 space-y-4 shadow-3xs relative overflow-hidden">
                    <div className="space-y-1 relative z-10">
                      <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">
                        Designated Position
                      </span>
                      <p className="text-base font-black text-[#074073] tracking-tight">
                        {formData.position}
                      </p>
                    </div>

                    <div className="border-t border-slate-200 pt-4 grid grid-cols-2 gap-4 relative z-10">
                      <div>
                        <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">
                          Appointed Leader
                        </span>
                        <p className="text-xs font-bold text-slate-700 mt-0.5">
                          {formData.name}
                        </p>
                      </div>
                      <div>
                        <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">
                          Official Contact
                        </span>
                        <p className="text-xs font-bold text-slate-700 mt-0.5">
                          {formData.phone}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50/40 border border-blue-100/60 rounded-xl p-4 flex items-center gap-3 select-none">
                    <Award
                      size={16}
                      className="text-[#074073] shrink-0 mt-0.5"
                    />
                    <p className="text-[11px] font-medium text-[#074073]/80 leading-normal">
                      Assigning this leader may update their signing rights or
                      correspondence permissions depending on group bylaws.
                    </p>
                  </div>
                </div>

                <div className="p-8 py-5 border-t border-slate-100 flex gap-3 select-none bg-white">
                  <button
                    type="button"
                    onClick={() => setStep("form")}
                    disabled={loading}
                    className="flex-1 h-12 font-bold text-xs bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Edit2 size={12} />
                    <span>Back to Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmAndSave}
                    disabled={loading}
                    className={`flex-[2] h-12 font-bold text-xs text-white rounded-xl shadow-md flex items-center justify-center gap-2 transition-all ${
                      loading
                        ? "bg-[#074073]/70 cursor-not-allowed text-white/80"
                        : "bg-[#074073] hover:bg-[#052d52] cursor-pointer active:scale-[0.98]"
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={13} className="animate-spin" />
                        <span>Saving Leader...</span>
                      </>
                    ) : (
                      <>
                        <Save size={14} />
                        <span>Confirm & Save</span>
                      </>
                    )}
                  </button>
                </div>
              </>
            )}

            {step === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col justify-between p-8 text-center h-full select-none"
              >
                <div className="flex-1 flex flex-col items-center justify-center space-y-4 max-w-sm mx-auto">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: 0.1,
                    }}
                    className="size-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border-4 border-white shadow-md shadow-emerald-600/10"
                  >
                    <CheckCircle2 size={32} strokeWidth={2.5} />
                  </motion.div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-[#074073] tracking-tight">
                      Leader Assigned Successfully
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      The official executive role has been updated on the group
                      record.
                    </p>
                  </div>

                  <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left space-y-2 mt-4 shadow-3xs">
                    <div>
                      <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
                        Executive Position
                      </p>
                      <p className="text-xs font-bold text-[#074073] mt-0.5">
                        {formData.position}
                      </p>
                    </div>
                    <div className="border-t border-slate-200/50 pt-2 flex justify-between">
                      <div>
                        <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
                          Leader Name
                        </p>
                        <p className="text-[11px] font-bold text-slate-700 mt-0.5">
                          {formData.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
                          Phone
                        </p>
                        <p className="text-[11px] font-bold text-slate-600 mt-0.5">
                          {formData.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 w-full">
                  <button
                    type="button"
                    onClick={() => setStep("form")}
                    className="w-full h-12 font-bold text-xs bg-slate-50 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                  >
                    <Plus size={14} /> Assign Another Leader
                  </button>
                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="w-full h-12 font-bold text-xs bg-[#074073] text-white rounded-xl hover:bg-[#052d52] transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.99]"
                  >
                    <span>Return to Group Profile</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ==========================================================================
   SUPPORTIVE INPUT HOUSING WRAPPER WITH ERROR CHASSIS
   ========================================================================== */
const FilterField = ({ label, icon: Icon, error, children }) => (
  <div className="space-y-1.5 w-full text-left">
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 select-none block">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none z-10">
        <Icon
          size={16}
          className={`transition-colors ${
            error
              ? "text-rose-400 group-focus-within:text-rose-500"
              : "text-slate-300 group-focus-within:text-[#074073]"
          }`}
        />
        <div
          className={`w-[1.5px] h-5 ml-4 transition-colors ${
            error
              ? "bg-rose-200 group-focus-within:bg-rose-300"
              : "bg-slate-200 group-focus-within:bg-[#074073]/20"
          }`}
        />
      </div>
      {children}
    </div>

    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="flex items-center gap-1 text-rose-500 pl-1 mt-1 select-none"
        >
          <AlertCircle size={11} className="shrink-0" />
          <p className="text-[11px] font-semibold tracking-tight leading-none">
            {error}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default AddGroupLeader;
