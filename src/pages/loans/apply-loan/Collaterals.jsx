import React, { useState } from "react";
import {
  Plus,
  Tv,
  Trash2,
  FileText,
  Image as ImageIcon,
  DollarSign,
  Layers,
  X,
  AlertCircle,
  CheckCircle2,
  FileUp,
  Info,
  ArrowUpRight,
  Loader2,
  Coins,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { useToast } from "../../../contexts/ToastProvider";
import {
  addChattel,
  deleteChattel,
  listChattels,
} from "../../../sdk/chattels/chattels";
import { getLoanProduct } from "../../../sdk/loan-products/loan-products";

const CATEGORY_OPTIONS = [
  { value: "ELECTRONICS", label: "Electronics & Media" },
  { value: "HOUSEHOLD_APPLIANCES", label: "Household Appliances" },
  { value: "VEHICLES", label: "Motor Vehicles / Cycles" },
  { value: "MACHINERY", label: "Commercial Machinery" },
  { value: "FURNITURE", label: "Furniture & Fittings" },
];

export default function ChattelRegistry() {
  const [chattels, setChattels] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { appId, productId } = useParams();
  const [loanProduct, setLoanProduct] = useState({});

  const [formData, setFormData] = useState({
    asset_name: "",
    asset_category: "",
    estimated_value: "",
    image_files: [],
    doc_files: [],
  });
  const [errors, setErrors] = useState({});

  const totalCollateralValue = chattels.reduce(
    (sum, item) => sum + Number(item.estimated_value),
    0,
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Files state mutators supporting multiple file uploads
  const handleFileChange = (e, key) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFormData((prev) => ({ ...prev, [key]: selectedFiles }));
      if (errors[key]) {
        setErrors((prev) => ({ ...prev, [key]: "" }));
      }
    }
  };

  // Field verification validation routines
  const handleBlur = (e) => {
    const { name, value } = e.target;
    let errorMsg = "";

    if (!value || value.trim() === "") {
      errorMsg = "This tracking parameter is required";
    } else if (name === "estimated_value" && Number(value) <= 0) {
      errorMsg = "Please input a positive market validation valuation value";
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  // Submissions router context handler
  const handleAddChattelSubmit = (e) => {
    e.preventDefault();

    // Core structural check routine
    let localErrors = {};
    if (!formData.asset_name)
      localErrors.asset_name = "Asset descriptor name required";
    if (!formData.asset_category)
      localErrors.asset_category = "Please select a category profile";
    if (!formData.estimated_value)
      localErrors.estimated_value = "Value assertion parameters required";

    if (Object.keys(localErrors).length > 0) {
      setErrors(localErrors);
      return;
    }
    mutate();
  };

  const resetFormAndCloseModal = () => {
    setFormData({
      asset_name: "",
      asset_category: "",
      estimated_value: "",
      image_files: [],
      doc_files: [],
    });
    setErrors({});
    setIsModalOpen(false);
  };

  const requiresDocuments = loanProduct?.requires_documents ?? false;

  const getNextRoute = (id) => {
    const nextRoute = requiresDocuments
      ? `/admin/apply-loan/${productId}/add-documents/${id}`
      : `/admin/apply-loan/application-successful/${id}`;
    return nextRoute;
  };

  const handleAddDocuments = () => {
    navigate(getNextRoute(appId));
  };

  const { isFetching, refetch } = useQuery({
    queryKey: ["fetch collaterals"],
    queryFn: async () => {
      const response = await listChattels(appId);
      return response.data.data;
    },
    onSuccess: (data) => {
      setChattels(data);
    },
    onError: (error) => {
      showToast({
        title: "Chattels processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  useQuery({
    queryKey: ["loan-product", productId],
    queryFn: async () => {
      const response = await getLoanProduct(productId);
      return response.data.data;
    },
    onSuccess: (data) => {
      setLoanProduct(data);
    },
    onError: (error) => {
      showToast({
        title: "Loan Products processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const { isLoading, mutate } = useMutation({
    mutationKey: ["add collateral"],
    mutationFn: async () => {
      const response = await addChattel(
        appId,
        formData?.asset_name,
        formData?.estimated_value,
        formData?.asset_category,
        formData?.doc_files,
        formData?.image_files,
      );
      return response.data.data;
    },
    onSuccess: () => {
      refetch();
      resetFormAndCloseModal();
    },
    onError: (error) => {
      showToast({
        title: "Chattels processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const { isLoading: deleting, mutate: deleteMyChattel } = useMutation({
    mutationKey: ["delete collateral"],
    mutationFn: async (id) => {
      const response = await deleteChattel(appId, id);
      return response.data.data;
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      showToast({
        title: "Chattels processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const deleteChattelRecord = (id) => {
    deleteMyChattel(id);
  };

  return (
    <div className="h-full bg-slate-50 flex flex-col justify-between antialiased text-slate-800">
      <div className="flex flex-col flex-1 gap-6 justify-between">
        {/* TOP LAYOUT BODY WRAPPER */}
        <div className="flex flex-col gap-6 flex-1">
          {/* HEADER SECTION */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 select-none">
            <div>
              <span className="font-mono text-[9px] font-black bg-blue-50 text-[#074073] px-2 py-0.5 rounded border border-blue-100 uppercase tracking-wider">
                Asset Security Registry
              </span>
              <h1 className="text-xl font-black text-primary tracking-tight mt-1.5">
                Movable Chattels
              </h1>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Register household properties, electronics, or personal
                machinery assets allocated to support the security coverage
                ratios.
              </p>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-1.5 h-11 px-5 bg-[#074073] hover:bg-[#053057] text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer active:scale-98 shrink-0"
              >
                <Plus size={14} strokeWidth={3} />
                <span>Register New Chattel</span>
              </button>
            </div>
          </div>

          {/* DYNAMIC CONTENT SPACE */}
          {isFetching ? (
            /* SKELETON LOADING UI */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={`chattel-skeleton-${index}`}
                  className="bg-white border border-slate-200/60 shadow-3xs rounded-2xl p-4 flex flex-col justify-between animate-pulse select-none pointer-events-none"
                >
                  <div className="space-y-3.5">
                    {/* Top Category Badge Skeleton */}
                    <div className="flex justify-between items-start">
                      <div className="h-4 w-28 bg-slate-200 rounded-md" />
                    </div>

                    {/* Core Content Skeleton */}
                    <div className="space-y-3">
                      {/* Title Line */}
                      <div className="h-4 bg-slate-200 rounded-md w-3/4" />

                      {/* Estimated Value Block */}
                      <div className="space-y-1.5 pt-1">
                        <div className="h-2.5 bg-slate-200 rounded-sm w-28" />
                        <div className="h-5 bg-slate-200 rounded-md w-36" />
                      </div>

                      {/* Description Lines */}
                      <div className="space-y-1 pt-1">
                        <div className="h-2.5 bg-slate-200 rounded-sm w-full" />
                        <div className="h-2.5 bg-slate-200 rounded-sm w-4/5" />
                      </div>
                    </div>
                  </div>

                  {/* Footer Interaction Strip Skeleton */}
                  <div className="pt-3.5 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="h-3 w-24 bg-slate-200 rounded-md" />
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-20 bg-slate-200 rounded-xl" />
                      <div className="h-8 w-8 bg-slate-200 rounded-xl" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : chattels.length === 0 ? (
            /* EMPTY CHATTEL CONTAINER CARD UI */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
              <div className="bg-white border-2 border-dashed border-slate-200/90 hover:border-[#074073]/40 shadow-3xs rounded-2xl p-4 flex flex-col justify-between transition-all duration-200 group">
                <div className="space-y-3.5">
                  <div className="flex justify-between items-start select-none">
                    <span className="font-sans text-[9px] font-black bg-slate-100 border border-slate-200/60 text-slate-400 px-2 py-0.5 rounded-md tracking-wider uppercase">
                      No Asset Assigned
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-[#074073] transition-colors shrink-0">
                        <Tv size={16} strokeWidth={1.5} />
                      </div>
                      <h3 className="text-sm font-black text-slate-800 tracking-tight">
                        No Security Items Declared
                      </h3>
                    </div>

                    <div className="space-y-0.5 pt-1">
                      <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">
                        Estimated Asset Value
                      </span>
                      <span className="text-base font-black text-slate-300 font-mono tracking-tight">
                        KES 0.00
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 font-medium leading-relaxed border-l-2 border-slate-100 pl-2">
                      Register household properties, electronics, or vehicles to
                      support loan security coverage ratios.
                    </p>
                  </div>
                </div>

                <div className="pt-3.5 mt-4 border-t border-slate-100/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400 select-none">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400"></span>
                    </span>
                    <span>Action Required</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="h-8 px-3 text-[11px] font-bold text-white bg-[#074073] hover:bg-[#053057] rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-3xs active:scale-98"
                  >
                    <Plus size={12} strokeWidth={3} />
                    <span>Add Asset</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* CHATTELS ROW GRID MAP ARRAY CARDS SETUP */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
              {chattels.map((chattel) => (
                <div
                  key={chattel.id}
                  className="bg-white border border-slate-200/60 shadow-3xs rounded-2xl p-4 flex flex-col justify-between hover:border-slate-300/90 transition-all duration-200"
                >
                  <div className="space-y-3.5">
                    <div className="flex justify-between items-start select-none">
                      <span className="font-sans text-[9px] font-black bg-blue-50/50 border border-blue-100/40 text-[#074073] px-2 py-0.5 rounded-md tracking-wider">
                        {chattel.asset_category}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-black text-primary tracking-tight leading-tight block truncate">
                        {chattel.asset_name}
                      </h3>

                      <div className="mt-2.5 space-y-0.5">
                        <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">
                          Estimated Asset Value
                        </span>
                        <span className="text-base font-black text-slate-800 tracking-tight">
                          KES{" "}
                          {chattel.estimated_value.toLocaleString("en-KE", {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </div>

                      {chattel.description && (
                        <p className="text-[11px] text-slate-400 font-medium leading-relaxed mt-2.5 line-clamp-2 border-l-2 border-slate-100 pl-2">
                          {chattel.description}
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
                      <span>Ready for Review</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          console.log(
                            "Launching collateral attachment lightbox...",
                            chattel,
                          )
                        }
                        className="h-8 px-3 text-[11px] font-bold text-slate-600 hover:text-[#074073] bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-3xs active:scale-98"
                      >
                        <span>Inspect Files</span>
                      </button>

                      <button
                        type="button"
                        disabled={deleting}
                        onClick={() => deleteChattelRecord(chattel.id)}
                        className="h-8 w-8 text-slate-400 hover:text-rose-600 border border-transparent hover:border-rose-100 hover:bg-rose-50/50 rounded-xl transition-all flex items-center justify-center cursor-pointer shadow-3xs active:scale-98"
                        title="Remove asset allocation profile from current session memory"
                      >
                        {deleting ? (
                          <Loader2 size={13} color="blue" />
                        ) : (
                          <Trash2 size={13} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* LOWER DOCK */}
        <div className="bg-white mt-8 rounded-[24px] border border-slate-200/60 p-4 flex items-center justify-end gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.02)] select-none shrink-0">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="h-11 px-5 border border-slate-200/80 bg-white text-slate-600 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleAddDocuments}
            type="button"
            disabled={chattels.length === 0}
            className="h-11 px-6 bg-[#074073] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-[#074073]/10 hover:bg-[#052d52] transition-all active:scale-97 cursor-pointer flex items-center gap-2 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed disabled:active:scale-100"
          >
            <span>Continue With Application</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      {/* RIGHT SIDE EXPAND OVERLAY DRAWER COMPONENT */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex justify-end bg-zinc-950/30 font-sans"
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
              {/* Slide-Over Header Section */}
              <div className="px-6 py-5 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between select-none shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="size-7 rounded-lg bg-blue-50 border border-blue-100 text-[#074073] flex items-center justify-center">
                    <Layers size={13} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h2 className="text-sm font-black text-primary tracking-tight">
                      Add Asset Details
                    </h2>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                      Provide your item's details and ownership documents below
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

              {/* Dynamic Input Scroll Form Workspace */}
              <form
                onSubmit={handleAddChattelSubmit}
                className="p-6 flex-1 overflow-y-auto flex flex-col justify-between space-y-6"
              >
                <div className="space-y-5 flex-1">
                  {/* FIELD 1: ASSET DESCRIPTIVE NAME */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider ml-1">
                      Item Name & Model
                    </label>
                    <div className="relative flex items-center group">
                      <Tv
                        size={14}
                        className="absolute left-4 text-slate-400 pointer-events-none group-focus-within:text-[#074073] transition-colors"
                      />
                      <div className="absolute left-10 w-[1px] h-5 bg-slate-200 group-focus-within:bg-[#074073]/30 transition-colors" />
                      <input
                        type="text"
                        name="asset_name"
                        value={formData.asset_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="e.g., Samsung 55' UHD Smart TV"
                        className={`w-full h-12 pl-14 pr-4 bg-slate-50 border rounded-xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all text-xs font-semibold text-slate-800 ${
                          errors.asset_name
                            ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/5"
                            : "border-slate-200"
                        }`}
                      />
                    </div>
                    {errors.asset_name && (
                      <p className="text-rose-500 text-[10px] font-bold flex items-center gap-1 mt-1 ml-1 animate-in fade-in duration-100">
                        <AlertCircle size={11} /> {errors.asset_name}
                      </p>
                    )}
                  </div>

                  {/* FIELD 2: ASSET CATEGORY GROUP SELECTION */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider ml-1">
                      Item Category
                    </label>
                    <div className="relative flex items-center group">
                      <Layers
                        size={14}
                        className="absolute left-4 text-slate-400 pointer-events-none group-focus-within:text-[#074073] transition-colors"
                      />
                      <div className="absolute left-10 w-[1px] h-5 bg-slate-200 group-focus-within:bg-[#074073]/30 transition-colors" />
                      <select
                        name="asset_category"
                        value={formData.asset_category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full h-12 pl-14 pr-4 bg-slate-50 border rounded-xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all text-xs font-semibold text-slate-700 cursor-pointer appearance-none ${
                          errors.asset_category
                            ? "border-rose-400 focus:border-rose-500"
                            : "border-slate-200"
                        }`}
                      >
                        <option value="">Select a category...</option>
                        {CATEGORY_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.asset_category && (
                      <p className="text-rose-500 text-[10px] font-bold flex items-center gap-1 mt-1 ml-1 animate-in fade-in duration-100">
                        <AlertCircle size={11} /> {errors.asset_category}
                      </p>
                    )}
                  </div>

                  {/* FIELD 3: ESTIMATED MARKET VALUE INTRO */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider ml-1">
                      Estimated Value
                    </label>
                    <div className="relative flex items-center group">
                      <Coins
                        size={14}
                        className="absolute left-4 text-slate-400 pointer-events-none group-focus-within:text-[#074073] transition-colors"
                      />
                      <div className="absolute left-10 w-[1px] h-5 bg-slate-200 group-focus-within:bg-[#074073]/30 transition-colors" />
                      <input
                        type="number"
                        name="estimated_value"
                        value={formData.estimated_value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="0.00"
                        className={`w-full h-12 pl-14 pr-12 bg-slate-50 border rounded-xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all text-xs font-semibold text-slate-800 ${
                          errors.estimated_value
                            ? "border-rose-400 focus:border-rose-500"
                            : "border-slate-200"
                        }`}
                      />
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none select-none">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-wide">
                          KES
                        </span>
                      </div>
                    </div>
                    {errors.estimated_value && (
                      <p className="text-rose-500 text-[10px] font-bold flex items-center gap-1 mt-1 ml-1 animate-in fade-in duration-100">
                        <AlertCircle size={11} /> {errors.estimated_value}
                      </p>
                    )}
                  </div>

                  {/* UPLOAD ATTACHMENTS SECTION */}
                  <div className="grid grid-cols-1 gap-4 pt-2">
                    {/* MULTIPLE IMAGES UPLOAD */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider ml-1">
                        Photos of the Item
                      </label>
                      <div className="relative h-26 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 flex flex-col items-center justify-center p-3 text-center transition-all hover:border-[#074073]/30">
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => handleFileChange(e, "image_files")}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                        />
                        {formData.image_files &&
                        formData.image_files.length > 0 ? (
                          <div className="flex flex-col items-center gap-1 animate-in fade-in duration-150">
                            <CheckCircle2
                              className="text-emerald-500"
                              size={16}
                              strokeWidth={3}
                            />
                            <span className="text-[11px] font-bold text-slate-700 truncate max-w-[280px] block">
                              {formData.image_files.length} Photo(s) Selected
                            </span>
                            <span className="text-[9px] font-mono text-slate-400">
                              Click to replace or add photos
                            </span>
                          </div>
                        ) : (
                          <>
                            <FileUp className="text-slate-300 mb-1" size={16} />
                            <span className="text-[11px] font-bold text-slate-600 block">
                              Upload Photos
                            </span>
                            <span className="text-[9px] font-medium text-slate-400 mt-0.5">
                              PNG or JPG up to 5MB (multiple allowed)
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* MULTIPLE DOCUMENTS UPLOAD */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider ml-1">
                        Proof of Ownership or Receipts
                      </label>
                      <div className="relative h-26 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 flex flex-col items-center justify-center p-3 text-center transition-all hover:border-[#074073]/30">
                        <input
                          type="file"
                          accept=".pdf,image/*"
                          multiple
                          onChange={(e) => handleFileChange(e, "doc_files")}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                        />
                        {formData.doc_files && formData.doc_files.length > 0 ? (
                          <div className="flex flex-col items-center gap-1 animate-in fade-in duration-150">
                            <CheckCircle2
                              className="text-emerald-500"
                              size={16}
                              strokeWidth={3}
                            />
                            <span className="text-[11px] font-bold text-slate-700 truncate max-w-[280px] block">
                              {formData.doc_files.length} Document(s) Selected
                            </span>
                            <span className="text-[9px] font-mono text-slate-400">
                              Click to replace or add documents
                            </span>
                          </div>
                        ) : (
                          <>
                            <FileText
                              className="text-slate-300 mb-1"
                              size={16}
                            />
                            <span className="text-[11px] font-bold text-slate-600 block">
                              Upload Receipts or Logbooks
                            </span>
                            <span className="text-[9px] font-medium text-slate-400 mt-0.5">
                              PDF or sharp images (multiple allowed)
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* SLIDE OUT SUBMIT CONTROL FOOTER DECK */}
                <div className="pt-4 mt-auto border-t border-slate-100 flex items-center justify-end gap-3 select-none shrink-0">
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={resetFormAndCloseModal}
                    className="h-10 px-4 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold shadow-3xs transition-all cursor-pointer active:scale-98 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="h-10 px-5 bg-[#074073] hover:bg-[#053057] text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer active:scale-98 flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={13} className="animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={13} strokeWidth={2.5} />
                        <span>Save Asset Details</span>
                      </>
                    )}
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
