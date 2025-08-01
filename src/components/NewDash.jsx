import * as React from "react"
import clsx from "clsx"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

import {
  AppWindow,
  BarChart2,
  Bike,
  ChevronDown,
  ChevronRight,
  CircleDot,
  Cpu,
  File,
  FileText,
  Heart,
  LayoutDashboard,
  MapPin,
  Menu,
  Search,
  Settings,
  Star,
  Table,
  UtensilsCrossed,
  MoreHorizontal,
  CheckCircle,
  Truck,
  XCircle,
  DollarSign,
  TrendingUp,
  Gift,
  Award,
  Database,
  Clock,
  Receipt,
  Shield,
  Users,
  CreditCard,
  Wrench,
  FileCheck,
  Banknote,
  Plus,
  Edit,
  Trash2,
  Globe,
  Check,
  Bell
} from "lucide-react"
import DashboardContent from "./DashboardContent"



// --- Updated Data for Sidebar Navigation ---
const menuItems = [
  {
    group: "Main Menu",
    items: [
      { 
        name: "Dashboard", 
        icon: LayoutDashboard, 
        href: "#",
        key: "dashboard",
        active: true,
        subItems: [
          { name: "Overview", href: "#", key: "overview" },
          { name: "Analytics", href: "#", key: "analytics" },
          { name: "Reports", href: "#", key: "reports" },
        ]
      },
      {
        name: "Master",
        icon: Database,
        href: "#",
        key: "master",
        subItems: [
          { name: "Restaurant Master", href: "#", key: "restaurant-master" },
          { name: "Category Master", href: "#", key: "category-master" },
          { name: "Item Master", href: "#", key: "item-master" },
          { name: "Location Master", href: "#", key: "location-master" },
        ],
      },
      {
        name: "Pending Rate",
        icon: Clock,
        href: "#",
        key: "pending-rate",
        subItems: [
          { name: "Delivery Rates", href: "#", key: "delivery-rates" },
          { name: "Service Charges", href: "#", key: "service-charges" },
          { name: "Commission Rates", href: "#", key: "commission-rates" },
        ],
      },
      {
        name: "Trip Manager",
        icon: Truck,
        href: "#",
        key: "trip-manager",
        subItems: [
          { name: "Active Trips", href: "#", key: "active-trips" },
          { name: "Trip History", href: "#", key: "trip-history" },
          { name: "Route Planning", href: "#", key: "route-planning" },
          { name: "Trip Assignment", href: "#", key: "trip-assignment" },
        ],
      },
      {
        name: "Trip Expenses",
        icon: Receipt,
        href: "#",
        key: "trip-expenses",
        subItems: [
          { name: "Fuel Expenses", href: "#", key: "fuel-expenses" },
          { name: "Maintenance Cost", href: "#", key: "maintenance-cost" },
          { name: "Driver Allowance", href: "#", key: "driver-allowance" },
        ],
      },
      {
        name: "POD Verify",
        icon: FileCheck,
        href: "#",
        key: "pod-verify",
        subItems: [
          { name: "Pending Verification", href: "#", key: "pending-verification" },
          { name: "Verified PODs", href: "#", key: "verified-pods" },
          { name: "Rejected PODs", href: "#", key: "rejected-pods" },
        ],
      },
      {
        name: "Customer Billing",
        icon: CreditCard,
        href: "#",
        key: "customer-billing",
        subItems: [
          { name: "Generate Bills", href: "#", key: "generate-bills" },
          { name: "Billing History", href: "#", key: "billing-history" },
          { name: "Payment Status", href: "#", key: "payment-status" },
        ],
      },
      {
        name: "Payment Receipt",
        icon: Banknote,
        href: "#",
        key: "payment-receipt",
        subItems: [
          { name: "Received Payments", href: "#", key: "received-payments" },
          { name: "Pending Payments", href: "#", key: "pending-payments" },
          { name: "Payment Methods", href: "#", key: "payment-methods" },
        ],
      },
      {
        name: "Vehicle Maintenance",
        icon: Wrench,
        href: "#",
        key: "vehicle-maintenance",
        subItems: [
          { name: "Maintenance Schedule", href: "#", key: "maintenance-schedule" },
          { name: "Service History", href: "#", key: "service-history" },
          { name: "Vehicle Status", href: "#", key: "vehicle-status" },
        ],
      },
      {
        name: "Report's",
        icon: BarChart2,
        href: "#",
        key: "reports",
        subItems: [
          { name: "Performance Reports", href: "#", key: "performance-reports" },
          { name: "Financial Reports", href: "#", key: "financial-reports" },
          { name: "Driver Reports", href: "#", key: "driver-reports" },
          { name: "Custom Reports", href: "#", key: "custom-reports" },
        ],
      },
      {
        name: "User Master",
        icon: Users,
        href: "#",
        key: "user-master",
        subItems: [
          { name: "Driver Management", href: "#", key: "driver-management" },
          { name: "Admin Users", href: "#", key: "admin-users" },
          { name: "Customer Accounts", href: "#", key: "customer-accounts" },
        ],
      },
      {
        name: "Security",
        icon: Shield,
        href: "#",
        key: "security",
        subItems: [
          { name: "User Permissions", href: "#", key: "user-permissions" },
          { name: "Access Logs", href: "#", key: "access-logs" },
          { name: "Security Settings", href: "#", key: "security-settings" },
        ],
      },
      {
        name: "Settlement",
        icon: DollarSign,
        href: "#",
        key: "settlement",
        subItems: [
          { name: "Driver Settlement", href: "#", key: "driver-settlement" },
          { name: "Restaurant Settlement", href: "#", key: "restaurant-settlement" },
          { name: "Commission Settlement", href: "#", key: "commission-settlement" },
        ],
      },
    ],
  },
];


