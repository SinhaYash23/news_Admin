import React from 'react';

export default function Card({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300">
      <h2 className="text-lg font-medium text-gray-700">{title}</h2>
      <p className="mt-2 text-3xl font-bold text-blue-600">{value}</p>
    </div>
  );
}
