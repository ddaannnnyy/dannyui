<template>
  <label
    :for="name"
    class="has-[:disabled]:text-base/40 gap-100 flex max-w-full flex-col"
  >
    {{ label }}
    <div
      class="p-150 gap-150 has-[:focus-visible]:border-base has-[:disabled]:text-base/40 bg-neutral flex w-full flex-row rounded border"
    >
      <span class="material-symbols-rounded"> palette </span>
      <input
        type="color"
        :name="name"
        :disabled="disabled"
        class="w-full flex-grow"
        @input="handleColorChange"
        list="presetColors"
      />
      <datalist id="presetColors">
        <option>#ff0000</option>
        <option>#00ff00</option>
        <option>#0000ff</option>
      </datalist>
    </div>
  </label>
</template>

<script setup lang="ts">
const iconColor = ref(undefined as string | undefined);
const {
  name,
  label,
  disabled = false,
} = defineProps<{
  name: string;
  label: string;
  disabled?: boolean;
}>();

function handleColorChange(event: any) {
  iconColor.value = event.target.value;
  console.log(iconColor.value);
}
</script>

<style scoped>
input:focus-visible {
  outline: none;
}
input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;
  border: none;
  cursor: pointer;
}
input::-webkit-color-swatch {
  border-radius: 15px;
  border: none;
  background-color: none;
}
input::-moz-color-swatch {
  border-radius: 15px;
  border: none;
  background-color: none;
}
</style>
