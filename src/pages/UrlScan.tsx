import { useState } from "react";
import { Globe, Search, ShieldCheck, ShieldAlert, ShieldX, ExternalLink, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThreatScore } from "@/components/ThreatScore";
import { mockVendorResults } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface ScanResult {
  url: string;
  score: number;
  domainAge: string;
  whoisAnomaly: boolean;
  blacklisted: string[];
  detectionRatio: string;
  indicators: string[];
}

export default function UrlScan() {
  const [url, setUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  const handleScan = () => {
    if (!url.trim()) return;
    setScanning(true);
    setResult(null);
    setTimeout(() => {
      const isMalicious = url.includes("malware") || url.includes("phish") || url.includes("hack");
      const score = isMalicious ? 72 + Math.floor(Math.random() * 25) : Math.floor(Math.random() * 18);
      setResult({
        url,
        score,
        domainAge: isMalicious ? "3 days" : "8 years, 4 months",
        whoisAnomaly: isMalicious,
        blacklisted: isMalicious ? ["OpenPhish", "URLhaus", "PhishTank"] : [],
        detectionRatio: isMalicious ? "14/20" : "0/20",
        indicators: isMalicious
          ? ["Recently registered domain", "Known phishing infrastructure", "Suspicious TLD", "IP linked to botnet C2", "SSL certificate mismatch"]
          : ["Domain has long registration history", "Clean reputation across all feeds", "Valid SSL certificate"],
      });
      setScanning(false);
    }, 2200);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="opacity-0 animate-fade-in-up">
        <h1 className="text-2xl font-bold tracking-tight">URL Scanner</h1>
        <p className="text-muted-foreground text-sm mt-1">Analyze URLs against 20+ threat intelligence feeds</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 opacity-0 animate-fade-in-up stagger-1">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleScan()}
              placeholder="Enter URL to scan (e.g., https://example.com)"
              className="pl-10 bg-muted/30 border-border font-mono text-sm h-11"
            />
          </div>
          <Button onClick={handleScan} disabled={scanning || !url.trim()} className="h-11 px-6 font-semibold">
            {scanning ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Scanning
              </span>
            ) : (
              <span className="flex items-center gap-2"><Search className="h-4 w-4" /> Scan URL</span>
            )}
          </Button>
        </div>
      </div>

      {scanning && (
        <div className="bg-card border border-border rounded-lg p-12 flex flex-col items-center gap-4 opacity-0 animate-fade-in">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
            <Globe className="absolute inset-0 m-auto h-8 w-8 text-primary animate-pulse-glow" />
          </div>
          <p className="text-sm text-muted-foreground font-mono">Querying threat intelligence feeds...</p>
        </div>
      )}

      {result && !scanning && (
        <div className="space-y-6 opacity-0 animate-fade-in-up">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start gap-8">
              <ThreatScore score={result.score} size="lg" />
              <div className="flex-1 space-y-4">
                <div>
                  <p className="font-mono text-sm text-muted-foreground break-all">{result.url}</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Domain age: {result.domainAge}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Detection: </span>
                    <span className="font-mono font-bold">{result.detectionRatio}</span>
                    <span className="text-muted-foreground"> engines</span>
                  </div>
                  {result.whoisAnomaly && (
                    <span className="text-xs bg-threat-suspicious/10 text-threat-suspicious px-2 py-0.5 rounded font-mono">
                      WHOIS ANOMALY
                    </span>
                  )}
                </div>
                {result.blacklisted.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {result.blacklisted.map((bl) => (
                      <span key={bl} className="text-xs bg-threat-dangerous/10 text-threat-dangerous px-2 py-0.5 rounded font-mono">
                        {bl}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Indicators</h3>
            <div className="space-y-2">
              {result.indicators.map((ind, i) => (
                <div key={i} className="flex items-center gap-3 text-sm py-1">
                  {result.score > 50 ? (
                    <ShieldAlert className="h-4 w-4 text-threat-dangerous shrink-0" />
                  ) : (
                    <ShieldCheck className="h-4 w-4 text-threat-safe shrink-0" />
                  )}
                  <span>{ind}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
