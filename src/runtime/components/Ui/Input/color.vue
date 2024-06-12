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
      <span class="material-symbols-rounded"> palette </span>
      <input
        type="color"
        :name="name"
        :disabled="disabled"
        class="w-full flex-grow"
        :list="defaultColors ? 'presetColors' : undefined"
      />
      <datalist id="presetColors" v-if="defaultColors">
        <option v-for="color in defaultColorsRef" :key="color">
          {{ color }}
        </option>
      </datalist>
    </div>
  </label>
</template>

<script setup lang="ts">
const {
  name,
  label,
  disabled = false,
  required = false,
  defaultColors,
} = defineProps<{
  name: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  defaultColors?: string[];
}>();

const defaultColorsRef = ref([] as string[]);

onMounted(() => {
  if (defaultColors) {
    defaultColorsRef.value = [...new Set(defaultColors)];
  }
});
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
