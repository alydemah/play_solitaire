import type { Card, GameState, GameMove } from '../../types/game.types';
import type { VariantConfig } from '../../types/variants.types';

/**
 * Base class for all solitaire game variants
 */
export abstract class BaseGame {
  protected state: GameState;
  protected config: VariantConfig;

  constructor(state: GameState, config: VariantConfig) {
    this.state = state;
    this.config = config;
  }

  /**
   * Validates if a move is legal according to game rules
   */
  abstract validateMove(source: { type: string; index?: number }, target: { type: string; index: number }): boolean;

  /**
   * Finds the next possible move
   */
  abstract findNextMove(): GameMove | null;

  /**
   * Checks if the game is won
   */
  abstract isGameWon(): boolean;

  /**
   * Initializes the game state
   */
  abstract initializeGame(): void;

  /**
   * Updates game score based on move
   */
  abstract updateScore(move: GameMove): number;
}