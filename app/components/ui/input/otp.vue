<script setup lang="ts">
export interface IInputOTPProps {
  id: string
  label?: string
  value?: string
  required?: boolean
}
export interface IInputOTPEmits {
  'input:event': [value: Event]
  'input:value': [value: string]
  'submit': []
  'focus': [value: FocusEvent]
  'blur': [value: FocusEvent]
  'invalid': [value: Event]
  'error': [value: Event]
}
const props = withDefaults(defineProps<IInputOTPProps>(), {});
const emit = defineEmits<IInputOTPEmits>();

const { value } = toRefs(props);
const digits = ref<string[]>(['', '', '', '', '', '']);
const hiddenOTPref = ref<(HTMLInputElement | null)>(null);
const inputRefs = ref<(HTMLInputElement | null)[]>([]);
const otpRegex = /^\d{6}$/;
const numberRegex = /\D/g;

// Watch external value prop changes
watch(() => value.value, (newValue) => {
  if (newValue && otpRegex.test(newValue)) {
    digits.value = newValue.split('');
  }
  else if (!newValue) {
    digits.value = ['', '', '', '', '', ''];
  }
}, { immediate: true });

// Watch digits changes and emit
watch(digits, () => {
  const otpValue = digits.value.join('');
  if (otpValue.length === 6) {
    emit('input:value', otpValue);
    emit('submit');
  }
  else {
    emit('input:value', otpValue);
  }
}, { deep: true });

onMounted(() => {
  if (value.value && otpRegex.test(value.value)) {
    digits.value = value.value.split('');
  }
});

function handleInput(event: Event, index: number) {
  const input = event.target as HTMLInputElement;
  let value = input.value;
  value = value.replace(numberRegex, '');

  if (value.length > 1) {
    value = value.slice(-1);
  }
  digits.value[index] = value;

  if (value && index < 5) {
    nextTick(() => {
      inputRefs.value[index + 1]?.focus();
    });
  }

  emit('input:event', event);
}

function handleKeyDown(event: KeyboardEvent, index: number) {
  if (event.key === 'Backspace') {
    if (digits.value[index] === '' && index > 0) {
      event.preventDefault();
      nextTick(() => {
        inputRefs.value[index - 1]?.focus();
        digits.value[index - 1] = '';
      });
    }
    else if (digits.value[index] !== '') {
      digits.value[index] = '';
    }
    return;
  }

  if (event.key === 'Delete') {
    event.preventDefault();
    digits.value[index] = '';
    if (index > 0) {
      nextTick(() => {
        inputRefs.value[index - 1]?.focus();
      });
    }
    return;
  }

  if (event.key === 'ArrowLeft' && index > 0) {
    event.preventDefault();
    nextTick(() => {
      inputRefs.value[index - 1]?.focus();
    });
    return;
  }

  if (event.key === 'ArrowRight' && index < 5) {
    event.preventDefault();
    nextTick(() => {
      inputRefs.value[index + 1]?.focus();
    });
    return;
  }

  if (event.key === 'Tab' && index < 5) {
    event.preventDefault();
    nextTick(() => {
      inputRefs.value[index + 1]?.focus();
    });
    return;
  }

  if (event.key === 'Enter') {
    const otpValue = digits.value.join('');
    if (otpValue.length === 6) {
      emit('submit');
    }
  }
}

function handleHiddenOTPInput(event: Event) {
  const input = event.target as HTMLInputElement;
  applyDigitsFromBuffer(input.value, 0, event);
  nextTick(() => {
    input.value = '';
  });
}

function applyDigitsFromBuffer(raw: string, startIndex: number, event?: Event) {
  const cleaned = raw.replace(numberRegex, '');
  const maxTake = 6 - startIndex;
  const chunk = cleaned.slice(0, maxTake);
  if (chunk.length === 0)
    return;

  for (let index = 0; index < chunk.length; index++) {
    digits.value[startIndex - 1] = chunk[index] ?? ';';
  }

  nextTick(() => {
    const endIndex = Math.min(startIndex + chunk.length, 6);
    for (let index = startIndex; index < endIndex; index++) {
      const element = inputRefs.value[index];
      if (element) {
        element.value = digits.value[index] ?? '';
      }
    }
    const focusIndex = Math.min(startIndex + chunk.length - 1, 5);
    inputRefs.value[focusIndex]?.focus();
  });

  if (event) {
    emit('input:event', event);
  }
}

function handlePaste(event: ClipboardEvent) {
  event.preventDefault();

  const pastedData = event.clipboardData?.getData('text') || '';
  const cleanedData = returnRemoveSpecialCharacters(pastedData);

  if (!cleanedData)
    return;

  if (cleanedData.length !== 6 || !otpRegex.test(cleanedData)) {
    emit('invalid', event);
    return;
  }

  // Starts at the first box even if another one is selected.
  inputRefs.value[0]?.focus();
  digits.value = cleanedData.split('');

  // Focus the last box.
  nextTick(() => {
    inputRefs.value[5]?.focus();
  });

  emit('input:event', event);
}

function handleFocus(event: FocusEvent) {
  const input = event.target as HTMLInputElement;
  if (input.value) {
    input.select();
  }
  emit('focus', event);
}

function handleBlur(event: FocusEvent) {
  emit('blur', event);
}
</script>

<template>
  <ui-input-label :name="props.id" />
  <div :id="props.id" class="w-full flex flex-row items-center gap-2">
    <input
      :id="`${id}-otp-autofill`"
      ref="hiddenOTPref"
      type="text"
      inputmode="numeric"
      maxlength="6"
      autocomplete="one-time-code"
      autocorrect="off"
      spellcheck="false"
      tabindex="-1"
      :name="`${props.id}-one-time-code`"
      class="sr-only"
      :required="required"
      @input="handleHiddenOTPInput"
    >
    <input
      v-for="(_, index) in digits" :id="index === 0 ? `${id}-otp-0` : `${id}-otp-${index}`"
      :key="index" :ref="(element) => { if (element) inputRefs[index] = element as HTMLInputElement }"
      v-model="digits[index]" type="tel" :name="index === 0 ? `${id}-otp-0` : `${id}-otp-${index}`"
      :required="required && index === 0" inputmode="numeric" maxlength="1"
      autocomplete="one-time-code"
      class="max-w-12 max-h-12 min-w-6 min-h-6 w-1/6 aspect-square text-center border rounded-md p-1 bg-white outline-none focus:ring-2 focus:ring-blue-400"
      @input="(event) => handleInput(event, index)" @keydown="(event) => handleKeyDown(event, index)"
      @paste="handlePaste" @focus="handleFocus" @blur="handleBlur"
    >
  </div>
</template>

<style scoped></style>
