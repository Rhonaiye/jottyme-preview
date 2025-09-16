'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Folder,
  Users,
  Activity,
  BarChart2,
  Palette,
  Settings,
  HelpCircle,
  Bell,
  Sun,
  Moon,
  Search,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-white text-black dark:bg-black dark:text-white">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}

function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: Home, href: "/dashboard" },
    { name: "My Projects", icon: Folder, href: "/projects" },
    { name: "Shared with me", icon: Users, href: "/shared" },
    { name: "Activity", icon: Activity, href: "/activity" },
    { name: "Analytics", icon: BarChart2, href: "/analytics" },
    { name: "Branding", icon: Palette, href: "/branding" },
  ];

  const bottomItems = [
    { name: "Settings", icon: Settings, href: "/settings" },
    { name: "Help & Feedback", icon: HelpCircle, href: "/help" },
  ];

  return (
    <aside className="h-screen w-64 xl:w-[280px] bg-[#171717] dark:bg-[#171717] text-white flex flex-col p-4 border-r border-[#2E2E2E]">
      {/* Top section: take remaining space above bottom area */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-6">Jottyme</h1>
        <nav className="space-y-3">
          {menuItems.map(({ name, icon: Icon, href }) => {
            const active = pathname === href;
            return (
              <Link
                key={name}
                href={href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors duration-200 hover:bg-[#262626] ${
                  active ? "bg-[#262626] text-[#6A49FC]" : ""
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-semibold text-[0.93em]">{name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Profile + Bottom section: fixed to 35% of the sidebar height */}
      <div className="h-[35vh] min-h-[180px] max-h-[35%] pt-4 flex flex-col justify-between">
        {/* border bar stretched to the full width (negate parent's horizontal padding) */}
        <div className="-mx-4 border-t border-[#2E2E2E]" />

        {/* inner container keeps the original padding for content */}
        <div className="px-1 flex-1 flex flex-col gap-5 xl:gap-7">
          {/* Profile */}
          <div className="pt-6">
            <div className="flex items-center gap-3  rounded-lg bg-[#222222] border-1 border-[#2E2E2E] p-3">
              <div className="h-10 w-10 rounded-full bg-[#222222] flex items-center justify-center font-bold">
                S
              </div>
              <div>
                <p className="font-medium">Samuel</p>
                <p className="text-sm text-gray-300">Product Designer</p>
              </div>
            </div>

           
          </div>

          {/* Bottom links */}
          <div className="space-y-1">
            {bottomItems.map(({ name, icon: Icon, href }) => {
              const active = pathname === href;
              return (
                <Link
                  key={name}
                  href={href}
                  className={`flex items-center gap-3 rounded-lg px-2 py-2 transition-colors duration-200 hover:bg-gray-800 ${
                    active ? "bg-gray-800 font-semibold" : ""
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-semibold">{name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="h-16 py-6 flex items-center justify-between px-6 bg-[#171717] border-b border-[#2E2E2E] text-white">
      {/* Left: Search */}
      <div className="flex items-center flex-1 max-w-md relative">
        <Search className="absolute left-4 top-1/2 text-[#A1A1A1] -translate-y-1/2 h-4.5 w-4.5" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-lg bg-transparent text-white pl-10 pr-3 py-2 border-[1px] text-sm font-semibold border-[#2E2E2E] focus:outline-none"
        />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Dark/Light toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg hover:bg-[#2E2E2E]"
        >
          {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        {/* Notifications */}
        <button className="p-2 rounded-lg hover:bg-[#2E2E2E]">
          <Bell className="h-4 w-4" />
        </button>

        {/* Avatar */}
        <div className="h-9 w-9 rounded-full bg-gray-600 flex items-center justify-center font-bold cursor-pointer">
          S
        </div>
      </div>
    </header>
  );
}
