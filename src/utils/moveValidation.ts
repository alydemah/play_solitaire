import type { Card, GameState } from '../types/game.types';
import { VARIANT_CONFIGS } from '../types/variants.types';

const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export function isValidFoundationMove(card: Card, foundation: Card[]): boolean {
  if (foundation.length === 0) {
    return card.rank === 'A';
  }
  
  const topCard = foundation[foundation.length - 1];
  return card.suit === topCard.suit && 
         RANKS.indexOf(card.rank) === RANKS.indexOf(topCard.rank) + 1;
}

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

export function isValidMove(card: Card, targetPile: Card[], gameState: GameState): boolean {
  const config = VARIANT_CONFIGS[gameState.variant];
  
  switch (gameState.variant) {
    case 'klondike':
      return isValidKlondikeMove(card, targetPile, config.rules);
    case 'spider':
      return isValidSpiderMove(card, targetPile, config.rules);
    case 'freecell':
      return isValidFreeCellMove(card, targetPile, config.rules);
    default:
      return false;
  }
}

function isValidKlondikeMove(card: Card, targetPile: Card[], rules: any): boolean {
  if (targetPile.length === 0) {
    return rules.allowKingOnly ? card.rank === 'K' : true;
  }
  
  const topCard = targetPile[targetPile.length - 1];
  const isAlternatingColor = (
    (card.suit === 'hearts' || card.suit === 'diamonds') !==
    (topCard.suit === 'hearts' || topCard.suit === 'diamonds')
  );
  
  return rules.requireAlternateColors ? 
    (isAlternatingColor && RANKS.indexOf(card.rank) === RANKS.indexOf(topCard.rank) - 1) :
    RANKS.indexOf(card.rank) === RANKS.indexOf(topCard.rank) - 1;
}

function isValidSpiderMove(card: Card, targetPile: Card[], rules: any): boolean {
  if (targetPile.length === 0) return true;
  
  const topCard = targetPile[targetPile.length - 1];
  return rules.requireSameSuit ?
    (card.suit === topCard.suit && RANKS.indexOf(card.rank) === RANKS.indexOf(topCard.rank) - 1) :
    RANKS.indexOf(card.rank) === RANKS.indexOf(topCard.rank) - 1;
}

function isValidFreeCellMove(card: Card, targetPile: Card[], rules: any): boolean {
  if (targetPile.length === 0) return true;
  
  const topCard = targetPile[targetPile.length - 1];
  const isAlternatingColor = (
    (card.suit === 'hearts' || card.suit === 'diamonds') !==
    (topCard.suit === 'hearts' || topCard.suit === 'diamonds')
  );
  
  return isAlternatingColor && RANKS.indexOf(card.rank) === RANKS.indexOf(topCard.rank) - 1;
}