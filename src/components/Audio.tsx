import React, { useState, useEffect, useRef } from 'react';
import { FaVolumeUp, FaCloudRain, FaFire } from 'react-icons/fa';

interface AudioControlsProps {
  onAudioChange: (track: string) => void;
}

export default function AudioControls({ onAudioChange }: AudioControlsProps) {
  const [track, setTrack] = useState('');
  const [isPlayingLoFi, setIsPlayingLoFi] = useState(false);
  const [isPlayingRain, setIsPlayingRain] = useState(false);
  const [isPlayingBonfire, setIsPlayingBonfire] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [ambientRainVolume, setAmbientRainVolume] = useState(0.5);
  const [ambientBonfireVolume, setAmbientBonfireVolume] = useState(0.5);
  const [error, setError] = useState('');

  const loFiAudioRef = useRef<HTMLAudioElement | null>(null);
  const rainAudioRef = useRef<HTMLAudioElement | null>(null);
  const bonfireAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio objects
  useEffect(() => {
    loFiAudioRef.current = new Audio('/assets/lo-fi.mp3');
    rainAudioRef.current = new Audio('/assets/rain.mp3');
    bonfireAudioRef.current = new Audio('/assets/bonfire.mp3');
  }, []);

  // Update volume for active audio
  useEffect(() => {
    if (loFiAudioRef.current) loFiAudioRef.current.volume = volume;
    if (rainAudioRef.current) rainAudioRef.current.volume = ambientRainVolume;
    if (bonfireAudioRef.current) bonfireAudioRef.current.volume = ambientBonfireVolume;
  }, [volume, ambientRainVolume, ambientBonfireVolume]);

  // Handle Play/Pause for Lo-Fi Audio
  const handleLoFiToggle = () => {
    if (isPlayingLoFi) {
      loFiAudioRef.current?.pause();
      setIsPlayingLoFi(false);
    } else {
      loFiAudioRef.current?.play();
      setIsPlayingLoFi(true);
    }
  };

  // Handle Track Selection
  const handleTrackChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTrack = e.target.value;
    setTrack(selectedTrack);
    onAudioChange(selectedTrack);
    
    if (loFiAudioRef.current) {
      loFiAudioRef.current.src = selectedTrack;
      loFiAudioRef.current.play().catch(() => setError('Error playing the selected track.'));
      setIsPlayingLoFi(true);
    }
  };

  // Handle Ambient Sounds
  const toggleAmbientSound = (
    audioRef: React.RefObject<HTMLAudioElement | null>,
    isPlaying: boolean,
    setPlaying: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (isPlaying) {
      audioRef.current?.pause();
      setPlaying(false);
    } else {
      audioRef.current?.play();
      setPlaying(true);
    }
  };

  return (
    <div className="p-4 bg-gray-800 bg-opacity-50 text-white rounded space-y-4">
      <h2 className="text-xl mb-2">Audio Controls</h2>

      {/* Lo-Fi and Track Selection */}
      <div className="flex space-x-4">
        <button
          onClick={handleLoFiToggle}
          className={`px-4 py-2 rounded ${isPlayingLoFi ? 'bg-purple-600' : 'bg-gray-600'} hover:bg-purple-700`}
        >
          {isPlayingLoFi ? 'Pause Lo-Fi' : 'Play Lo-Fi'}
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {/* Track Dropdown */}
      <select
        value={track}
        onChange={handleTrackChange}
        className="p-2 w-full bg-gray-700 text-white rounded"
      >
        <option value="">Select a Lo-Fi Track</option>
        <option value="/assets/lo-fi.mp3">Lo-Fi Track 1</option>
        <option value="/assets/lo-fi-2.mp3">Lo-Fi Track 2</option>
        <option value="/assets/lo-fi-3.mp3">Lo-Fi Track 3</option>
      </select>

      {/* Volume Control */}
      <div className="flex items-center space-x-4">
        <FaVolumeUp size={24} />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Ambient Sounds */}
      <div>
        <h3 className="text-lg mb-2">Ambient Sounds</h3>
        <div className="flex items-center space-x-4">
          {/* Rain */}
          <button
            onClick={() => toggleAmbientSound(rainAudioRef, isPlayingRain, setIsPlayingRain)}
            className={`flex items-center px-4 py-2 rounded ${isPlayingRain ? 'bg-purple-600' : 'bg-gray-600'} hover:bg-blue-500`}
          >
            <FaCloudRain size={20} className="mr-2" /> Rain
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={ambientRainVolume}
            onChange={(e) => setAmbientRainVolume(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="flex items-center space-x-4 mt-2">
          {/* Bonfire */}
          <button
            onClick={() => toggleAmbientSound(bonfireAudioRef, isPlayingBonfire, setIsPlayingBonfire)}
            className={`flex items-center px-4 py-2 rounded ${isPlayingBonfire ? 'bg-purple-600' : 'bg-gray-600'} hover:bg-orange-500`}
          >
            <FaFire size={20} className="mr-2" /> Bonfire
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={ambientBonfireVolume}
            onChange={(e) => setAmbientBonfireVolume(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
