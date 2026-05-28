import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  iconBg: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, iconBg }) => (
  <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-500">{label}</span>
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBg}`}>
        {icon}
      </div>
    </div>
    <span className="text-3xl font-bold text-gray-900 tracking-tight">{value}</span>
  </div>
);

export default StatCard;