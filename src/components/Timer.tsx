import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faRedo } from '@fortawesome/free-solid-svg-icons';

const Timer = () => {
  const modes = {
    pomodoro: 25 * 60, // 25 minutes
    shortBreak: 5 * 60, // 5 minutes
    longBreak: 15 * 60, // 15 minutes
  };

  const [time, setTime] = useState(modes.pomodoro);
  const [isRunning, setIsRunning] = useState(false);
  const [activeMode, setActiveMode] = useState<'pomodoro' | 'shortBreak' | 'longBreak'>('pomodoro');
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const startPauseHandler = () => {
    if (isRunning) {
      clearInterval(intervalId!);
    } else {
      const id = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
      setIntervalId(id);
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTime(modes[activeMode]);
    if (intervalId) clearInterval(intervalId);
    setIsRunning(false);
  };

  const switchMode = (mode: 'pomodoro' | 'shortBreak' | 'longBreak') => {
    setActiveMode(mode);
    setTime(modes[mode]);
    if (intervalId) clearInterval(intervalId);
    setIsRunning(false);
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-4 rounded-lg bg-gray-800 bg-opacity-50 text-white text-center w-64 mx-auto flex flex-col justify-center items-center space-y-6">
      {/* Tabs */}
      <div className="flex justify-around w-full text-sm font-semibold">
      <button
  onClick={() => switchMode('pomodoro')}
  className={`px-3 py-1 rounded-md ${activeMode === 'pomodoro' ? 'bg-purple-700 text-white' : 'text-white hover:bg-purple-700 hover:bg-opacity-30'}`}
>
  Pomodoro
</button>
<button
  onClick={() => switchMode('shortBreak')}
  className={`px-3 py-1 rounded-md ${activeMode === 'shortBreak' ? 'bg-purple-700 text-white' : 'text-white hover:bg-purple-700 hover:bg-opacity-30'}`}
>
  Short Break
</button>
<button
  onClick={() => switchMode('longBreak')}
  className={`px-3 py-1 rounded-md ${activeMode === 'longBreak' ? 'bg-purple-700 text-white' : 'text-white hover:bg-purple-700 hover:bg-opacity-30'}`}
>
  Long Break
</button>

      </div>

      {/* Timer */}
      <div className="text-5xl font-bold font-mono text-white">{formatTime(time)}</div>

      {/* Controls */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={startPauseHandler}
          className="p-3 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition duration-300 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={isRunning ? faPause : faPlay} className="text-lg" />
        </button>
        <button
          onClick={resetTimer}
          className="p-3 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition duration-300 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faRedo} className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default Timer;
