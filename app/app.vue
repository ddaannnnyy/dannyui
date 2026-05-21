<script setup lang="ts">
const testValue = ref('test value');
const showModal = ref(false);
</script>

<template>
  <div class="relative flex flex-col gap-6 items-center justify-center py-12 bg-sky-900 min-h-screen">
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
        <ui-button @click="showModal = true">
          Show Modal
        </ui-button>
      </template>
    </ui-form>
    <ui-bread-crumbs :route="useRoute()" name-override="Override" />
    <ui-input-text-area id="text-area" name="Text Area" class="w-sm h-[100px]" rows="20" value="hello" @input:value="console.log($event)" />
    <ui-popup-tooltip content="hello world" caret-color="#ffffff">
      <p>hover for tooltip</p>
      <template #content>
        <div class="bg-white shadow p-2 rounded">
          <img
            class="rounded-sm object-fit"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs1OtM7dKWRBrkYKSSnldgGFOYJicEf-PpieXLBgTepd2TYEGWFViCaGKBv4Ei1BbvNiq7Fcr61tCbd26Exzgl0O0rsq2J6wE9KMSuNBU&s=10"
            alt=""
          >
        </div>
      </template>
    </ui-popup-tooltip>
    <ui-input-dropdown
      id="dd"
      :items="[{ id: '1', label: 'One', emit: 'one' }, { id: '2', label: 'Two', emit: 'two' }]"
    />
    <!-- <div class="min-w-xs">
      <ui-input-address name="address" label="Address Label" />
    </div> -->
  </div>
  <ui-popup-modal v-if="showModal" size="xl" @close="showModal = false" />
</template>

<style scoped>

</style>
