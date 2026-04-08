<script setup lang="ts">
export interface IInputCommonProps {
  id: string
  value?: string
}
defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<IInputCommonProps>(), {});

const emit = defineEmits<{
  'input:event': [value: Event]
  'input:target': [value: HTMLInputElement]
  'input:value': [value: string]
}>();

const barebones = useLayerOptions('barebones');

const { value } = toRefs(props);
const inputValue = ref<string>();
const viewPassword = ref(false);

const classStyles = computed(() => {
  if (!barebones)
    return ['flex', 'flex-row', 'items-center', 'justify-start'];
  return ['flex', 'flex-row', 'items-center', 'justify-start', 'border border-slate-600 rounded-sm px-1 py-0.5 text-base bg-white'];
});

watch(() => value.value, (newValue) => {
  inputValue.value = newValue;
  if (newValue) {
    emit('input:value', newValue);
  }
});

onMounted(() => {
  if (value.value)
    inputValue.value = value.value;
});

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  inputValue.value = target.value;
  emit('input:event', event);
  emit('input:target', target);
  emit('input:value', target.value);
}

function handleVisibility() {
  viewPassword.value = !viewPassword.value;
}
</script>

<template>
  <div :class="classStyles">
    <input v-bind="$attrs" :id :type="viewPassword ? 'text' : 'password'" :value="inputValue" style="outline:none;" @input="onInput">
    <button @click.prevent="handleVisibility">
      <ui-custom-icon icon="visibility" font-size="1.5rem" />
    </button>
  </div>
</template>

<style scoped>
input {
    flex-grow: 1;
}
</style>
