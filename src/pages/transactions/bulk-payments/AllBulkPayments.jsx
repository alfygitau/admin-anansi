import React, { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  XCircle,
  RefreshCcw,
  FileSpreadsheet,
  Download,
} from "lucide-react";

export default function BulkPaymentsList() {
  // Mock data for bulk payment batches
  const [batches, setBatches] = useState([
    {
      batchId: "BATCH-2026-0917-0042",
      uploadName: "September 2026 Board Sitting Allowances",
      category: "DIVIDEND",
      uploaderName: "Jane Doe (USR-8842)",
      branch: "Nairobi Main Branch",
      uploadTimestamp: "2026-09-17T15:15:00Z",
      rowCount: 45,
      totalAmount: 450000,
      status: "PENDING_REVIEW", // PENDING_REVIEW, APPROVED, COMPLETED, REJECTED
    },
    {
      batchId: "BATCH-2026-0916-0019",
      uploadName: "Q3 Member Dividend Payout",
      category: "DIVIDEND",
      uploaderName: "Mark Smith (USR-1092)",
      branch: "Mombasa Branch",
      uploadTimestamp: "2026-09-16T11:30:00Z",
      rowCount: 1250,
      totalAmount: 8450000,
      status: "APPROVED",
    },
    {
      batchId: "BATCH-2026-0914-0102",
      uploadName: "Staff Payroll Disbursal - Sept",
      category: "SALARY",
      uploaderName: "Alice Wanjiku (USR-4421)",
      branch: "Headquarters",
      uploadTimestamp: "2026-09-14T09:00:00Z",
      rowCount: 85,
      totalAmount: 6200000,
      status: "COMPLETED",
    },
    {
      batchId: "BATCH-2026-0910-0088",
      uploadName: "Share Capital Refund Batch A",
      category: "REFUND",
      uploaderName: "Jane Doe (USR-8842)",
      branch: "Nairobi Main Branch",
      uploadTimestamp: "2026-09-10T14:20:00Z",
      rowCount: 12,
      totalAmount: 180000,
      status: "REJECTED",
    },
  ]);

  // Filter & Search State
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Status Badge Styling Helper
  const getStatusBadge = (status) => {
    switch (status) {
      case "PENDING_REVIEW":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-warning/15 text-warning">
            <Clock size={12} /> Pending Review
          </span>
        );
      case "APPROVED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-primary/15 text-primary">
            <CheckCircle2 size={12} /> Approved
          </span>
        );
      case "COMPLETED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-success/15 text-success">
            <CheckCircle2 size={12} /> Completed
          </span>
        );
      case "REJECTED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-error/15 text-error">
            <XCircle size={12} /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-slate-100 text-slate-600">
            Draft
          </span>
        );
    }
  };

  // Filter logic
  const filteredBatches = batches.filter((batch) => {
    const matchesSearch =
      batch.batchId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.uploadName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.uploaderName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || batch.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-4 mb-6">
        <div>
          <h1 className="text-xl font-extrabold text-slate-800">
            Bulk Payment Batches
          </h1>
          <p className="text-xs font-semibold text-slate-400 mt-0.5">
            Manage, review, and track all multi-recipient payout files
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => alert("Navigate to New Bulk Upload")}
            className="px-5 h-11 bg-primary text-white rounded-2xl text-xs font-bold hover:opacity-95 transition-all shadow-3xs flex items-center gap-2"
          >
            <FileSpreadsheet size={16} />
            <span>New Bulk Upload</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Search Input (Takes up 2 columns on medium screens) */}
        <div className="md:col-span-2 relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10">
            <Search size={16} className="text-[#074073]" />
            <div className="w-[1px] h-4 bg-slate-200 ml-3" />
          </div>
          <input
            type="text"
            placeholder="Search by Batch ID, Description, or Uploader..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-[58px] pr-4 h-12 bg-slate-50/60 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#074073] transition-all shadow-3xs"
          />
        </div>

        {/* Action Buttons (Filter & Export) aligned to the end */}
        <div className="flex items-center justify-end gap-2">
          <button className="flex items-center gap-1.5 h-12 px-5 border border-slate-200 bg-slate-50/60 text-slate-700 rounded-2xl text-xs font-bold hover:bg-slate-100 transition-all shadow-3xs">
            <Filter size={14} className="text-[#074073]" />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-1.5 h-12 px-5 border border-slate-200 bg-slate-50/60 text-slate-700 rounded-2xl text-xs font-bold hover:bg-slate-100 transition-all shadow-3xs">
            <Download size={14} className="text-[#074073]" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-3xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">Batch Reference / Title</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Uploader (Maker)</th>
                <th className="py-4 px-6">Records & Total</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredBatches.length > 0 ? (
                filteredBatches.map((batch) => (
                  <tr
                    key={batch.batchId}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="font-mono font-bold text-slate-800">
                        {batch.batchId}
                      </div>
                      <div className="font-semibold text-slate-500 text-[11px] mt-0.5 truncate max-w-xs">
                        {batch.uploadName}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg text-[10px]">
                        {batch.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-700">
                        {batch.uploaderName}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {batch.branch} •{" "}
                        {new Date(batch.uploadTimestamp).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-extrabold text-slate-800">
                        {batch.rowCount} Rows
                      </div>
                      <div className="font-extrabold text-success text-[11px]">
                        KES {batch.totalAmount.toLocaleString()}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {getStatusBadge(batch.status)}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() =>
                          alert(`Inspecting batch ${batch.batchId}`)
                        }
                        className="inline-flex items-center gap-1.5 px-3 h-9 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-100 font-bold text-xs transition-all shadow-3xs"
                      >
                        <Eye size={14} className="text-[#074073]" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="py-12 text-center text-slate-400 font-semibold"
                  >
                    No bulk payment batches found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
