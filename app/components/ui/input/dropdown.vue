<script setup lang="ts">
export interface IDropDownOption {
  id: string
  label: string
  emit: string
  highlighted?: boolean
}
export interface IInputDropDownProps {
  items: IDropDownOption[]
  id: string
  label?: string
  required?: boolean
  dropdownMaxHeight?: number
  clearOnSelected?: boolean
  showOptionsOnFocus?: boolean
  displayEmit?: boolean
}
export interface IInputDropDownEmits {
  'selected:item': [value: IDropDownOption]
  'selected:value': [value: string]
  'selected:event': [value: Event]
  'input:value': [value: string]
  'input:event': [value: Event]
  'submit': []
  'focus': [value: FocusEvent]
  'blur': [value: FocusEvent]
  'drop-down-position': [value: 'above' | 'below']
}

const props = withDefaults(defineProps<IInputDropDownProps>(), {
  dropdownMaxHeight: 200,
  showOptionsOnFocus: true,
  clearOnSelected: false
});

const emit = defineEmits<IInputDropDownEmits>();

const { items, clearOnSelected, showOptionsOnFocus } = toRefs(props);

const input = ref<string>();
const dropdown = ref<HTMLDivElement>();
const dropdownList = ref<HTMLUListElement>();
const dropdownPosition = ref<'above' | 'below'>('below');
const showAllOptions = ref<boolean>(false);

const itemFilter = computed(() => {
  if (showAllOptions.value)
    return items.value;
  if (!input.value)
    return;
  return items.value.filter(item => item.label.toLowerCase().includes(input.value?.toLowerCase() ?? '') || item.emit.toLowerCase().includes(input.value?.toLowerCase() ?? ''));
});

const inputIsValidOption = computed(() => {
  return items.value.some(item => input.value === item.label);
});

const showDropdownOptions = computed(() => {
  const atLeastOneOption = itemFilter.value && itemFilter.value?.length > 0;
  return atLeastOneOption && !inputIsValidOption.value;
});

onClickOutside(dropdownList, (event) => {
  emit('blur', event);
  showAllOptions.value = false;
});

function calculateDropdownPosition() {
  if (!dropdown.value)
    return;

  const buttonRect = dropdown.value.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const estimatedDropdownHeight = items.value.length * 55; // roughly 55px per item in list

  const spaceBelow = viewportHeight - buttonRect.bottom;
  const spaceAbove = buttonRect.top;

  if (spaceBelow < estimatedDropdownHeight && spaceAbove > estimatedDropdownHeight) {
    dropdownPosition.value = 'above';
  }
  else {
    dropdownPosition.value = 'below';
  }

  emit('drop-down-position', dropdownPosition.value);
}

function handleSelect(choice: IDropDownOption) {
  emit('input:value', choice.emit);
  emit('selected:item', choice);
  emit('selected:value', choice.emit);
  emit('submit');
  showAllOptions.value = false;
  if (clearOnSelected.value) {
    input.value = undefined;
  }
  else {
    input.value = choice.label;
  }
}

function handleEmit(event: Event) {
  showAllOptions.value = false;
  const target = event.target as HTMLInputElement;
  input.value = target.value;
  emit('input:event', event);
  emit('input:value', (target.value));
}

function handleEnterPress(event: Event) {
  emit('input:event', event);
  emit('submit');
}

function handleFocus(event: FocusEvent) {
  if (showOptionsOnFocus.value) {
    showAllOptions.value = true;
  }
  emit('focus', event);
}

// Recalculate position on window resize
onMounted(() => {
  calculateDropdownPosition();
  window.addEventListener('resize', calculateDropdownPosition);
});

onUnmounted(() => {
  window.removeEventListener('resize', calculateDropdownPosition);
});

watch(() => input.value, (newValue) => {
  if (newValue?.length === 0) {
    showAllOptions.value = true;
  }
  else {
    if (inputIsValidOption.value) {
      showAllOptions.value = false;
    }
  }
});
</script>

<template>
  <div ref="dropdown" class="relative">
    <div class="flex flex-col gap-1">
      <ui-input-label v-if="props.label" :name="id" :label="props.label" />
      <ui-input-common
        :id="props.id" :value="input" v-bind="$attrs" input="handleEmit" @keypress.prevent.enter="handleEnterPress"
        @focus="handleFocus" @input:event="handleEmit"
      />
    </div>
    <transition>
      <ul
        v-if="showDropdownOptions"
        ref="dropdownList"
        class="absolute p-3 z-50 left-0 w-full bg-white rounded-md text-xs select-none shadow-lg flex flex-col overflow-y-auto"
        :class="dropdownPosition === 'above' ? 'bottom-full' : 'top-full'"
        :style="`max-height:${props.dropdownMaxHeight ?? 200}px`"
      >
        <li v-for="item in itemFilter" :key="item.id">
          <button
            type="button"
            class="w-full text-left p-2 rounded-sm transition-colors duration-150"
            @click.prevent="() => handleSelect(item)"
          >
            {{ item.label }}
          </button>
        </li>
      </ul>
    </transition>
  </div>
</template>

<style scoped>

</style>
