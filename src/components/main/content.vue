<template>
  <div class="content">
    <primeheader class="flex-none working" />
    <router-view class="flex-1 not-working" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import primeheader from "./header.vue";

export default defineComponent({
  components: {
    primeheader,
  },
});
</script>

<style scoped lang="less">
.content {
  min-width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.working {
  display: flex;
}

.not-working {
  background-color: limegreen;
}
</style>