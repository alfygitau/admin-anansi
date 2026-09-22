import React, { useState } from "react";
import {
  Wallet,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Plus,
  Layers,
} from "lucide-react";
import { useQuery } from "react-query";
import { useToast } from "../../../contexts/ToastProvider";
import * as Sentry from "@sentry/react";
import { getDepositProducts } from "../../../sdk/products/products";
import { useNavigate } from "react-router-dom";

export const FinancialProducts = ({ onBack, onAddProduct, onViewAccounts }) => {
  const [products, setProducts] = useState([]);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const { isFetching } = useQuery({
    queryKey: ["Deposit products"],
    queryFn: async () => {
      const response = await getDepositProducts("live");
      return response;
    },
    onSuccess: (data) => {
      setProducts(data);
    },
    onError: (error) => {
      Sentry.captureException(
        new Error(error?.response?.data?.message || error.message),
        {
          tags: { component: "Accounts", action: "getDepositProducts" },
        },
      );
      showToast({
        title: "Products processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  return (
    <div className="w-full space-y-6 select-none">
      {/* 1. PAGE HEADER */}
      <div className="flex flex-row sm:flex-col sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 transition-all cursor-pointer shrink-0 shadow-3xs"
            title="Go Back"
          >
            <ArrowLeft size={16} />
          </button>

          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span>Settings</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
              Financial Products
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Manage deposit schemes, contribution frequencies, interest
              structures, and withdrawal terms.
            </p>
          </div>
        </div>

        {/* Action Button & Metrics */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin/financial-products/create")}
            className="flex items-center justify-center gap-2 h-10 px-4 bg-slate-900 hover:bg-[#074073] text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs"
          >
            <Plus size={15} />
            <span>New Financial Product</span>
          </button>
        </div>
      </div>

      {/* 2. FINANCIAL PRODUCTS TABLE */}
      <div className="w-full overflow-x-auto rounded-2xl border border-slate-200/70 bg-white shadow-2xs">
        <table className="w-full text-left border-collapse table-auto">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-200/60 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <th className="py-4.5 px-6">Product Details</th>
              <th className="py-4.5 px-6">Contribution</th>
              <th className="py-4.5 px-6">Interest Scheme</th>
              <th className="py-4.5 px-6">Terms & Structure</th>
              <th className="py-4.5 px-6">Status</th>
              <th className="py-4.5 px-6 text-right pr-8">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs tracking-tight">
            {isFetching ? (
              // Skeleton loader rows while fetching data
              Array.from({ length: 8 }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  {/* Col 1: Product Details Skeleton */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-200 shrink-0" />
                      <div className="flex flex-col space-y-1.5 w-full">
                        <div className="h-3 w-20 bg-slate-200 rounded" />
                        <div className="h-4 w-32 bg-slate-200 rounded" />
                        <div className="h-3 w-24 bg-slate-200 rounded" />
                      </div>
                    </div>
                  </td>

                  {/* Col 2: Contribution Skeleton */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col space-y-1.5">
                      <div className="h-3.5 w-24 bg-slate-200 rounded" />
                      <div className="h-3 w-16 bg-slate-200 rounded" />
                    </div>
                  </td>

                  {/* Col 3: Interest Scheme Skeleton */}
                  <td className="py-4 px-6">
                    <div className="h-3.5 w-20 bg-slate-200 rounded" />
                  </td>

                  {/* Col 4: Terms & Structure Skeleton */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col space-y-1.5">
                      <div className="h-3.5 w-28 bg-slate-200 rounded" />
                      <div className="h-3 w-16 bg-slate-200 rounded" />
                    </div>
                  </td>

                  {/* Col 5: Status Badge Skeleton */}
                  <td className="py-4 px-6">
                    <div className="h-5 w-16 bg-slate-200 rounded-md" />
                  </td>

                  {/* Col 6: Action Trigger Skeleton */}
                  <td className="py-4 px-6 text-right pr-8">
                    <div className="h-8 w-28 bg-slate-200 rounded-xl ml-auto" />
                  </td>
                </tr>
              ))
            ) : products?.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="group transition-colors hover:bg-slate-50/60"
                >
                  {/* Col 1: Product Name, Code & Purpose */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-2xs shrink-0 group-hover:scale-105 transition-transform">
                        <Wallet size={18} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-slate-400">
                          <span>{product.public_code ?? "N/A"}</span>
                          <span>•</span>
                          <span className="capitalize">{product.category}</span>
                        </div>
                        <h4 className="font-extrabold text-slate-900 truncate group-hover:text-primary transition-colors text-sm">
                          {product.name}
                        </h4>
                        <span className="text-[10px] font-medium text-slate-400 block truncate">
                          Purpose:{" "}
                          <span className="capitalize">
                            {product.product_purpose || "General"}
                          </span>
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Col 2: Contribution Value & Frequency */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col space-y-0.5">
                      <span className="font-semibold text-slate-700 truncate">
                        {product.contribution_value ||
                          `${product.minimum_contribution || "0"} / ${
                            product.contribution_frequency || "monthly"
                          }`}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        Min Contribution
                      </span>
                    </div>
                  </td>

                  {/* Col 3: Interest Scheme */}
                  <td className="py-4 px-6">
                    <span className="font-semibold text-slate-700 capitalize text-xs block">
                      {product.interest_crediting_method?.replace(/_/g, " ") ||
                        "No Interest"}
                    </span>
                  </td>

                  {/* Col 4: Financial Rules, Terms & Structure */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col space-y-0.5">
                      <div className="font-semibold text-slate-700 text-xs">
                        {product.is_withdrawable ? "Withdrawable" : "Locked"} •{" "}
                        {product.exit_notice_days || 0}days notice
                      </div>
                      <div className="font-medium text-slate-400 text-[11px] capitalize">
                        {product.account_structure?.replace(/_/g, " ") ||
                          "Standard"}
                      </div>
                    </div>
                  </td>

                  {/* Col 5: Status Badge */}
                  <td className="py-4 px-6">
                    <div
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wider w-fit ${
                        product.status === "live"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                          : "bg-amber-50 text-amber-700 border-amber-200/60"
                      }`}
                    >
                      <CheckCircle2 size={12} />
                      <span>{product.status}</span>
                    </div>
                  </td>

                  {/* Col 6: Action Trigger */}
                  <td className="py-4 px-6 text-right pr-8">
                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/admin/financial-products/${product?.id}/edit`,
                        )
                      }
                      className="h-8 px-3 rounded-xl bg-slate-50 border border-slate-200 inline-flex items-center justify-center gap-1.5 text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-2xs font-bold cursor-pointer"
                    >
                      <span className="text-[11px]">Manage Accounts</span>
                      <ChevronRight size={14} strokeWidth={2.5} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center text-slate-400 font-medium text-xs"
                >
                  No financial products available to display.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
