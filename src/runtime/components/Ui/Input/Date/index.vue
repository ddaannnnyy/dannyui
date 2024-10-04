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
      class="p-150 gap-150 has-[:disabled]:text-base/40 has-[:disabled]:border-base/40 has-[:disabled]:bg-base/5 border-base ring-base/30 flex w-full flex-row rounded border has-[:focus-visible]:ring-2"
    >
      <span v-if="type === 'date' && showIcon" class="material-symbols-rounded">
        calendar_today
      </span>
      <span
        v-if="type === 'datetime-local' && showIcon"
        class="material-symbols-rounded"
      >
        calendar_today
      </span>
      <span
        v-if="type === 'month' && showIcon"
        class="material-symbols-rounded"
      >
        date_range
      </span>
      <span v-if="type === 'week' && showIcon" class="material-symbols-rounded">
        date_range
      </span>
      <span v-if="type === 'time' && showIcon" class="material-symbols-rounded">
        schedule
      </span>
      <input
        :type="type"
        :name="name"
        :disabled="disabled"
        :placeholder="placeholder"
        class="w-full flex-grow bg-transparent"
        @input="handleEmit"
      />
    </div>
  </label>
  <p v-if="!!helper" class="text-base/50">{{ helper }}</p>
</template>

<script setup lang="ts">
const {
  name,
  type = "date",
  label,
  placeholder,
  helper,
  disabled = false,
  required = false,
  showIcon = true,
} = defineProps<{
  name: string;
  label: string;
  type?: "datetime-local" | "date" | "month" | "week" | "time" | "hidden";
  placeholder?: string;
  helper?: string;
  disabled?: boolean;
  required?: boolean;
  showIcon?: boolean;
}>();

const emit = defineEmits(["input"]);

function handleEmit($event: any) {
  if (!$event.target) return;
  emit("input", $event.target.value);
}
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
