<template>
  <header class="some-class">
    <div>
      <nav>
        <ul>
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
import { defineComponent } from "vue";
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
  background-color: #404040;
  color: #cccccc;
}

nav ul li:hover {
  color: #ff6600;
}
</style>
