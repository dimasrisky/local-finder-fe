import React from 'react';
import { IconPlus } from './icons';

interface NewScrapeBtnProps {
  onClick: () => void;
}

const NewScrapeBtn: React.FC<NewScrapeBtnProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
  >
    <IconPlus className="w-4 h-4" /> New scrape
  </button>
);

export default NewScrapeBtn;