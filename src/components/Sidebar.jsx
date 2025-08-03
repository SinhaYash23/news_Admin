import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaNewspaper, FaFileAlt, FaPenNib, FaCog, FaSignOutAlt } from 'react-icons/fa';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
  { to: '/users', label: 'Users', icon: <FaUsers /> },
  { to: '/news', label: 'News', icon: <FaNewspaper /> },
  { to: '/articles', label: 'Articles', icon: <FaFileAlt /> },
  { to: '/blogs', label: 'Blogs', icon: <FaPenNib /> },
  { to: '/settings', label: 'Settings', icon: <FaCog /> },
  { to: '/logout', label: 'Logout', icon: <FaSignOutAlt /> },
];

export default function Sidebar() {
  return (
    <nav className="flex flex-col h-full p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Admin</h2>
      {navItems.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center px-4 py-2 rounded-lg transition-colors ${
              isActive
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`
          }
        >
          <span className="text-lg mr-3">{icon}</span>
          <span className="font-medium">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
