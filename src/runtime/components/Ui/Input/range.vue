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
      <span class="material-symbols-rounded" v-if="showIcon"> line_end </span>
      <input
        type="range"
        :name="name"
        :id="`range-${name}`"
        :disabled="disabled"
        :min="min"
        :max="max"
        :step="step"
        class="mx-100 flex-grow"
        v-model="selectedValue"
        @input="handleEmit"
      />
      <span class="w-200">{{ selectedValue }}</span>
    </div>
  </label>
  <p v-if="!!helper" class="text-base/50">{{ helper }}</p>
</template>

<script setup lang="ts">
import { ref, withDefaults, defineProps, onMounted } from "vue";

const selectedValue = ref(undefined as number | undefined);

const { name, label, helper, min, max, step, disabled, required, showIcon } =
  withDefaults(
    defineProps<{
      name: string;
      label: string;
      helper?: string;
      min?: number;
      max?: number;
      step?: number;
      value?: number;
      disabled?: boolean;
      required?: boolean;
      showIcon?: boolean;
    }>(),
    {
      min: () => 0,
      max: () => 100,
      step: () => 1,
      disabled: () => false,
      required: () => false,
      showIcon: () => true,
    },
  );

onMounted(() => {
  let minimum = min ?? 0;
  let maxmimum = max ?? 100;
  selectedValue.value = Math.round((minimum + maxmimum) / 2);
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
</style>
