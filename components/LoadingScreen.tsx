import React, { useState, useEffect } from 'react';

const loadingMessages = [
  "Initializing core modules...",
  "Establishing secure connection...",
  "Loading primary assets...",
  "Decompressing data streams...",
  "Rendering UI components...",
  "Finalizing setup...",
  "Almost there...",
];

interface LoadingScreenProps {
    onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(loadingMessages[0]);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsComplete(true), 500); // Wait 500ms at 100% before transitioning
          return 100;
        }
        return prev + 1;
      });
    }, 50); // 50ms * 100 steps = 5 seconds total load time

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Update the message based on the loading progress
    const messageIndex = Math.min(
        Math.floor((progress / 100) * loadingMessages.length),
        loadingMessages.length - 1
    );
    setCurrentMessage(loadingMessages[messageIndex]);
  }, [progress]);
  
  useEffect(() => {
    if (isComplete) {
      // Start the welcome message fade-in after a short delay
      setTimeout(() => setShowWelcome(true), 100);
      // After welcome animation is done, transition to the main app
      setTimeout(onLoadingComplete, 2000); // Show welcome for 2s
    }
  }, [isComplete, onLoadingComplete]);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-full bg-black overflow-hidden">
      {/* Animated background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vmin] h-[60vmin] bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/4 w-[50vmin] h-[50vmin] bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        {/* Loader Section */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${
            isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="text-8xl md:text-9xl font-bold text-neutral-100 tracking-tighter">
            {progress}
            <span className="text-4xl md:text-5xl align-super text-cyan-400">%</span>
          </div>
          <p className="text-neutral-400 mt-4 text-sm md:text-base tracking-widest uppercase">
            {currentMessage}
          </p>

          {/* Progress bar at the bottom */}
          <div className="absolute bottom-0 left-0 h-1 w-full bg-neutral-800">
              <div 
                  className="h-1 bg-cyan-400 shadow-[0_0_10px_theme(colors.cyan.400)]" 
                  style={{ 
                      width: `${progress}%`,
                      transition: 'width 40ms linear'
                  }}
              ></div>
          </div>
        </div>

        {/* Welcome Section */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${
            showWelcome ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-neutral-50 tracking-tight">Welcome.</h1>
            <p className="text-neutral-400 mt-4 text-lg md:text-xl">Kagiso Monene's Portfolio</p>
            <p className="text-neutral-500 mt-2 text-sm uppercase tracking-widest">Ready to explore</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
