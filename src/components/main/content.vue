<template>
  <div class="content">
    <primeheader style="flex: none" />
    <router-view style="flex: 1 1 0%" class="bgrd" />
    <primefooter style="flex: none"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import primeheader from "./header.vue";
import primefooter from "./footer.vue";

export default defineComponent({
  components: {
    primeheader,
    primefooter,
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

.bgrd {
  background-color: limegreen;
}
</style>