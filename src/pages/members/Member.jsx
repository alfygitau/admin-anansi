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
} from "lucide-react";

export default function MemberDetails({ onBack }) {
  // Complete synchronized production data instance
  const [member, setMember] = useState({
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
    ssn: null,
    occupation: "CTO",
    employment_type: "Employed",
    income_range: "50000",
    email: "a.marcel77+@gmail.com",
    username: "marcello2",
    phoneVerified: true,
    emailVerified: true,
    suspended: false,
    temporary_password: false,
    failedLoginAttempts: 0,
    citizenship: "Kenya",
    application_id: null,
    gender: "MALE",
    id_front_image:
      "https://anansi-dev.s3.eu-west-1.amazonaws.com/9bbadf2b-8997-498c-9558-5b80a46cc5a7-088819f8-9a5c-489b-ab2e-66849e5893453209560105267277758.jpg",
    id_back_image:
      "https://anansi-dev.s3.eu-west-1.amazonaws.com/6a38195d-ed4c-4c3e-b666-145194302f5d-101ff49b-02a6-4ef5-a1c7-f50af070af3e1010572844791680.jpg",
    passport_image: null,
    selfie_image:
      "https://anansi-dev.s3.eu-west-1.amazonaws.com/083d299d-f4dc-4bf2-b556-42334136c8a5-74ff88d0-08cd-465b-a31f-73e65bac915f3843724028756212444.jpg",
    profile_photo: null,
    driving_license_image: null,
    member: true,
    createdAt: "2026-05-19T12:18:10.072Z",
    updatedAt: "2026-05-19T20:40:04.172Z",
    deleteAt: null,
    lastLoginAt: "2026-05-19T20:40:04.155Z",
    onboarding_stage: "completed",
    status: "Active",
    product_id: null,
    public_id: "SJS394",
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
  });

  const toggleSuspension = () => {
    setMember((prev) => ({
      ...prev,
      suspended: !prev.suspended,
      status: prev.suspended ? "Active" : "Suspended",
    }));
  };

  return (
    <div className="w-full space-y-6 font-sans antialiased text-slate-800 p-1">
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
              <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                {member.public_id}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              System Registration:{" "}
              {new Date(member.createdAt).toLocaleDateString("en-KE", {
                dateStyle: "long",
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSuspension}
            className={`flex items-center gap-1.5 h-10 px-4 rounded-xl text-xs font-bold text-white transition-all cursor-pointer ${
              member.suspended
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-rose-600 hover:bg-rose-700"
            }`}
          >
            {member.suspended ? <Unlock size={13} /> : <Lock size={13} />}
            <span>
              {member.suspended ? "Lift Suspension" : "Suspend Member"}
            </span>
          </button>
        </div>
      </div>

      {/* 2. THE HIGHER LEVEL SECTION - METRICS TILES GRID (ROW HEIGHT BALANCED) */}
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
                label="Identification"
                value={`${member.identification_type} — ${member.identification}`}
              />
              <ProfileMetaBlock label="KRA PIN" value={member.kraPin} />
              <ProfileMetaBlock label="Date of Birth" value={member.dob} />
              <ProfileMetaBlock label="Gender" value={member.gender} />
              <ProfileMetaBlock
                label="Citizenship"
                value={member.citizenship}
              />
              <ProfileMetaBlock
                label="Residence Frame"
                value={member.country_of_residence}
              />
            </div>
          </div>
        </div>

        {/* CARD B: NEW DEDICATED HIGH-DETAIL ADDRESS REGISTRY */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xs p-6 flex flex-col justify-between h-full">
          <div className="space-y-4">
            <div className="w-full flex items-center justify-between">
              <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
                <MapPin size={14} /> Physical Address
              </h3>
              <Edit size={14} className="text-slate-400" />
            </div>
            {member.addresses.map((addr) => (
              <div
                key={addr.id}
                className="space-y-3.5 border-t border-slate-100 pt-3"
              >
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

        {/* CARD C: SECURITY, ACCESS & ACCESS SYSTEM CONTROL */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xs p-6 h-full flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-full flex items-center justify-between">
              <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
                <Shield size={14} /> Security
              </h3>
            </div>
            <div className="space-y-2.5 text-xs font-medium pt-1">
              <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-500 flex items-center gap-1.5">
                  Username
                </span>
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
                <span className="text-slate-500">Authentication Failures</span>
                <span
                  className={`font-bold ${member.failedLoginAttempts > 0 ? "text-red-600" : "text-slate-700"}`}
                >
                  {member.failedLoginAttempts} Attempts
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Communication Channels</span>
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
              {new Date(member.lastLoginAt).toLocaleTimeString("en-KE")}
            </span>
          </div>
        </div>
      </div>

      {/* 3. MIDDLE LAYER ROW PLATFORM - LEDGERS & CAPACITY METRICS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* FINANCIAL LEDGER ACCOUNTS CARD (SPANS 2 COLS ON LARGE DESKTOP) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xs p-6 space-y-4">
            <div className="w-full flex items-center justify-between">
              <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
                <CreditCard size={14} /> Accounts
              </h3>
            </div>
            <div className="border border-slate-100 rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse table-auto text-xs font-medium">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                    <th className="p-3.5 px-4">Account Portfolio Product</th>
                    <th className="p-3.5">Account Number</th>
                    <th className="p-3.5 text-right">Account Balance</th>
                    <th className="p-3.5 text-center">State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {member.accounts.map((acc) => (
                    <tr
                      key={acc.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="p-3.5 px-4 font-bold text-slate-900">
                        {acc.name}
                      </td>
                      <td className="p-3.5 cursor-pointer font-mono text-blue-500">
                        {acc.account_number}
                      </td>
                      <td className="p-3.5 text-right font-bold text-slate-900">
                        KES {Number(acc.balance).toFixed(2)}
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

          {/* EMERGENCY CONTINGENCY SYSTEM HANDLERS CONTAINER */}
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xs p-6 space-y-4">
            <div className="w-full flex items-center justify-between">
              <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
                <Users size={14} /> Next of Kin
              </h3>
              <Edit size={14} className="text-slate-400" />
            </div>
            {member.nextOfKins.map((kin) => (
              <div
                key={kin.id}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 border border-slate-100 bg-slate-50/40 rounded-xl text-xs font-medium"
              >
                <div>
                  <p className="text-[10px] text-slate-400 uppercase">
                    Legal Fullname
                  </p>
                  <p className="text-slate-900 font-bold mt-0.5">{kin.name}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase">
                    Relationship
                  </p>
                  <p className="text-slate-600 capitalize mt-0.5">
                    {kin.relationship}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase">
                    Contact
                  </p>
                  <p className="text-slate-700 font-mono mt-0.5">
                    {kin.phoneNumber}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase">
                    Location
                  </p>
                  <p className="text-slate-500 mt-0.5">{kin.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ECONOMIC TIERS AND CAPACITY PROFILE SPEC (1 COL SIDE PANEL) */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xs p-6 space-y-4 h-full">
          <div className="w-full flex items-center justify-between">
            <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
              <Briefcase size={14} /> Financial Profile
            </h3>
            <Edit size={14} className="text-slate-400" />
          </div>
          <div className="space-y-4 pt-1 text-xs font-medium">
            <div className="flex items-start gap-2.5">
              <Briefcase size={14} className="text-slate-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wide">
                  Employment
                </p>
                <p className="text-slate-900 font-bold mt-0.5">
                  {member.occupation} • {member.employment_type}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 border-t border-slate-50 pt-3">
              <Mail size={14} className="text-slate-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wide">
                  Contact
                </p>
                <p className="text-slate-800 font-semibold mt-0.5">
                  {member.mobileno}
                </p>
                <p className="text-slate-400 text-[11px] font-normal mt-0.5">
                  {member.email}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 border-t border-slate-50 pt-3">
              <Building size={14} className="text-slate-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wide">
                  Income
                </p>
                <p className="text-slate-900 font-mono font-bold mt-0.5">
                  KES {Number(member.income_range).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. LARGE KYC IMAGE GALLERY SYSTEM (EXPANDED TO FULL SCREEN ROW WIDTH) */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xs p-6 space-y-4">
        <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
          <FileText size={14} /> ID Images
        </h3>

        {/* Large Format Layout Block mapping out Front, Back and Verification media records */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
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

        {/* Dynamic Fallback lists checking out tertiary records */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-4 mt-2">
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
    </div>
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
