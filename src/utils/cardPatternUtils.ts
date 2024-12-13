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

export const getDisplayRank = (rank: string): string => {
  const displayMap = {
    'A': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '10': '10',
    'J': '11',
    'Q': '12',
    'K': '13'
  };
  return displayMap[rank] || rank;
};