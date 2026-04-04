interface ToggleButtonProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  testId?: string;
}

export const ToggleButton = ({
  label,
  checked,
  onChange,
  testId,
}: ToggleButtonProps) => {
  return (
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium text-gray-300">{label}</label>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          checked ? 'bg-purple-600' : 'bg-gray-600'
        }`}
        data-testid={testId}
      >
        <div
          className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};
