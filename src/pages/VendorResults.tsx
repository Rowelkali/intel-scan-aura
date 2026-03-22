import { Server, ShieldAlert, ShieldCheck, Search } from "lucide-react";
import { useScanContext } from "@/contexts/ScanContext";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function VendorResults() {
  const { scanData } = useScanContext();
  const navigate = useNavigate();
  const results = scanData.vendorResults;

  if (!results) {
    return (
      <div className="p-6 max-w-4xl mx-auto space-y-8">
        <div className="opacity-0 animate-fade-in-up">
          <h1 className="text-2xl font-bold tracking-tight">Multi-Engine Vendor Results</h1>
          <p className="text-muted-foreground text-sm mt-1">Aggregated detection results from security engines</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-16 flex flex-col items-center gap-4 opacity-0 animate-fade-in-up stagger-1">
          <Search className="h-10 w-10 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground text-center">No scan results yet. Run a URL or file scan first.</p>
          <div className="flex gap-3 mt-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/url-scan")}>Scan a URL</Button>
            <Button variant="outline" size="sm" onClick={() => navigate("/file-scan")}>Scan a File</Button>
          </div>
        </div>
      </div>
    );
  }

  const detected = results.filter((v) => v.detected).length;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="opacity-0 animate-fade-in-up">
        <h1 className="text-2xl font-bold tracking-tight">Multi-Engine Vendor Results</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Results for: <span className="font-mono text-foreground">{scanData.scannedTarget}</span>
        </p>
      </div>

      <div className="flex gap-6 opacity-0 animate-fade-in-up stagger-1">
        <div className="bg-card border border-border rounded-lg p-4 flex-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Detection Ratio</p>
          <p className="text-3xl font-mono font-bold mt-1">{detected}/{results.length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 flex-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Confidence</p>
          <p className={cn("text-3xl font-mono font-bold mt-1", detected > 0 ? "text-threat-dangerous" : "text-threat-safe")}>
            {Math.round((detected / results.length) * 100)}%
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 flex-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Consensus</p>
          <p className={cn("text-3xl font-mono font-bold mt-1", detected > 0 ? "text-threat-dangerous" : "text-threat-safe")}>
            {detected > 0 ? "Trojan" : "Clean"}
          </p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden opacity-0 animate-fade-in-up stagger-2">
        <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 px-5 py-3 border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
          <span className="w-5" />
          <span>Vendor</span>
          <span>Detection</span>
          <span>Category</span>
        </div>
        {results.map((v) => (
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
