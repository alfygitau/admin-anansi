import React, { useState } from "react";
import {
  ArrowLeft,
  User,
  Mail,
  Smartphone,
  Lock,
  Building2,
  Briefcase,
  MapPin,
  Globe,
  Key,
  Fingerprint,
  ArrowUpRight,
} from "lucide-react";

export default function AddAdminUser() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    office_phone: "",
    job_title: "",
    department: "",
    country: "Kenya",
    county: "",
    subcounty: "",
    address: "",
    role_id: "",
  });

  // Mock roles table matching your exact RBAC structure for selection binding
  const availableRoles = [
    { id: "2e92e11d-ca18-4a42-8ae6-fd85d5624167", name: "Super Admin" },
    { id: "3f83f22e-db29-5b53-9bf7-fe96e6735278", name: "Risk Officer" },
    { id: "4a94a33f-ec30-6c64-0cg8-af07f7846389", name: "Credit Manager" },
    { id: "5b05b44g-fd41-7d75-1dh9-bg18g8957490", name: "Systems Auditor" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Ingestion pipeline logic hooks directly here
    console.log("Transmitting identity parameters to IAM engine:", formData);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="w-full space-y-8 font-sans antialiased text-slate-800"
    >
      {/* 1. TOP PROCESS NAVIGATION & GLOBAL ACTIONS */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200/60 pb-6 select-none">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="size-10 rounded-xl border border-slate-200/80 bg-white flex items-center justify-center text-slate-500 hover:text-slate-900 shadow-xs cursor-pointer transition-all"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-sans font-bold text-[9px] tracking-wider uppercase px-2 py-0.5 bg-primary/5 text-primary rounded-md border border-primary/10">
                IAM Pipeline
              </span>
              <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
                Directory Provisioning Controls
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1.5">
              Add Administrative User
            </h1>
          </div>
        </div>
      </div>

      {/* 2. THREE-PANEL HIGH DENSITY CONFIGURATION CANVAS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* PANEL A: BIOGRAPHICAL & AUTHENTICATION CONTEXT */}
        <FormCard title="Biographical Information" icon={<User size={16} />}>
          <FormInput
            icon={<User />}
            label="Legal First Name"
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
            placeholder="e.g., Rodney"
            required
          />
          <FormInput
            icon={<User />}
            label="Legal Last Name"
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
            placeholder="e.g., Chelal"
            required
          />
          <FormInput
            icon={<Fingerprint />}
            label="System Terminal Alias (Username)"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="e.g., rodney"
            required
          />
          <FormInput
            icon={<Mail />}
            label="Corporate Registry Email Route"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="e.g., username@sacco.co.ke"
            required
          />
          <FormInput
            icon={<Lock />}
            label="Secure Authentication Passphrase"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="••••••••••••"
            required
          />
        </FormCard>

        {/* PANEL B: CORPORATE ALLOCATION & PRIVILEGE LIFESPAN */}
        <FormCard title="Contact Information" icon={<Building2 size={16} />}>
          <FormInput
            icon={<Building2 />}
            label="Corporate Business Department"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            placeholder="e.g., IT Infrastructure"
            required
          />
          <FormInput
            icon={<Briefcase />}
            label="Job Designation Title"
            name="job_title"
            value={formData.job_title}
            onChange={handleInputChange}
            placeholder="e.g., CyberSec Analyst"
            required
          />
          <FormInput
            icon={<Smartphone />}
            label="Primary Mobile Number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="e.g., +254721545347"
            required
          />
          <FormInput
            icon={<Smartphone />}
            label="Alternate Mobile Number"
            name="office_phone"
            value={formData.office_phone}
            onChange={handleInputChange}
            placeholder="e.g., 0724122252"
          />

          {/* RBAC Selection Engine */}
          <FormSelect
            icon={<Key />}
            label="Assigned Role"
            name="role_id"
            value={formData.role_id}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled hidden>
              Select authorization role...
            </option>
            {availableRoles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </FormSelect>
        </FormCard>

        {/* PANEL C: JURISDICTIONAL DEPLOYMENT BOUNDS */}
        <div className="lg:col-span-2">
          <FormCard title="Geographical Location" icon={<Globe size={16} />}>
            <FormInput
              icon={<Globe />}
              label="Jurisdiction Sovereign Country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              placeholder="e.g., Kenya"
              required
            />
            <FormInput
              icon={<MapPin />}
              label="Regional County Placement"
              name="county"
              value={formData.county}
              onChange={handleInputChange}
              placeholder="e.g., Nairobi County"
            />
            <FormInput
              icon={<MapPin />}
              label="Sub-County Demarcation"
              name="subcounty"
              value={formData.subcounty}
              onChange={handleInputChange}
              placeholder="e.g., Westlands Sub-County"
            />
            <FormInput
              icon={<MapPin />}
              label="Physical Hub Address Headquarters"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="e.g., Westlands Branch, Suite 4B"
              required
            />
          </FormCard>
        </div>
      </div>

      {/* LOWER FIXED ACTIONS COMMAND DOCK BAR */}
      <div className="bg-white rounded-[24px] border border-slate-200/60 p-4 flex items-center justify-end gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <button
          type="button"
          className="h-11 px-5 border border-slate-200/80 bg-white text-slate-600 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
        >
          Cancel & Purge
        </button>
        <button
          onClick={handleFormSubmit}
          type="submit"
          className="h-11 px-6 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-primary/10 hover:bg-primary/90 transition-all active:scale-97 cursor-pointer flex items-center gap-2"
        >
          <span>Add User Product</span>
          <ArrowUpRight size={14} />
        </button>
      </div>
    </form>
  );
}

/* ==========================================================================
   SUPPORTIVE WORKSPACE REUSABLE UI CHASSIS
   ========================================================================== */

const FormCard = ({ title, icon, children }) => (
  <div className="bg-white border border-slate-200/60 shadow-sm rounded-[24px] overflow-hidden w-full h-full">
    <div className="px-5 py-4 bg-slate-50/60 border-b border-slate-100 flex items-center gap-2.5 select-none">
      <div className="size-7 rounded-lg bg-white border border-slate-200/60 flex items-center justify-center text-slate-400 shadow-2xs">
        {icon}
      </div>
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
        {title}
      </h3>
    </div>
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      {children}
    </div>
  </div>
);

export const FormInput = ({ icon, label, ...props }) => (
  <div className="flex flex-col space-y-2 w-full min-w-0">
    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block select-none">
      {label}{" "}
      {props.required && (
        <span className="text-error/70 font-sans ml-0.5">*</span>
      )}
    </label>
    <div className="relative w-full group">
      {/* Premium Prefix Icon Container */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4 flex items-center justify-center pointer-events-none z-10 group-focus-within:text-primary transition-colors">
        {React.cloneElement(icon, { size: 14 })}
      </div>

      {/* Vertical Geometric Separator Line */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 w-px h-4 bg-slate-200/80 group-focus-within:bg-primary/30 transition-colors pointer-events-none z-10" />

      {/* High-Density Input Control Field (CHANGED pl-13 to pl-12) */}
      <input
        {...props}
        className="w-full h-12 pl-12 pr-4 bg-slate-50/60 border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-800 outline-none transition-all focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 placeholder:text-slate-400 placeholder:font-normal font-sans"
      />
    </div>
  </div>
);

export const FormSelect = ({ icon, label, children, ...props }) => (
  <div className="flex flex-col space-y-2 w-full min-w-0">
    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block select-none">
      {label}{" "}
      {props.required && (
        <span className="text-error/70 font-sans ml-0.5">*</span>
      )}
    </label>
    <div className="relative w-full group">
      {/* Premium Prefix Icon Container */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4 flex items-center justify-center pointer-events-none z-10 group-focus-within:text-primary transition-colors">
        {React.cloneElement(icon, { size: 14 })}
      </div>

      {/* Vertical Geometric Separator Line */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 w-px h-4 bg-slate-200/80 group-focus-within:bg-primary/30 transition-colors pointer-events-none z-10" />

      {/* High-Density Custom Selector Dropdown (CHANGED pl-13 to pl-12) */}
      <select
        {...props}
        className="w-full h-12 pl-12 pr-10 bg-slate-50/60 border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-800 outline-none transition-all focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 appearance-none font-sans cursor-pointer"
      >
        {children}
      </select>
      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m 6,9 6,6 6,-6" />
        </svg>
      </div>
    </div>
  </div>
);
