import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RangeSlider } from './RangeSlider';

describe('RangeSlider', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with label and current value', () => {
    render(
      <RangeSlider
        label="Test Slider"
        value={50}
        min={0}
        max={100}
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText('Test Slider: 50')).toBeInTheDocument();
    expect(screen.getByRole('slider')).toHaveValue('50');
  });

  it('renders with unit when provided', () => {
    render(
      <RangeSlider
        label="Size"
        value={25}
        min={0}
        max={100}
        unit="px"
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText('Size: 25px')).toBeInTheDocument();
  });

  it('calls onChange with correct value when slider changes', () => {
    render(
      <RangeSlider
        label="Test Slider"
        value={50}
        min={0}
        max={100}
        onChange={mockOnChange}
      />
    );

    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '75' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(75);
  });

  it('applies min and max values correctly', () => {
    render(
      <RangeSlider
        label="Test Slider"
        value={0}
        min={-100}
        max={200}
        onChange={mockOnChange}
      />
    );

    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('min', '-100');
    expect(slider).toHaveAttribute('max', '200');
  });

  it('applies testId when provided', () => {
    render(
      <RangeSlider
        label="Test Slider"
        value={50}
        min={0}
        max={100}
        onChange={mockOnChange}
        testId="custom-slider"
      />
    );

    expect(screen.getByTestId('custom-slider')).toBeInTheDocument();
  });

  it('works without testId', () => {
    render(
      <RangeSlider
        label="Test Slider"
        value={50}
        min={0}
        max={100}
        onChange={mockOnChange}
      />
    );

    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('handles negative values correctly', () => {
    render(
      <RangeSlider
        label="Force"
        value={-500}
        min={-1000}
        max={-50}
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText('Force: -500')).toBeInTheDocument();
    expect(screen.getByRole('slider')).toHaveValue('-500');
  });

  it('converts string input to number in onChange', () => {
    render(
      <RangeSlider
        label="Test Slider"
        value={50}
        min={0}
        max={100}
        onChange={mockOnChange}
      />
    );

    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '85' } });

    expect(mockOnChange).toHaveBeenCalledWith(85);
    expect(typeof mockOnChange.mock.calls[0][0]).toBe('number');
  });
});
