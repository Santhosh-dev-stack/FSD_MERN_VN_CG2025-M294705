const DashboardCard = ({ title, value, subtitle, color = 'blue' }) => {
  const colors = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    red: 'bg-red-100 text-red-700',
    purple: 'bg-purple-100 text-purple-700',
  };

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <div className={`inline-block px-3 py-1 rounded text-sm ${colors[color]}`}>{title}</div>
      <h3 className="text-3xl font-bold mt-3">{value}</h3>
      {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
    </div>
  );
};

export default DashboardCard;
