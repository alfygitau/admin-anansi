import React from "react";

export default function LoanDetailsLoader() {
  return (
    <div className="w-full space-y-5 antialiased select-none">
      {/* 1. EXECUTIVE CONTROL HEADER LAYER SKELETON */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 animate-pulse">
        <div className="flex items-center gap-4">
          {/* Back Action button placeholder */}
          <div className="size-10 rounded-xl bg-slate-200/70 shrink-0" />
          <div>
            <div className="flex items-center gap-2.5">
              <div className="h-5 w-14 bg-slate-200/70 rounded-md" />
              <div className="h-5 w-16 bg-slate-200/70 rounded-full" />
            </div>
            <div className="h-7 w-56 bg-slate-200/70 rounded-lg mt-2" />
          </div>
        </div>
        {/* Dropdown Action control block */}
        <div className="h-11 w-36 bg-slate-200/70 rounded-xl" />
      </div>

      {/* 2. INDUSTRIAL PARAMETERS VIEW GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* CONTAINER 1: BORROWER DETAILS SKELETON */}
        <CardSkeleton titleWidth="w-32">
          <MetricItemSkeleton valueWidth="w-36" />
          <MetricItemSkeleton valueWidth="w-32" />
          <MetricItemSkeleton valueWidth="w-20" />
          <MetricItemSkeleton valueWidth="w-24" />
          <div className="md:col-span-1">
            <MetricItemSkeleton valueWidth="w-20" />
          </div>
        </CardSkeleton>

        {/* CONTAINER 2: BALANCES & AMOUNTS SKELETON */}
        <CardSkeleton titleWidth="w-36">
          <MetricItemSkeleton valueWidth="w-28" />
          <MetricItemSkeleton valueWidth="w-32" />
          <MetricItemSkeleton valueWidth="w-24" />
          <MetricItemSkeleton valueWidth="w-28" />
          <MetricItemSkeleton valueWidth="w-24" />
          <MetricItemSkeleton valueWidth="w-16" />
        </CardSkeleton>

        {/* CONTAINER 3: LOAN FEATURES SKELETON */}
        <CardSkeleton titleWidth="w-28">
          <MetricItemSkeleton valueWidth="w-36" />
          <MetricItemSkeleton valueWidth="w-20" />
          <MetricItemSkeleton valueWidth="w-24" />
          <MetricItemSkeleton valueWidth="w-40" />
          <MetricItemSkeleton valueWidth="w-28" />
          <MetricItemSkeleton valueWidth="w-20" />
        </CardSkeleton>

        {/* CONTAINER 4: NEXT PAYMENT DETAILS SKELETON */}
        <CardSkeleton titleWidth="w-40">
          <MetricItemSkeleton valueWidth="w-32" />
          <MetricItemSkeleton valueWidth="w-24" />
          <MetricItemSkeleton valueWidth="w-24" />
          <MetricItemSkeleton valueWidth="w-24" />
          {/* Bottom Progress Bar Wrapper */}
          <div className="md:col-span-2 space-y-2.5 bg-slate-50/50 p-4 rounded-xl border border-slate-100/60 mt-1">
            <div className="flex justify-between items-center">
              <div className="h-3 w-32 bg-slate-200/70 rounded-md" />
              <div className="h-3 w-8 bg-slate-200/70 rounded-md" />
            </div>
            <div className="h-2 w-full bg-slate-200/50 rounded-full" />
          </div>
        </CardSkeleton>

        {/* CONTAINER 5: REPAYMENT SCHEDULE TABLE SKELETON */}
        <div className="bg-white border border-slate-200/60 shadow-3xs rounded-2xl overflow-hidden w-full h-full animate-pulse">
          <div className="px-5 py-4 bg-slate-50/40 border-b border-slate-100 flex items-center gap-2.5">
            <div className="size-4 rounded-md bg-slate-200/70" />
            <div className="h-3 w-32 bg-slate-200/70 rounded-md" />
          </div>
          <div className="p-5.5 space-y-4">
            {/* Mocking Table Rows */}
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex justify-between items-center py-1 border-b border-slate-50 last:border-0 last:pb-0"
              >
                <div className="h-3.5 w-8 bg-slate-200/70 rounded-md" />
                <div className="h-3.5 w-24 bg-slate-200/60 rounded-md" />
                <div className="h-3.5 w-16 bg-slate-200/60 rounded-md" />
                <div className="h-3.5 w-16 bg-slate-200/60 rounded-md" />
                <div className="h-5 w-14 bg-slate-200/70 rounded-md" />
              </div>
            ))}
          </div>
        </div>

        {/* CONTAINER 6: RECENT REPAYMENTS JOURNAL SKELETON */}
        <div className="bg-white border border-slate-200/60 shadow-3xs rounded-2xl overflow-hidden w-full h-full animate-pulse">
          <div className="px-5 py-4 bg-slate-50/40 border-b border-slate-100 flex items-center gap-2.5">
            <div className="size-4 rounded-md bg-slate-200/70" />
            <div className="h-3 w-32 bg-slate-200/70 rounded-md" />
          </div>
          <div className="p-4 space-y-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="border border-slate-100/70 p-3 rounded-xl flex items-center justify-between"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-12 bg-slate-200/70 rounded" />
                    <div className="h-3.5 w-24 bg-slate-200/60 rounded" />
                  </div>
                  <div className="h-3 w-28 bg-slate-200/50 rounded" />
                </div>
                <div className="h-4 w-20 bg-slate-200/70 rounded-md shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* CONTAINER 7: PENALTIES LEDGER SKELETON */}
        <CardSkeleton titleWidth="w-20">
          <div className="md:col-span-2 space-y-3 border-t border-slate-100 pt-5 mt-1">
            <div className="h-2.5 w-24 bg-slate-200/70 rounded-sm" />
            <div className="flex flex-col items-center justify-center p-6 bg-slate-50/50 border border-dashed border-slate-200/60 rounded-xl">
              <div className="size-9 rounded-xl bg-slate-200/70 mb-2.5" />
              <div className="h-3.5 w-36 bg-slate-200/70 rounded-md" />
              <div className="h-3 w-52 bg-slate-200/50 rounded-md mt-1.5" />
            </div>
          </div>
        </CardSkeleton>
      </div>
    </div>
  );
}

// Helper to render layout-consistent inner card skeletons
const CardSkeleton = ({ titleWidth = "w-28", children }) => (
  <div className="bg-white border border-slate-200/60 shadow-3xs rounded-2xl overflow-hidden w-full h-full animate-pulse">
    {/* CARD HEADER */}
    <div className="px-5 py-3.5 bg-slate-50/40 border-b border-slate-100 flex items-center gap-3">
      <div className="size-8 rounded-xl bg-slate-200/70 shrink-0" />
      <div className={`h-3 ${titleWidth} bg-slate-200/70 rounded-md`} />
    </div>
    {/* CARD GRID CONTENT */}
    <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
      {children}
    </div>
  </div>
);

// Helper to render metric item layout blocks
const MetricItemSkeleton = ({ valueWidth = "w-28" }) => (
  <div className="flex items-start gap-3 min-w-0">
    <div className="size-8 rounded-xl bg-slate-100/80 shrink-0 mt-0.5" />
    <div className="min-w-0 flex flex-col space-y-2 flex-1">
      <div className="h-2.5 w-16 bg-slate-200/70 rounded-sm" />
      <div className={`h-3.5 ${valueWidth} bg-slate-200/70 rounded-md`} />
    </div>
  </div>
);
