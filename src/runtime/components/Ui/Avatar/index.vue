<template>
  <NuxtImg
    class="aspect-square max-h-full rounded-full object-cover object-center"
    src="https://www.w3schools.com/howto/img_avatar.png"
    loading="lazy"
    format="webp"
  ></NuxtImg>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from "vue";

const { src } = withDefaults(
  defineProps<{
    src: string;
  }>(),
  {},
);
</script>

<style scoped></style>
