import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ScrapeDataPage from "./pages/ScrapeDataPage";
import NewScrapePage from "./pages/NewScrapePage";
import Navbar from "./components/dashboard/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Dashboard Layout wrapper with Outlet
const DashboardLayout = () => (
  <ProtectedRoute>
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Outlet />
    </div>
  </ProtectedRoute>
);

function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Dashboard routes with nested structure */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="scrape" element={<ScrapeDataPage />} />
          <Route path="new" element={<NewScrapePage />} />
        </Route>

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;