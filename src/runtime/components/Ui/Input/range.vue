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
      class="p-150 gap-100 has-[:focus-visible]:border-base has-[:disabled]:text-base/40 bg-neutral flex w-full flex-row items-center rounded border"
    >
      <span class="material-symbols-rounded"> line_end </span>
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
      />
      <span class="w-200">{{ selectedValue }}</span>
    </div>
  </label>
</template>

<script setup lang="ts">
const selectedValue = ref(undefined as number | undefined);

const {
  name,
  label,
  min,
  max,
  step,
  disabled = false,
  required = false,
} = defineProps<{
  name: string;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  disabled?: boolean;
  required?: boolean;
}>();

onMounted(() => {
  let minimum = min ?? 0;
  let maxmimum = max ?? 100;
  selectedValue.value = Math.round((minimum + maxmimum) / 2);
});
</script>

<style scoped>
select:focus-visible {
  outline: none;
}
</style>
