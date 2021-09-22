<template>
  <editor-content :editor="editor" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { EditorContent, useEditor } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import VueComponent from "./ext";

export default defineComponent({
  components: { EditorContent },
  setup() {
    const editor = useEditor({
      content: `
        <p>
          This is still the text editor you’re used to, but enriched with node views.
        </p>
        <vue-component>
          <p>This is editable.</p>
        </vue-component>
        <p>
          Did you see that? That’s a Vue component. We are really living in the future.
        </p>
      `,
      extensions: [StarterKit, VueComponent],
      injectCSS: true,
    });

    return { editor };
  },
});
</script>

<style lang="less">
/* Basic editor styles */
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }
}
</style>