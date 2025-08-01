// src/features/news/NewsManagement.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

export default function NewsManagement() {
  const navigate = useNavigate();

  const actions = [
    { label: "Add News", icon: "pi pi-plus", path: "/add-news" },
    { label: "View Profile", icon: "pi pi-user", path: "/view-profile" },
    { label: "Edit News", icon: "pi pi-pencil", path: "/edit-news" }, 
    { label: "Publish News", icon: "pi pi-upload", path: "/news/publish-news" },
    { label: "Latest News", icon: "pi pi-clock", path: "/news/latest-news" },
    { label: "Delete News", icon: "pi pi-clock", path: "/news/delete-news" },
  ];

  return (
    <div className="min-h-screen px-6 py-12 bg-gray-50">
      <div className="max-w-5xl mx-auto bg-white rounded shadow p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          News Management Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {actions.map((action, index) => (
            <Button
              key={index}
              label={action.label}
              icon={action.icon}
              onClick={() => navigate(action.path)}
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
