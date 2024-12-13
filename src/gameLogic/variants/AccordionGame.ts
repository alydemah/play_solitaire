import { BaseGame } from '../base/BaseGame';
import type { Card, GameMove } from '../../types/game.types';

export class AccordionGame extends BaseGame {
  validateMove(source: { type: string; index?: number }, target: { type: string; index: number }): boolean {
    if (!source.index || source.type !== 'tableau') return false;

    const sourceCard = this.state.tableaus[0][source.index];
    const targetCard = this.state.tableaus[0][target.index];
    
    if (!sourceCard || !targetCard) return false;

    // Can move to immediately adjacent left card or third card to the left
    const distance = source.index - target.index;
    if (distance !== 1 && distance !== 3) return false;

    // Cards must match in either suit or rank
    return sourceCard.suit === targetCard.suit || sourceCard.rank === targetCard.rank;
  }

  findNextMove(): GameMove | null {
    const tableau = this.state.tableaus[0];
    
    // Check each card for possible moves
    for (let i = tableau.length - 1; i > 0; i--) {
      const sourceCard = tableau[i];
      if (!sourceCard) continue;

      // Check one position to the left
      if (i >= 1) {
        const targetCard = tableau[i - 1];
        if (targetCard && (sourceCard.suit === targetCard.suit || sourceCard.rank === targetCard.rank)) {
          return {
            type: 'collapse',
            sourceType: 'tableau',
            sourceIndex: i,
            targetType: 'tableau',
            targetIndex: i - 1,
            card: sourceCard,
            previousState: this.state
          };
        }
      }

      // Check three positions to the left
      if (i >= 3) {
        const targetCard = tableau[i - 3];
        if (targetCard && (sourceCard.suit === targetCard.suit || sourceCard.rank === targetCard.rank)) {
          return {
            type: 'collapse',
            sourceType: 'tableau',
            sourceIndex: i,
            targetType: 'tableau',
            targetIndex: i - 3,
            card: sourceCard,
            previousState: this.state
          };
        }
      }
    }

    return null;
  }

  isGameWon(): boolean {
    // Game is won when all cards are collapsed into a single pile
    return this.state.tableaus[0].filter(card => card !== null).length === 1;
  }

  updateScore(move: GameMove): number {
    return move.type === 'collapse' ? 10 : 0;
  }
}