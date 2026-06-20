import React, { useState } from "react";
import {
  Plus,
  FileText,
  Trash2,
  Layers,
  X,
  AlertCircle,
  CheckCircle2,
  FileUp,
  ArrowUpRight,
  Calendar,
  HardDrive,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Standard clear type maps matching your strict DB schema layout keys
const DOC_TYPE_OPTIONS = [
  { value: "mpesa_statement", label: "M-Pesa Statement (PDF)" },
  { value: "national_id", label: "National ID Scan" },
  { value: "kra_pin_cert", label: "KRA PIN Certificate" },
  { value: "bank_statement", label: "Certified Bank Statement" },
  { value: "employment_letter", label: "Letter of Employment" },
];

export default function LoanDocuments() {
  const [documents, setDocuments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Form State aligned precisely with your JSON schema structure
  const [formData, setFormData] = useState({
    doc_type: "",
    notes: "",
    document_file: null,
  });
  const [errors, setErrors] = useState({});

  // Utility pipe to convert integer bytes into friendly text
  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, document_file: e.target.files[0] }));
      if (errors.document_file) {
        setErrors((prev) => ({ ...prev, document_file: "" }));
      }
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let errorMsg = "";
    if (!value || value.trim() === "") {
      errorMsg = "This choice is required to clear compliance checks";
    }
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleAddDocumentSubmit = (e) => {
    e.preventDefault();

    let localErrors = {};
    if (!formData.doc_type)
      localErrors.doc_type = "Please select a document type";
    if (!formData.document_file)
      localErrors.document_file = "Please upload a document file to continue";

    if (Object.keys(localErrors).length > 0) {
      setErrors(localErrors);
      return;
    }

    // INSTANTIATES YOUR EXACT JSON SCHEMA OBJECT
    const newDocumentRecord = {
      id: `DOC-${String(documents.length + 1).padStart(3, "0")}`,
      doc_type: formData.doc_type,
      file_name: formData.document_file.name,
      file_size: formData.document_file.size, // Stores clean integer bytes, e.g., 40960
      file_url: URL.createObjectURL(formData.document_file),
      notes: formData.notes || "",
    };

    setDocuments((prev) => [...prev, newDocumentRecord]);
    resetFormAndCloseModal();
  };

  const deleteDocumentRecord = (id) => {
    setDocuments((prev) => prev.filter((item) => item.id !== id));
  };

  const resetFormAndCloseModal = () => {
    setFormData({ doc_type: "", notes: "", document_file: null });
    setErrors({});
    setIsModalOpen(false);
  };

  const handleCompleteApplication = () => {
    console.log("Ready to push JSON Payload to server array:", documents);
    navigate(`/admin/dashboard`);
  };

  return (
    <div className="h-full bg-slate-50 flex flex-col justify-between antialiased font-sans text-slate-800">
      <div className="w-full flex flex-col flex-1 gap-6 justify-between">
        <div className="flex flex-col gap-6 flex-1">
          {/* HEADER ROW BAR */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 select-none">
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight mt-1.5">
                Support Documents
              </h1>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Provide clean financial statement proofs and clear ID
                credentials to run automated account processing.
              </p>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-1.5 h-11 px-5 bg-[#074073] hover:bg-[#053057] text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer active:scale-98 shrink-0"
              >
                <Plus size={14} strokeWidth={3} />
                <span>Upload Document</span>
              </button>
            </div>
          </div>

          {/* DOCUMENT MAP VIEW GRID MATRIX */}
          {documents.length === 0 ? (
            <div className="flex flex-col flex-1 bg-white border border-slate-200/60 shadow-3xs rounded-2xl p-12 space-y-4 justify-center items-center min-h-[340px]">
              <div className="size-12 bg-slate-50 border border-slate-200/60 text-slate-400 rounded-2xl flex items-center justify-center shadow-3xs">
                <FileText size={22} strokeWidth={1.5} />
              </div>
              <div className="space-y-1 max-w-sm">
                <p className="text-sm font-bold text-slate-800 text-center">
                  No Files Attached Yet
                </p>
                <p className="text-xs text-slate-400 leading-relaxed font-medium text-center">
                  Your documentation deck is currently empty. Tap upload to
                  supply verification statements or identity cards.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white border border-slate-200/60 shadow-3xs rounded-2xl p-4 flex flex-col justify-between hover:border-slate-300/90 transition-all duration-200"
                >
                  <div className="space-y-3.5">
                    <div className="flex justify-between items-start select-none">
                      <span className="font-mono text-[9px] font-black bg-slate-50 border border-slate-200/40 text-slate-400 px-1.5 py-0.5 rounded">
                        {doc.id}
                      </span>
                      <span className="font-sans text-[9px] font-black bg-blue-50/50 border border-blue-100/40 text-[#074073] px-2 py-0.5 rounded-md tracking-wider capitalize">
                        {doc.doc_type.replace(/_/g, " ")}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-black text-slate-900 tracking-tight leading-tight block truncate">
                        {doc.file_name}
                      </h3>

                      {/* Displaying Extracted Metric Telemetry details */}
                      <div className="mt-2.5 flex items-center gap-4 text-slate-400 font-medium text-[11px] select-none">
                        <span className="flex items-center gap-1">
                          <HardDrive size={12} className="text-slate-400" />
                          {formatFileSize(doc.file_size)}
                        </span>
                      </div>

                      {doc.notes && (
                        <p className="text-[11px] text-slate-400 font-medium leading-relaxed mt-2.5 line-clamp-2 border-l-2 border-slate-100 pl-2">
                          {doc.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-3.5 mt-4 border-t border-slate-100/80 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400 select-none">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                      </span>
                      <span>Verified Sandbox</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={doc.file_url}
                        target="_blank"
                        rel="noreferrer"
                        className="h-8 px-3 text-[11px] font-bold text-slate-600 hover:text-[#074073] bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-3xs active:scale-98"
                      >
                        <span>Open Document</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => deleteDocumentRecord(doc.id)}
                        className="h-8 w-8 text-slate-400 hover:text-rose-600 border border-transparent hover:border-rose-100 hover:bg-rose-50/50 rounded-xl transition-all flex items-center justify-center cursor-pointer shadow-3xs active:scale-98"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* PERSISTENT LOWER MASTER BOTTOM NAVIGATION DOCK CONTROL */}
        <div className="bg-white mt-8 rounded-[24px] border border-slate-200/60 p-4 flex items-center justify-end gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.02)] select-none shrink-0">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="h-11 px-5 border border-slate-200/80 bg-white text-slate-600 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
          >
            Cancel Back
          </button>
          <button
            onClick={handleCompleteApplication}
            type="button"
            disabled={documents.length === 0}
            className="h-11 px-6 bg-[#074073] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-[#074073]/10 hover:bg-[#052d52] transition-all active:scale-97 cursor-pointer flex items-center gap-2 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed"
          >
            <span>Complete Loan Processing</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      {/* RIGHT SIDE DRAWER EXPAND MODAL ARCHITECTURE */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex justify-end bg-zinc-950/30 backdrop-blur-xs font-sans"
          >
            <div
              className="absolute inset-0"
              onClick={resetFormAndCloseModal}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="bg-white relative w-full max-w-[480px] h-full shadow-2xl flex flex-col z-10 text-slate-800 border-l border-slate-200"
            >
              <div className="px-6 py-5 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between select-none shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="size-7 rounded-lg bg-blue-50 border border-blue-100 text-[#074073] flex items-center justify-center">
                    <FileText size={13} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h2 className="text-sm font-black text-slate-900 tracking-tight">
                      Upload Support Document
                    </h2>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                      Supply files matching strict audit verification lists
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={resetFormAndCloseModal}
                  className="size-7 bg-white border border-slate-200 text-slate-400 hover:text-slate-700 rounded-lg flex items-center justify-center shadow-3xs transition-colors cursor-pointer"
                >
                  <X size={13} strokeWidth={3} />
                </button>
              </div>

              <form
                onSubmit={handleAddDocumentSubmit}
                className="p-6 flex-1 overflow-y-auto flex flex-col justify-between space-y-6"
              >
                <div className="space-y-5 flex-1">
                  {/* INPUT FIELD 1: DOC TYPE ENUM SELECT SEPARATOR LAYOUT */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider ml-1">
                      Document Type
                    </label>
                    <div className="relative flex items-center group">
                      <Layers
                        size={14}
                        className="absolute left-4 text-slate-400 pointer-events-none group-focus-within:text-[#074073] transition-colors"
                      />
                      <div className="absolute left-10 w-[1px] h-5 bg-slate-200 group-focus-within:bg-[#074073]/30 transition-colors" />
                      <select
                        name="doc_type"
                        value={formData.doc_type}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full h-12 pl-14 pr-4 bg-slate-50 border rounded-xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all text-xs font-semibold text-slate-700 cursor-pointer appearance-none ${
                          errors.doc_type
                            ? "border-rose-400 focus:border-rose-500"
                            : "border-slate-200"
                        }`}
                      >
                        <option value="">Choose attachment profile...</option>
                        {DOC_TYPE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.doc_type && (
                      <p className="text-rose-500 text-[10px] font-bold flex items-center gap-1 mt-1 ml-1 animate-in fade-in duration-100">
                        <AlertCircle size={11} /> {errors.doc_type}
                      </p>
                    )}
                  </div>

                  {/* INPUT FIELD 2: CONTEXT NOTES TEXTAREA ANCHOR */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider ml-1">
                      Additional Notes
                    </label>
                    <div className="relative flex items-start group">
                      <div className="absolute left-10 w-[1px] h-5 bg-slate-200 top-3.5 group-focus-within:bg-[#074073]/30 transition-colors" />
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Write a small description or context note regarding this specific file text stream..."
                        rows={3}
                        className="w-full p-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all text-xs font-semibold text-slate-800 resize-none"
                      />
                    </div>
                  </div>

                  {/* FILE INPUT UPLOAD AREA */}
                  <div className="space-y-1.5 pt-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider ml-1">
                      Attach Statement File
                    </label>
                    <div
                      className={`relative h-32 border-2 border-dashed rounded-xl bg-slate-50/50 flex flex-col items-center justify-center p-4 text-center transition-all hover:border-[#074073]/30 ${
                        errors.document_file
                          ? "border-rose-300 bg-rose-50/10"
                          : "border-slate-200"
                      }`}
                    >
                      <input
                        type="file"
                        accept=".pdf,image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                      />
                      {formData.document_file ? (
                        <div className="flex flex-col items-center gap-1.5 animate-in fade-in duration-150">
                          <CheckCircle2
                            className="text-emerald-500"
                            size={18}
                            strokeWidth={3}
                          />
                          <span className="text-[11px] font-bold text-slate-700 truncate max-w-[320px] block">
                            {formData.document_file.name}
                          </span>
                          <span className="text-[9px] font-mono text-slate-400">
                            Click to change selection file
                          </span>
                        </div>
                      ) : (
                        <>
                          <FileUp className="text-slate-300 mb-1" size={18} />
                          <span className="text-[11px] font-bold text-slate-600 block">
                            Select Statement Document
                          </span>
                          <span className="text-[9px] font-medium text-slate-400 mt-0.5">
                            Accepts PDFs or clean image exports up to 10MB
                          </span>
                        </>
                      )}
                    </div>
                    {errors.document_file && (
                      <p className="text-rose-500 text-[10px] font-bold flex items-center gap-1 mt-1 ml-1 animate-in fade-in duration-100">
                        <AlertCircle size={11} /> {errors.document_file}
                      </p>
                    )}
                  </div>
                </div>

                {/* STEP ACTION CONTROLLERS FOOTER PINNED UNDER INPUTS */}
                <div className="pt-4 mt-auto border-t border-slate-100 flex items-center justify-end gap-3 select-none shrink-0">
                  <button
                    type="button"
                    onClick={resetFormAndCloseModal}
                    className="h-10 px-4 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold shadow-3xs transition-all cursor-pointer active:scale-98"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="h-10 px-5 bg-[#074073] hover:bg-[#053057] text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer active:scale-98 flex items-center gap-1.5"
                  >
                    <CheckCircle2 size={13} strokeWidth={2.5} />
                    <span>Attach Document</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
