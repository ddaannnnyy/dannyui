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
      <span class="material-symbols-rounded" v-if="showIcon"> password </span>
      <input
        :type="showPasswordAsPlainText ? 'text' : 'password'"
        :name="name"
        :disabled="disabled"
        :placeholder="placeholder"
        class="w-full flex-grow bg-transparent"
      />
      <button
        class="flex h-full items-center justify-center"
        @click.prevent="showPasswordAsPlainText = !showPasswordAsPlainText"
        @mouseleave="showPasswordAsPlainText = false"
      >
        <span class="material-symbols-rounded" v-if="showPasswordAsPlainText">
          visibility_off
        </span>
        <span class="material-symbols-rounded" v-else> visibility </span>
      </button>
    </div>
    <p v-if="!!helper" class="text-base/50">{{ helper }}</p>
  </label>
</template>

<script setup lang="ts">
const {
  name,
  label,
  placeholder,
  helper,
  disabled,
  showIcon,
  required
} = withDefaults(defineProps<{
  name: string;
  label: string;
  placeholder?: string;
  helper?: string;
  required?: boolean;
  disabled?: boolean;
  showIcon?: boolean;
}>(), {
  disabled: () => false,
  showIcon: () => true,
  required: () => false,
});

const showPasswordAsPlainText = ref(false);
</script>

<style scoped>
input:focus-visible {
  outline: none;
}
input::after {
  display: none;
}
</style>
