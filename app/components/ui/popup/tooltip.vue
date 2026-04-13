<script setup lang="ts">
export interface IPopupTooltipProps {
  content?: string
  alwaysOpen?: boolean
}
export interface IPopupTooltipEmits {
  visible: [value: boolean]
}

const props = defineProps<IPopupTooltipProps>();
const emit = defineEmits<IPopupTooltipEmits>();

const tooltip = ref<HTMLDivElement | null>(null);
const dropdownPosition = ref<'above' | 'below'>('above');
const open = ref<boolean>(false);

watch(() => open.value, (newValue) => {
  emit('visible', newValue);
});

onMounted(() => {
  dropdownPosition.value = calculateDropdownPosition(tooltip.value) ?? 'above';
});

function toggleDropdown() {
  if (props.alwaysOpen)
    return;
  if (!open.value) {
    nextTick(() => {
      dropdownPosition.value = calculateDropdownPosition(tooltip.value) ?? 'above';
    });
  }
  open.value = !open.value;
}
</script>

<template>
  <div class="relative" :title="content">
    <div class="h-full" @mouseenter="toggleDropdown" @mouseleave="toggleDropdown">
      <slot />
    </div>
    <Transition name="tooltip">
      <div v-if="open || alwaysOpen" ref="tooltip" class="absolute left-0 right-0 flex items-center justify-center text-xs select-none z-99" :class="dropdownPosition === 'above' ? 'bottom-full mb-4' : 'top-full mt-4'">
        <div class="relative">
          <slot name="content">
            <p class="text-white bg-slate-900 rounded-md p-2 shadow-lg">
              {{ content }}
            </p>
          </slot>
          <div
            v-if="dropdownPosition === 'above'"
            name="caret-up"
            class="absolute top-full left-1/2 transform -translate-x-1/2 size-0 border-x-[6px] border-t-[6px] border-x-transparent border-t-slate-900"
          />
          <div
            v-if="dropdownPosition === 'below'"
            name="caret-down"
            class="absolute top-full left-1/2 transform -translate-x-1/2 size-0 border-x-[6px] border-b-[6px] border-x-transparent border-b-slate-900"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.tooltip-enter-active,
.tooltip-leave-active {
    transition: opacity 0.3s ease-in-out;
}

.tooltip-enter-from,
.tooltip-leave-to {
    opacity: 0;
}
</style>
