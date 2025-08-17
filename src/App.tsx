
import { useParams } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
// Removed QueryClient/QueryClientProvider to resolve invalid hook error
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
import Index from "./pages/Index";
import { ProfilePage } from "./pages/ProfilePage";
import { SwapsPage } from "./pages/SwapsPage";
import { LoginPage } from "./pages/LoginPage";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AdvancedFeaturesPage } from "./pages/AdvancedFeaturesPage";
import NotFound from "./pages/NotFound";

// Removed queryClient and QueryClientProvider wrapper
const App = () => (
  <UserProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/profile/:userId" element={<ProfilePageWrapper />} />
        <Route path="/profile" element={<ProfilePage userId="" />} />
        <Route path="/swaps" element={<SwapsPage />} />
        <Route path="/advanced-features" element={<AdvancedFeaturesPage />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </UserProvider>
);

// Wrapper component to extract userId from URL params
const ProfilePageWrapper = () => {
  const { userId } = useParams<{ userId: string }>();
  return <ProfilePage userId={userId || ""} />;
};

export default App;

