import React, { useState, useEffect } from "react";
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  Type,
  ListFilter,
} from "lucide-react";

export default function BulkPayments() {
  const currentUser = {
    userId: "USR-8842",
    fullName: "Jane Doe",
    role: "Senior Accounts Clerk",
    branch: "Nairobi Main Branch",
  };

  // Form State
  const [batchTitle, setBatchTitle] = useState("");
  const [paymentCategory, setPaymentCategory] = useState("DIVIDEND");
  const [file, setFile] = useState(null);

  // System Metadata & Tracking States
  const [batchId, setBatchId] = useState("");
  const [uploadTimestamp, setUploadTimestamp] = useState("");
  const [isParsing, setIsParsing] = useState(false);
  const [batchStats, setBatchStats] = useState({ rowCount: 0, totalAmount: 0 });
  const [lifecycleStatus, setLifecycleStatus] = useState("DRAFT");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    generateBatchMetadata();
  }, []);

  const generateBatchMetadata = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const randomNum = Math.floor(1000 + Math.random() * 9000);

    setBatchId(`BATCH-${year}-${month}${day}-${randomNum}`);
    setUploadTimestamp(date.toISOString());
  };

  // Handle File selection and mock parsing
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Validate extension
    const validExtensions = [".csv", ".xlsx", ".xls"];
    const fileExtension = selectedFile.name
      .substring(selectedFile.name.lastIndexOf("."))
      .toLowerCase();

    if (!validExtensions.includes(fileExtension)) {
      setErrorMsg("Invalid file format. Please upload a .csv or .xlsx file.");
      setFile(null);
      return;
    }

    setErrorMsg("");
    setFile(selectedFile);
    setIsParsing(true);

    // Mock parsing delay & automatic calculation of Aggregate Stats
    setTimeout(() => {
      // In a real application, you'd use Papaparse or SheetJS here to parse rows
      // Simulating a parsed result of 150 rows totaling 750,000 KES
      const mockRowCount = 150;
      const mockTotalAmount = 750000.0;

      setBatchStats({
        rowCount: mockRowCount,
        totalAmount: mockTotalAmount,
      });
      setIsParsing((fn) => false);
    }, 1000);
  };

  // Handle final submission to Maker-Checker queue
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!batchTitle.trim()) {
      setErrorMsg("Please provide an upload name / description.");
      return;
    }
    if (!file) {
      setErrorMsg("Please attach a valid file.");
      return;
    }

    setLifecycleStatus("PENDING_REVIEW");
    setSuccessMsg("Batch successfully uploaded and routed to Checker queue!");
  };

  const handleReset = () => {
    setBatchTitle("");
    setFile(null);
    setBatchStats({ rowCount: 0, totalAmount: 0 });
    setLifecycleStatus("DRAFT");
    setSuccessMsg("");
    setErrorMsg("");
    generateBatchMetadata();
  };

  return (
    <div>
      {/* Page Header */}
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Bulk Payment Upload
          </h1>
          <p className="text-sm text-gray-500 font-sans">
            Upload a CSV file to update offline repayments for shares, savings,
            and loan repayments. <br />
            Upload a CSV file with the repayment details. Make sure your file
            adheres to the required format. Check out sample.csv to check the
            required formatting.
          </p>
        </div>
      </div>

      <div className="w-full p-6 bg-white">
        {/* Notifications */}
        {errorMsg && (
          <div className="mb-6 p-4 bg-error/10 border border-error/20 text-error rounded-lg flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-4 bg-success/10 border border-success/20 text-success rounded-lg flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* SECTION 1: System-Generated Metadata */}
          <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
                Batch ID / Reference
              </label>
              <div className="mt-1 font-mono font-bold text-slate-800 bg-white px-3 py-4 border border-slate-200 rounded-xl shadow-3xs text-xs">
                {batchId}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
                Upload Timestamp (Ingested)
              </label>
              <div className="mt-1 text-xs font-bold text-slate-700 bg-white px-3 py-4 border border-slate-200 rounded-xl shadow-3xs flex items-center">
                {uploadTimestamp
                  ? new Date(uploadTimestamp).toLocaleString()
                  : "Generating..."}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
                Uploader Details (Maker)
              </label>
              <div className="mt-1 text-xs font-bold text-slate-700 bg-white px-3 py-4 border border-slate-200 rounded-xl shadow-3xs">
                <span className="font-extrabold text-slate-800">
                  {currentUser.fullName}
                </span>{" "}
                ({currentUser.userId}) — {currentUser.role}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
                Branch / Department
              </label>
              <div className="mt-1 text-xs font-bold text-slate-700 bg-white px-3 py-4 border border-slate-200 rounded-xl shadow-3xs">
                {currentUser.branch}
              </div>
            </div>
          </div>

          {/* SECTION 2: User Inputs (Metadata & Description) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Upload Name / Description Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                Upload Name / Description <span className="text-error">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10">
                  <Type size={16} className="text-[#074073]" />
                  <div className="w-[1px] h-4 bg-slate-200 ml-3" />
                </div>
                <input
                  type="text"
                  placeholder="e.g., September 2026 Board Sitting Allowances"
                  value={batchTitle}
                  onChange={(e) => setBatchTitle(e.target.value)}
                  disabled={lifecycleStatus !== "DRAFT"}
                  className="w-full pl-[58px] pr-4 h-12 bg-slate-50/60 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#074073] transition-all shadow-3xs disabled:opacity-60"
                />
              </div>
            </div>

            {/* Payment Category Dropdown */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                Payment Category
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10">
                  <ListFilter size={16} className="text-[#074073]" />
                  <div className="w-[1px] h-4 bg-slate-200 ml-3" />
                </div>
                <select
                  value={paymentCategory}
                  onChange={(e) => setPaymentCategory(e.target.value)}
                  disabled={lifecycleStatus !== "DRAFT"}
                  className="w-full pl-[58px] pr-4 h-12 bg-slate-50/60 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 outline-none focus:border-[#074073] transition-all shadow-3xs appearance-none disabled:opacity-60"
                >
                  <option value="DIVIDEND">Q3 Member Dividends</option>
                  <option value="SALARY">Staff Payroll Disbursal</option>
                  <option value="REFUND">Member Share Capital Refund</option>
                  <option value="EXPENSE">General Operational Expense</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 3: File Upload Dropzone */}
          {lifecycleStatus === "DRAFT" && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                Source File (.csv, .xlsx) <span className="text-error">*</span>
              </label>
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-[#074073] transition-colors bg-slate-50/60 shadow-3xs">
                <input
                  type="file"
                  id="fileUpload"
                  accept=".csv, .xlsx, .xls"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="fileUpload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="w-10 h-20 text-[#074073] mb-2" />
                  <span className="text-xs font-extrabold text-slate-700">
                    {file
                      ? file.name
                      : "Click to browse or drag and drop your file here"}
                  </span>
                  <span className="text-[11px] text-slate-400 mt-1">
                    Supports CSV, Excel (Max 10MB)
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* SECTION 4: File Details & Aggregate Stats (Auto-Calculated) */}
          {(file || isParsing) && (
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 space-y-3">
              <h3 className="text-xs font-bold text-primary uppercase flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Source File & Aggregate Analysis</span>
              </h3>

              {isParsing ? (
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-600 py-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-primary" />
                  <span>
                    Parsing file contents and checking system aggregate sums...
                  </span>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block font-semibold mb-1">
                      Original File Details
                    </span>
                    <span className="font-bold text-slate-800 truncate block">
                      {file?.name}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {(file?.size / 1024).toFixed(2)} KB (
                      {file?.name.split(".").pop().toUpperCase()})
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold mb-1">
                      Total Row Count
                    </span>
                    <span className="font-extrabold text-slate-800 text-sm">
                      {batchStats.rowCount} Records
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold mb-1">
                      Total Monetary Value
                    </span>
                    <span className="font-extrabold text-success text-sm">
                      KES {batchStats.totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            {lifecycleStatus !== "DRAFT" ? (
              <button
                type="button"
                onClick={handleReset}
                className="px-5 h-12 border border-slate-200 text-slate-700 rounded-2xl hover:bg-slate-50 text-xs font-bold transition-all shadow-3xs"
              >
                Upload Another Batch
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                    setBatchTitle("");
                  }}
                  className="px-4 h-12 border border-slate-200 text-slate-700 rounded-2xl hover:bg-slate-50 text-xs font-bold transition-all shadow-3xs"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  disabled={!file || isParsing}
                  className="px-6 h-12 bg-primary text-white rounded-2xl hover:opacity-95 text-xs font-bold flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-3xs"
                >
                  <span>Submit for Checker Review</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
