import type { GameState, GameSettings } from '../types/game.types';

const STORAGE_KEY = 'solitaire-save';

interface SavedGameData {
  gameState: GameState;
  settings: GameSettings;
  timestamp: string;
}

export const saveGameState = (gameState: GameState, settings: GameSettings): void => {
  try {
    const data: SavedGameData = {
      gameState,
      settings,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Error saving game state:', err);
  }
};

export const loadGameState = (): SavedGameData | null => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) return null;
    return JSON.parse(savedData);
  } catch (err) {
    console.error('Error loading game state:', err);
    return null;
  }
};

export const hasGameState = (): boolean => {
  return localStorage.getItem(STORAGE_KEY) !== null;
};

export const clearGameState = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};