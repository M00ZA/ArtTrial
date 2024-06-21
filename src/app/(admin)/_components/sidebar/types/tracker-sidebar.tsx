import { AppLogo } from "@/components/logo";
import { SidebarGroup } from "../sidebar-group";
import { Bell, Cog, Home, LogOut, ShoppingBag, User } from "lucide-react";
import { useAdminLougout } from "@/hooks/useAdmin";

export const TrackerSidebar = ({ language }: { language: string }) => {
  const logoutHandler = useAdminLougout();
  return (
    <aside
      className={`w-[280px] fixed top-0 bg-white border-r border-r-gray-200 h-full ${
        language === "english" ? "left-0" : "border-l border-l-gray-200 right-0"
      }`}
    >
      <div className="flex items-center justify-center border-b">
        <AppLogo />
      </div>

      <SidebarGroup
        label="Main"
        items={[{ href: "/admin/dashboard", label: "Dashboard", icon: Home }]}
      />

      <SidebarGroup
        label="Lists"
        items={[{ href: "/admin/orders", label: "Orders", icon: ShoppingBag }]}
      />

      {/* <SidebarGroup
        label="Services"
        items={[{ href: "/admin/settings", label: "Settings", icon: Cog }]}
      /> */}

      <SidebarGroup
        label="User"
        items={[
          { href: "/admin/profile", label: "Profile", icon: User },
          {
            href: "/admin/logout",
            label: "Logout",
            icon: LogOut,
            onClick: logoutHandler,
          },
        ]}
      />
    </aside>
  );
};
