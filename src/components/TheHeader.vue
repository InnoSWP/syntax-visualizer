<script setup lang="ts">
import DocumentTitle from "@/components/DocumentTitle.vue"
import ShareButton from "@/components/ShareButton.vue"
</script>

<template>
  <header class="header">
    <div class="left-menu">
      <DocumentTitle />
      <span class="vertical-separator" />
      <ShareButton />
    </div>
    <h1 class="heading">Syntax Visualizer</h1>
    <div class="right-menu"></div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  height: var(--header-height);
  padding: 0 18px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
}

.header > :deep(*) {
  width: calc(100% / 3);
}

.left-menu,
.right-menu {
  display: flex;
  align-items: center;
}

.left-menu {
  flex-direction: row;
}

.heading {
  font-size: 2rem;
  font-weight: 300;
  overflow: hidden;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.right-menu {
  flex-direction: row-reverse;
}

.vertical-separator {
  width: 1px;
  height: 28px;
  margin-right: 12px;
  margin-left: 12px;
  background: #000;
}
</style>
