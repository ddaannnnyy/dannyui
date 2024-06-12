<template>
  <button
    class="bg-primary text-neutral p-150 ring-primary/30 rounded transition-all duration-200 hover:ring-4 focus-visible:ring-4"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts"></script>

<style scoped>
button:focus-visible {
  outline: none;
}
</style>
