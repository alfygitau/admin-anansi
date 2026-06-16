import React, { useState } from "react";
import {
  Search,
  User,
  Users,
  ShieldCheck,
  AlertTriangle,
  Activity,
} from "lucide-react";

export default function Guarantors() {
  const [guarantors] = useState([
    {
      guarantorId: "SJS001",
      guarantorName: "JOHN KIPKEMBOI",
      contact: { phone: "0722 000 001", email: "john.k@example.com" },
      totalGuaranteed: 250000.0,
      currentExposure: 200000.0,
      activeLoans: 5,
      pendingLoans: 2,
      releasedPct: 20,
      _guarantor: { id: "d0216b27-1", publicId: "SJS001" },
    },
    {
      guarantorId: "SJS002",
      guarantorName: "SARAH WANJIKU",
      contact: { phone: "0722 000 002", email: "sarah.w@example.com" },
      totalGuaranteed: 150000.0,
      currentExposure: 145000.0,
      activeLoans: 3,
      pendingLoans: 0,
      releasedPct: 0,
      _guarantor: { id: "d0216b27-2", publicId: "SJS002" },
    },
    {
      guarantorId: "SJS003",
      guarantorName: "MARCEL AUJA OGWENO",
      contact: { phone: "0722 000 003", email: "marcel.o@example.com" },
      totalGuaranteed: 117330.22,
      currentExposure: 115330.22,
      activeLoans: 9,
      pendingLoans: 27,
      releasedPct: 0,
      _guarantor: { id: "d0216b27-3", publicId: "SJS003" },
    },
    {
      guarantorId: "SJS004",
      guarantorName: "AMINA MUSA",
      contact: { phone: "0722 000 004", email: "amina.m@example.com" },
      totalGuaranteed: 300000.0,
      currentExposure: 50000.0,
      activeLoans: 2,
      pendingLoans: 1,
      releasedPct: 80,
      _guarantor: { id: "d0216b27-4", publicId: "SJS004" },
    },
    {
      guarantorId: "SJS005",
      guarantorName: "DAVID OTIENO",
      contact: { phone: "0722 000 005", email: "david.o@example.com" },
      totalGuaranteed: 80000.0,
      currentExposure: 80000.0,
      activeLoans: 1,
      pendingLoans: 4,
      releasedPct: 0,
      _guarantor: { id: "d0216b27-5", publicId: "SJS005" },
    },
    {
      guarantorId: "SJS006",
      guarantorName: "ELIZABETH NJERI",
      contact: { phone: "0722 000 006", email: "elizabeth.n@example.com" },
      totalGuaranteed: 450000.0,
      currentExposure: 400000.0,
      activeLoans: 12,
      pendingLoans: 5,
      releasedPct: 10,
      _guarantor: { id: "d0216b27-6", publicId: "SJS006" },
    },
    {
      guarantorId: "SJS007",
      guarantorName: "PETER KIMANI",
      contact: { phone: "0722 000 007", email: "peter.k@example.com" },
      totalGuaranteed: 20000.0,
      currentExposure: 0.0,
      activeLoans: 0,
      pendingLoans: 1,
      releasedPct: 100,
      _guarantor: { id: "d0216b27-7", publicId: "SJS007" },
    },
    {
      guarantorId: "SJS008",
      guarantorName: "FATUMA ALI",
      contact: { phone: "0722 000 008", email: "fatuma.a@example.com" },
      totalGuaranteed: 125000.0,
      currentExposure: 100000.0,
      activeLoans: 4,
      pendingLoans: 2,
      releasedPct: 20,
      _guarantor: { id: "d0216b27-8", publicId: "SJS008" },
    },
    {
      guarantorId: "SJS009",
      guarantorName: "SAMUEL OKOTH",
      contact: { phone: "0722 000 009", email: "samuel.o@example.com" },
      totalGuaranteed: 95000.0,
      currentExposure: 95000.0,
      activeLoans: 2,
      pendingLoans: 8,
      releasedPct: 0,
      _guarantor: { id: "d0216b27-9", publicId: "SJS009" },
    },
    {
      guarantorId: "SJS010",
      guarantorName: "BEATRICE AUMA",
      contact: { phone: "0722 000 010", email: "beatrice.a@example.com" },
      totalGuaranteed: 500000.0,
      currentExposure: 250000.0,
      activeLoans: 6,
      pendingLoans: 3,
      releasedPct: 50,
      _guarantor: { id: "d0216b27-10", publicId: "SJS010" },
    },
    {
      guarantorId: "SJS011",
      guarantorName: "BRIAN KIPROTICH",
      contact: { phone: "0722 000 011", email: "brian.k@example.com" },
      totalGuaranteed: 65000.0,
      currentExposure: 65000.0,
      activeLoans: 1,
      pendingLoans: 0,
      releasedPct: 0,
      _guarantor: { id: "d0216b27-11", publicId: "SJS011" },
    },
    {
      id: "SJS012",
      guarantorName: "GRACE WANGARI",
      contact: { phone: "0722 000 012", email: "grace.w@example.com" },
      totalGuaranteed: 110000.0,
      currentExposure: 110000.0,
      activeLoans: 4,
      pendingLoans: 1,
      releasedPct: 0,
      _guarantor: { id: "d0216b27-12", publicId: "SJS012" },
    },
  ]);

  const metrics = {
    totalGuarantors: 12,
    totalCommitted: 2262330.22,
    totalExposure: 1610330.22,
    totalActiveLoans: 49,
    totalPendingLoans: 54,
  };
  return (
    <div className="w-full space-y-6 font-sans">
      {/* 1. REGISTRY HEADER */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Loan Guarantors</h2>
          <p className="text-xs text-slate-500">
            Monitor exposure and commitment levels across all guarantors.
          </p>
        </div>
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            className="h-9 w-64 pl-9 pr-4 bg-white border border-slate-200/60 rounded-xl text-xs outline-none focus:border-primary shadow-sm"
            placeholder="Search guarantor..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 select-none">
        {/* Metric 1: Total Guarantors */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs p-5 flex items-start gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100/40 shrink-0">
            <Users size={18} />
          </div>
          <div className="space-y-0.5 min-w-0">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">
              Active Guarantors
            </p>
            <p className="text-2xl font-black text-slate-900 tracking-tight">
              {metrics.totalGuarantors}
            </p>
            <p className="text-[11px] text-slate-400 font-medium truncate">
              Unique underwriting identities
            </p>
          </div>
        </div>

        {/* Metric 2: Total Amount Committed */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs p-5 flex items-start gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl border border-purple-100/40 shrink-0">
            <ShieldCheck size={18} />
          </div>
          <div className="space-y-0.5 min-w-0">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">
              Total Capital Backed
            </p>
            <p className="text-2xl font-black text-slate-900 tracking-tight">
              KES{" "}
              {metrics.totalCommitted.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </p>
            <p className="text-[11px] text-slate-400 font-medium truncate">
              Aggregated lifetime value signed
            </p>
          </div>
        </div>

        {/* Metric 3: Active Exposure Risk */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs p-5 flex items-start gap-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-xl border border-orange-100/40 shrink-0">
            <AlertTriangle size={18} />
          </div>
          <div className="space-y-0.5 min-w-0">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">
              Live Risk Exposure
            </p>
            <p className="text-2xl font-black text-orange-600 tracking-tight">
              KES{" "}
              {metrics.totalExposure.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </p>
            <p className="text-[11px] text-slate-400 font-medium truncate">
              Unreleased liabilities active on loop
            </p>
          </div>
        </div>

        {/* Metric 4: Total Structured Operations Loop */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-3xs p-5 flex items-start gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100/40 shrink-0">
            <Activity size={18} />
          </div>
          <div className="space-y-0.5 min-w-0">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">
              Underwriting Loops
            </p>
            <p className="text-2xl font-black text-slate-900 tracking-tight">
              {metrics.totalActiveLoans + metrics.totalPendingLoans}
            </p>
            <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5 truncate">
              <span className="text-emerald-600 font-bold">
                {metrics.totalActiveLoans} Live
              </span>{" "}
              • <span>{metrics.totalPendingLoans} Pipeline</span>
            </p>
          </div>
        </div>
      </div>

      {/* 2. TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse table-auto">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-200/60 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <th className="py-4.5 px-6">Guarantor Details</th>
              <th className="py-4.5 px-6">Contact Info</th>
              <th className="py-4.5 px-6 text-right">Total Committed</th>
              <th className="py-4.5 px-6 text-right">Current Exposure</th>
              <th className="py-4.5 px-6 text-center">Loan Activity</th>
              <th className="py-4.5 px-6 text-center">Release Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {guarantors.map((g) => (
              <tr
                key={g.guarantorId}
                className="group hover:bg-slate-50/60 transition-colors"
              >
                {/* Name and ID Column */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <User size={14} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">
                        {g.guarantorName}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium">
                        ID: {g.guarantorId}
                      </p>
                    </div>
                  </div>
                </td>

                {/* New Contact Column */}
                <td className="py-4 px-6">
                  <div className="flex flex-col gap-0.5">
                    <p className="font-semibold text-slate-700">
                      {g.contact?.phone || "N/A"}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {g.contact?.email || "No email"}
                    </p>
                  </div>
                </td>

                {/* Financial Columns */}
                <td className="py-4 px-6 text-right font-semibold text-slate-900">
                  KES{" "}
                  {g.totalGuaranteed.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </td>
                <td className="py-4 px-6 text-right font-semibold text-orange-600">
                  KES{" "}
                  {g.currentExposure.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </td>

                {/* Activity & Status */}
                <td className="py-4 px-6 text-center">
                  <div className="flex justify-center gap-4 text-[10px]">
                    <span className="text-emerald-600 font-bold">
                      {g.activeLoans} Active
                    </span>
                    <span className="text-slate-400">
                      {g.pendingLoans} Pending
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${g.releasedPct}%` }}
                      />
                    </div>
                    <span className="font-bold text-slate-700">
                      {g.releasedPct}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
