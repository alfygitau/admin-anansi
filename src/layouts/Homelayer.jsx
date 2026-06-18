import React, { useState, useEffect, useRef } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  UserCheck,
  UserCog,
  FileClock,
  ArrowLeftRight,
  BarChart3,
  Wallet,
  X,
  LogOut,
  Bell,
  Menu,
  ChevronDown,
  ChevronRight,
  Settings,
  HelpCircle,
  User,
} from "lucide-react";
import { FourCircles } from "../shared/Circles";
import useAuth from "../hooks/useAuth";

export default function Homelayer() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();

  const navigationItems = [
    {
      id: "home",
      label: "Home",
      path: "/admin/dashboard",
      icon: <FourCircles size={18} />,
    },
    {
      id: "members",
      label: "Members",
      path: "/admin/all-members",
      icon: <UserCheck size={18} />,
      badge: "1,240",
    },
    {
      id: "users",
      label: "Users",
      path: "/admin/users",
      icon: <UserCog size={18} />,
      subItems: [
        { label: "All Users", path: "/admin/all-users" },
        { label: "Roles & Permissions", path: "/admin/roles-permissions" },
        { label: "Audit Trails", path: "/admin/audit-trails" },
      ],
    },
    {
      id: "loans",
      label: "Loans",
      path: "/admin/loans",
      icon: <FileClock size={18} />,
      badge: "18",
      subItems: [
        { label: "Loan Applications", path: "/admin/loan-applications" },
        { label: "All Loans", path: "/admin/all-loans" },
        { label: "Guarantors", path: "/admin/guarantors" },
        { label: "Loan Products", path: "/admin/loan-products" },
        {
          label: "Loan Application Approvals",
          path: "/admin/loan-application-approvals",
        },
      ],
    },
    {
      id: "transactions",
      label: "Transactions",
      path: "/admin/transactions",
      icon: <ArrowLeftRight size={18} />,
      subItems: [
        { label: "Account Transactions", path: "/admin/account-transactions" },
        { label: "Loan Transactions", path: "/admin/loan-transactions" },
        { label: "Bulk Payments", path: "/admin/bulk-payments" },
      ],
    },
    {
      id: "reports",
      label: "Reports & Analytics",
      path: "/admin/reports",
      icon: <BarChart3 size={18} />,
      subItems: [
        { label: "Reports", path: "/admin/reports" },
        { label: "Analytics", path: "/admin/analytics" },
      ],
    },
    {
      id: "accounts",
      label: "Portfolio Accounts",
      path: "/admin/accounts",
      icon: <Wallet size={18} />,
    },
  ];

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Real-time navigation path translation matrix
  const getPageContext = () => {
    const path = location.pathname;

    // 1. SYSTEM ANALYTICS & DASHBOARD
    if (path.startsWith("/admin/dashboard")) {
      return { title: "Dashboard", category: "Homepage" };
    }

    // 2. CORE MEMBERS OPERATIONS (Differentiates between registry list, dossier details, and banking accounts)
    if (path.startsWith("/admin/all-members")) {
      if (path.includes("/account/")) {
        return {
          title: "Members",
          category: "Members",
        };
      }
      if (path !== "/admin/all-members" && !path.endsWith("/all-members/")) {
        return { title: "Members", category: "Members" };
      }
      return {
        title: "Members",
        category: "Members",
      };
    }

    if (
      path.startsWith("/admin/loan-products") ||
      path.startsWith("/admin/add-loan-product") ||
      path.startsWith("/admin/edit-loan-product") ||
      path.startsWith("/admin/loan-product/")
    ) {
      return {
        title: "Loan Products",
        category: "Loans",
      };
    }
    if (path.startsWith("/admin/loan-applications")) {
      return {
        title: "Loan Applications",
        category: "Loans",
      };
    }
    if (path.startsWith("/admin/all-loans")) {
      return { title: "Loans", category: "Loans" };
    }
    if (path.startsWith("/admin/guarantors")) {
      return { title: "Guarantors", category: "Loans" };
    }

    // 4. SECURITY & SYSTEM ADMINISTRATORS
    if (
      path.startsWith("/admin/all-users") ||
      path.startsWith("/admin/add-admin-user") ||
      path.startsWith("/admin/roles-permissions")
    ) {
      return {
        title: "Roles",
        category: "Roles",
      };
    }

    // 5. TREASURY TRANSACTIONS LEDGERS
    if (
      path.startsWith("/admin/account-transactions") ||
      path.startsWith("/admin/loan-transactions")
    ) {
      return {
        title: "Transactions",
        category: "Transactions",
      };
    }

    return { title: "Home", category: "Homepage" };
  };

  const currentContext = getPageContext();

  useEffect(() => {
    const currentPath = location.pathname;
    const updateStates = {};
    navigationItems.forEach((item) => {
      if (item.subItems?.some((sub) => sub.path === currentPath)) {
        updateStates[item.id] = true;
      }
    });
    setExpandedMenus((prev) => ({ ...prev, ...updateStates }));
  }, [location.pathname]);

  const toggleMenu = (menuId, e, hasSubItems, path) => {
    if (hasSubItems) {
      e.preventDefault();
      setExpandedMenus((prev) => ({ ...prev, [menuId]: !prev[menuId] }));
    } else if (path) {
      navigate(path);
    }
  };

  const getInitials = (firstname, lastname) => {
    const firstInitial = firstname?.charAt(0) || "";
    const lastInitial = lastname?.charAt(0) || "";
    return `${firstInitial}${lastInitial}`.toUpperCase() || "GU"; // Defaults to 'GU' for Guest User
  };

  // Shared structural generator for rendering consistent item matrices across viewport drawers
  const renderNavList = (isMobile = false) => (
    <nav className="p-4 space-y-3.5">
      {navigationItems.map((item) => {
        const hasSubItems = !!item.subItems?.length;
        const isExpanded = !!expandedMenus[item.id];

        // Match base layout routing paths directly or look into child nodes
        const isCurrentActive = hasSubItems
          ? item.subItems.some((sub) => sub.path === location.pathname)
          : location.pathname === item.path;

        return (
          <div key={item.id} className="space-y-2">
            <button
              onClick={(e) => {
                toggleMenu(item.id, e, hasSubItems, item.path);
                if (isMobile && !hasSubItems) setIsMobileSidebarOpen(false);
              }}
              className={`w-full h-11 flex items-center justify-between px-3.5 transition-all duration-150 font-semibold text-xs uppercase tracking-wider relative group ${
                isCurrentActive
                  ? "bg-slate-100 text-[#074073]"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50/80"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={
                    isCurrentActive
                      ? "text-[#074073]"
                      : "text-slate-400 group-hover:text-slate-600 transition-colors"
                  }
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>

              <div className="flex items-center gap-2">
                {hasSubItems && (
                  <ChevronRight
                    size={14}
                    className={`text-slate-400 transition-transform duration-200 shrink-0 ${
                      isExpanded
                        ? "rotate-90 text-[#074073]"
                        : "group-hover:text-slate-600"
                    }`}
                  />
                )}
              </div>
            </button>

            {/* Submenu Expansion List Chassis */}
            {hasSubItems && isExpanded && (
              <div className="pl-6 ml-1 space-y-1 animate-in fade-in slide-in-from-top-1 duration-150">
                {item.subItems.map((sub, sIdx) => {
                  const isSubActive = location.pathname === sub.path;
                  return (
                    <NavLink
                      key={sIdx}
                      to={sub.path}
                      onClick={() => isMobile && setIsMobileSidebarOpen(false)}
                      className={`h-7 flex items-center pl-3 text-[12px] font-medium tracking-wide transition-all ${
                        isSubActive
                          ? "bg-slate-100 text-[#074073] font-bold"
                          : "text-slate-400 hover:text-slate-800 hover:bg-slate-50/50"
                      }`}
                    >
                      {sub.label}
                    </NavLink>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );

  return (
    <div className="h-screen w-screen bg-slate-50 flex overflow-hidden font-sans antialiased text-slate-800">
      {/* DESKTOP SIDEBAR PANEL */}
      <aside className="hidden lg:flex flex-col w-80 bg-white border-r border-slate-200/80 shrink-0 justify-between">
        <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-200/80 shrink-0 bg-white">
          <div
            onClick={() => navigate("/home")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-medium text-xl">A</span>
            </div>
            <span className="text-primary font-medium text-xl tracking-tighter">
              ANANSI
            </span>
          </div>
        </div>

        {/* NAVIGATION WRAPPER BLOCK */}
        <div className="flex flex-col flex-grow overflow-y-auto">
          {renderNavList(false)}
        </div>

        {/* Profile Session Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-2">
            <Settings className="text-slate-400" />
            <p className="text-slate-400">Settings</p>
          </div>
        </div>
      </aside>

      {/* MOBILE SIDEBAR OVERLAY DRAWER */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="relative w-72 max-w-sm bg-white h-full flex flex-col p-4">
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="absolute top-5 right-5 p-1 text-slate-400 rounded-full bg-slate-50"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-4 mt-2 pl-2">
              <div className="size-9 rounded-xl bg-[#074073] flex items-center justify-center text-white font-black text-sm">
                A
              </div>
              <span className="text-xs font-black text-[#074073] tracking-widest uppercase">
                Anansi Admin
              </span>
            </div>
            <div className="flex-grow overflow-y-auto">
              {renderNavList(true)}
            </div>
          </div>
        </div>
      )}

      {/* WORKSPACE CANVAS CONTAINER */}
      <div className="flex flex-col flex-grow min-w-0 overflow-hidden">
        {/* GLOBAL HEADER */}
        <header className="h-20 bg-white border-b border-slate-200/80 flex items-center justify-between px-4 md:pl-3 md:pr-8 shrink-0 relative z-30 select-none">
          {/* LEFT SECTION: Context Branding & Route Identifiers */}
          <div className="flex items-center gap-4">
            {/* Mobile Sidebar Navigation Toggle Trigger */}
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-all"
            >
              <Menu size={20} />
            </button>

            {/* Dynamic Structural Breadcrumb Frame */}
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[#074073] tracking-widest uppercase opacity-60 leading-none">
                {currentContext.category}
              </span>
              <h1 className="text-base font-bold text-slate-900 tracking-tight mt-1.5 leading-none">
                {currentContext.title}
              </h1>
            </div>
          </div>

          {/* RIGHT SECTION: Operational Utilities, Messaging Framework, & Profile Sessions */}
          <div className="flex items-center gap-5">
            {/* NEED HELP: Premium Support Integration Portal */}
            <button
              onClick={() => navigate("/admin/help-support")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-[#074073] hover:bg-slate-50 transition-all cursor-pointer"
            >
              <HelpCircle
                size={15}
                className="text-slate-400 group-hover:text-[#074073]"
              />
              <span className="hidden md:inline">Need Help?</span>
            </button>

            {/* PROFILE DROPDOWN: Core Administrative Operator Portal */}
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2.5 pl-4 border-l border-slate-200/80 cursor-pointer group"
              >
                {/* Operator Avatar Circle Frame */}
                <div className="size-9 rounded-xl bg-gradient-to-tr from-[#074073] to-blue-600 text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm group-hover:scale-[1.02] transition-transform">
                  {getInitials(auth?.user?.firstname, auth?.user?.lastname)}
                </div>

                {/* Identity Ledger Casing Details */}
                <div className="hidden md:flex flex-col">
                  <span className="text-[12px] font-bold text-slate-800 leading-none group-hover:text-slate-950 transition-colors">
                    {auth?.user?.firstname ?? "Guest"}{" "}
                    {auth?.user?.lastname ?? "User"}
                  </span>
                  <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider mt-1">
                    {auth?.user?.role?.name ?? "Standard Account"}
                  </span>
                </div>

                <ChevronDown
                  size={14}
                  className={`text-slate-400 transition-transform duration-200 shrink-0 ${isProfileOpen ? "rotate-180 text-[#074073]" : "group-hover:text-slate-600"}`}
                />
              </div>

              {/* DROPDOWN OPTIONS OVERLAY LAYER CONTAINER */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2.5 w-56 bg-white border border-slate-200/80 rounded-2xl shadow-[0_10px_30px_-10px_rgba(7,64,115,0.12)] p-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
                  {/* Operator Quick Profile Header Info Context */}
                  <div className="px-3 py-2.5 mb-1 border-b border-slate-100 bg-slate-50/50 rounded-t-xl">
                    <p className="text-[10px] font-bold text-slate-400 tracking-wide uppercase">
                      Signed In As
                    </p>
                    <p className="text-xs font-bold text-slate-700 mt-0.5 truncate">
                      a.mwangi@anansisacco.com
                    </p>
                  </div>

                  {/* Functional Dropdown Direct Options */}
                  <DropdownLinkRow
                    icon={<User size={14} />}
                    title="My Profile"
                    onClick={() => {
                      navigate("/admin/profile");
                      setIsProfileOpen(false);
                    }}
                  />
                  <DropdownLinkRow
                    icon={<Settings size={14} />}
                    title="Settings"
                    onClick={() => {
                      navigate("/admin/settings");
                      setIsProfileOpen(false);
                    }}
                  />

                  <div className="h-[1px] bg-slate-100 my-1.5" />

                  {/* Explicit Sign-Out Destruction Control Option */}
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate("/auth/login");
                    }}
                    className="w-full h-9 flex items-center gap-2.5 px-3 rounded-lg text-left text-xs font-bold text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    <LogOut size={14} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>

            {/* NOTIFICATIONS: Isolation Channel Gate */}
            <button className="relative size-10 rounded-xl border border-slate-200/80 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all cursor-pointer">
              <Bell
                size={18}
                className="text-slate-400 hover:text-slate-700 transition-colors"
              />
              {/* Active Broadcast Notification Pulsing Indicator Dot */}
              <span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-rose-500 border-2 border-white animate-pulse" />
            </button>
          </div>
        </header>

        {/* OUTLET PANE */}
        <main className="flex-grow overflow-y-auto p-4 md:p-4 bg-slate-50/50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

const DropdownLinkRow = ({ icon, title, onClick }) => (
  <button
    onClick={onClick}
    className="w-full h-9 flex items-center gap-2.5 px-3 rounded-xl text-left text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all cursor-pointer"
  >
    <span className="text-slate-400">{icon}</span>
    <span>{title}</span>
  </button>
);
