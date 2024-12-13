import type { Suit, Rank } from '../types/game.types';

interface PatternCoordinate {
  x: number;
  y: number;
  rotate?: boolean;
}

export function getSuitColor(suit: Suit): string {
  return suit === 'hearts' || suit === 'diamonds' ? 'text-red-600' : 'text-gray-900';
}

export function getCardSymbols(card: { suit: Suit; rank: Rank }) {
  const suitSymbols = {
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣',
    spades: '♠'
  };

  return {
    rankSymbol: card.rank,
    suitSymbol: suitSymbols[card.suit]
  };
}

export function getPatternCoordinates(rank: Rank): PatternCoordinate[] {
  const patterns: Record<Rank, PatternCoordinate[]> = {
    'A': [{ x: 75, y: 112.5 }],
    '2': [
      { x: 75, y: 75 },
      { x: 75, y: 150, rotate: true }
    ],
    '3': [
      { x: 75, y: 75 },
      { x: 75, y: 112.5 },
      { x: 75, y: 150, rotate: true }
    ],
    '4': [
      { x: 45, y: 75 },
      { x: 105, y: 75 },
      { x: 45, y: 150, rotate: true },
      { x: 105, y: 150, rotate: true }
    ],
    '5': [
      { x: 45, y: 75 },
      { x: 105, y: 75 },
      { x: 75, y: 112.5 },
      { x: 45, y: 150, rotate: true },
      { x: 105, y: 150, rotate: true }
    ],
    '6': [
      { x: 45, y: 75 },
      { x: 105, y: 75 },
      { x: 45, y: 112.5 },
      { x: 105, y: 112.5 },
      { x: 45, y: 150, rotate: true },
      { x: 105, y: 150, rotate: true }
    ],
    '7': [
      { x: 45, y: 75 },
      { x: 75, y: 93.75 },
      { x: 105, y: 75 },
      { x: 45, y: 112.5 },
      { x: 105, y: 112.5 },
      { x: 45, y: 150, rotate: true },
      { x: 105, y: 150, rotate: true }
    ],
    '8': [
      { x: 45, y: 75 },
      { x: 75, y: 75 },
      { x: 105, y: 75 },
      { x: 45, y: 112.5 },
      { x: 105, y: 112.5 },
      { x: 45, y: 150, rotate: true },
      { x: 75, y: 150, rotate: true },
      { x: 105, y: 150, rotate: true }
    ],
    '9': [
      { x: 45, y: 75 },
      { x: 75, y: 75 },
      { x: 105, y: 75 },
      { x: 45, y: 112.5 },
      { x: 75, y: 112.5 },
      { x: 105, y: 112.5 },
      { x: 45, y: 150, rotate: true },
      { x: 75, y: 150, rotate: true },
      { x: 105, y: 150, rotate: true }
    ],
    '10': [
      { x: 45, y: 60 },
      { x: 75, y: 60 },
      { x: 105, y: 60 },
      { x: 45, y: 97.5 },
      { x: 105, y: 97.5 },
      { x: 45, y: 127.5 },
      { x: 105, y: 127.5 },
      { x: 45, y: 165, rotate: true },
      { x: 75, y: 165, rotate: true },
      { x: 105, y: 165, rotate: true }
    ],
    'J': [{ x: 75, y: 112.5 }],
    'Q': [{ x: 75, y: 112.5 }],
    'K': [{ x: 75, y: 112.5 }]
  };

  return patterns[rank];
}