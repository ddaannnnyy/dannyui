<script setup lang="ts">
export interface IPopupModalProps {
  heading?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'screen'
  disableClickToClose?: boolean
  disableCloseButton?: boolean
}
export interface IPopupModalEmits {
  close: []
}

const props = withDefaults(defineProps<IPopupModalProps>(), {
  size: 'md',
});

const emit = defineEmits<IPopupModalEmits>();

const { disableClickToClose } = toRefs(props);
const modal = ref<HTMLElement | null>(null);

const sizeClass = computed(() => {
  switch (props.size) {
    case 'xs':
      return ['w-xs', 'min-h-32'];
    case 'sm':
      return ['w-sm', 'min-h-48'];
    case 'md':
      return ['w-md', 'min-h-64'];
    case 'lg':
      return ['w-lg', 'min-h-80'];
    case 'xl':
      return ['w-xl', 'min-h-96'];
    case 'screen':
      return ['w-11/12', 'h-11/12'];
    default:
      return [];
  }
});

onClickOutside(modal, () => {
  if (disableClickToClose.value)
    return;
  closeModal();
});

function closeModal() {
  emit('close');
}
</script>

<template>
  <div class="w-screen h-screen z-9999 bg-slate-500/60 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
    <slot name="modal">
      <div class="modal-container relative bg-white rounded p-3 flex flex-col gap-2 shadow-xl" :class="sizeClass">
        <slot v-if="!disableCloseButton" name="close">
          <div class="absolute top-0 -right-8">
            <button class="bg-white rounded px-1 py-0.5 text-xs transition-colors duration-100 hover:bg-slate-100 cursor-pointer" @click="closeModal">
              <ui-custom-icon icon="close" />
            </button>
          </div>
        </slot>

        <slot name="heading">
          <h2 class="text-lg">
            {{ props.heading }}
          </h2>
        </slot>
        <slot name="content" />
      </div>
    </slot>
  </div>
</template>

<style scoped>

</style>
