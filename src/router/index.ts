import { createRouter, createWebHistory } from "vue-router"
import MainView from "@/views/MainView.vue"
import IconsPreview from "@/views/IconsPreview.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: MainView,
    },
    {
      path: "/icons",
      name: "icons",
      component: IconsPreview,
    },
  ],
})

export default router
