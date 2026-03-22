import { Activity, Database, Wifi, Code2, Syringe, AlertTriangle } from "lucide-react";
import { mockSandboxResults } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function Section({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 opacity-0 animate-fade-in-up">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function SandboxResults() {
  const data = mockSandboxResults;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="opacity-0 animate-fade-in-up">
        <h1 className="text-2xl font-bold tracking-tight">Sandbox Analysis</h1>
        <p className="text-muted-foreground text-sm mt-1">Dynamic behavioral analysis from cloud sandbox detonation</p>
      </div>

      <div className="bg-card border border-primary/20 rounded-lg p-4 flex items-center gap-3 opacity-0 animate-fade-in-up stagger-1">
        <AlertTriangle className="h-5 w-5 text-threat-dangerous shrink-0" />
        <div>
          <p className="text-sm font-semibold">High-risk behaviors detected</p>
          <p className="text-xs text-muted-foreground">Process injection, C2 communication, and persistence mechanisms identified</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Section icon={Database} title="Registry Modifications">
          <div className="space-y-2">
            {data.registryModifications.map((r, i) => (
              <div key={i} className="py-2 px-3 rounded bg-muted/20 text-sm">
                <p className="font-mono text-xs break-all">{r.key}</p>
                <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                  <span>Action: <span className="text-threat-suspicious font-medium">{r.action}</span></span>
                  <span>Value: <span className="font-mono">{r.value}</span></span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section icon={Wifi} title="Network Connections">
          <div className="space-y-2">
            {data.networkConnections.map((n, i) => (
              <div key={i} className="flex items-center gap-4 py-2 px-3 rounded bg-muted/20 text-sm">
                <span className="font-mono text-xs w-48 shrink-0">{n.destination}</span>
                <span className="text-xs bg-muted px-2 py-0.5 rounded">{n.protocol}</span>
                <span className="text-xs text-threat-high font-medium flex-1">{n.purpose}</span>
                <span className="text-xs text-muted-foreground">{n.country}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section icon={Code2} title="Suspicious API Calls">
          <div className="space-y-2">
            {data.suspiciousApis.map((a, i) => (
              <div key={i} className="flex items-center gap-4 py-2 px-3 rounded bg-muted/20 text-sm">
                <span className="font-mono text-xs flex-1">{a.api}</span>
                <span className="text-xs text-muted-foreground">Called {a.count}x</span>
                <span className={cn("text-xs font-mono font-semibold px-2 py-0.5 rounded",
                  a.risk === "Critical" ? "bg-threat-dangerous/10 text-threat-dangerous" : "bg-threat-high/10 text-threat-high"
                )}>{a.risk}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section icon={Syringe} title="Process Injections">
          <div className="space-y-2">
            {data.processInjections.map((p, i) => (
              <div key={i} className="py-2 px-3 rounded bg-muted/20 text-sm">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono text-threat-dangerous">{p.source}</span>
                  <span className="text-muted-foreground">→</span>
                  <span className="font-mono">{p.target}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Technique: <span className="text-foreground font-medium">{p.technique}</span></p>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
