import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Shield } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center border-b border-border px-4 bg-card/50 backdrop-blur-sm sticky top-0 z-30">
            <SidebarTrigger className="mr-4 text-muted-foreground hover:text-foreground" />
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-semibold text-sm tracking-tight">ThreatScan AI</span>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
              <span className="text-xs text-muted-foreground font-mono">SYSTEMS ONLINE</span>
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
