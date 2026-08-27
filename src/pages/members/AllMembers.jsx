import React, { useState } from "react";
import {
  UserPlus,
  Search,
  Filter,
  Download,
  Building,
  Mail,
  Smartphone,
  Briefcase,
  Eye,
  MapPin,
  Users2,
  X,
  User,
  Users,
  TrendingUp,
  UserCheck,
  UserX,
} from "lucide-react";
import MembersFilter from "../../components/filters/MembersFilter";
import { useQuery } from "react-query";
import { useToast } from "../../contexts/ToastProvider";
import { getMembers } from "../../sdk/members/members";
import Pagination from "../../components/pagination/Pagination";
import { useNavigate } from "react-router-dom";

export default function AllMembers() {
  const [members, setMembers] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedMember, setSelectedMember] = useState(null);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    q: "",
    status: "",
    location: "",
    county: "",
    subcounty: "",
    fromDate: "",
    toDate: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showCreateProfile, setShowCreateProfile] = useState(false);
  const [showReviewProfile, setShowReviewProfile] = useState(false);
  const [showReviewIncome, setShowReviewIncome] = useState(false);
  const [showReviewAddress, setShowReviewAddress] = useState(false);
  const [showReviewScanDetails, setShowReviewScanDetails] = useState(false);
  const [showEditScanDetails, setShowEditScanDetails] = useState(false);
  const [showVerifyIdentity, setShowVerifyIdentity] = useState(false);
  const [showCreateAddress, setShowCreateAddress] = useState(false);
  const [showCreateKin, setShowCreateKin] = useState(false);
  const [showReviewKin, setShowReviewKin] = useState(false);
  const [showIncomeDetails, setShowIncomeDetails] = useState(false);
  const [showUploadSelfie, setShowUploadSelfie] = useState(false);
  const [formData, setFormData] = useState({
    username: "Alfred",
    email: "alfy@gmail.com",
    mobileno: "0754360450",

    firstname: "Alfred",
    middlename: "Kariuki",
    lastname: "Gitau",
    identification_type: "National ID",
    identification: "3006780",
    gender: "Male",
    dob: "29/12/1992",

    country: "Kenya",
    county: "Nakuru",
    subcounty: "Bahati",
    physical_address: "Subukia",

    employment_type: "IT",
    occupation: "Software Engineer",
    income: "200000",
    kra_pin: "A123456789G",

    fullname: "Margret Maina",
    relationship: "Wife",
    location: "Bahati",
    phone: "0780400400",
    date_of_birth: "29/12/1990",
  });

  const { isFetching } = useQuery({
    queryKey: [
      "get members",
      filters?.page,
      filters?.limit,
      filters.status,
      filters.q,
      filters.county,
      filters.subcounty,
      filters?.location,
      filters?.fromDate,
      filters?.toDate,
    ],
    queryFn: async () => {
      const response = await getMembers(
        filters?.page,
        filters?.limit,
        filters.status,
        filters.q,
        filters.county,
        filters.subcounty,
        filters?.location,
        filters?.fromDate,
        filters?.toDate,
      );
      return response.data?.data;
    },
    onSuccess: (data) => {
      setMembers(data?.items);
      setFilters((prev) => ({
        ...prev,
        page: data.meta.currentPage,
        limit: data.meta.itemsPerPage,
      }));
      setTotalItems(data.meta.totalItems);
    },
    onError: (error) => {
      showToast({
        title: "Members processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const handlePageChange = (page) => {
    setFilters((prev) => ({
      ...prev,
      page: page,
    }));
  };

  const handleOnItemsPageChange = (limit) => {
    setFilters((prev) => ({
      ...prev,
      limit: limit,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      q: "",
      status: "",
      county: "",
      subcounty: "",
      location: "",
      fromDate: "",
      toDate: "",
      page: 1,
      limit: 10,
    });
  };

  const data = {
    totalMembers: 12480,
    totalMembersGrowth: "+8.2%",
    activeMembers: 10850,
    activePercentage: "86.9%",
    pendingKyc: 412,
    pendingActionRequired: true,
    dormantMembers: 1218,
    dormantRate: "9.7%",
  };

  return (
    <>
      <MembersFilter
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        setFilters={setFilters}
      />

      <div className="w-full space-y-5 antialiased text-slate-800">
        {/* HEADER CONTROLS BANNER */}
        <div className="flex justify-between gap-4 sm:flex-col sm:items-start sm:justify-between border-b border-slate-200/60 pb-2 select-none">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-primary">
              Members Registry
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Manage onboarding stages, verified communication fields, and
              dynamic ledger account exposures.
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/all-members/add-member")}
            className="sm:w-full flex items-center justify-center gap-2 h-11 px-10 w-fit bg-primary text-white rounded-xl text-xs font-bold shadow-sm hover:bg-slate-800 transition-all cursor-pointer"
          >
            <UserPlus size={15} />
            <span>Add Member</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 antialiased font-sans">
          {/* 1. TOTAL MEMBERS */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-3xs hover:border-slate-300 transition-all duration-200 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Total Members
              </span>
              <div className="size-9 rounded-xl bg-blue-50 border border-blue-100/80 text-[#074073] flex items-center justify-center shrink-0">
                <Users size={16} strokeWidth={2.2} />
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-2xl font-black text-slate-900 tracking-tight font-mono">
                {data.totalMembers?.toLocaleString()}
              </p>
            </div>
          </div>

          {/* 2. ACTIVE MEMBERS */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-3xs hover:border-slate-300 transition-all duration-200 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Active Accounts
              </span>
              <div className="size-9 rounded-xl bg-emerald-50 border border-emerald-100/80 text-emerald-600 flex items-center justify-center shrink-0">
                <UserCheck size={16} strokeWidth={2.2} />
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-2xl font-black text-slate-900 tracking-tight font-mono">
                {data.activeMembers?.toLocaleString()}
              </p>
            </div>
          </div>

          {/* 3. PENDING KYC VERIFICATION */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-3xs hover:border-slate-300 transition-all duration-200 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Pending Onboarding
              </span>
              <div className="size-9 rounded-xl bg-amber-50 border border-amber-100/80 text-amber-600 flex items-center justify-center shrink-0">
                <UserPlus size={16} strokeWidth={2.2} />
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-2xl font-black text-slate-900 tracking-tight font-mono">
                {data.pendingKyc?.toLocaleString()}
              </p>
            </div>
          </div>

          {/* 4. DORMANT / SUSPENDED */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-3xs hover:border-slate-300 transition-all duration-200 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Dormant / Inactive
              </span>
              <div className="size-9 rounded-xl bg-rose-50 border border-rose-100/80 text-rose-600 flex items-center justify-center shrink-0">
                <UserX size={16} strokeWidth={2.2} />
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-2xl font-black text-slate-900 tracking-tight font-mono">
                {data.dormantMembers?.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* FILTER & LOOKUP UTILITIES */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-2xs p-3.5 flex justify-between gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full md:w-80">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={filters?.q}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  q: e.target.value,
                }))
              }
              placeholder="Search by ID, public code or name string..."
              className="w-full h-10 pl-9 pr-4 bg-slate-50 border border-slate-200/60 rounded-xl text-xs font-medium outline-none transition-all focus:bg-white focus:border-primary placeholder:text-slate-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-1.5 h-10 px-4 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all"
            >
              <Filter size={13} /> Filter
            </button>
            <button className="flex items-center gap-1.5 h-10 px-4 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all">
              <Download size={13} /> Export
            </button>
          </div>
        </div>

        {/* HIGH DENSITY CORE MEMBERS LEDGER */}
        <div className="w-full bg-white rounded-3xl border border-slate-200/60 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse table-auto">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200/60 text-[10px] font-bold text-slate-400 uppercase tracking-widest select-none">
                  <th className="py-4.5 px-6">Profile & Identity Meta</th>
                  <th className="py-4.5 px-6">Contact Channels</th>
                  <th className="py-4.5 px-6">Employment & Income</th>
                  <th className="py-4.5 px-6">Physical Address</th>
                  <th className="py-4.5 px-6">Status</th>
                  <th className="py-4.5 px-6 text-right pr-8">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs tracking-tight">
                {isFetching ? (
                  [...Array(10)].map((_, index) => (
                    <tr
                      key={`skeleton-${index}`}
                      className="border-b border-slate-100 animate-pulse"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="size-9 rounded-xl bg-slate-200 shrink-0" />
                          <div className="flex flex-col space-y-2">
                            <div className="h-3 w-16 bg-slate-200 rounded" />
                            <div className="h-4 w-32 bg-slate-200 rounded" />
                          </div>
                        </div>
                      </td>

                      {/* Col 2: Communication */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col space-y-2">
                          <div className="h-3 w-28 bg-slate-200 rounded" />
                          <div className="h-3 w-36 bg-slate-200 rounded" />
                        </div>
                      </td>

                      {/* Col 3: Occupation */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col space-y-2">
                          <div className="h-3 w-24 bg-slate-200 rounded" />
                          <div className="h-3 w-20 bg-slate-200 rounded" />
                        </div>
                      </td>

                      {/* Col 4: Address */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col space-y-2">
                          <div className="h-3 w-32 bg-slate-200 rounded" />
                          <div className="h-3 w-24 bg-slate-200 rounded" />
                        </div>
                      </td>

                      {/* Col 5: Status Badge */}
                      <td className="py-4 px-6">
                        <div className="h-5 w-20 bg-slate-200 rounded-md" />
                      </td>

                      {/* Col 6: Action */}
                      <td className="py-4 px-6 text-right pr-8">
                        <div className="size-8 rounded-xl bg-slate-200 ml-auto" />
                      </td>
                    </tr>
                  ))
                ) : members && members.length > 0 ? (
                  members.map((member) => (
                    <tr
                      key={member.id}
                      className="group transition-colors hover:bg-slate-50/40"
                    >
                      {/* Col 1: Identity & Identification Papers */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="size-9 rounded-xl bg-slate-100 border border-slate-200/60 flex items-center justify-center font-bold text-slate-700 text-xs shadow-3xs shrink-0 select-none">
                            {member?.firstname && member?.lastname ? (
                              <>
                                {member.firstname[0].toUpperCase()}
                                {member.lastname[0].toUpperCase()}
                              </>
                            ) : (
                              <User size={16} className="text-slate-400" />
                            )}
                          </div>
                          <div className="flex flex-col space-y-0.5">
                            <span className="font-mono w-fit px-3 text-[9px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded">
                              {member.public_id}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-primary text-sm tracking-tight">
                                {member.firstname} {member.lastname}
                              </span>
                            </div>
                            <span className="text-[11px] text-slate-400 font-medium">
                              {member.identification_type}:{" "}
                              <span className="font-mono text-slate-600 font-semibold">
                                {member.identification}
                              </span>
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Col 2: Communication Verification Gateways */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col space-y-1">
                          <span className="font-medium text-slate-700 flex items-center gap-1">
                            <Smartphone size={11} className="text-slate-400" />{" "}
                            {member.mobileno}
                          </span>
                          <span className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Mail size={11} className="text-slate-400" />{" "}
                            {member.email}
                          </span>
                          <div className="flex gap-2 pt-0.5">
                            <span
                              className={`text-[8px] font-extrabold uppercase tracking-wider px-1 rounded-sm ${member.phoneVerified ? "text-emerald-600 bg-emerald-50" : "text-amber-600 bg-amber-50"}`}
                            >
                              Phone{" "}
                              {member.phoneVerified ? "Verified" : "Unverified"}
                            </span>
                            <span
                              className={`text-[8px] font-extrabold uppercase tracking-wider px-1 rounded-sm ${member.emailVerified ? "text-emerald-600 bg-emerald-50" : "text-amber-600 bg-amber-50"}`}
                            >
                              Email{" "}
                              {member.emailVerified ? "Verified" : "Unverified"}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Col 3: Employment and Economic Level */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col space-y-1">
                          <span className="font-semibold text-slate-800 flex items-center gap-1">
                            <Briefcase size={12} className="text-slate-400" />{" "}
                            {member.occupation}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
                            {member.employment_type} • KES{" "}
                            {Number(member.income_range).toFixed(2)}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex flex-col space-y-0.5">
                          {member.addresses && member.addresses.length > 0 ? (
                            <>
                              <span className="font-semibold text-slate-800">
                                {member.addresses[0].physical_address ||
                                  "No Address Provided"}
                              </span>
                              <span className="text-[10px] text-slate-400 font-medium">
                                {member.addresses[0].subcounty},{" "}
                                {member.addresses[0].county}
                              </span>
                            </>
                          ) : (
                            <span className="text-[10px] italic text-slate-300">
                              Not registered
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Col 5: Lifecycle Security Flag Badges */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col space-y-1.5">
                          <span
                            className={`inline-flex items-center gap-1.5 text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md border w-fit ${
                              member.suspended
                                ? "bg-red-50 border-red-100 text-red-600"
                                : "bg-emerald-50 border-emerald-100 text-emerald-600"
                            }`}
                          >
                            <span
                              className={`size-1 rounded-full ${member.suspended ? "bg-red-500" : "bg-emerald-500"}`}
                            />
                            {member.status}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">
                            Stage:{" "}
                            <span className="capitalize text-slate-600 font-semibold">
                              {member.onboarding_stage}
                            </span>
                          </span>
                        </div>
                      </td>

                      {/* Col 6: Actions Node */}
                      <td className="py-4 px-6 text-right pr-8">
                        <button
                          onClick={() =>
                            navigate(`/admin/all-members/${member?.id}`)
                          }
                          className="size-8 rounded-xl border border-slate-200/60 inline-flex items-center justify-center text-slate-400 hover:text-primary hover:bg-slate-50 hover:border-slate-300 transition-all shadow-3xs bg-white cursor-pointer"
                          title="Inspect Profile Dossier"
                        >
                          <Eye size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-36 px-6 text-center select-none"
                    >
                      <div className="flex flex-col items-center justify-center max-w-sm mx-auto space-y-4">
                        <div className="w-14 h-14 bg-slate-50 border border-slate-200/60 rounded-2xl flex items-center justify-center text-slate-400 shadow-3xs">
                          <Search
                            size={22}
                            strokeWidth={1.75}
                            className="text-slate-300"
                          />
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-sm font-bold text-primary tracking-tight">
                            No members found
                          </h3>
                          <p className="text-xs text-slate-400 font-medium leading-relaxed">
                            We couldn't find any registry entries matching your
                            current search terms or advanced drawer filter
                            parameters.
                          </p>
                        </div>
                        {/* Optional clear fallback triggers if your state setter handlers are passed down */}
                        <button
                          type="button"
                          onClick={() => {
                            if (typeof handleResetFilters === "function") {
                              handleResetFilters();
                            }
                          }}
                          className="h-9 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition-all active:scale-95 cursor-pointer"
                        >
                          Clear Active Filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <Pagination
              currentPage={filters?.page}
              totalItems={totalItems}
              itemsPerPage={filters?.limit}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleOnItemsPageChange}
            />
          </div>
        </div>

        {/* DETAILED MEMBER PROFILE IN-DEPTH SIDE DRAWER */}
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex justify-end select-none">
            <div
              className="absolute inset-0 bg-primary/15  transition-opacity duration-200"
              onClick={() => setSelectedMember(null)}
            />
            <div className="fixed top-0 right-0 h-screen w-full max-w-lg bg-white shadow-2xl border-l border-slate-200/80 p-8 overflow-y-auto flex flex-col justify-between animate-in slide-in-from-right duration-200 z-50">
              <div className="space-y-6">
                {/* Header Configurations */}
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 border border-primary/10 px-2 py-0.5 rounded-md">
                      Compliance Profile Dossier
                    </span>
                    <h3 className="text-lg font-bold text-primary tracking-tight pt-1">
                      {selectedMember.firstname} {selectedMember.lastname} (
                      {selectedMember.public_id})
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      Internal ID Reference: {selectedMember.id}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="w-8 h-8 flex-shrink-0 !rounded-full bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors flex items-center justify-center text-slate-500 cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="border-b border-slate-100" />

                {/* SECTION A: DETAILED ACCOUNT PARAMETERS */}
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Building size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      Taxation & Identity Protocols
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div>
                      <p className="text-[9px] uppercase font-bold text-slate-400">
                        KRA Tax PIN
                      </p>
                      <p className="font-mono text-slate-700 font-bold mt-0.5">
                        {selectedMember.kraPin || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase font-bold text-slate-400">
                        Date of Birth
                      </p>
                      <p className="font-semibold text-slate-700 mt-0.5">
                        {selectedMember.dob}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase font-bold text-slate-400">
                        Citizenship
                      </p>
                      <p className="font-semibold text-slate-700 mt-0.5">
                        {selectedMember.citizenship}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase font-bold text-slate-400">
                        Last Session Ping
                      </p>
                      <p className="font-semibold text-slate-700 mt-0.5">
                        {new Date(selectedMember.lastLoginAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* SECTION B: GEOGRAPHIC LANDMARKS AND PHYSICAL ADDRESSES */}
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <MapPin size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      Registered Addresses Structure
                    </span>
                  </div>
                  {selectedMember.addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="p-4 bg-slate-50/70 border border-slate-200/40 rounded-2xl text-xs font-medium space-y-1"
                    >
                      <p className="text-slate-800 font-bold capitalize">
                        {addr.physical_address}
                      </p>
                      <p className="text-slate-400 text-[11px]">
                        County: {addr.county} • Sub-County: {addr.subcounty}
                      </p>
                    </div>
                  ))}
                </div>

                {/* SECTION C: NEXT OF KIN ESCROW DIRECTORY */}
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Users2 size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      Next of Kin Contingency Handlers (
                      {selectedMember.nextOfKins.length})
                    </span>
                  </div>
                  {selectedMember.nextOfKins.map((kin) => (
                    <div
                      key={kin.id}
                      className="p-4 border border-slate-100 rounded-2xl bg-slate-50/40 grid grid-cols-2 gap-y-2 text-xs font-medium"
                    >
                      <div>
                        <p className="text-[9px] text-slate-400 uppercase">
                          Legal Name
                        </p>
                        <p className="text-slate-800 font-bold">{kin.name}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-400 uppercase">
                          Relationship Node
                        </p>
                        <p className="text-slate-600 capitalize">
                          {kin.relationship}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-400 uppercase">
                          Contact Vector
                        </p>
                        <p className="text-slate-700 font-mono">
                          {kin.phoneNumber}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-400 uppercase">
                          Settlement Demographics
                        </p>
                        <p className="text-slate-500">{kin.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Downstream Enforcement Action Toolbar Area */}
              <div className="pt-4 border-t border-slate-100 flex gap-3">
                <button className="flex-1 h-11 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition-all">
                  Edit Core Parameters
                </button>
                {selectedMember.suspended ? (
                  <button className="flex-1 h-11 bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold rounded-xl transition-all">
                    Revoke Suspension Lock
                  </button>
                ) : (
                  <button className="flex-1 h-11 bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 text-xs font-bold rounded-xl transition-all">
                    Enforce Security Freeze
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );

  const MemberStatsSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={`member-stat-skeleton-${index}`}
          className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-3xs space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="h-3 w-24 bg-slate-200 rounded-md" />
            <div className="size-9 bg-slate-100 rounded-xl" />
          </div>
          <div className="space-y-2">
            <div className="h-7 w-20 bg-slate-200 rounded-md" />
            <div className="h-3 w-32 bg-slate-100 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
