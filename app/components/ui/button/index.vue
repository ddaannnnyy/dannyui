<template>
    <button v-bind="$attrs" :class="classStyles">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
export interface IButtonProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    fullWidth?: boolean;
}
defineOptions({ inheritAttrs: false });
const barebones = useLayerOptions('barebones');

const props = withDefaults(defineProps<IButtonProps>(), {
    size: 'md',
    fullWidth: false,
});

const { size, fullWidth } = toRefs(props);

const classStyles = computed(() => {
    if (!barebones) return [];
    const baseStyles = ['ring', 'select-none']
    switch (size.value) {
        case 'sm':
            return [...baseStyles, 'px-2', 'py-1.5', 'rounded', 'cursor-pointer', 'bg-blue-300', 'transition-colors', 'duration-300', 'hover:bg-blue-500', 'text-xs', fullWidth.value ? 'w-full' : 'w-[5rem]'];
        case 'md':
            return [ ...baseStyles, 'px-2', 'py-2', 'rounded', 'cursor-pointer', 'bg-blue-300', 'transition-colors', 'duration-300', 'hover:bg-blue-500', fullWidth.value ? 'w-full' : 'w-[9rem]'];
        case 'lg':
            return [ ...baseStyles, 'px-2', 'py-3', 'rounded', 'cursor-pointer', 'bg-blue-300', 'transition-colors', 'duration-300', 'hover:bg-blue-500', 'text-lg', fullWidth.value ? 'w-full' : 'w-[13rem]'];
        case 'xl':
            return [ ...baseStyles, 'px-2', 'py-4', 'rounded', 'cursor-pointer', 'bg-blue-300', 'transition-colors', 'duration-300', 'hover:bg-blue-500', 'text-lg', fullWidth.value ? 'w-full' : 'w-[18rem]'];
        default:
            break;
    }
    return [...baseStyles, 'px-2', 'py-1.5', 'rounded', 'bg-blue-300', 'transition-colors', 'duration-300', 'hover:bg-blue-800'];

});
</script>

<style scoped>

</style>