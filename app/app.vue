<template>
  <div class="flex items-center justify-center h-screen w-screen bg-sky-900">
    <form @submit.prevent class="bg-white rounded p-4 max-w-md w-full flex flex-col gap-2">
      <ui-input-label name="test-input" label="label">
        <ui-input-common id="test-input" type="text" autocomplete="off" placeholder="placeholder text"
          @submit="console.log($event)" />
      </ui-input-label>
      <div class="flex flex-row justify-end gap-2">
        <ui-button size="sm" @click="console.log($event)">
          Submit
        </ui-button>
      </div>
    </form>
  </div>
</template>