// --- Reusable Sidebar Item Component ---
const SidebarItem = ({ item, isCollapsed, activePage, setActivePage }) => {
  const hasSubItems = item.subItems && item.subItems.length > 0;
  const isActive = activePage === item.key;
  
  const handleClick = (e) => {
    e.preventDefault();
    if (!hasSubItems) {
      setActivePage(item.key);
    }
  };

  const handleSubItemClick = (e, subItem) => {
    e.preventDefault();
    setActivePage(subItem.key);
  };
  
  const commonClasses = clsx(
    "flex items-center gap-4 rounded-md text-sm font-medium transition-colors w-full text-left",
    {
      "bg-orange-500 text-white": isActive,
      "text-gray-600 hover:bg-orange-100 hover:text-orange-600": !isActive,
      "p-3": !isCollapsed,
      "p-3 justify-center": isCollapsed,
    }
  );

  const content = (
    <>
      <item.icon className={clsx("h-5 w-5", isActive ? "text-white" : "text-gray-500")} />
      {!isCollapsed && <span className="flex-1">{item.name}</span>}
    </>
  );

  if (hasSubItems && !isCollapsed) {
    return (
      <Accordion type="single" collapsible defaultValue={isActive ? "item-1" : undefined}>
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger className={clsx(commonClasses, "hover:no-underline")}>
            {content}
          </AccordionTrigger>
          <AccordionContent className="py-1 pl-8">
            {item.subItems.map((subItem) => (
              <button
                key={subItem.name}
                onClick={(e) => handleSubItemClick(e, subItem)}
                className={clsx(
                  "flex items-center gap-3 rounded-md px-4 py-2 text-sm transition-colors w-full text-left",
                  activePage === subItem.key 
                    ? "text-orange-600 bg-orange-50" 
                    : "text-gray-500 hover:text-orange-500 hover:bg-orange-50"
                )}
              >
                <CircleDot className="h-3 w-3" />
                <span>{subItem.name}</span>
              </button>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <button onClick={handleClick} className={commonClasses}>
      {content}
    </button>
  );
};

// --- Main Layout Components ---
const Sidebar = ({ isCollapsed, activePage, setActivePage }) => (
  <aside
    className={clsx(
      "fixed left-0 top-14 bottom-0 flex flex-col bg-white transition-all duration-300 ease-in-out z-20 border-r border-gray-200 rounded-tr-[32px]",
      isCollapsed ? "w-20" : "w-64"
    )}
  >
    <div className="bg-orange-500 overflow-y-auto ">
    
    <div className="flex-1 overflow-y-auto overflow-x-hidden pt-6 bg-white rounded-tl-[40px]">
      <nav className="flex flex-col gap-y-2 p-4">
        {menuItems.map((group) => (
          <div key={group.group}>
            {!isCollapsed && (
              <h3 className="mb-3 px-2 text-xs font-semibold uppercase text-gray-400 tracking-wider">
                {group.group}
              </h3>
            )}
            <div className="flex flex-col gap-y-1">
              {group.items.map((item) => (
                <SidebarItem 
                  key={item.name} 
                  item={item} 
                  isCollapsed={isCollapsed} 
                  activePage={activePage}
                  setActivePage={setActivePage}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>
    </div>
    </div>

    <div className="p-4 border-t border-gray-100">
      <button className="flex w-full items-center gap-3 rounded-lg bg-orange-50 p-3 text-sm font-medium text-orange-600 hover:bg-orange-100 transition-colors">
        <Settings className="h-5 w-5" />
        {!isCollapsed && <span>Settings</span>}
      </button>
    </div>
  </aside>
);



const Header = ({ onMenuClick }) => (
  <header className="fixed top-0 left-0 right-0 z-30 flex h-14 items-center justify-between bg-orange-500 px-4 text-white border-none">
    {/* Left Section: Logo, Menu, Location */}
    <div className="flex items-center gap-4">
      <a href="#" className="flex items-center gap-2 text-white">
        <CircleDot className="h-6 w-6" strokeWidth={1.5} />
        <span className="text-lg font-bold tracking-tight">TripTrap.</span>
      </a>
      <button
        onClick={onMenuClick}
        className="rounded-full p-1.5 hover:bg-white/20 ml-2"
      >
        <Menu className="h-5 w-5" />
      </button>
      <div className="hidden items-center gap-2 md:flex ml-4">
        <MapPin className="h-4 w-4" />
        <span className="text-sm">India</span>
        <ChevronDown className="h-3 w-3" />
      </div>
    </div>

    {/* Center Section: Search Bar */}
    <div className="flex-1 px-4 md:px-8">
      <div className="relative max-w-lg mx-auto">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search for your trip..."
          className="h-9 w-full rounded-lg border-none bg-white/90 py-2 pl-10 pr-3 text-sm text-gray-700 placeholder:text-gray-500 focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
    </div>

    {/* Right Section: Actions */}
    <div className="flex items-center gap-2">
      {/* --- Language Selector --- */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="rounded-full p-1.5 transition-colors hover:bg-white/20">
            <Globe className="h-5 w-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Select Language</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center justify-between">
            English
            <Check className="h-4 w-4" />
          </DropdownMenuItem>
          <DropdownMenuItem>Español</DropdownMenuItem>
          <DropdownMenuItem>Français</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* --- Notification Bell --- */}
      <button className="relative rounded-full p-1.5 transition-colors hover:bg-white/20">
        <Bell className="h-5 w-5" />
        <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
        </span>
        <span className="sr-only">View notifications</span>
      </button>

      {/* --- User Profile --- */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-white/20">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src="https://i.pravatar.cc/150?u=joshua"
                alt="@joshua"
              />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div className="hidden text-left lg:block">
              <p className="text-sm font-semibold">Ashutosh</p>
            </div>
            <ChevronRight className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
);

// Function to render content based on active page
const renderPageContent = (activePage) => {
  switch (activePage) {
    case 'dashboard':
      return <DashboardContent />;
    case 'page':
    default:
      return <></>;
  }
};

// --- The Main Page Component ---
const FoodDeskLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const [activePage, setActivePage] = React.useState('dashboard');

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-white font-sans">
      <Header onMenuClick={toggleSidebar} />
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <div className={clsx(
        "flex flex-1 flex-col transition-all duration-300 ease-in-out pt-14 bg-gray-50 rounded-tl-[32px]",
        isSidebarCollapsed ? "ml-20" : "ml-64"
      )}>
        <main className="flex-1 overflow-y-auto p-6">
          {renderPageContent(activePage)}
        </main>
      </div>
    </div>
  );
};

export default FoodDeskLayout;