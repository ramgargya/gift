import React, { useState } from 'react';
import BackgroundDecorations from './components/BackgroundDecorations';
import MusicPlayer from './components/MusicPlayer';
import SectionProgress from './components/SectionProgress';
import Section1Hero from './components/Section1Hero';
import Section2Compliments from './components/Section2Compliments';
import Section3Game from './components/Section3Game';
import Section4CakeWish from './components/Section4CakeWish';
import Section5GiftBox from './components/Section5GiftBox';

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);

  // Switch to specific page
  const goToPage = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#fff0f5] via-[#fff5f8] to-[#ffeef5] text-[#4a2833] overflow-x-hidden selection:bg-pink-300 selection:text-rose-900">
      {/* Ambient background particles & tap hearts */}
      <BackgroundDecorations />

      {/* Persistent Top Nav: Page Progress & Music Player */}
      <SectionProgress
        currentPage={currentPage}
        totalPages={5}
        onPageChange={goToPage}
      />
      <MusicPlayer />

      {/* Distinct Page Display */}
      <main className="relative z-20 w-full flex flex-col items-center min-h-screen pb-6">
        {currentPage === 1 && (
          <Section1Hero onNext={() => goToPage(2)} />
        )}

        {currentPage === 2 && (
          <Section2Compliments onNext={() => goToPage(3)} />
        )}

        {currentPage === 3 && (
          <Section3Game onNext={() => goToPage(4)} />
        )}

        {currentPage === 4 && (
          <Section4CakeWish onNext={() => goToPage(5)} />
        )}

        {currentPage === 5 && (
          <Section5GiftBox onRestart={() => goToPage(1)} />
        )}
      </main>
    </div>
  );
}
