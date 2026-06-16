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
} from "lucide-react";

export default function AllMembers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);

  // High-density array populated exactly matching your nested enterprise data schema
  const [members] = useState([
    {
      id: "cdac864c-35fe-bcf4-6cc6-cbfb64ede83d",
      firstname: "MARCEL",
      middlename: "AUJA",
      lastname: "OGWENO",
      identification: "25973919",
      identification_type: "National ID",
      mobileno: "+254780228024",
      country_of_residence: "Kenya",
      dob: "1988-03-24",
      kraPin: "A123456789P",
      occupation: "CTO",
      employment_type: "Employed",
      income_range: "50000",
      email: "a.marcel77+@gmail.com",
      username: "marcello2",
      phoneVerified: true,
      emailVerified: true,
      suspended: false,
      onboarding_stage: "completed",
      status: "Active",
      public_id: "SJS394",
      createdAt: "2026-05-19T12:18:10.072Z",
      lastLoginAt: "2026-05-19T20:40:04.155Z",
      nextOfKins: [
        {
          id: 1318,
          name: "Dom",
          relationship: "cousin",
          phoneNumber: "+254722223735",
          location: "Kawangware",
        },
      ],
      addresses: [
        {
          id: "e6d05fc9",
          physical_address: "kiambaa pcea",
          county: "Kiambu",
          subcounty: "Kiambaa",
        },
      ],
      accounts: [
        {
          id: "4090b303",
          name: "Savings",
          account_number: "0100100002985",
          balance: "1.00",
          status: "active",
        },
        {
          id: "ca6752fc",
          name: "Shares",
          account_number: "0100900002986",
          balance: "2000.00",
          status: "active",
        },
      ],
    },
    {
      id: "fa328b12-45aa-9cc1-7dd7-eb4b14ade99a",
      firstname: "BEATRICE",
      middlename: "WANGARI",
      lastname: "KAMAU",
      identification: "31284950",
      identification_type: "National ID",
      mobileno: "+254711223344",
      country_of_residence: "Kenya",
      dob: "1992-07-14",
      kraPin: "A987654321Z",
      occupation: "Software Engineer",
      employment_type: "Contractor",
      income_range: "120000",
      email: "b.kamau@outlook.com",
      username: "betty_w",
      phoneVerified: true,
      emailVerified: false,
      suspended: false,
      onboarding_stage: "completed",
      status: "Active",
      public_id: "SJS402",
      createdAt: "2026-04-11T08:12:00.000Z",
      lastLoginAt: "2026-06-15T14:22:10.000Z",
      nextOfKins: [
        {
          id: 1319,
          name: "James Kamau",
          relationship: "Brother",
          phoneNumber: "+254700112233",
          location: "Rongai",
        },
      ],
      addresses: [
        {
          id: "e7d16fa0",
          physical_address: "Ngong Road",
          county: "Nairobi",
          subcounty: "Dagoretti",
        },
      ],
      accounts: [
        {
          id: "4090b304",
          name: "Savings",
          account_number: "0100100003112",
          balance: "45500.50",
          status: "active",
        },
      ],
    },
    {
      id: "bc117a8c-99de-44f2-11c6-da4281fbc44d",
      firstname: "EMMANUEL",
      middlename: "KIPROP",
      lastname: "CHERUIYOT",
      identification: "28491029",
      identification_type: "National ID",
      mobileno: "+254722998877",
      country_of_residence: "Kenya",
      dob: "1985-11-03",
      kraPin: "A445123987M",
      occupation: "Data Analyst",
      employment_type: "Employed",
      income_range: "85000",
      email: "e.kiprop@gmail.com",
      username: "kip_emman",
      phoneVerified: false,
      emailVerified: true,
      suspended: true,
      onboarding_stage: "completed",
      status: "Suspended",
      public_id: "SJS415",
      createdAt: "2026-01-20T10:45:12.000Z",
      lastLoginAt: "2026-05-01T09:11:04.000Z",
      nextOfKins: [],
      addresses: [
        {
          id: "e8f22bc1",
          physical_address: "Kapsoya Estate",
          county: "Uasin Gishu",
          subcounty: "Ainabkoi",
        },
      ],
      accounts: [
        {
          id: "4090b309",
          name: "Savings",
          account_number: "0100100004992",
          balance: "0.00",
          status: "frozen",
        },
      ],
    },
    {
      id: "92837bc1-445a-8812-7cc6-ca4281fbc44d",
      firstname: "SARAH",
      middlename: "ATIENO",
      lastname: "ODHIAMBO",
      identification: "29938475",
      identification_type: "National ID",
      mobileno: "+254712345678",
      country_of_residence: "Kenya",
      dob: "1995-02-12",
      kraPin: "A332145678L",
      occupation: "Accountant",
      employment_type: "Employed",
      income_range: "75000",
      email: "s.odhiambo@company.co.ke",
      username: "sarah_o",
      phoneVerified: true,
      emailVerified: true,
      suspended: false,
      onboarding_stage: "completed",
      status: "Active",
      public_id: "SJS501",
      createdAt: "2026-06-01T09:00:00.000Z",
      lastLoginAt: "2026-06-16T10:15:00.000Z",
      nextOfKins: [
        {
          id: 1320,
          name: "John Odhiambo",
          relationship: "Husband",
          phoneNumber: "+254722987654",
          location: "Kisumu",
        },
      ],
      addresses: [
        {
          id: "e9f33cd2",
          physical_address: "Milimani Estate",
          county: "Kisumu",
          subcounty: "Kisumu Central",
        },
      ],
      accounts: [
        {
          id: "4090b310",
          name: "Savings",
          account_number: "0100100005111",
          balance: "12500.00",
          status: "active",
        },
      ],
    },
    {
      id: "3388a12e-bc99-4a11-88d7-fb4b14ade99a",
      firstname: "DAVID",
      middlename: "MWANGI",
      lastname: "NJOROGE",
      identification: "27761529",
      identification_type: "National ID",
      mobileno: "+254733445566",
      country_of_residence: "Kenya",
      dob: "1982-08-30",
      kraPin: "A112233445K",
      occupation: "Farmer",
      employment_type: "Self-Employed",
      income_range: "40000",
      email: "dmwangi@shamba.com",
      username: "david_nj",
      phoneVerified: true,
      emailVerified: true,
      suspended: false,
      onboarding_stage: "completed",
      status: "Active",
      public_id: "SJS502",
      createdAt: "2026-05-20T14:20:00.000Z",
      lastLoginAt: "2026-06-14T08:00:00.000Z",
      nextOfKins: [
        {
          id: 1321,
          name: "Mary Njeri",
          relationship: "Wife",
          phoneNumber: "+254711223344",
          location: "Thika",
        },
      ],
      addresses: [
        {
          id: "e9f33cd3",
          physical_address: "Kiganjo Road",
          county: "Kiambu",
          subcounty: "Thika West",
        },
      ],
      accounts: [
        {
          id: "4090b311",
          name: "Savings",
          account_number: "0100100005222",
          balance: "500.00",
          status: "active",
        },
      ],
    },
    {
      id: "7766b22f-cd88-4b22-99e8-ec5c25bde00b",
      firstname: "JANE",
      middlename: "W",
      lastname: "MWENDE",
      identification: "33445566",
      identification_type: "National ID",
      mobileno: "+254700998877",
      country_of_residence: "Kenya",
      dob: "1998-05-05",
      kraPin: "A998877665B",
      occupation: "Graphic Designer",
      employment_type: "Freelance",
      income_range: "60000",
      email: "jane.mwende@design.com",
      username: "jane_m",
      phoneVerified: true,
      emailVerified: true,
      suspended: false,
      onboarding_stage: "completed",
      status: "Active",
      public_id: "SJS503",
      createdAt: "2026-06-10T11:30:00.000Z",
      lastLoginAt: "2026-06-16T12:00:00.000Z",
      nextOfKins: [],
      addresses: [
        {
          id: "e9f33cd4",
          physical_address: "Kilimani",
          county: "Nairobi",
          subcounty: "Dagoretti North",
        },
      ],
      accounts: [
        {
          id: "4090b312",
          name: "Savings",
          account_number: "0100100005333",
          balance: "2000.00",
          status: "active",
        },
      ],
    },
    {
      id: "1122c33g-de77-4c33-00f9-fd6d36cef11c",
      firstname: "PETER",
      middlename: "K",
      lastname: "OCHIENG",
      identification: "22334455",
      identification_type: "National ID",
      mobileno: "+254799001122",
      country_of_residence: "Kenya",
      dob: "1975-01-20",
      kraPin: "A554433221C",
      occupation: "Teacher",
      employment_type: "Employed",
      income_range: "95000",
      email: "peter.o@school.go.ke",
      username: "peter_o",
      phoneVerified: true,
      emailVerified: false,
      suspended: false,
      onboarding_stage: "completed",
      status: "Active",
      public_id: "SJS504",
      createdAt: "2026-04-05T09:00:00.000Z",
      lastLoginAt: "2026-06-15T17:00:00.000Z",
      nextOfKins: [
        {
          id: 1322,
          name: "Grace Ochieng",
          relationship: "Sister",
          phoneNumber: "+254712345999",
          location: "Homa Bay",
        },
      ],
      addresses: [
        {
          id: "e9f33cd5",
          physical_address: "Main Road",
          county: "Homa Bay",
          subcounty: "Homa Bay Town",
        },
      ],
      accounts: [
        {
          id: "4090b313",
          name: "Savings",
          account_number: "0100100005444",
          balance: "8900.00",
          status: "active",
        },
      ],
    },
    {
      id: "4455d44h-ef66-4d44-11a0-ge7e47dfg22d",
      firstname: "LUCY",
      middlename: "A",
      lastname: "KARANJA",
      identification: "44556677",
      identification_type: "National ID",
      mobileno: "+254744332211",
      country_of_residence: "Kenya",
      dob: "1990-12-12",
      kraPin: "A667788990D",
      occupation: "Nurse",
      employment_type: "Employed",
      income_range: "65000",
      email: "lucy.karanja@hospital.org",
      username: "lucy_k",
      phoneVerified: false,
      emailVerified: true,
      suspended: false,
      onboarding_stage: "completed",
      status: "Active",
      public_id: "SJS505",
      createdAt: "2026-06-05T10:00:00.000Z",
      lastLoginAt: "2026-06-16T09:00:00.000Z",
      nextOfKins: [],
      addresses: [
        {
          id: "e9f33cd6",
          physical_address: "Hospital Quarters",
          county: "Nyeri",
          subcounty: "Mathira",
        },
      ],
      accounts: [
        {
          id: "4090b314",
          name: "Savings",
          account_number: "0100100005555",
          balance: "3200.00",
          status: "active",
        },
      ],
    },
    {
      id: "6677e55i-fg55-4e55-22b1-hf8f58efh33e",
      firstname: "SIMON",
      middlename: "M",
      lastname: "KIPKORIR",
      identification: "55667788",
      identification_type: "National ID",
      mobileno: "+254755667788",
      country_of_residence: "Kenya",
      dob: "1988-04-18",
      kraPin: "A778899001E",
      occupation: "Consultant",
      employment_type: "Self-Employed",
      income_range: "150000",
      email: "simon.k@consult.co.ke",
      username: "simon_k",
      phoneVerified: true,
      emailVerified: true,
      suspended: false,
      onboarding_stage: "completed",
      status: "Active",
      public_id: "SJS506",
      createdAt: "2026-05-10T16:00:00.000Z",
      lastLoginAt: "2026-06-16T08:30:00.000Z",
      nextOfKins: [
        {
          id: 1323,
          name: "Betty Kipkorir",
          relationship: "Wife",
          phoneNumber: "+254722556677",
          location: "Eldoret",
        },
      ],
      addresses: [
        {
          id: "e9f33cd7",
          physical_address: "Elgeyo Road",
          county: "Uasin Gishu",
          subcounty: "Eldoret East",
        },
      ],
      accounts: [
        {
          id: "4090b315",
          name: "Savings",
          account_number: "0100100005666",
          balance: "45000.00",
          status: "active",
        },
      ],
    },
    {
      id: "8899f66j-gh44-4f66-33c2-ig9g69fgi44f",
      firstname: "FAITH",
      middlename: "W",
      lastname: "KAMAU",
      identification: "66778899",
      identification_type: "National ID",
      mobileno: "+254766778899",
      country_of_residence: "Kenya",
      dob: "1994-11-22",
      kraPin: "A889900112F",
      occupation: "Student",
      employment_type: "Unemployed",
      income_range: "0",
      email: "faith.k@university.ac.ke",
      username: "faith_k",
      phoneVerified: true,
      emailVerified: true,
      suspended: false,
      onboarding_stage: "completed",
      status: "Active",
      public_id: "SJS507",
      createdAt: "2026-06-12T14:00:00.000Z",
      lastLoginAt: "2026-06-16T11:45:00.000Z",
      nextOfKins: [],
      addresses: [
        {
          id: "e9f33cd8",
          physical_address: "Campus Hostel",
          county: "Nairobi",
          subcounty: "Westlands",
        },
      ],
      accounts: [
        {
          id: "4090b316",
          name: "Savings",
          account_number: "0100100005777",
          balance: "150.00",
          status: "active",
        },
      ],
    },
  ]);

  const filteredMembers = members.filter(
    (m) =>
      `${m.firstname} ${m.lastname}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      m.public_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.identification.includes(searchQuery),
  );

  return (
    <div className="w-full space-y-6 antialiased text-slate-800">
      {/* HEADER CONTROLS BANNER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/60 pb-6 select-none">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Members Registry
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Manage onboarding stages, verified communication fields, and dynamic
            ledger account exposures.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 h-11 px-5 w-fit bg-slate-900 text-white rounded-xl text-xs font-bold shadow-sm hover:bg-slate-800 transition-all cursor-pointer">
          <UserPlus size={15} />
          <span>Add Member</span>
        </button>
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID, public code or name string..."
            className="w-full h-10 pl-9 pr-4 bg-slate-50 border border-slate-200/60 rounded-xl text-xs font-medium outline-none transition-all focus:bg-white focus:border-primary placeholder:text-slate-400"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 h-10 px-4 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all">
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
              {filteredMembers.map((member) => (
                <tr
                  key={member.id}
                  className="group transition-colors hover:bg-slate-50/40"
                >
                  {/* Col 1: Identity & Identification Papers */}
                  <td className="py-4 px-6">
                    <div className="flex items-start gap-3">
                      <div className="size-9 rounded-xl bg-slate-100 border border-slate-200/60 flex items-center justify-center font-bold text-slate-700 text-xs shadow-3xs shrink-0 select-none">
                        {member.firstname[0]}
                        {member.lastname[0]}
                      </div>
                      <div className="flex flex-col space-y-0.5">
                        <span className="font-mono w-fit px-3 text-[9px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded">
                          {member.public_id}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900 text-sm tracking-tight">
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
                      onClick={() => setSelectedMember(member)}
                      className="size-8 rounded-xl border border-slate-200/60 inline-flex items-center justify-center text-slate-400 hover:text-primary hover:bg-slate-50 hover:border-slate-300 transition-all shadow-3xs bg-white cursor-pointer"
                      title="Inspect Profile Dossier"
                    >
                      <Eye size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAILED MEMBER PROFILE IN-DEPTH SIDE DRAWER */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex justify-end select-none">
          <div
            className="absolute inset-0 bg-slate-900/15 backdrop-blur-xs transition-opacity duration-200"
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
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight pt-1">
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
  );
}
