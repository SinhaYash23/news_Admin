import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function ViewProfile() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', avatar: '' });
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchProfile() {
      try {
        if (!token) throw new Error('No token found');
        const res = await fetch('https://api.yashsinha.online/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to load profile');
        const json = await res.json();
        const data = json.data || json;
        setUser(data);
        setFormData({
          name: data.name || '',
          email: data.email || '',
          avatar: data.avatar || '',
        });
        toast.success('Profile loaded successfully');
      } catch (err) {
        console.error(err);
        toast.error('Error fetching profile');
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [token]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch('https://api.yashsinha.online/api/auth/profile', {
        method: 'PUT',  // or PATCH if required
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to update profile');
      const json = await res.json();
      const updated = json.data || json;
      setUser(updated);
      toast.success('Profile updated successfully');
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update profile');
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const avatarPreview = formData.avatar?.trim() || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}`;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-blue-600 text-xl animate-pulse">Loading profile…</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        No profile data available.
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50 p-6">
      <motion.div
        className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.img
          src={user.avatar || avatarPreview}
          alt="Avatar"
          className="w-32 h-32 mx-auto rounded-full mb-4 border-4 border-indigo-200 shadow-md"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          onError={e => {
            e.target.src = avatarPreview;
          }}
        />
        <h2 className="text-center text-2xl font-bold text-indigo-600 mb-1">{user.name}</h2>
        <p className="text-center text-gray-600 mb-6">{user.email}</p>
        <div className="space-y-2 text-gray-700 text-sm text-left mb-6">
          <div>
            <span className="font-semibold">Full Name:</span> {user.name}
          </div>
          {user.username && (
            <div>
              <span className="font-semibold">Username:</span> {user.username}
            </div>
          )}
          <div>
            <span className="font-semibold">Role:</span> {user.role || 'User'}
          </div>
          <div>
            <span className="font-semibold">Joined:</span>{' '}
            {new Date(user.createdAt || user.joinedAt).toLocaleDateString()}
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 rounded-lg"
            onClick={() => setModalOpen(true)}
          >
            Edit Profile
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-6 rounded-lg"
            onClick={() => (window.location.assign('/settings'))}
          >
            Change Password
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              className="bg-white rounded-lg p-6 w-full max-w-lg"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4 text-indigo-700">Edit Profile</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center space-x-6 mb-4">
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    className="w-16 h-16 rounded-full border-2 border-indigo-400 shadow"
                    onError={e => { e.target.src = avatarPreview; }}
                  />
                  <div className="flex-1">
                    <label className="block text-gray-700 font-medium mb-1">Avatar URL</label>
                    <input
                      type="url"
                      name="avatar"
                      value={formData.avatar}
                      onChange={handleChange}
                      placeholder="https://example.com/avatar.jpg"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                    <p className="text-xs text-gray-500">Paste your avatar image URL here</p>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-1 font-medium">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="py-2 px-5 rounded border border-gray-400 hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded transition"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
