import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  return (
    <div
      data-testid="loading-spinner"
      role="status"
      aria-label="Loading"
      className={`relative flex items-center justify-center ${sizeClasses[size]} ${className}`}
    >
      {/* Outer rotating ring with gradient */}
      <div
        data-testid="outer-ring"
        className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-spin bg-clip-border"
      >
        <div className="absolute inset-1 rounded-full bg-white dark:bg-gray-900"></div>
      </div>

      {/* Middle pulsing ring */}
      <div
        data-testid="middle-ring"
        className="absolute inset-2 rounded-full border-2 border-purple-400 animate-pulse opacity-60"
      ></div>

      {/* Inner rotating dots */}
      <div
        data-testid="inner-dots"
        className="absolute inset-0 animate-spin"
        style={{ animationDirection: 'reverse', animationDuration: '2s' }}
      >
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full"></div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
      </div>

      {/* Center magical sparkle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1 h-1 bg-white rounded-full animate-ping"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        <div
          className="absolute top-1 right-2 w-1 h-1 bg-purple-300 rounded-full animate-bounce opacity-70"
          style={{ animationDelay: '0s' }}
        ></div>
        <div
          className="absolute bottom-2 left-1 w-1 h-1 bg-pink-300 rounded-full animate-bounce opacity-70"
          style={{ animationDelay: '0.5s' }}
        ></div>
        <div
          className="absolute top-3 left-3 w-1 h-1 bg-blue-300 rounded-full animate-bounce opacity-70"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute bottom-1 right-1 w-1 h-1 bg-purple-300 rounded-full animate-bounce opacity-70"
          style={{ animationDelay: '1.5s' }}
        ></div>
      </div>

      {/* Additional magical sparkles */}
      <div className="absolute inset-0">
        <div
          className="absolute top-0 left-1/4 w-0.5 h-0.5 bg-yellow-200 rounded-full animate-ping opacity-60"
          style={{ animationDelay: '0.2s' }}
        ></div>
        <div
          className="absolute top-1/4 right-0 w-0.5 h-0.5 bg-cyan-200 rounded-full animate-ping opacity-60"
          style={{ animationDelay: '0.8s' }}
        ></div>
        <div
          className="absolute bottom-0 right-1/4 w-0.5 h-0.5 bg-rose-200 rounded-full animate-ping opacity-60"
          style={{ animationDelay: '1.2s' }}
        ></div>
        <div
          className="absolute bottom-1/4 left-0 w-0.5 h-0.5 bg-emerald-200 rounded-full animate-ping opacity-60"
          style={{ animationDelay: '1.6s' }}
        ></div>
      </div>

      {/* Twinkling stars */}
      <div className="absolute inset-0 animate-pulse">
        <div
          className="absolute top-2 left-2 text-yellow-300 text-xs opacity-50"
          style={{ animationDelay: '0s' }}
        >
          ✨
        </div>
        <div
          className="absolute top-4 right-4 text-purple-300 text-xs opacity-50"
          style={{ animationDelay: '1s' }}
        >
          ⭐
        </div>
        <div
          className="absolute bottom-3 left-4 text-pink-300 text-xs opacity-50"
          style={{ animationDelay: '2s' }}
        >
          ✦
        </div>
        <div
          className="absolute bottom-4 right-2 text-blue-300 text-xs opacity-50"
          style={{ animationDelay: '1.5s' }}
        >
          ✧
        </div>
      </div>

      {/* Magical waves */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 rounded-full border border-purple-200/30 animate-ping"
          style={{ animationDelay: '0s', animationDuration: '3s' }}
        ></div>
        <div
          className="absolute inset-2 rounded-full border border-pink-200/30 animate-ping"
          style={{ animationDelay: '1s', animationDuration: '3s' }}
        ></div>
        <div
          className="absolute inset-4 rounded-full border border-blue-200/30 animate-ping"
          style={{ animationDelay: '2s', animationDuration: '3s' }}
        ></div>
      </div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{
            animation: 'shimmer 2s ease-in-out infinite',
            transform: 'rotate(45deg)',
            width: '150%',
            height: '150%',
            left: '-25%',
            top: '-25%',
          }}
        ></div>
      </div>

      {/* Outer glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-sm animate-pulse"></div>

      {/* Extended magical aura */}
      <div
        className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-400/10 via-pink-400/10 to-blue-400/10 blur-lg animate-pulse"
        style={{ animationDuration: '4s' }}
      ></div>

      {/* Loading text with animated dots */}
      <div
        data-testid="loading-text"
        className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
      >
        <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">
          Retrieving cards
          <span className="inline-block w-3">
            <span
              className="animate-pulse opacity-0"
              style={{
                animation: 'fadeInOut 1.5s ease-in-out infinite',
                animationDelay: '0s',
              }}
            >
              .
            </span>
            <span
              className="animate-pulse opacity-0"
              style={{
                animation: 'fadeInOut 1.5s ease-in-out infinite',
                animationDelay: '0.5s',
              }}
            >
              .
            </span>
            <span
              className="animate-pulse opacity-0"
              style={{
                animation: 'fadeInOut 1.5s ease-in-out infinite',
                animationDelay: '1s',
              }}
            >
              .
            </span>
          </span>
        </span>
      </div>

      {/* Custom CSS for dot animation */}
      <style>{`
        @keyframes fadeInOut {
          0%,
          66% {
            opacity: 0;
          }
          33% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
