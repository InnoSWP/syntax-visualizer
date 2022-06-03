<script lang="ts">
import { defineComponent } from "vue"
import TheHeaderDocumentControl from "./TheHeaderDocumentControl.vue"
import TheHeaderGeneralControl from "./TheHeaderGeneralControl.vue"

export default defineComponent({
  name: "TheHeader",
  components: { TheHeaderGeneralControl, TheHeaderDocumentControl },
})
</script>

<template>
  <header class="header-root">
    <TheHeaderDocumentControl />
    <h1 class="heading">Syntax Visualizer</h1>
    <TheHeaderGeneralControl />
  </header>
</template>

<style lang="scss" scoped>
$header-height: 60px;

.header-root {
  display: flex;
  align-items: center;
  justify-content: center;
  height: $header-height;
}

.heading {
  margin-right: auto;
  margin-left: auto;
}
</style>
