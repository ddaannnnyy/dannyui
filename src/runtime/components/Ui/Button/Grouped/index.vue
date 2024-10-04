<template>
  <div class="flex w-full flex-row">
    <button
      class="bg-primary text-neutral p-150 ring-primary/30 disabled:bg-base/20 disabled:text-neutral/80 w-full rounded-l transition-all duration-200 hover:ring-4 focus-visible:ring-4 disabled:cursor-not-allowed disabled:ring-0"
      :disabled="buttons[0].disabled"
      @click.prevent="emit('click', { value: buttons[0].value, event: $event })"
    >
      {{ buttons[0].label }}
    </button>
    <button
      class="bg-primary text-neutral p-150 ring-primary/30 disabled:bg-base/20 disabled:text-neutral/80 w-full transition-all duration-200 hover:ring-4 focus-visible:ring-4 disabled:cursor-not-allowed disabled:ring-0"
      :disabled="button.disabled"
      @click.prevent="emit('click', { value: button.value, event: $event })"
      v-for="button in [...buttons.slice(1, buttons.length - 1)]"
    >
      {{ button.label }}
    </button>
    <button
      class="bg-primary text-neutral p-150 ring-primary/30 disabled:bg-base/20 disabled:text-neutral/80 w-full rounded-r transition-all duration-200 hover:ring-4 focus-visible:ring-4 disabled:cursor-not-allowed disabled:ring-0"
      :disabled="buttons[buttons.length - 1].disabled"
      @click.prevent="
        emit('click', {
          value: buttons[buttons.length - 1].value,
          event: $event,
        })
      "
    >
      {{ buttons[buttons.length - 1].label }}
    </button>
  </div>
</template>

<script setup lang="ts">

interface Button {
  label: string;
  value: string;
  disabled?: boolean;
}
const { buttons } = defineProps<{
  buttons: Button[];
}>();
const emit = defineEmits(["click"]);
</script>

<style scoped>
button:focus-visible {
  outline: none;
}
</style>
