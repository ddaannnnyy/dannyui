<template>
  <label
    :for="name"
    class="has-[:disabled]:text-base/40 peer-invalid:text-error gap-100 max-w-full flex-col"
    :class="type === 'hidden' ? 'hidden' : 'flex'"
  >
    {{ label }}
    <div
      class="p-150 gap-150 has-[:disabled]:text-base/40 has-[:disabled]:border-base/40 has-[:disabled]:bg-base/5 bg-neutral border-base ring-base/30 flex w-full flex-row rounded border has-[:focus-visible]:ring-2"
    >
      <span
        v-if="type === 'text'"
        class="material-symbols-rounded"
        @mousedown.prevent
        @mousemove.prevent
        @touchstart.prevent
        @touchmove.prevent
        @click.prevent="input.focus()"
      >
        text_fields
      </span>
      <span
        v-if="type === 'number'"
        class="material-symbols-rounded"
        @mousedown.prevent
        @mousemove.prevent
        @touchstart.prevent
        @touchmove.prevent
        @click.prevent="input.focus()"
      >
        tag
      </span>
      <span
        v-if="type === 'email'"
        class="material-symbols-rounded"
        @mousedown.prevent
        @mousemove.prevent
        @touchstart.prevent
        @touchmove.prevent
        @click.prevent="input.focus()"
      >
        alternate_email
      </span>
      <span
        v-if="type === 'url'"
        class="material-symbols-rounded"
        @mousedown.prevent
        @mousemove.prevent
        @touchstart.prevent
        @touchmove.prevent
        @click.prevent="input.focus()"
      >
        globe
      </span>
      <input
        :type="type"
        :name="name"
        :disabled="disabled"
        :placeholder="placeholder"
        :required="required"
        ref="input"
        class="w-full flex-grow bg-transparent"
      />
    </div>
    <p v-if="!!helper" class="text-base/50">{{ helper }}</p>
  </label>
</template>

<script setup lang="ts">
const input = ref(null as any);
const {
  name,
  type = "text",
  label,
  placeholder,
  disabled = false,
  required = false,
  helper,
} = defineProps<{
  name: string;
  label: string;
  type: "text" | "number" | "email" | "url" | "hidden";
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  helper?: string;
}>();
</script>

<style scoped>
input:focus-visible {
  outline: none;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  appearance: none;
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  appearance: textfield;
  -moz-appearance: textfield;
}
</style>
