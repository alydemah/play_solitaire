<script setup lang="ts">
import { computed } from 'vue';
import type { GameMove } from '../types/game.types';

const props = defineProps<{
  currentMove?: GameMove;
  nextMove?: GameMove;
}>();

const getMoveDescription = (move?: GameMove): string => {
  if (!move) return 'No moves available';

  const source = move.sourceType === 'waste' ? 'waste pile' : 
                move.sourceType === 'tableau' ? `tableau ${move.sourceIndex! + 1}` : 
                'unknown';
  
  const target = move.targetType === 'foundation' ? `foundation pile ${move.targetIndex + 1}` :
                move.targetType === 'tableau' ? `tableau ${move.targetIndex + 1}` :
                'unknown';

  const card = `${move.card.rank} of ${move.card.suit}`;

  return `Move ${card} from ${source} to ${target}`;
};

const currentMoveText = computed(() => 
  props.currentMove ? `Current Move: ${getMoveDescription(props.currentMove)}` : 'No current move'
);

const nextMoveText = computed(() => 
  props.nextMove ? `Next Move: ${getMoveDescription(props.nextMove)}` : 'No available moves'
);
</script>

<template>
  <div class="fixed bottom-4 left-4 bg-black bg-opacity-75 text-white p-4 rounded-lg">
    <p class="mb-2">{{ currentMoveText }}</p>
    <p>{{ nextMoveText }}</p>
  </div>
</template>