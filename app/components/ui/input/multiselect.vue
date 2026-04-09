<script setup lang="ts">
export interface IInputMultiSelectProps {
  id: string
  label?: string
  items: IDropDownOption[]
  selectedItems?: IDropDownOption[]
  required?: boolean
  allowDuplicates?: boolean
}

export interface IInputMultiSelectEmits {
  'selected:value': [value: string]
  'selected:item': [value: IDropDownOption]
  'selected:event': [value: Event]
  'input:value': [value: string]
  'input:event': [value: Event]
  'changed': [value: IDropDownOption[]]
  'removed': [value: string]
  'submit': []
  'focus': [value: FocusEvent]
  'blur': [value: FocusEvent]
  'drop-down-position': [value: 'above' | 'below']
}

const props = withDefaults(defineProps<IInputMultiSelectProps>(), {});
const emit = defineEmits<IInputMultiSelectEmits>();

const { items } = toRefs(props);
const selectedItems = ref<IDropDownOption[]>([]);
const dropdownPosition = ref<'above' | 'below'>('below');
const requiredValue = ref<string>(); // This is a dummy value for the required prop. Check the onMounted dev warning for more info

const computedSelectedItems = computed(() => {
  if (props.selectedItems) {
    return [
      ...props.selectedItems,
      ...selectedItems.value
    ];
  }
  return selectedItems.value;
});

const remainingOptions = computed(() => {
  return items.value.filter(item => !computedSelectedItems.value.includes(item));
});

onMounted(() => {
  returnDevWarning(`
        This selector has some weird validation rules.\r\n
        Because the input clears when selecting a value it cannot pass required flags in forms.\r\n
        I've added a hidden input that absorbs the required and fills. This allows the form to be haulted if empty, but pass when at least one item is selected.
        \r\n\r\n
        !BUT!
        \r\n\r\n you do not get the in built validation warning, as the empty field is unfocusable. Just know that if you use this as a required field you will need to write a custom invalid message if the form tries to submit when no item is selected.
    `, 'warn');
});

// Hooking into the remainingOptions computed property makes the watch more reliable, I didn't want to duplicate the selected into a comp just for this.
// I also didn't want to emit from inside the computed call, but that's just personal preference.
// Just think of this as "when selected items changes, emit the new selected items" ezpz.
watch(() => remainingOptions.value, () => {
  emit('changed', selectedItems.value);
});

function addToSelected(item: IDropDownOption) {
  requiredValue.value = item.emit;
  selectedItems.value.push(item);
  emit('selected:value', item.emit);
  emit('selected:item', item);
}

function removeItem(index: number) {
  emit('removed', (selectedItems.value[index] as IDropDownOption).emit);
  selectedItems.value.splice(index, 1);
  if (selectedItems.value.length === 0) {
    requiredValue.value = undefined;
  }
}
</script>

<template>
  <div class="flex gap-1" :class="dropdownPosition === 'below' ? 'flex-col' : 'flex-col-reverse'">
    <ui-input-dropdown
      :id="props.id" :items="props.allowDuplicates ? props.items : remainingOptions" :required="props.required" :label="props.label" :clear-on-selected="true" :show-options-on-focus="true"
      @drop-down-position="dropdownPosition = $event"
      @selected:item="addToSelected"
      @selected:event="emit('selected:event', $event)"
      @selected:value="emit('selected:value', $event)"
      @input:event="emit('input:event', $event)"
      @input:value="emit('input:value', $event)"
      @blur="emit('blur', $event)"
      @focus="emit('focus', $event)"
      @submit="emit('submit')"
    />
    <div v-if="props.required" class="h-px! bg-clip-border" aria-hidden="true">
      <input v-model="requiredValue" type="text" tabindex="-1" class="h-px! outline-none" :required="props.required">
    </div>
    <div class="w-full h-fit flex flex-row gap-3 flex-wrap">
      <div
        v-for="(item, index) in computedSelectedItems" :key="item.id"
        class="p-1 px-2 rounded-md flex flex-row items-center"
      >
        {{ item.label }}
        <button class="*:leading-none space-0 p-0 m-0 h-3.5" @click.prevent="() => removeItem(index)">
          <ui-custom-icon
            icon="close"
            font-size="1rem"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
