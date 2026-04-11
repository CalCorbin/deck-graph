import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ToggleButton } from './ToggleButton';

describe('ToggleButton', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with label and unchecked state', () => {
    render(
      <ToggleButton
        label="Test Toggle"
        checked={false}
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText('Test Toggle')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('bg-gray-600');
    expect(screen.getByRole('button').firstChild).toHaveClass('translate-x-1');
  });

  it('renders in checked state', () => {
    render(
      <ToggleButton
        label="Test Toggle"
        checked={true}
        onChange={mockOnChange}
      />
    );

    expect(screen.getByRole('button')).toHaveClass('bg-purple-600');
    expect(screen.getByRole('button').firstChild).toHaveClass('translate-x-6');
  });

  it('calls onChange with correct value when clicked', () => {
    render(
      <ToggleButton
        label="Test Toggle"
        checked={false}
        onChange={mockOnChange}
      />
    );

    fireEvent.click(screen.getByRole('button'));
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(true);
  });

  it('calls onChange with false when clicked while checked', () => {
    render(
      <ToggleButton
        label="Test Toggle"
        checked={true}
        onChange={mockOnChange}
      />
    );

    fireEvent.click(screen.getByRole('button'));
    expect(mockOnChange).toHaveBeenCalledWith(false);
  });

  it('applies testId when provided', () => {
    render(
      <ToggleButton
        label="Test Toggle"
        checked={false}
        onChange={mockOnChange}
        testId="custom-toggle"
      />
    );

    expect(screen.getByTestId('custom-toggle')).toBeInTheDocument();
  });

  it('works without testId', () => {
    render(
      <ToggleButton
        label="Test Toggle"
        checked={false}
        onChange={mockOnChange}
      />
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.queryByTestId('custom-toggle')).not.toBeInTheDocument();
  });

  it('has proper accessibility structure', () => {
    render(
      <ToggleButton
        label="Enable Feature"
        checked={false}
        onChange={mockOnChange}
      />
    );

    const label = screen.getByText('Enable Feature');
    const button = screen.getByRole('button');

    expect(label).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
