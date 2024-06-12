<template>
  <div class="flex h-full w-full flex-row">
    <UiNavigationSidebar>
      <h3 class="p-100 w-full text-center">dannyui</h3>
      <p class="p-100 w-full">An Low Opinion Nuxt Component Library</p>
      <div class="w-full">
        <UiAccordion title="Inputs" class="w-3000 p-150">
          <ul class="gap-50 flex flex-col items-stretch justify-stretch">
            <li class="bg-base/10 p-50 w-full rounded">
              <NuxtLink to="/">Basic Inputs</NuxtLink>
            </li>
            <li class="bg-base/10 p-50 rounded">
              <NuxtLink to="/">Date Inputs</NuxtLink>
            </li>
            <li class="bg-base/10 p-50 rounded">
              <NuxtLink to="/">Range Input</NuxtLink>
            </li>
            <li class="bg-base/10 p-50 rounded">
              <NuxtLink to="/">Select Input</NuxtLink>
            </li>
            <li class="bg-base/10 p-50 rounded">
              <NuxtLink to="/">Forms</NuxtLink>
            </li>
            <li class="bg-base/10 p-50 rounded">
              <NuxtLink to="/">Buttons</NuxtLink>
            </li>
          </ul>
        </UiAccordion>
        <UiAccordion title="Navigation" class="w-3000 p-150">
          <ul class="gap-50 flex flex-col items-stretch justify-stretch">
            <li class="bg-base/10 p-50 w-full rounded">
              <NuxtLink to="/">Side Bar</NuxtLink>
            </li>
            <li class="bg-base/10 p-50 rounded">
              <NuxtLink to="/">Menu</NuxtLink>
            </li>
          </ul>
        </UiAccordion>
      </div>
    </UiNavigationSidebar>
    <div
      class="gap-300 p-350 bg-primary flex min-h-screen flex-grow flex-col items-center justify-center"
    >
      <UiForm title="Sign In" class="w-5000" @submit="console.log('submitted')">
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
        <UiInputSelect
          name="select"
          label="Selection"
          :list-items="listItems"
        />
        <UiInputRange
          name="color"
          label="Favourite Color"
          required
          :min="0"
          :max="10"
        />
        <UiButton class="rounded-full">Click Me</UiButton>
        <UiButtonGrouped :buttons="groupedButtons" @click="console.log($event)"
          >grouped</UiButtonGrouped
        >
        <UiAccordion title="Title">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse, non
          eaque officia numquam dolor qui.
        </UiAccordion>
        <UiAccordion title="Title"></UiAccordion>
        <UiAccordion title="Title"></UiAccordion>
      </UiForm>
    </div>
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
