import {
  Shield, Globe, FileUp, Activity, BookOpen,
  Server, LayoutDashboard, Code
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup,
  SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const scanItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "URL Scanner", url: "/url-scan", icon: Globe },
  { title: "File Scanner", url: "/file-scan", icon: FileUp },
];

const analysisItems = [
  { title: "Sandbox Results", url: "/sandbox", icon: Activity },
  { title: "Sigma Rules", url: "/sigma-rules", icon: BookOpen },
  { title: "Vendor Results", url: "/vendors", icon: Server },
];

const devItems = [
  { title: "API Docs", url: "/api-docs", icon: Code },
];

function NavGroup({ label, items }: { label: string; items: typeof scanItems }) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <SidebarGroup>
      {!collapsed && <SidebarGroupLabel className="text-xs uppercase tracking-widest text-muted-foreground/60">{label}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <NavLink
                  to={item.url}
                  end={item.url === "/"}
                  className="hover:bg-muted/50 transition-colors"
                  activeClassName="bg-primary/10 text-primary font-medium border-l-2 border-primary"
                >
                  <item.icon className="mr-2 h-4 w-4 shrink-0" />
                  {!collapsed && <span className="text-sm">{item.title}</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary shrink-0" />
          {!collapsed && (
            <div>
              <h1 className="font-bold text-sm tracking-tight">ThreatScan</h1>
              <p className="text-[10px] text-primary font-mono tracking-widest">AI POWERED</p>
            </div>
          )}
        </div>
      </div>
      <SidebarContent>
        <NavGroup label="Scanning" items={scanItems} />
        <NavGroup label="Analysis" items={analysisItems} />
        <NavGroup label="Developer" items={devItems} />
      </SidebarContent>
    </Sidebar>
  );
}
