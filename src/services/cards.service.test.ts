import { fetchCards } from '@/services/cards.service';

describe('fetchCards', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return JSON data when fetch succeeds', async () => {
    const mockData = { id: 1, name: 'card' };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    const result = await fetchCards();

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.scryfall.com/cards/named?fuzzy=aust+com'
    );
    expect(result).toEqual(mockData);
  });

  it('should throw error when response is not ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchCards()).rejects.toThrow('Failed to fetch cards');
  });
});
