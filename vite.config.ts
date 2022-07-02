import { fileURLToPath, URL } from "url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import languagesSampleCodePlugin from "./plugins/languagesSampleCodePlugin"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), languagesSampleCodePlugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: process.env.VITE_BASE_URL || "/",
  worker: {
    format: "es",
  },
})
