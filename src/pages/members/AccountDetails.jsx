import React, { useState } from "react";
import {
  ArrowLeft,
  Wallet,
  Calendar,
  ArrowUpRight,
  Copy,
  Check,
  Eye,
  Download,
  ArrowDownLeft,
  History,
  ChevronDown,
  PlusCircle,
  FileText,
} from "lucide-react";

export default function AccountDetails({ onBack }) {
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);

  // Enterprise production account data instance matching your provided schema
  const [account] = useState({
    id: "e8f191f3-0b35-34fb-c442-c6b62c6a0fd1",
    account_number: "0100100002752",
    account_code: "2752",
    account_type_id: "1",
    product_id: "eab1ba28-4867-4762-a3aa-ab5d6e557482",
    user_id: "a8426991-3061-d0e7-7fd6-019456264e89",
    branch_id: "71cbca39-4872-48fa-9129-c4ef3b20fb21",
    customer_id: "a8426991-3061-d0e7-7fd6-019456264e89",
    last_access: "2026-03-19T02:48:48.000Z",
    overdraft: "0",
    balance: "250201.00",
    interest: "0",
    branch_code: 1,
    isSwerv: false,
    version: 7,
    createdAt: "2026-03-19T08:48:49.395Z",
    updatedAt: "2026-05-27T08:18:43.746Z",
    status: "active",
    mobile_web_access: true,
    can_transact: true,
    customer: {
      id: "a8426991-3061-d0e7-7fd6-019456264e89",
      firstname: "ALMASI",
      middlename: "ACHIENG",
      lastname: "ALUOCH",
      identification: "30959390",
      identification_type: "National Id",
      mobileno: "+254765350350",
      country_of_residence: "KENYA",
      dob: "1992-06-06",
      kraPin: "A123456789P",
      email: "joram@gmail.com",
      username: "JORAM",
      phoneVerified: true,
      emailVerified: true,
      suspended: false,
      onboarding_stage: "completed",
      status: "Active",
      public_id: "SJS224",
      loanEligibilityNotified: true,
    },
    product: {
      id: "eab1ba28-4867-4762-a3aa-ab5d6e557482",
      name: "Savings",
      description:
        "Savings account Save, earn interest, and access your money anytime.",
      code: "1",
      is_savings: true,
      share_price: "1.00",
      image_url:
        "https://anansi-dev.s3.eu-west-1.amazonaws.com/ca9d205c-7c11-4ffa-8f0a-a31ef1a019c1-savings.png",
    },
  });

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

  const filteredTransactions = transactions.filter(
    (tx) =>
      tx.public_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.ref_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.sender_name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-5 font-sans antialiased text-slate-800">
      {/* HEADER CONTROL BAR */}
      <div className="flex justify-between gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/60 pb-6 select-none">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 transition-all cursor-pointer"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Savings Account
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Review transaction state routing, internal configurations, and
              linked asset tiers.
            </p>
          </div>
        </div>
        <div className="relative">
          {/* Dropdown Menu Trigger Button */}
          <button
            onClick={() => setIsActionMenuOpen(!isActionMenuOpen)}
            className="flex items-center gap-1.5 h-10 px-4 border border-slate-200 bg-white text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 active:bg-slate-100/80 transition-all cursor-pointer shadow-2xs outline-none focus:border-slate-300"
          >
            <span>Account Actions</span>
            <ChevronDown
              size={14}
              className={`text-slate-400 transition-transform duration-200 ${isActionMenuOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown Menu Overlay & Overlay Container Panel */}
          {isActionMenuOpen && (
            <>
              {/* Invisible overlay background to close menu when clicking outside */}
              <div
                className="fixed inset-0 z-30"
                onClick={() => setIsActionMenuOpen(false)}
              />

              {/* Menu Options Panel Grid */}
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200/80 rounded-xl shadow-lg py-1.5 z-40 origin-top-right animate-in fade-in slide-in-from-top-1 duration-150">
                <button
                  onClick={() => {
                    setIsActionMenuOpen(false);
                    alert("Opening history...");
                  }}
                  className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 text-left transition-colors cursor-pointer"
                >
                  <History size={14} className="text-slate-400" />
                  <span>Transaction History</span>
                </button>

                <button
                  onClick={() => {
                    setIsActionMenuOpen(false);
                    alert("Generating statements...");
                  }}
                  className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 text-left transition-colors cursor-pointer"
                >
                  <FileText size={14} className="text-slate-400" />
                  <span>Account Statements</span>
                </button>

                {/* Premium visual divider line */}
                <div className="border-t border-slate-100 my-1" />

                <button
                  onClick={() => {
                    setIsActionMenuOpen(false);
                    alert("Opening manual payment drawer...");
                  }}
                  className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-xs font-bold text-emerald-600 hover:bg-emerald-50/40 text-left transition-colors cursor-pointer"
                >
                  <PlusCircle size={14} className="text-emerald-500" />
                  <span>Add Manual Payment</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* TWO COLUMN INTERACTION LAYER */}
      <div className="relative overflow-hidden w-[500px] bg-slate-900 rounded-2xl p-6 text-white flex flex-col justify-between shadow-md group border border-slate-800 select-none">
        {/* Subtle Premium Background Blur Deco */}
        <div className="absolute -right-10 -top-10 size-40 rounded-full bg-emerald-500/10 blur-2xl group-hover:bg-emerald-500/15 transition-colors" />
        <div className="absolute -left-10 -bottom-10 size-40 rounded-full bg-slate-700/20 blur-xl" />

        {/* Top row: Brand & Type */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
              <Wallet size={16} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                Product
              </p>
              <p className="text-sm font-bold tracking-tight text-white">
                {account.product.name} Account
              </p>
            </div>
          </div>
          <span className="text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-md">
            {account.status}
          </span>
        </div>

        {/* Mid row: Balances Display */}
        <div className="z-10 py-5">
          <p className="text-[9px] uppercase font-bold tracking-widest text-slate-400">
            Available Liquid Balance
          </p>
          <p className="text-2xl font-black tracking-tight text-white mt-0.5">
            KES{" "}
            {Number(account.balance).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>

        {/* Bottom row: Account Parameters Mask */}
        <div className="flex items-end justify-between border-t border-white/5 pt-3 z-10">
          <div>
            <p className="text-[8px] uppercase font-bold tracking-widest text-slate-500">
              Account Number
            </p>
            <p className="font-mono text-sm font-bold tracking-medium text-slate-200 mt-0.5">
              {account.account_number.replace(
                /(\d{4})(\d{5})(\d{4})/,
                "$1 $2 $3",
              )}
            </p>
          </div>
          <button
            onClick={() => handleCopyText(account.account_number)}
            className="p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 text-slate-300 transition-all cursor-pointer"
            title="Copy Node String"
          >
            {copied ? (
              <Check size={12} className="text-emerald-400" />
            ) : (
              <Copy size={12} />
            )}
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-bold tracking-tight text-slate-900">
        Account Transactions
      </h2>
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
    </div>
  );
}
