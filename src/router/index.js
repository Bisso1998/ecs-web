import Vue from 'vue'
import Router from 'vue-router'
import HomeComponent from '@/pages/Home.vue'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Home',
        component: HomeComponent
    }]
})
