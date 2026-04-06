interface CollapsibleSectionProps {
  title: string;
  isActive: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export const CollapsibleSection = ({
  title,
  isActive,
  onToggle,
  children,
}: CollapsibleSectionProps) => {
  return (
    <div className="mb-6">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors border border-gray-600/30"
        data-testid={`collapsible-section-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <span className="font-medium text-white">{title}</span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${isActive ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isActive && (
        <div className="mt-3 p-4 bg-gray-800/30 rounded-lg border border-gray-600/20">
          {children}
        </div>
      )}
    </div>
  );
};
