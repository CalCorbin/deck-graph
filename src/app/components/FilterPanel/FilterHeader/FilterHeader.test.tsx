import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FilterHeader } from './FilterHeader';

describe('FilterHeader', () => {
  it('renders with correct text', () => {
    render(<FilterHeader />);

    expect(screen.getByText('Network Controls')).toBeInTheDocument();
  });
});
