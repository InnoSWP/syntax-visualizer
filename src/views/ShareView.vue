<script setup lang="ts">
import type { LocationQuery } from "vue-router"
import { useRouter } from "vue-router"
import { useParsingStore } from "@/stores/parsing"

const parsingStore = useParsingStore()
const router = useRouter()

parsingStore.loadFromURLSearchParams(
  routeQueryToURLSearchParams(router.currentRoute.value.query)
)

router.replace({ name: "main" })

function routeQueryToURLSearchParams(query: LocationQuery) {
  const params = new URLSearchParams()

  for (const key in query) {
    const value = query[key]
    if (value != null) {
      if (Array.isArray(value)) {
        for (const v of value) {
          if (v != null) {
            params.append(key, v)
          }
        }
      } else {
        params.set(key, value)
      }
    }
  }

  return params
}
</script>

<template>
  <p>Loading...</p>
</template>
