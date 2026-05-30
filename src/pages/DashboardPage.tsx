import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconTable, IconTrend, IconSearch } from '../components/dashboard/icons';
import StatCard from '../components/dashboard/StatCard';
import NewScrapeBtn from '../components/dashboard/NewScrapeBtn';
import StatusBadge from '../components/dashboard/StatusBadge';
import { ALL_SCRAPES } from '../data/mockScrapes';
import { authUtils } from '../utils/auth';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const recent = ALL_SCRAPES.slice(0, 5);
  const [stats, setStats] = useState<{ totalLocations: number, totalLocationItems: number, currentRequest: number }>()
  const [userData] = useState<{ fullName?: string; username?: string; email?: string, currentRequest?: number } | null>(authUtils.getUserData());

  const currentUsage = userData?.currentRequest || 0;
  const maxLimit = 3;
  const remainingRequests = maxLimit - currentUsage;
  const usagePercentage = Math.min((currentUsage / maxLimit) * 100, 100);

  useEffect(() => {
    (async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/stats`, {
          headers: authUtils.getAuthHeaders()
        })
        const { data } = await response.json()
        setStats(data)
      })();
  }, [])

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-400 mt-0.5">Quick overview of your scraping activity.</p>
        </div>
        <NewScrapeBtn onClick={() => navigate('/dashboard/new')} />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Total scrapes"
          value={stats?.totalLocations.toString() || "0"}
          iconBg="bg-blue-50"
          icon={<IconTable className="w-4 h-4 text-blue-500" />}
        />
        <StatCard
          label="Data collected"
          value={stats?.totalLocationItems.toString() || "0"}
          iconBg="bg-emerald-50"
          icon={<IconTrend className="w-4 h-4 text-emerald-500" />}
        />
        <StatCard
          label="Remaining today"
          value={`${remainingRequests} / ${maxLimit}`}
          iconBg="bg-amber-50"
          icon={<IconSearch className="w-4 h-4 text-amber-500" />}
        />
      </div>

      {/* Daily scrape limit bar */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-sm font-medium text-gray-800">Daily scrape limit</p>
            <p className="text-xs text-gray-400 mt-0.5">{currentUsage} of {maxLimit} used today</p>
          </div>
          <span className="text-sm font-semibold text-indigo-600">
            {remainingRequests > 0 ? 'Available' : 'Limit reached'}
          </span>
        </div>
        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
          <div className={`h-full w-[${usagePercentage}%] bg-indigo-500 rounded-full transition-all duration-300`} />
        </div>
      </div>

      {/* Recent scrapes table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Recent scrapes</h2>
          <button
            onClick={() => navigate('/dashboard/scrape')}
            className="text-sm text-indigo-600 font-medium hover:underline focus:outline-none"
          >
            View all
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {["KEYWORD", "STATUS", "TOTAL DATA", "DATE", ""].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recent.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/60 transition duration-100">
                  <td className="px-5 py-3.5 text-gray-800 font-medium">{row.keyword}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={row.status} /></td>
                  <td className="px-5 py-3.5 text-gray-600">{row.totalData}</td>
                  <td className="px-5 py-3.5 text-gray-400 text-xs whitespace-nowrap">{row.date}</td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => navigate('/dashboard/scrape')}
                      className="text-indigo-600 text-sm font-medium hover:underline focus:outline-none"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;