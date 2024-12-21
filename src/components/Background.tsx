import React, { useState, useEffect } from 'react';

interface BackgroundChooserProps {
  onBackgroundChange: (imagePath: string) => void;
  selectedIndex: number;
  backgrounds: { path: string; thumbnail: string }[];
}

export default function BackgroundChooser({
  onBackgroundChange,
  selectedIndex,
  backgrounds,
}: BackgroundChooserProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  useEffect(() => {
    // Preload video files when the component mounts
    backgrounds.forEach((bg) => {
      if (bg.path.endsWith('.mp4')) {
        const video = document.createElement('video');
        video.src = bg.path;
        video.preload = 'auto';
      }
    });

    // Set the default background on initial render
    if (backgrounds[selectedIndex]) {
      onBackgroundChange(backgrounds[selectedIndex].path);
    }
  }, [backgrounds, selectedIndex, onBackgroundChange]);

  const handleBackgroundSelect = (index: number) => {
    onBackgroundChange(backgrounds[index].path);
  };

  return (
    <div className="p-4 bg-gray-800 bg-opacity-50 text-white rounded">
      <div className="flex space-x-4">
        {backgrounds.map((bg, index) => (
          <button
            key={index}
            onClick={() => handleBackgroundSelect(index)}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            className={`relative px-4 py-2 rounded overflow-hidden ${
              selectedIndex === index ? 'border-4 border-purple-500' : ''
            }`}
            style={{
              width: '100px',
              height: '100px',
            }}
          >
            {/* Show video when hovered */}
            {hoverIndex === index && bg.path.endsWith('.mp4') ? (
              <video
                src={bg.path}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              ></video>
            ) : (
              // Show thumbnail by default
              <img
                src={bg.thumbnail}
                alt={`Thumbnail ${index}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
