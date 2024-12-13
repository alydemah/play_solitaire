<script setup lang="ts">
import type { Suit, Rank } from '../../types/game.types';
import { computed } from 'vue';
import { getCardPattern } from '../../utils/cardPatterns';

const props = defineProps<{
  suit: Suit;
  rank: Rank;
}>();

const pattern = computed(() => getCardPattern(props.rank, props.suit));
</script>

<template>
  <g class="card-pattern">
    <template v-for="(path, index) in pattern.paths" :key="index">
      <path
        :d="path"
        :transform="`translate(${pattern.positions[index].x}, ${pattern.positions[index].y}) 
                   scale(${pattern.positions[index].scale || 1})
                   ${pattern.positions[index].transform || ''}`"
        :class="[
          pattern.isRed ? 'fill-red-600' : 'fill-gray-900',
          'transition-transform'
        ]"
      />
    </template>
  </g>
</template>