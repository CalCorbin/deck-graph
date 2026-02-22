import { fetchCards } from './cards.service';

global.fetch = jest.fn();

describe('fetchCards', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should fetch single card successfully', async () => {
    const mockCard = { id: '1', name: 'Test Card' };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCard,
    });

    const result = await fetchCards(['Test Card']);

    expect(result).toEqual([mockCard]);
  });

  it('should fetch multiple cards with delays', async () => {
    const mockCard1 = { id: '1', name: 'Card 1' };
    const mockCard2 = { id: '2', name: 'Card 2' };

    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCard1,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCard2,
      });

    const promise = fetchCards(['Card 1', 'Card 2']);
    await jest.runAllTimersAsync();
    const result = await promise;

    expect(result).toEqual([mockCard1, mockCard2]);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it('should log error for failed response', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await fetchCards(['Failed Card']);

    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to fetch card: Failed Card'
    );
    consoleSpy.mockRestore();
  });

  it('should log error for fetch exception', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    const error = new Error('Network error');
    (global.fetch as jest.Mock).mockRejectedValueOnce(error);

    await fetchCards(['Bad Card']);

    expect(consoleSpy).toHaveBeenCalledWith(
      'Error fetching card Bad Card:',
      error
    );
    consoleSpy.mockRestore();
  });

  it('should return empty array for empty input', async () => {
    const result = await fetchCards([]);

    expect(result).toEqual([]);
  });

  it('should URL encode card names', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: '1' }),
    });

    await fetchCards(['Cloud, Ex-SOLDIER']);

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('Cloud%2C%20Ex-SOLDIER')
    );
  });
});
