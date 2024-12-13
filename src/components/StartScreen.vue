<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useGameStore } from '../stores/gameStore';
import type { GameSettings } from '../types/game.types';
import { VARIANT_CONFIGS } from '../types/variants.types';

const emit = defineEmits<{
  (e: 'start'): void
}>();

const gameStore = useGameStore();
const settings = ref<GameSettings>({ ...gameStore.settings });
const showLoadGame = ref(false);

onMounted(() => {
  if (gameStore.hasGameState()) {
    showLoadGame.value = true;
  }
});

const startGame = () => {
  gameStore.updateSettings(settings.value);
  gameStore.initializeGame();
  emit('start');
};

const loadSavedGame = () => {
  gameStore.loadGame();
  emit('start');
};

const startNewGame = () => {
  showLoadGame.value = false;
};
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-8 rounded-lg shadow-xl w-96">
      <h1 class="text-3xl font-bold text-center mb-6">Solitaire</h1>
      
      <!-- Load Game Dialog -->
      <div v-if="showLoadGame" class="mb-6">
        <h2 class="text-xl font-bold mb-4">Saved Game Found</h2>
        <div class="space-y-4">
          <button
            @click="loadSavedGame"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Continue Saved Game
          </button>
          <button
            @click="startNewGame"
            class="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
          >
            Start New Game
          </button>
        </div>
      </div>

      <!-- Game Settings -->
      <div v-else class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Game Variant</label>
          <select 
            v-model="settings.variant"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option v-for="(config, variant) in VARIANT_CONFIGS" :key="variant" :value="variant">
              {{ config.name }}
            </option>
          </select>
          <p class="mt-1 text-sm text-gray-500">
            {{ VARIANT_CONFIGS[settings.variant].description }}
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Difficulty</label>
          <select 
            v-model="settings.difficulty"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div v-if="VARIANT_CONFIGS[settings.variant].hasStockPile">
          <label class="block text-sm font-medium text-gray-700">Draw Count</label>
          <select 
            v-model="settings.drawCount"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option :value="1">Draw One</option>
            <option :value="3">Draw Three</option>
          </select>
        </div>

        <div class="flex items-center space-x-4">
          <label class="flex items-center">
            <input 
              type="checkbox" 
              v-model="settings.timerEnabled"
              class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
            <span class="ml-2 text-sm text-gray-700">Enable Timer</span>
          </label>

          <label class="flex items-center">
            <input 
              type="checkbox" 
              v-model="settings.soundEnabled"
              class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
            <span class="ml-2 text-sm text-gray-700">Enable Sound</span>
          </label>
        </div>

        <button
          @click="startGame"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Start Game
        </button>
      </div>
    </div>
  </div>
</template>