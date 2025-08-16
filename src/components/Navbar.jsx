import { useEffect, useState } from 'react';

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error('Error parsing user from localStorage:', err);
    }
  }, []);

  return (
    <div className="flex justify-end p-4">
      <div className="relative">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Hi {user?.name || 'User'} ▼
        </button>
        {/* Optional dropdown menu */}
        {/* <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg">
          <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">View Profile</a>
          <a href="/logout" className="block px-4 py-2 hover:bg-gray-100">Logout</a>
        </div> */}
      </div>
    </div>
  );
}

export default Navbar;
