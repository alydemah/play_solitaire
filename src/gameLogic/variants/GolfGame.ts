import { BaseGame } from '../base/BaseGame';
import type { Card, GameMove } from '../../types/game.types';

export class GolfGame extends BaseGame {
  validateMove(source: { type: string; index?: number }, target: { type: string; index: number }): boolean {
    const sourceCard = this.getSourceCard(source);
    if (!sourceCard) return false;

    // In Golf, we can only move to the waste pile
    if (target.type !== 'waste') return false;

    const targetCard = this.state.waste[this.state.waste.length - 1];
    if (!targetCard) return true; // First card can always be moved

    return this.isSequential(sourceCard, targetCard);
  }

  private isSequential(card1: Card, card2: Card): boolean {
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const index1 = ranks.indexOf(card1.rank);
    const index2 = ranks.indexOf(card2.rank);
    
    // Allow wrapping (K to A or A to K)
    if (index1 === 0 && index2 === ranks.length - 1) return true;
    if (index1 === ranks.length - 1 && index2 === 0) return true;
    
    return Math.abs(index1 - index2) === 1;
  }

  findNextMove(): GameMove | null {
    const wasteTop = this.state.waste[this.state.waste.length - 1];
    if (!wasteTop) {
      // If waste is empty, any top tableau card can be moved
      for (let i = 0; i < this.state.tableaus.length; i++) {
        const tableau = this.state.tableaus[i];
        if (tableau.length > 0) {
          const card = tableau[tableau.length - 1];
          return {
            type: 'tableau-to-waste',
            sourceType: 'tableau',
            sourceIndex: i,
            targetType: 'waste',
            targetIndex: 0,
            card,
            previousState: this.state
          };
        }
      }
    }

    // Check each tableau for a valid move
    for (let i = 0; i < this.state.tableaus.length; i++) {
      const tableau = this.state.tableaus[i];
      if (tableau.length === 0) continue;

      const card = tableau[tableau.length - 1];
      if (this.isSequential(card, wasteTop)) {
        return {
          type: 'tableau-to-waste',
          sourceType: 'tableau',
          sourceIndex: i,
          targetType: 'waste',
          targetIndex: 0,
          card,
          previousState: this.state
        };
      }
    }

    return null;
  }

  isGameWon(): boolean {
    // Game is won when all tableau piles are empty
    return this.state.tableaus.every(tableau => tableau.length === 0);
  }

  private getSourceCard(source: { type: string; index?: number }): Card | null {
    if (source.type === 'tableau' && source.index !== undefined) {
      const tableau = this.state.tableaus[source.index];
      return tableau.length > 0 ? tableau[tableau.length - 1] : null;
    }
    return null;
  }

  updateScore(move: GameMove): number {
    return move.type === 'tableau-to-waste' ? 5 : 0;
  }
}