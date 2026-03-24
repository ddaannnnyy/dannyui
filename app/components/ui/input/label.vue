<template>
    <label :for="name" v-bind="$attrs" :class="classStyles">
        <slot name="label">
            <div v-if="label" class="flex flex-row items-center justify-between">
                <span>
                    {{ label }}
                </span>
                <span v-if="required" class=" text-red-500">*</span>
            </div>
        </slot>
        <slot />
        <slot name="hint">
            <span v-if="hint" class="text-xs text-slate-400 italic wrap-normal">{{ hint }}</span>
        </slot>
    </label>
</template>

<script setup lang="ts">
export interface IInputLabelProps {
    name: string;
    label?: string;
    hint?: string;
    required?: boolean;
}
defineOptions({ inheritAttrs: false });
const barebones = useLayerOptions('barebones');

const props = defineProps<IInputLabelProps>();

const classStyles = computed(() => {
    if (!barebones) return [];
    return ['flex flex-col gap-1'];
});
</script>

<style scoped>

</style>