import { BaseGame } from '../base/BaseGame';
import type { Card, GameMove } from '../../types/game.types';

export class SpiderGame extends BaseGame {
  validateMove(source: { type: string; index?: number }, target: { type: string; index: number }): boolean {
    const sourceCards = this.getSourceCards(source);
    if (!sourceCards.length) return false;

    if (target.type === 'tableau') {
      return this.isValidTableauMove(sourceCards[0], this.state.tableaus[target.index]);
    }

    return false;
  }

  findNextMove(): GameMove | null {
    // Check for completed suit sequences
    for (let i = 0; i < this.state.tableaus.length; i++) {
      const tableau = this.state.tableaus[i];
      const sequence = this.findCompleteSuitSequence(tableau);
      if (sequence) {
        return {
          type: 'tableau-to-foundation',
          sourceType: 'tableau',
          sourceIndex: i,
          targetType: 'foundation',
          targetIndex: this.getNextFoundationIndex(),
          card: sequence[0],
          previousState: this.state
        };
      }
    }

    // Check for tableau to tableau moves
    for (let i = 0; i < this.state.tableaus.length; i++) {
      const sourceTableau = this.state.tableaus[i];
      if (sourceTableau.length === 0) continue;

      for (let j = 0; j < this.state.tableaus.length; j++) {
        if (i === j) continue;
        const targetTableau = this.state.tableaus[j];
        
        if (this.isValidTableauMove(sourceTableau[sourceTableau.length - 1], targetTableau)) {
          return {
            type: 'tableau-to-tableau',
            sourceType: 'tableau',
            sourceIndex: i,
            targetType: 'tableau',
            targetIndex: j,
            card: sourceTableau[sourceTableau.length - 1],
            previousState: this.state
          };
        }
      }
    }

    return null;
  }

  private findCompleteSuitSequence(tableau: Card[]): Card[] | null {
    if (tableau.length < 13) return null;
    
    const lastIndex = tableau.length - 1;
    const sequence = [tableau[lastIndex]];
    
    for (let i = lastIndex - 1; i >= lastIndex - 12; i--) {
      const currentCard = tableau[i];
      const previousCard = sequence[0];
      
      if (!currentCard.faceUp || 
          currentCard.suit !== previousCard.suit || 
          !this.isDescendingRank(currentCard, previousCard)) {
        return null;
      }
      
      sequence.unshift(currentCard);
    }
    
    return sequence.length === 13 ? sequence : null;
  }

  private isValidTableauMove(card: Card, targetTableau: Card[]): boolean {
    if (targetTableau.length === 0) return true;
    
    const targetCard = targetTableau[targetTableau.length - 1];
    return this.isDescendingRank(card, targetCard);
  }

  private isDescendingRank(card1: Card, card2: Card): boolean {
    const ranks = ['K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2', 'A'];
    return ranks.indexOf(card1.rank) === ranks.indexOf(card2.rank) - 1;
  }

  private getNextFoundationIndex(): number {
    return this.state.foundations.findIndex(f => f.length === 0);
  }

  isGameWon(): boolean {
    return this.state.foundations.every(f => f.length === 13);
  }

  private getSourceCards(source: { type: string; index?: number }): Card[] {
    if (source.type !== 'tableau' || source.index === undefined) return [];
    
    const tableau = this.state.tableaus[source.index];
    const faceUpIndex = tableau.findIndex(card => card.faceUp);
    return faceUpIndex >= 0 ? tableau.slice(faceUpIndex) : [];
  }

  updateScore(move: GameMove): number {
    if (move.type === 'tableau-to-foundation') return 100;
    return 5;
  }
}