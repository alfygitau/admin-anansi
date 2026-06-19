import React, { useState } from "react";
import {
  X,
  Key,
  Layers,
  Hash,
  Save,
  CheckCircle2,
  ArrowRight,
  Plus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AddPermission = ({
  isOpen,
  onClose,
  onSave,
  formData,
  setFormData,
  modulesList = [],
}) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleModuleChange = (e) => {
    const selectedModuleId = e.target.value;
    const selectedModule = modulesList.find(
      (mod) => mod.id === selectedModuleId,
    );

    if (selectedModule) {
      setFormData({
        ...formData,
        module_id: selectedModule.id,
        moduleName: selectedModule.name,
      });
    }
  };

  const handleSave = async () => {
    if (!formData.permissionName)
      return alert("Please enter a name for this permission.");
    if (!formData.module_id) return alert("Please select a system section.");

    // Fire the save action up to your server database log layer
    await onSave?.(formData);
    setIsSuccess(true);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setFormData({ permissionName: "", module_id: "", moduleName: "" });
    onClose();
  };

  const handleCreateAnother = () => {
    setIsSuccess(false);
    setFormData({ permissionName: "", module_id: "", moduleName: "" });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex justify-end bg-zinc-950/20"
        >
          <div className="absolute inset-0" onClick={handleResetAndClose} />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="bg-white relative w-full max-w-[480px] h-full shadow-2xl flex flex-col z-10 text-slate-800"
          >
            {/* Round window exit point */}
            <button
              onClick={handleResetAndClose}
              className="absolute top-5 right-5 z-10 w-8 h-8 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-3xs active:scale-95"
            >
              <X size={15} />
            </button>

            {!isSuccess ? (
              /* --- WORKSPACE SCREEN STATE A: USER CONFIGURATION FORM --- */
              <>
                <div className="px-8 pt-5 pb-6 select-none">
                  <h2 className="text-xl font-black text-[#074073] tracking-tight">
                    Create New Permission
                  </h2>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    Add a clear action rule or access right for your team
                    members.
                  </p>
                </div>
                <div className="border-b mx-8 border-slate-100"></div>

                <div className="flex-1 overflow-y-auto px-8 py-6 space-y-5">
                  {/* FIELD 1: INPUT MANUALLY STATED PERMISSION STRING */}
                  <InputFieldContainer
                    label="Permission Action Name"
                    icon={Key}
                  >
                    <input
                      type="text"
                      className="w-full pl-[56px] pr-4 h-12 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#074073] focus:bg-white transition-all shadow-3xs"
                      placeholder="e.g., Enter permission name"
                      value={formData.permissionName || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          permissionName: e.target.value,
                        })
                      }
                      required
                    />
                  </InputFieldContainer>

                  {/* FIELD 2: DYNAMIC SELECT DROPDOWN ATTACHMENT HUB */}
                  <InputFieldContainer
                    label="Assign to System Section"
                    icon={Layers}
                  >
                    <div className="relative w-full">
                      <select
                        className="w-full pl-[56px] pr-10 h-12 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:outline-none focus:border-[#074073] focus:bg-white transition-all shadow-3xs appearance-none cursor-pointer"
                        value={formData.module_id || ""}
                        onChange={handleModuleChange}
                        required
                      >
                        <option value="" disabled hidden>
                          Choose a permission module...
                        </option>
                        {modulesList.map((mod) => (
                          <option key={mod.id} value={mod.id}>
                            {mod.name}
                          </option>
                        ))}
                      </select>
                      {/* Premium dropdown arrow integration */}
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m 6,9 6,6 6,-6" />
                        </svg>
                      </div>
                    </div>
                  </InputFieldContainer>

                  {/* FIELD 3: DYNAMIC READ-ONLY CODE REVEAL STRIP */}
                  {formData.module_id && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="animate-in fade-in duration-150"
                    >
                      <InputFieldContainer
                        label="Linked System Identifier ID"
                        icon={Hash}
                      >
                        <input
                          type="text"
                          className="w-full pl-[56px] pr-4 h-11 bg-slate-100 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-500 opacity-70 outline-none select-all"
                          value={formData.module_id}
                          readOnly
                          disabled
                        />
                      </InputFieldContainer>
                    </motion.div>
                  )}
                </div>

                {/* BOTTOM CORE OPERATIONS DOCK TRIGGER CONTROL BAR */}
                <div className="p-8 py-5 border-t border-slate-100 flex gap-3 select-none">
                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="flex-1 h-12 font-bold text-xs bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={!formData.permissionName || !formData.module_id}
                    className="flex-[2] h-12 font-bold text-xs bg-[#074073] text-white rounded-xl shadow-md flex items-center justify-center gap-2 hover:bg-[#052d52] transition-colors cursor-pointer disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                  >
                    <Save size={14} />
                    <span>Save Permission</span>
                  </button>
                </div>
              </>
            ) : (
              /* --- WORKSPACE SCREEN STATE B: THE USER SUCCESS CONFIRMATION SLATE --- */
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col justify-between p-8 text-center h-full select-none"
              >
                <div className="flex-1 flex flex-col items-center justify-center space-y-4 max-w-sm mx-auto w-full">
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
                    <CheckCircle2 size={30} strokeWidth={2.5} />
                  </motion.div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">
                      Permission Rule Created
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      The access rule was successfully attached to the system
                      feature.
                    </p>
                  </div>

                  {/* Summary Profile Block Layout Display */}
                  <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left space-y-2.5 mt-4 shadow-3xs">
                    <div>
                      <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
                        Configured Action Right
                      </p>
                      <p className="text-xs font-bold text-slate-800 mt-0.5">
                        {formData.permissionName}
                      </p>
                    </div>
                    <div className="border-t border-slate-200/60 pt-2.5">
                      <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
                        Assigned System Module
                      </p>
                      <p className="text-xs font-bold text-[#074073] mt-0.5">
                        {formData.moduleName}
                      </p>
                      <p className="text-[10px] font-mono font-medium text-slate-400 truncate mt-0.5">
                        ID: {formData.module_id}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Success Action suite button links row */}
                <div className="flex flex-col gap-2.5 w-full">
                  <button
                    type="button"
                    onClick={handleCreateAnother}
                    className="w-full h-12 font-bold text-xs bg-slate-50 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>Add Another Rule</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="w-full h-12 font-bold text-xs bg-[#074073] text-white rounded-xl hover:bg-[#052d52] transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Close Sheet</span>
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

// Premium prefixed wrapper layout featuring your vertical divider separator line
const InputFieldContainer = ({ label, icon: Icon, children }) => (
  <div className="space-y-2 w-full">
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 block select-none">
      {label}
    </label>
    <div className="relative group w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none z-10 text-slate-300 group-focus-within:text-[#074073] transition-colors">
        <Icon size={16} />
        <div className="w-[1px] h-4 bg-slate-200 ml-3.5 group-focus-within:bg-[#074073]/20 transition-colors" />
      </div>
      {children}
    </div>
  </div>
);

export default AddPermission;
