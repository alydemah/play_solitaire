import { defineStore } from "pinia";
import { ref } from "vue";
import { useGameState } from "../composables/useGameState";
import { useMoveHistory } from "../composables/useMoveHistory";
import { createDeck, shuffleDeck } from "../utils/cardUtils";

export const useGameStore = defineStore("game", () => {
  const {
    gameState,
    settings,
    variantConfig,
    currentGame,
    updateSettings,
    saveGame,
    loadGame,
    hasGameState,
  } = useGameState();

  const {
    currentMove,
    nextMove,
    moveHistory,
    addMove,
    undoLastMove,
    clearHistory,
  } = useMoveHistory();

  function initializeGame() {
    const config = variantConfig.value;
    const deck = shuffleDeck(createDeck());

    gameState.value = {
      variant: settings.value.variant,
      deck,
      waste: [],
      foundations: Array(config.foundationCount)
        .fill([])
        .map(() => []),
      tableaus: Array(config.tableauCount)
        .fill([])
        .map((_, i) =>
          deck.splice(0, config.initialTableauCards[i]).map((card, j, arr) => ({
            ...card,
            faceUp: j === arr.length - 1 || config.rules.allFaceUp,
          }))
        ),
      freeCells: config.hasFreeCells ? [] : undefined,
      score: 0,
      moves: 0,
      time: 0,
    };

    clearHistory();
    nextMove.value = currentGame.value.findNextMove();
    saveGame();
  }

  function handleMove(
    source: { type: string; index?: number },
    target: { type: string; index: number }
  ): boolean {
    try {
      if (!currentGame.value.validateMove(source, target)) {
        return false;
      }

      // Execute move using current game variant's logic
      const result = currentGame.value.executeMove(source, target);
      if (result.success && result.move) {
        addMove(result.move);
        gameState.value = result.newState;
        nextMove.value = currentGame.value.findNextMove();
        saveGame();
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error processing move:", err);
      return false;
    }
  }

  function showNextMove(): boolean {
    if (!nextMove.value) return false;
    return handleMove(
      { type: nextMove.value.sourceType, index: nextMove.value.sourceIndex },
      { type: nextMove.value.targetType, index: nextMove.value.targetIndex }
    );
  }

  return {
    gameState,
    settings,
    currentMove,
    nextMove,
    initializeGame,
    updateSettings,
    handleMove,
    showNextMove,
    undoLastMove,
    loadGame,
    hasGameState,
  };
});
