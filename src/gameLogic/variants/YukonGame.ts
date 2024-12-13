import { BaseGame } from '../base/BaseGame';
import type { Card, GameMove } from '../../types/game.types';

export class YukonGame extends BaseGame {
  validateMove(source: { type: string; index?: number }, target: { type: string; index: number }): boolean {
    const sourceCards = this.getSourceCards(source);
    if (!sourceCards.length) return false;

    if (target.type === 'foundation') {
      return sourceCards.length === 1 && this.isValidFoundationMove(sourceCards[0], this.state.foundations[target.index]);
    }

    if (target.type === 'tableau') {
      return this.isValidTableauMove(sourceCards[0], this.state.tableaus[target.index]);
    }

    return false;
  }

  private isValidFoundationMove(card: Card, foundation: Card[]): boolean {
    if (foundation.length === 0) return card.rank === 'A';
    
    const topCard = foundation[foundation.length - 1];
    return card.suit === topCard.suit && this.isNextRank(topCard, card);
  }

  private isValidTableauMove(card: Card, targetTableau: Card[]): boolean {
    if (targetTableau.length === 0) return card.rank === 'K';
    
    const targetCard = targetTableau[targetTableau.length - 1];
    return this.isAlternatingColor(card, targetCard) && this.isPreviousRank(card, targetCard);
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
    // Check for foundation moves first
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

    // Check for tableau to tableau moves
    for (let i = 0; i < this.state.tableaus.length; i++) {
      const sourceTableau = this.state.tableaus[i];
      if (sourceTableau.length === 0) continue;

      // In Yukon, we can move any face-up card and cards below it
      for (let cardIndex = 0; cardIndex < sourceTableau.length; cardIndex++) {
        const card = sourceTableau[cardIndex];
        if (!card.faceUp) continue;

        for (let j = 0; j < this.state.tableaus.length; j++) {
          if (i === j) continue;
          
          if (this.isValidTableauMove(card, this.state.tableaus[j])) {
            return {
              type: 'tableau-to-tableau',
              sourceType: 'tableau',
              sourceIndex: i,
              targetType: 'tableau',
              targetIndex: j,
              card,
              previousState: this.state
            };
          }
        }
      }
    }

    return null;
  }

  isGameWon(): boolean {
    return this.state.foundations.every(foundation => 
      foundation.length === 13 && foundation[12].rank === 'K'
    );
  }

  private getSourceCards(source: { type: string; index?: number }): Card[] {
    if (source.type !== 'tableau' || source.index === undefined) return [];
    
    const tableau = this.state.tableaus[source.index];
    // In Yukon, we can move any face-up card and all cards below it
    const faceUpIndex = tableau.findIndex(card => card.faceUp);
    return faceUpIndex >= 0 ? tableau.slice(faceUpIndex) : [];
  }

  updateScore(move: GameMove): number {
    if (move.type === 'tableau-to-foundation') return 10;
    if (move.type === 'tableau-to-tableau') return 5;
    return 2;
  }
}