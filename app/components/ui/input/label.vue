<script setup lang="ts">
export interface IInputLabelProps {
  name: string
  label?: string
  hint?: string
  required?: boolean
}
defineOptions({ inheritAttrs: false });
const props = defineProps<IInputLabelProps>();

const barebones = useLayerOptions('barebones');

const classStyles = computed(() => {
  if (!barebones)
    return [];
  return ['flex flex-col gap-1'];
});
</script>

<template>
  <label :for="props.name" v-bind="$attrs" :class="classStyles">
    <slot name="label">
      <div v-if="props.label" class="flex flex-row items-center justify-between">
        <span>
          {{ label }}
        </span>
        <span v-if="props.required" class=" text-red-500">*</span>
      </div>
    </slot>
    <slot />
    <slot name="hint">
      <span v-if="props.hint" class="text-xs text-slate-400 italic wrap-normal">{{ hint }}</span>
    </slot>
  </label>
</template>

<style scoped>

</style>
