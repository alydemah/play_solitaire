import type { Suit, Rank } from '../types/game.types';

interface SuitPattern {
  path: string;
  transform?: string;
}

// Heart pattern for red cards
const heartPattern = `M8.86 0a7.08 7.08 0 00-5.84 3.07l-.14.16c-.24.28-.63.26-.85-.04a8.22 8.22 0 00-.5-.63A7.07 7.07 0 00-4.94 0c-3.92 0-7.09 3.17-7.09 7.09c0 1.93.77 3.67 2.02 4.95l10.33 12.83a1.36 1.36 0 002.27 0l10.54-13.03a7.06 7.06 0 001.81-4.73c0-3.91-3.17-7.09-7.09-7.09`;

// Spade pattern for black cards
const spadePattern = `M8.43 0a8 8 0 00-3.38-4.72l-10.46-8.46c-.15-.13-.36-.13-.51 0l-10.38 8.47a8.11 8.11 0 00-3.21 4.23a7.25 7.25 0 00.24 5.31a7.9 7.9 0 0012.82 2.61a9.7 9.7 0 01-.29 1.5c-.09.31-.19.63-.3.96c-.05.16-.11.32-.17.48c-.06.16-.13.32-.2.48c-.06.16-.14.32-.21.47c-.07.16-.14.31-.23.46a8.28 8.28 0 01-3.46 2.81l-.86.38c-.09.03-.15.07-.17.15l0 1.95c0 .06.06.13.13.13l13.24 0c.06 0 .13-.06.13-.13l0-1.95c-.03-.1-.09-.12-.17-.15l-.28-.11c-.06-.02-.13-.04-.17-.07l-.41-.19c-1.31-.61-2.72-1.57-3.46-2.81c-.09-.16-.16-.31-.23-.46l-.21-.47c-.07-.16-.13-.32-.2-.48c-.06-.16-.13-.32-.17-.48a14.11 14.11 0 01-.51-1.89c-.03-.19-.06-.38-.08-.55a7.89 7.89 0 0012.76-2.44c.74-1.56.88-3.35.42-5.02`;

export function getSuitPattern(suit: Suit): SuitPattern {
  const basePattern = suit === 'hearts' || suit === 'diamonds' ? heartPattern : spadePattern;
  return {
    path: basePattern,
    transform: suit === 'diamonds' ? 'rotate(45)' : undefined
  };
}

export function getCardPatternData(rank: Rank, suit: Suit): { paths: string[], positions: { x: number, y: number }[] } {
  const pattern = getSuitPattern(suit);
  const positions = getPatternPositions(rank);
  
  return {
    paths: positions.map(() => pattern.path),
    positions
  };
}

function getPatternPositions(rank: Rank): { x: number, y: number }[] {
  switch (rank) {
    case 'A':
      return [{ x: 75, y: 112.5 }];
    case '2':
      return [
        { x: 75, y: 75 },
        { x: 75, y: 150 }
      ];
    case '3':
      return [
        { x: 75, y: 75 },
        { x: 75, y: 112.5 },
        { x: 75, y: 150 }
      ];
    case '4':
      return [
        { x: 41.39, y: 79.27 },
        { x: 107.39, y: 79.27 },
        { x: 41.39, y: 179.27 },
        { x: 107.39, y: 179.27 }
      ];
    case '7':
      return [
        { x: 58.86, y: 52.95 },
        { x: 124.86, y: 52.95 },
        { x: 58.86, y: 102.95 },
        { x: 124.86, y: 102.95 },
        { x: 58.86, y: 152.95 },
        { x: 124.86, y: 152.95 },
        { x: 91.86, y: 77.95 }
      ];
    case '9':
      return [
        { x: 59.54, y: 57.47 },
        { x: 125.54, y: 57.47 },
        { x: 59.54, y: 107.47 },
        { x: 125.54, y: 107.47 },
        { x: 59.54, y: 157.47 },
        { x: 125.54, y: 157.47 },
        { x: 92.54, y: 82.47 },
        { x: 92.54, y: 132.47 },
        { x: 92.54, y: 32.47 }
      ];
    // Add other ranks as needed...
    default:
      return [{ x: 75, y: 112.5 }];
  }
}