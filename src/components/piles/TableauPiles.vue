<script setup lang="ts">
import type { Card } from '../../types/game.types';
import CardComponent from '../Card.vue';
import { useGameStore } from '../../stores/gameStore';
import { handlePileDrop } from '../../utils/dragDropHandlers';

const props = defineProps<{
  tableaus: Card[][];
}>();

const gameStore = useGameStore();

const handleDrop = async (e: DragEvent, tableauIndex: number) => {
  e.preventDefault();
  if (!e.dataTransfer) return;

  try {
    const result = await handlePileDrop(e, 'tableau', tableauIndex, gameStore);
    if (!result.success) {
      console.log('Invalid tableau move:', result.error);
    }
  } catch (err) {
    console.error('Error processing tableau drop:', err);
  }
};

const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = 'move';
  }
};
</script>

<template>
  <div class="tableaus grid grid-cols-7 gap-4">
    <div 
      v-for="(tableau, index) in tableaus" 
      :key="index"
      class="tableau-pile"
      @drop="(e) => handleDrop(e, index)"
      @dragover="handleDragOver"
    >
      <div class="relative min-h-[225px]">
        <TransitionGroup 
          name="card-move"
          tag="div"
          class="relative"
        >
          <div 
            v-for="(card, cardIndex) in tableau" 
            :key="card.id"
            :style="{ top: `${cardIndex * 30}px` }"
            class="absolute w-[150px]"
          >
            <CardComponent 
              :card="card"
              :draggable="card.faceUp"
              pile-type="tableau"
              :pile-index="index"
              :card-index="cardIndex"
            />
          </div>
        </TransitionGroup>
      </div>
      <div 
        v-if="!tableau.length" 
        class="w-[150px] h-[225px] rounded-lg border-2 border-white/20 border-dashed"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.tableau-pile {
  min-height: 400px;
  position: relative;
}

.card-move-move {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-move-enter-active,
.card-move-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-move-enter-from,
.card-move-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.card-move-leave-active {
  position: absolute;
}
</style>