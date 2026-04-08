<script setup lang="ts">
export interface IDropDownItem {
  id: string
  label: string
  emit: string
}
export interface IButtonProps {
  items: IDropDownItem[]
  label?: string
  active?: boolean
  hideAction?: boolean
  showSelection?: boolean
  disableCloseOnSelect?: boolean
  fullWidth?: boolean
}
defineOptions({ inheritAttrs: false });
const props = withDefaults(defineProps<IButtonProps>(), {
  fullWidth: false,
});

const emit = defineEmits<{
  'select:item': [value: IDropDownItem]
  'select:value': [value: string]
}>();

const barebones = useLayerOptions('barebones');

const { disableCloseOnSelect } = toRefs(props);

const open = ref<boolean>(false);
const dropdownPosition = ref<'above' | 'below'>('below');
const selectedValue = ref<IDropDownItem>();
const dropdown = ref<HTMLDivElement>();
const dropdownButton = ref<HTMLDivElement>();

onClickOutside(dropdown, () => {
  if (open.value === true)
    open.value = false;
}, { ignore: [dropdownButton] });

onMounted(() => {
  window.addEventListener('resize', () => {
    dropdownPosition.value = calculateDropdownPosition(dropdownButton.value) ?? 'below';
  });
});

onUnmounted(() => {
  window.removeEventListener('resize', () => {
    dropdownPosition.value = calculateDropdownPosition(dropdownButton.value) ?? 'below';
  });
});

const dropdownListClasses = computed(() => {
  if (!barebones)
    return [];
  return ['p-3', 'bg-white', 'rounded', 'text-xs', 'select-none', 'shadow-lg', ' max-h-[200px]'];
});

function toggleDropdown() {
  if (!open.value) {
    nextTick(() => {
      dropdownPosition.value = calculateDropdownPosition(dropdownButton.value) ?? 'below';
    });
  }
  open.value = !open.value;
}

function handleSelect(selectedOption: IDropDownItem) {
  selectedValue.value = selectedOption;
  emit('select:value', selectedOption.emit);
  emit('select:item', selectedOption);
  if (!disableCloseOnSelect.value)
    open.value = false;
}
</script>

<template>
  <div class="relative w-fit">
    <ui-button ref="dropdownButton" v-bind="$attrs" @click.prevent="toggleDropdown">
      <slot name="button">
        <span class="flex flex-row items-center justify-between">
          {{ label }}
          <ui-custom-icon
            icon="arrow_right" class="p-0 transition-transform duration-150 select-none"
            :class="open ? '-rotate-90' : 'rotate-90'" font-size="1.3rem"
          />
        </span>
      </slot>
    </ui-button>
    <transition>
      <ul v-if="open" ref="dropdown" class="dropdown-list absolute left-0 right-0 z-99 overflow-y-auto" :class="[...dropdownListClasses, dropdownPosition === 'above' ? 'bottom-full mb-2' : 'top-full mt-2', fullWidth ? 'w-full' : 'w-max']">
        <slot name="list-items">
          <li v-for="item in items" :key="item.id" class="w-full">
            <button
              class="flex flex-row w-full items-center justify-between gap-6 transition-colors duration-150 hover:bg-background-tertiary rounded-md p-2 text-left"
              @click.prevent="() => handleSelect(item)"
            >
              {{ item.label }}<ui-custom-icon
                v-if="!hideAction" icon="arrow_right"
                class="bg-background-tertiary rounded-full"
              />
            </button>
          </li>
        </slot>
      </ul>
    </transition>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: all 0.1s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
