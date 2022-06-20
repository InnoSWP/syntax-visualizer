<script setup lang="ts">
import { useSettingsStore } from "@/stores/settings"

const settings = useSettingsStore()
</script>

<template>
  <button @click="settings.toggleTheme">Theme: {{ settings.theme }}</button>
</template>
