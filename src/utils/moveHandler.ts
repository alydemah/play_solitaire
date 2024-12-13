import type { Card, GameState, GameMove } from '../types/game.types';
import { isValidFoundationMove, isValidTableauMove } from './moveValidation';

interface MoveResult {
  success: boolean;
  error?: string;
  newState: GameState;
  move?: GameMove;
}

/**
 * Handles moving a card between piles
 */
export function moveCard(
  currentState: GameState,
  source: { type: string; index?: number },
  target: { type: string; index: number }
): MoveResult {
  try {
    const newState = JSON.parse(JSON.stringify(currentState));
    let card: Card | undefined;
    let cards: Card[] = [];
    
    // Get source card(s)
    const sourceCards = getSourceCards(newState, source);
    if (!sourceCards.success) {
      return { 
        success: false, 
        error: sourceCards.error,
        newState: currentState 
      };
    }

    ({ card, cards } = sourceCards);

    // Validate move
    const validationResult = validateMove(cards, target.type, target.index, newState);
    if (!validationResult.success) {
      return {
        success: false,
        error: validationResult.error,
        newState: currentState
      };
    }

    // Execute move
    const previousState = JSON.parse(JSON.stringify(currentState));
    
    // Remove cards from source
    const removeResult = removeCardsFromSource(newState, source, cards.length);
    if (!removeResult.success) {
      return {
        success: false,
        error: removeResult.error,
        newState: currentState
      };
    }

    // Add cards to target
    const addResult = addCardsToTarget(newState, target, cards);
    if (!addResult.success) {
      return {
        success: false,
        error: addResult.error,
        newState: currentState
      };
    }

    const move: GameMove = {
      type: `${source.type}-to-${target.type}`,
      sourceType: source.type,
      sourceIndex: source.index,
      targetType: target.type,
      targetIndex: target.index,
      card: card!,
      previousState
    };

    return { success: true, newState, move };
  } catch (err) {
    console.error('Error processing move:', err);
    return {
      success: false,
      error: 'Internal error processing move',
      newState: currentState
    };
  }
}

// Helper functions...