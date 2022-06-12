<script lang="ts">
import { defineComponent } from "vue"
import { useSettingsStore } from "@/stores/settings"

export default defineComponent({
  name: "ThemeToggle",
  setup() {
    return {
      store: useSettingsStore(),
    }
  },
  data() {
    return {
      theme: "system",
    }
  },
  methods: {
    handleSubmit() {
      this.store.theme = this.theme
    },
  },
})
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <select v-model="theme">
      <option value="light">Light</option>
      <option value="system">System</option>
      <option value="dark">Dark</option>
    </select>
    <input type="checkbox" />
    <button type="submit">Save</button>
  </form>
</template>

<style scoped></style>
