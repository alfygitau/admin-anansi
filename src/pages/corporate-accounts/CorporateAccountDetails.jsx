import React, { useState } from "react";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  FileText,
  UserPlus,
  Plus,
  ArrowLeft,
  CreditCard,
  Briefcase,
  Users,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CorporateAccountDetails = ({
  corporateData,
  onAddDirector,
  onUploadDocument,
}) => {
  const navigate = useNavigate();

  const onBack = () => {
    navigate(-1);
  };

  // Fallback default mock data if none is passed via props
  const corporate = corporateData || {
    corporate_id: "CORP-2026-9021",
    companyName: "Apex Ventures Limited",
    businessType: "Private Limited Company",
    registrationNumber: "PVT-2024/883920",
    kraPin: "P052193847X",
    officialEmail: "info@apexventures.co.ke",
    corporatePhone: "+254 700 123456",
    county: "Nairobi",
    subCounty: "Kilimani",
    physicalAddress: "Delta Towers, 11th Floor, Waiyaki Way",
    boardResolutionRule: "Any 2 Directors or 1 Director + Company Secretary",
    status: "Active",
    accounts: [
      {
        id: "ACC-CORP-01",
        firstname: "Apex Operational",
        lastname: "Current Account",
        product: { name: "Business Current Account" },
        account_number: "CA-2026-3011",
        balance: 3450000.0,
        status: "Active",
      },
      {
        id: "ACC-CORP-02",
        firstname: "Apex Reserve",
        lastname: "Fixed Deposit",
        product: { name: "Corporate Call Account" },
        account_number: "FD-2026-8842",
        balance: 12000000.0,
        status: "Active",
      },
    ],
    loans: [
      {
        id: "LON-CORP-101",
        firstname: "Apex Equipment",
        lastname: "Asset Financing",
        product: { name: "Commercial Vehicle Loan" },
        account_number: "CL-2026-5511",
        balance: 4500000.0,
        status: "Active",
      },
    ],
    directors: [
      {
        id: "DIR-01",
        name: "Samuel Kiprop",
        role: "Managing Director / CEO",
        sharesPercentage: "45%",
        phone: "+254 722 333444",
        email: "samuel.kiprop@apexventures.co.ke",
      },
      {
        id: "DIR-02",
        name: "Brenda Muthoni",
        role: "Non-Executive Director",
        sharesPercentage: "35%",
        phone: "+254 733 555666",
        email: "brenda.muthoni@apexventures.co.ke",
      },
      {
        id: "DIR-03",
        name: "Dr. James Ochieng",
        role: "Company Secretary",
        sharesPercentage: "20%",
        phone: "+254 711 888999",
        email: "james.ochieng@apexventures.co.ke",
      },
    ],
    attachments: [
      {
        id: "DOC-C1",
        name: "Certificate_of_Incorporation.pdf",
        size: "3.2 MB",
        uploadDate: "10 Feb 2024",
        type: "Legal",
      },
      {
        id: "DOC-C2",
        name: "KRA_Compliance_Certificate.pdf",
        size: "1.0 MB",
        uploadDate: "15 Jan 2026",
        type: "Tax & Compliance",
      },
      {
        id: "DOC-C3",
        name: "CR12_Directors_Listing.pdf",
        size: "1.8 MB",
        uploadDate: "02 Feb 2026",
        type: "Governance",
      },
    ],
  };

  const [openAddDirector, setOpenAddDirector] = useState(false);

  return (
    <div className="h-full bg-slate-50/50 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full space-y-6 flex-1 flex flex-col"
      >
        {/* Navigation & Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onBack}
              className="w-12 h-12 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 transition-all cursor-pointer shrink-0"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-[#074073] rounded-md border border-blue-100">
                  {corporate.corporate_id}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md border ${
                    corporate.status === "Active"
                      ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                      : "bg-amber-50 border-amber-100 text-amber-600"
                  }`}
                >
                  <span
                    className={`size-1.5 rounded-full ${corporate.status === "Active" ? "bg-emerald-500" : "bg-amber-500"}`}
                  />
                  {corporate.status}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#074073] tracking-tight mt-1">
                {corporate.companyName}
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {corporate.businessType} • KRA PIN:{" "}
                <strong className="text-slate-700 font-mono">
                  {corporate.kraPin}
                </strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setOpenAddDirector(true)}
              className="px-4 h-11 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <UserPlus size={16} className="text-[#074073]" />
              <span>Add Director</span>
            </button>
          </div>
        </div>

        {/* SECTION CARDS CONTAINER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. CORPORATE DETAILS SECTION */}
          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h2 className="text-sm font-bold text-[#074073] uppercase tracking-wider flex items-center gap-2">
                  <Briefcase size={16} />
                  Corporate Profile & Registration
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase">
                    Company Name
                  </span>
                  <p className="text-xs font-bold text-slate-800 mt-1">
                    {corporate.companyName}
                  </p>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase">
                    Business Structure
                  </span>
                  <p className="text-xs font-bold text-slate-800 mt-1">
                    {corporate.businessType}
                  </p>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase">
                    Registration / Incorporation No.
                  </span>
                  <p className="text-xs font-bold font-mono text-slate-800 mt-1">
                    {corporate.registrationNumber}
                  </p>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase">
                    KRA PIN Certificate
                  </span>
                  <p className="text-xs font-bold font-mono text-slate-800 mt-1">
                    {corporate.kraPin}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. CONTACTS & LOCATION SECTION */}
          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h2 className="text-sm font-bold text-[#074073] uppercase tracking-wider flex items-center gap-2">
                  <MapPin size={16} />
                  Registered Office & Contacts
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase">
                    Official Email
                  </span>
                  <p className="text-xs font-bold text-slate-800 mt-1 flex items-center gap-1.5 truncate">
                    <Mail size={14} className="text-slate-400 shrink-0" />
                    <span className="truncate">{corporate.officialEmail}</span>
                  </p>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase">
                    Corporate Phone Number
                  </span>
                  <p className="text-xs font-bold text-slate-800 mt-1 flex items-center gap-1.5">
                    <Phone size={14} className="text-slate-400 shrink-0" />
                    {corporate.corporatePhone}
                  </p>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase">
                    County & Sub-County
                  </span>
                  <p className="text-xs font-bold text-slate-800 mt-1">
                    {corporate.county}, {corporate.subCounty}
                  </p>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase">
                    Physical Head Office Address
                  </span>
                  <p className="text-xs font-bold text-slate-800 mt-1 truncate">
                    {corporate.physicalAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. DIRECTORS & SHAREHOLDERS SECTION */}
          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h2 className="text-sm font-bold text-[#074073] uppercase tracking-wider flex items-center gap-2">
                  <Award size={16} />
                  Board of Directors
                </h2>
                <button
                  onClick={() => setOpenAddDirector(true)}
                  className="text-xs font-bold text-[#074073] hover:underline cursor-pointer"
                >
                  + Add Director
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                {corporate.directors?.map((dir, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col space-y-1"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold text-[#074073] uppercase">
                        {dir.role}
                      </span>
                      <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">
                        {dir.sharesPercentage} Shares
                      </span>
                    </div>
                    <span className="text-xs font-extrabold text-slate-800 truncate">
                      {dir.name}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {dir.phone}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4. MANDATES & RESOLUTIONS SECTION */}
          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h2 className="text-sm font-bold text-[#074073] uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck size={16} />
                  Account Mandates & Compliance
                </h2>
              </div>

              <div className="space-y-3 pt-4">
                <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-2xl">
                  <span className="text-[10px] font-bold text-[#074073] uppercase">
                    Board Resolution Signing Mandate
                  </span>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">
                    {corporate.boardResolutionRule}
                  </p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-800">
                    KYC & AML Status
                  </h4>
                  <p className="text-[11px] text-emerald-600 font-semibold leading-relaxed">
                    Fully Verified • CR12 Up-to-date & Beneficial Ownership
                    declared.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 5. ACTIVE CORPORATE ACCOUNTS */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 space-y-4 md:col-span-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-sm font-bold text-[#074073] uppercase tracking-wider flex items-center gap-2">
                <CreditCard size={16} />
                Corporate Bank Accounts
              </h2>
            </div>

            <div className="pt-2">
              {corporate?.accounts && corporate?.accounts?.length > 0 ? (
                <div className="border border-slate-100 rounded-xl overflow-hidden bg-white overflow-x-auto">
                  <table className="w-full text-left border-collapse table-auto text-xs font-medium min-w-[500px]">
                    <thead>
                      <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                        <th className="p-3.5 px-4">Account Portfolio</th>
                        <th className="p-3.5 px-4">Product Name</th>
                        <th className="p-3.5">Account Number</th>
                        <th className="p-3.5 text-right">Available Balance</th>
                        <th className="p-3.5 text-center">State</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {corporate?.accounts?.map((acc) => (
                        <tr
                          key={acc.id}
                          className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                        >
                          <td className="p-3.5 px-4 font-bold text-[#074073]">
                            {`${acc?.firstname || ""} ${acc?.lastname || ""}`.trim()}
                          </td>
                          <td className="p-3.5 px-4 font-bold text-slate-800">
                            {acc.product?.name}
                          </td>
                          <td className="p-3.5 font-mono text-blue-500 font-bold">
                            {acc.account_number}
                          </td>
                          <td className="p-3.5 text-right font-bold text-[#074073]">
                            KES{" "}
                            {Number(acc.balance || 0).toLocaleString(
                              undefined,
                              { minimumFractionDigits: 2 },
                            )}
                          </td>
                          <td className="p-3.5 text-center">
                            <span className="text-[9px] font-bold tracking-wide uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-100">
                              {acc.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="border border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-white">
                  <h4 className="text-sm font-bold text-slate-800 tracking-tight">
                    No corporate accounts linked
                  </h4>
                </div>
              )}
            </div>
          </div>

          {/* 6. CREDIT FACILITIES SECTION */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 space-y-4 md:col-span-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-sm font-bold text-[#074073] uppercase tracking-wider flex items-center gap-2">
                <CreditCard size={16} />
                Active Corporate Credit Facilities & Loans
              </h2>
            </div>

            <div className="pt-2">
              {corporate?.loans && corporate?.loans?.length > 0 ? (
                <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white overflow-x-auto">
                  <table className="w-full text-left border-collapse table-auto text-xs font-medium min-w-[500px]">
                    <thead>
                      <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                        <th className="p-3.5 px-4">Facility Name</th>
                        <th className="p-3.5 px-4">Loan Product Type</th>
                        <th className="p-3.5">Loan Account No.</th>
                        <th className="p-3.5 text-right">
                          Outstanding Balance
                        </th>
                        <th className="p-3.5 text-center">State</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {corporate?.loans?.map((loan) => (
                        <tr
                          key={loan.id}
                          className="hover:bg-slate-50/50 transition-colors"
                        >
                          <td className="p-3.5 px-4 font-bold text-[#074073]">
                            {`${loan?.firstname || ""} ${loan?.lastname || ""}`.trim()}
                          </td>
                          <td className="p-3.5 px-4 font-bold text-slate-800">
                            {loan.product?.name}
                          </td>
                          <td className="p-3.5 font-mono text-amber-600 font-bold">
                            {loan.account_number}
                          </td>
                          <td className="p-3.5 text-right font-bold text-slate-800">
                            KES{" "}
                            {Number(loan.balance || 0).toLocaleString(
                              undefined,
                              { minimumFractionDigits: 2 },
                            )}
                          </td>
                          <td className="p-3.5 text-center">
                            <span className="text-[9px] font-bold tracking-wide uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-600 border border-amber-100">
                              {loan.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="border border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-white">
                  <h4 className="text-sm font-bold text-slate-800 tracking-tight">
                    No active loan facilities found
                  </h4>
                </div>
              )}
            </div>
          </div>

          {/* 7. CORPORATE DOCUMENTS & ATTACHMENTS */}
          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 space-y-4 md:col-span-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-sm font-bold text-[#074073] uppercase tracking-wider flex items-center gap-2">
                <FileText size={16} />
                Corporate Compliance & Legal Documents
              </h2>
              <button
                onClick={onUploadDocument}
                className="h-8 px-3 bg-[#074073] hover:bg-[#052d52] text-white text-[11px] font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus size={14} />
                <span>Upload Doc</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
              {corporate.attachments?.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="size-10 rounded-xl bg-blue-100/60 text-[#074073] flex items-center justify-center shrink-0">
                      <FileText size={18} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-slate-800 truncate">
                        {doc.name}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium">
                        {doc.type} • {doc.size}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CorporateAccountDetails;
