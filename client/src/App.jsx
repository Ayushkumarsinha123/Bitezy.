import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoute";
import Feed from "./pages/Feeds";
import Dashboard from "./pages/Dashboard";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import LandingPage from "./pages/LandingPage";
import Search from "./components/reels/Search";
import Layout from "./components/Layout";
import { CartProvider } from "./context/CartContext";
function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<LandingPage />} />

          <Route element={<Layout />}>
            {/* // Customer Routes */}
            <Route
              path="/feed"
              element={
                <ProtectedRoutes role="customer">
                  <Feed />
                </ProtectedRoutes>
              }
            />
            <Route path="/search" element={<Search />} />

            <Route path="/success" element={<ProtectedRoutes role="customer"><CheckoutSuccess /></ProtectedRoutes>} />
            {/* Restaurant Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoutes role="restaurant">
                  <Dashboard />
                </ProtectedRoutes>
              }
            />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;


