<template>
  <div
    class="gap-300 p-350 bg-primary flex h-screen w-screen flex-col items-center justify-center"
  >
    <UiForm
      title="Sign In"
      class="w-4000"
      :showSubmit="true"
      @submit="console.log('submitted')"
    >
      <UiInput
        name="name"
        label="Username"
        placeholder="hello@email.com"
        type="email"
        helper="You can use your username if you registered before June 2020"
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
    <UiInputPasswordRequirements></UiInputPasswordRequirements>
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
