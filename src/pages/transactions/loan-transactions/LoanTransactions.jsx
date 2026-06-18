import React, { useState } from "react";
import {
  ArrowUpRight,
  Search,
  Download,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useFormatAmount } from "../../../hooks/useFormatAmount";
import { useQuery } from "react-query";
import { useToast } from "../../../contexts/ToastProvider";
import { getLoanTransactions } from "../../../sdk/loan-transactions/loan-transactions";
import LoanTransactionsFilter from "../../../components/filters/LoanTransactionsFilter";

export default function LoanTransactions() {
  const [searchQuery, setSearchQuery] = useState("");
  const formatAmount = useFormatAmount();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    q: "",
    status: "",
    fromDate: "",
    toDate: "",
    leastAmount: "",
    mostAmount: "",
    type: "",
  });
  const { showToast } = useToast();
  const [totalItems, setTotalItems] = useState(0);
  const [loanTransactions, setLoanTransactions] = useState([
    {
      id: "b0c54688-96c0-4e39-ab31-eeb47704b585",
      loan_id: "e941949d-dfc0-40ae-9fd3-4674eb2f344c",
      amount_paid: "2500.00",
      principal_paid: "2000.00",
      interest_paid: "500.00",
      penalty_paid: "0.00",
      payment_mode: "MPESA",
      transaction_ref: "QHH4LDXYZ1",
      is_reversed: false,
      created_at: "2026-06-09T19:59:30.291Z",
    },
    {
      id: "a1b2c3d4-e5f6-4789-a0b1-c2d3e4f5a6b7",
      loan_id: "e941949d-dfc0-40ae-9fd3-4674eb2f344c",
      amount_paid: "3200.00",
      principal_paid: "2500.00",
      interest_paid: "700.00",
      penalty_paid: "0.00",
      payment_mode: "BANK_TRANSFER",
      transaction_ref: "BKT9928374",
      is_reversed: false,
      created_at: "2026-06-10T09:15:22.000Z",
    },
    {
      id: "f5e4d3c2-b1a0-9876-5432-1fedcba09876",
      loan_id: "e941949d-dfc0-40ae-9fd3-4674eb2f344c",
      amount_paid: "1500.00",
      principal_paid: "1200.00",
      interest_paid: "300.00",
      penalty_paid: "0.00",
      payment_mode: "MPESA",
      transaction_ref: "QHH4LDXYZ2",
      is_reversed: true,
      created_at: "2026-06-11T14:20:10.500Z",
    },
    {
      id: "99887766-5544-3322-1100-aabbccddeeff",
      loan_id: "e941949d-dfc0-40ae-9fd3-4674eb2f344c",
      amount_paid: "5000.00",
      principal_paid: "4000.00",
      interest_paid: "800.00",
      penalty_paid: "200.00",
      payment_mode: "MPESA",
      transaction_ref: "QHH4LDXYZ3",
      is_reversed: false,
      created_at: "2026-06-12T10:05:45.120Z",
    },
    {
      id: "12345678-1234-5678-1234-567812345678",
      loan_id: "e941949d-dfc0-40ae-9fd3-4674eb2f344c",
      amount_paid: "2100.00",
      principal_paid: "2000.00",
      interest_paid: "100.00",
      penalty_paid: "0.00",
      payment_mode: "BANK_TRANSFER",
      transaction_ref: "BKT9928375",
      is_reversed: false,
      created_at: "2026-06-13T16:40:00.000Z",
    },
    {
      id: "87654321-8765-4321-8765-432187654321",
      loan_id: "e941949d-dfc0-40ae-9fd3-4674eb2f344c",
      amount_paid: "4000.00",
      principal_paid: "3500.00",
      interest_paid: "500.00",
      penalty_paid: "0.00",
      payment_mode: "MPESA",
      transaction_ref: "QHH4LDXYZ4",
      is_reversed: false,
      created_at: "2026-06-14T11:12:30.900Z",
    },
    {
      id: "abcdef12-3456-7890-abcd-ef1234567890",
      loan_id: "e941949d-dfc0-40ae-9fd3-4674eb2f344c",
      amount_paid: "2500.00",
      principal_paid: "2000.00",
      interest_paid: "500.00",
      penalty_paid: "0.00",
      payment_mode: "BANK_TRANSFER",
      transaction_ref: "BKT9928376",
      is_reversed: false,
      created_at: "2026-06-15T09:00:00.000Z",
    },
    {
      id: "fedcba21-6543-0987-fedc-ba0987654321",
      loan_id: "e941949d-dfc0-40ae-9fd3-4674eb2f344c",
      amount_paid: "1000.00",
      principal_paid: "1000.00",
      interest_paid: "0.00",
      penalty_paid: "0.00",
      payment_mode: "MPESA",
      transaction_ref: "QHH4LDXYZ5",
      is_reversed: false,
      created_at: "2026-06-16T10:30:15.000Z",
    },
    {
      id: "55556666-7777-8888-9999-000011112222",
      loan_id: "e941949d-dfc0-40ae-9fd3-4674eb2f344c",
      amount_paid: "3500.00",
      principal_paid: "3000.00",
      interest_paid: "500.00",
      penalty_paid: "0.00",
      payment_mode: "MPESA",
      transaction_ref: "QHH4LDXYZ6",
      is_reversed: false,
      created_at: "2026-06-16T11:45:00.000Z",
    },
    {
      id: "44443333-2222-1111-0000-999988887777",
      loan_id: "e941949d-dfc0-40ae-9fd3-4674eb2f344c",
      amount_paid: "750.00",
      principal_paid: "0.00",
      interest_paid: "0.00",
      penalty_paid: "750.00",
      payment_mode: "BANK_TRANSFER",
      transaction_ref: "BKT9928377",
      is_reversed: false,
      created_at: "2026-06-16T12:00:00.000Z",
    },
    {
      id: "11112222-3333-4444-5555-666677778888",
      loan_id: "e941949d-dfc0-40ae-9fd3-4674eb2f344c",
      amount_paid: "2200.00",
      principal_paid: "2000.00",
      interest_paid: "200.00",
      penalty_paid: "0.00",
      payment_mode: "MPESA",
      transaction_ref: "QHH4LDXYZ7",
      is_reversed: false,
      created_at: "2026-06-16T12:30:00.000Z",
    },
    {
      id: "99998888-7777-6666-5555-444433332222",
      loan_id: "e941949d-dfc0-40ae-9fd3-4674eb2f344c",
      amount_paid: "5000.00",
      principal_paid: "5000.00",
      interest_paid: "0.00",
      penalty_paid: "0.00",
      payment_mode: "BANK_TRANSFER",
      transaction_ref: "BKT9928378",
      is_reversed: false,
      created_at: "2026-06-16T13:00:00.000Z",
    },
  ]);

  const getTxType = (tx) => {
    if (parseFloat(tx.penalty_paid) > 0) return "Penalty";
    if (parseFloat(tx.principal_paid) > 0 || parseFloat(tx.interest_paid) > 0)
      return "Loan Repayment";
    return "Payment";
  };

  const { isFetching } = useQuery({
    queryKey: [
      "loan transactions",
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
      const response = await getLoanTransactions(
        filters?.page,
        filters?.limit,
        filters?.q,
        filters?.status,
        filters?.type,
        filters?.leastAmount,
        filters?.mostAmount,
        filters?.fromDate,
        filters?.toDate,
      );
      return response?.data?.data;
    },
    onSuccess: (data) => {
    //   setLoanTransactions(data?.transactions);
      setFilters((prev) => ({
        ...prev,
        page: data.currentPage,
        limit: data.itemsPerPage,
      }));
      setTotalItems(data.total);
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

  return (
    <>
      <LoanTransactionsFilter
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        setFilters={setFilters}
      />

      <div className="w-full space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/60 pb-6 select-none">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Loan Transactions
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Real-time tracking of disbursements, principal-interest allocation
              splits, automated penalties, and multi-channel payment
              reconciliations.
            </p>
          </div>
        </div>
        {/* 2. TOOLBAR */}
        <div className="flex justify-between items-center bg-white p-3 rounded-2xl border border-slate-200/60 shadow-sm">
          <div className="relative w-64">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              className="w-full h-9 pl-9 pr-4 bg-slate-50 rounded-xl text-xs border border-transparent focus:border-primary outline-none"
              placeholder="Search by ref..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all">
            <Download size={14} /> Export Statement
          </button>
        </div>

        {/* 3. DETAILED LEDGER TABLE */}
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse font-sans table-auto">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200/60 text-[10px] font-bold text-slate-400 uppercase tracking-widest select-none">
                <th className="py-4.5 px-6">Transaction Ref & Date</th>
                <th className="py-4.5 px-6">Mode & Type</th>
                <th className="py-4.5 px-6">Payment Breakdown</th>
                <th className="py-4.5 px-6 text-right">Total Paid</th>
                <th className="py-4.5 px-6 text-center">Status</th>
                <th className="py-4.5 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {loanTransactions?.map((tx) => (
                <tr
                  key={tx.id}
                  className="group hover:bg-slate-50/60 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900">
                        {tx.transaction_ref}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(tx.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-1">
                      <span className="px-2 py-0.5 bg-slate-100 rounded-md text-[9px] font-bold uppercase tracking-wide w-fit">
                        {tx.payment_mode}
                      </span>
                      <span className="text-[9px] font-medium text-slate-500 uppercase">
                        {getTxType(tx)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-10">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-slate-400 uppercase">
                          Principal
                        </span>
                        <span className="font-semibold text-slate-700">
                          {formatAmount(tx.principal_paid)}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] text-slate-400 uppercase">
                          Interest
                        </span>
                        <span className="font-semibold text-slate-700">
                          {formatAmount(tx.interest_paid)}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right font-bold text-slate-900">
                    {formatAmount(tx.amount_paid)}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${tx.is_reversed ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}
                    >
                      {tx.is_reversed ? (
                        <AlertCircle size={10} />
                      ) : (
                        <CheckCircle2 size={10} />
                      )}
                      {tx.is_reversed ? "Reversed" : "Verified"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button className="text-slate-400 hover:text-primary transition-colors">
                      <ArrowUpRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
