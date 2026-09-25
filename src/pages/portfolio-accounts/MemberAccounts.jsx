import React, { useState, useMemo } from "react";
import {
  Search,
  Landmark,
  Wallet,
  PieChart,
  Coins,
  Calendar,
  ChevronDown,
  Eye,
  Filter,
  Download,
  SlidersHorizontal,
  X,
  Building2,
  Map,
  Hash,
  ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../../contexts/ToastProvider";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDepositProduct,
  getMembersAccounts,
} from "../../sdk/products/products";
import * as Sentry from "@sentry/react";
import Pagination from "../../components/pagination/Pagination";

const FilterField = ({ label, icon: Icon, children }) => (
  <div className="space-y-2 flex-1 min-w-0">
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none z-10">
        <Icon
          size={18}
          className="text-slate-300 group-focus-within:text-[#074073] transition-colors"
        />
        <div className="w-[1.5px] h-5 bg-slate-200 ml-4 group-focus-within:bg-[#074073]/20 transition-colors" />
      </div>
      {children}
    </div>
  </div>
);

export default function MemberAccounts() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const { showToast } = useToast();
  const { id } = useParams();
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    q: "",
    status: "",
    page: "",
    limit: "",
  });
  const [accounts, setAccounts] = useState([]);
  const [product, setProduct] = useState({});
  const handleResetFilters = () => {
    setFilters({
      q: "",
      status: "",
      page: "",
      limit: "",
    });
    setStatusDropdownOpen(false);
  };

  const statusOptions = [
    { value: "", label: "All Statuses" },
    { value: "Active", label: "Active" },
    { value: "Arrears", label: "Arears" },
  ];

  const getProductPillColor = (type) => {
    switch (type) {
      case "shares":
        return "bg-blue-50 text-blue-700 border-blue-200/50";
      case "savings":
        return "bg-orange-50 text-orange-700 border-orange-200/50";
      default:
        return "bg-blue-50 text-blue-700 border-blue-200/50";
    }
  };

  const { isFetching } = useQuery({
    queryKey: [
      "account reporting",
      id,
      filters?.status,
      filters?.limit,
      filters?.page,
      filters?.q,
    ],
    queryFn: async () => {
      const response = await getMembersAccounts(
        id,
        filters?.status,
        filters?.limit,
        filters?.page,
        filters?.q,
      );
      return response?.data?.data;
    },
    onSuccess: (data) => {
      setAccounts(data?.data);
      setFilters((prev) => ({
        ...prev,
        page: data?.meta?.page,
        limit: data?.meta?.limit,
      }));
      setTotalItems(data.meta?.total);
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

  const { isFetching: loading } = useQuery({
    queryKey: ["Deposit product", id],
    queryFn: async () => {
      const response = await getDepositProduct(id);
      return response;
    },
    onSuccess: (data) => {
      setProduct(data?.data);
    },
    onError: (error) => {
      Sentry.captureException(
        new Error(error?.response?.data?.message || error.message),
        {
          tags: { component: "Accounts", action: "getDepositProducts" },
        },
      );
      showToast({
        title: "Product processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const handlePageChange = (page) => {
    setFilters((prev) => ({
      ...prev,
      page: page,
    }));
  };

  const handleOnItemsPageChange = (limit) => {
    setFilters((prev) => ({
      ...prev,
      limit: limit,
    }));
  };

  return (
    <>
      <div className="w-full min-h-screen antialiased text-slate-800 space-y-6">
        {/* HEADER ACTION DECK */}

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200/60 pb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 transition-all cursor-pointer"
            >
              <ArrowLeft size={16} />
            </button>
            <div>
              <h2 className="text-2xl font-black text-primary tracking-tight flex items-center gap-2.5">
                {product?.name}
              </h2>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Real-time management system for user {product?.name}{" "}
                allocations.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 select-none">
          <StatTile
            icon={<Wallet className="text-blue-600" />}
            label="Aggregated Balance"
            value={`KES 20,000`}
            desc="Total portfolio tracking liquidity pool"
          />
          <StatTile
            icon={<PieChart className="text-emerald-600" />}
            label="Free Unencumbered Capital"
            value={`KES 10,000`}
            desc="Available cross-credit loan backing values"
          />
          <StatTile
            icon={<Coins className="text-orange-600" />}
            label="Active Collateral Liens"
            value={`KES 16,000`}
            desc="Locked guarantees on active member loans"
          />
        </div>

        {/* UTILITIES & SEGMENT CONTROL BLOCK */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs p-4 space-y-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Main inline live search bar context lookup anchor */}
            <div className="relative w-full lg:w-96">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={filters.q}
                onChange={(e) => setFilters({ ...filters, q: e.target.value })}
                placeholder="Search member name, account line, code..."
                className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none transition-all focus:bg-white focus:border-[#074073] placeholder:text-slate-400"
              />
            </div>

            {/* Controls cluster right block deck */}
            <div className="flex items-center gap-3 overflow-x-auto shrink-0 pb-1 lg:pb-0">
              <button className="flex items-center gap-2 h-11 px-4 border border-slate-200 bg-white text-slate-600 rounded-xl text-xs font-bold shadow-3xs hover:bg-slate-50 transition-colors cursor-pointer">
                <Download size={14} /> Export
              </button>
              <button
                onClick={() => setIsFilterOpen(true)}
                className={`flex items-center gap-2 h-11 px-4 border rounded-xl text-xs font-bold transition-all cursor-pointer shadow-3xs ${
                  Object.values(filters).some((v) => v !== "")
                    ? "border-[#074073] bg-[#074073] text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                <SlidersHorizontal size={14} />
                <span>Advanced Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* DETAILED PREMIUM ACCOUNT LEDGER GRID MATRIX */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs overflow-hidden">
          <div className="overflow-x-auto">
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse table-auto">
                  <thead>
                    <tr className="bg-slate-50/70 border-b border-slate-200/60 text-[10px] font-bold text-slate-400 uppercase tracking-widest select-none">
                      <th className="py-4.5 px-6">Member Details</th>
                      <th className="py-4.5 px-6">Account Info</th>
                      <th className="py-4.5 px-6 text-right">Total Balance</th>
                      <th className="py-4.5 px-6 text-right">
                        Available Balance
                      </th>
                      <th className="py-4.5 px-6">Product Breakdown</th>
                      <th className="py-4.5 px-6">Status</th>
                      <th className="py-4.5 px-6 text-right pr-8">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs tracking-tight">
                    {isFetching ? (
                      // Render 5 Skeleton Rows when fetching
                      Array.from({ length: 8 }).map((_, index) => (
                        <tr key={index} className="animate-pulse">
                          {/* Col 1: Member Details Skeleton */}
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="size-9 rounded-xl bg-slate-200 shrink-0" />
                              <div className="flex flex-col space-y-1.5 w-full">
                                <div className="h-3 w-16 bg-slate-200 rounded" />
                                <div className="h-3.5 w-28 bg-slate-200 rounded" />
                                <div className="h-3 w-20 bg-slate-200 rounded" />
                              </div>
                            </div>
                          </td>

                          {/* Col 2: Account Info Skeleton */}
                          <td className="py-4 px-6">
                            <div className="flex flex-col space-y-1.5">
                              <div className="h-3.5 w-24 bg-slate-200 rounded" />
                              <div className="h-3 w-16 bg-slate-200 rounded" />
                            </div>
                          </td>

                          {/* Col 3: Total Balance Skeleton */}
                          <td className="py-4 px-6 text-right">
                            <div className="h-4 w-20 bg-slate-200 rounded ml-auto" />
                          </td>

                          {/* Col 4: Available Balance Skeleton */}
                          <td className="py-4 px-6 text-right">
                            <div className="h-4 w-20 bg-slate-200 rounded ml-auto" />
                          </td>

                          {/* Col 5: Product Breakdown Skeleton */}
                          <td className="py-4 px-6">
                            <div className="flex flex-col space-y-1.5">
                              <div className="h-3 w-28 bg-slate-200 rounded" />
                              <div className="h-3 w-20 bg-slate-200 rounded" />
                            </div>
                          </td>

                          {/* Col 6: Status Skeleton */}
                          <td className="py-4 px-6">
                            <div className="flex flex-col space-y-1.5">
                              <div className="h-4 w-14 bg-slate-200 rounded-md" />
                              <div className="h-3 w-20 bg-slate-200 rounded" />
                            </div>
                          </td>

                          {/* Col 7: Action Skeleton */}
                          <td className="py-4 px-6 text-right pr-8">
                            <div className="size-8 rounded-xl bg-slate-200 ml-auto" />
                          </td>
                        </tr>
                      ))
                    ) : accounts?.length > 0 ? (
                      accounts.map((acc) => {
                        // Construct full customer name from nested customer object
                        const customerName = [
                          acc.customer?.firstname,
                          acc.customer?.middlename,
                          acc.customer?.lastname,
                        ]
                          .filter(Boolean)
                          .join(" ");

                        // Dynamically calculate two-letter initials
                        const initials = customerName
                          ? customerName
                              .split(" ")
                              .filter(Boolean)
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()
                              .slice(0, 2)
                          : "M";

                        // Parse numerical values safely
                        const numericBalance = parseFloat(acc.balance || "0");
                        const availableBalance = Math.max(
                          0,
                          numericBalance - (acc.outstandingPenalties || 0),
                        );

                        return (
                          <tr
                            key={acc.id}
                            className="group transition-colors hover:bg-slate-50/40"
                          >
                            {/* Col 1: Member Personal Details & Public Badges */}
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <div className="size-9 rounded-xl bg-slate-100 border border-slate-200/60 flex items-center justify-center font-bold text-slate-700 text-xs shadow-3xs shrink-0 select-none">
                                  {initials}
                                </div>
                                <div className="flex flex-col space-y-0.5">
                                  <span className="font-mono w-fit text-[9px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded">
                                    {acc.customer?.public_id || "N/A"}
                                  </span>
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-bold text-primary text-sm tracking-tight">
                                      {customerName || "Unknown Member"}
                                    </span>
                                  </div>
                                  <span className="text-[11px] text-slate-400 font-medium">
                                    <span className="font-mono text-slate-600 font-semibold">
                                      {acc.id.slice(0, 8)}...
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* Col 2: Structured Account Info & Type Badges */}
                            <td className="py-4 px-6">
                              <div className="flex flex-col space-y-1">
                                <span className="font-mono font-bold text-primary tracking-tight text-xs">
                                  {acc.account_number
                                    ? acc.account_number.replace(
                                        /(\d{4})(\d{5})(\d{4})/,
                                        "$1-$2-$3",
                                      )
                                    : "—"}
                                </span>
                                <span
                                  className={`text-[8px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded border self-start ${
                                    typeof getProductPillColor === "function"
                                      ? getProductPillColor(acc.product?.name)
                                      : "bg-slate-100 border-slate-200 text-slate-600"
                                  }`}
                                >
                                  {acc.product?.name || "Standard Account"}
                                </span>
                              </div>
                            </td>

                            {/* Col 3: Book Balances */}
                            <td className="py-4 px-6 text-right font-black text-primary text-sm">
                              KES{" "}
                              {numericBalance.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </td>

                            {/* Col 4: Withdrawable Liquid Assets */}
                            <td className="py-4 px-6 text-right font-bold text-emerald-600 text-sm">
                              KES{" "}
                              {availableBalance.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </td>

                            {/* Col 5: Custom Rules & Performance Indicators */}
                            <td className="py-4 px-6 text-slate-500 font-medium text-[11px]">
                              <div className="flex flex-col gap-0.5">
                                <span>
                                  Compliance:{" "}
                                  <span
                                    className={`font-bold capitalize ${
                                      acc.complianceStatus === "compliant"
                                        ? "text-emerald-600"
                                        : "text-amber-600"
                                    }`}
                                  >
                                    {acc.complianceStatus || "N/A"}
                                  </span>
                                </span>
                                <span className="text-[10px] text-slate-400">
                                  Saved This Month: KES{" "}
                                  {Number(
                                    acc.totalSavedThisMonth || 0,
                                  ).toLocaleString()}
                                </span>
                                {acc.outstandingPenalties > 0 && (
                                  <span className="text-[10px] text-red-500 font-semibold">
                                    Penalties: KES{" "}
                                    {Number(
                                      acc.outstandingPenalties,
                                    ).toLocaleString()}
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* Col 6: Multi-Row Status Badge Parameters */}
                            <td className="py-4 px-6">
                              <div className="flex flex-col space-y-1.5">
                                <span
                                  className={`inline-flex items-center gap-1.5 text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md border w-fit ${
                                    acc.status !== "active"
                                      ? "bg-red-50 border-red-100 text-red-600"
                                      : "bg-emerald-50 border-emerald-100 text-emerald-600"
                                  }`}
                                >
                                  <span
                                    className={`size-1 rounded-full ${
                                      acc.status !== "active"
                                        ? "bg-red-500"
                                        : "bg-emerald-500"
                                    }`}
                                  />
                                  {acc.status}
                                </span>
                                <span className="text-[10px] text-slate-400 font-medium">
                                  Created:{" "}
                                  <span className="text-slate-600 font-semibold">
                                    {acc.createdAt
                                      ? new Date(
                                          acc.createdAt,
                                        ).toLocaleDateString()
                                      : "N/A"}
                                  </span>
                                </span>
                              </div>
                            </td>

                            {/* Col 7: Profile Inspection Node Trigger */}
                            <td className="py-4 px-6 text-right pr-8">
                              <button
                                onClick={() =>
                                  navigate(
                                    `/admin/accounts/${acc?.customer?.public_id}/${acc?.product?.id}`,
                                  )
                                }
                                className="size-8 rounded-xl border border-slate-200/60 inline-flex items-center justify-center text-slate-400 hover:text-[#074073] hover:bg-slate-50 hover:border-slate-300 transition-all shadow-3xs bg-white cursor-pointer"
                                title="Inspect Account Ledger"
                              >
                                <Eye size={14} />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan={7}
                          className="py-40 text-center text-slate-400 font-medium text-xs"
                        >
                          No active member accounts match your current filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <Pagination
                currentPage={filters?.page}
                totalItems={totalItems}
                itemsPerPage={filters?.limit}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleOnItemsPageChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. SIGNATURE INTERACTIVE SLIDEOUT ADVANCED FILTER PANEL */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex justify-end bg-zinc-950/20"
          >
            <div
              className="absolute inset-0"
              onClick={() => setIsFilterOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white relative w-full max-w-[480px] h-full shadow-2xl border-l border-slate-200 flex flex-col z-10"
            >
              {/* Drawer Top Header Layout */}
              <div className="px-8 pt-8 pb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#074073]">
                    Registry Filters
                  </h2>
                  <p className="text-sm text-slate-500 font-medium">
                    Define parameters to query member records.
                  </p>
                </div>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-2.5 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors text-slate-500 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="border-b mx-8 border-slate-100"></div>

              {/* Form Entry Area Container fields */}
              <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8">
                {/* Dropdown status selection panel row */}
                <FilterField label="Member Account Status" icon={Hash}>
                  <div className="relative w-full">
                    <button
                      type="button"
                      onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                      className="w-full pl-[74px] pr-5 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all text-xs font-semibold text-left flex items-center justify-between cursor-pointer"
                    >
                      <span
                        className={
                          filters.status
                            ? "text-slate-800 font-bold"
                            : "text-slate-400 font-medium"
                        }
                      >
                        {statusOptions.find(
                          (opt) => opt.value === filters.status,
                        )?.label || "Select status profile..."}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`text-slate-400 transition-transform duration-200 ${statusDropdownOpen ? "rotate-180 text-[#074073]" : ""}`}
                      />
                    </button>

                    <AnimatePresence>
                      {statusDropdownOpen && (
                        <>
                          <div
                            className="fixed inset-0 z-30"
                            onClick={() => setStatusDropdownOpen(false)}
                          />
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            className="absolute left-0 right-0 mt-2 bg-white border border-slate-200/80 rounded-2xl shadow-xl py-2 z-40 overflow-hidden"
                          >
                            {statusOptions.map((opt) => (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                  setFilters({ ...filters, status: opt.value });
                                  setStatusDropdownOpen(false);
                                }}
                                className={`w-full px-6 py-3.5 text-xs text-left font-semibold transition-colors cursor-pointer ${
                                  filters.status === opt.value
                                    ? "bg-blue-50/70 text-[#074073] font-bold"
                                    : "text-slate-600 hover:bg-slate-50"
                                }`}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </FilterField>

                {/* Regional Jurisdiction Constraints layout segment */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Search
                  </p>

                  <FilterField label="County Jurisdiction" icon={Search}>
                    <input
                      className="w-full pl-[74px] pr-6 py-5 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-[#074073] transition-all text-xs font-semibold"
                      placeholder="e.g. Lane Kamau"
                      value={filters.q}
                      onChange={(e) =>
                        setFilters({ ...filters, q: e.target.value })
                      }
                    />
                  </FilterField>
                </div>
              </div>

              {/* Action Buttons Footer panel pinned baseline layout */}
              <div className="p-8 py-5 border-t border-slate-100 flex gap-3 bg-white">
                <button
                  onClick={handleResetFilters}
                  className="flex-1 h-14 font-bold text-xs bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-all cursor-pointer"
                >
                  Reset All
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="flex-[2] h-14 font-bold text-xs bg-[#074073] text-white rounded-2xl hover:bg-[#052d52] transition-all shadow-lg shadow-blue-900/10 cursor-pointer"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. INDIVIDUAL ACCOUNT VIEW BREAKOUT INTERFACE */}
      <AnimatePresence>
        {selectedAccount && (
          <div className="fixed inset-0 z-[110] flex justify-end">
            <div
              className="absolute inset-0 bg-primary/10 "
              onClick={() => setSelectedAccount(null)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26 }}
              className="bg-white w-full max-w-md h-full relative z-10 p-8 shadow-2xl flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-black tracking-widest text-[#074073] uppercase bg-blue-50 border border-blue-100 px-2 py-0.5 rounded">
                      Audit Profile Ledger
                    </span>
                    <h3 className="text-xl font-black text-primary tracking-tight pt-2">
                      {selectedAccount.account_identity.customer_name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedAccount(null)}
                    className="size-9 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full flex items-center justify-center cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="border-b border-slate-100" />

                {/* Financial balances lists blocks */}
                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Cleared Balance Matrix
                  </p>
                  <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-2xl space-y-3 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-sans font-semibold">
                        Total Book Balance
                      </span>
                      <span className="font-bold text-primary">
                        KES{" "}
                        {selectedAccount.core_financial_ledger.current_balance.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-sans font-semibold">
                        Available Liquidity Pool
                      </span>
                      <span className="font-bold text-emerald-600">
                        KES{" "}
                        {selectedAccount.core_financial_ledger.free_unencumbered_balance.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-sans font-semibold">
                        Collateral Guarantee Lien
                      </span>
                      <span className="font-bold text-rose-600">
                        KES{" "}
                        {selectedAccount.core_financial_ledger.encumbered_amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Regional traceability details metadata block wrapper layout */}
                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Jurisdiction Tracking
                  </p>
                  <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-2xl space-y-2 font-sans text-xs font-semibold text-slate-600">
                    <div className="flex justify-between">
                      <span>County Location</span>
                      <span className="text-primary">
                        {selectedAccount.account_identity.county}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sub-County Node</span>
                      <span className="text-primary">
                        {selectedAccount.account_identity.subcounty}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedAccount(null)}
                className="w-full h-14 bg-primary text-white font-bold rounded-xl text-xs uppercase tracking-wider cursor-pointer"
              >
                Close Audit Profile
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

// INTERNAL REUSABLE STATS INFRASTRUCTURE COMPONENT
const StatTile = ({ icon, label, value, desc }) => (
  <div className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs p-5 flex items-start gap-4">
    <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl shrink-0">
      {icon}
    </div>
    <div className="space-y-0.5 min-w-0">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">
        {label}
      </p>
      <p className="text-xl font-black text-primary tracking-tight">{value}</p>
      <p className="text-[11px] text-slate-400 font-medium truncate">{desc}</p>
    </div>
  </div>
);
