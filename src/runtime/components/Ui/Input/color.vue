<template>
  <label
    :for="name"
    class="has-[:disabled]:text-base/40 gap-100 flex max-w-full flex-col"
  >
    <span class="flex w-full flex-row items-center justify-between"
      >{{ label }}
      <span v-if="required" class="text-error">required</span></span
    >
    <div
      class="p-150 gap-150 has-[:disabled]:text-base/40 has-[:disabled]:border-base/40 has-[:disabled]:bg-base/5 bg-neutral border-base ring-base/30 flex w-full flex-row rounded border has-[:focus-visible]:ring-2"
    >
      <span v-if="showIcon === true" class="material-symbols-rounded">
        palette
      </span>
      <input
        type="color"
        :name="name"
        :disabled="disabled"
        class="w-full flex-grow"
        :list="defaultColors ? 'presetColors' : undefined"
        @input="handleEmit"
      />
      <datalist id="presetColors" v-if="defaultColors" class="w-full">
        <option v-for="color in defaultColorsRef" :key="color">
          {{ color }}
        </option>
      </datalist>
    </div>
  </label>
  <p v-if="!!helper" class="text-base/50">{{ helper }}</p>
</template>

<script setup lang="ts">
import { ref, withDefaults, defineProps, onMounted } from "vue";

const { name, label, helper, disabled, required, showIcon, defaultColors } =
  withDefaults(
    defineProps<{
      name: string;
      label: string;
      helper?: string;
      disabled?: boolean;
      required?: boolean;
      defaultColors?: string[];
      showIcon?: boolean;
    }>(),
    {
      showIcon: () => true,
      disabled: () => false,
      required: () => false,
    },
  );

const defaultColorsRef = ref([] as string[]);

onMounted(() => {
  if (defaultColors) {
    defaultColorsRef.value = [...new Set(defaultColors)];
  }
});

const emit = defineEmits(['input']);

  function handleEmit($event: any) {
    if (!$event.target) return;
    if ($event.target.value) {
      emit('input', $event.target.value);
    }
  }
</script>

<style scoped>
input:focus-visible {
  outline: none;
}
input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;
  border: none;
  cursor: pointer;
}
input::-webkit-color-swatch {
  border-radius: 15px;
  border: none;
  background-color: none;
}
input::-moz-color-swatch {
  border-radius: 15px;
  border: none;
  background-color: none;
}
</style>
