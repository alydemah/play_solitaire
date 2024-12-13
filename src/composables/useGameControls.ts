import { ref } from 'vue';
import { useGameStore } from '../stores/gameStore';
import { useAutoPlay } from './useAutoPlay';

export function useGameControls() {
  const gameStore = useGameStore();
  const showResetConfirm = ref(false);
  const showSettings = ref(false);
  const { isPlaying, startAutoPlay, stopAutoPlay } = useAutoPlay();

  const handleHint = () => {
    if (!isPlaying.value) {
      gameStore.showNextMove();
    }
  };

  const handleUndo = () => {
    if (!isPlaying.value) {
      gameStore.undoLastMove();
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