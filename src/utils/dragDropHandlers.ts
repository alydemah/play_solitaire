import type { DragEvent } from 'vue';
import type { Card } from '../types/game.types';
import { useGameStore } from '../stores/gameStore';

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

/**
 * Handles dropping a card onto a pile
 * @param e - Drag event
 * @param targetType - Type of target pile
 * @param targetIndex - Index of target pile
 * @param store - Game store instance
 */
export async function handlePileDrop(
  e: DragEvent, 
  targetType: string, 
  targetIndex: number,
  store: ReturnType<typeof useGameStore>
): Promise<DragDropResult> {
  try {
    if (!e.dataTransfer) {
      return { success: false, error: 'No data transfer available' };
    }

    const rawData = e.dataTransfer.getData('application/json');
    if (!rawData) {
      return { success: false, error: 'No drag data available' };
    }

    const data = JSON.parse(rawData) as DragData;
    if (!isValidDragData(data)) {
      return { success: false, error: 'Invalid drag data format' };
    }

    const success = store.handleMove(
      { 
        type: data.sourceType, 
        index: data.sourceIndex
      },
      { type: targetType, index: targetIndex }
    );

    return {
      success,
      error: success ? undefined : 'Invalid move'
    };
  } catch (err) {
    console.error('Error processing drop:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error'
    };
  }
}

/**
 * Validates drag data structure
 */
function isValidDragData(data: any): data is DragData {
  return (
    typeof data === 'object' &&
    typeof data.sourceType === 'string' &&
    typeof data.cardId === 'string' &&
    typeof data.card === 'object'
  );
}