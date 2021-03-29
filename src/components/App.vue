<template>
  <content />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import content from "./main/content.vue";

export default defineComponent({
  components: {
    content,
  },
  name: "app",
});
</script>