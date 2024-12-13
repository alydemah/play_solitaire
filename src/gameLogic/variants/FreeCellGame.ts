import { BaseGame } from '../base/BaseGame';
import type { Card, GameMove } from '../../types/game.types';

export class FreeCellGame extends BaseGame {
  validateMove(source: { type: string; index?: number }, target: { type: string; index: number }): boolean {
    const sourceCards = this.getSourceCards(source);
    if (!sourceCards.length) return false;

    if (target.type === 'freecell') {
      return sourceCards.length === 1 && this.state.freeCells![target.index] === undefined;
    }

    if (target.type === 'foundation') {
      return this.isValidFoundationMove(sourceCards[0], this.state.foundations[target.index]);
    }

    if (target.type === 'tableau') {
      return this.isValidTableauMove(sourceCards, this.state.tableaus[target.index]);
    }

    return false;
  }

  private isValidFoundationMove(card: Card, foundation: Card[]): boolean {
    if (foundation.length === 0) return card.rank === 'A';
    
    const topCard = foundation[foundation.length - 1];
    return card.suit === topCard.suit && this.isNextRank(topCard, card);
  }

  private isValidTableauMove(cards: Card[], targetTableau: Card[]): boolean {
    if (cards.length === 0) return false;
    
    if (targetTableau.length === 0) return true;
    
    const targetCard = targetTableau[targetTableau.length - 1];
    const sourceCard = cards[0];
    
    return this.isAlternatingColor(sourceCard, targetCard) && 
           this.isPreviousRank(sourceCard, targetCard);
  }

  private isNextRank(card1: Card, card2: Card): boolean {
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    return ranks.indexOf(card2.rank) === ranks.indexOf(card1.rank) + 1;
  }

  private isPreviousRank(card1: Card, card2: Card): boolean {
    return this.isNextRank(card2, card1);
  }

  private isAlternatingColor(card1: Card, card2: Card): boolean {
    const isRed = (suit: string) => suit === 'hearts' || suit === 'diamonds';
    return isRed(card1.suit) !== isRed(card2.suit);
  }

  findNextMove(): GameMove | null {
    // Check for foundation moves
    for (let i = 0; i < this.state.tableaus.length; i++) {
      const tableau = this.state.tableaus[i];
      if (tableau.length === 0) continue;
      
      const card = tableau[tableau.length - 1];
      for (let j = 0; j < this.state.foundations.length; j++) {
        if (this.isValidFoundationMove(card, this.state.foundations[j])) {
          return {
            type: 'tableau-to-foundation',
            sourceType: 'tableau',
            sourceIndex: i,
            targetType: 'foundation',
            targetIndex: j,
            card,
            previousState: this.state
          };
        }
      }
    }

    // Check freecell moves if needed
    // Add other move types...

    return null;
  }

  isGameWon(): boolean {
    return this.state.foundations.every(f => f.length === 13);
  }

  private getSourceCards(source: { type: string; index?: number }): Card[] {
    if (!source.index) return [];

    if (source.type === 'freecell') {
      const card = this.state.freeCells![source.index];
      return card ? [card] : [];
    }

    if (source.type === 'tableau') {
      const tableau = this.state.tableaus[source.index];
      if (tableau.length === 0) return [];
      return [tableau[tableau.length - 1]];
    }

    return [];
  }

  updateScore(move: GameMove): number {
    if (move.type === 'tableau-to-foundation') return 10;
    return 5;
  }
}