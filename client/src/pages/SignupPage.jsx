import { useState } from "react";
import { signupUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FoodPanda from "../assets/FoodPanda.jfif";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
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
      const data = await signupUser(form);

      if (data && data.user && data.token) {
        login(data.user, data.token);
        
        if (form.role === "restaurant") {
          navigate("/dashboard", { replace: true });
        } else {
          navigate("/feed", { replace: true });
        }
      } else {
        alert("Signup successful! Please log in to continue.");
        navigate("/login", { replace: true });
      }
    } catch (err) {
      const backendErrorMessage = err.response?.data?.message || err.message;
      alert("Signup failed: " + backendErrorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
     
      <div className="bg-white rounded-3xl shadow-2xl flex w-full max-w-5xl overflow-hidden border border-gray-100 md:max-h-[85vh]">
        
        
        <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-center overflow-y-auto">
          <div className="mb-6 text-center md:text-left">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Bitezy.</h1>
            <p className="text-gray-500">Create an account to start ordering.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <TextField
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              color="error"
              fullWidth
              required
            />

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

            <FormControl className="mt-1">
              <FormLabel color="error" className="font-semibold text-gray-700">Account Type</FormLabel>
              <RadioGroup row name="role" value={form.role} onChange={handleChange}>
                <FormControlLabel value="customer" control={<Radio color="error" />} label="Hungry Customer" />
                <FormControlLabel value="restaurant" control={<Radio color="error" />} label="Restaurant Owner" />
              </RadioGroup>
            </FormControl>

            <Button 
              type="submit" 
              variant="contained" 
              color="error" 
              size="large"
              sx={{ borderRadius: "25px", padding: "12px", fontWeight: "bold", mt: 1 }}
              disableElevation
            >
              Sign Up
            </Button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <span 
              onClick={() => navigate("/login")} 
              className="text-red-500 font-bold cursor-pointer hover:underline transition-all"
            >
              Log In
            </span>
          </p>
        </div>

       
        <div className="hidden md:block md:w-1/2 relative bg-black">
          <img
            src={FoodPanda}
            alt="Delicious Food"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-10">
            <h2 className="text-white text-3xl font-bold leading-tight">
              Discover local flavors,<br />delivered to your door.
            </h2>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Signup;