// src/components/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();
  const navItem = (to, label) => (
    <Link
      to={to}
      className={`block px-6 py-3 hover:bg-blue-200 rounded ${
        pathname === to ? "bg-blue-500 text-white" : "text-gray-800"
      }`}
    >
      {label}
    </Link>
  );  

  return (
    <aside className="w-64 bg-white shadow h-full fixed z-10">
      <div className="p-6 font-bold text-xl text-blue-600">Admin Panel</div>
      <nav className="flex flex-col gap-1">
        {navItem("/dashboard", "Dashboard")}
        {navItem("/articles", "Articles")}
        {navItem("/blogs", "Blogs")}
        {navItem("/users", "Users")}
      </nav>
    </aside>
  );
}
