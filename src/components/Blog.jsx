// src/features/news/NewsManagement.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

export default function Blog() {
  const navigate = useNavigate();

  const actions = [
    { label: "Add Blog", icon: "pi pi-plus", path: "/blog/add-blog" },
    { label: "View Blog", icon: "pi pi-user", path: "/blog/view-blog" },
    { label: "Edit Blog", icon: "pi pi-pencil", path: "/blog/edit-blog" }, 
    { label: "Publish Blog", icon: "pi pi-upload", path: "/blog/publish-blog" },
    { label: "Delete Blog", icon: "pi pi-clock", path: "/blog/delete-blog" },
  ];

  return (
    <div className="min-h-screen px-6 py-12 bg-gray-50">
      <div className="max-w-5xl mx-auto bg-white rounded shadow p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Blogs
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
