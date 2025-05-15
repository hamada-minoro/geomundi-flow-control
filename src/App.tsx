
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProcessosPage from "./pages/ProcessosPage";
import NovoProcessoPage from "./pages/NovoProcaessoPage";
import DetalheProcessoPage from "./pages/DetalheProcessoPage";
import PerfilPage from "./pages/PerfilPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/processos" element={<ProcessosPage />} />
          <Route path="/processos/novo" element={<NovoProcessoPage />} />
          <Route path="/processos/:id" element={<DetalheProcessoPage />} />
          <Route path="/perfil" element={<PerfilPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
