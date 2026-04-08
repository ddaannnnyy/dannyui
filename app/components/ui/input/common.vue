<script setup lang="ts">
export type CommonInputTypes = 'text' | 'email' | 'number' | 'url';
export interface IInputCommonProps {
  id: string
  type?: CommonInputTypes
  value?: string
}
defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<IInputCommonProps>(), { type: 'text' });

const emit = defineEmits<{
  'input:event': [value: Event]
  'input:target': [value: HTMLInputElement]
  'input:value': [value: string]
}>();

const barebones = useLayerOptions('barebones');

const { type, value } = toRefs(props);
const inputValue = ref('');

const classStyles = computed(() => {
  if (!barebones)
    return [];
  return ['border border-slate-600 rounded-sm px-1 py-0.5 text-base bg-white'];
});
const computedInputMode = computed(() => {
  switch (type.value) {
    case 'email':
      return 'email';
    case 'number':
      return 'decimal';
    case 'text':
      return 'text';
    case 'url':
      return 'url';
    default:
      return 'text';
  }
});

watch(() => value.value, (newValue) => {
  inputValue.value = newValue ?? '';
  if (newValue)
    emit('input:value', newValue);
});

onMounted(() => {
  if (value.value != null)
    inputValue.value = value.value;
});

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  inputValue.value = target.value;
  emit('input:event', event);
  emit('input:target', target);
  emit('input:value', target.value);
}
</script>

<template>
  <input v-bind="$attrs" :id :type :class="classStyles" :inputmode="computedInputMode" :value="inputValue" @input="onInput">
</template>

<style scoped></style>
