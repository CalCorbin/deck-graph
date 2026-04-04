import { MagicalOrb } from '@/app/components/layout/NavigationBar/MagicalOrb';
import { MagicalSparkles } from '@/app/components/layout/NavigationBar/MagicalSparkles';

export const NavigationBar = () => {
  return (
    <nav
      className="w-full bg-gradient-to-r from-indigo-900 via-purple-900 to-violet-900 border-b border-purple-700/50 shadow-lg shadow-purple-900/30"
      data-testid="navigation-bar"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-13">
          <div className="flex items-center space-x-3">
            <MagicalOrb />
            <h1
              className="text-2xl font-bold bg-gradient-to-r from-violet-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent tracking-wide"
              data-testid="app-title"
            >
              Commander Graph
            </h1>
            <MagicalSparkles />
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent opacity-50"
        data-testid="magical-glow-effect"
        role="presentation"
        aria-hidden="true"
      ></div>
    </nav>
  );
};
