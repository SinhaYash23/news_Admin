import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";


export default function DashboardLayout({ children }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 h-screen bg-slate-900 text-white p-5">
      <h2 className="text-xl font-bold mb-6">Sidebar</h2>

      <nav className="space-y-2">
        {/* Main Links */}
        <NavLink to="/dashboard" className="block hover:bg-slate-700 px-3 py-2 rounded">
          Dashboard
        </NavLink>
        <NavLink to="/users" className="block hover:bg-slate-700 px-3 py-2 rounded">
          User
        </NavLink>
        <NavLink to="/articles" className="block hover:bg-slate-700 px-3 py-2 rounded">
          News Management
        </NavLink>
        <NavLink to="/blogs" className="block hover:bg-slate-700 px-3 py-2 rounded">
          Blog
        </NavLink>

        {/* Profile Dropdown */}
        <div>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-full flex items-center justify-between hover:bg-slate-700 px-3 py-2 rounded"
          >
            <span>Manage Profile</span>
            <FaChevronDown
              className={`transition-transform duration-200 ${
                isProfileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isProfileOpen && (
            <div className="ml-4 mt-2 space-y-1">
              <NavLink to="/view-profile" className="block hover:bg-slate-800 px-3 py-1 rounded">
                View Profile
              </NavLink>
              <NavLink to="/edit-profile" className="block hover:bg-slate-800 px-3 py-1 rounded">
                Edit Profile
              </NavLink>
              <NavLink to="/change-password" className="block hover:bg-slate-800 px-3 py-1 rounded">
                Change Password
              </NavLink>
            </div>
          )}
        </div>

        <NavLink to="/settings" className="block hover:bg-slate-700 px-3 py-2 rounded">
          Settings
        </NavLink>

        <NavLink to="/login" className='block hover:bg-slate-700 px-3 py-2 rounded'>
          Logout
        </NavLink>
      </nav>
    </aside>
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
}
