<script setup lang="ts">
import { RouterView } from "vue-router"
import { useAppThemeController } from "@/composables/useAppThemeController"

useAppThemeController()
</script>

<template>
  <RouterView />
</template>

<style>
@import "@/assets/base.css";
@import "@/assets/variables.css";

@font-face {
  font-family: Poppins;
  src: url("@/assets/fonts/Poppins/Poppins-Regular.ttf");
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: Poppins;
  src: url("@/assets/fonts/Poppins/Poppins-Light.ttf");
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: "JetBrains Mono";
  src: url("assets/fonts/JetBrains_Mono/JetBrainsMono-Regular.ttf");
  font-weight: 400;
  font-style: normal;
}
</style>
