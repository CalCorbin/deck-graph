interface RangeSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  unit?: string;
  onChange: (value: number) => void;
  testId?: string;
}

export const RangeSlider = ({
  label,
  value,
  min,
  max,
  unit = '',
  onChange,
  testId,
}: RangeSliderProps) => {
  const displayValue = unit ? `${value}${unit}` : value;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}: {displayValue}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider-thumb"
        data-testid={testId}
      />
    </div>
  );
};
