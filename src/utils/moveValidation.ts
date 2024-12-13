import type { Card, GameState } from '../types/game.types';
import type { VariantConfig } from '../types/variants.types';
import { VARIANT_CONFIGS } from '../types/variants.types';

const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export const isValidMoveForVariant = (
  gameState: GameState,
  source: { type: string; index?: number },
  target: { type: string; index: number },
  variantConfig: VariantConfig
): boolean => {
  switch (gameState.variant) {
    case 'klondike':
      return isValidKlondikeMove(gameState, source, target, variantConfig.rules);
    case 'spider':
      return isValidSpiderMove(gameState, source, target, variantConfig.rules);
    case 'freecell':
      return isValidFreeCellMove(gameState, source, target, variantConfig.rules);
    case 'pyramid':
      return isValidPyramidMove(gameState, source, target, variantConfig.rules);
    default:
      return false;
  }
};

export const isValidFoundationMove = (card: Card, foundation: Card[]): boolean => {
  if (foundation.length === 0) {
    return card.rank === 'A';
  }
  
  const topCard = foundation[foundation.length - 1];
  return card.suit === topCard.suit && 
         RANKS.indexOf(card.rank) === RANKS.indexOf(topCard.rank) + 1;
};

export const isValidTableauMove = (card: Card, tableau: Card[]): boolean => {
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
};

const isValidKlondikeMove = (
  gameState: GameState,
  source: { type: string; index?: number },
  target: { type: string; index: number },
  rules: any
): boolean => {
  const sourceCards = getSourceCards(gameState, source);
  if (!sourceCards.length) return false;

  switch (target.type) {
    case 'foundation':
      return isValidFoundationMove(sourceCards[0], gameState.foundations[target.index]);
    case 'tableau':
      return isValidTableauMove(sourceCards[0], gameState.tableaus[target.index]);
    default:
      return false;
  }
};

const isValidSpiderMove = (
  gameState: GameState,
  source: { type: string; index?: number },
  target: { type: string; index: number },
  rules: any
): boolean => {
  const sourceCards = getSourceCards(gameState, source);
  if (!sourceCards.length) return false;

  if (target.type !== 'tableau') return false;

  const targetTableau = gameState.tableaus[target.index];
  if (targetTableau.length === 0) return true;

  const [firstCard] = sourceCards;
  const topCard = targetTableau[targetTableau.length - 1];

  return firstCard.suit === topCard.suit &&
         RANKS.indexOf(firstCard.rank) === RANKS.indexOf(topCard.rank) - 1;
};

const isValidFreeCellMove = (
  gameState: GameState,
  source: { type: string; index?: number },
  target: { type: string; index: number },
  rules: any
): boolean => {
  const sourceCards = getSourceCards(gameState, source);
  if (!sourceCards.length) return false;

  switch (target.type) {
    case 'foundation':
      return isValidFoundationMove(sourceCards[0], gameState.foundations[target.index]);
    case 'tableau':
      return isValidTableauMove(sourceCards[0], gameState.tableaus[target.index]);
    case 'freecell':
      return gameState.freeCells?.[target.index] === undefined;
    default:
      return false;
  }
};

const isValidPyramidMove = (
  gameState: GameState,
  source: { type: string; index?: number },
  target: { type: string; index: number },
  rules: any
): boolean => {
  const sourceCards = getSourceCards(gameState, source);
  if (!sourceCards.length) return false;

  const sourceCard = sourceCards[0];
  const targetCards = getSourceCards(gameState, { type: target.type, index: target.index });
  if (!targetCards.length) return false;

  const targetCard = targetCards[0];
  const sum = getCardValue(sourceCard) + getCardValue(targetCard);
  return sum === 13;
};

const getCardValue = (card: Card): number => {
  const valueMap: Record<string, number> = {
    'A': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
    '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13
  };
  return valueMap[card.rank];
};

const getSourceCards = (gameState: GameState, source: { type: string; index?: number }): Card[] => {
  switch (source.type) {
    case 'waste':
      return gameState.waste.length ? [gameState.waste[gameState.waste.length - 1]] : [];
    case 'tableau':
      if (typeof source.index === 'number') {
        const tableau = gameState.tableaus[source.index];
        const faceUpIndex = tableau.findIndex(card => card.faceUp);
        if (faceUpIndex === -1) return [];
        return tableau.slice(faceUpIndex);
      }
      return [];
    case 'foundation':
      if (typeof source.index === 'number' && gameState.foundations[source.index].length) {
        return [gameState.foundations[source.index][gameState.foundations[source.index].length - 1]];
      }
      return [];
    default:
      return [];
  }
};