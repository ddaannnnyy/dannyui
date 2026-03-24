export const useBarebones = () => {
    const runtime = useRuntimeConfig();
    return runtime.public?.dannyui?.barebones;
}