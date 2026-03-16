import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoute";
function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>




      {/* Customer Routes
  <Route
    path="/feed"
    element={
      <ProtectedRoute role="customer">
        <Feed />
      </ProtectedRoute>
    }
  /> */}

  {/* Restaurant Routes */}
  {/* <Route
    path="/dashboard"
    element={
      <ProtectedRoute role="restaurant">
        <Dashboard />
      </ProtectedRoute>
    }
  /> */}


    </Routes>
    </BrowserRouter>
      
  )
}

export default App
