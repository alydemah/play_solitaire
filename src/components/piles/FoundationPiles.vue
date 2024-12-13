<script setup lang="ts">
import type { Card } from '../../types/game.types';
import CardComponent from '../Card.vue';
import { useGameStore } from '../../stores/gameStore';
import { handlePileDrop } from '../../utils/dragDropHandlers';

const props = defineProps<{
  foundations: Card[][];
}>();

const gameStore = useGameStore();

const handleDrop = async (e: DragEvent, foundationIndex: number) => {
  e.preventDefault();
  if (!e.dataTransfer) return;

  try {
    const result = await handlePileDrop(e, 'foundation', foundationIndex, gameStore);
    if (!result.success) {
      console.log('Invalid foundation move:', result.error);
    }
  } catch (err) {
    console.error('Error processing foundation drop:', err);
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
  <div class="foundations flex space-x-4">
    <div 
      v-for="(foundation, index) in foundations" 
      :key="index"
      class="foundation-pile relative"
      @drop="(e) => handleDrop(e, index)"
      @dragover="handleDragOver"
    >
      <TransitionGroup 
        name="card-stack"
        tag="div"
        class="relative"
      >
        <div v-if="foundation.length" class="relative" :key="foundation[foundation.length - 1].id">
          <CardComponent 
            :card="foundation[foundation.length - 1]"
            :draggable="false"
            pile-type="foundation"
            :pile-index="index"
          />
        </div>
      </TransitionGroup>
      <div 
        v-if="!foundation.length" 
        class="w-[150px] h-[225px] rounded-lg border-2 border-white/20 border-dashed"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.card-stack-move {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-stack-enter-active,
.card-stack-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-stack-enter-from {
  opacity: 0;
  transform: translateY(-30px) scale(0.9);
}

.card-stack-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.9);
}

.card-stack-leave-active {
  position: absolute;
}
</style>