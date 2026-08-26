import React, { useState } from "react";
import {
  Search,
  User,
  Smartphone,
  Plus,
  CheckCircle2,
  X,
  Loader2,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  Users,
  Wallet,
  ArrowUpRight,
  Phone,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import {
  checkGuarantor,
  commitGuarantors,
  getGuarantors,
  listGuarantors,
  removeGuarantor,
} from "../../../sdk/guarantors/guarantors";
import { useToast } from "../../../contexts/ToastProvider";
import { getLoanProduct } from "../../../sdk/loan-products/loan-products";

export default function AddGuarantor() {
  // Query state hooks
  const [searchParams, setSearchParams] = useState({ name: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();
  const [allocatedGuarantors, setAllocatedGuarantors] = useState([]);
  const { productId, appId } = useParams();
  const { showToast } = useToast();
  const [loanProduct, setLoanProduct] = useState({});

  // Clear errors instantly upon character inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Input Field validation on focus leave
  const handleBlur = (e) => {
    const { name, value } = e.target;
    let errorMsg = "";
    if (name === "phone" && value && value.length < 10) {
      errorMsg = "Provide a valid phone configuration layout";
    }
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  // Simulated search engine lookup routine
  const handleExecuteSearch = (e) => {
    e.preventDefault();

    if (!searchParams.name && !searchParams.phone) {
      setErrors({
        global: "Please fill in at least one parameter to query the ledger.",
      });
      return;
    }
    findGuarantors();
  };

  const requiresChattels = loanProduct?.requires_collateral ?? false;
  const requiresDocuments = loanProduct?.requires_documents ?? false;

  const getNextRoute = (id) => {
    const nextRoute = requiresChattels
      ? `/admin/apply-loan/${productId}/collaterals/${id}`
      : requiresDocuments
        ? `/admin/apply-loan/${productId}/add-documents/${id}`
        : `/admin/apply-loan/application-successful/${id}`;
    return nextRoute;
  };

  // Allocation Handlers
  const allocateGuarantor = () => {
    commitMyGuarantors();
  };

  const removeAllocatedGuarantor = (id) => {
    setAllocatedGuarantors((prev) => prev.filter((g) => g.id !== id));
  };

  const { mutate: findGuarantors, isLoading: isSearching } = useMutation({
    mutationKey: ["find guarantors"],
    mutationFn: async () => {
      const response = await checkGuarantor(
        appId,
        searchParams?.phone,
        searchParams?.name,
      );
      return response.data.data;
    },
    onSuccess: (data) => {
      setSearchParams({
        phone: "",
        name: "",
      });
      refetch();
    },
    onError: (error) => {
      showToast({
        title: "Guarantor processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const { mutate: commitMyGuarantors, isLoading: committing } = useMutation({
    mutationKey: ["commit guarantors"],
    mutationFn: async () => {
      const response = await commitGuarantors(appId);
      return response.data.data;
    },
    onSuccess: (data) => {
      navigate(getNextRoute(appId));
    },
    onError: (error) => {
      showToast({
        title: "Guarantor processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const { mutate: onRemoveGuarantor, isLoading: removing } = useMutation({
    mutationKey: ["remove guarantor"],
    mutationFn: async (id) => {
      const response = await removeGuarantor(appId, id);
      return response.data.data;
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      showToast({
        title: "Guarantor processing failed",
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

  const { isFetching, refetch } = useQuery({
    queryKey: ["get guarantors", appId],
    queryFn: async () => {
      const response = await listGuarantors(appId);
      return response.data.data;
    },
    onSuccess: (data) => {
      setAllocatedGuarantors(data?.guarantors ?? []);
    },
    onError: (error) => {
      showToast({
        title: "Guarantors processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const handleRemoveGuarantor = (id) => {
    onRemoveGuarantor(id);
  };

  return (
    <div className="h-full bg-slate-50 flex flex-col antialiased font-sans text-slate-800">
      <div className="w-full flex flex-col gap-6">
        <div className="bg-white border border-slate-200/60 shadow-3xs rounded-2xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="font-mono text-[9px] font-black bg-blue-50 text-[#074073] px-2 py-0.5 rounded border border-blue-100 uppercase tracking-wider">
              Loan Application
            </span>
            <h1 className="text-xl font-black text-primary tracking-tight mt-1.5">
              Add Loan Guarantors
            </h1>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Search for members, review their savings or credit eligibility,
              and attach them to support this loan application.
            </p>
          </div>
        </div>
        {/* FIXED: grid-cols-2 + items-stretch forces both boxes to have identical width and height */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* LEFT COLUMN: ADVANCED SEARCH QUERY PANEL */}
          <div className="bg-white border border-slate-200/60 shadow-3xs rounded-2xl p-5 flex flex-col justify-between h-full min-h-[520px]">
            <div className="space-y-5 flex-1 flex flex-col">
              <div>
                <h2 className="text-sm font-black text-primary tracking-tight">
                  Find a Member
                </h2>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                  Look up active members in our network using their registration
                  details.
                </p>
              </div>

              <hr className="border-slate-100" />

              {/* FIXED: Added space-y-4 directly to the form to anchor the button beautifully right under the inputs */}
              <form
                onSubmit={handleExecuteSearch}
                className="flex-1 flex flex-col justify-between h-full"
              >
                {/* Inputs Group Wrapper */}
                <div className="space-y-6">
                  {/* PARAMETER 1: NAME SEARCH INPUT */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider ml-1">
                      Guarantor's Full Name
                    </label>
                    <div className="relative flex items-center">
                      <User
                        size={14}
                        className="absolute left-4 text-slate-400"
                      />
                      <input
                        type="text"
                        name="name"
                        value={searchParams.name}
                        onChange={handleInputChange}
                        placeholder="e.g., Emmanuel Kipchumba"
                        className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all text-xs font-semibold text-slate-800"
                      />
                    </div>
                  </div>

                  {/* PARAMETER 2: MOBILE REGISTERED NUMBER INPUT */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider ml-1">
                      Registered Phone Number
                    </label>
                    <div className="relative flex items-center">
                      <Smartphone
                        size={14}
                        className="absolute left-4 text-slate-400"
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={searchParams.phone}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="e.g., +254 712 345 678"
                        className={`w-full h-14 pl-12 pr-4 bg-slate-50 border rounded-xl outline-none focus:bg-white focus:border-[#074073] focus:ring-4 focus:ring-[#074073]/5 transition-all text-xs font-semibold text-slate-800 ${
                          errors.phone
                            ? "border-rose-400 focus:border-rose-500"
                            : "border-slate-200"
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-rose-500 text-[10px] font-bold flex items-center gap-1 mt-1 ml-1">
                        <AlertCircle size={10} /> {errors.phone}
                      </p>
                    )}
                  </div>

                  {errors.global && (
                    <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-2 text-[11px] text-rose-600 font-bold">
                      <AlertCircle size={14} /> {errors.global}
                    </div>
                  )}
                </div>

                {/* FIXED: Added mt-auto and pt-4 to push this action button to the absolute bottom edge of the card component */}
                <button
                  type="submit"
                  disabled={isSearching}
                  className="w-full h-11 bg-[#074073] hover:bg-[#053057] text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50 mt-auto pt-1"
                >
                  {isSearching ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Searching Records...</span>
                    </>
                  ) : (
                    <>
                      <Search size={14} strokeWidth={2.5} />
                      <span>Search Member</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: DYNAMIC CANDIDATE RESULTS RUNTIME SCREEN */}
          <div className="bg-white border border-slate-200/60 shadow-3xs rounded-2xl flex flex-col justify-between overflow-hidden h-full min-h-[520px]">
            <div className="flex flex-col flex-1 overflow-hidden">
              {/* RESULTS BAR HEADER METRICS */}
              <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between select-none shrink-0">
                <div>
                  <h2 className="text-xs font-black text-primary tracking-tight uppercase">
                    Available Guarantors
                  </h2>
                </div>
              </div>

              {/* DYNAMIC RESULTS PLAYGROUND HOOK */}
              <div className="p-6 flex-1 overflow-y-auto">
                {/* 1. LOADING STATE */}
                {isFetching && (
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div
                        key={`guarantor-skeleton-${index}`}
                        className="border border-slate-200/80 rounded-2xl p-3.5 bg-white shadow-3xs flex items-center justify-between gap-3 animate-pulse select-none pointer-events-none"
                      >
                        {/* LEFT: CIRCLED INITIALS & MEMBER DETAILS */}
                        <div className="flex items-center gap-3 min-w-0">
                          {/* CIRCLED AVATAR PLACEHOLDER */}
                          <div className="size-10 rounded-full bg-slate-200 shrink-0" />

                          {/* NAME & PHONE PLACEHOLDERS */}
                          <div className="min-w-0 flex flex-col space-y-1.5">
                            {/* Name Line */}
                            <div className="h-3.5 bg-slate-200 rounded-md w-28" />
                            {/* Phone Line */}
                            <div className="h-2.5 bg-slate-200 rounded-md w-20" />
                          </div>
                        </div>

                        {/* RIGHT: CIRCLED REMOVE ICON PLACEHOLDER */}
                        <div className="flex items-center shrink-0">
                          <div className="size-7 rounded-full bg-slate-200" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 2. STATE A: INITIAL STATE (Add your search term check if using a query string) */}
                {!isFetching && !appId && (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 max-w-sm mx-auto space-y-4">
                    <div className="size-12 bg-slate-50 border border-slate-200/60 text-slate-400 rounded-2xl flex items-center justify-center shadow-3xs">
                      <Users size={22} strokeWidth={1.5} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-800">
                        Ready to Search
                      </p>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                        Type a member's name or phone number on the left to
                        review their financial health summary and background
                        checks.
                      </p>
                    </div>
                  </div>
                )}

                {/* 3. STATE B: ZERO CANDIDATES DETECTED */}
                {!isFetching && appId && allocatedGuarantors.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 max-w-sm mx-auto space-y-4">
                    <div className="size-12 bg-rose-50 border border-rose-100 text-rose-500 rounded-2xl flex items-center justify-center shadow-3xs">
                      <X size={20} strokeWidth={2.5} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-800">
                        No Members Found
                      </p>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                        We couldn't find anyone matching those details. Please
                        make sure the spelling is correct or try using their
                        mobile number.
                      </p>
                    </div>
                  </div>
                )}

                {/* 4. STATE C: GUARANTORS FOUND GRID */}
                {!isFetching && allocatedGuarantors.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4 animate-in fade-in duration-200">
                    {allocatedGuarantors.map((candidate) => (
                      <div
                        key={candidate.id}
                        className="group relative border border-slate-200/80 hover:border-slate-300 rounded-2xl p-3.5 bg-white shadow-3xs hover:shadow-2xs transition-all duration-200 flex items-center justify-between gap-3"
                      >
                        {/* LEFT: CIRCLED INITIALS & MEMBER DETAILS */}
                        <div className="flex items-center gap-3 min-w-0">
                          {/* CIRCLED INITIALS */}
                          <div className="size-10 rounded-full bg-[#074073] border border-[#074073]/20 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-3xs">
                            {candidate?.guarantor?.name
                              ? candidate?.guarantor?.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .slice(0, 2)
                                  .toUpperCase()
                              : "GU"}
                          </div>

                          {/* NAME & PHONE */}
                          <div className="min-w-0 flex flex-col space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <h3 className="text-xs font-black text-slate-900 truncate">
                                {candidate?.guarantor?.name}
                              </h3>
                            </div>

                            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                              <span className="flex items-center gap-1 text-slate-500 font-medium">
                                <Phone
                                  size={10}
                                  className="text-slate-400 shrink-0"
                                />
                                {candidate?.guarantor?.mobile ?? "N/A"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* RIGHT: RISK BADGE & CIRCLED REMOVE ICON */}
                        <div className="flex items-center gap-2 shrink-0">
                          {/* CIRCLED REMOVE BUTTON */}
                          <button
                            type="button"
                            disabled={removing}
                            onClick={() => handleRemoveGuarantor(candidate?.id)}
                            title="Remove Guarantor"
                            className="size-7 rounded-full bg-slate-100 hover:bg-rose-50 border border-slate-200/60 hover:border-rose-200 text-slate-400 hover:text-rose-600 flex items-center justify-center transition-all cursor-pointer active:scale-90"
                          >
                            {removing ? (
                              <Loader2 size={13} strokeWidth={2.5} />
                            ) : (
                              <X size={13} strokeWidth={2.5} />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER ACTION MODULE */}
        <div className="bg-white mb-5 rounded-[24px] border border-slate-200/60 p-4 flex items-center justify-end gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="h-11 px-5 border border-slate-200/80 bg-white text-slate-600 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={allocateGuarantor}
            disabled={committing}
            type="button"
            className="h-11 px-6 bg-[#074073] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-[#074073]/10 hover:bg-[#052d52] transition-all active:scale-97 cursor-pointer flex items-center gap-2 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {committing ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Committing...</span>
              </>
            ) : (
              <>
                <span>Continue With Application</span>
                <ArrowUpRight size={14} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
