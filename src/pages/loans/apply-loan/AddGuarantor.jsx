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
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// MOCK DATA: High-fidelity member data representing the core ledger search engine
const MOCK_MEMBER_DATABASE = [
  {
    id: "M-4092",
    name: "Emmanuel Kipchumba",
    phone: "+254 712 345 678",
    email: "e.kipchumba@domain.com",
    shares: 450000,
    crbStatus: "Good Standing",
    activeGuarantees: 1,
    riskScore: "Low Risk",
  },
  {
    id: "M-8812",
    name: "Jane Mwangi Nyeri",
    phone: "+254 722 987 654",
    email: "jane.mwangi@domain.com",
    shares: 820000,
    crbStatus: "Excellent",
    activeGuarantees: 0,
    riskScore: "Minimal Risk",
  },
  {
    id: "M-1104",
    name: "David Ochieng Omolo",
    phone: "+254 733 555 111",
    email: "d.ochieng@domain.com",
    shares: 120000,
    crbStatus: "Conditional",
    activeGuarantees: 3,
    riskScore: "Medium Risk",
  },
];

export default function AddGuarantor() {
  // Query state hooks
  const [searchParams, setSearchParams] = useState({ name: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  // Staged Allocation State
  const [allocatedGuarantors, setAllocatedGuarantors] = useState([]);

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
    setErrors({});
    setIsSearching(true);

    setTimeout(() => {
      const filtered = MOCK_MEMBER_DATABASE.filter((member) => {
        const matchesName = searchParams.name
          ? member.name.toLowerCase().includes(searchParams.name.toLowerCase())
          : false;
        const matchesPhone = searchParams.phone
          ? member.phone
              .replace(/\s+/g, "")
              .includes(searchParams.phone.replace(/\s+/g, ""))
          : false;
        return matchesName || matchesPhone;
      });

      setSearchResults(filtered);
      setIsSearching(false);
      setHasSearched(true);
    }, 1200);
  };

  // Allocation Handlers
  const allocateGuarantor = () => {
    navigate(`/admin/apply-loan/collaterals`);
  };

  const removeAllocatedGuarantor = (id) => {
    setAllocatedGuarantors((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <div className="h-full bg-slate-50 flex flex-col antialiased font-sans text-slate-800">
      <div className="w-full flex flex-col gap-6">
        <div className="bg-white border border-slate-200/60 shadow-3xs rounded-2xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="font-mono text-[9px] font-black bg-blue-50 text-[#074073] px-2 py-0.5 rounded border border-blue-100 uppercase tracking-wider">
              Loan Application
            </span>
            <h1 className="text-xl font-black text-slate-900 tracking-tight mt-1.5">
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
                <h2 className="text-sm font-black text-slate-900 tracking-tight">
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

              {/* STAGED LIST PREVIEW DRAWER */}
              {allocatedGuarantors.length > 0 && (
                <div className="pt-4 mt-auto border-t border-slate-100 space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                    Selected Guarantor Pool ({allocatedGuarantors.length})
                  </p>
                  <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                    {allocatedGuarantors.map((guarantor) => (
                      <div
                        key={guarantor.id}
                        className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200/60 rounded-xl animate-in fade-in duration-150"
                      >
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-800 truncate">
                            {guarantor.name}
                          </p>
                          <p className="text-[10px] font-mono font-medium text-slate-400 mt-0.5">
                            ID: {guarantor.id} • {guarantor.phone}
                          </p>
                        </div>
                        <button
                          onClick={() => removeAllocatedGuarantor(guarantor.id)}
                          className="size-6 bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 rounded-lg transition-all flex items-center justify-center shadow-3xs cursor-pointer"
                        >
                          <X size={12} strokeWidth={2.5} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: DYNAMIC CANDIDATE RESULTS RUNTIME SCREEN */}
          <div className="bg-white border border-slate-200/60 shadow-3xs rounded-2xl flex flex-col justify-between overflow-hidden h-full min-h-[520px]">
            <div className="flex flex-col flex-1 overflow-hidden">
              {/* RESULTS BAR HEADER METRICS */}
              <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between select-none shrink-0">
                <div>
                  <h2 className="text-xs font-black text-slate-900 tracking-tight uppercase">
                    Available Guarantors
                  </h2>
                </div>
              </div>

              {/* DYNAMIC RESULTS PLAYGROUND HOOK */}
              <div className="p-6 flex-1 overflow-y-auto">
                {/* STATE A: NO SEARCH INITIALIZATION COMMITTED YET */}
                {!hasSearched && !isSearching && (
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

                {/* STATE B: SEARCH COMPLETE - ZERO CANDIDATES DETECTED */}
                {hasSearched && searchResults.length === 0 && !isSearching && (
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

                {/* STATE C: ACTIVE SYSTEM RESULTS DETECTED GRID RENDERING */}
                {hasSearched && searchResults.length > 0 && !isSearching && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-200">
                    {searchResults.map((candidate) => {
                      const isAlreadyAllocated = allocatedGuarantors.some(
                        (g) => g.id === candidate.id,
                      );

                      return (
                        <div
                          key={candidate.id}
                          className={`border rounded-2xl p-4 flex flex-col justify-between transition-all duration-200 relative ${
                            isAlreadyAllocated
                              ? "bg-slate-50/50 border-emerald-200 shadow-3xs"
                              : "bg-white border-slate-200/70 hover:border-slate-300 shadow-3xs"
                          }`}
                        >
                          {/* Top Identity Block */}
                          <div className="space-y-3">
                            <div className="flex justify-between items-start">
                              <div className="min-w-0">
                                <span className="font-mono text-[9px] font-black tracking-wider text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200/40">
                                  Member ID: {candidate.id}
                                </span>
                                <h3 className="text-xs font-black text-slate-900 mt-1.5 truncate">
                                  {candidate.name}
                                </h3>
                                <p className="text-[10px] font-medium text-slate-400 mt-0.5 truncate">
                                  {candidate.email}
                                </p>
                              </div>

                              <span
                                className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md border ${
                                  candidate.riskScore.includes("Low") ||
                                  candidate.riskScore.includes("Minimal")
                                    ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                                    : "bg-amber-50 border-amber-100 text-amber-700"
                                }`}
                              >
                                {candidate.riskScore}
                              </span>
                            </div>

                            <hr className="border-slate-100" />

                            {/* Key Financial Metrics Matrix */}
                            <div className="grid grid-cols-2 gap-y-3 text-[11px] font-medium text-slate-500">
                              <div className="space-y-0.5">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                  <Wallet size={10} /> Total Shares
                                </span>
                                <span className="text-xs font-bold text-slate-800">
                                  KES {candidate.shares.toLocaleString()}
                                </span>
                              </div>
                              <div className="space-y-0.5">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                  <ShieldCheck size={10} /> Credit Status
                                </span>
                                <span className="text-xs font-bold text-slate-800">
                                  {candidate.crbStatus}
                                </span>
                              </div>
                              <div className="col-span-2 space-y-0.5">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                  <TrendingUp size={10} /> Active Guarantees
                                </span>
                                <span className="text-xs font-bold text-slate-800">
                                  Guarantor for {candidate.activeGuarantees}{" "}
                                  ongoing loans
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
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
            type="button"
            className="h-11 px-6 bg-[#074073] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-[#074073]/10 hover:bg-[#052d52] transition-all active:scale-97 cursor-pointer flex items-center gap-2 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed disabled:active:scale-100"
          >
            <span>Continue With Application</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
