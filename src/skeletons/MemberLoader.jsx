import React from "react";

const MemberLoader = () => {
  return (
    <div className="w-full space-y-6 font-sans antialiased p-1 animate-pulse select-none">
      
      {/* 1. ACTION HEADER BAR CONTAINER */}
      <div className="flex justify-between gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/60 pb-6">
        <div className="flex items-center gap-3">
          {/* Back Button Skeleton */}
          <div className="w-10 h-10 rounded-xl bg-slate-200" />
          <div>
            {/* Name and Registration Date Skeleton */}
            <div className="h-6 w-56 bg-slate-200 rounded-md" />
            <div className="h-3.5 w-36 bg-slate-100 rounded-md mt-2" />
          </div>
        </div>
        {/* Suspend Action Button Skeleton */}
        <div className="h-10 w-36 bg-slate-200 rounded-xl" />
      </div>

      {/* 2. FIRST ROW: IDENTITY, ADDRESS, AND FINANCIAL PROFILE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* CARD A: CORE IDENTITY PARAMETERS */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 flex flex-col justify-between h-full space-y-4">
          <div className="w-full flex items-center justify-between">
            <div className="h-4 w-36 bg-slate-200 rounded" />
            <div className="h-4 w-4 bg-slate-200 rounded" />
          </div>
          <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-3">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="space-y-1.5">
                <div className="h-3 w-16 bg-slate-100 rounded" />
                <div className="h-4 w-28 bg-slate-200 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* CARD B: ADDRESS REGISTRY */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 flex flex-col justify-between h-full space-y-4">
          <div className="space-y-4 w-full">
            <div className="w-full flex items-center justify-between">
              <div className="h-4 w-32 bg-slate-200 rounded" />
              <div className="h-4 w-4 bg-slate-200 rounded" />
            </div>
            <div className="space-y-3.5 border-t border-slate-100 pt-3">
              <div className="space-y-1.5">
                <div className="h-3 w-16 bg-slate-100 rounded" />
                <div className="h-4 w-24 bg-slate-200 rounded" />
              </div>
              
              {/* Primary Physical Address Block */}
              <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                <div className="h-2.5 w-32 bg-slate-200 rounded" />
                <div className="h-4 w-48 bg-slate-200 rounded" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="h-2.5 w-24 bg-slate-100 rounded" />
                  <div className="h-4 w-28 bg-slate-200 rounded" />
                </div>
                <div className="space-y-1.5">
                  <div className="h-2.5 w-24 bg-slate-100 rounded" />
                  <div className="h-4 w-28 bg-slate-200 rounded" />
                </div>
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-50 flex items-center gap-2">
            <div className="h-3.5 w-3.5 bg-slate-200 rounded-full" />
            <div className="h-3 w-48 bg-slate-100 rounded" />
          </div>
        </div>

        {/* CARD C: FINANCIAL PROFILE */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 space-y-4 h-full">
          <div className="w-full flex items-center justify-between">
            <div className="h-4 w-32 bg-slate-200 rounded" />
            <div className="h-4 w-4 bg-slate-200 rounded" />
          </div>
          <div className="space-y-5 pt-1">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="h-4 w-4 bg-slate-200 rounded mt-0.5 shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-2.5 w-20 bg-slate-100 rounded" />
                  <div className="h-4 w-36 bg-slate-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. SECOND ROW: ACCOUNTS AND SECURITY OVERLAY MATRIX */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* FINANCIAL LEDGER ACCOUNTS CARD (SPANS 2 COLS) */}
        <div className="lg:col-span-2 flex">
          <div className="w-full bg-white rounded-2xl border border-slate-200/60 p-6 space-y-4 flex flex-col justify-between h-full">
            <div className="space-y-4 flex-1 flex flex-col">
              <div className="w-full">
                <div className="h-4 w-36 bg-slate-200 rounded" />
              </div>
              
              {/* Table Wrapper Skeleton */}
              <div className="border border-slate-100 rounded-xl overflow-hidden flex-1">
                <div className="bg-slate-50/70 border-b border-slate-100 p-3.5 grid grid-cols-5 gap-2">
                  <div className="h-3 bg-slate-200 rounded col-span-1" />
                  <div className="h-3 bg-slate-200 rounded col-span-1" />
                  <div className="h-3 bg-slate-200 rounded col-span-1" />
                  <div className="h-3 bg-slate-200 rounded col-span-1 ml-auto w-16" />
                  <div className="h-3 bg-slate-200 rounded col-span-1 mx-auto w-10" />
                </div>
                <div className="divide-y divide-slate-100">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="p-4 grid grid-cols-5 gap-2 items-center">
                      <div className="h-3.5 bg-slate-200 rounded col-span-1 w-24" />
                      <div className="h-3.5 bg-slate-200 rounded col-span-1 w-28" />
                      <div className="h-3.5 bg-slate-200/60 rounded col-span-1 font-mono w-20" />
                      <div className="h-3.5 bg-slate-200 rounded col-span-1 ml-auto w-20" />
                      <div className="col-span-1 flex justify-center">
                        <div className="h-5 w-12 bg-slate-100 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECURITY SCREENING HUB SIDE PANEL */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 h-full flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <div className="h-4 w-20 bg-slate-200 rounded" />
            </div>
            <div className="space-y-3.5 pt-1">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-2">
                  <div className="h-3.5 w-28 bg-slate-100 rounded" />
                  <div className="h-3.5 w-20 bg-slate-200 rounded" />
                </div>
              ))}
            </div>
          </div>
          <div className="pt-3 border-t border-slate-50 flex justify-between items-center">
            <div className="h-3 w-24 bg-slate-100 rounded" />
            <div className="h-3.5 w-16 bg-slate-200 rounded" />
          </div>
        </div>
      </div>

      {/* 4. THIRD ROW: NEXT OF KIN & LOAN GUARANTEES PROFILE BLOCK */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* NEXT OF KIN PANEL (SPANS 2 COLUMNS) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/60 p-6 space-y-4">
          <div className="w-full flex items-center justify-between">
            <div className="h-4 w-24 bg-slate-200 rounded" />
            <div className="h-4 w-4 bg-slate-200 rounded" />
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 border border-slate-100 bg-slate-50/40 rounded-xl">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="h-2.5 w-20 bg-slate-100 rounded" />
                  <div className="h-3.5 w-36 bg-slate-200 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LOAN GUARANTEES INFRASTRUCTURE PANEL (1 COLUMN) */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 space-y-4 h-full">
          <div className="w-full">
            <div className="h-4 w-32 bg-slate-200 rounded" />
          </div>
          <div className="space-y-4 pt-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start justify-between border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                <div className="space-y-1.5">
                  <div className="h-3 w-28 bg-slate-200 rounded" />
                  <div className="h-2.5 w-48 bg-slate-100 rounded" />
                </div>
                <div className="h-4 w-24 bg-slate-200 rounded shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. FOURTH ROW: EXPANDABLE KYC IMAGE GALLERY SYSTEM */}
      <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
        <div className="w-full flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-4 w-48 bg-slate-200 rounded" />
            <div className="h-3 w-64 bg-slate-100 rounded" />
          </div>
          <div className="h-9 w-32 bg-slate-200 rounded-xl" />
        </div>
      </div>

    </div>
  );
};

export default MemberLoader;