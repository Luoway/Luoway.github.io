import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

Vue.config.productionTip = false

const Bus = new Vue()
window.Bus = Bus
router.afterEach(() => {
    Bus.$emit('relocateFooter')
})
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
