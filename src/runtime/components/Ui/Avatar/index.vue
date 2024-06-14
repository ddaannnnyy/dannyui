<template>
    <NuxtImg class="rounded-full aspect-square object-center object-cover max-h-full" src="https://www.w3schools.com/howto/img_avatar.png" loading="lazy" format="webp"></NuxtImg>
</template>

<script setup lang="ts">
const {src} = withDefaults(defineProps<{
    src: string
}>(), {})
</script>

<style scoped>

</style>