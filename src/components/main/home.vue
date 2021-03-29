<template>
  <div class="main">
    <h5 class="header">
      Hello
    </h5>
    <h4 class="sec-header">
      Test
    </h4>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped lang="less">
.main {
  .header {
    font-size: 2rem;
    text-align: center;
  }
  .sec-header {
    text-align: center;
  }
}
</style>