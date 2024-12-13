import { ref } from 'vue';
import type { GameMove } from '../types/game.types';

export const useMoveHistory = () => {
  const currentMove = ref<GameMove | null>(null);
  const nextMove = ref<GameMove | null>(null);
  const moveHistory = ref<GameMove[]>([]);

  const addMove = (move: GameMove) => {
    currentMove.value = move;
    moveHistory.value.push(move);
  };

  const undoLastMove = () => {
    const lastMove = moveHistory.value.pop();
    if (lastMove) {
      currentMove.value = moveHistory.value[moveHistory.value.length - 1] || null;
      return lastMove;
    }
    return null;
  };

  const clearHistory = () => {
    currentMove.value = null;
    nextMove.value = null;
    moveHistory.value = [];
  };

  return {
    currentMove,
    nextMove,
    moveHistory,
    addMove,
    undoLastMove,
    clearHistory
  };
};