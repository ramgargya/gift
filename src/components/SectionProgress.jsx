import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { sounds } from '../utils/audioHelper';

const PAGES = [
  { num: 1, name: 'Welcome', icon: '💌' },
  { num: 2, name: 'For You', icon: '🌸' },
  { num: 3, name: 'Game', icon: '🎮' },
  { num: 4, name: 'Wish', icon: '🎂' },
  { num: 5, name: 'Surprise', icon: '🎁' },
];

export default function SectionProgress({ currentPage, totalPages = 5, onPageChange }) {
  const handlePrev = () => {
    if (currentPage > 1) {
      sounds.playChime();
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      sounds.playChime();
      onPageChange(currentPage + 1);
    }
  };

  const handleSelectPage = (pageNum) => {
    if (pageNum !== currentPage) {
      sounds.playChime();
      onPageChange(pageNum);
    }
  };

  return (
    <nav
      aria-label="Birthday Page Navigation"
      className="fixed top-3 left-3 z-40 bg-white/90 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-pink-200 shadow-md flex items-center gap-1.5"
    >
      {/* Previous Page Button */}
      <button
        onClick={handlePrev}
        disabled={currentPage <= 1}
        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
          currentPage <= 1
            ? 'opacity-30 cursor-not-allowed text-pink-300'
            : 'text-pink-600 hover:bg-pink-100 active:scale-90 cursor-pointer'
        }`}
        aria-label="Previous Page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Page Dots / Icons */}
      <div className="flex items-center gap-1 px-1">
        {PAGES.map((page) => {
          const isActive = currentPage === page.num;
          return (
            <button
              key={page.num}
              onClick={() => handleSelectPage(page.num)}
              className={`flex items-center justify-center transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'w-7 h-7 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-sm scale-110'
                  : 'w-6 h-6 rounded-full text-pink-700/60 hover:bg-pink-100 hover:text-pink-900'
              }`}
              title={`Page ${page.num}: ${page.name}`}
            >
              <span className="text-xs">{page.icon}</span>
            </button>
          );
        })}
      </div>

      {/* Next Page Button */}
      <button
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
          currentPage >= totalPages
            ? 'opacity-30 cursor-not-allowed text-pink-300'
            : 'text-pink-600 hover:bg-pink-100 active:scale-90 cursor-pointer'
        }`}
        aria-label="Next Page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Page Counter Badge */}
      <div className="w-[1px] h-3.5 bg-pink-200 mx-0.5" />
      <span className="text-[11px] font-bold text-pink-600 px-1 font-script">
        {currentPage} / {totalPages}
      </span>
    </nav>
  );
}
