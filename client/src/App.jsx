import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoute";
import Feed from "./pages/Feeds";
import Dashboard from "./pages/Dashboard";
function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>




     {/* // Customer Routes */}
  <Route
    path="/feed"
    element={
      <ProtectedRoutes role="customer">
        <Feed />
      </ProtectedRoutes>
    }
  />

  {/* Restaurant Routes */}
  <Route
    path="/dashboard"
    element={
      <ProtectedRoutes role="restaurant">
        <Dashboard />
      </ProtectedRoutes>
    }
  />


    </Routes>
    </BrowserRouter>
      
  )
}

export default App
