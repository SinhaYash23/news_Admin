import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ViewUser() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Simulate fetch from API
  useEffect(() => {
    // Replace this with actual API call
    const mockUser = {
      id: userId,
      name: "Jane Doe",
      email: "jane@example.com",
      role: "Editor",
      createdAt: "2024-02-15",
    };
    setUser(mockUser);
  }, [userId]);

  if (!user) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">User Details</h2>

      <div className="space-y-4 text-gray-700">
        <div>
          <span className="font-medium">ID:</span> {user.id}
        </div>
        <div>
          <span className="font-medium">Name:</span> {user.name}
        </div>
        <div>
          <span className="font-medium">Email:</span> {user.email}
        </div>
        <div>
          <span className="font-medium">Role:</span> {user.role}
        </div>
        <div>
          <span className="font-medium">Created At:</span> {user.createdAt}
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={() => navigate("/users")}
          className="px-4 py-2 bg-gray-100 border rounded hover:bg-gray-200"
        >
          Back to List
        </button>
      </div>
    </div>
  );
}
