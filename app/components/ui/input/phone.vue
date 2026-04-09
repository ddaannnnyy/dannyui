<script setup lang="ts">
import type { CountryCode } from 'libphonenumber-js';
import parsePhoneNumber from 'libphonenumber-js';

export interface IPhoneParsed {
  raw: string
  formatted: {
    E164?: string
    national?: string
    international?: string
    uri?: string
  }
  validation: {
    isPossible?: boolean
    isValid?: string
  }
}
export interface IInputPhoneProps {
  id: string
}
export interface IInputDropDownEmits {
  'input:event': [value: Event]
  'input:target': [value: HTMLInputElement]
  'input:value': [value: IPhoneParsed]
}

const props = withDefaults(defineProps<IInputPhoneProps>(), {});
const emit = defineEmits<IInputDropDownEmits>();

const input = ref<string>();

watch(() => input.value, (newValue) => {
  if (newValue) {
    const parsedData = parseInput(newValue);
    emit('input:value', parsedData);
  }
});

function parseInput(input: string, countryLocation: CountryCode = 'AU') {
  const parsedPhoneNumber = parsePhoneNumber(input, countryLocation);
  return {
    raw: input,
    formatted: {
      E164: parsedPhoneNumber?.number,
      national: parsedPhoneNumber?.formatNational(),
      international: parsedPhoneNumber?.formatInternational(),
      uri: parsedPhoneNumber?.getURI()
    },
    validation: {
      isPossible: parsedPhoneNumber?.isPossible(),
      isValid: parsedPhoneNumber?.isValid()
    }
  } as IPhoneParsed;
}
</script>

<template>
  <ui-input-common :id="props.id" :value="input" v-bind="$attrs" @input:value="input = $event" @input:event="emit('input:event', $event)" @input:target="emit('input:target', $event)" />
</template>

<style scoped>

</style>
