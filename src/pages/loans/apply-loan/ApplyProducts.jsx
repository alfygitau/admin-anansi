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
  Briefcase,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getMember } from "../../../sdk/members/members";
import { useQuery } from "react-query";
import { useToast } from "../../../contexts/ToastProvider";
import { getLoanProducts } from "../../../sdk/loan-products/loan-products";

const ApplyProducts = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { showToast } = useToast();
  const [member, setMember] = useState({});
  const [loanProducts, setLoanProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [amount, setAmount] = useState("");
  const [months, setMonths] = useState("");
  const [notes, setNotes] = useState("");
  const selectedProduct = loanProducts.find((p) => p.id === selectedProductId);

  const handleProductSelect = (id) => {
    setSelectedProductId(id);
    const prod = loanProducts.find((p) => p.id === id);
    setAmount(prod.maxAmount > 500000 ? 500000 : prod.maxAmount);
    setMonths(prod.maxPeriodMonths);
  };

  const calculateEstimatedRepayment = () => {
    if (!selectedProduct || !amount || !months) return 0;
    const principal = Number(amount);
    const rate = selectedProduct.interestRate / 100 / 12;

    if (selectedProduct.interestType === "Flat Rate") {
      const totalInterest =
        principal * (selectedProduct.interestRate / 100) * (months / 12);
      return (principal + totalInterest) / months;
    } else {
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
  };

  const { isFetching } = useQuery({
    queryKey: ["get member", id],
    queryFn: async () => {
      const response = await getMember(id);
      return response?.data?.data;
    },
    onSuccess: (data) => {
      setMember(data);
    },
    onError: (error) => {
      showToast({
        title: "Member processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const { isFetching: fetchingProducts } = useQuery({
    queryKey: ["loan-products"],
    queryFn: async () => {
      const response = await getLoanProducts();
      return response.data.data;
    },
    onSuccess: (data) => {
      setLoanProducts(data);
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

  return (
    <div className="w-full h-full flex flex-col justify-start antialiased text-slate-800 p-1">
      {/* 1. MEMBER PROFILE CONTEXT BANNER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-slate-200/60 pb-6 select-none mb-8">
        <div>
          <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2.5 py-1 rounded-md uppercase tracking-wider border border-slate-200/40">
            New Application Lifecycle
          </span>
          <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
            Choose Loan Product
          </h2>
          <p className="text-sm font-medium text-slate-700 mt-1">
            {member?.firstname} {member?.lastname}
          </p>
          <p className="text-xs text-slate-500">
            Member ID Reference:{" "}
            <span className="font-mono font-bold text-slate-700">
              {member?.public_id}
            </span>
          </p>
        </div>
      </div>

      {/* 2. LOAN PRODUCT CHANNELS SELECTOR */}
      <div className="space-y-6">
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

        {fetchingProducts ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-stretch">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`product-skeleton-${index}`}
                className="animate-pulse flex flex-col justify-between p-5 rounded-2xl bg-white border border-slate-200 shadow-3xs select-none pointer-events-none"
              >
                <div className="space-y-4">
                  {/* 1. Decorative Icon Head Placeholder */}
                  <div className="size-10 rounded-xl bg-slate-200" />

                  {/* 2. Descriptive Headers Placeholder */}
                  <div className="space-y-2">
                    {/* Product Name Title Line */}
                    <div className="h-4 bg-slate-200 rounded-md w-3/4" />

                    {/* Description Lines */}
                    <div className="space-y-1.5">
                      <div className="h-3 bg-slate-200 rounded-sm w-full" />
                      <div className="h-3 bg-slate-200 rounded-sm w-5/6" />
                    </div>

                    {/* Terms Link Placeholder */}
                    <div className="pt-1">
                      <div className="h-2.5 bg-slate-200 rounded-sm w-1/3 mt-1" />
                    </div>
                  </div>
                </div>

                {/* 3. Technical Product Metrics Placeholder Grid */}
                <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 mt-5">
                  {/* Insurance Rate Segment */}
                  <div className="space-y-1.5">
                    <div className="h-2.5 bg-slate-200 rounded-sm w-1/2" />
                    <div className="h-3.5 bg-slate-200 rounded-md w-2/3" />
                  </div>

                  {/* Max Duration Segment */}
                  <div className="space-y-1.5">
                    <div className="h-2.5 bg-slate-200 rounded-sm w-1/2" />
                    <div className="h-3.5 bg-slate-200 rounded-md w-2/3" />
                  </div>

                  {/* Aggregate Borrowing Limit Block */}
                  <div className="col-span-2 space-y-1.5 border-t border-slate-50 pt-2 mt-1">
                    <div className="h-2.5 bg-slate-200 rounded-sm w-1/3" />
                    <div className="h-4 bg-slate-200 rounded-md w-3/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-stretch">
            {loanProducts?.map((product) => {
              const ProductIcon = Briefcase;
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
                    <div className="size-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-2xs">
                      <ProductIcon size={18} />
                    </div>

                    {/* Descriptions */}
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-900">
                        {product.product_name}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                        {product.description}
                      </p>

                      {/* PREMIUM TERMS & CONDITIONS LINK */}
                      <div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            alert(
                              `Displaying Terms & Conditions for ${product.product_name}`,
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
                        {Number(product?.interest_rate)?.toFixed(1)}%{" "}
                        <span className="text-[9px] text-slate-400 font-normal">
                          ({product?.interest_method})
                        </span>
                      </p>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[9px] uppercase font-bold text-slate-400 flex items-center gap-1">
                        <Calendar size={10} /> Max Duration
                      </span>
                      <p className="text-slate-800 font-bold">
                        {product?.max_period} Months
                      </p>
                    </div>

                    <div className="col-span-2 space-y-0.5 border-t border-slate-50 pt-2 mt-1">
                      <span className="text-[9px] uppercase font-bold text-slate-400">
                        Borrowing Limit
                      </span>
                      <p className="text-slate-900 font-bold font-mono">
                        Up to KES {product?.max_amount?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-auto pt-8 w-full">
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
            <span>Continue With Application</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyProducts;
