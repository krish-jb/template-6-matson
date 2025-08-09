import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WeddingProvider } from "@/contexts/WeddingProvider.tsx";
import Gallery from "./pages/Gallery";
import Index from "./pages/Index";
import LoginRoute from "./pages/LoginRoute";
import NotFound from "./pages/NotFound";
import Wishes from "./pages/Wishes";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <WeddingProvider>
                <Sonner />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/gallery" element={<Gallery />} />
                        <Route path="/login" element={<LoginRoute />} />
                        <Route path="/wishes" element={<Wishes />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </WeddingProvider>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
