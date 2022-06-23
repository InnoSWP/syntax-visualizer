import { fileURLToPath, URL } from "url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import monacoEditorPlugin from "vite-plugin-monaco-editor"
import nodePolyfills from "rollup-plugin-polyfill-node"
import NodeModulesPolyfills from "@esbuild-plugins/node-modules-polyfill"
import GlobalsPolyfills from "@esbuild-plugins/node-globals-polyfill"
import languagesSampleCodePlugin from "./plugins/languagesSampleCodePlugin"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    languagesSampleCodePlugin(),
    monacoEditorPlugin({
      publicBaseUrl: process.env.VITE_BASE_URL || "/",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: process.env.VITE_BASE_URL || "/",
  build: {
    rollupOptions: {
      plugins: [nodePolyfills()],
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        NodeModulesPolyfills(),
        GlobalsPolyfills({
          process: true,
          buffer: true,
        }),
      ],
    },
  },
})
