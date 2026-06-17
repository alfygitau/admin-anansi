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
import { useQuery } from "react-query";
import { useToast } from "../../contexts/ToastProvider";
import { getRoles } from "../../sdk/roles/roles";

export default function RolesTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoleContext, setSelectedRoleContext] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const actionMenuRef = useRef(null);
  const { showToast } = useToast();
  const [roles, setRoles] = useState([]);

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

  useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const response = await getRoles();
      return response.data?.data;
    },
    onSuccess: (data) => {
      setRoles(data);
    },
    onError: (error) => {
      showToast({
        title: "Roles processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  return (
    <div className="w-full space-y-5 antialiased text-slate-800">
      {/* EXECUTIVE COMMAND MODULE */}
      <div className="flex justify-between gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/60 pb-6 select-none">
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
              {roles?.length > 0 ? (
                roles.map((role) => (
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
                        <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                          No roles found
                        </h3>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed">
                          We couldn't find any system roles or permission
                          profiles matching your current search terms or
                          advanced drawer filter parameters.
                        </p>
                      </div>
                      <button
                        type="button"
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
