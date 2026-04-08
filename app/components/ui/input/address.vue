<script setup lang="ts">
export interface IManualAddress {
  addressLine1?: string
  addressLine2?: string
  suburb?: string
  city?: string
  state?: string
  postcode?: string
}

export interface IAddressInputProps {
  name: string
  label: string
  value?: string
  useAutoComplete?: boolean
}
export interface IAddressInputEmits {
  'input:event': [value: Event]
  'input:target': [value: HTMLInputElement]
  'input:value': [value: string]
}
const props = withDefaults(defineProps<IAddressInputProps>(), {
  useAutoComplete: true
});
const emit = defineEmits<IAddressInputEmits>();

const { $makeAutoComplete: autocomplete }: any = useNuxtApp();

const manualAddress = ref<IManualAddress>();
const manualAddressActive = ref<boolean>(false);
const manualAddressSubmitted = ref<string>();
const addressInputRef = ref<HTMLInputElement>();

watch(() => manualAddressActive.value, () => {
  manualAddress.value = {};
});

function searchListener() {
  setTimeout(() => {
    if (addressInputRef.value && !manualAddressActive.value) {
      autocomplete(addressInputRef.value, ['address'], true);
      // @ts-expect-error I'm using a custom event from the maps.client.js plugin and addEventListener is mad about it.
      addressInputRef.value.addEventListener('dropdown-ready', (event: DropdownReadyEvent) => {
        const { addDropdownClasses, addDropdownItemClasses } = event.detail;
        addDropdownClasses(['custom-address-dropdown']);
        addDropdownItemClasses(['custom-address-item']);
      });
    }
  }, 100);
}

function handleEmit(event: Event) {
  searchListener();
  const target = addressInputRef.value as HTMLInputElement;
  emit('input:event', event);
  emit('input:target', target);
  emit('input:value', target.value);
}

function handleManualAddress(event: Event) {
  emit('input:event', event);
  manualAddressSubmitted.value = buildAddressFromManualAddress(manualAddress.value);
  if (manualAddressSubmitted.value) {
    emit('input:value', manualAddressSubmitted.value);
    manualAddressActive.value = false;
  }
}

function buildAddressFromManualAddress(address?: IManualAddress) {
  if (!address)
    return undefined;
  const keys = Object.values(address);
  const addressString = keys.join(' ');
  return addressString;
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <ui-input-label :name="props.name" :label="props.label">
      <form
        v-if="manualAddressActive" :autocomplete="props.useAutoComplete ? 'on' : 'off'"
        class="grid grid-cols-2 gap-2 w-full h-full"
        @submit.prevent="handleManualAddress"
      >
        <ui-input-label name="address-line-1" label="Address Line 1" class="text-xs">
          <ui-input-common
            id="address-line-1" :autocomplete="useAutoComplete ? 'address-level4' : 'off'"
            class="col-span-2" v-bind="$attrs" @input:value="(manualAddress as IManualAddress).addressLine1 = $event"
          />
        </ui-input-label>
        <ui-input-label name="address-line-2" label="Address Line 2" class="text-xs">
          <ui-input-common
            id="address-line-2" :autocomplete="useAutoComplete ? 'address-level3' : 'off'"
            class="col-span-2" v-bind="$attrs" @input:value="(manualAddress as IManualAddress).addressLine2 = $event"
          />
        </ui-input-label>
        <ui-input-label name="address-suburb" label="Address Suburb" class="text-xs">
          <ui-input-common
            id="address-suburb" :autocomplete="useAutoComplete ? '' : 'off'"
            class="col-span-2" v-bind="$attrs"
            @input:value="(manualAddress as IManualAddress).suburb = $event"
          />
        </ui-input-label>

        <ui-input-label name="address-city" label="Address City" class="text-xs">
          <ui-input-common
            id="address-city" :autocomplete="useAutoComplete ? 'address-level2' : 'off'"
            class="col-span-2" v-bind="$attrs"
            @input:value="(manualAddress as IManualAddress).city = $event"
          />
        </ui-input-label>
        <ui-input-label name="address-state" label="Address State" class="text-xs">
          <ui-input-common
            id="address-state" :autocomplete="useAutoComplete ? 'address-level1' : 'off'"
            class="col-span-1" v-bind="$attrs"
            @input:value="(manualAddress as IManualAddress).state = $event"
          />
        </ui-input-label>
        <ui-input-label name="address-postal-code" label="Address Postcode" class="text-xs">
          <ui-input-common
            id="address-postal-code" :autocomplete="useAutoComplete ? 'postal-code' : 'off'"
            class="col-span-1" v-bind="$attrs"
            @input:value="(manualAddress as IManualAddress).postcode = $event"
          />
        </ui-input-label>
        <div class="col-span-full flex justify-end">
          <ui-button role="submit" size="sm">
            Submit
          </ui-button>
        </div>
      </form>
      <ui-input-common v-else v-bind="$attrs" :id="props.name" :value="manualAddressSubmitted" :autocomplete="useAutoComplete ? 'street-address' : 'off'" @input="handleEmit" />
    </ui-input-label>
    <button class="text-left text-xs underline" @click.prevent="manualAddressActive = !manualAddressActive">
      {{ manualAddressActive ? `Search for an
                address` : `Enter an address manually` }}
    </button>
  </div>
</template>

<style scoped>
/* Additional styles for the dropdown */
:global(.custom-address-dropdown) {
    font-family: inherit;
}

:global(.custom-address-item:hover) {
    background-color: #f8fafc !important;
}

:global(.custom-address-item:last-child) {
    border-bottom: none !important;
}

.pac-container {
    display: none;
}
</style>
