export const SUIT_PATTERNS = {
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
  spades: '♠'
};

export const RANK_PATTERNS = {
  A: 'A',
  K: 'K',
  Q: 'Q',
  J: 'J',
  '10': '10',
  '9': '9',
  '8': '8',
  '7': '7',
  '6': '6',
  '5': '5',
  '4': '4',
  '3': '3',
  '2': '2'
};

export const getCardPattern = (suit: string, rank: string): string => {
  const suitPattern = SUIT_PATTERNS[suit] || '';
  const rankPattern = RANK_PATTERNS[rank] || rank;
  return `${suitPattern}${rankPattern}`;
};