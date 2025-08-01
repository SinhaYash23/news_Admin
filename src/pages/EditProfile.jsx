// src/pages/EditProfile.jsx

import React, { useState } from "react";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    role: "Administrator",
  });

  const [avatarPreview, setAvatarPreview] = useState("https://i.pravatar.cc/150?img=47");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar" && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(files[0]);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    console.log("Updated Profile:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Edit Profile</h2>

        <div className="flex justify-center">
          <div className="relative group">
            <img
              src={avatarPreview}
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
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
            >
              <option>Administrator</option>
              <option>Editor</option>
              <option>Viewer</option>
            </select>
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
