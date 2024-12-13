<script setup lang="ts">
import { ref } from 'vue';
import type { Card } from '../types/game.types';
import CardSvg from './card/CardSvg.vue';
import { useGameStore } from '../stores/gameStore';

const props = defineProps<{
  card: Card;
  draggable?: boolean;
  pileType: 'tableau' | 'foundation' | 'waste';
  pileIndex?: number;
}>();

const gameStore = useGameStore();
const isDragging = ref(false);

const handleDragStart = (e: DragEvent) => {
  if (!props.draggable || !e.dataTransfer) return;
  
  isDragging.value = true;
  e.dataTransfer.effectAllowed = 'move';
  
  const dragData = {
    cardId: props.card.id,
    sourceType: props.pileType,
    sourceIndex: props.pileIndex,
    card: props.card
  };

  try {
    e.dataTransfer.setData('application/json', JSON.stringify(dragData));
  } catch (err) {
    console.error('Error setting drag data:', err);
  }
};

const handleDragEnd = () => {
  isDragging.value = false;
};
</script>

<template>
  <div
    :draggable="draggable"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
    :class="[
      'card-wrapper relative',
      { 'opacity-50': isDragging },
      draggable ? 'cursor-pointer hover:scale-105' : ''
    ]"
  >
    <CardSvg :card="card" :draggable="draggable" />
  </div>
</template>