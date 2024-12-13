import type { Card } from '../types/game.types';

export const generateCardPattern = (card: Card): string => {
  // Pattern generation logic
  const suitPattern = getSuitPattern(card.suit);
  const rankPattern = getRankPattern(card.rank);
  return `${suitPattern}${rankPattern}`;
};

export const getSuitColor = (suit: string): string => {
  return suit === 'hearts' || suit === 'diamonds' ? 'text-red-600' : 'text-gray-900';
};

const getSuitPattern = (suit: string): string => {
  // Suit pattern logic
  const patterns = {
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣',
    spades: '♠'
  };
  return patterns[suit] || '';
};

const getRankPattern = (rank: string): string => {
  // Rank pattern logic
  const patterns = {
    'A': 'A',
    'K': 'K',
    'Q': 'Q',
    'J': 'J',
    // ... other ranks
  };
  return patterns[rank] || rank;
};