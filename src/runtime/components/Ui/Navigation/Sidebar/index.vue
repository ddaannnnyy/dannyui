<template>
  <aside
    class="w-3000 sticky top-0 h-screen overflow-x-hidden overflow-y-scroll"
  >
    <nav class="w-full">
      <slot></slot>
    </nav>
  </aside>
</template>

<script setup lang="ts"></script>

<style scoped>
aside {
  scrollbar-gutter: stable both-edges;
}
</style>
