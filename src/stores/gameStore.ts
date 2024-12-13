import { defineStore } from 'pinia';
import { useGameState } from '../composables/useGameState';
import { useMoveHistory } from '../composables/useMoveHistory';
import { createDeck, shuffleDeck } from '../utils/cardUtils';
import { findNextMove } from '../utils/gameLogic';
import { moveCard } from '../utils/moveHandler';

export const useGameStore = defineStore('game', () => {
  const { 
    gameState, 
    settings, 
    variantConfig,
    updateSettings,
    saveGame,
    loadGame,
    hasGameState,
    checkSavedGame
  } = useGameState();

  const {
    currentMove,
    nextMove,
    moveHistory,
    addMove,
    undoLastMove,
    clearHistory
  } = useMoveHistory();

  const initializeGame = () => {
    const config = variantConfig.value;
    const deck = shuffleDeck(createDeck(config.deckCount));
    
    gameState.value = {
      variant: settings.value.variant,
      deck,
      waste: [],
      foundations: Array(config.foundationCount).fill([]).map(() => []),
      tableaus: Array(config.tableauCount).fill([]).map((_, i) => 
        deck.splice(0, config.initialTableauCards[i]).map((card, j, arr) => ({
          ...card,
          faceUp: j === arr.length - 1 || config.rules.allFaceUp
        }))
      ),
      freeCells: config.hasFreeCells ? [] : undefined,
      score: 0,
      moves: 0,
      time: 0
    };

    clearHistory();
    nextMove.value = findNextMove(gameState.value);
    saveGame();
  };

  const handleMove = (source: { type: string; index?: number }, target: { type: string; index: number }): boolean => {
    try {
      const result = moveCard(gameState.value, source, target);
      if (result.success && result.move) {
        addMove(result.move);
        gameState.value = result.newState;
        nextMove.value = findNextMove(gameState.value);
        saveGame();
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error processing move:', err);
      return false;
    }
  };

  const showNextMove = (): boolean => {
    if (!nextMove.value) return false;
    return handleMove(
      { type: nextMove.value.sourceType, index: nextMove.value.sourceIndex },
      { type: nextMove.value.targetType, index: nextMove.value.targetIndex }
    );
  };

  return {
    gameState,
    settings,
    variantConfig,
    updateSettings,
    saveGame,
    loadGame,
    hasGameState,
    initializeGame,
    handleMove,
    showNextMove,
    undoLastMove,
    currentMove,
    nextMove,
    moveHistory
  };
});