<template>
  <button
    class="bg-primary text-neutral p-150 ring-primary/30 rounded transition-all duration-200 hover:ring-4 focus-visible:ring-4"
    @click="handleClick($event)"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits(["click"]);

function handleClick(event: PointerEvent) {
  emit("click", event);
}
</script>

<style scoped>
button:focus-visible {
  outline: none;
}
</style>
