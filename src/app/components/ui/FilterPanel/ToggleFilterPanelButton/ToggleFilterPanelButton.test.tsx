import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import {
  ToggleFilterPanelButton,
  ToggleFilterPanelButtonProps,
} from './ToggleFilterPanelButton';

describe(ToggleFilterPanelButton, () => {
  const defaultProps: ToggleFilterPanelButtonProps = {
    onToggle: jest.fn(),
    isVisible: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls onToggle when clicked', () => {
    const mockOnToggle = jest.fn();
    render(
      <ToggleFilterPanelButton {...defaultProps} onToggle={mockOnToggle} />
    );

    fireEvent.click(screen.getByTestId('toggle-filter-panel-button'));
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });

  it('applies visible styles when isVisible is true', () => {
    render(<ToggleFilterPanelButton {...defaultProps} isVisible={true} />);
    const button = screen.getByTestId('toggle-filter-panel-button');

    expect(button).toHaveClass('bg-gray-900/90');
    expect(button).toHaveClass('border-purple-500/50');
    expect(button).toHaveClass('text-purple-300');
  });

  it('applies hidden styles when isVisible is false', () => {
    render(<ToggleFilterPanelButton {...defaultProps} isVisible={false} />);
    const button = screen.getByTestId('toggle-filter-panel-button');

    expect(button).toHaveClass('bg-gray-800/80');
    expect(button).toHaveClass('border-gray-600/50');
    expect(button).toHaveClass('text-gray-300');
    expect(button).toHaveClass('hover:bg-gray-700/90');
  });

  it('renders the filter icon', () => {
    render(<ToggleFilterPanelButton {...defaultProps} />);
    const icon = screen.getByTestId('toggle-icon');

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('w-5', 'h-5');
  });
});
