<script setup lang="ts">
import { useGameStore } from '../stores/gameStore';
import StockPile from './piles/StockPile.vue';
import WastePile from './piles/WastePile.vue';
import FoundationPiles from './piles/FoundationPiles.vue';
import TableauPiles from './piles/TableauPiles.vue';
import GameHeader from './GameHeader.vue';

const gameStore = useGameStore();
</script>

<template>
  <div class="p-4">
    <GameHeader />
    
    <div class="game-board mt-4">
      <div class="flex justify-between mb-8">
        <div class="flex space-x-4">
          <StockPile :cards="gameStore.gameState.deck" />
          <WastePile :cards="gameStore.gameState.waste" />
        </div>
        <FoundationPiles :foundations="gameStore.gameState.foundations" />
      </div>
      
      <TableauPiles :tableaus="gameStore.gameState.tableaus" />
    </div>
  </div>
</template>