<script setup lang="ts">
interface IFormProps {
  heading?: string
  footer?: string
}

interface IFormValue {
  inputID: string
  valid?: boolean
  value?: string
}

interface IFormEmits {
  'submit': [value: void]
  'submit:event': [value: SubmitEvent]
  'submit:fields': [value: IFormValue[]]
  [key: string]: [value: any]
}
defineOptions({ inheritAttrs: false });
const props = defineProps<IFormProps>();
const emit = defineEmits<IFormEmits>();

const barebones = useLayerOptions('barebones');

const dropdownListClasses = computed(() => {
  if (!barebones)
    return [];
  return [];
});

function handleSubmit(event: SubmitEvent) {
  emit('submit', undefined);
  emit('submit:event', event);
  emit('submit:fields', buildFormFields(event));
}

function buildFormFields(event: SubmitEvent) {
  const form = event.target as HTMLFormElement;
  const fields: IFormValue[] = [];
  for (const element of Array.from(form.elements)) {
    if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement || element instanceof HTMLFormElement) {
      fields.push({
        inputID: element.id ?? element.name ?? element.type,
        value: element.value,
        valid: element.validity.valid
      });
    }
  }
  return fields;
}
</script>

<template>
  <form v-bind="$attrs" :class="dropdownListClasses" class="flex flex-col gap-3 p-3 bg-white rounded" @submit.prevent="handleSubmit">
    <slot name="heading">
      <h2 class="text-xl">
        Form name
      </h2>
    </slot>
    <slot name="content" />
    <slot name="submit">
      <ui-button size="md">
        Submit
      </ui-button>
    </slot>
    <slot name="footer">
      <p v-if="props.footer" class="text-sm italic">
        {{ props.footer }}
      </p>
    </slot>
  </form>
</template>

<style scoped>

</style>
