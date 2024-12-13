import { ref, onUnmounted } from 'vue';
import type { Ref } from 'vue';
import { useGameStore } from '../stores/gameStore';

export function useAutoPlay() {
  const gameStore = useGameStore();
  const isPlaying = ref(false);
  const autoPlayInterval: Ref<number | null> = ref(null);
  const moveDelay = 1000; // 1 second between moves
  const maxMoves = 100; // Safety limit to prevent infinite loops
  let moveCount = 0;

  const startAutoPlay = () => {
    if (isPlaying.value) return;
    
    isPlaying.value = true;
    moveCount = 0;

    const makeMove = () => {
      moveCount++;
      if (moveCount > maxMoves || !gameStore.showNextMove()) {
        stopAutoPlay();
      }
    };

    makeMove(); // Make first move immediately
    autoPlayInterval.value = window.setInterval(makeMove, moveDelay);
  };

  const stopAutoPlay = () => {
    if (autoPlayInterval.value) {
      clearInterval(autoPlayInterval.value);
      autoPlayInterval.value = null;
    }
    isPlaying.value = false;
    moveCount = 0;
  };

  // Clean up on component unmount
  onUnmounted(() => {
    stopAutoPlay();
  });

  return {
    isPlaying,
    startAutoPlay,
    stopAutoPlay
  };
}