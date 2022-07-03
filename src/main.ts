import { createApp } from "vue"
import { createPinia } from "pinia"
import themer from "@/core/themes/themer"

import App from "./App.vue"
import router from "./router"

const app = createApp(App)

app.use(createPinia())
app.use(router)
themer.init()

app.mount("#app")
