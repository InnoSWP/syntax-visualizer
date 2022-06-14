<script lang="ts">
import { defineComponent } from "vue"
import ThemeToggle from "@/components/ThemeToggle.vue"

export default defineComponent({
  name: "TheHeader",
  components: { ThemeToggle },
})
</script>

<template>
  <header class="container">
    <div class="left-menu"></div>
    <h1 class="heading">Syntax Visualizer</h1>
    <div class="right-menu">
      <ThemeToggle />
    </div>
  </header>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--header-height);
}

.container > * {
  display: flex;
  align-items: center;
  flex: 1;
}

.left-menu {
}

.heading {
  justify-content: center;
}

.right-menu {
  flex-direction: row-reverse;
}
</style>
