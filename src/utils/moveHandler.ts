import type { GameState, Card } from '../types/game.types';
import { isValidFoundationMove, isValidTableauMove } from './moveValidation';
import { cloneDeep } from 'lodash';

export const getSourceCards = (
  gameState: GameState, 
  source: { type: string; index?: number }
): Card[] => {
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

export const moveCard = (
  gameState: GameState,
  source: { type: string; index?: number },
  target: { type: string; index: number }
): { success: boolean; newState?: GameState; move?: any } => {
  try {
    const sourceCards = getSourceCards(gameState, source);
    if (!sourceCards.length) return { success: false };

    const newState = cloneDeep(gameState);
    let success = false;

    switch (target.type) {
      case 'foundation':
        success = handleFoundationMove(newState, source, target, sourceCards[0]);
        break;
      case 'tableau':
        success = handleTableauMove(newState, source, target, sourceCards);
        break;
    }

    if (success) {
      return {
        success: true,
        newState,
        move: {
          sourceType: source.type,
          sourceIndex: source.index,
          targetType: target.type,
          targetIndex: target.index,
          card: sourceCards[0],
          previousState: gameState
        }
      };
    }

    return { success: false };
  } catch (err) {
    console.error('Error processing move:', err);
    return { success: false };
  }
};

const handleFoundationMove = (
  state: GameState,
  source: { type: string; index?: number },
  target: { type: string; index: number },
  card: Card
): boolean => {
  const foundation = state.foundations[target.index];
  
  if (!isValidFoundationMove(card, foundation)) {
    console.log('Invalid foundation move');
    return false;
  }

  switch (source.type) {
    case 'waste':
      state.waste.pop();
      break;
    case 'tableau':
      if (typeof source.index === 'number') {
        state.tableaus[source.index].pop();
        const tableau = state.tableaus[source.index];
        if (tableau.length && !tableau[tableau.length - 1].faceUp) {
          tableau[tableau.length - 1].faceUp = true;
        }
      }
      break;
  }

  state.foundations[target.index].push(card);
  return true;
};

const handleTableauMove = (
  state: GameState,
  source: { type: string; index?: number },
  target: { type: string; index: number },
  cards: Card[]
): boolean => {
  const tableau = state.tableaus[target.index];
  
  if (!isValidTableauMove(cards[0], tableau)) {
    return false;
  }

  switch (source.type) {
    case 'waste':
      state.waste.pop();
      break;
    case 'tableau':
      if (typeof source.index === 'number') {
        const sourceTableau = state.tableaus[source.index];
        state.tableaus[source.index] = sourceTableau.slice(0, -cards.length);
        if (state.tableaus[source.index].length && 
            !state.tableaus[source.index][state.tableaus[source.index].length - 1].faceUp) {
          state.tableaus[source.index][state.tableaus[source.index].length - 1].faceUp = true;
        }
      }
      break;
    case 'foundation':
      if (typeof source.index === 'number') {
        state.foundations[source.index].pop();
      }
      break;
  }

  state.tableaus[target.index].push(...cards);
  return true;
};