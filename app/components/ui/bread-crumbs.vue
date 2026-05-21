<script setup lang="ts">
export interface IBreadCrumbsProps {
  route: ReturnType<typeof useRoute>
  nameOverride?: string
}

interface RouteName {
  path: string
  label: string
}

const props = defineProps<IBreadCrumbsProps>();
const { route, nameOverride } = toRefs(props);

const displayName = computed(() => {
  return nameOverride.value;
});

const routeLength = computed(() => {
  return Object.entries(route.value.params).length;
});

const routeNames = computed(() => {
  const names: RouteName[] = [];
  const pathSegments = route.value.fullPath.split('/').filter(segment => segment.length > 0);

  pathSegments.forEach((segment, index) => {
    const capitalisedRoute = returnCapitalized(segment);
    let pathBuilder = '';
    for (let pathIndex = 0; pathIndex < index + 1; pathIndex++) {
      pathBuilder += `/${pathSegments[pathIndex]}`;
    }
    if (capitalisedRoute) {
      names.push({ label: capitalisedRoute, path: pathBuilder });
    }
  });

  return names;
});
</script>

<template>
  <div v-if="routeLength > 0" class="flex flex-row items-center gap-2">
    <div v-for="name in routeNames.slice(0, -1)" :key="name.path">
      <nuxt-link v-if="useRouteCheck(name.path)" :to="name.path" class="flex flex-row items-center">
        <span>
          {{ returnRemoveSpecialCharacters(name.label, ' ') }}
        </span>
        <span>
          &rsaquo;
        </span>
      </nuxt-link>
      <span v-else class="flex flex-row gap-2">
        <span>{{ returnRemoveSpecialCharacters(name.label, ' ') }}</span>
        <span>
          &rsaquo;
        </span>
      </span>
    </div>
    <p>
      {{ displayName || returnRemoveSpecialCharacters((route.name as string), ' ') }}
    </p>
  </div>
  <div v-else class="flex flex-row items-center gap-4">
    <div v-for="name in routeNames.slice(0, -1)" :key="name.path">
      <nuxt-link v-if="useRouteCheck(name.path)" :to="name.path" class="flex flex-row items-center">
        <span>
          {{ returnRemoveSpecialCharacters(name.label, ' ') }}
        </span>
        <span>
          &rsaquo;
        </span>
      </nuxt-link>
      <span v-else class="flex flex-row gap-2">
        <span>{{ returnRemoveSpecialCharacters(name.label, ' ') }}</span>
        <span>
          &rsaquo;
        </span>
      </span>
    </div>
    <p v-if="routeNames[routeNames.length - 1]" class="text-rblue-base">
      {{ displayName || returnRemoveSpecialCharacters(routeNames[routeNames.length - 1]?.label.split('?')[0] ?? ' '.split('#')[0], ' ') }}
    </p>
  </div>
</template>

<style scoped>

</style>
