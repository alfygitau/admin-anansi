import React, { useState } from "react";
import {
  Coins,
  ArrowRight,
  Percent,
  Calendar,
  ShieldCheck,
  AlertCircle,
  Zap,
  TrendingUp,
  Car,
  CheckCircle2,
  BookOpen,
  Smartphone,
  Sprout,
  ArrowUpRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ApplyProducts = ({ memberData, loanProducts, onSubmitApplication }) => {
  const navigate = useNavigate();
  // Sample fallback member data
  const member = memberData || {
    id: "MBR-90412",
    name: "Jane S. Moraa",
    totalDeposits: 250000,
    maxEligibility: 750000, // 3x Deposits rule
    activeLoansCount: 0,
  };

  // Expanded premium loan products catalog (6 Items)
  const products = loanProducts || [
    {
      id: "PROD-EMERGENCY",
      name: "Instant Emergency Loan",
      description:
        "Quick cash injection for unexpected expenses. Fast tracking with minimal documentation.",
      interestRate: 12,
      interestType: "Flat Rate",
      maxAmount: 100000,
      maxPeriodMonths: 12,
      icon: Zap,
      accentColor: "from-amber-500 to-orange-600",
      bgTint: "bg-amber-50/50 border-amber-100",
      textTint: "text-amber-700",
    },
    {
      id: "PROD-DEVELOPMENT",
      name: "Premium Development Loan",
      description:
        "Long-term investment financing designed for asset creation, business growth, or development.",
      interestRate: 13.5,
      interestType: "Reducing Balance",
      maxAmount: member.maxEligibility, // Dynamic based on SACCO multiplier
      maxPeriodMonths: 60,
      icon: TrendingUp,
      accentColor: "from-blue-600 to-[#074073]",
      bgTint: "bg-blue-50/50 border-blue-100",
      textTint: "text-blue-700",
    },
    {
      id: "PROD-ASSET",
      name: "Asset & Motor Vehicle Financing",
      description:
        "Secure capital to purchase logbook-backed assets, personal cars, or equipment.",
      interestRate: 14,
      interestType: "Reducing Balance",
      maxAmount: 2000000,
      maxPeriodMonths: 48,
      icon: Car,
      accentColor: "from-emerald-600 to-teal-700",
      bgTint: "bg-emerald-50/50 border-emerald-100",
      textTint: "text-emerald-700",
    },
    {
      id: "PROD-EDUCATION",
      name: "Education & School Fees Loan",
      description:
        "Affordable financing to secure academic futures. Direct disbursement options to institutions available.",
      interestRate: 10.5,
      interestType: "Reducing Balance",
      maxAmount: 400000,
      maxPeriodMonths: 12,
      icon: BookOpen,
      accentColor: "from-indigo-500 to-purple-600",
      bgTint: "bg-indigo-50/50 border-indigo-100",
      textTint: "text-indigo-700",
    },
    {
      id: "PROD-ADVANCE",
      name: "FOSA Salary Advance",
      description:
        "Short-term credit processing for salaried members to bridge monthly budgetary gaps instantly.",
      interestRate: 6,
      interestType: "Flat Rate",
      maxAmount: 75000,
      maxPeriodMonths: 3,
      icon: Smartphone,
      accentColor: "from-rose-500 to-pink-600",
      bgTint: "bg-rose-50/50 border-rose-100",
      textTint: "text-rose-700",
    },
    {
      id: "PROD-AGRI",
      name: "Kilimo Bora Agri-Financing",
      description:
        "Tailored capital supporting agricultural machinery inputs, quality livestock, and crop seasonal setups.",
      interestRate: 11.5,
      interestType: "Reducing Balance",
      maxAmount: 1200000,
      maxPeriodMonths: 36,
      icon: Sprout,
      accentColor: "from-lime-600 to-green-700",
      bgTint: "bg-lime-50/50 border-lime-100",
      textTint: "text-lime-700",
    },
  ];

  // Application States
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [amount, setAmount] = useState("");
  const [months, setMonths] = useState("");
  const [notes, setNotes] = useState("");

  const selectedProduct = products.find((p) => p.id === selectedProductId);

  // Automatically update input upper limits when a product changes
  const handleProductSelect = (id) => {
    setSelectedProductId(id);
    const prod = products.find((p) => p.id === id);
    setAmount(prod.maxAmount > 500000 ? 500000 : prod.maxAmount); // Sensible starting default
    setMonths(prod.maxPeriodMonths);
  };

  // Simple interest calculations for UI estimation values
  const calculateEstimatedRepayment = () => {
    if (!selectedProduct || !amount || !months) return 0;
    const principal = Number(amount);
    const rate = selectedProduct.interestRate / 100 / 12;

    if (selectedProduct.interestType === "Flat Rate") {
      const totalInterest =
        principal * (selectedProduct.interestRate / 100) * (months / 12);
      return (principal + totalInterest) / months;
    } else {
      // Reducing Balance approximation (Amortization formula)
      return (
        (principal * rate * Math.pow(1 + rate, months)) /
        (Math.pow(1 + rate, months) - 1)
      );
    }
  };

  const estimatedMonthly = calculateEstimatedRepayment();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!selectedProductId) return alert("Please select a loan product first.");

    onSubmitApplication?.({
      memberId: member.id,
      productId: selectedProductId,
      requestedAmount: Number(amount),
      repaymentPeriodMonths: Number(months),
      applicationNotes: notes,
    });
  };

  return (
    <div className="w-full space-y-8 font-sans antialiased text-slate-800 p-1">
      {/* 1. MEMBER PROFILE CONTEXT BANNER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-slate-200/60 pb-6 select-none">
        <div>
          <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2.5 py-1 rounded-md uppercase tracking-wider border border-slate-200/40">
            New Application Lifecycle
          </span>
          <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
            Choose Loan Product
          </h2>
          <p>{member.name}</p>
          <p className="text-xs text-slate-500">
            Member ID Reference:{" "}
            <span className="font-mono font-bold text-slate-700">
              {member.id}
            </span>
          </p>
        </div>
      </div>

      {/* 2. LOAN PRODUCT CHANNELS SELECTOR */}
      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Coins className="text-[#074073]" size={16} /> Available Loan
            Products
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Select a borrowing channel configured below to unlock its specific
            limits and variables.
          </p>
        </div>

        {/* Catalog Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-stretch">
          {products.map((product) => {
            const ProductIcon = product.icon;
            const isSelected = selectedProductId === product.id;

            return (
              <div
                key={product.id}
                onClick={() => handleProductSelect(product.id)}
                className={`group relative flex flex-col justify-between p-5 rounded-2xl bg-white border cursor-pointer select-none transition-all duration-200 shadow-3xs hover:border-slate-300 hover:shadow-2xs ${
                  isSelected
                    ? "ring-2 ring-[#074073] border-transparent shadow-xs scale-[1.01]"
                    : ""
                }`}
              >
                {/* Active Check Accent */}
                {isSelected && (
                  <div className="absolute top-4 right-4 text-[#074073]">
                    <CheckCircle2
                      size={18}
                      fill="currentColor"
                      className="text-white"
                    />
                  </div>
                )}

                <div className="space-y-4">
                  {/* Decorative Icon Head */}
                  <div
                    className={`size-10 rounded-xl bg-gradient-to-tr ${product.accentColor} text-white flex items-center justify-center shadow-2xs`}
                  >
                    <ProductIcon size={18} />
                  </div>

                  {/* Descriptions */}
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                      {product.description}
                    </p>

                    {/* PREMIUM TERMS & CONDITIONS LINK */}
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents checking/unchecking card state
                          alert(
                            `Displaying Terms & Conditions for ${product.name}`,
                          );
                        }}
                        className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:text-[#074073] transition-colors cursor-pointer tracking-wide"
                      >
                        <span>View Terms & Conditions</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Technical Product Metrics Tiers */}
                <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 mt-5 text-[11px] font-medium text-slate-500">
                  <div className="space-y-0.5">
                    <span className="text-[9px] uppercase font-bold text-slate-400 flex items-center gap-1">
                      <Percent size={10} /> Rate
                    </span>
                    <p className="text-slate-800 font-bold">
                      {product.interestRate}%{" "}
                      <span className="text-[9px] text-slate-400 font-normal">
                        ({product.interestType.split(" ")[0]})
                      </span>
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[9px] uppercase font-bold text-slate-400 flex items-center gap-1">
                      <Calendar size={10} /> Max Duration
                    </span>
                    <p className="text-slate-800 font-bold">
                      {product.maxPeriodMonths} Months
                    </p>
                  </div>

                  <div className="col-span-2 space-y-0.5 border-t border-slate-50 pt-2 mt-1">
                    <span className="text-[9px] uppercase font-bold text-slate-400">
                      Borrowing Limit
                    </span>
                    <p className="text-slate-900 font-bold font-mono">
                      Up to KES {product.maxAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
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
            <span>Contine With Application</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyProducts;
