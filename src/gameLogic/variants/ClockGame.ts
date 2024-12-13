import { BaseGame } from '../base/BaseGame';
import type { Card, GameMove } from '../../types/game.types';

export class ClockGame extends BaseGame {
  private readonly clockPositions = {
    'A': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
    '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 0
  };

  validateMove(source: { type: string; index?: number }, target: { type: string; index: number }): boolean {
    // In Clock solitaire, moves are deterministic based on card rank
    const sourceCard = this.getSourceCard(source);
    if (!sourceCard) return false;

    const targetPosition = this.clockPositions[sourceCard.rank];
    return target.index === targetPosition;
  }

  findNextMove(): GameMove | null {
    // Get the top card of the current pile
    const currentPile = this.getCurrentPile();
    if (currentPile === null) return null;

    const card = this.getTopCard(currentPile);
    if (!card) return null;

    const targetPosition = this.clockPositions[card.rank];
    
    return {
      type: 'move-to-position',
      sourceType: 'tableau',
      sourceIndex: currentPile,
      targetType: 'tableau',
      targetIndex: targetPosition,
      card,
      previousState: this.state
    };
  }

  private getCurrentPile(): number | null {
    // Find the pile that was last played to
    for (let i = 0; i < this.state.tableaus.length; i++) {
      const tableau = this.state.tableaus[i];
      if (tableau.length > 0 && tableau[tableau.length - 1].faceUp) {
        return i;
      }
    }
    // If no face-up cards, start with center pile (position 0)
    return this.state.tableaus[0].length > 0 ? 0 : null;
  }

  private getTopCard(pileIndex: number): Card | null {
    const pile = this.state.tableaus[pileIndex];
    return pile.length > 0 ? pile[pile.length - 1] : null;
  }

  isGameWon(): boolean {
    // Game is won when all cards are face up
    return this.state.tableaus.every(tableau =>
      tableau.every(card => card === null || card.faceUp)
    );
  }

  private getSourceCard(source: { type: string; index?: number }): Card | null {
    if (source.type !== 'tableau' || source.index === undefined) return null;
    const tableau = this.state.tableaus[source.index];
    return tableau.length > 0 ? tableau[tableau.length - 1] : null;
  }

  updateScore(move: GameMove): number {
    return 5; // Fixed score per move as game is purely mechanical
  }
}