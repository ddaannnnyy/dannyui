export const useLayerOptions = (key: string) => {
    const runtime = useRuntimeConfig();
    const publicRuntime = runtime.public as { dannyui: Record<string, string | boolean>};
    return publicRuntime.dannyui[key];
}