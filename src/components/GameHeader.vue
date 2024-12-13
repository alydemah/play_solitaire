<script setup lang="ts">
import { useGameControls } from '../composables/useGameControls';
import { useGameStore } from '../stores/gameStore';
import MoveDescription from './MoveDescription.vue';
import SettingsModal from './modals/SettingsModal.vue';

const gameStore = useGameStore();
const {
  showResetConfirm,
  showSettings,
  isPlaying,
  handleHint,
  handleUndo,
  handleReset,
  confirmReset,
  cancelReset,
  toggleSettings,
  startAutoPlay,
  stopAutoPlay
} = useGameControls();
</script>

<template>
  <div class="flex justify-between items-center text-white mb-4">
    <!-- Game Info -->
    <div>
      <h2 class="text-2xl font-bold">Solitaire</h2>
      <p>Score: {{ gameStore.gameState.score }}</p>
    </div>

    <!-- Game Controls -->
    <div class="flex items-center space-x-4">
      <button 
        @click="handleHint"
        :disabled="isPlaying"
        class="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Show Next Move
      </button>
      <button 
        @click="isPlaying ? stopAutoPlay : startAutoPlay"
        class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
      >
        {{ isPlaying ? 'Stop Auto Play' : 'Auto Play' }}
      </button>
      <button 
        @click="handleUndo"
        :disabled="isPlaying"
        class="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Undo Move
      </button>
      <button 
        @click="handleReset"
        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Reset Game
      </button>
      <button 
        @click="toggleSettings"
        class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Settings
      </button>

      <!-- Game Statistics -->
      <div>
        <p>Moves: {{ gameStore.gameState.moves }}</p>
        <p v-if="gameStore.settings.timerEnabled">Time: {{ gameStore.gameState.time }}s</p>
      </div>
    </div>

    <!-- Modals -->
    <SettingsModal
      :show="showSettings"
      @close="showSettings = false"
    />

    <!-- Reset Confirmation -->
    <div 
      v-if="showResetConfirm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-xl">
        <h3 class="text-xl font-bold text-gray-900 mb-4">Reset Game?</h3>
        <p class="text-gray-600 mb-6">Are you sure you want to reset the game? All progress will be lost.</p>
        <div class="flex justify-end space-x-4">
          <button
            @click="cancelReset"
            class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="confirmReset"
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Reset Game
          </button>
        </div>
      </div>
    </div>

    <!-- Move Description -->
    <MoveDescription
      :current-move="gameStore.currentMove"
      :next-move="gameStore.nextMove"
    />
  </div>
</template>