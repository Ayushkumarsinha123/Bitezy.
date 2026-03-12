import { useState } from "react";
import { signupUser } from "../services/authService";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FoodPanda from "../assets/FoodPanda.jfif"
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

function Signup() {
    const [form, setForm ] = useState({
      name : "",
      email: "",
      password: ""
    });

    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name] : e.target.value
      });
    };

    const handleSubmit = async(e) => {
      e.preventDefault();

      try{
        const data = await signupUser(form);
        console.log(data);
        alert("sinup successfull");
      }
      catch(err){
        console.log(err);
        alert("signup failed")
      }
    }
    return (
      <div className="min-h-screen flex item-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl flex w-full max-w-4xl overflow-hidden">
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-6 text-center">Signup</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  fullWidth
                />

                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  fullWidth
                />

                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  fullWidth
                />
          
          <Button type="submit" variant="contained" >
  SIGN UP
</Button>
        </form>
        </div>
        <div className="hidden md:block w-1/2 bg-gray-200">
        <img 
        src={FoodPanda}
        alt="food panda"
        className="w-full h-full object-cover"
        />
      </div>
      </div>
      </div>
    )
}

export default Signup;