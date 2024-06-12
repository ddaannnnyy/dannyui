<template>
  <div
    class="gap-300 p-350 bg-primary flex min-h-screen w-screen flex-col items-center justify-center"
  >
    <UiForm title="Sign In" class="w-4000" @submit="console.log('submitted')">
      <UiInput
        name="name"
        label="Username"
        placeholder="hello@email.com"
        type="email"
        helper="You can use your username if you registered before June 2020"
        required
      ></UiInput>
      <UiInputPassword name="password" label="password"> </UiInputPassword>
      <UiInputColor
        name="color"
        label="Favourite Color"
        :default-colors="['#292E3A', '#1145C7', '#F4F4F4']"
      />
      <UiInputDate type="date" name="color" label="Favourite Color" />
      <UiInputTextarea name="color" label="Favourite Color" required />
      <UiInputSelect name="select" label="Selection" :list-items="listItems" />
      <UiInputRange
        name="color"
        label="Favourite Color"
        required
        :min="0"
        :max="10"
      />
      <UiButton>Click Me</UiButton>
      <UiButtonGrouped :buttons="groupedButtons" @click="console.log($event)"
        >grouped</UiButtonGrouped
      >
    </UiForm>
  </div>
</template>

<script setup lang="ts">
const listItems = ref([
  { value: "option", label: "label" },
  { value: "option2", label: "label2" },
  { value: "option3", label: "label3" },
]);

const groupedButtons = ref([
  {
    value: "Button 1",
    label: "Button 1",
  },
  {
    value: "Button 2",
    label: "Button 2",
  },
  {
    value: "Button 3",
    label: "Button 3",
    disabled: true,
  },
]);
</script>
