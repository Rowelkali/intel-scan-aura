import { Server, ShieldAlert, ShieldCheck } from "lucide-react";
import { mockVendorResults } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function VendorResults() {
  const detected = mockVendorResults.filter((v) => v.detected).length;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="opacity-0 animate-fade-in-up">
        <h1 className="text-2xl font-bold tracking-tight">Multi-Engine Vendor Results</h1>
        <p className="text-muted-foreground text-sm mt-1">Aggregated detection results from {mockVendorResults.length} security engines</p>
      </div>

      <div className="flex gap-6 opacity-0 animate-fade-in-up stagger-1">
        <div className="bg-card border border-border rounded-lg p-4 flex-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Detection Ratio</p>
          <p className="text-3xl font-mono font-bold mt-1">{detected}/{mockVendorResults.length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 flex-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Confidence</p>
          <p className="text-3xl font-mono font-bold mt-1 text-threat-dangerous">{Math.round((detected / mockVendorResults.length) * 100)}%</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 flex-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Consensus</p>
          <p className="text-3xl font-mono font-bold mt-1 text-threat-dangerous">Trojan</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden opacity-0 animate-fade-in-up stagger-2">
        <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 px-5 py-3 border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
          <span className="w-5" />
          <span>Vendor</span>
          <span>Detection</span>
          <span>Category</span>
        </div>
        {mockVendorResults.map((v) => (
          <div key={v.vendor} className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 px-5 py-3 border-b border-border/50 hover:bg-muted/20 transition-colors items-center text-sm">
            {v.detected ? (
              <ShieldAlert className="h-4 w-4 text-threat-dangerous" />
            ) : (
              <ShieldCheck className="h-4 w-4 text-threat-safe" />
            )}
            <span className="font-medium">{v.vendor}</span>
            <span className={cn("font-mono text-xs", v.detected ? "text-threat-dangerous" : "text-threat-safe")}>{v.result}</span>
            <span className="text-xs text-muted-foreground min-w-16 text-right">{v.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
