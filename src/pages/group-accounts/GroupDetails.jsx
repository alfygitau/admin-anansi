import React, { useState } from "react";
import {
  Users,
  Building2,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Wallet,
  FileText,
  UserPlus,
  UserCheck,
  Plus,
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  DollarSign,
  PieChart,
  Award,
  Lock,
  CreditCard,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AddGroupMember from "../../components/groups/AddMember";
import AddGroupLeader from "../../components/groups/AddLeader";
import AddGroupRule from "../../components/groups/AddRule";

const GroupDetails = ({
  groupData,
  onAddMember,
  onAddLeader,
  onAddRule,
  onUploadDocument,
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const onBack = () => {
    navigate(-1);
  };

  // Fallback default mock data if none is passed via props
  const group = groupData || {
    group_id: "GRP-2026-4819",
    groupName: "Umoja Investment Chama",
    groupType: "Investment Chama",
    registrationNumber: "SOC/8923/2025",
    officialEmail: "umoja.investment@gmail.com",
    groupPhone: "+254 712 345678",
    county: "Nairobi",
    subCounty: "Westlands",
    physicalAddress: "Anniversary Towers, 4th Floor, Kimathi Street",
    signatoryRule: "Any 2 of 3 Mandated Signatories",
    monthlyContribution: 10000,
    status: "Active",
    accounts: [
      {
        id: "ACC-001",
        firstname: "Umoja Main",
        lastname: "Savings Pool",
        product: { name: "Savings" },
        account_number: "SAV-2026-9011",
        balance: 980000.0,
        status: "Active",
      },
      {
        id: "ACC-002",
        firstname: "Umoja Capital",
        lastname: "Shares Wallet",
        product: { name: "Equity Shares" },
        account_number: "SHR-2026-4422",
        balance: 470000.0,
        status: "Active",
      },
    ],
    loans: [
      {
        id: "LON-101",
        firstname: "Umoja Emergency",
        lastname: "Credit Facility",
        product: { name: "Revolving Emergency Loan" },
        account_number: "LON-2026-1188",
        balance: 250000.0,
        status: "Disbursed",
      },
      {
        id: "LON-102",
        firstname: "Umoja Development",
        lastname: "Project Advance",
        product: { name: "Asset Acquisition Loan" },
        account_number: "LON-2026-2244",
        balance: 600000.0,
        status: "Active",
      },
    ],
    // Financials
    financials: {
      totalPortfolio: 1450000,
      totalSavings: 980000,
      totalSharesValue: 470000,
      activeLoansTotal: 250000,
      reserveFund: 50000,
    },
    // Rules
    rules: [
      {
        id: "R-1",
        title: "Monthly Contribution Deadline",
        description:
          "Contributions must be remitted on or before the 5th day of every calendar month.",
      },
      {
        id: "R-2",
        title: "Late Penalty Fee",
        description:
          "A fine of KES 500 is applied automatically for any contributions sent after the 5th.",
      },
      {
        id: "R-3",
        title: "Emergency Loan Interest",
        description:
          "Internal emergency loans attract a flat interest rate of 5% per month repayable within 60 days.",
      },
    ],
    // Attachments / Documents
    attachments: [
      {
        id: "DOC-1",
        name: "Certificate_of_Registration.pdf",
        size: "2.4 MB",
        uploadDate: "12 Jan 2025",
        type: "Legal",
      },
      {
        id: "DOC-2",
        name: "Group_Constitution_Signed.pdf",
        size: "4.1 MB",
        uploadDate: "14 Jan 2025",
        type: "Governance",
      },
      {
        id: "DOC-3",
        name: "KRA_PIN_Certificate.pdf",
        size: "1.1 MB",
        uploadDate: "20 Jan 2025",
        type: "Tax & Compliance",
      },
    ],
    // Linked Members
    members: [
      {
        id: "M-01",
        name: "Amina Juma",
        role: "Chairperson",
        phone: "+254 721 111222",
        savings: 150000,
        shares: 80000,
        status: "Active",
      },
      {
        id: "M-02",
        name: "David Mwangi",
        role: "Treasurer",
        phone: "+254 733 444555",
        savings: 140000,
        shares: 75000,
        status: "Active",
      },
      {
        id: "M-03",
        name: "Faith Cheptoo",
        role: "Secretary",
        phone: "+254 722 999888",
        savings: 130000,
        shares: 70000,
        status: "Active",
      },
      {
        id: "M-04",
        name: "Brian Otieno",
        role: "Member",
        phone: "+254 711 234567",
        savings: 90000,
        shares: 40000,
        status: "Active",
      },
      {
        id: "M-05",
        name: "Grace Wanjiku",
        role: "Member",
        phone: "+254 700 876543",
        savings: 95000,
        shares: 45000,
        status: "Active",
      },
    ],
    // Leadership team subset
    leadership: [
      {
        position: "Chairperson",
        name: "Amina Juma",
        phone: "+254 721 111222",
        email: "amina.juma@gmail.com",
      },
      {
        position: "Treasurer",
        name: "David Mwangi",
        phone: "+254 733 444555",
        email: "david.mwangi@gmail.com",
      },
      {
        position: "Secretary",
        name: "Faith Cheptoo",
        phone: "+254 722 999888",
        email: "faith.cheptoo@gmail.com",
      },
    ],
  };
  const [openAddMember, setOpenAddMember] = useState(false);
  const [openAddLeader, setOpenAddLeader] = useState(false);
  const [openAddRule, setOpenAddRule] = useState(false);
  const [step, setStep] = useState("form");
  const [leaderStep, setLeaderStep] = useState("form");
  const [ruleStep, setRuleStep] = useState("form");
  const [formData, setFormData] = useState({
    memberId: "",
    memberName: "",
    groupRole: "Regular Member",
    monthlyCommitment: "",
  });
  const [ruleData, setRuleData] = useState({
    ruleTitle: "",
    ruleCategory: "Contributions & Savings",
    description: "",
  });

  const [leaderData, setLeaderData] = useState({
    memberId: "",
    name: "",
    position: "",
    phone: "",
    email: "",
  });

  return (
    <>
      <AddGroupMember
        isOpen={openAddMember}
        onClose={() => setOpenAddMember(false)}
        formData={formData}
        setFormData={setFormData}
        step={step}
        setStep={setStep}
      />

      <AddGroupLeader
        isOpen={openAddLeader}
        onClose={() => setOpenAddLeader(false)}
        step={leaderStep}
        setStep={setLeaderStep}
        formData={leaderData}
        setFormData={setLeaderData}
      />

      <AddGroupRule
        isOpen={openAddRule}
        onClose={() => setOpenAddRule(false)}
        step={ruleStep}
        setStep={setRuleStep}
        formData={ruleData}
        setFormData={setRuleData}
      />

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
                    {group.group_id}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md border ${
                      group.status === "Active"
                        ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                        : "bg-amber-50 border-amber-100 text-amber-600"
                    }`}
                  >
                    <span
                      className={`size-1.5 rounded-full ${group.status === "Active" ? "bg-emerald-500" : "bg-amber-500"}`}
                    />
                    {group.status}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#074073] tracking-tight mt-1">
                  {group.groupName}
                </h1>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {group.groupType} • Registered under{" "}
                  <strong className="text-slate-700">
                    {group.registrationNumber || "Unregistered Shell"}
                  </strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => setOpenAddMember(true)}
                className="px-4 h-11 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <UserPlus size={16} className="text-[#074073]" />
                <span>Add Member</span>
              </button>
              <button
                onClick={() => setOpenAddLeader(true)}
                className="px-4 h-11 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <Award size={16} className="text-[#074073]" />
                <span>Add Leader</span>
              </button>
            </div>
          </div>

          {/* SECTION CARDS CONTAINER */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. GROUP DETAILS SECTION */}
            <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h2 className="text-sm font-bold text-[#074073] uppercase tracking-wider flex items-center gap-2">
                    <Building2 size={16} />
                    Group Details & Legal Profile
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase">
                      Group Name
                    </span>
                    <p className="text-xs font-bold text-slate-800 mt-1">
                      {group.groupName}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase">
                      Group Classification
                    </span>
                    <p className="text-xs font-bold text-slate-800 mt-1">
                      {group.groupType}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase">
                      Registration / Certificate Number
                    </span>
                    <p className="text-xs font-bold font-mono text-slate-800 mt-1">
                      {group.registrationNumber || "Not Provided"}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase">
                      Monthly Contribution Target
                    </span>
                    <p className="text-xs font-bold text-slate-800 mt-1">
                      KES {Number(group.monthlyContribution).toLocaleString()}
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
                    Contact & Location Details
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase">
                      Official Email
                    </span>
                    <p className="text-xs font-bold text-slate-800 mt-1 flex items-center gap-1.5 truncate">
                      <Mail size={14} className="text-slate-400 shrink-0" />
                      <span className="truncate">{group.officialEmail}</span>
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase">
                      Group Phone Number
                    </span>
                    <p className="text-xs font-bold text-slate-800 mt-1 flex items-center gap-1.5">
                      <Phone size={14} className="text-slate-400 shrink-0" />
                      {group.groupPhone}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase">
                      County & Sub-County
                    </span>
                    <p className="text-xs font-bold text-slate-800 mt-1">
                      {group.county}, {group.subCounty}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase">
                      Physical Office Address
                    </span>
                    <p className="text-xs font-bold text-slate-800 mt-1 truncate">
                      {group.physicalAddress}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. LEADERSHIP TEAM SECTION */}
            <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h2 className="text-sm font-bold text-[#074073] uppercase tracking-wider flex items-center gap-2">
                    <Award size={16} />
                    Leadership Team
                  </h2>
                  <button
                    onClick={()=>setOpenAddLeader(true)}
                    className="text-xs font-bold text-[#074073] hover:underline cursor-pointer"
                  >
                    + Add Leader
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                  {group.leadership?.map((leader, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col space-y-1"
                    >
                      <span className="text-[10px] font-bold text-[#074073] uppercase">
                        {leader.position}
                      </span>
                      <span className="text-xs font-extrabold text-slate-800 truncate">
                        {leader.name}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {leader.phone}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. GOVERNANCE & RULES SECTION */}
            <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h2 className="text-sm font-bold text-[#074073] uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck size={16} />
                    Governance & Rules
                  </h2>
                  <button
                    onClick={() => setOpenAddRule(true)}
                    className="text-xs font-bold text-[#074073] hover:underline cursor-pointer"
                  >
                    + Add Rule
                  </button>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-2xl">
                    <span className="text-[10px] font-bold text-[#074073] uppercase">
                      Withdrawal Signatory Mandate
                    </span>
                    <p className="text-xs font-bold text-slate-800 mt-0.5">
                      {group.signatoryRule}
                    </p>
                  </div>

                  {group.rules?.slice(0, 1).map((rule) => (
                    <div
                      key={rule.id}
                      className="p-3 bg-slate-50 border border-slate-100 rounded-2xl space-y-0.5"
                    >
                      <h4 className="text-xs font-bold text-slate-800">
                        {rule.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed truncate">
                        {rule.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 space-y-4 md:col-span-2">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h2 className="text-sm font-bold text-[#074073] uppercase tracking-wider flex items-center gap-2">
                  <CreditCard size={16} />
                  Active Group Accounts
                </h2>
              </div>

              <div className="pt-2">
                {group?.accounts && group?.accounts?.length > 0 ? (
                  <div className="border border-slate-100 rounded-xl overflow-hidden flex-1 md:col-span-2 bg-white overflow-x-auto">
                    <table className="w-full text-left border-collapse table-auto text-xs font-medium min-w-[500px]">
                      <thead>
                        <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                          <th className="p-3.5 px-4">Account Portfolio</th>
                          <th className="p-3.5 px-4">Product Name</th>
                          <th className="p-3.5">Account Number</th>
                          <th className="p-3.5 text-right">Account Balance</th>
                          <th className="p-3.5 text-center">State</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {group?.accounts?.map((acc) => (
                          <tr
                            key={acc.id}
                            onClick={() =>
                              navigate(
                                `/admin/all-members/account/${acc?.id}/${acc?.account_number}`,
                              )
                            }
                            className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                          >
                            <td className="p-3.5 px-4 font-bold text-primary">
                              {`${acc?.firstname || ""} ${acc?.lastname || ""}`.trim()}
                            </td>
                            <td className="p-3.5 px-4 font-bold text-primary">
                              {acc.product?.name}
                            </td>
                            <td className="p-3.5 font-mono text-blue-500">
                              {acc.account_number}
                            </td>
                            <td className="p-3.5 text-right font-bold text-primary">
                              KES {Number(acc.balance || 0).toFixed(2)}
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
                  /* USER FRIENDLY EMPTY STATE */
                  <div className="border border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-white flex-1 min-h-[320px] md:col-span-2 select-none">
                    <div className="relative mb-4 flex items-center justify-center">
                      <div className="absolute w-14 h-14 bg-slate-100 rounded-full animate-pulse" />
                      <div className="relative w-12 h-12 bg-white border border-slate-200 shadow-2xs rounded-xl flex items-center justify-center text-slate-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="max-w-xs space-y-1">
                      <h4 className="text-sm font-bold text-slate-800 tracking-tight">
                        No accounts created yet
                      </h4>
                      <p className="text-slate-400 text-[11px] leading-relaxed font-medium">
                        This group doesn't have any savings, shares, or loan
                        accounts linked to their profile yet.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 space-y-4 md:col-span-2">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h2 className="text-sm font-bold text-[#074073] uppercase tracking-wider flex items-center gap-2">
                  <CreditCard size={16} />
                  Active Group Loan Facilities
                </h2>
              </div>

              <div className="pt-2">
                {group?.loans && group?.loans?.length > 0 ? (
                  <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white overflow-x-auto">
                    <table className="w-full text-left border-collapse table-auto text-xs font-medium min-w-[500px]">
                      <thead>
                        <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                          <th className="p-3.5 px-4">Loan Portfolio</th>
                          <th className="p-3.5 px-4">Loan Product Name</th>
                          <th className="p-3.5">Loan Account No.</th>
                          <th className="p-3.5 text-right">
                            Outstanding Balance
                          </th>
                          <th className="p-3.5 text-center">State</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {group?.loans?.map((loan) => (
                          <tr
                            key={loan.id}
                            className="hover:bg-slate-50/50 transition-colors cursor-pointer"
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
                      No active loans found
                    </h4>
                    <p className="text-slate-400 text-[11px] leading-relaxed font-medium mt-1">
                      This group doesn't have any credit lines or active loan
                      accounts running under their portfolio.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 5. LINKED MEMBERS SECTION (Full Width or Grid Row) */}
            <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 space-y-4 md:col-span-2">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h2 className="text-sm font-bold text-[#074073] uppercase tracking-wider flex items-center gap-2">
                  <Users size={16} />
                  Linked Members ({group.members?.length || 0})
                </h2>
                <button
                  onClick={() => setOpenAddMember(true)}
                  className="h-8 px-3 bg-[#074073] hover:bg-[#052d52] text-white text-[11px] font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Add Member</span>
                </button>
              </div>

              <div className="overflow-x-auto pt-2">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase">
                      <th className="py-3 px-3">Member Name</th>
                      <th className="py-3 px-3">Role</th>
                      <th className="py-3 px-3">Savings</th>
                      <th className="py-3 px-3">Shares</th>
                      <th className="py-3 px-3 text-right">Contact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {group.members?.map((m) => (
                      <tr key={m.id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-3 font-bold text-xs text-slate-800">
                          {m.name}
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                            {m.role}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-xs font-semibold text-slate-700">
                          KES {Number(m.savings).toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-xs font-semibold text-slate-700">
                          KES {Number(m.shares).toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-right text-xs font-medium text-slate-500">
                          {m.phone}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 6. ATTACHMENTS & DOCUMENTS SECTION (Full Width or Grid Row) */}
            <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 space-y-4 md:col-span-2">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h2 className="text-sm font-bold text-[#074073] uppercase tracking-wider flex items-center gap-2">
                  <FileText size={16} />
                  Group Documents & Attachments
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
                {group.attachments?.map((doc) => (
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
                    <button className="text-slate-400 hover:text-[#074073] p-1.5 rounded-lg hover:bg-white transition-all cursor-pointer">
                      <ExternalLink size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default GroupDetails;
