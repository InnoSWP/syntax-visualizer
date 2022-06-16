<script lang="ts">
import { defineComponent } from "vue"
import ThemeToggle from "@/components/header/ThemeToggle.vue"
import ShareLink from "@/components/header/ShareLink.vue"

export default defineComponent({
  name: "TheHeaderGeneralControl",
  components: { ThemeToggle, ShareLink },
})
</script>

<template>
  <div>
    <ShareLink />
    <ThemeToggle />
  </div>
</template>

<style scoped></style>
