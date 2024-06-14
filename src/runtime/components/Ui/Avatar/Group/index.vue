<template>
  <div
    class="hover:gap-150 flex w-fit flex-row items-center justify-start transition-all duration-100"
    ref="group"
  >
    <button
      v-for="(avatar, index) in images"
      @click.prevent="emit('click', { index, event: $event })"
      :key="index"
      :style="`z-index: ${images.length - index}; margin-left: -${height / 5}px`"
      class="h-full transition-transform duration-100 hover:scale-110"
    >
      <UiAvatar src="asd" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useElementSize } from "@vueuse/core";

const group = ref<MaybeRef>(null);
const { height } = useElementSize(group);
const {} = withDefaults(
  defineProps<{
    images: string[];
  }>(),
  {
    images: () => [
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
    ],
  },
);
const emit = defineEmits(["click"]);
</script>

<style scoped></style>
