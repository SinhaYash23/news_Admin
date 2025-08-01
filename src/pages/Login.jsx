import 'primereact/resources/themes/lara-light-blue/theme.css';  // theme
import 'primereact/resources/primereact.min.css';                // core
import 'primeicons/primeicons.css';                              // icons
import axios from '../api/axios';

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async ()=> {
    try{
      const response = await axios.post("https://api.yashsinha.online/api/auth/login",{
        email:credentials.email,
        password:credentials.password,
      });
      if (response.data.success) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }else{
        alert(response.data.message || "Login Failed");
      }
    }catch(error){
      console.error("Login Error: ", error);
      alert(error.response?.data?.message || "Something Went Wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Admin Login</h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 border border-gray-300 rounded"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-2 border border-gray-300 rounded"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
        </div>
        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className='text-sm text-blue-600 mt-4 text-center cursor-pointer hover:underline' onClick={()=>navigate('/forgot-password')}>Forgot Password</p>
        
      </div>
    </div>
  );
}
