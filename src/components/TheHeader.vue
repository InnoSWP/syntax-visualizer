<script lang="ts">
import { defineComponent } from "vue"
import DocumentTitle from "@/components/DocumentTitle.vue"
import ThemeToggle from "@/components/ThemeToggle.vue"

export default defineComponent({
  name: "TheHeader",
  components: { DocumentTitle, ThemeToggle },
})
</script>

<template>
  <header class="header">
    <div class="left-menu">
      <DocumentTitle />
      <span class="vertical-separator" />
    </div>
    <h1 class="heading">Syntax Visualizer</h1>
    <div class="right-menu">
      <ThemeToggle />
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  height: var(--header-height);
  padding-right: 18px;
  padding-left: 18px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
}

.header > :deep(*) {
  display: flex;
  align-items: center;
  width: calc(100% / 3);
}

.left-menu {
}

.heading {
  font-size: 2rem;
  font-weight: 300;
  justify-content: center;
}

.right-menu {
  flex-direction: row-reverse;
}

.vertical-separator {
  width: 1px;
  height: 28px;
  background: #000;
}
</style>
