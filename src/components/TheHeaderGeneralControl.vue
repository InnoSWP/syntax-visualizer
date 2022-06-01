<script lang="ts">
import { defineComponent } from "vue"
import ThemeToggle from "@/components/ThemeToggle.vue"

export default defineComponent({
  name: "TheHeaderGeneralControl",
  components: { ThemeToggle },
})
</script>

<template>
  <div><ThemeToggle /></div>
</template>

<style scoped></style>
