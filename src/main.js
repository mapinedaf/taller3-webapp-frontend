import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"
import { createRouter, createWebHistory } from 'vue-router'
import { createApp } from 'vue'
import App from './App.vue'
import { registerServiceWorker } from './pwa'

// Import pages
import ResnetPage from './pages/ResnetPage.vue'
import PlotResnet from './pages/PlotResnet.vue'
import AlejoPage from './pages/AlejoPage.vue'
import DiegoPage from './pages/DiegoPage.vue'

const routes = [
    { path: '/', component: ResnetPage },
    { path: '/resnet', component: ResnetPage },
    { path: '/plot', component: PlotResnet },
    { path: '/alejo', component: AlejoPage },
    { path: '/diego', component: DiegoPage }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')

// Register Service Worker for PWA support
registerServiceWorker()

