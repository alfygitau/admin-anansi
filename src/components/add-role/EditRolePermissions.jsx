import React, { useState, useEffect } from "react";
import {
  X,
  Lock,
  Search,
  CheckCircle2,
  Save,
  Loader2,
  Check,
  ShieldCheck,
  Layers,
  PiggyBank,
  Scale,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock permission dataset modeled specifically for your SACCO structure
const SACCO_PERMISSIONS = [
  {
    id: "perm_mem_view",
    name: "View Member Registry",
    category: "Member Management",
    desc: "Access core profile directories and demographics",
    icon: Layers,
  },
  {
    id: "perm_mem_create",
    name: "Register New Members",
    category: "Member Management",
    desc: "Create records and configure baseline account linkages",
    icon: Layers,
  },
  {
    id: "perm_mem_edit",
    name: "Modify Member Data",
    category: "Member Management",
    desc: "Adjust personal records and change dormancy state overrides",
    icon: Layers,
  },

  {
    id: "perm_loan_underwrite",
    name: "Commit Underwriting Quorum",
    category: "Credit Operations",
    desc: "Cast formal administrative votes on high-value loan files",
    icon: Scale,
  },
  {
    id: "perm_loan_disburse",
    name: "Trigger Fund Disbursement",
    category: "Credit Operations",
    desc: "Authorize final payment line release vectors to member wallets",
    icon: Scale,
  },
  {
    id: "perm_loan_restructure",
    name: "Restructure Active Loans",
    category: "Credit Operations",
    desc: "Recalculate terms, adjust penalties, or extend timelines",
    icon: Scale,
  },

  {
    id: "perm_fin_reconcile",
    name: "Verify Manual Receipts",
    category: "Financial Control",
    desc: "Review and clear member-submitted bank or mobile slips",
    icon: PiggyBank,
  },
  {
    id: "perm_fin_withdraw_auth",
    name: "Approve Large Outflows",
    category: "Financial Control",
    desc: "Sign off on high-frequency institutional cash pool transfers",
    icon: PiggyBank,
  },
];

export default function AssignPermissions({
  isOpen,
  onClose,
  onSave,
  roleName = "Credit Auditor", // Context display title
  initialSelectedIds = [], // Permissions the role already holds
  loading,
}) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Sync incoming database states when the drawer panel loads
  useEffect(() => {
    if (isOpen) {
      setSelectedIds(initialSelectedIds);
    }
  }, [isOpen, initialSelectedIds]);

  const handleTogglePermission = (id) => {
    if (loading) return;
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleSelectAllInGroup = (groupPermissions) => {
    if (loading) return;
    const groupIds = groupPermissions.map((p) => p.id);
    const allGroupIdsSelected = groupIds.every((id) =>
      selectedIds.includes(id),
    );

    if (allGroupIdsSelected) {
      // Remove all permissions belonging to this category
      setSelectedIds((prev) => prev.filter((id) => !groupIds.includes(id)));
    } else {
      // Add missing permissions from this category
      setSelectedIds((prev) => [...new Set([...prev, ...groupIds])]);
    }
  };

  const handleSubmit = async () => {
    if (loading) return;
    // Format response payload string array explicitly matching your endpoint structure
    const payload = {
      permission_ids: selectedIds,
    };
    await onSave?.(payload);
  };

  // Group and sort items by module type while accommodating active search filters
  const filteredPermissions = SACCO_PERMISSIONS.filter(
    (perm) =>
      perm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      perm.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      perm.desc.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const categories = [...new Set(SACCO_PERMISSIONS.map((p) => p.category))];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex justify-end bg-zinc-950/20 font-sans antialiased text-slate-800"
        >
          {/* Backdrop Dismissal Guard */}
          <div
            className="absolute inset-0"
            onClick={!loading ? onClose : undefined}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="bg-white relative w-full max-w-[480px] h-full shadow-2xl flex flex-col z-10"
          >
            {/* Header Identity Core */}
            <div className="px-8 pt-5 pb-5 select-none relative">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="absolute top-5 right-5 w-8 h-8 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-gray-500 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-3xs active:scale-95"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-2.5">
                <div className="size-6 rounded-lg bg-blue-50 border border-blue-100 text-[#074073] flex items-center justify-center">
                  <Lock size={12} strokeWidth={2.5} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#074073]">
                  Security Protocol Matrix
                </span>
              </div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1.5">
                Assign Key Permissions
              </h2>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Configuring active structural authorizations for{" "}
                <span className="text-[#074073] font-bold">{roleName}</span>.
              </p>
            </div>

            {/* Real-time Directory Search Deck */}
            <div className="px-8 pb-4 select-none">
              <div className="relative group w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-300 group-focus-within:text-[#074073] transition-colors">
                  <Search size={15} />
                </div>
                <input
                  type="text"
                  placeholder="Filter keys e.g., disbursement, write, view..."
                  value={searchQuery}
                  disabled={loading}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 h-11 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#074073] focus:bg-white transition-all shadow-3xs"
                />
              </div>
            </div>

            <div className="border-b mx-8 border-slate-100"></div>

            {/* Scrollable Capability Container */}
            <div className="flex-1 overflow-y-auto px-8 py-5 space-y-6">
              {categories.map((cat) => {
                const groupPerms = filteredPermissions.filter(
                  (p) => p.category === cat,
                );
                if (groupPerms.length === 0) return null;

                const allGroupSelected = groupPerms
                  .map((p) => p.id)
                  .every((id) => selectedIds.includes(id));

                return (
                  <div key={cat} className="space-y-2.5">
                    {/* Category Divider Header Block */}
                    <div className="flex items-center justify-between px-1 select-none">
                      <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                        {cat}
                      </span>
                      <button
                        type="button"
                        disabled={loading}
                        onClick={() => handleSelectAllInGroup(groupPerms)}
                        className="text-[10px] font-bold text-[#074073] hover:underline cursor-pointer disabled:opacity-40"
                      >
                        {allGroupSelected
                          ? "Deselect Category"
                          : "Grant Category"}
                      </button>
                    </div>

                    {/* Permission Item Selection Rows */}
                    <div className="space-y-2">
                      {groupPerms.map((perm) => {
                        const isChecked = selectedIds.includes(perm.id);
                        const ItemIcon = perm.icon;

                        return (
                          <div
                            key={perm.id}
                            onClick={() => handleTogglePermission(perm.id)}
                            className={`w-full p-3.5 border rounded-2xl flex items-center gap-4 text-left transition-all relative overflow-hidden group select-none ${
                              loading
                                ? "cursor-not-allowed opacity-60"
                                : "cursor-pointer"
                            } ${
                              isChecked
                                ? "border-[#074073] bg-blue-50/20 ring-1 ring-[#074073]/10"
                                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                            }`}
                          >
                            {/* Check Target Shell */}
                            <div
                              className={`size-5 rounded-lg border shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                                isChecked
                                  ? "bg-[#074073] border-[#074073] text-white"
                                  : "border-slate-200 bg-slate-50 group-hover:border-slate-300"
                              }`}
                            >
                              {isChecked && <Check size={12} strokeWidth={3} />}
                            </div>

                            {/* Label Text Metadata */}
                            <div className="space-y-0.5 flex-1 min-w-0">
                              <p
                                className={`text-xs font-bold leading-tight transition-colors ${
                                  isChecked
                                    ? "text-[#074073]"
                                    : "text-slate-800"
                                }`}
                              >
                                {perm.name}
                              </p>
                              <p className="text-[11px] text-slate-400 font-medium leading-normal">
                                {perm.desc}
                              </p>
                            </div>

                            {/* Subtle Inline Label Signature */}
                            <div
                              className={`p-1.5 rounded-lg border shrink-0 ${
                                isChecked
                                  ? "bg-white border-blue-100 text-[#074073]"
                                  : "bg-slate-50 border-slate-100 text-slate-300"
                              }`}
                            >
                              <ItemIcon size={12} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Empty Search Fallback */}
              {filteredPermissions.length === 0 && (
                <div className="py-12 text-center space-y-2 select-none">
                  <ShieldCheck size={32} className="text-slate-200 mx-auto" />
                  <p className="text-xs font-bold text-slate-400">
                    No matching clearance parameters found
                  </p>
                  <p className="text-[11px] text-slate-400/80 font-medium">
                    Verify your query criteria and try searching again.
                  </p>
                </div>
              )}
            </div>

            {/* Total Tracker Badge & Action Footer Dock */}
            <div className="p-8 py-4.5 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between gap-4 select-none">
              <div className="text-left">
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block">
                  Volume Selected
                </span>
                <span className="text-xs font-black text-[#074073] font-mono">
                  {selectedIds.length} Key{selectedIds.length !== 1 && "s"}{" "}
                  Authorized
                </span>
              </div>

              <div className="flex gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="h-11 px-5 font-bold text-xs bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-3xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`h-11 px-6 font-bold text-xs text-white rounded-xl shadow-md flex items-center justify-center gap-2 transition-all ${
                    loading
                      ? "bg-[#074073]/70 cursor-not-allowed text-white/80"
                      : "bg-[#074073] hover:bg-[#052d52] cursor-pointer active:scale-[0.98]"
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 size={13} className="animate-spin" />
                      <span>Syncing Matrix...</span>
                    </>
                  ) : (
                    <>
                      <Save size={13} />
                      <span>Save Permissions</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
