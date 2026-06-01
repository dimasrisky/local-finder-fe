import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconSearch } from '../components/dashboard/icons';
import NewScrapeBtn from '../components/dashboard/NewScrapeBtn';
import StatusBadge from '../components/dashboard/StatusBadge';
import { authUtils } from '../utils/auth';

interface Location {
  id: number;
  createdAt: string;
  name: string;
  searchQuery: string;
  totalItems: number;
  status: string;
}

interface LocationResponse {
  data: Location[];
  meta: {
    page: number;
    totalPage: number;
    totalData: number;
  };
}

const ScrapeDataPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [scrapes, setScrapes] = useState<Location[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState<{ page: number; totalPage: number; totalData: number }>({
    page: 1,
    totalPage: 1,
    totalData: 0
  });
  const limit = 10;

  useEffect(() => {
    (async () => {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/location?page=${currentPage}&limit=${limit}`,
          {
            headers: authUtils.getAuthHeaders()
          }
        )
        const result: LocationResponse = await response.json()
        setScrapes(result.data)
        setPaginationMeta(result.meta)
      })();
  }, [currentPage]);

  const filtered = scrapes.filter((s) =>
    s.searchQuery.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Scrape Data</h1>
          <p className="text-sm text-gray-400 mt-0.5">All your scraping jobs in one place.</p>
        </div>
        <NewScrapeBtn onClick={() => navigate('/dashboard/new')} />
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Search + count */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
          <div className="relative w-full max-w-xs">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 transition duration-150"
            />
          </div>
          <span className="text-xs text-gray-400 shrink-0 ml-4">{paginationMeta.totalData} jobs</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {["KEYWORD", "STATUS", "TOTAL DATA", "CREATED AT", ""].map((h) => (
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
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/60 transition duration-100">
                  <td className="px-5 py-3.5 text-gray-800 font-medium">{row.searchQuery}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={row.status} /></td>
                  <td className="px-5 py-3.5 text-gray-600">{row.totalItems}</td>
                  <td className="px-5 py-3.5 text-gray-400 text-xs whitespace-nowrap">{new Date(row.createdAt).toLocaleDateString()}</td>
                  <td className="px-5 py-3.5 text-right">
                    <button className="text-indigo-600 text-sm font-medium hover:underline focus:outline-none">
                      View detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="py-12 text-center text-sm text-gray-400">
              No results for "{search}"
            </div>
          )}
        </div>

        {/* Pagination */}
        {paginationMeta.totalPage >= 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
            <div className="text-xs text-gray-400">
              Page {paginationMeta.page} of {paginationMeta.totalPage}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={paginationMeta.page === 1}
                className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, paginationMeta.totalPage))}
                disabled={paginationMeta.page === paginationMeta.totalPage}
                className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScrapeDataPage;