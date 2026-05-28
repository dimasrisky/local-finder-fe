import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft, IconSparkle, IconRefresh } from '../components/dashboard/icons';

const NewScrapePage: React.FC = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStart = () => {
    if (!keyword.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/scrape');
    }, 1800);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-8 py-8">
      {/* Back */}
      <button
        onClick={() => navigate('/scrape')}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition duration-150 mb-6 focus:outline-none"
      >
        <IconArrowLeft className="w-4 h-4" /> Back to scrapes
      </button>

      {/* Card */}
      <div className="max-w-xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-600">
          <IconSparkle className="w-3.5 h-3.5" /> New scrape
        </div>

        {/* Heading */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            What are you looking for?
          </h2>
          <p className="text-sm text-gray-400">
            Type a business type + location. Be specific for better results.
          </p>
        </div>

        {/* Keyword input */}
        <div className="space-y-1.5">
          <label htmlFor="keyword" className="text-sm font-medium text-gray-700">
            Keyword
          </label>
          <input
            id="keyword"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleStart()}
            placeholder="coffeeshop"
            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition duration-200"
          />
          <p className="text-xs text-gray-400">3 of 3 remaining today</p>
        </div>

        {/* Daily limit bar */}
        <div className="border border-gray-100 rounded-xl px-4 py-3 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-800">Daily scrape limit</p>
              <p className="text-xs text-gray-400">0 of 3 used today</p>
            </div>
            <span className="text-sm font-semibold text-indigo-600">Available</span>
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full w-0 bg-indigo-500 rounded-full" />
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleStart}
          disabled={!keyword.trim() || loading}
          className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold tracking-wide transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <IconRefresh className="w-4 h-4 animate-spin" /> Scraping…
            </>
          ) : (
            "Start scraping"
          )}
        </button>
      </div>
    </div>
  );
};

export default NewScrapePage;