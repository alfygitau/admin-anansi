import React, { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Coins,
  Edit3,
  Save,
  X,
  Info,
  ShieldCheck,
  Power,
  Sliders,
  AlertTriangle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { getSettings, updateSettings } from "../../../sdk/referral/referral";
import { useToast } from "../../../contexts/ToastProvider";
import { useFormatAmount } from "../../../hooks/useFormatAmount";

export const Referral = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [rewardAmount, setRewardAmount] = useState(0);

  const [activeEditor, setActiveEditor] = useState(null);
  const [draftReward, setDraftReward] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState(false);
  const { showToast } = useToast();
  const formatAmount = useFormatAmount();

  // 1. Fetch current settings
  const { isFetching, refetch } = useQuery({
    queryKey: ["get settings for referral"],
    queryFn: async () => {
      const response = await getSettings();
      return response.data?.data;
    },
    onSuccess: (data) => {
      if (data) {
        const reward = Number(data?.reward_per_referral) || 0;
        const active = Boolean(data?.is_referral_program_active);
        setRewardAmount(reward);
        setIsActive(active);
        setDraftReward(reward);
      }
    },
    onError: (error) => {
      showToast({
        title: "Couldn't load referral settings",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const { mutate: editReferral, isLoading: updating } = useMutation({
    mutationKey: ["update referral"],
    mutationFn: async (payload) => {
      const response = await updateSettings(payload);
      return response.data;
    },
    onSuccess: () => {
      refetch();
      setActiveEditor(null);
      showToast({
        title: "Settings saved",
        type: "success",
        position: "top-right",
        description: "Your referral changes are now live.",
      });
    },
    onError: (error) => {
      showToast({
        title: "Couldn't update settings",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  // Handlers for Reward Editing
  const openRewardEditor = () => {
    setDraftReward(rewardAmount);
    setActiveEditor(activeEditor === "reward" ? null : "reward");
  };

  const saveRewardChanges = () => {
    const parsedReward = Math.max(0, Number(draftReward) || 0);
    editReferral({
      reward_per_referral: parsedReward,
      is_referral_program_active: Boolean(isActive),
    });
  };

  // Handlers for Status Editing
  const openStatusEditor = () => {
    if (activeEditor === "status") {
      setActiveEditor(null);
    } else {
      setSelectedStatus(isActive);
      setActiveEditor("status");
    }
  };

  const saveStatusChanges = () => {
    editReferral({
      reward_per_referral: Number(rewardAmount) || 0,
      is_referral_program_active: Boolean(selectedStatus),
    });
  };

  return (
    <div className="w-full space-y-6 select-none max-w-7xl mx-auto">
      {/* 1. NAVIGATION & PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#074073] transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Back to Settings</span>
          </button>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Referral Program
            </h1>
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black tracking-wider uppercase border ${
                isActive
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-rose-50 text-rose-700 border-rose-200"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isActive ? "bg-emerald-500 animate-pulse" : "bg-rose-500"
                }`}
              />
              {isActive ? "Program Active" : "Program Paused"}
            </span>
          </div>
          <p className="text-xs font-medium text-slate-500">
            Set member invite rewards and choose whether the referral program is
            turned on or off.
          </p>
        </div>
      </div>

      {/* 2. TOP CARDS GRID */}
      {isFetching ? (
        <ReferralCardsSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          {/* CARD 1: REWARD PER REFERRAL */}
          <div
            className={`bg-white rounded-2xl border p-6 shadow-3xs flex flex-col justify-between transition-all ${
              activeEditor === "reward"
                ? "border-[#074073] ring-1 ring-[#074073]/20"
                : "border-slate-200/80"
            }`}
          >
            {/* Content */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[#074073]">
                  <Coins size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                    Member Bonus
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                    Reward Per Referral
                  </h4>
                </div>
              </div>

              <div className="pt-1 flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900 tracking-tight">
                  {formatAmount(rewardAmount ?? 0)}
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  / successful invite
                </span>
              </div>

              <div className="space-y-2.5">
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Sent directly to the member's savings account once their
                  invited friend joins.
                </p>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5 text-[11px] text-slate-500 leading-normal">
                  <ShieldCheck
                    size={14}
                    className="text-[#074073] shrink-0 mt-0.5"
                  />
                  <span>
                    The new member must complete ID verification and pay their
                    joining fee before the reward is issued.
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Trigger */}
            <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="text-[11px] text-slate-400 font-medium">
                Deposited to:{" "}
                <strong className="text-slate-700">Savings Account</strong>
              </div>

              <button
                type="button"
                disabled={updating}
                onClick={openRewardEditor}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  activeEditor === "reward"
                    ? "bg-[#074073] text-white"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80 hover:text-[#074073]"
                }`}
              >
                <Edit3 size={13} />
                <span>
                  {activeEditor === "reward" ? "Close" : "Change Amount"}
                </span>
              </button>
            </div>
          </div>

          {/* CARD 2: REFERRAL PROGRAM STATUS */}
          <div
            className={`rounded-2xl border p-6 shadow-3xs flex flex-col justify-between transition-all ${
              activeEditor === "status"
                ? "border-[#074073] ring-1 ring-[#074073]/20 bg-white"
                : isActive
                  ? "bg-white border-slate-200/80"
                  : "bg-slate-50/70 border-slate-200"
            }`}
          >
            {/* Content */}
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2.5 rounded-xl border transition-colors ${
                      isActive
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                        : "bg-rose-50 text-rose-700 border-rose-200/60"
                    }`}
                  >
                    <Power size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                      Current Availability
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                      Program Status
                    </h4>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase border ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-rose-50 text-rose-700 border-rose-200"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive ? "bg-emerald-500 animate-pulse" : "bg-rose-500"
                    }`}
                  />
                  {isActive ? "Active" : "Paused"}
                </span>
              </div>

              <div className="pt-1">
                <h5 className="text-base font-bold text-slate-800">
                  {isActive
                    ? "Program is live and rewarding members"
                    : "Program is currently paused"}
                </h5>
              </div>

              <div className="space-y-2.5">
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {isActive
                    ? "Members can share invite links right from the mobile app and earn bonuses automatically."
                    : "Invite links are hidden in the mobile app. New users can still join, but no referral bonuses will be paid."}
                </p>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5 text-[11px] text-slate-500 leading-normal">
                  <Info size={14} className="text-slate-400 shrink-0 mt-0.5" />
                  <span>
                    {isActive
                      ? "Rewards are automatically credited once identity verification and joining fees are cleared."
                      : "Pausing will not affect any rewards members have already earned."}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Trigger */}
            <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                <span>Mobile App:</span>
                <span
                  className={`font-bold ${
                    isActive ? "text-emerald-700" : "text-rose-600"
                  }`}
                >
                  {isActive ? "Visible" : "Hidden"}
                </span>
              </div>

              <button
                type="button"
                disabled={updating}
                onClick={openStatusEditor}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer shadow-3xs ${
                  activeEditor === "status"
                    ? "bg-[#074073] text-white"
                    : isActive
                      ? "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/80"
                      : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/80"
                }`}
              >
                {activeEditor === "status" ? (
                  <>
                    <X size={13} />
                    <span>Close</span>
                  </>
                ) : isActive ? (
                  <>
                    <XCircle size={13} />
                    <span>Pause Program</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={13} />
                    <span>Activate Program</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. CONDITIONAL EDITING PANEL BELOW THE CARDS */}
      {activeEditor && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-3xs overflow-hidden transition-all animate-in fade-in slide-in-from-top-3 duration-200">
          {/* Header */}
          <div className="px-6 py-4 bg-slate-50/70 border-b border-slate-200/70 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-white rounded-lg border border-slate-200 text-[#074073]">
                {activeEditor === "reward" ? (
                  <Sliders size={16} />
                ) : (
                  <Power size={16} />
                )}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                  {activeEditor === "reward"
                    ? "Set Referral Reward"
                    : "Update Program Status"}
                </h3>
                <p className="text-xs text-slate-500">
                  {activeEditor === "reward"
                    ? "Change how much members earn when they invite someone new."
                    : "Choose whether members can view links and earn bonuses."}
                </p>
              </div>
            </div>

            <button
              type="button"
              disabled={updating}
              onClick={() => setActiveEditor(null)}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6">
            {activeEditor === "reward" ? (
              /* REWARD FORM */
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Reward per Referral (KES)
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none">
                        <Coins
                          size={18}
                          className="text-slate-300 group-focus-within:text-blue-600 transition-colors"
                        />
                        <div className="w-[1.5px] h-5 bg-slate-200 ml-4 group-focus-within:bg-blue-200 transition-colors" />
                      </div>
                      <input
                        name="rewardAmount"
                        type="number"
                        min="0"
                        placeholder="e.g. 300"
                        value={draftReward}
                        onChange={(e) => setDraftReward(e.target.value)}
                        className="w-full pl-[74px] pr-6 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all placeholder:text-xs font-semibold text-slate-800"
                      />
                    </div>
                    <span className="text-[11px] text-slate-400 block leading-tight">
                      Bonus paid out once the new member is fully registered.
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <ShieldCheck
                    size={18}
                    className="text-[#074073] shrink-0 mt-0.5"
                  />
                  <p className="text-xs text-slate-600 leading-relaxed">
                    This change takes effect immediately for new invites.
                    Friends who were already invited before this update will
                    receive the reward rate that was active when their link was
                    sent.
                  </p>
                </div>
              </div>
            ) : (
              /* STATUS TOGGLE FORM */
              /* STATUS TOGGLE FORM */
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Option: Active */}
                  <div
                    onClick={() => setSelectedStatus(true)}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-3.5 ${
                      selectedStatus === true
                        ? "border-emerald-600 bg-emerald-50/30"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        selectedStatus === true
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      <CheckCircle2 size={18} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">
                          Active
                        </span>
                        {selectedStatus === true && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                            Selected
                          </span>
                        )}
                        {isActive === true && (
                          <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            Current Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Referral links are visible in the app. Members earn
                        rewards whenever their invite successfully signs up.
                      </p>
                    </div>
                  </div>

                  {/* Option: Disabled */}
                  <div
                    onClick={() => setSelectedStatus(false)}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-3.5 ${
                      selectedStatus === false
                        ? "border-rose-600 bg-rose-50/30"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        selectedStatus === false
                          ? "bg-rose-600 text-white"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      <XCircle size={18} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">
                          Paused
                        </span>
                        {selectedStatus === false && (
                          <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                            Selected
                          </span>
                        )}
                        {isActive === false && (
                          <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            Current Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Hides the referral section from the app. No referral
                        bonuses will be awarded while paused.
                      </p>
                    </div>
                  </div>
                </div>

                {!selectedStatus && (
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-800">
                    <AlertTriangle
                      size={16}
                      className="text-amber-600 shrink-0 mt-0.5"
                    />
                    <span>
                      Note: Anyone with an existing link can still download and
                      join the app, but no referral bonus will be awarded while
                      the program is paused.
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Controls */}
          <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200/70 flex items-center justify-end gap-2.5">
            <button
              type="button"
              disabled={updating}
              onClick={() => setActiveEditor(null)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={updating}
              onClick={
                activeEditor === "reward"
                  ? saveRewardChanges
                  : saveStatusChanges
              }
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#074073] hover:bg-[#06335c] disabled:opacity-60 disabled:cursor-not-allowed shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Save size={13} />
              <span>
                {updating
                  ? "Saving..."
                  : activeEditor === "reward"
                    ? "Save Reward"
                    : "Save Status"}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const ReferralCardsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full animate-pulse">
      {/* SKELETON CARD 1: REWARD */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-3xs flex flex-col justify-between">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-200 shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-2.5 w-24 bg-slate-200 rounded" />
              <div className="h-3.5 w-36 bg-slate-200 rounded" />
            </div>
          </div>

          {/* Amount Row */}
          <div className="pt-1 flex items-baseline gap-2">
            <div className="h-8 w-32 bg-slate-200 rounded-lg" />
            <div className="h-3 w-28 bg-slate-100 rounded" />
          </div>

          {/* Body & Callout Box */}
          <div className="space-y-2.5">
            <div className="space-y-1.5">
              <div className="h-3 w-full bg-slate-100 rounded" />
              <div className="h-3 w-4/5 bg-slate-100 rounded" />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
              <div className="w-3.5 h-3.5 rounded-full bg-slate-200 shrink-0 mt-0.5" />
              <div className="space-y-1.5 flex-1">
                <div className="h-2.5 w-full bg-slate-200/80 rounded" />
                <div className="h-2.5 w-3/4 bg-slate-200/80 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between">
          <div className="h-3 w-32 bg-slate-200 rounded" />
          <div className="h-7 w-28 bg-slate-200 rounded-xl" />
        </div>
      </div>

      {/* SKELETON CARD 2: STATUS */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-3xs flex flex-col justify-between">
        <div className="space-y-4">
          {/* Header & Pill Badge */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-200 shrink-0" />
              <div className="space-y-2">
                <div className="h-2.5 w-24 bg-slate-200 rounded" />
                <div className="h-3.5 w-32 bg-slate-200 rounded" />
              </div>
            </div>
            <div className="h-6 w-20 bg-slate-200 rounded-full" />
          </div>

          {/* Headline */}
          <div className="pt-1">
            <div className="h-4 w-3/4 bg-slate-200 rounded" />
          </div>

          {/* Body & Callout Box */}
          <div className="space-y-2.5">
            <div className="space-y-1.5">
              <div className="h-3 w-full bg-slate-100 rounded" />
              <div className="h-3 w-5/6 bg-slate-100 rounded" />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
              <div className="w-3.5 h-3.5 rounded-full bg-slate-200 shrink-0 mt-0.5" />
              <div className="space-y-1.5 flex-1">
                <div className="h-2.5 w-full bg-slate-200/80 rounded" />
                <div className="h-2.5 w-2/3 bg-slate-200/80 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between">
          <div className="h-3 w-28 bg-slate-200 rounded" />
          <div className="h-7 w-32 bg-slate-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
};
