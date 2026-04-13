<script setup lang="ts">
export interface IInputTextAreaProps {
  id: string
  name: string
  value?: string
  resize?: 'none' | 'both' | 'horizontal' | 'vertical'
}
export interface IInputTextAreaEmits {
  'input:value': [value: string | undefined]
  'input:event': [value: Event]
}

const props = withDefaults(defineProps<IInputTextAreaProps>(), {
  resize: 'vertical'
});

const emit = defineEmits<IInputTextAreaEmits>();

const barebones = useLayerOptions('barebones');

const classStyles = computed(() => {
  if (!barebones)
    return [];
  return ['border border-slate-600 rounded-sm px-1 py-0.5 text-base bg-white'];
});

const { resize } = toRefs(props);
const content = ref<string>();

const resizeClass = computed(() => {
  switch (resize.value) {
    case 'both':
      return ['resize'];
    case 'none':
      return ['resize-none'];
    case 'horizontal':
      return ['resize-x'];
    case 'vertical':
      return ['resize-y'];
    default:
      return [];
  }
});

watch(() => props.value, (newValue) => {
  content.value = newValue;
}, { immediate: true });

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('input:event', event);
  emit('input:value', target.value);
}
</script>

<template>
  <textarea :id="props.id" v-model="content" :name="props.name" v-bind="$attrs" :class="[resizeClass, classStyles]" @input="handleInput" />
</template>

<style scoped>

</style>
