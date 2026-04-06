<template>
  <div class="flex items-center justify-center h-screen w-screen bg-sky-900">
    <ui-form>
      <template #content>
        <ui-input-label name="test-input" label="label" required>
          <ui-input-common
            id="test-input" type="text" autocomplete="off" required placeholder="placeholder text"
            @submit="console.log($event)"
          />
        </ui-input-label>
        <UiButtonDropdown size="xl" full-width :items="[{ id: '0', label: 'item', emit: 'emit' }]" label="Select" />
      </template>
    </ui-form>
  </div>
</template>
