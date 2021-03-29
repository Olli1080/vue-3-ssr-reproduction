<template>
  <component v-if="component" :is="component">
    <router-view />
  </component>
  <router-view v-else />
</template>

<script lang="ts">
import {
  AsyncComponentLoader,
  defineAsyncComponent,
  defineComponent,
  watch,
  shallowRef,
} from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "app",
  setup() {
    const component = shallowRef<AsyncComponentLoader>();
    const route = useRoute();

    const updateComponent = () => {
      if (route.meta.layout) {
        component.value = defineAsyncComponent(
          <AsyncComponentLoader>route.meta.layout
        );
      }
    };
    watch(route, (route) => {
      updateComponent();
    });
    updateComponent();

    return { component };
  },
});
</script>

<style>
@import "../css/someStyles.less";
</style>