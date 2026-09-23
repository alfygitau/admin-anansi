import React, { useState } from "react";
import {
  Landmark,
  Percent,
  ShieldCheck,
  Users,
  Search,
  ArrowRight,
  CreditCard,
  Building2,
  Bell,
  Lock,
  Layers,
  SlidersHorizontal,
  ChevronRight,
  Sparkles,
  HeartHandshake,
  Folder,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AllSettings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const productSections = [
    {
      id: "loan-products",
      category: "products",
      title: "Loan & Credit Products",
      description:
        "Set up loan types, decide on interest rates, define borrowing limits, and configure friendly repayment terms for your members.",
      icon: Folder,
      badge: "8 Active Loans",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
      accentColor: "from-blue-600/10 to-transparent",
      items: [
        {
          label: "Emergency & Personal Loans",
          meta: "Reducing balance / Flexible payback",
        },
        {
          label: "Asset Financing & Mortgages",
          meta: "Custom terms & risk levels",
        },
        { label: "Borrowing Limits", meta: "Based on savings & share capital" },
      ],
      actionText: "Manage Loans",
    },
    {
      id: "financial-products",
      category: "products",
      title: "Savings & Deposit Products",
      description:
        "Configure regular savings plans, share capital options, fixed-term deposits, and special accounts for your members.",
      icon: Landmark,
      badge: "6 Active Plans",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200/60",
      accentColor: "from-emerald-600/10 to-transparent",
      items: [
        {
          label: "Share Capital & Dividends",
          meta: "Member ownership units & payouts",
        },
        {
          label: "Regular Savings & FOSA",
          meta: "Monthly savings targets & limits",
        },
        {
          label: "Fixed Deposits & Junior Plans",
          meta: "Locked yields & payout dates",
        },
      ],
      actionText: "Manage Savings & Accounts",
    },
  ];

  const systemSections = [
    {
      id: "fee-structures",
      category: "rules",
      title: "Fees & Penalties",
      description:
        "Set up account maintenance charges, late contribution penalties, and service fees.",
      icon: CreditCard,
      badge: "Fee Settings",
      actionText: "Adjust Fee Rules",
    },
    {
      id: "user-roles",
      category: "security",
      title: "Team Roles & Permissions",
      description:
        "Choose who can view or change details, assign staff roles, and set up approval steps.",
      icon: Users,
      badge: "Team Access",
      actionText: "Manage Team Access",
    },
    {
      id: "compliance-kyc",
      category: "security",
      title: "Member Verification & ID",
      description:
        "Set required ID documents, account opening rules, and safety verification guidelines.",
      icon: ShieldCheck,
      badge: "Member Safety",
      actionText: "Update Checklist",
    },
    {
      id: "org-details",
      category: "general",
      title: "Organization Profile",
      description:
        "Update your official organization details, branch locations, operating hours, and defaults.",
      icon: Building2,
      badge: "Profile",
      actionText: "Edit Profile",
    },
    {
      id: "notifications",
      category: "general",
      title: "Messages & Alerts",
      description:
        "Personalize automatic SMS and email updates sent out to your members and team.",
      icon: Bell,
      badge: "Automations",
      actionText: "Customize Alerts",
    },
    {
      id: "audit-logs",
      category: "security",
      title: "Activity & Audit Logs",
      description:
        "Keep track of account changes, see who signed in, and review activity history for peace of mind.",
      icon: Lock,
      badge: "History",
      actionText: "View Activity Log",
    },
  ];

  const matchesSearch = (item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase());

  const filteredProducts = productSections.filter(matchesSearch);
  const filteredSystemSections = systemSections.filter(matchesSearch);

  const hasAnyResults =
    filteredProducts.length > 0 || filteredSystemSections.length > 0;

  const onNavigate = (id) => {
    if (id === "financial-products") {
      navigate("/admin/all-financial-products");
    } else {
      navigate("/admin/loan-products");
    }
  };

  return (
    <div className="w-full space-y-6 select-none">
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <span>Settings</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1 flex items-center gap-2.5">
            Settings
          </h1>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            Welcome! Here you can customize your financial products, manage
            rules, and keep your organization running smoothly.
          </p>
        </div>
      </div>

      {/* 2. SEARCH CONTROLS */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for loans, savings, fees, or permissions..."
            className="w-full pl-9 pr-4 py-4 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all shadow-3xs"
          />
        </div>
      </div>

      {/* 3. MEMBER FINANCIAL PRODUCTS SECTION */}
      {filteredProducts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Member Products
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProducts.map((product) => {
              const Icon = product.icon;
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-3xs flex flex-col justify-between group transition-all hover:border-slate-300 hover:shadow-sm"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 group-hover:bg-[#074073]/5 group-hover:text-[#074073] group-hover:border-[#074073]/15 transition-all shrink-0">
                        <Icon size={18} />
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 bg-slate-100 text-slate-500 rounded border border-slate-200/60">
                        {product.badge}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-800 tracking-tight group-hover:text-[#074073] transition-colors">
                        {product.title}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1 line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => onNavigate && onNavigate(product.id)}
                      className="w-full flex items-center justify-between text-xs font-bold text-slate-700 hover:text-[#074073] transition-colors cursor-pointer group/btn"
                    >
                      <span>{product.actionText}</span>
                      <ArrowRight
                        size={14}
                        className="text-slate-400 group-hover/btn:translate-x-1 group-hover/btn:text-[#074073] transition-all"
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. DAILY OPERATIONS & SYSTEM CONTROLS */}
      {filteredSystemSections.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              System Controls
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSystemSections.map((section) => {
              const Icon = section.icon;
              return (
                <div
                  key={section.id}
                  className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-3xs flex flex-col justify-between group transition-all hover:border-slate-300 hover:shadow-sm"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 group-hover:bg-[#074073]/5 group-hover:text-[#074073] group-hover:border-[#074073]/15 transition-all shrink-0">
                        <Icon size={18} />
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 bg-slate-100 text-slate-500 rounded border border-slate-200/60">
                        {section.badge}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-800 tracking-tight group-hover:text-[#074073] transition-colors">
                        {section.title}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1 line-clamp-2">
                        {section.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => onNavigate && onNavigate(section.id)}
                      className="w-full flex items-center justify-between text-xs font-bold text-slate-700 hover:text-[#074073] transition-colors cursor-pointer group/btn"
                    >
                      <span>{section.actionText}</span>
                      <ArrowRight
                        size={14}
                        className="text-slate-400 group-hover/btn:translate-x-1 group-hover/btn:text-[#074073] transition-all"
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. NO SEARCH RESULTS STATE */}
      {!hasAnyResults && (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200/60 space-y-3">
          <div className="p-3 bg-slate-50 rounded-full w-fit mx-auto text-slate-400">
            <SlidersHorizontal size={20} />
          </div>
          <p className="text-xs font-bold text-slate-600">
            We couldn't find anything matching that search
          </p>
          <p className="text-xs text-slate-400">
            Try searching for terms like "Loans", "Savings", "Fees", or "Team".
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="text-xs font-bold text-[#074073] hover:underline cursor-pointer"
          >
            Clear search and show everything
          </button>
        </div>
      )}
    </div>
  );
};
