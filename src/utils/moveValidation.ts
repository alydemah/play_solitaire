import type { Card } from '../types/game.types';
import { VARIANT_CONFIGS } from '../types/variants.types';

const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

/**
 * Validates a move to a foundation pile
 */
export function isValidFoundationMove(card: Card, foundation: Card[]): boolean {
  if (foundation.length === 0) {
    return card.rank === 'A';
  }
  
  const topCard = foundation[foundation.length - 1];
  return card.suit === topCard.suit && 
         RANKS.indexOf(card.rank) === RANKS.indexOf(topCard.rank) + 1;
}

/**
 * Validates a move to a tableau pile
 */
export function isValidTableauMove(card: Card, tableau: Card[]): boolean {
  if (tableau.length === 0) {
    return card.rank === 'K';
  }
  
  const topCard = tableau[tableau.length - 1];
  const isAlternatingColor = (
    (card.suit === 'hearts' || card.suit === 'diamonds') !==
    (topCard.suit === 'hearts' || topCard.suit === 'diamonds')
  );
  
  return isAlternatingColor && 
         RANKS.indexOf(card.rank) === RANKS.indexOf(topCard.rank) - 1;
}