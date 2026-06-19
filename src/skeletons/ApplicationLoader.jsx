import React from "react";

const ApplicationLoader = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start select-none animate-pulse">
      {/* CARD 1: BORROWER PROFILE SKELETON */}
      <div className="bg-white border border-slate-200/60 shadow-sm rounded-[24px] overflow-hidden">
        <div className="px-5 py-4 bg-slate-50/60 border-b border-slate-100 flex items-center gap-2.5">
          <div className="size-7 rounded-lg bg-slate-200" />
          <div className="h-3.5 w-28 bg-slate-200 rounded" />
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="size-5 rounded bg-slate-100 shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-2.5 w-14 bg-slate-100 rounded" />
                  <div className="h-3.5 w-32 bg-slate-200 rounded" />
                </div>
              </div>
            ))}
          <div className="md:col-span-2 space-y-2 bg-slate-50/60 p-4 rounded-xl border border-slate-100 mt-1">
            <div className="h-2.5 w-20 bg-slate-200 rounded" />
            <div className="h-3 w-full bg-slate-100 rounded" />
          </div>
        </div>
      </div>

      {/* CARD 2: LOAN DETAILS SKELETON */}
      <div className="bg-white border border-slate-200/60 shadow-sm rounded-[24px] overflow-hidden">
        <div className="px-5 py-4 bg-slate-50/60 border-b border-slate-100 flex items-center gap-2.5">
          <div className="size-7 rounded-lg bg-slate-200" />
          <div className="h-3.5 w-24 bg-slate-200 rounded" />
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="size-5 rounded bg-slate-100 shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-2.5 w-16 bg-slate-100 rounded" />
                  <div className="h-3.5 w-28 bg-slate-200 rounded" />
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* CARD 3: PRODUCT PROFILE SKELETON */}
      <div className="bg-white border border-slate-200/60 shadow-sm rounded-[24px] overflow-hidden">
        <div className="px-5 py-4 bg-slate-50/60 border-b border-slate-100 flex items-center gap-2.5">
          <div className="size-7 rounded-lg bg-slate-200" />
          <div className="h-3.5 w-28 bg-slate-200 rounded" />
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="size-5 rounded bg-slate-100 shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-2.5 w-20 bg-slate-100 rounded" />
                  <div className="h-3.5 w-36 bg-slate-200 rounded" />
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* CARD 4: GUARANTORS SKELETON */}
      <div className="bg-white border border-slate-200/60 shadow-sm rounded-[24px] overflow-hidden">
        <div className="px-5 py-4 bg-slate-50/60 border-b border-slate-100 flex items-center gap-2.5">
          <div className="size-7 rounded-lg bg-slate-200" />
          <div className="h-3.5 w-36 bg-slate-200 rounded" />
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="size-5 rounded bg-slate-100 shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-2.5 w-16 bg-slate-100 rounded" />
                  <div className="h-3.5 w-24 bg-slate-200 rounded" />
                </div>
              </div>
            ))}
          <div className="md:col-span-2 space-y-3.5 border-t border-slate-100 pt-5 mt-1">
            <div className="h-2.5 w-24 bg-slate-200 rounded" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array(2)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="border border-slate-200/60 p-4 rounded-xl flex items-center justify-between bg-slate-50/30"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="h-3 w-28 bg-slate-200 rounded" />
                      <div className="h-2.5 w-20 bg-slate-100 rounded" />
                      <div className="h-2.5 w-36 bg-slate-100 rounded" />
                    </div>
                    <div className="h-5 w-12 bg-slate-200 rounded-md shrink-0" />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* CARD 5: COLLATERAL & SECURITY SKELETON */}
      <div className="bg-white border border-slate-200/60 shadow-sm rounded-[24px] overflow-hidden">
        <div className="px-5 py-4 bg-slate-50/60 border-b border-slate-100 flex items-center gap-2.5">
          <div className="size-7 rounded-lg bg-slate-200" />
          <div className="h-3.5 w-32 bg-slate-200 rounded" />
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
          {Array(2)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="size-5 rounded bg-slate-100 shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-2.5 w-20 bg-slate-100 rounded" />
                  <div className="h-3.5 w-24 bg-slate-200 rounded" />
                </div>
              </div>
            ))}
          <div className="md:col-span-2 space-y-4 w-full">
            <div className="space-y-2 bg-slate-50/60 p-4 rounded-xl border border-slate-100">
              <div className="h-2.5 w-28 bg-slate-200 rounded" />
              <div className="h-3 w-44 bg-slate-100 rounded" />
            </div>
            <div className="space-y-3.5 border-t border-slate-100 pt-4">
              <div className="h-2.5 w-24 bg-slate-200 rounded" />
              <div className="border border-slate-200/60 p-4 rounded-xl bg-slate-50/30 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                <div className="space-y-1.5">
                  <div className="h-2 w-10 bg-slate-100 rounded" />
                  <div className="h-3 w-16 bg-slate-200 rounded" />
                </div>
                <div className="space-y-1.5">
                  <div className="h-2 w-20 bg-slate-100 rounded" />
                  <div className="h-3 w-24 bg-slate-200 rounded" />
                </div>
                <div className="h-3 w-16 bg-slate-200 rounded ml-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CARD 6: ATTACHED DOCUMENTS SKELETON */}
      <div className="bg-white border border-slate-200/60 shadow-sm rounded-[24px] overflow-hidden">
        <div className="px-5 py-4 bg-slate-50/60 border-b border-slate-100 flex items-center gap-2.5">
          <div className="size-7 rounded-lg bg-slate-200" />
          <div className="h-3.5 w-32 bg-slate-200 rounded" />
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
          <div className="md:col-span-2 space-y-2 bg-slate-50/60 p-4 rounded-xl border border-slate-100">
            <div className="h-2.5 w-28 bg-slate-200 rounded" />
            <div className="h-3 w-full bg-slate-100 rounded" />
          </div>
          <div className="md:col-span-2 space-y-3.5 border-t border-slate-100 pt-5 mt-1">
            <div className="h-2.5 w-16 bg-slate-200 rounded" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="border border-slate-200/60 p-3cb rounded-xl flex items-center justify-between bg-white shadow-2xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <div className="size-8 bg-slate-100 rounded-lg shrink-0" />
                      <div className="min-w-0 space-y-1.5 flex-1">
                        <div className="h-3 w-16 bg-slate-200 rounded truncate" />
                        <div className="h-2 w-10 bg-slate-100 rounded" />
                      </div>
                    </div>
                    <div className="size-7 bg-slate-50 rounded-lg shrink-0 ml-2" />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* CARD 7: REVIEW PROGRESS SKELETON */}
      <div className="bg-white border border-slate-200/60 shadow-sm rounded-[24px] overflow-hidden">
        <div className="px-5 py-4 bg-slate-50/60 border-b border-slate-100 flex items-center gap-2.5">
          <div className="size-7 rounded-lg bg-slate-200" />
          <div className="h-3.5 w-24 bg-slate-200 rounded" />
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
          {Array(2)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="size-5 rounded bg-slate-100 shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-2.5 w-24 bg-slate-100 rounded" />
                  <div className="h-3.5 w-32 bg-slate-200 rounded" />
                </div>
              </div>
            ))}
          <div className="md:col-span-2 space-y-3 bg-slate-50/60 p-4 rounded-xl border border-slate-100 mt-1">
            <div className="h-2.5 w-28 bg-slate-200 rounded" />
            <div className="flex justify-between items-center">
              <div className="h-3 w-16 bg-slate-100 rounded" />
              <div className="h-3 w-12 bg-slate-200 rounded" />
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2" />
          </div>
        </div>
      </div>

      {/* CARD 8: DISBURSEMENT DETAILS (FULL WIDTH) SKELETON */}
      <div className="bg-white border border-slate-200/60 shadow-sm rounded-[24px] overflow-hidden col-span-full">
        <div className="px-5 py-4 bg-slate-50/60 border-b border-slate-100 flex items-center gap-2.5">
          <div className="size-7 rounded-lg bg-slate-200" />
          <div className="h-3.5 w-32 bg-slate-200 rounded" />
        </div>
        <div className="p-6 flex flex-col gap-5 w-full">
          <div className="bg-slate-50/50 border border-slate-200/50 rounded-2xl p-4 space-y-3.5 w-full">
            <div className="h-2.5 w-24 bg-slate-200 rounded" />
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="h-3 w-32 bg-slate-100 rounded" />
                  <div className="h-3.5 w-20 bg-slate-200 rounded" />
                </div>
              ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full pt-1">
            <div className="space-y-2.5">
              <div className="h-2.5 w-24 bg-slate-200 rounded" />
              <div className="h-3.5 w-36 bg-slate-100 rounded" />
              <div className="h-3 w-48 bg-slate-100 rounded" />
            </div>
            <div className="space-y-2.5 md:border-l md:border-slate-100 md:pl-4">
              <div className="h-2.5 w-20 bg-slate-200 rounded" />
              <div className="h-3.5 w-28 bg-slate-100 rounded" />
              <div className="h-3 w-36 bg-slate-100 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationLoader;
