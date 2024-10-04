<template>
  <div class="w-[400px]">
    <UiForm title="Inputs">
      <UiInput name="base" label="Input" />
      <UiInputColor name="color" label="Color" />
      <UiInputDate name="date" label="Date" />
      <UiInputPassword name="password" label="Password" />
      <UiInputPhone name="phone" label="Phone" />
      <UiInputRange name="range" label="Range" />
      <UiInputSelect
        name="select"
        label="Select"
        :list-items="[
          { value: 'Value', label: 'Label' },
          { value: 'Value 2', label: 'Label 2' },
        ]"
      ></UiInputSelect>
    </UiForm>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
