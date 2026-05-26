import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockCardData } from '@/__fixtures__/mockCards';
import { NetworkGraph } from '@/app/components/NetworkGraph/NetworkGraph';
import { useCards } from '@/hooks/useCards';

jest.mock('@/hooks/useCards');
const mockUseCards = useCards as jest.MockedFunction<typeof useCards>;

describe('NetworkGraph', () => {
  const setup = (isLoading = false, cardData = mockCardData) => {
    mockUseCards.mockReturnValue({ data: cardData, isLoading });

    return render(<NetworkGraph />);
  };

  it('should render loading state', () => {
    setup(true);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(
      screen.queryByTestId('network-graph-container')
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId('filter-panel')).not.toBeInTheDocument();
  });

  it('should render graph', () => {
    setup();
    expect(screen.getByTestId('network-graph-container')).toBeInTheDocument();
    expect(screen.getByTestId('filter-panel')).toBeInTheDocument();
  });

  it('should handle no data loaded', () => {
    setup(false, []);
    expect(screen.getByTestId('network-graph-container')).toBeInTheDocument();
    expect(screen.getByText('No Card Data Present')).toBeInTheDocument();
    expect(screen.queryByTestId('filter-panel')).not.toBeInTheDocument();
  });

  it('should toggle visual style color scheme', async () => {
    const user = userEvent.setup();
    setup();

    // Open filter panel and visual style menu
    user.click(screen.getByTestId('toggle-filter-panel-button'));
    user.click(screen.getByRole('button', { name: 'Visual Style' }));

    // Select color scheme by card type
    await waitFor(() => {
      expect(screen.getByTestId('color-scheme-select')).toBeInTheDocument();
    });
    await user.selectOptions(
      screen.getByTestId('color-scheme-select'),
      'type-based'
    );

    // Select color scheme by rarity
    await user.selectOptions(
      screen.getByTestId('color-scheme-select'),
      'rarity-based'
    );
  });
});
