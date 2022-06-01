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
  <header>
    <TheHeaderDocumentControl />
    <h1>Syntax Visualiser</h1>
    <TheHeaderGeneralControl />
  </header>
</template>

<style scoped></style>
