<template>
  <NuxtImg
    class="aspect-square max-h-full rounded-full object-cover object-center"
    :src="src"
    loading="lazy"
    format="webp"
  ></NuxtImg>
</template>

<script setup lang="ts">
const { src = "https://www.w3schools.com/howto/img_avatar.png" } = defineProps<{
  src: string;
}>();
</script>

<style scoped></style>
