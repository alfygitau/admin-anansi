import React, { useState } from "react";
import {
  Building2,
  Search,
  Plus,
  Filter,
  ArrowUpDown,
  MoreVertical,
  ShieldCheck,
  Briefcase,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Download,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CorporateAccounts = ({ onOpenAddModal }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  // Mock corporate accounts data tailored for a SACCO environment
  const [corporateAccounts, setCorporateAccounts] = useState([
    {
      id: "CORP-9012",
      name: "Afya Logistics & Haulage Ltd",
      industry: "Transport & Supply Chain",
      kraPin: "P051234567Z",
      primaryContact: "Dr. James Mwangi",
      phone: "+254 711 223344",
      status: "Active",
      totalSavings: 14500000,
      activeLoan: 5000000,
      signatoriesCount: 4,
    },
    {
      id: "CORP-9013",
      name: "St. Jude Educational Centre",
      industry: "Education & Institutions",
      kraPin: "P057890123Y",
      primaryContact: "Sister Beatrice Akinyi",
      phone: "+254 722 334455",
      status: "Active",
      totalSavings: 8200000,
      activeLoan: 0,
      signatoriesCount: 3,
    },
    {
      id: "CORP-9014",
      name: "Greenvalley Agro-Processors",
      industry: "Agriculture & FMCG",
      kraPin: "P054567890X",
      primaryContact: "Eng. Samuel Njuguna",
      phone: "+254 733 445566",
      status: "Pending Verification",
      totalSavings: 3100000,
      activeLoan: 2500000,
      signatoriesCount: 5,
    },
    {
      id: "CORP-9015",
      name: "Savannah Tech Solutions",
      industry: "ICT & Fintech",
      kraPin: "P059876543W",
      primaryContact: "Brenda Chebet",
      phone: "+254 744 556677",
      status: "Active",
      totalSavings: 19800000,
      activeLoan: 12000000,
      signatoriesCount: 2,
    },
    {
      id: "CORP-9016",
      name: "Nairobi Metro SACCO Staff Welfare",
      industry: "Cooperative & Welfare",
      kraPin: "P053210987V",
      primaryContact: "Michael Otieno",
      phone: "+254 755 667788",
      status: "Suspended",
      totalSavings: 1200000,
      activeLoan: 0,
      signatoriesCount: 3,
    },
    {
      id: "CORP-9017",
      name: "Apex Engineering Consultants",
      industry: "Construction & Real Estate",
      kraPin: "P056543210U",
      primaryContact: "Fatuma Mohamed",
      phone: "+254 766 778899",
      status: "Active",
      totalSavings: 24500000,
      activeLoan: 8500000,
      signatoriesCount: 4,
    },
  ]);

  const industries = [
    "All Industries",
    "Transport & Supply Chain",
    "Education & Institutions",
    "Agriculture & FMCG",
    "ICT & Fintech",
    "Cooperative & Welfare",
    "Construction & Real Estate",
  ];

  const statuses = [
    "All Status",
    "Active",
    "Pending Verification",
    "Suspended",
  ];

  // Filter accounts based on search, industry, and status
  const filteredAccounts = corporateAccounts.filter((acc) => {
    const matchesSearch =
      acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.kraPin.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesIndustry =
      selectedIndustry === "All Industries" ||
      acc.industry === selectedIndustry;

    const matchesStatus =
      selectedStatus === "All Status" || acc.status === selectedStatus;

    return matchesSearch && matchesIndustry && matchesStatus;
  });

  // Pagination calculation
  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage) || 1;
  const paginatedAccounts = filteredAccounts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="h-full bg-slate-50/50 font-sans text-slate-800">
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-[#074073] tracking-tight">
              Corporate Accounts
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Manage institutional entities, payroll check-off partnerships, and
            corporate credit portfolios.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(`/admin/add-corporate-account`)}
            className="h-11 px-5 bg-[#074073] hover:bg-[#052d52] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Plus size={16} />
            <span>Onboard Corporate Entity</span>
          </button>
        </div>
      </div>

      {/* QUICK METRICS BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Total Corporates"
          value={corporateAccounts.length}
          subtext="Active institutional clients"
          icon={Building2}
          color="bg-blue-50 text-[#074073]"
        />
        <MetricCard
          title="Total Institutional Deposits"
          value={`KES ${corporateAccounts.reduce((sum, a) => sum + a.totalSavings, 0).toLocaleString()}`}
          subtext="Combined corporate liquidity"
          icon={ShieldCheck}
          color="bg-emerald-50 text-emerald-600"
        />
        <MetricCard
          title="Active Corporate Loans"
          value={`KES ${corporateAccounts.reduce((sum, a) => sum + a.activeLoan, 0).toLocaleString()}`}
          subtext="Outstanding credit portfolio"
          icon={Briefcase}
          color="bg-amber-50 text-amber-600"
        />
        <MetricCard
          title="Pending Approvals"
          value={
            corporateAccounts.filter((a) => a.status === "Pending Verification")
              .length
          }
          subtext="Awaiting board documentation"
          icon={AlertCircle}
          color="bg-rose-50 text-rose-600"
        />
      </div>

      {/* SEARCH AND FILTER CONTROLS */}
      <div className="bg-white border border-slate-200/60 rounded-2xl p-4 shadow-3xs mb-6 flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="relative w-full lg:w-96">
          <Search
            size={16}
            className="absolute left-4 top-3.5 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search by company name, ID, or KRA PIN..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-11 pr-4 h-11 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:bg-white focus:border-[#074073] transition-all"
          />
        </div>

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

      {/* CORPORATE ACCOUNTS TABLE */}
      <div className="bg-white border border-slate-200/60 rounded-2xl shadow-3xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                <th className="py-2 px-6">Corporate Entity</th>
                <th className="py-2 px-6">Industry / Sector</th>
                <th className="py-2 px-6">Primary Contact & Phone</th>
                <th className="py-2 px-6">Total Savings</th>
                <th className="py-2 px-6">Active Loan</th>
                <th className="py-2 px-6">Status</th>
                <th className="py-2 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {paginatedAccounts.length > 0 ? (
                paginatedAccounts.map((account) => (
                  <tr
                    key={account.id}
                    className="hover:bg-slate-50/50 transition-all"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-blue-50 text-[#074073] flex items-center justify-center font-bold text-xs shrink-0">
                          {account.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-[#074073]">
                            {account.name}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            ID: {account.id} • KRA: {account.kraPin}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-600">
                      {account.industry}
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-800">
                        {account.primaryContact}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {account.phone}
                      </p>
                    </td>
                    <td className="py-4 px-6 font-bold text-emerald-600">
                      KES {account.totalSavings.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-700">
                      {account.activeLoan > 0 ? (
                        `KES ${account.activeLoan.toLocaleString()}`
                      ) : (
                        <span className="text-slate-400 font-normal">None</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <StatusBadge status={account.status} />
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/admin/corporate-accounts/${account?.id}`)
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-[#074073] hover:text-white text-slate-700 rounded-lg text-[11px] font-bold transition-all cursor-pointer"
                      >
                        <span>View</span>
                        <ChevronRight size={13} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="py-12 text-center text-slate-400 text-xs"
                  >
                    No corporate accounts match your filter or search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
          <p className="text-[11px] text-slate-400 font-medium">
            Showing{" "}
            <span className="font-bold text-slate-700">
              {paginatedAccounts.length > 0
                ? (currentPage - 1) * itemsPerPage + 1
                : 0}
            </span>{" "}
            to{" "}
            <span className="font-bold text-slate-700">
              {Math.min(currentPage * itemsPerPage, filteredAccounts.length)}
            </span>{" "}
            of{" "}
            <span className="font-bold text-slate-700">
              {filteredAccounts.length}
            </span>{" "}
            corporate entries
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-all cursor-pointer"
            >
              <ChevronLeft size={15} />
            </button>
            <span className="text-xs font-bold text-slate-700 px-2">
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-all cursor-pointer"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   SUPPORTIVE SUB-COMPONENTS
   ========================================================================== */
const MetricCard = ({ title, value, subtext, icon: Icon, color }) => (
  <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-3xs flex items-center justify-between">
    <div className="space-y-1">
      <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
        {title}
      </p>
      <p className="text-xl font-black text-[#074073] tracking-tight">
        {value}
      </p>
      <p className="text-[10px] text-slate-400 font-medium">{subtext}</p>
    </div>
    <div
      className={`size-12 rounded-2xl flex items-center justify-center shrink-0 ${color}`}
    >
      <Icon size={22} />
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  let styles = "bg-slate-100 text-slate-600 border-slate-200";
  if (status === "Active")
    styles = "bg-emerald-50 text-emerald-600 border-emerald-200/60";
  if (status === "Pending Verification")
    styles = "bg-amber-50 text-amber-600 border-amber-200/60";
  if (status === "Suspended")
    styles = "bg-rose-50 text-rose-600 border-rose-200/60";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold border ${styles}`}
    >
      {status}
    </span>
  );
};

export default CorporateAccounts;
