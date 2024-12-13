import type { GameState, GameSettings } from '../types/game.types';

const STORAGE_KEY = 'solitaire-save';

interface SavedGameData {
  gameState: GameState;
  settings: GameSettings;
  timestamp: string;
}

export function saveGameState(gameState: GameState, settings: GameSettings): void {
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
}

export function loadGameState(): SavedGameData | null {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) return null;
    return JSON.parse(savedData);
  } catch (err) {
    console.error('Error loading game state:', err);
    return null;
  }
}

export function hasGameState(): boolean {
  return localStorage.getItem(STORAGE_KEY) !== null;
}

export function clearGameState(): void {
  localStorage.removeItem(STORAGE_KEY);
}