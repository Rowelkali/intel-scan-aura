import { BookOpen, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { mockSigmaRules } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function SigmaRules() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="opacity-0 animate-fade-in-up">
        <h1 className="text-2xl font-bold tracking-tight">Sigma Rules Engine</h1>
        <p className="text-muted-foreground text-sm mt-1">Community-contributed detection rules for threat identification</p>
      </div>

      <div className="grid gap-4">
        {mockSigmaRules.map((rule, i) => (
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
