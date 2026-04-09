<script setup lang="ts">
const testValue = ref('test value');
</script>

<template>
  <div class="flex flex-col gap-6 items-center justify-center h-screen w-screen bg-sky-900">
    <ui-form class="w-sm" @submit:fields="console.log($event)">
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
        <ui-input-file-upload name="file" multiple>
          <template #drop-zone>
            <p>hello world</p>
          </template>
        </ui-input-file-upload>
        <ui-input-multiselect
          id="dd"
          :items="[{ id: '1', label: 'One', emit: 'one' }, { id: '2', label: 'Two', emit: 'two' }]"
          :selected-items="[{ id: '1', label: 'One', emit: 'one' }]"
        />
        <ui-input-otp id="otp" />
        <ui-input-phone id="phone" @input:value="console.log($event)" />
        <ui-input-select
          id="select" name="select"
          :items="[{ id: '1', label: 'One', emit: 'one' }, { id: '2', label: 'Two', emit: 'two' }]"
        />
      </template>
    </ui-form>
    <ui-input-text-area id="text-area" name="Text Area" class="w-sm" rows="20" />
    <ui-input-dropdown
      id="dd"
      :items="[{ id: '1', label: 'One', emit: 'one' }, { id: '2', label: 'Two', emit: 'two' }]"
    />
    <p>{{ testValue }}</p>
    <!-- <div class="min-w-xs">
      <ui-input-address name="address" label="Address Label" />
    </div> -->
  </div>
</template>

<style scoped>

</style>
