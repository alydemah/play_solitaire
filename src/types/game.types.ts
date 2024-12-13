import type { GameVariant } from './variants.types';

export type Difficulty = 'easy' | 'medium' | 'hard';
export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export interface Card {
  id: string;
  suit: Suit;
  rank: Rank;
  faceUp: boolean;
}

export interface GameState {
  variant: GameVariant;
  deck: Card[];
  waste: Card[];
  foundations: Card[][];
  tableaus: Card[][];
  freeCells?: Card[];
  score: number;
  moves: number;
  time: number;
}

export interface GameSettings {
  variant: GameVariant;
  difficulty: Difficulty;
  drawCount: 1 | 3;
  timerEnabled: boolean;
  soundEnabled: boolean;
  background: string;
}

export interface GameMove {
  type: string;
  sourceType: string;
  sourceIndex?: number;
  targetType: string;
  targetIndex: number;
  card: Card;
  previousState: GameState;
}