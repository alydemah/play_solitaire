import { BaseGame } from '../base/BaseGame';
import type { Card, GameMove } from '../../types/game.types';

export class PyramidGame extends BaseGame {
  validateMove(source: { type: string; index?: number }, target: { type: string; index: number }): boolean {
    const sourceCard = this.getSourceCard(source);
    if (!sourceCard) return false;

    // For Pyramid, target is another card to pair with
    const targetCard = this.getTargetCard(target);
    if (!targetCard) return false;

    // Check if cards sum to 13
    return this.getCardValue(sourceCard) + this.getCardValue(targetCard) === 13;
  }

  private getCardValue(card: Card): number {
    const valueMap: Record<string, number> = {
      'A': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
      '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13
    };
    return valueMap[card.rank];
  }

  private isCardExposed(tableauIndex: number, cardIndex: number): boolean {
    // Card is exposed if it has no cards covering it in the pyramid
    const row = this.getRowFromIndex(cardIndex);
    const nextRow = this.state.tableaus[tableauIndex + 1];
    if (!nextRow) return true;

    const leftChildIndex = cardIndex * 2;
    const rightChildIndex = leftChildIndex + 1;
    return !nextRow[leftChildIndex] && !nextRow[rightChildIndex];
  }

  private getRowFromIndex(index: number): number {
    return Math.floor(Math.log2(index + 1));
  }

  findNextMove(): GameMove | null {
    // Check for Kings first (can be removed individually)
    for (let i = 0; i < this.state.tableaus.length; i++) {
      const tableau = this.state.tableaus[i];
      for (let j = 0; j < tableau.length; j++) {
        const card = tableau[j];
        if (card && card.rank === 'K' && this.isCardExposed(i, j)) {
          return {
            type: 'remove-king',
            sourceType: 'tableau',
            sourceIndex: i,
            targetType: 'foundation',
            targetIndex: 0,
            card,
            previousState: this.state
          };
        }
      }
    }

    // Check for pairs that sum to 13
    for (let i = 0; i < this.state.tableaus.length; i++) {
      const tableau = this.state.tableaus[i];
      for (let j = 0; j < tableau.length; j++) {
        const card1 = tableau[j];
        if (!card1 || !this.isCardExposed(i, j)) continue;

        // Check waste pile first
        if (this.state.waste.length > 0) {
          const wasteCard = this.state.waste[this.state.waste.length - 1];
          if (this.getCardValue(card1) + this.getCardValue(wasteCard) === 13) {
            return {
              type: 'pair-sum-13',
              sourceType: 'tableau',
              sourceIndex: i,
              targetType: 'waste',
              targetIndex: 0,
              card: card1,
              previousState: this.state
            };
          }
        }

        // Check other exposed tableau cards
        for (let k = i; k < this.state.tableaus.length; k++) {
          const tableau2 = this.state.tableaus[k];
          const startIdx = k === i ? j + 1 : 0;
          for (let l = startIdx; l < tableau2.length; l++) {
            const card2 = tableau2[l];
            if (!card2 || !this.isCardExposed(k, l)) continue;

            if (this.getCardValue(card1) + this.getCardValue(card2) === 13) {
              return {
                type: 'pair-sum-13',
                sourceType: 'tableau',
                sourceIndex: i,
                targetType: 'tableau',
                targetIndex: k,
                card: card1,
                previousState: this.state
              };
            }
          }
        }
      }
    }

    return null;
  }

  isGameWon(): boolean {
    // Game is won when all cards are removed
    return this.state.tableaus.every(tableau => 
      tableau.every(card => card === null)
    );
  }

  private getSourceCard(source: { type: string; index?: number }): Card | null {
    if (source.type === 'waste') {
      return this.state.waste[this.state.waste.length - 1] || null;
    }
    if (source.type === 'tableau' && source.index !== undefined) {
      const tableau = this.state.tableaus[source.index];
      return tableau[tableau.length - 1] || null;
    }
    return null;
  }

  private getTargetCard(target: { type: string; index: number }): Card | null {
    if (target.type === 'waste') {
      return this.state.waste[this.state.waste.length - 1] || null;
    }
    if (target.type === 'tableau') {
      const tableau = this.state.tableaus[target.index];
      return tableau[tableau.length - 1] || null;
    }
    return null;
  }

  updateScore(move: GameMove): number {
    if (move.type === 'remove-king') return 20;
    if (move.type === 'pair-sum-13') return 15;
    return 5;
  }
}