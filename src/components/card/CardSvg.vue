<script setup lang="ts">
import { computed } from 'vue';
import type { Card } from '../../types/game.types';
import CardPattern from './CardPattern.vue';
import { getDisplayRank, getRankSymbol } from '../../utils/cardPatternUtils';

const props = defineProps<{
  card: Card;
  draggable?: boolean;
}>();

const cardColor = computed(() => 
  props.card.suit === 'hearts' || props.card.suit === 'diamonds' 
    ? 'text-red-600' 
    : 'text-gray-900'
);

const displayRank = computed(() => getDisplayRank(props.card.rank));
const rankSymbol = computed(() => getRankSymbol(props.card.rank));

const cardClasses = computed(() => [
  'card-wrapper relative w-[150px] h-[225px] rounded-lg shadow-md transition-transform',
  props.draggable ? 'cursor-pointer hover:scale-105' : '',
  props.card.faceUp ? 'bg-white' : 'bg-blue-800 pattern-cross'
]);
</script>

<template>
  <div :class="cardClasses">
    <template v-if="card.faceUp">
      <svg viewBox="0 0 150 225" :class="['card-face', cardColor]">
        <!-- Top left rank -->
        <text x="3" y="34" class="text-2xl font-bold">{{ rankSymbol }}</text>
        
        <!-- Card pattern -->
        <CardPattern :suit="card.suit" :rank="card.rank" />
        
        <!-- Bottom right rank -->
        <text x="147" y="220" class="text-2xl font-bold text-right card-face__pip_botright">
          {{ displayRank }}
        </text>
      </svg>
    </template>
    <div v-else class="card-back h-full w-full">
      <div class="h-full w-full bg-blue-800 pattern-cross rounded-lg border-2 border-white/10">
        <!-- Card back design -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-face {
  width: 100%;
  height: 100%;
}

.pattern-cross {
  background-image: repeating-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.1) 0px,
    rgba(255, 255, 255, 0.1) 2px,
    transparent 2px,
    transparent 4px
  );
}

.card-face__pip_botright {
  transform-origin: right;
}
</style>