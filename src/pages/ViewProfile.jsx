import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";  

export default function ViewProfile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("https://api.yashsinha.online/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data.user); 
      } catch (error) {
        console.error("Failed to load profile", error);
        alert("Failed to load profile. Please login again.");
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!user) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-6 space-y-6">
        <div className="flex flex-col items-center text-center">
          <img
            src={user.avatar || "https://i.pravatar.cc/150?img=47"}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-teal-500 shadow-md"
          />
          <h2 className="mt-4 text-xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-gray-500">{user.role}</p>
        </div>

        <div className="text-sm text-gray-700 space-y-2">
          <p><span className="font-semibold">Email:</span> {user.email}</p>
          <p><span className="font-semibold">Joined:</span> {user.joined || "N/A"}</p>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate("/edit-profile")}
            className="px-4 py-2 text-white bg-teal-500 rounded"
          >
            Edit Profile
          </button>
          <button
            onClick={() => navigate("/change-password")}
            className="px-4 py-2 text-teal-500 border border-teal-500 rounded"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
