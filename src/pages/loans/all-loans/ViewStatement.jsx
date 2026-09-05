import React, { useState } from "react";
import { ArrowLeft, Printer } from "lucide-react";
import { useQuery } from "react-query";
import { useToast } from "../../../contexts/ToastProvider";
import { getFullLoanStatement } from "../../../sdk/loans/loans";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewStatement() {
  const { showToast } = useToast();
  const { id } = useParams();
  const [statementInfo, setStatementInfo] = useState({});
  const navigate = useNavigate();

  const { isFetching } = useQuery({
    queryKey: ["get full statement"],
    queryFn: async () => {
      const response = await getFullLoanStatement(id, "", "");
      return response.data.data;
    },
    onSuccess: (data) => {
      console.log(data);
      setStatementInfo(data);
    },
    onError: (error) => {
      showToast({
        title: "Loan statements processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const { statement, header } = statementInfo;

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: statement?.loan?.currency || "KES",
    }).format(val || 0);

  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "—";

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Global CSS for Clean Printing Setup */}
      <style>{`
  @media print {
    @page {
      size: A4;
      margin: 0; /* Suppresses browser headers (page title) and footers (URL) */
    }
    
    body {
      background: white !important;
      -webkit-print-color-adjust: exact;
      color-adjust: exact;
    }

    /* Add internal page padding so the content doesn't hit the paper edge */
    .print-container {
      position: absolute !important;
      left: 0 !important;
      top: 0 !important;
      width: 100% !important;
      max-width: 100% !important;
      margin: 0 !important;
      padding: 12mm !important; 
      border: none !important;
      box-shadow: none !important;
      background: white !important;
    }

    body * {
      visibility: hidden !important;
    }

    .print-container,
    .print-container * {
      visibility: visible !important;
    }

    table {
      page-break-inside: auto;
    }
    tr {
      page-break-inside: avoid;
      page-break-after: auto;
    }
  }
`}</style>

      {isFetching ? (
        <ViewStatementSkeleton />
      ) : (
        <div className="w-full print:p-0 print:bg-white text-slate-800">
          {/* Top Control Bar (Hidden on Print) */}
          <div className="w-full mb-4 flex justify-between items-center no-print">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="size-10 rounded-xl border border-slate-200/80 bg-white flex items-center justify-center text-slate-500 hover:text-primary transition-all shadow-3xs cursor-pointer"
              >
                <ArrowLeft size={16} />
              </button>
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  Statement Preview
                </h2>
                <p className="text-xs text-slate-500">
                  Ready to download or print directly from browser
                </p>
              </div>
            </div>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 h-10 px-5 bg-primary text-white font-bold text-xs rounded-xl shadow-xs hover:bg-slate-800 transition-all cursor-pointer"
            >
              <Printer size={15} />
              <span>Print Statement</span>
            </button>
          </div>

          {/* Main Printable Document Card */}
          <div className="print-container w-full bg-white border border-slate-200/80 shadow-xs rounded-2xl p-4 print:rounded-none">
            {/* Header Metadata */}
            <div className="flex justify-between items-start border-b border-slate-200/60 pb-6 mb-6">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                  {statement?.title}
                </h1>
                <p className="text-xs text-slate-500 font-mono mt-1">
                  Statement No:{" "}
                  <span class="font-bold text-slate-700">
                    {statement?.statement_number}
                  </span>
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Generated Date: {formatDate(statement?.generated_at)}
                </p>
              </div>
              <div className="text-right space-y-1">
                <span className="inline-block px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Status: {statement?.loan.status}
                </span>
                <p className="text-xs text-slate-500 font-medium pt-1">
                  Period: {formatDate(statement?.period?.from)} –{" "}
                  {formatDate(statement?.period?.to)}
                </p>
              </div>
            </div>

            {/* Account Meta Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/80 border border-slate-200/60 p-4 rounded-xl mb-6 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Borrower
                </span>
                <p className="font-bold text-sm text-slate-900">
                  {statement?.borrower?.name}
                </p>
                <p className="text-slate-600">
                  Mobile:{" "}
                  <span className="font-semibold text-slate-800">
                    {statement?.borrower?.mobile}
                  </span>
                </p>
                <p className="text-slate-500 font-mono text-[10px]">
                  ID: {statement?.borrower?.customer_id}
                </p>
              </div>
              <div className="space-y-1 md:text-right">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Loan Facility
                </span>
                <p className="font-bold text-slate-800">
                  {statement?.loan?.product_name} (
                  <span className="font-mono text-slate-600">
                    {statement?.loan?.loan_code}
                  </span>
                  )
                </p>
                <p className="text-slate-600">
                  Disbursed:{" "}
                  <span className="font-semibold text-slate-800">
                    {formatDate(statement?.loan?.disbursement_date)}
                  </span>{" "}
                  | Due:{" "}
                  <span className="font-semibold text-slate-800">
                    {formatDate(statement?.loan?.due_date)}
                  </span>
                </p>
                <p className="text-slate-500">
                  Rate: {header?.interest_rate}% ({header?.interest_method})
                </p>
              </div>
            </div>

            {/* Summary Stat Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 text-center text-xs">
              <div className="p-3 bg-slate-50/50 border border-slate-200/60 rounded-xl">
                <span className="block text-[9px] font-black uppercase text-slate-400">
                  Principal
                </span>
                <span className="text-sm font-black text-slate-800">
                  {formatCurrency(statement?.loan?.principal_amount)}
                </span>
              </div>
              <div className="p-3 bg-slate-50/50 border border-slate-200/60 rounded-xl">
                <span className="block text-[9px] font-black uppercase text-slate-400">
                  Interest
                </span>
                <span className="text-sm font-black text-slate-800">
                  {formatCurrency(statement?.loan?.interest_amount)}
                </span>
              </div>
              <div className="p-3 bg-emerald-50/40 border border-emerald-100 rounded-xl">
                <span className="block text-[9px] font-black uppercase text-emerald-600">
                  Total Paid
                </span>
                <span className="text-sm font-black text-emerald-700">
                  {formatCurrency(statement?.totals?.total_paid)}
                </span>
              </div>
              <div className="p-3 bg-slate-50/50 border border-slate-200/60 rounded-xl">
                <span className="block text-[9px] font-black uppercase text-slate-400">
                  Outstanding Balance
                </span>
                <span className="text-sm font-black text-slate-900">
                  {formatCurrency(statement?.totals?.outstanding_balance)}
                </span>
              </div>
            </div>

            {/* High-Density Ledger Table */}
            <div className="overflow-x-auto w-full">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-slate-50 truncate text-[11px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-200 select-none">
                    <th className="py-3 px-4 text-left">Date</th>
                    <th className="py-3 px-4 text-left">Reference</th>
                    <th className="py-3 px-4 text-left">Description</th>
                    <th className="py-3 px-4 text-left">Mode</th>
                    <th className="py-3 px-4 text-right">Debit</th>
                    <th className="py-3 px-4 text-right">Credit</th>
                    <th className="py-3 px-4 text-right">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[13px] font-medium text-slate-700">
                  {statement?.transactions?.map((tx) => (
                    <tr
                      key={tx.line_no}
                      className="hover:bg-slate-50/40 transition-colors"
                    >
                      <td className="py-3 px-4 text-left font-semibold text-slate-800 whitespace-nowrap">
                        {formatDate(tx.date)}
                      </td>
                      <td className="py-3 px-4 text-left font-mono text-[11px] text-slate-500 truncate">
                        {tx.reference}
                      </td>
                      <td className="py-3 px-4 text-left font-medium text-slate-800">
                        {tx.description}
                      </td>
                      <td className="py-3 px-4 text-left text-slate-500 uppercase text-[11px]">
                        {tx.payment_mode || "—"}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-slate-700">
                        {tx.debit > 0 ? formatCurrency(tx.debit) : "—"}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-semibold text-emerald-600">
                        {tx.credit > 0 ? formatCurrency(tx.credit) : "—"}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">
                        {formatCurrency(tx.balance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-50/60 text-slate-950 text-[13px] font-black border-t-2 border-slate-200 select-none">
                    <td
                      colSpan={4}
                      className="py-3.5 px-4 text-right uppercase text-[10px] tracking-wider text-slate-500"
                    >
                      Total Ledger Summary
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono border-b border-slate-100">
                      {formatCurrency(statement?.totals?.debit)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-emerald-700 border-b border-slate-100">
                      {formatCurrency(statement?.totals?.credit)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-black border-b border-slate-100">
                      {formatCurrency(statement?.totals?.outstanding_balance)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const ViewStatementSkeleton = () => {
  return (
    <div className="w-full min-h-screen text-slate-800 animate-pulse">
      {/* Top Control Bar Skeleton */}
      <div className="w-full mb-4 flex justify-between items-center no-print">
        <div className="space-y-2">
          <div className="h-5 w-40 bg-slate-200 rounded-lg" />
          <div className="h-3 w-64 bg-slate-200 rounded-md" />
        </div>
        <div className="h-10 w-36 bg-slate-200 rounded-xl" />
      </div>

      {/* Main Document Card Skeleton */}
      <div className="w-full bg-white border border-slate-200/80 shadow-xs rounded-2xl p-4">
        {/* Header Metadata Skeleton */}
        <div className="flex justify-between items-start border-b border-slate-200/60 pb-6 mb-6">
          <div className="space-y-2">
            <div className="h-7 w-52 bg-slate-200 rounded-md" />
            <div className="h-3.5 w-40 bg-slate-200 rounded-md" />
            <div className="h-3 w-36 bg-slate-200 rounded-md" />
          </div>
          <div className="flex flex-col items-end space-y-2">
            <div className="h-6 w-24 bg-slate-200 rounded-md" />
            <div className="h-3 w-44 bg-slate-200 rounded-md" />
          </div>
        </div>

        {/* Account Meta Box Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/80 border border-slate-200/60 p-4 rounded-xl mb-6">
          <div className="space-y-2">
            <div className="h-3 w-20 bg-slate-200 rounded-md" />
            <div className="h-4 w-36 bg-slate-200 rounded-md" />
            <div className="h-3 w-28 bg-slate-200 rounded-md" />
            <div className="h-3 w-48 bg-slate-200 rounded-md" />
          </div>
          <div className="space-y-2 md:flex md:flex-col md:items-end">
            <div className="h-3 w-24 bg-slate-200 rounded-md" />
            <div className="h-4 w-40 bg-slate-200 rounded-md" />
            <div className="h-3 w-52 bg-slate-200 rounded-md" />
            <div className="h-3 w-32 bg-slate-200 rounded-md" />
          </div>
        </div>

        {/* Summary Stat Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={`stat-skel-${i}`}
              className="p-3 bg-slate-50/50 border border-slate-200/60 rounded-xl flex flex-col items-center justify-center space-y-2"
            >
              <div className="h-2.5 w-16 bg-slate-200 rounded-md" />
              <div className="h-5 w-24 bg-slate-200 rounded-md" />
            </div>
          ))}
        </div>

        {/* High-Density Ledger Table Skeleton */}
        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-3 px-4">
                  <div className="h-3 w-12 bg-slate-200 rounded-md" />
                </th>
                <th className="py-3 px-4">
                  <div className="h-3 w-20 bg-slate-200 rounded-md" />
                </th>
                <th className="py-3 px-4">
                  <div className="h-3 w-28 bg-slate-200 rounded-md" />
                </th>
                <th className="py-3 px-4">
                  <div className="h-3 w-12 bg-slate-200 rounded-md" />
                </th>
                <th className="py-3 px-4">
                  <div className="h-3 w-12 bg-slate-200 rounded-md ml-auto" />
                </th>
                <th className="py-3 px-4">
                  <div className="h-3 w-12 bg-slate-200 rounded-md ml-auto" />
                </th>
                <th className="py-3 px-4">
                  <div className="h-3 w-16 bg-slate-200 rounded-md ml-auto" />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[...Array(5)].map((_, rowIndex) => (
                <tr key={`row-skel-${rowIndex}`}>
                  <td className="py-3.5 px-4">
                    <div className="h-3.5 w-16 bg-slate-200 rounded-md" />
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="h-3.5 w-24 bg-slate-200 rounded-md" />
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="h-3.5 w-44 bg-slate-200 rounded-md" />
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="h-3.5 w-14 bg-slate-200 rounded-md" />
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="h-3.5 w-16 bg-slate-200 rounded-md ml-auto" />
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="h-3.5 w-16 bg-slate-200 rounded-md ml-auto" />
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="h-3.5 w-20 bg-slate-200 rounded-md ml-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50/60 border-t-2 border-slate-200">
                <td colSpan={4} className="py-3.5 px-4">
                  <div className="h-3.5 w-32 bg-slate-200 rounded-md ml-auto" />
                </td>
                <td className="py-3.5 px-4">
                  <div className="h-4 w-16 bg-slate-200 rounded-md ml-auto" />
                </td>
                <td className="py-3.5 px-4">
                  <div className="h-4 w-16 bg-slate-200 rounded-md ml-auto" />
                </td>
                <td className="py-3.5 px-4">
                  <div className="h-4 w-20 bg-slate-200 rounded-md ml-auto" />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
