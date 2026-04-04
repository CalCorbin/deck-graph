import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { NavigationBar } from './NavigationBar';

describe('NavigationBar', () => {
  beforeEach(() => {
    render(<NavigationBar />);
  });

  describe('Structure and Layout', () => {
    it('renders the navigation bar', () => {
      const nav = screen.getByTestId('navigation-bar');
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveAttribute('role', 'navigation');
      expect(nav).toHaveAttribute('aria-label', 'Main navigation');
    });

    it('renders title', () => {
      const title = screen.getByTestId('app-title');
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Commander Graph');
    });
  });

  it('renders the magical orb icon', () => {
    const orbIcon = screen.getByTestId('magical-orb-icon');
    expect(orbIcon).toBeInTheDocument();
    expect(orbIcon).toHaveAttribute('role', 'img');
    expect(orbIcon).toHaveAttribute('aria-label', 'Magical orb icon');
  });

  it('renders magical sparkles', () => {
    const sparkles = screen.getByTestId('magical-sparkles');
    expect(sparkles).toBeInTheDocument();
    expect(sparkles).toHaveAttribute('role', 'img');
    expect(sparkles).toHaveAttribute(
      'aria-label',
      'Magical sparkles decoration'
    );
  });

  it('renders the magical glow effect', () => {
    const glowEffect = screen.getByTestId('magical-glow-effect');
    expect(glowEffect).toBeInTheDocument();
    expect(glowEffect).toHaveAttribute('role', 'presentation');
    expect(glowEffect).toHaveAttribute('aria-hidden', 'true');
  });

  describe('Accessibility', () => {
    it('has proper navigation landmark', () => {
      const navigation = screen.getByRole('navigation');
      expect(navigation).toBeInTheDocument();
      expect(navigation).toHaveAccessibleName('Main navigation');
    });

    it('has accessible heading structure', () => {
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toBeInTheDocument();
    });

    it('has proper aria attributes for decorative elements', () => {
      const glowEffect = screen.getByTestId('magical-glow-effect');
      expect(glowEffect).toHaveAttribute('aria-hidden', 'true');
    });
  });
});
