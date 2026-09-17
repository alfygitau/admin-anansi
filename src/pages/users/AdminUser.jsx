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
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../contexts/ToastProvider";
import { useQuery } from "react-query";
import { getUser } from "../../sdk/users/users";

export default function AdminUser() {
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const actionMenuRef = useRef(null);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { id } = useParams();

  const [user, setUser] = useState({});

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

  useQuery({
    queryKey: ["get user"],
    queryFn: async () => {
      const response = await getUser(id);
      return response.data?.data;
    },
    onSuccess: (data) => {
      setUser(data || {});
    },
    onError: (error) => {
      showToast({
        title: "User processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  return (
    <div className="w-full space-y-8 font-sans antialiased text-slate-800">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200/60 pb-6 select-none">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="size-10 rounded-xl border border-slate-200/80 bg-white flex items-center justify-center text-slate-500 hover:text-primary shadow-xs cursor-pointer"
          >
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

        {/* USER ACTIONS DROPDOWN */}
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
                  Quick Actions
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
                  label="Edit User Profile"
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

      {/* USER INFORMATION SECTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* CARD 1: PERSONAL INFORMATION */}
        <IdentityCard title="Personal Information" icon={<User size={16} />}>
          <TelemetryItem
            icon={<User />}
            label="Full Name"
            value={`${user.firstname} ${user.lastname}`}
          />
          <TelemetryItem
            icon={<Fingerprint />}
            label="Username"
            value={`@${user.username}`}
          />
          <TelemetryItem
            icon={<Mail />}
            label="Email Address"
            value={user.email}
          />
          <TelemetryItem
            icon={<Smartphone />}
            label="Mobile Phone"
            value={user.phone}
          />
          <TelemetryItem
            icon={<ShieldCheck />}
            label="User ID"
            value={user.id}
          />
        </IdentityCard>

        {/* CARD 2: WORKPLACE & LOCATION */}
        <IdentityCard
          title="Workplace & Location"
          icon={<Building2 size={16} />}
        >
          <TelemetryItem
            icon={<Building2 />}
            label="Department"
            value={user.department}
          />
          <TelemetryItem
            icon={<ShieldCheck />}
            label="Job Title"
            value={user.job_title}
          />
          <TelemetryItem
            icon={<Smartphone />}
            label="Office Phone"
            value={user.office_phone}
          />
          <TelemetryItem
            icon={<MapPin />}
            label="Office Address"
            value={user.address}
          />
          <TelemetryItem
            icon={<MapPin />}
            label="Country"
            value={user.country}
          />
          <TelemetryItem
            icon={<ShieldCheck />}
            label="County"
            value={user.county || "Not Specified"}
          />
        </IdentityCard>

        {/* CARD 3: ROLE & PERMISSIONS */}
        <IdentityCard title="Role & Permissions" icon={<Key size={16} />}>
          <TelemetryItem
            icon={<Key />}
            label="Assigned Role"
            value={user?.role?.name}
          />
          <TelemetryItem
            icon={<ShieldCheck />}
            label="Role ID"
            value={user?.role?.id}
          />
          <TelemetryItem
            icon={<Calendar />}
            label="Role Created Date"
            value={new Date(user?.role?.createdAt)?.toLocaleDateString("en-KE")}
          />
          <TelemetryItem
            icon={<Clock />}
            label="Last Role Update"
            value={new Date(user?.role?.updatedAt)?.toLocaleDateString("en-KE")}
          />
          <div className="md:col-span-2 bg-slate-50 border border-slate-100 rounded-xl p-4 mt-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
              Role Description
            </span>
            <blockquote className="text-xs font-medium text-slate-600 leading-relaxed italic">
              "{user?.role?.description}"
            </blockquote>
          </div>
        </IdentityCard>

        {/* CARD 4: ACCOUNT ACTIVITY & STATUS */}
        <IdentityCard
          title="Account Activity & History"
          icon={<Activity size={16} />}
        >
          <TelemetryItem
            icon={<Activity />}
            label="Total Logins"
            value={`${user.logintimes} Sessions`}
          />
          <TelemetryItem
            icon={<Calendar />}
            label="Account Created"
            value={new Date(user.createdAt).toLocaleDateString("en-KE")}
          />
          <TelemetryItem
            icon={<Clock />}
            label="Last Profile Update"
            value={new Date(user.updatedAt).toLocaleDateString("en-KE")}
          />
          <TelemetryItem
            icon={<ShieldCheck />}
            label="Deletion Status"
            value={user.deletedAt ? "Deleted" : "Active Record"}
          />
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 mt-1">
            <BooleanIndicatorRow
              label="Account Suspension"
              active={user.suspended !== null}
              value={user.suspended ? "Suspended" : "Not Suspended"}
            />
            <BooleanIndicatorRow
              label="Active Session Token"
              active={user.refresh_token !== null}
              value={user.refresh_token ? "Present" : "None Active"}
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
