import {
  getUsersCount,
  getNewsCount,
  getArticlesCount,
  getBlogsCount,
} from '../api/dashboard';

import { useQuery } from '@tanstack/react-query';
import { FaUsers, FaNewspaper, FaFileAlt, FaPenNib } from 'react-icons/fa';

function StatCard({ title, value, icon, color }) {
  const colorClasses = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    purple: 'text-purple-600 dark:text-purple-400',
    orange: 'text-orange-600 dark:text-orange-400',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg p-6 text-center">
      <div className={`text-4xl mb-3 ${colorClasses[color]}`}>{icon}</div>
      <div className="text-sm uppercase text-gray-500 dark:text-gray-400 font-semibold">
        {title}
      </div>
      <div className="text-3xl font-bold text-gray-800 dark:text-white">{value}</div>
    </div>
  );
}

export default function Dashboard() {
  const usersQuery = useQuery({ queryKey: ['users'], queryFn: getUsersCount });
  const newsQuery = useQuery({ queryKey: ['news'], queryFn: getNewsCount });
  const articlesQuery = useQuery({ queryKey: ['articles'], queryFn: getArticlesCount });
  const blogsQuery = useQuery({ queryKey: ['blogs'], queryFn: getBlogsCount });

  if (usersQuery.isLoading || newsQuery.isLoading || articlesQuery.isLoading || blogsQuery.isLoading) {
    return <div className="text-center text-blue-600 mt-10">Loading...</div>;
  }

  if (usersQuery.isError || newsQuery.isError || articlesQuery.isError || blogsQuery.isError) {
    return <div className="text-center text-red-600 mt-10">Error loading data.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Users" value={usersQuery.data} icon={<FaUsers />} color="blue" />
        <StatCard title="News" value={newsQuery.data} icon={<FaNewspaper />} color="green" />
        <StatCard title="Articles" value={articlesQuery.data} icon={<FaFileAlt />} color="purple" />
        <StatCard title="Blogs" value={blogsQuery.data} icon={<FaPenNib />} color="orange" />
      </div>
    </div>
  );
}
