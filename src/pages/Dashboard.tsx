import { useState } from "react";
import { Shield, Globe, FileUp, Activity, BookOpen, Server, AlertTriangle, Trash2 } from "lucide-react";
import { mockDashboardStats, recentScans as initialScans } from "@/lib/mock-data";
import { ThreatScore } from "@/components/ThreatScore";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Total Scans", value: mockDashboardStats.totalScans.toLocaleString(), icon: Shield, change: "+2,341 today" },
  { label: "Malicious Found", value: mockDashboardStats.maliciousDetected.toLocaleString(), icon: AlertTriangle, change: "+127 today" },
  { label: "URLs Scanned", value: mockDashboardStats.urlsScanned.toLocaleString(), icon: Globe, change: "+1,843 today" },
  { label: "Files Scanned", value: mockDashboardStats.filesScanned.toLocaleString(), icon: FileUp, change: "+498 today" },
  { label: "Active Rules", value: mockDashboardStats.activeRules.toLocaleString(), icon: BookOpen, change: "+3 this week" },
  { label: "Vendors Online", value: `${mockDashboardStats.vendorsOnline}/20`, icon: Server, change: "All operational" },
];

function getScoreColor(score: number) {
  if (score <= 20) return "text-threat-safe";
  if (score <= 50) return "text-threat-suspicious";
  if (score <= 80) return "text-threat-high";
  return "text-threat-dangerous";
}

export default function Dashboard() {
  const [recentScans, setRecentScans] = useState(initialScans);
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="opacity-0 animate-fade-in-up">
        <h1 className="text-2xl font-bold tracking-tight leading-tight">Threat Intelligence Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Real-time overview of scan activity and threat landscape</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={cn(
              "bg-card border border-border rounded-lg p-4 opacity-0 animate-fade-in-up",
              `stagger-${i + 1}`
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className="h-4 w-4 text-primary" />
              <span className="text-[11px] text-muted-foreground uppercase tracking-wider">{stat.label}</span>
            </div>
            <p className="text-xl font-bold font-mono">{stat.value}</p>
            <p className="text-[10px] text-muted-foreground mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6 opacity-0 animate-fade-in-up stagger-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Recent Scans</h2>
            {recentScans.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setRecentScans([])}
                className="text-xs text-muted-foreground hover:text-destructive h-7 px-2 gap-1"
              >
                <Trash2 className="h-3 w-3" />
                Clear
              </Button>
            )}
          </div>
          <div className="space-y-2">
            {recentScans.map((scan) => (
              <div key={scan.id} className="flex items-center gap-4 py-3 px-3 rounded-md hover:bg-muted/30 transition-colors group">
                <div className={cn("w-8 h-8 rounded flex items-center justify-center text-xs font-mono font-bold", 
                  scan.score > 80 ? "bg-threat-dangerous/10 text-threat-dangerous" :
                  scan.score > 50 ? "bg-threat-high/10 text-threat-high" :
                  scan.score > 20 ? "bg-threat-suspicious/10 text-threat-suspicious" :
                  "bg-threat-safe/10 text-threat-safe"
                )}>
                  {scan.score}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-mono truncate">{scan.target}</p>
                  <p className="text-[10px] text-muted-foreground">{scan.type} • {scan.time}</p>
                </div>
                <span className={cn("text-xs font-mono font-semibold", getScoreColor(scan.score))}>
                  {scan.score <= 20 ? "SAFE" : scan.score <= 50 ? "SUSPICIOUS" : scan.score <= 80 ? "HIGH" : "DANGER"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 opacity-0 animate-fade-in-up stagger-3">
          <h2 className="text-sm font-semibold mb-6 uppercase tracking-wider text-muted-foreground">Threat Distribution</h2>
          <div className="flex flex-col items-center gap-6">
            <ThreatScore score={67} size="lg" />
            <div className="w-full space-y-3 text-sm">
              {[
                { label: "Trojans", pct: 42 },
                { label: "Ransomware", pct: 18 },
                { label: "Spyware", pct: 15 },
                { label: "Adware", pct: 12 },
                { label: "Worms", pct: 8 },
                { label: "Other", pct: 5 },
              ].map((t) => (
                <div key={t.label} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-20">{t.label}</span>
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary/60 rounded-full" style={{ width: `${t.pct}%` }} />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground w-8 text-right">{t.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
