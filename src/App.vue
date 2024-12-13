<script setup lang="ts">
import { ref } from 'vue';
import StartScreen from './components/StartScreen.vue';
import GameBoard from './components/GameBoard.vue';
import { useGameStore } from './stores/gameStore';

const gameStarted = ref(false);
const gameStore = useGameStore();

const handleGameStart = () => {
  gameStarted.value = true;
};
</script>

<template>
  <div class="min-h-screen" :class="gameStore.settings.background">
    <StartScreen 
      v-if="!gameStarted"
      @start="handleGameStart"
    />
    <GameBoard v-else />
  </div>
</template>