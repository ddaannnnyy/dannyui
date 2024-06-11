<template>
  <label
    :for="name"
    class="has-[:disabled]:text-base/40 peer-invalid:text-error gap-100 flex max-w-full flex-col"
  >
    {{ label }}
    <textarea
      class="p-150 gap-150 has-[:focus-visible]:border-base has-[:disabled]:text-base/40 *:invalid:text-error *:invalid:border-error flex w-full flex-row rounded border transition-all duration-100 has-[:disabled]:cursor-not-allowed"
      :name="name"
      :id="`textarea_${name}`"
      ref="textarea"
      v-model="input"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      rows="3"
      @input="emit('input', $event.target.value)"
    ></textarea>
  </label>
</template>

<script setup lang="ts">
import { useTextareaAutosize } from "@vueuse/core";

const { textarea, input } = useTextareaAutosize({ styleProp: "minHeight" });

const {
  name,
  label,
  placeholder,
  disabled = false,
  required = false,
} = defineProps<{
  name: string;
  label: string;
  placeholder: string;
  disabled?: boolean;
  required?: boolean;
}>();

const emit = defineEmits(["input"]);
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
</style>
