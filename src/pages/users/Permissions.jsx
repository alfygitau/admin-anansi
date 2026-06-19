import React, { useState } from "react";
import {
  ArrowLeft,
  Search,
  Shield,
  ShieldCheck,
  Calendar,
  Eye,
  Settings,
  Plus,
  Key,
  Layers,
  MoreVertical,
  Trash2,
  Edit,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddPermission from "../../components/permission/AddPermission";
import { useToast } from "../../contexts/ToastProvider";
import { useQuery } from "react-query";
import { getModules } from "../../sdk/users/users";

export default function Permissions() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddPermission, setShowAddPermission] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const { showToast } = useToast();
  const [modulesList, setModulesList] = useState([]);

  const [formData, setFormData] = useState({
    permissionName: "",
    module_id: "",
    moduleName: "",
  });

  const { isFetching } = useQuery({
    queryKey: ["get modules"],
    queryFn: async () => {
      const response = await getModules();
      return response?.data?.data;
    },
    onSuccess: (data) => {
      setModulesList(data);
    },
    onError: (error) => {
      showToast({
        title: "Transactions processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  return (
    <>
      <AddPermission
        isOpen={showAddPermission}
        onClose={() => setShowAddPermission(false)}
        formData={formData}
        setFormData={setFormData}
      />
      <div className="w-full space-y-6 font-sans antialiased text-slate-800">
        {/* 1. APP MODULE DIRECTORY CONTROLS HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-5 select-none w-full">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="size-10 rounded-xl border border-slate-200/80 bg-white flex items-center justify-center text-slate-500 hover:text-slate-900 shadow-3xs cursor-pointer transition-all active:scale-95"
              >
                <ArrowLeft size={16} />
              </button>
              <div>
                <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
                  Security & Access Control Center
                </span>
                <h1 className="text-xl font-black tracking-tight text-slate-900 mt-0.5">
                  Permission Modules
                </h1>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowAddPermission(true)}
              className="h-10 px-4 bg-[#074073] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:bg-[#052d52] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Plus size={14} strokeWidth={2.5} />
              <span>Add Permission Module</span>
            </button>
          </div>

          {/* TOP CONTROLS: ACTION RIGGERS */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            {/* SEARCH COMPONENT INPUT */}
            <div className="relative w-full sm:w-60 group">
              <Search
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
              />
              <input
                type="text"
                placeholder="Search sections..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 pl-9 pr-4 bg-slate-50/60 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none transition-all focus:bg-white focus:border-[#074073] placeholder:text-slate-400 placeholder:font-normal shadow-3xs"
              />
            </div>
          </div>
        </div>

        {/* 3. CORE PREMIUM APP MODULES DIRECTORY TABLE VIEW */}
        <div className="bg-white border border-slate-200/60 shadow-sm rounded-[24px] overflow-hidden w-full">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans table-auto">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200/60 text-[10px] font-bold text-slate-400 uppercase tracking-widest select-none">
                  <th className="py-4.5 px-6">Module Name & Code</th>
                  <th className="py-4.5 px-6">Display Name / Alias</th>
                  <th className="py-4.5 px-6 max-w-sm">Active Permissions</th>
                  <th className="py-4.5 px-6">Date Created</th>
                  <th className="py-4.5 px-6 text-right pr-8">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-xs tracking-tight">
                {isFetching ? (
                  Array(10)
                    .fill(0)
                    .map((_, index) => (
                      <tr
                        key={`module-skeleton-${index}`}
                        className="animate-pulse border-b border-slate-100 last:border-none"
                      >
                        {/* Column 1: Module Name & Code Skeleton */}
                        <td className="py-4 px-6">
                          <div className="flex items-start gap-3">
                            {/* Module Icon Box Mock */}
                            <div className="size-8 rounded-xl bg-slate-100 shrink-0 mt-0.5" />
                            <div className="space-y-2">
                              {/* Module Code Badge Line */}
                              <div className="h-3.5 w-14 bg-slate-100 rounded" />
                              {/* Primary Title Line */}
                              <div className="h-4 w-36 bg-slate-200 rounded" />
                            </div>
                          </div>
                        </td>

                        {/* Column 2: Display Name / Alias Skeleton */}
                        <td className="py-4 px-6 align-middle">
                          <div className="h-4 w-28 bg-slate-100 rounded" />
                        </td>

                        {/* Column 3: Attached Permissions Badges Skeleton */}
                        <td className="py-4 px-6 align-middle max-w-xs md:max-w-sm">
                          <div className="flex flex-wrap gap-1.5 items-center">
                            {/* Mock Permission Pills */}
                            <div className="h-5 w-16 bg-slate-100 rounded-md" />
                            <div className="h-5 w-24 bg-slate-100 rounded-md" />
                            <div className="h-5 w-20 bg-slate-100 rounded-md" />
                            {/* "+ More" indicator placeholder */}
                            <div className="h-5 w-12 bg-slate-200/60 rounded-md" />
                          </div>
                        </td>

                        {/* Column 4: Date Created Skeleton */}
                        <td className="py-4 px-6 align-middle">
                          <div className="flex items-center gap-1.5">
                            {/* Calendar Icon Placeholder */}
                            <div className="size-3.5 bg-slate-100 rounded-sm shrink-0" />
                            {/* Date Label */}
                            <div className="h-3.5 w-16 bg-slate-200 rounded" />
                          </div>
                        </td>

                        {/* Column 5: Action Controls Skeleton Row */}
                        <td className="py-4 px-6 text-right pr-8 align-middle">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* View Details Button Box Mock */}
                            <div className="size-8 rounded-xl bg-slate-100 border border-slate-200/30 shrink-0" />
                            {/* Options Dropdown Button Box Mock */}
                            <div className="size-8 rounded-xl bg-slate-100 border border-slate-200/30 shrink-0" />
                          </div>
                        </td>
                      </tr>
                    ))
                ) : modulesList.length > 0 ? (
                  modulesList.map((mod) => (
                    <tr
                      key={mod.id}
                      className="group transition-colors hover:bg-slate-50/60"
                    >
                      {/* Column 1: Module Name & Code */}
                      <td className="py-4 px-6">
                        <div className="flex items-start gap-3">
                          <div className="size-8 rounded-xl bg-slate-50 border border-slate-200/40 flex items-center justify-center text-slate-400 shrink-0 mt-0.5 group-hover:bg-blue-50 group-hover:text-[#074073] transition-colors">
                            <Shield size={14} />
                          </div>
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2 select-none">
                              <span className="font-sans font-bold text-[9px] tracking-wider uppercase px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                                Code {mod.moduleCode}
                              </span>
                            </div>
                            <span className="font-bold text-slate-900 text-sm tracking-tight block">
                              {mod.name}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Column 2: Display Name / Alias */}
                      <td className="py-4 px-6 align-middle">
                        <span className="font-semibold text-slate-700 tracking-tight text-sm">
                          {mod.permissionAlias}
                        </span>
                      </td>

                      {/* Column 3: Attached Permissions */}
                      <td className="py-4 px-6 align-middle max-w-xs md:max-w-sm">
                        <div className="flex flex-wrap gap-1.5 items-center select-none">
                          {mod.permissions.slice(0, 3).map((perm) => (
                            <span
                              key={perm.id}
                              className="inline-flex items-center text-[10px] font-medium text-slate-600 bg-slate-50 border border-slate-200/60 px-2 py-0.5 rounded-md"
                            >
                              {perm.name}
                            </span>
                          ))}
                          {mod.permissions.length > 3 && (
                            <span className="text-[10px] font-bold text-[#074073] bg-blue-50/60 border border-blue-100/50 px-1.5 py-0.5 rounded-md">
                              +{mod.permissions.length - 3} more permissions
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Column 4: Date Created */}
                      <td className="py-4 px-6 align-middle select-none">
                        <div className="flex items-center gap-1.5 text-slate-500 font-medium font-mono">
                          <Calendar
                            size={13}
                            className="text-slate-400 shrink-0"
                          />
                          <span>
                            {new Date(mod.createdAt).toLocaleDateString(
                              "en-KE",
                              {
                                dateStyle: "medium",
                              },
                            )}
                          </span>
                        </div>
                      </td>

                      {/* Column 5: Actions */}
                      <td className="py-4 px-6 text-right pr-8 align-middle">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() =>
                              navigate(`/admin/security-modules/${mod.id}`)
                            }
                            className="size-8 rounded-xl border border-slate-200/60 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-slate-50 hover:border-slate-300 transition-all shadow-3xs bg-white cursor-pointer"
                            title="View Details"
                          >
                            <Eye size={13} />
                          </button>
                          <div className="relative inline-block text-left">
                            {/* THREE VERTICAL DOTS TRIGGER */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenuId(
                                  activeMenuId === mod.id ? null : mod.id,
                                );
                              }}
                              className={`size-8 rounded-xl border flex items-center justify-center transition-all shadow-3xs cursor-pointer bg-white ${
                                activeMenuId === mod.id
                                  ? "border-[#074073] text-[#074073] bg-blue-50/20 ring-4 ring-[#074073]/5"
                                  : "border-slate-200/60 text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                              }`}
                              title="More Actions"
                            >
                              <MoreVertical size={14} />
                            </button>

                            {/* DROP-DOWN CONTEXT PANEL */}
                            {activeMenuId === mod.id && (
                              <>
                                {/* Invisible backdrop to close the menu when clicking anywhere outside */}
                                <div
                                  className="fixed inset-0 z-40 cursor-default"
                                  onClick={() => setActiveMenuId(null)}
                                />

                                <div className="absolute right-0 mt-1.5 w-48 bg-white border border-slate-200/80 rounded-xl shadow-xl p-1 z-50 origin-top-right animate-in fade-in slide-in-from-top-1 duration-100">
                                  {/* ACTION 1: ADD PERMISSION */}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      console.log(
                                        "Adding new permission rule to module:",
                                        mod.id,
                                      );
                                      setActiveMenuId(null);
                                    }}
                                    className="w-full h-9 px-2.5 rounded-lg flex items-center gap-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors text-left cursor-pointer group"
                                  >
                                    <Plus
                                      size={13}
                                      className="text-slate-400 group-hover:text-[#074073] transition-colors"
                                    />
                                    <span>Add Permission</span>
                                  </button>

                                  {/* ACTION 2: EDIT MODULE */}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      console.log(
                                        "Editing setup profile parameters for module:",
                                        mod.id,
                                      );
                                      setActiveMenuId(null);
                                    }}
                                    className="w-full h-9 px-2.5 rounded-lg flex items-center gap-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors text-left cursor-pointer group"
                                  >
                                    <Edit
                                      size={13}
                                      className="text-slate-400 group-hover:text-[#074073] transition-colors"
                                    />
                                    <span>Edit Module</span>
                                  </button>

                                  <div className="h-px bg-slate-100 my-1" />

                                  {/* ACTION 3: DELETE MODULE (DESTRUCTIVE WARNING) */}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      console.log(
                                        "Initiating hard wipe purge tracking lifecycle for module ID:",
                                        mod.id,
                                      );
                                      setActiveMenuId(null);
                                    }}
                                    className="w-full h-9 px-2.5 rounded-lg flex items-center gap-2.5 text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50/60 transition-colors text-left cursor-pointer group"
                                  >
                                    <Trash2
                                      size={13}
                                      className="text-rose-400 group-hover:text-rose-600 transition-colors"
                                    />
                                    <span>Delete Module</span>
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  /* Fallback State for Empty Search Results */
                  <tr>
                    <td
                      colSpan={5}
                      className="py-12 text-center text-slate-400 font-medium select-none"
                    >
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <ShieldCheck size={22} className="text-slate-300" />
                        <p className="text-xs">
                          No app modules match your search filters.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

/* ==========================================================================
   SUPPORTIVE UTILITY BANNER CHASSIS
   ========================================================================== */

const SummaryBlock = ({ label, icon, children }) => (
  <div className="bg-white border border-slate-200/60 shadow-sm rounded-[20px] p-4.5 flex items-start gap-3.5 w-full h-full justify-start">
    <div className="size-8 rounded-xl bg-slate-50 border border-slate-200/40 flex items-center justify-center text-slate-400 shrink-0 mt-0.5 shadow-3xs">
      {React.cloneElement(icon, { size: 14 })}
    </div>
    <div className="min-w-0 flex-1">
      <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 block pb-1">
        {label}
      </span>
      {children}
    </div>
  </div>
);
