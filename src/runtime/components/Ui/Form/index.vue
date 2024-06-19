<template>
  <form
    @submit.prevent
    class="gap-150 p-300 bg-neutral flex flex-col rounded-xl"
    ref="form"
  >
    <h2 class="pb-150">{{ title }}</h2>
    <slot></slot>
    <div class="py-150 w-full" v-if="showSubmit">
      <UiButton class="w-full" @click="handleSubmit"> Submit </UiButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

const form = ref(undefined as HTMLFormElement | undefined);
const { title, showSubmit = false } = defineProps<{
  title: string;
  showSubmit?: boolean;
}>();
const emit = defineEmits(["submit"]);
function handleSubmit() {
  if (!form.value) return;
  if (!form.value.checkValidity()) return;
  emit("submit");
}
</script>

<style scoped></style>
