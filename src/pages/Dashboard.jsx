import { useQuery } from '@tanstack/react-query';
import { getDashboardStats } from '../api/dashboard';
import { FaUser, FaNewspaper, FaBlog, FaBook } from 'react-icons/fa';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {

  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: getDashboardStats,
  });

  if (isLoading) return <div className="p-4 text-xl">Loading dashboard...</div>;

  const stats = data;

  const viewProfile = [
    { title: 'HI User', bgColor: 'bg-blue-600', hoverColor: 'hover:bg-blue-700', icon: '', path:'/view-profile'},
  ]

  const changePassword = [
    { title: 'Change Password', bgColor: 'bg-blue-600', hoverColor: 'hover:bg-blue-700', icon: '', path:'/change-password'},
  ]

  const editProfile = [
    { title: 'Edit Profile', bgColor: 'bg-blue-600', hoverColor: 'hover:bg-blue-700', icon: '', path:'/edit-profile'},
  ]
  
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome Admin</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Users" value={stats.users} />
        <Card title="News" value={stats.news} />
        <Card title="Articles" value={stats.articles} />
        <Card title="Blogs" value={stats.blogs} />
      </div>
      
      {/* Fixed buttons container */}
      <div className="fixed bottom-6 right-6 flex flex-col z-50">
        {viewProfile.map(({ title, bgColor, hoverColor}) => (
          <button 
            onClick={()=> navigate('/view-profile')}
            key={title}
            className={`${hoverColor} text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2`}
            aria-label={title}
          >
            <span>{title}</span>
          </button>
        ))}
        {changePassword.map(({ title, bgColor, hoverColor}) => (
          <button 
            onClick={()=> navigate('/change-password')}
            key={title}
            className={`${hoverColor} text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`}
            aria-label={title}
          >
            <span>{title}</span>
          </button>
        ))}
        {editProfile.map(({ title, bgColor, hoverColor}) => (
          <button 
            onClick={()=> navigate('/edit-profile')}
            key={title}
            className={`${hoverColor} text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`}
            aria-label={title}
          >
            <span>{title}</span>
          </button>
        ))}
      </div>
    </div>
    
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white border rounded-lg shadow hover:shadow-lg transition duration-300 p-6 text-center">
      <div className="flex justify-center items-center text-blue-500 text-3xl mb-2">
        {icon}
      </div>
      <h2 className="text-gray-500 text-sm uppercase tracking-widest">{title}</h2>
      <p className="text-4xl font-bold text-blue-600 mt-2">{value}</p>
    </div>
  );
}