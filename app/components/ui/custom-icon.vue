<template>
    <div class="leading-none select-none" v-html="customIcon(icon, fontSize)" />
</template>

<script setup lang="ts">
// this library uses Googles Material Icons
// https://fonts.google.com/icons?selected=Material+Symbols+Outlined:logout:FILL@0;wght@400;GRAD@0;opsz@24&icon.query=logout&icon.size=24&icon.color=undefined
const props = defineProps<{
    icon: string;
    fontSize?: string;
}>();

const { icon, fontSize } = toRefs(props);
</script>

<style scoped></style>