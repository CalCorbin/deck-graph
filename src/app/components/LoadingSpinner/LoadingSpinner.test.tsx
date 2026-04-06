import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from './LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders with default props', () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('w-16', 'h-16'); // default 'md' size
    expect(spinner).toHaveAttribute('role', 'status');
    expect(spinner).toHaveAttribute('aria-label', 'Loading');
  });

  it('renders with small size', () => {
    render(<LoadingSpinner size="sm" />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('w-12', 'h-12');
  });

  it('renders with medium size', () => {
    render(<LoadingSpinner size="md" />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('w-16', 'h-16');
  });

  it('renders with large size', () => {
    render(<LoadingSpinner size="lg" />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('w-24', 'h-24');
  });

  it('applies custom className', () => {
    render(<LoadingSpinner className="custom-class" />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('custom-class');
  });

  it('displays loading text with animated dots', () => {
    render(<LoadingSpinner />);

    expect(screen.getByTestId('loading-text')).toBeInTheDocument();
    expect(screen.getByText(/Retrieving cards/)).toBeInTheDocument();
  });

  it('contains required visual elements', () => {
    render(<LoadingSpinner />);

    expect(screen.getByTestId('outer-ring')).toBeInTheDocument();
    expect(screen.getByTestId('middle-ring')).toBeInTheDocument();
    expect(screen.getByTestId('inner-dots')).toBeInTheDocument();
    expect(screen.getByTestId('loading-text')).toBeInTheDocument();
  });

  it('has proper animation classes', () => {
    render(<LoadingSpinner />);

    const outerRing = screen.getByTestId('outer-ring');
    const middleRing = screen.getByTestId('middle-ring');
    const innerDots = screen.getByTestId('inner-dots');

    expect(outerRing).toHaveClass('animate-spin');
    expect(middleRing).toHaveClass('animate-pulse');
    expect(innerDots).toHaveClass('animate-spin');
  });

  it('includes custom keyframe animation styles', () => {
    const { container } = render(<LoadingSpinner />);

    const styleElement = container.querySelector('style');
    expect(styleElement).toBeInTheDocument();
    expect(styleElement?.textContent).toContain('fadeInOut');
  });
});
