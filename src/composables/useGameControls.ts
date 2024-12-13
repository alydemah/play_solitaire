import { ref } from 'vue';
import { useGameStore } from '../stores/gameStore';
import { useAutoPlay } from './useAutoPlay';
import { useSound } from './useSound';

export function useGameControls() {
  const gameStore = useGameStore();
  const showResetConfirm = ref(false);
  const showSettings = ref(false);
  const { isPlaying, startAutoPlay, stopAutoPlay } = useAutoPlay();
  const { playMoveSound, playErrorSound } = useSound();

  const handleHint = () => {
    if (!isPlaying.value) {
      const success = gameStore.showNextMove();
      if (success) {
        playMoveSound();
      } else {
        playErrorSound();
      }
    }
  };

  const handleUndo = () => {
    if (!isPlaying.value) {
      const success = gameStore.undoLastMove();
      if (success) {
        playMoveSound();
      }
    }
  };

  const handleReset = () => {
    stopAutoPlay();
    showResetConfirm.value = true;
  };

  const confirmReset = () => {
    gameStore.initializeGame();
    showResetConfirm.value = false;
  };

  const cancelReset = () => {
    showResetConfirm.value = false;
  };

  const toggleSettings = () => {
    showSettings.value = !showSettings.value;
  };

  return {
    showResetConfirm,
    showSettings,
    isPlaying,
    handleHint,
    handleUndo,
    handleReset,
    confirmReset,
    cancelReset,
    toggleSettings,
    startAutoPlay,
    stopAutoPlay
  };
}