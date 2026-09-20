import React, { useState } from "react";
import {
  Users,
  Search,
  Plus,
  Building2,
  ShieldCheck,
  Wallet,
  Eye,
  ArrowRight,
  ChevronRight,
  Phone,
  Mail,
  Filter,
  Download,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const GroupsList = ({ groups = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const navigate = useNavigate();

  const onCreateNew = () => {
    navigate(`/admin/add-group-account`);
  };

  const onViewDetails = (id) => {
    navigate(`/admin/group-accounts/${id}`);
  };

  // Mock sample data if no groups are passed in props (useful for quick testing/preview)
  const defaultGroups = [
    {
      group_id: "GRP-2026-4819",
      groupName: "Umoja Investment Chama",
      groupType: "Investment Chama",
      registrationNumber: "SOC/8923/2025",
      officialEmail: "umoja.investment@gmail.com",
      groupPhone: "+254 712 345678",
      signatoryRule: "Any 2 of 3 Mandated Signatories",
      monthlyContribution: 10000,
      memberCount: 8,
      status: "Active",
    },
    {
      group_id: "GRP-2026-1024",
      groupName: "Tumaini Family Pool",
      groupType: "Family Pool",
      registrationNumber: "",
      officialEmail: "tumainipool@outlook.com",
      groupPhone: "+254 722 987654",
      signatoryRule: "Chairperson & Treasurer (Mandatory)",
      monthlyContribution: 5000,
      memberCount: 5,
      status: "Active",
    },
    {
      group_id: "GRP-2026-9032",
      groupName: "Boresha Youth Welfare",
      groupType: "Youth Group",
      registrationNumber: "YTH/4412/2026",
      officialEmail: "boreshayouth@yahoo.com",
      groupPhone: "+254 733 112233",
      signatoryRule: "Any 1 Signatory",
      monthlyContribution: 2000,
      memberCount: 14,
      status: "Pending Verification",
    },
  ];

  const activeGroupsList = groups.length > 0 ? groups : defaultGroups;

  // Filter groups based on search and status
  const filteredGroups = activeGroupsList.filter((group) => {
    const matchesSearch =
      group.groupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.group_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.officialEmail.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || group.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-slate-50/50 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full space-y-6 flex-1 flex flex-col"
      >
        {/* Top Header Panel */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 border-slate-100">
          <div>
            <h1 className="text-2xl font-bold text-[#074073] flex items-center gap-2.5">
              Group Directory
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Manage all registered investment pools, chamas, and collective
              welfare organizations.
            </p>
          </div>

          <button
            type="button"
            onClick={onCreateNew}
            className="px-6 h-12 bg-[#074073] hover:bg-[#052d52] text-white font-bold text-xs rounded-2xl transition-all shadow-md shadow-[#074073]/20 flex items-center justify-center gap-2 cursor-pointer self-start md:self-auto"
          >
            <Plus size={16} />
            <span>Create New Group</span>
          </button>
        </div>

        {/* Search and Filters Toolbar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Search Input (Takes up 2 columns on medium screens) */}
          <div className="md:col-span-2 relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10">
              <Search size={16} className="text-[#074073]" />
              <div className="w-[1px] h-4 bg-slate-200 ml-3" />
            </div>
            <input
              type="text"
              placeholder="Search by Batch ID, Description, or Uploader..."
              className="w-full pl-[58px] pr-4 h-12 bg-slate-50/60 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#074073] transition-all shadow-3xs"
            />
          </div>

          {/* Action Buttons (Filter & Export) aligned to the end */}
          <div className="flex items-center justify-end gap-2">
            <button className="flex items-center gap-1.5 h-12 px-5 border border-slate-200 bg-slate-50/60 text-slate-700 rounded-2xl text-xs font-bold hover:bg-slate-100 transition-all shadow-3xs">
              <Filter size={14} className="text-[#074073]" />
              <span>Filter</span>
            </button>
            <button className="flex items-center gap-1.5 h-12 px-5 border border-slate-200 bg-slate-50/60 text-slate-700 rounded-2xl text-xs font-bold hover:bg-slate-100 transition-all shadow-3xs">
              <Download size={14} className="text-[#074073]" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Groups Data Grid / Table */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex-1 flex flex-col">
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <th className="py-4 px-6">Group Profile & ID</th>
                  <th className="py-4 px-6">Type & Registration</th>
                  <th className="py-4 px-6">Communication Contact</th>
                  <th className="py-4 px-6">Members</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right pr-8">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredGroups.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="py-16 text-center text-slate-400 text-xs font-medium"
                    >
                      No group accounts found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredGroups.map((group) => (
                    <tr
                      key={group.group_id}
                      className="group transition-colors hover:bg-slate-50/40"
                    >
                      {/* Col 1: Identity */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-[#074073] text-sm shrink-0">
                            <Building2 size={18} />
                          </div>
                          <div className="flex flex-col space-y-0.5">
                            <span className="font-mono w-fit text-[9px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded">
                              {group.group_id}
                            </span>
                            <span className="font-bold text-slate-800 text-sm tracking-tight">
                              {group.groupName}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Col 2: Type & Reg */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col space-y-1">
                          <span className="font-semibold text-slate-700 text-xs">
                            {group.groupType}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {group.registrationNumber || (
                              <span className="text-slate-400">—</span>
                            )}
                          </span>
                        </div>
                      </td>

                      {/* Col 3: Contact */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col space-y-1">
                          <span className="font-medium text-slate-700 text-xs flex items-center gap-1.5">
                            <Phone size={12} className="text-slate-400" />
                            {group.groupPhone}
                          </span>
                          <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                            <Mail size={12} className="text-slate-400" />
                            {group.officialEmail}
                          </span>
                        </div>
                      </td>

                      {/* Col 4: Financials & Members */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col space-y-1">
                          <span className="text-[11px] text-slate-500 font-medium">
                            <strong className="text-[#074073]">
                              {group.memberCount || 0}
                            </strong>
                          </span>
                        </div>
                      </td>

                      {/* Col 5: Status */}
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1.5 text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-lg border w-fit ${
                            group.status === "Active"
                              ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                              : "bg-amber-50 border-amber-100 text-amber-600"
                          }`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${group.status === "Active" ? "bg-emerald-500" : "bg-amber-500"}`}
                          />
                          {group.status}
                        </span>
                      </td>

                      {/* Col 6: Actions */}
                      <td className="py-4 px-6 text-right pr-8">
                        <button
                          onClick={() =>
                            onViewDetails
                              ? onViewDetails(group.group_id)
                              : alert(`Inspecting group: ${group.group_id}`)
                          }
                          className="h-9 px-3.5 rounded-xl border border-slate-200/60 inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-white hover:bg-[#074073] hover:border-[#074073] transition-all shadow-3xs bg-white cursor-pointer"
                          title="Manage Group Members & Portfolio"
                        >
                          <span>Manage</span>
                          <ChevronRight size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GroupsList;
