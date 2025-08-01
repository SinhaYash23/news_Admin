import { useState } from "react";
import axios from "../api/axios"; // or use full URL if not using baseURL

export default function VerifyOTPChangePassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !otp || !newPassword) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("https://api.yashsinha.online/api/auth/verify-otp", {
        email,
        otp,
        newPassword,
      });

      if (response.data.success) {
        alert("✅ Password changed successfully!");
        // Optionally redirect to login
      } else {
        alert(response.data.message || "❌ Failed to verify OTP");
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">
          Verify OTP & Change Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full p-2 border rounded mb-3"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full p-2 border rounded mb-3"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Submitting..." : "Change Password"}
        </button>
      </div>
    </div>
  );
}
