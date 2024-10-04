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
      class="p-150 gap-150 has-[:disabled]:text-base/40 has-[:disabled]:border-base/40 has-[:disabled]:bg-base/5 border-base ring-base/30 flex w-full flex-row rounded border has-[:focus-visible]:ring-2"
    >
      <span class="material-symbols-rounded" v-if="showIcon"> reorder </span>
      <select
        :name="name"
        :id="`select-${name}`"
        :disabled="disabled"
        class="flex-grow"
        @input="handleEmit"
      >
        <option v-for="option in listItems" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
  </label>
  <p v-if="!!helper" class="text-base/50">{{ helper }}</p>
</template>

<script setup lang="ts">
interface OptionArray {
  value: string;
  label: string;
}
const {
  name,
  label,
  helper,
  listItems,
  disabled = false,
  required = false,
} = defineProps<{
  name: string;
  label: string;
  helper?: string;
  disabled?: boolean;
  required?: boolean;
  showIcon?: boolean;
  listItems: OptionArray[];
}>();

const emit = defineEmits(["input"]);

function handleEmit($event: any) {
  if (!$event.target) return;
  emit("input", $event.target.value);
}
</script>

<style scoped>
select:focus-visible {
  outline: none;
}
</style>
