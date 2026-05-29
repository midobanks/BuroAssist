"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, Compass, ClipboardList, Bell, User, LogOut } from "lucide-react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/sign-in");
    router.refresh();
  };

  // Navigation Links
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: "Roadmap", href: "/roadmap", icon: <Compass className="h-5 w-5" /> },
    { name: "Workflows", href: "/workflows", icon: <ClipboardList className="h-5 w-5" /> },
    { name: "Reminders", href: "/reminders", icon: <Bell className="h-5 w-5" /> },
    { name: "Profile", href: "/profile", icon: <User className="h-5 w-5" /> },
  ];

  return (
    <div className="flex-grow flex bg-background">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-surface border-r border-border shrink-0 justify-between">
        <div className="flex flex-col py-6">
          <div className="px-6 pb-6 border-b border-border/60">
            <Link href="/dashboard" className="font-bold text-text-primary text-lg flex items-center gap-1.5">
              <span className="text-accent">Büro</span>
              <span className="font-normal text-text-secondary">Assist</span>
            </Link>
          </div>
          <nav className="mt-6 px-4 flex flex-col space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-text-secondary hover:text-text-primary hover:bg-surface-soft transition-colors"
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border/60">
          <div className="flex items-center justify-between gap-3 px-2 py-1.5 rounded-lg text-sm text-text-secondary hover:text-text-primary cursor-pointer">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-accent-soft text-accent text-xs font-bold flex items-center justify-center">
                U
              </div>
              <span className="font-medium truncate max-w-[120px]">User Account</span>
            </div>
            <button onClick={handleSignOut} className="p-1 hover:bg-surface-soft rounded-md" aria-label="Sign Out">
              <LogOut className="h-4 w-4 text-text-muted" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-h-full pb-20 md:pb-0">
        {/* Header for Mobile / Tablet */}
        <header className="md:hidden border-b border-border bg-surface sticky top-0 z-40">
          <div className="px-4 h-14 flex items-center justify-between">
            <Link href="/dashboard" className="font-bold text-text-primary text-base flex items-center gap-1">
              <span className="text-accent">Büro</span>
              <span className="font-normal text-text-secondary">Assist</span>
            </Link>
            <div className="h-7 w-7 rounded-full bg-accent-soft text-accent text-xs font-bold flex items-center justify-center">
              U
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 flex flex-col max-w-wide w-full mx-auto p-4 md:p-8">
          {children}
        </main>
      </div>

      {/* Bottom Nav Bar for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface border-t border-border flex items-center justify-around z-40 shadow-soft">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex flex-col items-center justify-center w-14 py-1 text-[10px] font-bold tracking-tight text-text-secondary hover:text-text-primary transition-colors"
          >
            <div className="mb-0.5">{item.icon}</div>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
