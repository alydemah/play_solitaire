<script setup lang="ts">
import type { Card } from '../../types/game.types';
import CardComponent from '../Card.vue';

defineProps<{
  cards: Card[];
}>();
</script>

<template>
  <div class="stock-pile">
    <div v-if="cards.length" class="relative">
      <CardComponent :card="cards[cards.length - 1]" />
    </div>
    <div v-else class="w-[150px] h-[225px] rounded-lg border-2 border-white/20 border-dashed"></div>
  </div>
</template>