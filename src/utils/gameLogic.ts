import type { Card, GameState } from '../types/game.types';
import { isValidFoundationMove, isValidTableauMove } from './moveValidation';

export interface NextMove {
  sourceType: string;
  sourceIndex?: number;
  targetType: string;
  targetIndex: number;
  card: Card;
}

export function findNextMove(gameState: GameState): NextMove | null {
  // Check waste to foundation moves
  if (gameState.waste.length > 0) {
    const wasteCard = gameState.waste[gameState.waste.length - 1];
    for (let i = 0; i < gameState.foundations.length; i++) {
      if (isValidFoundationMove(wasteCard, gameState.foundations[i])) {
        return {
          sourceType: 'waste',
          targetType: 'foundation',
          targetIndex: i,
          card: wasteCard
        };
      }
    }
  }

  // Check tableau to foundation moves
  for (let i = 0; i < gameState.tableaus.length; i++) {
    const tableau = gameState.tableaus[i];
    if (tableau.length > 0) {
      const tableauCard = tableau[tableau.length - 1];
      if (tableauCard.faceUp) {
        for (let j = 0; j < gameState.foundations.length; j++) {
          if (isValidFoundationMove(tableauCard, gameState.foundations[j])) {
            return {
              sourceType: 'tableau',
              sourceIndex: i,
              targetType: 'foundation',
              targetIndex: j,
              card: tableauCard
            };
          }
        }
      }
    }
  }

  // Check tableau to tableau moves
  for (let i = 0; i < gameState.tableaus.length; i++) {
    const sourceTableau = gameState.tableaus[i];
    if (sourceTableau.length === 0) continue;

    const faceUpIndex = sourceTableau.findIndex(card => card.faceUp);
    if (faceUpIndex === -1) continue;

    const movableCards = sourceTableau.slice(faceUpIndex);
    const [firstCard] = movableCards;

    for (let j = 0; j < gameState.tableaus.length; j++) {
      if (i === j) continue;
      const targetTableau = gameState.tableaus[j];
      
      if (isValidTableauMove(firstCard, targetTableau)) {
        return {
          sourceType: 'tableau',
          sourceIndex: i,
          targetType: 'tableau',
          targetIndex: j,
          card: firstCard
        };
      }
    }
  }

  return null;
}