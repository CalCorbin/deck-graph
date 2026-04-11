import { Card } from '../types/card.types';

const DELAY_MS = 100; // 500ms delay between requests (120 requests/min)

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchCards = async (cards: string[]): Promise<Card[]> => {
  const results: Card[] = [];

  for (let i = 0; i < cards.length; i++) {
    const cardName = cards[i];

    try {
      const res = await fetch(
        `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(cardName)}`
      );

      if (!res.ok) {
        console.error(`Failed to fetch card: ${cardName}`);
      } else {
        const data: Card = await res.json();
        results.push(data);
      }
    } catch (error) {
      console.error(`Error fetching card ${cardName}:`, error);
    }

    // Add delay between requests (except after the last request)
    if (i < cards.length - 1) {
      await delay(DELAY_MS);
    }
  }

  return results;
};
