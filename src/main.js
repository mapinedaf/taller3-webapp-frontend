import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"
import { createRouter,createMemoryHistory } from 'vue-router'
import { createApp } from 'vue'
import App from './App.vue'
const routes =[
    {path :'/', component: App}
]

export const router = createRouter({
    history: createMemoryHistory(),
    routes
})

createApp(App).mount('#app')

