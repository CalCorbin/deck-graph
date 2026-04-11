export const MagicalSparkles = () => {
  return (
    <div 
      className="flex space-x-1"
      data-testid="magical-sparkles"
      role="img"
      aria-label="Magical sparkles decoration"
    >
      <span className="text-violet-400 text-xs animate-pulse">✦</span>
      <span
        className="text-pink-400 text-xs animate-pulse"
        style={{ animationDelay: '0.5s' }}
      >
        ✧
      </span>
      <span
        className="text-indigo-400 text-xs animate-pulse"
        style={{ animationDelay: '1s' }}
      >
        ⋆
      </span>
    </div>
  );
};
