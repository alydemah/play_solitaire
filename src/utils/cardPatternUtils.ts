import type { Card } from '../types/game.types';

export const generatePattern = (card: Card): string => {
  const suitSymbol = getSuitSymbol(card.suit);
  const rankSymbol = getRankSymbol(card.rank);
  return `${suitSymbol}${rankSymbol}`;
};

export const getSuitSymbol = (suit: string): string => {
  const symbols = {
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣',
    spades: '♠'
  };
  return symbols[suit] || '';
};

export const getRankSymbol = (rank: string): string => {
  const symbols = {
    'A': 'A',
    'K': 'K',
    'Q': 'Q',
    'J': 'J'
  };
  return symbols[rank] || rank;
};

export const getSuitColor = (suit: string): string => {
  return suit === 'hearts' || suit === 'diamonds' ? 'text-red-600' : 'text-gray-900';
};