<script setup lang="ts">
import { useRouter } from "vue-router"
import { useParsingStore } from "@/stores/parsing"

const parsingStore = useParsingStore()
const router = useRouter()

parsingStore.loadFromObjectForShare(router.currentRoute.value.query)

router.replace({ name: "main" })
</script>

<template>
  <p>Loading...</p>
</template>
