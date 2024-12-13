import { ref, computed } from 'vue';
import type { GameState, GameSettings } from '../types/game.types';
import { VARIANT_CONFIGS } from '../types/variants.types';
import { saveGameState, loadGameState, hasGameState } from '../utils/storageUtils';

export function useGameState() {
  const gameState = ref<GameState>({
    variant: 'klondike',
    deck: [],
    waste: [],
    foundations: [[], [], [], []],
    tableaus: [[], [], [], [], [], [], []],
    freeCells: [],
    score: 0,
    moves: 0,
    time: 0
  });

  const settings = ref<GameSettings>({
    variant: 'klondike',
    difficulty: 'medium',
    drawCount: 1,
    timerEnabled: true,
    soundEnabled: true,
    background: 'bg-green-800'
  });

  const variantConfig = computed(() => VARIANT_CONFIGS[settings.value.variant]);

  const updateSettings = (newSettings: Partial<GameSettings>) => {
    settings.value = { ...settings.value, ...newSettings };
  };

  const saveGame = () => {
    saveGameState(gameState.value, settings.value);
  };

  const loadGame = () => {
    const saved = loadGameState();
    if (saved) {
      gameState.value = saved.gameState;
      settings.value = saved.settings;
      return true;
    }
    return false;
  };

  const checkSavedGame = () => {
    return hasGameState();
  };

  return {
    gameState,
    settings,
    variantConfig,
    updateSettings,
    saveGame,
    loadGame,
    checkSavedGame
  };
}