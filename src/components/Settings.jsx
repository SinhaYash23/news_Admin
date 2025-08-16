import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function Settings() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("editProfile"); // "editProfile" or "changePassword"
  const [loading, setLoading] = useState(false);

  // Edit Profile State
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    avatar: "",
  });

  // Change Password State
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Load profile on mount
  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const res = await fetch("https://api.yashsinha.online/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to load profile");

        const data = await res.json();
        const user = data.data || data;

        setProfileData({
          name: user.name || "",
          email: user.email || "",
          avatar: user.avatar || "",
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch profile");
      }
    }
    fetchProfile();
  }, []);

  // Handlers
  function handleProfileChange(e) {
    setProfileData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handlePasswordChange(e) {
    setPasswordData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function submitProfile(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await fetch("https://api.yashsinha.online/api/auth/profile", {
        method: "PUT", // or PATCH per your API
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      if (!res.ok) throw new Error("Failed to update profile");
      await res.json();

      toast.success("Profile updated successfully");
      setModalOpen(false);
    } catch (err) {
      toast.error(err.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  }

  async function submitPassword(e) {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New password and confirmation do not match.");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await fetch("https://api.yashsinha.online/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to change password");
      }

      toast.success("Password changed successfully!");
      setModalOpen(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(err.message || "Error changing password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-6">
        <motion.div
          className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
            Settings
          </h2>

          <div className="flex flex-col space-y-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-8 rounded-lg shadow-lg transition"
              onClick={() => {
                setActiveTab("editProfile");
                setModalOpen(true);
              }}
            >
              Edit Profile
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-teal-500 hover:bg-teal-600 text-white py-3 px-8 rounded-lg shadow-lg transition"
              onClick={() => {
                setActiveTab("changePassword");
                setModalOpen(true);
              }}
            >
              Change Password
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !loading && setModalOpen(false)}
          >
            <motion.div
              className="bg-white rounded-lg p-6 w-full max-w-lg mx-4 relative"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Tabs */}
              <div className="flex border-b border-gray-300 mb-6">
                <button
                  className={`flex-1 py-2 font-semibold text-center transition ${
                    activeTab === "editProfile"
                      ? "border-b-4 border-indigo-600 text-indigo-700"
                      : "text-gray-600 hover:text-indigo-600"
                  }`}
                  onClick={() => setActiveTab("editProfile")}
                  disabled={loading}
                >
                  Edit Profile
                </button>
                <button
                  className={`flex-1 py-2 font-semibold text-center transition ${
                    activeTab === "changePassword"
                      ? "border-b-4 border-indigo-600 text-indigo-700"
                      : "text-gray-600 hover:text-indigo-600"
                  }`}
                  onClick={() => setActiveTab("changePassword")}
                  disabled={loading}
                >
                  Change Password
                </button>
              </div>

              {/* Edit Profile Form */}
              {activeTab === "editProfile" && (
                <form onSubmit={submitProfile} className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-gray-700 mb-1 font-medium"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      required
                      disabled={loading}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-gray-700 mb-1 font-medium"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      required
                      disabled={loading}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="avatar"
                      className="block text-gray-700 mb-1 font-medium"
                    >
                      Avatar URL
                    </label>
                    <input
                      id="avatar"
                      name="avatar"
                      type="url"
                      value={profileData.avatar}
                      onChange={handleProfileChange}
                      placeholder="https://example.com/avatar.jpg"
                      disabled={loading}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => !loading && setModalOpen(false)}
                      className="py-2 px-6 rounded border border-gray-400 hover:bg-gray-100 transition"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-indigo-600 text-white py-2 px-6 rounded hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              )}

              {/* Change Password Form */}
              {activeTab === "changePassword" && (
                <form onSubmit={submitPassword} className="space-y-5">
                  <div>
                    <label
                      htmlFor="currentPassword"
                      className="block text-gray-700 mb-1 font-medium"
                    >
                      Current Password
                    </label>
                    <input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                      disabled={loading}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="newPassword"
                      className="block text-gray-700 mb-1 font-medium"
                    >
                      New Password
                    </label>
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                      disabled={loading}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-gray-700 mb-1 font-medium"
                    >
                      Confirm New Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                      disabled={loading}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => !loading && setModalOpen(false)}
                      className="py-2 px-6 rounded border border-gray-400 hover:bg-gray-100 transition"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-indigo-600 text-white py-2 px-6 rounded hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
