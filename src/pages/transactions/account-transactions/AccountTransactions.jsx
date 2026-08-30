import React, { useState, useRef, useEffect } from "react";
import {
  Eye,
  Download,
  ArrowDownLeft,
  ArrowUpRight,
  Calendar,
  Search,
  X,
  FileText,
  CreditCard,
  Building2,
  Wallet,
  Activity,
  History,
  Filter,
  Receipt,
  Fingerprint,
  User,
  DollarSign,
  Coins,
  PieChart,
} from "lucide-react";
import { useQuery } from "react-query";
import { useToast } from "../../../contexts/ToastProvider";
import { getAllTransactions } from "../../../sdk/transactions/transactions";
import TransactionsFilter from "../../../components/filters/TransactionsFilter";
import Pagination from "../../../components/pagination/Pagination";
import { useFormatAmount } from "../../../hooks/useFormatAmount";

export default function AccountTransactions() {
  const [selectedTxContext, setSelectedTxContext] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const actionMenuRef = useRef(null);
  const formatAmount = useFormatAmount();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    q: "",
    status: [],
    fromDate: "",
    toDate: "",
    leastAmount: "",
    mostAmount: "",
    type: [],
  });
  const { showToast } = useToast();
  const [totalItems, setTotalItems] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        actionMenuRef.current &&
        !actionMenuRef.current.contains(event.target)
      ) {
        setActiveMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { isFetching } = useQuery({
    queryKey: [
      "get transactions",
      filters?.page,
      filters?.limit,
      filters?.q,
      filters?.status,
      filters?.type,
      filters?.leastAmount,
      filters?.mostAmount,
      filters?.fromDate,
      filters?.toDate,
    ],
    queryFn: async () => {
      const response = await getAllTransactions(
        filters?.page,
        filters?.limit,
        filters?.q,
        filters?.status?.join(","),
        filters?.type?.join(","),
        filters?.leastAmount,
        filters?.mostAmount,
        filters?.fromDate,
        filters?.toDate,
      );
      return response?.data?.data;
    },
    onSuccess: (data) => {
      setTransactions(data?.items);
      setFilters((prev) => ({
        ...prev,
        page: data.meta.currentPage,
        limit: data.meta.itemsPerPage,
      }));
      setTotalItems(data.meta.totalItems);
    },
    onError: (error) => {
      showToast({
        title: "Transactions processing failed",
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
      <TransactionsFilter
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        setFilters={setFilters}
      />
      <div className="w-full space-y-5 antialiased text-slate-800">
        {/* HEADER SECTION */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/60 pb-3 select-none">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-primary">
              Account Transactions
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Real-time entry monitoring, liquidity reconciliations, and instant
              cryptographic asset audit tracking.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 select-none">
          {/* CARD 1: MEMBER CONTRIBUTIONS (SHARE CAPITAL & NON-WITHDRAWABLE DEPOSITS) */}
          {/* BOSA MEMBER EQUITY STAKE */}
          <div className="bg-white border border-slate-200/60 shadow-3xs rounded-2xl p-5 flex items-center gap-4">
            <div className="size-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shadow-3xs shrink-0">
              <PieChart size={18} strokeWidth={2.5} />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block truncate">
                Share Capital
              </span>
              <span className="text-base font-mono font-black text-purple-900 block truncate mt-0.5">
                KES 440,500.00
              </span>
              <span className="text-[11px] text-slate-400 font-medium block truncate mt-0.5">
                Core institutional equity and member ownership stakes
              </span>
            </div>
          </div>

          {/* BOSA MEMBER SAVINGS POOL */}
          <div className="bg-white border border-slate-200/60 shadow-3xs rounded-2xl p-5 flex items-center gap-4">
            <div className="size-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-3xs shrink-0">
              <Coins size={18} strokeWidth={2.5} />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block truncate">
                Non-Withdrawable Savings
              </span>
              <span className="text-base font-mono font-black text-[#074073] block truncate mt-0.5">
                KES 800,000.00
              </span>
              <span className="text-[11px] text-slate-400 font-medium block truncate mt-0.5">
                Regular monthly savings backing loan multipliers
              </span>
            </div>
          </div>
        </div>

        {/* FILTER SEARCH MODULE */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-2xs p-4 flex justify-between items-center">
          <div className="relative w-full md:w-80">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={filters?.q}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  q: e.target.value,
                }))
              }
              placeholder="Search by ID, reference or name..."
              className="w-full h-10 pl-9 pr-4 bg-slate-50 border border-slate-200/60 rounded-xl text-xs font-medium outline-none transition-all focus:bg-white focus:border-primary placeholder:text-slate-400 font-sans"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-1.5 h-10 px-4 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all"
            >
              <Filter size={13} /> Filter
            </button>
            <button className="flex items-center gap-1.5 h-10 px-4 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all">
              <Download size={13} /> Export
            </button>
          </div>
        </div>

        {/* HIGH-DENSITY LEDGER SYSTEM */}
        <div className="w-full bg-white rounded-3xl border border-slate-200/60 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse table-auto">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200/60 text-[10px] font-bold text-slate-400 uppercase tracking-widest select-none">
                  <th className="py-4.5 px-6">Transaction Account & Debtor</th>
                  <th className="py-4.5 px-6">Product Framework</th>
                  <th className="py-4.5 px-6">Principal & Balances</th>
                  <th className="py-4.5 px-6">Charges & Net Value</th>
                  <th className="py-4.5 px-6">Lifecycle Status</th>
                  <th className="py-4.5 px-6 text-right pr-8">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-xs tracking-tight">
                {isFetching ? (
                  [...Array(10)].map((_, i) => (
                    <tr
                      key={`skeleton-${i}`}
                      className="animate-pulse border-b border-slate-100"
                    >
                      {/* Col 1: Account Reference */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col space-y-2">
                          <div className="h-3 w-20 bg-slate-200 rounded" />
                          <div className="h-4 w-32 bg-slate-200 rounded" />
                        </div>
                      </td>

                      {/* Col 2: Product Framework */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col space-y-2">
                          <div className="h-4 w-24 bg-slate-200 rounded" />
                          <div className="h-3 w-28 bg-slate-200 rounded" />
                        </div>
                      </td>

                      {/* Col 3: Principal & Balances */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col space-y-2">
                          <div className="h-3 w-20 bg-slate-200 rounded" />
                          <div className="h-3 w-24 bg-slate-200 rounded" />
                        </div>
                      </td>

                      {/* Col 4: Charges & Net */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col space-y-2">
                          <div className="h-3 w-16 bg-slate-200 rounded" />
                          <div className="h-3 w-20 bg-slate-200 rounded" />
                        </div>
                      </td>

                      {/* Col 5: Lifecycle Status */}
                      <td className="py-4 px-6">
                        <div className="h-5 w-20 bg-slate-200 rounded-md" />
                      </td>

                      {/* Col 6: Actions Toolbar */}
                      <td className="py-4 px-6 text-right pr-8">
                        <div className="flex items-center justify-end gap-1.5">
                          <div className="size-8 rounded-xl bg-slate-200" />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : transactions?.length > 0 ? (
                  transactions?.map((tx) => (
                    <tr
                      key={tx.id}
                      className="group transition-colors hover:bg-slate-50/60"
                    >
                      {/* Col 1: Account Reference & Client Details */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="font-sans font-bold text-[9px] tracking-wider uppercase px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                              {tx.public_id}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
                              Channel: {tx.platform.replace("_", " ")}
                            </span>
                          </div>
                          <span className="font-semibold text-primary text-sm tracking-tight group-hover:text-primary transition-colors flex items-center gap-1.5">
                            {tx.category === "credit" ? (
                              <ArrowDownLeft
                                size={14}
                                className="text-success shrink-0"
                              />
                            ) : (
                              <ArrowUpRight
                                size={14}
                                className="text-slate-400 shrink-0"
                              />
                            )}
                            {tx.sender_name}
                          </span>
                        </div>
                      </td>

                      {/* Col 2: Product Parameter Mapping */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col space-y-1.5">
                          <span className="font-semibold text-slate-800 text-sm tracking-tight">
                            {tx.type}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="font-sans font-bold text-[9px] tracking-wider uppercase px-1.5 py-0.5 bg-slate-50 text-slate-500 rounded border border-slate-200/40 flex items-center gap-0.5">
                              {tx.deposit_method}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">
                              Ref: {tx.ref_number.substring(0, 8)}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Col 3: Financial Exposure Matrix */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col space-y-1">
                          <div className="text-[11px] text-slate-500 font-medium">
                            <span
                              className={`font-bold text-sm ${tx.category === "credit" ? "text-success" : "text-primary"}`}
                            >
                              KES {tx.category === "credit" ? "+" : "-"}
                              {Number(tx.amount).toLocaleString()}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 font-medium">
                            Running Bal:{" "}
                            <span className="font-bold text-slate-700">
                              {formatAmount(tx.running_balance)}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex flex-col space-y-1">
                          <div className="text-[11px] text-slate-500 font-medium">
                            Fee:{" "}
                            <span className="font-semibold text-slate-700">
                              KES{" "}
                              {Number(
                                tx.transaction_charge || 0,
                              ).toLocaleString()}
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
                            Net: KES{" "}
                            {Number(
                              Number(tx.amount) -
                                Number(tx.transaction_charge || 0),
                            ).toLocaleString()}
                          </div>
                        </div>
                      </td>

                      {/* Col 5: Amortization Lifespan Stage */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col space-y-1">
                          <span
                            className={`inline-flex items-center gap-1.5 text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md border w-fit ${
                              tx.status === "completed"
                                ? "bg-success/5 border-success/10 text-success"
                                : "bg-warning/5 border-warning/10 text-warning"
                            }`}
                          >
                            <span
                              className={`size-1 rounded-full ${tx.status === "completed" ? "bg-success" : "bg-warning"}`}
                            />
                            {tx.status}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium pt-0.5 flex items-center gap-1">
                            <Calendar size={11} />
                            {new Date(tx.createdAt).toLocaleDateString(
                              "en-KE",
                              {
                                dateStyle: "medium",
                              },
                            )}
                          </span>
                        </div>
                      </td>

                      {/* Col 6: Actions Toolbar */}
                      <td className="py-4 px-6 text-right pr-8">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedTxContext(tx)}
                            className="size-8 rounded-xl border border-slate-200/60 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-slate-50 hover:border-slate-300 transition-all shadow-3xs bg-white cursor-pointer"
                            title="Inspect Transaction Details"
                          >
                            <Eye size={14} />
                          </button>
                          {tx.document_url && tx.document_url !== "..." && (
                            <a
                              href={tx.document_url}
                              target="_blank"
                              rel="noreferrer"
                              className="size-8 rounded-xl border border-slate-200/60 flex items-center justify-center text-slate-500 hover:text-primary hover:bg-slate-50 hover:border-slate-300 transition-all shadow-3xs bg-white cursor-pointer"
                              title="Download Ingestion Document Receipt"
                            >
                              <Download size={14} />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-36 px-6 text-center select-none"
                    >
                      <div className="flex flex-col items-center justify-center max-w-sm mx-auto space-y-4">
                        <div className="w-14 h-14 bg-slate-50 border border-slate-200/60 rounded-2xl flex items-center justify-center text-slate-400 shadow-3xs">
                          <Search
                            size={22}
                            strokeWidth={1.75}
                            className="text-slate-300"
                          />
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-sm font-bold text-primary tracking-tight">
                            No transactions found
                          </h3>
                          <p className="text-xs text-slate-400 font-medium leading-relaxed">
                            We couldn't find any transaction history or
                            financial records matching your current search terms
                            or advanced drawer filter parameters.
                          </p>
                        </div>
                        <button
                          type="button"
                          className="h-9 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition-all active:scale-95 cursor-pointer"
                        >
                          Clear Active Filters
                        </button>
                      </div>
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

      {/* DETAILED TRANSACTION INSPECTOR SLIDE DRAWER MODAL */}
      {selectedTxContext && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-zinc-950/20 transition-opacity">
          {/* Backdrop Blur Mask */}

          <div
            className="absolute inset-0"
            onClick={() => setSelectedTxContext(null)}
          />

          {/* Drawer Container Panel Body */}
          <div className="fixed top-0 right-0 h-full w-full max-w-[480px] bg-white shadow-md p-8 py-5 overflow-y-auto flex flex-col justify-between animate-in slide-in-from-right duration-200 z-50">
            <div className="space-y-6">
              {/* HEADER SECTION */}
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-primary tracking-tight pt-1">
                    {selectedTxContext.public_id}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedTxContext(null)}
                  className="w-8 h-8 flex-shrink-0 rounded-full bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors flex items-center justify-center text-slate-500 cursor-pointer shadow-3xs"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="border-b border-slate-100" />

              {/* SECTION 1: TRANSACTION INFO */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-400">
                  <Receipt size={14} className="text-[#074073]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Transaction Details
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-slate-50/60 border border-slate-200/40 p-3.5 rounded-xl space-y-1">
                    <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1">
                      <Fingerprint size={10} /> Reference ID
                    </p>
                    <p
                      className="font-mono text-xs font-semibold text-slate-700 truncate"
                      title={selectedTxContext.id}
                    >
                      {selectedTxContext.id.substring(0, 14)}...
                    </p>
                  </div>

                  <div className="bg-slate-50/60 border border-slate-200/40 p-3.5 rounded-xl space-y-1">
                    <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1">
                      <DollarSign size={10} /> Transaction Amount
                    </p>
                    <p className="text-xl font-bold text-primary">
                      {formatAmount(selectedTxContext.amount)}
                    </p>
                  </div>

                  <div className="bg-slate-50/60 border border-slate-200/40 p-3.5 rounded-xl space-y-1">
                    <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1">
                      <CreditCard size={10} /> Linked Account ID
                    </p>
                    <p
                      className="font-mono text-xs font-semibold text-slate-700 truncate"
                      title={selectedTxContext.account_id}
                    >
                      {selectedTxContext.account_id.substring(0, 14)}...
                    </p>
                  </div>

                  <div className="bg-slate-50/60 border border-slate-200/40 p-3.5 rounded-xl space-y-1">
                    <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1">
                      <History size={10} /> Date Created
                    </p>
                    <p className="text-xs font-bold text-primary">
                      {new Date(selectedTxContext.updatedAt).toLocaleTimeString(
                        "en-KE",
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 2: SENDER INFO */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-400">
                  <ArrowUpRight size={14} className="text-amber-600" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Sender Information
                  </span>
                </div>

                <div className="p-4 bg-amber-50/20 border border-amber-100/50 rounded-2xl space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-xs font-medium">
                    <div>
                      <p className="text-[9px] text-slate-400 uppercase tracking-wide">
                        Sender Name
                      </p>
                      <p className="text-primary font-bold mt-0.5 flex items-center gap-1">
                        <User size={12} className="text-slate-400" />
                        {selectedTxContext.sender_name}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-400 uppercase tracking-wide">
                        Source Account
                      </p>
                      <p className="text-slate-700 font-mono font-semibold mt-0.5">
                        {selectedTxContext.sender_account_number ||
                          "Direct Deposit Network"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3: RECEIVER INFO */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-400">
                  <ArrowDownLeft size={14} className="text-emerald-600" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Recipient Details
                  </span>
                </div>

                <div className="p-4 bg-emerald-50/20 border border-emerald-100/50 rounded-2xl space-y-3">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs font-medium">
                    <div>
                      <p className="text-[9px] text-slate-400 uppercase tracking-wide">
                        Recipient Name
                      </p>
                      <p className="text-primary font-bold mt-0.5 flex items-center gap-1">
                        <User size={12} className="text-slate-400" />
                        {selectedTxContext.receiver_name}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-400 uppercase tracking-wide">
                        Recipient Account
                      </p>
                      <p className="text-slate-700 font-mono font-semibold mt-0.5">
                        {selectedTxContext.receiver_account_number}
                      </p>
                    </div>
                    <div className="col-span-2 border-t border-slate-100/70 pt-2">
                      <p className="text-[9px] text-slate-400 uppercase tracking-wide">
                        Bank Partner
                      </p>
                      <p className="text-slate-700 font-semibold mt-0.5 flex items-center gap-1">
                        <Building2 size={12} className="text-slate-400" />
                        {selectedTxContext.receiver_bank_name}{" "}
                        <span className="text-slate-400 font-normal">
                          (Code {selectedTxContext.receiver_bank_code})
                        </span>
                      </p>
                    </div>
                    <div className="col-span-2 border-t border-slate-100/70 pt-2">
                      <p className="text-[9px] text-slate-400 uppercase tracking-wide">
                        Transaction Reference Code
                      </p>
                      <p
                        className="text-slate-600 font-mono text-[11px] font-semibold truncate bg-white border border-slate-200/60 p-2 rounded-lg mt-1 select-all"
                        title={selectedTxContext.receiver_reference}
                      >
                        {selectedTxContext.receiver_reference}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM ACTION RECEIPT ANCHOR BUTTON */}
            {selectedTxContext.document_url &&
              selectedTxContext.document_url !== "..." && (
                <a
                  href={selectedTxContext.document_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 flex items-center gap-2.5 w-full justify-center py-4 bg-[#074073] text-white rounded-2xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-900/10 hover:bg-[#052d52] transition-all cursor-pointer active:scale-98"
                >
                  <FileText size={15} />
                  <span>Download Receipt (PDF)</span>
                </a>
              )}
          </div>
        </div>
      )}
    </>
  );
}

// Internal reusable metadata component
const AuditMetaBlock = ({ icon, label, value }) => (
  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-start gap-2.5">
    <div className="size-6 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-400 mt-0.5 shrink-0">
      {React.cloneElement(icon, { size: 12 })}
    </div>
    <div className="min-w-0">
      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">
        {label}
      </p>
      <p className="text-xs font-semibold text-slate-700 truncate mt-0.5">
        {value}
      </p>
    </div>
  </div>
);
