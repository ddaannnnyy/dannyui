export type MaybeComputedElementRef<T extends MaybeElement = MaybeElement> = MaybeRefOrGetter<T>;
export type MaybeElement = HTMLElement | SVGElement | VueInstance | undefined | null;
export type VueInstance = ComponentPublicInstance;

export function calculateDropdownPosition(element?: MaybeComputedElementRef, estimatedDropdownHeight = 200) {
  if (!element)
    return;
  const { top, bottom } = useElementBounding(element);

  const viewportHeight = window.innerHeight;

  const spaceBelow = viewportHeight - bottom.value;
  const spaceAbove = top.value;

  if (spaceBelow < estimatedDropdownHeight && spaceAbove > estimatedDropdownHeight) {
    return 'above';
  }
  else {
    return 'below';
  }
}
