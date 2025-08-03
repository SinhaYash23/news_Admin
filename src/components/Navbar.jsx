import { useState } from 'react';
import React from 'react';
import { FaChevronDown } from 'react-icons/fa';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-xl font-semibold">Welcome Admin</h1>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setDarkMode(prev => !prev)}
          className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>

        <div className="relative">
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <span>Hi User</span>
            <FaChevronDown className={`${menuOpen ? 'rotate-180' : ''} transition-transform`} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg divide-y divide-gray-200 dark:divide-gray-700">
              <NavLink
                to="/view-profile"
                className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >View Profile</NavLink>
              <NavLink
                to="/edit-profile"
                className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >Edit Profile</NavLink>
              <NavLink
                to="/change-password"
                className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >Change Password</NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
