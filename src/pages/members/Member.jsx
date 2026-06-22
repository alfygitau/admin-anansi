import React, { useState } from "react";
import {
  User,
  Shield,
  MapPin,
  Users,
  CreditCard,
  Briefcase,
  Mail,
  FileText,
  ArrowLeft,
  Lock,
  Unlock,
  ShieldCheck,
  AlertCircle,
  Building,
  Maximize2,
  Edit,
  EyeOff,
  Eye,
  Coins,
  ChevronDown,
  UserCog,
  FileSpreadsheet,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getMember } from "../../sdk/members/members";
import { useToast } from "../../contexts/ToastProvider";
import { motion, AnimatePresence } from "framer-motion";
import MemberLoader from "../../skeletons/MemberLoader";
import { getMemberLoans } from "../../sdk/loans/loans";

// Helper utility to style loan status indicators dynamically
const getLoanStatusStyles = (status) => {
  const currentStatus = (status || "Active").toLowerCase();
  switch (currentStatus) {
    case "active":
      return "bg-blue-50 text-blue-700 border-blue-100";
    case "cleared":
    case "fully_paid":
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
    case "overdue":
    case "defaulted":
      return "bg-rose-50 text-rose-700 border-rose-100";
    default:
      return "bg-slate-50 text-slate-600 border-slate-200";
  }
};

