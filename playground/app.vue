<template>
  <div class="gap-300 w-5000 p-350 flex flex-col">
    <form class="gap-300 w-5000 p-350 flex flex-col">
      <div class="gap-300 grid w-full grid-cols-2">
        <UiInput
          name="required"
          label="required"
          placeholder="placeholder"
          type="number"
          required
        ></UiInput>
        <UiInputDate
          name="name"
          label="Label"
          placeholder="placeholder"
          type="time"
        ></UiInputDate>
      </div>
      <UiInputColor name="name" label="color"> </UiInputColor>
      <UiInput
        name="name"
        label="Label"
        placeholder="placeholder"
        type="email"
        required
      ></UiInput>
      <UiInputPassword name="password" label="password"> </UiInputPassword>
      <button>test</button>
      <UiInputTextarea
        name="text"
        label="Text Area"
        placeholder="placeholder..."
        disabled
        @input="console.log($event)"
      />
    </form>
    <div class="bg-neutral gap-100 p-300 flex flex-row">
      <div class="w-1000 bg-primary aspect-square"></div>
      <div class="w-1000 bg-secondary aspect-square"></div>
      <div class="w-1000 bg-accent aspect-square"></div>
      <div class="w-1000 bg-neutral aspect-square"></div>
      <div class="w-1000 bg-base aspect-square"></div>
      <div class="w-1000 bg-info aspect-square"></div>
      <div class="w-1000 bg-success aspect-square"></div>
      <div class="w-1000 bg-warning aspect-square"></div>
      <div class="w-1000 bg-error aspect-square"></div>
    </div>
    <div class="bg-base gap-100 p-300 flex flex-row">
      <div class="w-1000 bg-primary aspect-square"></div>
      <div class="w-1000 bg-secondary aspect-square"></div>
      <div class="w-1000 bg-accent aspect-square"></div>
      <div class="w-1000 bg-neutral aspect-square"></div>
      <div class="w-1000 bg-base aspect-square"></div>
      <div class="w-1000 bg-info aspect-square"></div>
      <div class="w-1000 bg-success aspect-square"></div>
      <div class="w-1000 bg-warning aspect-square"></div>
      <div class="w-1000 bg-error aspect-square"></div>
    </div>
    <span class="material-symbols-rounded"> search </span>
  </div>
</template>

<script setup></script>
