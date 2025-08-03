import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    try {
      const response = await fetch("https://api.yashsinha.online/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Login failed");
      }

      // Save token and user info to localStorage
      localStorage.setItem("token", result.data.accessToken);
      localStorage.setItem("user", JSON.stringify(result.data.user));

      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message || "Login failed");
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

        <p className="text-sm text-blue-600 mt-4 text-center cursor-pointer hover:underline"
           onClick={() => navigate("/forgot-password")}>
          Forgot Password
        </p>
      </div>
    </div>
  );
}
