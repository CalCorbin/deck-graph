export const fetchCards = async () => {
  const res = await fetch(
    'https://api.scryfall.com/cards/named?fuzzy=aust+com'
  );
  if (!res.ok) throw new Error('Failed to fetch cards');
  return res.json();
};
