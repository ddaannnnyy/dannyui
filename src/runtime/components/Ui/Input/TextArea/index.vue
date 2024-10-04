<template>
  <label
    :for="name"
    class="has-[:disabled]:text-base/40 peer-invalid:text-error gap-100 flex max-w-full flex-col"
  >
    <span class="flex w-full flex-row items-center justify-between"
      >{{ label }}
      <span v-if="required" class="text-error">required</span></span
    >
    <textarea
      class="p-150 gap-150 disabled:text-base/40 border-base ring-base/30 flex w-full flex-row rounded border focus-visible:ring-2"
      :name="name"
      :id="`textarea_${name}`"
      ref="textarea"
      v-model="input"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      rows="3"
      @input="handleEmit"
    ></textarea>
  </label>
  <p v-if="!!helper" class="text-base/50">{{ helper }}</p>
</template>

<script setup lang="ts">
import { useTextareaAutosize } from "@vueuse/core";

const { textarea, input } = useTextareaAutosize({ styleProp: "minHeight" });

const {
  name,
  label,
  placeholder,
  helper,
  disabled = false,
  required = false,
} = defineProps<{
  name: string;
  label: string;
  placeholder?: string;
  helper?: string;
  disabled?: boolean;
  required?: boolean;
}>();

const emit = defineEmits(["input"]);

function handleEmit($event: any) {
  if (!$event.target) return;
  emit("input", $event.target.value);
}
</script>

<style scoped>
textarea {
  -ms-overflow-style: none;
  scrollbar-width: none;
  resize: none;
}

textarea::-webkit-scrollbar {
  display: none;
}

textarea:focus-visible {
  outline: none;
}
</style>
