<template>
  <label
    :for="name"
    class="has-[:disabled]:text-base/40 gap-100 max-w-full flex-col"
    :class="type === 'hidden' ? 'hidden' : 'flex'"
  >
    <span class="flex w-full flex-row items-center justify-between"
      >{{ label }}
      <span v-if="required" class="text-error">required</span></span
    >
    <div
      class="p-150 gap-150 has-[:disabled]:text-base/40 has-[:disabled]:border-base/40 has-[:disabled]:bg-base/5 bg-neutral border-base ring-base/30 flex w-full flex-row rounded border has-[:focus-visible]:ring-2"
    >
      <span v-if="type === 'date'" class="material-symbols-rounded">
        calendar_today
      </span>
      <span v-if="type === 'datetime-local'" class="material-symbols-rounded">
        calendar_today
      </span>
      <span v-if="type === 'month'" class="material-symbols-rounded">
        date_range
      </span>
      <span v-if="type === 'week'" class="material-symbols-rounded">
        date_range
      </span>
      <span v-if="type === 'time'" class="material-symbols-rounded">
        schedule
      </span>
      <input
        :type="type"
        :name="name"
        :disabled="disabled"
        :placeholder="placeholder"
        class="w-full flex-grow bg-transparent"
      />
    </div>
  </label>
</template>

<script setup lang="ts">
const {
  name,
  type = "date",
  label,
  placeholder,
  disabled = false,
  required = false,
} = defineProps<{
  name: string;
  label: string;
  type: "datetime-local" | "date" | "month" | "week" | "time" | "hidden";
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}>();
</script>

<style scoped>
input:focus-visible {
  outline: none;
}

/* Chrome, Safari, Edge, Opera */
input[type="datetime-local"]::-webkit-inner-spin-button,
input[type="datetime-local"]::-webkit-calendar-picker-indicator,
input[type="date"]::-webkit-inner-spin-button,
input[type="date"]::-webkit-calendar-picker-indicator,
input[type="month"]::-webkit-inner-spin-button,
input[type="month"]::-webkit-calendar-picker-indicator,
input[type="week"]::-webkit-inner-spin-button,
input[type="week"]::-webkit-calendar-picker-indicator,
input[type="time"]::-webkit-inner-spin-button,
input[type="time"]::-webkit-calendar-picker-indicator {
  display: none;
  -webkit-appearance: none;
}

/* Firefox */
input[type="datetime-local"] {
  appearance: textfield;
  -moz-appearance: textfield;
}
input[type="date"] {
  appearance: textfield;
  -moz-appearance: textfield;
}
input[type="month"] {
  appearance: textfield;
  -moz-appearance: textfield;
}
input[type="week"] {
  appearance: textfield;
  -moz-appearance: textfield;
}
input[type="time"] {
  appearance: textfield;
  -moz-appearance: textfield;
}
</style>
