<script setup lang="ts">
const testValue = ref('test value');
</script>

<template>
  <div class="flex flex-col gap-6 items-center justify-start h-screen w-screen bg-sky-900">
    <ui-form @submit:fields="console.log($event)">
      <template #heading>
        Heading
      </template>
      <template #content>
        <ui-input-label name="test-input" label="label" required>
          <ui-input-common
            id="test-input" type="text" :value="testValue" autocomplete="off" placeholder="placeholder text"
            @input:value="testValue = $event"
          />
        </ui-input-label>
        <UiButtonDropdown size="xl" full-width :items="[{ id: '0', label: 'item', emit: 'emit' }]" label="Select" />
      </template>
    </ui-form>
    <ui-input-dropdown id="dd" :items="[{ id: '1', label: 'One', emit: 'one' }, { id: '2', label: 'Two', emit: 'two' }]" />
    <p>{{ testValue }}</p>
    <!-- <div class="min-w-xs">
      <ui-input-address name="address" label="Address Label" />
    </div> -->
  </div>
</template>

<style scoped>

</style>
