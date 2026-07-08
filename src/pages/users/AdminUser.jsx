import React, { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  User,
  ShieldCheck,
  Mail,
  Smartphone,
  MapPin,
  Building2,
  Key,
  Clock,
  Activity,
  ShieldAlert,
  Sliders,
  ChevronDown,
  Fingerprint,
  Calendar,
  History,
  Edit,
} from "lucide-react";

export default function AdminUser() {
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const actionMenuRef = useRef(null);

  // Synced directly to your comprehensive database schema blueprint
  const [user, setUser] = useState({
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
    county: "",
    subcounty: "",
    address: "Westlands",
    status: "Active",
    suspended: null,
    refresh_token: null,
    role_id: "2e92e11d-ca18-4a42-8ae6-fd85d5624167",
    counter: null,
    logintimes: 142,
    reset_otp_hash: "$2a$08$UPQ7c8C2MnztRIaqanX2...",
    reset_otp_expires: "2026-06-16T12:00:00.000Z",
    reset_otp_attempts: 0,
    reset_otp_last_sent: "2026-06-16T11:45:00.000Z",
    reset_otp_verified_at: "2026-06-16T11:47:12.000Z",
    reset_otp_verified_expires: "2026-06-16T12:47:12.000Z",
    createdAt: "2026-06-10T06:30:46.467Z",
    updatedAt: "2026-06-16T08:20:51.791Z",
    deletedAt: null,
    role: {
      id: "2e92e11d-ca18-4a42-8ae6-fd85d5624167",
      name: "Super Admin",
      description:
        "Super Admin: Holds supreme authority and comprehensive control over the entire system, overseeing and managing all aspects of administrative functions and user access with unparalleled permissions.",
      createdAt: "2024-01-09T05:49:03.451Z",
      updatedAt: "2024-01-15T12:31:10.564Z",
      deletedAt: null,
    },
  });

  // Handle outside layout clicks to gracefully fold action drop panels
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        actionMenuRef.current &&
        !actionMenuRef.current.contains(event.target)
      ) {
        setIsActionMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleSuspension = () => {
    setUser((prev) => ({
      ...prev,
      status: prev.status === "Active" ? "Suspended" : "Active",
      suspended: prev.status === "Active" ? true : null,
    }));
    setIsActionMenuOpen(false);
  };

  return (
    <div className="w-full space-y-8 font-sans antialiased text-slate-800">
      {/* EXECUTIVE IDENTITY COMMAND HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200/60 pb-6 select-none">
        <div className="flex items-center gap-4">
          <button className="size-10 rounded-xl border border-slate-200/80 bg-white flex items-center justify-center text-slate-500 hover:text-primary shadow-xs cursor-pointer">
            <ArrowLeft size={16} />
          </button>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-sans font-bold text-[9px] tracking-wider uppercase px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                {user.public_id}
              </span>
              <span
                className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 ${
                  user.status === "Active"
                    ? "bg-success/10 text-success"
                    : "bg-error/10 text-error"
                }`}
              >
                <span
                  className={`size-1.5 rounded-full ${user.status === "Active" ? "bg-success" : "bg-error"}`}
                />
                {user.status}
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-primary mt-1.5">
              {user.firstname} {user.lastname}
            </h1>
          </div>
        </div>

        {/* HIGH-PRIVILEGE POPOVER CONTROL COCKPIT */}
        <div className="relative inline-block text-left" ref={actionMenuRef}>
          <button
            type="button"
            onClick={() => setIsActionMenuOpen(!isActionMenuOpen)}
            className={`h-11 px-4 border rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2.5 cursor-pointer shadow-xs ${
              isActionMenuOpen
                ? "border-primary bg-primary/5 text-primary ring-4 ring-primary/5"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Sliders size={14} />
            <span>Manage User</span>
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${isActionMenuOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isActionMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200/80 rounded-2xl shadow-xl p-2 z-50 origin-top-right animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-2 border-b border-slate-100 mb-1 select-none">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Privileged Assertions
                </p>
              </div>
              <div className="space-y-1">
                <MenuActionButton
                  icon={<History size={13} />}
                  label="View Access Logs"
                  onClick={() => setIsActionMenuOpen(false)}
                />
                <MenuActionButton
                  icon={<Edit size={13} />}
                  label="Edit User"
                  onClick={() => setIsActionMenuOpen(false)}
                />
                <MenuActionButton
                  icon={<ShieldAlert size={13} />}
                  label={
                    user.status === "Active" ? "Suspend User" : "Activate User"
                  }
                  onClick={handleToggleSuspension}
                  variant={user.status === "Active"}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SYMMETRIC ARCHITECTURAL WORKSPACE CANVAS MATRIX (6 High-Density Structural Blocks) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* CONTAINER 1: CORE BIOGRAPHICAL VECTORS */}
        <IdentityCard
          title="Biographical Identity Verification"
          icon={<User size={16} />}
        >
          <TelemetryItem
            icon={<User />}
            label="Global Administrative Registry Name"
            value={`${user.firstname} ${user.lastname}`}
          />
          <TelemetryItem
            icon={<Fingerprint />}
            label="System Terminal Security Alias"
            value={`@${user.username}`}
          />
          <TelemetryItem
            icon={<Mail />}
            label="Primary Route Communications Email"
            value={user.email}
          />
          <TelemetryItem
            icon={<Smartphone />}
            label="Mobile Communications Vector"
            value={user.phone}
          />
          <TelemetryItem
            icon={<ShieldCheck />}
            label="Internal Database Primary ID"
            value={user.id}
          />
        </IdentityCard>

        {/* CONTAINER 2: CORPORATE ALLOCATION LOCATORS */}
        <IdentityCard
          title="Corporate Assignment & Location"
          icon={<Building2 size={16} />}
        >
          <TelemetryItem
            icon={<Building2 />}
            label="Corporate Business Department"
            value={user.department}
          />
          <TelemetryItem
            icon={<ShieldCheck />}
            label="Operational Job Designation Title"
            value={user.job_title}
          />
          <TelemetryItem
            icon={<Smartphone />}
            label="Office Landline Physical Terminal"
            value={user.office_phone}
          />
          <TelemetryItem
            icon={<MapPin />}
            label="Assigned Structural Hub Address"
            value={user.address}
          />
          <TelemetryItem
            icon={<MapPin />}
            label="Jurisdiction Sovereign Country"
            value={user.country}
          />
          <TelemetryItem
            icon={<ShieldCheck />}
            label="Regional County Placement Vector"
            value={user.county || "Global / Unassigned"}
          />
        </IdentityCard>

        {/* CONTAINER 3: AUTHORITY SCHEMA & RBAC CONTROL */}
        <IdentityCard
          title="Assigned Role-Based Access Framework"
          icon={<Key size={16} />}
        >
          <TelemetryItem
            icon={<Key />}
            label="Privilege Framework Cluster Name"
            value={user.role.name}
          />
          <TelemetryItem
            icon={<ShieldCheck />}
            label="Global Role Matrix Component ID"
            value={user.role.id}
          />
          <TelemetryItem
            icon={<Calendar />}
            label="RBAC Schema Structural Ingestion Date"
            value={new Date(user.role.createdAt).toLocaleDateString("en-KE")}
          />
          <TelemetryItem
            icon={<Clock />}
            label="Last Authority Configuration Update"
            value={new Date(user.role.updatedAt).toLocaleDateString("en-KE")}
          />
          <div className="md:col-span-2 bg-slate-50 border border-slate-100 rounded-xl p-4 mt-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
              Scope Declaration Context
            </span>
            <blockquote className="text-xs font-medium text-slate-600 leading-relaxed italic">
              "{user.role.description}"
            </blockquote>
          </div>
        </IdentityCard>

        {/* CONTAINER 4: TERMINAL LIFECYCLE AUDIT ENGINE */}
        <IdentityCard
          title="Interactive Lifecycle Amortization Logs"
          icon={<Activity size={16} />}
        >
          <TelemetryItem
            icon={<Activity />}
            label="Aggregated System Interaction Logs"
            value={`${user.logintimes} Cleared Access Sessions`}
          />
          <TelemetryItem
            icon={<Calendar />}
            label="Profile Initialization Timestamp"
            value={new Date(user.createdAt).toLocaleDateString("en-KE")}
          />
          <TelemetryItem
            icon={<Clock />}
            label="Last Database Synchronization State"
            value={new Date(user.updatedAt).toLocaleDateString("en-KE")}
          />
          <TelemetryItem
            icon={<ShieldCheck />}
            label="Soft Deletion State Reference Flag"
            value={user.deletedAt ? "Flagged True" : "Clean Asset Record"}
          />
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 mt-1">
            <BooleanIndicatorRow
              label="Privileged Operator Suspension"
              active={user.suspended !== null}
              value={user.suspended ? "Revoked Access" : "Cleared Parameter"}
            />
            <BooleanIndicatorRow
              label="Token Lifecycle Reference Presence"
              active={user.refresh_token !== null}
              value={user.refresh_token ? "Token Initialized" : "Token Purged"}
            />
          </div>
        </IdentityCard>
      </div>
    </div>
  );
}

/* ==========================================================================
   SUPPORTIVE CHILD UTILITY WRAPPERS
   ========================================================================== */

const IdentityCard = ({ title, icon, children }) => (
  <div className="bg-white border border-slate-200/60 shadow-sm rounded-[24px] overflow-hidden w-full h-full">
    <div className="px-5 py-4 bg-slate-50/60 border-b border-slate-100 flex items-center gap-2.5 select-none">
      <div className="size-7 rounded-lg bg-white border border-slate-200/60 flex items-center justify-center text-slate-400 shadow-2xs">
        {icon}
      </div>
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
        {title}
      </h3>
    </div>
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
      {children}
    </div>
  </div>
);

const TelemetryItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 min-w-0">
    <div className="size-8 rounded-xl bg-slate-50 border border-slate-200/40 flex items-center justify-center text-slate-400 shrink-0 shadow-2xs mt-0.5">
      {React.cloneElement(icon, { size: 14 })}
    </div>
    <div className="min-w-0 flex flex-col space-y-1.5">
      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 leading-normal">
        {label}
      </span>
      <span className="text-sm font-semibold text-slate-800 tracking-tight leading-normal truncate">
        {value}
      </span>
    </div>
  </div>
);

const BooleanIndicatorRow = ({ label, value, active }) => (
  <div className="flex items-center justify-between min-w-0 gap-3 w-full">
    <span className="text-[11px] font-semibold text-slate-500 truncate">
      {label}
    </span>
    <span
      className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md shrink-0 border ${
        active
          ? "bg-rose-50 border-rose-100 text-error"
          : "bg-emerald-50 border-emerald-100 text-success"
      }`}
    >
      {value}
    </span>
  </div>
);

const MenuActionButton = ({ icon, label, onClick, variant = false }) => (
  <button
    onClick={onClick}
    className={`w-full h-10 px-3 rounded-xl flex items-center gap-3 text-xs font-semibold transition-colors text-left cursor-pointer group ${
      variant
        ? "text-error hover:bg-rose-50/50 font-bold"
        : "text-slate-600 hover:text-primary hover:bg-slate-50"
    }`}
  >
    <div
      className={`size-6 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-400 transition-colors ${
        variant
          ? "group-hover:text-error group-hover:bg-rose-50 group-hover:border-rose-100"
          : "group-hover:text-primary group-hover:bg-primary/5"
      }`}
    >
      {icon}
    </div>
    <span>{label}</span>
  </button>
);
