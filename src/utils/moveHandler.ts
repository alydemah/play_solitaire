import type { Card, GameState, GameMove } from '../types/game.types';
import { isValidFoundationMove, isValidTableauMove } from './moveValidation';

interface MoveResult {
  success: boolean;
  newState: GameState;
  move?: GameMove;
  error?: string;
}

interface SourceCardsResult {
  success: boolean;
  cards: Card[];
  error?: string;
}

/**
 * Gets cards from source pile
 */
function getSourceCards(state: GameState, source: { type: string; index?: number }): SourceCardsResult {
  if (source.type === 'waste') {
    if (state.waste.length === 0) {
      return { success: false, cards: [], error: 'No cards in waste pile' };
    }
    return { success: true, cards: [state.waste[state.waste.length - 1]] };
  }
  
  if (source.type === 'tableau' && source.index !== undefined) {
    const tableau = state.tableaus[source.index];
    if (tableau.length === 0) {
      return { success: false, cards: [], error: 'Empty tableau pile' };
    }
    
    const faceUpIndex = tableau.findIndex(card => card.faceUp);
    if (faceUpIndex === -1) {
      return { success: false, cards: [], error: 'No face-up cards' };
    }
    
    return { success: true, cards: tableau.slice(faceUpIndex) };
  }
  
  return { success: false, cards: [], error: 'Invalid source type' };
}

/**
 * Validates move based on game rules
 */
function validateMove(
  cards: Card[], 
  targetType: string, 
  targetIndex: number, 
  state: GameState
): { success: boolean; error?: string } {
  const [firstCard] = cards;
  
  if (targetType === 'foundation') {
    if (cards.length !== 1) {
      return { success: false, error: 'Can only move one card to foundation' };
    }
    return { 
      success: isValidFoundationMove(firstCard, state.foundations[targetIndex]),
      error: 'Invalid foundation move'
    };
  }
  
  if (targetType === 'tableau') {
    return { 
      success: isValidTableauMove(firstCard, state.tableaus[targetIndex]),
      error: 'Invalid tableau move'
    };
  }
  
  return { success: false, error: 'Invalid target type' };
}

/**
 * Removes cards from source pile
 */
function removeCardsFromSource(
  state: GameState,
  source: { type: string; index?: number },
  count: number
): { success: boolean; error?: string } {
  try {
    if (source.type === 'waste') {
      state.waste.pop();
    } else if (source.type === 'tableau' && source.index !== undefined) {
      const tableau = state.tableaus[source.index];
      state.tableaus[source.index] = tableau.slice(0, tableau.length - count);
      
      // Flip new top card if needed
      if (state.tableaus[source.index].length > 0) {
        const topCard = state.tableaus[source.index][state.tableaus[source.index].length - 1];
        if (!topCard.faceUp) {
          topCard.faceUp = true;
        }
      }
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: 'Error removing cards' };
  }
}

/**
 * Adds cards to target pile
 */
function addCardsToTarget(
  state: GameState,
  target: { type: string; index: number },
  cards: Card[]
): { success: boolean; error?: string } {
  try {
    if (target.type === 'foundation') {
      state.foundations[target.index].push(...cards);
    } else if (target.type === 'tableau') {
      state.tableaus[target.index].push(...cards);
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: 'Error adding cards' };
  }
}

/**
 * Main function to handle card movement
 */
export function moveCard(
  currentState: GameState,
  source: { type: string; index?: number },
  target: { type: string; index: number }
): MoveResult {
  const newState = JSON.parse(JSON.stringify(currentState));
  
  // Get source cards
  const sourceResult = getSourceCards(newState, source);
  if (!sourceResult.success) {
    return { success: false, newState, error: sourceResult.error };
  }

  // Validate move
  const validationResult = validateMove(sourceResult.cards, target.type, target.index, newState);
  if (!validationResult.success) {
    return { success: false, newState, error: validationResult.error };
  }

  // Store previous state for undo
  const previousState = JSON.parse(JSON.stringify(currentState));

  // Remove cards from source
  const removeResult = removeCardsFromSource(newState, source, sourceResult.cards.length);
  if (!removeResult.success) {
    return { success: false, newState, error: removeResult.error };
  }

  // Add cards to target
  const addResult = addCardsToTarget(newState, target, sourceResult.cards);
  if (!addResult.success) {
    return { success: false, newState, error: addResult.error };
  }

  // Create move record
  const move: GameMove = {
    type: `${source.type}-to-${target.type}`,
    sourceType: source.type,
    sourceIndex: source.index,
    targetType: target.type,
    targetIndex: target.index,
    card: sourceResult.cards[0],
    previousState
  };

  return { success: true, newState, move };
}