<script lang="ts">
import AppIcon from "@/components/AppIcon.vue"
import { iconNames } from "@/components/icons"

export default {
  components: { AppIcon },
  setup() {
    return {
      iconNames,
    }
  },
}
</script>

<template>
  <div class="icons-container">
    <AppIcon
      v-for="iconName in iconNames"
      v-bind:key="iconName"
      :name="iconName"
    />
  </div>
</template>

<style scoped>
.icons-container {
  font-size: 24px;
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-width: min(80vw, 600px);
  height: 100%;
  margin: auto;
  gap: 18px;
}
</style>
