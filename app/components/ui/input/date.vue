<script setup lang="ts">
export interface IInputDateProps {
  id: string
  value?: string
  min?: string
  max?: string
}
export interface IInputDateEmit {
  'input:event': [value: Event]
  'input:target': [value: HTMLInputElement]
  'input:value': [value: string]
  'input:number': [value: number]
  'input:date': [value: Date | null]
}

const props = withDefaults(defineProps<IInputDateProps>(), {
  min: '1900-01-01',
  max: '2900-12-31'
});
const emit = defineEmits<IInputDateEmit>();

const inputValue = ref<string>();

function handleEmit(event: Event) {
  const target = event.target as HTMLInputElement;
  inputValue.value = target.value;
  emit('input:event', event);
  emit('input:target', target);
  emit('input:value', target.value);
  emit('input:number', target.valueAsNumber);
  emit('input:date', target.valueAsDate);
}
</script>

<template>
  <ui-input-common :id="props.id" type="date" :value="props.value" :min="props.min" :max="props.max" @input:event="handleEmit" />
</template>

<style scoped>

</style>
