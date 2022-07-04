import { createApp } from "vue"
import themer from "@/core/themes/themer"

import App from "./App.vue"
import router from "./router"
import pinia from "./stores"

const app = createApp(App)

app.use(router)
app.use(pinia)
themer.init()

app.mount("#app")
