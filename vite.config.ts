import { fileURLToPath, URL } from "url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import monacoEditorPlugin from "vite-plugin-monaco-editor"
import nodePolyfills from "rollup-plugin-polyfill-node"
import NodeModulesPolyfills from "@esbuild-plugins/node-modules-polyfill"
import GlobalsPolyfills from "@esbuild-plugins/node-globals-polyfill"
import istanbul from "vite-plugin-istanbul"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    monacoEditorPlugin({
      publicBaseUrl: process.env.VITE_BASE_URL || "/",
    }),
    istanbul({
      include: "src/*",
      exclude: ["node_modules", "test/"],
      extension: [".js", ".ts", ".vue"],
      requireEnv: true,
      cypress: true,
      forceBuildInstrument: true,
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
    sourcemap: process.env.CYPRESS_COVERAGE ? "inline" : false,
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
  // Vitest C8 config
  test: {
    coverage: {
      include: ["src/*"],
      reporter: ["json"],
    },
  },
})
