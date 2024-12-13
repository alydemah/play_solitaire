import type { DragEvent } from 'vue';
import type { Card } from '../types/game.types';
import type { GameStore } from '../stores/gameStore';

interface DragData {
  sourceType: string;
  sourceIndex?: number;
  cardId: string;
  card: Card;
}

interface DragDropResult {
  success: boolean;
  error?: string;
}

export const handlePileDrop = async (
  e: DragEvent, 
  targetType: string, 
  targetIndex: number, 
  gameStore: GameStore
): Promise<{ success: boolean; error?: string }> => {
  try {
    const data = e.dataTransfer?.getData('text/plain');
    if (!data) return { success: false, error: 'No drag data' };

    const { sourceType, sourceIndex, cardId } = JSON.parse(data);
    
    const success = gameStore.handleMove(
      { type: sourceType, index: sourceIndex },
      { type: targetType, index: targetIndex }
    );

    return { success };
  } catch (err) {
    console.error('Error handling drop:', err);
    return { success: false, error: 'Drop handling error' };
  }
};

export const isValidDragData = (data: any): data is DragData => {
  return (
    typeof data === 'object' &&
    typeof data.sourceType === 'string' &&
    typeof data.cardId === 'string' &&
    typeof data.card === 'object'
  );
};

export const handleDragStart = (
  e: DragEvent, 
  sourceType: string, 
  sourceIndex: number, 
  cardId: string
): void => {
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', JSON.stringify({
      sourceType,
      sourceIndex,
      cardId
    }));
  }
};

export const handleDragOver = (e: DragEvent): void => {
  e.preventDefault();
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = 'move';
  }
};