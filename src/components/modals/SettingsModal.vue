<script setup lang="ts">
import { ref } from 'vue';
import { useGameStore } from '../../stores/gameStore';

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const gameStore = useGameStore();
const selectedBackground = ref(gameStore.settings.background);

const backgrounds = [
  { value: 'bg-green-800', label: 'Classic Green' },
  { value: 'bg-blue-800', label: 'Ocean Blue' },
  { value: 'bg-purple-800', label: 'Royal Purple' },
  { value: 'bg-gray-800', label: 'Slate Gray' }
];

const saveSettings = () => {
  gameStore.updateSettings({
    ...gameStore.settings,
    background: selectedBackground.value
  });
  emit('close');
};
</script>

<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-xl w-96">
      <h2 class="text-2xl font-bold mb-4">Game Settings</h2>
      
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Background Color
          </label>
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="bg in backgrounds"
              :key="bg.value"
              @click="selectedBackground = bg.value"
              :class="[
                'p-4 rounded-lg border-2 text-white',
                bg.value,
                selectedBackground === bg.value ? 'border-yellow-400' : 'border-transparent'
              ]"
            >
              {{ bg.label }}
            </button>
          </div>
        </div>
      </div>

      <div class="mt-6 flex justify-end space-x-3">
        <button
          @click="emit('close')"
          class="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          @click="saveSettings"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>