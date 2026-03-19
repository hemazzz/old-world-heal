import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  UserPlus,
  Calendar,
  Stethoscope,
  FileText,
  Pill,
  Receipt,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { t, isRTL } = useLanguage();

  const navigation = [
    { name: t('welcome'), href: "/", icon: Home },
    { name: t('patientRegistration'), href: "/patients/register", icon: UserPlus },
    { name: t('appointments'), href: "/appointments", icon: Calendar },
    { name: t('doctorDashboard'), href: "/doctor", icon: Stethoscope },
    { name: t('patientRecords'), href: "/records", icon: FileText },
    { name: t('prescriptions'), href: "/prescriptions", icon: Pill },
    { name: t('billing'), href: "/billing", icon: Receipt },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "fixed top-4 z-50 lg:hidden",
          isRTL ? "right-4" : "left-4"
        )}
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-vintage-ink/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 z-40 h-screen w-72 bg-sidebar border-sidebar-border transition-transform duration-300 lg:translate-x-0",
          isRTL ? "right-0 border-l" : "left-0 border-r",
          mobileOpen ? "translate-x-0" : isRTL ? "translate-x-full" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                <Stethoscope className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-heading text-xl font-bold text-sidebar-foreground">
                  {t('clinicDesk')}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {t('healthcareManagement')}
                </p>
              </div>
            </div>
          </div>

          {/* Language Selector */}
          <div className="px-4 py-3 border-b border-sidebar-border">
            <LanguageSelector />
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
            {navigation.map((item, index) => {
              const isActive = location.pathname === item.href;
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm transition-all duration-200 group",
                    isActive
                      ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-md"
                  )}
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <item.icon
                    className={cn(
                      "w-5 h-5 transition-all duration-200",
                      !isActive && "group-hover:scale-110 group-hover:text-primary"
                    )}
                  />
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="px-4 py-4 rounded-xl bg-gradient-to-r from-vintage-sage/20 to-vintage-rose/20">
              <p className="text-xs text-muted-foreground italic text-center">
                {t('tagline')}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
