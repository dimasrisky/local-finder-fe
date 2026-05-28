import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ScrapeDataPage from "./pages/ScrapeDataPage";
import NewScrapePage from "./pages/NewScrapePage";
import Navbar from "./components/dashboard/Navbar";

// Dashboard Layout wrapper
const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gray-50">
    <Navbar />
    {children}
  </div>
);

function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Dashboard routes */}
        <Route path="/dashboard" element={
          <DashboardLayout>
            <DashboardPage />
          </DashboardLayout>
        } />

        <Route path="/scrape" element={
          <DashboardLayout>
            <ScrapeDataPage />
          </DashboardLayout>
        } />

        <Route path="/scrape/new" element={
          <DashboardLayout>
            <NewScrapePage />
          </DashboardLayout>
        } />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;