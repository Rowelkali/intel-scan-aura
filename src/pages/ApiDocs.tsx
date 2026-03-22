import { Code, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

const endpoints = [
  {
    method: "POST",
    path: "/api/v1/scan/url",
    description: "Submit a URL for threat analysis",
    body: '{ "url": "https://example.com" }',
    response: '{ "scan_id": "abc-123", "status": "queued" }',
  },
  {
    method: "POST",
    path: "/api/v1/scan/file",
    description: "Upload a file for multi-engine scanning",
    body: "multipart/form-data — file field",
    response: '{ "scan_id": "def-456", "hash": { "md5": "...", "sha256": "..." } }',
  },
  {
    method: "GET",
    path: "/api/v1/scan/:id",
    description: "Retrieve scan results by ID",
    body: null,
    response: '{ "score": 87, "vendors": [...], "sigma_hits": [...] }',
  },
  {
    method: "GET",
    path: "/api/v1/sigma/rules",
    description: "List all active Sigma detection rules",
    body: null,
    response: '{ "rules": [...], "total": 1247 }',
  },
  {
    method: "GET",
    path: "/api/v1/sandbox/:id",
    description: "Fetch sandbox behavioral analysis results",
    body: null,
    response: '{ "registry": [...], "network": [...], "apis": [...] }',
  },
];

export default function ApiDocs() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="opacity-0 animate-fade-in-up">
        <h1 className="text-2xl font-bold tracking-tight">API Documentation</h1>
        <p className="text-muted-foreground text-sm mt-1">RESTful API for integrating ThreatScan AI into your security pipeline</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-5 opacity-0 animate-fade-in-up stagger-1">
        <p className="text-sm text-muted-foreground mb-2">Base URL</p>
        <code className="font-mono text-sm text-primary bg-muted/30 px-3 py-1.5 rounded">https://api.threatscan.ai/v1</code>
        <p className="text-xs text-muted-foreground mt-3">All requests require an API key via the <code className="font-mono text-primary">X-API-Key</code> header.</p>
      </div>

      <div className="grid gap-4">
        {endpoints.map((ep, i) => (
          <div
            key={ep.path}
            className={cn("bg-card border border-border rounded-lg p-5 opacity-0 animate-fade-in-up", i < 5 && `stagger-${i + 1}`)}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className={cn(
                "text-xs font-mono font-bold px-2 py-0.5 rounded",
                ep.method === "POST" ? "bg-primary/10 text-primary" : "bg-threat-safe/10 text-threat-safe"
              )}>
                {ep.method}
              </span>
              <code className="font-mono text-sm">{ep.path}</code>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{ep.description}</p>
            {ep.body && (
              <div className="mb-2">
                <p className="text-xs text-muted-foreground mb-1">Request Body</p>
                <pre className="bg-muted/30 rounded p-3 text-xs font-mono overflow-x-auto">{ep.body}</pre>
              </div>
            )}
            <div>
              <p className="text-xs text-muted-foreground mb-1">Response</p>
              <pre className="bg-muted/30 rounded p-3 text-xs font-mono overflow-x-auto">{ep.response}</pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
