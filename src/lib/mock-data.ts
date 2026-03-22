export const mockVendorResults = [
  { vendor: "CrowdStrike Falcon", result: "Trojan.GenericKD", category: "Trojan", detected: true },
  { vendor: "SentinelOne", result: "Malware.Generic", category: "Malware", detected: true },
  { vendor: "Bitdefender", result: "Gen:Variant.Zusy", category: "Trojan", detected: true },
  { vendor: "Kaspersky", result: "HEUR:Trojan.Win32", category: "Trojan", detected: true },
  { vendor: "Sophos", result: "Mal/Generic-S", category: "Malware", detected: true },
  { vendor: "ESET-NOD32", result: "Win32/TrojanDownloader", category: "Trojan", detected: true },
  { vendor: "Avast", result: "Win32:Malware-gen", category: "Malware", detected: true },
  { vendor: "McAfee", result: "Artemis!38AF", category: "Trojan", detected: true },
  { vendor: "Malwarebytes", result: "Clean", category: "-", detected: false },
  { vendor: "Panda", result: "Clean", category: "-", detected: false },
  { vendor: "Fortinet", result: "W32/GenKryptik", category: "Trojan", detected: true },
  { vendor: "Symantec", result: "Trojan.Gen.2", category: "Trojan", detected: true },
  { vendor: "Trend Micro", result: "Clean", category: "-", detected: false },
  { vendor: "F-Secure", result: "Trojan.TR/Crypt", category: "Trojan", detected: true },
  { vendor: "Avira", result: "TR/Crypt.XPACK.Gen", category: "Trojan", detected: true },
  { vendor: "DrWeb", result: "Clean", category: "-", detected: false },
  { vendor: "Comodo", result: "TrojWare.Win32", category: "Trojan", detected: true },
  { vendor: "ZoneAlarm", result: "HEUR:Trojan.Win32", category: "Trojan", detected: true },
  { vendor: "Cybereason", result: "Clean", category: "-", detected: false },
  { vendor: "Microsoft", result: "Trojan:Win32/Wacatac", category: "Trojan", detected: true },
];

export const mockSigmaRules = [
  {
    id: "sigma-001",
    title: "Suspicious PowerShell Download Cradle",
    author: "Florian Roth",
    created: "2024-08-12",
    category: "Process Creation",
    confidence: "High",
    description: "Detects PowerShell commands commonly used to download and execute payloads from external URLs.",
    status: "active",
  },
  {
    id: "sigma-002",
    title: "Registry Run Key Persistence",
    author: "Roberto Rodriguez",
    created: "2024-09-03",
    category: "Registry Event",
    confidence: "High",
    description: "Detects modifications to Run/RunOnce registry keys commonly used for persistence.",
    status: "active",
  },
  {
    id: "sigma-003",
    title: "LSASS Memory Dump via comsvcs.dll",
    author: "Samir Bousseaden",
    created: "2024-07-20",
    category: "Process Creation",
    confidence: "Critical",
    description: "Detects credential dumping from LSASS memory using comsvcs.dll MiniDump export.",
    status: "active",
  },
  {
    id: "sigma-004",
    title: "Encoded Command Line Arguments",
    author: "Florian Roth",
    created: "2024-10-01",
    category: "Process Creation",
    confidence: "Medium",
    description: "Detects base64-encoded command line arguments used to obfuscate malicious commands.",
    status: "review",
  },
  {
    id: "sigma-005",
    title: "Suspicious DNS TXT Record Query",
    author: "Markus Neis",
    created: "2024-11-15",
    category: "DNS",
    confidence: "Medium",
    description: "Detects DNS TXT record queries that may indicate C2 communication or data exfiltration.",
    status: "active",
  },
];

export const mockSandboxResults = {
  registryModifications: [
    { key: "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\\svchost", action: "Created", value: "C:\\Users\\Public\\svchost.exe" },
    { key: "HKLM\\SYSTEM\\CurrentControlSet\\Services\\MalSvc", action: "Created", value: "Auto-start service" },
  ],
  networkConnections: [
    { destination: "185.220.101.34:443", protocol: "HTTPS", purpose: "C2 Communication", country: "Russia" },
    { destination: "91.134.82.12:8080", protocol: "HTTP", purpose: "Payload Download", country: "France" },
    { destination: "api.telegram.org:443", protocol: "HTTPS", purpose: "Data Exfiltration", country: "UK" },
  ],
  suspiciousApis: [
    { api: "VirtualAllocEx", count: 14, risk: "High" },
    { api: "WriteProcessMemory", count: 8, risk: "Critical" },
    { api: "CreateRemoteThread", count: 3, risk: "Critical" },
    { api: "NtUnmapViewOfSection", count: 1, risk: "High" },
  ],
  processInjections: [
    { source: "malware.exe (PID: 4821)", target: "explorer.exe (PID: 1204)", technique: "Process Hollowing" },
    { source: "malware.exe (PID: 4821)", target: "svchost.exe (PID: 892)", technique: "DLL Injection" },
  ],
};

export const mockDashboardStats = {
  totalScans: 847293,
  maliciousDetected: 23847,
  urlsScanned: 512084,
  filesScanned: 335209,
  activeRules: 1247,
  vendorsOnline: 20,
};

export const recentScans = [
  { id: "s-001", type: "URL", target: "hxxp://malware-delivery[.]xyz/payload.exe", score: 92, time: "2 min ago" },
  { id: "s-002", type: "File", target: "invoice_march_2024.pdf.exe", score: 87, time: "5 min ago" },
  { id: "s-003", type: "URL", target: "https://google.com", score: 3, time: "8 min ago" },
  { id: "s-004", type: "File", target: "quarterly_report.docx", score: 12, time: "12 min ago" },
  { id: "s-005", type: "URL", target: "hxxp://phishing-login[.]com/bank", score: 78, time: "15 min ago" },
  { id: "s-006", type: "File", target: "setup_crack_v2.exe", score: 95, time: "18 min ago" },
];
