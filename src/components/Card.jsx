export default function StatCard({ title, value, icon, color = 'blue' }) {
  const baseColor = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    purple: 'text-purple-600 dark:text-purple-400',
    orange: 'text-orange-600 dark:text-orange-400',
  }[color] || 'text-blue-600 dark:text-blue-400';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-all p-6 flex flex-col items-center text-center">
      <div className={`text-4xl mb-4 ${baseColor}`}>{icon}</div>
      <h3 className="text-sm font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400">
        {title}
      </h3>
      <p className="text-3xl font-bold mt-1 text-gray-800 dark:text-white">{value}</p>
    </div>
  );
}
