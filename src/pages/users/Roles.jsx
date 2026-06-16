import React, { useState, useRef, useEffect } from "react";
import {
  ShieldCheck,
  Users,
  Calendar,
  X,
  MoreVertical,
  Search,
  Plus,
  Key,
  Layers,
  History,
  UserMinus,
  Briefcase,
  Mail,
  Smartphone,
} from "lucide-react";

export default function RolesTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoleContext, setSelectedRoleContext] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const actionMenuRef = useRef(null);

  // High-density array structured directly from your enterprise permission cluster payload
  const [roles] = useState([
    {
      id: "93d67383-4f17-4914-8ff5-bc94b0d16ed3",
      name: "Loan Officer",
      description:
        "Role associated with serving customer needs including account creation, account activation, viewing transaction statuses etc..",
      createdAt: "2024-01-03T21:14:20.615Z",
      updatedAt: "2025-05-12T03:35:29.109Z",
      deletedAt: null,
      permissions: [
        {
          id: "86db6b12-5b7e-ebd2-3bc8-b6bf7205f379",
          name: "View total outstanding balance of loans",
          module_id: "901dc2f4-f337-f220-9b73-888f5d760fc4",
        },
        {
          id: "ee822503-a0b8-cbda-53bd-5766a83bd1d2",
          name: "View total amount of loans defaulted",
          module_id: "901dc2f4-f337-f220-9b73-888f5d760fc4",
        },
        {
          id: "0651dbaf-465f-d0b3-3216-350b77e57e46",
          name: "Approve or reject loan applications",
          module_id: "09854286-a67a-9d59-e10f-78ea6ba2b166",
        },
        {
          id: "cbaf8cdf-fad3-4b8a-2098-e807a2353499",
          name: "Modify loan terms and conditions",
          module_id: "09854286-a67a-9d59-e10f-78ea6ba2b166",
        },
        {
          id: "6367d30a-3f27-6656-65e4-43c91ee37350",
          name: "Export loans",
          module_id: "09854286-a67a-9d59-e10f-78ea6ba2b166",
        },
        {
          id: "218c0e4c-698b-51ed-4666-39e360f4c50b",
          name: "Disburse loans",
          module_id: "09854286-a67a-9d59-e10f-78ea6ba2b166",
        },
        {
          id: "9b9f2b40-25b9-b8d0-1581-2bb3718e19b8",
          name: "Update loan amount",
          module_id: "09854286-a67a-9d59-e10f-78ea6ba2b166",
        },
        {
          id: "30ce0e60-4e70-5423-bb83-d8cd3f550e45",
          name: "View total loan portfolio",
          module_id: "901dc2f4-f337-f220-9b73-888f5d760fc4",
        },
        {
          id: "7eee26d6-99c3-bcf5-8d40-079af5a798e8",
          name: "Export guarantors",
          module_id: "09854286-a67a-9d59-e10f-78ea6ba2b166",
        },
        {
          id: "a36962e2-34a5-6742-24c3-f8461e73c1c7",
          name: "View loan book",
          module_id: "09854286-a67a-9d59-e10f-78ea6ba2b166",
        },
        {
          id: "985e01ed-ef13-8ec1-d533-f2c0c4b21545",
          name: "View loan applications",
          module_id: "09854286-a67a-9d59-e10f-78ea6ba2b166",
        },
        {
          id: "4584c97b-dded-e7af-7bbd-bab4da463561",
          name: "View total loan volume",
          module_id: "09854286-a67a-9d59-e10f-78ea6ba2b166",
        },
        {
          id: "0bdea914-2c38-0758-b0f7-9fe7a52ac1d5",
          name: "View all loans with filters",
          module_id: "09854286-a67a-9d59-e10f-78ea6ba2b166",
        },
        {
          id: "1b08443e-11bd-43c0-bdfc-646ee0763346",
          name: "Update loan terms",
          module_id: "09854286-a67a-9d59-e10f-78ea6ba2b166",
        },
        {
          id: "a3db3fbc-dc82-3109-831c-39addb77674b",
          name: "View loan details",
          module_id: "09854286-a67a-9d59-e10f-78ea6ba2b166",
        },
        {
          id: "3bea045b-40fd-02a3-b350-e863104d850d",
          name: "View guarantor summary",
          module_id: "09854286-a67a-9d59-e10f-78ea6ba2b166",
        },
        {
          id: "7155d4b7-a06e-c6fd-c6ee-1a6367fe0744",
          name: "View all guarantors",
          module_id: "09854286-a67a-9d59-e10f-78ea6ba2b166",
        },
      ],
      users: [
        {
          id: "u1",
          public_id: "AN100038",
          email: "kasomojapheth+2@gmail.com",
          username: "kithurekindiki",
          firstname: "Kindiki",
          lastname: "Kithure",
          phone: "+254722238772",
          job_title: "Deputy President",
          department: "Public Service",
          country: "Kenya",
          address: "P.O. BOX 00100",
        },
        {
          id: "u2",
          public_id: "AN100046",
          email: "kasomojapheth+133@gmail.com",
          username: "fredmatiangi",
          firstname: "Fred",
          lastname: "Okello",
          phone: "+254723147428",
          job_title: "Politician",
          department: "Government",
          country: "Kenya",
          address: "P.O. BOX 199",
        },
        {
          id: "u3",
          public_id: "AN100047",
          email: "alfredkariuki@anansitechnology.com",
          username: "AlfyGitau",
          firstname: "Alfred",
          lastname: "Kariuki",
          phone: "+254796657462",
          job_title: "Loan Officer",
          department: "Loans",
          country: "Kenya",
          address: "2845",
        },
      ],
    },
    {
      id: "2e92e11d-ca18-4a42-8ae6-fd85d5624167",
      name: "Super Admin",
      description:
        "Holds supreme authority and comprehensive control over the entire system, overseeing and managing all aspects of administrative functions and user access with unparalleled permissions.",
      createdAt: "2024-01-09T05:49:03.451Z",
      updatedAt: "2024-01-15T12:31:10.564Z",
      deletedAt: null,
      permissions: [
        {
          id: "p_all",
          name: "Bypass all explicit credential claim validations",
          module_id: "global",
        },
        {
          id: "p_iam",
          name: "Provision and revoke administrative user access states",
          module_id: "iam",
        },
      ],
      users: [
        {
          id: "u4",
          public_id: "AN100048",
          email: "rodneychelal@gmail.com",
          username: "rodney",
          firstname: "Rodney",
          lastname: "Chelal",
          phone: "+254721545347",
          job_title: "CyberSec",
          department: "IT",
          country: "Kenya",
          address: "Westlands",
        },
      ],
    },
    {
      id: "4a94a33f-ec30-6c64-0cg8-af07f7846389",
      name: "Credit Manager",
      description:
        "Responsible for policy parameters evaluation, authorizing high-tier risk values, overriding limit engine algorithms, and monitoring portfolio risk thresholds.",
      createdAt: "2024-03-12T08:19:40.000Z",
      updatedAt: "2026-02-10T14:45:10.000Z",
      deletedAt: null,
      permissions: [
        {
          id: "p_c1",
          name: "Override algorithm limit calculations",
          module_id: "09854286-a67a-9d59-e10f-78ea6ba2b166",
        },
        {
          id: "p_c2",
          name: "Approve high-tier financial disbursements",
          module_id: "09854286-a67a-9d59-e10f-78ea6ba2b166",
        },
        {
          id: "p_c3",
          name: "Modify credit score evaluation benchmarks",
          module_id: "901dc2f4-f337-f220-9b73-888f5d760fc4",
        },
      ],
      users: [
        {
          id: "u5",
          public_id: "AN100050",
          email: "f.mwangi@sacco.co.ke",
          username: "mwangi",
          firstname: "Francis",
          lastname: "Mwangi",
          phone: "+254733444555",
          job_title: "Credit Control Manager",
          department: "Finance",
          country: "Kenya",
          address: "Upperhill",
        },
      ],
    },
    {
      id: "3f83f22e-db29-5b53-9bf7-fe96e6735278",
      name: "Risk Officer",
      description:
        "Oversees asset safety, monitors non-performing assets velocity, manages default collections processes, and configures algorithmic system constraints.",
      createdAt: "2024-05-18T10:11:05.000Z",
      updatedAt: "2026-05-14T09:15:22.000Z",
      deletedAt: null,
      permissions: [
        {
          id: "p_r1",
          name: "Flag accounts for structural delinquency review",
          module_id: "901dc2f4-f337-f220-9b73-888f5d760fc4",
        },
        {
          id: "p_r2",
          name: "Initiate automated recovery penalty executions",
          module_id: "09854286-a67a-9d59-e10f-78ea6ba2b166",
        },
      ],
      users: [
        {
          id: "u6",
          public_id: "AN100049",
          email: "amina.cherono@sacco.co.ke",
          username: "amina",
          firstname: "Amina",
          lastname: "Cherono",
          phone: "+254711223344",
          job_title: "Risk Analyst",
          department: "Compliance",
          country: "Kenya",
          address: "Kilimani",
        },
      ],
    },
    {
      id: "5b05b44g-fd41-7d75-1dh9-bg18g8957490",
      name: "Systems Auditor",
      description:
        "Holds immutable read-only tracking clearances over historical ledger transactions, interaction audit strings, and internal ledger entries updates.",
      createdAt: "2024-08-22T14:30:00.000Z",
      updatedAt: "2026-05-19T11:20:00.000Z",
      deletedAt: null,
      permissions: [
        {
          id: "p_au1",
          name: "Export structural transaction event logs",
          module_id: "901dc2f4-f337-f220-9b73-888f5d760fc4",
        },
        {
          id: "p_au2",
          name: "View chronological cryptographic state adjustments",
          module_id: "global",
        },
      ],
      users: [
        {
          id: "u7",
          public_id: "AN100051",
          email: "b.wanjiku@sacco.co.ke",
          username: "beatrice",
          firstname: "Beatrice",
          lastname: "Wanjiku",
          phone: "+254722987654",
          job_title: "Systems Auditor",
          department: "Internal Audit",
          country: "Kenya",
          address: "Mombasa Rd",
        },
      ],
    },
    {
      id: "6c16c55h-0e52-8e86-2ei0-ch29h9068501",
      name: "Customer Support Lead",
      description:
        "Serves first-tier client interactions, clears validation blocks, executes user resets protocols, and monitors member onboarding processes.",
      createdAt: "2024-11-05T09:12:31.000Z",
      updatedAt: "2026-04-01T10:05:12.000Z",
      deletedAt: null,
      permissions: [
        {
          id: "p_s1",
          name: "Reset member account verification configurations",
          module_id: "iam",
        },
        {
          id: "p_s2",
          name: "Bypass member identity verification blocks",
          module_id: "iam",
        },
      ],
      users: [
        {
          id: "u8",
          public_id: "AN100053",
          email: "d.ochieng@sacco.co.ke",
          username: "david",
          firstname: "David",
          lastname: "Ochieng",
          phone: "+254701234321",
          job_title: "Customer Support Lead",
          department: "Operations",
          country: "Kenya",
          address: "Parklands",
        },
      ],
    },
    {
      id: "7d27d66i-1f63-9f97-3fj1-di30i0179612",
      name: "Treasury Accountant",
      description:
        "Manages financial settlement channels, audits transaction routing nodes, clears payment claims, and tracks core liquidity values.",
      createdAt: "2025-01-10T11:00:00.000Z",
      updatedAt: "2026-01-15T12:00:00.000Z",
      deletedAt: null,
      permissions: [
        {
          id: "p_t1",
          name: "Verify external payment terminal balances",
          module_id: "09854286-a67a-9d59-e10f-78ea6ba2b166",
        },
        {
          id: "p_t2",
          name: "Settle mismatched transactional items",
          module_id: "901dc2f4-f337-f220-9b73-888f5d760fc4",
        },
      ],
      users: [
        {
          id: "u9",
          public_id: "AN100055",
          email: "j.kamau@sacco.co.ke",
          username: "john",
          firstname: "John",
          lastname: "Kamau",
          phone: "+254711999888",
          job_title: "Chief Financial Officer",
          department: "Executive Management",
          country: "Kenya",
          address: "Gigiri",
        },
      ],
    },
    {
      id: "8e38e77j-2g74-0g08-4gk2-ej41j1280723",
      name: "DevOps Administrator",
      description:
        "Maintains platform continuous pipeline deployments, manages database environment variables, maps system modules, and captures infrastructure alerts.",
      createdAt: "2025-02-14T07:45:00.000Z",
      updatedAt: "2026-03-22T08:14:31.000Z",
      deletedAt: null,
      permissions: [
        {
          id: "p_d1",
          name: "Flush platform cache memory and execution modules",
          module_id: "global",
        },
        {
          id: "p_d2",
          name: "Register new application module definitions",
          module_id: "global",
        },
      ],
      users: [
        {
          id: "u10",
          public_id: "AN100052",
          email: "e.kipchoge@sacco.co.ke",
          username: "emmanuel",
          firstname: "Emmanuel",
          lastname: "Kipchoge",
          phone: "+254712345678",
          job_title: "DevOps Engineer",
          department: "IT Infrastructure",
          country: "Kenya",
          address: "CBD",
        },
      ],
    },
  ]);

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

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.id.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full space-y-5 antialiased text-slate-800">
      {/* EXECUTIVE COMMAND MODULE */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/60 pb-6 select-none">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Authorization Roles
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Maintain cryptography claims mapping, audit platform permissions
            matrices, and inspect provisioned operators.
          </p>
        </div>
        <button className="h-10 px-4 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-primary/10 hover:bg-primary/90 transition-all flex items-center gap-2 w-fit cursor-pointer">
          <Plus size={14} />
          <span>Add Role</span>
        </button>
      </div>

      {/* COMPONENT FILTERS WRAPPER */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-2xs p-4 flex justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by system role components..."
            className="w-full h-10 pl-9 pr-4 bg-slate-50 border border-slate-200/60 rounded-xl text-xs font-medium outline-none transition-all focus:bg-white focus:border-primary placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* CORE HIGH-DENSITY PRIVILEGE LEDGER */}
      <div className="w-full bg-white rounded-3xl border border-slate-200/60 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200/60 text-[10px] font-bold text-slate-400 uppercase tracking-widest select-none">
                <th className="py-4.5 px-6">Role ID</th>
                <th className="py-4.5 px-6">Role Name</th>
                <th className="py-4.5 px-6">Role Description</th>
                <th className="py-4.5 px-6">Permissions</th>
                <th className="py-4.5 px-6">Assigned Users</th>
                <th className="py-4.5 px-6">Date Created</th>
                <th className="py-4.5 px-6 text-right pr-8">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-xs tracking-tight font-medium">
              {filteredRoles.map((role) => (
                <tr
                  key={role.id}
                  className="group transition-colors hover:bg-slate-50/50"
                >
                  {/* COL 1: UUID System Identity */}
                  <td className="py-4 px-6 font-mono text-[11px] text-slate-400 select-all">
                    {role.id.substring(0, 8)}...
                    {role.id.substring(role.id.length - 4)}
                  </td>

                  {/* COL 2: Framework Name */}
                  <td className="py-4 px-6 font-bold text-slate-900 text-sm tracking-tight group-hover:text-primary transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="size-5 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400">
                        <Key size={11} />
                      </div>
                      {role.name}
                    </div>
                  </td>

                  {/* COL 3: Description Segment */}
                  <td
                    className="py-4 px-6 text-slate-500 font-normal max-w-xs truncate"
                    title={role.description}
                  >
                    {role.description}
                  </td>

                  {/* COL 4: Clickable Claim Metrics Count */}
                  <td className="py-4 px-6">
                    <button
                      onClick={() =>
                        setSelectedRoleContext({ role, view: "permissions" })
                      }
                      className="inline-flex items-center gap-1.5 font-bold text-primary bg-primary/5 hover:bg-primary/10 px-2.5 py-1 rounded-lg border border-primary/10 cursor-pointer transition-colors"
                    >
                      <ShieldCheck size={13} />
                      <span>{role.permissions.length} Claims</span>
                    </button>
                  </td>

                  {/* COL 5: Clickable User Entities Count */}
                  <td className="py-4 px-6">
                    <button
                      onClick={() =>
                        setSelectedRoleContext({ role, view: "users" })
                      }
                      className="inline-flex items-center gap-1.5 font-bold text-slate-700 bg-slate-100 hover:bg-slate-200/70 px-2.5 py-1 rounded-lg border border-slate-200/40 cursor-pointer transition-colors"
                    >
                      <Users size={13} />
                      <span>{role.users.length} Operators</span>
                    </button>
                  </td>

                  {/* COL 6: ISO Structural Chronology Ingestion Date */}
                  <td className="py-4 px-6 text-slate-500 flex items-center gap-1.5 mt-1.5 font-medium">
                    <Calendar size={13} className="text-slate-400" />
                    {new Date(role.createdAt).toLocaleDateString("en-KE", {
                      dateStyle: "medium",
                    })}
                  </td>

                  {/* COL 7: Dynamic Table Row Action Control Trigger */}
                  <td className="py-4 px-6 text-right pr-8 relative">
                    <div className="flex items-center justify-end">
                      <button
                        onClick={() =>
                          setActiveMenuId(
                            activeMenuId === role.id ? null : role.id,
                          )
                        }
                        className="size-8 rounded-xl border border-slate-200/60 bg-white flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all shadow-3xs cursor-pointer"
                      >
                        <MoreVertical size={14} />
                      </button>

                      {activeMenuId === role.id && (
                        <div
                          ref={(el) => {
                            actionMenuRef.current = el;
                          }}
                          className="absolute right-14 mt-2 w-44 bg-white border border-slate-200/80 rounded-xl shadow-xl p-1.5 z-50 text-left animate-in fade-in slide-in-from-top-1 duration-100"
                        >
                          <button className="w-full h-8 px-2.5 rounded-lg flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer">
                            <History size={12} />
                            <span>Modify Role</span>
                          </button>
                          <button className="w-full h-8 px-2.5 rounded-lg flex items-center gap-2 text-xs font-semibold text-error hover:bg-rose-50/50 transition-colors cursor-pointer">
                            <UserMinus size={12} />
                            <span>Delete Role</span>
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

      {/* DYNAMIC CONTEXTUAL AUDIT PANEL SLIDE DRAWER */}
      {selectedRoleContext && (
        <div className="fixed inset-0 z-50 flex justify-end select-none">
          {/* Drawer Container Panel Body */}
          <div className="fixed top-0 right-0 h-screen w-full max-w-[480px] bg-white shadow-md p-8 py-5 overflow-y-auto flex flex-col justify-between animate-in slide-in-from-right duration-200 z-50">
            <div className="space-y-6">
              {/* Header Configuration Meta */}
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 border border-primary/10 px-2 py-0.5 rounded-md">
                    Security Account Audit Trace
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight pt-1">
                    {selectedRoleContext.role.name} Framework
                  </h3>
                  <p className="text-xs text-slate-400 font-normal leading-relaxed line-clamp-2 italic pt-0.5">
                    "{selectedRoleContext.role.description}"
                  </p>
                </div>
                <button
                  onClick={() => setSelectedRoleContext(null)}
                  className="w-8 h-8 flex-shrink-0 bg-slate-50 border border-slate-200 rounded-full hover:bg-slate-100 transition-colors flex items-center justify-center text-slate-500 cursor-pointer shadow-3xs"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="border-b border-slate-100 pb-2" />

              {/* VIEW CONFIGURATION A: ITEMISED PERMISSIONS CLAIMS MAP */}
              {selectedRoleContext.view === "permissions" && (
                <div className="space-y-3.5">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Layers size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      Authorized System Assertion Claims (
                      {selectedRoleContext.role.permissions.length})
                    </span>
                  </div>
                  <div className="space-y-2 max-h-[calc(100vh-250px)] overflow-y-auto pr-1">
                    {selectedRoleContext.role.permissions.map((perm) => (
                      <div
                        key={perm.id}
                        className="p-3.5 bg-slate-50 border border-slate-200/40 rounded-xl flex items-start gap-3 hover:border-slate-200 transition-colors"
                      >
                        <div className="size-4 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-success shrink-0 mt-0.5">
                          <span className="size-1.5 rounded-full bg-success" />
                        </div>
                        <div className="min-w-0 space-y-0.5">
                          <p className="text-xs font-bold text-slate-700 tracking-tight leading-snug">
                            {perm.name}
                          </p>
                          <span className="text-[9px] font-mono text-slate-400 tracking-wider block uppercase">
                            Module: {perm.module_id.substring(0, 8)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* VIEW CONFIGURATION B: ASSIGNED SYSTEM OPERATORS DIRECTORY */}
              {selectedRoleContext.view === "users" && (
                <div className="space-y-3.5">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Users size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      Provisioned Identity Entities (
                      {selectedRoleContext.role.users.length})
                    </span>
                  </div>
                  <div className="space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto pr-1">
                    {selectedRoleContext.role.users.map((user) => (
                      <div
                        key={user.id}
                        className="border border-slate-100 p-4 rounded-2xl bg-slate-50/40 flex items-start gap-3 hover:border-slate-200 transition-colors"
                      >
                        <div className="size-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 font-bold text-xs shrink-0 shadow-3xs mt-0.5">
                          {user.firstname[0]}
                          {user.lastname[0]}
                        </div>
                        <div className="min-w-0 flex flex-col space-y-1 w-full">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-slate-900 text-sm tracking-tight">
                              {user.firstname} {user.lastname}
                            </span>
                            <span className="font-mono text-[9px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                              {user.public_id}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                            <Briefcase size={11} /> {user.job_title} •{" "}
                            {user.department}
                          </span>
                          <div className="flex flex-col space-y-0.5 text-[11px] text-slate-400/90 font-medium pt-1 border-t border-dashed border-slate-200/60 mt-1">
                            <span className="flex items-center gap-1.5">
                              <Mail size={11} className="text-slate-400" />{" "}
                              {user.email}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Smartphone
                                size={11}
                                className="text-slate-400"
                              />{" "}
                              {user.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
