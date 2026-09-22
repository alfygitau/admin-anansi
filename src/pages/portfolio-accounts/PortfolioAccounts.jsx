import React, { useState } from "react";
import {
  Wallet,
  ArrowRight,
  Layers,
  ChevronRight,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { useQuery } from "react-query";
import { useToast } from "../../contexts/ToastProvider";
import { getDepositProducts } from "../../sdk/products/products";
import * as Sentry from "@sentry/react";
import { useFormatAmount } from "../../hooks/useFormatAmount";
import { useNavigate } from "react-router-dom";

export default function AccountsPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { showToast } = useToast();
  const formatAmount = useFormatAmount();
  const [accounts, setAccounts] = useState([]);

  const { isFetching } = useQuery({
    queryKey: ["Deposit products"],
    queryFn: async () => {
      const response = await getDepositProducts("live");
      return response;
    },
    onSuccess: (data) => {
      setAccounts(data);
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
    <div className="w-full bg-slate-50/50 antialiased text-slate-800">
      {/* 1. MANAGEMENT NAV BREADCRUMB HEADER */}
      <div className="mb-8 border-b border-slate-200/60 pb-6 select-none">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
          <button className="hover:text-primary transition-colors cursor-pointer">
            Product Catalog
          </button>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-1">
          <div>
            <h2 className="text-2xl font-black text-primary tracking-tight">
              SACCO Financial Products
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Manage statutory share distributions, collateral deposit accounts,
              and locked term contracts.
            </p>
          </div>
        </div>
      </div>

      {/* 2. MODERN LIST VIEW CONTAINER */}
      <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
        {isFetching ? (
          // Render 3-4 skeleton rows while loading
          Array.from({ length: 6 }).map((_, index) => (
            <DepositProductRowSkeleton key={`product-skeleton-${index}`} />
          ))
        ) : accounts?.length > 0 ? (
          accounts.map((prod) => (
            <DepositProductRow
              key={prod.id}
              product={prod}
              onTap={() => {
                setSelectedProduct(prod);
                console.log("Clicked product:", prod.name);
              }}
            />
          ))
        ) : (
          <div className="p-8 text-center text-slate-400 text-xs">
            No products found
          </div>
        )}
      </div>
    </div>
  );
}

const DepositProductRow = ({ product, onTap }) => {
  const navigate = useNavigate();
  return (
    <div onClick={onTap} className="group cursor-pointer select-none text-left">
      <div className="bg-white hover:bg-slate-50/80 p-4 rounded-2xl border border-slate-200/70 hover:border-primary/20 transition-all grid grid-cols-1 md:grid-cols-12 items-center gap-4 text-xs shadow-2xs">
        {/* Col 1: Product Name, Code & Purpose (Span 3) */}
        <div className="md:col-span-3 min-w-0 flex items-center gap-3 text-left">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-2xs shrink-0 group-hover:scale-105 transition-transform">
            <Wallet size={18} />
          </div>
          <div className="min-w-0 text-left">
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

        {/* Col 2: Contribution & Interest Method (Span 3) */}
        <div className="md:col-span-3 flex flex-col justify-center min-w-0 text-left space-y-1">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Contribution
            </span>
            <p className="font-semibold text-slate-700 truncate block">
              {product.contribution_value ||
                `${product.minimum_contribution || "0"} / ${product.contribution_frequency || "monthly"}`}
            </p>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Interest Scheme
            </span>
            <p className="font-semibold text-slate-700 truncate capitalize text-[11px]">
              {product.interest_crediting_method?.replace(/_/g, " ") ||
                "No Interest"}
            </p>
          </div>
        </div>

        {/* Col 3: Financial Rules, Terms & Sub-Accounts (Span 2) */}
        <div className="md:col-span-2 flex flex-col justify-center text-left space-y-1">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Terms & Exit
            </span>
            <div className="font-semibold text-slate-700 text-xs truncate">
              {product.is_withdrawable ? "Withdrawable" : "Locked"} •{" "}
              {product.exit_notice_days || 0}d notice
            </div>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Structure
            </span>
            <div className="font-semibold text-slate-700 text-[11px] truncate capitalize">
              {product.account_structure?.replace(/_/g, " ") || "Standard"}
            </div>
          </div>
        </div>

        {/* Col 4: Status & Action Arrow (Span 4) */}
        <div className="md:col-span-4 flex items-center justify-between md:justify-end gap-3 text-left">
          <div
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wider ${
              product.status === "live"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                : "bg-amber-50 text-amber-700 border-amber-200/60"
            }`}
          >
            <CheckCircle2 size={12} />
            <span>{product.status}</span>
          </div>

          <button
            onClick={() => navigate(`/admin/accounts/${product?.id}`)}
            className="h-8 px-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center gap-1.5 text-slate-600 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all shadow-2xs shrink-0 font-bold"
          >
            <span className="text-[11px]">View Member Accounts</span>
            <ChevronRight size={14} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

const DepositProductRowSkeleton = () => {
  return (
    <div className="animate-pulse bg-white p-4 rounded-2xl border border-slate-200/60 w-full grid grid-cols-1 md:grid-cols-12 items-center gap-4 text-left">
      {/* Col 1 Skeleton: Icon, Title & Purpose */}
      <div className="md:col-span-3 flex items-center gap-3 text-left">
        <div className="w-10 h-10 rounded-xl bg-slate-200 shrink-0" />
        <div className="space-y-1.5 w-full text-left">
          <div className="h-2.5 bg-slate-200 rounded w-20" />
          <div className="h-3.5 bg-slate-200 rounded w-32" />
          <div className="h-2 bg-slate-200 rounded w-24" />
        </div>
      </div>

      {/* Col 2 Skeleton: Contribution & Interest Scheme */}
      <div className="md:col-span-3 flex flex-col justify-center space-y-2 text-left">
        <div className="space-y-1">
          <div className="h-2 bg-slate-200 rounded w-16" />
          <div className="h-3 bg-slate-200 rounded w-28" />
        </div>
        <div className="space-y-1">
          <div className="h-2 bg-slate-200 rounded w-20" />
          <div className="h-3 bg-slate-200 rounded w-24" />
        </div>
      </div>

      {/* Col 3 Skeleton: Terms, Exit & Structure */}
      <div className="md:col-span-2 flex flex-col justify-center space-y-2 text-left">
        <div className="space-y-1">
          <div className="h-2 bg-slate-200 rounded w-16" />
          <div className="h-3 bg-slate-200 rounded w-24" />
        </div>
        <div className="space-y-1">
          <div className="h-2 bg-slate-200 rounded w-14" />
          <div className="h-3 bg-slate-200 rounded w-20" />
        </div>
      </div>

      {/* Col 4 Skeleton: Status Badge & Manage Button */}
      <div className="md:col-span-4 flex items-center justify-between md:justify-end gap-3">
        <div className="h-5 bg-slate-200 rounded w-16" />
        <div className="h-8 bg-slate-200 rounded-xl w-20" />
      </div>
    </div>
  );
};
