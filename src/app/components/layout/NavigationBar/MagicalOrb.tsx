export const MagicalOrb = () => {
  return (
    <div 
      className="relative"
      data-testid="magical-orb-icon"
      role="img"
      aria-label="Magical orb icon"
    >
      <div className="w-8 h-8 bg-gradient-to-br from-violet-400 to-indigo-600 rounded-full shadow-lg shadow-violet-500/50 flex items-center justify-center">
        <div className="w-4 h-4 bg-gradient-to-br from-white to-violet-200 rounded-full opacity-80 animate-pulse"></div>
      </div>
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-70 animate-pulse"></div>
    </div>
  );
};
