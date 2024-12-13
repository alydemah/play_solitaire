import { suitPatterns } from './suitPatterns';
import { rankPatterns } from './rankPatterns';
import type { Suit, Rank } from '../../types/game.types';

export interface CardPattern {
  paths: string[];
  positions: { x: number; y: number; transform?: string; scale?: number }[];
  isRed: boolean;
}

export function getCardPattern(rank: Rank, suit: Suit): CardPattern {
  const suitPattern = suitPatterns[suit];
  const positions = rankPatterns[rank];

  return {
    paths: positions.map(() => suitPattern.path),
    positions: positions.map(pos => ({
      ...pos,
      transform: suitPattern.transform
    })),
    isRed: suitPattern.isRed
  };
}

export function getDisplayRank(rank: Rank): string {
  const displayMap: Record<Rank, string> = {
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
  return displayMap[rank];
}

export function getRankSymbol(rank: Rank): string {
  return rank === '10' ? '10' : rank;
}