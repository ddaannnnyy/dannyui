<script setup lang="ts">
export interface IInputSelectProps {
  id: string
  name: string
  items: IDropDownOption[]
  placeholder?: string
  value?: string
}
export interface IInputSelectEmits {
  'selected:value': [value: string]
  'selected:item': [value: IDropDownOption]
  'selected:event': [value: Event]
  'changed': [value: IDropDownOption]
}

const props = defineProps<IInputSelectProps>();
const emit = defineEmits<IInputSelectEmits>();

const barebones = useLayerOptions('barebones');

const { items, value } = toRefs(props);
const selectedValue = ref<string>('');

const classStyles = computed(() => {
  if (!barebones)
    return [];
  return ['border border-slate-600 rounded-sm px-1 py-1 text-base bg-white'];
});

watch(() => value.value, (newValue) => {
  if (newValue) {
    selectedValue.value = newValue;
  }
}, { immediate: true });

onMounted(() => {
  if (value.value) {
    selectedValue.value = value.value;
  }
});

function handleChange(event: Event) {
  const selectElement = event.target as HTMLSelectElement;
  const selectedEmit = selectElement.value;

  if (selectedEmit) {
    const selectedItem = items.value.find(item => item.emit === selectedEmit);
    if (selectedItem) {
      emit('selected:value', selectedItem.emit);
      emit('selected:item', selectedItem);
      emit('selected:event', event);
      emit('changed', selectedItem);
    }
  }
}
</script>

<template>
  <select :id="props.id" v-model="selectedValue" :name="props.name" v-bind="$attrs" :class="classStyles" @change="handleChange">
    <option value="" disabled>
      {{ props.placeholder ?? 'Select an Option' }}
    </option>
    <option
      v-for="item in items"
      :key="item.id"
      :value="item.emit"
    >
      {{ item.label }}
    </option>
  </select>
</template>

<style scoped>

</style>
