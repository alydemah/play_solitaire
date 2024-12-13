import { ref, computed } from "vue";
import type { GameState, GameSettings } from "../types/game.types";
import { VARIANT_CONFIGS } from "../types/variants.types";
import { GameFactory } from "../gameLogic/GameFactory";
import {
  saveGameState,
  loadGameState,
  hasGameState as checkStoredGame,
} from "../utils/storageUtils";

const DEFAULT_SETTINGS: GameSettings = {
  variant: "klondike",
  difficulty: "medium",
  drawCount: 1,
  timerEnabled: true,
  soundEnabled: true,
  background: "bg-green-800",
};

export function useGameState() {
  const gameState = ref<GameState>({
    variant: DEFAULT_SETTINGS.variant,
    deck: [],
    waste: [],
    foundations: [[], [], [], []],
    tableaus: [[], [], [], [], [], [], []],
    freeCells: [],
    score: 0,
    moves: 0,
    time: 0,
  });

  const settings = ref<GameSettings>(DEFAULT_SETTINGS);
  const variantConfig = computed(() => VARIANT_CONFIGS[settings.value.variant]);
  const currentGame = computed(() =>
    GameFactory.createGame(settings.value.variant, gameState.value)
  );

  const updateSettings = (newSettings: Partial<GameSettings>) => {
    settings.value = { ...settings.value, ...newSettings };
    saveGameState(gameState.value, settings.value);
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

  const hasGameState = () => {
    return checkStoredGame();
  };

  return {
    gameState,
    settings,
    variantConfig,
    currentGame,
    updateSettings,
    saveGame,
    loadGame,
    hasGameState,
  };
}
