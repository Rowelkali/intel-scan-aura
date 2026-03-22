import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import { ScanProvider } from "@/contexts/ScanContext";
import Index from "./pages/Index";
import UrlScan from "./pages/UrlScan";
import FileScan from "./pages/FileScan";
import SandboxResults from "./pages/SandboxResults";
import SigmaRules from "./pages/SigmaRules";
import VendorResults from "./pages/VendorResults";
import ApiDocs from "./pages/ApiDocs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ScanProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/url-scan" element={<UrlScan />} />
              <Route path="/file-scan" element={<FileScan />} />
              <Route path="/sandbox" element={<SandboxResults />} />
              <Route path="/sigma-rules" element={<SigmaRules />} />
              <Route path="/vendors" element={<VendorResults />} />
              <Route path="/api-docs" element={<ApiDocs />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ScanProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
