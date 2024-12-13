import { BaseGame } from '../base/BaseGame';
import type { Card, GameMove } from '../../types/game.types';
import { isValidFoundationMove, isValidTableauMove } from '../../utils/moveValidation';

export class KlondikeGame extends BaseGame {
  validateMove(source: { type: string; index?: number }, target: { type: string; index: number }): boolean {
    const sourceCards = this.getSourceCards(source);
    if (!sourceCards.length) return false;

    if (target.type === 'foundation') {
      return sourceCards.length === 1 && 
             isValidFoundationMove(sourceCards[0], this.state.foundations[target.index]);
    }

    if (target.type === 'tableau') {
      return isValidTableauMove(sourceCards[0], this.state.tableaus[target.index]);
    }

    return false;
  }

  findNextMove(): GameMove | null {
    // Check waste to foundation moves
    if (this.state.waste.length > 0) {
      const wasteCard = this.state.waste[this.state.waste.length - 1];
      for (let i = 0; i < this.state.foundations.length; i++) {
        if (isValidFoundationMove(wasteCard, this.state.foundations[i])) {
          return {
            type: 'waste-to-foundation',
            sourceType: 'waste',
            targetType: 'foundation',
            targetIndex: i,
            card: wasteCard,
            previousState: this.state
          };
        }
      }
    }

    // Add tableau to foundation and tableau to tableau moves...
    return null;
  }

  isGameWon(): boolean {
    return this.state.foundations.every(foundation => 
      foundation.length === 13 && foundation[12].rank === 'K'
    );
  }

  private getSourceCards(source: { type: string; index?: number }): Card[] {
    if (source.type === 'waste') {
      return this.state.waste.length ? [this.state.waste[this.state.waste.length - 1]] : [];
    }
    
    if (source.type === 'tableau' && source.index !== undefined) {
      const tableau = this.state.tableaus[source.index];
      const faceUpIndex = tableau.findIndex(card => card.faceUp);
      return faceUpIndex >= 0 ? tableau.slice(faceUpIndex) : [];
    }

    return [];
  }

  // Add other required methods...
}