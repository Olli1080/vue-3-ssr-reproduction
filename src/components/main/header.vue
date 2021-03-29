<template>
  <header class="justify-between md:items-center some-class py-1.5">
    <div>
      <nav>
        <ul
          class="flex flex-wrap list-none list-inside px-6 py-3 lg:items-center md:justify-end"
        >
          <li
            v-for="(item, index) in routes"
            :key="index"
            class="w-1/2 md:w-auto"
          >
            <router-link :key="index" :to="item.path">
              <span
                v-if="item.meta.title"
                v-text="item.meta.title"
                class="p-2.5"
              />
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { headerRoutes } from "../../shared/routes";

export default defineComponent({
  setup: () => {
    return {
      routes: headerRoutes,
    };
  },
});
</script>

<style lang="less">
.some-class {
  display: grid;
  grid-template-columns: 1fr minmax(750px, 1fr);
  gap: 0;

  background-color: var(--color-secondary);
  color: #cccccc;
}

nav ul li:hover {
  color: var(--color-primary);
}
</style>
