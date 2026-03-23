import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FoodCat2 from "../assets/FoodCat2.jfif";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(form);
      const loggedInUser = data.user || data; 
      
      login(loggedInUser, data.token);

      if (loggedInUser.role === "restaurant") {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/feed", { replace: true });
      }
    } catch (err) {
      const backendErrorMessage = err.response?.data?.message || err.message;
      alert("Login failed: " + backendErrorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      
      <div className="bg-white rounded-3xl shadow-2xl flex w-full max-w-5xl overflow-hidden border border-gray-100 md:max-h-[85vh]">
        
        
        <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-center overflow-y-auto">
          <div className="mb-6 text-center md:text-left">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-500">Log in to FoodTalks to pick up where you left off.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <TextField
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              color="error"
              fullWidth
              required
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              color="error"
              fullWidth
              required
            />

            <Button
              type="submit"
              variant="contained"
              color="error"
              size="large"
              sx={{ borderRadius: "25px", padding: "12px", fontWeight: "bold", mt: 1 }}
              disableElevation
            >
              Log In
            </Button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account yet?{" "}
            <span 
              onClick={() => navigate("/signup")} 
              className="text-red-500 font-bold cursor-pointer hover:underline transition-all"
            >
              Sign Up
            </span>
          </p>
        </div>

        {/* Right Side - Image stays perfectly locked in height */}
        <div className="hidden md:block md:w-1/2 relative bg-black">
          <img
            src={FoodCat2}
            alt="Delicious Food"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-10">
            <h2 className="text-white text-3xl font-bold leading-tight">
              Ready for your <br /> next craving?
            </h2>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;