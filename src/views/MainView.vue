<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue"
import TheTabs from "@/components/TheTabs.vue"
import { useLanguageSampleCode, useParsingController } from "@/composables"

useLanguageSampleCode()
useParsingController()
</script>

<template>
  <TheHeader />
  <TheTabs />
</template>
