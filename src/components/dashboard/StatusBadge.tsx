import React from 'react';
import { IconCheckCircle, IconXCircle, IconRefresh } from './icons';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = {
    Done:       { icon: <IconCheckCircle className="w-3.5 h-3.5" />, cls: "text-emerald-600 bg-emerald-50" },
    Processing: { icon: <IconRefresh    className="w-3.5 h-3.5 animate-spin" />, cls: "text-blue-500 bg-blue-50" },
    Failed:     { icon: <IconXCircle   className="w-3.5 h-3.5" />, cls: "text-red-500 bg-red-50" },
  };

  const { icon, cls } = config[status as keyof typeof config] ?? config.Done;

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}>
      {icon} {status}
    </span>
  );
};

export default StatusBadge;