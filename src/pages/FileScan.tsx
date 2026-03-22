import { useState, useRef } from "react";
import { FileUp, Upload, FileText, Hash, ShieldAlert, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThreatScore } from "@/components/ThreatScore";
import { mockVendorResults } from "@/lib/mock-data";
import { useScanContext } from "@/contexts/ScanContext";
import { cn } from "@/lib/utils";

interface FileResult {
  name: string;
  size: string;
  md5: string;
  sha256: string;
  score: number;
  malwareType: string;
  detectionRatio: string;
  vendors: typeof mockVendorResults;
}

export default function FileScan() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<FileResult | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { triggerScanResults } = useScanContext();

  const processFile = (file: File) => {
    setScanning(true);
    setResult(null);
    const isSuspicious = file.name.includes(".exe") || file.name.includes("crack") || file.name.includes("keygen");
    setTimeout(() => {
      const score = isSuspicious ? 70 + Math.floor(Math.random() * 28) : Math.floor(Math.random() * 15);
      const detected = mockVendorResults.filter((v) => v.detected);
      setResult({
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        md5: Array.from({ length: 32 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join(""),
        sha256: Array.from({ length: 64 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join(""),
        score,
        malwareType: isSuspicious ? "Trojan.GenericKD / Downloader" : "N/A — Clean",
        detectionRatio: isSuspicious ? `${detected.length}/${mockVendorResults.length}` : `0/${mockVendorResults.length}`,
        vendors: isSuspicious ? mockVendorResults : mockVendorResults.map((v) => ({ ...v, detected: false, result: "Clean", category: "-" })),
      });
      triggerScanResults(file.name, isSuspicious);
      setScanning(false);
    }, 3000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="opacity-0 animate-fade-in-up">
        <h1 className="text-2xl font-bold tracking-tight">File Scanner</h1>
        <p className="text-muted-foreground text-sm mt-1">Upload files for multi-engine static & dynamic analysis</p>
      </div>

      <div
        className={cn(
          "bg-card border-2 border-dashed rounded-lg p-12 flex flex-col items-center gap-4 transition-colors opacity-0 animate-fade-in-up stagger-1 cursor-pointer",
          dragOver ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/30"
        )}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input ref={inputRef} type="file" className="hidden" onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])} />
        <Upload className="h-10 w-10 text-muted-foreground" />
        <div className="text-center">
          <p className="text-sm font-medium">Drop a file here or click to upload</p>
          <p className="text-xs text-muted-foreground mt-1">Supports PDF, APK, ZIP, EXE, DOCX, and more</p>
        </div>
      </div>

      {scanning && (
        <div className="bg-card border border-border rounded-lg p-12 flex flex-col items-center gap-4 opacity-0 animate-fade-in">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
            <FileUp className="absolute inset-0 m-auto h-8 w-8 text-primary animate-pulse-glow" />
          </div>
          <p className="text-sm text-muted-foreground font-mono">Hashing & scanning across 20 engines...</p>
        </div>
      )}

      {result && !scanning && (
        <div className="space-y-6 opacity-0 animate-fade-in-up">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start gap-8">
              <ThreatScore score={result.score} size="lg" />
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="font-mono text-sm">{result.name}</span>
                  <span className="text-xs text-muted-foreground">({result.size})</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <Hash className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">MD5:</span>
                    <span className="font-mono text-muted-foreground/80 break-all">{result.md5}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Hash className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">SHA256:</span>
                    <span className="font-mono text-muted-foreground/80 break-all">{result.sha256}</span>
                  </div>
                </div>
                <div className="flex gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Detection: </span>
                    <span className="font-mono font-bold">{result.detectionRatio}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Classification: </span>
                    <span className="font-mono font-semibold">{result.malwareType}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Vendor Detection Results</h3>
            <div className="grid gap-1">
              {result.vendors.map((v) => (
                <div key={v.vendor} className="flex items-center gap-3 py-2 px-3 rounded hover:bg-muted/20 text-sm">
                  {v.detected ? (
                    <ShieldAlert className="h-4 w-4 text-threat-dangerous shrink-0" />
                  ) : (
                    <ShieldCheck className="h-4 w-4 text-threat-safe shrink-0" />
                  )}
                  <span className="w-40 font-medium truncate">{v.vendor}</span>
                  <span className={cn("font-mono text-xs flex-1", v.detected ? "text-threat-dangerous" : "text-threat-safe")}>
                    {v.result}
                  </span>
                  <span className="text-xs text-muted-foreground w-20 text-right">{v.category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
