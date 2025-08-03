import React, { useEffect, useState } from "react";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    avatar: null,
  });
  const [avatarPreview, setAvatarPreview] = useState("");

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("https://api.yashsinha.online/api/auth/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();
        if (json.success) {
          const user = json.data.user;
          setFormData({
            name: user.name || "",
            email: user.email || "",
            role: user.role || "",
            avatar: null,
          });
          setAvatarPreview(user.profilePicture || "");
        } else {
          alert("Failed to fetch user profile");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "avatar" && files[0]) {
      const reader = new FileReader();
      reader.onload = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(files[0]);

      setFormData((prev) => ({ ...prev, avatar: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit updated data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const data = new FormData();
    data.append("name", formData.name);
    if (formData.avatar) data.append("avatar", formData.avatar);

    try {
      const response = await fetch("https://api.yashsinha.online/api/auth/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to update profile");

      alert("Profile updated successfully!");
      console.log("Updated Profile:", result);
    } catch (err) {
      console.error("Error:", err);
      alert("Profile update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Edit Profile</h2>

        <div className="flex justify-center">
          <div className="relative group">
            <img
              src={avatarPreview || "https://i.pravatar.cc/150?u=default"}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full border-4 border-teal-500 object-cover"
            />
            <label className="absolute bottom-0 right-0 bg-teal-600 text-white text-xs px-2 py-1 rounded cursor-pointer group-hover:opacity-100 opacity-0 transition">
              Change
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              disabled
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>

        <div className="flex justify-between items-center pt-4">
          <a href="/change-password" className="text-teal-600 text-sm hover:underline">
            Change Password
          </a>
          <button
            type="submit"
            className="bg-teal-600 text-white px-5 py-2 rounded hover:bg-teal-700 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
