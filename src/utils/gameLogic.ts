import type { Card, GameState } from '../types/game.types';
import { isValidFoundationMove, isValidTableauMove } from './moveValidation';

export interface NextMove {
  sourceType: string;
  sourceIndex?: number;
  targetType: string;
  targetIndex: number;
  card: Card;
}

export const findNextMove = (gameState: GameState): NextMove | null => {
  // Check waste to foundation
  const wasteMove = findWasteToFoundationMove(gameState);
  if (wasteMove) return wasteMove;

  // Check tableau to foundation
  const tableauMove = findTableauToFoundationMove(gameState);
  if (tableauMove) return tableauMove;

  // Check tableau to tableau
  const tableauToTableauMove = findTableauToTableauMove(gameState);
  if (tableauToTableauMove) return tableauToTableauMove;

  return null;
};

const findWasteToFoundationMove = (gameState: GameState): NextMove | null => {
  if (!gameState.waste.length) return null;
  const card = gameState.waste[gameState.waste.length - 1];

  for (let i = 0; i < gameState.foundations.length; i++) {
    if (isValidFoundationMove(card, gameState.foundations[i])) {
      return {
        sourceType: 'waste',
        targetType: 'foundation',
        targetIndex: i,
        card
      };
    }
  }
  return null;
};

const findTableauToFoundationMove = (gameState: GameState): NextMove | null => {
  for (let i = 0; i < gameState.tableaus.length; i++) {
    const tableau = gameState.tableaus[i];
    if (!tableau.length) continue;

    const card = tableau[tableau.length - 1];
    if (!card.faceUp) continue;

    for (let j = 0; j < gameState.foundations.length; j++) {
      if (isValidFoundationMove(card, gameState.foundations[j])) {
        return {
          sourceType: 'tableau',
          sourceIndex: i,
          targetType: 'foundation',
          targetIndex: j,
          card
        };
      }
    }
  }
  return null;
};

const findTableauToTableauMove = (gameState: GameState): NextMove | null => {
  for (let i = 0; i < gameState.tableaus.length; i++) {
    const sourceTableau = gameState.tableaus[i];
    if (!sourceTableau.length) continue;

    const faceUpIndex = sourceTableau.findIndex(card => card.faceUp);
    if (faceUpIndex === -1) continue;

    const card = sourceTableau[faceUpIndex];

    for (let j = 0; j < gameState.tableaus.length; j++) {
      if (i === j) continue;
      const targetTableau = gameState.tableaus[j];

      if (isValidTableauMove(card, targetTableau)) {
        return {
          sourceType: 'tableau',
          sourceIndex: i,
          targetType: 'tableau',
          targetIndex: j,
          card
        };
      }
    }
  }
  return null;
};