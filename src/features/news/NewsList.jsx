import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewsList = () => {
  const [newsList, setNewsList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch news data from API 
    fetch('https://your-api.com/api/news')
      .then(res => res.json())
      .then(data => setNewsList(data))
      .catch(err => console.error('Error fetching news:', err));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this news item?')) {
      try {
        await fetch(`https://your-api.com/api/news/${id}`, {
          method: 'DELETE',
        });
        setNewsList(prev => prev.filter(news => news.id !== id));
      } catch (error) {
        console.error('Error deleting news:', error);
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">News List</h2>
      <button
        onClick={() => navigate('/add-news')}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        + Add News
      </button>

      <div className="bg-white shadow-md rounded overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Category</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {newsList.map((news) => (
              <tr key={news.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{news.title}</td>
                <td className="py-2 px-4">{news.category}</td>
                <td className="py-2 px-4">{new Date(news.date).toLocaleDateString()}</td>
                <td className="py-2 px-4 text-center space-x-2">
                  <button
                    onClick={() => navigate(`/view-news/${news.id}`)}
                    className="text-blue-500 hover:underline"
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate(`/edit-news/${news.id}`)}
                    className="text-yellow-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(news.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => console.log('Publish logic here')}
                    className="text-green-500 hover:underline"
                  >
                    Publish
                  </button>
                </td>
              </tr>
            ))}
            {newsList.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-400">
                  No news found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewsList;
