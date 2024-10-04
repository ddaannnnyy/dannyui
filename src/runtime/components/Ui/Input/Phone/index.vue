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
      <span class="material-symbols-rounded" v-if="showIcon"> phone </span>
      <input
        type="tel"
        :name="name"
        :disabled="disabled"
        :placeholder="placeholder"
        class="w-full flex-grow bg-transparent"
        @input="handleEmit"
      />
    </div>
    <p v-if="!!helper" class="text-base/50">{{ helper }}</p>
  </label>
</template>

<script setup lang="ts">
import { ref } from "vue";

const {
  name,
  label,
  placeholder,
  helper,
  disabled = false,
  showIcon = true,
  required = false,
} = defineProps<{
  name: string;
  label: string;
  placeholder?: string;
  helper?: string;
  required?: boolean;
  disabled?: boolean;
  showIcon?: boolean;
}>();

const showPasswordAsPlainText = ref(false);

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
input::after {
  display: none;
}
</style>
