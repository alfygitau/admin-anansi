import React, { useState, useRef, useEffect } from "react";
import {
  User,
  ShieldCheck,
  Search,
  Mail,
  Smartphone,
  MapPin,
  Building2,
  Key,
  MoreVertical,
  UserMinus,
  UserCheck,
  History,
  ShieldAlert,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AllUsers() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenuId, setActiveMenuId] = useState(null);
  const actionMenuRef = useRef(null);
  const navigate = useNavigate();

  // High-density array populated directly from your enterprise user object schema
  const [adminUsers, setAdminUsers] = useState([
    {
      id: "21ab6e20-85dc-6827-f0fc-1d3e29252021",
      public_id: "AN100048",
      username: "rodney",
      firstname: "Rodney",
      lastname: "Chelal",
      email: "rodneychelal@gmail.com",
      phone: "+254721545347",
      office_phone: "0724122252",
      job_title: "CyberSec",
      department: "IT",
      country: "Kenya",
      address: "Westlands",
      status: "Active",
      suspended: null,
      logintimes: 142,
      createdAt: "2026-06-10T06:30:46.467Z",
      role: {
        name: "Super Admin",
        description:
          "Super Admin: Holds supreme authority and comprehensive control over the entire system.",
      },
    },
    {
      id: "32bc7f31-96ed-7938-g1fd-2e4f30363132",
      public_id: "AN100049",
      username: "amina",
      firstname: "Amina",
      lastname: "Cherono",
      email: "amina.cherono@sacco.co.ke",
      phone: "+254711223344",
      office_phone: "0724122253",
      job_title: "Risk Analyst",
      department: "Compliance",
      country: "Kenya",
      address: "Kilimani",
      status: "Active",
      suspended: null,
      logintimes: 89,
      createdAt: "2026-02-14T09:15:22.000Z",
      role: {
        name: "Risk Officer",
        description:
          "Oversees audit compliance maps and system vulnerability evaluations.",
      },
    },
    {
      id: "43cd8g42-07fe-8a49-h2ge-3f5g41474243",
      public_id: "AN100050",
      username: "mwangi",
      firstname: "Francis",
      lastname: "Mwangi",
      email: "f.mwangi@sacco.co.ke",
      phone: "+254733444555",
      office_phone: "0724122254",
      job_title: "Credit Control Manager",
      department: "Finance",
      country: "Kenya",
      address: "Upperhill",
      status: "Suspended",
      suspended: true,
      logintimes: 210,
      createdAt: "2026-01-05T14:45:10.000Z",
      role: {
        name: "Credit Manager",
        description:
          "Authorizes advanced tier values and sets multi-guarantor coverage matrices.",
      },
    },
    {
      id: "54de9h53-18gf-9b50-i3hf-4g6h52585354",
      public_id: "AN100051",
      username: "beatrice",
      firstname: "Beatrice",
      lastname: "Wanjiku",
      email: "b.wanjiku@sacco.co.ke",
      phone: "+254722987654",
      office_phone: "0724122255",
      job_title: "Systems Auditor",
      department: "Internal Audit",
      country: "Kenya",
      address: "Mombasa Rd",
      status: "Active",
      suspended: null,
      logintimes: 45,
      createdAt: "2026-05-19T11:20:00.000Z",
      role: {
        name: "Auditor",
        description:
          "Read-only access across chronological ledger changes and system interaction logs.",
      },
    },
    {
      id: "65ef1i64-29hg-ac61-j4ig-5h7i63696465",
      public_id: "AN100052",
      username: "emmanuel",
      firstname: "Emmanuel",
      lastname: "Kipchoge",
      email: "e.kipchoge@sacco.co.ke",
      phone: "+254712345678",
      office_phone: "0724122256",
      job_title: "DevOps Engineer",
      department: "IT Infrastructure",
      country: "Kenya",
      address: "CBD",
      status: "Active",
      suspended: null,
      logintimes: 112,
      createdAt: "2026-03-22T08:14:31.000Z",
      role: {
        name: "DevOps Admin",
        description:
          "Manages continuous delivery deployment channels and server cluster health matrices.",
      },
    },
    {
      id: "76fg2j75-30ih-bd72-k5jh-6i8j74707576",
      public_id: "AN100053",
      username: "david",
      firstname: "David",
      lastname: "Ochieng",
      email: "d.ochieng@sacco.co.ke",
      phone: "+254701234321",
      office_phone: "0724122257",
      job_title: "Customer Support Lead",
      department: "Operations",
      country: "Kenya",
      address: "Parklands",
      status: "Active",
      suspended: null,
      logintimes: 340,
      createdAt: "2026-04-01T10:05:12.000Z",
      role: {
        name: "Support Manager",
        description:
          "Grants administrative customer access traces and resets member verification security locks.",
      },
    },
    {
      id: "87gh3k86-41ji-ce83-l6ki-7j9k85818687",
      public_id: "AN100054",
      username: "almasi",
      firstname: "Almasi",
      lastname: "Aluoch",
      email: "a.aluoch@sacco.co.ke",
      phone: "+254765350350",
      office_phone: "0724122258",
      job_title: "HR Specialist",
      department: "Human Resources",
      country: "Kenya",
      address: "Hurlingham",
      status: "Suspended",
      suspended: true,
      logintimes: 19,
      createdAt: "2026-02-28T07:11:59.000Z",
      role: {
        name: "HR Officer",
        description:
          "Manages administrative directory profiles and tracks employee onboarding workflows.",
      },
    },
    {
      id: "98hi4l97-52kj-df94-m7lj-8k0l96929798",
      public_id: "AN100055",
      username: "john",
      firstname: "John",
      lastname: "Kamau",
      email: "j.kamau@sacco.co.ke",
      phone: "+254711999888",
      office_phone: "0724122259",
      job_title: "Chief Financial Officer",
      department: "Executive Management",
      country: "Kenya",
      address: "Gigiri",
      status: "Active",
      suspended: null,
      logintimes: 95,
      createdAt: "2026-01-15T12:00:00.000Z",
      role: {
        name: "Executive Admin",
        description:
          "Holds system portfolio visibility rights alongside secondary authorization approvals.",
      },
    },
  ]);

  // Handle document click triggers for menu auto-collapse
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        actionMenuRef.current &&
        !actionMenuRef.current.contains(event.target)
      ) {
        setActiveMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleSuspend = (id) => {
    setAdminUsers((prev) =>
      prev.map((user) => {
        if (user.id === id) {
          const isSuspended = user.status === "Active";
          return {
            ...user,
            status: isSuspended ? "Suspended" : "Active",
            suspended: isSuspended ? true : null,
          };
        }
        return user;
      }),
    );
    setActiveMenuId(null);
  };

  const filteredUsers = adminUsers.filter((user) => {
    const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchQuery.toLowerCase()) ||
      user.public_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "active")
      return matchesSearch && user.status === "Active";
    if (activeTab === "suspended")
      return matchesSearch && user.status === "Suspended";
    return matchesSearch;
  });

  return (
    <div className="w-full space-y-5 font-sans antialiased text-slate-800">
      {/* 1. EXECUTIVE COMMAND BAR */}
      <div className="flex justify-between gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/60 pb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Administrative Users
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Provision system privileges, track interactive terminal logs, and
            maintain role-based access control guidelines.
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/add-admin-user")}
          className="h-10 px-4 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-primary/10 hover:bg-primary/90 transition-all flex items-center gap-2 w-fit cursor-pointer"
        >
          <Plus size={14} />
          <span>Add New User</span>
        </button>
      </div>

      {/* 2. SECURITY AMBIENCE TELEMETRY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryMetricCard
          title="Total Provisioned Users"
          value={`${adminUsers.length} Profiles`}
          desc="Registered security ledger entities"
          icon={<User size={18} />}
          color="text-primary bg-primary/5"
        />
        <SummaryMetricCard
          title="Active Session Clearances"
          value={`${adminUsers.filter((u) => u.status === "Active").length} Online`}
          desc="Cleared for core structural modifications"
          icon={<ShieldCheck size={18} />}
          color="text-success bg-success/5"
        />
        <SummaryMetricCard
          title="Revoked Security Anchors"
          value={`${adminUsers.filter((u) => u.status === "Suspended").length} Accounts`}
          desc="Suspended profile clearance parameters"
          icon={<ShieldAlert size={18} />}
          color="text-error bg-error/5"
        />
      </div>

      {/* 3. DYNAMIC RESOURCE SEARCH & STATE CONTROLS */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xs p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex bg-slate-100 p-1 rounded-xl h-10 w-fit select-none">
          <TabToggle
            active={activeTab === "all"}
            onClick={() => setActiveTab("all")}
            label="All Clearances"
          />
          <TabToggle
            active={activeTab === "active"}
            onClick={() => setActiveTab("active")}
            label="Active Operators"
          />
          <TabToggle
            active={activeTab === "suspended"}
            onClick={() => setActiveTab("suspended")}
            label="Revoked Profiles"
          />
        </div>

        <div className="relative w-full md:w-72">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID, name, or email..."
            className="w-full h-10 pl-9 pr-4 bg-slate-50 border border-slate-200/60 rounded-xl text-xs font-medium outline-none transition-all focus:bg-white focus:border-secondary placeholder:text-slate-400 font-sans"
          />
        </div>
      </div>

      {/* 4. HIGH-DENSITY PRIVILEGED IDENTITY LEDGER */}
      <div className="w-full bg-white rounded-3xl border border-slate-200/60 shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse font-sans table-auto">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-200/60 text-[10px] font-bold text-slate-400 uppercase tracking-widest select-none">
              <th className="py-4.5 px-6">User & Identity</th>
              <th className="py-4.5 px-6">Contact Information</th>
              <th className="py-4.5 px-6">Location</th>
              <th className="py-4.5 px-6">Assigned Role</th>
              <th className="py-4.5 px-6">Status</th>
              <th className="py-4.5 px-6 text-right pr-8">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-xs tracking-tight">
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="group transition-colors hover:bg-slate-50/60"
              >
                {/* Col 1: Identity Profile Snapshot */}
                <td className="py-4 px-6">
                  <div className="flex flex-col space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-sans font-bold text-[9px] tracking-wider uppercase px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                        {user.public_id}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                        @{user.username}
                      </span>
                    </div>
                    <span className="font-semibold text-slate-900 text-sm tracking-tight group-hover:text-primary transition-colors">
                      {user.firstname} {user.lastname}
                    </span>
                  </div>
                </td>

                {/* Col 2: Communications Matrix */}
                <td className="py-4 px-6">
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium text-slate-700 flex items-center gap-1.5">
                      <Mail size={12} className="text-slate-400" /> {user.email}
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal flex items-center gap-1.5">
                      <Smartphone size={12} className="text-slate-400" />{" "}
                      {user.phone}
                    </span>
                  </div>
                </td>

                {/* Col 3: Department Corporate Structure */}
                <td className="py-4 px-6">
                  <div className="flex flex-col space-y-1">
                    <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                      <Building2 size={12} className="text-slate-400" />{" "}
                      {user.department}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
                      <MapPin size={12} className="text-slate-400" />{" "}
                      {user.address || "Main Branch"}
                    </span>
                  </div>
                </td>

                {/* Col 4: RBAC Assigned Framework */}
                <td className="py-4 px-6">
                  <div className="flex flex-col space-y-1">
                    <span className="font-bold text-primary flex items-center gap-1.5 text-xs tracking-tight">
                      <Key size={12} className="text-primary/70" />{" "}
                      {user.role.name}
                    </span>
                    <p
                      className="text-[10px] text-slate-400 max-w-[180px] truncate italic"
                      title={user.role.description}
                    >
                      {user.role.description}
                    </p>
                  </div>
                </td>

                {/* Col 5: Security Clearance & Telemetry */}
                <td className="py-4 px-6">
                  <div className="flex flex-col space-y-1.5">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md border w-fit ${
                        user.status === "Active"
                          ? "bg-success/5 border-success/10 text-success"
                          : "bg-error/5 border-error/10 text-error"
                      }`}
                    >
                      <span
                        className={`size-1 rounded-full ${user.status === "Active" ? "bg-success" : "bg-error"}`}
                      />
                      {user.status}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                      <span className="font-bold text-slate-700">
                        {user.createdAt}
                      </span>
                    </span>
                  </div>
                </td>

                {/* Col 6: Contextual Row Access Panel */}
                <td className="py-4 px-6 text-right pr-8 relative">
                  <div className="flex items-center justify-end">
                    <button
                      onClick={() =>
                        setActiveMenuId(
                          activeMenuId === user.id ? null : user.id,
                        )
                      }
                      className="size-8 rounded-xl border border-slate-200/60 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all bg-white cursor-pointer"
                    >
                      <MoreVertical size={14} />
                    </button>

                    {/* Inline Row Menu Deck Popover */}
                    {activeMenuId === user.id && (
                      <div
                        ref={(el) => {
                          actionMenuRef.current = el;
                        }}
                        className="absolute right-14 mt-2 w-48 bg-white border border-slate-200/80 rounded-xl shadow-xl p-1.5 z-50 text-left animate-in fade-in slide-in-from-top-1 duration-100"
                      >
                        <button className="w-full h-8 px-2.5 rounded-lg flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer">
                          <History size={12} />
                          <span>View Access Logs</span>
                        </button>
                        <button
                          onClick={() => handleToggleSuspend(user.id)}
                          className={`w-full h-8 px-2.5 rounded-lg flex items-center gap-2 text-xs font-semibold transition-colors cursor-pointer ${
                            user.status === "Active"
                              ? "text-error hover:bg-rose-50/60"
                              : "text-success hover:bg-emerald-50/60"
                          }`}
                        >
                          {user.status === "Active" ? (
                            <UserMinus size={12} />
                          ) : (
                            <UserCheck size={12} />
                          )}
                          <span>
                            {user.status === "Active"
                              ? "Suspend Operator"
                              : "Restore Access"}
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ==========================================================================
   SUPPORTIVE CHILD UTILITIES
   ========================================================================== */

const SummaryMetricCard = ({ title, value, desc, icon, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-xs flex items-start justify-between">
    <div className="space-y-1.5">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        {title}
      </p>
      <h3 className="text-xl font-bold text-slate-800 tracking-tight">
        {value}
      </h3>
      <p className="text-[11px] text-slate-400 font-medium leading-normal">
        {desc}
      </p>
    </div>
    <div
      className={`size-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}
    >
      {icon}
    </div>
  </div>
);

const TabToggle = ({ active, onClick, label }) => (
  <button
    onClick={onClick}
    className={`px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center h-full cursor-pointer ${
      active
        ? "bg-white text-primary shadow-3xs"
        : "text-slate-400 hover:text-slate-600"
    }`}
  >
    <span>{label}</span>
  </button>
);
