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
  Filter,
  Download,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import UsersFilter from "../../components/filters/UsersFilter";
import { useQuery } from "react-query";
import { getUsers } from "../../sdk/users/users";
import { useToast } from "../../contexts/ToastProvider";
import Pagination from "../../components/pagination/Pagination";
import { getRoles } from "../../sdk/roles/roles";
import { useFormattedDateTime } from "../../hooks/useFormatDateTime";

export default function AllUsers() {
  const [activeMenuId, setActiveMenuId] = useState(null);
  const actionMenuRef = useRef(null);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [totalItems, setTotalItems] = useState(0);
  const [roles, setRoles] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const formatDateTime = useFormattedDateTime();
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    q: "",
    status: "",
    role: "",
    fromDate: "",
    toDate: "",
  });
  const [adminUsers, setAdminUsers] = useState([]);

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
    setActiveMenuId(null);
  };

  const { isFetching } = useQuery({
    queryKey: [
      "get users",
      filters?.page,
      filters?.limit,
      filters?.status,
      filters?.q,
      filters?.role,
      filters.fromDate,
      filters.toDate,
    ],
    queryFn: async () => {
      const response = await getUsers(
        filters?.page,
        filters?.limit,
        filters?.status,
        filters?.q,
        filters?.role,
        filters.fromDate,
        filters.toDate,
      );
      return response?.data?.data;
    },
    onSuccess: (data) => {
      setAdminUsers(data?.items);
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

  const handleResetFilters = () => {
    setFilters({
      page: 1,
      limit: 10,
      q: "",
      status: "",
      role: "",
      fromDate: "",
      toDate: "",
    });
  };

  return (
    <>
      <UsersFilter
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        roles={roles}
        filters={filters}
        setFilters={setFilters}
      />
      <div className="w-full space-y-5 antialiased text-slate-800">
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
          <div className="relative w-full md:w-72">
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
              placeholder="Search by ID, name, or email..."
              className="w-full h-10 pl-9 pr-4 bg-slate-50 border border-slate-200/60 rounded-xl text-xs font-medium outline-none transition-all focus:bg-white focus:border-secondary placeholder:text-slate-400 font-sans"
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
              {isFetching ? (
                Array.from({ length: 10 }).map((_, i) => (
                  <tr
                    key={`skeleton-${i}`}
                    className="animate-pulse border-b border-slate-100"
                  >
                    {/* Col 1: Identity Profile Snapshot */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col space-y-2">
                        <div className="h-3 w-20 bg-slate-200 rounded" />
                        <div className="h-4 w-32 bg-slate-200 rounded" />
                      </div>
                    </td>

                    {/* Col 2: Communications Matrix */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col space-y-2">
                        <div className="h-3 w-36 bg-slate-200 rounded" />
                        <div className="h-3 w-28 bg-slate-200 rounded" />
                      </div>
                    </td>

                    {/* Col 3: Department Corporate Structure */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col space-y-2">
                        <div className="h-3 w-28 bg-slate-200 rounded" />
                        <div className="h-3 w-24 bg-slate-200 rounded" />
                      </div>
                    </td>

                    {/* Col 4: RBAC Assigned Framework */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col space-y-2">
                        <div className="h-3 w-24 bg-slate-200 rounded" />
                        <div className="h-3 w-36 bg-slate-200 rounded" />
                      </div>
                    </td>

                    {/* Col 5: Security Clearance */}
                    <td className="py-4 px-6">
                      <div className="h-5 w-20 bg-slate-200 rounded-md" />
                    </td>

                    {/* Col 6: Actions */}
                    <td className="py-4 px-6 text-right pr-8">
                      <div className="size-8 rounded-xl bg-slate-200 ml-auto" />
                    </td>
                  </tr>
                ))
              ) : adminUsers?.length > 0 ? (
                adminUsers?.map((user) => (
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
                          <Mail size={12} className="text-slate-400" />{" "}
                          {user.email}
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
                            {formatDateTime(user.createdAt)}
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
                          No users found
                        </h3>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed">
                          We couldn't find any user records matching your
                          current search terms or advanced drawer filter
                          parameters.
                        </p>
                      </div>
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
    </>
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
