import { Howl } from 'howler';
import { useGameStore } from '../stores/gameStore';

export function useSound() {
  const gameStore = useGameStore();

  const moveSound = new Howl({
    src: ['/sounds/card-move.mp3'],
    volume: 0.5
  });

  const errorSound = new Howl({
    src: ['/sounds/error.mp3'],
    volume: 0.3
  });

  const playMoveSound = () => {
    if (gameStore.settings.soundEnabled) {
      moveSound.play();
    }
  };

  const playErrorSound = () => {
    if (gameStore.settings.soundEnabled) {
      errorSound.play();
    }
  };

  return {
    playMoveSound,
    playErrorSound
  };
}