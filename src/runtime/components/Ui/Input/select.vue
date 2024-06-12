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
      class="p-150 gap-150 has-[:focus-visible]:border-base has-[:disabled]:text-base/40 bg-neutral flex w-full flex-row rounded border"
    >
      <span class="material-symbols-rounded"> reorder </span>
      <select
        :name="name"
        :id="`select-${name}`"
        :disabled="disabled"
        class="flex-grow"
      >
        <option v-for="option in listItems" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
  </label>
</template>

<script setup lang="ts">
interface OptionArray {
  value: string;
  label: string;
}
const {
  name,
  label,
  disabled = false,
  required = false,
  listItems,
} = defineProps<{
  name: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  listItems: OptionArray[];
}>();
</script>

<style scoped>
select:focus-visible {
  outline: none;
}
</style>
