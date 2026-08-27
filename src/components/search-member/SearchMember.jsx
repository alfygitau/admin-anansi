import React, { useState, useEffect } from "react";
import {
  X,
  Search,
  User,
  Phone,
  ArrowRight,
  Loader2,
  AlertCircle,
  RotateCcw,
  UserCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDebounce } from "../../hooks/useDebounce";
import { getMembers, searchMembers } from "../../sdk/members/members";
import { useQuery, keepPreviousData } from "react-query";
import { useToast } from "../../contexts/ToastProvider";
import { useNavigate } from "react-router-dom";

export default function MemberSearch({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 400);
  const { showToast } = useToast();
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  const { data, isFetching, error } = useQuery({
    queryKey: ["members", debouncedSearch],
    queryFn: async () => {
      const response = await searchMembers(searchTerm);
      return response.data.data;
    },
    enabled: Boolean(debouncedSearch.trim()),
    placeholderData: keepPreviousData,
    onSuccess: (data) => {
      setMembers(data?.items);
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

  const handleReset = () => {
    setSearchTerm("");
    setMembers([]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex justify-end bg-zinc-950/20 font-sans antialiased text-slate-800"
        >
          {/* Backdrop Dismiss */}
          <div className="absolute inset-0" onClick={onClose} />

          {/* Drawer Modal Shell */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white relative w-full max-w-[480px] h-full shadow-2xl flex flex-col z-10 overflow-hidden"
          >
            {/* Modal Header */}
            <div className="px-8 pt-6 pb-4 flex items-center justify-between border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#074073]">
                    Account Directory
                  </span>
                </div>
                <h2 className="text-xl font-bold text-[#074073] mt-0.5">
                  Search Member
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Locate member profiles via live system search.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex items-center justify-center w-8 h-8 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 rounded-full transition-all cursor-pointer active:scale-95"
              >
                <X size={16} />
              </button>
            </div>

            {/* Input Search Field Section */}
            <div className="p-8 py-5 border-b border-slate-100 bg-slate-50/50">
              <FilterField label="Global Member Query" icon={Search}>
                <input
                  type="text"
                  placeholder="Search member name, ID, phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                  className="w-full pl-[74px] pr-10 h-14 bg-white border border-slate-200 rounded-2xl outline-none focus:border-[#074073] transition-all text-xs font-semibold text-slate-800 placeholder:text-slate-400 shadow-3xs"
                />
                {isFetching && (
                  <div className="absolute right-4 top-0 bottom-0 flex items-center">
                    <Loader2
                      size={16}
                      className="animate-spin text-[#074073]"
                    />
                  </div>
                )}
              </FilterField>
            </div>

            {/* Scrollable Results List */}
            <div className="flex-1 overflow-y-auto p-8 space-y-3">
              {/* Initial State */}
              {members?.length === 0 && !isFetching && (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-2 text-slate-400 select-none">
                  <Search size={36} className="text-slate-300 stroke-1" />
                  <p className="text-xs font-bold text-slate-600">
                    Start typing to search
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Search members by name, ID number, or phone details.
                  </p>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3 text-xs text-rose-700 font-semibold">
                  <AlertCircle
                    size={16}
                    className="shrink-0 text-rose-600 mt-0.5"
                  />
                  <span>{error}</span>
                </div>
              )}

              {/* Empty Results State */}
              {!isFetching && members?.length === 0 && !error && (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-2 text-slate-400 select-none">
                  <User size={36} className="text-slate-300 stroke-1" />
                  <p className="text-xs font-bold text-slate-600">
                    No members found
                  </p>
                  <p className="text-[11px] text-slate-400">
                    No matches found for "
                    <span className="font-semibold text-slate-700">
                      {searchTerm}
                    </span>
                    "
                  </p>
                </div>
              )}

              {/* Results List */}
              {!isFetching &&
                members?.map((member) => (
                  <div
                    key={member?.id || member?.public_id}
                    onClick={() => {
                      onClose();
                      navigate(`/admin/apply-loan/products/${member?.id}`);
                    }}
                    className="group p-4 bg-slate-50/60 border border-slate-200/80 hover:border-[#074073] hover:bg-blue-50/30 rounded-2xl transition-all cursor-pointer flex items-center justify-between shadow-3xs"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="size-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 font-extrabold text-xs shrink-0 group-hover:bg-[#074073] group-hover:text-white group-hover:border-[#074073] transition-colors shadow-3xs">
                        {member?.firstname?.[0]}
                        {member?.lastname?.[0]}
                      </div>

                      <div className="min-w-0 flex flex-col space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-800 truncate capitalize">
                            {member?.firstname} {member?.middlename}{" "}
                            {member?.lastname}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-[#074073] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100 shrink-0">
                            {member?.public_id || member?.id}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-[11px] text-slate-400">
                          <span className="flex items-center gap-1 font-medium text-slate-500">
                            <Phone
                              size={11}
                              className="shrink-0 text-slate-400"
                            />
                            {member?.mobileno || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="size-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-[#074073] group-hover:text-white group-hover:border-[#074073] transition-all shrink-0">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                ))}
            </div>

            {/* Footer Control Dock */}
            <div className="px-8 py-4 border-t border-slate-100 flex items-center justify-between gap-3 bg-slate-50/50">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center justify-center gap-2 h-12 px-5 font-bold text-xs text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>Clear Search</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-1 h-12 font-bold text-xs bg-[#074073] text-white rounded-2xl hover:bg-[#052d52] transition-all shadow-md shadow-[#074073]/20 cursor-pointer active:scale-[0.98]"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const FilterField = ({ label, icon: Icon, children }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
      {label}
    </label>
    <div className="relative group flex items-center">
      <div className="absolute left-0 top-0 bottom-0 flex items-center pl-6 pointer-events-none z-10">
        <Icon
          size={18}
          className="text-slate-400 group-focus-within:text-[#074073] transition-colors"
        />
        <div className="w-[1.5px] h-5 bg-slate-200 ml-4 group-focus-within:bg-[#074073]/30 transition-colors" />
      </div>
      {children}
    </div>
  </div>
);
