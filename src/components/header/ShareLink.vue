<script lang="ts">
import { useClipboard } from "@vueuse/core"
import { defineComponent } from "vue"
import { useRoute } from "vue-router"

export default defineComponent({
  name: "ShareLink",
  setup() {
    return {
      clipboard: useClipboard(),
      route: useRoute(),
    }
  },
  data() {
    return {
      buttonTitle: "Share",
    }
  },
  methods: {
    share() {
      this.copyUrlToClipboard()
      this.notify("Copied!", 1000)
    },
    copyUrlToClipboard() {
      const absoluteUrl = window.location.origin + this.route.fullPath
      this.clipboard.copy(absoluteUrl)
    },
    notify(message: string, duration: number) {
      const buttonTitle = this.buttonTitle
      this.buttonTitle = message
      setTimeout(() => {
        this.buttonTitle = buttonTitle
      }, duration)
    },
  },
})
</script>

<template>
  <button @click="share">{{ buttonTitle }}</button>
</template>

<style scoped></style>
