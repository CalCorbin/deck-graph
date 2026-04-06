import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CollapsibleSection } from './CollapsibleSection';

describe('CollapsibleSection', () => {
  const mockOnToggle = jest.fn();

  beforeEach(() => {
    mockOnToggle.mockClear();
  });

  it('hides children when isActive is false', () => {
    render(
      <CollapsibleSection
        title="Test Section"
        isActive={false}
        onToggle={mockOnToggle}
      >
        <div>Hidden content</div>
      </CollapsibleSection>
    );

    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
  });

  it('shows children when isActive is true', () => {
    render(
      <CollapsibleSection
        title="Test Section"
        isActive={true}
        onToggle={mockOnToggle}
      >
        <div>Visible content</div>
      </CollapsibleSection>
    );

    expect(screen.getByText('Visible content')).toBeInTheDocument();
  });

  it('calls onToggle when button is clicked', () => {
    render(
      <CollapsibleSection
        title="Test Section"
        isActive={false}
        onToggle={mockOnToggle}
      >
        <div>Test content</div>
      </CollapsibleSection>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });

  it('applies rotate-180 class to SVG when isActive is true', () => {
    render(
      <CollapsibleSection
        title="Test Section"
        isActive={true}
        onToggle={mockOnToggle}
      >
        <div>Test content</div>
      </CollapsibleSection>
    );

    const svg = screen.getByRole('button').querySelector('svg');
    expect(svg).toHaveClass('rotate-180');
  });

  it('does not apply rotate-180 class to SVG when isActive is false', () => {
    render(
      <CollapsibleSection
        title="Test Section"
        isActive={false}
        onToggle={mockOnToggle}
      >
        <div>Test content</div>
      </CollapsibleSection>
    );

    const svg = screen.getByRole('button').querySelector('svg');
    expect(svg).not.toHaveClass('rotate-180');
  });

  it('renders complex children content', () => {
    render(
      <CollapsibleSection
        title="Test Section"
        isActive={true}
        onToggle={mockOnToggle}
      >
        <div>
          <p>Paragraph content</p>
          <button>Nested button</button>
          <span>Span content</span>
        </div>
      </CollapsibleSection>
    );

    expect(screen.getByText('Paragraph content')).toBeInTheDocument();
    expect(screen.getByText('Nested button')).toBeInTheDocument();
    expect(screen.getByText('Span content')).toBeInTheDocument();
  });
});
