<template>
  <img
    class="aspect-square max-h-full rounded-full object-cover object-center"
    :src="src"
    :alt="name"
  />
</template>

<script setup lang="ts">
const { name, src = "https://www.w3schools.com/howto/img_avatar.png" } =
  defineProps<{
    name: string;
    src: string;
  }>();
</script>

<style scoped></style>
