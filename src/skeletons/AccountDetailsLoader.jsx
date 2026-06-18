import React from "react";

const AccountDetailsLoader = () => {
  return (
    <div className="w-full animate-pulse select-none space-y-6">
      {/* 1. HEADER BAR SKELETON */}
      <div className="flex justify-between gap-4 border-b border-slate-200/60 pb-6">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-slate-200" />
          <div className="space-y-2">
            <div className="h-5 w-48 rounded-md bg-slate-200" />
            <div className="h-3 w-80 rounded-md bg-slate-100" />
          </div>
        </div>
        <div className="h-10 w-36 rounded-xl bg-slate-200" />
      </div>

      {/* 2. THREE COLUMN INTERACTION LAYER SKELETON */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full items-stretch">
        {/* CARD 1: ACCOUNT DETAILS SKELETON */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="size-10 rounded-xl bg-slate-100" />
            <div className="space-y-2">
              <div className="h-2.5 w-20 rounded bg-slate-200" />
              <div className="h-4 w-32 rounded bg-slate-200" />
            </div>
          </div>
          <div className="border-t border-slate-100 pt-3.5 space-y-2">
            <div className="h-2 w-24 rounded bg-slate-100" />
            <div className="flex items-center justify-between">
              <div className="h-4 w-40 rounded bg-slate-200" />
              <div className="size-7 rounded-lg bg-slate-100" />
            </div>
          </div>
        </div>

        {/* CARD 2: AVAILABLE BALANCE SKELETON */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="size-10 rounded-xl bg-emerald-50" />
            <div className="space-y-2">
              <div className="h-2.5 w-24 rounded bg-slate-200" />
              <div className="h-3 w-36 rounded bg-slate-100" />
            </div>
          </div>
          <div className="border-t border-slate-100 pt-3.5">
            <div className="h-8 w-48 rounded bg-slate-200" />
          </div>
        </div>

        {/* CARD 3: ACCOUNT STATUS SKELETON */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="size-10 rounded-xl bg-slate-100" />
            <div className="space-y-2">
              <div className="h-2.5 w-20 rounded bg-slate-200" />
              <div className="h-3 w-32 rounded bg-slate-100" />
            </div>
          </div>
          <div className="border-t border-slate-100 pt-3.5 space-y-2">
            <div className="h-2 w-20 rounded bg-slate-100" />
            <div className="h-6 w-20 rounded-md bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetailsLoader;
