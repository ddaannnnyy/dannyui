<template>
  <div class="w-full rounded">
    <button
      @click.prevent="show = !show"
      class="flex w-full flex-row items-center justify-between text-left focus-visible:border"
    >
      <h4 class="w-11/12">{{ title }}</h4>
      <span
        class="material-symbols-rounded text-4xl transition-transform duration-300"
        :class="show ? '' : 'rotate-180'"
      >
        keyboard_arrow_up
      </span>
    </button>
    <Transition name="display">
      <div class="pt-150 w-full" v-if="show">
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";

const show = ref(false);
const { title } = defineProps<{
  title: string;
}>();
</script>

<style scoped>
.display-enter-active,
.display-leave-active {
  transition: all 0.5s ease;
}

.display-enter-from,
.display-leave-to {
  opacity: 0;
}
button:focus-visible {
  outline: none;
}
</style>
