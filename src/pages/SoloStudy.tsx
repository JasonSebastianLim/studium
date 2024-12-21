import React, { useState, useEffect } from 'react';
import Timer from '../components/Timer';
import GoalsInput from '../components/Goals';
import AudioControls from '../components/Audio';
import ReactPlayer from 'react-player';
import Link from 'next/link';
import BackgroundChooser from '../components/Background';

export default function SoloStudy() {
  const [backgroundImage, setBackgroundImage] = useState('/assets/GIF-anime.mp4'); // Default background
  const [previousBackground, setPreviousBackground] = useState<string | null>(null); // Track previous background
  const [isFading, setIsFading] = useState(false); // Control fading animation
  const [selectedBackgroundIndex, setSelectedBackgroundIndex] = useState(0); // Default selected index
  const [audioLink, setAudioLink] = useState('');
  const [isYouTube, setIsYouTube] = useState(false);

  // Available backgrounds with paths and thumbnails
  const availableBackgrounds = [
    { path: '/assets/GIF-anime.mp4', thumbnail: '/assets/thumbnail-1.jpeg' },
    { path: '/assets/GIF-anime-2.mp4', thumbnail: '/assets/thumbnail-2.jpeg' },
    { path: '/assets/GIF-anime-3.mp4', thumbnail: '/assets/thumbnail-3.jpeg' },
    { path: '/assets/background3.jpg', thumbnail: '/assets/thumbnail-4.jpeg' },
  ];

  const handleAudioChange = (link: string) => {
    if (link.includes('youtube') || link.includes('youtu.be')) {
      setAudioLink(link);
      setIsYouTube(true);
    } else if (link.includes('spotify')) {
      setAudioLink(link);
      setIsYouTube(false);
    }
  };

  const handleBackgroundChange = (imagePath: string) => {
    if (imagePath !== backgroundImage) {
      setIsFading(true);
      setPreviousBackground(backgroundImage); // Save the current background
      setTimeout(() => {
        setBackgroundImage(imagePath);
        setPreviousBackground(null); // Clear the previous background after transition
        setIsFading(false);
      }, 500); // Duration matches CSS transition
    }

    const index = availableBackgrounds.findIndex((bg) => bg.path === imagePath);
    setSelectedBackgroundIndex(index >= 0 ? index : 0); // Fallback to index 0 if not found
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full z-0 bg-cover bg-center">
        {previousBackground && (
          <div
            className={`w-full h-full absolute transition-opacity duration-500 ${
              isFading ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: previousBackground.endsWith('.mp4')
                ? undefined
                : `url(${previousBackground})`,
            }}
          >
            {previousBackground.endsWith('.mp4') && (
              <video
                src={previousBackground}
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
              ></video>
            )}
          </div>
        )}
        <div
          className={`w-full h-full absolute transition-opacity duration-500 ${
            isFading ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            backgroundImage: backgroundImage.endsWith('.mp4')
              ? undefined
              : `url(${backgroundImage})`,
          }}
        >
          {backgroundImage.endsWith('.mp4') && (
            <video
              src={backgroundImage}
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
            ></video>
          )}
        </div>
      </div>

      {/* Header */}
      <header className="flex justify-between items-center bg-white/10 backdrop-blur-md rounded-b-lg p-4 shadow-sm z-20 relative">
        <div className="flex items-center">
          <img src="/assets/Logo.png" alt="Logo" className="h-8 w-8" />
        </div>
        <nav className="flex space-x-6">
          <Link href="/" className="text-white font-semibold hover:text-purple-400 transition duration-300">
            Home
          </Link>
          <Link href="/Schedule" className="text-white font-semibold hover:text-purple-400 transition duration-300">
            Schedule
          </Link>
          <Link href="/SoloStudy" className="text-white font-semibold hover:text-purple-400 transition duration-300">
            Solo Study
          </Link>
          <Link href="/analytics" className="text-white font-semibold hover:text-purple-400 transition duration-300">
            Analytics
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10 p-6 flex justify-between space-x-6">
        {/* Left Column */}
        <div className="space-y-6 w-1/3">
          <Timer />
          <GoalsInput />
        </div>

        {/* Right Column */}
        <div className="space-y-6 w-1/3">
          <BackgroundChooser
            onBackgroundChange={handleBackgroundChange}
            selectedIndex={selectedBackgroundIndex} // Pass selected index
            backgrounds={availableBackgrounds} // Provide available backgrounds with paths and thumbnails
          />
          <AudioControls onAudioChange={handleAudioChange} />
        </div>
      </main>

      {/* Embedded Audio Player */}
      {audioLink && (
        <ReactPlayer
          url={audioLink}
          playing
          loop
          volume={0.5}
          style={{ display: 'none' }}
        />
      )}
    </div>
  );
}
