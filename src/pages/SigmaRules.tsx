import { BookOpen, CheckCircle, Clock, Search } from "lucide-react";
import { useScanContext } from "@/contexts/ScanContext";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function SigmaRules() {
  const { scanData } = useScanContext();
  const navigate = useNavigate();
  const rules = scanData.sigmaRules;

  if (!rules) {
    return (
      <div className="p-6 max-w-4xl mx-auto space-y-8">
        <div className="opacity-0 animate-fade-in-up">
          <h1 className="text-2xl font-bold tracking-tight">Sigma Rules Engine</h1>
          <p className="text-muted-foreground text-sm mt-1">Community-contributed detection rules for threat identification</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-16 flex flex-col items-center gap-4 opacity-0 animate-fade-in-up stagger-1">
          <Search className="h-10 w-10 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground text-center">No scan results yet. Run a URL or file scan to see matched Sigma rules.</p>
          <div className="flex gap-3 mt-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/url-scan")}>Scan a URL</Button>
            <Button variant="outline" size="sm" onClick={() => navigate("/file-scan")}>Scan a File</Button>
          </div>
        </div>
      </div>
    );
  }

  if (rules.length === 0) {
    return (
      <div className="p-6 max-w-4xl mx-auto space-y-8">
        <div className="opacity-0 animate-fade-in-up">
          <h1 className="text-2xl font-bold tracking-tight">Sigma Rules Engine</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Results for: <span className="font-mono text-foreground">{scanData.scannedTarget}</span>
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-12 flex flex-col items-center gap-3 opacity-0 animate-fade-in-up stagger-1">
          <CheckCircle className="h-8 w-8 text-threat-safe" />
          <p className="text-sm text-muted-foreground">No Sigma rules matched — target appears clean.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="opacity-0 animate-fade-in-up">
        <h1 className="text-2xl font-bold tracking-tight">Sigma Rules Engine</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Results for: <span className="font-mono text-foreground">{scanData.scannedTarget}</span> — {rules.length} rules matched
        </p>
      </div>

      <div className="grid gap-4">
        {rules.map((rule, i) => (
          <div
            key={rule.id}
            className={cn(
              "bg-card border border-border rounded-lg p-5 opacity-0 animate-fade-in-up hover:border-primary/30 transition-colors",
              i < 5 && `stagger-${i + 1}`
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="h-4 w-4 text-primary shrink-0" />
                  <h3 className="font-semibold text-sm">{rule.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground mt-1 max-w-xl">{rule.description}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <span>By {rule.author}</span>
                  <span>{rule.created}</span>
                  <span className="bg-muted px-2 py-0.5 rounded">{rule.category}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={cn(
                  "text-xs font-mono font-semibold px-2 py-0.5 rounded flex items-center gap-1",
                  rule.status === "active" ? "bg-threat-safe/10 text-threat-safe" : "bg-threat-suspicious/10 text-threat-suspicious"
                )}>
                  {rule.status === "active" ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                  {rule.status.toUpperCase()}
                </span>
                <span className={cn(
                  "text-xs font-mono px-2 py-0.5 rounded",
                  rule.confidence === "Critical" ? "bg-threat-dangerous/10 text-threat-dangerous" :
                  rule.confidence === "High" ? "bg-threat-high/10 text-threat-high" :
                  "bg-threat-suspicious/10 text-threat-suspicious"
                )}>
                  {rule.confidence}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
