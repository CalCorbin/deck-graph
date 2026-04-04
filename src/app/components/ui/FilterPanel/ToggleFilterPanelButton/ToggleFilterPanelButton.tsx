export interface ToggleFilterPanelButtonProps {
  onToggle: () => void;
  isVisible: boolean;
}

export const ToggleFilterPanelButton = ({
  onToggle,
  isVisible,
}: ToggleFilterPanelButtonProps) => {
  return (
    <button
      onClick={onToggle}
      className={`fixed top-20 left-4 z-50 p-3 rounded-lg backdrop-blur-md border transition-all duration-300 ${
        isVisible
          ? 'bg-gray-900/90 border-purple-500/50 text-purple-300'
          : 'bg-gray-800/80 border-gray-600/50 text-gray-300 hover:bg-gray-700/90'
      }`}
      data-testid="toggle-filter-panel-button"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        data-testid="toggle-icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
        />
      </svg>
    </button>
  );
};
