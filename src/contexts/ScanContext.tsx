import { createContext, useContext, useState, ReactNode } from "react";
import { mockVendorResults, mockSigmaRules, mockSandboxResults } from "@/lib/mock-data";

interface ScanData {
  vendorResults: typeof mockVendorResults | null;
  sigmaRules: typeof mockSigmaRules | null;
  sandboxResults: typeof mockSandboxResults | null;
  scannedTarget: string | null;
}

interface ScanContextType {
  scanData: ScanData;
  triggerScanResults: (target: string, isMalicious: boolean) => void;
  clearScanResults: () => void;
}

const ScanContext = createContext<ScanContextType | null>(null);

export function useScanContext() {
  const ctx = useContext(ScanContext);
  if (!ctx) throw new Error("useScanContext must be used within ScanProvider");
  return ctx;
}

export function ScanProvider({ children }: { children: ReactNode }) {
  const [scanData, setScanData] = useState<ScanData>({
    vendorResults: null,
    sigmaRules: null,
    sandboxResults: null,
    scannedTarget: null,
  });

  const triggerScanResults = (target: string, isMalicious: boolean) => {
    setScanData({
      scannedTarget: target,
      vendorResults: isMalicious
        ? mockVendorResults
        : mockVendorResults.map((v) => ({ ...v, detected: false, result: "Clean", category: "-" })),
      sigmaRules: isMalicious ? mockSigmaRules : [],
      sandboxResults: isMalicious ? mockSandboxResults : null,
    });
  };

  const clearScanResults = () => {
    setScanData({ vendorResults: null, sigmaRules: null, sandboxResults: null, scannedTarget: null });
  };

  return (
    <ScanContext.Provider value={{ scanData, triggerScanResults, clearScanResults }}>
      {children}
    </ScanContext.Provider>
  );
}
