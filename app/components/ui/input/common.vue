<template>
    <input :type v-bind="$attrs" @input="onInput" :name :class="classStyles" :inputmode="computedInputMode">
</template>

<script setup lang="ts">
export type CommonInputTypes = 'text' | 'email' | 'number' | 'url';
export interface IInputCommonProps {
    name: string;
    type?: CommonInputTypes;
}
defineOptions({ inheritAttrs: false });

const barebones = useBarebones();

const props = withDefaults(defineProps<IInputCommonProps>(), { type: 'text' });
const emit = defineEmits<{
    "input:event": [value: Event];
    "input:target": [value: HTMLInputElement];
    "input:value": [value: string];
}>();

const { type } = toRefs(props);

const classStyles = computed(() => {
    if (!barebones) return [];
    return ['border border-slate-600 rounded-sm px-1 py-0.5 text-base bg-white'];
});
const computedInputMode = computed(() => {
    switch (type.value) {
        case 'email':
            return 'email';
        case 'number':
            return 'decimal';
        case 'text':
            return 'text';
        case 'url':
            return 'url';
        default:
            return 'text';
    }
})

function onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    emit('input:event', event);
    emit('input:target', target);
    emit('input:value', target.value);
}
</script>

<style scoped></style>