export default function MemberDetails() {
  const { id } = useParams();
  const [member, setMember] = useState({});
  const { showToast } = useToast();
  const [showImages, setShowImages] = useState(false);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [memberLoans, setMemberLoans] = useState([]);

  const onBack = () => {
    navigate(-1);
  };

  const toggleSuspension = () => {
    setMember((prev) => ({
      ...prev,
      suspended: !prev.suspended,
      status: prev.suspended ? "Active" : "Suspended",
    }));
  };

  const { isFetching } = useQuery({
    queryKey: ["get member", id],
    queryFn: async () => {
      const response = await getMember(id);
      return response?.data?.data;
    },
    onSuccess: (data) => {
      setMember(data);
    },
    onError: (error) => {
      showToast({
        title: "Member processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const { isFetching: fetchingLoans } = useQuery({
    queryKey: ["get member loans", id],
    queryFn: async () => {
      const response = await getMemberLoans(id);
      return response?.data?.data;
    },
    onSuccess: (data) => {
      setMemberLoans(data?.loan_data);
    },
    onError: (error) => {
      showToast({
        title: "Member processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  return (
    <>
      {isFetching ? (
        <MemberLoader />
      ) : (
        <div className="w-full space-y-6 font-sans antialiased text-slate-800">
          {/* 1. ACTION HEADER BAR CONTAINER */}
          <div className="flex justify-between gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/60 pb-6 select-none">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 transition-all cursor-pointer"
              >
                <ArrowLeft size={16} />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-900">
                    {member.firstname} {member.middlename} {member.lastname}
                  </h2>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Registration Date:{" "}
                  {new Date(member.createdAt).toLocaleDateString("en-KE", {
                    dateStyle: "long",
                  })}
                </p>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 h-10 px-4 border border-slate-200 bg-white text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 active:bg-slate-100/80 transition-all cursor-pointer shadow-2xs outline-none focus:border-slate-300 select-none"
              >
                <UserCog size={14} className="text-slate-400" />
                <span>Manage Member</span>
                <ChevronDown
                  size={14}
                  className={`text-slate-400 transition-transform duration-200 ml-0.5 ${isMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setIsMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-200/80 rounded-xl shadow-lg py-1.5 z-40 origin-top-right animate-in fade-in slide-in-from-top-1 duration-150">
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        alert("Redirecting to loan application form...");
                      }}
                      className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 text-left transition-colors cursor-pointer"
                    >
                      <Coins size={14} className="text-[#074073]" />
                      <span>Apply for a Loan</span>
                    </button>
                    <div className="border-t border-slate-100 my-1 mx-2" />
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        toggleSuspension();
                      }}
                      className={`flex w-full items-center gap-2.5 px-3.5 py-2.5 text-xs font-bold text-left transition-colors cursor-pointer ${
                        member.suspended
                          ? "text-emerald-600 hover:bg-emerald-50/40"
                          : "text-rose-600 hover:bg-rose-50/40"
                      }`}
                    >
                      {member.suspended ? (
                        <>
                          <Unlock size={14} className="text-emerald-500" />
                          <span>Lift Suspension</span>
                        </>
                      ) : (
                        <>
                          <Lock size={14} className="text-rose-500" />
                          <span>Suspend Member</span>
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* 2. FIRST ROW: IDENTITY, ADDRESS, AND FINANCIAL PROFILE GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {/* CARD A: CORE IDENTITY PARAMETERS */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xs p-6 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="w-full flex items-center justify-between">
                  <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
                    <User size={14} /> Identity Parameters
                  </h3>
                  <Edit size={14} className="text-slate-400" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs font-medium border-t border-slate-100 pt-3">
                  <ProfileMetaBlock
                    label="Member ID"
                    value={member.public_id}
                  />
                  <ProfileMetaBlock
                    label="First Name"
                    value={member.firstname}
                  />
                  <ProfileMetaBlock
                    label="Middle Name"
                    value={member.middlename}
                  />
                  <ProfileMetaBlock label="Last Name" value={member.lastname} />
                  <ProfileMetaBlock
                    label="Identification"
                    value={`${member.identification_type} — ${member.identification}`}
                  />
                  <ProfileMetaBlock label="KRA PIN" value={member.kraPin} />
                  <ProfileMetaBlock label="Date of Birth" value={member.dob} />
                  <ProfileMetaBlock label="Gender" value={member.gender} />
                  <ProfileMetaBlock
                    label="Mobile Number"
                    value={member.mobileno}
                  />
                  <ProfileMetaBlock
                    label="Email Address"
                    value={member.email}
                  />
                </div>
              </div>
            </div>

            {/* CARD B: ADDRESS REGISTRY */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xs p-6 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="w-full flex items-center justify-between">
                  <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
                    <MapPin size={14} /> Physical Address
                  </h3>
                  <Edit size={14} className="text-slate-400" />
                </div>
                {member?.addresses?.map((addr) => (
                  <div
                    key={addr.id}
                    className="space-y-3.5 border-t border-slate-100 pt-3"
                  >
                    <ProfileMetaBlock
                      label="Citizenship"
                      value={member.citizenship}
                    />
                    <div className="p-3.5 bg-slate-50/70 border border-slate-200/40 rounded-xl">
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wide">
                        Primary Physical Address
                      </p>
                      <p className="text-sm font-bold text-slate-800 capitalize mt-0.5">
                        {addr.physical_address}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-xs font-medium">
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                          Sub-County Node
                        </p>
                        <p className="text-slate-700 font-semibold mt-0.5 capitalize">
                          {addr.subcounty}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                          County Demographics
                        </p>
                        <p className="text-slate-700 font-semibold mt-0.5 capitalize">
                          {addr.county} County
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-4 mt-4 border-t border-slate-50 text-[11px] font-medium text-slate-400 flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-emerald-600" /> Domicile
                coordinates logged successfully
              </div>
            </div>

            {/* CARD C: FINANCIAL PROFILE */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xs p-6 space-y-4 h-full">
              <div className="w-full flex items-center justify-between">
                <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
                  <Briefcase size={14} /> Financial Profile
                </h3>
                <Edit size={14} className="text-slate-400" />
              </div>
              <div className="space-y-4 pt-1 text-xs font-medium">
                <div className="flex items-start gap-2.5">
                  <Briefcase
                    size={14}
                    className="text-slate-400 mt-0.5 shrink-0"
                  />
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wide">
                      Employed Type
                    </p>
                    <p className="text-slate-900 font-bold mt-0.5">
                      {member.employment_type}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Briefcase
                    size={14}
                    className="text-slate-400 mt-0.5 shrink-0"
                  />
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wide">
                      Employment
                    </p>
                    <p className="text-slate-900 font-bold mt-0.5">
                      {member.occupation}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 border-t border-slate-50 pt-3">
                  <Mail size={14} className="text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wide">
                      Contact
                    </p>
                    <p className="text-slate-400 text-[11px] font-normal mt-0.5">
                      {member.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 border-t border-slate-50 pt-3">
                  <Building
                    size={14}
                    className="text-slate-400 mt-0.5 shrink-0"
                  />
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wide">
                      Income
                    </p>
                    <p className="text-slate-900 font-mono font-bold mt-0.5">
                      KES {Number(member.income_range || 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. SECOND ROW: ACCOUNTS AND SECURITY OVERLAY MATRIX */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* FINANCIAL LEDGER ACCOUNTS CARD (SPANS 2 COLS) */}
            <div className="lg:col-span-2 flex">
              <div className="w-full bg-white rounded-2xl border border-slate-200/60 shadow-xs p-6 space-y-4 flex flex-col justify-between h-full">
                <div className="space-y-4 flex-1 flex flex-col">
                  <div className="w-full flex items-center justify-between">
                    <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
                      <CreditCard size={14} /> Financial Accounts
                    </h3>
                  </div>
                  <div className="border border-slate-100 rounded-xl overflow-hidden flex-1 bg-white overflow-x-auto">
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
                        {member?.accounts?.map((acc) => (
                          <tr
                            key={acc.id}
                            onClick={() =>
                              navigate(
                                `/admin/all-members/account/${acc?.id}/${acc?.account_number}`,
                              )
                            }
                            className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                          >
                            <td className="p-3.5 px-4 font-bold text-slate-900">
                              {`${member?.firstname || ""} ${member?.lastname || ""}`.trim()}
                            </td>
                            <td className="p-3.5 px-4 font-bold text-slate-900">
                              {acc.product?.name}
                            </td>
                            <td className="p-3.5 font-mono text-blue-500">
                              {acc.account_number}
                            </td>
                            <td className="p-3.5 text-right font-bold text-slate-900">
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
                </div>
              </div>
            </div>

            {/* SECURITY SCREENING HUB SIDE PANEL */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xs p-6 h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-full flex items-center justify-between">
                  <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
                    <Shield size={14} /> Security
                  </h3>
                </div>
                <div className="space-y-2.5 text-xs font-medium pt-1">
                  <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                    <span className="text-slate-500">Username</span>
                    <span className="font-mono font-bold text-slate-900">
                      {member.username}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                    <span className="text-slate-500">Status</span>
                    <span
                      className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                        member.suspended
                          ? "bg-red-50 text-red-600 border border-red-100"
                          : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                      }`}
                    >
                      {member.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                    <span className="text-slate-500">
                      Authentication Failures
                    </span>
                    <span
                      className={`font-bold ${member.failedLoginAttempts > 0 ? "text-red-600" : "text-slate-700"}`}
                    >
                      {member.failedLoginAttempts} Attempts
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">
                      Communication Channels
                    </span>
                    <div className="flex gap-1.5">
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded-sm ${member.phoneVerified ? "text-emerald-700 bg-emerald-50" : "text-amber-700 bg-amber-50"}`}
                      >
                        SMS
                      </span>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded-sm ${member.emailVerified ? "text-emerald-700 bg-emerald-50" : "text-amber-700 bg-amber-50"}`}
                      >
                        EMAIL
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-50 flex justify-between items-center text-[11px] text-slate-400">
                <span>Last Active Login</span>
                <span className="font-mono text-slate-700 font-semibold">
                  {member.lastLoginAt
                    ? new Date(member.lastLoginAt).toLocaleTimeString("en-KE")
                    : "—"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xs p-6 space-y-4">
            <div className="w-full flex items-center justify-between">
              <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
                <FileSpreadsheet size={14} className="text-[#074073]" /> Member
                Loans
              </h3>
            </div>

            <div className="border border-slate-100 rounded-xl overflow-hidden bg-white overflow-x-auto">
              {memberLoans.length === 0 ? (
                <div className="p-8 text-center flex flex-col items-center justify-center space-y-2 select-none">
                  <FileText size={18} className="text-slate-300" />
                  <p className="text-xs font-bold text-slate-400 italic">
                    This member has no registered loan accounts linked to their
                    profile structure.
                  </p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse table-auto text-xs font-medium">
                  <thead>
                    <tr className="bg-slate-50/70 border-b border-slate-100 text-[12px] text-slate-400 uppercase font-bold tracking-wider">
                      <th className="p-3.5 px-4">Code</th>
                      <th className="p-3.5">Loan Product</th>
                      <th className="p-3.5 text-right">Principal Issued</th>
                      <th className="p-3.5 text-right">Remaining Balance</th>
                      <th className="p-3.5 text-center">Issue Date</th>
                      <th className="p-3.5 text-center">Due Date</th>
                      <th className="p-3.5 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {memberLoans.map((loan) => (
                      <tr
                        key={loan.id}
                        onClick={() =>
                          navigate(`/admin/all-loans/${loan.id}`)
                        }
                        className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                      >
                        <td className="p-3.5 px-4 font-bold text-blue-600 group-hover:underline">
                          {loan.loan_code}
                        </td>
                        <td className="p-3.5">
                          <span className="font-bold text-slate-900 block">
                            {loan.loan_product?.product_name || "Flash Loan"}
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-0.5 lowercase capitalize">
                            Mode: {loan.loan_interval} •{" "}
                            {loan.interest_method?.replace(/_/g, " ")}
                          </span>
                        </td>
                        <td className="p-3.5 text-right font-bold text-slate-900">
                          {loan.currency}{" "}
                          {Number(loan.loan_amount || 0).toLocaleString(
                            undefined,
                            { minimumFractionDigits: 2 },
                          )}
                        </td>
                        <td className="p-3.5 text-right font-black text-[#074073]">
                          {loan.currency}{" "}
                          {Number(loan.loan_Balance || 0).toLocaleString(
                            undefined,
                            { minimumFractionDigits: 2 },
                          )}
                        </td>
                        <td className="p-3.5 text-center text-slate-500">
                          {new Date(loan.loan_date).toLocaleDateString(
                            "en-KE",
                            { dateStyle: "medium" },
                          )}
                        </td>
                        <td className="p-3.5 text-center text-slate-500">
                          {new Date(loan.loan_due_date).toLocaleDateString(
                            "en-KE",
                            { dateStyle: "medium" },
                          )}
                        </td>
                        <td className="p-3.5 text-center">
                          <span
                            className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${getLoanStatusStyles(loan.loan_status)}`}
                          >
                            {loan.loan_status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* 4. THIRD ROW: NEXT OF KIN & LOAN GUARANTEES PROFILE BLOCK */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* NEXT OF KIN PANEL (SPANS 2 COLUMNS) */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/60 shadow-xs p-6 flex flex-col justify-between space-y-4 h-full">
              <div className="space-y-4 flex-1">
                <div className="w-full flex items-center justify-between">
                  <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
                    <Users size={14} /> Next of Kin
                  </h3>
                  <Edit size={14} className="text-slate-400 cursor-pointer" />
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {member?.nextOfKins?.map((kin) => (
                    <div
                      key={kin.id}
                      className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border border-slate-100 bg-slate-50/40 rounded-xl text-xs font-medium items-center"
                    >
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wide">
                          Full Name
                        </p>
                        <p className="text-slate-900 font-bold mt-0.5 truncate">
                          {kin.name || "—"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wide">
                          Relationship
                        </p>
                        <p className="text-slate-600 capitalize mt-0.5 truncate">
                          {kin.relationship || "—"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wide">
                          Phone Number
                        </p>
                        <p className="text-slate-700 font-mono mt-0.5 truncate">
                          {kin.phoneNumber || "—"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wide">
                          Location
                        </p>
                        <p className="text-slate-500 mt-0.5 truncate">
                          {kin.location || "—"}
                        </p>
                      </div>
                    </div>
                  ))}

                  {(!member?.nextOfKins || member?.nextOfKins.length === 0) && (
                    <p className="text-xs text-slate-400 italic py-2 col-span-full">
                      No next of kin records registered.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* LOAN GUARANTEES INFRASTRUCTURE PANEL (1 COLUMN) */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xs p-6 space-y-4 h-full">
              <div className="w-full flex items-center justify-between">
                <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
                  <ShieldCheck size={14} className="text-emerald-600" />{" "}
                  Guarantee Status
                </h3>
              </div>

              <div className="space-y-4 pt-1 text-xs font-medium">
                <div className="flex items-start justify-between border-b border-slate-50 pb-3">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wide">
                      Total Guaranteed
                    </p>
                    <p className="text-slate-400 text-[10px] font-normal mt-0.5">
                      Total money pledged to back other members
                    </p>
                  </div>
                  <span className="font-mono font-bold text-slate-900 text-right shrink-0">
                    KES{" "}
                    {Number(member?.totalGuaranteed || 0).toLocaleString(
                      undefined,
                      { minimumFractionDigits: 2 },
                    )}
                  </span>
                </div>

                <div className="flex items-start justify-between border-b border-slate-50 pb-3">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wide">
                      Active Risk Exposure
                    </p>
                    <p className="text-slate-400 text-[10px] font-normal mt-0.5">
                      Remaining balance on loans currently backed
                    </p>
                  </div>
                  <span className="font-mono font-bold text-rose-600 text-right shrink-0">
                    KES{" "}
                    {Number(
                      member?.totalOutstandingExposure || 0,
                    ).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex items-start justify-between pt-1">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wide">
                      Available Guarantee Limit
                    </p>
                    <p className="text-slate-400 text-[10px] font-normal mt-0.5">
                      Remaining capacity to guarantee new loans
                    </p>
                  </div>
                  <span className="font-mono font-bold text-emerald-600 text-right shrink-0">
                    KES{" "}
                    {Number(
                      member?.availableGuaranteePotential || 0,
                    ).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 5. FOURTH ROW: EXPANDABLE KYC IMAGE GALLERY SYSTEM */}
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xs p-6">
            <div
              className="w-full flex items-center justify-between cursor-pointer group select-none"
              onClick={() => setShowImages(!showImages)}
            >
              <div className="space-y-1">
                <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
                  <FileText size={14} /> ID Images & KYC Documents
                </h3>
                {!showImages && (
                  <p className="text-[11px] text-slate-400 font-medium pl-5">
                    Identity documents are hidden by default for privacy. Click
                    to reveal.
                  </p>
                )}
              </div>

              <button
                className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl transition-all ${showImages ? "bg-slate-100 text-slate-600 hover:bg-slate-200" : "bg-blue-50 text-[#074073] hover:bg-blue-100"}`}
              >
                {showImages ? (
                  <>
                    <EyeOff size={14} /> Hide Documents
                  </>
                ) : (
                  <>
                    <Eye size={14} /> View Documents
                  </>
                )}
              </button>
            </div>

            <AnimatePresence>
              {showImages && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 mt-2 border-t border-slate-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <KYCDocLarge
                        label="National Identity Card (Front View Asset)"
                        url={member.id_front_image}
                      />
                      <KYCDocLarge
                        label="National Identity Card (Reverse View Asset)"
                        url={member.id_back_image}
                      />
                      <KYCDocLarge
                        label="System Onboarding Selfie Biometric"
                        url={member.selfie_image}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-5 mt-6">
                      <KYCLabelOnlyFallback
                        label="International Passport Secure Book"
                        checked={member.passport_image}
                      />
                      <KYCLabelOnlyFallback
                        label="National Regulatory Driving License Document"
                        checked={member.driving_license_image}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </>
  );
}

const ProfileMetaBlock = ({ label, value, title, isMono = false }) => (
  <div className="space-y-0.5" title={title}>
    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
      {label}
    </p>
    <p
      className={`text-slate-800 font-semibold ${isMono ? "font-mono truncate text-[11px] bg-slate-50 p-1.5 rounded-lg border border-slate-100 mt-1" : "truncate text-xs"}`}
    >
      {value || "Not Documented"}
    </p>
  </div>
);

const KYCDocLarge = ({ label, url }) => (
  <div className="flex flex-col space-y-2 group border border-slate-100 p-3 rounded-xl bg-slate-50/40 hover:border-slate-200 transition-colors">
    <div className="w-full aspect-[4/3] bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center relative shadow-inner border border-slate-200/60">
      {url ? (
        <>
          <img
            src={url}
            alt={label}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300 ease-out"
          />
          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
            <button
              onClick={() => window.open(url, "_blank")}
              className="p-2 bg-white/90 rounded-lg text-slate-800 hover:bg-white text-xs font-bold shadow flex items-center gap-1.5 transition-transform translate-y-2 group-hover:translate-y-0 duration-300 cursor-pointer"
            >
              <Maximize2 size={13} /> Inspect Asset
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center space-y-1 text-slate-300 select-none">
          <AlertCircle size={20} />
          <span className="text-[11px] font-medium italic">
            Asset records empty
          </span>
        </div>
      )}
    </div>
    <span className="text-[11px] font-bold text-slate-600 tracking-tight text-center block pt-0.5">
      {label}
    </span>
  </div>
);

const KYCLabelOnlyFallback = ({ label, checked }) => (
  <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200/60 bg-white shadow-3xs text-xs font-medium text-slate-600">
    <span>{label}</span>
    {checked ? (
      <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
        <ShieldCheck size={12} /> Verified
      </span>
    ) : (
      <span className="flex items-center gap-1 text-[10px] text-slate-400 font-bold bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
        <AlertCircle size={12} /> Missing
      </span>
    )}
  </div>
);
