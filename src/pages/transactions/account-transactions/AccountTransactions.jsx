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
} from "lucide-react";

export default function AccountTransactions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTxContext, setSelectedTxContext] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const actionMenuRef = useRef(null);

  const [transactions] = useState([
    {
      id: "b626ff62-55af-595c-a6d0-273a516c1051",
      internal_id: "3484",
      public_id: "SW10001335",
      amount: "2000",
      type: "Savings Contribution",
      status: "completed",
      ref_number: "VCFV638H5OGDDC7L",
      sender_name: "ALFRED GITAU",
      deposit_method: "MPESA",
      note: "Savings deposit",
      transaction_charge: "0",
      category: "credit",
      createdAt: "2026-06-10T00:00:00.000Z",
      running_balance: "137374",
      platform: "mobile",
    },
    {
      id: "c374ff73-66bc-596c-c7e1-384b627d0162",
      internal_id: "3486",
      public_id: "SW10001337",
      amount: "1200",
      type: "Share Capital Topup",
      status: "pending",
      ref_number: "PLM982K3H4OBCC3D",
      sender_name: "MARYANNE WAMBUI",
      deposit_method: "MPESA",
      note: "Dividends compounding structure buy-in",
      transaction_charge: "12",
      category: "credit",
      createdAt: "2026-06-16T07:22:11.000Z",
      running_balance: "44910",
      platform: "mobile",
    },
    {
      id: "e930bb93-00fe-505c-d5e1-584c627d3273",
      internal_id: "3488",
      public_id: "SW10001339",
      amount: "500",
      type: "Withdrawal Fee",
      status: "completed",
      ref_number: "KJH876G5F4D3S2A",
      sender_name: "ALFRED GITAU",
      deposit_method: "MPESA",
      note: "Automated withdrawal fee",
      transaction_charge: "0",
      category: "debit",
      createdAt: "2026-06-16T10:00:00.000Z",
      running_balance: "82374",
      platform: "mobile",
    },
    {
      id: "f041cc04-110f-616d-e6f2-695d738e4384",
      internal_id: "3489",
      public_id: "SW10001340",
      amount: "10000",
      type: "Fixed Deposit Placement",
      status: "pending",
      ref_number: "QWE456RTY789UIO",
      sender_name: "ALFRED GITAU",
      deposit_method: "BANK_TRANSFER",
      note: "12-month fixed deposit placement",
      transaction_charge: "50",
      category: "debit",
      createdAt: "2026-06-16T11:00:00.000Z",
      running_balance: "72374",
      platform: "web_console",
    },
    {
      id: "g152dd15-221f-727e-f7g3-706e849f5495",
      internal_id: "3490",
      public_id: "SW10001341",
      amount: "150",
      type: "SMS Notification Fee",
      status: "completed",
      ref_number: "ZXC123VBN456QWE",
      sender_name: "ALFRED GITAU",
      deposit_method: "MPESA",
      note: "Bulk SMS notifications monthly fee",
      transaction_charge: "0",
      category: "debit",
      createdAt: "2026-06-16T11:15:00.000Z",
      running_balance: "72224",
      platform: "mobile",
    },
    {
      id: "h263ee26-332f-838f-g8h4-817f950g6506",
      internal_id: "3491",
      public_id: "SW10001342",
      amount: "20000",
      type: "Insurance Premium",
      status: "completed",
      ref_number: "PLM098OKN765IJU",
      sender_name: "ALFRED GITAU",
      deposit_method: "BANK_TRANSFER",
      note: "Annual life insurance premium",
      transaction_charge: "100",
      category: "debit",
      createdAt: "2026-06-16T11:30:00.000Z",
      running_balance: "52224",
      platform: "web_console",
    },
    {
      id: "i374ff37-443f-949g-h9i5-928g061h7617",
      internal_id: "3492",
      public_id: "SW10001343",
      amount: "5000",
      type: "Dividend Payment",
      status: "completed",
      ref_number: "NBV987MKL654JHG",
      sender_name: "ANANSI SAKO LABS",
      deposit_method: "BANK_TRANSFER",
      note: "2026 Annual dividend payout",
      transaction_charge: "0",
      category: "credit",
      createdAt: "2026-06-16T12:00:00.000Z",
      running_balance: "57224",
      platform: "web_console",
    },
    {
      id: "j485gg48-554f-050h-i0j6-a39h172i8728",
      internal_id: "3493",
      public_id: "SW10001344",
      amount: "100",
      type: "Account Maintenance Fee",
      status: "completed",
      ref_number: "OIU876YTR543EWQ",
      sender_name: "ALFRED GITAU",
      deposit_method: "MPESA",
      note: "Monthly account maintenance charge",
      transaction_charge: "0",
      category: "debit",
      createdAt: "2026-06-16T12:15:00.000Z",
      running_balance: "57124",
      platform: "mobile",
    },
    {
      id: "k596hh59-665f-161i-j1k7-b40i283j9839",
      internal_id: "3494",
      public_id: "SW10001345",
      amount: "3000",
      type: "Internal Transfer",
      status: "completed",
      ref_number: "LKJ456GFD321VBN",
      sender_name: "ALFRED GITAU",
      deposit_method: "WEB",
      note: "Transfer to personal wallet",
      transaction_charge: "5",
      category: "debit",
      createdAt: "2026-06-16T13:00:00.000Z",
      running_balance: "54119",
      platform: "mobile",
    },
    {
      id: "l607ii60-776f-272j-k2l8-c51j394k0940",
      internal_id: "3495",
      public_id: "SW10001346",
      amount: "1500",
      type: "Utility Payment",
      status: "completed",
      ref_number: "MNB321VVC654LKJ",
      sender_name: "ALFRED GITAU",
      deposit_method: "MPESA",
      note: "Monthly electricity bill",
      transaction_charge: "20",
      category: "debit",
      createdAt: "2026-06-16T14:30:00.000Z",
      running_balance: "52599",
      platform: "mobile",
    },
  ]);

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

  const filteredTransactions = transactions.filter(
    (tx) =>
      tx.public_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.ref_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.sender_name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full space-y-6 font-sans antialiased text-slate-800">
      {/* HEADER SECTION */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/60 pb-6 select-none">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Account Transactions
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Real-time entry monitoring, liquidity reconciliations, and instant
            cryptographic asset audit tracking.
          </p>
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID, reference or name..."
            className="w-full h-10 pl-9 pr-4 bg-slate-50 border border-slate-200/60 rounded-xl text-xs font-medium outline-none transition-all focus:bg-white focus:border-primary placeholder:text-slate-400 font-sans"
          />
        </div>
      </div>

      {/* HIGH-DENSITY LEDGER SYSTEM */}
      <div className="w-full bg-white rounded-3xl border border-slate-200/60 shadow-2xs overflow-hidden">
        <table className="w-full text-left border-collapse font-sans table-auto">
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
            {filteredTransactions.map((tx) => (
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
                    <span className="font-semibold text-slate-900 text-sm tracking-tight group-hover:text-primary transition-colors flex items-center gap-1.5">
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
                      Delta:{" "}
                      <span
                        className={`font-bold text-sm ${tx.category === "credit" ? "text-success" : "text-slate-900"}`}
                      >
                        KES {tx.category === "credit" ? "+" : "-"}
                        {Number(tx.amount).toLocaleString()}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      Running Bal:{" "}
                      <span className="font-mono font-bold text-slate-700">
                        KES {Number(tx.running_balance).toLocaleString()}
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
                        {Number(tx.transaction_charge || 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
                      Net: KES{" "}
                      {Number(
                        Number(tx.amount) - Number(tx.transaction_charge || 0),
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
                      {new Date(tx.createdAt).toLocaleDateString("en-KE", {
                        dateStyle: "medium",
                      })}
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
                        className="size-8 rounded-xl border border-slate-200/60 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-3xs bg-white cursor-pointer"
                        title="Download Ingestion Document Receipt"
                      >
                        <Download size={14} />
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DETAILED TRANSACTION INSPECTOR SLIDE DRAWER MODAL */}
      {selectedTxContext && (
        <div className="fixed inset-0 z-50 flex justify-end select-none">
          {/* Backdrop Mask */}
          <div
            className="absolute inset-0 bg-slate-900/15 backdrop-blur-xs transition-opacity duration-200"
            onClick={() => setSelectedTxContext(null)}
          />

          {/* Drawer Container Panel Body */}
          <div className="fixed top-0 right-0 h-screen w-full max-w-lg bg-white shadow-2xl border-l border-slate-200/80 p-8 overflow-y-auto flex flex-col justify-between animate-in slide-in-from-right duration-200 z-50">
            <div className="space-y-6">
              {/* Header Configuration Meta */}
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 border border-primary/10 px-2 py-0.5 rounded-md">
                    Audit Verification Statement
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight pt-1">
                    Entry {selectedTxContext.public_id} Trace
                  </h3>
                  <p className="text-xs text-slate-400 font-normal leading-relaxed line-clamp-2 italic pt-0.5">
                    "
                    {selectedTxContext.note ||
                      "No specific transaction notes assigned by system operator."}
                    "
                  </p>
                </div>
                <button
                  onClick={() => setSelectedTxContext(null)}
                  className="w-8 h-8 flex-shrink-0 !rounded-full bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors flex items-center justify-center text-slate-500 cursor-pointer shadow-3xs"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="border-b border-slate-100 pb-2" />

              {/* AUDIT MATRIX DATA BLOCKS */}
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Activity size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Internal Transaction Manifest Metadata
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <AuditMetaBlock
                    icon={<Wallet />}
                    label="Database Internal Tracking ID"
                    value={selectedTxContext.id.substring(0, 18) + "..."}
                  />
                  <AuditMetaBlock
                    icon={<Activity />}
                    label="Internal Index Counter"
                    value={`#${selectedTxContext.internal_id}`}
                  />
                  <AuditMetaBlock
                    icon={<CreditCard />}
                    label="Source Account ID Alignment"
                    value={
                      selectedTxContext.account_id.substring(0, 14) + "..."
                    }
                  />
                  <AuditMetaBlock
                    icon={<History />}
                    label="Last Verification Synchronized"
                    value={new Date(
                      selectedTxContext.updatedAt,
                    ).toLocaleTimeString("en-KE")}
                  />
                </div>

                {/* Sender Infrastructure Mapping */}
                <div className="p-4 bg-slate-50/70 border border-slate-200/40 rounded-2xl space-y-2.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                    Sender Origin Endpoint Parameters
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                    <div>
                      <p className="text-[9px] text-slate-400 uppercase font-sans">
                        Sender Legal Entity
                      </p>
                      <p className="text-slate-800 font-bold">
                        {selectedTxContext.sender_name}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-400 uppercase font-sans">
                        Account Destination Code
                      </p>
                      <p className="text-slate-700 font-mono">
                        {selectedTxContext.sender_account_number ||
                          "Direct Ingestion Network"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Receiver Infrastructure Mapping */}
                <div className="p-4 bg-slate-50/70 border border-slate-200/40 rounded-2xl space-y-2.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                    Receiver Clearing Endpoint Parameters
                  </span>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-3 text-xs font-medium">
                    <div>
                      <p className="text-[9px] text-slate-400 uppercase font-sans">
                        Target Legal Handler
                      </p>
                      <p className="text-slate-800 font-bold">
                        {selectedTxContext.receiver_name}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-400 uppercase font-sans">
                        Receiver Node Account
                      </p>
                      <p className="text-slate-700 font-mono">
                        {selectedTxContext.receiver_account_number}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-400 uppercase font-sans">
                        Receiver Node Bank Partner
                      </p>
                      <p className="text-slate-700 flex items-center gap-1">
                        <Building2 size={11} />{" "}
                        {selectedTxContext.receiver_bank_name} (Code{" "}
                        {selectedTxContext.receiver_bank_code})
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-400 uppercase font-sans">
                        Cryptographic Ingestion Hash
                      </p>
                      <p
                        className="text-slate-400 font-mono text-[10px] truncate"
                        title={selectedTxContext.receiver_reference}
                      >
                        {selectedTxContext.receiver_reference}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Downstream Document Link Anchor Component */}
            {selectedTxContext.document_url &&
              selectedTxContext.document_url !== "..." && (
                <a
                  href={selectedTxContext.document_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 flex items-center gap-3 w-full justify-center p-4 bg-primary text-white rounded-2xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-primary/10 hover:bg-primary/90 transition-all cursor-pointer"
                >
                  <FileText size={16} />
                  <span>Fetch Signed Transaction PDF</span>
                </a>
              )}
          </div>
        </div>
      )}
    </div>
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
