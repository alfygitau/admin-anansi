import {
  ArrowLeft,
  Plus,
  Shield,
  ShieldCheck,
  Pencil,
  Eye,
  CheckCircle2,
  XCircle,
  Users,
  Award,
  Vote,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useFormatAmount } from "../../../hooks/useFormatAmount";
import { getMembershipTypes } from "../../../sdk/membership/membership";
import { useState } from "react";
import { useToast } from "../../../contexts/ToastProvider";

export const MembershipTypes = () => {
  const navigate = useNavigate();
  const formatAmount = useFormatAmount();
  const [membershipTypes, setMembershipTypes] = useState();
  const { showToast } = useToast();

  const { isFetching } = useQuery({
    queryKey: ["get membership types"],
    queryFn: async () => {
      const response = await getMembershipTypes();
      return response.data?.data;
    },
    onSuccess: (data) => {
      setMembershipTypes(data);
    },
    onError: (error) => {
      showToast({
        title: "Couldn't load membership types",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  return (
    <div className="w-full space-y-6 select-none">
      {/* 1. PAGE HEADER */}
      <div className="flex flex-row sm:flex-col sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 transition-all cursor-pointer shrink-0 shadow-3xs"
            title="Go Back"
          >
            <ArrowLeft size={16} />
          </button>

          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span>Settings</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
              Membership Types
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Define membership tiers, registration fees, minimum share capital,
              and governance rights.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin/membership-types/approvals")}
            className="flex items-center justify-center gap-2 h-10 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-3xs"
          >
            <Shield size={15} className="text-[#074073]" />
            <span>Approvals Queue</span>
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/admin/membership-types/add-membership-type")
            }
            className="flex items-center justify-center gap-2 h-10 px-4 bg-slate-900 hover:bg-[#074073] text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs"
          >
            <Plus size={15} />
            <span>New Membership Type</span>
          </button>
        </div>
      </div>

      {/* 2. MEMBERSHIP TYPES TABLE */}
      <div className="w-full overflow-x-auto rounded-2xl border border-slate-200/70 bg-white shadow-2xs">
        <table className="w-full text-left border-collapse table-auto">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-200/60 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <th className="py-4.5 px-6">Tier Details</th>
              <th className="py-4.5 px-6">Entrance & Capital</th>
              <th className="py-4.5 px-6">Monthly Savings</th>
              <th className="py-4.5 px-6">Governance & Rights</th>
              <th className="py-4.5 px-6">Status</th>
              <th className="py-4.5 px-6 text-right pr-8">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs tracking-tight">
            {isFetching ? (
              // Skeleton loader rows while fetching data
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  {/* Col 1: Tier Details Skeleton */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-200 shrink-0" />
                      <div className="flex flex-col space-y-1.5 w-full">
                        <div className="h-3 w-20 bg-slate-200 rounded" />
                        <div className="h-4 w-32 bg-slate-200 rounded" />
                        <div className="h-3 w-24 bg-slate-200 rounded" />
                      </div>
                    </div>
                  </td>

                  {/* Col 2: Entrance & Capital Skeleton */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col space-y-1.5">
                      <div className="h-3.5 w-24 bg-slate-200 rounded" />
                      <div className="h-3 w-20 bg-slate-200 rounded" />
                    </div>
                  </td>

                  {/* Col 3: Monthly Savings Skeleton */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col space-y-1.5">
                      <div className="h-3.5 w-20 bg-slate-200 rounded" />
                      <div className="h-3 w-16 bg-slate-200 rounded" />
                    </div>
                  </td>

                  {/* Col 4: Rights Skeleton */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col space-y-1.5">
                      <div className="h-3.5 w-28 bg-slate-200 rounded" />
                      <div className="h-3 w-20 bg-slate-200 rounded" />
                    </div>
                  </td>

                  {/* Col 5: Status Skeleton */}
                  <td className="py-4 px-6">
                    <div className="h-5 w-16 bg-slate-200 rounded-md" />
                  </td>

                  {/* Col 6: Actions Skeleton */}
                  <td className="py-4 px-6 text-right pr-8">
                    <div className="h-8 w-28 bg-slate-200 rounded-xl ml-auto" />
                  </td>
                </tr>
              ))
            ) : membershipTypes?.length > 0 ? (
              membershipTypes.map((type) => (
                <tr
                  key={type.id}
                  className="group transition-colors hover:bg-slate-50/60"
                >
                  {/* Col 1: Tier Name, Code & Target Category */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#074073] shadow-2xs shrink-0 group-hover:scale-105 transition-transform">
                        <Users size={18} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-slate-400">
                          <span>{type.code ?? "N/A"}</span>
                          <span>•</span>
                          <span className="capitalize">
                            {type.category || "Individual"}
                          </span>
                        </div>
                        <h4 className="font-extrabold text-slate-900 truncate group-hover:text-primary transition-colors text-sm">
                          {type.name}
                        </h4>
                        <span className="text-[10px] font-medium text-slate-400 block truncate">
                          Audience:{" "}
                          <span className="capitalize text-slate-600">
                            {type.target_audience || "General Public"}
                          </span>
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Col 2: Entrance Fee & Share Capital Requirement */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col space-y-0.5">
                      <span className="font-semibold text-slate-800">
                        {formatAmount(type.registration_fee ?? 0)}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        Min Share Cap:{" "}
                        <strong className="text-slate-600 font-semibold">
                          {formatAmount(type.min_share_capital ?? 0)}
                        </strong>
                      </span>
                    </div>
                  </td>

                  {/* Col 3: Mandatory Recurring Monthly Contribution */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col space-y-0.5">
                      <span className="font-semibold text-slate-800">
                        {formatAmount(type.min_monthly_contribution ?? 0)}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium capitalize">
                        {type.contribution_frequency || "Monthly"} Deposit
                      </span>
                    </div>
                  </td>

                  {/* Col 4: Governance, Voting & Dividend Eligibility */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                        <Vote
                          size={13}
                          className={
                            type.has_voting_rights
                              ? "text-emerald-600"
                              : "text-slate-300"
                          }
                        />
                        <span>
                          {type.has_voting_rights
                            ? "Voting Rights"
                            : "Non-Voting"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                            type.can_guarantee_loans
                              ? "bg-blue-50 text-blue-700 border border-blue-200/60"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {type.can_guarantee_loans
                            ? "Can Guarantee"
                            : "No Guarantor"}
                        </span>
                        {type.earns_dividends && (
                          <span className="flex items-center gap-0.5 text-emerald-600 font-semibold">
                            <Award size={11} />
                            Dividends
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Col 5: Status Badge */}
                  <td className="py-4 px-6">
                    <div
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wider w-fit ${
                        type.status === "active" || type.status === "live"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                          : type.status === "pending" ||
                              type.status === "pending_approval"
                            ? "bg-amber-50 text-amber-700 border-amber-200/60"
                            : "bg-rose-50 text-rose-700 border-rose-200/60"
                      }`}
                    >
                      {type.status === "active" || type.status === "live" ? (
                        <CheckCircle2 size={12} />
                      ) : type.status === "pending" ||
                        type.status === "pending_approval" ? (
                        <Sparkles size={12} />
                      ) : (
                        <XCircle size={12} />
                      )}
                      <span>{type.status || "Inactive"}</span>
                    </div>
                  </td>

                  {/* Col 6: Action Triggers */}
                  <td className="py-4 px-6 text-right pr-8">
                    <div className="flex items-center justify-end gap-2">
                      {/* Review Action (if pending approval) */}
                      {(type.status === "pending" ||
                        type.status === "pending_approval" ||
                        type.has_pending_changes) && (
                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/admin/membership-types/${type.id}/review`,
                            )
                          }
                          className="h-8 px-3 rounded-xl bg-amber-50 border border-amber-200/80 inline-flex items-center justify-center gap-1.5 text-amber-700 hover:bg-amber-100 hover:border-amber-300 transition-all shadow-2xs font-bold cursor-pointer"
                          title="Review Pending Changes"
                        >
                          <ShieldCheck size={13} />
                          <span className="text-[11px]">Review</span>
                        </button>
                      )}

                      {/* Edit Action */}
                      {type.status !== "pending_approval" && (
                        <button
                          type="button"
                          onClick={() =>
                            navigate(`/admin/membership-types/${type.id}/edit`)
                          }
                          className="h-8 px-3 rounded-xl bg-slate-50 border border-slate-200 inline-flex items-center justify-center gap-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all shadow-2xs font-bold cursor-pointer"
                          title="Edit Membership Tier"
                        >
                          <Pencil size={13} />
                          <span className="text-[11px]">Edit</span>
                        </button>
                      )}

                      {/* View Action */}
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/admin/membership-types/${type.id}`)
                        }
                        className="h-8 px-3 rounded-xl bg-slate-50 border border-slate-200 inline-flex items-center justify-center gap-1.5 text-slate-600 hover:bg-[#074073] hover:text-white hover:border-[#074073] transition-all shadow-2xs font-bold cursor-pointer"
                        title="View Members in this Tier"
                      >
                        <Eye size={13} />
                        <span className="text-[11px]">View</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center text-slate-400 font-medium text-xs"
                >
                  No membership tiers found. Click "New Membership Type" to set
                  one up.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
